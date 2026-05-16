"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const tiers = [
  {
    name: "Hobbyist",
    price: "Free",
    cadence: "during beta",
    body: "Everything you need to ship side projects. Bring your own Claude subscription.",
    features: [
      "Full Owlka app",
      "Persistent memory",
      "Code reviewer",
      "Environment protection",
    ],
    cta: "Join the waitlist",
    href: "#waitlist",
    featured: false,
  },
  {
    name: "Pro",
    price: "TBA",
    cadence: "launching soon",
    body: "For people who ship every week. Priority models, longer memory, faster reviewers.",
    features: [
      "Everything in Hobbyist",
      "Longer memory window",
      "Multi-project workspace",
      "Priority compute",
      "Email support",
    ],
    cta: "Join the waitlist",
    href: "#waitlist",
    featured: true,
  },
  {
    name: "Team",
    price: "TBA",
    cadence: "launching soon",
    body: "For founders and small teams building real products together.",
    features: [
      "Everything in Pro",
      "Shared memory",
      "Team review policies",
      "SSO",
      "Dedicated support",
    ],
    cta: "Talk to us",
    href: "#waitlist",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 sm:py-40 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">
            Pricing
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            Free while we're in beta.
          </h2>
          <p className="mt-5 text-lg text-text/70 leading-relaxed">
            Final pricing locks before public launch. Waitlist members get
            grandfathered into early-access rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
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
              <Link
                href={t.href}
                className={`mt-10 inline-flex w-full items-center justify-center h-11 px-5 rounded-pill text-sm font-medium transition ${
                  t.featured
                    ? "bg-surface text-mark hover:opacity-90"
                    : "bg-mark text-surface hover:opacity-90"
                }`}
              >
                {t.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
