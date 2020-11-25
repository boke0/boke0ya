import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="おいでやす" />
    <h1>おいでやす</h1>
    <p>木瓜丸です。プログラムを組んだり、デザインをしたりと、開発屋をやってます。</p>
    <p>このサイトには過去に作ったものや書き物を置いているので、よかったら見ていってください。</p>
    <Link to="/about/">自己紹介</Link> <br />
    <Link to="/work/">過去作</Link> <br />
    <Link to="/blog/">書き物</Link>
  </Layout>
)

export default IndexPage
