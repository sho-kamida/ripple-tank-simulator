import { WasmWave2D } from './pkg';

export class WaveEngine {
  private wave: WasmWave2D;

  constructor(width: number, height: number) {
    this.wave = new WasmWave2D(width, height);
  }

  // 物理演算を1ステップ進める
  update(): void {
    this.wave.tick();
  }

  // Wasmからのデータを取得する（Float32Arrayを想定）
  getData(): Float32Array {
    return this.wave.get_data();
  }

  // 波を起こす
  pluck(x: number, y: number, force: number): void {
    this.wave.pluck(x, y, force);
  }
}