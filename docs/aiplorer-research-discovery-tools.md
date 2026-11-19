# Review two scholarly research discovery tools

WORK-ID: AIP-RESEARCH-DISCOVERY-TOOLS
ACTIVE_WRITER = NONE

Base: 03a6707. Owner approved scoped tool discovery and production deployment.
Use the existing Learning Tools category. Keep the home structure, current
drafts, legacy URLs, and unrelated working changes intact.

Official sources checked on 2026-11-19:

- ResearchRabbit: [product](https://www.researchrabbit.ai/),
  [how it uses AI](https://learn.researchrabbit.ai/en/articles/13545485-how-researchrabbit-uses-ai-and-where-we-don-t),
  [seed papers](https://learn.researchrabbit.ai/en/articles/18423285-how-to-start-a-search-in-researchrabbit-adding-seeds),
  [search from a collection](https://learn.researchrabbit.ai/en/articles/18440884-how-to-start-a-search-from-a-collection),
  [public sharing](https://learn.researchrabbit.ai/en/articles/18441080-how-to-share-a-collection-with-a-public-link),
  [pricing](https://www.researchrabbit.ai/pricing) and
  [data responsibility](https://learn.researchrabbit.ai/en/articles/12796770-data-responsibility-tldr).
  The official privacy policy landing was located; the advice is based on
  the public-link and data responsibility guides, without a policy guarantee.
- Scite: [product](https://scite.ai/), [features](https://scite.ai/features),
  [literature review guide](https://scite.ai/blog/how-to-use-ai-for-literature-review),
  [citation label guidance](https://scite.ai/blog/how-to-use-chatgpt-to-find-references),
  [pricing](https://scite.ai/pricing), [privacy](https://scite.ai/policy),
  and [terms](https://scite.ai/terms).

Both passed editorial review for these narrow use cases. ResearchRabbit
is described as a network-based discovery tool, not a generative assistant.
Scite labels apply to extracted citation statements, not study quality or
scientific consensus. No service accounts, search coverage, classifier accuracy,
or institution-specific access were tested.

Last AI: Codex. Implementation and local QA: DONE on main, based on 03a6707.
All 28 pre-existing working changes were excluded.
QA: PASS. Hugo draft and production builds, 257 Node tests, new Learning
Tools cards, canonical sitemap routes, 291 legacy post URLs, and eight
protected drafts. Home keeps the same structure with two added cards and
updated counts. Browser verified Korean aliases, mobile layout, source
links, related practice, shortlist, and saved comparison.
NEXT_SINGLE_TASK: verify the scoped deployment on the custom domain.
Blocker: none at local QA.
