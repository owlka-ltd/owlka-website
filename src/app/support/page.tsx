import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Help, FAQs, system requirements, and how to reach the Owlka team. support@owlka.com.",
  alternates: { canonical: "/support" },
};

type FAQ = {
  q: string;
  a: React.ReactNode;
};

const faqs: FAQ[] = [
  {
    q: "How do I pair my iPhone with a desktop?",
    a: (
      <>
        Install the Owlka desktop app on your Mac and the
        Owlka iPhone app from the App Store. On the desktop app, click{" "}
        <span className="font-medium">Pair a phone</span>. A one-time QR
        code appears. On the iPhone app, tap{" "}
        <span className="font-medium">Pair a new desktop</span> and scan
        the QR code. The two devices exchange public keys directly; the
        keys never leave the devices in the clear. Once paired, your phone
        can start a Claude session on that desktop. You also need an
        active Claude Pro or Max subscription signed in on the desktop.
      </>
    ),
  },
  {
    q: "How do I switch between pairs?",
    a: (
      <>
        One phone can be paired with several desktops at once (home Mac
        mini and work laptop, for example), and one desktop can be paired
        with several phones (two members of a household). On the iPhone
        app, tap the desktop name at the top of the screen to open the
        desktop picker, then choose the desktop you want to talk to.
        Switching desktops switches the whole context, including memory,
        skills, and connected accounts, because each pair is partitioned.
        The wife&rsquo;s phone never sees the husband&rsquo;s sessions
        even when both are paired with the same household Mac.
      </>
    ),
  },
  {
    q: "What is the difference between Owl Claude and Raw Claude?",
    a: (
      <>
        Owlka has two modes you can switch between in Settings.{" "}
        <span className="font-medium">Owl Claude</span> is the default. It
        adds a safety layer: a four-tier permission classifier that asks
        you before letting Claude run anything irreversible, a kill
        switch, plain-English decision prompts, and the rest of the Owlka
        shell. <span className="font-medium">Raw Claude</span> is a
        direct passthrough to the Claude tools on your desktop with the
        safety layer switched off. Raw is for power users who want every
        keystroke to land verbatim; turning it on shows a confirmation
        screen first.
      </>
    ),
  },
  {
    q: "How much does Owlka cost?",
    a: (
      <>
        Owlka is in <span className="font-medium">public beta</span> and
        is free to use. No card on file, no charge, no usage meter on
        you. You also need your own Claude Pro or Max subscription from
        Anthropic, which Owlka does not resell.
      </>
    ),
  },
  {
    q: "How do I cancel?",
    a: (
      <>
        Owlka is free during the public beta — there is no Owlka
        subscription to cancel today. If you also want to remove the app,
        delete it from your iPhone home screen.
      </>
    ),
  },
  {
    q: "What happens to my data if I cancel?",
    a: (
      <>
        Cancellation stops the next bill. It does not delete anything by
        itself. Your local data on your desktop (Claude memory, project
        files) stays exactly where it was. The keys on your phone stay in
        the iOS Keychain. The desktop and phone apps remain installed.
        If you want a clean wipe, use the in-app Delete account flow
        before cancelling, or after, and the app will wipe the local
        data and tell the relay to drop your device records.
      </>
    ),
  },
  {
    q: "How do I delete my account?",
    a: (
      <>
        Open the iPhone app, tap{" "}
        <span className="font-medium">Settings, Account, Delete account</span>
        . The app will wipe local data on your phone, send a delete
        signal to the relay so the relay forgets your device records, and
        walk you through cancelling any active Owlka subscription in Apple
        Settings. If the in-app flow is unavailable, email{" "}
        <Link
          href="mailto:support@owlka.com"
          className="text-mark hover:underline"
        >
          support@owlka.com
        </Link>{" "}
        and we will delete the relay-side records for you.
      </>
    ),
  },
  {
    q: "Is my data safe?",
    a: (
      <>
        Your Claude login lives on your desktop and never leaves it. Your
        conversations and code live on your desktop. The encrypted relay
        between your desktop and your phone cannot read what passes
        through it. We do not train models on your content. Full detail
        in our{" "}
        <Link href="/privacy" className="text-mark hover:underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/security" className="text-mark hover:underline">
          Security
        </Link>{" "}
        pages.
      </>
    ),
  },
  {
    q: "Something's broken. What now?",
    a: (
      <>
        Email{" "}
        <Link
          href="mailto:support@owlka.com"
          className="text-mark hover:underline"
        >
          support@owlka.com
        </Link>{" "}
        with: what you tried, what you expected, what happened instead,
        your iOS version, your desktop OS version, and the Owlka build
        number (Settings, About in the app). We aim to acknowledge within
        one working day. For known incidents, check{" "}
        <a
          href="https://status.owlka.com"
          className="text-mark hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          status.owlka.com
        </a>
        .
      </>
    ),
  },
];

export default function SupportPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg">
        <section className="mx-auto max-w-3xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
          <header className="mb-12">
            <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">
              Support
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
              We&rsquo;re here to help.
            </h1>
            <p className="mt-5 text-lg text-text/75 leading-relaxed">
              The fastest route is email. We read every message and reply
              within one working day, usually faster.
            </p>
          </header>

          <div className="mb-16 rounded-card border border-border bg-surface p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-wider text-muted mb-2">
              Contact
            </p>
            <p className="text-2xl font-semibold tracking-tight">
              <Link
                href="mailto:support@owlka.com"
                className="text-mark hover:underline"
              >
                support@owlka.com
              </Link>
            </p>
            <p className="mt-3 text-sm text-text/70 leading-relaxed">
              For known issues and live incident reports, see{" "}
              <a
                href="https://status.owlka.com"
                className="text-mark hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                status.owlka.com
              </a>{" "}
              (status page launches alongside the app).
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
              System requirements
            </h2>
            <div className="rounded-card border border-border bg-surface p-6 sm:p-8">
              <ul className="space-y-3 text-text/85 leading-relaxed">
                <li>
                  <span className="font-semibold">iPhone:</span> iOS 17 or
                  later.
                </li>
                <li>
                  <span className="font-semibold">Mac desktop:</span> macOS
                  12 (Monterey) or later, Apple Silicon or Intel.
                </li>
                <li>
                  <span className="font-semibold">Claude subscription:</span>{" "}
                  an active Claude Pro or Max subscription from Anthropic,
                  signed in on your desktop through Anthropic&rsquo;s own
                  tools. Owlka does not resell Anthropic.
                </li>
                <li>
                  <span className="font-semibold">Network:</span> an
                  internet connection on both the desktop and the phone,
                  so the encrypted relay can shuttle sealed packets
                  between them.
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Frequently asked
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-card border border-border bg-surface px-6 py-5 open:bg-bg/60"
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                  <span className="text-lg font-semibold tracking-tight">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className="mt-1 inline-block w-5 h-5 shrink-0 text-mark transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="mt-4 text-text/80 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
