"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Persistent cross-session memory",
    body:
      "Owlka remembers what you're building across days, weeks, and reinstalls. Memory lives on your Mac, not on our servers. Resume any project with one sentence.",
    span: "md:col-span-2",
    tone: "mark",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: "Automated code reviewers",
    body:
      "Every change is challenged by a reviewer agent before it lands. Catches the bugs you would never have seen.",
    span: "",
    tone: "surface",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6h16M4 12h10M4 18h16" strokeLinecap="round" />
        <circle cx="18" cy="12" r="3" />
        <path d="m16.5 12 1.2 1.2 2.3-2.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Environment protection",
    body:
      "Anything that could damage your Mac stops and asks. You tap once on your phone to allow it. You cannot brick your machine by accident.",
    span: "",
    tone: "surface",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Owl mode for long jobs",
    body:
      "Hand Owlka a brief and walk away. It works overnight, posts a Live Activity to your lock screen when it's done, and only wakes you for decisions that need a human.",
    span: "md:col-span-2",
    tone: "accent",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 15c0-3 2-7 7-7s7 4 7 7M5 15l3-1M19 15l-3-1M9 19h6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="11" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

export function WhyOwlka() {
  return (
    <section id="why" className="relative py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">
            Why Owlka
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            The power of Claude, with the rough edges sanded off.
          </h2>
          <p className="mt-5 text-lg text-text/70 leading-relaxed">
            Claude on its own is brilliant and a bit reckless. Owlka adds the
            memory, the reviewers, and the safety net that let you hand it real
            work without needing to be a developer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`${f.span} relative p-8 sm:p-10 rounded-card border overflow-hidden group transition-all hover:-translate-y-0.5 ${
                f.tone === "mark"
                  ? "bg-mark text-surface border-mark shadow-xl shadow-mark/20 hover:shadow-2xl hover:shadow-mark/30"
                  : f.tone === "accent"
                  ? "bg-tint-accent border-transparent hover:border-mark/30"
                  : "bg-surface border-border hover:border-mark/40 hover:shadow-lg hover:shadow-mark/5"
              }`}
            >
              <div
                className={`mb-6 w-11 h-11 rounded-xl flex items-center justify-center ${
                  f.tone === "mark"
                    ? "bg-surface/15 text-surface"
                    : "bg-tint-mark text-mark"
                }`}
              >
                <div className="w-5 h-5">{f.icon}</div>
              </div>
              <h3
                className={`text-xl sm:text-2xl font-semibold tracking-tight leading-snug ${
                  f.tone === "mark" ? "text-surface" : ""
                }`}
              >
                {f.title}
              </h3>
              <p
                className={`mt-3 text-[15px] leading-relaxed ${
                  f.tone === "mark" ? "text-surface/85" : "text-text/75"
                }`}
              >
                {f.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
