# Return from an input preview to the review recap

WORK-ID: AIP-RECAP-RETURN
ACTIVE_WRITER = NONE

Base: c180e7f. Owner approved one practice, a return control for previews
opened from the recap, and deployment. Preserve home, stored practice
state, completion marks, and unrelated work.

Keep the return target in memory. Return focus to the originating recap
link without closing the input, resetting the round, or writing progress.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Isolated Hugo draft and production builds, 219 Node tests,
27 practice packs, and 81 downloads. Production home output matched
the base byte for byte. Playwright checked mouse and keyboard return,
focus restoration, and unchanged progress at mobile and desktop widths.
NEXT_SINGLE_TASK: verify the slide pack and recap return on Pages.
Blocker: none at local QA. Owner approved scoped deployment only.
