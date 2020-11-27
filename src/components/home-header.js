import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const HomeHeader = ({ siteTitle }) => (
  <header>
    <div className='noren'></div>
    <div className='inner'>
      <Link
        to="/"
      >
        <img src='/static/logo_white.svg' alt={siteTitle} id='logo'/>
      </Link>
    </div>
  </header>
)

HomeHeader.propTypes = {
  siteTitle: PropTypes.string,
}

HomeHeader.defaultProps = {
  siteTitle: ``,
}

export default HomeHeader
