# Aiplorer Production Structure Health Audit

Date: 2026-07-26

This audit checks the generated production structure after the reviewed-tool
source and official URL maintenance cycle. It covers internal links,
canonicals, sitemap destinations, and draft exposure without changing public
routes or legacy post content.

## Baseline

The production build generated:

- 910 HTML files
- 27,115 internal link references
- 883 unique sitemap URLs after permalink de-duplication

The initial sitemap contained 885 entries because two legacy permalinks were
each emitted twice. The site-level sitemap template now emits each permalink
once without changing either legacy post source or public route. All internal
link targets resolved to generated files. Every unique sitemap URL mapped to a
production output, and the sitemap contained no SciSpace, Tome, or Example AI
Assistant draft URL.

## Canonical Review

Every generated HTML file had a canonical tag. All canonical URLs used the
`https://aiplorer.com/` host, and route-style canonicals used trailing slashes.

The initial audit found that the theme canonicalized all paginated post archive
pages to `/posts/`. The `/posts/page/1/` alias sharing the root archive
canonical is intentional, but pages 2 and later contain different article
sets and should identify their own pager URL.

The base template now uses the current Hugo pager URL as the canonical for
`/posts/page/2/` and later. It preserves:

- `/posts/` as the first archive canonical
- `/posts/page/1/` as an alias canonicalized to `/posts/`
- every existing `/posts/<slug>/` route
- all non-post canonical behavior
- explicit `canonicalUrl` front matter overrides

This uses Hugo's existing `Paginator` and pager `URL` methods. It does not
change pagination size, archive navigation, redirect behavior, or sitemap
membership.

The post-change audit found 908 unique canonical values across 910 HTML files.
The only remaining shared canonicals were the intentional first-pager aliases:

- `/blog/` and `/blog/page/1/` use `https://aiplorer.com/blog/`.
- `/posts/` and `/posts/page/1/` use `https://aiplorer.com/posts/`.

No page was missing a canonical, and no canonical used an unexpected host or
route format.

## Current Structure Recheck

A later 2026-07-26 recheck included the subsequent design, creative, and
data-analysis publication batches.

- The production build contained 920 HTML files and 25,507 internal link
  references.
- Every internal link target resolved to generated production output.
- The production sitemap contained 893 entries and 893 unique URLs, and every
  sitemap destination resolved locally.
- All 920 HTML files had canonical tags. There were 918 unique canonical
  values.
- The only shared canonicals remained the intentional `/blog/page/1/` and
  `/posts/page/1/` aliases.
- All route-style canonicals used the apex HTTPS host and trailing slashes.
  The file-style `/404.html` canonical remained the expected exception.
- The sitemap contained all 65 reviewed tool routes.
- SciSpace, Tome, Clipdrop, Julius AI, Rows, Obviously AI, Polymer, and Example
  AI Assistant remained absent from production output and the sitemap.

Live checks returned HTTP `200` with the expected self-canonical for the home
page, AI Tools landing, reviewed index, Akkio, `/posts/`, representative
pagination pages, and both preserved legacy brain-training post routes. The
`www` AI Tools route returned HTTP `301` to the matching apex URL.

No public route, canonical, redirect, layout, tool status, or legacy post
change was required. The earlier 910-file and 883-URL results remain the
historical record from the original canonical and sitemap repair.

## Search Console Context

Self-canonical paginated archive pages reduce ambiguity when Google evaluates
similar list pages. Search Console may still report `/posts/page/1/` or other
aliases as alternate pages with a proper canonical; that is expected when the
alias and canonical destination are both reachable.

Canonical or duplicate reports should be reviewed by URL and category before
any redirect, removal, or `noindex` change. Legacy post URLs remain preserved.

## Validation Gate

After canonical changes:

```bash
hugo --cleanDestinationDir --gc --minify
hugo --buildDrafts
hugo --cleanDestinationDir --gc --minify
git diff --check
git diff --cached --check
git status --short
```

Confirm:

- `/posts/` canonicalizes to `https://aiplorer.com/posts/`
- `/posts/page/1/` canonicalizes to `https://aiplorer.com/posts/`
- `/posts/page/2/` and later use their own canonical URLs
- all internal links and sitemap destinations resolve locally
- production excludes SciSpace, Tome, Clipdrop, Julius AI, Rows, Obviously AI,
  Polymer, and Example AI Assistant
- draft builds continue to include the intended draft pages
- generated output is not staged
