# GawdiBoard フロントエンド編
- [gawdiboardとは](#gawdiboardとは)
- [開発用環境](#開発用環境)
  - [nodeのバージョン](#nodeのバージョン)
  - [nodeがインストールされてる人](#nodeがインストールされてる人)
  - [nodeがインストールできないorしたくない人](#nodeがインストールできないorしたくない人)
- [本番用環境](#本番用環境)

## gawdiboardとは
GawdiBoard(カウディーボード)はECC コンピュータ専門学校専用の掲示板サイトです。

## 開発用環境
### nodeのバージョン
nodeのバージョンは16以上を想定してます。
nodeのバージョンは開発メンバーで揃えるのが理想なので[nvm](https://github.com/nvm-sh/nvm)の利用をお勧めしています。

nvmを使っている人はクローンした後に
```bash
$ nvm use
```
を実行してください。
nvm以外のバージョン管理ツールは現状サポートしていません。

### nodeがインストールされてる人
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

### nodeがインストールできないorしたくない人
開発はDockerじゃなくていいかなと思いながら環境構築をしたのですが、どうしてもnodeを入れられない人、事情があってすごく古いバージョンから動かせない人用にDockerの環境を用意しています。

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

#### -fフラグの省略
上のコマンドでは`docker compose`コマンドに`-f`オプションで compose.yml ファイルを指定していますが、環境変数を設定することで毎回ファイル名を指定しなくて良くなります。

環境変数`COMPOSE_FILE`を`docker-compose.development.yml`に設定すると
```
$ docker compose up
```
だけで開発サーバーが立つようになります。

ちなみに環境変数は`.env`ファイルでも設定できますが、現状の構成だとルートディレクトリにenvファイルを作るとコンテナ内のnext.jsも同じenvファイルを読み込むので、干渉しないように注意してください。

## 本番用環境
**(まだできてません、後で作ります)**

本番用のDockerを使ってください。

本番サーバー下では凡ミスで開発環境を立ち上げたくないので、`-f`オプションの利用はお勧めしません。

環境変数`COMPOSE_FILE`を`docker-compose.production.yml`に設定してから
```bash
$ docker compose up
```
を実行してください。

## 備考
このプロジェクトは[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)を使って作られました。
