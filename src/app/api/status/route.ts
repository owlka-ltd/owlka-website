import { NextResponse } from "next/server";
import { INCIDENTS } from "@/content/incidents";
import { MAC_DMG_URL, WINDOWS_AVAILABLE, WINDOWS_EXE_URL } from "@/lib/flags";

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

// A status page that reports green when the product is broken is worse than no
// status page, because it actively discourages the report. Every probe here
// must measure the thing the page then claims, and nothing wider.
const PROBE_TIMEOUT_MS = 8000;
const RECENT_WINDOW_DAYS = 7;

// An installer that comes back as a few hundred bytes is a 404 page, an error
// document, or a half-finished publish. Live sizes on 2026-07-25: Mac DMG
// 34,980,736 bytes, Windows EXE 12,249,552 bytes. One megabyte is far below
// either and far above any plausible error body.
const MIN_ARTIFACT_BYTES = 1_000_000;

type CheckResult = { ok: true; note?: string } | { ok: false; detail: string };

type Check = {
  url: string;
  method?: "GET" | "HEAD";
  /**
   * Inspect a 2xx response. Returning `ok: false` marks the component
   * degraded: it answered, but not with what it is supposed to answer with.
   * A non-2xx status never reaches here, it is already "down".
   */
  validate?: (res: Response) => Promise<CheckResult> | CheckResult;
};

type Probe = {
  id: string;
  name: string;
  checks: Check[];
};

function megabytes(bytes: number): string {
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

/**
 * Assert a downloadable artifact really is downloadable: 200, and a body big
 * enough to be the installer rather than an error page.
 */
function artifactCheck(label: string, url: string): Check {
  return {
    url,
    method: "HEAD",
    validate: (res) => {
      const raw = res.headers.get("content-length");
      if (raw === null) {
        return {
          ok: false,
          detail: `${label} answered 200 but reported no size, so we cannot confirm the file is intact`,
        };
      }
      const bytes = Number(raw);
      if (!Number.isFinite(bytes) || bytes < MIN_ARTIFACT_BYTES) {
        return {
          ok: false,
          detail: `${label} answered 200 but is only ${raw} bytes, too small to be the installer`,
        };
      }
      return { ok: true, note: `${label} ${megabytes(bytes)}` };
    },
  };
}

const PROBES: Probe[] = [
  {
    id: "relay",
    name: "Encrypted middleman",
    checks: [
      {
        url: "https://relay.owlka.com/health",
        validate: async (res) => {
          let body: unknown;
          try {
            body = await res.json();
          } catch {
            return {
              ok: false,
              detail: "Health endpoint answered 200 but the body was not JSON",
            };
          }
          if (!body || typeof body !== "object") {
            return {
              ok: false,
              detail: "Health endpoint answered 200 but the body was not an object",
            };
          }
          const status = (body as { status?: unknown }).status;
          if (status !== "ok") {
            return {
              ok: false,
              detail: `Health endpoint answered 200 but reported status ${JSON.stringify(status)}`,
            };
          }
          return { ok: true };
        },
      },
    ],
  },
  {
    // This used to fetch download.owlka.com/health, a static file whose entire
    // content is the word "ok", and then print "Mac DMG and Windows EXE are
    // reachable". It was the only probe with no validator, and it measured
    // neither installer. If the DMG 404'd or a publish half-finished, the
    // public status page said everything was fine. Now the probe HEADs the two
    // artifacts the sentence is about.
    id: "downloads",
    name: WINDOWS_AVAILABLE ? "App downloads" : "Mac app downloads",
    checks: [
      artifactCheck("Mac DMG", MAC_DMG_URL),
      ...(WINDOWS_AVAILABLE
        ? [artifactCheck("Windows EXE", WINDOWS_EXE_URL)]
        : []),
    ],
  },
  {
    // Was /api/og, a Satori image render and the most expensive route on the
    // site: measured at 3074 ms live against a 4000 ms budget, so a normal cold
    // render was one slow moment away from reporting the website "down". A
    // liveness probe should be the cheapest thing that proves the deployment is
    // serving. robots.txt is a static route handler.
    id: "website",
    name: "Owlka website",
    checks: [{ url: "https://owlka.com/robots.txt" }],
  },
];

type CheckOutcome = {
  status: ComponentStatus;
  detail: string | null;
  note: string | null;
  latency_ms: number;
};

async function runCheck(check: Check): Promise<CheckOutcome> {
  const started = Date.now();
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);
    let res: Response;
    try {
      res = await fetch(check.url, {
        method: check.method ?? "GET",
        cache: "no-store",
        signal: controller.signal,
        headers: { "User-Agent": "owlka-status-page/1.0" },
      });
    } finally {
      clearTimeout(timer);
    }
    const latency_ms = Date.now() - started;

    if (!res.ok) {
      return {
        status: "down",
        detail: `HTTP ${res.status} from ${check.url}`,
        note: null,
        latency_ms,
      };
    }

    if (check.validate) {
      const result = await check.validate(res);
      if (!result.ok) {
        return {
          status: "degraded",
          detail: result.detail,
          note: null,
          latency_ms,
        };
      }
      return {
        status: "ok",
        detail: null,
        note: result.note ?? null,
        latency_ms,
      };
    }

    return { status: "ok", detail: null, note: null, latency_ms };
  } catch (err) {
    const latency_ms = Date.now() - started;
    const aborted = err instanceof Error && err.name === "AbortError";
    return {
      status: "unknown",
      detail: aborted
        ? `Probe of ${check.url} timed out after ${PROBE_TIMEOUT_MS} ms`
        : `Could not reach ${check.url}`,
      note: null,
      latency_ms,
    };
  }
}

const SEVERITY: Record<ComponentStatus, number> = {
  ok: 0,
  degraded: 1,
  unknown: 2,
  down: 3,
};

async function probe(p: Probe): Promise<Component> {
  const checked_at = new Date().toISOString();
  const outcomes = await Promise.all(p.checks.map(runCheck));

  // The component is only as healthy as its worst check. Latency is the
  // slowest of them, because that is what a user waits for.
  const worst = outcomes.reduce((a, b) =>
    SEVERITY[b.status] > SEVERITY[a.status] ? b : a,
  );
  const latency_ms = Math.max(...outcomes.map((o) => o.latency_ms));

  if (worst.status !== "ok") {
    const failures = outcomes
      .filter((o) => o.status !== "ok")
      .map((o) => o.detail)
      .filter((d): d is string => d !== null);
    return {
      id: p.id,
      name: p.name,
      status: worst.status,
      detail: failures.join(". ") || "Probe failed",
      latency_ms,
      checked_at,
    };
  }

  const notes = outcomes
    .map((o) => o.note)
    .filter((n): n is string => n !== null);

  return {
    id: p.id,
    name: p.name,
    status: "ok",
    detail: describeOk(p.id, latency_ms, notes),
    latency_ms,
    checked_at,
  };
}

// Every sentence here must be something the probe above actually measured.
function describeOk(id: string, latency_ms: number, notes: string[]): string {
  switch (id) {
    case "relay":
      return `Passing sealed packets between phones and Macs. ${latency_ms} ms.`;
    case "downloads":
      return notes.length > 0
        ? `Downloadable now: ${notes.join(", ")}. ${latency_ms} ms.`
        : `Downloads reachable. ${latency_ms} ms.`;
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
