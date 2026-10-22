# Private Notes In Decision Briefs

ACTIVE_WRITER = NONE

## Scope

- Keep home unchanged. Default readable decision briefs to excluding private notes.
- Allow explicit per-download note inclusion; clear the option on return and successful download.
- Preserve JSON backup content, saved data, checks, dates, read state and filters.
- State that the brief still includes all saved candidates and their evaluation metadata.
- Add a guide distinguishing a decision brief from a private restore backup.
- Isolate the 28 existing owner WIP files; deploy only this work via the approved GitHub/Cloudflare web workflow.

## Validation And Handoff

- LAST_AI: CODEX; WORK_ID: AIP-BRIEF-PRIVACY; implementation DONE.
- Base HEAD: ee0bdb8 on main. The 28 pre-existing owner WIP files are unchanged and excluded.
- QA PASS: 120 Node regression tests, including eight brief privacy/export cases.
- QA PASS: isolated Hugo draft build followed by clean minified production build.
- QA PASS: shortlist, reading navigation, 291 legacy post URLs, change-watch and reset-history validators; sitemap/RSS XML parsing.
- QA PASS: all eight existing draft tool routes remain absent from production files and sitemap; new guide is included.
- QA PASS: real Chromium downloads omit notes by default, include them only on explicit selection, then omit them again; private JSON backup preserves notes.
- QA PASS: download failure cleanup and no stored-state mutation covered by regression tests; return clears the transient checkbox.
- QA PASS: desktop 1280px and mobile 390px/320px screenshots inspected, no horizontal overflow; guide links return 200.
- Existing legacy-post raw-HTML warning remains unchanged; no legacy content edited.
- Owner approval: implement, validate and deploy this improvement; existing web GitHub/Cloudflare exception applies.
- NEXT_SINGLE_TASK: push this exact change set, then verify Cloudflare deployment and live shortlist/guide behavior.
- BLOCKER: none. Production verification pending at commit time.
