# 環境構築手順

## Vite（フロント環境構築）
npm create vite@latest . -- --template vanilla-ts

npm install

### なぜViteか
Viteは：
- 起動が速い（開発体験がいい）
- ES Modulesベースでモダン
- Rust(Wasm)との連携がシンプル

### vanilla-ts の理由
- Wasmとの接続をシンプルにするため

## Rustプロジェクト作成（Wasm側）
cargo init --lib

WasmとしてJSから呼ばれる「部品」なので、libraryとして作る。

## wasm-pack / wasm-bindgen準備
cargo install wasm-pack

Rustコード
→ WebAssembly (.wasm)
→ JavaScriptから呼び出し

この変換役がwasm-packであり、wasm-bindgenがRustとjsの橋渡しとなる。

## Cargo.toml 設定
[lib]

crate-type = ["cdylib"]

[dependencies]

wasm-bindgen = "0.2"

" crate-type = cdylib "と書くことで、C互換のライブラリとして出力する。すなわち、JSが読める形にする宣言。

## ビルドでの生成方法
wasm-pack build --target web

これでJs側から使用できるラッパーを作る。

## 実行しサーバーを立ち上げる方法
npm run dev

## 全体の流れ
Rust（処理ロジック）

↓ wasm-pack

WebAssembly（バイナリ）

↓ wasm-bindgen

JavaScriptから呼び出し可能な関数群

## ビルドの自動化と成果物の配置について

package.jsonを実装したことにより、
Rust側の変更をFrontend側へ反映する際の手間を最小化するため、ビルドプロセスの自動化を行った。
- **自動化の仕組み:** `package.json` の `build:wasm` スクリプトを実行することで、`wasm-pack` が生成する成果物（WasmファイルおよびJSラッパー）を、自動的に `frontend/src/pkg` ディレクトリへ出力するように設定している。
- **メリット:** - ビルドごとに手動でファイルをコピーする必要がありません。
    - `npm run dev` のプロセス内で完結するため、常に最新のWasmモジュールをフロントエンドから利用可能にする。