import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Owlka handles your data. Plain English. Last updated 2026-05-17.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg">
        <article className="mx-auto max-w-3xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
          <header className="mb-12">
            <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">
              Legal
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-muted">Last updated 2026-05-17</p>
          </header>

          <div className="prose prose-neutral max-w-none text-text/85 leading-relaxed space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mt-0 mb-4">
                The short version
              </h2>
              <p>
                Owlka is a desktop app for your Mac and a companion app for
                your iPhone. The conversation, the code, and the memory all
                live on your own Mac. The two apps talk through an encrypted
                middleman that cannot read what passes through it. We do not
                sell or share your data. We do not run ad trackers. We do not
                train any model on what you build.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                What lives where
              </h2>

              <h3 className="text-lg font-semibold mt-6 mb-2">
                On your Mac
              </h3>
              <p>
                Owlka for Mac launches the official Claude Code app under
                your own Anthropic login. Your code, your terminal output,
                your project files, and your Owlka memory all stay on your
                Mac. We never copy any of it to a server.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-2">
                On your iPhone
              </h3>
              <p>
                The Owlka iPhone app stores the keys it needs to talk to
                your Mac in the iOS Keychain. It caches the messages you
                have already seen in your phone so the app feels fast. None
                of that is sent to us.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-2">
                Between Mac and phone
              </h3>
              <p>
                Messages between your Mac and your phone go through an
                encrypted middleman that we operate. The middleman passes
                sealed packets back and forth. Only your Mac and your
                paired phones hold the keys, so we cannot read the
                contents. We keep a short queue of undelivered packets
                (typically minutes) so a phone that comes back online can
                pick up where it left off, then we discard them.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-2">
                Account info
              </h3>
              <p>
                We do not run an Owlka account system. Your Apple ID
                handles the subscription. We see only what Apple shares
                with developers (an anonymised subscription identifier and
                whether the subscription is active).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                What we do not do
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  We do not sell, rent, or share your personal data with
                  third parties.
                </li>
                <li>
                  We do not run advertising or ad-targeting pixels.
                </li>
                <li>
                  We do not run third-party analytics that identify you
                  personally.
                </li>
                <li>
                  We do not use your conversations or anything you build to
                  train any model.
                </li>
                <li>
                  We cannot read what your phone sends to your Mac, or what
                  your Mac sends back, because we do not hold the keys.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Who else is involved
              </h2>
              <p>
                Owlka relies on a small number of named providers to deliver
                the product. Each one only sees the slice of data its job
                requires.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Apple</strong> distributes the iPhone app, handles
                  the subscription, and processes payment. Apple sees your
                  Apple ID and your billing details under its own privacy
                  policy.
                </li>
                <li>
                  <strong>Cloudflare</strong> serves the encrypted middleman
                  endpoint. It sees connection metadata (IP address,
                  timing) and sealed bytes it cannot decrypt.
                </li>
                <li>
                  <strong>Vercel</strong> hosts this website. It logs
                  standard request metadata.
                </li>
                <li>
                  <strong>The middleman host</strong> runs the small server
                  that queues sealed packets between your phone and your
                  Mac. It cannot read packet contents.
                </li>
              </ul>
              <p className="mt-4">
                Your Claude model usage is governed by your own agreement
                with Anthropic. Anthropic is not an Owlka sub-processor,
                because we never send your Claude traffic through our
                servers, your Mac talks to Anthropic directly under your
                own login.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Your rights under UK GDPR
              </h2>
              <p>
                If you are in the United Kingdom or the European Economic
                Area, you have the right to access the personal data we
                hold about you, to ask us to correct or delete it, to
                object to or restrict our processing of it, and to data
                portability. You also have the right to complain to the UK
                Information Commissioner&rsquo;s Office (ICO) at{" "}
                <a
                  href="https://ico.org.uk"
                  className="text-mark hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  ico.org.uk
                </a>
                . To exercise any of these rights, email{" "}
                <Link
                  href="mailto:support@owlka.com"
                  className="text-mark hover:underline"
                >
                  support@owlka.com
                </Link>
                . Because the conversation, code, and memory all live on
                your own Mac, the data we hold on you is limited to your
                support correspondence and Apple&rsquo;s anonymised
                subscription identifier.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Children</h2>
              <p>
                Owlka is not aimed at children under 13 and we do not
                knowingly collect personal data from children. If you
                believe a child has provided us with personal data, email{" "}
                <Link
                  href="mailto:support@owlka.com"
                  className="text-mark hover:underline"
                >
                  support@owlka.com
                </Link>{" "}
                and we will delete it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Changes to this policy
              </h2>
              <p>
                If we change this policy, the &ldquo;Last updated&rdquo;
                date at the top of the page will change. Material changes
                will also be announced inside the app the next time you
                open it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p>
                Questions, requests, or concerns:{" "}
                <Link
                  href="mailto:support@owlka.com"
                  className="text-mark hover:underline"
                >
                  support@owlka.com
                </Link>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
