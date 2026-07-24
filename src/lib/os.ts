// Client-side visitor OS detection, shared by the nav CTA and the /download
// buttons so the two can never disagree about what the visitor is on.
//
// The pure function `detectOSFrom` takes the three browser signals as plain
// arguments so it can be unit-tested against real user-agent strings with no
// DOM. `detectOS()` is the thin runtime wrapper.
//
// Why this is fiddly: Apple deliberately makes iOS look like macOS.
//
//   * iPhone Safari's user agent contains the literal text "like Mac OS X", so
//     a naive /Mac OS X/ test matches every iPhone. Until 2026-07-25 that is
//     exactly what happened: iPhone visitors were told a 35 MB Mac disk image
//     was "recommended for your Mac".
//   * iPadOS 13+ in its default "desktop" mode reports the user agent of a Mac
//     ("Macintosh; Intel Mac OS X 10_15_7") AND navigator.platform === "MacIntel".
//     There is no string that distinguishes it. The one reliable tell is touch:
//     a real Mac reports navigator.maxTouchPoints === 0, an iPad reports 5.
//
// navigator.platform is deprecated. It is used here only as a fallback after
// the user-agent test, so nothing load-bearing depends on it; when browsers
// eventually drop it the user-agent branch still resolves every real case.

export type DetectedOS = "ios" | "android" | "mac" | "windows" | "linux" | null;

export function detectOSFrom(
  userAgent: string,
  platform: string,
  maxTouchPoints: number,
): DetectedOS {
  const ua = userAgent || "";
  const plat = platform || "";

  // iOS first: an iPhone UA contains "like Mac OS X", so every Apple-mobile
  // case has to be settled before any Mac test runs.
  if (/iPhone|iPod|iPad/i.test(ua)) return "ios";
  // iPadOS in desktop mode is indistinguishable by string. Touch points break
  // the tie: Macs report 0, iPads report 5. Guard with > 1 rather than > 0 so a
  // stray touch-capable Mac peripheral cannot flip a real Mac to "ios".
  if (/Macintosh|Mac OS X/i.test(ua) && maxTouchPoints > 1) return "ios";
  if (/Mac/i.test(plat) && maxTouchPoints > 1) return "ios";

  // Android must beat the Linux test: every Android UA also contains "Linux".
  if (/Android/i.test(ua)) return "android";

  if (/Windows|Win64|WOW64/i.test(ua)) return "windows";
  if (/Win/i.test(plat)) return "windows";

  if (/Macintosh|Mac OS X/i.test(ua)) return "mac";
  if (/Mac/i.test(plat)) return "mac";

  if (/CrOS|Linux|X11/i.test(ua)) return "linux";

  return null;
}

/** True when the visitor is on a device that cannot run the desktop app. */
export function isMobileOS(os: DetectedOS): boolean {
  return os === "ios" || os === "android";
}

export function detectOS(): DetectedOS {
  if (typeof navigator === "undefined") return null;
  return detectOSFrom(
    navigator.userAgent || "",
    // Deprecated, and deliberately only a fallback inside detectOSFrom.
    navigator.platform || "",
    navigator.maxTouchPoints || 0,
  );
}

// Never-changing store for useSyncExternalStore: subscribe is a no-op, the
// client snapshot reads the OS once and the server snapshot is null. React
// renders null on the server and during hydration, then swaps to the client
// value after commit, so there is no hydration mismatch and no setState in an
// effect.
export const subscribeToNothing = () => () => {};
export const serverSnapshot = (): DetectedOS => null;
