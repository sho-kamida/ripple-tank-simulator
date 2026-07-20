import init from './pkg';
import { WaveEngine } from './engine';
import { drawWave } from './renderer';

async function run() {
  await init();

  // マップとして見やすくなるよう、解像度を少し上げる
  const width = 100;
  const height = 100;
  const engine = new WaveEngine(width, height);
  let isRunning = true;

  // HTMLからCanvas要素を取得してサイズを設定
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  function loop() {
    if (isRunning) {
      // マップの中央をタップする
      engine.pluck(Math.floor(width / 2), Math.floor(height / 2), -5.00);
      isRunning = false
    }

    // 1. 物理演算を1ステップ進める
    engine.update();

    // 2. データの取得
    const data = engine.getData();

    // 3. 描画
    drawWave(ctx, data, width, height);

    // setTimeoutの代わりに、ブラウザの描画に合わせて次のフレームを呼び出す
    requestAnimationFrame(loop);
  }
  loop();
}

run();