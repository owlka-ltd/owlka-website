import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StatusBoard } from "@/components/StatusBoard";

export const metadata: Metadata = {
  title: "Status",
  description:
    "Live operational status for Owlka. The encrypted middleman, the Mac app downloads, and this website.",
  alternates: { canonical: "/status" },
};

export default function StatusPage() {
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
              System status
            </h1>
            <p className="mt-3 text-muted">
              Live operational status, refreshed every minute. Owlka does
              not run a per-user backend that has to be online for you.
              Your Mac runs the work, your phone talks to it through the
              encrypted middleman. The components below are the only
              Owlka-operated pieces that have to be up.
            </p>
          </header>

          <StatusBoard />

          <footer className="mt-16 border-t border-border pt-6 text-sm text-muted">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p>
                Owlka,{" "}
                <a
                  href="mailto:support@owlka.com"
                  className="hover:text-text transition-colors"
                >
                  support@owlka.com
                </a>
                .
              </p>
              <Link
                href="/support"
                className="hover:text-text transition-colors"
              >
                Report an issue &rarr;
              </Link>
            </div>
          </footer>
        </div>
      </main>
      <Footer />
    </>
  );
}
