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
export const MAC_DMG_URL = "https://download.owlka.com/mac/latest.dmg";
