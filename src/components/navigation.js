import React from 'react'
import {Link} from 'gatsby'

const Navigation = () => (
  <nav>
    <Link to='/about' className='navigation-list-item'>
      <div className='title'>自己紹介</div>
      <div className='en'>About me</div>
    </Link>
    <Link to='/works' className='navigation-list-item'>
      <div className='title'>作品集</div>
      <div className='en'>Works</div>
    </Link>
    <Link to='/blog' className='navigation-list-item'>
      <div className='title'>書き物</div>
      <div className='en'>Blog</div>
    </Link>
  </nav>
)

export default Navigation
