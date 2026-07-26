# Aiplorer AI Discovery Navigation

## Purpose

The shared AI Discovery navigation keeps Aiplorer's main discovery modes
available across every page in the AI Tools section. Visitors can move from a
tool review or category page to the directory, comparison, workflows, review
updates, or Trend Watch without returning to the homepage.

## Navigation model

- Overview: category-led discovery
- Directory: all public reviewed tools
- Compare: side-by-side reviewed metadata
- Workflows: task-first tool collections
- Updates: review activity and freshness
- Trends: official-source workflow signals

The current destination receives `aria-current="page"`. Tool detail pages keep
Directory active, while category pages keep Overview active. The visible
reviewed-tool count is generated from public pages with
`reviewStatus: "reviewed"` and `draft: false`.

## Responsive behavior

Desktop uses a compact horizontal tab row under the primary navigation. Mobile
keeps the same information architecture and uses a horizontally scrollable tab
row so labels remain readable without a JavaScript menu.

## Editorial boundary

The navigation does not add rankings, ratings, paid placement, search, or
personalized claims. It connects existing manually reviewed discovery surfaces
and does not expose draft tool pages.
