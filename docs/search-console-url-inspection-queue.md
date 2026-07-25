# Aiplorer Search Console URL Inspection Queue

Date: 2026-07-26

This is a selective manual queue for the authenticated Google Search Console
`aiplorer.com` domain property. It does not record an indexing request or
authorize changing public routes, canonicals, redirects, drafts, or sitemap
settings.

Process the queue only as Search Console quota allows. Record the inspection
result before requesting indexing, and request indexing only for an intended
public URL whose rendered page, canonical, and sitemap entry are correct.

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
