import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const LAST_UPDATED = "2026-05-17";

export const metadata: Metadata = {
  title: "Privacy & security",
  description:
    "How Owlka protects your data: TLS 1.3 in transit, AES-256 at rest, ISO 27001 / SOC 2 audited infrastructure providers, no third-party analytics.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    url: `${SITE_URL}/privacy`,
    title: "Privacy & security | Owlka",
    description:
      "How Owlka protects your data, including encryption, hosting, and certifications.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Privacy & security | Owlka",
    description:
      "How Owlka protects your data, including encryption, hosting, and certifications.",
  },
};

type Row = { label: string; value: string };

type Section = {
  id: string;
  title: string;
  intro?: string;
  rows: Row[];
  footnote?: string;
};

const SECTIONS: Section[] = [
  {
    id: "in-transit",
    title: "Encryption in transit",
    intro:
      "Every byte that travels between your device and Owlka is encrypted end-to-end with modern, public ciphers.",
    rows: [
      {
        label: "Browser ↔ Owlka edge",
        value:
          "TLS 1.3 only. Cipher suites limited to AEAD families (AES-128-GCM, AES-256-GCM, ChaCha20-Poly1305). TLS 1.0/1.1/1.2 and RSA key-exchange are disabled at the edge.",
      },
      {
        label: "Edge ↔ origin server",
        value:
          "Authenticated Cloudflare Tunnel. Mutually authenticated TLS 1.3 inside a long-lived QUIC connection. The origin has no public IP and is not reachable directly from the internet.",
      },
      {
        label: "Operator access",
        value:
          "SSH with key-only authentication, fronted by Cloudflare Access (single sign-on, MFA enforced). Password authentication is disabled. The SSH port is not exposed to the public internet.",
      },
    ],
  },
  {
    id: "at-rest",
    title: "Encryption at rest",
    intro:
      "Stored data is encrypted on disk using standard, audited algorithms. Keys are managed by the operating system and never written to disk in plaintext.",
    rows: [
      {
        label: "Application data and conversation state",
        value:
          "LUKS2 full-disk encryption with AES-256-XTS, PBKDF2 key derivation. The decryption key is held only in RAM after boot and is never written to backup media.",
      },
      {
        label: "Database",
        value:
          "SQLite files live on the LUKS-encrypted volume. No separate database service. Backups are encrypted with age (X25519 + ChaCha20-Poly1305) before leaving the host.",
      },
      {
        label: "Secrets and API keys",
        value:
          "Stored outside the repository in a permission-restricted file (mode 0600, owned by the service user). Loaded into the process at start; never logged, never serialised to disk.",
      },
    ],
  },
  {
    id: "hosting",
    title: "Hosting and physical security",
    intro:
      "Owlka runs on dedicated cloud infrastructure in EU data centres operated by Hetzner Online GmbH. The edge layer (DNS, TLS termination, DDoS, WAF) is operated by Cloudflare.",
    rows: [
      {
        label: "Primary data centre",
        value:
          "Hetzner Falkenstein (DE). Certified to ISO/IEC 27001:2013 (information security management) and built to DIN EN 50600 standards for data centre availability and physical security.",
      },
      {
        label: "Physical access",
        value:
          "24/7 on-site staffing, mantrap entry with two-factor biometric and badge access, CCTV on all perimeters and aisle ends, no public tours.",
      },
      {
        label: "Fire protection",
        value:
          "VESDA very-early-warning aspirating smoke detection per aisle, inert-gas (argon) suppression. Independent fire compartments separated by F90 fire walls. Fire alarm linked to local fire brigade.",
      },
      {
        label: "Power and cooling",
        value:
          "N+1 redundant UPS, N+1 diesel generators (72h on-site fuel), redundant power feeds from independent substations, free-cooling design with N+1 chiller redundancy.",
      },
      {
        label: "Edge (Cloudflare)",
        value:
          "ISO/IEC 27001, ISO/IEC 27018, SOC 2 Type II, PCI DSS Service Provider, and ISO 27701 (privacy). Global anycast network with DDoS mitigation always on.",
      },
    ],
    footnote:
      "Hetzner's current certification scope is published at hetzner.com/unternehmen/zertifizierung. Cloudflare's compliance reports are available under NDA at cloudflare.com/trust-hub.",
  },
  {
    id: "data-flow",
    title: "What we store, and what we don't",
    rows: [
      {
        label: "Account data",
        value:
          "Email address, Google account identifier (if you sign in with Google), Stripe customer ID, and your chosen plan. Nothing more.",
      },
      {
        label: "Conversation content",
        value:
          "Stored only as long as needed to deliver the service and let you scroll your own history. You can delete a conversation; the row is removed on delete and purged from encrypted backups within 30 days.",
      },
      {
        label: "What we do not collect",
        value:
          "No third-party analytics, no advertising trackers, no session-replay scripts, no fingerprinting. The website ships zero third-party JavaScript. Server logs hold IP and user-agent for 14 days for abuse defence and are then purged.",
      },
      {
        label: "Third-party processors",
        value:
          "Stripe (payments — GDPR DPA in place), Cloudflare (edge — GDPR DPA in place), Hetzner (hosting — GDPR DPA in place), Anthropic (model inference — Zero Data Retention enabled on our API key, so prompts and completions are not retained by Anthropic beyond the request).",
      },
    ],
  },
  {
    id: "operational",
    title: "Operational security",
    rows: [
      {
        label: "Process isolation",
        value:
          "Each user's Claude session runs in its own kernel cgroup (systemd slice) with hard caps on tasks, memory, and CPU. One user cannot consume another user's resources or read another user's processes.",
      },
      {
        label: "Admission control",
        value:
          "A single chokepoint between the public API and the model process. Atomic per-user quota check, refused at the door if you are over your plan, never reaching the model layer.",
      },
      {
        label: "Patch cadence",
        value:
          "Unattended security upgrades enabled on the host; kernel and OpenSSL patches applied within 24h of a CVE rated high or critical.",
      },
      {
        label: "Incident response",
        value:
          "Owlka has a public status page at owlka.com/status. Material incidents are disclosed in line with GDPR Article 33 (notification within 72 hours where required).",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    rows: [
      {
        label: "Access and export",
        value:
          "Email hello@owlka.com from the address on your account and you will receive a machine-readable export of everything we hold on you within 30 days.",
      },
      {
        label: "Deletion",
        value:
          "Email hello@owlka.com and we will delete your account and all linked conversation data within 30 days. Anonymised aggregate logs (no content, no identifiers) may be retained for service reliability.",
      },
      {
        label: "Controller",
        value:
          "Owlka is operated by the natural person Tim Trailor, contactable at hello@owlka.com. Under UK GDPR / EU GDPR, that is the data controller for the purposes of these processing activities.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-10">
          <Link
            href="/"
            className="text-sm text-muted hover:text-text transition-colors"
          >
            &larr; Back to Owlka
          </Link>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Privacy &amp; security
          </h1>
          <p className="mt-3 text-muted">
            Last updated {LAST_UPDATED}. This page describes the architecture
            in place for paying users. Where a control is provided by a third
            party, the provider and their public certification are named.
          </p>
        </header>

        <nav
          aria-label="On this page"
          className="mb-12 rounded-[18px] border border-border bg-surface p-5 text-sm"
        >
          <p className="mb-3 font-medium">On this page</p>
          <ul className="space-y-1.5">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-muted hover:text-text transition-colors"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="mb-14 scroll-mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              {section.title}
            </h2>
            {section.intro && (
              <p className="mt-3 text-muted leading-relaxed">{section.intro}</p>
            )}

            <dl className="mt-6 rounded-[18px] border border-border bg-surface">
              {section.rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid gap-2 p-6 sm:grid-cols-[14rem_1fr] sm:gap-8 ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <dt className="font-medium">{row.label}</dt>
                  <dd className="text-muted leading-relaxed">{row.value}</dd>
                </div>
              ))}
            </dl>

            {section.footnote && (
              <p className="mt-3 text-xs text-muted leading-relaxed">
                {section.footnote}
              </p>
            )}
          </section>
        ))}

        <footer className="mt-16 border-t border-border pt-6 text-sm text-muted">
          <p>
            Questions about anything on this page? Email{" "}
            <a
              href="mailto:hello@owlka.com"
              className="underline hover:text-text transition-colors"
            >
              hello@owlka.com
            </a>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
