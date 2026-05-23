"use client";

import { useEffect, useState } from "react";

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

const POLL_INTERVAL_MS = 60_000;
const STATUS_ENDPOINT = "/api/status";

const PALETTE: Record<ComponentStatus, { fg: string; tint: string; ring: string; label: string }> = {
  ok: {
    fg: "#16a34a",
    tint: "#16a34a14",
    ring: "#16a34a55",
    label: "Operational",
  },
  degraded: {
    fg: "#d97706",
    tint: "#d9770614",
    ring: "#d9770655",
    label: "Degraded",
  },
  down: {
    fg: "#dc2626",
    tint: "#dc262614",
    ring: "#dc262655",
    label: "Outage",
  },
  unknown: {
    fg: "#98989D",
    tint: "#98989D14",
    ring: "#98989D55",
    label: "Status unknown",
  },
};

const HEADLINE: Record<ComponentStatus, string> = {
  ok: "All systems operational",
  degraded: "Some systems degraded",
  down: "Active outage",
  unknown: "Status unknown",
};

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZoneName: "short",
    });
  } catch {
    return iso;
  }
}

function formatRelative(iso: string | null): string {
  if (!iso) return "none on record";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return iso;
  const ageMs = Date.now() - t;
  const days = Math.floor(ageMs / (24 * 60 * 60 * 1000));
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

export function StatusBoard() {
  const [data, setData] = useState<StatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const tick = async () => {
      try {
        const res = await fetch(STATUS_ENDPOINT, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: StatusResponse = await res.json();
        if (cancelled) return;
        setData(json);
        setError(null);
        setFetchedAt(new Date().toISOString());
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "fetch failed");
      }
    };

    void tick();
    const handle = setInterval(tick, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(handle);
    };
  }, []);

  if (!data && !error) {
    return (
      <section
        className="rounded-[22px] border p-8"
        style={{ backgroundColor: PALETTE.unknown.tint, borderColor: PALETTE.unknown.ring }}
        aria-live="polite"
      >
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="inline-block h-4 w-4 rounded-full"
            style={{ backgroundColor: PALETTE.unknown.fg }}
          />
          <p className="text-2xl font-semibold" style={{ color: PALETTE.unknown.fg }}>
            Checking systems...
          </p>
        </div>
      </section>
    );
  }

  if (error && !data) {
    return (
      <section
        className="rounded-[22px] border p-8"
        style={{ backgroundColor: PALETTE.unknown.tint, borderColor: PALETTE.unknown.ring }}
        aria-live="polite"
      >
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="inline-block h-4 w-4 rounded-full"
            style={{ backgroundColor: PALETTE.unknown.fg }}
          />
          <p className="text-2xl font-semibold" style={{ color: PALETTE.unknown.fg }}>
            Status unknown
          </p>
        </div>
        <p className="mt-3 text-sm text-muted">
          The status page could not reach its own probe endpoint. The
          Owlka services themselves may still be fine. Try again in a
          minute.
        </p>
      </section>
    );
  }

  if (!data) return null;

  const overall = PALETTE[data.overall];

  return (
    <>
      <section
        className="rounded-[22px] border p-8"
        style={{ backgroundColor: overall.tint, borderColor: overall.ring }}
        aria-live="polite"
      >
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="inline-block h-4 w-4 rounded-full"
            style={{ backgroundColor: overall.fg }}
          />
          <p className="text-2xl font-semibold" style={{ color: overall.fg }}>
            {HEADLINE[data.overall]}
          </p>
        </div>
        <p className="mt-3 text-sm text-muted">
          Last checked {formatTime(data.checked_at)}.
          {fetchedAt ? ` Next refresh in under a minute.` : null}
        </p>
      </section>

      <section className="mt-10 rounded-[22px] border border-border bg-surface">
        {data.components.map((c, i) => {
          const p = PALETTE[c.status];
          return (
            <div
              key={c.id}
              className={`flex items-start gap-4 p-6 ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="mt-1.5 inline-block h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: p.fg }}
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium">{c.name}</p>
                  <p
                    className="text-sm font-medium uppercase tracking-wide"
                    style={{ color: p.fg }}
                  >
                    {p.label}
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted">{c.detail}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Incidents</h2>

        {data.incidents.active.length === 0 && data.incidents.recent.length === 0 ? (
          <p className="mt-3 text-sm text-muted">
            No incidents in the last 7 days.
          </p>
        ) : null}

        {data.incidents.active.length > 0 ? (
          <div className="mt-4 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Active
            </h3>
            {data.incidents.active.map((i) => (
              <IncidentCard key={i.id} incident={i} />
            ))}
          </div>
        ) : null}

        {data.incidents.recent.length > 0 ? (
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Resolved in the last 7 days
            </h3>
            {data.incidents.recent.map((i) => (
              <IncidentCard key={i.id} incident={i} />
            ))}
          </div>
        ) : null}

        <p className="mt-6 text-xs text-muted">
          Last recorded incident: {formatRelative(data.incidents.last_incident_at)}.
        </p>
      </section>
    </>
  );
}

function IncidentCard({ incident }: { incident: Incident }) {
  const resolved = incident.status === "resolved";
  const tone = resolved ? PALETTE.ok : PALETTE.degraded;
  return (
    <article
      className="rounded-[18px] border p-5"
      style={{ borderColor: tone.ring, backgroundColor: tone.tint }}
    >
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="font-medium">{incident.title}</h4>
        <span
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: tone.fg }}
        >
          {incident.status}
        </span>
      </header>
      <p className="mt-1 text-xs text-muted">
        Started {formatTime(incident.started_at)}
        {incident.resolved_at
          ? `, resolved ${formatTime(incident.resolved_at)}`
          : null}
        .
      </p>
      {incident.updates.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {incident.updates.map((u, idx) => (
            <li key={idx} className="text-sm">
              <span className="text-muted">{formatTime(u.ts)}: </span>
              <span>{u.body}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
