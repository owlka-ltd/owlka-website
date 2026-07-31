// Single source of truth for the promo video set.
//
// The videos are the approved "final14/final15" promo set (masters live on
// Tim's Mac Mini and in the "Owlka promos" Google Drive folder; they are NOT
// committed to this repo). The web encodes and their poster frames are hosted
// on the existing download host under a VERSIONED directory, so nginx serves
// them with Cache-Control: immutable. A re-cut ships as a NEW directory and a
// change to the base below; never overwrite files in an immutable directory
// (a browser that already holds the old bytes will not revalidate for a year).
//
// TWO bases, because the set now exists in two shapes:
//   final15 — the original 9:16 portrait encodes (720x1280).
//   final16 — the same cuts reformatted to 16:9 landscape (1280x720), built
//             2026-07-31 from the final15 masters. The actor b-roll was
//             already 16:9 inside the portrait frame and is unwrapped; the
//             phone/desktop UI beats are pillarboxed; the white end card has
//             its canvas widened. Audio is stream-copied, byte-identical.
//
// The home hero deliberately stays PORTRAIT. Its headline is "The most
// powerful iPhone app in the world" and the clip plays inside an iPhone
// bezel, so a letterboxed 16:9 clip there would contradict the copy and
// shrink to a postage stamp in the hero's narrow right-hand column. The four
// in-body placements sit in a max-w-3xl text column where landscape is the
// stronger shape, so those point at final16.
const MEDIA_BASE_PORTRAIT = "https://download.owlka.com/media/promo/final15";
const MEDIA_BASE_WIDE = "https://download.owlka.com/media/promo/final16";

/**
 * Aspect ratio of the clip, as a CSS `aspect-ratio` value.
 *
 * This lives on the clip rather than at each call site on purpose. The player
 * renders the video with `object-contain` inside a box of exactly this ratio,
 * so a clip and its box can never disagree. They did once: every clip was
 * assumed 9:16 and the player hard-coded `aspectRatio: "9 / 16"` with
 * `object-cover`, which would have centre-cropped a landscape clip to the
 * middle third of its width with no visible error.
 */
export type PromoAspect = "9 / 16" | "16 / 9";

export type PromoClip = {
  src: string;
  poster: string;
  aspect: PromoAspect;
  /** Plain-language description for screen readers. */
  label: string;
};

function portrait(name: string, label: string): PromoClip {
  return {
    src: `${MEDIA_BASE_PORTRAIT}/${name}.mp4`,
    poster: `${MEDIA_BASE_PORTRAIT}/${name}-poster.jpg`,
    aspect: "9 / 16",
    label,
  };
}

function wide(name: string, label: string): PromoClip {
  return {
    src: `${MEDIA_BASE_WIDE}/${name}.mp4`,
    poster: `${MEDIA_BASE_WIDE}/${name}-poster.jpg`,
    aspect: "16 / 9",
    label,
  };
}

/** 63s elevator pitch: what Owlka is, cards, reviewers, code health. */
export const PROMO_HERO = portrait(
  "hero",
  "One-minute overview of Owlka: drive Claude on your own computer from your phone, with plain-English approval cards and automated reviewers",
);

/** 36s: download, install, sign in to Claude, then real work with reviewers. */
export const PROMO_INSTALL = wide(
  "install",
  "Installing Owlka: download, open, sign in to Claude, then hand it real work",
);

/** 29s: end-to-end encryption and memory that stays on your own machine. */
export const PROMO_SECURITY = wide(
  "security",
  "How Owlka keeps your work private: end-to-end encryption between phone and desktop, with memory that stays on your own machine",
);

/** 12s: a plain-English approval card, approved with one tap. */
export const PROMO_CARDS = wide(
  "cards",
  "A plain-English approval card in Owlka, approved with one tap from the school run",
);

/** 21s: watching agents from the sofa, pausing them, switching reviewer modes. */
export const PROMO_CONTROL = wide(
  "control",
  "Staying in control with Owlka: watch agents from anywhere, pause them with one tap, and choose how many automated reviewers check the work",
);
