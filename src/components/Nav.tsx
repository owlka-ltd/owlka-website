"use client";

import Link from "next/link";
import { OwlkaMark } from "./OwlkaMark";

export function Nav() {
  return (
    <>
      <div className="w-full bg-mark text-surface text-center text-xs sm:text-[13px] py-2 px-4 font-medium tracking-wide">
        <span className="opacity-80 uppercase mr-2">Coming soon</span>
        <span className="opacity-70 mr-2">·</span>
        <Link href="#waitlist" className="underline underline-offset-4 hover:no-underline">
          Join the waitlist for early access
        </Link>
      </div>

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
            <Link href="#how" className="hover:text-text transition-colors">
              How it works
            </Link>
            <Link href="#examples" className="hover:text-text transition-colors">
              Examples
            </Link>
            <Link href="#why" className="hover:text-text transition-colors">
              Why Owlka
            </Link>
            <Link href="#pricing" className="hover:text-text transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="hover:text-text transition-colors">
              Docs
            </Link>
          </nav>

          <Link
            href="#waitlist"
            className="inline-flex items-center h-9 px-4 rounded-pill bg-mark text-surface text-sm font-medium shadow-md shadow-mark/20 hover:shadow-lg hover:shadow-mark/30 hover:-translate-y-0.5 transition-all"
          >
            Join the waitlist
          </Link>
        </div>
      </header>
    </>
  );
}
