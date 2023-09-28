import { Rating } from "src/model/Rating"

interface IndividualRatingProps {
  rating: Rating
}

// TODO Props
export const IndividualRating: (props: IndividualRatingProps) => JSX.Element = 
({ rating }: IndividualRatingProps) => {
  const starColors = []
  for (let i = 1; i <= 10; i++) {
    starColors.push(
      // TODO Remove hardcoding of colors
      (i <= rating.rating) ? "orange" : "whitesmoke"
    )
  }
  const stars = starColors.map(starColor => 
    (
      <span 
        className="material-symbols-rounded rating-selector-star" 
        style={{ color: starColor }}>
        star
      </span>
    )
  )

  return (
    <div>
      <h3>{rating.userEmail}</h3>
      <div>{stars}</div>
    </div>
  )
}

interface IndividualRatingsProps {
  ratings: Rating[]
}

export const IndividualRatings: (props: IndividualRatingsProps) => JSX.Element = 
({ ratings }) => {
  const ratingsPerUser = ratings.map(rating => (
      <IndividualRating rating={rating} />
    ))
  return (
    <div>
      {ratingsPerUser}
    </div>
  )
}