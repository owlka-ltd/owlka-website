"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { DeviceFrame } from "./DeviceFrame";
import { GovernorsSessionScreen } from "./GovernorsSessionScreen";
import { PrinterPilotSessionScreen } from "./PrinterPilotSessionScreen";

type Visual =
  | { kind: "device"; src: string; alt: string; width: number; height: number }
  | { kind: "deviceHtml"; screen: "governors" | "printer" }
  | { kind: "notification"; preview: NotificationPreview }
  | { kind: "appcard"; icon: string; name: string; subtitle: string; build: string };

type NotificationPreview = {
  app: string;
  appColor: string;
  time: string;
  title: string;
  body: string;
};

type Study = {
  tag: string;
  title: string;
  who: string;
  body: string;
  metric: string;
  hue: "mark" | "accent";
  visual: Visual;
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
    visual: {
      kind: "deviceHtml",
      screen: "governors",
    },
  },
  {
    tag: "Hardware",
    title: "Live 3D-printer command centre",
    who: "Built by a maker running a print farm from the garage",
    body:
      "A native iOS app that talks to Klipper over the network, streams the toolhead, watches temperature curves, and pauses the print before a bad layer becomes a fire. Notifications when something needs a human.",
    metric: "Saved 14 prints in the first month.",
    hue: "accent",
    visual: {
      kind: "deviceHtml",
      screen: "printer",
    },
  },
  {
    tag: "Personal",
    title: "Britain's Got Talent date watcher",
    who: "Built by a superfan who refused to miss the live finale again",
    body:
      "A monitor that polls the ITV schedule, the show's social feeds, and the rumour mill, then pings the family group chat the moment audition dates and the final get confirmed. Persistent across months.",
    metric: "Caught the 2026 date 9 days before the press release.",
    hue: "mark",
    visual: {
      kind: "notification",
      preview: {
        app: "BGT WATCHER",
        appColor: "#FF2D7A",
        time: "now",
        title: "Final date confirmed",
        body:
          "Britain's Got Talent grand final: Sat 31 May, ITV1 8pm. Source: ITV schedule API · 9 days ahead of press release.",
      },
    },
  },
  {
    tag: "Games",
    title: "Dragon Maze — indie iOS game",
    who: "Built by a hobbyist designer with zero Swift experience",
    body:
      "A tile-shifting maze game with hand-drawn dragons, daily seeds, leaderboards and Game Center sync. Designed, built, signed and submitted to TestFlight without ever opening Xcode on a laptop.",
    metric: "Shipped a public beta in 11 evenings.",
    hue: "accent",
    visual: {
      kind: "appcard",
      icon: "/screenshots/dragon-icon.png",
      name: "Dragon Maze",
      subtitle: "Daily-seed maze puzzler",
      build: "TestFlight · build 47",
    },
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
                className="relative overflow-hidden rounded-card border border-border bg-surface group hover:border-mark/40 transition-colors"
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
                  className={`relative grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-center p-8 sm:p-12 lg:p-16 ${
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
                    initial={{ opacity: 0, scale: 0.94, y: 16 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px]"
                  >
                    <div
                      aria-hidden
                      className="absolute -inset-10 rounded-[60px] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity"
                      style={{
                        background:
                          s.hue === "mark"
                            ? "radial-gradient(closest-side, rgba(255,45,122,0.35), transparent 70%)"
                            : "radial-gradient(closest-side, rgba(255,184,212,0.55), transparent 70%)",
                      }}
                    />
                    <div className="relative">
                      <VisualRenderer visual={s.visual} />
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

function VisualRenderer({ visual }: { visual: Visual }) {
  if (visual.kind === "device") {
    return (
      <DeviceFrame
        src={visual.src}
        alt={visual.alt}
        width={visual.width}
        height={visual.height}
      />
    );
  }
  if (visual.kind === "deviceHtml") {
    return (
      <div className="@container">
        <DeviceFrame>
          {visual.screen === "governors" && <GovernorsSessionScreen />}
          {visual.screen === "printer" && <PrinterPilotSessionScreen />}
        </DeviceFrame>
      </div>
    );
  }
  if (visual.kind === "notification") {
    return (
      <div className="@container">
        <DeviceFrame>
          <NotificationStack preview={visual.preview} />
        </DeviceFrame>
      </div>
    );
  }
  return (
    <div className="@container">
      <DeviceFrame>
        <AppStoreCard {...visual} />
      </DeviceFrame>
    </div>
  );
}

function NotificationStack({ preview }: { preview: NotificationPreview }) {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#0d1216] via-[#11171c] to-[#1a2129] overflow-hidden">
      {/* faint wallpaper streaks */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(60% 40% at 20% 10%, rgba(255,45,122,0.25), transparent 70%), radial-gradient(50% 30% at 80% 90%, rgba(255,184,212,0.2), transparent 70%)",
        }}
      />

      {/* iOS status bar */}
      <div className="relative h-[5.6%] flex items-end justify-between pb-[1.5%] px-[8%] text-white/85 text-[3.6cqw] font-semibold tracking-tight">
        <span>9:41</span>
        <div className="flex items-center gap-[3px] opacity-90">
          <span className="block w-[3.2cqw] h-[2.2cqw] rounded-[0.4cqw] border border-white/80" />
          <span className="block w-[3.8cqw] h-[2.2cqw] rounded-[0.4cqw] border border-white/80" />
        </div>
      </div>

      {/* lock-screen date + big clock */}
      <div className="relative text-center text-white mt-[3%] px-[5%]">
        <div className="text-[2.6cqw] uppercase tracking-[0.2em] opacity-70">
          Saturday, May 31
        </div>
        <div className="text-[18cqw] font-light leading-none mt-[1cqw]">9:41</div>
      </div>

      {/* notification card */}
      <div className="relative mx-[4%] mt-[8%] rounded-[3cqw] bg-white/10 backdrop-blur-xl border border-white/15 p-[3.5cqw] shadow-lg">
        <div className="flex items-start gap-[2.4cqw]">
          <div
            className="shrink-0 w-[7cqw] h-[7cqw] rounded-[1.4cqw] flex items-center justify-center text-[2.4cqw] font-bold text-white"
            style={{ background: preview.appColor }}
          >
            BGT
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-[1.6cqw]">
              <span className="text-[2.4cqw] font-semibold uppercase tracking-wider text-white/70 truncate">
                {preview.app}
              </span>
              <span className="text-[2.4cqw] text-white/60 shrink-0">
                {preview.time}
              </span>
            </div>
            <div className="mt-[0.8cqw] text-[3.2cqw] font-semibold text-white leading-snug">
              {preview.title}
            </div>
            <div className="mt-[0.4cqw] text-[2.9cqw] text-white/80 leading-snug">
              {preview.body}
            </div>
          </div>
        </div>
      </div>

      {/* second stacked card (fading) */}
      <div className="relative mx-[6%] mt-[1.8cqw] rounded-[2.4cqw] bg-white/[0.06] backdrop-blur-xl border border-white/10 p-[2.4cqw] opacity-80">
        <div className="flex items-center gap-[1.6cqw] text-[2.6cqw] text-white/70">
          <span className="w-[1.4cqw] h-[1.4cqw] rounded-full bg-white/70" />
          <span className="truncate">3 earlier from BGT Watcher</span>
        </div>
      </div>

      {/* lock-screen widgets row */}
      <div className="absolute bottom-[8%] left-0 right-0 flex items-center justify-between px-[8%]">
        <span className="w-[10cqw] h-[10cqw] rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white">
          <FlashlightGlyph />
        </span>
        <span className="w-[10cqw] h-[10cqw] rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white">
          <CameraSmallGlyph />
        </span>
      </div>

      {/* home indicator */}
      <div className="absolute bottom-[2%] left-0 right-0 flex justify-center">
        <div className="w-[28%] h-[0.5%] rounded-full bg-white/60" />
      </div>
    </div>
  );
}

function FlashlightGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[4.4cqw] h-[4.4cqw]" fill="currentColor" aria-hidden>
      <path d="M5 1h6l-0.6 3H5.6zM5.6 5h4.8l-0.5 2H6.1zM6.4 8h3.2v6.2c0 0.4-0.4 0.8-0.8 0.8H7.2c-0.4 0-0.8-0.4-0.8-0.8z" />
    </svg>
  );
}

function CameraSmallGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[4.4cqw] h-[4.4cqw]" fill="currentColor" aria-hidden>
      <path d="M5 3 L4 5 H2 a1 1 0 0 0-1 1 v7 a1 1 0 0 0 1 1 h12 a1 1 0 0 0 1-1 V6 a1 1 0 0 0-1-1 h-2 L11 3 z" />
      <circle cx="8" cy="9" r="2.6" fill="#0d1216" />
    </svg>
  );
}

function AppStoreCard({
  icon,
  name,
  subtitle,
  build,
}: {
  icon: string;
  name: string;
  subtitle: string;
  build: string;
}) {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#1c1530] via-[#2a1640] to-[#3b1855] overflow-hidden flex flex-col">
      {/* twinkle stars */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.6), transparent), radial-gradient(1px 1px at 70% 20%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 40% 75%, rgba(255,255,255,0.6), transparent), radial-gradient(1px 1px at 85% 85%, rgba(255,255,255,0.5), transparent)",
        }}
      />

      {/* iOS status bar */}
      <div className="relative shrink-0 h-[5.6%] flex items-end justify-between pb-[1.5%] px-[8%] text-white text-[3.6cqw] font-semibold tracking-tight">
        <span>9:41</span>
        <span className="flex items-center gap-[3px]">
          <span className="block w-[3.2cqw] h-[2.2cqw] rounded-[0.4cqw] border border-white/80" />
          <span className="block w-[3.8cqw] h-[2.2cqw] rounded-[0.4cqw] border border-white/80" />
        </span>
      </div>

      {/* TestFlight pill */}
      <div className="relative flex justify-center mt-[3%]">
        <span className="inline-flex items-center gap-[1.2cqw] h-[4.8cqw] px-[2.4cqw] rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-[2.4cqw] font-semibold uppercase tracking-wider text-white">
          <span className="w-[1.4cqw] h-[1.4cqw] rounded-full bg-mark animate-pulse-dot" />
          TestFlight Beta
        </span>
      </div>

      {/* icon */}
      <div className="relative mx-auto mt-[5%] w-[44%] aspect-square rounded-[6cqw] overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/10">
        <Image
          src={icon}
          alt={`${name} app icon`}
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      {/* title */}
      <div className="relative text-center mt-[4%] px-[5%]">
        <div className="text-white text-[5cqw] font-bold tracking-tight">
          {name}
        </div>
        <div className="text-white/70 text-[2.8cqw] mt-[0.6cqw]">{subtitle}</div>
      </div>

      {/* feature row — Age / Category / Developer */}
      <div className="relative mt-[5%] grid grid-cols-3 gap-[1cqw] px-[6%] text-center">
        <FeatureCell label="Age" value="4+" />
        <FeatureCell label="Category" value="Puzzle" />
        <FeatureCell label="Developer" value="T. Trailor" />
      </div>

      {/* CTA */}
      <div className="relative mt-[6%] flex justify-center">
        <span className="inline-flex items-center justify-center h-[7cqw] px-[5cqw] rounded-full bg-white text-[#1c1530] text-[2.8cqw] font-bold shadow-md">
          Install
        </span>
      </div>

      <div className="relative mt-[2.4cqw] text-center text-white/55 text-[2.4cqw] font-medium tracking-wide">
        {build}
      </div>

      {/* home indicator */}
      <div className="mt-auto pb-[2%] flex justify-center">
        <div className="w-[28%] h-[0.5%] rounded-full bg-white/70" />
      </div>
    </div>
  );
}

function FeatureCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center border-x border-white/10 first:border-l-0 last:border-r-0">
      <span className="text-[2cqw] uppercase tracking-wider text-white/55">
        {label}
      </span>
      <span className="text-[2.6cqw] font-semibold text-white mt-[0.4cqw]">
        {value}
      </span>
    </div>
  );
}
