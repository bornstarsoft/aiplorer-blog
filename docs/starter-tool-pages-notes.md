# Starter Tool Pages Notes

Date: 2026-06-01

Phase 2A adds three real AI tool pages as draft validation pages:

- ChatGPT
- Claude
- Gemini

Phase 2B reviewed ChatGPT as the first controlled live publish candidate.
Phase 2C reviewed Claude as the second controlled live publish candidate.
Gemini remains intentionally unpublished.

## ChatGPT Review Result

ChatGPT was reviewed on 2026-06-01 and published as the first live Aiplorer tool
page.

Official sources checked:

- `https://chatgpt.com/`
- OpenAI Help article: `What is ChatGPT: FAQ`
- OpenAI Help article: `ChatGPT Capabilities Overview`
- `https://chatgpt.com/pricing/`

The page uses only high-level, cautious claims. Specific prices, plan limits,
model names, feature limits, integrations, and regional availability were not
copied into the page.

Current status:

```yaml
content/ai-tools/tools/chatgpt.md
draft: false
reviewStatus: "reviewed"
lastReviewed: "2026-06-01"
```

## Claude Review Result

Claude was reviewed on 2026-06-01 and published as the second live Aiplorer
tool page.

Official sources checked:

- `https://claude.ai/`
- `https://www.anthropic.com/claude`
- Anthropic Help article: `What are some things I can use Claude for?`
- `https://claude.ai/pricing`

The page uses only high-level, cautious claims. Specific prices, plan limits,
model names, feature limits, integrations, and regional availability were not
copied into the page.

Current status:

```yaml
content/ai-tools/tools/claude.md
draft: false
reviewStatus: "reviewed"
lastReviewed: "2026-06-01"
```

## Gemini Status

Gemini's official URL was opened for a minimal URL check in Phase 2A, but the
page has not yet received full official review for current product positioning,
major features, model access, pricing, plans, integrations, regional
availability, or policy details.

Current status:

```yaml
content/ai-tools/tools/gemini.md
draft: true
reviewStatus: "needs-official-review"
```

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

Future tool pages should meet or exceed the ChatGPT and Claude page quality bar:
official sources checked, cautious wording, no fake ratings, no fake rankings,
no copied marketing text, and no detailed pricing or feature claims unless
directly verified.
