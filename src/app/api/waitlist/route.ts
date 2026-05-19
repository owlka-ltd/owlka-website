// Waitlist capture route.
//
// Accepts POST { email, firstName, lastName, source? }, validates
// shape, rate-limits per-IP (4 req / 60s), then forwards the row to
// a Google Apps Script web app whose URL lives in
// WAITLIST_SHEET_WEBHOOK.
//
// If the env var is unset the route returns { ok: true, mode: "no-op" }
// so a deploy without the secret still functions (Tim sets the URL after
// the Apps Script is published).
//
// Rate-limit state is an in-memory Map keyed by client IP. Per-instance
// only (good enough for a small waitlist) — survives within a warm
// serverless container and resets on cold start.

import { NextResponse } from "next/server";
import { isValidEmail, isValidName, RateLimiter } from "@/lib/waitlist";

const limiter = new RateLimiter();

// ──────────────────────────────────────────────────────────────────────
// IP extraction
// ──────────────────────────────────────────────────────────────────────

function clientIp(request: Request): string {
  // Vercel sets `x-vercel-forwarded-for` from its own edge, which a
  // client cannot forge — prefer it. Fall back to the conventional
  // `x-forwarded-for` (leftmost = original client) for non-Vercel
  // hosts and finally to `x-real-ip`.
  const vercel = request.headers.get("x-vercel-forwarded-for");
  if (vercel) {
    const first = vercel.split(",")[0]?.trim();
    if (first) return first;
  }
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

// ──────────────────────────────────────────────────────────────────────
// Handler
// ──────────────────────────────────────────────────────────────────────

// All four fields are `unknown` because the request body is untrusted
// JSON. `email`, `firstName`, `lastName` are required at runtime
// (validated below); `source` is the only genuinely optional field
// and defaults to "owlka.com" if missing.
type WaitlistBody = {
  email?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  source?: unknown;
};

export async function POST(request: Request): Promise<NextResponse> {
  // Rate limit first — cheap, before parsing or env work.
  const ip = clientIp(request);
  // Cheap occasional GC of the rate-limiter Map so it never grows past
  // "keys with hits in the current window" on a long-lived warm
  // serverless instance.
  if (Math.random() < 0.01) limiter.prune();
  // If we couldn't identify the client (no Vercel header, no x-forwarded-for,
  // no x-real-ip), skip rate-limiting rather than lumping every unknown
  // caller into one shared "unknown" bucket — one bad actor without
  // headers would otherwise block everyone else who hits that path.
  if (ip !== "unknown" && !limiter.check(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let body: WaitlistBody;
  try {
    body = (await request.json()) as WaitlistBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  if (!isValidEmail(body.email)) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 },
    );
  }
  if (!isValidName(body.firstName)) {
    return NextResponse.json(
      { ok: false, error: "invalid_first_name" },
      { status: 400 },
    );
  }
  if (!isValidName(body.lastName)) {
    return NextResponse.json(
      { ok: false, error: "invalid_last_name" },
      { status: 400 },
    );
  }

  const email = (body.email as string).trim();
  const firstName = (body.firstName as string).trim();
  const lastName = (body.lastName as string).trim();
  const source =
    typeof body.source === "string" && body.source.trim()
      ? body.source.trim()
      : "owlka.com";

  const row = {
    timestamp: new Date().toISOString(),
    email,
    firstName,
    lastName,
    source,
  };

  const webhook = process.env.WAITLIST_SHEET_WEBHOOK;
  if (!webhook) {
    console.log("[waitlist] no webhook configured, accepting no-op", {
      email,
      source,
    });
    return NextResponse.json({ ok: true, mode: "no-op" }, { status: 200 });
  }

  try {
    const upstream = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
      // Apps Script can be slow on cold start; cap at 10s.
      signal: AbortSignal.timeout(10_000),
    });
    if (!upstream.ok) {
      console.error("[waitlist] upstream non-ok", upstream.status);
      return NextResponse.json(
        { ok: false, error: "upstream_failed" },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[waitlist] upstream threw", err);
    return NextResponse.json(
      { ok: false, error: "upstream_unreachable" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
