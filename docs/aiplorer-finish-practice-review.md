# Finish a practice review

WORK-ID: AIP-FINISH-REVIEW
ACTIVE_WRITER = NONE
Last AI: CODEX. Implementation and local verification: DONE.

Base: eeed22a. Owner approved a new pack, completion of a repeat practice,
and deployment. Preserve home, existing resume, and 28 unrelated changes.

Track a review only on the current page. Finishing it returns to the
unpracticed picker without writing any stored state. Add a fictional
audio cleanup review with separate input, key, and worksheet.

QA: PASS. Isolated Hugo production and draft builds, 207 Node tests, 18
practice packs, 54 downloads and 291 preserved post routes. Home HTML
is byte-identical. Browser checks covered review completion, next-choice
focus, the all-practiced state, unchanged browser storage and resume,
and 320/390/1280px layouts.
BLOCKER: None for release preparation.
NEXT_SINGLE_TASK: deploy the scoped commit and verify production.
