#!/usr/bin/env node
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const root = new URL("../public/", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const attributes = (html, name) => [...html.matchAll(
  new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "g")
)].map((match) => match[1] ?? match[2] ?? match[3]);
const local = ["ollama", "lm-studio", "jan", "gpt4all", "llama-cpp", "open-webui"];
const video = ["seedance", "kling-ai", "heygen", "google-veo"];
const sitemap = read("sitemap.xml");
const home = read("index.html");
const index = read("ai-tools/tools/index.html");
const hub = read("ai-tools/index.html");
const comparison = read("ai-tools/compare/index.html");
const categoryPath = "/ai-tools/local-llm-tools/";

assert(attributes(hub, "href").includes(categoryPath), "Category hub must link to local LLM tools");
assert(sitemap.includes(`https://aiplorer.com${categoryPath}</loc>`), "Category missing from sitemap");
assert(home.includes("Local LLM Tools") && index.includes("Local LLM Tools"), "Category filter missing");

for (const [slugs, category, categorySlug] of [
  [local, "Local LLM Tools", "local-llm-tools"], [video, "Video Tools", "video-tools"]
]) {
  const categoryHTML = read(`ai-tools/${categorySlug}/index.html`);
  for (const slug of slugs) {
    const path = `/ai-tools/tools/${slug}/`;
    const tool = read(`${path.slice(1)}index.html`);
    for (const [name, html] of [["home", home], ["index", index]]) {
      assert.equal(attributes(html, "data-tool-path").filter((p) => p === path).length, 1,
        `${slug} must appear exactly once in ${name}`);
      const card = html.match(new RegExp(`<article\\b[^>]*data-tool-path=(?:"${path}"|'${path}'|${path}(?=[\\s>]))[^>]*>`))?.[0];
      assert(card && attributes(card, "data-tool-category").includes(category), `${slug} wrong group`);
    }
    assert(attributes(categoryHTML, "href").includes(path), `${slug} missing from category`);
    assert(attributes(comparison, "href").includes(path), `${slug} missing from comparison`);
    assert(attributes(tool, "data-recent-category").includes(category), `${slug} wrong detail category`);
    assert(sitemap.includes(`https://aiplorer.com${path}</loc>`), `${slug} missing from sitemap`);
    assert(tool.includes("2026-10-03"), `${slug} review date missing`);
    const canonical = tool.match(/<link\b[^>]*rel=(?:"canonical"|'canonical'|canonical(?=[\s>]))[^>]*>/)?.[0];
    assert(canonical && attributes(canonical, "href").includes(`https://aiplorer.com${path}`),
      `${slug} must retain its apex canonical`);
  }
}

for (const alias of ["시댄스", "씨댄스", "클링"]) {
  assert(attributes(index, "data-tool-search").some((text) => text.includes(alias)), `Missing alias ${alias}`);
}
for (const slug of ["clipdrop", "example-ai-assistant", "julius-ai", "obviously-ai", "polymer", "rows", "scispace", "tome"]) {
  const path = `/ai-tools/tools/${slug}/`;
  assert(!existsSync(new URL(`${path.slice(1)}index.html`, root)), `Draft output exposed: ${slug}`);
  for (const html of [sitemap, home, index, hub, comparison]) {
    assert(!html.includes(path), `Draft linked publicly: ${slug}`);
  }
}
console.log("PASS: ten reviewed additions, category discovery, Korean aliases, sitemap, and eight draft exclusions.");
