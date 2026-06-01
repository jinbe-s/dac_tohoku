# DAC東北 サイト

## セットアップ・起動

```bash
yarn install
yarn dev
```

本番ビルド:

```bash
yarn build
yarn preview  # ビルド結果のローカル確認
```

---

## ページ一覧

| URL | ファイル | 説明 | ナビ表示 |
|---|---|---|---|
| `/` | `app/pages/index.vue` | トップページ（当日スケジュール・概要） | Home |
| `/about` | `app/pages/about.vue` | 参加案内 | 現在非表示 |
| `/session` | `app/pages/session.vue` | 卓一覧（APIから取得） | 卓一覧 |
| `/player` | `app/pages/player.vue` | 参加卓一覧（JSONから取得） | 参加卓一覧 |
| `/contact` | `app/pages/contact.vue` | お問い合わせ | お問い合わせ |
| `/staff` | `app/pages/staff.vue` | スタッフ紹介・過去の開催 | スタッフ/過去の開催 |
| `/[year]/sessions` | `app/pages/[year]/sessions.vue` | 年別卓一覧アーカイブ | なし（staffページからリンク） |
| `/[year]/player` | `app/pages/[year]/player.vue` | 年別参加卓一覧アーカイブ | なし（staffページからリンク） |

ナビゲーションの定義は `app/layouts/default.vue` の `navItems` で一元管理。

---

## アーカイブデータ

`public/data/` 以下に年別JSONを配置する。

| ファイル | 対応ページ |
|---|---|
| `public/data/sessions_2026.json` | `/2026/sessions` |
| `public/data/players_2026.json` | `/2026/player` |

次年度追加手順:
1. `public/data/sessions_2027.json` / `players_2027.json` を配置
2. `app/pages/staff.vue` の「過去の開催」セクションにリンクを追加

---

## 設定ファイル

### 応募フォームURL
`app/config/forms.ts` — GM・PL・お問い合わせ各フォームのURLを一元管理。

### 募集フェーズ期間
`app/config/events.ts` — GM/PL各募集期間をISO形式で定義。期間に応じてトップページの募集バッジ表示が切り替わる。

| フェーズキー | 説明 |
|---|---|
| `GM1` | GM募集1次 |
| `GM2` | GM募集2次 |
| `PL1` | PL募集1次 |
| `PL2` | PL募集2次 |

### PL2次募集対象卓
`app/config/pl2Sessions.ts` — PL2次募集対象の卓IDと卓名を定義。卓一覧ページで該当卓にバッジを表示する。

---

## 環境変数

| 変数名 | 説明 |
|---|---|
| `NUXT_API_SESSION_LIST` | 卓一覧APIのURL（`/session` ページで使用） |
| `NUXT_API_SESSION_LIST_2` | 卓一覧APIのプレビューURL（`/session?preview=1` で使用） |
