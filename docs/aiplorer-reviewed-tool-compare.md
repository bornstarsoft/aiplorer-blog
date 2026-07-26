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
server-rendered. Category jump links provide quick navigation, while the
optional `My shortlist` view hides unsaved rows in the browser. The selected
view is reflected in the URL, but saved tool paths remain local to that
browser. Desktop uses a dense comparison grid; mobile converts each row into a
readable card.

With JavaScript available, the category links also act as a focused comparison
scope. The selected category is reflected in the `category` query parameter,
can be combined with the shortlist view, and can be cleared with the `All
categories` control. Without JavaScript, the same links remain ordinary anchor
links to the server-rendered category groups.

The shortlist view does not score, reorder, or recommend candidates. Removing a
saved tool updates the focused comparison immediately, and visitors can always
return to the complete reviewed set.

## Same-task test plans

Every category includes a short, cautious test plan that asks visitors to give
each candidate a comparable task and review the same practical concerns. The
plans cover category-specific output checks while retaining shared checkpoints
for current official details, privacy, permissions, rights, and operational
risk.

When one or more saved candidates are in the `Testing` stage, the private
evaluation summary links directly to that shortlist stage. This continuation
link is derived only from local browser state and does not rank or recommend a
candidate.

## Editorial boundary

The page is a shortlist tool, not a recommendation engine. A `bestFor` item
describes a task that may be worth exploring and does not mean a product is the
best option. Pricing and availability text remains cautious, and visitors are
directed to the official source before choosing or relying on a feature.
