// Pure helpers for the /api/waitlist route.
//
// Extracted from src/app/api/waitlist/route.ts so they can be unit-tested
// under Node's built-in `node --test` runner without pulling in the
// Next.js runtime. The route handler imports them from here.

// ──────────────────────────────────────────────────────────────────────
// Email validation
// ──────────────────────────────────────────────────────────────────────
//
// Deliberately simple — we are not verifying that the mailbox exists,
// only that the string looks like an email. Anything stricter rejects
// legitimate addresses (e.g. tagged + addresses, new TLDs).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(raw: unknown): raw is string {
  if (typeof raw !== "string") return false;
  const trimmed = raw.trim();
  if (trimmed.length === 0 || trimmed.length > 254) return false;
  return EMAIL_RE.test(trimmed);
}

// ──────────────────────────────────────────────────────────────────────
// Name validation
// ──────────────────────────────────────────────────────────────────────
//
// Names are intentionally permissive: any non-empty trimmed string up
// to 80 chars is accepted. No alphabetic constraint, no diacritic
// stripping — that would reject legitimate names (O'Brien, Renée,
// مريم, 王芳).

export const NAME_MAX_LEN = 80;

export function isValidName(raw: unknown): raw is string {
  if (typeof raw !== "string") return false;
  const trimmed = raw.trim();
  if (trimmed.length === 0 || trimmed.length > NAME_MAX_LEN) return false;
  return true;
}

// ──────────────────────────────────────────────────────────────────────
// Rate limiter
// ──────────────────────────────────────────────────────────────────────

export const RATE_LIMIT_MAX = 4;
export const RATE_WINDOW_MS = 60_000;

type Bucket = { hits: number[] };

export class RateLimiter {
  private buckets = new Map<string, Bucket>();
  private readonly max: number;
  private readonly windowMs: number;

  // NB: explicit field assignment (not TS parameter-property shorthand)
  // so this file can be loaded by Node's strip-types runtime for unit
  // tests. `private readonly foo: number` in the constructor signature
  // is rejected as "TypeScript parameter property is not supported in
  // strip-only mode".
  constructor(max: number = RATE_LIMIT_MAX, windowMs: number = RATE_WINDOW_MS) {
    this.max = max;
    this.windowMs = windowMs;
  }

  // Returns true if the request is allowed, false if it should be blocked.
  //
  // Side effect: prunes buckets whose hits have all aged out. Without
  // that pruning the `buckets` Map would grow once per unique key for
  // the lifetime of the warm serverless instance — bounded by cold-start
  // resets in practice, but still unbounded in principle.
  check(key: string, now: number = Date.now()): boolean {
    const cutoff = now - this.windowMs;
    const bucket = this.buckets.get(key) ?? { hits: [] };
    // Drop hits older than the window.
    bucket.hits = bucket.hits.filter((t) => t > cutoff);
    if (bucket.hits.length >= this.max) {
      this.buckets.set(key, bucket);
      return false;
    }
    bucket.hits.push(now);
    this.buckets.set(key, bucket);
    return true;
  }

  // Walk every tracked bucket and drop the ones whose hits have all
  // aged out. Cheap (O(keys)) and bounds the Map size to "keys with
  // a hit inside the current window".
  prune(now: number = Date.now()): void {
    const cutoff = now - this.windowMs;
    for (const [key, bucket] of this.buckets) {
      bucket.hits = bucket.hits.filter((t) => t > cutoff);
      if (bucket.hits.length === 0) {
        this.buckets.delete(key);
      }
    }
  }

  // Visible only for tests.
  _size(): number {
    return this.buckets.size;
  }
}
