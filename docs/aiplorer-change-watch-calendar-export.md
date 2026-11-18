# Download Change Watch transition dates as a calendar snapshot

WORK-ID: AIP-CHANGE-WATCH-CALENDAR
ACTIVE_WRITER = NONE

Base: 6531518. Owner approved this scoped improvement and production
deployment. Keep home, RSS, announcement data, and unrelated WIP unchanged.

The iCalendar file has one all-day event per visible upcoming date.
It includes official sources and public record links, but not browser
records, automatic alarms, or a live calendar subscription.

Use [RFC 5545](https://www.rfc-editor.org/rfc/rfc5545) date values, CRLF,
text escaping, UTF-8 line folding, and stable record identifiers.

Last AI: Codex. Implementation and local QA: DONE on main.
QA: PASS. Hugo draft/production builds, 251 Node tests, 67 records,
and byte-identical home and RSS. Playwright downloaded and inspected
all-day events, source links, stable IDs, expiry, and untouched state.
NEXT_SINGLE_TASK: verify the scoped deployment on Cloudflare Pages.
Blocker: none at local QA. Owner approved scoped production deployment.
