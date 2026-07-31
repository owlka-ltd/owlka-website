// Single source of truth for platform availability.
//
// Windows shipped on 2026-07-20 (0.1.57): the .exe is hosted and reachable at
// WINDOWS_EXE_URL, so WINDOWS_AVAILABLE is true. The Windows build is
// code-signed (Azure Trusted Signing, "Owlka ltd", Microsoft-timestamped), so
// there is no SmartScreen "unknown publisher" warning.
//
// It carried a "Beta" label until 2026-07-31, when Dharminder ran it on real
// Windows hardware end to end (fresh install, in-app update, pairing window, no
// flashing terminals) and the one defect he found, the Window menu's nine fixed
// tabs, was already fixed and merged. Tim dropped the beta framing that day and
// every beta label for Windows was removed from the site copy. This flag was
// ALREADY true throughout and did not change: the beta label was copy, never a
// gate, so nothing about availability or /api/status moved with it.
export const WINDOWS_AVAILABLE = true;
export const WINDOWS_EXE_URL = "https://download.owlka.com/windows/latest.exe";
// Stable, always-current Mac download pointer. This URL never changes between
// releases, which is the whole point: a browser- or CDN-cached /download page
// can no longer hand a returning visitor an old versioned link (the Jun 2026
// stale-install bug, where the cache moved from the artifact to the pointer).
//
// How freshness is guaranteed:
//   1. On every release the publish pipeline (owlka-desktop scripts/sign-and-
//      notarise.sh) atomically swaps /mac/latest.dmg to the newest signed dmg
//      AND uploads an immutable per-build copy at /mac/owlka-<version>-<sha>.dmg.
//   2. nginx serves latest.dmg with Cache-Control: no-cache, must-revalidate.
//   3. The Cloudflare zone (only download.owlka.com is proxied) has Browser
//      Cache TTL set to "Respect Existing Headers", so that no-cache reaches the
//      client and the browser revalidates the pointer on every click.
// The big immutable per-build files stay CDN-cached (Cache-Control: immutable),
// so bandwidth is unaffected. The pipeline keeps this constant pointed at
// latest.dmg and does NOT rewrite it per release.
export const MAC_DMG_URL = "https://download.owlka.com/mac/latest.dmg";

// The Owlka iPhone app is NOT on the App Store yet.
//
// Verified 2026-07-25: `itunes.apple.com/lookup?bundleId=com.owlkaltd.app`
// returns zero results in both the GB and US storefronts, and an App Store
// search for "owlka" returns nothing of ours. The app ships to testers through
// TestFlight. Until 2026-07-25 six pages told visitors to "install from the App
// Store" and not one of them carried a link, because there is nothing to link
// to. That is worse than a missing link: it is an instruction the visitor
// cannot follow.
//
// TO GO LIVE, two lines: set IOS_APP_STORE_URL to the real listing URL and flip
// IOS_APP_STORE_AVAILABLE to true. Every page that talks about getting the
// iPhone app renders <IPhoneAppNote> / <IPhoneAppCta> from
// src/components/IPhoneAppLink.tsx, which read these two constants, so no page
// copy needs touching. Do NOT guess or construct the URL before Apple has
// issued the listing: a dead App Store link on the download page is a
// conversion hole that looks like a working button.
//
// Typed `boolean` rather than left as the literal `false` so the "available"
// branches type-check and stay compiled while the flag is off.
export const IOS_APP_STORE_AVAILABLE: boolean = false;
export const IOS_APP_STORE_URL: string | null = null;

// The Owlka Android app is NOT on Google Play yet.
//
// The app itself exists: owlka-ltd/owlka-android, version 1.0.0. It is the
// listing that does not. Verified 2026-07-31 by fetching
// play.google.com/store/apps/details for both plausible package ids
// (com.owlka.app and com.owlkaltd.app) in the GB storefront: both returned
// HTTP 404, the same response Play gives for a package that was never
// published.
//
// These two constants exist so the home page can show a Google Play mark
// HONESTLY. While the flag is false the mark renders muted, with a visible and
// screen-reader-readable "Coming soon" label, and is not a link. Google's Play
// badge guidelines only permit the official "Get it on Google Play" lockup for
// an app that is publicly listed, and a badge that links nowhere is a lie to
// the visitor on top of a guideline breach.
//
// TO GO LIVE, the same two lines as iOS above: set ANDROID_PLAY_STORE_URL to
// the real play.google.com listing URL and flip ANDROID_PLAY_STORE_AVAILABLE to
// true. The official badge artwork is already committed at
// public/google-play-badge.png, so nothing else needs touching. Verify the
// public listing actually returns HTTP 200 first: an internal release note
// saying "published" is not the same thing as a live listing.
export const ANDROID_PLAY_STORE_AVAILABLE: boolean = false;
export const ANDROID_PLAY_STORE_URL: string | null = null;
