import { useEffect, useState } from "react"
import { useDebounce } from "usehooks-ts"
import './css/SearchSuggestion.css'
import { SearchSuggestion } from "./SearchSuggestion"

export const NewAlbum: () => JSX.Element = () => {
  const [searchResults, setSearchResults] = useState<ReleaseGroupSearchResult>()
  const [albumTitle, setAlbumTitle] = useState("")
  const [artistName, setArtistName] = useState("")
  const debouncedAlbumTitle = useDebounce(albumTitle, 500)
  const debouncedArtistName = useDebounce(artistName, 500)

  useEffect(() => {
    if (!debouncedAlbumTitle && !debouncedArtistName) {
      return
    }

    search(debouncedAlbumTitle, debouncedArtistName)
  }, [debouncedAlbumTitle, debouncedArtistName])

  async function search(
    albumTitle: string, 
    artistName: string | undefined
  ): Promise<ReleaseGroupSearchResult> {
    const artistQuery = artistName ? ` AND artist:${artistName}` : ""
    const encodedQuery = encodeURIComponent(albumTitle + artistQuery)
    const fullQueryParamterString = `?query=${encodedQuery}`

    const response = await fetch(
      `http://localhost:8081/${fullQueryParamterString}`
    )
    const contentJson: ReleaseGroupSearchResult = await response.json()

    setSearchResults(contentJson)

    return contentJson
  }

  const searchResultsView = (
    <>
      <h2>Förslag: {searchResults?.count ?? 0}</h2>
    <div className="search-results">
      {
        searchResults?.["release-groups"].map(
          releaseGroup => (<SearchSuggestion releaseGroup={releaseGroup} />)
        )
      }
    </div>
    </>
  )
  
  return (
    <>
      <h2>Titel</h2>
      <input type="search" onChange={e => setAlbumTitle(e.target.value)}/>

      <h2>Artist</h2>
      <input type="search" onChange={e => setArtistName(e.target.value)}/>

      {searchResultsView}
    </>
  )
}
