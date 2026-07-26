# Blog Legacy Rendering Remediation

Date: 2026-07-26

## Scope

This phase improved the project-level rendering of `/posts/` and individual
legacy posts without editing files under `content/posts/` or changing any
existing `/posts/<slug>/` URL.

## Changes

- Post summary titles now render as H2 headings below the archive page H1.
- Each visible `read more` link has an accessible name that includes its post
  title.
- Post summary title links use the Aiplorer 3px keyboard focus treatment.
- The post section eyebrow is regular text instead of a complementary landmark.
- Post table-of-contents and related content share a named `Post navigation`
  complementary landmark.
- The related content title is an H2 and labels its related-post section.

## Preserved Behavior

- All legacy post source files and public URLs are unchanged.
- The two known duplicate legacy slug pairs remain unchanged.
- The known raw HTML warning remains because resolving it would require a
  legacy source edit.
- Draft AI tool pages remain excluded from production output and the sitemap.
