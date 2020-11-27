import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, isHome }) => (
  <header>
    { isHome ? <div className='noren'></div> : null }
    <div className='inner'>
      <Link
        to="/"
      >
        {
          isHome
          ? <img src='/logo_white.svg' alt={siteTitle} id='logo' />
          : <img src='/chochin.svg' alt={siteTitle} id='chochin-logo'/>
        }
      </Link>
      {
        isHome
          ? null
          :
          <nav>
            <Link to='/about' className='item'><div>自己紹介</div></Link>
            <Link to='/works' className='item'><div>作品集</div></Link>
            <Link to='/blog' className='item'><div>書き物</div></Link>
          </nav>
      }
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
