import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'

const WorkList = ({ post }) => {
  return (
    <Link to={'/'+post.fields.slug} style={{
      color: `inherit`,
      textDecoration: `none`
    }} className='work-list-item'>
      <div className='thumbnail'>
        <Image fluid={post.frontmatter.topImage.childImageSharp.fluid} objectFit='cover' style={{
          position: `absolute`,
          top: 0,
          left: 0,
          width: `100%`,
          height: `100%`
        }}/>
      </div>
      <div className='details'>
        <h4 className='title'>
          {post.frontmatter.title}
        </h4>
      </div>
    </Link>
  )
}

export default WorkList
