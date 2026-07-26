# Aiplorer Reviewed Tool Official URL Health

Date: 2026-07-26

This document records a one-time official URL health baseline for Aiplorer's
reviewed public tool pages. It supplements the editorial source-review process;
it does not replace manual product, pricing, policy, privacy, security, or
licensing review.

## Scope And Method

The audit covered the `officialUrl` value on all 60 reviewed public tool pages.
Each URL was requested with redirects enabled, and the final status and
destination were recorded. Browser inspection was used when an official site
blocked or did not complete a command-line request.

The three draft-only pages were inventoried separately. Their URLs were not
treated as reviewed publication sources, and the audit does not authorize
publishing them.

## Result

- 49 reviewed official URLs returned HTTP 200 directly or after an expected
  redirect.
- 10 reviewed official URLs returned HTTP 403 to command-line requests.
- Adobe Firefly did not complete either command-line retry, but its official
  page loaded successfully through browser inspection at the existing URL.
- No reviewed official URL returned HTTP 404.
- No reviewed official URL returned a 5xx server error.
- No reviewed official URL redirected to an unexpected product or domain.

An HTTP 403 from an automated command-line request is not, by itself, evidence
that an official page is unavailable. These destinations use access controls
that can block non-browser clients:

- Canva AI
- ChatGPT
- Claude
- Consensus
- Gamma
- Ideogram
- Leonardo AI
- Make
- Midjourney
- Perplexity

Browser inspection confirmed that all 10 destinations still load their
official product pages or expected account destinations. Their existing
official URLs remain unchanged. Future editorial reviews should continue to
verify these sources manually in a browser.

Adobe Firefly returned a command-line transport timeout rather than an HTTP
error. Browser inspection confirmed that the existing Adobe product URL still
loads the official Firefly page, so no public URL change was made.

The five reviewed meeting and transcription tools added after the previous
55-tool baseline all returned HTTP 200:

- Fathom
- Fireflies.ai
- Granola
- Otter.ai
- Read AI

## Redirect Review

The following redirects were consistent with expected official product or
account behavior:

- NotebookLM redirected to a Google sign-in flow.
- Relay.app redirected from `www.relay.app` to `relay.app`.
- Salesforce Agentforce retained its official page and added a query
  parameter.
- You.com redirected from its root URL to `/home`.

Runway's former official domain, `runwayml.com`, redirected to the current
official site at `runway.com`. The Runway tool page now uses
`https://runway.com/` as its official URL. The existing Aiplorer route remains
unchanged.

## Publication And Draft Safety

The audit found no dead official URL requiring a reviewed tool to be
unpublished. It also made no claims about current pricing, plan limits,
availability, security, privacy, licensing, or product quality.

SciSpace and Tome remain draft pending sufficient official-source review.
Example AI Assistant remains an internal draft model page. None of these pages
should appear in production output or the production sitemap.

## Follow-Up

Recheck official URLs:

- before each scheduled source-freshness review batch
- when a product announces a rename, acquisition, shutdown, or domain move
- when an official destination redirects to a materially different product
- when a public official link returns a persistent 404, 5xx response, or
  unexpected destination

Command-line 403 responses should be followed by manual browser review rather
than being classified automatically as broken links.

## Post-Baseline Addition

Akkio was independently reviewed and published on 2026-07-26 after this
60-page URL-health baseline. Its official product URL,
`https://www.akkio.com/`, and its official pricing, documentation, security,
privacy, and terms destinations were reachable during the publication review.
Future URL-health baselines should include Akkio in the reviewed Business Tools
inventory.
