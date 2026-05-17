# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

**quiz-app** — 一般常識クイズアプリ。バックエンドやビルドツールを持たない、純粋なフロントエンドのみの構成。

## 技術スタック

- HTML / CSS / JavaScript（バニラ、フレームワークなし）
- ビルドツールなし（バンドラー・トランスパイラ不使用）
- パッケージマネージャなし（npm/node_modules なし）

## 開発・実行方法

ビルドステップは存在しない。`index.html` をブラウザで直接開くか、ローカルサーバーで配信する。

```bash
# Python を使ったシンプルなローカルサーバー
python -m http.server 8080

# Node.js がある場合
npx serve .
```

テストフレームワークは現時点で未導入。テストを追加する場合は Vitest（ブラウザ互換）または Jest を検討する。

## アーキテクチャ方針

- **状態管理**: グローバルな JS オブジェクト（または単一モジュール）で現在の問題番号・スコア・回答履歴を保持する
- **クイズデータ**: 問題・選択肢・正解は JS の配列/オブジェクトとして `questions.js` 等に分離し、UI ロジックと混在させない
- **画面遷移**: SPA 的にセクション（開始画面・問題画面・結果画面）を `display` の切り替えで制御する（ページ遷移なし）
- **スタイル**: CSS カスタムプロパティでテーマ色を管理し、コンポーネントごとにクラスをスコープする

## コーディング規約

- `var` は使用しない。`const` / `let` を使う
- DOM 操作は `querySelector` / `querySelectorAll` を基本とする
- イベントリスナーは HTML の `onclick` 属性ではなく JS 側で `addEventListener` を使って登録する
- ファイルエンコーディングは UTF-8

## GitHubリポジトリ

https://github.com/ma10mat/quiz-app.git
