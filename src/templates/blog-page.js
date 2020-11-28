import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'

const BlogPage = ({data}) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} thumbnail={frontmatter.topImage.childImageSharp.fluid.src} />
      <article>
        <div className='hero'>
          <Image fluid={frontmatter.topImage.childImageSharp.fluid} objectFit='cover'/>
        </div>
        <div className='detail'>
          <div className='date'>
            {frontmatter.date}
          </div>
          <h1 className='title'>{frontmatter.title}</h1>
        </div>
        <div
          className='content'
          dangerouslySetInnerHTML={{__html: html}}>
        </div>
      </article>
    </Layout>
  )
}

export default BlogPage
export const pageQuery = graphql`
  query blogPage($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug }}) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        topImage {
          childImageSharp {
            fluid(maxWidth: 1280) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
