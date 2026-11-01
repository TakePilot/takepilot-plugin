---
description: Lower takepilot spend caps (per person, per client, per project)
argument-hint: <e.g. "person 20" or "project 5 for <project>">
allowed-tools: mcp__plugin_takepilot_takepilot__get_account, mcp__plugin_takepilot_takepilot__list_projects
---

Change takepilot spend caps as asked: $ARGUMENTS

Caps (USD; defaults in brackets): `person_usd` (per person per day, all clients together) [$50], `client_usd` (this
client per day) [$20], `project_usd` (generation total per project, needs `project_id`) [$10]. A single paid call is
always capped at $10 by `max_usd`. Days reset at 00:00 JST.

1. Call `get_account` to show the current caps. If the request names a project, find its id with `list_projects`.
2. If the request is empty, show the current caps and stop.
3. This version can only **lower** caps. Call `set_spend_caps` with only the values being lowered and an
   `idempotency_key` such as `caps-<YYYYMMDD>-<value>`. Claude Code asks the person to approve the call.
4. If any value is higher than the current cap, do not send it. Answer `raise_not_available`: raising caps is not
   available from the plugin in this version; it is done on the takepilot web settings.
5. Report the caps after the change.
