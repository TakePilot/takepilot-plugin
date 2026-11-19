# takepilot プラグイン

Claude Code・Claude Desktop・Codex CLI・Grok Build（ChatGPT のデスクトップアプリは MCP のツールだけ）から takepilot で、自分の SNSアカウント（YouTube・Instagram・TikTok・X・Threads）に投稿する動画と、商材（商品・サービス・求人・お店・アプリ・イベント）の広告の動画（TikTok Shop・リール・ショート）を作るプラグインです。
台本やカット割りを考えるのはお使いの Claude で、声・画像・クリップの生成、組み立て、レンダリング、保存は
takepilot のサーバーの MCP のツールが行います。生成の費用はお使いの takepilot のクレジットから引かれます。

バージョン 0.16.1（MVP、dev で試す段階。0.4.0 で Claude のアプリ・Codex・ChatGPT 向けのダウンロードを足し、0.5.0 でプロジェクトを無くし、0.5.1 で金額の書き方と見積もりの案内を直し、0.5.2 で選んだものの id をそのまま使う決まりを足し、0.5.3 で上限を上げる確かめと `list_jobs` を足し、0.5.4 で作った物に名前を付ける（build_video の title、rename_file）を足し、0.5.5 で地図のツール（search_places・plan_map_scene）と「これみたいに作る」（get_post・list_posts）を足し、0.5.6 で確認の指摘の所だけを直す流れ（get_video_compose）を足し、0.5.7 で web の選んだものを読む get_picked の使い方を足し、0.5.8 で商品を商材と呼び、商材の種類と CV、動画が狙う CV、役割ごとのファイルと資料の使い方を足し、0.5.9 で ChatGPT / Codex のアプリが受け付ける zip の形と longDescription に直した、0.5.10 で HyperFrames Studio との行き来（`get_video_bundle`・`request_video_push`・`push_video`）を足した、0.5.11 でツールが届かない ChatGPT の zip をやめ、0.5.12 で人のショットの見積もり（`people`・`each_usd`）と再試行のキーの案内を直した、0.5.13 でアバターが話すカットの割合（`get_picked` の `talking_share`）に従う決まりを足した、0.5.14 で話すカットと他のカットを 1 本に混ぜる組み立て（`broll_captions` の `{"talk": 行}`）と、話すカットの量の自動（`talking_share: "auto"`）を足し、0.5.15 で作成予定の組み合わせ（`get_picked` の `plan`、`build_video` の `combo`）に従う決まりを足し、0.5.16 で参照 7 枚以上のクリップの `max_usd` の但し書きを消した（`each_usd` で通る）、0.5.17 で `cv_` の声は文字数で見積もる案内を足した、0.5.18 でダウンロードの案内を web の接続の画面に直した、0.5.19 で狙う CV（`target_cv_id`）を組み合わせで渡す決まりと、戻した版を取り直す案内を足した、0.5.20 で話さないアバターのカット（`generate_clip` の `silent`）を足した、0.5.21 で地図の動画（`map_story`）を足し、0.5.22 で書き出しの答えに付くコマの画像を見て、目立つ問題を人に伝える決まりを足し、0.5.23 で web の「選んだもの」を「プロンプト作成」と呼ぶようにした（URL は前と同じ /picked）、0.5.24 で動画の概要（`build_video` の `summary`、`set_video_summary`）を足し、0.5.25 で自動の撮り直しをやめ、見せる額を見積もり 1 つにした（QC に落ちたクリップは人に聞いてから撮り直す）、0.5.26 で 1 回の上限を人ごとに変えられるようにした（`set_spend_caps` の `per_call_usd`、`max_usd` の天井は `get_account` の `caps_usd.per_call`）、0.5.27 で参考動画・競合の動画を手元で分析せず takepilot に読ませるツール（`import_reference`・`get_reference`・`analyze_reference`）の使い方を足した、0.5.28 で利用者の PC での書き出し（`get_video_bundle` の `local_render`、`request_local_render_upload`・`save_local_render`）を足した、0.5.29 で「狙う CV」を「動画の目的」（`build_video` の `goal`、`set_file_cv` の `goal`）にし、0.5.30 で動画の構成をワークスペースのテンプレートに保存して別の商材に使うツール（`create_template`・`update_template`・`delete_template`）を足し、0.5.31 で名指しだけの Kling 4 Flash（声を受けない・720P だけ）の扱いを足した、0.5.32 で落ち着いた話すカットを台詞の音声に口を合わせて作る方式（`generate_clip` の `mode: "lip_sync"`）と、その使い分けと広告での使い方を足した、0.5.33 で動画を作り終えたらバリエーションを見積もり付きで勧め、バリエーションを別の完成動画として作る（`build_video` の `variant_of`、`list_variations`）ようにした、0.5.34 で長い動画の切り抜き（`create_source`・`transcribe_source`・`get_source_transcript`・`add_source_clip` ほか）、字幕の書き起こし（`transcribe_captions`）、SAM の切り分け（`segment_asset`・`get_segment_job`・`cancel_segment_job`）を足した、0.5.35 で商材の添付ファイルにメモを付けて探す決まり（`request_upload` の `memo`、`list_product_files` の `q`、`update_product_file`）を足した、0.5.36 で本人の声（`cv_`）を Lip Sync の話すカットの音声に使い、同じ声ならナレーションと 1 本に入れてよい決まりにした、0.5.37 で貼られた YouTube・TikTok・Instagram の URL を利用者の PC で落とす手元のツール（スキルの `scripts/fetch-reference`）を足し、takepilot に URL を取らせる使い方をやめた、0.5.38 で指示が無くてもカメラの動き・エフェクト・モーションを入れる決まり（シーンごとの既定の組み合わせ）と、`list_catalog` の `use`・`preview`・`in` の使い方、「BGM を大きく・小さく」で `bgm.volume`・`bgm.duck` を変えて組み直す決まりを足した、0.5.39 で利用者の PC での書き出しを takepilot の手直しを入れた HyperFrames CLI（スキルの `scripts/hyperframes.mjs`、SHA-256 を確かめて入れる）に替え、エフェクトのある動画と他人のテンプレートの動画も手元で書き出せるようにした、0.5.40 で利用者が Kling を名指ししたときだけアバター自身の声で話させる `generate_clip` の `avatar_voice` と、その前に伝える注意の 1 行を足した、0.5.41 で MCP だけをつないだときの案内にスキルの入れ方を足した、0.5.42 で見積もりを実費に近い額にし、スクリプトの場所を確かにした、0.5.43 で返事と承認の画面をマーケター向けに直し、0.5.44 で権利のチェックの案内を外し、無料の手順で許可を聞かないフックと補助スクリプトを足した、0.5.45 で確認依頼を送るツール（request_review）と話すアバターの動画の手元の書き出しを足した、0.5.47 で公開の前にツールの名前を揃え（前の名前は `tool_renamed` で今の名前を返す）、スキルを短くして段ごとの手引きを `get_playbook` の節に寄せた、0.5.48 で takeout の展開を一時フォルダで確かめてから移すようにし、フックの自動の許可から外した、0.5.49 で組織のワークスペースで作る道（`get_account` の `workspaces`、どのツールにも付ける `workspace`）を足した、0.5.50 で商材を登録するときに商材の写真を 4 枚以上入れる決まり（ページの写真、人の写真、足りなければ額を見せて AI の画像）と、商材のページの写真を落とす補助スクリプトの `image` を足した、0.5.51 で声・画像・カットを 1 回でまとめて作る `generate_assets`、手引きの複数の節を 1 回で読む `get_playbook{sections}`、商材と資料を 1 回で読む `get_product{with_dossier}` と、見積もりごとに日本語の選択肢を 1 問だけ聞く決まりを足し、許可の確認を減らした、0.5.52 で Claude Desktop の読むだけのツールを Always allow にする手順を足し、「道具」を「ツール」に揃えた、0.5.53 で商材の写真をサーバーで入れるツール（URL から取る `add_product_photo_from_url`、マイファイルや作った画像から入れる `add_product_photo_from_file`）を先に使い、補助スクリプトの `image` を控えにした、0.5.54 で手引きの訴求の切り口と外れうる仮説、成果の勝ち負けから次を作る手順、つかみの型と採点、最後まで見てもらう台本の枠組みを足した、0.5.55 で作る前に同じ種類の商材の TikTok・YouTube の動画を調べて商材に残す段と、広告に見えないオーガニックの投稿を既定にし AI 感を減らす決まりを足した、0.5.56 で 1〜2 秒の短いカットを多く入れるのを既定にし、同じ場面のカットを 1 回の生成（`[Shot N]` の書き方）で作って切り分ける手順を足した。MiniMax H3 は 1〜15 秒を作れる。ストックの映像は人が頼んだときだけ使う。0.6.0 で商材を登録した後に競合（商材とは別の記録）と、競合・自社の広告と投稿、同じ分野で伸びている動画を集めてマイファイルの「参考動画」に残す段（`collect`）と、参考動画をこのエージェントが補助スクリプトの `sheet` のコマと書き起こしで分析する決まりを足した（takepilot の Gemini の分析 `analyze_reference` は頼まれたときに使う）、0.6.1 で元の動画の人物を全身の画像の人物に入れ替える `generate_clip` の `ref_videos`・`body_key` と、その手引きの節 `swap` を足した、0.6.2 で実在の街を 3D で見せる動画の見積もりの前に、PLATEAU の建物の 3D データの有無・LOD・年度を調べるツール `check_plateau` を足した、0.6.3 でアバターを作り、カタログ・声・話す動画の確認を作って承認するツール（`create_avatar`・`set_avatar_media`・`set_avatar_profile`・`get_avatar_checks`・`make_avatar_check`・`approve_avatar_check`・`confirm_avatar`）を足した、0.6.4 でアバターは人だけが web で作るという古い案内を直し、渡された顔・全身・声から確認ごとに人の OK をもらって作る決まりにした、0.6.5 で人物の入れ替えでは服を元の動画のままにする決まり（元の動画の服をプロンプトに書き、全身の画像の服は使わない）を足した、0.7.0 で SNSアカウント（自分の YouTube・Instagram・TikTok・X のアカウントをまとめたもの）を登録する・アイデアから一緒に考えるツール（`create_sns_account` ほか）と手引きの節 `sns-accounts`、`build_video` の `sns_account_id` を足した、0.8.0 で Threads、SNS ごとのプロフィール文、競合のアカウント（`create_sns_account{kind: "competitor"}`・`link_sns_account_competitor`）と、SNS のプロフィールの画面から読んだ数字の記録（`save_sns_account_stats`・`list_sns_account_stats`）を足した、0.9.0 で完成動画の SNS への投稿（`add_sns_post`・`list_sns_posts`）と、投稿の画面から読んだ数字とコメントの記録（`save_sns_post_stats`）、X の投稿の数字をサーバーで読む有料のツール（`fetch_x_post_stats`）、手引きの節 `sns-posts` を足した、0.10.0 で動画や音から BGM を抜く・声だけにする・特定の音を消す有料のツール（`separate_audio`、Meta の SAM Audio）と手引きの節 `sounds` を足し、0.10.1 でおまかせの動画のエンジンが MiniMax H3 Flash になったことを手引きに書いた、0.11.0 で MiniMax H3 Flash の「まとめて作る」（`generate_clip` の `flash_mode: "batch"`、予約だけしてサーバーが全員分をまとめて作る。`list_batch_clips`・`cancel_batch_clip`・`run_batch_clip_fast`）を足した、0.12.0 で文字や画像から 3D モデルを作る有料のツール（`generate_3d_model`、Tripo）と、部品を順に付けていく 3D の場面（`broll_captions` の `models`）、手引きの節 `models3d` を足した、0.13.0 で文や画像・動画・音について、はい・いいえと多択の質問に Jev が確率で答える有料のツール（`judge`、判定）と手引きの節 `judge` を足した、0.14.0 で完成動画の用途（`set_video_usage`、`build_video` の `usage`。SNS 投稿の動画はターゲットの層だけを聞く）、ナレッジの欄（`set_video_summary` の `hook`・`reasons`・`rejected`・`tools_note`・`next`）、動画ごとの調査メモ（`save_research_note`）と添付ファイル（`attach_video_file`・`detach_video_file`、上げるときの `video_id`）、マイファイルの資料（PDF・CSV・テキスト・markdown）を足した、0.14.1 で名指しできる動画のエンジンから Google Veo を外した、0.14.2 で名指しのときだけ使う動画の編集のエンジン Higgsfield Genjutsu（`higgsfield-genjutsu`・`-light`・`-swap`）を手引きに足した、0.14.3 でテンプレートのカード（図・グラフ・式・コード・QR・動く絵文字）、ショットの間の転換、地図の上の動き、字幕の文節での改行（`compose` の `cards`・`transitions`・`map_layers`・`auto_wrap`）を手引きに足した、0.14.4 で説明に SNSアカウントの投稿と Threads、組織の 1 日の上限を足した、0.14.5 で紹介プログラムの紹介リンクと自分の報酬を読む `get_referral_summary` を足した、0.14.6 で紹介した相手を並べ替えてページごとに読む `list_referral_referred` を足した、0.14.7 でおまかせの人が話すカットを H3 Max で作る案内にした、0.14.8 で名指しの Seedance に自分の音で作らせる `generate_clip` の `sound` と、その音をクリップの下で鳴らす `compose` の `clip_sound` を足し、0.14.10 で名指しの Seedance に話すカットの声（`ref_audio`）と、編集の元の音を残す `keep_source_sound` を渡せるようにした、0.14.11 で人が写るカットの最初のコマを Seedream 5.5 で作り（顔・商材・見た目の参照の画像、参照は 10 枚まで）、そのコマから H3 Max で動かす流れを標準にした、0.14.13 で画像の既定のモデルを Seedream 5.5 にした（`generate_image` の `model` を省く。ほかのモデルは人が名指ししたときだけ）、0.15.0 で話し声をタイミングのままアバターの声に変える有料のツール（`convert_voice`、TakePilot Voice Changer）と、人物の入れ替えで元の人の話し声を変えて使う手順（手引きの `swap` §5）を足した、0.15.1 でプロンプト作成で選んだ画質と動画のモデル 1 つ（`get_picked` の `plan.video`）に従い、渡せない素材が要るカットだけ自動で作る案内を足し、0.15.2 で切り抜きの動画の組み立て（上に出し続ける題、横長の映像を切らずに幅いっぱいに置く枠、話している語を光らせる下の字幕、決めた所だけ寄るカメラ）の案内を足し、0.15.3 で声の変換の名前を TakePilot Voice Changer にそろえ、0.15.4 で上げる音に種類（効果音・BGM・声）を付ける `complete_file_upload` の `audio_role` と、あとから直す `set_file_audio_role` を足し、0.15.5 で動画は先に Gemini で要約して使う区間だけ文字起こしする流れ（公開の YouTube は `summarize_video` に URL のまま）を足し、0.16.0 で完成動画の作り方をワークフロー（ステップを並べたフロー）の Markdown に書くスキル `takepilot-workflow` と、手引きの節 `workflows` を足した、0.16.1 で「みんなの作品」の名前を「ギャラリー」に直した）。

ダウンロード: web の 設定 › AI エージェントをつなぐ（https://app.takepilot.ai/settings/agent）。入れ方は https://docs.takepilot.ai/ja/plugin#setup 。

## 入れる

前提: takepilot のアカウントを web（https://app.takepilot.ai）で作り、承認を受け、クレジットを入れてあること。

許可について: 読むだけの手順と、お金のかからない決まった手順では許可を聞きません（`hooks/hooks.json`）。お金がかかるツール、PC からファイルを送る手順、PC で書き出す手順は、毎回聞きます。

### 手元のチェックアウトから（開発）

```
/plugin marketplace add /path/to/takepilot/software/plugin
/plugin install takepilot@takepilot
```

dev のサーバーにつなぐときは、Claude Code を起動する前に URL を変えます（既定は本番の `https://api.takepilot.ai/v1/mcp`）。

```
export TAKEPILOT_MCP_URL=https://api-dev.takepilot.ai/v1/mcp
claude
```

### 配布のリポジトリから

公開のリポジトリ `TakePilot/takepilot-plugin` から入れます。

```
/plugin marketplace add TakePilot/takepilot-plugin
/plugin install takepilot@takepilot
```

## ログイン

1. `/mcp` を開き、`takepilot` を選んで認証します。
2. ブラウザで takepilot の同意の画面が開きます。**つながるのは、そのブラウザでログインしている takepilot のアカウントです。**
   画面の「ログイン中のアカウント」を確かめ、違えば「別のアカウントでログイン」を押してから許可してください。
3. 許可（`read`・`write`・`spend`）を選んで「許可」を押すと、Claude Code に戻ります。

つないだエージェントは web の 設定 › AI エージェントをつなぐ に出て、そこから切れます。切ると、上げた 1 日の上限は既定に戻ります（下げた値は残ります）。

## 使う

| コマンド | すること |
|---|---|
| `/takepilot:make <依頼>` | 依頼から動画を 1 本作る（例: `/takepilot:make 化粧水の 30 秒の TikTok Shop 動画`） |
| `/takepilot:status` | 残高、今日の使用額と残り、上限、動いている生成 |
| `/takepilot:caps <新しい値>` | 上限を下げる（すぐ効く）。上げる値は確かめのページの URL を出す |

コマンドを使わず「〇〇の広告動画を作って」と頼んでも、スキル `takepilot-ad` が動きます。
「この動画のワークフローを書いて」と頼むと、スキル `takepilot-workflow` が完成動画の作り方をワークフローの Markdown にします（公開は web でします）。

## 費用と上限

- 有料のツール（声・画像・クリップ・組み立て・レンダリング）は、呼ぶ前に Claude が見積もり（`estimate`）を見せて確かめ、
  Claude Code も呼ぶたびに許可を聞きます。
- 見せる額は見積もり 1 つです。1 回の呼び出しの請求は、その見積もりを超えません（実費で引きます）。
- 自動では撮り直しません。QC に落ちたクリップは、何が違うかを Claude が伝え、撮り直すかを聞きます。撮り直しは新しい見積もりを見せてからの新しい呼び出しです。
- 上限（既定）: 1 回 USD 10（人ごとに変えられる。上げられるのは人の 1 日と USD 100 の小さい方まで）、このクライアントの 1 日 USD 20、人の 1 日 USD 50（全クライアントの合計）。組織のワークスペースでは、メンバー全員の合計で 1 日 USD 50 です。口座の上限なので動画ごとには出さず、当たったときだけ言います。
  日本時間の 0 時に戻ります。
- 下げるのはプラグインからも web からもすぐ効きます。上げるのは、web の 設定 › 上限 か、プラグインが出す確かめの URL を
  本人がブラウザで開き、パスキーかメールのコードで確かめたときだけです（AI は上げられません）。
- 額は毎回の見積もり（`estimate`）で出します。値段は変わるので、このファイルには目安の額を書きません。
- 残高が足りないときは、`/takepilot:status` が web のクレジットの購入ページを案内します。
- 動画の生成は日本の市場向けだけです（MiniMax H3 のライセンスの条件）。

## できたファイル

- 作業しているフォルダの `./takepilot/` に保存します。
- 保存できないとき（シェルが閉じられている、ネットにつながらない）は、24 時間有効のダウンロードのリンクを出します。
- できたものは web のマイファイルにも残ります。

## 共有の PC で使ったあと

`/mcp` で `takepilot` を選び、接続を切ってトークンを消してください。web の設定から、このクライアントの許可を取り消すこともできます。

## Claude Desktop

チャットのモード（左上の切り替えの左）で、`takepilot-claude-plugin.zip` を展開せずに **Customize → Plugins → Add → Upload plugin** で上げます。
プラグインの **Connectors** タブで `takepilot` → **Connect** → **Add custom connector** の **Continue** → そのまま **Add** → もう一度 **Connect** → ブラウザで **Continue connecting** → 許可、の順です（Connect は 2 回あります）。
Code タブで「Couldn't start sign-in」と出たら、チャットのモードで Connect を押します。
Team・Enterprise では、コネクタを足すのは組織の Owner です。チャットにはシェルが無いので、できた動画はダウンロードの URL で受け取ります。

許可の確認を減らすには、**Customize → Connectors** で `takepilot` を選び、**Tool permissions** の **Read-only tools**（読むだけのツール）を **Always allow** にします。
読むだけのツールは、商材・マイファイル・残高などを見るだけで、何も変えず、クレジットも使いません。
**Write/delete tools**（クレジットを使うツールを含む）は **Needs approval** のままにします。エージェントが見積もりを見せて日本語の選択肢で聞いたうえで、呼ぶたびに許可を聞かれます。
手順: https://docs.takepilot.ai/ja/plugin#claude-app-permissions

## ChatGPT のデスクトップアプリ

プラグインは入れず、カスタムの MCP サーバーとしてつなぎます。入るのはツールと `get_playbook` の手引きだけで、スキルとコマンドは入りません。
**Plugins → Add → Add custom MCP server** で、Name に `takepilot`、Server URL に `https://api.takepilot.ai/v1/mcp` を入れ、Authentication は OAuth のまま
**I understand and want to continue** にチェックして **Create as a plugin** → **Connect** → ブラウザで許可します。**Chat** のモードで `@takepilot` に頼みます。**Work** のモードではツールが出ません。

## Codex CLI

手順はこのとおりです（zip から入れたときは、その中の README `clients/codex.md`）:

```
codex plugin marketplace add TakePilot/takepilot-plugin
codex plugin add takepilot@takepilot
codex mcp login takepilot
```

## MCP だけをつなぐとき

プラグインを入れられないエージェントでは、次の 2 つを足します。MCP はツール、スキルは作り方で、MCP だけでは作り方が入りません。

1. `https://api.takepilot.ai/v1/mcp` をリモートの MCP サーバーとして足します。
2. [takepilot-skill.zip](https://github.com/TakePilot/takepilot-plugin/releases/latest/download/takepilot-skill.zip) をスキルとして入れます。スキルを足す画面があれば zip をそのまま上げ、フォルダから読むエージェントなら展開した `takepilot-ad` を置きます。入れられないエージェントでは、動画を頼むときに「get_playbook を読んでから作って」と添えます。

---

## English

takepilot plugin for Claude Code, Claude Desktop, Codex CLI and Grok Build (the ChatGPT desktop app gets the MCP tools only): your agent plans ad videos for offerings (products, services, jobs, stores, apps, events) (TikTok Shop, Reels, Shorts); takepilot's
remote MCP tools generate voice, images and clips, build, render and store them, charged to your takepilot credits.

- **Install (local checkout)**: `/plugin marketplace add /path/to/takepilot/software/plugin`, then
  `/plugin install takepilot@takepilot`. Or: `/plugin marketplace add TakePilot/takepilot-plugin` (public).
- **Dev server**: start Claude Code with `TAKEPILOT_MCP_URL=https://api-dev.takepilot.ai/v1/mcp` (default is production).
- **Login**: `/mcp` -> `takepilot` -> authenticate in the browser. The account connected is the one signed in to takepilot in that browser; check it on the consent page.
- **Commands**: `/takepilot:make <request>`, `/takepilot:status`, `/takepilot:caps <values>` (lowering applies at once; a raise gives a confirmation link).
- **Approvals**: read-only and fixed free steps do not ask (`hooks/hooks.json`). Paid tools, sending a file off this computer and rendering on it ask every time.
- **Costs**: every paid call is estimated and confirmed first. Default caps: USD 10 per call (adjustable per person, up
  to the daily cap and USD 100), USD 20 per client per day, USD 50 per person per day, USD 50 per organization per day (all members together). Japan market only (MiniMax H3 license).
- **Files**: saved to `./takepilot/`; if saving fails, a download link (valid for 24 hours) is shown.
- **Shared PC**: disconnect `takepilot` in `/mcp`, or disconnect it on the web (Settings > Connect an AI agent). Disconnecting on the web returns a raised daily cap to the default; a lowered one stays.
- **Claude Desktop**: upload `takepilot-claude-plugin.zip` as is in chat mode (Customize > Plugins > Add > Upload plugin), then on its Connectors tab: `takepilot` > Connect > Continue > Add > Connect again > Continue connecting in the browser > allow. In the Code tab, Connect can fail with "Couldn't start sign-in": use chat mode. To get fewer permission prompts, open Customize > Connectors > `takepilot` > Tool permissions and set **Read-only tools** to **Always allow** (they only read your offerings, files and balance, and spend nothing); keep **Write/delete tools**, which include the tools that spend credits, on **Needs approval**.
- **ChatGPT desktop app** (MCP tools and `get_playbook` only; no skills or commands): Plugins > Add > Add custom MCP server, Name `takepilot`, Server URL `https://api.takepilot.ai/v1/mcp`, Authentication OAuth, tick "I understand and want to continue", Create as a plugin, Connect, allow in the browser. Use **Chat** mode with `@takepilot`; the tools don't appear in Work mode.
- **Codex CLI**: `codex plugin marketplace add TakePilot/takepilot-plugin`, `codex plugin add takepilot@takepilot`, `codex mcp login takepilot`.
- **MCP only** (agents that cannot install the plugin): the MCP is the tools, the skill is how to make the video, so add both. (1) Add `https://api.takepilot.ai/v1/mcp` as a remote MCP server. (2) Add the skill from [takepilot-skill.zip](https://github.com/TakePilot/takepilot-plugin/releases/latest/download/takepilot-skill.zip): upload it as is where the agent has a screen for adding skills, or unzip `takepilot-ad` into its skills folder. If the agent can't take skills, add "read get_playbook first" when you ask for a video.
- **Downloads**: Settings > Connect an AI agent on the web (https://app.takepilot.ai/settings/agent). Setup: https://docs.takepilot.ai/en/plugin#setup.

## 出典 / Credits

手引き（`get_playbook` の variations・results・scripts・pacing）の一部は、MIT ライセンスの [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)（Corey Haines）と [social-media-skills/skills](https://github.com/social-media-skills/skills)（Frank Heijdenrijk）の考え方を、日本語の縦型の広告向けに書き直したものです（adapted from）。表記は [NOTICE](NOTICE) にあります。
