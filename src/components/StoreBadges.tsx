import Image from "next/image";
import {
  ANDROID_PLAY_STORE_AVAILABLE,
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_AVAILABLE,
  IOS_APP_STORE_URL,
} from "@/lib/flags";

// ---------------------------------------------------------------------------
// The two PHONE store badges, on the home page hero.
//
// Tim asked for the App Store and Google Play marks in the hero, to use the
// stores' brand recognition. Both apps are SUBMITTED and awaiting review as of
// 2026-07-31: the iPhone app went to Apple that evening, and Dharminder sent
// the Android app (owlka-ltd/owlka-android v1.0.0) to Google. Neither listing
// is live yet, so neither badge links anywhere.
//
// "Coming soon" here is therefore a statement of fact with a date behind it,
// not a placeholder standing in for a feature nobody has started. The badge is
// the vendor's own artwork, at full strength, and the caption underneath says
// plainly that the listing is not open yet. The moment a store approves, one
// line in src/lib/flags.ts turns that same badge into a live link and the
// caption disappears.
//
// Two rules this file keeps:
//
//  1. OFFICIAL ARTWORK ONLY, NEVER REDRAWN. An earlier draft of this file
//     recreated Google's four-facet Play triangle by hand as a monochrome SVG.
//     Redrawing a vendor's mark is a firmer prohibition than any question about
//     where their badge may appear, and a hand-copied logo drifts out of spec
//     the moment somebody nudges a path. Both badges below are the vendors' own
//     unmodified files. There are no inline SVGs in this file and there should
//     never be one.
//  2. SERVED FROM OUR OWN ORIGIN, NEVER HOTLINKED. Both files are committed
//     under public/. A marketing page that fetches artwork from apple.com or
//     google.com makes a third-party request on every visit and breaks the day
//     the vendor moves the file.
// ---------------------------------------------------------------------------

// Apple supplies the badge with no clear space in the artwork, so the p-1 on
// the wrapper provides the 1/10th-of-badge-height margin their guidelines ask
// for. Google bakes its clear space into the PNG, which is why that one has no
// padding and why its box is the taller of the two at the same visible badge
// height. Do not crop the Google PNG to make the two boxes match.
const APPLE_BADGE = {
  src: "/app-store-badge.svg",
  width: 120,
  height: 40,
  className: "h-10 w-auto",
  wrapper: "p-1",
} as const;

const GOOGLE_BADGE = {
  src: "/google-play-badge.png",
  width: 646,
  height: 250,
  className: "h-[3.875rem] w-auto",
  wrapper: "",
} as const;

/**
 * The phone-store strip for the home page hero. Sits under the Mac and Windows
 * download buttons, where a visitor asking "is there a phone app" looks.
 *
 * Layout: a wrapping flex list with no fixed widths, so it cannot push the
 * document wider than the viewport on a small phone.
 */
export function PhoneStores({ className = "" }: { className?: string }) {
  return (
    <div className={className} data-testid="phone-stores">
      <p
        id="phone-stores-heading"
        className="text-xs font-medium uppercase tracking-wider text-muted"
      >
        Phone apps
      </p>
      <ul
        aria-labelledby="phone-stores-heading"
        className="mt-2.5 flex flex-wrap items-start gap-x-4 gap-y-3 justify-center lg:justify-start"
      >
        <li>
          <StoreBadge
            badge={APPLE_BADGE}
            store="App Store"
            live={Boolean(IOS_APP_STORE_AVAILABLE && IOS_APP_STORE_URL)}
            href={IOS_APP_STORE_URL}
            liveAlt="Download Owlka on the App Store"
            liveTestId="hero-app-store-badge"
            soonTestId="hero-app-store-coming-soon"
          />
        </li>
        <li>
          <StoreBadge
            badge={GOOGLE_BADGE}
            store="Google Play"
            live={Boolean(ANDROID_PLAY_STORE_AVAILABLE && ANDROID_PLAY_STORE_URL)}
            href={ANDROID_PLAY_STORE_URL}
            liveAlt="Get Owlka on Google Play"
            liveTestId="hero-google-play-badge"
            soonTestId="hero-google-play-coming-soon"
          />
        </li>
      </ul>
    </div>
  );
}

/**
 * One store, in whichever of its two states applies.
 *
 * LIVE: the badge is a link to the listing, with the vendor's own call to
 * action as its alt text, and no caption.
 *
 * AWAITING REVIEW: the same badge, at the same size, deliberately NOT a link
 * and NOT focusable, with a "Coming soon" caption under it. The alt text drops
 * to the bare store name, because "Download on the App Store" would be an
 * instruction the visitor cannot follow yet and a screen reader would read it
 * as one.
 *
 * TO GO LIVE, one line per store in src/lib/flags.ts: set the listing URL and
 * flip the availability flag. Nothing here changes. Confirm the public listing
 * actually returns HTTP 200 first: an internal note saying "submitted" or
 * "published" is not the same thing as a live listing.
 */
function StoreBadge({
  badge,
  store,
  live,
  href,
  liveAlt,
  liveTestId,
  soonTestId,
}: {
  badge: typeof APPLE_BADGE | typeof GOOGLE_BADGE;
  store: string;
  live: boolean;
  href: string | null;
  liveAlt: string;
  liveTestId: string;
  soonTestId: string;
}) {
  // A shared 64px band both badges sit centred in. Apple's artwork carries no
  // clear space and renders in a 48px box; Google's bakes its own in and
  // renders in a 62px box. Left to their natural heights the two badges, and
  // more visibly the two captions under them, sit at different heights. The
  // band equalises them without cropping or rescaling either vendor's file.
  const art = (alt: string) => (
    <span className={`flex h-16 items-center ${badge.wrapper}`}>
      <Image
        src={badge.src}
        alt={alt}
        width={badge.width}
        height={badge.height}
        className={badge.className}
        unoptimized
      />
    </span>
  );

  if (live && href) {
    return (
      <a
        href={href}
        className="inline-block hover:opacity-90 transition-opacity"
        data-testid={liveTestId}
      >
        {art(liveAlt)}
      </a>
    );
  }

  return (
    <span
      className="inline-flex flex-col items-center"
      data-testid={soonTestId}
    >
      {art(store)}
      {/* Real text, not a colour and not a visual treatment on the badge: a
          screen reader announces "App Store, coming soon" exactly as a sighted
          visitor reads it. */}
      <span className="text-[11px] font-semibold uppercase tracking-wider text-mark">
        Coming soon
      </span>
    </span>
  );
}
