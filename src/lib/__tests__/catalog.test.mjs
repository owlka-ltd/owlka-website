// Shape test for /api/catalog. Runs under Node's built-in test runner:
//
//   node --test src/lib/__tests__/catalog.test.mjs
//
// We test the JSON source of truth directly so the test stays free of
// the Next.js runtime and TypeScript compilation. The route handler
// (`src/app/api/catalog/route.ts`) wraps this same payload in a
// NextResponse, so asserting the JSON shape pins down the wire contract
// the iOS Connectors page consumes.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(HERE, "..", "catalog-data.json");

const catalog = JSON.parse(readFileSync(DATA_PATH, "utf8"));

const VALID_STATUSES = new Set(["live", "coming-soon"]);
const VALID_PAIR_TYPES = new Set(["deeplink", "oauth", "sheet", "builtin"]);

// Connectors that the iOS Connectors page expects to see at launch.
// If the catalogue drops one of these without an iOS-side change first,
// the iOS app may render an empty page. Keep this list in sync with the
// Owlka launch plan (S11).
const REQUIRED_SLUGS = [
  "shell",
  "github",
  "linear",
  "slack",
  "gmail",
  "gcal",
  "gdrive",
  "notion",
  "klipper",
  "homeassistant",
];

test("catalog has top-level version string and connectors array", () => {
  assert.equal(typeof catalog.version, "string");
  assert.ok(catalog.version.length > 0, "version must be non-empty");
  assert.ok(Array.isArray(catalog.connectors), "connectors must be an array");
  assert.ok(catalog.connectors.length > 0, "connectors must not be empty");
});

test("catalog contains every required connector slug", () => {
  const slugs = new Set(catalog.connectors.map((c) => c.slug));
  for (const required of REQUIRED_SLUGS) {
    assert.ok(slugs.has(required), `missing required connector: ${required}`);
  }
});

test("every connector has the right shape", () => {
  for (const c of catalog.connectors) {
    assert.equal(typeof c.slug, "string", `slug must be string for ${JSON.stringify(c)}`);
    assert.equal(typeof c.name, "string", `name must be string for ${c.slug}`);
    assert.equal(
      typeof c.description,
      "string",
      `description must be string for ${c.slug}`,
    );
    assert.equal(typeof c.icon, "string", `icon must be string for ${c.slug}`);
    assert.ok(
      VALID_STATUSES.has(c.status),
      `status must be live|coming-soon for ${c.slug}, got ${c.status}`,
    );
    assert.ok(c.pair && typeof c.pair === "object", `pair must be object for ${c.slug}`);
    assert.ok(
      VALID_PAIR_TYPES.has(c.pair.type),
      `pair.type must be deeplink|oauth|sheet|builtin for ${c.slug}, got ${c.pair.type}`,
    );
    assert.ok(
      c.pair.payload && typeof c.pair.payload === "object",
      `pair.payload must be object for ${c.slug}`,
    );
  }
});

test("icon is a stable identifier string, not a URL", () => {
  for (const c of catalog.connectors) {
    assert.ok(c.icon.length > 0, `icon for ${c.slug} must be non-empty`);
    assert.ok(
      !c.icon.startsWith("http://") && !c.icon.startsWith("https://"),
      `icon for ${c.slug} must be an identifier, not a URL`,
    );
    assert.ok(
      !c.icon.includes(":"),
      `icon for ${c.slug} must be a bare identifier, not a scheme-qualified string`,
    );
  }
});

test("slugs are unique", () => {
  const slugs = catalog.connectors.map((c) => c.slug);
  assert.equal(
    new Set(slugs).size,
    slugs.length,
    "duplicate slug detected",
  );
});

test("shell is live with builtin pair", () => {
  const shell = catalog.connectors.find((c) => c.slug === "shell");
  assert.ok(shell, "shell connector must exist");
  assert.equal(shell.status, "live", "shell is the desktop app's core, must be live");
  assert.equal(shell.pair.type, "builtin", "shell must use builtin pair");
  assert.deepStrictEqual(
    shell.pair.payload,
    {},
    "builtin pair payload must be the empty object",
  );
});

test("every coming-soon connector uses a sheet pair", () => {
  for (const c of catalog.connectors) {
    if (c.status === "coming-soon") {
      assert.equal(
        c.pair.type,
        "sheet",
        `${c.slug} is coming-soon, must use sheet pair`,
      );
      assert.equal(
        typeof c.pair.payload.message,
        "string",
        `${c.slug} sheet payload must include a message string`,
      );
    }
  }
});

const PAYLOAD_KEYS = {
  deeplink: ["url"],
  oauth: ["provider"],
  sheet: ["message"],
  builtin: [],
};

test("every pair.payload matches its pair.type contract", () => {
  for (const c of catalog.connectors) {
    const { type, payload } = c.pair;
    const allowed = PAYLOAD_KEYS[type];
    assert.ok(allowed, `${c.slug} has unknown pair.type ${type}`);
    assert.deepStrictEqual(
      Object.keys(payload).sort(),
      [...allowed].sort(),
      `${c.slug} ${type} payload keys must be exactly ${JSON.stringify(allowed)}`,
    );
    for (const k of allowed) {
      assert.equal(typeof payload[k], "string", `${c.slug} ${type}.${k} must be string`);
      assert.ok(payload[k].length > 0, `${c.slug} ${type}.${k} must be non-empty`);
    }
  }
});

test("status and pair.type are coupled correctly", () => {
  for (const c of catalog.connectors) {
    if (c.status === "coming-soon") {
      assert.equal(c.pair.type, "sheet", `${c.slug} coming-soon must use sheet pair`);
    }
    if (c.status === "live") {
      assert.notEqual(c.pair.type, "sheet", `${c.slug} live must not use sheet pair`);
    }
  }
});
