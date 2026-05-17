import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type ComponentStatus = "ok" | "degraded" | "down";

type Component = {
  name: string;
  status: ComponentStatus;
  detail: string;
};

type StatusResponse = {
  conv_server: ComponentStatus;
  tunnel: ComponentStatus;
  website: "ok";
  checked_at: string;
  components: Component[];
};

const PROBE_TIMEOUT_MS = 3000;
const CONV_READY_URL = "https://conv.owlka.com/ready";
const TUNNEL_URL = "https://conv.owlka.com/";

async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  controller: AbortController,
): Promise<T> {
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await promise;
  } finally {
    clearTimeout(timer);
  }
}

async function probeConvServer(): Promise<Component> {
  const controller = new AbortController();
  try {
    const res = await withTimeout(
      fetch(CONV_READY_URL, {
        method: "GET",
        signal: controller.signal,
        cache: "no-store",
      }),
      PROBE_TIMEOUT_MS,
      controller,
    );

    if (res.status === 404) {
      return {
        name: "Conversation server",
        status: "down",
        detail: "endpoint not yet available",
      };
    }

    let body: { status?: string; version?: string; uptime_s?: number } = {};
    try {
      body = await res.json();
    } catch {
      // Ignore JSON parse errors; treat as missing body.
    }

    if (res.status === 200 && body.status === "ok") {
      const version = body.version ? ` v${body.version}` : "";
      const uptime =
        typeof body.uptime_s === "number"
          ? ` (uptime ${formatUptime(body.uptime_s)})`
          : "";
      return {
        name: "Conversation server",
        status: "ok",
        detail: `responding${version}${uptime}`,
      };
    }

    if (res.status === 503) {
      return {
        name: "Conversation server",
        status: "degraded",
        detail: `reporting unhealthy (HTTP 503)`,
      };
    }

    return {
      name: "Conversation server",
      status: "degraded",
      detail: `unexpected response (HTTP ${res.status})`,
    };
  } catch (err) {
    const reason =
      err instanceof Error && err.name === "AbortError"
        ? "timed out after 3s"
        : err instanceof Error
          ? err.message
          : "unknown error";
    return {
      name: "Conversation server",
      status: "down",
      detail: reason,
    };
  }
}

async function probeTunnel(): Promise<Component> {
  const controller = new AbortController();
  try {
    const res = await withTimeout(
      fetch(TUNNEL_URL, {
        method: "HEAD",
        signal: controller.signal,
        cache: "no-store",
        redirect: "manual",
      }),
      PROBE_TIMEOUT_MS,
      controller,
    );

    if (res.status === 200) {
      return {
        name: "Cloudflare tunnel",
        status: "ok",
        detail: "tunnel responding (HTTP 200)",
      };
    }

    return {
      name: "Cloudflare tunnel",
      status: "down",
      detail: `tunnel unhealthy (HTTP ${res.status})`,
    };
  } catch (err) {
    const reason =
      err instanceof Error && err.name === "AbortError"
        ? "timed out after 3s"
        : err instanceof Error
          ? err.message
          : "unknown error";
    return {
      name: "Cloudflare tunnel",
      status: "down",
      detail: reason,
    };
  }
}

function formatUptime(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)}h`;
  return `${Math.round(seconds / 86400)}d`;
}

export async function GET(): Promise<NextResponse<StatusResponse>> {
  const [convServer, tunnel] = await Promise.all([
    probeConvServer(),
    probeTunnel(),
  ]);

  const website: Component = {
    name: "Owlka website",
    status: "ok",
    detail: "serving this page",
  };

  const payload: StatusResponse = {
    conv_server: convServer.status,
    tunnel: tunnel.status,
    website: "ok",
    checked_at: new Date().toISOString(),
    components: [convServer, tunnel, website],
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": "s-maxage=30, stale-while-revalidate=60",
    },
  });
}
