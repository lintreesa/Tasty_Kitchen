import {BsFilterLeft} from 'react-icons/bs'
import './index.css'

const RatingHeader = props => {
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const {sortByOptions, selectedSortByValue} = props
  return (
    <div className="header-container">
      <div className="sort-by-container">
        <BsFilterLeft className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={selectedSortByValue}
          onChange={onChangeSortby}
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
  )
}

export default RatingHeader
