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
 * A promo clip from the approved promo set (see @/lib/media).
 *
 * Clips come in two shapes and each one carries its own `aspect`: the home
 * hero is 9:16 portrait, the in-body placements are 16:9 landscape. The box
 * is built from `clip.aspect`, so it always reserves the right space before
 * any media loads (zero layout shift) and can never disagree with the file.
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
 * Standard below-the-fold presentation: a rounded card with an optional
 * one-line caption. Click to play, with sound.
 *
 * Width follows the clip's shape. A 16:9 clip fills the max-w-3xl text column
 * it sits in (720px at desktop, edge to edge with the prose above it, exactly
 * as an editorial figure should); a 9:16 clip stays capped at a phone-ish
 * 300px, because a full-column portrait video is a wall.
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
  const width = clip.aspect === "16 / 9" ? "" : "max-w-[300px]";
  return (
    <figure className={`mx-auto w-full ${width} ${className}`}>
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
      // object-contain, not object-cover: the box is built from the clip's own
      // aspect so the two agree and it renders identically, but if they ever
      // drift the video letterboxes visibly instead of being silently cropped.
      className={`block h-full w-full object-contain ${className}`}
      style={{ aspectRatio: clip.aspect }}
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
