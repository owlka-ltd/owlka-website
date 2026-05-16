"use client";

import { motion } from "framer-motion";
import { StepGraphic } from "./StepGraphic";

type Kind = "voice" | "review" | "memory" | "ship";

const steps: { n: string; title: string; body: string; kind: Kind }[] = [
  {
    n: "01",
    title: "Open Owlka. Say what you want.",
    body:
      "Voice or thumbs. \"Build me a Klipper monitor.\" \"Make me a Streamlit app for the school's data.\" \"Set up a watcher that pings me when the BBC publishes the schedule.\" Plain English. No syntax.",
    kind: "voice",
  },
  {
    n: "02",
    title: "Owlka writes, reviews, and ships.",
    body:
      "Claude Code does the engineering. An automated reviewer challenges the diff before it lands. Environment protection blocks anything that could brick your machine. You watch it happen, or you don't — it works either way.",
    kind: "review",
  },
  {
    n: "03",
    title: "It remembers everything.",
    body:
      "Persistent cross-session memory means Owlka knows what you're building, who you are, and what you decided last Tuesday. Pick up six weeks later with one sentence and it's right back in context.",
    kind: "memory",
  },
  {
    n: "04",
    title: "From sofa to App Store.",
    body:
      "Sign it, ship it, deploy it. iOS apps, websites, Python services, hardware monitors, scheduled jobs. The same phone that scrolls TikTok ships production software.",
    kind: "ship",
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

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative p-8 sm:p-10 rounded-card bg-bg border border-border hover:border-mark/40 hover:shadow-xl hover:shadow-mark/10 transition-all group overflow-hidden"
            >
              <div className="flex items-start gap-6 sm:gap-8">
                <div className="shrink-0 transition-transform duration-500 group-hover:scale-[1.04] group-hover:-rotate-2">
                  <StepGraphic kind={s.kind} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="font-mono text-xs font-bold text-mark tracking-wider">
                      STEP {s.n}
                    </span>
                    <span className="h-px w-8 bg-mark/40" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-text/75 leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
