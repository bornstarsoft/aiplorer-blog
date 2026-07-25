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
- 885 sitemap URLs

All internal link targets resolved to generated files. Every sitemap URL mapped
to a production output, and the sitemap contained no SciSpace, Tome, or Example
AI Assistant draft URL.

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
- production excludes SciSpace, Tome, and Example AI Assistant
- draft builds continue to include the intended draft pages
- generated output is not staged
