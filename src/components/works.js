import React from 'react'
import WorkList from './work-list.js'
import { Link, StaticQuery, graphql } from 'gatsby'

const Works = () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          filter: { fields: { collection: { eq: "works" } } },
          sort: { order: DESC, fields: [frontmatter___date] },
          limit: 3
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
              }
            }
          }
        }
      }
    `}
    render={data => {
      const edges = data.allMarkdownRemark.edges
      const works = edges
        .filter(edge => !!edge.node.frontmatter.date)
        .map(edge => <WorkList key={edge.node.id} post={edge.node} />)
      return (
        <div>
          <h3>手がけたもの</h3>
          <div>
            {works}
          </div>
          <div>
            <Link to='/works'>もっと見る</Link>
          </div>
        </div>
      )
    }}
  />
)

export default Works
