# Aiplorer Tool Detail Discovery

Date: 2026-07-26

## Purpose

Reviewed tool pages should help visitors move from discovery to a careful
decision without turning Aiplorer into a ranking or comparison-score site.
Existing structured metadata is used to make each page easier to scan and to
connect visitors with other reviewed options.

## Page Structure

The shared tool layout presents:

- category, review status, and last-reviewed date
- a direct official-site action and category guide
- reviewed body copy and current-selection cautions
- `bestFor`, `useCases`, `pros`, and `limitations` as scannable decision support
- up to four related reviewed tools from `similarTools`

Related entries are links only when the referenced title is a published,
non-draft page with `reviewStatus: "reviewed"`. Draft or unresolved references
remain private and are never exposed as public links. If a reviewed page has no
resolvable relationship, the layout may fall back to reviewed peers from the
same category.

## Trust Boundaries

- Related tools are not ranked, scored, sponsored, or paid placements.
- Official-site links retain `nofollow`, `noopener`, and new-tab disclosure.
- Pricing and availability notes remain cautious and source-oriented.
- Existing tool URLs, category URLs, and legacy post URLs are unchanged.
- The layout adds no JavaScript.

## Validation

Production and draft builds should confirm:

- all 65 reviewed tool routes render with one H1
- every public related-tool link resolves to a reviewed production route
- draft names do not appear as related links
- official and category actions remain available
- canonical URLs remain on `https://aiplorer.com/`
- draft tools remain absent from production output and sitemap
- desktop and 360-pixel mobile pages have no document-level horizontal overflow
