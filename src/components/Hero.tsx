"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AuroraBackground } from "./AuroraBackground";
import { OwlkaConversation } from "./OwlkaConversation";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <AuroraBackground intensity="vivid" />

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 sm:pt-20 sm:pb-32 lg:pt-24 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
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

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-[5.25rem] font-semibold tracking-tight leading-[1.02]"
            >
              The full power of Claude Code.
              <br />
              <span className="bg-gradient-to-r from-mark to-[#ff5e9d] bg-clip-text text-transparent">
                On your phone.
              </span>
            </motion.h1>

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
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-4 lg:mt-0"
          >
            <OwlkaConversation />
          </motion.div>
        </div>
      </div>
    </section>
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
