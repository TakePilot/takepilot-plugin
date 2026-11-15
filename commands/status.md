---
description: 残高・今日使った額・上限・動いている作業を見る
allowed-tools: mcp__plugin_takepilot_takepilot__get_account, mcp__plugin_takepilot_takepilot__list_jobs, mcp__plugin_takepilot_takepilot__get_job, mcp__plugin_takepilot_takepilot__wait_jobs
---

Show the person's takepilot status:

1. Call `get_account`. Report as `$X.XX` (never raw credits): balance, today's spend against the daily caps (あなたの 1 日、
   このエージェントの 1 日; never say クライアント), and what is left today (`today_left_usd`). Name a workspace only when
   there is more than one: then list `workspaces` and, for an organization, whether it lets the person make videos
   from the agent (`plugin_use`); `get_account{workspace}` gives its balance and the organization's day (`org_day`) only when `plugin_use` is true (otherwise it answers `org_plugin_off`).
   If the balance is low, give the person `top_up_url` (the web page where they buy credits; the plugin never buys).
2. Only if the plugin is older than `minPluginVersion`, say so and how to update (`/plugin update takepilot`, or re-add
   the marketplace). Otherwise say nothing about versions.
3. Call `list_jobs` and list what is still being made in plain words (what, how long); no ids. Use `get_job` only for a job the
   person asks about.

Keep it to a short table. Do not start any generation.

Answer in the person's language: the language they write in; for a bare command with no words of theirs, Japanese (takepilot is for the Japanese market).
