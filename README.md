<div id="top"></div>

# Color Atlas

### アプリケーションについて
<!-- プロジェクトについて -->
ある街のイメージを伝えたいと思った時どうしますか？街の何ヶ所かで写真を撮って並べますか？
人は街の中を動き回り街をイメージで捉えることはできますが、写真ではその場所、その瞬間のみしか捉えることはできません。場所の範囲が広くなればなるほど、1枚の写真で伝えることは難しくなります。それに、その写真の中に写っているものは本当に街を表していると言えるでしょうか？見た目は本質を表しているとは限らないからです。
この瞬間この場所ではなく、街全体、朝昼晩を1つに切り取るにはどうしたら良いか。私にも答えは分かりません。ただ、抽象化が有効ではないかと考えました。単純化してまとめ、再構築する。普段私が扱うモダンフロントエンドのように。これは私が行う実験でもあります。このアプリを利用して素材を集め、最後にまとめるのは自分自身です。デザイナーの方、それ以外の全ての方に向けて制作しました。

### 制作背景
このWebアプリの着想は、画家オットー・ネーベルの『イタリアのカラーアトラス(色彩地図帳)』です。ネーベルが色彩に着目したのは同時代の画家カンディンスキーの著書『芸術における精神的なものについて』に基づく「地上の物質に縛り付けられていない色彩」という考えを支持していた理由があります。時代は具象絵画から抽象絵画への変革期でした。色や形を外観から切り離したことで本質的なものを探る現代のデザインへと繋がっています。
景観から色彩の印象のみを採取するという取り組みに私は興味を抱きました。ただ、色鉛筆やスケッチブックを持って出かけるのは少し億劫に感じることがあります。そこで、このアプリを考えてみました。ネーベルの色彩地図帳のような多くの色を採取することはできませんが(アプリでは最大6色です)、意図は反映できたと考えています。

## URL
アプリ:  https://color-atlas-rose.vercel.app
 <br >
『ゲストユーザーでログイン』ボタンから、ユーザー名とパスワードを入力せずにログインできます。

https://asami-portfolio.vercel.app/projects/color-app
<br>
Color Atlasの詳細(ポートフォリオ内)

## 使用技術一覧

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
  <!-- フロントエンドの言語一覧 -->
  <img src="https://img.shields.io/badge/-typescript-000000?style=for-the-badge&logo=typescript&logoColor=FFE500">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-react-000000?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-prisma-000000.svg?logo=prisma&style=for-the-badge">
  <img src="https://img.shields.io/badge/-supabase-000000.svg?logo=supabase&style=for-the-badge">
  <img src="https://img.shields.io/badge/-tailwindcss-000000?style=for-the-badge&logo=tailwindcss&logoColor=0854C1">
  <img src="https://img.shields.io/badge/-radixui-000000?style=for-the-badge&logo=radixui&logoColor=007FFF">
  <img src="https://img.shields.io/badge/-materialdesign-000000?style=for-the-badge&logo=materialdesign&logoColor=6750A4">
  <img src="https://img.shields.io/badge/-storybook-000000?style=for-the-badge&logo=storybook&logoColor=FF4785">
  <img src="https://img.shields.io/badge/-vitest-000000?style=for-the-badge&logo=vitest&logoColor=6E9F18">
  <img src="https://img.shields.io/badge/-docker-000000?style=for-the-badge&logo=docker&logoColor=2496ED">
  <img src="https://img.shields.io/badge/-githubcopilot-000000?style=for-the-badge&logo=githubcopilot&logoColor=999999">
  <img src="https://img.shields.io/badge/-figma-000000?style=for-the-badge&logo=figma&logoColor=F24E1E">
  <!-- バックエンドの言語一覧 -->
  <!-- ミドルウェア一覧 -->
  <!-- インフラ一覧 -->
</p>

## 機能一覧
- ユーザー認証、データ管理、画像アップロード ( NextAuth.js、Supabase Postgres )
- ORM (Prisma)
- データ取得・更新API ( Server Actions、route handler、server component)
- APIデータクライアント状態管理（ TanStack Query ）
- キャッシュコントロール (クライアント: invalidateQueries)
- 開発時データベース (Docker: postgres)
- スタイリング (cva + Tailwind CSS)
- UIデザイン (Figma)

<!-- 
- ユーザー登録、ログイン機能(devise)
- 投稿機能
  - 画像投稿(refile)
  - 位置情報検索機能(geocoder)
- いいね機能(Ajax)
  - ランキング機能
- コメント機能(Ajax)
- フォロー機能(Ajax)
- ページネーション機能(kaminari)
  - 無限スクロール(Ajax)
- 検索機能(ransack)
-->
## テスト構成
| 内容                         | ライブラリ・ツール                 |
| --------------------------- | ------------------------------- |
| Formのバリデーションチェック    | Zod　　                          |
| UI/UX確認&アクセシビリティチェック  | Storybook                       |
| 単体・ユニットテスト                    | vitest + testing-library |
  

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク他 | バージョン |
| --------------------- | ---------- |
| Node.js               | 24.5.0    |
| React                 | 19.2.4     |
| Next.js               | 16.2.9     |
| storybook             | ^10.4.3     |
| prisma                | ^6.19.0     |

その他のパッケージのバージョンは package.json を参照してください. 


## アプリ詳細

https://asami-portfolio.vercel.app/projects/color-app
