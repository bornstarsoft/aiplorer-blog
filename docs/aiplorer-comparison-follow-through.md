# Comparison Follow-Through

ACTIVE_WRITER = NONE

## Scope

- Keep the home page unchanged.
- Count private checklist progress only for saved candidates in the visible comparison scope.
- Match category counts to saved-only or all-reviewed mode; label the all-saved testing link explicitly.
- Open a saved candidate's own evaluation note from its comparison row.
- Refresh comparison checks on browser return without modifying private data.
- Add a fictional example about conflicting results in a same-task comparison.
- Preserve unrelated owner WIP, draft exclusions and legacy post URLs.
- GitHub/Cloudflare deployment follows the owner's explicit web-project exception.

## Validation

LAST_AI: CODEX (AIP-COMPARE-FOLLOW-THROUGH).
DONE: scoped counts, note handoff, return refresh and fictional comparison example.
HEAD/WIP: based on c771bde; seven scoped files; 28 pre-existing owner WIP files excluded.
QA PASS: 96 Node tests; Hugo draft and clean minified production builds; shortlist,
reading navigation, 291 legacy post URLs, 61 change records, 64 reset records;
XML parsing and eight draft exclusions. Browser checks covered the exact note
handoff and focus, return refresh, category counts, 1280/390/320px layouts and
the new article, with no JavaScript errors. The comparison lastmod includes
the local UTC offset to prevent an early-KST build from treating it as future content.
Existing raw-HTML warning in the untouched 2025-11-07 legacy post remains.
NEXT_SINGLE_TASK: verify this commit on production after the approved GitHub push.
BLOCKER: none. Owner approved implementation, validation and production deployment.
