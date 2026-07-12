import init, { WasmWave1D } from './pkg'

async function run() {
  await init();
  const wave = new WasmWave1D(100); // 100要素の波を作成
  let isRunning = true;

  // 数値表示用の要素を取得
  const debugEl = document.getElementById('debug') as HTMLPreElement

  function loop() {
    if (isRunning) {
      wave.pluck(5, -1.0);
      isRunning = false
    }
    wave.tick();

    const data = wave.get_data();

    // 配列の表示
    debugEl.textContent = Array.from(data).map(n => n.toFixed(2).padStart(7)).join(" ")

    setTimeout(loop, 1000)
  }
  loop();
}
run();