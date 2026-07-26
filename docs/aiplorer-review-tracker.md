# Aiplorer Review Tracker

Date: 2026-07-26

## Purpose

The review tracker gives visitors a lightweight reason to return by showing
when Aiplorer last checked each public tool page against official sources and
when reviewed Guides and Use Cases were refreshed. It uses existing
`lastReviewed`, `reviewStatus`, section, category, and description metadata, so
its public log does not require a database or automated rankings.

The tracker is intentionally not a vendor product changelog. A recorded review
date does not promise that pricing, availability, policies, limits, or features
remain unchanged after that date.

## Trend Rationale

The 2026 Stanford AI Index reports broad organizational adoption alongside a
still uneven capability frontier. The 2026 Microsoft Work Trend Index
emphasizes agentic workflows, human direction, and repeatable quality
standards. Aiplorer responds with:

- workflow-first category discovery
- visible review recency
- official-source links
- human-review cautions
- no popularity ranking, score, sponsorship, or paid placement

Official references:

- https://hai.stanford.edu/ai-index/2026-ai-index-report
- https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization

## Public Behavior

- `/ai-tools/review-updates/` lists only published AI Tool, Guide, and Use Case
  pages with `reviewStatus: "reviewed"`.
- Entries are grouped by `lastReviewed` date and sorted with the newest group
  first.
- A small optional browser checkpoint stores the current public review
  path-and-date tokens in `localStorage` under
  `aiplorer-review-snapshot-v1`.
- On a later visit, entries added or checked again are marked locally. No
  account, server sync, personal data, popularity score, or remote tracking is
  introduced.
- When this browser has a local shortlist, the activity finder exposes a
  `Saved candidates` view. It intersects public reviewed tool paths with
  `aiplorer-shortlist-v1` and can be combined with the return-visit update view.
- If a saved candidate has a newer Aiplorer review token, the return checkpoint
  prioritizes that smaller set and links directly to
  `?view=tools&saved=1&new=1`.
- The homepage reads the same public path-and-date tokens for saved candidates.
  It reports whether the browser needs a first checkpoint, is current, or has
  saved review activity to revisit. It does not write the review checkpoint;
  visiting Review Updates remains the explicit checkpoint action.
- A separate homepage Review pulse reads all published tool tokens. It shows
  whether the browser needs a first checkpoint, has newer tool review checks to
  revisit, or is caught up with the current public tool set. The focused link
  opens the tool-only review log and, when applicable, its new-since-checkpoint
  view. It also remains read-only on the homepage.
- The shortlist workspace displays the same state at both summary and candidate
  level. Saved candidates checked after the browser checkpoint link to the
  focused saved-and-new Review Updates view.
- The first visit establishes the checkpoint; an unchanged later visit reports
  that the browser is caught up.
- Content-type links lead to the reviewed-tools index, Guides, Use Cases, and
  Trend Watch.
- Homepage, reviewed index, and tool details link naturally to the tracker.
- Draft and unresolved tools, Guides, and Use Cases remain absent from the
  tracker and production sitemap.
