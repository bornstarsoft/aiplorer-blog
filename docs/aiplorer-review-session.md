# Review candidates for the current visit

WORK-ID: AIP-REVIEW-SESSION
ACTIVE_WRITER = NONE
Last AI: CODEX. Implementation and local verification: DONE.

Base: 767cb8d. Owner approved a new pack, exclusion of completed reviews
for the current visit, and deployment. Preserve home, resume, and 28
unrelated working changes.

Keep reviewed pack IDs only in memory. When review candidates run out,
show a status and allow any remaining new packs. Do not change persistent
practice marks or saved slots. Add a fictional CSV merge review.

QA: PASS. Isolated Hugo production and draft builds, 215 Node tests, 22
practice packs, 66 downloads and 291 preserved post routes. Home HTML
is byte-identical. Browser checks covered consecutive reviews, exhaustion
with and without new choices, reload, unchanged marks and saved slots,
keyboard focus, and 320/390/1280px layouts.
BLOCKER: None for release preparation.
NEXT_SINGLE_TASK: deploy the scoped commit and verify production.
