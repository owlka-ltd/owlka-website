import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PromoVideoFigure } from "@/components/PromoVideo";
import { PROMO_SECURITY } from "@/lib/media";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const LAST_UPDATED = "2026-08-01";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Owlka keeps your work private. Code, conversation, and memory live on your own desktop. Phone and desktop talk through an encrypted relay we cannot read.",
  alternates: { canonical: "/security" },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    url: `${SITE_URL}/security`,
    title: "Security",
    description:
      "How Owlka keeps your work private. Code, conversation, and memory live on your own desktop.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Security",
    description:
      "How Owlka keeps your work private. Code, conversation, and memory live on your own desktop.",
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
      "Owlka is a desktop app for Mac and Windows plus an iPhone app. The desktop app does the real work; the iPhone app is the front seat. The two talk to each other through an encrypted relay that we operate but cannot read.",
    rows: [
      {
        label: "Your code stays on your desktop",
        value:
          "The Owlka desktop app launches the Claude tools under your own Anthropic subscription. Your files, your terminal, and your project memory all live on your desktop. We never copy them to a server.",
      },
      {
        label: "Your conversation is end-to-end between phone and desktop",
        value:
          "Every message and every reply is sealed on your phone or your desktop before it leaves the device. Only your paired devices hold the keys. The relay just shuttles sealed packets back and forth.",
      },
      {
        label: "Pairing happens face to face",
        value:
          "The first time you pair a phone with your desktop, you scan a one-time QR code from the desktop app. That exchange is what hands the keys over. Nothing in the keys ever crosses our servers in the clear.",
      },
      {
        label: "We hold no master key",
        value:
          "If you lose your desktop and all your paired phones, we cannot recover your conversation history. There is no Owlka-side decryption key by design.",
      },
    ],
  },
  {
    id: "crypto",
    title: "End-to-end encryption, in detail",
    intro:
      "Owlka uses well-known, open, public-key authenticated encryption primitives. The exact algorithms are listed below.",
    rows: [
      {
        label: "Library",
        value:
          "Apple's CryptoKit on iPhone, and the audited x25519-dalek, chacha20poly1305, and hkdf Rust crates on the desktop. Both sides implement the same authenticated public-key sealed-box scheme, byte for byte, for every sealed packet.",
      },
      {
        label: "Key exchange",
        value:
          "Curve25519 elliptic-curve Diffie-Hellman. Each paired device pair derives a shared secret without that secret ever travelling over the wire.",
      },
      {
        label: "Bulk encryption",
        value:
          "ChaCha20-Poly1305 authenticated encryption with a fresh 96-bit random nonce per packet. Nonces are never reused for a given key.",
      },
      {
        label: "Integrity",
        value:
          "Poly1305 message authentication code. A tampered packet is rejected on the receiving device; the relay has no way to forge a packet that would be accepted.",
      },
      {
        label: "Per-pair keypairs",
        value:
          "Every phone-and-desktop pair generates its own keypair. Tim's phone paired with his home Mac has a different keypair from Tim's phone paired with his work laptop, and a different keypair again from his wife's phone paired with the same home Mac. Revoking one pair does not affect any other pair.",
      },
    ],
  },
  {
    id: "relay",
    title: "The content-blind relay, in plain English",
    intro:
      "The relay is the piece of Owlka infrastructure your devices talk to while you work. Here is exactly what it does and does not do.",
    rows: [
      {
        label: "What it sees",
        value:
          "Sealed packets, the IP addresses of the connecting phone and desktop, and the timing of each packet. It cannot open the packets.",
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
          "On a small server we operate, reachable only through a Cloudflare tunnel. Cloudflare terminates TLS at relay.owlka.com and forwards the sealed traffic to the relay, so the connection from your device is protected by Cloudflare's certificate and the origin is not exposed directly. The server stores no decryption key.",
      },
      {
        label: "The one other Owlka server",
        value:
          "The relay is not quite the only Owlka machine your desktop contacts. It also asks our download host, download.owlka.com, whether a newer version exists, once at startup and every six hours after that, and fetches the terminal software it needs there on first run. Those are plain file downloads. Nothing about your work is sent to make them.",
      },
    ],
  },
  {
    id: "speech",
    title: "The microphone, and where your voice goes",
    intro:
      "Owlka does not transcribe speech on your device. If you use Owlka's microphone button, your audio is sent to ElevenLabs, a third-party speech company, and transcribed there. That only happens if you have added your own ElevenLabs key, and the button does nothing until you do.",
    rows: [
      {
        label: "Nothing happens without a key you add yourself",
        value:
          "Owlka ships no ElevenLabs key and does not provide one. Until you paste your own ElevenLabs API key into Connectors on the desktop app, the microphone button stays greyed out, no recording is made, and your microphone is never opened. Delete the key and the feature switches off again.",
      },
      {
        label: "Where your audio actually travels",
        value:
          "From the iPhone app, the recording is sealed with your pair's keypair, sent to your own desktop, and your desktop passes it to ElevenLabs using your key. From the desktop app, the recording goes straight from your machine to ElevenLabs. Either way the request is billed to your own ElevenLabs account and governed by ElevenLabs' terms, not ours.",
      },
      {
        label: "The spoken reply goes there too",
        value:
          "When Owlka reads a reply back to you out loud, the text of that reply is sent to ElevenLabs to be turned into speech. So it is not only your voice that reaches ElevenLabs; the text being read aloud does as well.",
      },
      {
        label: "We never receive the recording",
        value:
          "Our relay carries the audio from your phone to your desktop as sealed bytes it cannot open, and the desktop app then talks to ElevenLabs directly. No recording and no transcript ever arrives on an Owlka server.",
      },
      {
        label: "There is no on-device transcription",
        value:
          "Until August 2026 this page said Owlka transcribed your speech on your phone using Apple's Speech framework. That was wrong, and we have corrected it rather than leave it standing. Owlka does not transcribe on the device on any platform. If you want dictation that does not involve ElevenLabs, use your keyboard's own microphone key rather than Owlka's. That one is Apple's feature under Apple's terms, and we make no claim about where it sends your audio.",
      },
      {
        label: "Permission",
        value:
          "Your device prompts you the first time Owlka opens the microphone. You can revoke microphone access at any time in your system settings, and you can disconnect ElevenLabs at any time in Connectors on the desktop app.",
      },
    ],
  },
  {
    id: "downloads",
    title: "The desktop download",
    intro:
      "Owlka ships a Mac app and a Windows app. Both are code-signed before they ever reach you, and your computer checks the signature before it will run the build.",
    rows: [
      {
        label: "Mac code signing",
        value:
          "The .dmg you download is signed with our Apple Developer certificate and notarised by Apple. macOS Gatekeeper checks both before opening it.",
      },
      {
        label: "Windows code signing",
        value:
          "The .exe you download is code-signed in the name of Owlka Ltd and timestamped, so Windows does not show an unknown-publisher warning.",
      },
      {
        label: "Auto-update (Mac)",
        value:
          "Mac updates are downloaded over HTTPS and their signature is checked before the new build replaces the old one. The signature checked at that moment is ours, not Apple's: every release is signed with an Owlka release key that is kept outside the app, and an update that does not verify against it is refused. Apple's own signature and notarisation ticket travel inside the app bundle, so what ends up installed is still the notarised build Apple approved.",
      },
      {
        label: "Auto-update (Windows)",
        value:
          "The Windows build updates itself, like the Mac build. It checks our signed update feed over HTTPS, and the signature on a new build is verified before it replaces the old one. An update with a broken or missing signature is refused. One exception: installs from version 0.1.59 or earlier predate the updater and never check the feed, so those need one manual re-download from the download page, after which they update themselves like any other.",
      },
      {
        label: "What runs locally",
        value:
          "The Owlka desktop app, which keeps the encrypted channel to the relay open itself rather than through a separate helper. The Claude tools, under your own Anthropic subscription. A small approval hook that Claude runs before any gated action, so the decision you make is enforced on your own machine. Terminal multiplexer software that hosts your sessions. A Python interpreter, and up to three small Python helpers that give Claude Owlka's memory and connector features. All of it runs on your computer under your own user account.",
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
          "The keys that pair your phone to a desktop live in the iOS Keychain, protected by the device passcode and Face ID or Touch ID.",
      },
      {
        label: "Cached messages",
        value:
          "The phone caches the messages you have already seen so the UI feels fast. The cache is encrypted at rest by iOS Data Protection.",
      },
      {
        label: "Removing a phone",
        value:
          "Unpairing a phone from the desktop app invalidates that phone's key. After that, sealed packets from the unpaired phone are refused.",
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
        label: "We see metadata, and we see approval notifications",
        value:
          "We can see that your phone and your desktop talked, when they talked, and how much data they exchanged. We cannot see what they said: your messages are sealed on the device and the relay has no way to open them. There is one real exception, and it is worth stating clearly. When Owlka holds an action for your approval and pushes a notification to your phone, the text of that notification crosses our relay unsealed, because a push notification has to be readable to be delivered. That text is the short headline describing what Claude wants to do, the reason it was held for you, and, when no headline was written, the command itself. Your conversation is not in it, but it is not nothing. If hiding even that matters to you, an internet-based assistant is the wrong shape.",
      },
      {
        label: "What you send to Claude goes to Anthropic, not to us",
        value:
          "Owlka is not in this path at all. Claude is Anthropic's software: the Owlka desktop app launches it on your own machine, under your own Anthropic account, and it connects to Anthropic directly. So everything you send to Claude reaches Anthropic, and Anthropic's privacy terms govern that traffic rather than ours. Anthropic is not an Owlka sub-processor, because none of your Claude traffic ever passes through us. Owlka has no partnership with Anthropic.",
      },
      {
        label: "No SOC 2 or ISO 27001 in Owlka's own name yet",
        value:
          "We do not yet hold SOC 2 or ISO 27001 in Owlka's own name. The relay runs on Cloudflare's network (SOC 2 Type II, ISO 27001) and the App Store distribution is Apple's. We will publish our own certification roadmap when we have one.",
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
          "If you find a security issue, please email support@owlka.com with details and put \"security\" in the subject line. It reaches the same small team; we would rather publish an address that works than one that looks the part and bounces.",
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
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-24 sm:pt-20 sm:pb-32">
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
              your work private: what lives on your desktop, what crosses
              the encrypted relay, and what we honestly cannot do.
            </p>
          </header>

          {/* The security promo: E2EE between phone and desktop, memory that
              stays on your own machine. Click to play, with sound; below the
              header so it never delays the compliance content. */}
          <PromoVideoFigure
            clip={PROMO_SECURITY}
            caption="Thirty seconds on how Owlka keeps your work on your own machine."
            className="mb-12"
          />

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
