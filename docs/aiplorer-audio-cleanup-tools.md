# Review two audio cleanup tools

WORK-ID: AIP-AUDIO-CLEANUP-TOOLS
ACTIVE_WRITER = NONE

Base: b1d25ab. Owner approved scoped tool discovery and production deployment.
Use the existing Audio Tools category. Keep the home structure, other work,
legacy URLs, and draft status intact.

Official sources checked on 2026-11-19:

- Krisp: [product](https://krisp.ai/), [pricing](https://krisp.ai/pricing/),
  [virtual devices](https://help.krisp.ai/hc/en-us/articles/4402174576402-How-Krisp-Microphone-and-Krisp-Speaker-work),
  [compatible setup](https://help.krisp.ai/hc/en-us/articles/360017441080-Set-up-any-app-with-Krisp),
  [data handling by mode](https://help.krisp.ai/hc/en-us/articles/360012035500-What-data-Krisp-sends-to-the-cloud)
  and [privacy policy](https://krisp.ai/privacy-policy/).
- Auphonic: [product](https://auphonic.com/),
  [audio algorithms](https://auphonic.com/help/algorithms/),
  [presets](https://auphonic.com/help/web/preset.html),
  [pricing](https://auphonic.com/pricing), [privacy](https://auphonic.com/privacy),
  and [terms](https://auphonic.com/terms_of_service).

Both passed official-source editorial review for narrow workflows.
No accounts were created, audio was not uploaded, and sound quality
was not tested. Avoid exact prices, privacy guarantees, and claims
that all audio modes behave alike.

Last AI: Codex. Implementation and local QA: DONE on main, based on b1d25ab.
The 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds, 257 Node tests, 291 legacy
post URLs and eight protected drafts. Both tools appear in Audio Tools,
the directory, shortlist, compare view, and canonical sitemap. Home differs
only in the two existing-style cards and reviewed counts. Browser checks
covered Korean aliases, mobile layout, official destinations, and saving.
NEXT_SINGLE_TASK: verify the approved deployment on the custom domain.
Blocker: none at local QA.
