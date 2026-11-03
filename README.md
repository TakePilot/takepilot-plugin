# takepilot プラグイン

Claude Code・Claude Desktop・Codex CLI・Grok Build（ChatGPT のデスクトップアプリは MCP の道具だけ）から takepilot で商材（商品・サービス・求人・お店・アプリ・イベント）の広告の動画（TikTok Shop・リール・ショート）を作るプラグインです。
台本やカット割りを考えるのはお使いの Claude で、声・画像・クリップの生成、組み立て、レンダリング、保存は
takepilot のサーバーの MCP の道具が行います。生成の費用はお使いの takepilot のクレジットから引かれます。

バージョン 0.5.21（MVP、dev で試す段階。0.4.0 で Claude のアプリ・Codex・ChatGPT 向けのダウンロードを足し、0.5.0 でプロジェクトを無くし、0.5.1 で金額の書き方と見積もりの案内を直し、0.5.2 で選んだものの id をそのまま使う決まりを足し、0.5.3 で上限を上げる確かめと `list_jobs` を足し、0.5.4 で作った物に名前を付ける（build_video の title、rename_file）を足し、0.5.5 で地図の道具（search_places・plan_map_scene）と「これみたいに作る」（get_post・list_posts）を足し、0.5.6 で確認の指摘の所だけを直す流れ（get_video_compose）を足し、0.5.7 で web の選んだものを読む get_picked の使い方を足し、0.5.8 で商品を商材と呼び、商材の種類と CV、動画が狙う CV、役割ごとのファイルと資料の使い方を足し、0.5.9 で ChatGPT / Codex のアプリが受け付ける zip の形と longDescription に直した、0.5.10 で HyperFrames Studio との行き来（`get_video_bundle`・`request_video_push`・`push_video`）を足した、0.5.11 で道具が届かない ChatGPT の zip をやめ、0.5.12 で人のショットの見積もり（`people`・`each_usd`）と再試行のキーの案内を直した、0.5.13 でアバターが話すカットの割合（`get_picked` の `talking_share`）に従う決まりを足した、0.5.14 で話すカットと他のカットを 1 本に混ぜる組み立て（`broll_captions` の `{"talk": 行}`）と、話すカットの量の自動（`talking_share: "auto"`）を足し、0.5.15 で作成予定の組み合わせ（`get_picked` の `plan`、`build_video` の `combo`）に従う決まりを足し、0.5.16 で参照 7 枚以上のクリップの `max_usd` の但し書きを消した（`each_usd` で通る）、0.5.17 で `cv_` の声は文字数で見積もる案内を足した、0.5.18 でダウンロードの案内を web の接続の画面に直した、0.5.19 で狙う CV（`target_cv_id`）を組み合わせで渡す決まりと、戻した版を取り直す案内を足した、0.5.20 で話さないアバターのカット（`generate_clip` の `silent`）を足した、0.5.21 で地図の動画（`map_story`）を足した）。

ダウンロード: web の 設定 › AI エージェントをつなぐ（https://app.takepilot.ai/settings/agent）。入れ方は https://docs.takepilot.ai/ja/plugin#setup 。

## 入れる

前提: takepilot のアカウントを web（https://app.takepilot.ai）で作り、承認を受け、クレジットを入れてあること。

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

## 費用と上限

- 有料の道具（声・画像・クリップ・組み立て・レンダリング）は、呼ぶ前に Claude が見積もり（`estimate`）を見せて確かめ、
  Claude Code も呼ぶたびに許可を聞きます。
- 上限（既定）: 1 回 USD 10、このクライアントの 1 日 USD 20、人の 1 日 USD 50（全クライアントの合計）。
  日本時間の 0 時に戻ります。
- 下げるのはプラグインからも web からもすぐ効きます。上げるのは、web の 設定 › 上限 か、プラグインが出す確かめの URL を
  本人がブラウザで開き、パスキーかメールのコードで確かめたときだけです（AI は上げられません）。
- 額は毎回の見積もり（`estimate`）で出します。値段は変わるので、このファイルには目安の額を書きません。
- 残高が足りないときは、`/takepilot:status` が web のクレジットの購入ページを案内します。
- 動画の生成は日本の市場向けだけです（MiniMax H3 のライセンスの条件）。

## できたファイル

- 作業しているフォルダの `./takepilot/` に保存します。
- 保存できないとき（シェルが閉じられている、ネットにつながらない）は、30 分有効のダウンロードの URL を出します。
- できたものは web のマイファイルにも残ります。

## 共有の PC で使ったあと

`/mcp` で `takepilot` を選び、接続を切ってトークンを消してください。web の設定から、このクライアントの許可を取り消すこともできます。

## Claude Desktop

チャットのモード（左上の切り替えの左）で、`takepilot-claude-plugin.zip` を展開せずに **Customize → Plugins → Add → Upload plugin** で上げます。
プラグインの **Connectors** タブで `takepilot` → **Connect** → **Add custom connector** の **Continue** → そのまま **Add** → もう一度 **Connect** → ブラウザで **Continue connecting** → 許可、の順です（Connect は 2 回あります）。
Code タブで「Couldn't start sign-in」と出たら、チャットのモードで Connect を押します。
Team・Enterprise では、コネクタを足すのは組織の Owner です。チャットにはシェルが無いので、できた動画はダウンロードの URL で受け取ります。

## ChatGPT のデスクトップアプリ

プラグインは入れず、カスタムの MCP サーバーとしてつなぎます。入るのは道具と `get_playbook` の手引きだけで、スキルとコマンドは入りません。
**Plugins → Add → Add custom MCP server** で、Name に `takepilot`、Server URL に `https://api.takepilot.ai/v1/mcp` を入れ、Authentication は OAuth のまま
**I understand and want to continue** にチェックして **Create as a plugin** → **Connect** → ブラウザで許可します。**Chat** のモードで `@takepilot` に頼みます。**Work** のモードでは道具が出ません。

## Codex CLI

手順はこのとおりです（zip から入れたときは、その中の README `clients/codex.md`）:

```
codex plugin marketplace add TakePilot/takepilot-plugin
codex plugin add takepilot@takepilot
codex mcp login takepilot
```

## MCP だけをつなぐとき

プラグインを入れられないエージェントでは、`https://api.takepilot.ai/v1/mcp` をリモートの MCP サーバーとして足します。スキルとコマンドは入りません。

---

## English

takepilot plugin for Claude Code, Claude Desktop, Codex CLI and Grok Build (the ChatGPT desktop app gets the MCP tools only): your agent plans ad videos for offerings (products, services, jobs, stores, apps, events) (TikTok Shop, Reels, Shorts); takepilot's
remote MCP tools generate voice, images and clips, build, render and store them, charged to your takepilot credits.

- **Install (local checkout)**: `/plugin marketplace add /path/to/takepilot/software/plugin`, then
  `/plugin install takepilot@takepilot`. Or: `/plugin marketplace add TakePilot/takepilot-plugin` (public).
- **Dev server**: start Claude Code with `TAKEPILOT_MCP_URL=https://api-dev.takepilot.ai/v1/mcp` (default is production).
- **Login**: `/mcp` -> `takepilot` -> authenticate in the browser. The account connected is the one signed in to takepilot in that browser; check it on the consent page.
- **Commands**: `/takepilot:make <request>`, `/takepilot:status`, `/takepilot:caps <values>` (lowering applies at once; a raise gives a confirmation link).
- **Costs**: every paid call is estimated and confirmed first. Default caps: USD 10 per call, USD 20 per client per
  day, USD 50 per person per day. Japan market only (MiniMax H3 license).
- **Files**: saved to `./takepilot/`; if saving fails, a 30-minute download URL is shown.
- **Shared PC**: disconnect `takepilot` in `/mcp`, or disconnect it on the web (Settings > Connect an AI agent). Disconnecting on the web returns a raised daily cap to the default; a lowered one stays.
- **Claude Desktop**: upload `takepilot-claude-plugin.zip` as is in chat mode (Customize > Plugins > Add > Upload plugin), then on its Connectors tab: `takepilot` > Connect > Continue > Add > Connect again > Continue connecting in the browser > allow. In the Code tab, Connect can fail with "Couldn't start sign-in": use chat mode.
- **ChatGPT desktop app** (MCP tools and `get_playbook` only; no skills or commands): Plugins > Add > Add custom MCP server, Name `takepilot`, Server URL `https://api.takepilot.ai/v1/mcp`, Authentication OAuth, tick "I understand and want to continue", Create as a plugin, Connect, allow in the browser. Use **Chat** mode with `@takepilot`; the tools don't appear in Work mode.
- **Codex CLI**: `codex plugin marketplace add TakePilot/takepilot-plugin`, `codex plugin add takepilot@takepilot`, `codex mcp login takepilot`.
- **MCP only** (agents that cannot install the plugin): add `https://api.takepilot.ai/v1/mcp` as a remote MCP server. Skills and commands are not included.
- **Downloads**: Settings > Connect an AI agent on the web (https://app.takepilot.ai/settings/agent). Setup: https://docs.takepilot.ai/en/plugin#setup.
