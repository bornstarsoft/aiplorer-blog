# Show the position in recent input previews

WORK-ID: AIP-RECENT-PREVIEW-POSITION
ACTIVE_WRITER = NONE

Base: ae83971. Owner approved a new practice and a scoped production
deployment. Preserve the home page, saved resume, and completion state.

Show position among unpracticed recent previews only. Use a content-hashed
script URL because the previous query-versioned URL returned an older
script on a Cloudflare cache hit after the HTML had already updated.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Hugo draft and production builds, 231 Node tests, 39 packs,
117 downloads, and exact fingerprint verification. Home is byte-identical.
Playwright verified position, previous and next, return focus, unchanged
browser records, and control fit at 320, 390, and 1280 pixels.
NEXT_SINGLE_TASK: verify the fingerprinted release on Cloudflare Pages.
Blocker: none at local QA. Owner approved scoped production deployment.
