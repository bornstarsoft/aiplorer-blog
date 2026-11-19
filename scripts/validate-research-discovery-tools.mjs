#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../public/", import.meta.url);
const read = path => readFileSync(new URL(path, root), "utf8");
const attribute = (html, name) => [...html.matchAll(
  new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "g")
)].map(([, double, single, bare]) => double ?? single ?? bare);
const listings = [read("index.html"), read("ai-tools/tools/index.html")];
const category = read("ai-tools/learning-tools/index.html");
const shortlist = read("ai-tools/shortlist/index.html");
const compare = read("ai-tools/compare/index.html");
const sitemap = read("sitemap.xml");

for (const [slug, alias, links] of [
  ["researchrabbit", "리서치래빗", [
    "https://www.researchrabbit.ai/", "https://www.researchrabbit.ai/pricing",
    "https://learn.researchrabbit.ai/en/articles/18441080-how-to-share-a-collection-with-a-public-link",
    "/use-cases/check-an-ai-research-brief-against-its-sources/",
  ]],
  ["scite", "사이테", [
    "https://scite.ai/", "https://scite.ai/pricing", "https://scite.ai/policy",
    "https://scite.ai/blog/how-to-use-ai-for-literature-review",
    "/use-cases/check-whether-a-citation-supports-a-claim/",
  ]],
]) {
  const path = `/ai-tools/tools/${slug}/`;
  for (const listing of listings) {
    const cards = [...listing.matchAll(/<article\b[^>]*\bdata-tool-path\b[^>]*>/g)]
      .map(([tag]) => tag).filter(tag => attribute(tag, "data-tool-path")[0] === path);
    assert.equal(cards.length, 1);
    assert.deepEqual(attribute(cards[0], "data-tool-category"), ["Learning Tools"]);
    assert(attribute(cards[0], "data-tool-search")[0].includes(alias));
  }
  assert(attribute(category, "href").includes(path));
  assert(attribute(compare, "data-compare-path").includes(path));
  assert(attribute(shortlist, "data-shortlist-item").includes(path));
  const detail = read(path.slice(1) + "index.html");
  const canonical = [...detail.matchAll(/<link\b[^>]*>/g)]
    .map(([tag]) => tag).find(tag => attribute(tag, "rel")[0] === "canonical");
  assert(canonical && attribute(canonical, "href").includes("https://aiplorer.com" + path));
  for (const href of links) assert(attribute(detail, "href").includes(href), `${slug} missing ${href}`);
  assert(attribute(detail, "datetime").includes("2026-11-19"));
  assert.equal(sitemap.split(`<loc>https://aiplorer.com${path}</loc>`).length, 2);
}
console.log("PASS: reviewed research tools, Korean aliases, sources, practice, saved comparison, and canonical routes.");
