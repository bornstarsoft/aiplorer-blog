# Review picker after all practices

WORK-ID: AIP-REVIEW-PICKER
ACTIVE_WRITER = NONE
Last AI: CODEX. Implementation and local verification: DONE.

Base: 6a451c8. Owner approved a new practice pack, a review choice after
finishing all packs, and deployment. Preserve home, resume, and all 28
unrelated working changes.

When no unpracticed pack remains, use the existing chooser to open an
already-practiced pack in review mode. Keep marks and saved slots intact.
Add a fictional release-note review with separate input, key and worksheet.

QA: PASS. Isolated Hugo production and draft builds, 208 Node tests, 19
practice packs, 57 downloads and 291 preserved post routes. Home HTML
is byte-identical. Browser checks covered finishing the last pack,
review choice and completion, cross-tab unmark, unchanged saved state
and resume, and 320/390/1280px layouts.
BLOCKER: None for release preparation.
NEXT_SINGLE_TASK: deploy the scoped commit and verify production.
