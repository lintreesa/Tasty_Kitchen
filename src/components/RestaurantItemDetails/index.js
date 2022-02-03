import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantItemDetails extends Component {
  state = {
    restaurantData: {},
    foodItems: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantItemData()
  }

  getFormattedData = data => ({
    rating: data.rating,
    id: data.rating,
    name: data.name,
    costForTwo: data.cost_for_two,
    cuisine: data.cuisine,
    imageUrl: data.image_url,
    reviewsCount: data.reviews_count,
    opensAt: data.opens_at,
    location: data.location,
    itemsCount: data.items_count,
  })

  getRestaurantItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = this.getFormattedData(fetchedData)
      console.log(fetchedData.food_items)
      const updatedFoodItems = fetchedData.food_items.map(eachItem => ({
        name: eachItem.name,
        cost: eachItem.cost,
        foodType: eachItem.food_type,
        imageUrl: eachItem.image_url,
        rating: eachItem.rating,
        id: eachItem.id,
      }))
      this.setState({
        restaurantData: updatedData,
        foodItems: updatedFoodItems,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div
      className="products-details-loader-container"
      testid="restaurant-details-loader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderProductDetailsView = () => {
    const {restaurantData, foodItems} = this.state
    // console.log(foodItems)
    const {
      rating,
      id,
      name,
      costForTwo,
      cuisine,
      imageUrl,
      reviewsCount,
      opensAt,
      location,
      itemsCount,
    } = restaurantData
    return (
      <div className="add-food-container">
        <div className="restaurant-item-details-container">
          <div>
            <img src={imageUrl} alt="restaurant" className="image" />
          </div>
          <div className="restaurant-item-details">
            <h1 className="name">{name}</h1>
            <p className="cuisine-name">{cuisine}</p>
            <p className="location">{location}</p>
            <div className="rating-price-details">
              <div className="restaurant-rating-container">
                <div className="rating-value">
                  <img
                    src="https://res.cloudinary.com/dcqnh8u8u/image/upload/v1635873727/rating-image_qwtsvm.png"
                    alt="star"
                  />
                  <p className="rating-style">{rating}</p>
                </div>
                <p className="rating-description">200-Ratings</p>
              </div>
              <div className="vertical-line" />
              <div className="item-price-details">
                <p className="item-price">₹{costForTwo}</p>
                <p className="cost-for-two">Cost for Two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="menu-items">
          {foodItems.map(eachItem => (
            <FoodItem foodItemDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
        <Footer />
      </>
    )
  }
}

export default RestaurantItemDetails
