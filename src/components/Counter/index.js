import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {itemCount: 1}

  onDecrement = () => {
    const {itemCount} = this.state
    if (itemCount > 1) {
      this.setState(prevState => ({itemCount: prevState.itemCount - 1}))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({itemCount: prevState.itemCount + 1}))
  }

  render() {
    const {itemCount} = this.state
    return (
      <div className="quantity-container">
        <button
          type="button"
          className="quantity-controller-button"
          onClick={this.onDecrement}
        >
          -
        </button>
        <div>{itemCount}</div>
        <button
          type="button"
          className="quantity-controller-button"
          onClick={this.onIncrement}
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
