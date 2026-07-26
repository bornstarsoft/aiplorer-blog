# Aiplorer Search Console URL Inspection Queue

Date: 2026-07-26

This is a selective manual queue for the authenticated Google Search Console
`aiplorer.com` domain property. It does not record an indexing request or
authorize changing public routes, canonicals, redirects, drafts, or sitemap
settings.

Process the queue only as Search Console quota allows. Record the inspection
result before requesting indexing, and request indexing only for an intended
public URL whose rendered page, canonical, and sitemap entry are correct.
Record authenticated inspection results in
`docs/search-console-url-inspection-results.md`.

## Public Readiness Check

The public readiness checks below are not Search Console URL Inspection
results and do not report Google-selected canonicals or indexing status.

### Priority 1: Aggregate And Category Routes

The five Priority 1 routes passed a public readiness check on 2026-07-26.

| Route | HTTP | Self-canonical | Current body | Sitemap |
| --- | ---: | --- | --- | --- |
| `/ai-tools/` | 200 | Yes | Current reviewed cards present | Present |
| `/ai-tools/tools/` | 200 | Yes | Current grouped index present | Present |
| `/ai-tools/productivity-tools/` | 200 | Yes | Current reviewed cards present | Present |
| `/ai-tools/coding-tools/` | 200 | Yes | Current reviewed cards present | Present |
| `/ai-tools/automation-tools/` | 200 | Yes | Current reviewed cards present | Present |

All five responses used the apex domain with a trailing slash. Their response
headers showed `cf-cache-status: DYNAMIC`, no `Age` header, and
`cache-control: public, max-age=0, must-revalidate`. The `www` version of the
AI Tools route returned HTTP 301 to the matching apex URL.

### Priority 2: Recent Design And Creative Tools

The four newly published design and creative pages passed a public readiness
check on 2026-07-26.

| Route | HTTP | Self-canonical | Reviewed index | Category page | Sitemap |
| --- | ---: | --- | --- | --- | --- |
| `/ai-tools/tools/figma-ai/` | 200 | Yes | Present | Present | Present |
| `/ai-tools/tools/kittl/` | 200 | Yes | Present | Present | Present |
| `/ai-tools/tools/photoroom/` | 200 | Yes | Present | Present | Present |
| `/ai-tools/tools/microsoft-designer/` | 200 | Yes | Present | Present | Present |

Figma AI appeared under `Productivity Tools`. Kittl, Photoroom, and Microsoft
Designer appeared under `Image Tools`. All four responses showed
`cf-cache-status: DYNAMIC`, no `Age` header, and
`cache-control: public, max-age=0, must-revalidate`.

### Priority 3: Recent Productivity Tools

The five recent meeting and transcription pages passed a public readiness
check on 2026-07-26.

| Route | HTTP | Self-canonical | Reviewed index | Category page | Sitemap |
| --- | ---: | --- | --- | --- | --- |
| `/ai-tools/tools/otter-ai/` | 200 | Yes | Present | Present | Present |
| `/ai-tools/tools/fireflies-ai/` | 200 | Yes | Present | Present | Present |
| `/ai-tools/tools/fathom/` | 200 | Yes | Present | Present | Present |
| `/ai-tools/tools/granola/` | 200 | Yes | Present | Present | Present |
| `/ai-tools/tools/read-ai/` | 200 | Yes | Present | Present | Present |

Each rendered page identified `Productivity Tools` as its category. All five
responses showed `cf-cache-status: DYNAMIC`, no `Age` header, and
`cache-control: public, max-age=0, must-revalidate`.

### Priority 4: Coding Tools

The five Coding Tools pages passed a public readiness check on 2026-07-26.

| Route | HTTP | Self-canonical | Reviewed index | Category page | Sitemap |
| --- | ---: | --- | --- | --- | --- |
| `/ai-tools/tools/github-copilot/` | 200 | Yes | Present | Present | Present |
| `/ai-tools/tools/cursor/` | 200 | Yes | Present | Present | Present |
| `/ai-tools/tools/windsurf/` | 200 | Yes | Present | Present | Present |
| `/ai-tools/tools/replit/` | 200 | Yes | Present | Present | Present |
| `/ai-tools/tools/tabnine/` | 200 | Yes | Present | Present | Present |

Each rendered page identified `Coding Tools` as its category. The Windsurf
page retained its existing canonical route and identified Devin Desktop as the
current product name. All five responses showed
`cf-cache-status: DYNAMIC`, no `Age` header, and
`cache-control: public, max-age=0, must-revalidate`.

### Priority 5: Transition And Canonical Samples

The transition and canonical sample routes passed a public readiness check on
2026-07-26.

| Route | HTTP | Canonical | Robots | Sitemap |
| --- | ---: | --- | --- | --- |
| `/ai-tools/tools/relay-app/` | 200 | Self | `index, follow` | Present |
| `/` | 200 | Self | `index, follow` | Present |
| `/posts/` | 200 | Self | `index, follow` | Present |
| `/posts/page/2/` | 200 | Self | `index, follow` | Not listed |
| `/posts/page/25/` | 200 | Self | `index, follow` | Not listed |

The Relay.app page contained its current shutdown and transition guidance.
Pagination pages used self-canonicals and were not listed separately in the
sitemap. `/posts/page/1/` returned the intended Hugo alias document with a
canonical and immediate meta refresh to `/posts/`; it was also absent from the
sitemap.

All checked responses showed `cf-cache-status: DYNAMIC`, no `Age` header, and
`cache-control: public, max-age=0, must-revalidate`.

SciSpace, Tome, Clipdrop, and Example AI Assistant returned HTTP 404 and were
absent from the live sitemap. No indexing request was made. The authenticated
Search Console inspection remains pending because the available browser
session blocked access to `search.google.com`; do not infer Google indexing or
canonical-selection results from this public check.

## Priority 1: Aggregate And Category Routes

Inspect these first because they lead crawlers to multiple reviewed pages:

```txt
https://aiplorer.com/ai-tools/
https://aiplorer.com/ai-tools/tools/
https://aiplorer.com/ai-tools/productivity-tools/
https://aiplorer.com/ai-tools/coding-tools/
https://aiplorer.com/ai-tools/automation-tools/
```

Confirm the user-declared and Google-selected canonicals use the apex domain
and trailing slash. Check whether the crawled body reflects the current
reviewed listings.

## Priority 2: Recent Design And Creative Tools

Inspect the newly published design and creative pages after the aggregate
routes:

```txt
https://aiplorer.com/ai-tools/tools/figma-ai/
https://aiplorer.com/ai-tools/tools/kittl/
https://aiplorer.com/ai-tools/tools/photoroom/
https://aiplorer.com/ai-tools/tools/microsoft-designer/
```

## Priority 3: Recent Productivity Tools

Inspect the five recent meeting and transcription pages:

```txt
https://aiplorer.com/ai-tools/tools/otter-ai/
https://aiplorer.com/ai-tools/tools/fireflies-ai/
https://aiplorer.com/ai-tools/tools/fathom/
https://aiplorer.com/ai-tools/tools/granola/
https://aiplorer.com/ai-tools/tools/read-ai/
```

## Priority 4: Coding Tools

Inspect the Coding Tools batch after its aggregate and category routes:

```txt
https://aiplorer.com/ai-tools/tools/github-copilot/
https://aiplorer.com/ai-tools/tools/cursor/
https://aiplorer.com/ai-tools/tools/windsurf/
https://aiplorer.com/ai-tools/tools/replit/
https://aiplorer.com/ai-tools/tools/tabnine/
```

Windsurf remains at its preserved Aiplorer URL while the page identifies the
current Devin Desktop name.

## Priority 5: Transition And Canonical Samples

Use these for focused monitoring rather than routine indexing requests:

```txt
https://aiplorer.com/ai-tools/tools/relay-app/
https://aiplorer.com/
https://aiplorer.com/posts/
https://aiplorer.com/posts/page/2/
https://aiplorer.com/posts/page/25/
```

Relay.app is transition guidance for an announced shutdown. The posts pages
are representative canonical checks. `/posts/page/1/` is an intentional alias
of `/posts/` and should not be requested as a separate canonical page.

## Sitemap Check

Confirm this sitemap remains submitted and readable:

```txt
https://aiplorer.com/sitemap.xml
```

Allow Google time to recrawl after sitemap, canonical, or aggregate changes.
Do not interpret a recent deployment as an immediate indexing failure.

## Do Not Submit

Do not inspect or request indexing for cache-busted, alternate-host, or draft
URLs:

```txt
https://www.aiplorer.com/
https://aiplorer.com/ai-tools/?deploy-check=<commit>
https://aiplorer.com/ai-tools/tools/scispace/
https://aiplorer.com/ai-tools/tools/tome/
https://aiplorer.com/ai-tools/tools/clipdrop/
https://aiplorer.com/ai-tools/tools/julius-ai/
https://aiplorer.com/ai-tools/tools/rows/
https://aiplorer.com/ai-tools/tools/obviously-ai/
https://aiplorer.com/ai-tools/tools/polymer/
https://aiplorer.com/ai-tools/tools/example-ai-assistant/
```

The `www` host redirects to the apex domain. Cache-busting query strings are
deployment diagnostics, not canonical URLs. The eight tool routes remain
draft-only.

## Inspection Record

For each inspected URL, record:

- inspection date
- live-test result
- indexed or not indexed
- user-declared canonical
- Google-selected canonical
- last crawl time
- page fetch or rendering issue
- action taken, including no action

Investigate a specific example before changing a canonical, redirect, sitemap,
or public route. Preserve existing `/posts/<slug>/` URLs.
