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
// on Windows". That is compatibility signalling: it answers "will this work on
// my machine", not "where do I get it".
//
// They are not store badges and do not substitute for one. The two are
// different jobs, not different permission levels: a mark names a platform, a
// badge is the store's own call-to-action lockup. If you want a store badge,
// import the vendor's committed artwork from StoreBadges.tsx. Never dress a
// mark up to stand in for a badge, and never redraw a badge as a mark.
//
// A store badge does NOT require a live listing in order to be SHOWN. Per
// Tim's direction on 2026-07-31, with both phone apps submitted for review,
// StoreBadges.tsx renders each store's official lockup at full brand strength
// in a clearly-labelled "Coming soon" state: non-interactive, never a link,
// not focusable, with the caption as real adjacent text. The flags in
// src/lib/flags.ts decide whether the badge is a LINK, not whether it exists.
//
// STORE BADGES LIVE IN StoreBadges.tsx, NOT HERE (policy updated 2026-07-31).
//
// An earlier version of this comment said there was deliberately no Google Play
// badge and no Play mark anywhere in the codebase, on the grounds that a live
// fetch of play.google.com for com.owlka.app returned HTTP 404 in GB and US.
// The 404 was real and still is. What changed is the state of the apps: both
// the iPhone and the Android build were submitted for review on 2026-07-31, so
// both listings are genuinely pending rather than hypothetical, and Tim's
// direction is to use the stores' brand recognition rather than hold the badges
// back until approval lands.
//
// The rule that replaces it:
//
//   - Both stores' OFFICIAL badge artwork is committed under public/ and served
//     from our own origin. Never hotlink from apple.com or google.com.
//   - Neither badge is ever REDRAWN or recoloured. If you need a store badge,
//     import it; do not hand-draw one as an SVG.
//   - A badge only becomes a LINK when its listing is actually live, gated on
//     the flags in src/lib/flags.ts. Until then it renders unlinked with a
//     visible "Coming soon" caption. Verify the public listing returns 200
//     before flipping a flag: an internal note saying "submitted" is not a
//     listing.
//
// The AppStoreBadge below stays here because IPhoneAppLink uses it for the LIVE
// case. The pending-approval presentation, for both stores, is StoreBadges.tsx.
//
// The Apple and Windows marks render as a single flat `currentColor` fill:
// monochrome, no gradient, no recolouring, aspect ratio fixed by the square
// viewBox. Set the colour by setting text colour on the parent.
//
// PlayMark is the exception and CANNOT follow that pattern. Google's Play mark
// is a four-colour logo and recolouring it is exactly the modification their
// guidelines forbid, so it ships as their own unmodified PNG rather than as a
// `currentColor` path. It will be the one piece of colour in a row of
// monochrome marks. That is correct; do not "fix" it by tracing it into an SVG.
//
// Accessibility: every mark here is `aria-hidden`. That is intentional and is
// the correct pattern, NOT an oversight. Each mark is only ever rendered
// immediately beside a visible text label naming the same platform — the "Runs
// on" strip pairs them with "Mac / iOS", "Windows" and "Android", and the
// download buttons with "Download for Mac" and "Download for Windows".
// Labelling the mark as well would make a
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

/**
 * The Google Play mark. Google's own unmodified artwork
 * (gstatic.com/images/branding/product/2x/play_prism_64dp.png), committed at
 * public/google-play-mark.png and served from our own origin.
 *
 * This is the MARK, not the "Get it on Google Play" badge. The mark identifies
 * the platform in the "Runs on" strip; the badge is the call to action and
 * lives in StoreBadges.tsx, gated on the listing being live.
 */
export function PlayMark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <Image
      src="/google-play-mark.png"
      alt=""
      width={128}
      height={128}
      className={className}
      aria-hidden
      unoptimized
    />
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
