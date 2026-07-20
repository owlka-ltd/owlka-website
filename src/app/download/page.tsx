import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PlatformDownloads } from "@/components/PlatformDownloads";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
// Windows availability + URLs are the single source of truth in @/lib/flags.
// Windows is a code-signed BETA; the Mac build is the stable, signed default.
// The download buttons themselves live in the PlatformDownloads client
// component so we can auto-highlight the visitor's OS without hiding either one.

export const metadata: Metadata = {
  title: "Download Owlka for Mac and Windows",
  description:
    "Download Owlka for Mac or Windows (beta). The Owlka desktop app runs on your computer, talks to Claude under your own login, and pairs with the Owlka iPhone app. Free to download.",
  alternates: { canonical: "/download" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: `${SITE_URL}/download`,
    title: "Download Owlka for Mac and Windows",
    description: "Owlka for Mac and Windows (beta). Free to download.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Owlka for Mac and Windows",
    description: "Owlka for Mac and Windows (beta). Free to download.",
  },
};

export default function DownloadPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg">
        <section className="mx-auto max-w-3xl px-6 pt-16 pb-24 sm:pt-20 sm:pb-32 text-center">
          <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">
            Download
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
            Get Owlka for your Mac or PC.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-text/75 leading-relaxed max-w-2xl mx-auto">
            One installer. Open it, install Owlka, and launch. The app pairs
            with the Owlka iPhone app over an encrypted middleman so you can
            pick up your work from the sofa. Mac is the signed, stable build;
            Windows is a new beta.
          </p>

          <PlatformDownloads />

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <Step
              n="1"
              title="Install Owlka"
              body="Drag Owlka into Applications and open it. macOS asks once if you trust the app."
            />
            <Step
              n="2"
              title="Sign in to Claude"
              body="Owlka uses the official Claude app on your Mac. The app walks you through it if you don't have it yet."
            />
            <Step
              n="3"
              title="Pair your phone"
              body="Scan a one-time QR with the Owlka iPhone app. Pair as many phones as you like (family welcome)."
            />
          </div>

          <div className="mt-16 rounded-card border border-border bg-surface p-6 sm:p-8 text-left">
            <h2 className="text-xl font-semibold tracking-tight">
              What you get
            </h2>
            <ul className="mt-5 space-y-3 text-text/80">
              <Feature>
                A real Claude session running on your Mac, under your own
                login.
              </Feature>
              <Feature>
                The Owlka iPhone app, so you can keep working from anywhere.
              </Feature>
              <Feature>
                Persistent cross-session memory that lives on your Mac, not on
                ours.
              </Feature>
              <Feature>
                Automated code reviewers that challenge every change before it
                lands.
              </Feature>
              <Feature>
                Guardrails that pause on risky actions and ask first, in plain
                English, so accidents are far less likely.
              </Feature>
            </ul>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center text-sm">
            <Link
              href="/security"
              className="text-mark hover:underline underline-offset-4"
            >
              How it stays private
            </Link>
            <span className="hidden sm:inline text-border">·</span>
            <Link
              href="/support"
              className="text-mark hover:underline underline-offset-4"
            >
              Need help?
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-card border border-border bg-surface p-6">
      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-tint-mark text-mark font-semibold text-sm mb-3">
        {n}
      </div>
      <h3 className="font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-text/70 leading-relaxed">{body}</p>
    </div>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <svg
        viewBox="0 0 16 16"
        className="w-4 h-4 text-mark shrink-0 mt-1"
        fill="none"
        aria-hidden
      >
        <path
          d="M3 8.5l3 3 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{children}</span>
    </li>
  );
}


