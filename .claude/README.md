# Claude Code プロジェクト設定

このディレクトリには、Claude Codeがこのプロジェクトで効率的に作業するための設定とドキュメントが含まれています。

---

## プロジェクト概要

**プロジェクト名:** DAC東北
**目的:** 宮城県仙台市で開催されるTRPGコンベンション「DAC東北」の公式ウェブサイト
**技術スタック:** Nuxt 3 + Vue 3 + Vuetify 3 + TypeScript

---

## 重要なドキュメント

### 仕様・設計
- [doc/SPECIFICATION.md](../doc/SPECIFICATION.md) - プロジェクト全体の仕様書
- [doc/RECENT_UPDATES.md](../doc/RECENT_UPDATES.md) - 最新のアップデート履歴（2025/12/13）
- [doc/CHANGES.md](../doc/CHANGES.md) - 公開準備時の修正内容

### 開発・デプロイ
- [doc/DEPLOYMENT.md](../doc/DEPLOYMENT.md) - デプロイ手順とチェックリスト

---

## プロジェクト構成

### ページ構成
| ページ | パス | 説明 |
|--------|------|------|
| トップ | `/` | イベント情報、新着情報、スケジュール |
| 参加案内 | `/about` | Discord案内、PL/DM募集要項 |
| 卓一覧 | `/session` | セッション一覧、詳細モーダル |
| お問い合わせ | `/contact` | 問い合わせフォームへのリンク |

### 重要な設定ファイル
- `app/config/events.ts` - イベントフェーズ設定（GM1/GM2/PL1/PL2の募集期間）
- `app/config/forms.ts` - フォームURL管理（SSOT原則）

---

## 重要な技術情報

### 1. イベントフェーズ管理

プロジェクトは「イベントフェーズ」で動的にコンテンツを切り替えます。

**現在のフェーズ:**
- `GM1`: GM募集（2025/1/17 - 2026/2/15）
- `PL1`: PL募集（2026/2/23 - 2026/3/22）

**使用方法:**
```vue
<UtilPhase>
  <template v-slot:GM1>
    <!-- GM1期間中のみ表示 -->
  </template>
</UtilPhase>
```

### 2. フォームURL管理（SSOT原則）

すべての外部フォームURLは`app/config/forms.ts`で一元管理:

```typescript
export const FORM_URLS = {
  GM: 'https://forms.gle/uyxbAmmkVR38PJxG6',
  PL: 'https://forms.gle/396KzfaJKVYnSALs9',
  CONTACT: 'https://forms.gle/k7JC317qwSvJEhf56',
}
```

### 3. レスポンシブデザイン

**ブレークポイント:**
- デスクトップ: 960px以上
- モバイル: 959px以下
- 小型モバイル: 600px以下

---

## よくあるタスク

### イベントフェーズを更新する
1. `app/config/events.ts` を編集
2. `PHASES` オブジェクトの日時を変更
3. フェーズのコメントアウト/アンコメント

### フォームURLを変更する
1. `app/config/forms.ts` を編集
2. すべてのフォームリンクが自動的に更新される

---

## Claude Codeへの重要な指示

### ⚠️ コミット・プッシュについて
- 修正内容を実装した後、**必ずユーザーに確認を取ってから**コミット・プッシュしてください
- 勝手にコミット・プッシュしないでください

### プランモード
- 複雑なタスクや複数ファイルにまたがる変更の場合、プランモードを使用してください

### ドキュメント更新
- 重要な変更を加えた場合、`doc/RECENT_UPDATES.md` を更新してください

---

## 開発コマンド

```bash
# 開発サーバー起動
yarn dev

# ビルド
yarn build

# 静的サイト生成
yarn generate

# コード品質チェック
yarn lint
yarn format
yarn typecheck
```

---

**最終更新:** 2025年12月13日
