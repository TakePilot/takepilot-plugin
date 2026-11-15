---
description: 広告動画を作る（商材の紹介動画を takepilot で。ad video for a 商材）
argument-hint: <what to make, e.g. "30s TikTok Shop video for our lotion">
allowed-tools: mcp__plugin_takepilot_takepilot__get_account, mcp__plugin_takepilot_takepilot__use_asset, mcp__plugin_takepilot_takepilot__list_products, mcp__plugin_takepilot_takepilot__get_product, mcp__plugin_takepilot_takepilot__get_product_dossier, mcp__plugin_takepilot_takepilot__save_product_dossier, mcp__plugin_takepilot_takepilot__set_product_url, mcp__plugin_takepilot_takepilot__set_product_audience, mcp__plugin_takepilot_takepilot__list_product_dossier_revisions, mcp__plugin_takepilot_takepilot__list_product_files, mcp__plugin_takepilot_takepilot__list_product_documents, mcp__plugin_takepilot_takepilot__get_product_document, WebSearch, mcp__plugin_takepilot_takepilot__list_avatars, mcp__plugin_takepilot_takepilot__get_avatar_setup_link, mcp__plugin_takepilot_takepilot__list_templates, mcp__plugin_takepilot_takepilot__get_template, mcp__plugin_takepilot_takepilot__list_finished_videos, mcp__plugin_takepilot_takepilot__list_voices, mcp__plugin_takepilot_takepilot__list_stock_audio, mcp__plugin_takepilot_takepilot__estimate, mcp__plugin_takepilot_takepilot__wait_jobs, mcp__plugin_takepilot_takepilot__get_job, mcp__plugin_takepilot_takepilot__get_build_check, mcp__plugin_takepilot_takepilot__list_files, mcp__plugin_takepilot_takepilot__get_file, mcp__plugin_takepilot_takepilot__get_publish_link, mcp__plugin_takepilot_takepilot__get_playbook, mcp__plugin_takepilot_takepilot__get_ad_results, mcp__plugin_takepilot_takepilot__get_gallery_post, mcp__plugin_takepilot_takepilot__list_stock_videos, mcp__plugin_takepilot_takepilot__list_catalog, mcp__plugin_takepilot_takepilot__get_render_frames, mcp__plugin_takepilot_takepilot__get_finish_check, mcp__plugin_takepilot_takepilot__list_reviews, mcp__plugin_takepilot_takepilot__get_review_comments, mcp__plugin_takepilot_takepilot__get_video_compose, mcp__plugin_takepilot_takepilot__get_video_bundle, mcp__plugin_takepilot_takepilot__request_video_bundle_upload, mcp__plugin_takepilot_takepilot__complete_video_bundle_upload, mcp__plugin_takepilot_takepilot__get_picked, mcp__plugin_takepilot_takepilot__set_video_target, Bash(mkdir -p takepilot)
---

Make a video with takepilot for this request: $ARGUMENTS

Follow the takepilot-ad skill from stage 0:

1. `get_account`: check the balance, today's spend and caps, and `workspaces`. If it lists an organization, ask which
   workspace to use (personal or that organization) and pass the same `workspace` on every call of the job.
2. For each 商材 (product) the video uses, read it with its dossier in one call (`get_product{with_dossier: true}`) and use
   the dossier as the facts; do not research it again. Note its kind and CVs and read the documents that matter (`list_product_documents`). Only if it is empty or lacks price / specs / how to use / sources, research once and
   `save_product_dossier` (see `get_playbook products`). Use the product page from `get_product`'s `url`; if it is
   empty, ask the person for it once and save it with `set_product_url`.
3. Research the genre (`get_playbook research`): reuse the 商材's document 「競合・同ジャンルの動画の傾向」 when it is under
   60 days old; else look at 5-10 TikTok / YouTube videos of the same kind of 商材 (ads and organic posts) with your own
   web search in a few minutes, save the summary to the 商材 with `save_product_document`, and tell the person in 2-4
   lines what the plan takes from it. Plan an organic-style post unless the person asks for an ad.
4. Ask only what the request and the dossier leave open (商材, who it is for, the one message, which CV (default: the main one), length, reference). A video
   with no 商材 and no SNSアカウント is fine (skip the 商材 steps; never refuse or insist on registering one). If the
   request is empty, ask what to make.
5. Read the playbook sections the next stages need together (`get_playbook{sections}`) before deciding.
6. Before any paid tool, run one `estimate` for the planned set and ask one question with choices in plain Japanese
   (「この内容で 声 6 本・カット 6 本を作ります（約 $X.XX）。1. この内容で作る 2. 内容を直す 3. やめる」; AskUserQuestion when
   you have it). Never show tool names, ids or JSON.
7. After the OK, make every voice, image and clip with one `generate_assets` (`max_usd` = the estimate's
   `batch_max_usd`; voices and images first and their clips in a second call when a clip uses them), wait with
   `wait_jobs`, then `build_video` and render.
8. Save the finished mp4 under `./takepilot/` with the skill's helper and end with the video's `page_url`, in plain words (the skill's "How to talk").
