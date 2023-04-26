import {Component} from 'react'
import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'

import './index.css'

class CartSummary extends Component {
  renderCartSummary = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0

        cartList.forEach(eachCartItem => {
          total += eachCartItem.cost * eachCartItem.quantity
        })

        return (
          <div className="cart-summary-container">
            <div className="price-details-container">
              <h1 className="order-total-label">Order Total:</h1>
              <p className="order-total-value" testid="total-price">
                {' '}
                ₹ {total}
                /-
              </p>
            </div>
            <Link to="/paymentsuccessful" className="link-item">
              <button type="button" className="checkout-button">
                Place Order
              </button>
            </Link>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return this.renderCartSummary()
  }
}

export default CartSummary
