/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({node, getNode, actions}) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    const collection = getNode(node.parent).sourceInstanceName;
    createNodeField({
      node,
      name: `collection`,
      value: collection
    });
    createNodeField({
      node,
      name: `slug`,
      value: `${collection}${slug}`
    });
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              collection
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.slug,
        component: path.resolve(`./src/templates/blog-page.js`),
        context: {
          slug: node.frontmatter.slug
        }
      })
    })
  })
}
