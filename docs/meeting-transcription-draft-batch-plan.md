# Meeting And Transcription Tools Draft Batch Plan

Date: 2026-07-26

## Status

This is a draft-first readiness plan only. It does not add tool pages, publish
tools, create a category, or approve any product claim.

The proposed candidates are:

| Candidate | Proposed slug | Proposed category |
| --- | --- | --- |
| Otter.ai | `otter-ai` | Productivity Tools |
| Fireflies.ai | `fireflies-ai` | Productivity Tools |
| Fathom | `fathom` | Productivity Tools |
| Granola | `granola` | Productivity Tools |
| Read AI | `read-ai` | Productivity Tools |

Productivity Tools is the proposed existing category because the batch centers
on meeting notes, transcripts, summaries, follow-up work, and shared knowledge.
Do not create a Meeting Tools category during the draft phase.

## Official Source Entry Points

The following official entry points were reachable on 2026-07-26. Their
presence is enough to prepare future drafts, but it is not a completed
official-source review.

### Otter.ai

- `https://otter.ai/`
- `https://otter.ai/pricing`
- `https://help.otter.ai/`
- `https://otter.ai/privacy-policy`
- `https://otter.ai/terms-of-service`

### Fireflies.ai

- `https://fireflies.ai/notetaker`
- `https://fireflies.ai/pricing`
- `https://guide.fireflies.ai/`
- `https://fireflies.ai/security`
- `https://fireflies.ai/privacy_policy.pdf`
- `https://fireflies.ai/terms-of-service.pdf`

### Fathom

- `https://www.fathom.ai/`
- `https://www.fathom.ai/pricing`
- `https://help.fathom.video/`
- `https://www.fathom.ai/privacy`
- `https://www.fathom.ai/terms`

The former `https://fathom.video/` product root currently redirects to
`https://www.fathom.ai/`. A future draft should use the current official
product destination while separately checking whether help and trust URLs
remain on older subdomains.

### Granola

- `https://www.granola.ai/`
- `https://www.granola.ai/pricing`
- `https://docs.granola.ai/`
- `https://www.granola.ai/security`
- `https://docs.granola.ai/help-center/policies/privacy-policy`

### Read AI

- `https://www.read.ai/meetings`
- `https://www.read.ai/pricing`
- `https://support.read.ai/`
- `https://www.read.ai/privacy-policy`
- `https://support.read.ai/hc/en-us/articles/25702259763091-Security-Privacy-Overview`

## Draft Rules

If the batch is created later, every page must start with:

- `draft: true`
- `reviewStatus: "needs-official-review"`
- `lastReviewed: ""`
- category `Productivity Tools`

The drafts must remain absent from `/ai-tools/`, `/ai-tools/tools/`, category
cards, global navigation, production output, and the production sitemap.

## Review Boundaries

Future draft and publication reviews must use cautious wording and check:

- recording and transcription consent requirements
- meeting participant notice and workplace policy
- summary, transcript, speaker, and action-item accuracy
- calendar, conferencing, email, CRM, and connected-account permissions
- note, transcript, recording, and link-sharing controls
- retention, deletion, export, residency, and third-party processing
- sensitive, confidential, customer, employee, legal, medical, and financial
  conversations
- pricing, plan limits, capture methods, platform support, and availability

Do not claim exact prices, limits, language counts, accuracy, integrations,
recording behavior, data handling, privacy, security, compliance, retention, or
feature availability until each statement is directly verified and necessary.

Users should review generated notes, transcripts, summaries, decisions, and
action items before sharing or relying on them. They should obtain any required
participant consent and follow applicable law and workplace policy.

## Recommended Sequence

1. Create the five pages as unpublished drafts only.
2. Validate that drafts appear only with `hugo --buildDrafts`.
3. Review each candidate independently against its official product, help,
   pricing, privacy, security, and legal sources.
4. Publish only candidates whose official-source review supports a cautious,
   useful page.
5. Keep uncertain candidates as drafts without public links.

Search Console follow-up remains separate and should resume only after a user
signs in to the browser session.
