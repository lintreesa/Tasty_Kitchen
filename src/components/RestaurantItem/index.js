import {Link} from 'react-router-dom'

import './index.css'

const RestaurantItem = props => {
  const {restaurantDetails} = props
  const {rating, name, imageUrl, cuisine, id} = restaurantDetails
  return (
    <Link to={`/restaurant/${id}`} className="link-item">
      <li key={id} className="restaurant-details" testid="restaurant-item">
        <img src={imageUrl} className="restaurant-image" alt="restaurant" />
        <div className="restaurant-details-container">
          <p className="restaurant-name">{name}</p>
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
      </li>
    </Link>
  )
}
export default RestaurantItem
