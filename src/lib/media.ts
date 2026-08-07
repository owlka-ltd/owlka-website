// Single source of truth for the promo video set.
//
// The videos are the approved "final14/final15" promo set (masters live on
// Tim's Mac Mini and in the "Owlka promos" Google Drive folder; they are NOT
// committed to this repo). The web encodes and their poster frames are hosted
// on the existing download host under a VERSIONED directory, so nginx serves
// them with Cache-Control: immutable. A re-cut ships as a NEW directory and a
// change to the bases below; never overwrite files in an immutable directory
// (a browser that already holds the old bytes will not revalidate for a year).
//
// Every clip exists in BOTH shapes and the browser picks one:
//   final15 — 9:16 portrait (720x1280), the original encodes.
//   final16 — 16:9 landscape (1280x720), built 2026-07-31 from the same
//             masters. Actor b-roll was already 16:9 inside the portrait
//             frame and is unwrapped; the phone/desktop UI beats are
//             pillarboxed; the white end card has its canvas widened. Audio
//             is stream-copied, byte-identical between the two shapes.
const MEDIA_BASE_PORTRAIT = "https://download.owlka.com/media/promo/final15";
const MEDIA_BASE_WIDE = "https://download.owlka.com/media/promo/final16";

/**
 * The one breakpoint that decides which shape a visitor gets.
 *
 * 1024px, which is Tailwind's `lg`. Chosen because it is already the width at
 * which the home hero flips from a stacked column to its two-column grid, so
 * the video's shape changes on exactly the same line as the layout around it
 * rather than on a second, invisible one. In device terms: phones, and tablets
 * held in portrait, get the 9:16 clip; tablets in landscape, laptops and
 * desktops get the 16:9 clip. A tablet is deliberately decided by how it is
 * being held, which is the closest honest answer to "phone or desktop?".
 *
 * These strings are consumed as the `media` attribute on <source>, inside both
 * <video> and <picture>. The browser evaluates them BEFORE it fetches
 * anything, so exactly one video file and one poster image are downloaded.
 *
 * They are NOT re-evaluated on resize: a window that loaded at 1400px and is
 * then dragged narrow keeps the wide file. That is how <source media> is
 * specified to behave, and it is fine here, because it can only affect someone
 * resizing a desktop window, never someone arriving on a phone.
 */
export const WIDE_MIN_WIDTH_PX = 1024;
export const WIDE_MEDIA = `(min-width: ${WIDE_MIN_WIDTH_PX}px)`;
export const PORTRAIT_MEDIA = `(max-width: ${WIDE_MIN_WIDTH_PX - 0.02}px)`;

export type PromoRendition = {
  src: string;
  poster: string;
};

export type PromoClip = {
  /** 16:9, served at and above WIDE_MIN_WIDTH_PX. */
  wide: PromoRendition;
  /** 9:16, served below WIDE_MIN_WIDTH_PX. */
  portrait: PromoRendition;
  /** Plain-language description for screen readers. */
  label: string;
};

function clip(name: string, label: string): PromoClip {
  return {
    wide: {
      src: `${MEDIA_BASE_WIDE}/${name}.mp4`,
      poster: `${MEDIA_BASE_WIDE}/${name}-poster.jpg`,
    },
    portrait: {
      src: `${MEDIA_BASE_PORTRAIT}/${name}.mp4`,
      poster: `${MEDIA_BASE_PORTRAIT}/${name}-poster.jpg`,
    },
    label,
  };
}

/** 63s elevator pitch: what Owlka is, cards, reviewers, code health. */
export const PROMO_HERO = clip(
  "hero",
  "One-minute overview of Owlka: drive Claude on your own computer from your phone, with plain-English approval cards and automated reviewers",
);

/** 36s: download, install, sign in to Claude, then real work with reviewers. */
export const PROMO_INSTALL = clip(
  "install",
  "Installing Owlka: download, open, sign in to Claude, then hand it real work",
);

/** 29s: end-to-end encryption and memory that stays on your own machine. */
export const PROMO_SECURITY = clip(
  "security",
  "How Owlka keeps your work private: end-to-end encryption between phone and desktop, with memory that stays on your own machine",
);

/** 12s: a plain-English approval card, approved with one tap. */
export const PROMO_CARDS = clip(
  "cards",
  "A plain-English approval card in Owlka, approved with one tap from the school run",
);

/** 21s: watching agents from the sofa, pausing them, switching reviewer modes. */
export const PROMO_CONTROL = clip(
  "control",
  "Staying in control with Owlka: watch agents from anywhere, pause them with one tap, and choose how many automated reviewers check the work",
);
