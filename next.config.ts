import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Defense in depth for the Mac download flow. The download button points at a
  // STABLE pointer URL (see src/lib/flags.ts MAC_DMG_URL), so cached HTML is no
  // longer harmful, but we still force the pages that carry the download CTA to
  // be revalidated by the browser rather than served stale. This matches what
  // Vercel already serves for these HTML documents and pins it explicitly so a
  // future default change cannot reintroduce a stale-link window.
  async headers() {
    return [
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
