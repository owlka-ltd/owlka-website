import Link from "next/link";
import { OwlkaMark } from "./OwlkaMark";
import {
  COMPANY_NAME,
  COMPANY_NUMBER,
  COMPANY_JURISDICTION,
  REGISTERED_OFFICE,
} from "@/lib/company";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
          <div className="flex-1">
            <Link href="/" className="flex items-center gap-2.5">
              <OwlkaMark className="w-8 h-8" transparent />
              <span className="text-[17px] font-semibold tracking-tight">
                Owlka
              </span>
            </Link>
            <p className="mt-4 text-sm text-text/70 leading-relaxed max-w-xs">
              The power of Claude. In your pocket.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
            <div>
              <p className="font-semibold mb-3">Product</p>
              <ul className="space-y-2 text-text/70">
                <li>
                  <Link href="/download" className="hover:text-text transition-colors">
                    Download
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-text transition-colors">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="/#examples" className="hover:text-text transition-colors">
                    Examples
                  </Link>
                </li>
                <li>
                  <Link href="/#waitlist" className="hover:text-text transition-colors">
                    Stay in the loop
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-3">Company</p>
              <ul className="space-y-2 text-text/70">
                <li>
                  <Link href="/support" className="hover:text-text transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-text transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="mailto:support@owlka.com" className="hover:text-text transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-text transition-colors">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-3">Legal</p>
              <ul className="space-y-2 text-text/70">
                <li>
                  <Link href="/privacy" className="hover:text-text transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-text transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-text transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/ai-use" className="hover:text-text transition-colors">
                    AI Use
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="hover:text-text transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col gap-3 text-xs text-muted">
          <p className="leading-relaxed">
            {COMPANY_NAME}, a company registered in {COMPANY_JURISDICTION}{" "}
            (Company No. {COMPANY_NUMBER}). Registered office:{" "}
            {REGISTERED_OFFICE}.
          </p>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <p>© {new Date().getFullYear()} Owlka Ltd. All rights reserved.</p>
            <p>Built with Owlka.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
