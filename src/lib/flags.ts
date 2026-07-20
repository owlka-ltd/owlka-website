// Single source of truth for platform availability.
//
// Windows shipped as a BETA on 2026-07-20 (0.1.57): the .exe is hosted and
// reachable at WINDOWS_EXE_URL, so WINDOWS_AVAILABLE is true. The Windows build
// is NOT code-signed yet, so the download surface labels it "Beta" and warns
// about the first-run SmartScreen "unknown publisher" prompt (see the
// WindowsSmartScreenNote on /download). The Mac build stays the stable, signed
// default. When Windows code-signing lands, drop the beta labelling and the
// SmartScreen note.
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
