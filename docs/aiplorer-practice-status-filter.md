# Practice status filter

WORK-ID: AIP-PRACTICE-FILTER
ACTIVE_WRITER = NONE
Last AI: CODEX. Implementation and local verification: DONE.

Base: 0584f70. Owner approved a new practice pack, easier browsing by
practice status, and deployment. Keep home and 28 unrelated changes intact.

The shelf view filters existing browser marks without writing a preference
or recording a result. Continue links and pack anchors still reach their
destinations. Add a fictional formula pack with a separate key and worksheet.

QA: PASS. Isolated Hugo production and draft builds, 183 Node tests, 11
practice packs, 33 downloads, and 291 preserved post URLs. The home HTML
is byte-for-byte unchanged. Browser checks covered both filters, empty
results, keyboard focus, cross-tab marks, hidden resume and hash targets,
storage unavailable, and layout at 320/390/1280px. Drafts remain excluded.
BLOCKER: None for release preparation.
NEXT_SINGLE_TASK: deploy the scoped commit and verify production.
