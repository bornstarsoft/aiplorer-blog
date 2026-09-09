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

`data/codex_reset_history.json` contains a manually checked snapshot of 52
public Codex reset/credit announcements observed between September 17, 2025 and
September 8, 2026, checked on September 9. Each row stores the UTC announcement
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
