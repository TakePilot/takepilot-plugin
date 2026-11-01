# takepilot プラグイン（Claude Code）

手元の Claude Code から takepilot で商品紹介・広告の動画（TikTok Shop・リール・ショート）を作るプラグインです。
台本やカット割りを考えるのはお使いの Claude で、声・画像・クリップの生成、組み立て、レンダリング、保存は
takepilot のサーバーの MCP の道具が行います。生成の費用はお使いの takepilot のクレジットから引かれます。

版 0.2.0（MVP、dev で試す段階。0.2.0 で商品の資料を足した）。

## 入れる

前提: takepilot のアカウントを web（https://app.takepilot.ai）で作り、クレジットを入れてあること。

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

### 配布のリポジトリから（予定）

招待した GitHub アカウントに `TakePilot/takepilot-plugin`（非公開）を読む権限を付けて配ります。

```
/plugin marketplace add TakePilot/takepilot-plugin
/plugin install takepilot@takepilot
```

## ログイン

`/mcp` を開き、`takepilot` を選んで認証します。ブラウザで takepilot にログインし、許可（`read`・`write`・`spend`）と
このクライアントの 1 日の上限を選びます。

## 使う

| コマンド | すること |
|---|---|
| `/takepilot:make <依頼>` | 依頼から動画を 1 本作る（例: `/takepilot:make 化粧水の 30 秒の TikTok Shop 動画`） |
| `/takepilot:status` | 残高、今日の使用額、上限、動いているジョブ |
| `/takepilot:caps <新しい値>` | 上限を下げる（この版は下げるだけ。上げるのは web の設定から） |

コマンドを使わず「〇〇の広告動画を作って」と頼んでも、スキル `takepilot-ad` が動きます。

## 費用と上限

- 有料の道具（声・画像・クリップ・組み立て・レンダリング）は、呼ぶ前に Claude が見積もり（`estimate`）を見せて確かめ、
  Claude Code も呼ぶたびに許可を聞きます。
- 上限（既定）: 1 回 $10、このクライアントの 1 日 $20、人の 1 日 $50（全クライアントの合計）、1 プロジェクト $10。
  日本時間の 0 時に戻ります。
- 目安: MiniMax H3 のクリップは 6 秒で約 $0.1〜0.3（480P・768P）【仮定】。正しい額は毎回の見積もりで出ます。
- 動画の生成は日本の市場向けだけです（MiniMax H3 のライセンスの条件）。

## できたファイル

- 作業しているフォルダの `./takepilot/` に保存します。
- 保存できないとき（シェルが閉じられている、ネットにつながらない）は、30 分有効のダウンロードの URL を出します。
- できたものは web のマイファイルにも残ります。

## 共有の PC で使ったあと

`/mcp` で `takepilot` を選び、接続を切ってトークンを消してください。web の設定から、このクライアントの許可を取り消すこともできます。

## Codex（未検証）

```
codex mcp add takepilot --url https://api.takepilot.ai/v1/mcp
codex mcp login takepilot
```

dev は URL を `https://api-dev.takepilot.ai/v1/mcp` にします。スキルは `skills/takepilot-ad/` を `~/.codex/skills/` に写して使います。

---

## English

takepilot plugin for Claude Code: your Claude plans product / ad videos (TikTok Shop, Reels, Shorts); takepilot's
remote MCP tools generate voice, images and clips, build, render and store them, charged to your takepilot credits.

- **Install (local checkout)**: `/plugin marketplace add /path/to/takepilot/software/plugin`, then
  `/plugin install takepilot@takepilot`. Later: `/plugin marketplace add TakePilot/takepilot-plugin` (private, by invite).
- **Dev server**: start Claude Code with `TAKEPILOT_MCP_URL=https://api-dev.takepilot.ai/v1/mcp` (default is production).
- **Login**: `/mcp` -> `takepilot` -> authenticate in the browser.
- **Commands**: `/takepilot:make <request>`, `/takepilot:status`, `/takepilot:caps <values>` (lowering only).
- **Costs**: every paid call is estimated and confirmed first. Default caps: $10 per call, $20 per client per day,
  $50 per person per day, $10 per project. Japan market only (MiniMax H3 license).
- **Files**: saved to `./takepilot/`; if saving fails, a 30-minute download URL is shown.
- **Shared PC**: disconnect `takepilot` in `/mcp` to remove the tokens.
- **Codex (untested)**: `codex mcp add takepilot --url https://api.takepilot.ai/v1/mcp` and `codex mcp login takepilot`.
