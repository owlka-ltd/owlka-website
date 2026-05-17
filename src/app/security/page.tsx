import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const LAST_UPDATED = "2026-05-17";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Owlka protects your data: LUKS2 full-disk encryption, encrypted secrets, TLS 1.3, per-tenant isolation, Zero Data Retention on Anthropic, and honest disclosures about what we do not yet have.",
  alternates: { canonical: "/security" },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    url: `${SITE_URL}/security`,
    title: "Security | Owlka",
    description:
      "Owlka's security architecture, supplier certifications, and honest disclosures about what we do not yet have.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Security | Owlka",
    description:
      "Owlka's security architecture, supplier certifications, and honest disclosures about what we do not yet have.",
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
    id: "our-work",
    title: "What we do (our work)",
    intro:
      "These are the controls Owlka operates directly. Everything here is something we build, configure, and are accountable for.",
    rows: [
      {
        label: "Full-disk encryption",
        value:
          "LUKS2 with AES-256-XTS on the Hetzner server hosting your conversations. The disk is encrypted at rest. If someone stole it physically they would see random noise.",
      },
      {
        label: "Encrypted secrets at rest",
        value:
          "API keys, OAuth tokens, and Stripe keys live in encrypted files (sops + age) and are decrypted into memory only at service start. Rotated quarterly and on incident.",
      },
      {
        label: "SSH-key-only access",
        value:
          "Password authentication on the server is disabled. Operator access is gated on hardware-bound keys.",
      },
      {
        label: "Admission control",
        value:
          'A "doorman" service refuses work before spawning anything, so a single noisy user cannot crash the box for everyone else.',
      },
      {
        label: "Per-tenant data isolation",
        value:
          "Each user's conversation history, uploaded files, and audit logs live in a directory their session cannot leave. The boundary is enforced by the server, not by trust.",
      },
      {
        label: "Kill switch",
        value:
          "A single file flips every Owlka-controlled service into a safe stopped state if anything looks wrong. We can revoke a tenant the same way without affecting anyone else.",
      },
      {
        label: "Banned-use enforcement",
        value:
          "Section 4 of our Terms bans crypto mining, port scanning, credential stuffing, hosting illegal materials, regulated data (PCI, PHI, government ID), malware, mass automation, and Anthropic-prohibited use. We are building technical enforcement to back this (per-user egress allowlist, CPU-anomaly detector). Until each control is live, enforcement is policy-based and reactive.",
      },
      {
        label: "Daily encrypted backups",
        value:
          "Hetzner-managed snapshots, retained 7 days minimum. Backups stay LUKS-encrypted on the snapshot volume.",
      },
      {
        label: "Transport encryption",
        value:
          "TLS 1.3 end to end between your device and our servers.",
      },
      {
        label: "Cloudflare in front",
        value:
          "Cloudflare sits in front of our server for DDoS protection, rate-limiting, and WAF (managed OWASP core ruleset).",
      },
    ],
  },
  {
    id: "suppliers",
    title: "What our suppliers do (their certifications, not ours)",
    intro:
      "These are controls operated by third parties we rely on. Their certifications are theirs, not Owlka's. We name them so you can verify the underlying providers independently.",
    rows: [
      {
        label: "Hetzner Cloud (Germany)",
        value:
          "Our server lives in Hetzner's Falkenstein data centre. Hetzner is ISO 27001 certified. Their facilities are 24/7 staffed, with biometric access control, redundant power, fire-suppression systems, environmental monitoring, and network-level DDoS mitigation. Hetzner does not have access to your encrypted data. They hold the hardware; we hold the disk encryption key.",
      },
      {
        label: "Anthropic (Claude)",
        value:
          "Anthropic is SOC 2 Type II certified. We use Anthropic's API with Zero Data Retention enabled on our account, which means your conversation content is not stored on Anthropic's servers and is not used to train Anthropic's models. ZDR is an account-level configuration we have requested from Anthropic, not a default. We confirm it before any paying user is onboarded.",
      },
      {
        label: "Cloudflare",
        value:
          "SOC 2 Type II, ISO 27001 certified. Handles edge TLS, DDoS, and WAF.",
      },
      {
        label: "Stripe (payments)",
        value:
          "PCI DSS Level 1 certified. We do not store payment card numbers ourselves; Stripe holds them.",
      },
    ],
  },
  {
    id: "disclosures",
    title: "What we do NOT have (honest disclosures)",
    intro:
      "We would rather lose a sale than mislead you. The items below are limits of the product and the company as they stand today.",
    rows: [
      {
        label: "Strict end-to-end encryption is not possible",
        value:
          "Strict end-to-end encryption is not possible for an AI assistant in the conventional sense. End-to-end encryption (the kind WhatsApp uses) means the server cannot read the message. We cannot offer that, because Claude needs to read your message in order to reply to it. What we DO offer is the layered approach above: TLS in transit, full-disk encryption at rest, encrypted secrets, Zero Data Retention on Anthropic, and per-tenant isolation. If strict end-to-end is a hard requirement, an AI assistant is structurally not the product for you.",
      },
      {
        label: "No SOC 2 or ISO 27001 in Owlka's own name yet",
        value:
          "We do not yet hold SOC 2 or ISO 27001 in Owlka's own name. Both certifications cost five-figure sums and take six to twelve months minimum. Our infrastructure runs on Hetzner (ISO 27001) and Anthropic (SOC 2 Type II), so the underlying compute and AI layer are certified. We will publish our certification roadmap when we have one.",
      },
      {
        label: "Training-data discipline belongs to Anthropic",
        value:
          'The "your data is not used to train models" claim is about Anthropic, not us. We do not train AI models at all. What we DO do is enable Anthropic\'s Zero Data Retention setting on our account so that conversations are not retained on Anthropic\'s side and not used in their training. We are careful not to claim training-data discipline that belongs to our supplier as if it were ours.',
      },
    ],
  },
  {
    id: "report",
    title: "Reporting a vulnerability",
    rows: [
      {
        label: "Contact",
        value:
          "If you find a security issue, please email security@owlka.com with details.",
      },
      {
        label: "Response time",
        value:
          "We respond to verified reports within seven days.",
      },
      {
        label: "Credit",
        value:
          "We credit researchers publicly with permission.",
      },
    ],
  },
];

export default function SecurityPage() {
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
            Security
          </h1>
          <p className="mt-3 text-muted">
            Last updated {LAST_UPDATED}. This page describes the security
            architecture in place for paying users, the certifications of the
            suppliers we depend on, and the things we honestly do not yet
            have.
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
              href="mailto:security@owlka.com"
              className="underline hover:text-text transition-colors"
            >
              security@owlka.com
            </a>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
