import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { COMPANY_NAME } from "@/lib/company";

const LAST_UPDATED = "2026-06-09";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Owlka. What it is, how it works, whether the relay can read your messages, whether it uses your Claude subscription or an API key, supported platforms, pricing, and privacy.",
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    url: `${SITE_URL}/faq`,
    title: "FAQ",
    description:
      "Answers to the most common questions about Owlka. How it works, how it stays private, what it costs, and which platforms it runs on.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "FAQ",
    description:
      "Answers to the most common questions about Owlka. How it works, how it stays private, what it costs, and which platforms it runs on.",
  },
};

type QA = { q: string; a: React.ReactNode };

type Section = {
  id: string;
  title: string;
  items: QA[];
};

const SECTIONS: Section[] = [
  {
    id: "basics",
    title: "The basics",
    items: [
      {
        q: "What is Owlka?",
        a: (
          <>
            Owlka is an iPhone app that lets you drive Claude running on
            your own Mac, no terminal and no coding background needed. The Mac
            does the real work and the phone is the front seat. The two talk to each other through an end-to-end encrypted
            relay that we operate but cannot read. Your code, your terminal,
            and your project memory stay on your own machine. Want the longer
            version? See{" "}
            <Link
              href="/how-it-works"
              className="underline hover:text-text transition-colors"
            >
              How it works
            </Link>
            .
          </>
        ),
      },
      {
        q: "How does it work?",
        a: (
          <>
            You install the Owlka desktop app on your Mac and the Owlka app on
            your iPhone. The Mac app shows a one-time QR code. You scan it from
            the phone, which exchanges the encryption keys directly between the
            two devices. After that, your phone and your Mac both connect to the
            Owlka relay. Anything you type or say on the phone is sealed, sent
            phone to relay to Mac, and the Mac forwards it to the local{" "}
            <span className="font-medium">claude</span> command-line tool.
            Claude does the work on your Mac and the reply is sealed and streamed
            back the same way.
          </>
        ),
      },
      {
        q: "Do I need both a Mac and an iPhone?",
        a: (
          <>
            Yes. Owlka is a Mac desktop app and an iPhone app working together.
            The Mac runs Claude and holds your files. The iPhone is how you talk
            to it from anywhere. Neither half does anything useful on its own.
          </>
        ),
      },
    ],
  },
  {
    id: "security",
    title: "Security and privacy",
    items: [
      {
        q: "Can the relay read my messages?",
        a: (
          <>
            No. Every message is encrypted on your phone or your Mac before it
            leaves the device, and only your paired devices hold the keys. The
            relay looks at the recipient label on the outside of each sealed
            envelope and forwards it by key prefix. It does not open envelopes,
            it writes nothing to disk (it may hold a sealed packet in memory for
            a short window while a device reconnects), and it does not log their
            contents. We hold no master key and have no Owlka-side way to decrypt
            your conversation. The cryptographic detail is on the{" "}
            <Link
              href="/security"
              className="underline hover:text-text transition-colors"
            >
              Security
            </Link>{" "}
            page.
          </>
        ),
      },
      {
        q: "What can Owlka actually see?",
        a: (
          <>
            We can see connection metadata: that a phone and a Mac talked, when,
            the per-pair public-key identifiers, the IP addresses, and the byte
            size of each sealed packet. We cannot see what you said, your
            files, your tool arguments, or your tool output. If hiding even that
            metadata matters to you, an internet-based assistant is the wrong
            shape. The full, honest list is in our{" "}
            <Link
              href="/privacy"
              className="underline hover:text-text transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </>
        ),
      },
      {
        q: "Does Owlka train AI models on my work?",
        a: (
          <>
            No. Owlka does not train any model on your prompts, your code, or
            the work Claude produces for you. Your use of Claude itself is
            governed by your own agreement with Anthropic, because your Mac
            talks to Anthropic directly under your own account.
          </>
        ),
      },
      {
        q: "What about dictation?",
        a: (
          <>
            When you dictate, your phone transcribes your voice locally using
            Apple&rsquo;s on-device Speech framework. The audio never leaves
            your phone. Only the transcribed text is sealed and sent to your
            Mac, exactly like a typed message.
          </>
        ),
      },
    ],
  },
  {
    id: "claude",
    title: "Claude and your subscription",
    items: [
      {
        q: "Does Owlka use my Claude subscription or an API key?",
        a: (
          <>
            Your subscription. The Owlka desktop app runs the local{" "}
            <span className="font-medium">claude</span> command-line tool, which
            uses your own Claude Pro or Max login on your Mac. Anthropic API
            tokens are never read or used. The desktop app scrubs every
            API-key-flavoured environment variable before it starts the Claude
            tool, so your usage runs through your subscription, not a metered
            API bill.
          </>
        ),
      },
      {
        q: "Does Owlka resell Anthropic or see my Claude login?",
        a: (
          <>
            No to both. Owlka does not resell Anthropic. You bring your own
            Claude Pro or Max subscription. Owlka never sees, copies, or stores
            your Anthropic login. It lives where the Claude tools put it on your
            machine, under your operating system&rsquo;s user permissions, and
            your Mac talks to Anthropic directly. We never see your Claude
            traffic.
          </>
        ),
      },
      {
        q: "Will the AI ever get things wrong?",
        a: (
          <>
            Yes. Claude, like every large language model, can sound confident
            and be wrong, invent facts, or write code that looks right but is
            not. It also has deep control of your Mac and can create, edit, and
            delete files. Treat replies as drafts, keep backups, and read
            changes before you approve them. The full picture is on the{" "}
            <Link
              href="/ai-use"
              className="underline hover:text-text transition-colors"
            >
              AI Use
            </Link>{" "}
            page.
          </>
        ),
      },
    ],
  },
  {
    id: "platforms",
    title: "Platforms and pricing",
    items: [
      {
        q: "What platforms does Owlka support?",
        a: (
          <>
            Today, a Mac desktop app and an iPhone app. The Mac app is signed
            and notarised by Apple and runs on Apple Silicon and Intel Macs.
            The iPhone app comes from the App Store. A Windows desktop build is
            in development and not yet available. We will announce it on the{" "}
            <Link
              href="/download"
              className="underline hover:text-text transition-colors"
            >
              download
            </Link>{" "}
            page when the build is ready. For exact system requirements, see{" "}
            <Link
              href="/support"
              className="underline hover:text-text transition-colors"
            >
              Support
            </Link>
            .
          </>
        ),
      },
      {
        q: "How much does Owlka cost?",
        a: (
          <>
            Owlka is free to download and use. No card on file, no charge, no
            usage meter on you. You do need your own Claude Pro or Max
            subscription from Anthropic, which Owlka does not resell. See the{" "}
            <Link
              href="/#pricing"
              className="underline hover:text-text transition-colors"
            >
              pricing section
            </Link>{" "}
            for the current details.
          </>
        ),
      },
      {
        q: "Who is behind Owlka?",
        a: (
          <>
            Owlka is built by {COMPANY_NAME}, a company registered in England
            and Wales. {COMPANY_NAME} is the data controller for the small
            amount of personal data Owlka processes. Details and your data
            rights are in the{" "}
            <Link
              href="/privacy"
              className="underline hover:text-text transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    id: "pairing",
    title: "Pairing and connections",
    items: [
      {
        q: "How do I pair my phone with my Mac?",
        a: (
          <>
            Install the Owlka desktop app on your Mac and the Owlka app on your
            iPhone. In the desktop app, choose to pair a phone. A one-time QR
            code appears. In the iPhone app, choose to pair a new desktop and
            scan the code. The two devices exchange public keys directly, and
            the code expires straight after. You can pair as many phones with a
            Mac as you like, and one phone can pair with several Macs. Each pair
            is partitioned, so one person&rsquo;s sessions are never visible to
            another.
          </>
        ),
      },
      {
        q: "What happens if my Mac sleeps or disconnects?",
        a: (
          <>
            Claude runs on your Mac, so your Mac needs to be awake and online
            for new work to happen. If the phone briefly drops off Wi-Fi, the
            relay queues sealed packets for a short window, so the phone can
            pick up where it left off when it reconnects. The relay does not
            store conversation history, so this is a short queue, not a backup.
            If your Mac is asleep or offline, new prompts wait until it is
            reachable again.
          </>
        ),
      },
      {
        q: "How do I unpair a phone or delete my data?",
        a: (
          <>
            Unpairing a phone from the desktop app invalidates that phone&rsquo;s
            key, and sealed packets from it are refused after that. To remove
            everything, open the iPhone app and go to Settings, Account, Delete
            account. The app wipes local data on your phone and tells the relay
            to forget your device records. Anything stored on your own Mac is
            yours to manage on your machine. Full steps are in the{" "}
            <Link
              href="/privacy"
              className="underline hover:text-text transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </>
        ),
      },
    ],
  },
];

export default function FAQPage() {
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
              Frequently asked questions
            </h1>
            <p className="mt-3 text-muted">
              Last updated {LAST_UPDATED}. The short answers to the questions
              we hear most about Owlka: what it is, how it stays private, what
              it costs, and which platforms it runs on. Each answer links to the
              page with the full detail.
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
              <h2 className="text-2xl font-semibold tracking-tight mb-6">
                {section.title}
              </h2>

              <div className="space-y-4">
                {section.items.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-card border border-border bg-surface px-6 py-5 open:bg-bg/60"
                  >
                    <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                      <span className="text-lg font-semibold tracking-tight">
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className="mt-1 inline-block w-5 h-5 shrink-0 text-mark transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className="mt-4 text-text/80 leading-relaxed">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <footer className="mt-16 border-t border-border pt-6 text-sm text-muted">
            <p>
              Did not find your answer? Email{" "}
              <a
                href="mailto:support@owlka.com"
                className="underline hover:text-text transition-colors"
              >
                support@owlka.com
              </a>{" "}
              or read{" "}
              <Link
                href="/how-it-works"
                className="underline hover:text-text transition-colors"
              >
                How it works
              </Link>
              ,{" "}
              <Link
                href="/security"
                className="underline hover:text-text transition-colors"
              >
                Security
              </Link>
              , and{" "}
              <Link
                href="/support"
                className="underline hover:text-text transition-colors"
              >
                Support
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
