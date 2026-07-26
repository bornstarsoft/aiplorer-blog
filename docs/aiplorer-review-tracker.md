# Aiplorer Review Tracker

Date: 2026-07-26

## Purpose

The review tracker gives visitors a lightweight reason to return by showing
when Aiplorer last checked each public tool page against official sources. It
uses existing `lastReviewed`, `reviewStatus`, category, and description
metadata, so its public log does not require JavaScript, a database, or
automated rankings.

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

- `/ai-tools/review-updates/` lists only published pages with
  `reviewStatus: "reviewed"`.
- Entries are grouped by `lastReviewed` date and sorted with the newest group
  first.
- A small optional browser checkpoint stores the current public review
  path-and-date tokens in `localStorage` under
  `aiplorer-review-snapshot-v1`.
- On a later visit, entries added or checked again are marked locally. No
  account, server sync, personal data, popularity score, or remote tracking is
  introduced.
- The first visit establishes the checkpoint; an unchanged later visit reports
  that the browser is caught up.
- Category links lead to the existing grouped reviewed-tools index.
- Homepage, reviewed index, and tool details link naturally to the tracker.
- Draft and unresolved tools remain absent from the tracker and production
  sitemap.
