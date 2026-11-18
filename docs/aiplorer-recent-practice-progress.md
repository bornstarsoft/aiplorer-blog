# Show progress for recently added practice packs

WORK-ID: AIP-RECENT-PRACTICE-PROGRESS
ACTIVE_WRITER = NONE

Base: fe47d8c. Owner approved one new practice and scoped production
deployment. Do not change the homepage or existing progress records.

Read completion marks already stored by the shelf. If all recent packs
are practiced and older unpracticed packs remain, offer a shortcut to
the existing new-practice chooser. The shortcut never starts a pack.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Hugo draft and production builds, 232 Node tests, 40 packs,
120 downloads, and unchanged home HTML. Playwright confirmed progress,
revisit state, keyboard focus, and unchanged records at 320/390/1280px.
NEXT_SINGLE_TASK: verify the scoped change on Cloudflare Pages.
Blocker: none at local QA. Owner approved scoped production deployment.
