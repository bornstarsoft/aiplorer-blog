# Choose what follows a review

WORK-ID: AIP-AFTER-REVIEW
ACTIVE_WRITER = NONE
Last AI: CODEX. Implementation and local verification: DONE.

Base: 2387d59. Owner approved a new pack, a choice after review, and
deployment. Preserve home, existing resume, and 28 unrelated changes.

When both candidate groups exist, offer an explicit choice after finishing
a review. If one remains, open that chooser directly. Keep marks and saved
slots unchanged. Add a fictional incident timeline review.

QA: PASS. Isolated Hugo production and draft builds, 213 Node tests, 21
practice packs, 63 downloads, and 291 preserved post routes. Home HTML
is byte-identical. Browser checks covered both choices, excluding the
last-reviewed pack, automatic fallback, cross-tab updates, preserved
state, keyboard focus, and 320/390/1280px layouts.
BLOCKER: None for release preparation.
NEXT_SINGLE_TASK: deploy the scoped commit and verify production.
