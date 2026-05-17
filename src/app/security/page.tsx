import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const LAST_UPDATED = "2026-05-17";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Owlka keeps your work private. Code, conversation, and memory live on your own Mac. Phone and Mac talk through an encrypted middleman we cannot read.",
  alternates: { canonical: "/security" },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    url: `${SITE_URL}/security`,
    title: "Security",
    description:
      "How Owlka keeps your work private. Code, conversation, and memory live on your own Mac.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Security",
    description:
      "How Owlka keeps your work private. Code, conversation, and memory live on your own Mac.",
  },
};

type Row = { label: string; value: string };

type Section = {
  id: string;
  title: string;
  intro?: string;
  rows: Row[];
  footnote?: string;
};

const SECTIONS: Section[] = [
  {
    id: "shape",
    title: "The shape of the product",
    intro:
      "Owlka is a Mac app and an iPhone app. The Mac app runs the real work; the iPhone app is the front seat. The two talk to each other through an encrypted middleman that we operate but cannot read.",
    rows: [
      {
        label: "Your code stays on your Mac",
        value:
          "The Owlka Mac app launches the official Claude Code app under your own Anthropic login. Your files, your terminal, and your project memory all live on your Mac. We never copy them to a server.",
      },
      {
        label: "Your conversation is end-to-end between phone and Mac",
        value:
          "Every message and every reply is sealed on your phone or your Mac before it leaves the device. Only your paired devices hold the keys. The middleman just shuttles sealed packets back and forth.",
      },
      {
        label: "Pairing happens face to face",
        value:
          "The first time you pair a phone with your Mac, you scan a one-time QR code from the Mac app. That exchange is what hands the keys over. Nothing in the keys ever crosses our servers in the clear.",
      },
      {
        label: "We hold no master key",
        value:
          "If you lose your Mac and all your paired phones, we cannot recover your conversation history. There is no Owlka-side decryption key by design.",
      },
    ],
  },
  {
    id: "middleman",
    title: "The encrypted middleman, in plain English",
    intro:
      "The middleman is the only piece of Owlka infrastructure your devices talk to. Here is exactly what it does and does not do.",
    rows: [
      {
        label: "What it sees",
        value:
          "Sealed packets, the IP addresses of the connecting phone and Mac, and the timing of each packet. It cannot open the packets.",
      },
      {
        label: "What it does",
        value:
          "Queues sealed packets so a phone that drops off Wi-Fi can pick up where it left off when it comes back. Typical queue depth is minutes.",
      },
      {
        label: "What it does not do",
        value:
          "It does not store conversation history. It does not log packet contents. It does not have a key that would let it.",
      },
      {
        label: "Where it runs",
        value:
          "On a small server we operate, fronted by Cloudflare for DDoS protection and TLS. The server stores no decryption key.",
      },
    ],
  },
  {
    id: "downloads",
    title: "The Mac download",
    intro:
      "The Mac app is signed and notarised by Apple before it ever reaches you. Your Mac checks the signature on first launch and refuses to run a tampered build.",
    rows: [
      {
        label: "Code signing",
        value:
          "The .dmg you download is signed with our Apple Developer certificate and notarised by Apple. macOS Gatekeeper checks both before opening it.",
      },
      {
        label: "Auto-update",
        value:
          "Updates are downloaded over HTTPS and the same signature is checked again before the new build replaces the old one. An update with a broken or missing signature is refused.",
      },
      {
        label: "What runs locally",
        value:
          "The Owlka Mac app, the official Claude Code app under your own Anthropic login, and a small local helper that maintains the encrypted channel to the middleman. Nothing else.",
      },
    ],
  },
  {
    id: "iphone",
    title: "The iPhone app",
    rows: [
      {
        label: "Keys in the Keychain",
        value:
          "The keys that pair your phone to your Mac live in the iOS Keychain, protected by the device passcode and Face ID / Touch ID.",
      },
      {
        label: "Cached messages",
        value:
          "The phone caches the messages you have already seen so the UI feels fast. The cache is encrypted at rest by iOS Data Protection.",
      },
      {
        label: "Removing a phone",
        value:
          "Unpairing a phone from the Mac app invalidates that phone's key. After that, sealed packets from the unpaired phone are refused.",
      },
    ],
  },
  {
    id: "honest",
    title: "Honest disclosures",
    intro:
      "We would rather lose a sale than mislead you. The items below are limits of the product and the company as they stand today.",
    rows: [
      {
        label: "We can see metadata, not content",
        value:
          "We can see that your phone and your Mac talked, when they talked, and how much data they exchanged. We cannot see what they said. If hiding even that metadata matters to you, an internet-based assistant is the wrong shape.",
      },
      {
        label: "Anthropic sees what Claude sees",
        value:
          "Claude itself runs under your own Anthropic account, on your Mac, talking to Anthropic directly. Whatever you type to Claude reaches Anthropic. Their privacy terms govern that traffic, not ours. Anthropic is not an Owlka sub-processor because the data never passes through us.",
      },
      {
        label: "No SOC 2 or ISO 27001 in Owlka's own name yet",
        value:
          "We do not yet hold SOC 2 or ISO 27001 in Owlka's own name. The middleman runs on Cloudflare's network (SOC 2 Type II, ISO 27001) and the App Store distribution is Apple's. We will publish our own certification roadmap when we have one.",
      },
      {
        label: "No model training on your work",
        value:
          "Owlka does not train any model. Your code, your prompts, and the work Claude produces for you are not used to train anything by us. Your usage of Claude is governed by your agreement with Anthropic.",
      },
    ],
  },
  {
    id: "report",
    title: "Reporting a vulnerability",
    rows: [
      {
        label: "Contact",
        value:
          "If you find a security issue, please email security@owlka.com with details.",
      },
      {
        label: "Response time",
        value: "We respond to verified reports within seven days.",
      },
      {
        label: "Credit",
        value: "We credit researchers publicly with permission.",
      },
    ],
  },
];

export default function SecurityPage() {
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
              Security
            </h1>
            <p className="mt-3 text-muted">
              Last updated {LAST_UPDATED}. This page describes how Owlka keeps
              your work private: what lives on your Mac, what crosses the
              encrypted middleman, and what we honestly cannot do.
            </p>
          </header>

          <nav
            aria-label="On this page"
            className="mb-12 rounded-[18px] border border-border bg-surface p-5 text-sm"
          >
            <p className="mb-3 font-medium">On this page</p>
            <ul className="space-y-1.5">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-muted hover:text-text transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

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

              {section.footnote && (
                <p className="mt-3 text-xs text-muted leading-relaxed">
                  {section.footnote}
                </p>
              )}
            </section>
          ))}

          <footer className="mt-16 border-t border-border pt-6 text-sm text-muted">
            <p>
              Questions about anything on this page? Email{" "}
              <a
                href="mailto:security@owlka.com"
                className="underline hover:text-text transition-colors"
              >
                security@owlka.com
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
