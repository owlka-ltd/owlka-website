import { NextResponse } from "next/server";

import { getCatalog, type CatalogResponse } from "@/lib/catalog";

// Static — the catalogue is hand-curated and only changes on redeploy.
// Vercel will edge-cache the JSON for s-maxage seconds; bumping the
// `version` field is the signal to clients (iOS) that they should
// re-fetch.
export const dynamic = "force-static";

export function GET(): NextResponse<CatalogResponse> {
  const payload = getCatalog();

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      // Matches /api/status convention. SWR keeps a fresh edge response
      // ready while a background revalidate runs, so an iOS launch never
      // waits on the origin fetch when the 5min cache expires.
      "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
    },
  });
}
