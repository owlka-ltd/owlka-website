import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { PortraitVideoFigure } from "@/components/PromoVideo";
import { STORY_SOLD_OUT_PASS } from "@/lib/media";
import {
  SoldOutPassStory,
  STORY_FILM_CAPTION,
  STORY_PHOTO_ALT,
} from "@/components/SoldOutPassStory";

const TITLE = "How Owlka booked a sold-out pass";
const STANDFIRST =
  "I think it's fair to say my wife wasn't the biggest fan of Owlka. That was two days ago. Now she 'gets it'.";
const OG_IMAGE = "/stories/sold-out-pass.jpg";
const PUBLISHED = "2026-09-07";

export const metadata: Metadata = {
  title: TITLE,
  description: STANDFIRST,
  alternates: { canonical: "/stories/the-sold-out-pass" },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    url: `${SITE_URL}/stories/the-sold-out-pass`,
    title: TITLE,
    description: STANDFIRST,
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1536,
        height: 2048,
        alt: STORY_PHOTO_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: STANDFIRST,
    images: [OG_IMAGE],
  },
};

export default function TheSoldOutPassPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg text-text">
        <article className="mx-auto max-w-[680px] px-6 pt-16 pb-24 sm:pt-20 sm:pb-32">
          <header className="mb-10">
            <Link
              href="/stories"
              className="text-sm text-muted hover:text-text transition-colors"
            >
              &larr; Stories
            </Link>
            <p className="mt-6 text-sm font-medium text-mark uppercase tracking-wider">
              Story
            </p>
            <h1 className="mt-3 text-4xl sm:text-[42px] font-semibold tracking-tight leading-tight">
              {TITLE}
            </h1>
            <p className="mt-5 text-sm text-muted">
              <time dateTime={PUBLISHED}>7 September 2026</time>
            </p>
          </header>

          <PortraitVideoFigure
            clip={STORY_SOLD_OUT_PASS}
            caption={STORY_FILM_CAPTION}
            className="mb-12"
          />

          <SoldOutPassStory />

          <footer className="mt-16 border-t border-border pt-6 text-sm text-muted">
            <p>
              Curious what Owlka can do for you?{" "}
              <Link
                href="/download"
                className="underline hover:text-text transition-colors"
              >
                Download Owlka
              </Link>
              . Questions? Email{" "}
              <a
                href="mailto:support@owlka.com"
                className="underline hover:text-text transition-colors"
              >
                support@owlka.com
              </a>
              .
            </p>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
