#!/usr/bin/env node
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";

const root = new URL("../", import.meta.url);
const publicRoot = new URL("public/", root);
const data = JSON.parse(readFileSync(new URL("data/editorial_visuals.json", root), "utf8"));
const htmlAt = (path) => readFileSync(new URL(`${path.slice(1)}index.html`, publicRoot), "utf8");

// Hugo minification may remove attribute quotes; accept both serializations.
function attributes(html, name) {
  return [...html.matchAll(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "g"))]
    .map((match) => match[1] ?? match[2] ?? match[3]);
}

const topics = Object.keys(data.topics);
assert.equal(topics.length, 8);
assert.equal(Object.keys(data.pages).length, 15);
for (const topic of topics) {
  assert(data.topics[topic].alt.startsWith("Illustration of"), `Missing descriptive alt: ${topic}`);
  const image = readFileSync(new URL(`assets/images/editorial/${topic}.png`, root));
  assert.equal(image.toString("ascii", 1, 4), "PNG");
  assert.equal(image.readUInt32BE(16) / image.readUInt32BE(20), 1.5, `${topic}: expected 3:2 source`);
}

for (const [path, topic] of Object.entries(data.pages)) {
  assert(topics.includes(topic), `Unknown topic: ${topic}`);
  const html = htmlAt(path);
  assert.deepEqual(attributes(html, "data-editorial-topic"), [topic], `Missing article image: ${path}`);
  const imageTag = html.match(/<img\b[^>]*data-editorial-topic[^>]*>/)?.[0];
  assert.equal(attributes(imageTag, "loading")[0], "lazy");
  assert.equal(attributes(imageTag, "decoding")[0], "async");
  assert(attributes(imageTag, "width")[0] && attributes(imageTag, "height")[0]);
  assert(attributes(imageTag, "alt")[0].length > 0);
  const variants = attributes(imageTag, "srcset")[0].split(",").map((entry) => entry.trim().split(/\s+/));
  assert.deepEqual(variants.map((entry) => entry[1]), ["240w", "480w", "800w"]);
  for (const [url] of variants) assert(existsSync(new URL(url.slice(1), publicRoot)), `Missing image: ${url}`);
}

const home = htmlAt("/");
assert.deepEqual(attributes(home, "data-editorial-topic"), data.home.map((entry) => data.pages[entry.path]));
assert(home.indexOf("task-guides-heading") < home.indexOf("aiplorer-explorer__layout"), "Task guides must precede directory results");
for (const entry of data.home) assert(home.includes(entry.path), `Missing home guide link: ${entry.path}`);

for (const section of ["guides", "use-cases"]) {
  const expected = Object.entries(data.pages).filter(([path]) => path.startsWith(`/${section}/`)).map(([, topic]) => topic);
  assert.deepEqual(attributes(htmlAt(`/${section}/`), "data-editorial-topic").sort(), expected.sort());
}

const generated = readdirSync(new URL("images/editorial/", publicRoot));
assert.equal(generated.length, topics.length * 3, "Expected only three responsive variants per topic");
let total = 0;
for (const filename of generated) {
  assert(filename.endsWith(".webp"), `Original must not ship to public: ${filename}`);
  const bytes = statSync(new URL(`images/editorial/${filename}`, publicRoot)).size;
  assert(bytes < 100_000, `Image exceeds 100 KB budget: ${filename}`);
  total += bytes;
}

const sitemap = readFileSync(new URL("sitemap.xml", publicRoot), "utf8");
for (const draft of ["clipdrop", "example-ai-assistant", "julius-ai", "obviously-ai", "polymer", "rows", "scispace", "tome"]) {
  const path = `ai-tools/tools/${draft}/`;
  assert(!existsSync(new URL(`${path}index.html`, publicRoot)), `Draft exposed: ${draft}`);
  assert(!sitemap.includes(`/${path}`), `Draft in sitemap: ${draft}`);
}

console.log(`PASS: ${topics.length} original images, ${generated.length} WebP variants (${Math.round(total / 1024)} KB total), 15 illustrated articles, 3 home task links, and 8 excluded drafts.`);
