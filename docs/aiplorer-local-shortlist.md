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
- Candidate decision stages use `aiplorer-candidate-stage-v1` and are keyed by
  the reviewed tool path.
- The selected shortlist stage view uses
  `aiplorer-shortlist-stage-view-v1`.
- Aiplorer does not receive or synchronize the saved list.
- Aiplorer does not receive or synchronize candidate check progress.
- Aiplorer does not receive or synchronize decision stages.
- Clearing browser storage or changing browsers may remove the list.
- If local storage is unavailable, the current page session keeps an in-memory
  fallback.

## Candidate checks

Each visible shortlist card provides four private checks:

- test the service with the same category-specific task
- review output quality and facts
- check privacy, permissions, and rights
- confirm current plans and limits

The expanded evaluation area repeats the category's same-task prompt and review
focus from Aiplorer's shared category metadata. It also links to the comparison
page with both `view=shortlist` and the matching category so saved candidates
can be reviewed together without losing context. These prompts are evaluation
guidance, not evidence that Aiplorer tested or approved a saved service.

The checks support a return-visit evaluation workflow. They are not ratings,
scores, endorsements, guarantees, or evidence that a service passed an Aiplorer
test. Removing a tool from the shortlist also removes its stored check state.

## Decision stages

Each saved candidate can be marked as `Researching`, `Testing`, or
`Ready to decide`. The stage is a private continuity note for returning to an
unfinished comparison. It is not a rating, recommendation, completion claim,
or signal that the tool is suitable for production use.

Each shortlist card keeps the current decision stage and completed-check count
visible in a compact candidate-evaluation summary. The detailed stage controls
and four candidate checks use a native expandable section so multiple saved
candidates remain easier to scan without hiding or discarding their evaluation
state.

The homepage summarizes stages for saved candidates and compares their current
public review tokens with the browser's Review Updates checkpoint. It can show
whether tracking has not started, saved reviews are current, or one or more
saved candidates have a newer Aiplorer review check. The comparison page shows
each saved tool's stage beside its private checklist progress. Removing a tool
also removes its stored stage.

The shortlist workspace uses that same checkpoint to show a compact saved-review
summary and a status on every visible candidate card. A card can indicate that
tracking has not started, its review token matches the browser checkpoint, or
Aiplorer checked the page again after that checkpoint. When saved review
activity exists, the summary links directly to the saved-and-new Review Updates
view. These states describe Aiplorer review activity, not vendor product changes
or current feature guarantees.

The shortlist can be narrowed to `Researching`, `Testing`, `Ready to decide`,
or candidates with no stage set. Each view shows a local candidate count and an
explicit empty state. This is an organization aid, not a ranking or automated
recommendation.

Each stage also presents a concise next action:

- `Researching`: review the full Aiplorer page and current official details
- `Testing`: use a real task and complete the same candidate checks
- `Ready to decide`: compare remaining trade-offs and recheck official details
- no stage: assign a stage so unfinished evaluation remains easy to resume

When every stage is visible, the shortlist turns those same states into a
lightweight resume queue. Active testing is surfaced first, followed by ready,
researching, and unassigned candidates. The queue reports private checklist
progress for that stage and opens the corresponding stage view. This is a
continuity aid based on the visitor's own labels and checks, not a tool ranking
or Aiplorer recommendation.

The homepage shows total private checklist progress and links back to the most
actionable saved stage, prioritizing active testing, then ready, researching,
and unassigned candidates. Its next-queue summary also reports checklist
progress for that stage so a returning visitor can see the remaining work
before reopening the shortlist. The stage is passed as a temporary shortlist
URL parameter, stored locally, and removed from the visible URL after it is
applied.

## Trend rationale

The 2026 Stanford AI Index describes leading-model competition shifting toward
cost, reliability, and domain-specific performance as top-level capability
converges. Microsoft's 2026 Work Trend Index places greater emphasis on human
intent, judgment, quality standards, and responsibility as AI and agents take
on more execution, and notes that repeatable workflows and quality standards
help organizations learn from AI-assisted work. The shortlist therefore helps
visitors record and resume concrete evaluation steps instead of presenting a
universal winner.

Official sources:

- https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance
- https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization

## Entry points

- Save button on each public reviewed tool page
- Icon save button on every reviewed Directory card, allowing visitors to keep
  candidates without leaving a filtered result set
- Live saved-candidate count in the Directory discovery shortcuts
- Save button on every row in `/ai-tools/compare/`
- Local decision stages, candidate-check totals, and per-tool progress in
  `/ai-tools/compare/`
- A private Continue evaluating summary on the homepage when candidates are saved
- Homepage saved-review status and a direct link to the relevant review view
- Saved-review links from the homepage summary and shortlist workspace
- Per-candidate review checkpoint states in the shortlist workspace
- A local `Saved candidates` filter in `/ai-tools/review-updates/`
- My Shortlist link on the homepage
- Shortlist tab in the shared AI Discovery navigation

## Editorial boundary

Saving a tool does not imply an endorsement or ranking. The shortlist continues
to show review dates, reviewed decision signals, and links to full Aiplorer
reviews. Visitors are reminded to verify current features, pricing, limits, and
policies at official sources.
