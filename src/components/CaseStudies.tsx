"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DeviceFrame } from "./DeviceFrame";
import { GovernorsSessionScreen } from "./GovernorsSessionScreen";

type Shot = { src: string; alt: string; width: number; height: number };

type Visual =
  | { kind: "device"; src: string; alt: string; width: number; height: number }
  | { kind: "deviceHtml"; screen: "governors" }
  | { kind: "notification"; preview: NotificationPreview }
  // Real screenshots, one at a time with dots to switch. "phone" sits in the
  // device frame; "browser" sits in a plain browser window for a web app.
  | { kind: "gallery"; frame: "phone" | "browser"; shots: Shot[] };

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
  body: string;
  /** Only something that can be checked. Leave it out rather than guess. */
  metric?: string;
  hue: "mark" | "accent";
  visual: Visual;
};

const studies: Study[] = [
  {
    tag: "Education",
    title: "An Ofsted-ready governors assistant",
    body:
      "A school governor built a private assistant for their schools. During a live inspection call it hears the inspector's question, answers it from the schools' own minutes, policies and reports, and names the documents it used so the governor can open them on the spot.",
    metric: "Built for a live Ofsted call.",
    hue: "mark",
    visual: {
      kind: "deviceHtml",
      screen: "governors",
    },
  },
  {
    tag: "Hardware",
    title: "PrinterPilot, an AI-first 3D printing app",
    body:
      "Owlka's founder built PrinterPilot with Owlka. It puts CAD design, a slicer built on OrcaSlicer, models from Printables and MakerWorld, and live control of real printers in one iPhone app, with a Mac doing the heavy work. Describe what you want and the AI designs it, finds it or changes the slice settings, then adapts the file to your own printer.",
    metric: "Runs three printers from Sovol, Snapmaker and Bambu Lab.",
    hue: "accent",
    visual: {
      kind: "gallery",
      frame: "phone",
      shots: [
        {
          src: "/screenshots/printerpilot/live-printer.webp",
          alt: "PrinterPilot showing a Sovol SV08 Max mid-print: the live camera, 71% progress, layer 21 of 67, the finish time and nozzle and bed temperatures",
          width: 603,
          height: 1311,
        },
        {
          src: "/screenshots/printerpilot/printables-search.webp",
          alt: "Printables open inside PrinterPilot, showing search results for flexi dragon with model photos",
          width: 603,
          height: 1311,
        },
        {
          src: "/screenshots/printerpilot/slice-preview.webp",
          alt: "PrinterPilot's layer preview of a sliced file: four dragons on the build plate, with a layer slider and how much of each line type the print uses",
          width: 603,
          height: 1311,
        },
        {
          src: "/screenshots/printerpilot/adapt-for-printer.webp",
          alt: "PrinterPilot after adapting a Bambu Lab A1 file for a Snapmaker U1, listing what it changed, with Ask why underneath",
          width: 603,
          height: 1311,
        },
      ],
    },
  },
  {
    tag: "Personal",
    title: "Britain's Got Talent ticket watcher",
    body:
      "A family kept missing the BGT auditions. They built a persistent watcher that pings the family group chat the instant tickets become reservable, so they're booked before anyone else even knows.",
    metric: "Tickets reserved minutes before the rest of the public.",
    hue: "mark",
    visual: {
      kind: "notification",
      preview: {
        app: "BGT WATCHER",
        appColor: "#FF2D7A",
        time: "now",
        title: "Tickets just dropped",
        body:
          "Britain's Got Talent audition tickets live on Applause Store right now. Tap here to reserve before they go.",
      },
    },
  },
  {
    tag: "Games",
    title: "Dragon Maze, a times-tables adventure",
    body:
      "A child designed and built their own maze game with Claude Code. You choose your dragon's colour, eyes, size and wings, then race it through ten mazes that grow from 6x6 to 20x15. Times-table questions on the way take seconds off your time, and every level has its own leaderboard.",
    metric: "Free to play in a web browser.",
    hue: "accent",
    visual: {
      kind: "gallery",
      frame: "browser",
      shots: [
        {
          src: "/screenshots/dragon-maze/maze-play.webp",
          alt: "Dragon Maze level 1: a purple dragon in a 6x6 maze with question tiles and a star at the exit",
          width: 1200,
          height: 750,
        },
        {
          src: "/screenshots/dragon-maze/maths-challenge.webp",
          alt: "A Dragon Maze maths challenge asking 10 x 6 with three answers to pick from",
          width: 1200,
          height: 750,
        },
        {
          src: "/screenshots/dragon-maze/customise.webp",
          alt: "The Dragon Maze dragon designer, with colour, eyes, size and times-table choices beside the level leaderboard",
          width: 1200,
          height: 750,
        },
      ],
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
            Real products, built by talking to AI.
          </h2>
          <p className="mt-5 text-lg text-text/70 leading-relaxed">
            Every one of these was built by someone who is not a developer,
            describing what they wanted to Claude.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {studies.map((s, i) => {
            const phoneLeft = i % 2 === 1;
            // A web app's landscape screenshots need a wider column than a phone.
            const wide = s.visual.kind === "gallery" && s.visual.frame === "browser";
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
                  className={`relative grid grid-cols-1 ${
                    wide
                      ? phoneLeft
                        ? "lg:grid-cols-[480px_1fr] xl:grid-cols-[580px_1fr]"
                        : "lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_580px]"
                      : "lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]"
                  } gap-10 lg:gap-16 items-center p-8 sm:p-12 lg:p-16 ${
                    phoneLeft ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-6 flex-wrap">
                      <span className="inline-flex items-center h-7 px-3 rounded-pill bg-tint-mark text-mark text-xs font-semibold uppercase tracking-wide">
                        {s.tag}
                      </span>
                    </div>
                    <h3 className="text-3xl sm:text-[34px] font-semibold tracking-tight leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-5 text-[17px] text-text/75 leading-relaxed max-w-xl">
                      {s.body}
                    </p>
                    {s.metric && (
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
                    )}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 16 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative mx-auto w-full ${
                      wide
                        ? "max-w-[580px]"
                        : "max-w-[280px] sm:max-w-[320px] lg:max-w-[340px]"
                    }`}
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
  return <Gallery frame={visual.frame} shots={visual.shots} />;
}

function Gallery({ frame, shots }: { frame: "phone" | "browser"; shots: Shot[] }) {
  const [i, setI] = useState(0);
  // Steps through the screenshots on its own until someone picks one, so a
  // visitor who never touches the dots still sees every screen. Off for
  // anyone who has asked their system for reduced motion.
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || shots.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % shots.length), 4500);
    return () => window.clearInterval(t);
  }, [auto, shots.length]);
  const shot = shots[i];
  const screen =
    frame === "phone" ? (
      <DeviceFrame src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} />
    ) : (
      <div className="rounded-[14px] overflow-hidden border border-black/10 bg-[#1c1c20] shadow-[0_40px_80px_-30px_rgba(15,15,20,0.55)]">
        <div aria-hidden className="flex items-center gap-1.5 px-3 h-7 bg-[#2a2a30]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          className="block w-full h-auto"
        />
      </div>
    );
  return (
    <div>
      {screen}
      {shots.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {shots.map((s, n) => (
            <button
              key={s.src}
              type="button"
              onClick={() => {
                setAuto(false);
                setI(n);
              }}
              aria-label={`Show screenshot ${n + 1} of ${shots.length}: ${s.alt}`}
              aria-current={n === i}
              className={`h-2.5 rounded-full transition-all ${
                n === i ? "w-6 bg-mark" : "w-2.5 bg-text/25 hover:bg-text/45"
              }`}
            />
          ))}
        </div>
      )}
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

      {/* iOS status bar — real signal + wifi + battery glyphs */}
      <div className="relative h-[5.6%] flex items-end justify-between pb-[1.5%] px-[8%] text-white text-[3.6cqw] font-semibold tracking-tight">
        <span>9:41</span>
        <div className="flex items-center gap-[1.4cqw] text-white">
          <SignalDots />
          <WifiGlyphLight />
          <BatteryGlyphLight />
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

function SignalDots() {
  return (
    <svg viewBox="0 0 16 8" className="w-[4.4cqw] h-[2.4cqw]" fill="currentColor" aria-hidden>
      <circle cx="1.4" cy="6.5" r="1" />
      <circle cx="4.4" cy="6.5" r="1" />
      <circle cx="1.4" cy="3.5" r="1" opacity="0.45" />
      <circle cx="4.4" cy="3.5" r="1" opacity="0.45" />
    </svg>
  );
}

function WifiGlyphLight() {
  return (
    <svg viewBox="0 0 16 12" className="w-[4.4cqw] h-[3.2cqw]" fill="currentColor" aria-hidden>
      <path d="M8 11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM3 6.5c1.3-1.3 3.1-2 5-2s3.7.7 5 2l-1.2 1.2A5.4 5.4 0 0 0 8 6.2 5.4 5.4 0 0 0 4.2 7.7zM0 3.5C2.1 1.4 5 0.2 8 0.2s5.9 1.2 8 3.3L14.8 4.7A9.6 9.6 0 0 0 8 2 9.6 9.6 0 0 0 1.2 4.7z" />
    </svg>
  );
}

function BatteryGlyphLight() {
  return (
    <svg viewBox="0 0 26 12" className="w-[7cqw] h-[3.2cqw]" aria-hidden>
      <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" fill="currentColor" />
      <rect x="23.5" y="3.5" width="1.6" height="5" rx="0.6" fill="currentColor" />
      <text
        x="11.5"
        y="9"
        fontSize="6"
        fontWeight="700"
        textAnchor="middle"
        fill="#0d1216"
      >
        80
      </text>
    </svg>
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
