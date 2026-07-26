# Aiplorer Dynamic Category Pages

Date: 2026-07-26

## Purpose

Aiplorer category pages should remain useful as reviewed tools are added,
updated, or unpublished. The category directory must not depend on manually
copying every reviewed tool card into Markdown.

## Behavior

The shared `ai-tools/category` layout:

- reads only non-draft pages with `reviewStatus: "reviewed"`
- filters cards using the page's `toolCategory` front matter
- shows the current reviewed count and latest review date
- links every card to its existing `/ai-tools/tools/<slug>/` URL
- keeps category-specific context and safety guidance in content
- presents the category's same-task comparison plan before the reviewed cards
- links directly to the matching group on `/ai-tools/compare/` and to the local shortlist
- links to the complete reviewed index and neighboring categories

This gives visitors a consistent way to browse all ten categories while
keeping each page synchronized with the reviewed content model.

## Trust And Maintenance

- The category order and labels come from the shared category-data partial.
- The pages do not rank, score, or promote tools through paid placement.
- Feature, pricing, policy, and availability cautions remain visible.
- Same-task plans are starting points for consistent evaluation, not scores or
  recommendations.
- Draft pages are excluded from production category counts and cards.
- Existing category routes and legacy post routes remain unchanged.
- The category experience adds no JavaScript.

## Validation

Production and draft builds should confirm that:

- all ten category routes render with one H1
- each production card count matches reviewed metadata
- each same-task action resolves to the matching comparison category anchor
- reviewed cards link to generated production routes
- draft tools appear only in the draft build
- sitemap and canonical URLs remain on `https://aiplorer.com/`
- desktop and mobile layouts have no document-level horizontal overflow
