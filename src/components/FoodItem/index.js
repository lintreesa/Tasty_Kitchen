import {Component} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

class FoodItem extends Component {
  state = {buttonClicked: false, quantity: 1}

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity > 0) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
    if (quantity === 0) {
      this.setState({buttonClicked: false})
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderFoodDetailsView = () => (
    <CartContext.Consumer>
      {value => {
        const {foodItemDetails} = this.props
        const {name, cost, imageUrl, rating, id} = foodItemDetails

        const {buttonClicked, quantity} = this.state
        console.log(quantity)

        const {
          addCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value

        const onClickIncrement = () => {
          this.setState(prevState => ({quantity: prevState.quantity + 1}))
          incrementCartItemQuantity(id)
        }
        const onClickDecrement = () => {
          if (quantity > 1) {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
            decrementCartItemQuantity(id)
          } else {
            this.setState({buttonClicked: false})
          }
        }
        const onClickAdd = () => {
          addCartItem({...foodItemDetails, quantity})
          this.setState({buttonClicked: true})
        }
        return (
          <li className="food-item-details" testid="foodItem">
            <img src={imageUrl} alt="menu" className="food-image" />
            <div className="item-details">
              <h1 className="item-name">{name}</h1>
              <p className="cost">
                <span>₹</span> {cost}
              </p>

              <div className="food-rating-details-container">
                <img
                  src="https://res.cloudinary.com/dcqnh8u8u/image/upload/v1634545931/7_Rating_wibirj.png"
                  alt="star"
                  className="rating-image"
                />
                <p className="item-rating">{rating}</p>
              </div>
              {buttonClicked ? (
                <div className="quantity-container">
                  <button
                    type="button"
                    testid="decrement-count"
                    className="quantity-controller-button"
                    onClick={onClickDecrement}
                  >
                    -
                  </button>
                  <div testid="active-count">{quantity}</div>
                  <button
                    type="button"
                    testid="increment-count"
                    className="quantity-controller-button"
                    onClick={onClickIncrement}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="add-button"
                  onClick={onClickAdd}
                >
                  Add
                </button>
              )}
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return this.renderFoodDetailsView()
  }
}

export default FoodItem
