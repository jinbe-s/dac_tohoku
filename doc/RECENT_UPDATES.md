# DAC東北 最新アップデート履歴

## 概要
このドキュメントは2025年12月13日に実施された一連の機能改善とバグ修正の詳細をまとめたものです。

---

## アップデート日
2025年12月13日

---

## 主な変更内容

### 1. モバイル表示の改善（SessionDetail.vue）

#### 1.1 セッション詳細チップのレスポンシブ対応
**コミット:** `d12ca23`

**問題点:**
- 「2レベル」「PL人数」「PC事前準備」の3つのチップがモバイルで折り返していた
- 「TRPG初心者向け」等の4つのチップに`min-width: 175px`が設定され、小型モバイルで横スクロールのリスクがあった

**実施した修正:**

##### 3つのチップ（行30-43）
- モバイル（959px以下）で`flex-wrap: wrap`を許可し、2行表示に対応
- gap: 12px → 8px に縮小
- フォントサイズ: 16px → 14px に縮小
- 左右padding: 12px → 8px に縮小

```scss
@media (max-width: 959px) {
  .detail-chips-primary {
    flex-wrap: wrap;
    gap: 8px !important;
  }

  .detail-chips-primary span {
    font-size: 0.875rem !important;
    padding-left: 8px !important;
    padding-right: 8px !important;
  }
}
```

##### 4つのチップ（行44-65）
- min-width: 175px → 140px に縮小（959px以下）
- min-width: 130px に設定（600px以下）
- フォントサイズ: 16px → 14px（959px以下）、12px（600px以下）

```scss
@media (max-width: 959px) {
  .session-tendency span {
    min-width: 140px;
    font-size: 0.875rem !important;
  }
}

@media (max-width: 600px) {
  .session-tendency span {
    min-width: 130px;
    font-size: 0.75rem !important;
  }
}
```

**変更ファイル:**
- [app/components/section/SessionDetail.vue](../app/components/section/SessionDetail.vue)

---

### 2. UI/UX改善と応募フォーム関連の修正

#### 2.1 ナビゲーションリンクの改善
**コミット:** `fd8cae6`

**実施した修正:**
- ホバー時に半透明の白背景を表示（`background-color: rgba(255, 255, 255, 0.1)`）
- アクティブなリンクに太字（`font-weight: 600`）を適用
- アクティブなリンクにアクセントカラーの下線を追加（高さ3px）
- インラインスタイルをCSSクラスに移行

**変更ファイル:**
- [app/components/HeaderNavLink.vue](../app/components/HeaderNavLink.vue)

```vue
<style scoped>
.nav-link {
  color: rgb(var(--v-theme-on-primary));
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active::after {
  content: '';
  height: 3px;
  background-color: rgb(var(--v-theme-accent));
}
</style>
```

#### 2.2 応募フォームURL管理の一元化

**新規ファイル作成:**
- [app/config/forms.ts](../app/config/forms.ts)

**目的:**
Single Source of Truth（SSOT）原則に基づき、すべてのフォームURLを一箇所で管理

```typescript
export const FORM_URLS = {
  GM: 'https://forms.gle/uyxbAmmkVR38PJxG6',
  PL: 'https://forms.gle/396KzfaJKVYnSALs9',
  CONTACT: 'https://forms.gle/k7JC317qwSvJEhf56',
} as const
```

#### 2.3 イベント情報セクションの改善

**実施した修正:**
- ボタンを外部フォームへの直接リンク → 募集要項ページへのリンクに変更
- ボタンスタイルを`accent`（塗りつぶし） → `primary outlined`（枠線）に変更
- アイコンを`mdi-open-in-new` → `mdi-chevron-right`に変更
- 「外部フォームに移動します」の注記を削除

**変更ファイル:**
- [app/components/section/EventInfo.vue](../app/components/section/EventInfo.vue)

#### 2.4 参加方法セクションの簡素化

**実施した修正:**
- 応募ボタンをテキストリンクに変更（「詳しくは○○募集要項ページをご覧ください」）
- お問い合わせボタンを削除
- レイアウトを`flex-column`に変更

**変更ファイル:**
- [app/components/section/HowToJoin.vue](../app/components/section/HowToJoin.vue)

#### 2.5 募集要項ページの改善

**実施した修正:**
- フォームリンクをテキストリンク → 大きなボタンに変更
  - サイズ: `large`
  - カラー: `accent`
  - エレベーション: `2`
  - アイコン: `mdi-open-in-new`
- 募集日程を更新
  - GM募集: 2/7-2/23 → **1/17-2/15**
  - PL募集: 3/1-3/21 → **2/23-3/22**
- `FORM_URLS`を利用してURLを一元管理

**変更ファイル:**
- [app/pages/about.vue](../app/pages/about.vue)

#### 2.6 フェーズ表示コンポーネントの拡張

**実施した修正:**
- `once` propsを追加（複数フェーズがアクティブな場合、最初の1つだけ表示）

```typescript
const props = withDefaults(defineProps<{
  map?: Partial<Record<PhaseKey, any>>
  fallback?: any
  once?: boolean
}>(), {
  once: false
})
```

**変更ファイル:**
- [app/components/util/Phase.client.vue](../app/components/util/Phase.client.vue)

#### 2.7 トップページの改善

**実施した修正:**
- 募集要項ボタンのスタイルを統一
  - サイズ: `large`
  - カラー: `accent`
  - エレベーション: `2`
- 「HowToJoin」セクションを削除（重複コンテンツのため）

**変更ファイル:**
- [app/pages/index.vue](../app/pages/index.vue)

#### 2.8 Vuetifyテーマの改善

**実施した修正:**
- アクセントカラー変更: `#FFB300`（黄色） → `#F57C00`（オレンジ700）
  - 理由: 白テキストとのコントラスト比改善
- `on-primary`, `on-secondary`, `on-accent`カラーを追加
  - ライトテーマ: 白（`#FFFFFF`）
  - ダークテーマ: 黒（`#000000`）

**変更ファイル:**
- [app/plugins/vuetify.ts](../app/plugins/vuetify.ts)

```typescript
// ライトテーマ
accent: '#F57C00',
'on-primary': '#FFFFFF',
'on-secondary': '#FFFFFF',
'on-accent': '#FFFFFF',

// ダークテーマ
accent: '#26C6DA',
'on-primary': '#000000',
'on-secondary': '#000000',
'on-accent': '#000000',
```

---

### 3. Twitterタイムライン表示の修正

**コミット:** `7412a1d`

#### 3.1 問題点の調査結果

**主な問題:**
1. スクリプト読み込み完了前にコンポーネントがマウントされていた（タイミング競合）
2. Lazy読み込みとの競合
3. `window.twttr`の存在確認が甘い

**詳細な問題:**
- `twitter-widgets.client.ts`でスクリプトを非同期で読み込んでいたが、読み込み完了を待たずにプラグインが終了
- `onMounted`でオプショナルチェーンを使用しており、`window.twttr`が未定義の場合はサイレントに失敗

#### 3.2 実施した修正

##### twitter-widgets.client.ts
- `Promise<void>`を返すように変更してスクリプト読み込み完了を待機
- 既にスクリプトが読み込まれている場合の処理を追加
- `onload`/`onerror`イベントハンドラーでエラーハンドリング実装

```typescript
export default defineNuxtPlugin(() => {
  return new Promise<void>((resolve) => {
    // 既にスクリプトが読み込まれている場合
    if ((window as any).twttr?.widgets) {
      resolve()
      return
    }

    // スクリプト要素が既に存在する場合は、読み込み完了を待つ
    const existingScript = document.getElementById('twitter-wjs')
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve())
      return
    }

    // 新規にスクリプトを追加
    const s = document.createElement('script')
    s.id = 'twitter-wjs'
    s.async = true
    s.src = 'https://platform.twitter.com/widgets.js'
    s.onload = () => resolve()
    s.onerror = () => {
      console.error('Failed to load Twitter widgets script')
      resolve()
    }
    document.head.appendChild(s)
  })
})
```

##### TwitterTimeline.vue
- リトライロジックを追加（最大5回、500ms間隔）
- `window.twttr.widgets`の存在確認を厳密に実施
- コンソールログでデバッグ情報を出力

```typescript
const loadTwitterTimeline = () => {
  const twttr = (window as any).twttr
  if (twttr?.widgets) {
    twttr.widgets.load(twRoot.value || undefined)
  } else {
    console.warn('Twitter widgets not loaded yet, retrying...')
    let retryCount = 0
    const retryInterval = setInterval(() => {
      retryCount++
      const twttr = (window as any).twttr
      if (twttr?.widgets) {
        twttr.widgets.load(twRoot.value || undefined)
        clearInterval(retryInterval)
      } else if (retryCount >= 5) {
        console.error('Failed to load Twitter widgets after 5 retries')
        clearInterval(retryInterval)
      }
    }, 500)
  }
}
```

**変更ファイル:**
- [app/plugins/twitter-widgets.client.ts](../app/plugins/twitter-widgets.client.ts)
- [app/components/section/TwitterTimeline.vue](../app/components/section/TwitterTimeline.vue)

---

## 技術的な改善点

### 1. レスポンシブデザイン
- モバイル（959px以下）とさらに小型モバイル（600px以下）の2段階でスタイルを調整
- `flex-wrap: wrap`を活用した柔軟なレイアウト
- フォントサイズとpaddingの最適化

### 2. コード品質
- SSOT原則の適用（forms.tsの追加）
- DRY原則の適用（重複コードの削除）
- TypeScript型安全性の維持

### 3. ユーザビリティ
- ナビゲーションのアクティブ状態が視覚的に明確
- ボタンスタイルの統一
- フォームURLの一元管理による保守性向上

### 4. パフォーマンス
- Twitter Widgetsスクリプトの非同期読み込み最適化
- リトライロジックによる確実な読み込み

---

## 影響範囲

### 変更ファイル一覧

| ファイル | 変更内容 | コミット |
|---------|---------|---------|
| app/components/section/SessionDetail.vue | モバイルレスポンシブ対応 | d12ca23 |
| app/components/HeaderNavLink.vue | ナビゲーション改善 | fd8cae6 |
| app/components/section/EventInfo.vue | ボタン表示変更 | fd8cae6 |
| app/components/section/HowToJoin.vue | レイアウト簡素化 | fd8cae6 |
| app/components/util/Phase.client.vue | once props追加 | fd8cae6 |
| app/config/forms.ts | **新規作成** | fd8cae6 |
| app/pages/about.vue | フォームボタン改善 | fd8cae6 |
| app/pages/index.vue | ボタンスタイル統一 | fd8cae6 |
| app/plugins/vuetify.ts | テーマカラー改善 | fd8cae6 |
| app/plugins/twitter-widgets.client.ts | 読み込み待機実装 | 7412a1d |
| app/components/section/TwitterTimeline.vue | リトライロジック追加 | 7412a1d |

---

## テスト推奨項目

### モバイル表示確認
- [ ] iPhone SE（375px）でセッション詳細が正しく表示される
- [ ] 「2レベル」「PL人数」「PC事前準備」が適切に折り返す
- [ ] 「TRPG初心者向け」等のチップが横スクロールしない
- [ ] フォントサイズが読みやすい

### UI/UX確認
- [ ] ヘッダーナビゲーションのホバー効果が動作する
- [ ] アクティブなページに下線が表示される
- [ ] 募集要項ページのボタンが目立つ
- [ ] フォームリンクが正しく動作する

### Twitter表示確認
- [ ] トップページでTwitterタイムラインが表示される
- [ ] リトライロジックが動作する（開発者ツールで確認）
- [ ] エラーが発生した場合にコンソールに表示される

### レスポンシブ確認
- [ ] デスクトップ（1280px以上）
- [ ] タブレット（768px-959px）
- [ ] モバイル（600px-767px）
- [ ] 小型モバイル（320px-599px）

---

## 今後の改善提案

### 1. アクセシビリティ
- ARIA属性の追加
- キーボードナビゲーションの改善
- コントラスト比のさらなる改善

### 2. パフォーマンス
- 画像の最適化（WebP対応）
- Critical CSSの抽出
- バンドルサイズの削減

### 3. 機能追加
- セッション検索機能の強化
- お気に入り機能
- PWA対応

---

## 参考資料

### 関連ドキュメント
- [SPECIFICATION.md](SPECIFICATION.md) - プロジェクト仕様書
- [CHANGES.md](CHANGES.md) - 公開準備時の修正内容
- [DEPLOYMENT.md](DEPLOYMENT.md) - デプロイ手順書
- [RESPONSIVE_IMPROVEMENTS.md](RESPONSIVE_IMPROVEMENTS.md) - レスポンシブ改善履歴

### 外部リンク
- [Vuetify 3 公式ドキュメント](https://vuetifyjs.com)
- [Material Design 3](https://m3.material.io/)
- [Twitter Widgets Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/timelines/overview)

---

**作成者:** Claude Sonnet 4.5
**作成日:** 2025年12月13日
**最終更新:** 2025年12月13日
