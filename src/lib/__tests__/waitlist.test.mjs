// Unit tests for the pure helpers in src/lib/waitlist.ts.
//
// Runs under Node's built-in test runner with native TypeScript
// stripping (Node >= 22.6 / stable on 25):
//
//   node --test src/lib/__tests__/waitlist.test.mjs
//
// We import directly from the lib so the test stays free of the Next.js
// runtime.

import { test } from "node:test";
import assert from "node:assert/strict";

import { isValidEmail, isValidName, RateLimiter } from "../waitlist.ts";

// ──────────────────────────────────────────────────────────────────────
// isValidEmail
// ──────────────────────────────────────────────────────────────────────

test("isValidEmail accepts a plain address", () => {
  assert.equal(isValidEmail("tim@owlka.com"), true);
});

test("isValidEmail accepts tagged + addresses", () => {
  assert.equal(isValidEmail("tim+waitlist@owlka.com"), true);
});

test("isValidEmail accepts a long but valid TLD", () => {
  assert.equal(isValidEmail("hello@example.london"), true);
});

test("isValidEmail trims surrounding whitespace before validating", () => {
  assert.equal(isValidEmail("  tim@owlka.com  "), true);
});

test("isValidEmail rejects a non-string", () => {
  assert.equal(isValidEmail(undefined), false);
  assert.equal(isValidEmail(null), false);
  assert.equal(isValidEmail(42), false);
  assert.equal(isValidEmail({}), false);
});

test("isValidEmail rejects empty and whitespace-only strings", () => {
  assert.equal(isValidEmail(""), false);
  assert.equal(isValidEmail("   "), false);
});

test("isValidEmail rejects strings with no @", () => {
  assert.equal(isValidEmail("no-at-sign.example.com"), false);
});

test("isValidEmail rejects strings with no dot in the domain", () => {
  // The regex requires `.<tld>` after the @ host segment.
  assert.equal(isValidEmail("tim@localhost"), false);
});

test("isValidEmail rejects whitespace inside the address", () => {
  assert.equal(isValidEmail("tim @owlka.com"), false);
  assert.equal(isValidEmail("tim@ owlka.com"), false);
});

test("isValidEmail rejects multiple @ signs", () => {
  assert.equal(isValidEmail("tim@@owlka.com"), false);
});

test("isValidEmail rejects strings longer than 254 characters", () => {
  // RFC 5321 cap. 255 chars total: 245-char local-part + "@a.co" (5 chars).
  const local = "a".repeat(250);
  const tooLong = `${local}@a.co`;
  assert.equal(tooLong.length, 255);
  assert.equal(isValidEmail(tooLong), false);
});

test("isValidEmail accepts strings exactly at the 254-character limit", () => {
  // Build a valid-shape address that is exactly 254 characters long.
  const local = "a".repeat(249);
  const address = `${local}@a.co`;
  assert.equal(address.length, 254);
  assert.equal(isValidEmail(address), true);
});

// ──────────────────────────────────────────────────────────────────────
// isValidName
// ──────────────────────────────────────────────────────────────────────

test("isValidName accepts a plain ASCII name", () => {
  assert.equal(isValidName("Tim"), true);
});

test("isValidName accepts diacritics, apostrophes, non-Latin scripts", () => {
  assert.equal(isValidName("Renée"), true);
  assert.equal(isValidName("O'Brien"), true);
  assert.equal(isValidName("王芳"), true);
  assert.equal(isValidName("مريم"), true);
});

test("isValidName trims surrounding whitespace before validating", () => {
  assert.equal(isValidName("  Tim  "), true);
});

test("isValidName rejects a non-string", () => {
  assert.equal(isValidName(undefined), false);
  assert.equal(isValidName(null), false);
  assert.equal(isValidName(42), false);
  assert.equal(isValidName({}), false);
});

test("isValidName rejects empty and whitespace-only strings", () => {
  assert.equal(isValidName(""), false);
  assert.equal(isValidName("   "), false);
});

test("isValidName rejects strings longer than 80 characters", () => {
  assert.equal(isValidName("a".repeat(81)), false);
});

test("isValidName accepts strings exactly at the 80-character limit", () => {
  assert.equal(isValidName("a".repeat(80)), true);
});

// ──────────────────────────────────────────────────────────────────────
// RateLimiter
// ──────────────────────────────────────────────────────────────────────

test("RateLimiter allows up to max hits inside the window", () => {
  const rl = new RateLimiter(4, 60_000);
  const t0 = 1_000_000;
  assert.equal(rl.check("ip1", t0 + 0), true);
  assert.equal(rl.check("ip1", t0 + 10), true);
  assert.equal(rl.check("ip1", t0 + 20), true);
  assert.equal(rl.check("ip1", t0 + 30), true);
});

test("RateLimiter rejects the N+1th hit inside the window", () => {
  const rl = new RateLimiter(4, 60_000);
  const t0 = 2_000_000;
  for (let i = 0; i < 4; i++) {
    assert.equal(rl.check("ip1", t0 + i), true);
  }
  // 5th hit inside the same 60s window must be rejected.
  assert.equal(rl.check("ip1", t0 + 100), false);
});

test("RateLimiter tracks buckets independently per key", () => {
  const rl = new RateLimiter(2, 60_000);
  const t0 = 3_000_000;
  assert.equal(rl.check("ipA", t0), true);
  assert.equal(rl.check("ipA", t0 + 1), true);
  assert.equal(rl.check("ipA", t0 + 2), false, "ipA should be rate-limited");
  // ipB has its own bucket and is unaffected.
  assert.equal(rl.check("ipB", t0 + 2), true);
  assert.equal(rl.check("ipB", t0 + 3), true);
  assert.equal(rl.check("ipB", t0 + 4), false, "ipB should be rate-limited");
});

test("RateLimiter slot reopens after the window expires", () => {
  const rl = new RateLimiter(2, 60_000);
  const t0 = 4_000_000;
  // Fill the bucket.
  assert.equal(rl.check("ip1", t0), true);
  assert.equal(rl.check("ip1", t0 + 1_000), true);
  assert.equal(rl.check("ip1", t0 + 2_000), false);
  // Step past the window so the earliest hit ages out.
  // First hit was at t0; it expires at cutoff = now - windowMs >= t0,
  // i.e. now > t0 + windowMs.
  const afterWindow = t0 + 60_001;
  assert.equal(
    rl.check("ip1", afterWindow),
    true,
    "first slot should reopen once the oldest hit ages out",
  );
});

test("RateLimiter drops only the hits that have aged out, not the whole bucket", () => {
  const rl = new RateLimiter(3, 60_000);
  const t0 = 5_000_000;
  assert.equal(rl.check("ip1", t0), true);
  assert.equal(rl.check("ip1", t0 + 30_000), true);
  assert.equal(rl.check("ip1", t0 + 59_000), true);
  // 4th request inside the window: blocked.
  assert.equal(rl.check("ip1", t0 + 59_500), false);
  // Step just past the first hit's window. The first hit ages out,
  // but the 30_000 and 59_000 hits are still inside the new window,
  // so we should now be allowed exactly one more.
  const t1 = t0 + 60_001;
  assert.equal(rl.check("ip1", t1), true);
  // And the very next call inside the same window is blocked again.
  assert.equal(rl.check("ip1", t1 + 1), false);
});

test("RateLimiter constructor defaults match the production values", () => {
  // 4 hits per 60s by default (matches the constants in waitlist.ts).
  const rl = new RateLimiter();
  const t0 = 6_000_000;
  for (let i = 0; i < 4; i++) {
    assert.equal(rl.check("ip1", t0 + i), true, `hit ${i + 1} of 4 should pass`);
  }
  assert.equal(rl.check("ip1", t0 + 5), false, "5th hit should be blocked");
});

test("RateLimiter _size reflects the number of tracked keys", () => {
  const rl = new RateLimiter(4, 60_000);
  assert.equal(rl._size(), 0);
  rl.check("ip1", 0);
  rl.check("ip2", 0);
  rl.check("ip1", 1);
  assert.equal(rl._size(), 2);
});

test("RateLimiter prune drops fully-aged-out buckets", () => {
  const rl = new RateLimiter(4, 60_000);
  rl.check("ip1", 0);
  rl.check("ip2", 0);
  rl.check("ip3", 30_000);
  assert.equal(rl._size(), 3);
  // Step past the window so ip1 and ip2 age out completely. ip3's hit
  // at 30_000 is still inside `prune(now) - windowMs` if now < 90_000.
  rl.prune(70_000);
  assert.equal(rl._size(), 1, "ip3 should survive, ip1+ip2 should be pruned");
  // Step past ip3's window too — bucket goes empty.
  rl.prune(100_000);
  assert.equal(rl._size(), 0, "all buckets aged out");
});
