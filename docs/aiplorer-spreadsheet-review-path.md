# Connect three checks for spreadsheet handoff

WORK-ID: AIP-SPREADSHEET-REVIEW-PATH
ACTIVE_WRITER = NONE

Base: ec54bbb. Owner approved a new use case and scoped production
deployment. Keep the homepage, practice records, and unrelated WIP unchanged.

Connect the field-definition, CSV merge, and formula packs in dependency
order. Provide a reusable handoff checklist and a jump to the existing
practice paths from the top of Use Cases.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Hugo draft and production builds, 234 Node tests, practice
path links, exact download, stable canonicals and posts, and unchanged home.
Playwright verified the keyboard jump, all three exercises, the download,
and article layout at 320, 390, and 1280 pixels.
NEXT_SINGLE_TASK: verify this scoped change on Cloudflare Pages.
Blocker: none at local QA. Owner approved scoped production deployment.
