# Keep the Change Watch catch-up session moving

WORK-ID: AIP-CHANGE-WATCH-CATCHUP
ACTIVE_WRITER = NONE

Base: 79c3d02. Owner approved an improvement and scoped deployment.
Keep home, announcement and RSS data, and unrelated WIP unchanged.

Advance only from an active reading entry hidden by its Read action.
Do not wrap. Distinguish a fully read view from a view with no matching
announcements. Showing read records changes only the unread filter.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Hugo draft and production builds, 240 Node tests, 61
announcement and RSS records, and unchanged home HTML. Playwright
verified filtered continuation, catch-up focus, history, and mobile fit.
NEXT_SINGLE_TASK: verify this scoped deployment on Cloudflare Pages.
Blocker: none at local QA. Owner approved scoped production deployment.
