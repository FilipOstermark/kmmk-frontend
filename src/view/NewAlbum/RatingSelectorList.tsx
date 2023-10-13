import { Rating } from "src/model/Rating"
import { ALBUM_RATING_MAX, ALBUM_RATING_MIN } from "src/util/constants"

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
          type="range" min={ALBUM_RATING_MIN} 
          max={ALBUM_RATING_MAX} 
          value={rating.rating} 
          onChange={e => {
            rating.rating = parseInt(e.target.value)
            setRatings(ratingsCopy)
          }} 
        />
        <p>{rating.rating} / {ALBUM_RATING_MAX}</p>
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
