# Aiplorer Search Console URL Inspection Queue

Date: 2026-07-26

This is a selective manual queue for the authenticated Google Search Console
`aiplorer.com` domain property. It does not record an indexing request or
authorize changing public routes, canonicals, redirects, drafts, or sitemap
settings.

Process the queue only as Search Console quota allows. Record the inspection
result before requesting indexing, and request indexing only for an intended
public URL whose rendered page, canonical, and sitemap entry are correct.

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

### Priority 2: Recent Productivity Tools

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

SciSpace, Tome, and Example AI Assistant returned HTTP 404 and were absent from
the live sitemap. No indexing request was made. The authenticated Search
Console inspection remains pending because the available browser session
blocked access to `search.google.com`; do not infer Google indexing or
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

## Priority 2: Recent Productivity Tools

Inspect the five recent meeting and transcription pages:

```txt
https://aiplorer.com/ai-tools/tools/otter-ai/
https://aiplorer.com/ai-tools/tools/fireflies-ai/
https://aiplorer.com/ai-tools/tools/fathom/
https://aiplorer.com/ai-tools/tools/granola/
https://aiplorer.com/ai-tools/tools/read-ai/
```

## Priority 3: Coding Tools

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

## Priority 4: Transition And Canonical Samples

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
https://aiplorer.com/ai-tools/tools/example-ai-assistant/
```

The `www` host redirects to the apex domain. Cache-busting query strings are
deployment diagnostics, not canonical URLs. The three tool routes remain
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
