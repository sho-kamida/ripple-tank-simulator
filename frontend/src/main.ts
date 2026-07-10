import './style.css'
import init, { add } from './pkg';

// Wasmのロードと初期化は非同期で行われるため、トップレベルで実行します
async function runWasm() {
  // Wasmモジュールを初期化
  await init()
  console.log("Wasmが正常に読み込まれました！");

  // 試しに add 関数を実行
  const result = add(10, 32);
  console.log(`Rust側の計算結果: 10 + 32 = ${result}`);
}

runWasm();