#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../public/", import.meta.url);
const read = path => readFileSync(new URL(path, root), "utf8");
const [home, landing, index, category, compare, shortlist, sitemap] = [
  "index.html", "ai-tools/index.html", "ai-tools/tools/index.html",
  "ai-tools/coding-tools/index.html", "ai-tools/compare/index.html",
  "ai-tools/shortlist/index.html", "sitemap.xml",
].map(read);
const attr = (tag, name) => {
  const match = tag.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`));
  return match && (match[1] ?? match[2] ?? match[3]);
};
const anchors = html => [...html.matchAll(/<a\b[^>]*>/g)].map(([tag]) => tag);
const cards = html => [...html.matchAll(/<article\b[^>]*\bdata-tool-card\b[^>]*>/g)].map(([tag]) => tag);
assert(anchors(landing).some(tag => attr(tag, "href") === "/ai-tools/coding-tools/"));
const tools = [
  {
    slug: "lovable", official: "https://lovable.dev/",
    sources: ["https://docs.lovable.dev/introduction/welcome", "https://lovable.dev/pricing", "https://lovable.dev/privacy/"],
  },
  {
    slug: "vercel-v0", official: "https://v0.app/",
    sources: ["https://v0.app/docs", "https://v0.app/pricing", "https://v0.app/policy", "https://vercel.com/docs/pricing"],
  },
];

for (const { slug, official, sources } of tools) {
  const path = `/ai-tools/tools/${slug}/`;
  for (const listing of [home, index]) {
    const matches = cards(listing).filter(tag => attr(tag, "data-tool-path") === path);
    assert.equal(matches.length, 1, path + " should have one directory card");
    assert.equal(attr(matches[0], "data-tool-category"), "Coding Tools");
    assert.match(attr(matches[0], "data-tool-search"), /ai web app builder/);
  }
  assert(anchors(category).some(tag => attr(tag, "href") === path));
  assert([...compare.matchAll(/<article\b[^>]*>/g)].some(([tag]) => attr(tag, "data-compare-path") === path));
  assert([...shortlist.matchAll(/<[^>]+\bdata-shortlist-item=[^>]+>/g)].some(([tag]) => attr(tag, "data-shortlist-item") === path));
  const detail = read(path.slice(1) + "index.html");
  const canonical = [...detail.matchAll(/<link\b[^>]*>/g)].map(([tag]) => tag).find(tag => attr(tag, "rel") === "canonical");
  assert(canonical);
  assert.equal(attr(canonical, "href"), "https://aiplorer.com" + path);
  const links = anchors(detail).map(tag => attr(tag, "href"));
  for (const href of [official, ...sources, "/use-cases/check-an-ai-test-plan-against-acceptance-criteria/"]) {
    assert(links.includes(href), `${path} is missing ${href}`);
  }
  assert.equal(sitemap.split(`<loc>https://aiplorer.com${path}</loc>`).length, 2);
}

console.log("PASS: Lovable and v0 are reviewed Coding Tools with sources, practice, shortlist, comparison, and canonical routes.");
