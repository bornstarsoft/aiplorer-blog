# Practice Input Preview

ACTIVE_WRITER = NONE

Base HEAD: 642fdfb. Owner approves implementation and production deployment.
Preserve all 28 unrelated owner WIP files, homepage, tool claims, protected
drafts, legacy posts and all fifteen existing practice files.

Add optional native input-only previews to the practice shelf. Explicit
front matter selects an existing downloadable input. Keep previews collapsed,
escape the text, retain downloads, and do not inline answer keys or worksheets.
No new scripts, storage, page or account requirements.

## Validation and handoff

Last AI: CODEX. DONE: five input previews with explicit resource selection,
native collapsed disclosures, labelled keyboard-scrollable text, scoped CSS
and regression checks. Eleven intended files only. No download bytes changed.

QA PASS: isolated production (1470 pages), draft (1478 pages) and restored
production builds; 150 Node tests; practice downloads, article index,
retest-choice, all five practice packs and 291 legacy post URL checks.
Eight protected drafts remain excluded. The existing legacy raw-HTML warning
was not changed.

Browser QA PASS: all five previews exactly match their downloaded inputs;
keyboard open/close and scrolling work; no page overflow at 320/390/1280
pixels, including with all previews open. JavaScript-disabled navigation
and an actual download passed. Final mobile and desktop screenshots inspected.
A temporary isolated input containing an HTML tag was escaped as text; the
fixture was removed and production output rebuilt and revalidated.

Base HEAD: 642fdfb; intended changes await this commit. Preserve all 28 owner
WIP files. Deployment: NOT_RUN at commit preparation.
NEXT_SINGLE_TASK: deploy this validated commit and verify live previews.
BLOCKER: none. Owner approval includes commit and production deployment.
