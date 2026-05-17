import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const LAST_UPDATED = "2026-05-17";

export const metadata: Metadata = {
  title: "Status",
  description:
    "Owlka system status. The encrypted middleman, the App Store download, and this website.",
  alternates: { canonical: "/status" },
};

type Component = {
  name: string;
  detail: string;
};

const COMPONENTS: Component[] = [
  {
    name: "Encrypted middleman",
    detail:
      "Passes sealed packets between paired phones and Macs. Operational.",
  },
  {
    name: "Mac app downloads",
    detail:
      "The signed .dmg on download.owlka.com is served by Cloudflare. Operational.",
  },
  {
    name: "owlka.com",
    detail: "This website. Operational.",
  },
];

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
              Last reviewed {LAST_UPDATED}.
            </p>
          </header>

          <section
            className="rounded-[22px] border p-8"
            style={{
              backgroundColor: "#16a34a14",
              borderColor: "#16a34a55",
            }}
            aria-live="polite"
          >
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="inline-block h-4 w-4 rounded-full"
                style={{ backgroundColor: "#16a34a" }}
              />
              <p
                className="text-2xl font-semibold"
                style={{ color: "#16a34a" }}
              >
                All systems operational
              </p>
            </div>
          </section>

          <section className="mt-10 rounded-[22px] border border-border bg-surface">
            {COMPONENTS.map((c, i) => (
              <div
                key={c.name}
                className={`flex items-start gap-4 p-6 ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 inline-block h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: "#16a34a" }}
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium">{c.name}</p>
                    <p
                      className="text-sm font-medium uppercase tracking-wide"
                      style={{ color: "#16a34a" }}
                    >
                      OK
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-muted">{c.detail}</p>
                </div>
              </div>
            ))}
          </section>

          <p className="mt-6 text-sm text-muted">
            Owlka does not run a per-user backend that we have to keep online
            for you. Your Mac runs the work, your phone talks to it through
            the encrypted middleman. The only Owlka-operated piece that has
            to be up for the apps to talk to each other is the middleman.
          </p>

          <footer className="mt-16 border-t border-border pt-6 text-sm text-muted">
            <Link href="/support" className="hover:text-text transition-colors">
              Report an issue &rarr;
            </Link>
          </footer>
        </div>
      </main>
      <Footer />
    </>
  );
}
