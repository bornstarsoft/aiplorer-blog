# Reopen a filtered practice shelf

WORK-ID: AIP-PRACTICE-VIEW-LINKS
ACTIVE_WRITER = NONE

Base: a41af4f. Owner approved the scoped improvement and production deployment.
Practice topic and progress filter modes can be bookmarked or copied from the
shelf. A shared link contains only those modes and the filter anchor, never
completed pack IDs, saved next steps, notes, or other query parameters.
The receiving browser applies its own completion marks. Direct practice
links and the existing resume flow remain usable. Home is out of scope.

Last AI: Codex. Implementation and local QA: DONE on main, based on a41af4f.
All 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds; 257 Node tests; unchanged home,
Change Watch feed, and sitemap; 291 legacy post URLs and eight protected
drafts. Browser checks covered clipboard, reload, back navigation, direct
pack links, recipient-local progress, mobile widths, and blocked storage.
NEXT_SINGLE_TASK: verify the approved scoped deployment on the custom domain.
Blocker: none at local QA.
