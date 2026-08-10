# Calcio ⚽

参考画像をもとに実装した、サッカー(フットボール)プレイヤー向けモバイルアプリの UI です。
React + TypeScript + Vite 製のモバイルファーストな SPA として動作します。

## 画面

- **Profile(プロフィール)**
  - ヘッダー:ウォレット残高(€0.00 / チャージボタン)、ユーザー名、通知・設定アイコン
  - Weekly streak:現在 / 最高ストリーク、今週のカレンダー(今日をハイライト)、「Find events」バナー
  - Achievements:実績バッジ(Drafted / Match Ready / Official Player / Title Winner)を横スクロール表示
  - Frequent players:一緒にプレイした選手の空状態表示
  - Received compliments:もらった称賛の空状態表示
  - Milestones:試合数マイルストーンバッジ(10 / 25 / 50 / 100 / 200)と「Find games」バナー
- **Edit profile(プロフィール編集)**
  - プロフィール写真(月 1 回のみ変更可の注意書き)
  - Bio、Basic Info(性別・生年月日・国籍・職業・居住地・言語・興味)
  - Football(スキルレベル・ポジション・チーム・憧れの選手・モチベーション)
  - 各項目はボトムシートで入力でき、`localStorage` に保存されます
  - 全項目を入力すると「Match Ready」実績が解除されます
- **Explore / Fields / Messages**:プレースホルダー画面

## 開発

```bash
npm install
npm run dev      # 開発サーバー
npm run build    # 本番ビルド
npm run preview  # ビルドのプレビュー
npm run lint     # lint
```
