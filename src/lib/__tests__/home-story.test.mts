// The home page must embed the founder story (film + text) in a section with
// the anchor the hero links to, and that text must come from the ONE shared
// component the story page also renders. Static check, no Next runtime.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SRC = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p: string) => readFileSync(join(SRC, p), "utf8");

test("home page renders the Why I built Owlka section after the hero", () => {
  const page = read("app/page.tsx");
  assert.match(page, /<WhyIBuiltOwlka \/>/);
  assert.ok(page.indexOf("<Hero />") < page.indexOf("<WhyIBuiltOwlka />"));
});

test("section has the anchor, the film and the shared story text", () => {
  const sec = read("components/WhyIBuiltOwlka.tsx");
  assert.match(sec, /id="why-i-built-owlka"/);
  assert.match(sec, /Why I built Owlka/);
  assert.match(sec, /<PortraitVideoFigure/);
  assert.match(sec, /STORY_SOLD_OUT_PASS/);
  assert.match(sec, /<SoldOutPassStory/);
});

test("story page and home page share one story component; words live only there", () => {
  const storyPage = read("app/stories/the-sold-out-pass/page.tsx");
  assert.match(storyPage, /<SoldOutPassStory/);
  const shared = read("components/SoldOutPassStory.tsx");
  assert.match(shared, /Thirty-one minutes from asking to booked/);
  assert.doesNotMatch(storyPage, /Thirty-one minutes/);
  assert.doesNotMatch(read("components/WhyIBuiltOwlka.tsx"), /Thirty-one minutes/);
});

test("hero links down to the section, not away to the story page", () => {
  const hero = read("components/Hero.tsx");
  assert.match(hero, /href="#why-i-built-owlka"/);
  assert.doesNotMatch(hero, /href="\/stories\/the-sold-out-pass"/);
});
