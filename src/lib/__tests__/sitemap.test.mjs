// Sitemap smoke test. Runs under Node's built-in test runner:
//
//   node --test src/lib/__tests__/sitemap.test.mjs
//
// Why this exists: on 2026-07-25 the sitemap advertised /pricing to search
// engines and /pricing returned 404 on owlka.com, while /download (the page
// the whole site funnels toward) and /status were absent. Nothing caught it,
// because nothing checked. A route list that can drift from the filesystem is
// a detector-shaped problem, so this asserts the invariant rather than fixing
// the one instance: every route the sitemap advertises must have a real page
// on disk, and the pages that matter most must be advertised.
//
// This is a static check. It reads the JSON source of truth and the app
// directory; it makes no network calls and needs no Next.js runtime.

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "..", "..");
const APP_DIR = join(SRC, "app");
const ROUTES_PATH = join(SRC, "lib", "site-routes.json");

const { routes } = JSON.parse(readFileSync(ROUTES_PATH, "utf8"));

// Pages the site cannot afford to leave out of the sitemap. /download is the
// conversion page; the legal pages are the ones people search for by name.
const REQUIRED_ROUTES = [
  "/download",
  "/privacy",
  "/terms",
  "/security",
  "/support",
];

/** Every directory under src/app that contains a page.tsx, as a route path. */
function pageRoutesOnDisk() {
  const found = new Set();
  const walk = (dir, prefix) => {
    for (const entry of readdirSync(dir)) {
      // Route groups "(x)", private folders "_x" and the api tree are not
      // pages the sitemap could ever point at.
      if (entry.startsWith("_") || entry === "api") continue;
      const full = join(dir, entry);
      if (!statSync(full).isDirectory()) continue;
      // Dynamic segments cannot be verified statically; skip them.
      if (entry.startsWith("[")) continue;
      const route = `${prefix}/${entry}`;
      if (existsSync(join(full, "page.tsx")) || existsSync(join(full, "page.ts"))) {
        found.add(route);
      }
      walk(full, route);
    }
  };
  walk(APP_DIR, "");
  return found;
}

test("routes list is non-empty, absolute and free of duplicates", () => {
  assert.ok(Array.isArray(routes), "routes must be an array");
  assert.ok(routes.length > 0, "routes must not be empty");
  for (const route of routes) {
    assert.equal(typeof route, "string", `route ${route} must be a string`);
    assert.ok(route.startsWith("/"), `route ${route} must start with /`);
    assert.ok(!route.endsWith("/"), `route ${route} must not end with /`);
    assert.ok(
      !route.includes("//"),
      `route ${route} must not contain a double slash`,
    );
  }
  assert.equal(
    new Set(routes).size,
    routes.length,
    "routes must not contain duplicates",
  );
  assert.ok(
    !routes.includes("/"),
    "'/' is emitted separately with priority 1.0; do not list it here",
  );
});

test("every advertised route resolves to a page on disk", () => {
  const onDisk = pageRoutesOnDisk();
  const missing = routes.filter((route) => !onDisk.has(route));
  assert.deepEqual(
    missing,
    [],
    `sitemap advertises route(s) with no src/app/<route>/page.tsx: ${missing.join(", ")}. ` +
      `A sitemap entry that 404s is a page we told Google exists and cannot serve.`,
  );
});

test("the pages that convert and the legal pages are advertised", () => {
  const missing = REQUIRED_ROUTES.filter((route) => !routes.includes(route));
  assert.deepEqual(
    missing,
    [],
    `sitemap is missing route(s) that must always be discoverable: ${missing.join(", ")}`,
  );
});

test("/pricing is not advertised while it does not exist", () => {
  const onDisk = pageRoutesOnDisk();
  if (!onDisk.has("/pricing")) {
    assert.ok(
      !routes.includes("/pricing"),
      "/pricing has no page on disk and 404s live; it must not be in the sitemap",
    );
  }
});
