import type { NextConfig } from "next";

// Baseline security headers for every route.
//
// Why: until 2026-07-25 this site sent none at all. owlka.com is a download
// page. Anything that can be framed can have a convincing fake "Download for
// Mac" button positioned over the real one while the address bar still reads
// owlka.com, and the visitor has no way to tell. frame-ancestors plus
// X-Frame-Options closes that. The rest are cheap and have no downside here.
//
// Deliberately NOT set: a full Content-Security-Policy with script-src. Next's
// App Router injects inline bootstrap scripts, so a real script-src needs
// per-request nonces through middleware. That is a separate change with real
// breakage risk, and shipping a broken CSP is worse than shipping none. This
// CSP carries frame-ancestors only, which restricts nothing else and cannot
// break a page. X-Frame-Options is the legacy twin, kept for older browsers
// that ignore frame-ancestors.
const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    // The marketing site needs none of these, with one exception: autoplay is
    // allowed for SELF ONLY, because the homepage hero plays the (muted) promo
    // video without a tap. `autoplay=()` would silently block it in every
    // browser that honours the header. Everything else stays denied, so an
    // injected third-party frame or script cannot silently reach for them.
    value:
      "accelerometer=(), autoplay=(self), camera=(), display-capture=(), encrypted-media=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=(), xr-spatial-tracking=()",
  },
  {
    key: "Strict-Transport-Security",
    // Vercel already sends HSTS. Pinned here so the guarantee survives a
    // platform default changing under us. No preload directive: preload is an
    // effectively irreversible commitment for the whole apex and every
    // subdomain, and that is Tim's call, not a config default.
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  // /pricing was removed for launch (no mention of charging anywhere on the
  // site, per Tim, 2026-09-03). A hard 404 would strand anyone with an old
  // link (search results, bookmarks); a page asserting "Owlka is free" would
  // be a pricing commitment nobody has signed off on. A redirect to the page
  // that actually converts makes no claim about price at all.
  //
  // If pricing content ever comes back: REMOVE this redirect entry first,
  // then add src/app/pricing/page.tsx. Adding the page alone is not enough —
  // verified 2026-09-03 that with both present, the build succeeds with no
  // conflict, but this redirects() rule still wins at runtime and the new
  // page is silently unreachable.
  //
  // Temporary (307), not permanent (308): Tim framed this as a launch-time
  // decision, which means reversible. A 308 is cached hard by browsers per
  // spec, so a visitor who hits /pricing during this window could keep being
  // redirected locally even after this rule is removed server-side.
  async redirects() {
    return [
      {
        source: "/pricing",
        destination: "/download",
        permanent: false,
      },
    ];
  },
  // Defense in depth for the Mac download flow. The download button points at a
  // STABLE pointer URL (see src/lib/flags.ts MAC_DMG_URL), so cached HTML is no
  // longer harmful, but we still force the pages that carry the download CTA to
  // be revalidated by the browser rather than served stale. This matches what
  // Vercel already serves for these HTML documents and pins it explicitly so a
  // future default change cannot reintroduce a stale-link window.
  async headers() {
    return [
      {
        // Every route, including /api/*. Header rules are additive in Next, so
        // the Cache-Control entries below still apply on top of these.
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
      {
        source: "/download",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
