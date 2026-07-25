"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { OwlkaMark } from "./OwlkaMark";
import { MAC_DMG_URL, WINDOWS_EXE_URL } from "@/lib/flags";
import {
  detectOS,
  serverSnapshot,
  subscribeToNothing,
  type DetectedOS,
} from "@/lib/os";

// What the header CTA points at, given the visitor's OS. Resolved after
// hydration; the server render and first paint always use the /download page,
// which is correct for everybody.
function ctaTarget(os: DetectedOS): { href: string; download: boolean } {
  if (os === "mac") return { href: MAC_DMG_URL, download: true };
  if (os === "windows") return { href: WINDOWS_EXE_URL, download: true };
  // Phones, tablets, Linux and anything unrecognised go to the download page,
  // which explains the options rather than pushing a file they cannot open.
  return { href: "/download", download: false };
}

export function Nav() {
  const os = useSyncExternalStore<DetectedOS>(
    subscribeToNothing,
    detectOS,
    serverSnapshot,
  );
  const cta = ctaTarget(os);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-bg/75 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Owlka home"
        >
          <OwlkaMark className="w-8 h-8" transparent />
          <span className="text-[17px] font-semibold tracking-tight">
            Owlka
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-text/80">
          <Link href="/how-it-works" className="hover:text-text transition-colors">
            How it works
          </Link>
          <Link href="/#examples" className="hover:text-text transition-colors">
            Examples
          </Link>
          <Link href="/#why" className="hover:text-text transition-colors">
            Why Owlka
          </Link>
          <Link href="/security" className="hover:text-text transition-colors">
            Security
          </Link>
        </nav>

        {/* Nav CTA is platform-aware. It used to hard-link the Mac dmg on every
            page for every visitor, which was a Mac-first launch decision that
            expired when Windows shipped on 2026-07-20: a Windows or iPhone
            visitor tapping "Download" got a 35 MB Mac disk image they cannot
            open. It also cannot go back to a plain <Link href="/download">,
            because that was a no-op for anyone already on /download and so read
            as a dead button. Resolution: give Mac and Windows visitors their own
            artifact, and send everyone else to /download. */}
        <a
          href={cta.href}
          {...(cta.download ? { download: true } : {})}
          className="inline-flex items-center h-9 px-4 rounded-pill bg-mark text-surface text-sm font-medium shadow-md shadow-mark/20 hover:shadow-lg hover:shadow-mark/30 hover:-translate-y-0.5 transition-all"
          data-testid="nav-download-cta"
        >
          Download
        </a>
      </div>
    </header>
  );
}
