import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import './index.css'

const PaymentSuccessful = () => (
  <CartContext.Consumer>
    {value => {
      const {removeAllCartItems} = value
      const onClickRemoveAllBtn = () => {
        removeAllCartItems()
      }

      return (
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
          <Link to="/" className="link-item-home">
            <button
              type="button"
              className="goto-homepage-btn"
              onClick={onClickRemoveAllBtn}
            >
              Go To Home Page
            </button>
          </Link>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default PaymentSuccessful
