import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of Owlka. Plain English. Last updated 2026-05-18.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="mt-4 text-sm text-muted">Last updated 2026-05-18</p>
          </header>

          <div className="prose prose-neutral max-w-none text-text/85 leading-relaxed space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mt-0 mb-4">
                1. The agreement
              </h2>
              <p>
                These Terms of Service (the &ldquo;Terms&rdquo;) are an
                agreement between you and Owlka (&ldquo;we&rdquo;,
                &ldquo;our&rdquo;). They cover your use of the Owlka desktop
                app for Mac or Windows, the Owlka iPhone app, the owlka.com
                website, and the encrypted relay that lets the two apps talk
                to each other (together, the &ldquo;Service&rdquo;). By using
                the Service you agree to these Terms. If you do not agree,
                do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                2. Licence to use the apps
              </h2>
              <p>
                We grant you a personal, limited, non-exclusive,
                non-transferable, revocable licence to install and use the
                Owlka desktop app on Macs or Windows PCs you own or control,
                and the Owlka iPhone app on iOS devices you own or control,
                solely for your own use and in accordance with these Terms
                and Apple&rsquo;s App Store terms. You may not resell,
                sublicense, or redistribute the apps, and you may not
                reverse-engineer them except where local law expressly
                permits.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                3. Bring your own Claude subscription
              </h2>
              <p>
                Owlka wraps the Claude desktop tools that run on your own
                machine under your own Anthropic (Claude) subscription. You
                bring your own Claude Pro or Max subscription. Owlka does not
                resell Anthropic, does not have a partnership with
                Anthropic, and does not proxy your Claude traffic. Your
                agreement with Anthropic governs your Claude usage directly,
                including any rate limits, charges, and acceptable-use rules
                Anthropic sets. You are responsible for keeping your
                Anthropic credentials secure and for complying with
                Anthropic&rsquo;s usage policies. Owlka is not responsible
                for outages, rate limits, or policy decisions made by
                Anthropic.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                4. Acceptable use
              </h2>
              <p>You agree not to use the Service to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>break the law, or help someone else break the law;</li>
                <li>
                  harass, threaten, bully, or intimidate any person, or
                  encourage anyone else to do so;
                </li>
                <li>
                  generate, request, store, or distribute child sexual
                  abuse material, or any content that sexualises minors;
                </li>
                <li>
                  generate or distribute malware, ransomware, viruses,
                  spyware, or any code intended to damage or gain
                  unauthorised access to a computer or network;
                </li>
                <li>
                  generate or distribute content that is illegal,
                  defamatory, harassing, hateful, or that infringes someone
                  else&rsquo;s rights, including intellectual property
                  rights;
                </li>
                <li>
                  attempt to gain unauthorised access to other users&rsquo;
                  accounts, devices, or data;
                </li>
                <li>
                  probe, scan, or test the vulnerability of the Service or
                  systems we connect to without our written permission;
                </li>
                <li>
                  build a competing service by scraping our pages or
                  reverse-engineering our protocols;
                </li>
                <li>
                  use the Service to develop weapons, surveillance tooling
                  intended to harm people, or any application
                  Anthropic&rsquo;s usage policy prohibits.
                </li>
              </ul>
              <p className="mt-3">
                We may suspend or terminate accounts that breach this
                section without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                5. Subscription and payment
              </h2>
              <p>
                Owlka is a single subscription, £9.99 per month, with a
                30-day free trial for new users. The subscription is sold
                and billed by Apple through the App Store under
                Apple&rsquo;s standard terms. It auto-renews each month
                until you cancel. Cancellation is in Settings, Apple ID,
                Subscriptions on your iPhone. Cancellation takes effect at
                the end of the current billing period and you keep paid
                features until then.
              </p>
              <p className="mt-3">
                The subscription is opted into Apple Family Sharing, so one
                paid subscription covers up to six members of an Apple
                Family. Each family member uses their own Apple ID, their
                own iPhone, and their own pairing to a desktop.
              </p>
              <p className="mt-3">
                Refunds are handled by Apple under Apple&rsquo;s refund
                policy for the App Store. We do not process refunds
                directly. To request a refund, use the Report a Problem
                flow in your Apple ID purchase history.
              </p>
              <p className="mt-3">
                You also still need your own Claude subscription from
                Anthropic to use the wrapped Claude tools. The £9.99
                monthly pays for the Owlka wrapper and relay only, not for
                the underlying model.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                6. Your content
              </h2>
              <p>
                You retain all rights to the prompts, code, files, and
                other content you create or work with through the Service.
                We do not claim ownership and we do not use your content to
                train any AI model. The encrypted relay between your phone
                and your desktop cannot read your content. Storage of your
                content is governed by our{" "}
                <Link
                  href="/privacy"
                  className="text-mark hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                7. AI output disclaimer
              </h2>
              <p>
                Owlka surfaces output from large language models. Large
                language models hallucinate. They invent citations, produce
                code that looks correct and does not run, and confidently
                state things that are not true. You are responsible for
                checking AI output before acting on it.
              </p>
              <p className="mt-3">
                Owlka does not provide medical, legal, financial, tax, or
                professional advice. Anything that looks like such advice
                in the Service is for general information only. Do not rely
                on it for any consequential decision. Consult a qualified
                professional for your circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                8. Account deletion
              </h2>
              <p>
                You can delete your account from inside the app. Open
                Settings, Account, Delete account. The app will wipe local
                data on your phone, signal the relay to drop your device
                records, and guide you to cancel the subscription in Apple
                Settings.
              </p>
              <p className="mt-3">
                If the in-app flow is unavailable, email{" "}
                <Link
                  href="mailto:support@owlka.com"
                  className="text-mark hover:underline"
                >
                  support@owlka.com
                </Link>{" "}
                and we will remove the relay-side device records for you.
                Data stored on your own desktop remains under your control
                on your machine.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                9. No warranty
              </h2>
              <p>
                The Service is provided &ldquo;as is&rdquo; and &ldquo;as
                available&rdquo;. To the maximum extent permitted by law,
                we disclaim all warranties, express or implied, including
                warranties of merchantability, fitness for a particular
                purpose, and non-infringement. We do not warrant that the
                Service will be uninterrupted, error-free, or that model
                outputs will be accurate, complete, or suitable for any
                particular use. Decisions you take based on AI output are
                your responsibility.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                10. Limitation of liability
              </h2>
              <p>
                To the maximum extent permitted by law, Owlka and its
                contributors will not be liable for any indirect,
                incidental, special, consequential, or punitive damages,
                or for any loss of profits, revenue, data, or goodwill,
                arising out of or in connection with your use of the
                Service. Our total aggregate liability for any claim
                relating to the Service is limited to the greater of (a)
                the amount you paid us in the twelve months preceding the
                event giving rise to the claim, or (b) £50. Nothing in
                these Terms excludes liability that cannot lawfully be
                excluded, including liability for death or personal injury
                caused by our negligence or for fraud.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                11. Termination
              </h2>
              <p>
                You can stop using the Service at any time by cancelling
                the subscription and deleting the apps. We can suspend or
                terminate your access to the Service if you breach these
                Terms (in particular the Acceptable Use section), if
                continued provision would expose us to legal risk, or if
                we discontinue the Service. Where the circumstances allow,
                we will give you reasonable notice. On termination, the
                licences granted to you end and the sections of these
                Terms that by their nature should survive (ownership,
                disclaimers, limitations of liability, governing law) will
                survive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                12. Changes to the Service or these Terms
              </h2>
              <p>
                We may change features of the Service, and we may update
                these Terms, from time to time. If we make a material
                change to these Terms, we will update the &ldquo;Last
                updated&rdquo; date at the top of this page and, where
                reasonable, notify active users inside the app or by
                email. Continued use of the Service after changes take
                effect means you accept the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                13. Governing law and disputes
              </h2>
              <p>
                These Terms are governed by the laws of England and
                Wales. Any dispute arising out of or in connection with
                these Terms or the Service will be subject to the
                exclusive jurisdiction of the courts of England and
                Wales, except that consumers resident in another part of
                the United Kingdom may bring proceedings in their local
                courts. Before starting a formal dispute, please email{" "}
                <Link
                  href="mailto:support@owlka.com"
                  className="text-mark hover:underline"
                >
                  support@owlka.com
                </Link>{" "}
                so we can try to resolve the issue informally.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                14. Contact
              </h2>
              <p>
                Questions about these Terms:{" "}
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
