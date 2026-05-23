#!/usr/bin/env node
// Verify the website's canonical Terms of Service text and the iOS
// app's bundled copy are byte-identical.
//
// Tim asked for the website and iOS terms to be "identical". This
// script enforces that by SHA-256, so the two cannot silently drift.
//
// Run from the owlka-website repo root:
//   node scripts/check_terms_parity.mjs
//
// Exit 0 if identical, exit 1 if mismatched. The script searches a
// list of likely paths for the iOS-side copy; if none exist (e.g.
// running before the iOS-side PR merges) it warns and exits 0 so
// CI does not block on a not-yet-landed counterpart.

import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

const WEBSITE = resolve("src/content/legal/terms.md");

const IOS_CANDIDATES = [
  // Same machine, sibling checkout.
  resolve("..", "TerminalApp", "TerminalApp", "Owlka", "TERMS.md"),
  // Optional explicit override.
  process.env.OWLKA_IOS_TERMS_PATH,
].filter((p) => typeof p === "string");

function sha256(p) {
  return createHash("sha256").update(readFileSync(p)).digest("hex");
}

if (!existsSync(WEBSITE)) {
  console.error(`Website terms missing at ${WEBSITE}`);
  process.exit(1);
}

const webHash = sha256(WEBSITE);
console.log(`website  ${webHash}  ${WEBSITE}`);

let foundIos = false;
let mismatch = false;
for (const candidate of IOS_CANDIDATES) {
  if (!existsSync(candidate)) continue;
  foundIos = true;
  const iosHash = sha256(candidate);
  console.log(`ios      ${iosHash}  ${candidate}`);
  if (iosHash !== webHash) {
    console.error(`MISMATCH: ${candidate} differs from ${WEBSITE}`);
    mismatch = true;
  }
}

if (!foundIos) {
  console.log(
    "ios copy not found in any candidate path (this is OK if the iOS-side PR has not landed yet).",
  );
  process.exit(0);
}

if (mismatch) {
  console.error(
    "Refusing to ship: the iOS app and the website would serve different Terms of Service.",
  );
  process.exit(1);
}

console.log("OK: website and iOS terms are byte-identical.");
