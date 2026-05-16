"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Open Owlka. Say what you want.",
    body:
      "Voice or thumbs. \"Build me a Klipper monitor.\" \"Make me a Streamlit app for the school's data.\" \"Set up a watcher that pings me when the BBC publishes the schedule.\" Plain English. No syntax.",
  },
  {
    n: "02",
    title: "Owlka writes, reviews, and ships.",
    body:
      "Claude Code does the engineering. An automated reviewer challenges the diff before it lands. Environment protection blocks anything that could brick your machine. You watch it happen, or you don't — it works either way.",
  },
  {
    n: "03",
    title: "It remembers everything.",
    body:
      "Persistent cross-session memory means Owlka knows what you're building, who you are, and what you decided last Tuesday. Pick up six weeks later with one sentence and it's right back in context.",
  },
  {
    n: "04",
    title: "From sofa to App Store.",
    body:
      "Sign it, ship it, deploy it. iOS apps, websites, Python services, hardware monitors, scheduled jobs. The same phone that scrolls TikTok ships production software.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-32 sm:py-40 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">
            How it works
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            Four steps. Zero terminal.
          </h2>
          <p className="mt-5 text-lg text-text/70 leading-relaxed">
            Owlka wraps Claude Code in everything a non-engineer needs to ship
            real software from a phone.
          </p>
        </div>

        <ol className="space-y-4">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex gap-6 sm:gap-10 p-8 sm:p-10 rounded-card bg-bg border border-border hover:border-mark/40 transition-colors"
            >
              <span
                className="text-mark font-mono text-base font-medium shrink-0 mt-1"
                aria-hidden
              >
                {s.n}
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] text-text/75 leading-relaxed max-w-2xl">
                  {s.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
