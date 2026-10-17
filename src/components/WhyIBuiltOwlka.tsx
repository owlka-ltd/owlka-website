"use client";

import { motion } from "framer-motion";
import { PortraitVideoFigure } from "./PromoVideo";
import {
  SoldOutPassStory,
  STORY_FILM_CAPTION,
} from "./SoldOutPassStory";
import { STORY_SOLD_OUT_PASS } from "@/lib/media";

export function WhyIBuiltOwlka() {
  return (
    <section
      id="why-i-built-owlka"
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">
            A founder&rsquo;s story
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            Why I built Owlka
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_minmax(0,680px)] gap-10 lg:gap-16 items-start">
          {/* Film first on mobile (it is first in the DOM); sticky beside the text on desktop. */}
          <div className="lg:sticky lg:top-24">
            <PortraitVideoFigure
              clip={STORY_SOLD_OUT_PASS}
              caption={STORY_FILM_CAPTION}
            />
          </div>
          <div>
            <SoldOutPassStory subheadingAs="h3" />
          </div>
        </div>
      </div>
    </section>
  );
}
