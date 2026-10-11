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
// list of likely paths for the iOS-side copy.
//
// If none exist: in CI / hosted builds (CI or VERCEL env set), where the
// private iOS repo is never checked out, it prints a notice and exits 0.
// Anywhere else (a local run) a missing iOS copy is an ERROR, exit 1, so a
// moved file can never make the check pass without comparing anything.

import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

const WEBSITE = resolve("src/content/legal/terms.md");

const IOS_CANDIDATES = [
  // Same machine, sibling checkout.
  // iOS repo (owlka-ltd/Owlka) checked out next to this one.
  resolve("..", "Owlka", "Owlka", "Owlka", "TERMS.md"),
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
  const hosted = Boolean(process.env.CI || process.env.VERCEL);
  const tried = IOS_CANDIDATES.map((p) => `  ${p}`).join("\n");
  if (hosted) {
    console.log(
      `NOTICE: iOS terms copy not found, skipping parity (hosted build, iOS repo not present). Tried:\n${tried}`,
    );
    process.exit(0);
  }
  console.error(
    `ERROR: iOS terms copy not found, so NOTHING was compared. Tried:\n${tried}\nCheck out owlka-ltd/Owlka beside this repo or set OWLKA_IOS_TERMS_PATH.`,
  );
  process.exit(1);
}

if (mismatch) {
  console.error(
    "Refusing to ship: the iOS app and the website would serve different Terms of Service.",
  );
  process.exit(1);
}

console.log("OK: website and iOS terms are byte-identical.");
