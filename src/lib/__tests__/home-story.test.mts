// The founder story must be embedded IN the hero (film + shared text, opening
// in place), where the old "why I built Owlka" link used to sit, and must not
// be duplicated as a separate section. Static check, no Next runtime.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SRC = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p: string) => readFileSync(join(SRC, p), "utf8");

test("hero renders the story between the intro text and the download buttons", () => {
  const hero = read("components/Hero.tsx");
  const story = hero.indexOf("<HeroStory />");
  assert.ok(story > 0);
  assert.ok(hero.indexOf("Wrapped in memory") < story);
  assert.ok(story < hero.indexOf('href="/download"'));
  assert.ok(story < hero.indexOf("<PromoVideo"));
  assert.doesNotMatch(hero, /href="\/stories\/the-sold-out-pass"/);
});

test("story block has the anchor, the film, the shared text and an in-place expander", () => {
  const s = read("components/HeroStory.tsx");
  assert.match(s, /id="why-i-built-owlka"/);
  assert.match(s, /Why I built Owlka/);
  assert.match(s, /<PortraitVideoFigure/);
  assert.match(s, /STORY_SOLD_OUT_PASS/);
  assert.match(s, /<SoldOutPassStory/);
  assert.match(s, /aria-expanded/);
  assert.match(s, /Read the full story/);
  assert.doesNotMatch(s, /<Link|href=/);
});

test("no separate section further down the home page", () => {
  assert.doesNotMatch(read("app/page.tsx"), /WhyIBuiltOwlka/);
});

test("story page and hero share one story component; words live only there", () => {
  assert.match(read("app/stories/the-sold-out-pass/page.tsx"), /<SoldOutPassStory/);
  assert.match(read("components/SoldOutPassStory.tsx"), /Thirty-one minutes from asking to booked/);
  assert.doesNotMatch(read("components/HeroStory.tsx"), /Thirty-one minutes/);
});
