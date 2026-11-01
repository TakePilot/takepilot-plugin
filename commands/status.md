---
description: Show takepilot balance, today's spend, caps and running jobs
allowed-tools: mcp__plugin_takepilot_takepilot__get_account, mcp__plugin_takepilot_takepilot__list_projects, mcp__plugin_takepilot_takepilot__get_job, mcp__plugin_takepilot_takepilot__wait_jobs
---

Show the person's takepilot status:

1. Call `get_account`. Report in USD (never raw credits): balance, today's spend against the daily caps (per person
   and for this client), and each workspace.
2. If `get_account` says the plugin is older than `minPluginVersion`, say so first and how to update
   (`/plugin update takepilot`, or re-add the marketplace).
3. If job ids from this session are still running, check them with `get_job` and list their status.

Keep it to a short table. Do not start any generation.
