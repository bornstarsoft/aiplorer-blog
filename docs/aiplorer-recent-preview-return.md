# Return from a recent input preview

WORK-ID: AIP-RECENT-PREVIEW-RETURN
ACTIVE_WRITER = NONE

Base: f50a342. Owner approved one new practice and a return action for
inputs opened from Recently added. Keep home, resume, and progress intact.

Keep the return target in memory only. Restore focus to the preview
button, or the same title link if the button is no longer available.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Isolated Hugo draft and production builds, 227 Node tests,
36 packs, and 108 downloads. Home HTML remained byte-identical.
Playwright verified recent-only return, exact focus and title fallback,
responsive fit, and unchanged storage.
NEXT_SINGLE_TASK: verify the scoped release on Cloudflare Pages.
Blocker: none at local QA. Owner approved deployment of this change only.
