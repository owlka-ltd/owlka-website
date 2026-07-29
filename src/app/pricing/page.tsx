import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const LAST_UPDATED = "2026-07-29";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Owlka is free for your first 30 days, no payment details needed. After that it is £4.99 a month or £50 a year, with every feature included and one account covering two phones and two computers.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    url: `${SITE_URL}/pricing`,
    title: "Pricing",
    description:
      "30 days free, no payment details needed. Then £4.99 a month or £50 a year. Every feature included, one account covers two phones and two computers.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Pricing",
    description:
      "30 days free, no payment details needed. Then £4.99 a month or £50 a year. Every feature included.",
  },
};

const INCLUDED = [
  "Owlka for Mac and Windows",
  "Owlka for iPhone",
  "The end-to-end encrypted relay between your devices",
  "Persistent cross-session memory on your computer",
  "Automated code reviewer",
  "Guardrails that ask before risky actions",
  "One account covering two phones and two computers",
];

export default function PricingPage() {
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
              Pricing
            </h1>
            <p className="mt-3 text-muted leading-relaxed">
              Last updated {LAST_UPDATED}. One plan, every feature. Your first
              30 days are free and you do not need to enter any payment details
              to start. After that, Owlka is £4.99 a month or £50 a year.
            </p>
          </header>

          <section id="price" className="mb-14 scroll-mt-16">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-card border border-border bg-surface p-8">
                <p className="text-sm font-medium text-muted uppercase tracking-wider">
                  Monthly
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight">
                    £4.99
                  </span>
                  <span className="text-sm text-muted">per month</span>
                </div>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  First 30 days free. Nothing to pay, and no card to enter,
                  until the trial ends.
                </p>
              </div>

              <div className="rounded-card border border-mark bg-surface p-8">
                <p className="text-sm font-medium text-mark uppercase tracking-wider">
                  Yearly
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight">
                    £50
                  </span>
                  <span className="text-sm text-muted">per year</span>
                </div>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  The same Owlka, paid once a year. It works out around £10
                  cheaper than paying monthly.
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted leading-relaxed">
              Both prices buy exactly the same product. There are no feature
              tiers, no usage meters, and no add-ons.
            </p>
          </section>

          <section id="included" className="mb-14 scroll-mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              What is included
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              Everything. Every Owlka feature is part of the one plan, during
              the trial and after it.
            </p>
            <ul className="mt-6 rounded-card border border-border bg-surface p-6 space-y-3 text-[15px] text-text/90">
              {INCLUDED.map((f) => (
                <li key={f} className="flex gap-2.5 items-start">
                  <span
                    aria-hidden
                    className="mt-2 inline-block w-1.5 h-1.5 rounded-full shrink-0 bg-mark"
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="trial" className="mb-14 scroll-mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              The free trial, plainly
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              You get 30 days of the full product for free. We do not ask for a
              card or any other payment details to start, which means there is
              nothing on file that could charge you automatically when the
              trial ends. No surprise bills, and nothing to remember to cancel.
              If Owlka is not for you, simply stop using it.
            </p>
          </section>

          <section id="devices" className="mb-14 scroll-mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">Devices</h2>
            <p className="mt-3 text-muted leading-relaxed">
              One account covers two phones and two computers. That is enough
              for a phone and a spare, or your desk machine and a laptop,
              without paying twice.
            </p>
          </section>

          <section id="payment" className="mb-14 scroll-mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              How payment will work
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              Payment happens here on the website, and only here. You will
              never be asked to pay inside the iPhone app. Billing is not live
              yet; we are building it into this website now. When it arrives,
              the paid plan starts after your 30 free days, and you will be
              able to cancel at any time from this website.
            </p>
          </section>

          <section id="claude" className="mb-14 scroll-mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              One thing Owlka does not sell
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              Owlka does not resell Claude. You bring your own Claude Pro or
              Max subscription from Anthropic, and your computer talks to
              Anthropic directly under your own account. The Owlka price covers
              Owlka: the apps, the encrypted relay, and everything in the list
              above. More detail is in the{" "}
              <Link
                href="/faq"
                className="underline hover:text-text transition-colors"
              >
                FAQ
              </Link>
              .
            </p>
          </section>

          <section id="start" className="mb-14 scroll-mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              Start your free 30 days
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              Download Owlka, pair your phone, and use everything free for 30
              days. No payment details needed.
            </p>
            <Link
              href="/download"
              className="mt-6 inline-flex items-center h-11 px-6 rounded-pill bg-mark text-surface text-sm font-medium shadow-md shadow-mark/20 hover:shadow-lg hover:shadow-mark/30 hover:-translate-y-0.5 transition-all"
            >
              Get started
            </Link>
          </section>

          <footer className="mt-16 border-t border-border pt-6 text-sm text-muted">
            <p>
              Questions about pricing? Email{" "}
              <a
                href="mailto:support@owlka.com"
                className="underline hover:text-text transition-colors"
              >
                support@owlka.com
              </a>{" "}
              or read the{" "}
              <Link
                href="/faq"
                className="underline hover:text-text transition-colors"
              >
                FAQ
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
