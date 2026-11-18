# Browse practice packs by topic

WORK-ID: AIP-PRACTICE-TOPIC-FILTER
ACTIVE_WRITER = NONE

Base: 69df21e. Owner approved one scoped improvement and production deployment.
The topic filter uses the existing practice chooser groups and combines with
progress status. It changes only the visible packs and their jump links, never
the saved practice, completion marks, or review round. Topic browsing still
works when browser storage is unavailable. Home and legacy post paths are
out of scope.

Last AI: Codex. Implementation and local QA: DONE on main, based on 69df21e.
All 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds, 253 Node tests, 41 practice
packs and 123 downloads, 291 legacy post URLs, eight protected drafts,
and unchanged home and Change Watch feed. The browser verified combined
filters, narrow screens, resume and direct links, and blocked storage.
NEXT_SINGLE_TASK: verify the approved scoped deployment on the custom domain.
Blocker: none at local QA.
