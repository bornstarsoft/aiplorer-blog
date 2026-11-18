# Recently added practice packs

WORK-ID: AIP-RECENT-PRACTICE
ACTIVE_WRITER = NONE

Base: 2b9c249. Owner approved a new practice, a return-visit improvement,
and deployment. Keep the home page and stored practice progress unchanged.

Keep the three most recent practice slugs, newest first, in
`data/recent_practice.json`. The practice shelf only renders links for
published, reviewed packs it already contains. Rotate the list when
publishing a new pack; a wording edit does not make a pack new.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Isolated Hugo draft and production builds, 223 Node tests,
33 practice packs, and 99 downloads. Production home HTML matched the
base byte for byte. Playwright verified recent links and preserved
resume and completion state at mobile and desktop widths.
NEXT_SINGLE_TASK: verify the scoped release on Cloudflare Pages.
Blocker: none at local QA. Owner approved deployment of this change only.
