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
      <SEO title={frontmatter.title} />
      <article>
        <div class='hero'>
          <Image fluid={frontmatter.topImage.childImageSharp.fluid} objectFit='cover' style={{
            position: `absolute`,
            top: 0,
            left: 0,
            width: `100%`,
            height: `100%`
          }}/>
        </div>
        <div class='detail'>
          <div class='date'>
            {frontmatter.date}
          </div>
          <h1 class='title'>{frontmatter.title}</h1>
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
