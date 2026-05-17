"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 sm:py-40 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">
            Pricing
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            Free for 30 days. Then £9.99 a month.
          </h2>
          <p className="mt-5 text-lg text-text/70 leading-relaxed">
            One simple price, billed by Apple. No tiers, no usage meters, no
            credit card forms on this site.
          </p>
        </div>

        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-8 sm:p-10 rounded-card border bg-mark text-surface border-mark shadow-2xl shadow-mark/20"
          >
            <span className="absolute -top-3 left-8 inline-flex h-6 px-3 items-center rounded-pill bg-surface text-mark text-[11px] font-semibold uppercase tracking-wider">
              30-day free trial
            </span>

            <h3 className="text-xl font-semibold text-surface">Owlka</h3>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-semibold tracking-tight text-surface">
                £9.99
              </span>
              <span className="text-sm text-surface/70">/month</span>
            </div>
            <div className="mt-1 text-sm text-surface/70 space-y-1">
              <p>VAT included. Billed monthly through the App Store.</p>
              <p>Free for the first 30 days. Cancel anytime in Settings.</p>
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-surface/85">
              One subscription covers the Owlka Mac app and the Owlka iPhone
              app. Use your own Claude Pro or Max login on the Mac for the
              underlying model.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-surface/90">
              {[
                "Owlka for Mac",
                "Owlka for iPhone (pair as many phones as you like)",
                "Persistent cross-session memory on your Mac",
                "Automated code reviewer",
                "Environment protection",
                "Owl mode for overnight work",
              ].map((f) => (
                <li key={f} className="flex gap-2.5 items-start">
                  <span
                    aria-hidden
                    className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full shrink-0 bg-surface"
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/download"
              className="mt-10 inline-flex w-full items-center justify-center h-11 px-5 rounded-pill text-sm font-medium transition bg-surface text-mark hover:opacity-90"
            >
              Download for Mac
            </Link>

            <p className="mt-4 text-xs text-surface/70 text-center">
              You only need an Anthropic account for Claude itself. We charge
              for the Owlka wrapper, not for Claude.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
