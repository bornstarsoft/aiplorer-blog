# Aiplorer Local Shortlist

## Purpose

`/ai-tools/shortlist/` lets visitors keep a small set of reviewed tools while
moving between detailed reviews, category pages, and the comparison hub. It is
designed for return visits without introducing an account, database, or remote
tracking.

## Storage model

- Saved tool paths use the browser's `localStorage`.
- The storage key is `aiplorer-shortlist-v1`.
- Aiplorer does not receive or synchronize the saved list.
- Clearing browser storage or changing browsers may remove the list.
- If local storage is unavailable, the current page session keeps an in-memory
  fallback.

## Entry points

- Save button on each public reviewed tool page
- Save button on every row in `/ai-tools/compare/`
- My Shortlist link on the homepage
- Shortlist tab in the shared AI Discovery navigation

## Editorial boundary

Saving a tool does not imply an endorsement or ranking. The shortlist continues
to show review dates and links to full Aiplorer reviews, and visitors are
reminded to verify current features, pricing, limits, and policies at official
sources.
