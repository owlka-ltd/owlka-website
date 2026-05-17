import Link from "next/link";

export const revalidate = 30;
export const dynamic = "force-dynamic";

type ComponentStatus = "ok" | "degraded" | "down";

type ComponentResult = {
  name: string;
  status: ComponentStatus;
  detail: string;
  error?: string;
};

const PROBE_TIMEOUT_MS = 3000;
const CONV_READY_URL = "https://conv.owlka.com/ready";
const CONV_HEALTHZ_URL = "https://conv.owlka.com/healthz";
const WEBSITE_URL = "https://owlka.com";

const COLOR_OK = "#16a34a";
const COLOR_DEGRADED = "#f59e0b";
const COLOR_DOWN = "#dc2626";

function statusColor(status: ComponentStatus): string {
  if (status === "ok") return COLOR_OK;
  if (status === "degraded") return COLOR_DEGRADED;
  return COLOR_DOWN;
}

function worstStatus(components: ComponentResult[]): ComponentStatus {
  if (components.some((c) => c.status === "down")) return "down";
  if (components.some((c) => c.status === "degraded")) return "degraded";
  return "ok";
}

function bannerCopy(
  status: ComponentStatus,
  downOrDegradedCount: number,
): string {
  if (status === "ok") return "All systems operational";
  if (downOrDegradedCount >= 3) return "Major outage";
  return "Partial outage";
}

function formatTimestamp(d: Date): string {
  return d.toUTCString();
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) {
    if (err.name === "AbortError") return "timed out after 3s";
    return err.message;
  }
  return "unknown error";
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
    });
  } finally {
    clearTimeout(timer);
  }
}

async function probeConvReady(): Promise<ComponentResult> {
  try {
    const res = await fetchWithTimeout(
      CONV_READY_URL,
      { method: "GET" },
      PROBE_TIMEOUT_MS,
    );

    let body: { status?: string; version?: string; uptime_s?: number } = {};
    try {
      body = await res.json();
    } catch {
      // ignore parse errors
    }

    if (res.status === 200 && body.status === "ok") {
      const parts: string[] = ["responding"];
      if (body.version) parts.push(`v${body.version}`);
      if (typeof body.uptime_s === "number") {
        parts.push(`uptime ${formatUptime(body.uptime_s)}`);
      }
      return {
        name: "Conversation server (/ready)",
        status: "ok",
        detail: parts.join(", "),
      };
    }

    if (res.status === 503) {
      return {
        name: "Conversation server (/ready)",
        status: "degraded",
        detail: "reporting unhealthy (HTTP 503)",
      };
    }

    return {
      name: "Conversation server (/ready)",
      status: "degraded",
      detail: `unexpected response (HTTP ${res.status})`,
    };
  } catch (err) {
    return {
      name: "Conversation server (/ready)",
      status: "down",
      detail: "probe failed",
      error: errorMessage(err),
    };
  }
}

async function probeConvHealthz(): Promise<ComponentResult> {
  try {
    const res = await fetchWithTimeout(
      CONV_HEALTHZ_URL,
      { method: "GET" },
      PROBE_TIMEOUT_MS,
    );

    if (res.status === 200) {
      return {
        name: "Conversation server (/healthz)",
        status: "ok",
        detail: "liveness OK (HTTP 200)",
      };
    }

    return {
      name: "Conversation server (/healthz)",
      status: "down",
      detail: `liveness failed (HTTP ${res.status})`,
    };
  } catch (err) {
    return {
      name: "Conversation server (/healthz)",
      status: "down",
      detail: "probe failed",
      error: errorMessage(err),
    };
  }
}

async function probeWebsite(): Promise<ComponentResult> {
  try {
    const res = await fetchWithTimeout(
      WEBSITE_URL,
      { method: "HEAD", redirect: "manual" },
      PROBE_TIMEOUT_MS,
    );

    // Accept 200 as well as redirects (3xx) and 405 (some hosts disallow HEAD).
    if (res.status === 200) {
      return {
        name: "Cloudflare tunnel (owlka.com)",
        status: "ok",
        detail: "tunnel responding (HTTP 200)",
      };
    }
    if (res.status >= 300 && res.status < 400) {
      return {
        name: "Cloudflare tunnel (owlka.com)",
        status: "ok",
        detail: `tunnel responding (HTTP ${res.status})`,
      };
    }
    return {
      name: "Cloudflare tunnel (owlka.com)",
      status: "down",
      detail: `tunnel unhealthy (HTTP ${res.status})`,
    };
  } catch (err) {
    return {
      name: "Cloudflare tunnel (owlka.com)",
      status: "down",
      detail: "probe failed",
      error: errorMessage(err),
    };
  }
}

function formatUptime(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)}h`;
  return `${Math.round(seconds / 86400)}d`;
}

export default async function StatusPage() {
  const checkedAt = new Date();
  const components = await Promise.all([
    probeConvReady(),
    probeConvHealthz(),
    probeWebsite(),
  ]);

  const overall = worstStatus(components);
  const downOrDegraded = components.filter((c) => c.status !== "ok").length;

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-10">
          <Link
            href="/"
            className="text-sm text-muted hover:text-text transition-colors"
          >
            &larr; Back to Owlka
          </Link>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            System status
          </h1>
        </header>

        <section
          className="rounded-[22px] border p-8"
          style={{
            backgroundColor: `${statusColor(overall)}14`,
            borderColor: `${statusColor(overall)}55`,
          }}
          aria-live="polite"
        >
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="inline-block h-4 w-4 rounded-full"
              style={{ backgroundColor: statusColor(overall) }}
            />
            <p
              className="text-2xl font-semibold"
              style={{ color: statusColor(overall) }}
            >
              {bannerCopy(overall, downOrDegraded)}
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-[22px] border border-border bg-surface">
          {components.map((c, i) => (
            <div
              key={c.name}
              className={`flex items-start gap-4 p-6 ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="mt-1.5 inline-block h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: statusColor(c.status) }}
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium">{c.name}</p>
                  <p
                    className="text-sm font-medium uppercase tracking-wide"
                    style={{ color: statusColor(c.status) }}
                  >
                    {c.status}
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {c.detail}
                  <span className="ml-2 text-xs text-muted/80">
                    checked {formatTimestamp(checkedAt)}
                  </span>
                </p>
                {c.error && (
                  <details className="mt-2 text-xs text-muted">
                    <summary className="cursor-pointer">Error detail</summary>
                    <pre className="mt-2 whitespace-pre-wrap break-words">
                      {c.error}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          ))}
        </section>

        <p className="mt-6 text-sm text-muted">
          Checked {formatTimestamp(checkedAt)}. Page revalidates every 30
          seconds. No analytics, no third-party JavaScript.
        </p>

        <footer className="mt-16 border-t border-border pt-6 text-sm text-muted">
          <Link
            href="/support"
            className="hover:text-text transition-colors"
          >
            Report an issue &rarr;
          </Link>
        </footer>
      </div>
    </main>
  );
}
