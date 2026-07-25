import { IOS_APP_STORE_AVAILABLE, IOS_APP_STORE_URL } from "@/lib/flags";

// Every place on the site that tells a visitor how to get the Owlka iPhone app
// renders one of these two components. That is the whole point: when the App
// Store listing goes live, two constants in src/lib/flags.ts change and every
// page starts linking, with no page copy to hunt down.
//
// Until then the copy says plainly that the app is not on the App Store yet,
// because it is not, and pointing people at a store listing that does not exist
// is a dead end they cannot debug.

const CONTACT = "mailto:support@owlka.com";

/**
 * One inline sentence: how do I get the iPhone app today? Renders inside
 * running prose, so it emits a <span>, never a block element.
 */
export function IPhoneAppNote({ className }: { className?: string }) {
  if (IOS_APP_STORE_AVAILABLE && IOS_APP_STORE_URL) {
    return (
      <span className={className}>
        Get the Owlka iPhone app on the{" "}
        <a
          href={IOS_APP_STORE_URL}
          className="text-mark hover:underline"
          data-testid="app-store-link"
        >
          App Store
        </a>
        .
      </span>
    );
  }
  return (
    <span className={className}>
      The Owlka iPhone app is not on the App Store yet. It is in TestFlight
      beta, so email{" "}
      <a href={CONTACT} className="text-mark hover:underline">
        support@owlka.com
      </a>{" "}
      and we will send you an invite.
    </span>
  );
}

/**
 * The button-shaped version for the download page, used as the primary action
 * when the visitor is on a phone or tablet and cannot install a desktop app.
 */
export function IPhoneAppCta() {
  if (IOS_APP_STORE_AVAILABLE && IOS_APP_STORE_URL) {
    return (
      <a
        href={IOS_APP_STORE_URL}
        className="inline-flex items-center justify-center gap-3 h-14 px-9 rounded-pill bg-mark text-bg text-lg font-semibold shadow-sm hover:opacity-95 transition"
        data-testid="download-iphone-app"
      >
        <AppleGlyph />
        Get the iPhone app
      </a>
    );
  }
  return (
    <a
      href={CONTACT}
      className="inline-flex items-center justify-center gap-3 h-14 px-9 rounded-pill bg-mark text-bg text-lg font-semibold shadow-sm hover:opacity-95 transition"
      data-testid="request-iphone-beta"
    >
      <AppleGlyph />
      Request a TestFlight invite
    </a>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
      <path d="M17.05 12.04c-.03-2.9 2.37-4.3 2.48-4.37-1.36-1.98-3.47-2.25-4.22-2.28-1.8-.18-3.51 1.06-4.42 1.06-.93 0-2.32-1.04-3.82-1.01-1.96.03-3.78 1.14-4.78 2.89-2.05 3.56-.52 8.81 1.46 11.7.97 1.42 2.12 3 3.62 2.95 1.46-.06 2.01-.94 3.77-.94 1.76 0 2.26.94 3.79.91 1.57-.03 2.56-1.43 3.52-2.86 1.11-1.64 1.57-3.23 1.59-3.31-.04-.02-3.04-1.17-3.07-4.74zM14.34 3.97c.81-.98 1.35-2.34 1.2-3.69-1.16.05-2.57.78-3.4 1.75-.75.86-1.4 2.24-1.22 3.56 1.29.1 2.61-.66 3.42-1.62z" />
    </svg>
  );
}
