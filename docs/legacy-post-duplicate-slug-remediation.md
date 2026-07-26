# Legacy Post Duplicate Slug Remediation

Date: 2026-07-26

## Decision

The two older duplicate source files are excluded from Hugo builds with the
supported `ignoreFiles` site setting:

- `content/posts/2025-08-03-ai-215019.md`
- `content/posts/2025-08-10-ai-212051.md`

The files remain unchanged in the repository. No legacy post was edited,
deleted, moved, or assigned a new public URL.

## Canonical Owners

The existing public URLs now have one deterministic source owner each:

- `/posts/the-benefits-of-brain-training-through-mobile-games/`
  uses `content/posts/2025-08-24-ai-201918.md`.
- `/posts/the-power-of-brain-training-through-mobile-games/`
  uses `content/posts/2025-08-16-ai-211803.md`.

These owners match the live pages and sitemap `lastmod` values recorded before
the remediation.

## Expected Output

- Hugo sees 291 production legacy post pages and 291 unique post slugs.
- The `/posts/` archive contains 291 summaries.
- `/posts/index.xml` contains 291 items with one link and GUID per public post.
- The sitemap contains 291 post URLs.
- Repeated clean builds produce stable hashes for both affected routes.
- Draft AI tool exposure remains unchanged.

The exclusion uses the documented Hugo `ignoreFiles` configuration setting,
which matches regular expressions against absolute content file paths:
https://gohugo.io/configuration/all/#ignorefiles

## Recurrence Prevention

Run the production post URL validator before publication:

```bash
node scripts/validate-production-post-urls.mjs
```

The validator reads `hugo list published`, filters the production `posts`
section, and fails when multiple source pages resolve to the same output path.
Because Hugo supplies the page graph, the check respects draft, future,
expired, and `ignoreFiles` behavior without reparsing legacy front matter.
