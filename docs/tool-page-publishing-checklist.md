# Tool Page Publishing Checklist

Date: 2026-06-01

Use this checklist before publishing any Aiplorer AI tool page.

## Source Checks

- Official website URL is verified.
- Tool name is spelled correctly.
- Primary category is selected from the approved Aiplorer categories.
- Official pricing or plan page was checked if pricing is mentioned.
- `sourceNotes` records what official pages were checked.

## Content Checks

- Description is original and useful for everyday users.
- Page explains who the tool may help.
- Page focuses on practical tasks, not only marketing claims.
- Pricing language is cautious.
- Feature language is cautious.
- No unsupported "best" claim.
- No fake ranking.
- No fake rating.
- No copied marketing text.
- No affiliate link.
- No claim that Aiplorer tested the tool unless testing actually happened.

## Front Matter Checks

- `draft` is set to `false` only after manual review.
- `reviewStatus` is set to `reviewed` only after manual review.
- `reviewStatus` remains `needs-official-review` if official product details
  have not been checked.
- `officialUrl` is present and verified.
- `lastReviewed` is set to the review date.
- `category` is present.
- `bestFor` includes practical user goals.
- `pricingNote` reminds users to check official information.

## Pre-Publish Checks

- Run `hugo`.
- Run `git diff --check`.
- Preview the page locally.
- Confirm the generated URL does not conflict with category pages.
- Confirm the page is linked from an appropriate category only when ready.
- Confirm no generated `public/` or `resources/` output is staged.

## Post-Publish Checks

- Confirm the live page loads after deployment.
- Confirm official website links open correctly.
- Submit or inspect sitemap only after deployment is stable.
- Recheck the page if the official tool changes pricing, plans, branding, or
  major features.
