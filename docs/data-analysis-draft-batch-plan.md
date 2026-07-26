# Aiplorer Data And Analysis Draft Batch Plan

Date: 2026-07-26

This plan defines a possible draft-first batch for data analysis, spreadsheet,
predictive modeling, reporting, and dashboard workflows. It does not approve
publication, verify every product claim, or authorize public links.

## Implementation Status

The five candidate pages were added as unpublished drafts and independently
reviewed against official sources on 2026-07-26. Akkio passed the conservative
publication gate. Julius AI, Rows, Obviously AI, and Polymer remain
unpublished because their current official records are not sufficiently
consistent for publication.

## Candidate Scope

| Candidate | Planned slug | Initial category | Draft status |
| --- | --- | --- | --- |
| Julius AI | `julius-ai` | Productivity Tools | Draft retained |
| Rows | `rows` | Productivity Tools | Draft retained |
| Akkio | `akkio` | Business Tools | Reviewed and published |
| Obviously AI | `obviously-ai` | Business Tools | Draft retained |
| Polymer | `polymer` | Business Tools | Draft retained |

The existing taxonomy is sufficient for an initial draft batch. Do not create
a Data Tools category during the draft phase. Reconsider the taxonomy only
after independently reviewed pages show that Productivity Tools and Business
Tools cannot describe the products clearly.

Akkio is `draft: false` with `reviewStatus: "reviewed"` and
`lastReviewed: "2026-07-26"`. The other four pages remain `draft: true` with
`reviewStatus: "needs-official-review"` and an empty `lastReviewed`.

## Official Review Result

### Published

Akkio passed review because its current product, pricing, documentation,
security, privacy, and terms destinations consistently identify the current
product scope and operator. The public page uses only cautious, high-level
wording about media-agency and data-provider campaign workflows. It does not
copy exact prices, limits, agents, models, integrations, API details,
deployment claims, governance features, or privacy and security guarantees.

### Draft Retained

- Julius AI: the current privacy policy identifies Julius AI Inc., while the
  current terms identify Caesar Labs Inc. Recheck the applicable legal
  operator and terms before publication.
- Rows: the product says Rows joined Superhuman, while legal and documentation
  links cross Rows, Superhuman, and Grammarly properties. Recheck the current
  operator, applicable terms, privacy policy, product continuity, and
  availability.
- Obviously AI: the official site identifies itself as an archive of how
  Obviously AI operated through 2025 and directs users to Zams. Recheck the
  current identity, migration relationship, support, legal, privacy, and
  availability context.
- Polymer: the product remains reachable, but its privacy policy was last
  modified in 2023, its terms were last updated in 2020, and the pricing page
  repeats plan sections. Recheck the current application, legal, privacy,
  pricing, and availability record.

No new category was created. Akkio is linked under the existing Business Tools
category. The four retained drafts are not linked publicly.

## Official Source Entry Points

These official entry points were used for the 2026-07-26
candidate-by-candidate review. Their presence does not establish that every
claim, plan, integration, security statement, or feature is suitable for
publication.

### Julius AI

- `https://julius.ai/`
- `https://julius.ai/pricing`
- `https://julius.ai/docs/get-started/privacy-and-data-security`
- `https://julius.ai/privacy-policy`
- `https://julius.ai/tos`

Before publication, confirm the current product and legal operator names,
terms destination, uploaded-data handling, connected data sources, generated
code or analysis behavior, plan boundaries, and current privacy and security
statements.

### Rows

- `https://rows.com/product`
- `https://rows.com/ai`
- `https://rows.com/pricing`
- `https://rows.com/docs/`
- `https://rows.com/privacy`

The current product page says Rows joined Superhuman and links some legal and
documentation destinations to Superhuman or Grammarly properties. A later
review must confirm the current operator, applicable terms and privacy policy,
product continuity, and data-handling boundaries before any publication
decision.

### Akkio

- `https://www.akkio.com/`
- `https://www.akkio.com/pricing`
- `https://docs.akkio.com/`
- `https://www.akkio.com/security`
- `https://www.akkio.com/privacy`
- `https://www.akkio.com/terms`

Current official positioning emphasizes media-agency and data-provider
campaign workflows. The published page follows that positioning and does not
rely on older generic no-code modeling descriptions.

### Obviously AI

- `https://obviously.ai/`
- `https://obviously.ai/pricing`
- `https://support.obviously.ai/`
- `https://obviously.ai/security`
- `https://obviously.ai/privacy-policy`

The official site identifies Obviously AI as an archive through 2025 and
directs users to Zams. Recheck the current identity and migration relationship
before reviewing predictive, agent, workflow, deployment, support, or
integration scope. Avoid copying performance, speed, precision,
return-on-investment, qualification, or compliance claims.

### Polymer

- `https://www.polymersearch.com/`
- `https://www.polymersearch.com/pricing`
- `https://www.polymersearch.com/help-center`
- `https://www.polymersearch.com/data-handling`
- `https://www.polymersearch.com/privacy-policy`
- `https://www.polymersearch.com/terms-of-service`

The official site currently presents embedded analytics, dashboards, reporting,
and conversational analysis workflows. Its terms and privacy pages show older
update dates, and the pricing page contains repeated plan sections. Confirm
the current product, application destination, operator, legal terms, and plan
structure before publication.

## Required Draft State

If the batch is approved for implementation, every new page must start with:

```yaml
draft: true
reviewStatus: "needs-official-review"
lastReviewed: ""
```

Do not add `lastmod` before a completed official-source review or material
content change. Do not add candidates to `/ai-tools/`, `/ai-tools/tools/`,
category pages, global navigation, Search Console queues, or the production
sitemap during the draft phase.

## Official Source Gate

Review each candidate independently for:

- current product identity, operator, and official domain
- current workflow scope and intended audience
- help and documentation availability
- pricing and plan boundaries without copying exact values unless necessary
- uploads, spreadsheets, databases, connectors, workspaces, and sharing
- generated analysis, code, models, predictions, charts, reports, and exports
- privacy, security, retention, deletion, training, and third-party processing
- access controls, connected accounts, API or embedded use, and availability
- legal, medical, financial, employment, customer, and business-critical data

Keep a candidate unpublished when official product, help, pricing, privacy,
security, or terms sources are incomplete, inaccessible, inconsistent, stale,
or insufficient for a conservative page.

## Shared Caution Requirements

Every future draft should state that:

- generated analysis, formulas, code, predictions, charts, and reports require
  human review
- source data, calculations, assumptions, denominators, and methodology should
  be checked before decisions are made
- small, incomplete, biased, stale, or incorrectly joined datasets can produce
  misleading results
- sensitive, private, confidential, customer, employee, legal, medical, and
  financial data require careful handling
- connected accounts, sharing permissions, exports, embedded outputs, and
  public dashboards require access review
- plans, limits, integrations, models, APIs, exports, privacy terms, security
  details, and availability can change
- official sources should be checked before relying on a capability

Do not add rankings, ratings, scores, affiliate links, unsupported "best"
claims, accuracy or performance guarantees, privacy or security guarantees, or
automated decision-making recommendations.

## Publication Gate

A candidate may move from draft only after:

1. Stable official product and supporting sources are checked.
2. The page uses cautious, original wording and the correct existing category.
3. Required front matter and source notes are complete.
4. Data quality, methodology, privacy, security, sharing, and human-review
   cautions are present.
5. Production and draft builds, listing behavior, sitemap behavior, and draft
   exposure checks pass.
6. The tool independently passes review; the batch does not need to publish
   together.
