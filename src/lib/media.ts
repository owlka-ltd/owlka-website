// Single source of truth for the promo video set.
//
// The videos are the approved "final14/final15" promo set (masters live on
// Tim's Mac Mini and in the "Owlka promos" Google Drive folder; they are NOT
// committed to this repo). The web encodes (720x1280 H.264 + AAC, faststart)
// and their poster frames are hosted on the existing download host under a
// VERSIONED directory, so nginx serves them with Cache-Control: immutable.
// A future re-cut ships as a new directory (e.g. final16/) and a one-line
// change to MEDIA_BASE; never overwrite files in an immutable directory.
const MEDIA_BASE = "https://download.owlka.com/media/promo/final15";

export type PromoClip = {
  src: string;
  poster: string;
  /** Plain-language description for screen readers. */
  label: string;
};

function clip(name: string, label: string): PromoClip {
  return {
    src: `${MEDIA_BASE}/${name}.mp4`,
    poster: `${MEDIA_BASE}/${name}-poster.jpg`,
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
