---
description: Make a product / ad video with takepilot from a request
argument-hint: <what to make, e.g. "30s TikTok Shop video for our lotion">
allowed-tools: mcp__plugin_takepilot_takepilot__get_account, mcp__plugin_takepilot_takepilot__list_projects, mcp__plugin_takepilot_takepilot__list_products, mcp__plugin_takepilot_takepilot__get_product, mcp__plugin_takepilot_takepilot__get_product_dossier, mcp__plugin_takepilot_takepilot__save_product_dossier, mcp__plugin_takepilot_takepilot__set_product_url, mcp__plugin_takepilot_takepilot__list_avatars, mcp__plugin_takepilot_takepilot__avatar_setup_link, mcp__plugin_takepilot_takepilot__list_templates, mcp__plugin_takepilot_takepilot__get_template, mcp__plugin_takepilot_takepilot__list_voices, mcp__plugin_takepilot_takepilot__list_audio, mcp__plugin_takepilot_takepilot__estimate, mcp__plugin_takepilot_takepilot__wait_jobs, mcp__plugin_takepilot_takepilot__get_job, mcp__plugin_takepilot_takepilot__get_preview, mcp__plugin_takepilot_takepilot__list_files, mcp__plugin_takepilot_takepilot__get_file, mcp__plugin_takepilot_takepilot__publish_link, mcp__plugin_takepilot_takepilot__get_playbook, mcp__plugin_takepilot_takepilot__get_ad_results, mcp__plugin_takepilot_takepilot__get_post, mcp__plugin_takepilot_takepilot__list_stock, mcp__plugin_takepilot_takepilot__list_catalog, mcp__plugin_takepilot_takepilot__snapshot, mcp__plugin_takepilot_takepilot__get_review, Bash(mkdir -p takepilot)
---

Make a video with takepilot for this request: $ARGUMENTS

Follow the takepilot-ad skill from stage 0:

1. `get_account`: check the balance, today's spend and caps, and the workspace. If there is more than one workspace
   (personal and organizations), ask which one to use.
2. For each product the video uses, read its dossier (`get_product_dossier`) and use it as the facts; do not research
   the product again. Only if it is empty or lacks price / specs / how to use / sources, research once and
   `save_product_dossier` (see `get_playbook products`). Use the product page from `get_product`'s `url`; if it is
   empty, ask the person for it once and save it with `set_product_url`.
3. Ask only what the request and the dossier leave open (product, who it is for, the one message, length, CTA, reference). If the
   request is empty, ask what to make.
4. Read the playbook sections (`get_playbook`) before each decision.
5. Before any paid tool (generate_speech, generate_image, generate_clip, build_video, render_video), run one
   `estimate` for the planned set, tell the person the count and the USD total, and wait for their OK.
6. Save the finished mp4 under `./takepilot/`; if that fails, show the download URL.
