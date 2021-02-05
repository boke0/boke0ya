---
date: 2021-01-30
title: 機械学習のお勉強【其の弐】 行列演算を実装するぞ
topImage: ./hero/machine-learning-2.png
draft: true
---

木瓜丸です。

[前回](https://boke0.netlify.com/blog/machine-learning-1)に引き続き、今回はニューラルネットワークには欠かせない行列の演算を実装してみたいと思います。

行列ぐらいライブラリを使って作れって？趣味だからクソコード作っても犯罪じゃないんですよ。

## やりたいこと

どうせなら、行列の掛け算もこんなふうにできたら気持ち良いよねと。

```rust
let a: Mat<u8> = mat![
    1, 2;
    3, 4;
];
let b: Mat<u8> = mat![
    5, 6;
];
assert_eq!(a * b, mat![
    19, 22;
    43, 50;
]);
```

## 実装

データ構造は[既存のライブラリ](https://github.com/AtheMathmo/rusty-machine/blob/master/examples/k-means_generating_cluster.rs)を参考にして作ってみることにします。

どうせ扱う値は32bitのfloatなので、Mat<f32>だけ掛け算を実装しときます。

```rust
use std::ops::Mul;

#[derive(Debug, PartialEq)]
pub struct Mat<T> {
    cols: usize,
    rows: usize,
    data: Vec<T>
}

impl Mul for Mat<f32> {
    type Output = Self;
    fn mul(self, rhs: Self) -> Self {
        let rows = self.cols;
        let cols = rhs.rows;
        let mut data = Vec::new();
        for i in 0..self.rows {
            for j in 0..rhs.cols {
                let mut c = 0.0;
                for k in 0..self.cols {
                    c += self.data[i * self.cols + k] * rhs.data[k * rhs.cols + j];
                }
                data.push(c);
            }
        }
        Mat {
            cols,
            rows,
            data
        }
    }
}
```

こんな感じです。冒頭に書いたみたいな気持ちいいやつができるようにマクロも組みましょう。

```rust

#[macro_export]
macro_rules! mat {
    ( $( $($i: expr),* );+ ) => {
        {
            let mut data = Vec::new();
            let mut rows = 0;
            $(
                $(
                    data.push($i);
                )*
                rows += 1;
            )+
            rows -= 1;
            let cols = data.len() / rows;
            Mat{
                cols,
                rows,
                data
            }
        }
    }
}

```

## 動作確認

```rust

#[cfg(test)]
mod test{
    use super::*;
    #[test]
    fn test_mat_macro() {
        let a = mat![
            0, 0;
            0, 0;
        ];
        assert_eq!(mat![
            0, 0;
            0, 0;
        ], Mat {
            cols: 2,
            rows: 2,
            data: vec![0,0,0,0]
        });
        assert_eq!(mat![
            1, 2, 3;
            4, 5, 6;
        ], Mat {
            cols: 3,
            rows: 2,
            data: vec![1,2,3,4,5,6]
        });
    }
    #[test]
    fn test_mat_dot() {
        let a = mat! [
            1.0, 2.0;
            3.0, 4.0;
        ];
        let b = mat! [
            5.0, 6.0;
            7.0, 8.0;
        ];
        println!("{:?} * {:?}", a, b);
        assert_eq!(a * b, mat![
            15.0, 18.0;
            35.0, 42.0;
        ]);
    }
}
```

```bash

running 2 tests
test mat::test::test_mat_macro ... ok
test mat::test::test_mat_dot ... ok

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

```

チョー気持ち良い。これでNNが組めますね！

では、次はいよいよ勾配降下法を作ってみましょう
