"use client";

import { useEffect, useRef } from "react";
import {
  PORTRAIT_MEDIA,
  WIDE_MEDIA,
  type PromoClip,
  type PromoRendition,
} from "@/lib/media";

/**
 * Which shape this instance is allowed to render.
 *
 * "both" is the normal case: one <video> with two media-gated <source>
 * elements, so the browser downloads whichever one matches.
 *
 * "wide" / "portrait" exist for the home hero, where the two shapes need
 * genuinely different containers (a phone bezel below the breakpoint, a plain
 * card above it) and so cannot share a single element. Each instance emits
 * ONE media-gated <source>. Below the breakpoint the wide instance has no
 * matching source, and above it the portrait one has none, so the hidden
 * instance downloads nothing at all: no video, no poster.
 */
type Shape = "both" | "wide" | "portrait";

type Props = {
  clip: PromoClip;
  /**
   * Hero mode: starts playing muted as soon as the browser allows it.
   * Everywhere else the video waits for a tap and then plays WITH sound,
   * because the voiceover is the pitch. Never autoplay with sound.
   */
  autoPlay?: boolean;
  shape?: Shape;
  className?: string;
};

/**
 * A promo clip from the approved promo set (see @/lib/media).
 *
 * Every clip exists as both a 9:16 portrait file and a 16:9 landscape file.
 * The browser picks one from the `media` attributes and downloads only that
 * one; see WIDE_MEDIA in @/lib/media for the breakpoint and why it is 1024px.
 *
 * The poster is a <picture> layered behind the video rather than the video's
 * own `poster` attribute, because `poster` takes a single URL and cannot be
 * media-switched: a landscape poster would flash above a portrait video on a
 * phone. <picture> resolves its <source media> before fetching, exactly like
 * <video> does, so this stays one image over the wire.
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
export function PromoVideo({
  clip,
  autoPlay = false,
  shape = "both",
  className = "",
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !autoPlay) return;
    video.muted = true;
    // Ignore rejection: if the browser still refuses, the poster + native
    // controls remain a perfectly good click-to-play fallback. This also
    // swallows the expected rejection on the hidden hero instance, whose
    // <source> cannot match at the current width.
    video.play().catch(() => {});
  }, [autoPlay]);

  const sources: Array<{ media?: string; r: PromoRendition }> =
    shape === "wide"
      ? [{ media: WIDE_MEDIA, r: clip.wide }]
      : shape === "portrait"
        ? [{ media: PORTRAIT_MEDIA, r: clip.portrait }]
        : [{ media: WIDE_MEDIA, r: clip.wide }, { r: clip.portrait }];



  return (
    <div className={`relative h-full w-full ${className}`}>
      <picture>
        {sources.map((s, i) => (
          <source key={i} media={s.media} srcSet={s.r.poster} />
        ))}
        {/*
          Decorative: the <video> below carries the accessible name.

          Deliberately NO src. The <img> takes its image from whichever
          <source> above matches, and when none matches it loads nothing at
          all. That last part is the point: on the hero's hidden instance no
          source can match, and an img carrying its own src would still fetch
          that file even inside a display:none subtree, which is exactly the
          second download this whole arrangement exists to avoid. In the
          two-source case the final <source> has no media attribute, so it
          always matches and an src here would be dead markup anyway.
        */}
        <img
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-contain"
        />
      </picture>
      <video
        ref={ref}
        // object-contain, not object-cover: the box is built from the same
        // breakpoint that chooses the file, so the two agree and it renders
        // identically, but if they ever drift the video letterboxes visibly
        // instead of being silently cropped.
        className="absolute inset-0 block h-full w-full object-contain"
        aria-label={clip.label}
        // A 1x1 transparent GIF, not a real image and not a second request.
        // Without a poster a <video> holding no frames paints solid BLACK, and
        // it sits above the <picture> layer, so the real poster underneath
        // would never be seen. Handing it a transparent poster makes the
        // element itself transparent while keeping the native controls visible
        // and clickable on top, which is the whole reason the video stays the
        // upper layer.
        poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        controls
        playsInline
        preload={autoPlay ? "auto" : "none"}
        autoPlay={autoPlay}
        muted={autoPlay}
      >
        {sources.map((s, i) => (
          <source key={i} media={s.media} src={s.r.src} type="video/mp4" />
        ))}
      </video>
    </div>
  );
}

/**
 * Standard below-the-fold presentation: a rounded card with an optional
 * one-line caption. Click to play, with sound.
 *
 * Shape follows the same breakpoint that picks the file. Below it the card is
 * a phone-ish 300px and 9:16, matching the portrait file the browser fetched.
 * At and above it the card is 16:9 and fills the max-w-3xl text column it sits
 * in (720px at desktop, edge to edge with the prose above it, as an editorial
 * figure should).
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
    <figure className={`mx-auto w-full max-w-[300px] lg:max-w-none ${className}`}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-[24px] border border-border bg-surface shadow-lg lg:aspect-[16/9]">
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
