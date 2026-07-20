// 描画のメイン関数
// 1次元配列として受け取ったデータをピクセルごとに変換
export function drawWave(ctx: CanvasRenderingContext2D, data: Float32Array, width: number, height: number): void {
    // 描画用の画像データ（RGBAの配列）を準備
    const imageData = ctx.createImageData(width, height);

    for (let i = 0; i < data.length; i++) {
        const [r, g, b] = applyColorMap(data[i]);

        // ImageDataへセット (R, G, B, Aの順に格納されるため i * 4)
        const pixelIdx = i * 4; //
        imageData.data[pixelIdx]     = r;   // R
        imageData.data[pixelIdx + 1] = g;   // G
        imageData.data[pixelIdx + 2] = b;   // B
        imageData.data[pixelIdx + 3] = 255; // A (アルファ値: 不透明)
    }

    // 計算した画像データをCanvasに書き込む
    ctx.putImageData(imageData, 0, 0);
}

// ヘルパー関数: 物理量から色(RGB)を決定する
function applyColorMap(val: number): [number, number, number] {
    // 1. 正規化
    let offset = 5.0
    let t = Math.max(0.0, Math.min(1.0, (val*offset + 5.0) / 10.0));
    
    // ガンマ補正を適用する場合
    t = Math.pow(t, 1.5);

    // 2. Jetカラーマップの成分計算
    const r = Math.min(4.0 * t - 1.5, -4.0 * t + 4.5);
    const g = Math.min(4.0 * t - 0.5, -4.0 * t + 3.5);
    const b = Math.min(4.0 * t + 0.5, -4.0 * t + 2.5);

    return [
        Math.floor(Math.max(0, Math.min(1, r)) * 255),
        Math.floor(Math.max(0, Math.min(1, g)) * 255),
        Math.floor(Math.max(0, Math.min(1, b)) * 255)
    ];
}