// Visitor OS detection, tested against real user-agent strings. Runs under
// Node's built-in test runner (Node 22.6+ strips the TypeScript types):
//
//   node --test src/lib/__tests__/os.test.mts
//
// Why this file exists rather than a one-line fix: the bug it pins was not "a
// regex was wrong", it was "nobody could see that iPhone Safari claims to be a
// Mac". Every user-agent string below was copied from a real browser. A future
// edit to the detection order breaks a named device here, not a customer.
//
// The regression under test: iPhone Safari's user agent contains the literal
// text "like Mac OS X", and iPadOS in desktop mode is byte-for-byte a Mac user
// agent with navigator.platform === "MacIntel". Both used to resolve to "mac",
// so /download told phone and tablet visitors that a 35 MB Mac disk image was
// "recommended for your Mac".

import { test } from "node:test";
import assert from "node:assert/strict";
import { detectOSFrom, isMobileOS } from "../os.ts";

const CASES: {
  name: string;
  ua: string;
  platform: string;
  touch: number;
  expected: ReturnType<typeof detectOSFrom>;
}[] = [
  {
    name: "iPhone Safari (contains 'like Mac OS X')",
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1",
    platform: "iPhone",
    touch: 5,
    expected: "ios",
  },
  {
    name: "iPhone Chrome",
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/126.0.6478.108 Mobile/15E148 Safari/604.1",
    platform: "iPhone",
    touch: 5,
    expected: "ios",
  },
  {
    name: "iPad in mobile mode",
    ua: "Mozilla/5.0 (iPad; CPU OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1",
    platform: "iPad",
    touch: 5,
    expected: "ios",
  },
  {
    name: "iPadOS in desktop mode (identical UA to a Mac, MacIntel platform)",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15",
    platform: "MacIntel",
    touch: 5,
    expected: "ios",
  },
  {
    name: "iPod touch",
    ua: "Mozilla/5.0 (iPod touch; CPU iPhone OS 15_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1",
    platform: "iPod touch",
    touch: 5,
    expected: "ios",
  },
  {
    name: "Apple Silicon Mac, Safari",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15",
    platform: "MacIntel",
    touch: 0,
    expected: "mac",
  },
  {
    name: "Mac, Chrome",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    platform: "MacIntel",
    touch: 0,
    expected: "mac",
  },
  {
    name: "Mac, Firefox",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:127.0) Gecko/20100101 Firefox/127.0",
    platform: "MacIntel",
    touch: 0,
    expected: "mac",
  },
  {
    name: "Windows 11, Chrome",
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    platform: "Win32",
    touch: 0,
    expected: "windows",
  },
  {
    name: "Windows 11 touchscreen laptop, Edge",
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
    platform: "Win32",
    touch: 10,
    expected: "windows",
  },
  {
    name: "Android phone, Chrome",
    ua: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
    platform: "Linux armv8l",
    touch: 5,
    expected: "android",
  },
  {
    name: "Android tablet, Chrome",
    ua: "Mozilla/5.0 (Linux; Android 13; SM-X710) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    platform: "Linux aarch64",
    touch: 5,
    expected: "android",
  },
  {
    name: "Linux desktop, Firefox",
    ua: "Mozilla/5.0 (X11; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0",
    platform: "Linux x86_64",
    touch: 0,
    expected: "linux",
  },
  {
    name: "ChromeOS",
    ua: "Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    platform: "Linux x86_64",
    touch: 0,
    expected: "linux",
  },
  {
    name: "Googlebot, no platform, no touch",
    ua: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    platform: "",
    touch: 0,
    expected: null,
  },
  {
    name: "empty everything (server render, scripted client)",
    ua: "",
    platform: "",
    touch: 0,
    expected: null,
  },
];

for (const c of CASES) {
  test(`detects ${c.expected} for ${c.name}`, () => {
    assert.equal(detectOSFrom(c.ua, c.platform, c.touch), c.expected);
  });
}

test("no Apple mobile device is ever reported as a Mac", () => {
  const appleMobile = CASES.filter((c) => c.expected === "ios");
  assert.ok(appleMobile.length >= 4, "keep real iOS user agents in the table");
  for (const c of appleMobile) {
    const got = detectOSFrom(c.ua, c.platform, c.touch);
    assert.notEqual(
      got,
      "mac",
      `${c.name} resolved to "mac"; that is the bug that offered iPhone visitors a Mac disk image`,
    );
  }
});

test("no desktop is ever reported as mobile", () => {
  for (const c of CASES.filter(
    (c) => c.expected === "mac" || c.expected === "windows" || c.expected === "linux",
  )) {
    assert.equal(
      isMobileOS(detectOSFrom(c.ua, c.platform, c.touch)),
      false,
      `${c.name} was classified as a mobile device`,
    );
  }
});

test("isMobileOS covers phones and tablets only", () => {
  assert.equal(isMobileOS("ios"), true);
  assert.equal(isMobileOS("android"), true);
  assert.equal(isMobileOS("mac"), false);
  assert.equal(isMobileOS("windows"), false);
  assert.equal(isMobileOS("linux"), false);
  assert.equal(isMobileOS(null), false);
});

test("a touch-capable Mac peripheral does not flip a Mac to iOS", () => {
  // maxTouchPoints === 1 is the ambiguous case (some trackpads and drawing
  // tablets report it). The guard is > 1 precisely so this stays a Mac.
  assert.equal(
    detectOSFrom(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15",
      "MacIntel",
      1,
    ),
    "mac",
  );
});
