# Public Structure QA

Date: 2026-06-01

Phase 4A checks the current Aiplorer public MVP structure and internal links.

## Current Public MVP Page Map

- `/`
- `/ai-tools/`
- `/ai-tools/tools/`
- `/ai-tools/tools/chatgpt/`
- `/ai-tools/tools/claude/`
- `/ai-tools/tools/gemini/`
- `/guides/`
- `/guides/how-to-choose-the-right-ai-tool/`
- `/use-cases/`
- `/use-cases/how-to-use-ai-to-write-better-emails/`
- `/use-cases/how-to-summarize-long-documents-with-ai/`
- `/blog/`

## Internal Linking Expectations

- The homepage links to AI Tools, Guides, Use Cases, and Blog.
- The reviewed tools index links to the first guide for users who need help
  choosing a tool.
- Published tool pages link back to the reviewed tools index and the first
  guide through the tool detail layout.
- The first guide links to the reviewed tools index and the two published use
  cases.
- Each published use case links to the reviewed tools index and the first guide.
- Use-case pages may cross-link to each other when the workflow connection is
  practical and natural.

## Draft Exposure Rules

- Draft pages may exist for editorial workflow validation.
- Draft pages should not appear in normal production builds.
- Draft routes should not be linked from public landing pages until manually
  reviewed and published.
- Generated `public/` output must not be staged.

## Known Legacy Warning

`hugo` currently reports a raw HTML warning for one legacy post:

```txt
content/posts/2025-11-07-ai-233254.md
```

The warning is known and was not changed in this phase because legacy post
content and `/posts/<slug>/` URLs are being preserved.

## Next Recommended Expansion Path

- Add a small number of manually reviewed guide or use-case pages.
- Keep each new page linked from the most relevant landing page only after
  review.
- Continue using cautious wording for pricing, plans, model access, features,
  availability, and sensitive use cases.
- Avoid fake ratings, fake rankings, unsupported "best" claims, affiliate links,
  ads, login, database features, and JavaScript-heavy search.
