# Aiplorer Tool Context Links

Date: 2026-07-26

## Purpose

Reviewed tool pages can now lead directly into practical Guides and Use Cases.
This helps a visitor move from understanding a service to seeing a reviewable
workflow without returning to a generic directory page.

## Relationship Source

The tool template reads existing `relatedTools` entries from reviewed Guides
and Use Cases. A practical page is eligible only when:

- `reviewStatus` is `reviewed`
- `draft` is `false`
- `relatedTools` contains the current tool's canonical relative URL

No separate relationship list is maintained on tool pages. Existing content
metadata remains the single source of truth.

## Display Behavior

- Up to three related practical pages are shown.
- Pages are sorted by `lastReviewed` descending.
- Equal review dates use title order for deterministic output.
- Cards display Guide or Use Case, review date, title, and description.
- The section is omitted when no reviewed relationship exists.
- The section links to the complete Guides and Use Cases hubs.

At the time of implementation, 18 reviewed tools have at least one qualifying
relationship.

## Editorial Boundary

- Relationships are contextual links, not rankings, scores, endorsements, or
  paid placement.
- Draft Guides, Use Cases, and tools are excluded.
- No tool claim, review date, category, official URL, or publication state was
  changed.
- No client-side JavaScript, account, database, or tracking was added.
- Existing `/posts/<slug>/` URLs remain unchanged.
