# TOEIC Tracker

TOEIC学習の目標・スコア・学習記録・単語を一元管理できるWebアプリケーションです。

## デモ

- URL: https://toeic-tracker-eta.vercel.app
- メールアドレス：`test@example.com`
- パスワード：`password`

> ※
> バックエンドをRenderでホスティングしているため、コールドスタートにより初回のログインに30秒〜1分程度かかる場合があります。

## 開発背景

TOEIC学習に取り組む中で、学習時間はスマートフォンアプリ、単語はノートというように、学習情報を別々の場所で管理することに煩わしさを感じていました。

そこで、目標・スコア・学習記録・単語を一元管理できる「TOEIC Tracker」を開発しました。今後、自身がTOEICを受験する際にも実際に活用し、利用を通じて得た気づきを機能改善に反映していく予定です。


## スクリーンショット

<!-- 後から実際の画像パスに変更 -->
![ダッシュボード](./docs/images/dashboard.png)
![学習記録管理画面]()
![単語記録管理画面]()
![スコア記録管理画面]()


## 主な機能

### ユーザー管理

- ユーザー登録・ログイン
- JWTを使用した認証
- ユーザー名・パスワードの変更

### 目標管理

- 目標スコアの設定
- 次回受験日の設定
- ベストスコアに応じた目標達成状況の表示

### スコア管理

- TOEICスコアの登録・編集・削除
- スコア推移の可視化
- 受験履歴の確認

### 学習記録

- 学習記録の登録・編集・削除
- カテゴリー別の学習記録
- 学習履歴の確認

### 単語学習

- 英単語の登録・編集・削除
- 登録した単語からの単語テスト
- 習得状況の管理


## 使用技術

| 分類 | 技術 |
| --- | --- |
| フロントエンド | React / TypeScript / Vite |
| UI | Tailwind CSS |
| フォーム | React Hook Form |
| データ取得・キャッシュ | TanStack Query |
| バックエンド | Java / Spring Boot |
| 認証・認可 | Spring Security / JWT |
| データアクセス | Spring Data JPA |
| データベース | PostgreSQL / Neon |
| マイグレーション | Flyway |
| フロントエンドテスト | Vitest / React Testing Library |
| バックエンドテスト | JUnit / Mockito / MockMvc |
| CI | GitHub Actions |
| ホスティング | Vercel / Render |

## システム構成

```mermaid
flowchart LR
    User["ユーザー"]
    Frontend["React / Vercel"]
    Backend["Spring Boot / Render"]
    Database["PostgreSQL / Neon"]

    User --> Frontend
    Frontend -->|REST API / JSON| Backend
    Backend --> Database
```

## 工夫した点

### フロントエンドの責務分離

APIへのアクセス処理をカスタムフックにまとめ、画面コンポーネントがUIの表示に集中できる構成にしました。

### APIレスポンスの統一

Spring Bootの `ProblemDetail` を使用してエラーレスポンスを統一しました。
入力エラーや認証エラーなどの内容を、フロントエンドで適切に表示できるようにしています。

### JWTによる認証

Spring SecurityとJWTを使用し、ログインユーザーごとにスコア・学習記録・単語を管理しています。
他のユーザーが所有するデータを操作できないよう、バックエンド側でも所有者を検証しています。

### テストの実装

サービス層のユニットテストに加え、MockMvcを使用したControllerのテスト、
VitestとReact Testing Libraryを使用したフロントエンドのテストを実装しました。

### CIによる自動チェック

GitHub Actionsを使用し、Pull Request作成時にテストとビルドを自動実行しています。