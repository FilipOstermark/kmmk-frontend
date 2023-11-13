import { type ReleaseGroup } from "src/model/ReleaseGroup"

export interface SearchSuggestionProps {
  releaseGroup: ReleaseGroup,
  onClick: () => void
}

export const SearchSuggestion: (props: SearchSuggestionProps) => JSX.Element = (
  { releaseGroup, onClick }: SearchSuggestionProps
) => {

  const releaseYear = releaseGroup["first-release-date"]?.split("-")[0]
  const artistCredit = releaseGroup["artist-credit"]
  const artist = artistCredit.map(cred => cred.name).join(" ")
  const img = 
    `http://coverartarchive.org/release-group/${releaseGroup.id}/front-250`
  
  return (
    <div 
    className="search-suggestion" 
    key={releaseGroup.id}
    onClick={onClick}>
      <div className="search-suggestion-info">
        <h3>{releaseGroup.title} ({releaseYear})</h3>
        <p>{artist}</p>
        <p className="search-suggestion-mbid">{releaseGroup.id}</p>
      </div>
      <div 
        className="search-suggestion-coverart" 
        style={{ backgroundImage: `url(${img})` }} />
    </div>
  )
}