import { NextResponse } from "next/server";
import { INCIDENTS } from "@/content/incidents";

// Polled live every request. Cached at the edge for 30s with SWR so a burst
// of refreshes (Tim's iOS link, a status check from the homepage footer)
// doesn't fan out to the relay.
export const dynamic = "force-dynamic";
export const revalidate = 0;

type ComponentStatus = "ok" | "degraded" | "down" | "unknown";

type Component = {
  id: string;
  name: string;
  status: ComponentStatus;
  detail: string;
  latency_ms: number | null;
  checked_at: string;
};

type Incident = {
  id: string;
  title: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  started_at: string;
  resolved_at: string | null;
  components: string[];
  updates: { ts: string; body: string }[];
};

type StatusResponse = {
  overall: ComponentStatus;
  checked_at: string;
  components: Component[];
  incidents: {
    active: Incident[];
    recent: Incident[];
    last_incident_at: string | null;
  };
};

const PROBE_TIMEOUT_MS = 4000;
const RECENT_WINDOW_DAYS = 7;

type Probe = {
  id: string;
  name: string;
  url: string;
  // Optional JSON validator. Receives parsed body, returns true if healthy.
  validate?: (body: unknown) => boolean;
};

const PROBES: Probe[] = [
  {
    id: "relay",
    name: "Encrypted middleman",
    url: "https://relay.owlka.com/health",
    validate: (body) => {
      if (!body || typeof body !== "object") return false;
      const status = (body as { status?: unknown }).status;
      return status === "ok";
    },
  },
  {
    id: "downloads",
    name: "Mac app downloads",
    url: "https://download.owlka.com/health",
  },
  {
    id: "website",
    name: "Owlka website",
    url: "https://owlka.com/api/og?title=ping",
  },
];

async function probe(p: Probe): Promise<Component> {
  const started = Date.now();
  const checked_at = new Date().toISOString();
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);
    const res = await fetch(p.url, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
      headers: { "User-Agent": "owlka-status-page/1.0" },
    });
    clearTimeout(timer);
    const latency_ms = Date.now() - started;

    if (!res.ok) {
      return {
        id: p.id,
        name: p.name,
        status: "down",
        detail: `HTTP ${res.status} from probe endpoint`,
        latency_ms,
        checked_at,
      };
    }

    if (p.validate) {
      try {
        const body = await res.json();
        if (!p.validate(body)) {
          return {
            id: p.id,
            name: p.name,
            status: "degraded",
            detail: "Probe returned 200 but health payload is not ok",
            latency_ms,
            checked_at,
          };
        }
      } catch {
        return {
          id: p.id,
          name: p.name,
          status: "degraded",
          detail: "Probe returned 200 but body was not JSON",
          latency_ms,
          checked_at,
        };
      }
    }

    return {
      id: p.id,
      name: p.name,
      status: "ok",
      detail: describeOk(p.id, latency_ms),
      latency_ms,
      checked_at,
    };
  } catch (err) {
    const latency_ms = Date.now() - started;
    const aborted = err instanceof Error && err.name === "AbortError";
    return {
      id: p.id,
      name: p.name,
      status: "unknown",
      detail: aborted
        ? `Probe timed out after ${PROBE_TIMEOUT_MS} ms`
        : "Probe could not reach the endpoint",
      latency_ms,
      checked_at,
    };
  }
}

function describeOk(id: string, latency_ms: number): string {
  switch (id) {
    case "relay":
      return `Passing sealed packets between phones and Macs. ${latency_ms} ms.`;
    case "downloads":
      return `Mac DMG and Windows EXE are reachable. ${latency_ms} ms.`;
    case "website":
      return `Serving this page and the marketing site. ${latency_ms} ms.`;
    default:
      return `Healthy. ${latency_ms} ms.`;
  }
}

function rollUp(components: Component[]): ComponentStatus {
  if (components.some((c) => c.status === "down")) return "down";
  if (components.some((c) => c.status === "degraded")) return "degraded";
  if (components.every((c) => c.status === "ok")) return "ok";
  // Mixed ok + unknown. Don't claim green, don't cry wolf either.
  return "degraded";
}

function partitionIncidents(all: Incident[]): {
  active: Incident[];
  recent: Incident[];
  last_incident_at: string | null;
} {
  const active = all.filter((i) => i.resolved_at === null);
  const recentCutoff = Date.now() - RECENT_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  const recent = all
    .filter(
      (i) =>
        i.resolved_at !== null &&
        new Date(i.resolved_at).getTime() >= recentCutoff,
    )
    .sort((a, b) => {
      const ta = new Date(a.resolved_at ?? a.started_at).getTime();
      const tb = new Date(b.resolved_at ?? b.started_at).getTime();
      return tb - ta;
    });
  const last = all
    .map((i) => i.resolved_at ?? i.started_at)
    .filter((t): t is string => typeof t === "string")
    .sort()
    .pop();
  return {
    active,
    recent,
    last_incident_at: last ?? null,
  };
}

export async function GET(): Promise<NextResponse<StatusResponse>> {
  const components = await Promise.all(PROBES.map(probe));
  const overall = rollUp(components);
  const incidentBuckets = partitionIncidents(INCIDENTS);

  const payload: StatusResponse = {
    overall,
    checked_at: new Date().toISOString(),
    components,
    incidents: incidentBuckets,
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      // Edge cache 30s so a burst of clients hits one origin probe; SWR
      // keeps a fresh response ready while a background revalidate runs.
      "Cache-Control": "s-maxage=30, stale-while-revalidate=60",
      // Allow the page to be embedded under any owlka subdomain (e.g.
      // status.owlka.com once DNS lands) without CORS rejection.
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
}
