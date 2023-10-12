import { Rating } from "src/model/Rating"
import { MAX_ALBUM_RATING, MIN_ALBUM_RATING } from "src/util/constants"

export interface RatingSelectorListProperties {
  ratings: Rating[]
  setRatings: (newRatings: Rating[]) => void
}

export const RatingSelectorList: (
  props: RatingSelectorListProperties
) => JSX.Element = ({ ratings, setRatings }: RatingSelectorListProperties) => {
  const ratingsCopy: Rating[] = [...ratings]
  const ratingSelectors = ratingsCopy.map(rating => (
    <div key={"rating-" + rating.user.name}>
      <h3>{rating.user.name}</h3>
      <div className="rating-selector">
        <input 
          className="rating-slider" 
          type="range" min={MIN_ALBUM_RATING} 
          max={MAX_ALBUM_RATING} 
          value={rating.rating} 
          onChange={e => {
            rating.rating = parseInt(e.target.value)
            setRatings(ratingsCopy)
          }} 
        />
        <p>{rating.rating} / 100</p>
      </div>
    </div>
    )
  )

  return (
    <div className="rating-selector-list">
      {ratingSelectors}
    </div>
  )
}
