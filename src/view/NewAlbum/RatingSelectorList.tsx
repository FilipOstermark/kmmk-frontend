import { Rating } from "src/model/Rating"

export interface RatingSelectorListProperties {
  ratings: Rating[]
  setRatings: (newRatings: Rating[]) => void
}

export const RatingSelectorList: (
  props: RatingSelectorListProperties
) => JSX.Element = ({ ratings, setRatings }: RatingSelectorListProperties) => {
  const ratingsCopy: Rating[] = [...ratings]
  const ratingSelectors = ratingsCopy.map(rating => (
    <>
      <h3>{rating.user.name}</h3>
      <div className="rating-selector">
        <input 
          className="rating-slider" 
          type="range" min={0} 
          max={100} 
          defaultValue={50} 
          value={rating.rating} 
          onChange={e => {
            rating.rating = parseInt(e.target.value)
            setRatings(ratingsCopy)
          }} 
        />
        <p>{rating.rating} / 100</p>
      </div>
    </>
    )
  )

  return (
    <div className="rating-selector-list">
      {ratingSelectors}
    </div>
  )
}
