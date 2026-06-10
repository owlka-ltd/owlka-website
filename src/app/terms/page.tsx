import { promises as fs } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import {
  COMPANY_NAME,
  COMPANY_NUMBER,
  COMPANY_JURISDICTION,
  REGISTERED_OFFICE,
} from "@/lib/company";

// Canonical Terms of Service text. Single source of truth.
// The iOS app bundles an identical copy of this file at
// TerminalApp/Owlka/Legal/TERMS.md. An integrity check
// (scripts/check_terms_parity.mjs) verifies the two files
// match by SHA-256 on every build.
const TERMS_PATH = path.join(process.cwd(), "src/content/legal/terms.md");

async function loadTerms(): Promise<{ text: string; sha256: string }> {
  const text = await fs.readFile(TERMS_PATH, "utf8");
  const sha256 = createHash("sha256").update(text).digest("hex");
  return { text, sha256 };
}

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of Owlka. As-is, beta software, UK law. Last updated 2026-05-23.",
  alternates: { canonical: "/terms" },
};

// Dependency-free markdown to JSX. Handles only the constructs used in
// terms.md: ATX headings (#, ##), bold (**...**), italic (*...*),
// unordered lists (- ), horizontal rules (---), paragraphs, and inline
// links. Anything more elaborate should be added here, not by pulling
// in a markdown library.
function renderMarkdown(md: string): React.ReactNode {
  const lines = md.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  const inline = (s: string): React.ReactNode[] => {
    const out: React.ReactNode[] = [];
    let rest = s;
    let n = 0;
    // Process in order: links, then bold, then italic.
    const linkRe = /\[([^\]]+)\]\(([^)]+)\)/;
    const boldRe = /\*\*([^*]+)\*\*/;
    const italicRe = /\*([^*]+)\*/;
    while (rest.length > 0) {
      const link = linkRe.exec(rest);
      const bold = boldRe.exec(rest);
      const italic = italicRe.exec(rest);
      const candidates = [link, bold, italic]
        .filter((m): m is RegExpExecArray => m !== null)
        .sort((a, b) => a.index - b.index);
      const next = candidates[0];
      if (!next) {
        out.push(rest);
        break;
      }
      if (next.index > 0) out.push(rest.slice(0, next.index));
      if (next === link) {
        out.push(
          <Link
            key={`l${n++}`}
            href={link![2]}
            className="text-mark hover:underline"
          >
            {link![1]}
          </Link>,
        );
      } else if (next === bold) {
        out.push(
          <strong key={`b${n++}`} className="font-semibold">
            {bold![1]}
          </strong>,
        );
      } else {
        out.push(<em key={`i${n++}`}>{italic![1]}</em>);
      }
      rest = rest.slice(next.index + next[0].length);
    }
    return out;
  };

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      blocks.push(
        <h1
          key={key++}
          className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight mt-0 mb-6"
        >
          {inline(line.slice(2))}
        </h1>,
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push(
        <h2
          key={key++}
          className="text-2xl font-semibold mt-10 mb-4 scroll-mt-24"
        >
          {inline(line.slice(3))}
        </h2>,
      );
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={key++} className="text-xl font-semibold mt-6 mb-3">
          {inline(line.slice(4))}
        </h3>,
      );
      i++;
      continue;
    }
    if (line.trim() === "---") {
      blocks.push(
        <hr key={key++} className="my-10 border-t border-border" />,
      );
      i++;
      continue;
    }
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <ul
          key={key++}
          className="list-disc pl-6 space-y-2 my-4 text-text/85"
        >
          {items.map((item, idx) => (
            <li key={idx}>{inline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }
    if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
      // Standalone italic paragraph (the footer disclaimer).
      blocks.push(
        <p key={key++} className="my-4 text-sm text-muted italic">
          {inline(line.slice(1, -1))}
        </p>,
      );
      i++;
      continue;
    }
    // Otherwise: a paragraph that may span until the next blank line.
    const paragraphLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("- ") &&
      lines[i].trim() !== "---"
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++} className="my-4 leading-relaxed text-text/85">
        {inline(paragraphLines.join(" "))}
      </p>,
    );
  }
  return blocks;
}

export default async function TermsPage() {
  const { text, sha256 } = await loadTerms();

  return (
    <>
      <Nav />
      <main className="bg-bg">
        <article className="mx-auto max-w-3xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
          <header className="mb-12">
            <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">
              Legal
            </p>
          </header>
          <div className="prose prose-neutral max-w-none">
            {renderMarkdown(text)}
          </div>
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Registered company details
            </h2>
            <p className="leading-relaxed text-text/85">
              {COMPANY_NAME} is a company registered in {COMPANY_JURISDICTION}{" "}
              (Company No. {COMPANY_NUMBER}). Registered office:{" "}
              {REGISTERED_OFFICE}.
            </p>
          </section>
          <p className="mt-16 text-xs text-muted">
            Document integrity (SHA-256): <code>{sha256.slice(0, 16)}…</code>
            . The Owlka iPhone app bundles a byte-identical copy of this
            document so the in-app and web versions never drift.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
