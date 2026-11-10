# Preview the next reviewed input

WORK-ID: AIP-NEXT-RECAP-PREVIEW
ACTIVE_WRITER = NONE

Base: 186ada0. Owner approved one practice, navigation between completed
round previews, and deployment. Preserve the home page, resume data,
practice marks, and unrelated work.

Follow the recap completion order without wrapping. Move focus to the
next input summary and keep the return link pointed at the current entry.
Do not start a review or write progress.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Isolated Hugo draft and production builds, 220 Node tests,
28 practice packs, and 84 downloads. Production home output matched
the base byte for byte. Playwright verified next preview, end of list,
return focus, and unchanged progress at mobile and desktop widths.
NEXT_SINGLE_TASK: verify the workflow pack and next preview on Pages.
Blocker: none at local QA. Owner approved scoped deployment only.
