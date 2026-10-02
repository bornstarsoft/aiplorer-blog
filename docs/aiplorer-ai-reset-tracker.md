# Aiplorer AI Reset Tracker

## Purpose

The Codex Reset Pulse gives visitors a repeat-use historical utility without
asking for an AI account login, browser session, API key, or usage history.

It keeps two concepts separate:

- Public provider incident status.
- A source-linked history of public or exceptional reset announcements.

The page does not forecast reset events or infer a visitor's account schedule.
The earlier manual timestamp form and local countdown were removed because they
served a different task and reduced the visibility of the historical data.

## Public Codex History

`data/codex_reset_history.json` contains a manually checked snapshot of 57
public Codex reset/credit announcements observed between September 17, 2025 and
October 2, 2026, checked on October 3 KST (October 2 UTC). Each row stores the UTC announcement
timestamp, source X post URL, and an explicit `kind`. The seed was checked
against `https://codex-resets.com/`, which states
that it collects posts from `@thsottiaux` and is not affiliated with OpenAI.

When a reset is observed before its public confirmation reply appears, the
timestamp follows the archive's displayed UTC event time and the source URL
points to the confirming public record. This applies to the August 25, 2026
entry and keeps elapsed-time statistics aligned with the observed reset rather
than the later reply time.

The August 28, 2026 source cross-check replaced the August 21 23:40 UTC
follow-up record with the new August 27 reset. The source archive no longer
classifies that banked-reset availability follow-up as a separate event, so the
snapshot remained at 47 records at that check. This is a documented source
correction rather than an unpublished deletion.

The records are labeled as announcement observations rather than official
OpenAI reset telemetry. Announcement scope is not uniform: source posts can
refer to full, partial, banked, or incoming resets. Aiplorer therefore does not
present the event count as a count of identical account resets.

The source can also show a separate reset-watch signal for a possible future
event. Aiplorer excludes those signals until they appear in the confirmed reset
announcement log; they are not added as forecasts or event records.

### October 3 KST Check: Usage Reset Completion

- Added the October 2, 2026 21:18:48 UTC usage-reset completion announcement
  (October 3 at 06:18:48 KST), linked to
  `https://x.com/thsottiaux/status/2106131810921136451`.
- The archive and `https://codex-resets.com/api/v1/resets?limit=100` agree on
  the timestamp and completion wording. The API returns 57 records with no
  further page, one new record, no removed records and no timestamp changes
  to the previous 56 entries. It identifies the new record as `regular`;
  Aiplorer maps it to `usage`, not a banked-credit grant.
- Counts are 46 usage, 7 banked, 2 both and 2 unclassified. The usage view
  includes 48 entries; the credit view stays at 9. The latest credit observation
  remains September 29 at 19:00 UTC, with its archive-based evidence caveat.
- Updated the public notice and latest history clocks for the usage reset.
  This timestamp records a completion announcement, not verified delivery time
  for each account. No eligibility, quantity or expiration claims were added.
- Direct X access was unavailable; the event was checked through the secondary
  archive and API. The official weekly product update did not independently
  confirm this reset. No account access or credit redemption was performed.

### September 30 Check: Completion And Observed Reset Credit

- The archive and `https://codex-resets.com/api/v1/resets?limit=100` now contain
  56 records and no further page. The existing 54 source URLs and timestamps
  are unchanged. Added two records, retaining their distinct event types.
- `usage`: September 26 at 18:17:54 UTC (September 27 at 03:17:54 KST), linked
  to `https://x.com/thsottiaux/status/2103911959544610829`. The archived text
  states that reset propagation completed. This closes the September 26
  pending notice; the earlier promise is not counted as a second event.
- `banked`: September 29 at 19:00:00 UTC (September 30 at 04:00 KST), linked
  to `https://x.com/thsottiaux/status/2105120226027450685`. The API identifies
  this as `observed-20260929T190000Z`, source type `observed`, reset type
  `banked`; the public page also labels it a banked reset. This is the archive's
  observation time, not the short reply's publication time or a verified
  universal delivery time. The reply text alone does not establish the grant.
- Direct X pages could not be fetched. The official changelog did not provide
  event confirmation. Classification of the newest observation relies on the
  secondary archive, not independent official verification. A visible notice
  discloses this limitation; no quantity, eligibility or expiration is inferred.
- Counts are 45 usage, 7 banked, 2 both and 2 unclassified, 56 total. The usage
  view includes 47 records and the credit view 9, with `both` in each view.
  Homepage and tracker clocks follow the latest observed credit; the latest
  usage-only record remains separately dated September 26 UTC.
- Replaced the obsolete completion-pending notice with the observation caveat.
  Existing records, protected drafts and unrelated content remain unchanged.

### September 26 Check: Usage Reset Announced, Completion Unconfirmed

- The public archive lists a scheduled usage reset, with timing still to be
  announced, linked to `https://x.com/thsottiaux/status/2103637477760311522`.
  The text mirrored at `https://ai-resets.com/` and
  `https://zamantika.com/en/profile/thsottiaux` describes an upcoming usage
  reset for paid Codex and ChatGPT Work users after a service disruption.
  It does not announce a new banked reset grant.
- Direct X access returned 403. The official changelog did not establish a
  completed reset. Mirrors corroborate the announcement wording, not account
  delivery or a completion timestamp. Relative mirror times were not converted
  into an invented event time.
- The public API returned 54 records, no further page, no new entries and no
  timestamp changes. All existing events and classifications remain unchanged;
  only the checked timestamp and page lastmod were refreshed.
- An optional `resetNotice` in the tracker front matter displays the dated
  announcement status above the historical clock. It is separate from the
  dataset, counts, graphs and elapsed clocks. No prediction was added.
- On the next check, remove or revise this notice. Add a history event only
  after a source-backed record is available, and avoid counting the pending
  announcement and its later confirmation as two resets. This check does not
  rule out a reset already reaching an individual account.

### September 24 Check: September 23 KST Reset Credit

- Added one `banked` announcement at September 22, 2026 18:23:37 UTC:
  September 23 at 03:23:37 KST, or September 22 at 11:23:37 PDT.
  Original post: `https://x.com/thsottiaux/status/2102463847714247142`.
- The public archive and `https://codex-resets.com/api/v1/resets?limit=100`
  agree on the timestamp and explicitly describe a saved reset grant for Plus,
  Pro and Business alongside the Sol/Luna release. The API contains 54 records
  with no further page; all previous 53 source URLs and timestamps match.
- This is a credit-grant announcement, not an automatic usage refill. Counts
  are now 44 usage, 6 banked, 2 both and 2 unclassified. The credit view contains
  8 announcements including `both`; the usage view remains at 46. Latest usage
  reset remains September 12 at 08:09:17 UTC. Counts describe announcements,
  not the number of credits available in any account.
- Direct X access returned 403. Event evidence is the secondary archive/API,
  with the original source link retained. The official banked-reset Help
  Center page was checked for the distinction between saved and automatic
  resets, but did not independently confirm this September 22 grant. No exact
  account delivery time, expiration or individual eligibility is asserted.
- The recorded time is the announcement time, not confirmation that every
  account received the credit then. Users should check Settings > Usage for
  their own available reset and expiration. No forecast or automatic
  redemption was added.

### September 12 Update

- Added the September 12, 2026 08:09:17 UTC usage reset announcement
  (17:09:17 in Korea), linked to
  `https://x.com/thsottiaux/status/2098685367058612394`.
- The public archive and `https://codex-resets.com/api/v1/resets?limit=100`
  agree on the new record. All previous 52 source URLs and timestamps are
  unchanged; the API reports no further pages.
- The archived confirmation says the reset propagated. This is classified as
  `usage`, not a saved reset-credit grant. Current counts are 44 usage, 5 banked,
  2 both, and 2 unclassified announcements. No new credit grant was found.
- Direct X access returned 403 during this check. This update relies on the
  secondary archive/API and retains the original source link; it does not
  independently verify delivery to any individual account.

### September 9 Classification Review

Reviewed all 52 entries in `https://codex-resets.com/api/v1/resets?limit=100`
(pagination reports no further pages) against the public announcement archive.
Direct X pages can restrict automated review; record text and timestamps were
also checked in the archive and its public API. This is a secondary-source
snapshot, not independently verified account delivery.

The mutually exclusive categories are:

| kind | Meaning | Announcements |
| --- | --- | ---: |
| usage | Usage refill announcement, including an announced rollout | 43 |
| banked | Saved reset credit announcement only | 5 |
| both | Usage refill and saved credit in the same announcement | 2 |
| unclassified | Existing record retained, but text insufficient to identify type | 2 |

Credit-bearing records (UTC announcement dates):

| Date | kind | Original post |
| --- | --- | --- |
| 2026-09-05 | banked | https://x.com/thsottiaux/status/2096035437299237298 |
| 2026-09-03 | banked | https://x.com/thsottiaux/status/2095651088502591861 |
| 2026-08-21 | banked | https://x.com/thsottiaux/status/2090766694897619318 |
| 2026-07-13 | banked | https://x.com/thsottiaux/status/2076735790567338203 |
| 2026-07-12 | banked | https://x.com/thsottiaux/status/2076418567143408112 |
| 2026-06-29 | both | https://x.com/thsottiaux/status/2071740419030053227 |
| 2026-06-18 | both | https://x.com/thsottiaux/status/2067399435009622521 |

The July 12/13 API entries say `regular`, but their text explicitly grants
banked credits. June 18/29 describe both actions. June 28 mentions existing
banked balances but announces only a usage refill; it is not a new credit grant.
The short August 11 and August 25 replies remain `unclassified` pending fuller
context. No existing timestamp or source link was removed or changed.

September 3/5 UTC describe upcoming credit delivery; timestamps record the
posts, not completed account crediting. Their Pacific offer dates are September
3/4. A recurring eligibility promise is one announcement, not a generated event
for every subsequent day. Credit counts are not per-account quantities or
universally available grants.

The page shows disjoint category totals, latest elapsed times, and medians of
consecutive announcements within each category. A separate credit table includes
`banked` and `both` once each (7 announcements); its gaps use that combined credit
series. Homepage wording follows the latest
event type, so a banked grant is not presented as an automatic refill.

### Type Views For Charts And Timeline

The All / Usage resets / Reset credits controls apply to the activity strip,
window statistics, hourly and weekday charts, recent intervals, and detailed
timeline. Usage includes `usage` and `both` (45 records); credits include `banked`
and `both` (7). All includes every record once (52), including unclassified
records. The two specific views overlap at `both` and must not be added together
as an overall event total. The four overview cards remain disjoint categories.

The latest announcement clock, overview cards and dedicated credit table remain
global. All rolling windows end at the same latest overall announcement timestamp,
so changing views does not silently change the comparison period. The activity
strip applies the same rolling cutoff as its event count, including the partial
UTC date at the start. Calendar colors and text tooltips identify event types.

The hourly chart keeps 24 fixed UTC buckets; switching time zones changes labels
only, while switching type views recalculates counts. The axis reference date
remains the latest overall announcement. The selected time zone survives type
changes. Missing intervals display Unavailable rather than a misleading zero.
Timeline expansion resets on type changes and exposes only matching records.
Controls are hidden without JavaScript; the complete static timeline remains.

Source rechecked on September 9 at 12:09 UTC: 52 public API entries and no
further page. One source-backed event was added: the reset observed on September
8 at 01:56 UTC, linked to the later public confirmation that usage had been reset
for everyone. OpenAI's current help guidance independently identifies this as
the September 7 Pacific-time automatic global reset. It is classified as
`usage`, not `banked`, and no prediction was added.

### Scheduled, Automatic And Banked Resets

The page now distinguishes three experiences that can all look like a reset in
an account usage meter:

- A scheduled weekly account window can reset at the time shown for that
  account. It is account-specific and is not a public announcement record.
- An automatic public reset is applied directly to the eligible limits covered
  by its announcement and is recorded as `usage` when confirmed.
- A banked reset is stored on an eligible account for later redemption and is
  recorded as `banked`; an announcement that also refreshes limits is `both`.

This distinction follows OpenAI Help Center guidance in
`https://help.openai.com/en/articles/20001498-how-banked-codex-resets-work`.
That official page also confirms banked resets for eligible existing accounts
on September 3 and September 4, 2026. Those Pacific dates correspond to the two
newest UTC public announcement records already present in this snapshot:
September 3 at 23:12 UTC and September 5 at 00:39 UTC. The help page confirms
the event type and offer dates; the retained X links remain the sources for the
announcement timestamps.

The same official guidance confirms that the September 7 Pacific-time event was
an automatic global reset for eligible Plus, Pro and Business usage. The dataset
uses the archive's September 8 01:56 UTC observed-event time and links to the
later confirming post. It did not create another saved reset, so the event
appears only in the usage-reset history.

Banked resets are separate from purchased usage credits. Eligibility,
delivery, affected limits and expiration can vary. The public page directs
visitors to their own Settings > Usage view for account-specific state and does
not ingest or display private account usage. A personal scheduled reset seen
after the latest public announcement is therefore not added to the global
history without a source-backed public reset announcement.

### Date Inspection And Check Timestamp

The 30-day activity strip now opens a date-specific record list on click or tap.
Rows show the announcement type, UTC clock time, full browser-local date/time,
and the original record link. The list uses exactly the same filtered events
and rolling cutoff as the calendar count. The first, partial UTC date carries
its cutoff time; a zero means no recorded announcements in that view, not proof
that no account reset happened.

The latest date is selected initially and kept visible in the horizontally
scrollable strip, including on mobile and after resizing. Dates have a single
keyboard tab stop with Left/Right and Home/End navigation. Mobile date targets
are at least 44px wide. Changing announcement type preserves the selected date
and recalculates its records. Distinct types on the same day are marked Multiple
types rather than misrepresented as a single Reset + credit announcement.

The elapsed-clock label no longer says only Live. Beside it, Records checked
shows the saved `snapshotAt` in browser-local time and its elapsed age. This
does not fetch new history or advance the snapshot timestamp. A device clock
earlier than the snapshot gets an explicit clock warning instead of a false
just-checked message. Without JavaScript, the UTC check timestamp and complete
static timeline remain available, and date-inspection controls stay hidden.

This interface update does not add or reclassify events, refresh source
verification, access accounts, or enable automatic history updates.

The public page presents the snapshot as the Aiplorer Reset Pulse. The default
view favors fast comparison over a wall of metric cards:

- Live elapsed time since the latest observed announcement.
- A 30-day UTC activity strip with one cell per calendar day.
- Latest interval, 30-day median, and full-history median on a shared visual
  scale.
- A compact 30-day, 90-day, and full-history comparison table.
- A fixed 24-hour UTC distribution whose axis labels can shift to the visitor's
  browser time, Los Angeles time, or UTC without changing bar heights. The Los
  Angeles axis uses the PST or PDT offset active on the latest record date.
- A live vertical marker showing the current moment on the selected time axis.
- A compact homepage pulse showing elapsed time, the latest observed timestamp,
  record count, and a direct path to the full tracker.
- A source-linked event timeline.

The latest 14 intervals, UTC weekday distribution, six-hour time-band
distribution, event timeline, and provenance notes remain available in one
collapsed detail section. This keeps the first read concise while preserving
deeper inspection for visitors who need it. Original record links use compact
icon controls rather than a repeated visible Source label.

The median is emphasized because the history contains long gaps and a recent
higher-frequency period. The recent-versus-full comparison is descriptive and
no metric is labeled as a next-reset estimate.

The hourly view also remains descriptive. It identifies the same strongest
observed six-hour UTC band and relabels that fixed band for the selected time
axis; it does not infer a future reset hour.

## Official Status Data

The page requests the public JSON summaries from:

- `https://status.openai.com/api/v2/status.json`
- `https://status.claude.com/api/v2/status.json`

These APIs describe public service status. They do not provide account quota or
reset data. If either request fails, the page keeps working and directs the
visitor to the official status website.

## Public Entry Points

The tracker is available at `/ai-tools/reset-tracker/`. Lightweight entry links
are included on the homepage, the AI Tools overview, and the reviewed directory
shortcut row. It is a historical utility page rather than a reviewed vendor
page and is not included in reviewed-tool counts or rankings.

## Refresh And Deferred Automation

The history snapshot is not refreshed automatically in this release. The
homepage and tracker display the date represented by `snapshotAt`, so visitors
can distinguish a recently checked snapshot from live account telemetry.

### Daily Manual Refresh

First validate the existing file:

```bash
node scripts/validate-reset-history.mjs
```

Check the source once. If there is no new reset record, preview and then record
the completed check:

```bash
node scripts/update-reset-history.mjs --mark-checked --dry-run
node scripts/update-reset-history.mjs --mark-checked
```

If there is a new record, copy the archive's UTC observed-event time and direct
confirmation or announcement status URL. Preview the change before writing it:

```bash
node scripts/update-reset-history.mjs \
  --at "2026-08-12T00:00:00.000Z" \
  --source "https://x.com/example/status/1234567890" \
  --kind "usage" \
  --dry-run
```

Remove `--dry-run` only after reviewing the preview. The command rejects
missing or invalid kinds, duplicate timestamps, duplicate source URLs, non-status URLs, future event
times relative to the check, and a check time older than the published
snapshot. It also sorts events newest-first, updates `snapshotAt`, keeps
`coverageStartsAt` aligned with the oldest record, and updates the tracker
`lastmod` date.

After either kind of update, run:

```bash
node scripts/validate-reset-history.mjs
hugo --cleanDestinationDir --gc --minify
git diff --check
```

Review the generated tracker and sitemap before committing. Existing records
should remain immutable unless a source correction is documented.

A future public reset-event monitor should use a separate Cloudflare Worker,
scheduled polling, and a small normalized event store. It should distinguish
official events, corroborated public announcements, community reports, and
forecasts. Account pages, private endpoints, credentials, and login-protected
usage views must not be scraped.

Any future forecast should publish its source period, sample size, uncertainty,
generation time, and historical evaluation. It must not claim to predict an
individual visitor's reset window.
