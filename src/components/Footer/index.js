import {
  FaPinterestSquare,
  FaInstagram,
  FaFacebookSquare,
  FaTwitter,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-header-container">
      <img
        src="https://res.cloudinary.com/dcqnh8u8u/image/upload/v1638610739/Frame_275_pek8us.png"
        alt="website-footer-logo"
        className="footer-logo"
      />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>
    <p className="footer-description">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="icon-container">
      <FaPinterestSquare className="icon-style" testid="pintrest-social-icon" />

      <FaInstagram className="icon-style" testid="instagram-social-icon" />
      <FaTwitter className="icon-style" testid="twitter-social-icon" />
      <FaFacebookSquare className="icon-style" testid="facebook-social-icon" />
    </div>
  </div>
)
export default Footer
