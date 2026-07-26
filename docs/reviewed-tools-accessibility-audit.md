# Aiplorer Reviewed Tools Accessibility Audit

Date: 2026-07-26

This audit checked the shared reviewed-tool template with a real browser at
desktop and mobile sizes, then applied small shared fixes. It did not change
tool claims, categories, review dates, publication status, routes, or legacy
posts.

## Scope

The representative route was:

`/ai-tools/tools/github-copilot/`

The shared template serves all 65 reviewed tool pages, so template-level
findings apply consistently across the reviewed set. Checks covered:

- banner, navigation, main, article, complementary, and footer landmarks
- heading order and primary heading count
- link names and external-link context
- desktop layout at 1440 by 1000 CSS pixels
- mobile layout at 390 by 844 CSS pixels
- horizontal overflow and minimum main-content text size
- representative foreground and background color contrast
- production and draft rendering behavior

## Baseline Result

The page already had:

- one main landmark
- one article
- one level-one heading
- three ordered level-two content headings
- named footer navigation
- no horizontal overflow at either tested viewport
- a mobile main-content width of 358 CSS pixels within a 390-pixel viewport
- a minimum main-content text size of 16 CSS pixels
- passing representative text contrast, from 6.78:1 to 19.09:1 for primary
  content and 8.98:1 to 14.25:1 for the sampled facts and footer links

## Findings And Fixes

### Skip Navigation

The shared base template did not provide a keyboard skip link. A
`Skip to main content` link now targets the stable `main-content` landmark and
becomes visible when focused.

### Landmark Naming

The visual `AI Tool` eyebrow used an `aside`, which exposed an unnecessary
unnamed complementary landmark. It now uses a paragraph.

The tool facts sidebar remains a complementary landmark and now has the
accessible name `Tool details`.

The header and footer both expose navigation landmarks. The footer already had
a name, and the header navigation now has the distinct accessible name
`Primary`.

### Link Context And Focus

The generic `Official website` text now includes the tool title, and hidden
assistive text announces that the destination opens in a new tab.

Links now receive a high-visibility focus indicator that remains discernible
against both light and dark page regions.

## Responsive Result

The desktop and mobile checks found no horizontal overflow. The content and
facts sidebar stack correctly on mobile, and the existing desktop two-column
layout remains unchanged.

## Build And Draft Policy

The fixes are shared presentation and semantic improvements only. Production
output must continue to include all 65 reviewed tool pages and exclude
SciSpace, Tome, Clipdrop, Julius AI, Rows, Obviously AI, Polymer, and Example
AI Assistant. Draft builds must continue to render those eight drafts for
internal review.

## Follow-Up

Repeat a browser accessibility check after changing the base template, site
navigation, reviewed-tool layout, shared link styles, or major responsive
breakpoints. A dedicated automated WCAG scanner can be added later only through
an approved, repository-supported dependency workflow.
