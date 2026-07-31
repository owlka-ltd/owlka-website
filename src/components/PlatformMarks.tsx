import Image from "next/image";
import { IOS_APP_STORE_AVAILABLE, IOS_APP_STORE_URL } from "@/lib/flags";

// ---------------------------------------------------------------------------
// Vendor platform marks. ONE definition, imported everywhere.
//
// Before this file the Apple glyph was copy-pasted into three components
// (Hero, PlatformDownloads, IPhoneAppLink) and the Windows glyph into one.
// Four hand-maintained copies of somebody else's trademark is how a mark
// silently drifts out of spec on one page only. They now live here.
//
// WHAT THESE ARE, AND WHAT THEY ARE NOT
//
// These are PLATFORM marks, used to say "Owlka runs on macOS" and "Owlka runs
// on Windows". That is compatibility signalling next to a real, working
// download link for that platform. They are NOT store badges and must never be
// used as one: a store badge is a promise that you can get the app from that
// store, and the only store badge in this file is the App Store badge below,
// which is hard-gated on the app actually being listed.
//
// There is deliberately NO Google Play badge and no Play mark anywhere in this
// codebase. Google's Play badge guidelines only permit the badge for an app
// that is publicly listed on Play, and as of 2026-07-31 a live fetch of
// play.google.com for com.owlka.app returned HTTP 404 in both GB and US,
// byte-identical to the 404 for a package id that does not exist. Do not add
// one on the strength of an internal doc claiming publication. Verify the
// public listing returns 200 first.
//
// Both marks render as a single flat `currentColor` fill: monochrome, no
// gradient, no recolouring, aspect ratio fixed by the square viewBox. Set the
// colour by setting text colour on the parent.
//
// Accessibility: every mark here is `aria-hidden`. That is intentional and is
// the correct pattern, NOT an oversight. Each mark is only ever rendered
// immediately beside a visible text label naming the same platform ("macOS",
// "Windows", "Download for Mac"). Labelling the mark as well would make a
// screen reader announce the platform twice. If you ever place a mark with no
// adjacent text, give it `role="img"` and an `aria-label` at the call site
// instead of removing the text.
// ---------------------------------------------------------------------------

/** The Apple mark. Used for macOS and for the iPhone app. */
export function AppleMark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.05 12.04c-.03-2.9 2.37-4.3 2.48-4.37-1.36-1.98-3.47-2.25-4.22-2.28-1.8-.18-3.51 1.06-4.42 1.06-.93 0-2.32-1.04-3.82-1.01-1.96.03-3.78 1.14-4.78 2.89-2.05 3.56-.52 8.81 1.46 11.7.97 1.42 2.12 3 3.62 2.95 1.46-.06 2.01-.94 3.77-.94 1.76 0 2.26.94 3.79.91 1.57-.03 2.56-1.43 3.52-2.86 1.11-1.64 1.57-3.23 1.59-3.31-.04-.02-3.04-1.17-3.07-4.74zM14.34 3.97c.81-.98 1.35-2.34 1.2-3.69-1.16.05-2.57.78-3.4 1.75-.75.86-1.4 2.24-1.22 3.56 1.29.1 2.61-.66 3.42-1.62z" />
    </svg>
  );
}

/** The Windows mark (four-pane flag). Used for the Windows desktop build. */
export function WindowsMark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M3 5.1l7.5-1.02v7.23H3V5.1zm0 13.8l7.5 1.02v-7.14H3v6.12zm8.4 1.14L21 21.5v-8.55h-9.6v7.09zM11.4 3.96L21 2.5v8.55h-9.6V3.96z" />
    </svg>
  );
}

/**
 * The official "Download on the App Store" badge.
 *
 * RENDERS NOTHING until the app is actually listed. Apple's App Store
 * Marketing Guidelines only permit the badge for an app available on the App
 * Store, and beyond the guideline a badge that links nowhere is a conversion
 * hole shaped exactly like a working button. As of 2026-07-31 an iTunes lookup
 * on com.owlkaltd.app returns zero results in GB and US: the iPhone app ships
 * through TestFlight only.
 *
 * TO GO LIVE, change nothing here. Set the two constants in src/lib/flags.ts:
 *   IOS_APP_STORE_AVAILABLE = true
 *   IOS_APP_STORE_URL = "<the real apps.apple.com listing URL Apple issues>"
 * and this badge appears everywhere it is already placed. Do not construct or
 * guess that URL before Apple has issued the listing.
 *
 * The artwork is Apple's own unmodified SVG, downloaded from
 * developer.apple.com/assets/elements/badges/download-on-the-app-store.svg
 * (US-UK RGB black lockup) and committed at public/app-store-badge.svg. It is
 * served from our own origin, never hotlinked from Apple. Apple requires the
 * supplied artwork be used as-is: do not redraw it, recolour it, restretch it,
 * or set type in it yourself.
 *
 * Sizing follows Apple's badge rules: rendered at its native 40px height (their
 * documented digital minimum) with the native 119.66:40 aspect ratio preserved,
 * and at least 1/10th of the badge height as clear space on every side, applied
 * here as the `p-1` padding on the link.
 */
export function AppStoreBadge({ className = "" }: { className?: string }) {
  if (!IOS_APP_STORE_AVAILABLE || !IOS_APP_STORE_URL) return null;
  return (
    <a
      href={IOS_APP_STORE_URL}
      className={`inline-block p-1 hover:opacity-90 transition-opacity ${className}`}
      data-testid="app-store-badge"
    >
      <Image
        src="/app-store-badge.svg"
        alt="Download Owlka on the App Store"
        width={120}
        height={40}
        className="h-10 w-auto"
        unoptimized
      />
    </a>
  );
}
