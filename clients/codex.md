# takepilot を Codex で使う

Codex CLI と IDE の拡張から takepilot で商材（商品・サービス・求人・お店・アプリ・イベント）の広告の動画を作るための一式です。
台本やカット割りは Codex が考え、声・画像・クリップの生成、組み立て、レンダリング、保存は takepilot のサーバーが行います。
生成の費用は takepilot のクレジットから引かれます。

前提: takepilot のアカウントを web（https://app.takepilot.ai）で作り、クレジットを入れてあること。

この zip は Codex CLI 用です。デスクトップアプリ（ChatGPT / Codex）の Upload plugin archive では拒まれます。ChatGPT の手順は https://docs.takepilot.ai/ja/plugin#chatgpt にあります。

## 入れる（プラグイン。おすすめ）

この zip を展開したフォルダで:

```
codex plugin marketplace add ./takepilot-codex
codex plugin add takepilot@takepilot
codex mcp login takepilot
```

`codex mcp login` でブラウザが開くので、takepilot にログインして許可（`read`・`write`・`spend`）と 1 日の上限を選びます。
プラグインにはスキル `takepilot-ad` と MCP のサーバー `takepilot` が入っています。

GitHub から直接入れることもできます（中身は同じ）:

```
codex plugin marketplace add TakePilot/takepilot-plugin
codex plugin add takepilot@takepilot
codex mcp login takepilot
```

## 入れる（手で）

プラグインを使わないときは、`config.toml` の中身を `~/.codex/config.toml` に足し、スキルのフォルダ
`plugins/takepilot/skills/takepilot-ad/` を `~/.agents/skills/` に写して、`codex mcp login takepilot` を実行します。

## 使う

「化粧水の 30 秒の TikTok Shop 動画を takepilot で作って」のように頼みます。有料の道具を呼ぶ前に、見積もりを見せて確かめます。

## 注意

- Codex の sandbox がネットワークを閉じていると、できた動画を手元に保存できません。そのときは 30 分有効のダウンロードの URL を出します。
  動画は web のマイファイルにも残ります。
- 共有の PC で使ったあとは `codex mcp logout takepilot` でトークンを消してください。
- この zip の名前に `-dev` が付いているものは開発用のサーバー（`https://api-dev.takepilot.ai/v1/mcp`）に、`-stg` が付いているものはステージングのサーバー（`https://api-stg.takepilot.ai/v1/mcp`）につなぎます。
- 動画の生成は日本の市場向けだけです（MiniMax H3 のライセンスの条件）。
