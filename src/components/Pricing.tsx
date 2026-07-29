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
            30 days free. Then £4.99 a month.
          </h2>
          <p className="mt-5 text-lg text-text/70 leading-relaxed">
            No payment details needed to start, so nothing can charge you when
            the trial ends. One plan with every feature included, and one
            account covers two phones and two computers.
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
              Owlka
            </span>

            <h3 className="text-xl font-semibold text-surface">Owlka</h3>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-semibold tracking-tight text-surface">
                £4.99
              </span>
              <span className="text-sm text-surface/70">
                per month, or £49.99 per year
              </span>
            </div>
            <div className="mt-1 text-sm text-surface/70 space-y-1">
              <p>Your first 30 days are free. No card needed to start.</p>
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-surface/85">
              One plan, everything included. The Owlka desktop app, the Owlka
              iPhone app, the encrypted relay between them, and persistent
              on-device memory. Use your own Claude Pro or Max login on your
              computer for the underlying model.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-surface/90">
              {[
                "Owlka for Mac and Windows",
                "Owlka for iPhone",
                "One account covers two phones and two computers",
                "Persistent cross-session memory on your computer",
                "Automated code reviewer",
                "Guardrails that ask before risky actions",
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
              Start your free 30 days
            </Link>

            <p className="mt-4 text-xs text-surface/70 text-center">
              Payment happens on this website, never inside the iPhone app.{" "}
              <Link href="/pricing" className="underline hover:opacity-90">
                Full pricing details
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
