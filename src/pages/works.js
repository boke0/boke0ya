import React from 'react'
import Layout from '../components/layout'
import SEO from "../components/seo"
import WorkList from '../components/work-list'

const WorksPage = ({
  data: {
    allMarkdownRemark: { edges }
  }
}) => {
  const works = edges
    .map(edge => <WorkList key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <SEO title="作品集" />
      <h1 className='page-title'>作品集</h1>
      <div className='work-list'>
        {works}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "works" } } },
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
    }
  }
`

export default WorksPage
