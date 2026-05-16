"use client";

import { motion } from "framer-motion";

type Study = {
  tag: string;
  title: string;
  who: string;
  body: string;
  metric: string;
  hue: "mark" | "accent";
};

const studies: Study[] = [
  {
    tag: "Education",
    title: "An Ofsted-grade governors app",
    who: "Built by a primary-school chair of governors",
    body:
      "A custom AI agent that reads the school's data alongside the latest Ofsted framework, drafts evidence-grade answers for inspection prep, and lets the governing body rehearse the real questions before they're asked.",
    metric: "Cuts inspection prep from weeks to an afternoon.",
    hue: "mark",
  },
  {
    tag: "Hardware",
    title: "Live 3D-printer command centre",
    who: "Built by a maker running a print farm from the garage",
    body:
      "A native iOS app that talks to Klipper over the network, streams the toolhead, watches temperature curves, and pauses the print before a bad layer becomes a fire. Notifications when something needs a human.",
    metric: "Saved 14 prints in the first month.",
    hue: "accent",
  },
  {
    tag: "Personal",
    title: "Britain's Got Talent date watcher",
    who: "Built by a superfan who refused to miss the live finale again",
    body:
      "A monitor that polls the ITV schedule, the show's social feeds, and the rumour mill, then pings the family group chat the moment audition dates and the final get confirmed. Persistent across months.",
    metric: "Caught the 2026 date 9 days before the press release.",
    hue: "mark",
  },
  {
    tag: "Games",
    title: "Dragon Maze — indie iOS game",
    who: "Built by a hobbyist designer with zero Swift experience",
    body:
      "A tile-shifting maze game with hand-drawn dragons, daily seeds, leaderboards and Game Center sync. Designed, built, signed and submitted to TestFlight without ever opening Xcode on a laptop.",
    metric: "Shipped a public beta in 11 evenings.",
    hue: "accent",
  },
];

export function CaseStudies() {
  return (
    <section id="examples" className="relative py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">
            What people built
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            Real products, shipped from a phone.
          </h2>
          <p className="mt-5 text-lg text-text/70 leading-relaxed">
            Every one of these was designed, built, debugged and deployed with
            Owlka. No laptop required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {studies.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative p-8 sm:p-10 rounded-card bg-surface border border-border overflow-hidden group hover:border-mark/40 transition-colors"
            >
              <div
                aria-hidden
                className="absolute -top-24 -right-24 w-56 h-56 rounded-full opacity-60 group-hover:opacity-90 transition-opacity"
                style={{
                  background:
                    s.hue === "mark"
                      ? "radial-gradient(closest-side, var(--color-tint-mark), transparent)"
                      : "radial-gradient(closest-side, var(--color-tint-accent), transparent)",
                }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center h-7 px-3 rounded-pill bg-tint-mark text-mark text-xs font-medium">
                    {s.tag}
                  </span>
                  <span className="text-xs text-muted">{s.who}</span>
                </div>
                <h3 className="text-2xl sm:text-[28px] font-semibold tracking-tight leading-snug">
                  {s.title}
                </h3>
                <p className="mt-4 text-[15px] text-text/75 leading-relaxed">
                  {s.body}
                </p>
                <p className="mt-6 text-sm font-medium text-mark">{s.metric}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
