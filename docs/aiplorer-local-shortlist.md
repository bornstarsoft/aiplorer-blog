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
- Private candidate test notes use `aiplorer-candidate-notes-v1`, are limited to
  600 characters per reviewed tool path, and are saved as the visitor types.
- The selected shortlist stage view uses
  `aiplorer-shortlist-stage-view-v1`.
- Aiplorer does not receive or synchronize the saved list.
- Aiplorer does not receive or synchronize candidate check progress.
- Aiplorer does not receive or synchronize decision stages.
- Aiplorer does not receive or synchronize private candidate notes.
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

## Private candidate notes

Each expanded candidate evaluation includes a 600-character local note for
recording what worked, what failed, and what should be verified next. A saved
note is summarized on the collapsed card so a returning visitor can see that
test context exists without reopening every candidate.

Notes stay in browser storage and are included in local JSON backups and
readable Markdown decision briefs. They must not be used for secrets, customer
data, confidential material, or other sensitive information. A note records the
visitor's own observation; it is not an Aiplorer test result, endorsement,
approval, or evidence of tool quality.

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

When a Testing candidate still has incomplete checks, the resume queue also
offers `Open next check`. It selects the Testing view, opens the first
incomplete candidate in the existing alphabetical card order, focuses the first
unchecked item, and disappears when no Testing checks remain. The behavior is
derived only from private browser state and does not choose or rank a tool.

The homepage shows total private checklist progress and links back to the most
actionable saved stage, prioritizing active testing, then ready, researching,
and unassigned candidates. Its next-queue summary also reports checklist
progress for that stage so a returning visitor can see the remaining work
before reopening the shortlist. When a Testing candidate has an unfinished
check, the homepage names the candidate and check, then links directly to the
focused check in the shortlist. This handoff uses the same alphabetical card
order and private browser state as the shortlist; it does not rank or recommend
a tool. Temporary shortlist URL parameters are removed from the visible URL
after the stage and focused check are applied.

## Local backup and restore

The shortlist workspace can download a versioned JSON backup containing only
public reviewed-tool paths, private candidate checks, decision stages, private
test notes, and the selected stage view. The file stays on the visitor's device;
Aiplorer does not upload, receive, or synchronize it. Review Update checkpoints
and recent search state are deliberately excluded.

Restore accepts files up to 256 KB, requires the current backup schema, keeps
only reviewed tool paths present on the current shortlist page, and removes
unknown check or stage values. A valid restore asks before replacing this
browser's saved candidates and evaluation progress. This keeps the feature
accountless while helping visitors preserve an unfinished comparison across
browser-storage cleanup or a move to another browser.

## Readable decision brief

The shortlist can also download a local Markdown decision brief. It uses the
saved order rather than assigning a score or rank and includes each candidate's
category, short description, first `May fit` and `Check first` signals,
category-specific same-task test and review focus, Aiplorer review date, full
review URL, private decision stage, four candidate-check states, stage-specific
next action, and any private test note.

The brief ends with reminders to recheck official vendor details and review
important outputs before choosing. It is generated entirely in the browser and
is not uploaded to Aiplorer. The file summarizes the visitor's own evaluation
progress; it is not evidence that a tool is accurate, secure, approved, or
suitable for a particular use.

## Trend rationale

The 2026 Stanford AI Index describes leading-model competition shifting toward
cost, reliability, and domain-specific performance as top-level capability
converges. Microsoft's 2026 Work Trend Index places greater emphasis on human
intent, judgment, quality standards, and responsibility as AI and agents take
on more execution, and notes that repeatable workflows and quality standards
help organizations learn from AI-assisted work. NIST's AI Resource Center also
frames testing, evaluation, verification, and validation as practical parts of
operational AI risk management. The shortlist therefore helps visitors record
and resume concrete evaluation observations instead of presenting a universal
winner.

Official sources:

- https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance
- https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization
- https://airc.nist.gov/

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
