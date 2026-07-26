# Aiplorer Local Shortlist

## Purpose

`/ai-tools/shortlist/` lets visitors keep a small set of reviewed tools while
moving between detailed reviews, category pages, and the comparison hub. It is
designed for return visits without introducing an account, database, or remote
tracking.

## Storage model

- Saved tool paths use the browser's `localStorage`.
- The storage key is `aiplorer-shortlist-v1`.
- Candidate checks use `aiplorer-trial-checks-v1` and are keyed by the reviewed
  tool path.
- Aiplorer does not receive or synchronize the saved list.
- Aiplorer does not receive or synchronize candidate check progress.
- Clearing browser storage or changing browsers may remove the list.
- If local storage is unavailable, the current page session keeps an in-memory
  fallback.

## Candidate checks

Each visible shortlist card provides four private checks:

- test the service with a real task
- review output quality and facts
- check privacy, permissions, and rights
- confirm current plans and limits

The checks support a return-visit evaluation workflow. They are not ratings,
scores, endorsements, guarantees, or evidence that a service passed an Aiplorer
test. Removing a tool from the shortlist also removes its stored check state.

## Trend rationale

The 2026 Stanford AI Index describes leading-model competition shifting toward
cost, reliability, and domain-specific performance as top-level capability
converges. Microsoft's 2026 Work Trend Index places greater emphasis on human
intent, judgment, quality standards, and responsibility as AI and agents take
on more execution. The shortlist therefore helps visitors record concrete
evaluation steps instead of presenting a universal winner.

Official sources:

- https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance
- https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization

## Entry points

- Save button on each public reviewed tool page
- Save button on every row in `/ai-tools/compare/`
- Local candidate-check totals and per-tool progress in `/ai-tools/compare/`
- A private Continue evaluating summary on the homepage when candidates are saved
- My Shortlist link on the homepage
- Shortlist tab in the shared AI Discovery navigation

## Editorial boundary

Saving a tool does not imply an endorsement or ranking. The shortlist continues
to show review dates, reviewed decision signals, and links to full Aiplorer
reviews. Visitors are reminded to verify current features, pricing, limits, and
policies at official sources.
