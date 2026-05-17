"use client";

import { motion } from "framer-motion";
import { StepGraphic } from "./StepGraphic";

type Kind = "voice" | "review" | "memory" | "ship";

const steps: { n: string; title: string; body: string; kind: Kind }[] = [
  {
    n: "01",
    title: "Your Claude on your Mac.",
    body:
      "Owlka runs on your Mac. It launches the official Claude Code app under your own Anthropic login and keeps your code, your memory, and your work on your own machine. Nothing about your project lives on our servers.",
    kind: "ship",
  },
  {
    n: "02",
    title: "An encrypted middleman that can't read your messages.",
    body:
      "Your phone and your Mac talk through an encrypted middleman. We pass sealed messages back and forth. We can't open them. Only your phone and your Mac hold the keys, so the conversation stays between you and your Claude.",
    kind: "review",
  },
  {
    n: "03",
    title: "Your iPhone, your conversation.",
    body:
      "The Owlka iPhone app is the front seat. Talk by voice or type. Watch what Claude is doing live. Approve a change, kick off a build, or pause it from the sofa. Same conversation on every paired phone.",
    kind: "voice",
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
            Three pieces. One conversation.
          </h2>
          <p className="mt-5 text-lg text-text/70 leading-relaxed">
            Owlka runs Claude Code on your Mac, talks to your iPhone through
            an encrypted middleman, and keeps the work on your own machine.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
              <div className="flex flex-col gap-6">
                <div className="shrink-0 self-start transition-transform duration-500 group-hover:scale-[1.04] group-hover:-rotate-2">
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
