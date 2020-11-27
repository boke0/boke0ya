import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Welcome from '../components/welcome'
import Navigation from '../components/navigation'

const IndexPage = () => (
  <Layout isHome={true}>
    <SEO title="玄関" />
    <Welcome />
    <Navigation />
  </Layout>
)

export default IndexPage
