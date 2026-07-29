"use client";

import { useEffect, useRef } from "react";
import type { PromoClip } from "@/lib/media";

type Props = {
  clip: PromoClip;
  /**
   * Hero mode: starts playing muted as soon as the browser allows it.
   * Everywhere else the video waits for a tap and then plays WITH sound,
   * because the voiceover is the pitch. Never autoplay with sound.
   */
  autoPlay?: boolean;
  className?: string;
};

/**
 * A promo clip from the approved final14/final15 set (see @/lib/media).
 *
 * All clips are 9:16 portrait. The wrapper carries a fixed aspect-ratio so
 * the element reserves its box before any media loads: zero layout shift.
 *
 * Autoplay notes, learned the hard way so the next reader does not have to:
 * - React does not render the `muted` attribute into SSR HTML (long-standing
 *   react-dom quirk), so a server-rendered `<video autoplay muted>` can reach
 *   the browser as `<video autoplay>` and be blocked. The effect below sets
 *   `muted` on the element and calls play() explicitly after hydration.
 * - The site's Permissions-Policy must allow autoplay for self (next.config.ts);
 *   `autoplay=()` silently kills this for every browser that honours the header.
 * - Autoplay videos below a hero should not exist; this component only
 *   autoplays where `autoPlay` is passed, and always muted.
 */
/**
 * Standard below-the-fold presentation: a phone-shaped rounded card at a
 * sensible width with an optional one-line caption. Click to play, with sound.
 */
export function PromoVideoFigure({
  clip,
  caption,
  className = "",
}: {
  clip: PromoClip;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`mx-auto w-full max-w-[300px] ${className}`}>
      <div className="overflow-hidden rounded-[24px] border border-border bg-surface shadow-lg">
        <PromoVideo clip={clip} />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function PromoVideo({ clip, autoPlay = false, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !autoPlay) return;
    video.muted = true;
    // Ignore rejection: if the browser still refuses, the poster + native
    // controls remain a perfectly good click-to-play fallback.
    video.play().catch(() => {});
  }, [autoPlay]);

  return (
    <video
      ref={ref}
      className={`block h-full w-full object-cover ${className}`}
      style={{ aspectRatio: "9 / 16" }}
      src={clip.src}
      poster={clip.poster}
      aria-label={clip.label}
      controls
      playsInline
      preload={autoPlay ? "auto" : "none"}
      autoPlay={autoPlay}
      muted={autoPlay}
    />
  );
}
