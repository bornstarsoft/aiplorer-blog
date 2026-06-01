# Starter Guide And Use Case Notes

Date: 2026-06-01

Phase 3A adds three draft validation pages:

- `content/guides/how-to-choose-the-right-ai-tool.md`
- `content/use-cases/how-to-use-ai-to-write-better-emails.md`
- `content/use-cases/how-to-summarize-long-documents-with-ai.md`

Phase 3B reviewed and published the first guide:

```yaml
content/guides/how-to-choose-the-right-ai-tool.md
draft: false
reviewStatus: "reviewed"
lastReviewed: "2026-06-01"
```

The two use-case pages remain intentionally draft-only:

```yaml
draft: true
reviewStatus: "draft"
lastReviewed: ""
```

## Guide Review Result

`How to Choose the Right AI Tool` was reviewed on 2026-06-01 and published as
the first live Aiplorer guide page. It links only to reviewed public tool pages
and public AI Tools index pages, avoids fake rankings, avoids unsupported "best"
claims, and does not include exact pricing, plan, model access, or feature
availability claims.

## Review Requirements

Before publishing future guides or use cases:

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

The first published guide establishes the initial writing quality bar for future
guides: practical selection criteria, clear caveats, cautious tool language,
and links to reviewed Aiplorer resources.

The use-case drafts should continue to establish the draft workflow quality bar:
practical steps, clear caveats, and no promises of exact AI results.

Future additions should happen in small manually reviewed batches, not bulk
content drops.
