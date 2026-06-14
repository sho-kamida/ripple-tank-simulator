pub struct Wave1D {
    current: Vec<f32>,
    previous: Vec<f32>,
    speed: f32, // 波の速さ（クーラン数）
}

impl Wave1D {
    pub fn new(size: usize) -> Self {
        Wave1D { 
            current: vec![0.0; size],
            previous: vec![0.0; size],
            speed: 0.5,
        }
    }

    // 波源を作る（特定の場所の配列の値を無理やり上げる）
    pub fn pluck (&mut self, index: usize, force: f32) {
        if index < self.current.len() {
            self.current[index] = force;
        }
    }

    // 波を動かす
    pub fn tick(&mut self) {
        let size = self.current.len();
        let mut next = vec![0.0; size];

        // 両端（0とsize-1）は計算せず0のまま固定（固定端の境界条件）
        for i in 1..(size - 1) {
            // 空間的な曲がり具合（右 - 2*自分 + 左）
            let laplacian = self.current[i + 1] - 2.0 * self.current[i] + self.current[i - 1];

            // 未来の値を計算
            next[i] = 2.0 * self.current[i] - self.previous[i] + (self.speed * self.speed) * laplacian;
        }

        // 時間を進める
        self.previous = self.current.clone();
        self.current = next;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_wave_propagation() {
        let mut wave = Wave1D::new(10);

        // インデックス5の位置を指で弾く（波源を作る）
        wave.pluck(5, 1.0);

        // 5ステップ分だけ時間を進め、配列の中身がどう変化するか観察する
        for step in 0..5 {
            println!("Step {}: {:?}", step, wave.current);
            wave.tick();
        }
    }
}