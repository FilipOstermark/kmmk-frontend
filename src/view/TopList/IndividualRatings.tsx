import { Rating } from "src/model/Rating"
import { MAX_ALBUM_RATING } from "src/util/constants"

interface IndividualRatingsProps {
  ratings: Rating[]
}

export const IndividualRatings: (props: IndividualRatingsProps) => JSX.Element = 
({ ratings }) => {
  const ratingsPerUser = ratings.map(rating => (
    <li key={"rating-user-" + rating.user.id}>
      <p>{rating.user.name}: {rating.rating} / {MAX_ALBUM_RATING}</p>
    </li>
    ))
  return (<ul className="top-list-info-list">{ratingsPerUser}</ul>)
}
