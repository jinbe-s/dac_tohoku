# レスポンシブデザイン改善内容

## 実施日
2025-11-04

---

## 改善の目的
PC用表示のみに対応していたサイトを、スマートフォン・タブレットでも快適に閲覧できるように改善。

---

## 改善内容

### 1. ハンバーガーメニューの実装

#### 変更ファイル: [app/layouts/default.vue](app/layouts/default.vue)

**実装内容:**
- **デスクトップ（md以上）**: 従来通りヘッダーに横並びのナビゲーションメニュー
- **モバイル（mdより小さい）**: 右上にハンバーガーボタン（三本線アイコン）を配置
- ハンバーガーボタンをタップすると右からスライドインするナビゲーションドロワーを表示
- メニューアイテムをタップするとドロワーが自動的に閉じる

**SSOT原則の適用:**
```typescript
// ナビゲーションメニューの定義（単一の情報源）
const navItems = [
  { label: 'Home', to: { name: 'index' } },
  { label: '参加案内', to: { name: 'about' } },
  { label: '卓一覧', to: { name: 'session' } },
  { label: 'お問い合わせ', to: { name: 'contact' } },
  { label: '過去の開催', href: 'https://dac.10yearsafter.info/' }
]
```

**コンポーネント構成:**
```vue
<!-- デスクトップメニュー -->
<div class="d-none d-md-flex">
  <HeaderNavLink :items="navItems" />
</div>

<!-- モバイルハンバーガーメニュー -->
<v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer" />

<!-- ナビゲーションドロワー -->
<v-navigation-drawer v-model="drawer" temporary location="right">
  <v-list nav>
    <!-- navItemsを使用 -->
  </v-list>
</v-navigation-drawer>
```

---

### 2. テーブルの横スクロール対応

#### 変更ファイル: [app/components/section/SessionListTable.vue](app/components/section/SessionListTable.vue)

**問題点:**
- セッション一覧テーブルが横幅の広いデータを含むため、モバイルでは画面外にはみ出してしまう

**解決策:**
- テーブルを横スクロール可能なコンテナで囲む
- モバイルでは最小幅を600pxに設定し、横スクロールで全体を閲覧可能に

**実装内容:**
```vue
<div class="table-scroll-container">
  <v-data-table ... />
</div>
```

```scss
.table-scroll-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; // iOS用のスムーズスクロール

  @media (max-width: 959px) {
    border: 1px solid rgb(var(--v-theme-divider));
    border-radius: 8px;
  }
}

:deep(table) {
  min-width: 600px; // モバイルで横スクロール
}
```

**ユーザー体験:**
- モバイルではテーブルを左右にスワイプしてすべての列を閲覧可能
- iOS Safari でのスムーズスクロールに対応

---

### 3. トップページのボタン配置改善

#### 変更ファイル: [app/pages/index.vue](app/pages/index.vue)

**問題点:**
- 応募ボタンとスケジュールボタンが横並びで、モバイルでは幅が狭く押しにくい

**解決策:**
- モバイルでは縦並び、デスクトップでは横並びに変更
- `block`属性でボタン幅を100%に設定（モバイル時）

**実装内容:**
```vue
<!-- flex-column: モバイルで縦並び -->
<!-- flex-sm-row: 600px以上で横並び -->
<div class="d-flex flex-column flex-sm-row justify-center align-center ga-2 ga-sm-4 my-4">
  <v-btn block>GM応募案内</v-btn>
  <v-btn block>PL応募詳細</v-btn>
  <v-btn block>スケジュール</v-btn>
</div>
```

**レスポンシブクラスの説明:**
- `flex-column`: デフォルトで縦並び
- `flex-sm-row`: 600px以上で横並び
- `ga-2`: デフォルトで8pxのギャップ
- `ga-sm-4`: 600px以上で16pxのギャップ
- `block`: ボタンを親要素の幅いっぱいに表示

---

### 4. お問い合わせページの改善

#### 変更ファイル: [app/pages/contact.vue](app/pages/contact.vue)

**問題点:**
- 長いテキストがモバイルで折り返されず読みにくい

**解決策:**
- パディングを追加して余白を確保
- 改行タグをデスクトップのみ表示

**実装内容:**
```vue
<p class="font-weight-bold text-h6 text-sm-h5 text-center px-2">
  DAC TOHOKUについての質問・連絡は下記Googleフォーム
  <br class="d-none d-sm-inline">
  または公式X(旧Twitter)アカウントのリプライ・DMにてお願いします。
</p>
```

**レスポンシブクラスの説明:**
- `px-2`: 左右に8pxのパディング
- `text-h6`: デフォルトで見出しサイズ6
- `text-sm-h5`: 600px以上で見出しサイズ5（やや大きく）
- `d-none d-sm-inline`: 600px未満では非表示、600px以上でインライン表示

---

### 5. ヘッダーの改善

#### 変更ファイル: [app/layouts/default.vue](app/layouts/default.vue)

**実装内容:**
- サイト名に `text-truncate` を追加して、長いテキストが省略されるように
- フッターのテキストを `<small>` タグで囲んで小さく表示

```vue
<span class="font-weight-medium text-truncate">{{ siteName }}</span>
```

```vue
<v-footer app class="justify-center">
  <small>© {{ new Date().getFullYear() }} {{ siteName }}</small>
</v-footer>
```

---

## Vuetifyのレスポンシブブレークポイント

このプロジェクトではVuetify 3のデフォルトブレークポイントを使用：

| ブレークポイント | 幅 | デバイス | クラス例 |
|-----------------|-----|---------|---------|
| xs | < 600px | スマートフォン（縦） | `d-flex` (デフォルト) |
| sm | 600px - 960px | スマートフォン（横）・小型タブレット | `d-sm-flex`, `flex-sm-row` |
| md | 960px - 1280px | タブレット・小型デスクトップ | `d-md-flex`, `d-md-none` |
| lg | 1280px - 1920px | デスクトップ | `d-lg-flex` |
| xl | > 1920px | 大型ディスプレイ | `d-xl-flex` |

---

## 使用したVuetifyのレスポンシブクラス

### 表示制御
- `d-none`: 非表示
- `d-{breakpoint}-{value}`: 特定のブレークポイント以上で表示
  - 例: `d-md-flex` → 960px以上でflexbox表示
  - 例: `d-md-none` → 960px以上で非表示

### Flexbox方向
- `flex-column`: 縦並び
- `flex-{breakpoint}-row`: 特定のブレークポイント以上で横並び
  - 例: `flex-sm-row` → 600px以上で横並び

### 間隔（ギャップ）
- `ga-{n}`: すべての子要素間のギャップ（1 = 4px）
  - 例: `ga-2` → 8px
- `ga-{breakpoint}-{n}`: 特定のブレークポイント以上でギャップ変更
  - 例: `ga-sm-4` → 600px以上で16px

### グリッドシステム
- `cols="{n}"`: デフォルトで列数指定（12分割）
- `{breakpoint}="{n}"`: 特定のブレークポイント以上で列数指定
  - 例: `<v-col cols="12" md="6">` → 960px未満は全幅、960px以上は半分幅

### パディング・マージン
- `px-{n}`: 左右のパディング
- `py-{n}`: 上下のパディング
- `ma-{n}`: 全方向のマージン
- `mt-{n}`: 上マージン
  - 例: `px-2` → 左右8px、`py-10` → 上下40px

### テキストサイズ
- `text-{size}`: テキストサイズ
  - 例: `text-h6` → 見出しサイズ6
- `text-{breakpoint}-{size}`: ブレークポイント以上でサイズ変更
  - 例: `text-sm-h5` → 600px以上で見出しサイズ5

---

## 確認項目チェックリスト

### モバイル表示（< 600px）
- [ ] ハンバーガーメニューが右上に表示される
- [ ] ハンバーガーメニューをタップするとドロワーが開く
- [ ] ドロワー内のメニューが縦並びで表示される
- [ ] メニューをタップするとドロワーが閉じてページ遷移する
- [ ] トップページのボタンが縦並びで表示される
- [ ] セッション一覧テーブルが横スクロール可能
- [ ] すべてのテキストが画面内に収まる
- [ ] タップ領域が十分に大きい（最低44x44px推奨）

### タブレット表示（600px - 959px）
- [ ] ハンバーガーメニューが表示される（960px未満）
- [ ] ボタンが横並びで表示される（600px以上）
- [ ] レイアウトが適切に調整される

### デスクトップ表示（≥ 960px）
- [ ] ヘッダーに横並びメニューが表示される
- [ ] ハンバーガーメニューが非表示
- [ ] すべてのコンテンツが適切に配置される
- [ ] 従来通りの表示

### 全デバイス共通
- [ ] スムーズなスクロール
- [ ] レイアウトの崩れがない
- [ ] 画像が適切に表示される
- [ ] リンクが正しく機能する
- [ ] フォームが使いやすい

---

## テスト方法

### ブラウザの開発者ツールを使用
1. Chrome/Firefox/Safariの開発者ツールを開く（F12キー）
2. デバイスツールバーをオン（Ctrl+Shift+M / Cmd+Shift+M）
3. 以下のデバイスでテスト：
   - iPhone SE（375px）
   - iPhone 12/13 Pro（390px）
   - iPhone 14 Pro Max（430px）
   - iPad Mini（768px）
   - iPad Pro（1024px）
   - デスクトップ（1920px）

### 実機でのテスト
- iOS Safari（iPhone、iPad）
- Android Chrome（スマートフォン、タブレット）
- 各種ブラウザ（Chrome、Firefox、Safari、Edge）

---

## 今後の改善案

### 1. タッチ操作の最適化
- スワイプジェスチャーでのページ遷移
- プルダウンでのリフレッシュ

### 2. パフォーマンス最適化
- 画像の遅延読み込み（Lazy Loading）の追加
- 重要なコンテンツの優先表示

### 3. アクセシビリティの向上
- タップ領域の拡大（最低44x44px）
- コントラスト比の改善
- フォーカスインジケーターの視認性向上

### 4. オフライン対応
- Service Workerの導入
- オフライン時のフォールバック表示

---

## 参考資料

### Vuetify 3 ドキュメント
- [Display and Visibility](https://vuetifyjs.com/en/styles/display/)
- [Flex](https://vuetifyjs.com/en/styles/flex/)
- [Spacing](https://vuetifyjs.com/en/styles/spacing/)
- [Grid System](https://vuetifyjs.com/en/components/grids/)
- [App Bar](https://vuetifyjs.com/en/components/app-bars/)
- [Navigation Drawer](https://vuetifyjs.com/en/components/navigation-drawers/)

### レスポンシブデザインのベストプラクティス
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [WebAIM: Mobile Accessibility](https://webaim.org/articles/mobile/)

---

## まとめ

この改善により、DAC TOHOKUウェブサイトはスマートフォン・タブレット・デスクトップのすべてのデバイスで快適に閲覧できるようになりました。

**主な改善点:**
1. ✅ ハンバーガーメニューの実装（モバイル対応）
2. ✅ テーブルの横スクロール対応
3. ✅ ボタン配置の最適化
4. ✅ テキストの可読性向上
5. ✅ SSOT/DRY原則の遵守

**技術的な特徴:**
- Vuetify 3のレスポンシブクラスを活用
- モバイルファーストのアプローチ
- タッチ操作に最適化
- パフォーマンスを考慮した実装

---

**最終更新日:** 2025-11-04
