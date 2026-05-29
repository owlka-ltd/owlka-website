import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const SECONDARY_ROUTES = [
  "/how-it-works",
  "/ai-use",
  "/pricing",
  "/privacy",
  "/security",
  "/terms",
  "/support",
  "/docs",
] as const;

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
      priority: 0.7,
    })),
  ];
}
