# Practice picker modes

WORK-ID: AIP-PRACTICE-MODES
ACTIVE_WRITER = NONE
Last AI: CODEX. Implementation and local verification: DONE.

Base: 0d03572. Owner approved a new pack, explicit review selection with
unfinished packs, and deployment. Preserve home, resume, and 28 unrelated changes.

Use a native mode control only when both groups exist. Default to new
practice when available; finishing returns to the next unpracticed choice.
The mode is not persisted and does not change marks or saved slots.

QA: PASS. Isolated Hugo production and draft builds, 210 Node tests, 20
practice packs, 60 downloads and 291 preserved post routes. Home HTML
is byte-identical. Browser checks covered keyboard mode switching,
mixed and single-group states, review completion, unchanged saved state,
and 320/390/1280px layouts.
BLOCKER: None for release preparation.
NEXT_SINGLE_TASK: deploy the scoped commit and verify production.
