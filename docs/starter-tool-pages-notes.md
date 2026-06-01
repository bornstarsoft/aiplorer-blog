# Starter Tool Pages Notes

Date: 2026-06-01

Phase 2A adds three real AI tool pages as draft validation pages:

- ChatGPT
- Claude
- Gemini

Phase 2B reviewed ChatGPT as the first controlled live publish candidate.
Phase 2C reviewed Claude as the second controlled live publish candidate.
Phase 2D reviewed Gemini as the third controlled live publish candidate.

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

## Gemini Review Result

Gemini was reviewed on 2026-06-01 and published as the third live Aiplorer tool
page.

Official sources checked:

- `https://gemini.google.com/`
- `https://gemini.google/overview/`
- Google Help article: `Use Gemini Apps`
- `https://gemini.google/subscriptions/`

The page uses only high-level, cautious claims. Specific prices, plan limits,
model names, feature limits, app availability, Workspace availability,
integrations, and regional availability were not copied into the page.

Current status:

```yaml
content/ai-tools/tools/gemini.md
draft: false
reviewStatus: "reviewed"
lastReviewed: "2026-06-01"
```

## Starter Quality Bar

ChatGPT, Claude, and Gemini now establish the initial publishing quality bar for
Aiplorer AI tool pages.

Before publishing future tool pages:

- Verify the official URL again.
- Review the current official product positioning.
- Review major use cases against official information.
- Review pricing and plan language against official information.
- Keep pricing language cautious.
- Set `lastReviewed` to the actual review date.
- Change `reviewStatus` only after manual review.
- Preview the page locally with `hugo --buildDrafts`.
- Run `hugo` and confirm the page route behaves as expected.

Future tool pages should meet or exceed the ChatGPT, Claude, and Gemini page
quality bar: official sources checked, cautious wording, no fake ratings, no
fake rankings, no copied marketing text, and no detailed pricing or feature
claims unless directly verified.
