import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Docs — Owlka",
  description:
    "How Owlka works, getting started, and FAQ. Build with Claude Code from your phone.",
};

type Step = {
  n: number;
  title: string;
  body: React.ReactNode;
  screenshot: string;
};

const steps: Step[] = [
  {
    n: 1,
    title: "Create an Anthropic account",
    body: (
      <>
        Head to{" "}
        <a
          href="https://console.anthropic.com"
          className="text-mark hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          console.anthropic.com
        </a>{" "}
        and sign up. Anthropic is the company that makes Claude, the AI model
        that powers your Owlka sessions. You will sign in with this account
        whenever you authorise a new device.
      </>
    ),
    screenshot:
      "[Screenshot placeholder: step 1 — Anthropic console sign-up screen]",
  },
  {
    n: 2,
    title: "Enable Claude Code on your account",
    body: (
      <>
        Claude Code is Anthropic&rsquo;s coding-focused plan. Owlka runs on top
        of your Claude Code subscription, so you need an active plan before you
        can start a session. See{" "}
        <a
          href="https://www.anthropic.com/pricing"
          className="text-mark hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          anthropic.com/pricing
        </a>{" "}
        for current plans and pricing. Pro and Max both include Claude Code.
      </>
    ),
    screenshot:
      "[Screenshot placeholder: step 2 — Anthropic pricing page with Claude Code plans]",
  },
  {
    n: 3,
    title: "Open Owlka and tap Connect Anthropic account",
    body: (
      <>
        Install Owlka from the App Store, open it, and on the first-run screen
        tap <span className="font-medium">Connect Anthropic account</span>.
        Owlka will hand off to Safari to start the OAuth flow.
      </>
    ),
    screenshot:
      "[Screenshot placeholder: step 3 — Owlka first-run Connect Anthropic account button]",
  },
  {
    n: 4,
    title: "Authorise Owlka in the Anthropic OAuth screen",
    body: (
      <>
        Anthropic will show you exactly what Owlka is asking for. Approve, and
        you will be bounced back into the Owlka app. The token Anthropic issues
        is stored in the iOS Keychain on your device. Owlka never sees your API
        key.
      </>
    ),
    screenshot:
      "[Screenshot placeholder: step 4 — Anthropic OAuth consent screen for Owlka]",
  },
  {
    n: 5,
    title: "Start your first session",
    body: (
      <>
        You are in. Type a prompt, ask Claude to build something, and watch it
        work. Your session runs on Owlka&rsquo;s secure host and streams output
        live to your phone. Close the app and reopen it later — the session is
        still there.
      </>
    ),
    screenshot:
      "[Screenshot placeholder: step 5 — Owlka first session running in the app]",
  },
];

type FAQ = {
  q: string;
  a: React.ReactNode;
};

const faqs: FAQ[] = [
  {
    q: "Do I need a developer account to use Owlka?",
    a: (
      <>
        No. You do not need an Apple Developer account, an AWS account, or any
        cloud provider. You do need an Anthropic account with Claude Code
        enabled — that is the one prerequisite.
      </>
    ),
  },
  {
    q: "Does Owlka see my code?",
    a: (
      <>
        No. Your sessions run on Owlka&rsquo;s secure server which streams to
        your phone. We do not log or store your code, and we do not use your
        sessions to train any AI model. Full detail in our{" "}
        <Link href="/privacy" className="text-mark hover:underline">
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
  {
    q: "Can I use my own Mac instead?",
    a: (
      <>
        Coming in v1.1. The Mac companion app lets you point Owlka at a Mac you
        own so sessions run on your hardware, with the iPhone as a thin client.
        Beta users will get access first when it lands.
      </>
    ),
  },
  {
    q: "How do I cancel?",
    a: (
      <>
        Owlka is free during the public beta — no subscription to cancel on
        the Owlka side today. Your Anthropic plan is separate and you cancel
        it from the Anthropic billing portal at{" "}
        <a
          href="https://console.anthropic.com"
          className="text-mark hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          console.anthropic.com
        </a>
        .
      </>
    ),
  },
  {
    q: "What devices does Owlka work on?",
    a: (
      <>
        iPhone running iOS 17 or later at launch. iPad and Mac companion apps
        are coming in the v1.x series.
      </>
    ),
  },
];

export default function DocsPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg">
        <article className="mx-auto max-w-3xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
          <header className="mb-12">
            <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">
              Docs
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
              How Owlka works.
            </h1>
            <p className="mt-5 text-lg text-text/75 leading-relaxed">
              A quick walkthrough of what Owlka is, how it connects to your
              Anthropic account, and how to get your first session running.
            </p>
          </header>

          <div className="space-y-14 text-text/85 leading-relaxed">
            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-5">
                What is Owlka?
              </h2>
              <p className="mb-4">
                Owlka gives you the full power of Claude Code on your phone.
                Build websites, build apps, set up persistent monitoring,
                connect to APIs and databases, do anything a developer could do,
                all from the comfort of your sofa.
              </p>
              <p>
                Wrapped in a powerful app with persistent cross-session memory,
                automated code reviewers, environment protection so you cannot
                destroy your laptop, and so much more. Owlka turns a phone into
                a real engineering surface, not a chat toy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-5">
                How does authentication work?
              </h2>
              <p className="mb-4">
                Owlka is{" "}
                <span className="font-medium">bring-your-own Anthropic</span>.
                You already have, or will sign up for, an Anthropic account with
                Claude Code enabled. You authorise Owlka against that account
                using Anthropic&rsquo;s OAuth flow, the same kind of
                &ldquo;Sign in with&rdquo; screen you have seen for Google or
                GitHub.
              </p>
              <p className="mb-4">
                Your Claude Code subscription is what powers your sessions.
                Owlka never sees your API key. Anthropic issues an OAuth token
                to your device, the token sits in the iOS Keychain, and every
                model call is billed to your Anthropic account — not ours. If
                you cancel your Anthropic plan, your sessions stop. Owlka
                itself is free during the public beta.
              </p>
              <p>
                This means Apple&rsquo;s reviewer, your IT team, and you all
                have a clear answer to &ldquo;where does the AI bill go?&rdquo;
                — straight to Anthropic, on your account, under your control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
                Getting started
              </h2>
              <ol className="space-y-10">
                {steps.map((s) => (
                  <li key={s.n} className="relative">
                    <div className="flex items-baseline gap-4">
                      <span
                        aria-hidden
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mark text-surface text-sm font-semibold"
                      >
                        {s.n}
                      </span>
                      <h3 className="text-xl font-semibold tracking-tight">
                        {s.title}
                      </h3>
                    </div>
                    <div className="mt-3 ml-12 text-text/80">{s.body}</div>
                    <figure className="mt-5 ml-12 rounded-card border border-dashed border-border bg-surface px-5 py-8 text-center">
                      <figcaption className="text-xs font-medium uppercase tracking-wider text-muted">
                        {s.screenshot}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-5">
                What can I do with Owlka?
              </h2>
              <p className="mb-4 text-text/80">
                Anything a developer could do. A non-exhaustive list:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text/80">
                <li>Build websites.</li>
                <li>Build apps.</li>
                <li>Set up persistent monitoring.</li>
                <li>Connect to APIs and databases.</li>
                <li>
                  Do anything a developer could do, all from the comfort of your
                  sofa.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-5">
                What you get
              </h2>
              <p className="mb-6 text-text/80">
                Owlka is in public beta and is free to use. No card on file,
                no charge, no usage meter on you. You bring your own Claude
                Pro or Max subscription from Anthropic.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text/80">
                <li>Owlka iPhone app, paired with your Mac.</li>
                <li>Owlka Mac companion app that runs Claude on your machine.</li>
                <li>
                  Encrypted middleman between phone and Mac. It cannot read
                  what you send.
                </li>
                <li>
                  Your Anthropic OAuth token stays on your devices. Owlka does
                  not see it.
                </li>
                <li>Persistent on-device memory.</li>
                <li>Priority email support.</li>
              </ul>
              <p className="mt-4 text-sm text-text/65">
                More detail on the{" "}
                <Link href="/#pricing" className="text-mark hover:underline">
                  pricing
                </Link>{" "}
                section of the home page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
                FAQ
              </h2>
              <div className="space-y-6">
                {faqs.map((f) => (
                  <div
                    key={f.q}
                    className="rounded-card border border-border bg-surface px-6 py-5"
                  >
                    <h3 className="text-lg font-semibold tracking-tight">
                      {f.q}
                    </h3>
                    <div className="mt-3 text-text/80 leading-relaxed">
                      {f.a}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-card border border-border bg-surface p-8 sm:p-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Ready when you are.
              </h2>
              <p className="mt-3 text-text/75">
                Download the Mac app, install it, and pair from your iPhone.
                Or send us a question if anything here is unclear.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/download"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-pill bg-mark text-surface text-sm font-medium hover:opacity-90 transition"
                >
                  Download for Mac
                </Link>
                <Link
                  href="/support"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-pill border border-border bg-bg text-text text-sm font-medium hover:bg-surface transition"
                >
                  Have a question?
                </Link>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
