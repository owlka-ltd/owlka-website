import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const LAST_UPDATED = "2026-05-25";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Owlka in three pieces: your iPhone, an end-to-end encrypted relay that Owlka Ltd cannot read, and the Mac in your home or office that runs your own Claude. Plain English, no jargon.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    url: `${SITE_URL}/how-it-works`,
    title: "How Owlka works",
    description:
      "Owlka in three pieces: your iPhone, an end-to-end encrypted relay that Owlka Ltd cannot read, and the Mac in your home or office that runs your own Claude.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "How Owlka works",
    description:
      "Owlka in three pieces: your iPhone, an end-to-end encrypted relay, and the Mac that runs your own Claude.",
  },
};

type Piece = {
  id: string;
  badge: string;
  title: string;
  oneLine: string;
  paragraphs: string[];
};

const PIECES: Piece[] = [
  {
    id: "phone",
    badge: "Piece 1",
    title: "Your iPhone",
    oneLine:
      "The Owlka app on your phone. The front seat of the conversation.",
    paragraphs: [
      "The iPhone app is where you talk to your Claude. You type, you dictate, you watch what Claude is doing live, you approve or reject changes, you pause a long job, you kick off a build from the sofa.",
      "The phone never holds your code and never talks to Anthropic directly. It is the interface; the work happens on your Mac. The phone has its own pair of keys (one for encryption, one for signing) that it generated the first time you paired it with a Mac. Those keys live in the iOS Keychain, protected by Face ID or Touch ID and your device passcode.",
      "When you dictate, Apple's on-device Speech framework turns your voice into text on the phone. The audio recording never leaves the device. Once the transcript exists, the phone seals it and sends it just like a typed message.",
    ],
  },
  {
    id: "relay",
    badge: "Piece 2",
    title: "The relay",
    oneLine:
      "A small content-blind server that Owlka Ltd runs on Hetzner Cloud in Germany. It shuttles sealed envelopes between your phone and your Mac.",
    paragraphs: [
      "The relay's job is to keep a long-lived encrypted channel open between every paired device, so a message sent from your phone arrives on your Mac even if your Mac was briefly offline. If your phone drops off Wi-Fi for a minute, the relay holds the next envelope until it reconnects.",
      "The relay has no cryptographic keys of its own. It cannot open envelopes. It cannot read what is inside them. The envelope's body is sealed by ChaCha20-Poly1305 using a key derived from a Curve25519 handshake between your phone and your Mac; only those two devices hold the keys. The relay sees only the routing address (the ed25519 public key on the to: field), the byte size of each envelope, and the timing of packets.",
      "The relay is fronted by Cloudflare for DDoS protection and TLS. The Hetzner box itself stores a small SQLite of paired routing addresses, connection metrics counters, and a short-lived challenge cache used to authenticate connecting devices. No envelope bodies, no message history, no decryption key.",
      "For the full crypto detail (algorithms, libraries, version strings), see the security page.",
    ],
  },
  {
    id: "mac",
    badge: "Piece 3",
    title: "The Mac in your home or office",
    oneLine:
      "Where the real work happens. Owlka launches your own Claude under your own Anthropic subscription.",
    paragraphs: [
      "You install the Owlka desktop app on a Mac that stays powered on (a Mac mini, a MacBook left at home, an iMac on your desk). That Mac runs three things on your behalf: the Owlka desktop app itself, a small bridge daemon that holds the encrypted channel open to the relay, and the official Claude Code tools under your own Anthropic login.",
      "Your code, your files, your project memory, and your shell all live on this Mac. Owlka Ltd never copies any of it to a server. When the iPhone asks Claude to do something, the desktop unseals the envelope, runs the requested action locally, and seals the response back. Anthropic sees what Claude sees (the prompt and the model's reply), because Claude itself talks to Anthropic from your Mac under your own account. Owlka Ltd never sees that traffic.",
      "The desktop app also generates the pair QR code you scan with the iPhone the first time you connect a phone. That QR exchange is what hands over the public keys; no private key ever crosses the relay or any other server.",
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
              How Owlka works
            </h1>
            <p className="mt-3 text-muted">
              Last updated {LAST_UPDATED}. Owlka is three pieces: a phone, a
              relay, and a Mac. The phone is the front seat. The Mac does the
              real work. The relay shuttles sealed envelopes between the two
              and cannot read them. This page is the plain-English tour. For
              the cryptography detail, see{" "}
              <Link
                href="/security"
                className="underline hover:text-text transition-colors"
              >
                security
              </Link>
              .
            </p>
          </header>

          <section className="mb-14 rounded-[18px] border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold mb-3">
              The shape, in one paragraph
            </h2>
            <p className="text-muted leading-relaxed">
              Your iPhone (the Owlka app) talks to the Mac in your home or
              office (the Owlka desktop app, which runs your own Claude) via
              an end-to-end encrypted relay operated by Owlka Ltd. The relay
              is content-blind: every envelope it forwards is sealed by your
              two devices and can only be opened by your two devices. Owlka
              Ltd holds no master key. If you lose both your Mac and every
              paired phone, your conversation history is gone for good and we
              cannot recover it.
            </p>
          </section>

          {PIECES.map((piece) => (
            <section
              key={piece.id}
              id={piece.id}
              className="mb-14 scroll-mt-16"
            >
              <p className="text-sm font-medium text-mark uppercase tracking-wider mb-2">
                {piece.badge}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight">
                {piece.title}
              </h2>
              <p className="mt-2 text-text/85 leading-relaxed">
                {piece.oneLine}
              </p>
              <div className="mt-6 rounded-[18px] border border-border bg-surface p-6 space-y-4">
                {piece.paragraphs.map((para, i) => (
                  <p key={i} className="text-muted leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section className="mb-14 scroll-mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              What this design buys you
            </h2>
            <dl className="mt-6 rounded-[18px] border border-border bg-surface">
              <div className="grid gap-2 p-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <dt className="font-medium">Your code never leaves your Mac</dt>
                <dd className="text-muted leading-relaxed">
                  Source files, project memory, environment, and tools all
                  live on the Mac. Owlka Ltd cannot copy them. Anthropic only
                  sees what Claude itself sees, under your own account.
                </dd>
              </div>
              <div className="grid gap-2 p-6 sm:grid-cols-[14rem_1fr] sm:gap-8 border-t border-border">
                <dt className="font-medium">No Owlka-side master key</dt>
                <dd className="text-muted leading-relaxed">
                  There is nothing we could hand to a subpoena, a hacker, or
                  a future Owlka employee that would let them read your
                  envelopes. The keys live on your phone and your Mac.
                </dd>
              </div>
              <div className="grid gap-2 p-6 sm:grid-cols-[14rem_1fr] sm:gap-8 border-t border-border">
                <dt className="font-medium">Multiple phones, multiple Macs</dt>
                <dd className="text-muted leading-relaxed">
                  One household Mac can be paired with two people's phones,
                  each with their own keys, their own memory, and their own
                  connected accounts. One phone can be paired with both a
                  home Mac and a work Mac. Each pair is its own boundary.
                </dd>
              </div>
              <div className="grid gap-2 p-6 sm:grid-cols-[14rem_1fr] sm:gap-8 border-t border-border">
                <dt className="font-medium">Speech stays on the device</dt>
                <dd className="text-muted leading-relaxed">
                  Apple's on-device Speech framework transcribes locally.
                  Audio never reaches Apple, Owlka Ltd, or anyone else.
                </dd>
              </div>
            </dl>
          </section>

          <section className="mb-14 scroll-mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              What this design costs you
            </h2>
            <dl className="mt-6 rounded-[18px] border border-border bg-surface">
              <div className="grid gap-2 p-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <dt className="font-medium">Your Mac has to be on</dt>
                <dd className="text-muted leading-relaxed">
                  The phone is dead while the Mac is asleep or offline.
                  Owlka stores no conversation history on the relay, so
                  there is nothing for the phone to read on its own. If you
                  want the phone to work while the Mac is off, this is not
                  the right shape of product.
                </dd>
              </div>
              <div className="grid gap-2 p-6 sm:grid-cols-[14rem_1fr] sm:gap-8 border-t border-border">
                <dt className="font-medium">We can see metadata</dt>
                <dd className="text-muted leading-relaxed">
                  Owlka Ltd can see that your phone and your Mac talked,
                  when they talked, and roughly how much data they
                  exchanged. We cannot see what they said. If even that
                  metadata matters to you, an internet-based assistant is
                  the wrong shape.
                </dd>
              </div>
              <div className="grid gap-2 p-6 sm:grid-cols-[14rem_1fr] sm:gap-8 border-t border-border">
                <dt className="font-medium">Anthropic sees Claude traffic</dt>
                <dd className="text-muted leading-relaxed">
                  Your Mac talks to Anthropic directly under your own
                  account. Anthropic sees the prompts and replies under
                  their own privacy terms. Owlka Ltd has no partnership
                  with Anthropic; that channel does not pass through us.
                </dd>
              </div>
              <div className="grid gap-2 p-6 sm:grid-cols-[14rem_1fr] sm:gap-8 border-t border-border">
                <dt className="font-medium">Lose all devices, lose history</dt>
                <dd className="text-muted leading-relaxed">
                  If your Mac and every paired phone are lost or destroyed
                  at the same time, the keys are gone and the encrypted
                  history is unrecoverable. There is no Owlka-side backup
                  of your envelopes.
                </dd>
              </div>
            </dl>
          </section>

          <footer className="mt-16 border-t border-border pt-6 text-sm text-muted">
            <p>
              Questions about anything on this page? Email{" "}
              <a
                href="mailto:support@owlka.com"
                className="underline hover:text-text transition-colors"
              >
                support@owlka.com
              </a>
              . For the cryptographic detail, see{" "}
              <Link
                href="/security"
                className="underline hover:text-text transition-colors"
              >
                security
              </Link>
              .
            </p>
          </footer>
        </div>
      </main>
      <Footer />
    </>
  );
}
