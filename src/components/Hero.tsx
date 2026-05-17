"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AuroraBackground } from "./AuroraBackground";
import { DeviceFrame } from "./DeviceFrame";
import { OwlkaSessionScreen } from "./OwlkaSessionScreen";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <AuroraBackground intensity="vivid" />

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 sm:pt-20 sm:pb-32 lg:pt-24 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 inline-flex items-center gap-2.5 h-8 pl-2.5 pr-4 rounded-pill bg-surface/80 border border-border backdrop-blur-md text-xs font-medium tracking-wide"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-mark animate-pulse-dot" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mark" />
              </span>
              <span className="uppercase text-mark">Coming soon</span>
              <span className="text-text/50">·</span>
              <span className="text-text/80">Join the waitlist</span>
            </motion.div>

            {/* H1 is the LCP element. Render it visible immediately (no
                opacity-0 initial state) so it paints on first frame instead
                of waiting for Framer Motion to mount and run the animation.
                Removed initial/animate/transition props that previously
                cost ~1s of LCP element-render-delay on mobile. */}
            <h1 className="text-5xl sm:text-6xl lg:text-[5.25rem] font-semibold tracking-tight leading-[1.02]">
              The full power of Claude Code.
              <br />
              <span className="bg-gradient-to-r from-mark to-[#ff5e9d] bg-clip-text text-transparent">
                On your phone.
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl mx-auto lg:mx-0 text-lg sm:text-xl text-text/70 leading-relaxed"
            >
              Build websites, build apps, set up persistent monitoring, connect
              to APIs and databases. Do anything a developer could do, all from
              the comfort of your sofa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link
                href="#waitlist"
                className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-pill bg-mark text-surface text-base font-medium hover:opacity-90 transition-all shadow-lg shadow-mark/30 hover:shadow-xl hover:shadow-mark/40 hover:-translate-y-0.5"
              >
                Join the waitlist
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="#examples"
                className="inline-flex items-center justify-center h-12 px-7 rounded-pill bg-surface/80 backdrop-blur-md border border-border text-base font-medium hover:border-mark/40 hover:bg-surface transition-colors"
              >
                See what people built
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-12 flex flex-wrap gap-x-6 gap-y-3 justify-center lg:justify-start items-center text-sm text-muted"
            >
              <span className="inline-flex items-center gap-1.5">
                <Check /> Persistent memory
              </span>
              <span className="hidden sm:inline text-border">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Check /> Reviewer agents
              </span>
              <span className="hidden sm:inline text-border">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Check /> Environment safe
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-4 lg:mt-0"
          >
            {/* glow halo behind device */}
            <div
              aria-hidden
              className="absolute inset-0 -m-12 rounded-[60px] blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,45,122,0.35), transparent 70%)",
              }}
            />

            <div className="relative mx-auto max-w-[300px] sm:max-w-[330px] @container">
              <DeviceFrame>
                <OwlkaSessionScreen />
              </DeviceFrame>
            </div>

            <FloatingCard
              className="absolute top-[6%] -left-2 sm:-left-12 scale-90 sm:scale-100 origin-left"
              delay={0.9}
            >
              <span className="flex h-2 w-2 rounded-full bg-mark animate-pulse-dot" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-mark">
                Memory
              </span>
              <span className="text-xs font-medium text-text/80">
                47 sessions
              </span>
            </FloatingCard>

            <FloatingCard
              className="absolute bottom-[16%] -right-2 sm:-right-10 scale-90 sm:scale-100 origin-right"
              delay={1.1}
            >
              <svg
                viewBox="0 0 16 16"
                className="w-3.5 h-3.5 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                aria-hidden
              >
                <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-green-700">
                Reviewer
              </span>
              <span className="text-xs font-medium text-text/80">APPROVE</span>
            </FloatingCard>

            <FloatingCard
              className="absolute top-[44%] -left-3 sm:-left-16 scale-90 sm:scale-100 origin-left"
              delay={1.3}
            >
              <svg
                viewBox="0 0 16 16"
                className="w-3.5 h-3.5 text-mark"
                fill="currentColor"
                aria-hidden
              >
                <path d="M8 1.5a4 4 0 0 0-4 4v3.5l-1.5 2v1h11v-1l-1.5-2V5.5a4 4 0 0 0-4-4Z" />
                <path d="M6 13h4a2 2 0 0 1-4 0Z" />
              </svg>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-mark">
                Push
              </span>
              <span className="text-xs font-medium text-text/80">
                Build green
              </span>
            </FloatingCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center gap-2 h-9 px-3.5 rounded-pill bg-surface/95 backdrop-blur-md border border-border shadow-xl shadow-black/5 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Check() {
  return (
    <svg
      className="w-3.5 h-3.5 text-mark"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 8.5l3 3 7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
