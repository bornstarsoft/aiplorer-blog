# Clean explorer layout

Local implementation, 2026-09-12. No commit, push, or deployment in this phase.

## Direction

The user requested a cleaner, more organized experience like Hugging Face
Spaces. Its live directory was inspected for visual reference. This change
uses its compact navigation and directory-first hierarchy as inspiration,
not its branding, rankings, popularity metrics, thumbnails, or content.

## Changes

- Homepage and `/ai-tools/tools/` share `aiplorer-explorer.html`. Reviewed,
  non-draft pages remain the single source of tool data.
- Homepage starts with usable search and the directory instead of stacked
  promotional, review-checkpoint, and discovery sections. A compact reset
  elapsed-time link and announcement link remain near the top.
- Desktop categories form a sidebar; on mobile they become a horizontal row.
  The native category selector remains available at every screen size.
- Tool cards keep the name, full reviewed description, date, and save action.
  Repeated status labels and task examples are removed from this surface;
  full review details are unchanged on individual tool pages.
- Existing query/category/saved URL parameters, card/compact preference,
  browser-local shortlist, and empty-state reset continue to work.
- Category selection now has an explicit current state and does not jump the
  explorer away from its search controls.
- Shared navigation is white with restrained borders. Existing reading sizes,
  URLs, source claims, review dates, and protected drafts are preserved.
- The three decision guides remain linked below the home directory, while
  workflows, comparison, and decision help remain available through navigation.

## Verification

- Home and directory each contain exactly 65 reviewed tool cards in production.
- Production, draft, and restored minified production builds pass.
- Seven representative paths at 390px, 768px, and 1440px: no document-width
  overflow in 21 checks. Desktop and mobile layouts visually inspected.
- Cursor search returns one tool; Coding category returns five; save/remove,
  card/compact switching, empty results, and Clear filters work in the browser.
- Eight draft tools remain absent from production routes and sitemap.
- Existing validators pass: 291 post URLs, 52 reset records, three Change Watch
  records and RSS. Existing legacy raw-HTML warning remains unchanged.

Preview is available on port 1316. Earlier preview servers were left intact;
they may retain older page or stylesheet responses. All repository changes
from preceding work are still uncommitted, and no generated output was staged.

## Navigation and editorial alignment

Follow-up local implementation on 2026-09-12:

- The primary AI Tools menu now opens `/ai-tools/tools/` directly.
- `/ai-tools/` remains available as a compact category overview with ten
  existing categories, dynamic reviewed counts, and resource links.
- The subnavigation uses Categories, All tools, Help me choose, and Updates
  labels while preserving the existing destinations.
- Guides and Use Cases now start with a compact title, article count, and
  content lists. Redundant introductory paragraphs and oversized header
  elements were removed; article links and section anchors remain intact.
- Category and editorial cards use restrained borders and tighter typography.
  No tool claims, review dates, draft statuses, reset records, or post routes
  were changed in this follow-up.
- Five paths at 390px, 768px, and 1440px passed document-width overflow checks.
  Category and guide desktop views and category/use-case mobile views were
  visually inspected. Primary navigation to All tools and then Categories
  was exercised in the browser.
- Production and draft builds pass, with minified production output restored.
  All eight drafts remain excluded. Existing change-feed, reset-history, and
  post-route validators and `git diff --check` pass.

Implementation remains local and uncommitted. No release or deployment was
performed. The existing legacy raw-HTML warning is unchanged.

## Usability audit follow-up

Implementation and validation on 2026-09-12; no release or deployment.

- Attach the saved-only filter listener even when the initial shortlist is
  empty. The first saved item can now be filtered immediately. Removing the
  final item restores the full result set and clears the saved URL parameter.
- Category headings report filtered matches against the category total, such
  as `Coding Tools 1 of 5`. Clearing filters restores the full category count.
  Sidebar counts continue to describe the complete directory.
- Search comes directly after the title on home and the reviewed index.
  At 390px, the home search input starts at about 220px instead of 486px.
- Directory save buttons have 44px targets. The results toolbar wraps when
  saved-only status needs more space on narrow screens.
- The home reset strip displays the manual source-check date from the existing
  snapshot, explicitly in UTC. The elapsed clock remains tied to the latest
  recorded announcement, not a new reset observation or an automated check.
- Tool detail pages put all existing example tasks and limitations before the
  long-form review. A duplicate category action and review metadata block were
  removed. The full review, pricing note, sources, and related links remain.
- Additional use cases and potential advantages use native expandable details;
  cautions remain visible. Review dates are unchanged, and draft-build pages
  now say `Draft / pending review` instead of implying reviewed publication.

Validation:

- `node --test scripts/test-tool-finder.mjs`: six regression cases pass. Covers
  first-save filtering, last-item removal, matching category counts, combined
  filters, empty-state reset, saved URL restoration, cross-tab storage changes,
  unavailable storage, and view preference persistence.
- Real-browser interactions pass for first save, saved-only selection, final
  removal, category/query matching, empty-state reset, and keyboard Enter/Space
  expansion of additional detail notes. Test bookmarks were removed afterward.
- Home, reviewed index, and Cursor detail passed 12 document-width checks at
  320px, 390px, 768px, and 1440px. Desktop and mobile layouts visually inspected;
  320px saved-only mode has no overflow and a measured 44px save button.
- Production, draft, and restored minified production builds pass. Home/index
  retain 65 reviewed cards and ten category counts. Eight drafts render only
  in the draft build, remain out of reviewed cards even there, and are absent
  from restored production routes and sitemap.
- Change Watch, reset-history, post-URL validators, and `git diff --check` pass.
  The pre-existing raw-HTML warning in a legacy post is unchanged.

Only presentation, finder behavior, tests, and these notes changed in this
follow-up. Existing individual tool markdown, reset records, draft statuses,
and legacy posts were not edited. Earlier uncommitted work remains intact.

## Saved tools workspace follow-up

Local implementation and validation, 2026-09-12. No commit or deployment.

- `/ai-tools/shortlist/` now leads with saved tools. The compact header keeps
  the browser-only storage context and shows the saved comparison action only
  when the list has items. The empty state links directly to the directory.
- Stage and local test-date filters are in a native disclosure above the list.
  Active conditions remain visible when collapsed, along with a matching/total
  result count. Clearing filters does not remove saved tools or evaluation data.
- Progress, backup/restore, and privacy notes are native disclosures below the
  list. Existing evaluation, next-check focus, downloads, and restore controls
  retain their original handlers and storage keys. Full privacy notes remain.
- Saved cards retain complete descriptions and show the first reviewed task
  and caution without line clipping. Two desktop columns allow more reading
  room; mobile uses one column. Button targets are at least 44px high.
- No tool claims, review dates, reset data, draft flags, or legacy posts changed.

Verification:

- At 390px, the first saved card moved from about 3032px to 565px from the top;
  the empty state moved from about 2203px to 423px after layout settled.
- Sixteen width checks passed at 320px, 390px, 768px, and 1440px across saved,
  expanded filter, expanded evaluation, and empty states. Mobile and desktop
  layouts were visually inspected.
- A temporary two-tool list correctly opened only those two tools in comparison.
  Stage, checklist, note, and test date persisted after reload. The next-check
  action expanded the correct card and focused its unfinished checkbox.
- Combined filters produced a clear zero-result state; the reset restored all
  saved cards without losing evaluation data. Download controls enabled with
  items present; restore remained accessible when empty. Import/export handlers
  were not changed, and no backup file was imported during this check.
- Test bookmarks and their evaluation data were removed after verification.
- `node scripts/validate-shortlist.mjs` checks the generated shortlist against
  the reviewed directory and protects control hooks and content order.
- Finder regression tests, production/draft/restored production builds, and
  existing change-feed, reset-history, and post-URL checks pass. All eight
  drafts remain excluded from production output and sitemap.

Next review area: simplify the comparison page's introductory and management
sections while preserving its actual comparison rows and cautious wording.
