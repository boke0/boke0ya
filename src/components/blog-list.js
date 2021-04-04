import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'

const BlogList = ({ post }) => {
  let content = post.plainText.substring(0, 100)
  if (content.length > 100) content += '…'
  return (
    <Link to={'/'+post.fields.slug} style={{
      color: `inherit`,
      textDecoration: `none`
    }} className='blog-list-item'>
      {/*
      <div className='thumbnail'>
        <Image fluid={post.frontmatter.topImage.childImageSharp.fluid} objectFit='cover' style={{
          position: `absolute`,
          top: 0,
          left: 0,
          width: `100%`,
          height: `100%`
        }}/>
      </div>
      */}
      <div className='details'>
        <div className='date'>
          { post.frontmatter.date }
        </div>
        <h4 className='title'>
          { post.frontmatter.title }
        </h4>
        <p className='description'>{ post.plainText.slice(0, 70) }...</p>
      </div>
    </Link>
  )
}

export default BlogList
