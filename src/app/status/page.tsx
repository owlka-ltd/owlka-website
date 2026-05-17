"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ComponentStatus = "ok" | "degraded" | "down";

type Component = {
  name: string;
  status: ComponentStatus;
  detail: string;
};

type StatusPayload = {
  conv_server: ComponentStatus;
  tunnel: ComponentStatus;
  website: "ok";
  checked_at: string;
  components: Component[];
};

type FetchState =
  | { kind: "loading" }
  | { kind: "ready"; data: StatusPayload }
  | { kind: "error"; message: string };

const COLOR_OK = "#16a34a";
const COLOR_DEGRADED = "#f59e0b";
const COLOR_DOWN = "#dc2626";

const POLL_INTERVAL_MS = 30_000;

function statusColor(status: ComponentStatus): string {
  if (status === "ok") return COLOR_OK;
  if (status === "degraded") return COLOR_DEGRADED;
  return COLOR_DOWN;
}

function worstStatus(components: Component[]): ComponentStatus {
  if (components.some((c) => c.status === "down")) return "down";
  if (components.some((c) => c.status === "degraded")) return "degraded";
  return "ok";
}

function bannerCopy(status: ComponentStatus): string {
  if (status === "ok") return "All systems operational";
  if (status === "degraded") return "Some systems degraded";
  return "Major outage";
}

function formatTimestamp(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "medium",
    });
  } catch {
    return iso;
  }
}

export default function StatusPage() {
  const [state, setState] = useState<FetchState>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/status", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = (await res.json()) as StatusPayload;
        if (!cancelled) {
          setState({ kind: "ready", data });
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : "unknown error";
          setState({ kind: "error", message });
        }
      }
    }

    load();
    const id = setInterval(load, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const overall: ComponentStatus =
    state.kind === "ready" ? worstStatus(state.data.components) : "degraded";

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-10">
          <Link
            href="/"
            className="text-sm text-muted hover:text-text transition-colors"
          >
            ← Back to Owlka
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
              {state.kind === "loading"
                ? "Checking systems…"
                : bannerCopy(overall)}
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-[22px] border border-border bg-surface">
          {state.kind === "loading" && (
            <div className="p-6 text-muted">Loading component status…</div>
          )}

          {state.kind === "error" && (
            <div className="p-6">
              <p className="font-medium" style={{ color: COLOR_DOWN }}>
                Couldn’t reach status probe
              </p>
              <p className="mt-1 text-sm text-muted">{state.message}</p>
            </div>
          )}

          {state.kind === "ready" &&
            state.data.components.map((c, i) => (
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
                  <p className="mt-1 text-sm text-muted">{c.detail}</p>
                </div>
              </div>
            ))}
        </section>

        <p className="mt-6 text-sm text-muted">
          Last checked:{" "}
          {state.kind === "ready"
            ? formatTimestamp(state.data.checked_at)
            : "—"}{" "}
          (auto-refreshes every 30s)
        </p>

        <footer className="mt-16 border-t border-border pt-6 text-sm text-muted">
          <Link
            href="/support"
            className="hover:text-text transition-colors"
          >
            Report an issue →
          </Link>
        </footer>
      </div>
    </main>
  );
}
