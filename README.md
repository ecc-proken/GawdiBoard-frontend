# GawdiBoard フロントエンド編

- [gawdiboard とは](#gawdiboardとは)
- [開発用環境](#開発用環境)
  - [node のバージョン](#nodeのバージョン)
  - [node がインストールされてる人](#nodeがインストールされてる人)
  - [node がインストールできない or したくない人](#nodeがインストールできないorしたくない人)
- [本番用環境](#本番用環境)

## gawdiboard とは

GawdiBoard(カウディーボード)は ECC コンピュータ専門学校専用の掲示板サイトです。

## 開発用環境

### node のバージョン

node のバージョンは 16 以上を想定してます。
node のバージョンは開発メンバーで揃えるのが理想なので[nvm](https://github.com/nvm-sh/nvm)の利用をお勧めしています。

nvm を使っている人はクローンした後に

```bash
$ nvm use
```

を実行してください。
nvm 以外のバージョン管理ツールは現状サポートしていません。

### node がインストールされてる人

インストール方法:

```bash
$ git clone https://github.com/ecc-proken/GawdiBoard-frontend.git
$ npm install
```

開発サーバーの起動(`localhost:3000`で起動):

```bash
$ npm run dev
```

プロダクションビルドを試したくなった時:

```bash
$ npm run build && npm start
```

### node がインストールできない or したくない人

開発は Docker じゃなくていいかなと思いながら環境構築をしたのですが、どうしても node を入れられない人、事情があってすごく古いバージョンから動かせない人用に Docker の環境を用意しています。

使用コンテナ: [node:16.13.0-alpine3.14](https://hub.docker.com/layers/node/library/node/16.13.0-alpine3.14/images/sha256-becdf5729afc47ce2c14015f63cd04086998a79c3a1f5107a60bd5342367365d?context=explore)

インストール方法:

```bash
$ git clone https://github.com/ecc-proken/GawdiBoard-frontend.git
$ docker compose -f docker-compose.development.yml run --rm node npm i
```

開発サーバーの起動(`localhost:3000`で起動):

```bash
$ docker compose -f docker-compose.development.yml up
```

npm install したい時:

```bash
$ docker compose -f docker-compose.development.yml run --rm node npm i
```

プロダクションビルドを試したくなった時:

```bash
$ docker compose -f docker-compose.development.yml run --rm node node_modules/.bin/next build && node_modules/.bin/next start
```

#### -f フラグの省略

上のコマンドでは`docker compose`コマンドに`-f`オプションで compose.yml ファイルを指定していますが、環境変数を設定することで毎回ファイル名を指定しなくて良くなります。

環境変数`COMPOSE_FILE`を`docker-compose.development.yml`に設定すると

```
$ docker compose up
```

だけで開発サーバーが立つようになります。

ちなみに環境変数は`.env`ファイルでも設定できますが、現状の構成だとルートディレクトリに env ファイルを作るとコンテナ内の next.js も同じ env ファイルを読み込むので、干渉しないように注意してください。

## 本番用環境

本番用の Docker を使ってください。

1. 環境変数`COMPOSE_FILE`を`docker-compose.production.yml`に設定する
2. .env.local ファイルに`NEXT_PUBLIC_API_HOST={バックエンドapiのurl}/api`を書く
3. `docker-compose up`を実行する

### 運用係の人へ

別途お渡ししている本番環境仕様書の「フロントエンド」の項目を確認の上でデプロイ作業をしてください。

## 備考

このプロジェクトは[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)を使って作られました。
