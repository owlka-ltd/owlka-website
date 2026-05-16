"use client";

import { motion } from "framer-motion";
import { PhoneMockup } from "./PhoneMockup";

type Study = {
  tag: string;
  title: string;
  who: string;
  body: string;
  metric: string;
  hue: "mark" | "accent";
  kind: "governors" | "printer" | "bgt" | "dragon";
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
    kind: "governors",
  },
  {
    tag: "Hardware",
    title: "Live 3D-printer command centre",
    who: "Built by a maker running a print farm from the garage",
    body:
      "A native iOS app that talks to Klipper over the network, streams the toolhead, watches temperature curves, and pauses the print before a bad layer becomes a fire. Notifications when something needs a human.",
    metric: "Saved 14 prints in the first month.",
    hue: "accent",
    kind: "printer",
  },
  {
    tag: "Personal",
    title: "Britain's Got Talent date watcher",
    who: "Built by a superfan who refused to miss the live finale again",
    body:
      "A monitor that polls the ITV schedule, the show's social feeds, and the rumour mill, then pings the family group chat the moment audition dates and the final get confirmed. Persistent across months.",
    metric: "Caught the 2026 date 9 days before the press release.",
    hue: "mark",
    kind: "bgt",
  },
  {
    tag: "Games",
    title: "Dragon Maze — indie iOS game",
    who: "Built by a hobbyist designer with zero Swift experience",
    body:
      "A tile-shifting maze game with hand-drawn dragons, daily seeds, leaderboards and Game Center sync. Designed, built, signed and submitted to TestFlight without ever opening Xcode on a laptop.",
    metric: "Shipped a public beta in 11 evenings.",
    hue: "accent",
    kind: "dragon",
  },
];

export function CaseStudies() {
  return (
    <section id="examples" className="relative py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-20 sm:mb-24">
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

        <div className="space-y-6 sm:space-y-8">
          {studies.map((s, i) => {
            const phoneLeft = i % 2 === 1;
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative overflow-hidden rounded-card border border-border bg-surface group hover:border-mark/40 transition-colors ${
                  s.hue === "mark" ? "" : ""
                }`}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      s.hue === "mark"
                        ? `radial-gradient(80% 60% at ${phoneLeft ? "20%" : "80%"} 50%, var(--color-tint-mark), transparent 70%)`
                        : `radial-gradient(80% 60% at ${phoneLeft ? "20%" : "80%"} 50%, var(--color-tint-accent), transparent 70%)`,
                  }}
                />

                <div
                  className={`relative grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-center p-8 sm:p-12 lg:p-16 ${
                    phoneLeft ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-6 flex-wrap">
                      <span className="inline-flex items-center h-7 px-3 rounded-pill bg-tint-mark text-mark text-xs font-semibold uppercase tracking-wide">
                        {s.tag}
                      </span>
                      <span className="text-xs text-muted">{s.who}</span>
                    </div>
                    <h3 className="text-3xl sm:text-[34px] font-semibold tracking-tight leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-5 text-[17px] text-text/75 leading-relaxed max-w-xl">
                      {s.body}
                    </p>
                    <div className="mt-7 inline-flex items-center gap-2 px-4 py-2.5 rounded-pill bg-mark/8 border border-mark/20">
                      <svg
                        viewBox="0 0 16 16"
                        className="w-4 h-4 text-mark"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        aria-hidden
                      >
                        <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm font-semibold text-mark">
                        {s.metric}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, rotate: phoneLeft ? -3 : 3 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: phoneLeft ? -2 : 2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[320px] transition-transform duration-700 group-hover:scale-[1.03] group-hover:rotate-0"
                  >
                    <div
                      aria-hidden
                      className="absolute -inset-8 rounded-[60px] blur-3xl opacity-60 group-hover:opacity-90 transition-opacity"
                      style={{
                        background:
                          s.hue === "mark"
                            ? "radial-gradient(closest-side, rgba(255,45,122,0.4), transparent 70%)"
                            : "radial-gradient(closest-side, rgba(255,184,212,0.6), transparent 70%)",
                      }}
                    />
                    <div className="relative">
                      <PhoneMockup kind={s.kind} />
                    </div>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
