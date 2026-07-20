pub struct Wave2D {
    current: Vec<f32>,
    previous: Vec<f32>,
    width: usize,
    height: usize,
    speed: f32, // 波の速さ（クーラン数）
}

impl Wave2D {
    pub fn new(width: usize, height: usize) -> Self {
        let size = height * width;
        Wave2D { 
            current: vec![0.0; size],
            previous: vec![0.0; size],
            width,
            height,
            speed: 0.499,
        }
    }

    // 波源を作る（特定の場所の配列の値を無理やり上げる）
    pub fn pluck (&mut self, x: usize, y: usize, force: f32) {
        if x < self.width && y < self.height {
            self.current[y * self.width + x] = force;
        }
    }

    // 波を動かす
    pub fn tick(&mut self) {
        let mut next = vec![0.0; self.width * self.height];
        let c2 = self.speed * self.speed;

        // 境界（端の1ピクセル）を除いて計算
        for y in 1..(self.height - 1) {
            for x in 1..(self.width - 1) {
                let i = y * self.width + x;

                // 周辺4点のインデックス
                let u = (y - 1) * self.width + x;
                let d = (y + 1) * self.width + x;
                let l = y * self.width + (x - 1);
                let r = y * self.width + (x + 1);

                // 2次元ラプラシアン
                let laplacian = self.current[u] +
                                     self.current[d] +
                                     self.current[l] +
                                     self.current[r] - 
                                     4.0 * self.current[i];
                
                next[i] = 2.0 * self.current[i] - self.previous[i] + c2 * laplacian;

            }
        }

        // 時間を進める
        self.previous = self.current.clone();
        self.current = next;
    }

    pub fn get_current_state(&self) -> Vec<f32> {
        self.current.clone()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    // 2Dの状態を分かりやすく表示するための補助関数
    fn print_grid(width: usize, height: usize, state: &[f32]) {
        for y in 0..height {
            for x in 0..width {
                // 値に応じて文字を変える（0は点、値があればその値を表示）
                let val = state[y * width + x];
                if val.abs() > 0.001 {
                    print!("{:>6.2} ", val);
                } else {
                    print!("  .    ");
                }
            }
            println!();
        }
    }

    #[test]
    fn test_wave_propagation_2d() {
        let width = 20;
        let height = 20;
        let mut wave = Wave2D::new(width, height);

        // 中央付近を弾く（波源を作る）
        wave.pluck(10, 10, 1.0);

        println!("Initial State:");
        print_grid(width, height, &wave.get_current_state());

        // 5ステップ分だけ時間を進め、変化を観察する
        for step in 1..=20 {
            wave.tick();
            println!("\nStep {}:", step);
            print_grid(width, height, &wave.get_current_state());
        }
    }
}