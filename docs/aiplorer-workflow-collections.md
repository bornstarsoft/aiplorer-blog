# Aiplorer Workflow Collections

Date: 2026-07-26

## Purpose

Workflow Collections let visitors begin with a practical outcome instead of
already knowing a product name or category. The initial collections cover:

- automation and agents
- research and source review
- coding and debugging
- multimodal creative production
- meetings and knowledge capture
- writing and communication

The collections reflect current AI usage directions described in the 2026
Stanford AI Index and Microsoft Work Trend Index, while keeping Aiplorer's
review-first and no-ranking policy.

Official references:

- https://hai.stanford.edu/ai-index/2026-ai-index-report
- https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization

## Data And Safety

- Collection membership is maintained in
  `layouts/partials/aiplorer-workflow-collections.html`.
- Titles resolve only to published pages with `reviewStatus: "reviewed"`.
- Missing, draft, or unreviewed titles do not render as public links.
- Each workflow includes a human-review checkpoint tailored to its risk area.
- Each workflow links its related categories to the matching same-task groups on
  `/ai-tools/compare/`, providing a direct handoff from discovery to evaluation.
- Tool order is a curated reading path, not a rank, score, recommendation,
  sponsorship, or paid placement.
- No JavaScript, database, search index, or automated popularity signal is
  required.

## Public Routes

- `/ai-tools/workflows/` provides the task-first overview.
- Each workflow keeps category-guide links separate from category-comparison
  actions so visitors can choose between more context and an immediate test.
- Homepage, AI Tools landing, reviewed index, review tracker, and tool detail
  pages link to the workflow collections.
- Existing tool, category, and legacy post URLs remain unchanged.
