---
description: Show takepilot balance, today's spend, caps and running jobs
allowed-tools: mcp__plugin_takepilot_takepilot__get_account, mcp__plugin_takepilot_takepilot__list_jobs, mcp__plugin_takepilot_takepilot__get_job, mcp__plugin_takepilot_takepilot__wait_jobs
---

Show the person's takepilot status:

1. Call `get_account`. Report in USD (never raw credits): balance, today's spend against the daily caps (per person
   and for this client), what is left today (`today_left_usd`), and each workspace. If the balance is low, give the
   person `top_up_url` (the web page where they buy credits; the plugin never buys).
2. If `get_account` says the plugin is older than `minPluginVersion`, say so first and how to update
   (`/plugin update takepilot`, or re-add the marketplace).
3. Call `list_jobs` and list the generations still running (kind, stage, how long). Use `get_job` only for a job the
   person asks about.

Keep it to a short table. Do not start any generation.

Answer in the person's language: the language they write in; for a bare command with no words of theirs, Japanese (takepilot is for the Japanese market).
