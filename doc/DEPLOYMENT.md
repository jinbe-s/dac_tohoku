# デプロイ手順書

## 概要
このドキュメントでは、DAC東北ウェブサイトをGitHub Pagesで公開する手順を説明します。

---

## 前提条件

### 1. GitHub Pagesの有効化
1. GitHubリポジトリの設定画面を開く
2. 「Settings」→「Pages」に移動
3. 「Source」を「GitHub Actions」に設定

### 2. GitHub Varsの設定
リポジトリの「Settings」→「Secrets and variables」→「Actions」→「Variables」タブで以下を設定：

| 変数名 | 説明 | 例 |
|-------|------|-----|
| `NUXT_PUBLIC_SITE_NAME` | サイト名 | `DAC東北` |
| `NUXT_PUBLIC_SITE_DESCRIPTION` | サイト説明 | `宮城県仙台市で開催する、D20システムを楽しむTRPGコンベンション` |
| `NUXT_PUBLIC_SITE_URL` | サイトURL | `https://dac-tohoku.com` |
| `NUXT_PUBLIC_BASE` | ベースURL | `/` (独自ドメイン時) または `/dac_tohoku/` (GitHub Pages URL時) |
| `NUXT_PUBLIC_INDEXABLE` | 検索エンジン登録 | `true` (本番) / `false` (開発中) |
| `NUXT_API_EVENT_DATA` | イベントデータAPI URL | (APIのURL) |
| `NUXT_API_NEW_INFO` | 新着情報API URL | (APIのURL) |
| `NUXT_API_SESSION_LIST` | セッション一覧API URL | (APIのURL) |

---

## デプロイパターン

### パターンA: 独自ドメイン (dac-tohoku.com) での公開

#### 1. ドメインの取得と設定
1. ドメイン登録サービスで `dac-tohoku.com` を取得
2. DNSレコードを設定：
   ```
   タイプ: CNAME
   名前: @
   値: <your-github-username>.github.io
   ```
   または、Aレコードを使用する場合：
   ```
   タイプ: A
   名前: @
   値: 185.199.108.153
   値: 185.199.109.153
   値: 185.199.110.153
   値: 185.199.111.153
   ```

#### 2. GitHub Pagesでのカスタムドメイン設定
1. リポジトリの「Settings」→「Pages」に移動
2. 「Custom domain」に `dac-tohoku.com` を入力
3. 「Enforce HTTPS」にチェック（DNS設定後24時間程度で有効化可能）

#### 3. GitHub Varsの設定
```
NUXT_PUBLIC_SITE_URL=https://dac-tohoku.com
NUXT_PUBLIC_BASE=/
NUXT_PUBLIC_INDEXABLE=true
```

#### 4. デプロイ
`main` ブランチにpushすると自動デプロイされます。

---

### パターンB: GitHub Pages URL (yourname.github.io/dac_tohoku/) での公開

#### 1. GitHub Varsの設定
```
NUXT_PUBLIC_SITE_URL=https://<your-github-username>.github.io/dac_tohoku
NUXT_PUBLIC_BASE=/dac_tohoku/
NUXT_PUBLIC_INDEXABLE=false
```

**注意:** この場合、`public/CNAME` ファイルは削除するか、コメントアウトしてください。

#### 2. デプロイ
`main` ブランチにpushすると自動デプロイされます。

---

## 公開前チェックリスト

### 必須項目

- [ ] **GitHub Varsの設定完了**
  - [ ] `NUXT_PUBLIC_SITE_NAME` が設定されている
  - [ ] `NUXT_PUBLIC_SITE_DESCRIPTION` が設定されている
  - [ ] `NUXT_PUBLIC_SITE_URL` が正しいURL（独自ドメインまたはGitHub Pages URL）
  - [ ] `NUXT_PUBLIC_BASE` が環境に応じて設定されている
  - [ ] `NUXT_PUBLIC_INDEXABLE` が `true` (本番) または `false` (開発中)

- [ ] **API設定**
  - [ ] `NUXT_API_EVENT_DATA` が設定されている（必要な場合）
  - [ ] `NUXT_API_NEW_INFO` が設定されている（必要な場合）
  - [ ] `NUXT_API_SESSION_LIST` が設定されている（必要な場合）
  - [ ] 各APIエンドポイントが正しく動作することを確認

- [ ] **ドメイン設定（独自ドメインの場合）**
  - [ ] ドメインを取得済み
  - [ ] DNS設定が完了
  - [ ] `public/CNAME` ファイルが存在し、正しいドメイン名が記載されている
  - [ ] GitHub Pagesの「Custom domain」設定が完了
  - [ ] HTTPS証明書が有効化されている（DNS設定後24時間程度かかる場合あり）

- [ ] **コンテンツの確認**
  - [ ] すべてのページが正しく表示される
  - [ ] リンク切れがない
  - [ ] 画像が正しく表示される
  - [ ] 外部リンク（Discord、応募フォーム等）が正しいURLに設定されている
  - [ ] モバイル表示が正常

- [ ] **SEO設定**
  - [ ] メタタグが正しく設定されている
  - [ ] OGP画像が設定されている
  - [ ] robots.txt が正しく設定されている
  - [ ] サイトマップが生成される

- [ ] **セキュリティ**
  - [ ] すべての外部リンクに `rel="noopener noreferrer"` が付与されている
  - [ ] HTTPS接続が有効
  - [ ] 機密情報（APIキー等）がコードに含まれていない

- [ ] **パフォーマンス**
  - [ ] ビルドが正常に完了する（`yarn build` または `yarn generate` でテスト）
  - [ ] ページ読み込み速度が許容範囲内

### 推奨項目

- [ ] **テスト**
  - [ ] ローカル環境でのテスト（`yarn dev`）
  - [ ] プロダクションビルドでのテスト（`yarn preview`）
  - [ ] 複数ブラウザでの動作確認（Chrome、Firefox、Safari等）
  - [ ] 複数デバイスでの動作確認（PC、タブレット、スマートフォン）

- [ ] **アナリティクス**
  - [ ] Google Analyticsまたは類似ツールの導入（必要な場合）

- [ ] **バックアップ**
  - [ ] リポジトリのバックアップ
  - [ ] 環境変数の記録（安全な場所に保管）

---

## デプロイ後の確認

### 1. サイトの動作確認
- [ ] トップページが正しく表示される
- [ ] すべてのページに正しくアクセスできる
- [ ] ナビゲーションが正常に動作する
- [ ] フォームやリンクが正しく動作する

### 2. SEOの確認
- [ ] Google Search Consoleにサイトを登録
- [ ] サイトマップを送信（`https://dac-tohoku.com/sitemap.xml`）
- [ ] robots.txtが正しく配信されている（`https://dac-tohoku.com/robots.txt`）

### 3. モニタリング
- [ ] ビルドログでエラーがないことを確認
- [ ] GitHub Actionsのワークフローが成功している
- [ ] ブラウザのコンソールにエラーがない

---

## トラブルシューティング

### 問題: 404エラーが発生する

**原因1: baseURLの設定ミス**
- GitHub Varsの `NUXT_PUBLIC_BASE` が正しく設定されているか確認
- 独自ドメインの場合: `/`
- GitHub Pages URLの場合: `/dac_tohoku/`

**原因2: CNAMEファイルの問題**
- 独自ドメインの場合、`public/CNAME` が存在するか確認
- GitHub Pages URLの場合、`public/CNAME` が存在しないことを確認

### 問題: HTTPSが有効にならない

**原因: DNS設定が反映されていない**
- DNS設定が完了してから24〜48時間待つ
- DNS設定が正しいか確認（`nslookup dac-tohoku.com`）

### 問題: APIからデータが取得できない

**原因: 環境変数が設定されていない**
- GitHub Varsで `NUXT_API_*` が正しく設定されているか確認
- APIエンドポイントがCORS設定を許可しているか確認

### 問題: 検索エンジンにインデックスされない

**原因: NUXT_PUBLIC_INDEXABLEがfalseになっている**
- GitHub Varsで `NUXT_PUBLIC_INDEXABLE=true` に設定
- robots.txtが正しく配信されているか確認

---

## ロールバック手順

問題が発生した場合、以下の手順で前のバージョンに戻すことができます：

### 方法1: Gitで前のコミットに戻す
```bash
# 前のコミットIDを確認
git log --oneline

# 特定のコミットに戻す
git revert <commit-id>
git push origin main
```

### 方法2: GitHub Actionsで再デプロイ
1. GitHubリポジトリの「Actions」タブを開く
2. 成功した過去のワークフローを選択
3. 「Re-run all jobs」をクリック

---

## メンテナンス

### 定期的な確認事項
- [ ] 依存パッケージの更新（月1回程度）
- [ ] セキュリティアラートの確認
- [ ] リンク切れのチェック
- [ ] パフォーマンスの確認

### 依存パッケージの更新方法
```bash
# 現在のバージョンを確認
yarn outdated

# パッケージを更新
yarn upgrade-interactive

# テスト
yarn dev
yarn build

# 問題なければコミット
git add package.json yarn.lock
git commit -m "chore: update dependencies"
git push origin main
```

---

## サポート

問題が発生した場合は、以下を確認してください：
- GitHub Actionsのビルドログ
- ブラウザの開発者ツール（コンソールとネットワークタブ）
- [Nuxt 3ドキュメント](https://nuxt.com)
- [Vuetify 3ドキュメント](https://vuetifyjs.com)

---

**最終更新日:** 2025-11-04
