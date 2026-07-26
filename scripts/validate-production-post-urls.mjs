#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];

    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (character !== "\r") {
      field += character;
    }
  }

  if (quoted) {
    throw new Error("Invalid CSV: unterminated quoted field.");
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((fields) =>
    fields.some((value) => value.trim().length > 0)
  );
}

function parsePublishedPages(csv) {
  const [headers, ...records] = parseCsv(csv);
  if (!headers) {
    throw new Error("Hugo returned no published content rows.");
  }

  const required = ["path", "title", "permalink", "kind", "section"];
  for (const field of required) {
    if (!headers.includes(field)) {
      throw new Error(`Hugo CSV is missing the "${field}" column.`);
    }
  }

  return records.map((record) =>
    Object.fromEntries(headers.map((header, index) => [header, record[index] ?? ""]))
  );
}

function productionPostCollisions(pages) {
  const postPages = pages.filter(
    (page) => page.section === "posts" && page.kind === "page"
  );
  const byOutputPath = new Map();

  for (const page of postPages) {
    if (!page.permalink) {
      throw new Error(`Published post has no permalink: ${page.path}`);
    }

    const outputPath = new URL(page.permalink).pathname;
    const owners = byOutputPath.get(outputPath) ?? [];
    owners.push(page);
    byOutputPath.set(outputPath, owners);
  }

  return {
    postPages,
    collisions: [...byOutputPath.entries()]
      .filter(([, owners]) => owners.length > 1)
      .sort(([left], [right]) => left.localeCompare(right)),
  };
}

function validate(csv) {
  const pages = parsePublishedPages(csv);
  const { postPages, collisions } = productionPostCollisions(pages);

  if (postPages.length === 0) {
    throw new Error("No published post pages were found.");
  }

  if (collisions.length > 0) {
    console.error(
      `Duplicate production post URLs detected (${collisions.length}):`
    );
    for (const [outputPath, owners] of collisions) {
      console.error(`\n${outputPath}`);
      for (const owner of owners) {
        console.error(`  - ${owner.path} (${owner.title})`);
      }
    }
    return false;
  }

  console.log(
    `PASS: ${postPages.length} published post sources resolve to ` +
      `${postPages.length} unique URLs.`
  );
  return true;
}

function runSelfTest() {
  const uniqueCsv = [
    "path,slug,title,date,expiryDate,publishDate,draft,permalink,kind,section",
    'content/posts/one.md,one,"Title, One",,,,false,https://example.com/posts/one/,page,posts',
    "content/posts/two.md,two,Title Two,,,,false,https://example.com/posts/two/,page,posts",
  ].join("\n");
  const duplicateCsv = [
    "path,slug,title,date,expiryDate,publishDate,draft,permalink,kind,section",
    "content/posts/old.md,same,Old,,,,false,https://example.com/posts/same/,page,posts",
    "content/posts/new.md,same,New,,,,false,https://example.com/posts/same/,page,posts",
  ].join("\n");

  const unique = productionPostCollisions(parsePublishedPages(uniqueCsv));
  const duplicate = productionPostCollisions(parsePublishedPages(duplicateCsv));

  if (
    unique.postPages.length !== 2 ||
    unique.collisions.length !== 0 ||
    duplicate.collisions.length !== 1 ||
    duplicate.collisions[0][1].length !== 2
  ) {
    throw new Error("Self-test failed.");
  }

  console.log("PASS: duplicate URL validator self-test.");
}

const args = process.argv.slice(2);

try {
  if (args.length === 1 && args[0] === "--self-test") {
    runSelfTest();
    process.exit(0);
  }

  let csv;
  if (args.length === 2 && args[0] === "--input") {
    csv = readFileSync(resolve(process.cwd(), args[1]), "utf8");
  } else if (args.length === 0) {
    const result = spawnSync("hugo", ["list", "published"], {
      cwd: repoRoot,
      encoding: "utf8",
    });

    if (result.error) {
      throw result.error;
    }
    if (result.status !== 0) {
      process.stderr.write(result.stderr);
      process.exit(result.status ?? 1);
    }
    csv = result.stdout;
  } else {
    console.error(
      "Usage: node scripts/validate-production-post-urls.mjs " +
        "[--self-test | --input <hugo-csv>]"
    );
    process.exit(2);
  }

  process.exit(validate(csv) ? 0 : 1);
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
}
