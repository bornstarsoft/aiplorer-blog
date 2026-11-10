# Finish a saved practice

WORK-ID: AIP-FINISH-PRACTICE
ACTIVE_WRITER = NONE
Last AI: CODEX. Implementation and local verification: DONE.

Base: 2094128. Owner approved a new practice pack, a completion-to-chooser
action and production deployment. Preserve home, existing resume and the
28 unrelated working changes.

An explicit action on the separately planned pack marks it practiced
and moves focus to the unpracticed picker. It never clears or overwrites
the next-pack slot, the resume slot or a saved step. Add a fictional
file handoff review with separate input, key and comparison worksheet.

QA: PASS. Isolated Hugo production and draft builds, 198 Node tests, 14
practice packs, 42 downloads, and 291 preserved post routes. Home HTML is
byte-identical. Browser checks covered explicit finish, keyboard focus,
completed pack exclusion, choosing and saving a replacement, the
all-practiced state, unchanged resume and 320/390/1280px layouts.
BLOCKER: None for release preparation.
NEXT_SINGLE_TASK: deploy the scoped commit and verify production.
