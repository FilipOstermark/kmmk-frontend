import { Rating } from "src/model/Rating"
import { RatingSelector } from "./RatingSelector"

export interface RatingSelectorListProperties {
  ratings: Rating[]
  setRatings: (newRatings: Rating[]) => void
}

export const RatingSelectorList: (
  props: RatingSelectorListProperties
) => JSX.Element = ({ ratings, setRatings }: RatingSelectorListProperties) => {
  const ratingSelectors = ratings.map(rating => (
    <RatingSelector 
      key={rating.user.id}
      ratingUserName={rating.user.name} 
      selectedValue={rating.rating}
      onValueChange={newRating => {
        rating.rating = newRating
        setRatings([...ratings])
      }} />
    )
  )

  return (
    <>{ratingSelectors}</>
  )
}
