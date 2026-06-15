import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { WINDOWS_AVAILABLE, WINDOWS_EXE_URL, MAC_DMG_URL } from "@/lib/flags";
// Windows availability + URLs are the single source of truth in @/lib/flags.
// Day-1 is Mac-only; WINDOWS_AVAILABLE is false until the signed .exe is hosted.

export const metadata: Metadata = {
  title: "Download Owlka for Mac",
  description:
    "Download Owlka for Mac. The Owlka desktop app runs on your Mac, talks to Claude under your own login, and pairs with the Owlka iPhone app. Free to download.",
  alternates: { canonical: "/download" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: `${SITE_URL}/download`,
    title: "Download Owlka for Mac",
    description: "Owlka for Mac. Free to download.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Owlka for Mac",
    description: "Owlka for Mac. Free to download.",
  },
};

export default function DownloadPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg">
        <section className="mx-auto max-w-3xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 text-center">
          <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">
            Download
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
            Get Owlka for your Mac.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-text/75 leading-relaxed max-w-2xl mx-auto">
            One signed installer. Open it, drag Owlka into Applications, and
            launch. The app pairs with the Owlka iPhone app over an encrypted
            middleman so you can pick up your work from the sofa.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4">
            <a
              href={MAC_DMG_URL}
              className="inline-flex items-center justify-center gap-3 h-14 px-9 rounded-pill bg-mark text-bg text-lg font-semibold shadow-sm hover:opacity-95 transition"
              data-testid="download-mac-dmg"
            >
              <AppleGlyph />
              Download for Mac
            </a>
            <p className="text-sm text-muted max-w-md text-center">
              Universal binary, signed and notarised by Apple. Runs on
              Apple Silicon and Intel Macs (macOS 13+). Free to
              download. Linux to follow. Questions
              to{" "}
              <a
                href="mailto:support@owlka.com"
                className="text-mark hover:underline"
              >
                support@owlka.com
              </a>.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            {WINDOWS_AVAILABLE ? (
              <a
                href={WINDOWS_EXE_URL}
                className="inline-flex items-center justify-center gap-3 h-14 px-9 rounded-pill border border-border bg-surface text-text text-lg font-semibold shadow-sm hover:opacity-95 transition"
                data-testid="download-windows-exe"
              >
                <WindowsGlyph />
                Download for Windows
              </a>
            ) : (
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex items-center justify-center gap-3 h-14 px-9 rounded-pill border border-border bg-surface text-text/50 text-lg font-semibold cursor-not-allowed"
                data-testid="download-windows-exe"
              >
                <WindowsGlyph />
                Download for Windows
              </button>
            )}
            <p className="text-sm text-muted max-w-md text-center">
              {WINDOWS_AVAILABLE
                ? "64-bit Windows 10 and 11. Free to download."
                : "Windows is coming later. We'll announce it here when the build is ready."}
            </p>
          </div>

          {WINDOWS_AVAILABLE && <WindowsSmartScreenNote />}

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
                Environment protection so you can&rsquo;t brick your machine.
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

function WindowsSmartScreenNote() {
  return (
    <div
      className="mt-8 mx-auto max-w-xl rounded-card border border-border bg-surface p-6 text-left"
      data-testid="windows-smartscreen-note"
    >
      <h2 className="text-base font-semibold tracking-tight">
        A note about the Windows warning
      </h2>
      <p className="mt-3 text-sm text-text/75 leading-relaxed">
        The Windows version is not code-signed yet, so the first time you
        run it Windows SmartScreen shows a blue{" "}
        <span className="font-medium text-text">
          &ldquo;Windows protected your PC&rdquo;
        </span>{" "}
        screen. That is expected, and the app is safe. To open it:
      </p>
      <ol className="mt-4 space-y-2 text-sm text-text/75 leading-relaxed list-decimal pl-5">
        <li>
          Click{" "}
          <span className="font-medium text-text">More info</span> on the
          warning.
        </li>
        <li>
          Click{" "}
          <span className="font-medium text-text">Run anyway</span>.
        </li>
      </ol>
      <p className="mt-4 text-sm text-text/75 leading-relaxed">
        It is the same one-time step you take for any new app from a smaller
        publisher. We are working on a Windows signature so this warning goes
        away; until then we would rather tell you the truth than dress it up.
        The same approach is on our{" "}
        <Link
          href="/security"
          className="text-mark hover:underline underline-offset-4"
        >
          security page
        </Link>
        .
      </p>
    </div>
  );
}

function WindowsGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
      <path d="M3 5.1l7.5-1.02v7.23H3V5.1zm0 13.8l7.5 1.02v-7.14H3v6.12zm8.4 1.14L21 21.5v-8.55h-9.6v7.09zM11.4 3.96L21 2.5v8.55h-9.6V3.96z" />
    </svg>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
      <path d="M17.05 12.04c-.03-2.9 2.37-4.3 2.48-4.37-1.36-1.98-3.47-2.25-4.22-2.28-1.8-.18-3.51 1.06-4.42 1.06-.93 0-2.32-1.04-3.82-1.01-1.96.03-3.78 1.14-4.78 2.89-2.05 3.56-.52 8.81 1.46 11.7.97 1.42 2.12 3 3.62 2.95 1.46-.06 2.01-.94 3.77-.94 1.76 0 2.26.94 3.79.91 1.57-.03 2.56-1.43 3.52-2.86 1.11-1.64 1.57-3.23 1.59-3.31-.04-.02-3.04-1.17-3.07-4.74zM14.34 3.97c.81-.98 1.35-2.34 1.2-3.69-1.16.05-2.57.78-3.4 1.75-.75.86-1.4 2.24-1.22 3.56 1.29.1 2.61-.66 3.42-1.62z" />
    </svg>
  );
}
