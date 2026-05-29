import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const LAST_UPDATED = "2026-05-29";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How Owlka works in plain English. Pair your phone to your Mac with a QR code, drive your Mac's Claude from anywhere, end-to-end encrypted. The relay only sees scrambled bytes.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    url: `${SITE_URL}/how-it-works`,
    title: "How it works",
    description:
      "Pair your phone to your Mac with a QR code, drive your Mac's Claude from anywhere, end-to-end encrypted.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "How it works",
    description:
      "Pair your phone to your Mac with a QR code, drive your Mac's Claude from anywhere, end-to-end encrypted.",
  },
};

type Step = {
  n: string;
  tag: string;
  title: string;
  body: string;
};

// Setup walkthrough — mirrors the in-app intro carousel
// (TerminalApp/Owlka/OwlkaIntroCarousel.swift, "Setup" slides) so the
// website and the app tell the same story.
const STEPS: Step[] = [
  {
    n: "1",
    tag: "Setup",
    title: "Install Owlka for Mac",
    body:
      "Download the signed Mac app from owlka.com/download. Drag it into Applications and launch it. Owlka launches the official Claude Code tools under your own Anthropic login and keeps your code, terminal, and project memory on your Mac.",
  },
  {
    n: "2",
    tag: "Setup",
    title: "Pair your phone with a QR code",
    body:
      "The Mac app shows a one-time QR code. Scan it from the Owlka iPhone app. Pairing is one tap, and the code expires straight after. That scan is what hands the encryption keys over, face to face, so nothing secret ever crosses our servers in the clear.",
  },
  {
    n: "3",
    tag: "Setup",
    title: "Use Claude Code anywhere",
    body:
      "Your phone is now a thin client for the Mac. Talk by voice or type, watch what Claude is doing live, approve a change, kick off a build, or pause it, all from the sofa. Pick up the same conversation on every paired phone.",
  },
];

type Row = { label: string; value: string };

type Section = {
  id: string;
  title: string;
  intro?: string;
  rows: Row[];
};

const SECTIONS: Section[] = [
  {
    id: "three-pieces",
    title: "Three pieces, one conversation",
    intro:
      "Owlka is a Mac app and an iPhone app. The Mac does the real work; the phone is the front seat. The two talk through an encrypted middleman we run but cannot read.",
    rows: [
      {
        label: "Your Claude, on your Mac",
        value:
          "Owlka runs on your Mac and launches the official Claude Code tools under your own Anthropic login. Your code, your memory, and your work stay on your own machine. Nothing about your project lives on our servers.",
      },
      {
        label: "Your iPhone, your conversation",
        value:
          "The Owlka iPhone app is the front seat. Talk by voice or type, watch what Claude is doing live, and step in whenever you want. The same conversation shows up on every paired phone.",
      },
      {
        label: "An encrypted middleman",
        value:
          "Your phone and your Mac talk through a relay we host. It queues sealed packets and forwards them on, so a phone that drops off Wi-Fi can pick up where it left off. It cannot open the packets.",
      },
    ],
  },
  {
    id: "encryption",
    title: "End-to-end encrypted, in plain English",
    intro:
      "The conversation stays between your phone and your Mac. Here is what that actually means.",
    rows: [
      {
        label: "Sealed on the device",
        value:
          "Every message is encrypted on your phone or your Mac before it leaves the device. Only your paired devices hold the keys, so only they can open the messages.",
      },
      {
        label: "The relay sees scrambled bytes",
        value:
          "The relay carries sealed packets back and forth. It can see that your phone and Mac talked, when, and roughly how much data they exchanged. It cannot see what they said. There is no Owlka-side key that would let it.",
      },
      {
        label: "Keys are handed over at pairing",
        value:
          "The one-time QR code you scan when you pair is what exchanges the keys. That happens face to face between your two devices. The keys never travel across our servers in the clear.",
      },
      {
        label: "We hold no master key",
        value:
          "If you lose your Mac and all your paired phones, we cannot recover your conversation history. By design, there is no Owlka-side way to decrypt it.",
      },
    ],
  },
  {
    id: "speech",
    title: "Speech stays on your phone",
    rows: [
      {
        label: "Dictate, don't type",
        value:
          "Press and hold to speak. Speech-to-text runs on your phone using Apple's on-device Speech framework. The audio never leaves your phone; only the transcribed text is sealed and sent to your Mac, exactly like a typed message.",
      },
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg text-text">
        <div className="mx-auto max-w-3xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
          <header className="mb-10">
            <Link
              href="/"
              className="text-sm text-muted hover:text-text transition-colors"
            >
              &larr; Back to Owlka
            </Link>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              How it works
            </h1>
            <p className="mt-3 text-muted">
              Last updated {LAST_UPDATED}. Owlka runs Claude Code on your Mac,
              talks to your iPhone through an encrypted middleman, and keeps
              the work on your own machine. Here is the whole thing, start to
              finish.
            </p>
          </header>

          {/* Setup walkthrough */}
          <section id="setup" className="mb-16 scroll-mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              Getting started in three steps
            </h2>
            <ol className="mt-6 space-y-4">
              {STEPS.map((step) => (
                <li
                  key={step.n}
                  className="rounded-[18px] border border-border bg-surface p-6"
                >
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-tint-mark text-mark font-semibold"
                    >
                      {step.n}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-mark">
                        {step.tag}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold tracking-tight">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-muted leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="mb-14 scroll-mt-16"
            >
              <h2 className="text-2xl font-semibold tracking-tight">
                {section.title}
              </h2>
              {section.intro && (
                <p className="mt-3 text-muted leading-relaxed">
                  {section.intro}
                </p>
              )}

              <dl className="mt-6 rounded-[18px] border border-border bg-surface">
                {section.rows.map((row, i) => (
                  <div
                    key={row.label}
                    className={`grid gap-2 p-6 sm:grid-cols-[14rem_1fr] sm:gap-8 ${
                      i > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <dt className="font-medium">{row.label}</dt>
                    <dd className="text-muted leading-relaxed">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}

          {/* Good to know — the two required risk flags */}
          <section id="good-to-know" className="mb-14 scroll-mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              Good to know before you start
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              Owlka is powerful because Claude can do real work on your real
              Mac. Two things are worth understanding before you rely on it.
            </p>

            <dl className="mt-6 rounded-[18px] border border-border bg-surface">
              <div className="grid gap-2 p-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <dt className="font-medium">AI replies can be wrong</dt>
                <dd className="text-muted leading-relaxed">
                  Claude runs on your own Mac and writes the replies you see.
                  Like every AI model, it can hallucinate, invent facts, and
                  write code that looks right but is not. Treat replies as
                  drafts and verify anything important. Owlka is not for
                  medical, legal, or financial advice.
                </dd>
              </div>
              <div className="grid gap-2 border-t border-border p-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <dt className="font-medium">
                  Claude has deep control of your Mac
                </dt>
                <dd className="text-muted leading-relaxed">
                  Claude Code can run real commands on your Mac: it can
                  create, edit, and delete files and run programs. A
                  misunderstood instruction can damage your work, including
                  deleting files. You use Owlka at your own risk, so keep
                  backups and read changes before you approve them.
                </dd>
              </div>
            </dl>

            <p className="mt-3 text-sm text-muted leading-relaxed">
              The full version of both points is on the{" "}
              <Link
                href="/ai-use"
                className="underline hover:text-text transition-colors"
              >
                AI Use
              </Link>{" "}
              page.
            </p>
          </section>

          <footer className="mt-16 border-t border-border pt-6 text-sm text-muted">
            <p>
              Ready to try it?{" "}
              <Link
                href="/download"
                className="underline hover:text-text transition-colors"
              >
                Download Owlka for Mac
              </Link>
              . Want the cryptographic detail? See{" "}
              <Link
                href="/security"
                className="underline hover:text-text transition-colors"
              >
                Security
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
        </div>
      </main>
      <Footer />
    </>
  );
}
