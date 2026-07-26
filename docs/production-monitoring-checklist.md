# Aiplorer Production Monitoring Checklist

Date: 2026-06-02
Updated: 2026-07-26

Use this checklist for ongoing production, indexing, deployment, and reviewed
tool maintenance. It replaces the original first-days launch checklist.

## Current Baseline

- Production and canonical domain: `https://aiplorer.com/`
- `https://www.aiplorer.com/` redirects with HTTP 301 to the apex domain.
- 64 reviewed public tool pages are grouped across 10 public categories.
- SciSpace, Tome, Clipdrop, Julius AI, Rows, Akkio, Obviously AI, Polymer, and
  Example AI Assistant remain draft-only.
- The production sitemap excludes all nine drafts.
- Production HTML contains no unresolved internal link target in the
  2026-07-26 structure audit.
- `/posts/page/2/` and later use self-canonical pager URLs.
- Every existing `/posts/<slug>/` route remains preserved.

Supporting records:

- `docs/production-structure-health-audit.md`
- `docs/live-sitemap-health-audit.md`
- `docs/reviewed-tools-monitoring-plan.md`
- `docs/reviewed-tools-official-url-health.md`
- `docs/aiplorer-reviewed-tools-structure-status.md`

## Pre-Push Validation

Run:

```bash
hugo --cleanDestinationDir --gc --minify
hugo --buildDrafts
hugo --cleanDestinationDir --gc --minify
git diff --check
git diff --cached --check
git status --short
```

Confirm:

- the production build passes
- the draft build passes
- production output is restored last
- changed public routes exist in `public/`
- changed public routes appear in `public/sitemap.xml` when intended
- SciSpace, Tome, Clipdrop, Julius AI, Rows, Akkio, Obviously AI, Polymer, and
  Example AI Assistant are absent from production output and the production
  sitemap
- no generated output or unrelated file is staged
- no legacy post is changed unless separately approved

## Core Live Routes

Check after deployments that affect content, templates, configuration, or
aggregate pages:

- `https://aiplorer.com/`
- `https://aiplorer.com/ai-tools/`
- `https://aiplorer.com/ai-tools/tools/`
- `https://aiplorer.com/guides/`
- `https://aiplorer.com/use-cases/`
- `https://aiplorer.com/posts/`
- `https://aiplorer.com/robots.txt`
- `https://aiplorer.com/sitemap.xml`

Also check:

- every route changed by the deployment
- the relevant category page
- at least one unchanged reviewed tool page
- at least one preserved legacy `/posts/<slug>/` page

Expected HTML and XML responses should not show stale long-lived cache
behavior.

## Canonical Checks

Confirm:

- rendered canonicals use `https://aiplorer.com/`
- `www.aiplorer.com` redirects to the apex domain
- route-style canonicals use trailing slashes
- `/posts/` canonicalizes to `https://aiplorer.com/posts/`
- `/posts/page/1/` canonicalizes to `https://aiplorer.com/posts/`
- `/posts/page/2/` and later canonicalize to their own pager URLs
- tool, category, guide, use-case, and legacy post pages use their intended
  self-canonical URLs

Do not redirect, remove, merge, or apply `noindex` to a legacy post solely
because Search Console reports a duplicate or alternate canonical. Review the
specific URL, Google-selected canonical, traffic, links, and route purpose
first.

## Search Console Monitoring

In the `aiplorer.com` domain property:

- [ ] Confirm `https://aiplorer.com/sitemap.xml` remains submitted and readable.
- [ ] Review `Pages` reports for unexpected server errors, soft 404s, and
  published routes reported as not found.
- [ ] Review alternate, duplicate, redirect, and Google-selected canonical
  groups by example URL before deciding that action is required.
- [ ] Allow time for recrawling after canonical or sitemap changes.
- [ ] Use URL Inspection selectively for important changed routes, not every
  archive pager or draft.
- [ ] Never request indexing for SciSpace, Tome, Clipdrop, Julius AI, Rows,
  Akkio, Obviously AI, Polymer, or Example AI Assistant while they remain
  drafts.

For the 2026-07-26 pagination change, monitor:

```txt
https://aiplorer.com/posts/
https://aiplorer.com/posts/page/2/
https://aiplorer.com/posts/page/25/
```

`/posts/page/1/` is an intentional first-pager alias whose canonical is
`/posts/`. Search Console may classify that alias as an alternate page with a
proper canonical.

## Sitemap And Draft Exposure

Confirm after each reviewed-tool publication:

- the new tool URL is present in `/sitemap.xml`
- `/ai-tools/` and `/ai-tools/tools/` include the tool where intended
- the relevant category page includes the tool where intended
- unpublished drafts remain absent from listings and the sitemap

Persistent draft checks:

```txt
https://aiplorer.com/ai-tools/tools/scispace/
https://aiplorer.com/ai-tools/tools/tome/
https://aiplorer.com/ai-tools/tools/clipdrop/
https://aiplorer.com/ai-tools/tools/julius-ai/
https://aiplorer.com/ai-tools/tools/rows/
https://aiplorer.com/ai-tools/tools/akkio/
https://aiplorer.com/ai-tools/tools/obviously-ai/
https://aiplorer.com/ai-tools/tools/polymer/
https://aiplorer.com/ai-tools/tools/example-ai-assistant/
```

All nine should return HTTP 404 in production.

## Cloudflare Checks

Current expected production configuration:

- Production branch: `main`
- Build command: `hugo --cleanDestinationDir --gc --minify`
- Build output directory: `public`
- `HUGO_VERSION`: `0.152.2`
- Broad HTML cache rule: disabled
- Cache bypass: `/ai-tools/*` and `/sitemap.xml`
- Static asset cache: 30 days

After push:

- [ ] Confirm the latest successful Production deployment uses the pushed
  `main` commit.
- [ ] Confirm important HTML/XML bodies contain the newly generated content.
- [ ] Record `cf-cache-status`, `age`, `cache-control`, and `last-modified` when
  diagnosing stale content.
- [ ] Compare the latest Pages preview URL with the custom domain when an
  artifact or routing mismatch is suspected.
- [ ] Purge only when evidence indicates a stale edge response; do not use
  repeated purges as a substitute for checking build artifacts or cache rules.

## Reviewed Tool Monitoring

Follow `docs/reviewed-tools-monitoring-plan.md`:

- check active Relay.app and Windsurf transitions weekly
- review fast-changing access and data boundaries at least every two months
- review general product freshness at least every four months
- recheck official URLs before each review batch
- treat command-line HTTP 403 responses as requiring manual browser review,
  not as automatic evidence of a broken official URL

SciSpace, Tome, and Clipdrop remain draft until stable official sources support
a new conservative review. Julius AI, Rows, Akkio, Obviously AI, and Polymer
remain draft until each independently passes the same review gate.

## Incident Response

For an unexpected public 404:

1. Confirm the page is reviewed and `draft: false`.
2. Confirm local production output contains the route.
3. Confirm the production sitemap contains the route when intended.
4. Compare the latest Pages preview and custom-domain responses.
5. Check the Production deployment commit, build log, and output directory.
6. Check Cloudflare cache rules, Page Rules, Workers, Transform Rules, and
   custom routes.
7. Preserve the existing public URL while diagnosing the issue.

For stale aggregate content:

1. Verify the local generated aggregate file.
2. Verify the Cloudflare build artifact or diagnostic build output.
3. Compare preview and custom-domain bodies and headers.
4. Check cache/routing rules before changing content.

Do not enable ads, affiliate links, login, database features, comments, search,
or workflow automation as part of monitoring or incident response.
