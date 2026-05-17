// Shared SEO constants. Single source of truth for site URL, copy, and
// OG image so layout.tsx and per-page metadata exports can't drift.

export const SITE_URL = "https://owlka.com";

export const SITE_NAME = "Owlka";

export const DEFAULT_TITLE = "Owlka — Claude Code on your phone";

// Default description (used by layout-level metadata + as a fallback).
export const DEFAULT_DESCRIPTION =
  "Owlka gives you the full power of Claude Code on your phone. Build apps, websites, monitors, anything a developer could do, all from the comfort of your sofa.";

// Richer description used on the homepage specifically. Page-level
// override; keep it tighter than 200 chars for search-result wrapping.
export const HOME_DESCRIPTION =
  "Owlka gives you the full power of Claude Code on your phone. Build websites, build apps, set up persistent monitoring, connect to APIs and databases, do anything a developer could do, all from the comfort of your sofa.";

// Default OG image (dynamic, edge-rendered). Bare URL renders defaults;
// per-page overrides can pass ?title=&subtitle= to customise.
export const DEFAULT_OG_IMAGE = "/api/og";

export const HOME_OG_IMAGE =
  "/api/og?title=Owlka&subtitle=Claude+Code+on+your+phone";
