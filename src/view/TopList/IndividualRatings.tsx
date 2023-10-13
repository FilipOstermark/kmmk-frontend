import { Rating } from "src/model/Rating"
import { ALBUM_RATING_MAX } from "src/util/constants"

interface IndividualRatingsProps {
  ratings: Rating[]
}

export const IndividualRatings: (props: IndividualRatingsProps) => JSX.Element = 
({ ratings }) => {
  const ratingsPerUser = ratings.map(rating => (
    <li key={"rating-user-" + rating.user.id}>
      <p>{rating.user.name}: {rating.rating} / {ALBUM_RATING_MAX}</p>
    </li>
    ))
  return (<ul className="top-list-info-list">{ratingsPerUser}</ul>)
}
