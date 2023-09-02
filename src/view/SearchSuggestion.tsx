import { LazyLoadImage } from "react-lazy-load-image-component"
import Image from '../assets/react.svg'

export interface SearchSuggestionProps {
  releaseGroup: ReleaseGroup
}

export const SearchSuggestion: (props: SearchSuggestionProps) => JSX.Element = (
  { releaseGroup }: SearchSuggestionProps
) => {
  const releaseYear = releaseGroup["first-release-date"]?.split("-")[0]
  const artistCredit = releaseGroup["artist-credit"]
  const artist = artistCredit.map(cred => cred.name).join(" ")
  const img = `http://coverartarchive.org/release-group/${releaseGroup.id}/front-250`
  return (
    <div className="search-suggestion" key={releaseGroup.id}>
      <h3>{releaseGroup.title} ({releaseYear})</h3>
      <div className="search-suggestion-info">
        <LazyLoadImage src={img} placeholderSrc={Image} width={128} height={128} alt="Image Alt" />
        <div>
          <p>{artist}</p>
        </div>
      </div>
      <p>MBID: {releaseGroup.id}</p>
    </div>
  )
}