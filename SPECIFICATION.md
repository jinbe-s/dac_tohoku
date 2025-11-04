# DAC TOHOKU ウェブサイト 仕様書

## 1. プロジェクト概要

### 1.1 プロジェクト名
**DAC TOHOKU** (dac_tohoku)

### 1.2 目的
宮城県仙台市で開催されるTRPGコンベンション「DAC TOHOKU」の公式ウェブサイト。D&Dやpathfinderなど、D20システムを楽しむイベントの情報提供とセッション参加者の募集管理を行う。

### 1.3 プロジェクトタイプ
- 静的サイト生成型のウェブアプリケーション
- GitHub Pagesでホスティング
- Nuxt 3ベースのSPA/SSR

---

## 2. 技術スタック

### 2.1 フレームワーク・ライブラリ
| 技術 | バージョン | 用途 |
|------|-----------|------|
| Nuxt | 4.0.3 | フロントエンドフレームワーク |
| Vue | 3.5.18 | UI構築 |
| Vuetify | 3.9.5 | Material Design 3 UIコンポーネント |
| TypeScript | 5.9.2 | 型安全性 |
| Vite | - | ビルドツール |

### 2.2 主要な依存パッケージ
```json
{
  "@mdi/font": "^7.4.47",              // Material Design Icons
  "@nuxt/fonts": "^0.11.4",            // フォント最適化
  "@nuxtjs/seo": "^3.1.0",             // SEO最適化
  "@nuxtjs/robots": "^5.4.0",          // robots.txt生成
  "nuxt-simple-sitemap": "^4.4.1",     // サイトマップ生成
  "dateformat": "^5.0.3",              // 日付フォーマット
  "dompurify": "^3.2.6",               // HTMLサニタイゼーション
  "sass": "^1.90.0",                   // CSSプリプロセッサ
  "vite-plugin-vuetify": "^2.1.2"      // Vuetifyビルド統合
}
```

### 2.3 開発ツール
```json
{
  "eslint": "^9.33.0",                 // リンティング
  "prettier": "^3.6.2",                // コードフォーマット
  "vue-tsc": "^3.0.5",                 // 型チェック
  "husky": "^9.1.7",                   // Git Hooks
  "lint-staged": "^16.1.5"             // コミット前チェック
}
```

---

## 3. プロジェクト構造

### 3.1 ディレクトリ構成
```
/Users/saito/dev/dac_tohoku/
├── .github/
│   └── workflows/
│       └── pages.yml               # GitHub Actions設定
├── app/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── base.css
│   │   │   └── fonts.css
│   │   └── icon.png
│   ├── components/                 # 18個のコンポーネント
│   │   ├── section/               # セクションレベル（7個）
│   │   ├── ui/                    # UI部品（6個）
│   │   ├── text/                  # テキスト表示（2個）
│   │   └── util/                  # ユーティリティ（1個）
│   ├── composables/               # 5個のComposables
│   │   ├── useSessionList.ts
│   │   ├── useNewInfo.ts
│   │   ├── useEventPhase.ts
│   │   ├── useSiteMeta.ts
│   │   └── useHtmlSanitizer.ts
│   ├── config/
│   │   └── events.ts              # イベントフェーズ設定
│   ├── layouts/
│   │   └── default.vue            # デフォルトレイアウト
│   ├── pages/                     # 4ページ
│   │   ├── index.vue              # トップページ
│   │   ├── about.vue              # 参加案内
│   │   ├── session.vue            # 卓一覧
│   │   └── contact.vue            # お問い合わせ
│   ├── plugins/                   # 4個のプラグイン
│   ├── app.vue
│   └── app.config.ts
├── public/
│   ├── favicon.ico
│   └── _robots.txt
├── nuxt.config.ts
├── package.json
├── tsconfig.json
└── .env.example
```

### 3.2 総コード行数
約 **1,778行**（Vue/TSファイル）

---

## 4. 機能仕様

### 4.1 ページ構成

#### 4.1.1 トップページ (index.vue)
**URL:** `/`

**表示内容:**
- イベント基本情報カード
  - 開催日時
  - 会場情報
  - イベント概要
- 新着情報セクション（API連携）
- スケジュール一覧
- 参加費情報
- アクセス情報（Google Maps埋め込み）
- 動的ボタン（フェーズに応じて表示）
  - GM募集ボタン
  - PL募集ボタン
  - セッション一覧ボタン

**動的機能:**
- イベントフェーズによるボタン表示/非表示切り替え
- 現在時刻と募集期間の比較により自動的に表示制御

#### 4.1.2 参加案内 (about.vue)
**URL:** `/about`

**表示内容:**
- Discord導入案内
  - Discord概要説明
  - アカウント作成方法
  - DACサーバー参加リンク
- PL募集要項
  - 参加日程
  - 参加費
  - 応募方法
  - キャンセルポリシー
- DM募集要項
  - 募集条件
  - 応募方法
  - 報酬・特典

**特徴:**
- ステップバイステップの案内
- 外部リンク（Discord、応募フォーム）
- フェーズベースの動的表示

#### 4.1.3 卓一覧 (session.vue)
**URL:** `/session`

**表示内容:**
- 日別フィルタリング機能
  - 5/23（1日目）
  - 5/24（2日目）
  - 両日
- セッション一覧テーブル
  - システム名
  - DM名
  - セッション名
  - レベル
  - 募集人数
  - 概要
- セッション詳細ダイアログ
  - 全情報表示
  - スクロール可能なモーダル

**動的機能:**
- 外部APIからセッション情報取得
- クライアントサイドフィルタリング
- ローディング状態表示
- エラーハンドリング

#### 4.1.4 お問い合わせ (contact.vue)
**URL:** `/contact`

**表示内容:**
- お問い合わせフォームへのリンク（Googleフォーム）
- 公式Twitterアカウント情報
- レスポンス時間の目安

---

### 4.2 コンポーネント仕様

#### 4.2.1 Section コンポーネント（7個）

| コンポーネント | ファイル | 機能 |
|--------------|---------|------|
| EventInfo | EventInfo.vue | イベント基本情報カード表示 |
| NewInfo | NewInfo.vue | 新着情報セクション（API連携） |
| ScheduleList | ScheduleList.vue | スケジュール一覧表示 |
| SessionListTable | SessionListTable.vue | セッション一覧テーブル |
| SessionDetail | SessionDetail.vue | セッション詳細モーダル |
| TwitterTimeline | TwitterTimeline.vue | Twitterタイムライン埋め込み |
| HowToJoin | HowToJoin.vue | 参加方法案内 |

#### 4.2.2 UI コンポーネント（6個）

| コンポーネント | ファイル | 機能 |
|--------------|---------|------|
| SessionCard | SessionCard.vue | セッション情報カード |
| PriceCard | PriceCard.vue | 参加費カード |
| ScheduleItem | ScheduleItem.vue | スケジュールアイテム |
| InlineIconText | InlineIconText.vue | アイコン付きインラインテキスト |
| MultiLineTextWithIcon | MultiLineTextWithIcon.vue | アイコン付き複数行テキスト |
| ScenarioMetric | ScenarioMetric.vue | シナリオメトリクス表示 |

#### 4.2.3 Text コンポーネント（2個）

| コンポーネント | ファイル | 機能 |
|--------------|---------|------|
| MainTitle | MainTitle.vue | メインタイトル表示 |
| SubTitle | SubTitle.vue | サブタイトル表示 |

#### 4.2.4 Util コンポーネント（1個）

| コンポーネント | ファイル | 機能 |
|--------------|---------|------|
| Phase | Phase.client.vue | フェーズベース条件表示（クライアントのみ） |

#### 4.2.5 その他（2個）

| コンポーネント | ファイル | 機能 |
|--------------|---------|------|
| HeaderNavLink | HeaderNavLink.vue | ヘッダーナビゲーションリンク |
| DateText | DateText.vue | 日付フォーマット表示 |

---

### 4.3 Composables

#### 4.3.1 useSessionList
**ファイル:** app/composables/useSessionList.ts

**機能:**
- 外部APIからセッション一覧データを取得
- TypeScript型定義（SessionListResponse）
- クライアントサイドのみで実行（server: false）
- キャッシュ無効化（no-store）
- タイムアウト設定（10秒）
- リトライ機能（1回）

**返り値:**
```typescript
{
  data: Ref<SessionListResponse[] | null>,
  pending: Ref<boolean>,
  error: Ref<Error | null>,
  refresh: () => Promise<void>
}
```

#### 4.3.2 useNewInfo
**ファイル:** app/composables/useNewInfo.ts

**機能:**
- 新着情報データをAPIから取得
- HTMLコンテンツの取得とサニタイゼーション
- クライアントサイド実行
- エラーハンドリング

#### 4.3.3 useEventPhase
**ファイル:** app/composables/useEventPhase.ts

**機能:**
- イベントフェーズの判定
- 現在時刻と設定ファイルの比較
- フェーズキー（GM1、GM2、PL1、PL2）の管理

**主要メソッド:**
```typescript
isActive(phaseKey: PhaseKey): boolean  // フェーズがアクティブか判定
getCurrentPhases(): PhaseKey[]         // 現在のフェーズ一覧取得
```

#### 4.3.4 useSiteMeta
**ファイル:** app/composables/useSiteMeta.ts

**機能:**
- ページごとのメタタグ設定
- OGP（Open Graph Protocol）設定
- Twitter Card設定
- タイトル、説明、画像の動的設定

#### 4.3.5 useHtmlSanitizer
**ファイル:** app/composables/useHtmlSanitizer.ts

**機能:**
- DOMPurifyを使用したHTMLサニタイゼーション
- XSS攻撃対策
- 安全なHTML表示

---

### 4.4 イベントフェーズ管理

#### 4.4.1 設定ファイル
**ファイル:** app/config/events.ts

**フェーズ定義:**
```typescript
export type PhaseKey = 'GM1' | 'GM2' | 'PL1' | 'PL2'
export type Range = { start: string; end: string }

export const PHASES: Partial<Record<PhaseKey, Range>> = {
  GM1: {
    start: '2025-08-18T00:00:00+09:00',
    end: '2026-02-18T23:59:59+09:00'
  },
  // 他のフェーズ（現在コメントアウト）
}
```

**フェーズの意味:**
- **GM1:** 第1回GM（ゲームマスター）募集期間
- **GM2:** 第2回GM募集期間
- **PL1:** 第1回PL（プレイヤー）募集期間
- **PL2:** 第2回PL募集期間

**表示順序:**
```typescript
export const PHASE_ORDER: PhaseKey[] = ['GM1', 'GM2', 'PL1', 'PL2']
```

#### 4.4.2 フェーズによる動的表示
- トップページのボタン表示/非表示
- 参加案内ページの募集情報表示
- フェーズ重複時の優先順位制御

---

## 5. API連携仕様

### 5.1 環境変数設定
**ファイル:** nuxt.config.ts

```typescript
runtimeConfig: {
  public: {
    eventData: process.env.NUXT_API_EVENT_DATA || '',
    newInfo: process.env.NUXT_API_NEW_INFO || '',
    sessionList: process.env.NUXT_API_SESSION_LIST || '',
  }
}
```

### 5.2 APIエンドポイント

#### 5.2.1 セッション一覧API
**環境変数:** `NUXT_API_SESSION_LIST`

**リクエスト:**
- メソッド: GET
- タイムアウト: 10秒
- リトライ: 1回
- キャッシュ: no-store

**レスポンス型:**
```typescript
interface SessionListResponse {
  table_id: string
  day_1: number        // 1日目フラグ
  day_2: number        // 2日目フラグ
  both: number         // 両日フラグ
  system_name: string
  dm_name: string
  session_name: string
  session_lv: string
  overview: string
  // その他のフィールド...
}
```

#### 5.2.2 新着情報API
**環境変数:** `NUXT_API_NEW_INFO`

**機能:**
- 新着情報のHTMLコンテンツを取得
- DOMPurifyでサニタイゼーション後に表示

#### 5.2.3 イベントデータAPI
**環境変数:** `NUXT_API_EVENT_DATA`

**用途:** イベント基本情報の取得（現在は未使用の可能性）

---

## 6. デザイン・スタイリング仕様

### 6.1 デザインシステム
**フレームワーク:** Vuetify 3（Material Design 3 Blueprint）

### 6.2 カラーパレット

#### ライトテーマ
```javascript
{
  primary: '#1E88E5',      // ブランドカラー（青）
  secondary: '#42A5A5',    // セカンダリカラー（ティール）
  accent: '#FFB300',       // アクセントカラー（黄）
  success: '#2E7D32',      // 成功（緑）
  warning: '#FB8C00',      // 警告（オレンジ）
  error: '#E53935',        // エラー（赤）
  background: '#FAFAFA',   // 背景色
  surface: '#FFFFFF',      // サーフェス色
  textPrimary: '#212121',  // テキスト色
}
```

#### ダークテーマ
```javascript
{
  primary: '#42A5F5',
  secondary: '#66B2B2',
  accent: '#FFD54F',
  // その他のカラー...
}
```

### 6.3 タイポグラフィ
**フォント:**
- **英字:** Inter（Google Fonts）
- **日本語:** Noto Sans JP（Google Fonts）

**設定:**
```typescript
fonts: {
  families: [
    { name: 'Inter', provider: 'google' },
    { name: 'Noto Sans JP', provider: 'google' }
  ]
}
```

### 6.4 カスタムCSS

#### base.css
- スムーススクロール
- ボタンホバー効果
- グローバルスタイル

#### fonts.css
- フォント定義
- フォントウェイト設定

### 6.5 レスポンシブデザイン
**ブレークポイント:**（Vuetifyデフォルト）
- xs: < 600px（モバイル）
- sm: 600px - 960px（タブレット）
- md: 960px - 1280px（小型デスクトップ）
- lg: 1280px - 1920px（デスクトップ）
- xl: > 1920px（大型ディスプレイ）

---

## 7. ビルド・デプロイ仕様

### 7.1 ビルド設定

#### Nuxt設定
**ファイル:** nuxt.config.ts

```typescript
nitro: {
  preset: 'github_pages',
  prerender: {
    crawlLinks: true  // 自動プリレンダリング
  }
}
```

#### 出力設定
- **出力ディレクトリ:** dist/
- **ベースURL:** /dac_tohoku/（環境変数で変更可能）
- **SSR:** 有効（静的生成モード）

### 7.2 GitHub Actions

#### ワークフローファイル
**ファイル:** .github/workflows/pages.yml

**トリガー:**
```yaml
on:
  push:
    branches: [main]
```

**ビルドステップ:**
1. Node.js 20セットアップ
2. 依存関係インストール（Yarn）
3. 環境変数設定
   - NUXT_PUBLIC_BASE
   - NUXT_PUBLIC_INDEXABLE
   - API_EVENT_DATA（GitHub Vars）
   - API_NEW_INFO（GitHub Vars）
   - API_SESSION_LIST（GitHub Vars）
4. 静的サイト生成（`npx nuxi generate`）
5. GitHub Pagesへデプロイ

### 7.3 環境変数

| 変数名 | 用途 | 設定場所 |
|-------|------|---------|
| NUXT_PUBLIC_BASE | ベースURL | GitHub Actions |
| NUXT_PUBLIC_INDEXABLE | 検索エンジン登録可否 | GitHub Actions |
| NUXT_API_EVENT_DATA | イベントデータAPI URL | GitHub Vars |
| NUXT_API_NEW_INFO | 新着情報API URL | GitHub Vars |
| NUXT_API_SESSION_LIST | セッション一覧API URL | GitHub Vars |

---

## 8. SEO・パフォーマンス仕様

### 8.1 SEO最適化

#### メタタグ設定
**ファイル:** nuxt.config.ts

```typescript
app: {
  head: {
    titleTemplate: '%s | DAC TOHOKU',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // OGP設定
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'DAC TOHOKU' },
      // Twitter Card設定
      { name: 'twitter:card', content: 'summary_large_image' },
    ]
  }
}
```

#### サイトマップ
- **モジュール:** nuxt-simple-sitemap
- **自動生成:** ビルド時
- **出力:** sitemap.xml

#### robots.txt
- **モジュール:** @nuxtjs/robots
- **環境変数連動:** NUXT_PUBLIC_INDEXABLE

### 8.2 パフォーマンス最適化

#### フォント最適化
- **モジュール:** @nuxt/fonts
- Google Fontsの最適化読み込み
- FOUCの防止

#### 画像最適化
- Vuetifyのv-imgコンポーネント
- Lazy loading
- レスポンシブ画像

#### コード分割
- ページベースの自動コード分割
- 動的インポート
- `<Lazy>`プレフィックスによるコンポーネント遅延読み込み

#### クライアントサイド最適化
- `<ClientOnly>`によるSSR除外
- Twitter Widgets: client.tsプラグイン

---

## 9. セキュリティ仕様

### 9.1 XSS対策
**実装:** useHtmlSanitizer composable

```typescript
import DOMPurify from 'dompurify'

const sanitize = (html: string) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  })
}
```

### 9.2 外部リンク対策
- `target="_blank"` に自動的に `rel="noopener noreferrer"` 追加
- Tabnabbing攻撃防止

### 9.3 HTTPS
- GitHub Pagesによる自動HTTPS
- HTTP→HTTPS自動リダイレクト

---

## 10. コード品質管理

### 10.1 リンティング

#### ESLint設定
**ファイル:** .eslintrc.cjs

**プラグイン:**
- @typescript-eslint
- eslint-plugin-vue
- eslint-config-prettier

**実行コマンド:**
```bash
npm run lint        # チェックのみ
npm run lint --fix  # 自動修正
```

### 10.2 フォーマット

#### Prettier設定
**ファイル:** .prettierrc

**実行コマンド:**
```bash
npm run format       # チェックのみ
npm run format:write # 自動修正
```

### 10.3 型チェック

**実行コマンド:**
```bash
npm run typecheck
```

**ツール:** vue-tsc（Vue向けTypeScriptコンパイラ）

### 10.4 Git Hooks

#### lint-staged設定
**ファイル:** package.json

```json
{
  "lint-staged": {
    "*.{js,ts,vue}": ["eslint --fix"],
    "*.{json,md,yml,yaml,css,scss}": ["prettier --write"]
  }
}
```

**実行タイミング:** コミット前（pre-commit hook）

---

## 11. 開発ワークフロー

### 11.1 開発環境セットアップ

```bash
# リポジトリクローン
git clone https://github.com/your-org/dac_tohoku.git
cd dac_tohoku

# 依存関係インストール
yarn install

# 環境変数設定
cp .env.example .env
# .envファイルを編集してAPI URLを設定

# 開発サーバー起動
yarn dev
```

### 11.2 開発コマンド

| コマンド | 説明 |
|---------|------|
| `yarn dev` | 開発サーバー起動（ポート3000） |
| `yarn build` | プロダクションビルド |
| `yarn generate` | 静的サイト生成 |
| `yarn preview` | ビルドのプレビュー |
| `yarn lint` | ESLintチェック |
| `yarn format` | Prettierチェック |
| `yarn typecheck` | 型チェック |

### 11.3 ブランチ戦略
- **main:** 本番環境（自動デプロイ）
- **feature/*:** 機能開発ブランチ
- **fix/*:** バグ修正ブランチ

### 11.4 コミット規約
推奨コミットメッセージフォーマット:
```
<type>: <subject>

<body>
```

**Type例:**
- feat: 新機能
- fix: バグ修正
- docs: ドキュメント
- style: スタイル変更
- refactor: リファクタリング
- test: テスト
- chore: その他

---

## 12. 今後の拡張性

### 12.1 想定される機能追加
1. **参加者管理機能**
   - オンライン申し込みフォーム統合
   - 参加者ダッシュボード

2. **セッション検索・フィルタリング強化**
   - システム別フィルタ
   - レベル範囲指定
   - キーワード検索

3. **多言語対応**
   - i18nモジュール導入
   - 英語版ページ

4. **リアルタイム更新**
   - WebSocketによる卓情報リアルタイム更新
   - プッシュ通知

### 12.2 技術的改善案
1. **テスト導入**
   - Vitest（ユニットテスト）
   - Playwright（E2Eテスト）

2. **パフォーマンス監視**
   - Google Analytics統合
   - Core Web Vitals測定

3. **アクセシビリティ強化**
   - ARIA属性追加
   - キーボードナビゲーション改善

---

## 13. 連絡先・リソース

### 13.1 公式情報
- **公式サイト:** https://dac-tohoku.com
- **公式Twitter:** @DacTohoku

### 13.2 技術ドキュメント
- **Nuxt 3:** https://nuxt.com
- **Vuetify 3:** https://vuetifyjs.com
- **Vue 3:** https://vuejs.org

### 13.3 リポジトリ
- **GitHub:** （プライベートリポジトリの場合、URLを記載）

---

## 14. 変更履歴

| 日付 | バージョン | 変更内容 | 担当者 |
|------|-----------|---------|-------|
| 2025-11-04 | 1.0.0 | 初版作成 | - |

---

## 15. 付録

### 15.1 主要コンポーネント一覧

#### Sectionコンポーネント
- `SectionEventInfo.vue` - イベント情報カード
- `SectionNewInfo.vue` - 新着情報（API連携）
- `SectionScheduleList.vue` - スケジュール一覧
- `SectionSessionListTable.vue` - セッション一覧テーブル
- `SectionSessionDetail.vue` - セッション詳細
- `SectionTwitterTimeline.vue` - Twitterタイムライン
- `SectionHowToJoin.vue` - 参加方法案内

#### UIコンポーネント
- `UiSessionCard.vue` - セッションカード
- `UiPriceCard.vue` - 参加費カード
- `UiScheduleItem.vue` - スケジュールアイテム
- `UiInlineIconText.vue` - アイコン付きテキスト
- `UiMultiLineTextWithIcon.vue` - 複数行テキスト+アイコン
- `UiScenarioMetric.vue` - シナリオメトリクス

#### Textコンポーネント
- `TextMainTitle.vue` - メインタイトル
- `TextSubTitle.vue` - サブタイトル

#### Utilコンポーネント
- `UtilPhase.client.vue` - フェーズベース条件表示

### 15.2 Composables一覧
- `useSessionList.ts` - セッション一覧取得
- `useNewInfo.ts` - 新着情報取得
- `useEventPhase.ts` - イベントフェーズ管理
- `useSiteMeta.ts` - メタタグ設定
- `useHtmlSanitizer.ts` - HTMLサニタイゼーション

### 15.3 設定ファイル一覧
- `nuxt.config.ts` - Nuxt設定
- `app.config.ts` - アプリケーション設定
- `tsconfig.json` - TypeScript設定
- `.eslintrc.cjs` - ESLint設定
- `.prettierrc` - Prettier設定
- `app/config/events.ts` - イベントフェーズ設定

---

**以上、DAC TOHOKU ウェブサイト仕様書**
