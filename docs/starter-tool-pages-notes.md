# Starter Tool Pages Notes

Date: 2026-06-01

Phase 2A adds three real AI tool pages as draft validation pages:

- ChatGPT
- Claude
- Gemini

These pages are intentionally not published:

```yaml
draft: true
reviewStatus: "needs-official-review"
```

The official URLs were opened for a minimal URL check, but the pages have not
yet received full official review for current product positioning, major
features, model access, pricing, plans, integrations, regional availability, or
policy details.

Before publishing any of these pages:

- Verify the official URL again.
- Review the current official product positioning.
- Review major use cases against official information.
- Review pricing and plan language against official information.
- Keep pricing language cautious.
- Set `lastReviewed` to the actual review date.
- Change `reviewStatus` only after manual review.
- Preview the page locally with `hugo --buildDrafts`.
- Run `hugo` and confirm the page remains unpublished until `draft` is changed.
