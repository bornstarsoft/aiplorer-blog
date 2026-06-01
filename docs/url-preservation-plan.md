# Aiplorer URL Preservation Plan

Date: 2026-06-01

This document defines the safe URL handling policy for the Aiplorer service
revamp. It is intentionally conservative: Phase 0 does not delete, redirect,
draft, or noindex any existing public URL.

## Current URL Patterns

Current Hugo structure:

- Content directory: `content/posts/`
- Section: `posts`
- All current posts have a `slug` front matter value.

Primary post URL assumption:

```txt
https://aiplorer.com/posts/<slug>/
```

Examples:

- `/posts/ai-investment-explosive-growth-2025/`
- `/posts/essential-ai-tools-for-business/`
- `/posts/how-to-use-chatgpt-as-your-study-partner-in-university/`
- `/posts/surprising-ai-tools-corporate-landscape/`

Other likely Hugo-generated URLs:

- `/`
- `/posts/`
- `/tags/`
- `/tags/<tag>/`
- `/index.xml`
- `/posts/index.xml`
- `/tags/index.xml`
- `/sitemap.xml`
- `/robots.txt`

## Existing Post URL Assumptions

Because all 160 posts currently have explicit slugs, the filename should not be
the public URL key unless a slug is removed later.

Default assumption:

```txt
content/posts/example.md
slug: example-slug
```

maps to:

```txt
/posts/example-slug/
```

If a future post lacks a slug, Hugo may fall back to the filename-based path.
Avoid changing existing slugs unless a redirect plan is already prepared.

## Known URL Risks

Duplicate slug collisions currently exist:

- `/posts/the-benefits-of-brain-training-through-mobile-games/`
  - `content/posts/2025-08-10-ai-212051.md`
  - `content/posts/2025-08-24-ai-201918.md`
- `/posts/the-power-of-brain-training-through-mobile-games/`
  - `content/posts/2025-08-03-ai-215019.md`
  - `content/posts/2025-08-16-ai-211803.md`

These should not be fixed blindly. First check build behavior, live indexed URL
state, Search Console impressions/clicks, and backlinks. Then choose one
canonical destination and redirect or merge only in a later phase.

## URLs Not To Delete Without Search Console Data

Do not delete, redirect, noindex, or draft these URL groups until Google Search
Console data has been reviewed:

- Every existing `/posts/<slug>/` URL generated from `content/posts/*.md`.
- Every currently indexed tag archive URL under `/tags/`.
- The post list page `/posts/`.
- The homepage `/`.
- Any URL with impressions, clicks, backlinks, or external references.
- Any URL that can be rewritten into a future Aiplorer Tool, Guide, or Use Case.

## Search Console Review Checklist

Before changing any old URL, collect:

- Indexed status.
- Last crawl date.
- Impressions in the last 3 and 6 months.
- Clicks in the last 3 and 6 months.
- Average position.
- Query terms.
- Referring pages or backlinks if available.
- Whether the URL appears in `sitemap.xml`.
- Whether the content can map to a new service section.

## Suggested Handling Framework

Use this framework after Search Console data is available.

| Handling | When to use | Phase 0 action |
| --- | --- | --- |
| Keep | Indexed, traffic-bearing, aligned with future AI tools/guides/use-cases positioning, or useful as evergreen blog content. | No action. |
| Rewrite | Topic is aligned but current post is thin, newsy, or auto-blog-like. | Mark as rewrite candidate only. |
| Merge later | Multiple posts cover the same intent or duplicate slugs/topics. | Mark cluster only. |
| Draft/noindex later | Low-quality, off-position, no impressions/clicks, no backlinks, and no rewrite value. | Do not apply yet. |
| Redirect later | A merged/deleted URL has a clear replacement page. | Do not apply yet. |
| 410 later | URL has no value, no replacement, no traffic, no backlinks, and should be intentionally retired. | Do not apply yet. |

## Proposed Future URL Strategy

For the service revamp, keep existing blog URLs stable while adding new
sections:

- `/ai-tools/`
- `/writing-tools/`
- `/image-tools/`
- `/video-tools/`
- `/coding-tools/`
- `/productivity-tools/`
- `/automation-tools/`
- `/learning-tools/`
- `/use-cases/`
- `/guides/`
- `/blog/`

Recommended approach:

1. Keep old `/posts/<slug>/` URLs live during the first service revamp.
2. Add new service pages without moving old posts immediately.
3. Create an inventory that maps each existing post to one of:
   `keep`, `rewrite`, `merge`, `draft/noindex`, `redirect`, or `retire`.
4. For posts rewritten as guides or use cases, either keep the old URL and
   improve the content in place, or create a new canonical page and 301 the old
   URL only after review.
5. Do not create mass redirects from all posts to broad category pages.
6. Avoid changing slugs for posts that have indexed or traffic value.

## Redirect Principles For Later Phases

Only add redirects after a URL decision is documented.

- Use 301 redirects when there is a close replacement.
- Prefer one-to-one redirects over many-to-one redirects.
- Do not redirect unrelated low-quality posts to the homepage.
- Avoid redirect chains.
- Keep a redirect map in `docs/redirect-map.md` or equivalent before applying.
- Confirm Cloudflare Pages redirect format before implementation.

## No Phase 0 URL Actions

Phase 0 should not perform any of the following:

- Delete posts.
- Rename post files.
- Remove slugs.
- Add noindex.
- Change permalink settings.
- Add redirects.
- Add 410 responses.
- Move posts from `content/posts/`.
- Replace old URLs with new service URLs.

The only Phase 0 output is audit documentation and a safer decision framework.
