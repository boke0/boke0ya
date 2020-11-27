import React from 'react'
import { Link } from 'gatsby'

const BlogHorizontalList = ({ post }) => {
  let content = post.plainText.substring(0, 100)
  if (content.length > 100) content += '…'
  return (
    <Link to={'/'+post.fields.slug} className='blog-horizontal-list'>
      <h4 className='title'>
        { post.frontmatter.title }
      </h4>
      <div className='date'>
        { post.frontmatter.date }
      </div>
    </Link>
  )
}

export default BlogHorizontalList
