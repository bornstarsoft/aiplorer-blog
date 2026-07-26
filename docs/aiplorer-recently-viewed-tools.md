# Aiplorer Recently Viewed Tools

## Purpose

The local Recently Viewed Tools feature helps returning visitors resume tool
research without an account. Public reviewed tool pages record a compact local
entry, and the homepage and My Shortlist page show up to six recent reviews.

## Storage model

- The browser stores public tool metadata under
  `aiplorer-recent-tools-v1`.
- Entries contain the review path, title, category, description, and last review
  date.
- No viewing history is sent to Aiplorer or synchronized between browsers.
- Visitors can clear the local history directly from the section.
- When browser storage is unavailable, the feature uses a current-session
  in-memory fallback.

## Display behavior

New visitors do not see an empty Recently Viewed section. It appears only after
a reviewed tool page has been opened. The most recently viewed tool appears
first, duplicate visits update its position, and the list is limited to six
entries.

## Editorial boundary

Recently viewed order reflects only the visitor's local activity. It is not a
ranking, recommendation, popularity signal, endorsement, or paid placement.
