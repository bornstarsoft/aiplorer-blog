# Aiplorer Design And Creative Draft Batch Plan

Date: 2026-07-26

This plan defines a draft-first batch for design and creative workflows. It
does not approve publication, verify product claims, or authorize public
links.

## Implementation Status

The five candidate pages were added as unpublished drafts and reviewed
independently against current official sources on 2026-07-26.

Figma AI, Kittl, Photoroom, and Microsoft Designer passed conservative review
and were prepared for publication. Clipdrop remains `draft: true` with
`reviewStatus: "needs-official-review"` because the current product pages,
operator references, and readable legal or privacy material were not
sufficiently consistent for a conservative public page.

## Candidate Scope

| Candidate | Planned slug | Initial category | Draft decision |
| --- | --- | --- | --- |
| Figma AI | `figma-ai` | Productivity Tools | Reviewed for publication |
| Kittl | `kittl` | Image Tools | Reviewed for publication |
| Photoroom | `photoroom` | Image Tools | Reviewed for publication |
| Clipdrop | `clipdrop` | Image Tools | Remains draft |
| Microsoft Designer | `microsoft-designer` | Image Tools | Reviewed for publication |

The existing taxonomy is sufficient for a draft batch. Do not create a Design
Tools category unless later reviewed pages cannot be described accurately
within the current categories and there is enough reviewed coverage to justify
a new public route.

Figma AI remains mapped to Productivity Tools because its reviewed scope
includes collaborative design and project workflows rather than only image
output.

## Review Result

Official sources checked on 2026-07-26:

- Figma AI: `https://www.figma.com/`, `https://www.figma.com/pricing/`,
  `https://www.figma.com/legal/ai-terms/`,
  `https://www.figma.com/legal/privacy/`, and
  `https://www.figma.com/legal/privacy-trust-center/`
- Kittl: `https://www.kittl.com/`, `https://www.kittl.com/pricing`,
  `https://help.kittl.com/`, `https://www.kittl.com/licensing`, and
  `https://www.kittl.com/privacy`
- Photoroom: `https://www.photoroom.com/`,
  `https://www.photoroom.com/pricing`, `https://help.photoroom.com/`,
  `https://www.photoroom.com/legal/privacy`,
  `https://www.photoroom.com/legal/terms-and-conditions`,
  `https://help.photoroom.com/en/articles/8519362-ownership-of-images`,
  and
  `https://help.photoroom.com/en/articles/10067660-does-the-ai-learn-from-your-images`
- Clipdrop: `https://clipdrop.co/`, `https://clipdrop.co/en-US/pricing`,
  `https://clipdrop.co/terms`, `https://clipdrop.co/privacy`, and
  `https://clipdrop.co/legal-notice`
- Microsoft Designer: `https://designer.microsoft.com/`,
  `https://support.microsoft.com/en-us/designer/frequently-asked-questions-about-microsoft-designer`,
  `https://designer.microsoft.com/consumerTermsOfUse/en-US/consumerTermsOfUse.pdf`,
  and `https://www.microsoft.com/en-us/privacy/privacystatement`

The published pages avoid exact pricing, credits, limits, feature availability,
exports, integrations, model details, workspace guarantees, privacy or security
guarantees, and commercial-use conclusions. They retain human-review, rights,
brand, consent, sensitive-content, and current-official-terms cautions.

Clipdrop's official product pages identify a Jasper relationship while legal
footers still identify InitML, and the privacy, terms, and legal-notice bodies
were not sufficiently readable during this review. Recheck it separately
before any publication decision.

## Required Draft State

Every page in this batch started with:

```yaml
draft: true
reviewStatus: "needs-official-review"
lastReviewed: ""
```

Do not add `lastmod` before a completed official-source review or material
content change. Do not add the candidates to `/ai-tools/`,
`/ai-tools/tools/`, category pages, global navigation, or the production
sitemap.

## Official Source Gate

Review each candidate independently. Check current official sources for:

- product identity and current official domain
- product and workflow scope
- help or documentation availability
- pricing and plan boundaries without copying exact values unless necessary
- account, workspace, sharing, and collaboration behavior where relevant
- privacy, security, data-use, and retention terms
- AI-specific terms, acceptable-use rules, and safety policies
- asset, template, font, image, likeness, trademark, brand, and
  commercial-use requirements
- export, integration, API, model, and availability claims only when necessary
  and directly supported

Keep a candidate unpublished when official product, help, pricing, privacy, or
terms sources are incomplete, inaccessible, inconsistent, or insufficient for
a conservative page.

## Candidate Review Focus

### Figma AI

Confirm the current Figma AI product identity and supported workflow scope.
Review organization and workspace permissions, sharing, uploaded design
content, connected services, confidentiality, generated output, asset rights,
and workplace policy. Do not assume uniform feature, model, plan, or account
availability.

### Kittl

Review current creative and design workflow scope. Pay special attention to
templates, fonts, stock or generated assets, uploads, brand and trademark use,
commercial-use terms, privacy, and product availability. Do not make quality
or licensing guarantees.

### Photoroom

Review current image editing and commerce-oriented workflow scope. Include
cautions around subject and likeness rights, image ownership, background or
object edits, product accuracy, logos, brand requirements, uploaded media,
privacy, and commercial use.

### Clipdrop

Confirm the current operator, official domain, product status, and supported
workflow before drafting detailed copy. Review uploaded media, image and model
rights, privacy, data handling, account access, integrations, API claims, and
availability without assuming continuity from older product descriptions.

### Microsoft Designer

Confirm the current Microsoft Designer identity, destination, account
requirements, and product scope. Review connected Microsoft services, sharing,
stock and generated media, licensing, brand use, privacy, data handling,
commercial use, and changing availability.

## Shared Caution Requirements

Every future draft should state that:

- generated or edited visuals must be reviewed before publishing or sharing
- facts, text, logos, likenesses, and brand details may require correction
- copyright, trademark, consent, attribution, template, font, stock-media, and
  commercial-use requirements must be checked
- sensitive, private, confidential, customer, or unpublished assets require
  careful handling
- plans, credits, limits, models, integrations, exports, collaboration,
  licensing, privacy terms, and availability can change
- users should check current official sources before relying on a capability

Do not add rankings, ratings, scores, affiliate links, unsupported "best"
claims, privacy or security guarantees, or commercial-use conclusions.

## Publication Gate

A candidate may move from draft only after:

1. Stable official product and supporting sources are checked.
2. The page uses cautious, original wording and the correct existing category.
3. Required front matter and source notes are complete.
4. Rights, consent, privacy, sensitive-content, and human-review cautions are
   present.
5. Production and draft builds, listing behavior, sitemap behavior, and draft
   exposure checks pass.
6. The tool independently passes review; a batch does not need to publish
   together.

The next phase should validate production and draft behavior, publish only the
four reviewed pages, and keep Clipdrop absent from public listings and the
production sitemap.
