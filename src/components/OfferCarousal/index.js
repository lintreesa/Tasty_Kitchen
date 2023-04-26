import './index.css'

const OfferCarousal = props => {
  const {imageList} = props
  const {imageUrl, id} = imageList
  return (
    <li key={id}>
      <img src={imageUrl} alt="offer" className="image-size" />
    </li>
  )
}
export default OfferCarousal
