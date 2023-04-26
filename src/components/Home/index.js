import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import {FaChevronRight, FaChevronLeft} from 'react-icons/fa'
import {BsFilterLeft} from 'react-icons/bs'
import {Link, Redirect} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    imagesList: [],
    restaurantsList: [],
    totalItems: 0,
    apiStatus: apiStatusConstants.initial,
    pageNumber: 1,
    selectedSortByValue: sortByOptions[1].value,
    contentView: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantsList()
    this.getImages()
  }

  getImages = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.offers.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
      }))

      this.setState({
        imagesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div
      className="products-details-loader-container"
      testid="restaurants-offers-loader"
    >
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderImagesView = () => {
    const {imagesList} = this.state
    console.log(imagesList)
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
    }

    return (
      <ul className="image-container">
        <Slider {...settings}>
          {imagesList.map(eachImage => (
            <li key={eachImage.id}>
              <img
                src={eachImage.imageUrl}
                alt="offer"
                className="image-size"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderImageDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderImagesView()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  getRestaurantsList = async () => {
    this.setState({
      contentView: apiStatusConstants.inProgress,
    })

    const {pageNumber, selectedSortByValue} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const offset = (pageNumber - 1) * 9

    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9&sort_by_rating=${selectedSortByValue}`
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
      const updatedData = fetchedData.restaurants.map(eachItem => ({
        rating: eachItem.user_rating.rating,
        name: eachItem.name,
        id: eachItem.id,
        cuisine: eachItem.cuisine,
        imageUrl: eachItem.image_url,
      }))
      this.setState({
        restaurantsList: updatedData,
        contentView: apiStatusConstants.success,
        totalItems: fetchedData.total,
      })
    } else {
      this.setState({
        contentView: apiStatusConstants.failure,
      })
    }
  }

  changeSortby = event => {
    this.setState(
      {selectedSortByValue: event.target.value},
      this.getRestaurantsList,
    )
  }

  clickNext = () => {
    this.setState(
      prevState => ({
        pageNumber:
          prevState.pageNumber < 4
            ? prevState.pageNumber + 1
            : prevState.pageNumber,
      }),
      this.getRestaurantsList,
    )
  }

  clickPrevious = () => {
    this.setState(
      prevState => ({
        pageNumber:
          prevState.pageNumber > 1
            ? prevState.pageNumber - 1
            : prevState.pageNumber,
      }),
      this.getRestaurantsList,
    )
  }

  renderLoadingView = () => (
    <div
      className="restaurants-loader-container"
      data-testid="restaurants-list-loader"
    >
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="restaurants-error-view-container">
      <h1 className="restaurant-not-found-heading">
        Oops! Something Went Wrong
      </h1>

      <button
        type="button"
        className="button"
        onClick={this.getRestaurantsList()}
      >
        Retry
      </button>
    </div>
  )

  renderAllRestuarants = () => {
    const {contentView} = this.state

    switch (contentView) {
      case apiStatusConstants.success:
        return this.renderRestaurantListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  restaurantCard = restuarant => {
    const {imageUrl, name, cuisine, rating, id} = restuarant
    return (
      <li key={id} className="restaurant-details" testid="restaurant-item">
        <Link to={`/restaurant/${id}`} className="link-item">
          <img src={imageUrl} className="restaurant-image" alt="restaurant" />
          <div className="restaurant-details-container">
            <h1 className="restaurant-name">{name}</h1>
            <p className="cuisine">{cuisine}</p>
            <div className="home-rating-container">
              <img
                src="https://res.cloudinary.com/dcqnh8u8u/image/upload/v1634545931/7_Rating_wibirj.png"
                alt="star"
                className="rating-icon1"
              />

              <p className="rating-value"> {rating}</p>
            </div>
          </div>
        </Link>
      </li>
    )
  }

  renderRestaurantListView = () => {
    const {
      restaurantsList,
      selectedSortByValue,
      totalItems,
      pageNumber,
    } = this.state

    const pageCount = Math.ceil(totalItems / 9)

    const shouldShowRestaurantsList = restaurantsList.length > 0

    return shouldShowRestaurantsList ? (
      <div className="restaurants-list-container">
        <div className="header-container">
          <div className="sort-by-container">
            <BsFilterLeft className="sort-by-icon" />
            <p className="sort-by">Sort by</p>
            <select
              className="sort-by-select"
              value={selectedSortByValue}
              onChange={this.changeSortby}
            >
              {sortByOptions.map(eachOption => (
                <option
                  key={eachOption.id}
                  value={eachOption.value}
                  className="select-option"
                >
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ul className="restaurant-list">
          {restaurantsList.map(eachItem => this.restaurantCard(eachItem))}
        </ul>
        <div className="page-container">
          <button
            type="button"
            className="page-button"
            onClick={this.clickPrevious}
            testid="pagination-left-button"
          >
            <FaChevronLeft />
          </button>
          <span testid="active-page-number" className="page-number">
            {pageNumber}{' '}
          </span>
          of {pageCount}
          <button
            type="button"
            className="page-button"
            testid="pagination-right-button"
            onClick={this.clickNext}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    ) : (
      <div className="no-results-view">
        <h1 className="no-results-heading">No Restaurants Found</h1>
        <p className="no-results-description">
          We could not find any restaurants. Try other filters.
        </p>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="home-container">
          {this.renderImageDetails()}
          <div className="home-content">
            <h1 className="home-heading">Popular Restaurants</h1>
            <p className="description">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <hr className="line" />
            {this.renderAllRestuarants()}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}
export default Home
