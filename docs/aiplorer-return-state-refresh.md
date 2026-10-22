# Return-State Refresh

ACTIVE_WRITER = NONE

## Scope

- Refresh existing saved counts, home resume state, candidate stages, notes and test dates on browser return.
- Handle another tab clearing local storage without stale saved indicators.
- Reuse the existing renderer; do not create home sections, storage keys or background requests.
- Preserve active note input and failed-save drafts; do not mark announcements read or complete checks.
- Add a fictional missing-field extraction exercise and link from the existing retest example.
- Exclude 28 pre-existing owner WIP files and all unpublished tools.
- Deployment uses the owner's explicit GitHub exception for web projects, through existing Cloudflare integration.

LAST_AI: CODEX (AIP-RETURN-STATE).
DONE: return-state refresh and missing-field extraction exercise, with a contextual retest link.
HEAD/WIP: based on da28f53; seven intended files; 28 owner WIP files excluded.
QA PASS: 103 Node tests; draft and clean minified production builds; shortlist,
reading navigation, 291 legacy post URLs, change/reset validators, XML parsing,
new article/link/sitemap and eight draft exclusions. Browser checks covered home
saved counts, comparison stages/test dates, back navigation and cross-tab clear,
with no JavaScript errors. Home and article checked at 1280, 390 and 320px.
The legacy home-evaluation renderer is covered by unit tests; the current home
does not include that panel and no new home panel was added.
The wide expected-output table was replaced with per-record lists after mobile QA.
Existing raw-HTML warning in the untouched 2025-11-07 legacy post remains.
NEXT_SINGLE_TASK: verify the committed script, article and protected draft routes on production.
BLOCKER: none. Owner approved implementation, validation and deployment.
