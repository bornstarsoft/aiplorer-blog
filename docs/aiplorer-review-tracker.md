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
- The first visit establishes the checkpoint; an unchanged later visit reports
  that the browser is caught up.
- Content-type links lead to the reviewed-tools index, Guides, Use Cases, and
  Trend Watch.
- Homepage, reviewed index, and tool details link naturally to the tracker.
- Draft and unresolved tools, Guides, and Use Cases remain absent from the
  tracker and production sitemap.
