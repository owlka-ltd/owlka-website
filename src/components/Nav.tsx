"use client";

import Link from "next/link";
import { OwlkaMark } from "./OwlkaMark";

export function Nav() {
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

        <Link
          href="/download"
          className="inline-flex items-center h-9 px-4 rounded-pill bg-mark text-surface text-sm font-medium shadow-md shadow-mark/20 hover:shadow-lg hover:shadow-mark/30 hover:-translate-y-0.5 transition-all"
        >
          Download
        </Link>
      </div>
    </header>
  );
}
