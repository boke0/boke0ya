import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import BlogList from '../components/blog-list'

const BlogsPage = ({
  data: {
    allMarkdownRemark: { edges }
  }
}) => {
  const blogs = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <BlogList key={edge.node.id} post={edge.node} />)
  return (
    <Layout>
      <h1 className='page-title'>書き物</h1>
      <div className='blog-list'>
        {blogs}
      </div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "blog" } } },
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          plainText
          excerpt(pruneLength: 250)
          fields {
            slug
          }
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
    }
  }
`

export default BlogsPage
