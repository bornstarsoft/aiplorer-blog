# Repeat a practiced pack

WORK-ID: AIP-REPEAT-PRACTICE
ACTIVE_WRITER = NONE
Last AI: CODEX. Implementation and local verification: DONE.

Base: e8e8dea. Owner approved a new pack, a repeat action on practiced
packs, and deployment. Preserve home, resume and 28 unrelated changes.

Starting again opens and focuses a practiced pack's input without changing
its mark, the next-pack slot or resume. Add a fictional image edit review.

QA: PASS. Isolated Hugo production and draft builds, 204 Node tests, 17
practice packs, 51 downloads and 291 preserved post routes. Home HTML
is byte-identical. Browser checks covered keyboard preview focus, unchanged
marks, filter, next pack and resume, no automatic download, cross-tab unmark,
and 320/390/1280px layouts.
BLOCKER: None for release preparation.
NEXT_SINGLE_TASK: deploy the scoped commit and verify production.
