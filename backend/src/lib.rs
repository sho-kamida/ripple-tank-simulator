mod  wave_engine;
use wasm_bindgen::prelude::*;
use wave_engine::Wave2D;

#[wasm_bindgen]
pub struct WasmWave2D {
    engine: Wave2D,
}

#[wasm_bindgen]
impl WasmWave2D {
    #[wasm_bindgen(constructor)]
    pub fn new(width: usize, height: usize) -> Self {
        WasmWave2D {
            engine: Wave2D::new(width, height),
        }
    }

    // 波を動かす
    pub fn tick(&mut self) { self.engine.tick(); }

    // 波源を作る
    pub fn pluck(&mut self, x: usize, y: usize, force: f32) {
        self.engine.pluck(x, y, force);
    }

    // JS側にデータを渡す（スナップショット）
    pub fn get_data(&self) -> Vec<f32> {
        self.engine.get_current_state()
    }
}