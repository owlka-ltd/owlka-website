"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { WINDOWS_EXE_URL } from "@/lib/flags";
import { PROMO_HERO } from "@/lib/media";
import { AuroraBackground } from "./AuroraBackground";
import { DeviceFrame } from "./DeviceFrame";
import { AppleMark, WindowsMark } from "./PlatformMarks";
import { PromoVideo } from "./PromoVideo";
import { PhoneStores } from "./StoreBadges";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <AuroraBackground intensity="vivid" />

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 sm:pt-20 sm:pb-32 lg:pt-24 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center">
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
              <span className="uppercase text-mark">New</span>
              <span className="text-text/50">·</span>
              <span className="text-text/80">Works with Claude Code</span>
            </motion.div>

            {/* H1 is the LCP element. Render it visible immediately (no
                opacity-0 initial state) so it paints on first frame instead
                of waiting for Framer Motion to mount and run the animation. */}
            <h1 className="text-5xl sm:text-6xl lg:text-[5.25rem] font-semibold tracking-tight leading-[1.02]">
              The most powerful iPhone app
              <br />
              <span className="bg-gradient-to-r from-mark to-[#ff5e9d] bg-clip-text text-transparent">
                in the world.
              </span>
              <span className="ml-2 align-baseline text-2xl sm:text-3xl font-normal text-text/40">
                (possibly)
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl mx-auto lg:mx-0 text-xl sm:text-2xl text-text/85 font-medium leading-snug"
            >
              The power of Claude, in your pocket.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 max-w-xl mx-auto lg:mx-0 text-lg sm:text-xl text-text/75 leading-relaxed"
            >
              Made easy and safer for people who are not developers.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl mx-auto lg:mx-0 text-lg sm:text-xl text-text/70 leading-relaxed"
            >
              Owlka puts the power of Claude on your phone. Build websites, build
              apps, set up monitors, connect your tools and data, get the thing
              in your head actually built, all from the comfort of your sofa.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-text/60 leading-relaxed"
            >
              Wrapped in memory that lasts across sessions, automatic reviewers
              that check the work, and guardrails that pause and ask, in plain
              English, before risky actions touch your Mac.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center lg:justify-start"
            >
              <Link
                href="/download"
                className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-pill bg-mark text-surface text-base font-medium hover:opacity-90 transition-all shadow-lg shadow-mark/30 hover:shadow-xl hover:shadow-mark/40 hover:-translate-y-0.5"
              >
                <AppleMark className="w-4 h-4" />
                Download for Mac
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
              {/* Windows is a real, shipping, code-signed build, and burying it
                  behind /download was the reason nobody could see that. It
                  therefore sits directly beside the Mac button, same height,
                  same shadow and lift, so it reads as a peer download rather
                  than a secondary link. Mac keeps the filled brand colour
                  because it is the older and more widely run of the two, not
                  because Windows is provisional: Windows left beta on
                  2026-07-31 after Dharminder ran it on real hardware through a
                  fresh install, an in-app update and pairing.

                  This links straight at the .exe, not at /download, because the
                  label promises a download. The Mac button next to it goes to
                  /download, which is unchanged deliberately: that page is the
                  one with the Apple Silicon, notarisation and system
                  requirement detail a Mac visitor should read.

                  min-h-12 py-2, NOT h-12. This label is the longest in the row,
                  so it is the button that wraps first. A fixed h-12 is a 48px
                  box the text is free to spill out of: an earlier draft of this
                  button carried a Beta chip as well, and at Chrome's largest
                  default font size (20px, "Very large" in Settings, an
                  accessibility setting real people turn on) the label needed
                  three line boxes and overflowed the pill by 12px top and
                  bottom. The chip has since gone, which happens to shorten the
                  label, but the fix stays structural rather than depending on
                  the text staying short. A minimum height plus vertical padding
                  keeps the resting size identical to the Mac button beside it
                  and lets the button grow instead of the text escaping. */}
              <a
                href={WINDOWS_EXE_URL}
                className="inline-flex items-center justify-center gap-2 min-h-12 py-2 px-6 rounded-pill bg-surface border border-border text-base font-medium transition-all shadow-lg shadow-black/5 hover:border-mark/40 hover:shadow-xl hover:-translate-y-0.5"
                data-testid="hero-download-windows"
              >
                <WindowsMark className="w-4 h-4" />
                Download for Windows
              </a>
              <Link
                href="#examples"
                className="inline-flex items-center justify-center h-12 px-7 rounded-pill bg-surface/80 backdrop-blur-md border border-border text-base font-medium hover:border-mark/40 hover:bg-surface transition-colors"
              >
                See what people built
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-4 text-sm text-muted text-center lg:text-left"
            >
              Free for your first 30 days, no card needed. Bring your own Claude plan. Mac and Windows.
            </motion.p>

            {/* The phone stores. Neither app is listed yet, so these render
                muted and unclickable with a "Coming soon" label rather than a
                live store badge. See src/components/StoreBadges.tsx. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.62 }}
              className="mt-7 flex flex-col items-center lg:items-start"
            >
              <PhoneStores />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-3 justify-center lg:justify-start items-center text-sm text-muted"
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
                <Check /> Asks before risky actions
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-4 lg:mt-0"
          >
            {/* glow halo behind device */}
            <div
              aria-hidden
              className="absolute inset-0 -m-12 rounded-[60px] blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,45,122,0.35), transparent 70%)",
              }}
            />

            {/* The one-minute hero promo, playing inside the phone frame.
                It autoplays muted (autoplay with sound is banned sitewide);
                native controls let the visitor unmute for the voiceover.
                The clip is 9:16, so the frame's screen aspect matches it
                exactly and the box is reserved before the video loads: no
                layout shift. */}
            <div className="relative mx-auto max-w-[300px] sm:max-w-[330px] @container">
              <DeviceFrame aspect="9 / 16">
                <PromoVideo clip={PROMO_HERO} autoPlay />
              </DeviceFrame>
            </div>
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

