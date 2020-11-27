import React from 'react'
import BlogHorizontalList from './blog-horizontal-list.js'
import { StaticQuery, graphql } from 'gatsby'

const Blog = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            filter: { fields: { collection: { eq: "blog" } } },
            sort: { order: DESC, fields: [frontmatter___date] },
            limit: 6
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
      render={data=>{
        const edges = data.allMarkdownRemark.edges
        const blogs = edges
          .filter(edge => !!edge.node.frontmatter.date)
          .map(edge => <BlogHorizontalList key={edge.node.id} post={edge.node} />)
        return (
          <section id='blog'>
            <h2 className='section-title'>書き物</h2>
            <div className='content'>
              {blogs}
            </div>
          </section>
        )
      }}
    />
  )
}

export default Blog
