#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../public/", import.meta.url);
const read = path => readFileSync(new URL(path, root), "utf8");
const attributes = (html, name) => [...html.matchAll(
  new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "g")
)].map(([, double, single, bare]) => double ?? single ?? bare);
const listings = [read("index.html"), read("ai-tools/tools/index.html")];
const category = read("ai-tools/image-tools/index.html");
const shortlist = read("ai-tools/shortlist/index.html");
const compare = read("ai-tools/compare/index.html");
const sitemap = read("sitemap.xml");

for (const [slug, alias, links] of [
  ["krea", "크레아", [
    "https://www.krea.ai/", "https://www.krea.ai/pricing", "https://www.krea.ai/terms", "https://www.krea.ai/privacy",
    "https://www.krea.ai/enterprise/academy/intro-to-krea",
    "/use-cases/check-an-ai-image-edit-against-a-brief/",
  ]],
  ["recraft", "리크래프트", [
    "https://www.recraft.ai/", "https://www.recraft.ai/pricing", "https://www.recraft.ai/legal/terms", "https://www.recraft.ai/legal/privacy",
    "https://www.recraft.ai/ai-vector-generator", "https://www.recraft.ai/blog/vector-editor",
    "/use-cases/check-an-ai-export-plan-against-delivery-requirements/",
  ]],
]) {
  const path = `/ai-tools/tools/${slug}/`;
  for (const listing of listings) {
    const cards = [...listing.matchAll(/<article\b[^>]*\bdata-tool-path\b[^>]*>/g)]
      .map(([tag]) => tag).filter(tag => attributes(tag, "data-tool-path")[0] === path);
    assert.equal(cards.length, 1);
    assert.deepEqual(attributes(cards[0], "data-tool-category"), ["Image Tools"]);
    assert(attributes(cards[0], "data-tool-search")[0].includes(alias));
  }
  assert(attributes(category, "href").includes(path));
  assert(attributes(compare, "data-compare-path").includes(path));
  assert(attributes(shortlist, "data-shortlist-item").includes(path));
  const detail = read(path.slice(1) + "index.html");
  const canonical = [...detail.matchAll(/<link\b[^>]*>/g)]
    .map(([tag]) => tag).find(tag => attributes(tag, "rel")[0] === "canonical");
  assert(canonical && attributes(canonical, "href").includes("https://aiplorer.com" + path));
  for (const href of links) assert(attributes(detail, "href").includes(href), `${slug} missing ${href}`);
  assert(attributes(detail, "datetime").includes("2026-11-19"));
  assert.equal(sitemap.split(`<loc>https://aiplorer.com${path}</loc>`).length, 2);
}
console.log("PASS: reviewed Krea and Recraft pages, Image Tools discovery, Korean aliases, sources, practice, saved comparison, and canonical routes.");
