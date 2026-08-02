import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const LAST_UPDATED = "2026-06-30";

export const metadata: Metadata = {
  title: "Network requirements for IT teams",
  description:
    "Allow-list Owlka through a corporate proxy or firewall. The domains, ports, and protocols Owlka needs, plus why it is safe to leave TLS inspection on.",
  alternates: { canonical: "/enterprise" },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    url: `${SITE_URL}/enterprise`,
    title: "Network requirements for IT teams",
    description:
      "Allow-list Owlka through a corporate proxy or firewall. Domains, ports, and protocols, plus why TLS inspection is safe to leave on.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Network requirements for IT teams",
    description:
      "Allow-list Owlka through a corporate proxy or firewall. Domains, ports, and protocols.",
  },
};

type Endpoint = {
  domain: string;
  protocol: string;
  port: string;
  purpose: string;
};

const ENDPOINTS: Endpoint[] = [
  {
    domain: "relay.owlka.com",
    protocol: "HTTPS, then WebSocket (wss)",
    port: "443",
    purpose:
      "The live connection between the Mac app and the iPhone app. The desktop and phone each hold an outbound WebSocket open to the relay so messages flow in real time. This is the one endpoint that must allow WebSocket upgrades.",
  },
  {
    domain: "download.owlka.com",
    protocol: "HTTPS",
    port: "443",
    purpose:
      "The signed Mac app download and its updates. Only needs to be reachable when someone installs or updates Owlka.",
  },
  {
    domain: "claude.com",
    protocol: "HTTPS",
    port: "443",
    purpose:
      "Signing in to Claude. Owlka runs Anthropic's Claude tools under the user's own account, and the sign-in page is served here. Without this domain the app installs but nobody can log in to Claude, so it is not optional.",
  },
  {
    domain: "claude.ai",
    protocol: "HTTPS",
    port: "443",
    purpose:
      "Anthropic's official installer for the Claude tools, fetched once when Owlka first sets itself up on a machine.",
  },
  {
    domain: "api.anthropic.com",
    protocol: "HTTPS",
    port: "443",
    purpose:
      "Claude itself. Everything your team sends to Claude goes from the desktop straight to Anthropic under your own Anthropic account. This traffic never touches Owlka's servers.",
  },
  {
    domain: "github.com",
    protocol: "HTTPS",
    port: "443",
    purpose:
      "First-run setup only. If the machine has no suitable Python, Owlka downloads a standard prebuilt Python from GitHub. The file itself comes from objects.githubusercontent.com, so allow that host too. Not used again afterwards.",
  },
  {
    domain: "api.elevenlabs.io",
    protocol: "HTTPS",
    port: "443",
    purpose:
      "Only if your team uses the microphone. Owlka's voice features send audio to ElevenLabs using an ElevenLabs key each user supplies. Leave this blocked and voice simply stays unavailable; nothing else is affected.",
  },
];

const COPY_BLOCK = `Please allow the following domains through our proxy/firewall so I can use Owlka:

Required:
  relay.owlka.com               TCP 443   HTTPS + WebSocket (wss), the live connection. Must allow WebSocket upgrades
  download.owlka.com            TCP 443   HTTPS, the signed Mac app download and its updates
  claude.com                    TCP 443   HTTPS, signing in to Claude. Without this nobody can log in
  api.anthropic.com             TCP 443   HTTPS, Claude itself, under our own Anthropic account

First-run setup only:
  claude.ai                     TCP 443   HTTPS, Anthropic's official installer for the Claude tools
  github.com                    TCP 443   HTTPS, a prebuilt Python, only if this machine has none
  objects.githubusercontent.com TCP 443   HTTPS, the file host for that download

Only if we use voice:
  api.elevenlabs.io             TCP 443   HTTPS, speech transcription. Block it and voice is simply unavailable

All traffic is on port 443 over HTTPS/WebSocket. TLS inspection can stay enabled:
Owlka's message content is end-to-end encrypted at the application layer, so the
proxy can terminate transport TLS but cannot read message content. The domains
just need to be reachable, with WebSocket allowed on relay.owlka.com.`;

export default function EnterprisePage() {
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
            <h1 className="mt-4 text-4xl font-semibold tracking-tight break-words">
              Network requirements for IT teams
            </h1>
            <p className="mt-3 text-muted leading-relaxed">
              Last updated {LAST_UPDATED}. If your network filters traffic
              through a corporate proxy or firewall (Netskope, Zscaler, Palo
              Alto, Cisco Umbrella, and the like), this page lists exactly what
              Owlka needs to work. Everything is on port 443. There is a
              copy-paste block at the bottom you can send straight to whoever
              runs your network.
            </p>
          </header>

          <section id="allow-list" className="mb-14 scroll-mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              What to allow-list
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              Allow these three domains outbound on TCP port 443. Owlka makes
              no other outbound connections of its own. The only special
              requirement is that <code className="text-text">relay.owlka.com</code>{" "}
              be allowed to open and hold a WebSocket connection.
            </p>

            <dl className="mt-6 rounded-[18px] border border-border bg-surface">
              {ENDPOINTS.map((e, i) => (
                <div
                  key={e.domain}
                  className={`grid gap-2 p-6 sm:grid-cols-[16rem_1fr] sm:gap-8 ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  {/* min-w-0 + break-words: domain names are long unbreakable
                      tokens, and without these the grid column refuses to
                      shrink and the row overflows a 320px viewport. */}
                  <dt className="min-w-0">
                    <span className="block font-medium font-mono text-[15px] break-words">
                      {e.domain}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {e.protocol} · port {e.port}
                    </span>
                  </dt>
                  <dd className="min-w-0 text-muted leading-relaxed break-words">
                    {e.purpose}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-4 text-sm text-muted leading-relaxed">
              Protocols in use: HTTPS and WebSocket (wss), both on port 443. No
              other ports, and no UDP.
            </p>
          </section>

          <section id="tls-inspection" className="mb-14 scroll-mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              TLS inspection can stay on
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              Owlka works behind TLS-inspecting (man-in-the-middle) proxies. The
              message content that travels between the Mac app and the iPhone
              app is end-to-end encrypted at the application layer, on top of
              the transport TLS your proxy terminates. So a proxy can decrypt
              and inspect the transport TLS as usual, but it still cannot read
              the message content inside. You do not need to add an inspection
              bypass for Owlka. The domains simply need to be reachable, and the
              WebSocket upgrade on <code className="text-text">relay.owlka.com</code>{" "}
              needs to be allowed rather than stripped.
            </p>
          </section>

          <section id="privacy" className="mb-14 scroll-mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              Why this is safe
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              Owlka&rsquo;s relay is a blind router. Messages are sealed on the
              sending device and only opened on the paired device that holds the
              key, so the relay, your proxy, and Owlka itself all move the same
              opaque bytes and none of them can read the conversation. Allowing
              these domains exposes no message content to anyone in the middle.
              For the full cryptographic detail, see the{" "}
              <Link
                href="/security"
                className="underline hover:text-text transition-colors"
              >
                security page
              </Link>
              .
            </p>
          </section>

          <section id="copy-paste" className="mb-14 scroll-mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              Send this to your IT team
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              Copy the block below and send it to whoever manages your proxy or
              firewall. It has everything they need.
            </p>
            <pre className="mt-6 overflow-x-auto rounded-[18px] border border-border bg-surface p-6 text-sm leading-relaxed text-text whitespace-pre-wrap break-words">
              {COPY_BLOCK}
            </pre>
          </section>

          <footer className="mt-16 border-t border-border pt-6 text-sm text-muted">
            <p>
              Still blocked after allow-listing these domains? Email{" "}
              <a
                href="mailto:support@owlka.com"
                className="underline hover:text-text transition-colors"
              >
                support@owlka.com
              </a>{" "}
              and we will help your IT team work it out.
            </p>
          </footer>
        </div>
      </main>
      <Footer />
    </>
  );
}
