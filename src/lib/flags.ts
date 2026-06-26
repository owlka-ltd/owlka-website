// Single source of truth for platform availability.
//
// Day-1 is Mac-only (HARD product rule: no Windows claims until the Windows
// build actually ships and is hosted). To enable Windows everywhere at once:
//   1. host the signed .exe at WINDOWS_EXE_URL,
//   2. flip WINDOWS_AVAILABLE to true,
//   3. update the Mac-only copy on /security, /privacy, /support, /terms.
// Until then, no surface may assert that a Windows app exists or is reachable.
export const WINDOWS_AVAILABLE = false;
export const WINDOWS_EXE_URL = "https://download.owlka.com/windows/latest.exe";
// Immutable per-build download URL. The dmg filename itself carries the
// version + git sha (owlka-<version>-<sha>.dmg), so the URL changes on every
// release and never collides with a previously-cached file. download.owlka.com
// sits behind Cloudflare with a ~4h browser TTL and the publish pipeline has no
// purge rights; the old static `latest.dmg?v=...` scheme went stale because
// Cloudflare kept re-serving the cached old (crashing) dmg even after the query
// string changed. nginx serves /mac/owlka-*.dmg with Cache-Control: immutable.
// On every release, the publish pipeline (owlka-desktop scripts/sign-and-
// notarise.sh) rewrites THIS constant to the just-published versioned URL and
// pushes, so the button always points at the new build. New release => new URL.
export const MAC_DMG_URL = "https://download.owlka.com/mac/owlka-0.1.0-4b85f3d.dmg";
