import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img
      src="https://res.cloudinary.com/dcqnh8u8u/image/upload/v1638699246/Layer_2_uf3rcd.png"
      className="cart-empty-img"
      alt="empty cart"
    />
    <h1 className="cart-empty-heading">No Order Yet!</h1>
    <p className="cart-empty-description">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/" className="link-item-btn">
      <button type="button" className="order-now-btn">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
