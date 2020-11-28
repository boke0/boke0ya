import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'

const WorkPage = ({location, data}) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title}  thumbnail={frontmatter.topImage.childImageSharp.fluid.src}/>
      <article>
        <div className='hero'>
          <Image fluid={frontmatter.topImage.childImageSharp.fluid}/>
        </div>
        <div className='detail'>
          <a href={frontmatter.url}>
            <h1 className='title'>{frontmatter.title}</h1>
          </a>
          <div className='skills'>{frontmatter.skills}</div>
        </div>
        <div
          className='content'
          dangerouslySetInnerHTML={{__html: html}}>
        </div>
      </article>
    </Layout>
  )
}

export default WorkPage
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug }}) {
      html
      frontmatter {
        title
        url
        skills
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
