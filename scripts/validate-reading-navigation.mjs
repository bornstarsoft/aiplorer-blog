#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const output = new URL("public/", root);
const paths = Object.keys(JSON.parse(readFileSync(new URL("data/editorial_visuals.json", root), "utf8")).pages);
const readPage = (path) => readFileSync(new URL(`${path.slice(1)}index.html`, output), "utf8");

// Accept quoted and unquoted attributes in Hugo's minified output.
function values(html, attribute) {
  const pattern = new RegExp(`\\b${attribute}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "g");
  return [...html.matchAll(pattern)].map((match) => match[1] ?? match[2] ?? match[3]);
}

const categories = new Map();
for (const [tag] of readPage("/ai-tools/tools/").matchAll(/<article\b[^>]*>/g)) {
  const path = values(tag, "data-tool-path")[0];
  if (path) categories.set(path, values(tag, "data-tool-category")[0]);
}

let categoryComparisons = 0;
for (const path of paths) {
  const html = readPage(path);
  const disclosures = [...html.matchAll(/<details\b[^>]*>[\s\S]*?<\/details>/g)].map(([tag]) => tag);
  const contents = disclosures.find((tag) => values(tag, "class").includes("aiplorer-reader-contents"));
  const notes = disclosures.find((tag) => values(tag, "class").includes("aiplorer-reader-note"));
  assert(contents, `Missing contents disclosure: ${path}`);
  assert(notes, `Missing audience/caution disclosure: ${path}`);
  assert(html.indexOf(contents) < html.indexOf("aiplorer-content-article__body"), `Contents must precede article: ${path}`);
  assert(notes.includes("remove sensitive information") && notes.includes("Review AI output"), `Review cautions were lost: ${path}`);
  assert(!/^<details\b[^>]*\bopen\b/.test(contents), `Contents should start collapsed: ${path}`);

  const ids = values(html, "id");
  assert.equal(ids.length, new Set(ids).size, `Duplicate HTML ids: ${path}`);
  assert.equal(ids.filter((id) => id === "TableOfContents").length, 1, `Use one contents navigation: ${path}`);
  const headings = [...html.matchAll(/<h[2-6]\b[^>]*>/g)].flatMap(([tag]) => values(tag, "id"));
  const links = values(contents, "href");
  assert(links.length > 0, `Empty contents: ${path}`);
  for (const href of links) {
    assert(href.startsWith("#"), `Contents must use local anchors: ${path}`);
    assert(headings.includes(decodeURIComponent(href.slice(1))), `Broken heading anchor ${href}: ${path}`);
  }
  assert(/data-reading-time[^>]*>About [1-9]\d* min</.test(html), `Missing reading-time estimate: ${path}`);
  assert(html.includes("#content-related-tools"), `Missing related-tools shortcut: ${path}`);

  const related = [...html.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)]
    .map(([tag]) => tag).find((tag) => values(tag, "aria-labelledby").includes("content-related-tools"));
  assert(related, `Related tool section is missing: ${path}`);
  const toolPaths = [...new Set(values(related, "href").filter((href) => /^\/ai-tools\/tools\/[^/]+\/$/.test(href)))];
  assert(toolPaths.length > 0 && toolPaths.length <= 3, `Unexpected related tool count: ${path}`);
  for (const tool of toolPaths) assert(categories.has(tool), `Unreviewed related tool ${tool}: ${path}`);
  const toolCategories = new Set(toolPaths.map((tool) => categories.get(tool)));
  const compareTag = related.match(/<a\b[^>]*\bdata-article-compare\b[^>]*>/)?.[0];
  assert(compareTag, `Missing comparison handoff: ${path}`);
  const compare = new URL(values(compareTag, "href")[0], "https://aiplorer.com");
  assert.equal(compare.pathname, "/ai-tools/compare/");
  assert.equal(compare.hash, "#compare-categories");
  if (toolCategories.size === 1) {
    assert.equal(compare.searchParams.get("category"), [...toolCategories][0], `Wrong comparison category: ${path}`);
    categoryComparisons += 1;
  } else {
    assert.equal(compare.searchParams.get("category"), null, `Mixed-category tools must not be hidden: ${path}`);
  }
}

for (const section of ["guides", "use-cases"]) {
  const count = paths.filter((path) => path.startsWith(`/${section}/`)).length;
  assert.equal(values(readPage(`/${section}/`), "class").filter((name) => name === "aiplorer-card__reading-time").length, count);
}

console.log(`PASS: ${paths.length} articles have an early contents menu, valid anchors, reading estimates, preserved review notes, and reviewed-tool shortcuts; ${categoryComparisons} comparison links retain category context.`);
