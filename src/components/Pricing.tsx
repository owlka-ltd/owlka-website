"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

type Tier = {
  id: "free" | "pro";
  name: string;
  price: string;
  cadence: string;
  body: string;
  features: string[];
  limitations?: string[];
  featured: boolean;
  cta: string;
  /**
   * If `href` is set the CTA renders as a link. If `action` is "stripe",
   * the CTA POSTs to /api/stripe/checkout and redirects to the returned
   * Stripe-hosted Checkout URL.
   */
  href?: string;
  action?: "stripe";
};

const tiers: Tier[] = [
  {
    id: "free",
    name: "Tier A — Free",
    price: "Free",
    cadence: "BYO Claude",
    body: "Bring your own Anthropic Pro or Max subscription. Owlka takes nothing — you pay Anthropic, we wrap your Claude in a powerful iPhone experience.",
    features: [
      "Full Owlka iPhone app",
      "Connect with your Anthropic OAuth",
      "Persistent on-device memory",
      "Code reviewer",
      "Environment protection",
    ],
    limitations: [
      "One iOS device per Apple ID",
      "No Mac companion (coming Phase 8)",
      "No skills marketplace (coming post-launch)",
    ],
    featured: false,
    cta: "Join the waitlist",
    href: "#waitlist",
  },
  {
    id: "pro",
    name: "Tier B — Owlka Pro",
    price: "£5",
    cadence: "per month",
    body: "Everything in Free, plus Mac companion app, home bridge access, priority support, and the future skills marketplace.",
    features: [
      "Everything in Tier A",
      "Mac companion app",
      "Home bridge access (work on your own machine, anywhere)",
      "Priority support",
      "Future skills marketplace",
    ],
    featured: true,
    cta: "Start with Pro",
    action: "stripe",
  },
];

export function Pricing() {
  const [loadingTier, setLoadingTier] = useState<Tier["id"] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function startStripeCheckout(tierId: Tier["id"]) {
    setError(null);
    setLoadingTier(tierId);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Checkout unavailable. Try again shortly.");
      }
      window.location.assign(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
      setLoadingTier(null);
    }
  }

  return (
    <section id="pricing" className="relative py-32 sm:py-40 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">
            Pricing
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            Two ways to use Owlka.
          </h2>
          <p className="mt-5 text-lg text-text/70 leading-relaxed">
            Use your existing Claude subscription for free, or unlock the
            Mac companion and bridge with Owlka Pro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl">
          {tiers.map((t, i) => {
            const isLoading = loadingTier === t.id;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative p-8 sm:p-10 rounded-card border ${
                  t.featured
                    ? "bg-mark text-surface border-mark shadow-2xl shadow-mark/20 md:scale-[1.02]"
                    : "bg-bg border-border"
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-8 inline-flex h-6 px-3 items-center rounded-pill bg-surface text-mark text-[11px] font-semibold uppercase tracking-wider">
                    Most popular
                  </span>
                )}
                <h3
                  className={`text-xl font-semibold ${
                    t.featured ? "text-surface" : ""
                  }`}
                >
                  {t.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span
                    className={`text-4xl font-semibold tracking-tight ${
                      t.featured ? "text-surface" : ""
                    }`}
                  >
                    {t.price}
                  </span>
                  <span
                    className={`text-sm ${
                      t.featured ? "text-surface/70" : "text-muted"
                    }`}
                  >
                    {t.cadence}
                  </span>
                </div>
                <p
                  className={`mt-4 text-[15px] leading-relaxed ${
                    t.featured ? "text-surface/85" : "text-text/75"
                  }`}
                >
                  {t.body}
                </p>

                <ul
                  className={`mt-8 space-y-3 text-sm ${
                    t.featured ? "text-surface/90" : "text-text/80"
                  }`}
                >
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2.5 items-start">
                      <span
                        className={`mt-1.5 inline-block w-1.5 h-1.5 rounded-full shrink-0 ${
                          t.featured ? "bg-surface" : "bg-mark"
                        }`}
                        aria-hidden
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {t.limitations && t.limitations.length > 0 && (
                  <div className="mt-7 pt-6 border-t border-border/70">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                      Limitations
                    </p>
                    <ul className="space-y-2 text-sm text-text/65">
                      {t.limitations.map((l) => (
                        <li key={l} className="flex gap-2.5 items-start">
                          <span
                            aria-hidden
                            className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full shrink-0 bg-muted"
                          />
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {t.action === "stripe" ? (
                  <button
                    type="button"
                    onClick={() => startStripeCheckout(t.id)}
                    disabled={isLoading}
                    className={`mt-10 inline-flex w-full items-center justify-center h-11 px-5 rounded-pill text-sm font-medium transition disabled:opacity-60 ${
                      t.featured
                        ? "bg-surface text-mark hover:opacity-90"
                        : "bg-mark text-surface hover:opacity-90"
                    }`}
                  >
                    {isLoading ? "Redirecting…" : t.cta}
                  </button>
                ) : (
                  <Link
                    href={t.href ?? "#waitlist"}
                    className={`mt-10 inline-flex w-full items-center justify-center h-11 px-5 rounded-pill text-sm font-medium transition ${
                      t.featured
                        ? "bg-surface text-mark hover:opacity-90"
                        : "bg-mark text-surface hover:opacity-90"
                    }`}
                  >
                    {t.cta}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {error && (
          <p
            role="alert"
            className="mt-6 text-sm text-mark max-w-5xl"
          >
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
