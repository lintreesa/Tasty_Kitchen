import {Link, withRouter} from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa'

import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {isMobile: false}

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  Toggle = () => {
    this.setState(prevState => ({isMobile: !prevState.isMobile}))
  }

  render() {
    const {isMobile} = this.state
    return (
      <nav className="nav-header">
        <div className="nav-bar-container">
          <div className="nav-logo-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dcqnh8u8u/image/upload/v1634281988/login-logo_ola5iz.png"
                alt="website logo"
              />
            </Link>
            <h1 className="nav-logo-text">Tasty Kitchens</h1>
          </div>
          <ul className={isMobile ? 'nav-menu-mobile' : 'nav-menu'}>
            <li className="nav-link-item">
              <Link to="/" className="nav-link-home">
                Home
              </Link>
            </li>

            <li className="nav-link-item">
              <Link to="/cart" className="nav-link-cart">
                Cart
              </Link>
            </li>

            <button
              type="button"
              className="logout-desktop-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </ul>
          <button
            type="button"
            className="nav-mobile-icon"
            onClick={this.Toggle}
          >
            {isMobile ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
