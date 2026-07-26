# Trust And Policy Accessibility Audit

Date: 2026-07-26

## Scope

The audit covered these public trust and policy routes:

- `/about/`
- `/contact/`
- `/privacy/`
- `/terms/`

Each route was checked at desktop `1440x1000` and mobile `390x844`
viewports. Checks included headings, article and navigation landmarks,
canonical output, metadata descriptions, link names, email behavior, keyboard
focus, and horizontal overflow.

## Result

All four routes had one H1, a main article, named primary and footer navigation,
a working skip link, useful metadata descriptions, and no horizontal overflow.
The Contact email address rendered as a usable `mailto:` link.

The shared footer license link opens in a new tab. Its accessible name did not
previously announce that behavior. The footer now adds visually hidden
`(opens in a new tab)` context while preserving the existing visible link,
destination, and `rel="noopener"` protection.

## Content Boundaries

No policy meaning, contact address, public route, ranking, rating, affiliate
behavior, draft status, or legacy post changed. The update is limited to the
shared footer link context and this audit record.
