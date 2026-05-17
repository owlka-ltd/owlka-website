import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const BG = "#FAFAF7";
const BRAND = "#FF2D7A";
const TEXT = "#1A1A1F";
const MUTED = "#98989D";

const WIDTH = 1200;
const HEIGHT = 630;

export async function GET(request: NextRequest): Promise<ImageResponse> {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? "Owlka").slice(0, 120);
  const subtitle = (
    searchParams.get("subtitle") ?? "Claude Code on your phone"
  ).slice(0, 180);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: BG,
          padding: "72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <svg
            width="72"
            height="72"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="46" fill={BRAND} />
            <circle cx="36" cy="44" r="8" fill={BG} />
            <circle cx="64" cy="44" r="8" fill={BG} />
          </svg>
          <span
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: TEXT,
              letterSpacing: "-0.02em",
            }}
          >
            Owlka
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            gap: "20px",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: TEXT,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: MUTED,
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 72,
            bottom: 72,
            width: 80,
            height: 6,
            background: BRAND,
            borderRadius: 3,
            display: "flex",
          }}
        />
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      headers: {
        // Cache OG images at the edge for 1h; allow CDN to serve stale
        // for 24h while revalidating in the background. Brand colours +
        // copy are stable, so re-rendering on every unfurl is wasteful.
        "cache-control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
