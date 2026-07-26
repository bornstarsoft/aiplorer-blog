# Aiplorer Latest Practical Workflows

Date: 2026-07-26

## Purpose

The homepage now provides a lightweight return checkpoint for reviewed Guides
and Use Cases. Visitors can see recently checked practical content without
searching through the full hubs or relying on popularity signals.

## Selection Behavior

- Three reviewed Guides and three reviewed Use Cases are rendered by Hugo.
- Pages must have `reviewStatus: "reviewed"` and `draft: false`.
- Each content type is sorted by `lastReviewed` descending.
- Equal review dates use title order for deterministic output.
- Cards show the content type, review date, title, and description.
- Draft content cannot enter the section.

The section links to the complete Guides and Use Cases hubs. It uses existing
HTML and CSS patterns and adds no client-side JavaScript, account, database,
tracking, ranking, score, or paid placement.

## Return Visit Value

The section changes automatically when a Guide or Use Case receives a newer
manual review date. This gives readers a visible reason to revisit while
keeping the homepage tied to editorial maintenance rather than popularity.

The approach complements:

- recent tool review checks
- AI Trend Watch
- Decision Path
- workflow collections
- local shortlist and comparison

## Editorial Boundary

- No tool content or tool review date changed.
- No draft status changed.
- No new ranking, rating, score, endorsement, or unsupported product claim was
  introduced.
- Existing `/posts/<slug>/` URLs remain unchanged.
