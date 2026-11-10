# Preview the previous reviewed input

WORK-ID: AIP-PREVIOUS-RECAP-PREVIEW
ACTIVE_WRITER = NONE

Base: 2b3ad5b. Owner approved one practice, backward navigation
between completed-round previews, and deployment. Preserve home,
saved practice state, completion marks, and unrelated work.

Previous and next follow completion order without wrapping.
They open only the target input and keep return focus on the
current recap entry, without writing progress.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Isolated Hugo draft and production builds, 220 Node tests,
29 practice packs, and 87 downloads. Home output matched the base
byte for byte. Playwright verified both directions, boundary controls,
return focus, responsive spacing, and unchanged progress.
NEXT_SINGLE_TASK: verify the prompt pack and previous preview on Pages.
Blocker: none at local QA. Owner approved scoped deployment only.
