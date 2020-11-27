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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
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
  `)
  if(result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query`)
    return
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    console.log(node.fields.collection)
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/${node.fields.collection}-page.js`),
      context: {
        slug: node.fields.slug
      }
    })
  })
}
