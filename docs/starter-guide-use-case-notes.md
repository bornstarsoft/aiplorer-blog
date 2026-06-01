# Starter Guide And Use Case Notes

Date: 2026-06-01

Phase 3A adds three draft validation pages:

- `content/guides/how-to-choose-the-right-ai-tool.md`
- `content/use-cases/how-to-use-ai-to-write-better-emails.md`
- `content/use-cases/how-to-summarize-long-documents-with-ai.md`

These pages are intentionally draft-only:

```yaml
draft: true
reviewStatus: "draft"
lastReviewed: ""
```

## Review Requirements

Before publication:

- Review all internal links.
- Confirm the page does not imply exact pricing, model access, plan limits, app
  availability, or feature availability.
- Keep tool-specific language cautious.
- Link only to reviewed public tool pages or broader Aiplorer categories.
- Confirm the page is original, beginner-friendly, and practical.
- Confirm no fake rankings, fake ratings, or unsupported "best" claims are
  present.
- Set `lastReviewed` to the actual review date.
- Set `reviewStatus: "reviewed"` only after manual review.
- Run `hugo` and preview the route.

## Quality Bar

These starter pages should establish the writing quality bar for future guides
and use cases: practical steps, clear caveats, cautious tool language, and
links to reviewed Aiplorer resources.

Future additions should happen in small manually reviewed batches, not bulk
content drops.
