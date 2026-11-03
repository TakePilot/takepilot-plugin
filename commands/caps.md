---
description: Lower takepilot spend caps at once, or ask to raise them (the person confirms on the web)
argument-hint: <e.g. "person 20" or "client 10">
allowed-tools: mcp__plugin_takepilot_takepilot__get_account
---

Change takepilot spend caps as asked: $ARGUMENTS

Answer in the person's language: the language they write in; for a bare command with no words of theirs, Japanese (takepilot is for the Japanese market).

Caps (USD; defaults in brackets): `person_usd` (per person per day, all clients together) [USD 50], `client_usd` (this
client per day) [USD 20]. A single paid call is always capped at USD 10 by `max_usd`. Days reset at 00:00 JST.

1. Call `get_account` to show the current caps.
2. If the request is empty, show the current caps and stop.
3. Call `set_spend_caps` with the values asked for and an `idempotency_key` such as `caps-<YYYYMMDD>-<value>`.
   Claude Code asks the person to approve the call. Lower values take effect at once.
4. A higher value is never applied by the plugin. The answer is `status: "confirmation_required"` with a
   `confirm_url`: give the person that link and say that they must open it in their own browser, where takepilot asks
   for a passkey or an email code (valid 15 minutes). Never open it or confirm it for them. The same can be done on the
   takepilot web: 設定 › 上限.
5. Report the caps after the change.
