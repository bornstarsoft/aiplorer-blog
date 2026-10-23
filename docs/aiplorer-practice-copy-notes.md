# Practice input copy

WORK-ID: AIP-PRACTICE-COPY
ACTIVE_WRITER = NONE

## Scope

- Add explicit input-only copying to the five existing practice previews.
- Keep downloads, review keys, worksheets, home, tool data and drafts unchanged.
- Use the Clipboard API only on a user click in a supported secure context.
- No clipboard reading, private-note access, storage changes or automatic copying.
- Preserve the 28 existing owner WIP files; validate an isolated release snapshot.

## Validation

Last AI: CODEX. DONE: implementation and local QA. Base HEAD: 4bad104.
QA PASS:

- Isolated production / draft / restored production builds: 1470 / 1478 / 1470 pages.
- 156 Node tests, including exact copying, pending isolation, rejection, retry and unavailable clipboard behavior.
- Practice downloads, article indexes, next-check links, all five pack validators and 291 legacy post URL checks.
- Real browser: all five inputs copied exactly; keyboard summary-to-button navigation; 1280px, 390px and 320px without horizontal overflow.
- JavaScript disabled: native preview and download work; copy controls stay hidden. Permission rejection: honest error, enabled retry, no mobile overflow.
- Fifteen download files unchanged; eight protected draft routes excluded from production and sitemap.
- Home has no new controls or clipboard script; script loads only on the use-cases hub.

Existing raw HTML warning in the legacy 2025-11-07 post is unchanged.
Owner WIP: 28 files preserved and excluded from the release snapshot.
Approval: Owner requested a useful return-visit improvement, validation and live deployment. GitHub is the approved web-project host.
BLOCKER: none at local validation.
NEXT_SINGLE_TASK: commit only this task, push to main, then verify the exact commit's Cloudflare Pages check and live copy/download behavior.
