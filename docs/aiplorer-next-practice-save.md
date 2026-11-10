# Save a next practice

WORK-ID: AIP-NEXT-PRACTICE-SAVE
ACTIVE_WRITER = NONE
Last AI: CODEX. Implementation and local verification: DONE.

Base: 602b90a. Owner approved a new practice pack, a saved next practice,
and production deployment. Keep home, existing resume, and all 28
unrelated working changes intact.

Save one current unpracticed pack ID separately from resume and practiced
marks. Start opens the existing input preview without downloading or
changing progress. A pack marked practiced remains clearable but cannot
start from the saved-next row. Add a fictional video shot-list review.

QA: PASS. Isolated Hugo production and draft builds, 194 Node tests, 13
practice packs, 39 downloads, and 291 preserved post routes. Home HTML is
byte-identical. Browser checks covered save, revisit, starting a filtered
pack, no automatic download, unchanged resume and marks, cross-tab changes,
completion, replacement, clear and 320/390/1280px layouts.
BLOCKER: None for release preparation.
NEXT_SINGLE_TASK: deploy the scoped commit and verify production.
