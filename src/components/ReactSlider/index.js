import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import OfferCarousal from '../OfferCarousal'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',

  inProgress: 'IN_PROGRESS',
}
class ReactSlider extends Component {
  state = {
    imagesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
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
    if (response.ok) {
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
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

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

  renderImagesView() {
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
            <OfferCarousal key={eachImage.id} imageList={eachImage} />
          ))}
        </Slider>
      </ul>
    )
  }

  render() {
    return <>{this.renderImageDetails()}</>
  }
}
export default ReactSlider
