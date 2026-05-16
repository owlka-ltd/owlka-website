import { NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * POST /api/stripe/checkout
 *
 * Creates a Stripe Checkout Session for Owlka Pro (Tier B, £5/month).
 * Hosted Checkout only — no embedded form. Returns `{ url }` for the
 * client to redirect to.
 *
 * Mode: TEST until Tim swaps `STRIPE_SECRET_KEY` to a `sk_live_…` value
 * the morning of submission. The handler does not differentiate; live
 * mode is selected purely by the key.
 *
 * Webhook stub at /api/stripe/webhook validates the signature using
 * STRIPE_WEBHOOK_SECRET and logs to console. Real subscription logic
 * (provisioning, account flips, dunning) lands in a later PR.
 */

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  // Pin a known-good API version. Stripe's TS types expect a literal,
  // and pinning prevents silent breakage when their default changes.
  return new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
}

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured on this deployment." },
      { status: 503 }
    );
  }

  const priceId = process.env.STRIPE_PRO_PRICE_ID;
  if (!priceId) {
    return NextResponse.json(
      { error: "Stripe price not configured." },
      { status: 503 }
    );
  }

  // Build success/cancel URLs from the request origin so this works
  // identically on owlka.com, preview deploys, and localhost.
  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://owlka.com";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancelled`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe returned no checkout URL." },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Stripe error";
    console.error("[stripe/checkout] failed:", message);
    return NextResponse.json(
      { error: "Unable to start checkout. Try again shortly." },
      { status: 500 }
    );
  }
}
