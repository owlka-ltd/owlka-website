"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Persistent cross-session memory",
    body: "Owlka remembers what you're building across days, weeks, and reinstalls. Resume any project with one sentence.",
    span: "md:col-span-2",
    tone: "mark",
  },
  {
    title: "Automated code reviewers",
    body: "Every change is challenged by a reviewer agent before it lands. Catches the bugs you would never have seen.",
    span: "",
    tone: "surface",
  },
  {
    title: "Environment protection",
    body: "Four-tier permission model. Destructive commands need your tap. You cannot brick your machine.",
    span: "",
    tone: "surface",
  },
  {
    title: "Built-in deployment",
    body: "iOS, Vercel, Streamlit, Cloudflare — Owlka knows how to ship to all of them. Sign and deploy from the lock screen.",
    span: "md:col-span-2",
    tone: "accent",
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
            Claude Code, with the rough edges sanded off.
          </h2>
          <p className="mt-5 text-lg text-text/70 leading-relaxed">
            The raw model is brilliant and dangerous. Owlka adds the guardrails
            that let you trust it with real work.
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
              className={`${f.span} relative p-8 sm:p-10 rounded-card border border-border overflow-hidden ${
                f.tone === "mark"
                  ? "bg-mark text-surface"
                  : f.tone === "accent"
                  ? "bg-tint-accent"
                  : "bg-surface"
              }`}
            >
              <h3
                className={`text-xl sm:text-2xl font-semibold tracking-tight leading-snug ${
                  f.tone === "mark" ? "text-surface" : ""
                }`}
              >
                {f.title}
              </h3>
              <p
                className={`mt-3 text-[15px] leading-relaxed ${
                  f.tone === "mark"
                    ? "text-surface/85"
                    : "text-text/75"
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
