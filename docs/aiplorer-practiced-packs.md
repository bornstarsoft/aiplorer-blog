# Practiced packs

WORK-ID: AIP-PRACTICED-PACKS
ACTIVE_WRITER = NONE
Last AI: CODEX. Implementation and local verification: DONE.

Base: 33a5534. Owner approved a new practice pack, a return-visit
improvement and deployment. Preserve all 28 unrelated working changes.

Add a fictional redaction practice pack and an optional practiced checkbox
on each shelf entry. Store only known pack IDs, separately from saved next
steps. Do not change home, save results, or treat marks as tool approval.

QA: PASS. Isolated Hugo production and draft builds, 179 Node tests, ten
practice packs, 30 downloads, and 291 preserved post URLs. Home output is
byte-for-byte unchanged. Browser checks covered keyboard toggling, revisits,
cross-tab refresh, clearing marks, preserved resume/download links, and
320/390/1280px widths. Eight protected drafts remain excluded.
BLOCKER: None for release preparation.
NEXT_SINGLE_TASK: deploy the scoped commit and verify production.
