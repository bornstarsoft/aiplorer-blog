# Review two AI tools for editing existing video

WORK-ID: AIP-VIDEO-EDIT-TOOLS
ACTIVE_WRITER = NONE

Base: 992392e. Owner approved scoped tool discovery and production deployment.
Use the existing Video Tools category. Preserve the home structure,
legacy URLs, draft status, reset history, and unrelated working changes.

Official sources checked on 2026-11-19:

- CapCut: [product](https://www.capcut.com/),
  [caption generation and editing](https://www.capcut.com/help/how-to-recognise-subtitles),
  [pricing](https://www.capcut.com/pricing), and
  [US privacy policy](https://www.capcut.com/clause/privacy-policy).
- DaVinci Resolve Studio: [product and purchase information](https://www.blackmagicdesign.com/products/davinciresolve/studio),
  [editing features](https://www.blackmagicdesign.com/products/davinciresolve/edit),
  [transcription workflow release note](https://www.blackmagicdesign.com/media/partial/release/20240412-03),
  and [privacy](https://www.blackmagicdesign.com/privacy).

CapCut covers checking caption wording, timing, and readability. DaVinci
Resolve Studio covers reviewing a transcript-based cut against the original
recording. Neither profile assumes entitlement, commercial rights, or
accuracy. No accounts, paid features, or vendor outputs were tested.

Last AI: Codex. Implementation and local QA: DONE on main, based on 992392e.
All 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds, 257 Node tests, 291 existing
post URLs, and eight protected drafts. Both pages appear in Video Tools,
the reviewed directory, shortlist, comparison, and sitemap. Browser checks
covered Korean search, mobile layout, official and practice links, and
saving. Home keeps its existing layout; only two cards and counts changed.
Reset history is unchanged.
NEXT_SINGLE_TASK: verify the scoped deployment on the custom domain.
Blocker: none at local QA.
