# Aiplorer readability pass

Phase: local implementation and validation, 2026-09-12. Not deployed.

## What made the pages difficult to read

Fresh browser screenshots covered the homepage, tool directory, Cursor review,
repository-work guide, and reset history before changes. The main issues were:

1. Homepage: very heavy headings and small dates competed with the main task.
2. Directory: five introductory paragraphs delayed the search form. On a
   1440px-wide screen it started near y=850. Descriptions and example tasks
   were clipped in cards.
3. Tool review: small sidebar text required more effort than the main article.
4. Guide: a large title, navigation buttons, and a repeated warning box pushed
   reading down the page. The table of contents was particularly small.
5. Reset history: small dates and labels weakened otherwise useful elapsed-time
   and history information. The actual record data did not need changing.

## Changes

- Retain the site's colors, icons, routes, and interactions, using a system sans
  font in the discovery UI instead of the heavier Avenir presentation.
- Raise sub-14px rem-based declarations in the shared discovery stylesheet to
  14px; reduce 800-weight declarations to 700. Scope the new reading defaults
  to Aiplorer discovery components, not legacy article bodies.
- Use 17px main reading text, 1.8 line height, and a maximum 68ch reading width
  for guides, tool reviews, and category prose. Keep headings smaller than the
  homepage headline and labels in normal case where possible.
- Shorten the directory introduction to two short paragraphs. Replace three
  large navigation buttons with text links. Preserve the manual-review and
  changing-prices caveats.
- Show full tool-card descriptions and example tasks rather than line clamps.
- Replace the vague "May fit" label with "Example task".
- Put guide reading ahead of outbound navigation: remove duplicated hero
  buttons, retain next-step links below/in the article rail, and make the
  pre-sharing warning an unframed note.
- Darken the primary button fill for white-text contrast.
- Preserve existing Change Watch work from the preceding implementation.

## Validation

- Hugo production build, draft build, and restored minified production build pass.
- 15 discovery routes at 360px, 768px, and 1440px: all return 200, no document
  or main-shell horizontal overflow in these 45 checks.
- Directory search for Cursor returns one result; Coding Tools returns five;
  card/compact view switching works.
- Production excludes Clipdrop, example-ai-assistant, Julius AI, Obviously AI,
  Polymer, Rows, SciSpace, and Tome from routes and sitemap.
- Existing validators pass: 291 unique legacy post URLs, 52 reset records, and
  three Change Watch records plus RSS.
- Existing legacy-post raw-HTML warning is unchanged; that post was not edited.

Browser captures for this local pass are in `/tmp/aiplorer-before-*.png`,
`/tmp/aiplorer-after-*.png`, and `/tmp/aiplorer-final-*.png`. They are temporary
QA artifacts, not site assets. The fresh preview uses port 1315 because the
older running preview returned stale HTML on some paths.

This is not a full accessibility certification or a rewrite of all 65 tool
reviews. Browser screenshots and interaction checks do not replace keyboard,
screen-reader, or real-reader testing. Existing claims, review dates, draft
flags, reset timestamps, and legacy post content remain unchanged.

## Reading Navigation Follow-Up

Phase: local implementation and validation, 2026-09-12. Preview on port 1316;
no commit, push or deployment in this pass.

- Move the single table of contents from the end-of-article mobile sidebar to
  a native disclosure before the article body. All existing heading anchors
  remain unchanged. No additional JavaScript is needed.
- Add a direct jump to the reviewed tools for the current task, including the
  actual number of related tools. The target heading receives a visible outline.
- Show Hugo's estimated reading time in the article metadata and illustrated
  guide/use-case cards. This is an estimate, not a promise of reading speed.
- Keep the audience statement and full source/privacy review cautions in an
  early, keyboard-operable "Audience and review notes" disclosure. Remove the
  redundant page-type eyebrow and reduce header/reading-navigation spacing.
- Keep existing editorial illustrations. No article claims, dates, images,
  draft flags or source data were changed during this follow-up.
- When all related tools share a category, the comparison link carries that
  category into the existing comparison view. Eleven articles use this handoff.
  Mixed-category articles retain the full comparison view so tools are not hidden.
- Add `scripts/validate-reading-navigation.mjs` to check all 15 articles for
  unique IDs, valid heading anchors, early contents placement, reading-time
  estimates, preserved cautions, reviewed-only related tools and comparison URLs.

### Verification

- At 390px, the repository-work guide's contents control moved from roughly
  y=5125 to y=553; its body starts around y=666 instead of y=850. The final
  summary controls retain a 44px minimum target height.
- All 15 articles at 320px, 768px and 1440px passed 45 browser layout checks:
  no horizontal document overflow, contents before body and usable summary
  target heights. The final stylesheet uses cache key `20260912c`.
- Verified contents activation with Enter, disclosure closing with Enter, a
  section jump, the related-tools jump, and the comparison handoff. The Coding
  Tools comparison shows its five reviewed tools, not all 65 directory entries.
- Visually checked the final mobile article and desktop illustrated guide cards.
- Production, draft, and restored production builds pass. Reading navigation,
  editorial images, all six tool-finder tests, shortlist, Change Watch, reset
  history and legacy post URL validators pass; `git diff --check` passes.
- The eight protected drafts remain absent from production output and sitemap.
  The existing legacy-post raw-HTML warning remains unchanged.
