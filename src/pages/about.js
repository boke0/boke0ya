import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="自己紹介" />
    <h1 className='page-title'>自己紹介</h1>
    <section id='about'>
      <img src='/static/boke0.svg' alt='丸に五枚木瓜'/>
      <div className='detail'>
        <p>木瓜丸です。</p>
        <p>ソフトウェアの開発をやってる無職です。</p>
        <p>プログラムを組み、デザインし、回路を弄る生活をしています。世界中の人を怠惰の沼に鎮めるのが夢です。</p>
        <div class='sns'>
          <a class='twitter' href='https://twitter.com/boke_0'>
            Twitter
          </a>
          {' '}
          <a class='github' href='https://github.com/boke0'>
            Github
          </a>
        </div>
      </div>
    </section>
  </Layout>
)

export default AboutPage
