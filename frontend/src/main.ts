import init, { WasmWave2D } from './pkg'

async function run() {
  await init();
  const width = 20;
  const height = 20;
  const wave = new WasmWave2D(width, height); // 20x20のグリッド
  let isRunning = true;

  // 数値表示用の要素を取得
  const debugEl = document.getElementById('debug') as HTMLPreElement

  function loop() {
    if (isRunning) {
      wave.pluck(10, 10, -1.0);
      isRunning = false
    }
    wave.tick();

    const data = wave.get_data();

    // 2D波動の出力形式をwave_engine.rsのtestと同じにする
    let display = "";
    for (let y = 0; y < height; y++) {
      let row = "";
      for (let x = 0; x < width; x++) {
        const val = data[y * width + x];
        if (Math.abs(val) > 0.001) {
          row += val.toFixed(2).padStart(7) + " ";
        } else {
          row += "  .    ";
        }
      }
      display += row + "\n";
    }

    debugEl.textContent = display

    setTimeout(loop, 1000)
  }
  loop();
}
run();