// The phone-store flags and the artwork they depend on. Runs under Node's
// built-in test runner (Node 22.6+ strips the TypeScript types):
//
//   node --test src/lib/__tests__/store-flags.test.mts
//
// Why this file exists. The home page hero shows both stores' official badge
// artwork at full brand strength, while both listings are still in review. That
// is deliberate, and it means the badge alone no longer tells you whether you
// can get the app: the only things that do are the "Coming soon" caption and
// the fact that a pending badge is not a link. Five ways that arrangement can
// silently go wrong, one test each:
//
//   1. A flag gets flipped without its URL, or a URL gets filled in without the
//      flag. Half-flipped state is how you ship a badge that links to nothing.
//   2. A flag gets flipped correctly, but the artwork it renders was never
//      committed, so the visitor gets a broken image where the badge should be.
//   3. Somebody "fixes" the artwork by pointing at apple.com or google.com.
//      That is a third-party request from our marketing page and it breaks the
//      moment the vendor moves the file.
//   4. Somebody hand-draws a vendor mark again. The first draft of the hero
//      strip recreated Google's Play triangle as an inline SVG.
//   5. The pending badge quietly becomes clickable, or loses its caption. Then
//      the page is promising a listing that does not exist yet, which is the
//      exact failure the caption was added to prevent.

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { readFileSync } from "node:fs";
import {
  ANDROID_PLAY_STORE_AVAILABLE,
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_AVAILABLE,
  IOS_APP_STORE_URL,
} from "../flags.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

const STORES = [
  {
    name: "App Store",
    available: IOS_APP_STORE_AVAILABLE,
    url: IOS_APP_STORE_URL,
    host: "apps.apple.com",
    badge: "public/app-store-badge.svg",
  },
  {
    name: "Google Play",
    available: ANDROID_PLAY_STORE_AVAILABLE,
    url: ANDROID_PLAY_STORE_URL,
    host: "play.google.com",
    badge: "public/google-play-badge.png",
  },
];

test("a store is either fully live or fully not, never half", () => {
  for (const s of STORES) {
    assert.equal(
      s.available,
      s.url !== null,
      `${s.name}: the availability flag and the listing URL disagree. Set both or neither: a live flag with no URL renders a badge that goes nowhere, and a URL with the flag off is dead config.`,
    );
  }
});

test("a live store URL points at that store", () => {
  for (const s of STORES) {
    if (!s.url) continue;
    assert.ok(
      s.url.startsWith(`https://${s.host}/`),
      `${s.name}: expected an https://${s.host}/ listing URL, got ${s.url}`,
    );
  }
});

test("the official badge artwork is committed for both stores", () => {
  // Checked whether or not the flag is on, so that flipping the flag is the
  // one-line change it claims to be and cannot land a broken image.
  for (const s of STORES) {
    assert.ok(
      existsSync(resolve(ROOT, s.badge)),
      `${s.name}: ${s.badge} is missing. Flipping the availability flag would render a broken image.`,
    );
  }
});

test("badge artwork is served from our own origin, never hotlinked", () => {
  const src = readFileSync(resolve(ROOT, "src/components/StoreBadges.tsx"), "utf8");
  for (const bad of [
    'src="https://',
    "src={`https://",
    "developer.apple.com/assets",
    "play.google.com/intl",
  ]) {
    assert.ok(
      !src.includes(bad),
      `StoreBadges.tsx references ${bad}: badge artwork must be committed under public/ and served from our own origin.`,
    );
  }
});

test("both stores are currently marked not-live", () => {
  // Guards the honesty claim the page makes. If this fails because a listing
  // genuinely went live, delete the matching line: confirm the public listing
  // returns HTTP 200 first.
  assert.equal(IOS_APP_STORE_AVAILABLE, false);
  assert.equal(ANDROID_PLAY_STORE_AVAILABLE, false);
});

test("no redrawn vendor mark in the store strip", () => {
  // An earlier draft of StoreBadges.tsx recreated Google's four-facet Play
  // triangle by hand as a monochrome SVG. Redrawing a vendor's mark is a firmer
  // prohibition than any question about where their badge may appear, and a
  // hand-copied logo drifts out of spec the moment somebody nudges a path.
  // Both badges are now the vendors' own files, so this file needs no inline
  // SVG at all and any that appears is somebody redrawing a logo.
  const src = readFileSync(resolve(ROOT, "src/components/StoreBadges.tsx"), "utf8");
  const svgCount = (src.match(/<svg/g) ?? []).length;
  assert.equal(
    svgCount,
    0,
    `StoreBadges.tsx contains ${svgCount} inline SVG(s). Store badges are the vendors' own committed artwork, never hand-drawn.`,
  );
});

test("an unapproved store badge is never a link", () => {
  // The badge is shown at full brand strength while the listing is pending, so
  // the ONLY thing separating "coming soon" from "go and get it" is that the
  // pending one is not a link and carries a caption. Both halves are asserted
  // here because losing either turns the strip into a promise the stores cannot
  // keep. The rendered DOM is checked by the CDP measurement run; this pins the
  // source so the two states cannot be collapsed into one branch.
  const src = readFileSync(resolve(ROOT, "src/components/StoreBadges.tsx"), "utf8");
  const soon = src.slice(src.indexOf("  return (\n    <span"));
  assert.ok(soon.length > 0, "the pending-approval branch was not found");
  assert.ok(
    !/<a[\s>]/.test(soon),
    "the pending-approval branch renders an anchor: an unapproved listing must not be clickable.",
  );
  assert.match(
    soon,
    /Coming soon/,
    "the pending-approval branch must carry a visible, screen-reader-readable 'Coming soon' caption.",
  );
});
