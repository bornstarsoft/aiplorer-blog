# Aiplorer Current Content Audit

Date: 2026-06-01

This is a Phase 0 audit. It records the current Hugo repository state before the
service revamp. No public pages, posts, redirects, noindex rules, or theme files
were changed as part of this audit.

## Current Technical Structure

- Repository path: `/Users/seongjinkim/BornStarSoft_Publishing/github_hugo/aiplorer-blog`
- Hugo config file: `config.toml`
- Base URL: `https://aiplorer.com/`
- Language: `en-us`
- Site title: `Aiplorer`
- Theme: `ananke`
- Theme location: `themes/ananke`
- Main content section configured in params: `posts`
- Robots enabled in Hugo config: `enableRobotsTXT = true`
- Build future content: `buildFuture = false`

Current `config.toml` uses:

```toml
baseURL = "https://aiplorer.com/"
languageCode = "en-us"
title = "Aiplorer"
theme = "ananke"
paginate = 12
enableRobotsTXT = true
buildFuture = false

[params]
  description = "Aiplorer: Discover AI, apps, and useful tools—curated for builders."
  mainSections = ["posts"]
```

Important technical note: `paginate = 12` is deprecated/removed in current Hugo
and currently causes `hugo` to fail before the site can build. The safer future
replacement is `pagination.pagerSize`, but this audit phase did not change the
public site configuration.

## Current Content Directories

- Root content directory exists: `content/`
- Only current public content section found: `content/posts/`
- No root `layouts/` directory found.
- No root `partials/` directory found.
- No root `static/` directory found.
- No root `assets/` directory found.

The site currently relies on Ananke theme layouts and assets rather than
project-level layout overrides.

## Current Layouts And Partials

Project-level layout overrides are not present. Active layouts come from the
vendored Ananke theme, including:

- `themes/ananke/layouts/index.html`
- `themes/ananke/layouts/_default/baseof.html`
- `themes/ananke/layouts/_default/list.html`
- `themes/ananke/layouts/_default/single.html`
- `themes/ananke/layouts/_default/summary.html`
- `themes/ananke/layouts/_default/summary-with-image.html`
- `themes/ananke/layouts/post/list.html`
- `themes/ananke/layouts/post/summary.html`
- `themes/ananke/layouts/partials/site-header.html`
- `themes/ananke/layouts/partials/site-navigation.html`
- `themes/ananke/layouts/partials/site-footer.html`
- `themes/ananke/layouts/robots.txt`

This means Phase 1 can safely add project-level layouts later without editing
the vendored theme directly.

## Current Static Assets

Project-level static and asset directories are absent. Existing assets are from
the theme:

- Theme CSS under `themes/ananke/assets/ananke/css/`
- Theme generated CSS/dist asset under `themes/ananke/assets/ananke/dist/`
- Theme social icons under `themes/ananke/assets/ananke/socials/`
- Theme sample image under `themes/ananke/static/images/`

No custom Aiplorer brand assets were found in the project root.

## Robots And Sitemap Behavior

Visible behavior:

- `enableRobotsTXT = true` is set in `config.toml`.
- Ananke provides `themes/ananke/layouts/robots.txt`.
- In production, the theme robots template allows crawling and links to
  `sitemap.xml`.
- In non-production Hugo environments, the robots template disallows crawling.
- Hugo normally generates `sitemap.xml` automatically for regular pages.

Because `hugo` currently fails on the removed `paginate` config key, current
generated output could not be validated in this audit without changing config.

## Gitignore And Generated Output

Current repository hygiene observations:

- There is a tracked file named `gitignore`.
- There is no root `.gitignore` file.
- The tracked `gitignore` contains intended ignore rules for `/public/`,
  `/resources/`, `.DS_Store`, logs, env files, node modules, Python artifacts,
  and other temporary files.
- Because the file is named `gitignore` instead of `.gitignore`, those rules are
  not active for this repository.
- `public/` is not tracked and is not currently present.
- `resources/` is not tracked but currently exists as untracked Hugo generated
  output.
- `.hugo_build.lock` is not tracked and currently exists as an untracked Hugo
  lock file.
- `.DS_Store` is ignored by the user's global gitignore, not by a project-level
  `.gitignore`.

Recommendation for a later safe hygiene task: create or rename to a real
project-level `.gitignore`, then remove untracked generated artifacts from the
working tree after explicit approval or as a dedicated cleanup commit.

## Cloudflare Pages Build Assumptions

No Cloudflare-specific config file was found in the project root. Based on the
project plan, expected Cloudflare Pages settings are:

- Framework preset: Hugo
- Build command: `hugo`
- Build output directory: `public`
- Production branch: `main`

Current build risk: `hugo` fails until the deprecated `paginate` setting is
updated.

## Domain File Observation

The repository contains `CNAME` with:

```txt
www.bornstarai.com
```

This does not match `baseURL = "https://aiplorer.com/"`. Do not change it in
Phase 0 without confirming the current hosting setup, but treat it as a deploy
configuration risk for Phase 1.

## Current Public Content Inventory

- Existing posts under `content/posts`: 160
- Date range in front matter: 2025-05-27 to 2025-12-12
- Posts with explicit `slug`: 160
- Posts with explicit `tags`: 146
- Posts with explicit `categories`: 0
- Posts with `Original source`: 160

## Current URL Pattern

All existing posts are under `content/posts/` and all have explicit `slug`
values. Current public post URL assumption:

```txt
https://aiplorer.com/posts/<slug>/
```

Examples:

- `content/posts/2025-05-27-ai-211219.md`
  -> `https://aiplorer.com/posts/ai-investment-explosive-growth-2025/`
- `content/posts/2025-07-27-ai-200559.md`
  -> `https://aiplorer.com/posts/essential-ai-tools-for-business/`
- `content/posts/2025-09-14-ai-205014.md`
  -> `https://aiplorer.com/posts/how-to-use-chatgpt-as-your-study-partner-in-university/`
- `content/posts/2025-11-08-ai-211611.md`
  -> `https://aiplorer.com/posts/surprising-ai-tools-corporate-landscape/`

Tag taxonomy pages are also likely generated by Hugo/Ananke under `/tags/.../`
for posts with tags.

## Existing Tags

Tags are present but inconsistent. Examples include:

- `AI`
- `Generative AI`
- `AI Tools`
- `ChatGPT`
- `AI in education`
- `SEO`
- `Technology`
- `gaming`
- `brain training`
- `investment`
- `Healthcare`
- `Legal Technology`

No category taxonomy was found in front matter.

## Obvious Auto-Blog Patterns

- Filenames follow timestamp-like patterns such as
  `2025-05-27-ai-211219.md`.
- Most posts are short summaries of external sources.
- Every post includes an `Original source` blockquote.
- Content topics are broad AI/news summaries rather than structured tool,
  guide, or use-case pages.
- Publishing cadence appears automated or near-daily across a narrow period.
- Tags are broad, inconsistent, and sometimes unrelated to the future
  user-focused service positioning.
- No dedicated content model exists yet for tools, guides, use cases, pricing
  notes, official URLs, or last-reviewed metadata.

## Low-Quality Or Duplicate Risks

Duplicate slug collisions were found:

- `the-benefits-of-brain-training-through-mobile-games`
  - `content/posts/2025-08-10-ai-212051.md`
  - `content/posts/2025-08-24-ai-201918.md`
- `the-power-of-brain-training-through-mobile-games`
  - `content/posts/2025-08-03-ai-215019.md`
  - `content/posts/2025-08-16-ai-211803.md`

Duplicate or near-duplicate topic clusters exist around:

- Brain training/mobile games
- NYT Connections/Wordle puzzle hints
- AI stock/investment commentary
- Generative AI education commentary
- Generative AI copyright/legal commentary
- Enterprise generative AI adoption

Off-position content risk:

- Some posts are gaming news, stock-market commentary, puzzle hints, housing
  topics, or one-off corporate news. These may not support the future "Explore
  AI Tools for Work and Creativity" positioning unless rewritten or archived
  carefully.

Quality risk:

- Short syndicated-style summaries may be considered thin if left unchanged.
- Some source/title/topic combinations should be manually checked before any
  rewrite, merge, noindex, or deletion decision.

## Preserve Until Search Console Review

Do not delete, redirect, draft, or noindex existing posts in Phase 0. Preserve:

- All existing `/posts/<slug>/` URLs.
- All existing tag archive URLs until their indexed/traffic status is checked.
- Any post that has impressions, clicks, backlinks, or indexed status in Google
  Search Console.
- Any post that can be rewritten into a future Tool, Guide, or Use Case page.

Search Console and live index data should determine final handling.
