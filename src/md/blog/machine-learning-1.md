---
date: 2021-01-24
title: 機械学習のお勉強【其の壱】 微分と勾配を実装するぞ
topImage: ./hero/machine-learning-1.jpg
---

木瓜丸です。

最近、自作PCにRadeon RX550というグラボを積んでみました。
2画面という男の夢を叶えるために買ったのですが、せっかくなので機械学習とか仮想通貨掘るとか面白いことがしたいなーと思ったので、ちょっとブログのネタがてらやってみようと思います。

…と思ったのですが、私が買ったのはRadeonですんで、一般的に機械学習ツヨツヨマンが使っているCUDAとやらが必要な技術はちょいと面倒みたいです。

だが思い立った限りはこの程度ではやめませんぞ。今回はしっかりと**numpyで**、微分から実装して、ゆくゆくは**ROCm**を書こうと思います。

## 微分

では、さっそくpythonで微分を書くところから始めましょう。
とりあえずこれはみんなが読んでるブログですので、さらっと微分の定義を申し訳程度に書いておきます。

$$
f'(x) = \frac{f(x+h) - f(x)}{h}
$$

ところで、僕は昔から疑問に思っておりました。**「コンピューターで微分って無理くないか？」**

どうやら、世間の微分を要するプログラムでは32ビットの浮動小数点数を用いて、$$h = 0.0001$$をすれば微分していることになるらしいです。というわけで、コードはこんなふうになります。

ちなみに、微分は英語で*differentiation*だそうです。

```python

H = 0.0001

def diff(f, x):
    a = x + H/2
    b = x - H/2
    return (f(a) - f(b)) / H

```

ポイントなんですが、微分の定義そのままではなく、微分したい点の前後をとって平均変化率を求めています。
やっぱりコンピューターでやってる限りhがでかくなってしまうので、$$x$$から$$x+h$$の範囲で変化率を求めてしまうとズレてしまいますので、xを中心に計算するみたいです。

## 勾配

さて、微分ができたら、次は**勾配**とやらを実装してみましょう。

勾配という言葉について、僕もよくわからなかったので、ゴーグルで調べてきました。

> ベクトル解析におけるスカラー場の勾配は、各点においてそのスカラー場の変化率が最大となる方向への変化率の値を大きさにもつベクトルを対応させるベクトル場である。
> 引用: Wikipedia - [勾配 (ベクトル解析)](https://ja.wikipedia.org/wiki/%E5%8B%BE%E9%85%8D_(%E3%83%99%E3%82%AF%E3%83%88%E3%83%AB%E8%A7%A3%E6%9E%90))

具体的に次のような関数を考えてみます。

$$
f(x0, x1) = x0^2 + x1^2
$$

これを、x0だけについて、あるいはx1だけについて微分してみます。これを偏微分といいます。

$$
\frac{\delta f}{\delta x0} = 2x0 \\
\frac{\delta f}{\delta x1} = 2x1
$$

この作業を、ある点について行ったときに得られるベクトル$$(\frac{\delta f}{\delta x0}, \frac{\delta f}{\delta x1})$$が勾配です。

では、勾配を求める関数を作ってみましょう。
ちなみに、勾配は英語で*gradient*だそうです。

```python
def grad(f, x):
    g = list()
    for i in range(len(x)):
        t = x[i]
        x[i] = t + H/2
        ya = f(*x)
        x[i] = t - H/2
        yb = f(*x)
        d = (ya - yb) / H
        g[i].append(d)
        x[i] = t
    return g
```

今考えた関数$$f(x0, x1)$$はちょうど2変数関数なので、勾配のベクトルを二次元のグラフにマップしてみてみましょう。

```python
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
matplotlib.use('Agg')

#微分する関数
H = 0.0001

def grad(f, x):
    g = list()
    for i in range(len(x)):
        t = x[i]
        x[i] = t + H/2
        ya = f(*x)
        x[i] = t - H/2
        yb = f(*x)
        d = (ya - yb) / H
        g.append(d)
        x[i] = t
    return g

def subsq(x0, x1):
    return x0**2 + x1**2

fig = plt.figure(figsize = (32, 32))
ax = fig.add_subplot(1, 1, 1)

ax.grid()

ax.set_xlabel('x0', fontsize = 16)
ax.set_ylabel('x1', fontsize = 16)

ax.set_xlim(-2, 2)
ax.set_ylim(-2, 2)

ax.axhline(0, color='gray')
ax.axvline(0, color='gray')

for i in range(32):
    for j in range(32):
        x0 = float(i - 16) / 8.0
        x1 = float(j - 16) / 8.0
        (x0_, x1_) = grad(subsq, [x0, x1])
        ax.quiver(x0, x1, x0_, x1_, color='red', angles='xy', scale_units='xy', scale=1)

plt.savefig('graph.png')
```

![graph.png](./pics/graph.png)

なんか旭日みたいなのが出てきました。これを見ると、中心から放射型にベクトルの大きさが大きくなっていることがわかります。

これをうまいこと利用すると、勾配を正しいベクトルとの誤差として認識して勾配が最小になるように頑張る「**勾配降下法**」という学習ができるみたいです。

次の記事で勾配降下法を実装してみようと思います。

一緒に勉強しましょうー(^o^)
