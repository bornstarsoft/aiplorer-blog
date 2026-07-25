# Aiplorer Reviewed Tool Official URL Health

Date: 2026-07-26

This document records a one-time official URL health baseline for Aiplorer's
reviewed public tool pages. It supplements the editorial source-review process;
it does not replace manual product, pricing, policy, privacy, security, or
licensing review.

## Scope And Method

The audit covered the `officialUrl` value on all 55 reviewed public tool pages.
Each URL was requested with redirects enabled, and the final status and
destination were recorded.

The three draft-only pages were inventoried separately. Their URLs were not
treated as reviewed publication sources, and the audit does not authorize
publishing them.

## Result

- 45 reviewed official URLs returned HTTP 200 directly or after an expected
  redirect.
- 10 reviewed official URLs returned HTTP 403 to command-line requests.
- No reviewed official URL returned HTTP 404.
- No reviewed official URL returned a 5xx server error.
- All 55 requests completed without a transport error.

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

Their existing official URLs remain unchanged. Future editorial reviews should
continue to verify these sources manually in a browser.

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
