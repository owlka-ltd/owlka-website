import { NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * POST /api/stripe/webhook
 *
 * Stub handler — validates the Stripe signature, parses the event,
 * and logs to console. Real subscription provisioning, dunning, and
 * account state machine arrive in a follow-up PR.
 *
 * Stripe requires the raw request body for signature verification, so
 * this route reads `req.text()` (NOT `req.json()`) before handing the
 * payload to `stripe.webhooks.constructEvent`.
 */

export const dynamic = "force-dynamic";

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
}

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !secret) {
    // 503 — explicitly distinguish "not configured" from "signature bad"
    // so Stripe's dashboard retries surface the right diagnostic.
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

  // Raw body is required; do not parse as JSON first.
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

  // Stub: log structured event metadata, ack with 200.
  // A real handler will switch on event.type and persist state.
  console.log("[stripe/webhook]", {
    type: event.type,
    id: event.id,
    livemode: event.livemode,
    created: event.created,
  });

  return NextResponse.json({ received: true });
}
