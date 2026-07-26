# Aiplorer Reviewed Tool Compare

## Purpose

`/ai-tools/compare/` turns the existing reviewed-tool metadata into a compact
comparison view. It helps visitors move from a broad category to a shortlist
without creating rankings, scores, paid placement, or unsupported winner
claims.

## Data shown

- Tool title and reviewed description
- The first two `bestFor` items as possible workflow fit
- A shortened `pricingNote` as the current-detail checkpoint
- `lastReviewed` date
- Links to the complete Aiplorer review and official product site

All data comes from public reviewed tool pages. Draft pages are excluded by the
same `reviewStatus: "reviewed"` and `draft: false` conditions used elsewhere in
the directory.

## Browsing strategy

The comparison is grouped by the existing ten categories and remains fully
server-rendered. Category jump links provide quick navigation without adding
client-side search or filter behavior. Desktop uses a dense comparison grid;
mobile converts each row into a readable card.

## Editorial boundary

The page is a shortlist tool, not a recommendation engine. A `bestFor` item
describes a task that may be worth exploring and does not mean a product is the
best option. Pricing and availability text remains cautious, and visitors are
directed to the official source before choosing or relying on a feature.
