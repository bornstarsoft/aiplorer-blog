# Surface official transition dates in Change Watch

WORK-ID: AIP-CHANGE-WATCH-TRANSITION-DATES
ACTIVE_WRITER = NONE

Base: bf1d511. Owner approved a Change Watch improvement and scoped
production deployment. Keep the homepage, RSS, existing read keys,
and unrelated WIP unchanged.

Verified on November 18, 2026:

- [Claude API](https://platform.claude.com/docs/en/about-claude/model-deprecations): Sonnet 4.5 API retirement, November 30, 2026.
- [OpenAI Help](https://help.openai.com/en/articles/20001638-retiring-advanced-and-standard-voice-in-chatgpt): Advanced and Standard voice conversation retirement, December 11, 2026.
- [Pipedream](https://pipedream.com/docs/workflows): Workflows and String shutdown, March 31, 2027. Connect is separate.

Keep the published notice dates and revisions. Read provider calendar
dates without assuming a time or timezone; the upcoming list includes
today and hides older dates using the local browser calendar. Removing
a date from that list does not confirm a rollout or remove the notice.

Last AI: Codex. Source review, implementation, and local QA: DONE on main.
QA: PASS. Hugo draft and production builds, 248 Node tests, 67 records,
and byte-identical home and RSS. Playwright verified date order, mobile
fit, deep links, day boundaries, and unaffected read/follow-up state.
NEXT_SINGLE_TASK: verify the scoped deployment on Cloudflare Pages.
Blocker: none at local QA. Owner approved scoped production deployment.
