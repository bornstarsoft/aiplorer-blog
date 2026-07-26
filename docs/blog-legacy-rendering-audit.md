# Blog And Legacy Rendering Audit

Date: 2026-07-26

## Scope

This read-only audit covered:

- `/blog/`
- `/posts/`
- `/posts/how-generative-ai-is-transforming-mental-health-therapy/`

The representative post was selected because its source currently produces the
known Hugo raw HTML warning. The audit did not edit any file under
`content/posts/` and did not change a legacy route or public layout.

## Passing Checks

- `/blog/` has one page H1 and a useful description heading.
- `/posts/` pagination links have distinct page, next, and last labels.
- The representative post has one H1 and a reachable original-source link.
- Primary and footer navigation landmarks are named.
- The skip link targets `main#main-content`.
- No audited route has horizontal overflow at the tested `390x844` viewport.
- Canonical output follows each existing trailing-slash URL.
- The 293 legacy source files resolve to 291 unique post slugs, and the
  production sitemap contains those 291 intended `/posts/<slug>/` URLs.

## Deferred Legacy Findings

The current theme renders the `/posts/` archive page with one page H1 plus 12
post-summary H1 headings on the first page. Those summary titles should
eventually become H2 headings under the archive H1.

The first archive page also contains 12 links named only `read more`. Future
summary-template work should give each link post-title context while preserving
all existing `/posts/<slug>/` destinations.

The representative legacy post exposes the `Posts` eyebrow and the related
content region as complementary landmarks. The related region should be named,
and the eyebrow should use non-landmark text if legacy rendering is revised.

The source `<b>` markup triggers Hugo's raw HTML omission warning. The visible
text remains in the rendered paragraph, but the bold emphasis is removed.
Changing that source would be a legacy-post edit and was intentionally deferred.

Two legacy slug values are each shared by two source files:
`the-benefits-of-brain-training-through-mobile-games` and
`the-power-of-brain-training-through-mobile-games`. Hugo currently emits one
public URL for each shared slug. Any future source cleanup must preserve those
existing URLs and first determine which source owns each canonical page.

The post-title keyboard focus uses the theme's 1px dotted outline instead of the
newer 3px Aiplorer focus treatment. A future legacy archive accessibility phase
can address this through section-scoped templates or CSS after explicit
approval.

## No-Change Decision

No public or legacy content was changed in this phase. The findings are
documented for a separately approved legacy archive remediation so that heading
levels, link names, landmarks, focus styling, and raw HTML can be handled
together without changing URLs.
