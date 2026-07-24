import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import siteRoutes from "@/lib/site-routes.json";

// The route list is JSON rather than a literal here so the smoke test at
// src/lib/__tests__/sitemap.test.mjs can read it without compiling TypeScript.
// That test asserts every advertised route has a src/app/<route>/page.tsx on
// disk, which is exactly what was missing on 2026-07-25: the sitemap advertised
// /pricing (404 live) and omitted /download, the conversion page, and /status.
const SECONDARY_ROUTES: readonly string[] = siteRoutes.routes;

// /download is the conversion page, so it outranks the rest.
const HIGH_PRIORITY_ROUTES = new Set(["/download"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...SECONDARY_ROUTES.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: HIGH_PRIORITY_ROUTES.has(path) ? 0.9 : 0.7,
    })),
  ];
}
