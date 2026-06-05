# Reviewed Tools Index Notes

Date: 2026-06-05

The reviewed tools index at `/ai-tools/tools/` currently lists 12 reviewed
public tool pages:

- ChatGPT
- Claude
- Gemini
- Perplexity
- Microsoft Copilot
- Canva AI
- Notion AI
- Grammarly
- DeepL
- ElevenLabs
- Zapier
- Make

The index remains a reviewed-tool directory, not a ranking page. It does not use
ratings, scores, affiliate links, or "best" claims.

## Listing Behavior

The `layouts/ai-tools/tools.html` template lists only pages where:

```yaml
reviewStatus: "reviewed"
draft: false
```

Reviewed tools are grouped by their `category` front matter and sorted by title
within each category. Draft pages remain hidden from normal production builds.

## Category Strategy

Category grouping is intentionally lightweight. It improves browsing once the
index has more than a few tools, while avoiding search, filters, JavaScript, or
ranking-style UI.

If future categories grow large, possible deferred improvements include:

- category anchors near the top of the page
- a static category summary count
- shorter card metadata if cards become too dense

Those improvements should stay static and lightweight unless there is a clear
reader need.
