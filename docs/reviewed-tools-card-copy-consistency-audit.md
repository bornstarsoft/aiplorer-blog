# Aiplorer Reviewed Tool Card Copy Consistency Audit

Date: 2026-07-26

This audit compares the concise summaries on the AI Tools landing and category
pages with the current reviewed descriptions for all 65 public tool pages.

## Audit Result

All 65 reviewed tool titles and routes match across the landing, reviewed
index, and category discovery layers.

Exact summary text is not required to match tool front matter. Cards usually
omit the tool name and use shorter phrasing for readability. Those expected
editorial differences were left unchanged.

The landing and matching category card summaries agree for all 65 reviewed
tools. The current recheck found no additional scope or product-framing drift.

The previous consistency pass updated only summaries whose scope or current
product framing had drifted:

- You.com
- GitHub Copilot
- Cursor
- Replit
- Tabnine
- Canva AI
- Grammarly
- Bardeen
- Fin

The affected landing and category cards now agree with the current reviewed
tool descriptions without adding rankings, ratings, pricing claims, or new
feature claims.

The later Figma AI, Kittl, Photoroom, Microsoft Designer, and Akkio cards also
remain consistent with their reviewed descriptions.

## Intentional Differences

Windsurf and Relay.app retain transition-specific card copy. Their summaries
need to communicate current identity or service status more directly than a
generic tool description.

Other concise differences remain where the card and reviewed description have
the same meaning.

## Draft Safety

The production discovery layers do not link to:

- `/ai-tools/tools/scispace/`
- `/ai-tools/tools/tome/`
- `/ai-tools/tools/clipdrop/`
- `/ai-tools/tools/julius-ai/`
- `/ai-tools/tools/rows/`
- `/ai-tools/tools/obviously-ai/`
- `/ai-tools/tools/polymer/`
- `/ai-tools/tools/example-ai-assistant/`

These pages remain draft-only.

## Maintenance Rule

Card summaries may be shorter than tool descriptions, but they should not
contradict the reviewed product identity, scope, availability, or caution
status. When a reviewed description changes materially, check both the AI
Tools landing card and the matching category card.
