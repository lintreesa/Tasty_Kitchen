import {Link} from 'react-router-dom'
import './index.css'

const PaymentSuccessful = () => (
  <div className="payment-successful-container">
    <img
      src="https://res.cloudinary.com/dcqnh8u8u/image/upload/v1640692118/tick_qg7uqj.png"
      className="success-image"
      alt="success"
    />
    <h1 className="payment-successful-heading">Payment Successful</h1>
    <p className="payment-successful-description">
      Thank you for ordering Your payment is successfully completed.
    </p>
    <button type="button" className="goto-homepage-btn">
      <Link to="/" className="link-item">
        Go To Home Page
      </Link>
    </button>
  </div>
)

export default PaymentSuccessful
