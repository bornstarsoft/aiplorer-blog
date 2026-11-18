# Open the previous unpracticed recent input

WORK-ID: AIP-PREVIOUS-RECENT-INPUT
ACTIVE_WRITER = NONE

Base: fa53ce3. Owner approved one new practice and backward navigation
between unpracticed recent inputs. Preserve home, resume, and progress.

Follow recent-list order in both directions, skip completed packs, and
stop at the boundary. Keep navigation and return focus in memory only.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Isolated Hugo draft and production builds, 230 Node tests,
38 packs, and 114 downloads. Home HTML remained byte-identical.
Playwright verified both directions, completed-pack skipping, keyboard
focus, narrow screens, and unchanged storage and resume link.
NEXT_SINGLE_TASK: verify the scoped release on Cloudflare Pages.
Blocker: none at local QA. Owner approved deployment of this change only.
