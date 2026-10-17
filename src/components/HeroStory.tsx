"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PortraitVideoFigure } from "./PromoVideo";
import { SoldOutPassStory, STORY_FILM_CAPTION } from "./SoldOutPassStory";
import { STORY_SOLD_OUT_PASS } from "@/lib/media";

// The founder story, embedded in the hero where the "why I built Owlka" line
// used to link away. The full text is always in the page (it is only clipped
// until the visitor opens it), and it opens in place: nothing navigates.
export function HeroStory() {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      id="why-i-built-owlka"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
      className="mt-10 scroll-mt-20 text-left"
    >
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Why I built Owlka
      </h2>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-[220px_minmax(0,1fr)] gap-6 sm:gap-8 items-start">
        <div className="mx-auto w-full max-w-[260px] sm:max-w-none">
          <PortraitVideoFigure
            clip={STORY_SOLD_OUT_PASS}
            caption={STORY_FILM_CAPTION}
          />
        </div>
        <div>
          <div
            id="why-i-built-owlka-text"
            className={`relative overflow-hidden transition-[max-height] duration-500 ${
              open ? "max-h-[4000px]" : "max-h-[17rem]"
            }`}
          >
            <SoldOutPassStory subheadingAs="h3" />
            {!open && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg to-transparent"
              />
            )}
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="why-i-built-owlka-text"
            className="mt-4 inline-flex items-center justify-center min-h-11 px-5 rounded-pill bg-surface border border-border text-sm font-medium hover:border-mark/40 transition-colors"
          >
            {open ? "Show less" : "Read the full story"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
