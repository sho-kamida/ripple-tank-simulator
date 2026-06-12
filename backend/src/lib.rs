use wasm_bindgen::prelude::*;

// #[wasm_bindgen] マクロを付けることで、この関数がWasmのインターフェースとして
// 自動的にラップされ、TS側から呼べるようになる
#[wasm_bindgen]
pub fn add(left: u32, right: u32) -> u32 {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
