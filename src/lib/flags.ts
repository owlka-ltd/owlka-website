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
// ?v= is a cache-busting key: download.owlka.com sits behind Cloudflare with a
// ~4h edge TTL and the publish pipeline has no purge rights, so a fresh release
// stays masked by the cached old dmg until the query string changes. Bump this
// to the new build's sha8 on every release so the button serves the new file
// immediately. See memory dmg-publish-gotchas.
export const MAC_DMG_URL = "https://download.owlka.com/mac/latest.dmg?v=55685453";
