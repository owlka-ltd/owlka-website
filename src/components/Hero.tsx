"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { OwlkaMark } from "./OwlkaMark";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, var(--color-tint-mark) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-6 pt-24 pb-32 sm:pt-32 sm:pb-40 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-10"
        >
          <OwlkaMark className="w-28 h-28 sm:w-32 sm:h-32 mx-auto" transparent />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05]"
        >
          The full power of Claude Code.
          <br />
          <span className="text-mark">On your phone.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-text/70 leading-relaxed"
        >
          Build websites, build apps, set up persistent monitoring, connect to
          APIs and databases. Do anything a developer could do, all from the
          comfort of your sofa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="#waitlist"
            className="inline-flex items-center justify-center h-12 px-7 rounded-pill bg-mark text-surface text-base font-medium hover:opacity-90 transition-opacity"
          >
            Join the waitlist
          </Link>
          <Link
            href="#how"
            className="inline-flex items-center justify-center h-12 px-7 rounded-pill border border-border text-base font-medium hover:bg-tint-mark/40 transition-colors"
          >
            See how it works
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 text-sm text-muted"
        >
          Persistent cross-session memory · Automated code reviewers ·
          Environment protection
        </motion.p>
      </div>
    </section>
  );
}
