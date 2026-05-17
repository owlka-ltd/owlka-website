import { NextResponse } from "next/server";
import { createHash, randomBytes } from "node:crypto";
import { Resend } from "resend";
import Stripe from "stripe";

/**
 * POST /api/stripe/webhook
 *
 * Stripe webhook landing for Owlka Pro (Tier B). Behaviour by event type:
 *
 *   checkout.session.completed:
 *     1. Generate a 16-char base32 voucher (80 bits of entropy).
 *     2. POST { hash, tenant_id, status: "issued" } to the conv-server
 *        recorder at conv.owlka.com/internal/voucher-record, which
 *        appends one JSONL line to the private owlka-vouchers ledger.
 *        Plaintext voucher never lands on the Mac Mini.
 *     3. Email the plaintext voucher to the customer via Resend.
 *
 *   any other event type:
 *     200 { received: true }. Never raise — Stripe retries every 5xx,
 *     so silent ack is correct for events we don't yet handle.
 *
 *   bad signature:
 *     400. Stripe will not retry; surface the diagnostic in the dashboard.
 *
 *   missing config (STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET):
 *     503. Distinct from 400 so Stripe dashboard retries surface the
 *     correct cause.
 *
 * Stripe requires the raw request body for signature verification, so we
 * read req.text() (NOT req.json()) before handing the payload to
 * stripe.webhooks.constructEvent.
 *
 * Tier B foundations -- DO NOT enable in prod until master key rotation
 * flow exists. The Stripe Dashboard webhook endpoint must stay
 * unconfigured until then (see .env.example WARNING block above
 * STRIPE_WEBHOOK_SECRET).
 */

export const dynamic = "force-dynamic";

const VOUCHER_RAW_BYTES = 10;
const VOUCHER_LENGTH = 16;
// RFC 4648 base32 alphabet. Used to encode the 80-bit voucher.
const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
}

function generateVoucher(): string {
  // Encode 10 random bytes as base32 (no padding) -> 16 chars exactly.
  // Hand-rolled rather than pulling in another dependency for one call.
  const raw = randomBytes(VOUCHER_RAW_BYTES);
  let bits = 0;
  let buffer = 0;
  let out = "";
  for (const byte of raw) {
    buffer = (buffer << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      bits -= 5;
      const idx = (buffer >> bits) & 0x1f;
      out += BASE32_ALPHABET[idx];
    }
  }
  if (bits > 0) {
    out += BASE32_ALPHABET[(buffer << (5 - bits)) & 0x1f];
  }
  if (out.length !== VOUCHER_LENGTH) {
    throw new Error(
      `voucher generator produced ${out.length} chars, expected ${VOUCHER_LENGTH}`
    );
  }
  return out;
}

function hashVoucher(voucher: string): string {
  return createHash("sha256").update(voucher, "utf8").digest("hex");
}

type RecordOutcome =
  | { kind: "appended" }
  | { kind: "replay"; priorHash: string | null }
  | { kind: "hash_collision"; status: number; body: string }
  | { kind: "transport_error"; error: string };

async function recordVoucher(
  hash: string,
  tenantId: string,
  status: "issued" | "redeemed" | "revoked",
  stripeEventId: string
): Promise<RecordOutcome> {
  const recorderUrl =
    process.env.VOUCHER_RECORDER_URL ??
    "https://conv.owlka.com/internal/voucher-record";
  const recorderToken = process.env.VOUCHER_RECORDER_TOKEN;
  if (!recorderToken) {
    return { kind: "transport_error", error: "VOUCHER_RECORDER_TOKEN not set" };
  }
  // 10s timeout: the recorder is a single-disk-write Flask handler on the
  // Mac Mini behind cloudflared. Anything longer means something is wrong;
  // Stripe retries failures so we'd rather surface fast than block.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const resp = await fetch(recorderUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${recorderToken}`,
      },
      body: JSON.stringify({
        hash,
        tenant_id: tenantId,
        status,
        stripe_event_id: stripeEventId,
      }),
      signal: controller.signal,
    });
    if (resp.status === 200) {
      // The recorder distinguishes a fresh append from a replay-of-the-
      // same-event by an optional `duplicate: true` field. Replay means
      // the customer already received a voucher on the prior delivery
      // attempt; we must NOT mint or email a new one.
      const body = (await resp.json().catch(() => ({}))) as {
        ok?: boolean;
        duplicate?: boolean;
        hash?: string | null;
      };
      if (body.duplicate === true) {
        return { kind: "replay", priorHash: body.hash ?? null };
      }
      return { kind: "appended" };
    }
    const text = await resp.text();
    if (resp.status === 409) {
      // Conflict on hash WITHOUT a matching event id. Either an upstream
      // bug or a 2^-80 collision. Either way, surface to ops -- a retry
      // would just collide again.
      return { kind: "hash_collision", status: 409, body: text.slice(0, 200) };
    }
    return {
      kind: "transport_error",
      error: `recorder ${resp.status}: ${text.slice(0, 200)}`,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "recorder request failed";
    return { kind: "transport_error", error: msg };
  } finally {
    clearTimeout(timeout);
  }
}

async function emailVoucher(toEmail: string, voucher: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[stripe/webhook] RESEND_API_KEY missing — cannot email voucher");
    return;
  }
  const fromAddr = process.env.VOUCHER_FROM_EMAIL ?? "Owlka <noreply@owlka.com>";
  const text = [
    `Thanks for subscribing to Owlka Pro.`,
    ``,
    `Your voucher code is:`,
    ``,
    `    ${voucher}`,
    ``,
    `Enter this code inside the Owlka app to activate Pro on your account.`,
    `Keep it somewhere safe -- this email is the only place the full code is stored.`,
    ``,
    `If you have any trouble, reply to this email.`,
    ``,
    `-- Owlka`,
  ].join("\n");
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; color: #111;">
      <p>Thanks for subscribing to <strong>Owlka Pro</strong>.</p>
      <p>Your voucher code is:</p>
      <pre style="background: #f4f4f7; padding: 16px; border-radius: 8px; font-size: 18px; letter-spacing: 2px; text-align: center;">${voucher}</pre>
      <p>Enter this code inside the Owlka app to activate Pro on your account. Keep it somewhere safe &mdash; this email is the only place the full code is stored.</p>
      <p>If you have any trouble, reply to this email.</p>
      <p style="color: #666; font-size: 13px; margin-top: 32px;">&mdash; Owlka</p>
    </div>
  `.trim();
  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: fromAddr,
      to: toEmail,
      subject: "Your Owlka voucher",
      text,
      html,
    });
  } catch (err) {
    // We log but don't throw: the voucher is already recorded in the
    // ledger, and Stripe will retry the webhook if we return 5xx, which
    // would cause double-recording on the next pass. The customer-support
    // recovery path is "search the ledger for this customer's tenant_id,
    // regenerate the voucher, resend manually" -- documented in
    // owlka-vouchers/README.md.
    console.error("[stripe/webhook] resend send failed:", err);
  }
}

function tenantIdFromSession(session: Stripe.Checkout.Session): string {
  // We don't yet have a real Owlka account-id at checkout time (signup
  // happens in-app after voucher redemption). Use the Stripe customer id
  // when present, falling back to the checkout-session id. Either way the
  // value is opaque, stable, and lets support trace back to the Stripe
  // record.
  if (typeof session.customer === "string" && session.customer) {
    return `stripe_customer:${session.customer}`;
  }
  return `stripe_checkout_session:${session.id}`;
}

function customerEmailFromSession(
  session: Stripe.Checkout.Session
): string | null {
  if (session.customer_details?.email) return session.customer_details.email;
  if (session.customer_email) return session.customer_email;
  return null;
}

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !secret) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured on this deployment." },
      { status: 503 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe-Signature header." },
      { status: 400 }
    );
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "signature error";
    console.error("[stripe/webhook] signature verification failed:", message);
    return NextResponse.json(
      { error: "Invalid Stripe signature." },
      { status: 400 }
    );
  }

  console.log("[stripe/webhook]", {
    type: event.type,
    id: event.id,
    livemode: event.livemode,
    created: event.created,
  });

  if (event.type !== "checkout.session.completed") {
    // Silent ack for every other event type. Real handling for
    // customer.subscription.deleted / invoice.payment_failed lands in a
    // later PR (gated by the [WARNING] block in .env.example).
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const customerEmail = customerEmailFromSession(session);
  if (!customerEmail) {
    // Without an email we can't deliver the voucher. Log loudly, ack 200
    // so Stripe doesn't retry forever; this becomes a support-flow ticket.
    console.error("[stripe/webhook] no customer email on session", session.id);
    return NextResponse.json({ received: true, warning: "no_customer_email" });
  }

  const tenantId = tenantIdFromSession(session);
  const voucher = generateVoucher();
  const hash = hashVoucher(voucher);

  const outcome = await recordVoucher(hash, tenantId, "issued", event.id);

  switch (outcome.kind) {
    case "appended": {
      // First successful delivery for this Stripe event. Email the
      // plaintext voucher now. Email failure is logged but does NOT
      // cause us to 500: a retry would mint a fresh voucher (because
      // generateVoucher is random per attempt), and event-id dedupe
      // on the recorder would return replay -> we still wouldn't email.
      // The recovery path for a post-record email failure is therefore
      // manual: ops marks the original hash status="revoked", issues a
      // fresh voucher, and emails it. Documented in owlka-vouchers
      // README. This is a known sharp edge of Tier B foundations.
      await emailVoucher(customerEmail, voucher);
      return NextResponse.json({ received: true, issued: true });
    }
    case "replay": {
      // Stripe redelivered an event we've already provisioned. The
      // customer already has their voucher from the previous delivery.
      // Acknowledge 200; do not email a new one (we don't even know the
      // plaintext of the original).
      console.log(
        "[stripe/webhook] replay event=%s session=%s prior_hash=%s",
        event.id,
        session.id,
        outcome.priorHash ? outcome.priorHash.slice(0, 12) + "…" : "?"
      );
      return NextResponse.json({ received: true, replay: true });
    }
    case "hash_collision": {
      // 2^-80 collision or upstream bug. Either way, retrying with the
      // SAME random voucher won't help (it'll regenerate to a new hash
      // on the retry, hitting either appended or another collision).
      // Acknowledge 200 with a warning so Stripe stops retrying; the
      // recorder logged a warning that ops will see.
      console.error(
        "[stripe/webhook] hash collision event=%s session=%s status=%s body=%s",
        event.id,
        session.id,
        outcome.status,
        outcome.body
      );
      return NextResponse.json({ received: true, warning: "hash_collision" });
    }
    case "transport_error": {
      // Network failure or recorder 5xx. Return 500 so Stripe retries.
      // The next delivery will be deduped by event id if the prior
      // append actually landed, or will append cleanly if it didn't.
      console.error(
        "[stripe/webhook] recorder transport error event=%s session=%s err=%s",
        event.id,
        session.id,
        outcome.error
      );
      return NextResponse.json(
        { error: "voucher recorder unavailable" },
        { status: 500 }
      );
    }
  }
}
