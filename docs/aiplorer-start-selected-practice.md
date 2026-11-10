# Start a selected practice

WORK-ID: AIP-START-PRACTICE
ACTIVE_WRITER = NONE
Last AI: CODEX. Implementation and local verification: DONE.

Base: 410f98a. Owner approved a new practice pack, start without saving,
and deployment. Preserve home, resume, and the 28 unrelated changes.

The chooser can open the selected pack's input preview without writing
any practice state or starting a download. Add a fictional tool comparison
review with a separate input, key and worksheet.

QA: PASS. Isolated Hugo production and draft builds, 199 Node tests, 15
practice packs, 45 downloads and 291 preserved post routes. Home HTML is
byte-identical. Browser checks covered keyboard start, filtered destinations,
unchanged resume/next pack/marks, no downloads, and 320/390/1280px layouts.
BLOCKER: None for release preparation.
NEXT_SINGLE_TASK: deploy the scoped commit and verify production.
