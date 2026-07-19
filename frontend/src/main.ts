import init, { WasmWave2D } from './pkg'

async function run() {
  await init();
  const width = 20;
  const height = 20;
  const wave = new WasmWave2D(width, height); // 20x20のグリッド
  let isRunning = true;

  // HTMLからCanvas要素を取得してサイズを設定
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // 描画用の画像データ（RGBAの配列）を準備
  const imageData = ctx.createImageData(width, height);

  function loop() {
    if (isRunning) {
      wave.pluck(10, 10, -1.0);
      isRunning = false
    }
    wave.tick();

    const data = wave.get_data();

    // 1次元配列として受け取ったデータをピクセルごとに変換
    for (let i = 0; i < data.length; i++) {
      // 1. 正規化とマッピング (-1.0 ～ 1.0 の値を 0 ～ 255 に変換)
      let val = (data[i] + 1.0) / 2.0 * 255;

      // 2. 範囲外の値をカット (確実に0～255の範囲に収める)
      val = Math.max(0, Math.min(255, val))

      // 3. ImageDataへセット (R, G, B, Aの順に格納されるため i * 4)
      const pixelIdex = i * 4;
      imageData.data[pixelIdex]     = val; // R（赤）
      imageData.data[pixelIdex + 1] = val; // G（緑）
      imageData.data[pixelIdex + 2] = val; // B（青）
      imageData.data[pixelIdex + 3] = 255; // A (アルファ値: 不透明)
    }

    // 計算した画像データをCanvasに書き込む
    ctx.putImageData(imageData, 0, 0);

    // setTimeoutの代わりに、ブラウザの描画に合わせて次のフレームを呼び出す
    requestAnimationFrame(loop);
  }
  loop();
}
run();