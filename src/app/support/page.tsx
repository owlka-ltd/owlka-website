import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Support — Owlka",
  description:
    "Help, FAQs, and how to reach the Owlka team. support@owlka.com.",
};

type FAQ = {
  q: string;
  a: React.ReactNode;
};

const faqs: FAQ[] = [
  {
    q: "How do I connect my Claude account?",
    a: (
      <>
        Open the Owlka iOS app and tap{" "}
        <span className="font-medium">Connect Claude</span> on the first-run
        screen. You&rsquo;ll be redirected to Anthropic to sign in and
        authorise Owlka, then bounced back into the app. The token Anthropic
        issues is stored in the iOS Keychain on your device and is never
        transmitted to Owlka servers. If the bounce-back fails (rare,
        usually a Safari content-blocker), force-quit the app and tap
        Connect again.
      </>
    ),
  },
  {
    q: "How much does Owlka cost?",
    a: (
      <>
        One plan, <span className="font-medium">£5 a month</span>, billed by
        Apple through the App Store. That covers the iPhone app, the Mac
        companion app, and the encrypted middleman that lets the two talk.
        You also need your own Claude Pro or Max subscription from Anthropic,
        which Owlka does not resell. See{" "}
        <Link href="/#pricing" className="text-mark hover:underline">
          pricing
        </Link>{" "}
        for the full picture.
      </>
    ),
  },
  {
    q: "How do I cancel?",
    a: (
      <>
        Cancel from{" "}
        <span className="font-medium">
          Settings &rarr; Apple ID &rarr; Subscriptions
        </span>{" "}
        on your iPhone. Apple handles refunds and renewals directly. You keep
        paid features until the end of the current billing period.
      </>
    ),
  },
  {
    q: "Is my data safe?",
    a: (
      <>
        Your Anthropic OAuth token never leaves your device. Your
        conversations live on your own Mac and your iPhone. The encrypted
        middleman in between cannot read them. We do not train models on
        your content. Full detail in our{" "}
        <Link href="/privacy" className="text-mark hover:underline">
          Privacy Policy
        </Link>
        .
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
        with: what you tried, what you expected, what happened instead, your
        iOS version, and the Owlka build number (Settings &rarr; About in
        the app). We aim to acknowledge within one working day. For known
        incidents, check{" "}
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
