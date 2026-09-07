import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const TITLE = "Stories";
const DESCRIPTION =
  "Real moments from people using Owlka, in their own words.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/stories" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: `${SITE_URL}/stories`,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

type StoryEntry = {
  slug: string;
  title: string;
  standfirst: string;
  date: string;
  displayDate: string;
};

const STORIES: StoryEntry[] = [
  {
    slug: "the-sold-out-pass",
    title: "How Owlka booked a sold-out pass",
    standfirst:
      "I think it's fair to say my wife wasn't the biggest fan of Owlka. That was two days ago. Now she 'gets it'.",
    date: "2026-09-07",
    displayDate: "7 September 2026",
  },
];

export default function StoriesPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg text-text">
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-24 sm:pt-20 sm:pb-32">
          <header className="mb-12">
            <Link
              href="/"
              className="text-sm text-muted hover:text-text transition-colors"
            >
              &larr; Back to Owlka
            </Link>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              Stories
            </h1>
            <p className="mt-3 text-muted leading-relaxed">
              Real moments from people using Owlka, in their own words.
            </p>
          </header>

          <ul className="space-y-6">
            {STORIES.map((story) => (
              <li key={story.slug}>
                <Link
                  href={`/stories/${story.slug}`}
                  className="block rounded-[18px] border border-border bg-surface p-6 transition-colors hover:border-mark/40"
                >
                  <time
                    dateTime={story.date}
                    className="text-sm text-muted"
                  >
                    {story.displayDate}
                  </time>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    {story.title}
                  </h2>
                  <p className="mt-2 text-text/70 leading-relaxed">
                    {story.standfirst}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
