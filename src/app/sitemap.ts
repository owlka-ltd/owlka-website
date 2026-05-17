import type { MetadataRoute } from "next";

const SITE_URL = "https://owlka.com";

const SECONDARY_ROUTES = [
  "/pricing",
  "/privacy",
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
