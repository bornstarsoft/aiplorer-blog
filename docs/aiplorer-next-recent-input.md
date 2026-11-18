# Open the next unpracticed recent input

WORK-ID: AIP-NEXT-RECENT-INPUT
ACTIVE_WRITER = NONE

Base: c2a9282. Owner approved one new practice and forward navigation
between unpracticed recent inputs. Preserve home, resume, and progress.

Follow recent-list order, skip completed packs, and stop at the end.
Keep navigation and return focus in memory only.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Isolated Hugo draft and production builds, 229 Node tests,
37 packs, and 111 downloads. Home HTML remained byte-identical.
Playwright verified completed-pack skipping, keyboard focus, end of
list, responsive fit, return to the destination, and unchanged storage.
NEXT_SINGLE_TASK: verify the scoped release on Cloudflare Pages.
Blocker: none at local QA. Owner approved deployment of this change only.
