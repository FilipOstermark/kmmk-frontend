import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Album } from "src/model/Album"
import { ReleaseGroup } from "src/model/ReleaseGroup"
import { type ReleaseGroupSearchResult } from "src/model/ReleaseGroupSearchResult"
import { albumRepositoryInstance } from "src/repository/AlbumRepository"
import { useDebounce } from "usehooks-ts"
import { RatingSelector } from "./RatingSelector"
import { SearchSuggestion } from "./SearchSuggestion"
import './css/NewAlbum.css'

export const NewAlbum: () => JSX.Element = () => {
  const [searchResults, setSearchResults] = useState<ReleaseGroupSearchResult>()
  
  const [albumTitle, setAlbumTitle] = useState("")
  const [artistName, setArtistName] = useState("")
  const [releaseYear, setReleaseYear] = useState<number>()
  const [summary, setSummary] = useState("")
  const [bestSong, setBestSong] = useState("")
  const [worstSong, setWorstSong] = useState("")
  const [occasion, setOccasion] = useState("")
  const [viktorUserRating, setViktorUserRating] = useState<number>()
  const [eliasUserRating, setEliasUserRating] = useState<number>()
  const [filipUserRating, setFilipUserRating] = useState<number>()

  const [selectedReleaseGroup, setSelectedReleaseGroup] = 
    useState<ReleaseGroup | undefined>()

  const debouncedAlbumTitle = useDebounce(albumTitle, 500)
  const debouncedArtistName = useDebounce(artistName, 500)

  useEffect(() => {
    if (!debouncedAlbumTitle && !debouncedArtistName) {
      return
    }

    search(debouncedAlbumTitle, debouncedArtistName).catch(() => {
      console.error("Failed to search album information")
    })

  }, [debouncedAlbumTitle, debouncedArtistName])

  useEffect(() => {
    if (!selectedReleaseGroup) {
      return
    }
    
    const artist = selectedReleaseGroup["artist-credit"]
      .map(cred => cred.name).join(", ")
    const year = parseInt(
      (selectedReleaseGroup["first-release-date"] ?? "0").split("-")[0]
    )

    setAlbumTitle(selectedReleaseGroup.title)
    setArtistName(artist)
    setReleaseYear(year)
  }, [selectedReleaseGroup])

  /**
   * TODO Move to repo
   */
  async function search(
    albumTitle: string, 
    artistName: string | undefined
  ): Promise<ReleaseGroupSearchResult> {

    const queryParams = [
      `release:${albumTitle}`,
      "primarytype:album",
      "status:official"
    ]
    if (artistName) {
      queryParams.push(`artistname:${artistName}*`)
    }

    const joinedQuery = queryParams.join(" AND ") + " NOT secondarytype:compilation"
    const encodedJoinedQuery = encodeURIComponent(joinedQuery)
    const fullQueryParamterString = `?query=${encodedJoinedQuery}&limit=25`

    const response = await fetch(
      `http://localhost:8081/${fullQueryParamterString}`
    )
    const contentJson = await response.json() as ReleaseGroupSearchResult

    setSearchResults(contentJson)

    return contentJson
  }

  interface SearchResultsProps {
    searchResults: ReleaseGroupSearchResult | undefined
  }

  const SearchResults: (props: SearchResultsProps) => JSX.Element = (
    { searchResults }
  ) => (
      <div className="search-results-section">
        <h2>Förslag ({searchResults?.["release-groups"].length ?? 0})</h2>
        <div className="search-results-scroll">
          <div className="search-results">
            {
              searchResults?.["release-groups"].map(
                (releaseGroup: ReleaseGroup) => (
                  <SearchSuggestion 
                  key={releaseGroup.id}
                  releaseGroup={releaseGroup} 
                  setSelectedReleaseGroup={setSelectedReleaseGroup} />
                )
              )
            }
          </div>
        </div>
      </div>
    )

  const img = `http://coverartarchive.org/release-group/${selectedReleaseGroup?.id}/front-250`
  let averageUserRating: "-" | number = "-"
  if (viktorUserRating && eliasUserRating && filipUserRating) {
    averageUserRating = Math.round(
        100*(viktorUserRating + eliasUserRating + filipUserRating)/3
      ) / 100
  }

  const submitNewAlbum = async () => {
    // TODO Fix this
    const newAlbum: Album = {
      id: selectedReleaseGroup?.id ?? "",
      title: albumTitle,
      releaseYear: releaseYear?.toString() ?? "-1",
      bestSongTitle: bestSong,
      worstSongTitle: worstSong,
      discussionDate: "1992-01-01",
      discussionSummary: summary,
      ratings: [
        viktorUserRating ?? 0, 
        eliasUserRating ?? 0, 
        filipUserRating ?? 0
      ],
      occasion: occasion
    }

    await albumRepositoryInstance.add(newAlbum)
  }

  return (
    <div className="new-album-page">
      <div className="new-album-page-header">
        <Link to='/'>Topplista &gt;</Link>
        <h2>Nytt album</h2>
      </div>

      <div className="new-album-page-content" >
        <div 
        className="new-album-page-content-coverart" 
        style={{backgroundImage: `url(${img})`}} />
        
        <div className="new-album-input-section">

          <form onSubmit={() => { submitNewAlbum().catch(() => { console.error('error') }) }}>

            <div className="new-album-input">
              <h2>Titel</h2>
              <input 
                required
                type="search" 
                value={albumTitle} 
                onChange={e => { setAlbumTitle(e.target.value) }}/>
            </div>
            
            <div className="new-album-input">
              <h2>Artist</h2>
              <input 
                required
                type="search" 
                value={artistName} 
                onChange={e => { setArtistName(e.target.value) }}/>
            </div>

            <div className="new-album-input">
              <h2>Utgivningsår</h2>
              <input 
                required
                type="number" 
                value={releaseYear} 
                min={0} 
                max={2100} 
                onChange={e => { setReleaseYear(parseInt(e.target.value)) }}/>
            </div>

            <div className="new-album-input">
              <h2>Bästa låt</h2>
              <input 
                required
                type="text" 
                value={bestSong} 
                onChange={e => { setBestSong(e.target.value) }}/>
            </div>
            
            <div className="new-album-input">
              <h2>Sämsta låt</h2>
              <input 
                required
                type="text" 
                value={worstSong} 
                onChange={e => { setWorstSong(e.target.value) }}/>
            </div>

            <div className="new-album-input">
              <h2>Sammanfattning</h2>
              <input 
                required
                type="text" 
                value={summary} 
                onChange={e => { setSummary(e.target.value) }}/>
            </div>
            
            <div className="new-album-input">
              <h2>Bästa lyssningstillfälle</h2>
              <input 
                required
                type="text" 
                value={occasion} 
                onChange={e => { setOccasion(e.target.value) }}/>
            </div>

            <div className="new-album-input">
              <h2>Betyg ({averageUserRating}/10)</h2>
              <RatingSelector 
                ratingUserName="Viktor" 
                onValueChange={value => { setViktorUserRating(value) }} />
              <RatingSelector 
                ratingUserName="Elias" 
                onValueChange={value => { setEliasUserRating(value) }} />
              <RatingSelector 
                ratingUserName="Filip" 
                onValueChange={value => { setFilipUserRating(value) }} />
            </div>

            <button type="submit">Spara</button>
          </form>
        </div>

        <SearchResults searchResults={searchResults} />

      </div>
    </div>
  )
}
