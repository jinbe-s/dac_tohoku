# 公開準備のための修正内容

## 修正日
2025-11-04

---

## 修正の目的
GitHub Pagesでの公開と独自ドメイン (dac-tohoku.com) への移行に向けて、以下の原則に基づいて修正を実施：
- **SSOT (Single Source of Truth) 原則**: 設定情報を一箇所に集約
- **DRY (Don't Repeat Yourself) 原則**: 重複コードの削除

---

## 修正内容

### 1. SSOT/DRY原則の適用

#### 1.1 サイト情報の一元管理
**問題点:**
- サイト名「DAC TOHOKU」が複数箇所にハードコーディング
- サイトURL「dac-tohoku.com」が複数の設定ファイルに分散
- メタタグ設定が `nuxt.config.ts` と `head-defaults.ts` で重複

**修正内容:**
- すべてのサイト情報を環境変数から取得するように統一
- `nuxt.config.ts` からハードコードされたメタタグを削除
- `runtimeConfig.public` を単一の情報源として使用

**変更ファイル:**
- [nuxt.config.ts](nuxt.config.ts)
  - `app.head` からメタタグを削除（faviconのみ保持）
  - `site` セクションを環境変数ベースに変更
  - `runtimeConfig.public.siteUrl` をHTTPSに修正
  - デフォルト値にフォールバックを追加

#### 1.2 Canonical URLの動的生成
**問題点:**
- Canonical URLが固定されていた
- ページごとに異なるURLを設定できなかった

**修正内容:**
- `head-defaults.ts`: ルートパスに応じて動的にcanonical URLを生成
- `useSiteMeta.ts`: ページ固有のURLを正しく設定

**変更ファイル:**
- [app/plugins/head-defaults.ts](app/plugins/head-defaults.ts)
- [app/composables/useSiteMeta.ts](app/composables/useSiteMeta.ts)

---

### 2. 環境変数の整備

#### 2.1 .env.example の更新
**追加内容:**
- `NUXT_PUBLIC_BASE` の明示的な設定
- HTTPSへの変更
- APIエンドポイント例をコメントで追加

**変更ファイル:**
- [.env.example](.env.example)

#### 2.2 GitHub Actions の改善
**問題点:**
- 重複した環境変数設定
- ハードコードされたbaseURL

**修正内容:**
- 環境変数をすべてGitHub Varsから取得
- デフォルト値（フォールバック）を設定
- `NUXT_PUBLIC_INDEXABLE` を環境変数で制御可能に
- 不要な `echo` コマンドを削除

**変更ファイル:**
- [.github/workflows/pages.yml](.github/workflows/pages.yml)

---

### 3. 独自ドメイン対応

#### 3.1 CNAMEファイルの作成
**新規作成:**
- GitHub Pagesで独自ドメイン (dac-tohoku.com) を使用するための設定ファイル

**新規ファイル:**
- [public/CNAME](public/CNAME)

#### 3.2 HTTPSへの統一
**修正内容:**
- すべてのURL参照を `https://` に統一
- `http://dac-tohoku.com` → `https://dac-tohoku.com`

---

### 4. コードの改善

#### 4.1 ダミーリンクの修正
**問題点:**
- トップページのボタンが `https://google.com` にリンクされていた

**修正内容:**
- GM募集ボタン: `/about#dmRecruit` に変更
- PL募集ボタン: `/about#plRecruit` に変更

**変更ファイル:**
- [app/pages/index.vue](app/pages/index.vue)

#### 4.2 iframeの修正
**問題点:**
- `allowfullscreen=false` という不正な属性

**修正内容:**
- `allowfullscreen` のみに変更（正しいHTML属性）

**変更ファイル:**
- [app/pages/index.vue](app/pages/index.vue)

#### 4.3 v-forのkey属性の修正
**問題点:**
- `v-for` で未定義の変数 `i` を使用

**修正内容:**
- フェーズキー `k` を使用するように修正

**変更ファイル:**
- [app/pages/index.vue](app/pages/index.vue)

---

### 5. SEO改善

#### 5.1 メタタグの充実
**追加内容:**
- `ogSiteName` の追加
- ページごとのcanonical URLの動的生成

**変更ファイル:**
- [app/plugins/head-defaults.ts](app/plugins/head-defaults.ts)
- [app/composables/useSiteMeta.ts](app/composables/useSiteMeta.ts)

---

## 新規作成ファイル

### 1. DEPLOYMENT.md
**内容:**
- GitHub Pagesへのデプロイ手順
- 独自ドメインの設定方法
- 公開前チェックリスト
- トラブルシューティング
- メンテナンス手順

**ファイル:** [DEPLOYMENT.md](DEPLOYMENT.md)

### 2. public/CNAME
**内容:**
- 独自ドメイン `dac-tohoku.com` の設定

**ファイル:** [public/CNAME](public/CNAME)

### 3. CHANGES.md (このファイル)
**内容:**
- 修正内容の詳細な記録

---

## 修正後の設定方法

### ローカル開発環境
`.env` ファイルを作成して以下を設定：
```env
NUXT_PUBLIC_SITE_NAME="DAC TOHOKU"
NUXT_PUBLIC_SITE_DESCRIPTION="宮城県仙台市で開催する、D20システムを楽しむTRPGコンベンション「DAC TOHOKU」のホームページです。"
NUXT_PUBLIC_SITE_URL="https://dac-tohoku.com"
NUXT_PUBLIC_BASE="/"
```

### GitHub Actions（本番環境）
GitHubリポジトリの「Settings」→「Secrets and variables」→「Actions」→「Variables」で以下を設定：

**独自ドメインで公開する場合:**
```
NUXT_PUBLIC_SITE_NAME=DAC TOHOKU
NUXT_PUBLIC_SITE_DESCRIPTION=宮城県仙台市で開催する、D20システムを楽しむTRPGコンベンション
NUXT_PUBLIC_SITE_URL=https://dac-tohoku.com
NUXT_PUBLIC_BASE=/
NUXT_PUBLIC_INDEXABLE=true
```

**GitHub Pages URLで公開する場合 (yourname.github.io/dac_tohoku/):**
```
NUXT_PUBLIC_SITE_NAME=DAC TOHOKU
NUXT_PUBLIC_SITE_DESCRIPTION=宮城県仙台市で開催する、D20システムを楽しむTRPGコンベンション
NUXT_PUBLIC_SITE_URL=https://yourname.github.io/dac_tohoku
NUXT_PUBLIC_BASE=/dac_tohoku/
NUXT_PUBLIC_INDEXABLE=false
```

**注意:** GitHub Pages URLで公開する場合は、`public/CNAME` ファイルを削除してください。

---

## 修正による改善点

### 1. 保守性の向上
- サイト情報の変更が環境変数の変更のみで完結
- 複数箇所を修正する必要がなくなった

### 2. 柔軟性の向上
- GitHub Pages URLと独自ドメインの両方に対応
- 環境ごとに異なる設定を簡単に適用可能

### 3. SEOの向上
- 各ページに正しいcanonical URLが設定される
- メタタグの重複がなくなった

### 4. セキュリティの維持
- すでに適切に設定されていた `rel="noopener noreferrer"` を維持
- HTTPS通信を明示的に指定

### 5. コード品質の向上
- SSOT/DRY原則に準拠
- 不正な属性の修正
- 未定義変数の修正

---

## テスト方法

### 1. ローカルでのテスト
```bash
# 開発サーバー起動
yarn dev

# プロダクションビルドのテスト
yarn build
yarn preview
```

### 2. 確認項目
- [ ] すべてのページが正しく表示される
- [ ] リンクが正しく動作する
- [ ] メタタグが正しく設定されている（ブラウザの開発者ツールで確認）
- [ ] canonical URLが各ページで正しい
- [ ] 環境変数の変更が反映される

---

## 今後の作業

### 独自ドメイン取得後
1. ドメインのDNS設定を実施
2. GitHub Pagesで「Custom domain」を設定
3. GitHub Varsを独自ドメイン用に更新
4. HTTPSの有効化を待つ（24-48時間）

### 本番公開前
1. [DEPLOYMENT.md](DEPLOYMENT.md) の公開前チェックリストを実施
2. 外部リンク（Discord、応募フォーム）を正しいURLに更新
3. APIエンドポイントを設定
4. `NUXT_PUBLIC_INDEXABLE=true` に変更

---

## 参考資料
- [SPECIFICATION.md](SPECIFICATION.md) - プロジェクト仕様書
- [DEPLOYMENT.md](DEPLOYMENT.md) - デプロイ手順書
- [Nuxt 3 公式ドキュメント](https://nuxt.com)
- [GitHub Pages カスタムドメイン設定](https://docs.github.com/ja/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

**修正者:** Claude Code
**最終更新日:** 2025-11-04
