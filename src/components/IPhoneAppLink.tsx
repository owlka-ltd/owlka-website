import { IOS_APP_STORE_AVAILABLE, IOS_APP_STORE_URL } from "@/lib/flags";
import { AppleMark, AppStoreBadge } from "./PlatformMarks";

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
 *
 * Once the listing is live this renders Apple's OFFICIAL App Store badge rather
 * than an Owlka-styled button. That is not a stylistic preference: Apple's App
 * Store Marketing Guidelines require the supplied badge artwork, used as-is, as
 * the call to action that links to an App Store listing. A pink pill saying
 * "Get the iPhone app" would not satisfy that.
 */
export function IPhoneAppCta() {
  if (IOS_APP_STORE_AVAILABLE && IOS_APP_STORE_URL) {
    return <AppStoreBadge />;
  }
  return (
    <a
      href={CONTACT}
      className="inline-flex items-center justify-center gap-3 h-14 px-9 rounded-pill bg-mark text-bg text-lg font-semibold shadow-sm hover:opacity-95 transition"
      data-testid="request-iphone-beta"
    >
      <AppleMark />
      Request a TestFlight invite
    </a>
  );
}

