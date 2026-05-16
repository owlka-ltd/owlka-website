import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Owlka",
  description:
    "How Owlka handles your data. Plain English. Last updated 2026-05-17.",
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
                Owlka is a tool for using Claude on your iPhone. We try to keep
                as little data as possible. Your Claude account credentials
                stay on your device. Your conversations stay on a machine you
                control. We do not sell, share, or use your data for
                advertising. We do not run third-party analytics that track
                you personally.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                What Owlka collects
              </h2>

              <h3 className="text-lg font-semibold mt-6 mb-2">
                Anthropic OAuth token
              </h3>
              <p>
                When you connect your Anthropic (Claude) account, the OAuth
                token issued by Anthropic is stored locally on your iOS device
                in the iOS Keychain. The token is never transmitted to or
                stored on any Owlka server. Owlka has no ability to read,
                copy, or recover this token from your device.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-2">
                Session messages
              </h3>
              <p>
                Conversations between you and Claude run through a private
                bridge that you authorise. By default, message history is
                stored in a per-tenant directory on your own Mac (the bridge
                host). Owlka does not collect, mirror, or otherwise receive a
                copy of your messages. Your messages are not used to train any
                model.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-2">
                Waitlist email
              </h3>
              <p>
                If you submit your email address to the launch waitlist, we
                store it through our email provider (Resend) for the single
                purpose of notifying you when Owlka is available. We do not
                use this address for marketing, profiling, or any third-party
                sharing. You can ask us to delete it at any time by emailing{" "}
                <Link
                  href="mailto:support@owlka.com"
                  className="text-mark hover:underline"
                >
                  support@owlka.com
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                What Owlka does not do
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  We do not sell, rent, or share your personal data with third
                  parties.
                </li>
                <li>
                  We do not run advertising, ad networks, or ad-targeting
                  pixels.
                </li>
                <li>
                  We do not run third-party analytics tools that collect
                  personally identifying information.
                </li>
                <li>
                  We do not use your conversations or any content you generate
                  to train AI models.
                </li>
                <li>
                  We do not transmit your Anthropic OAuth token off your
                  device.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Third parties we rely on
              </h2>
              <p>
                We use Anthropic to provide the Claude model itself, Apple to
                distribute the iOS app and process App Store payments where
                applicable, Stripe to process subscription payments for Owlka
                Pro, Resend to send the waitlist confirmation email, and
                Vercel to host this website. Each is governed by their own
                privacy policy and processes only the data needed to perform
                their narrow function.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Your rights under UK GDPR
              </h2>
              <p>
                If you are in the United Kingdom or the European Economic
                Area, you have the right to access the personal data we hold
                about you, to ask us to correct or delete it, to object to or
                restrict our processing of it, and to data portability. You
                also have the right to lodge a complaint with the UK
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
                . Because Owlka stores so little server-side data, most
                requests resolve to deleting your waitlist email and
                confirming back to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Children</h2>
              <p>
                Owlka is not directed at children under 13 and we do not
                knowingly collect personal data from children. If you believe
                a child has provided us with personal data, email{" "}
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
                If we change this policy, the &ldquo;Last updated&rdquo; date
                at the top of the page will change. Material changes will
                also be communicated by email to anyone on the waitlist or
                with an active subscription.
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
