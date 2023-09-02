import { useState } from "react"

export const AlbumSearch: () => JSX.Element = () => {
  
  const [albumTitleQuery, setAlbumTitleQuery] = useState("")
  const [artistNameQuery, setArtistNameQuery] = useState("")
  const [searchResults, setSearchResults] = useState<ReleaseGroupSearchResult>()

  async function search(
    albumTitle: string, 
    artistName: string | undefined
  ): Promise<ReleaseGroupSearchResult> {
    const artistQuery = artistName ? ` AND artist:${artistName}` : ""
    const encodedQuery = encodeURIComponent(albumTitle + artistQuery)
    const fullQueryParamterString = `?query=${encodedQuery}`

    const response = await fetch(`http://localhost:8081/${fullQueryParamterString}`)
    const contentJson: ReleaseGroupSearchResult = await response.json()

    setSearchResults(contentJson)

    return contentJson
  }

  const searchResultsView = (
    <>
      <h2>Results: {searchResults?.count ?? 0}</h2>
      {
        searchResults?.["release-groups"].map(result => {

          const artistCredit = result["artist-credit"]
          const artist = artistCredit.map(cred => cred.name).join(" ")
          const img = `http://coverartarchive.org/release-group/${result.id}/front-250`
          return (
            <div>
              <p>Title: {result.title}</p>
              <p>Artist: {artist}</p>
              <p>First release date: {result["first-release-date"]}</p>
              <p>ID: {result.id}</p>
              <img height={128} width={128} src={img}></img>
              <hr />
            </div>
          )
        })
      }
    </>
  )

  return (
    <>
      <h3>Album Title:</h3>
      <input type="search" onChange={e => setAlbumTitleQuery(e.target.value)} />
      <h3>Artist name:</h3>
      <input type="search" onChange={e => setArtistNameQuery(e.target.value)} />
      <br />
      <button onClick={() => search(albumTitleQuery, artistNameQuery)}>Search</button>
      {searchResultsView}
    </>
  )
}
