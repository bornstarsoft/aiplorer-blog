# Legacy Post Duplicate Slug Canonical Audit

Date: 2026-07-26

## Scope

This read-only audit examined the two legacy post slugs that are each shared by
two source files. No file under `content/posts/` was edited, and no existing
`/posts/<slug>/` URL was changed.

## Duplicate Sources

### The Benefits Of Brain Training Through Mobile Games

Public URL:
`/posts/the-benefits-of-brain-training-through-mobile-games/`

- `content/posts/2025-08-10-ai-212051.md`
- `content/posts/2025-08-24-ai-201918.md`

### The Power Of Brain Training Through Mobile Games

Public URL:
`/posts/the-power-of-brain-training-through-mobile-games/`

- `content/posts/2025-08-03-ai-215019.md`
- `content/posts/2025-08-16-ai-211803.md`

Each source file has its own date, body, and original-source link even though
the files in each pair resolve to the same permalink.

## Build Findings

`hugo list all` reports four pages but only two permalinks. Repeated clean
production builds proved that the final HTML owner is not deterministic:

- The benefits URL rendered the August 10 source in one build and the August 24
  source in other builds.
- The power URL rendered the August 3 source in one build and the August 16
  source in other builds.

This means parallel page rendering can overwrite one source with the other
without a Hugo build failure. A successful build does not guarantee which body,
date, or original-source link will be deployed for either URL.

## Aggregate Output Findings

- The paginated `/posts/` archive contains 293 summary entries.
- Each duplicate permalink appears in two archive entries with different dates.
- `/posts/index.xml` contains 293 items and repeats each duplicate link and GUID
  twice.
- The custom sitemap deduplicates by permalink and contains 291 post URLs.
- The sitemap contains each affected URL once.
- Sitemap `lastmod` uses `2025-08-24` for the benefits URL and `2025-08-16` for
  the power URL.

The sitemap is URL-deduplicated, but the archive and RSS still expose competing
source records for the same canonical destinations.

## Live Result

At audit time, both live routes returned `200` and used self-referencing
canonicals:

- The benefits URL served the August 24 source.
- The power URL served the August 16 source.

The no-trailing-slash route returned `308` to the trailing-slash URL.
`www.aiplorer.com` returned `301` to the apex canonical domain. Both affected
HTML responses were served with `cf-cache-status: DYNAMIC`.

## Search Console Risk

The duplicate source ownership is a plausible contributor to duplicate or
canonical indexing reports because successive deployments can change the body,
date, and cited source at one stable URL. Archive and RSS records also present
two dated entries for each destination.

This audit does not prove that these two URLs are the exact URLs named in Search
Console. Confirming that requires the affected URL examples from Search Console
or an exported report.

## Recommended Remediation

Treat the newer files as the provisional canonical owners because the current
live pages and sitemap `lastmod` values already align with them:

- `content/posts/2025-08-24-ai-201918.md`
- `content/posts/2025-08-16-ai-211803.md`

In a separately approved legacy-content phase, exclude the two older duplicate
sources from rendering and page collections without changing either existing
public URL. Validate production, draft, archive pagination, RSS, sitemap, and
live deployment before considering the conflict resolved.

Do not re-slug the older files into new public URLs without a separate content
and redirect decision.
