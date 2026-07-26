# Aiplorer Reviewed Tools Rendered SEO Audit

Date: 2026-07-26

This read-only rendered-output audit checked the SEO metadata generated for all
reviewed AI tool pages. It did not change public content, routes, tool claims,
draft status, templates, configuration, or legacy posts.

## Scope

The audit covered:

- 65 reviewed public tool pages
- eight draft-only tool pages
- rendered production HTML under `public/ai-tools/tools/`
- the production sitemap at `public/sitemap.xml`
- the canonical, robots, Open Graph, Twitter, Hugo schema, title, description,
  and primary heading output for each reviewed page

## Reviewed Page Checks

For every reviewed tool page, the audit compared front matter with rendered
HTML and confirmed:

- one rendered `<title>` using `<Tool title> | Aiplorer`
- one matching meta description
- one `index, follow` robots directive
- one self-canonical using the HTTPS apex domain and trailing slash
- one matching Open Graph URL
- matching Open Graph title and description
- matching Twitter title and description
- matching Hugo schema name and description metadata
- one matching page `<h1>`
- an existing production HTML file
- an intended production sitemap entry

All 65 reviewed pages passed every check. No duplicate canonical, robots, or
Open Graph URL tag was found in the reviewed-page output.

## Draft Checks

The production audit confirmed that SciSpace, Tome, Clipdrop, Julius AI, Rows,
Obviously AI, Polymer, and Example AI Assistant had:

- no production HTML output
- no production sitemap entry

Drafts were not rendered or treated as indexable pages by this production
audit.

## Structured Data Decision

The current base template uses Hugo's internal Open Graph, schema, and Twitter
templates. Reviewed tool pages render consistent article-style metadata and
schema name, description, publication date, modification date, and word-count
properties.

No custom `SoftwareApplication`, product, offer, aggregate-rating, or review
schema was added. The current pages intentionally avoid fake ratings, rankings,
exact offer data, and unsupported product claims, so adding richer commercial
schema without a supported content model would be misleading.

## Result

Audit summary:

- reviewed pages: 65
- reviewed production outputs: 65
- reviewed sitemap entries: 65
- draft pages: eight
- draft production outputs: zero
- draft sitemap entries: zero
- rendered metadata errors: zero

No public template, configuration, metadata, route, sitemap, or content change
was required.

## Follow-Up

Repeat this audit after changing the base head template, canonical logic,
Open Graph or schema generation, tool front matter fields, sitemap behavior, or
reviewed publication status. Search Console indexing and Google-selected
canonical results remain a separate authenticated manual check.
