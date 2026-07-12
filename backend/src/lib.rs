mod  wave_engine;
use wasm_bindgen::prelude::*;
use wave_engine::Wave1D;

#[wasm_bindgen]
pub struct WasmWave1D {
    engine: Wave1D,
}

#[wasm_bindgen]
impl WasmWave1D {
    #[wasm_bindgen(constructor)]
    pub fn new(size: usize) -> Self {
        WasmWave1D { engine: Wave1D::new(size) }
    }

    // 波を動かす
    pub fn tick(&mut self) {
        self.engine.tick();
    }

    // 波源を作る
    pub fn pluck(&mut self, index: usize, force: f32) {
        self.engine.pluck(index, force);
    }

    // JS側にデータを渡す（スナップショット）
    pub fn get_data(&self) -> Vec<f32> {
        self.engine.get_current_state()
    }
}