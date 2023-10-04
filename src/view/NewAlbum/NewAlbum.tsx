import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { backendClientInstance } from "src/api/BackendClient"
import { Album } from "src/model/Album"
import { PaginatedResponse } from "src/model/PaginatedResponse"
import { Rating } from "src/model/Rating"
import { ReleaseGroup } from "src/model/ReleaseGroup"
import { emptyReleaseGroupSearchResult, type ReleaseGroupSearchResult } from "src/model/ReleaseGroupSearchResult"
import { User } from "src/model/User"
import { albumRepositoryInstance } from "src/repository/AlbumRepository"
import { URL_BACKEND_BASE, URL_BACKEND_RELEASE_GROUP } from "src/util/constants"
import { getAverageRating } from "src/util/util"
import { useDebounce } from "usehooks-ts"
import './NewAlbum.css'
import { RatingSelector } from "./RatingSelector"
import { SearchSuggestion } from "./SearchSuggestion"

export const NewAlbum: () => JSX.Element = () => {
  const [searchResults, setSearchResults] = useState<ReleaseGroupSearchResult>(
    emptyReleaseGroupSearchResult()
  )
  
  const [albumTitle, setAlbumTitle] = useState("")
  const [artistName, setArtistName] = useState("")
  const [releaseYear, setReleaseYear] = useState<number>(0)
  const [summary, setSummary] = useState("")
  const [bestSong, setBestSong] = useState("")
  const [worstSong, setWorstSong] = useState("")
  const [occasion, setOccasion] = useState("")
  const [ratings, setRatings] = useState<Rating[]>([])

  useEffect(() => {
    async function fetchUsers(): Promise<void> {
      const userResponse = await backendClientInstance.fetch(URL_BACKEND_BASE + "/user/list")
      const users = await userResponse.json() as PaginatedResponse<User>
      const userList: User[] = users.results
      const ratingList: Rating[] = userList.map(user => ({
          user: user,
          rating: 0
        }))

      console.log("Users: ", userList)
      setRatings(ratingList)
    }

    fetchUsers().catch(err => { 
      console.error("Failed to fetch voting users", err) 
    })
  }, [])

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
  ): Promise<void> {

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

    const response = await backendClientInstance.fetch(
      `${URL_BACKEND_RELEASE_GROUP}${fullQueryParamterString}`
    )
    const contentJson = await response.json() as (ReleaseGroupSearchResult | undefined)

    setSearchResults(contentJson ?? emptyReleaseGroupSearchResult())
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

  const averageUserRating: "-" | number = (ratings.length == 0) 
    ? "-" : getAverageRating(ratings)

  const submitNewAlbum = async () => {
    // TODO Fix this
    const newAlbum: Album = {
      id: -1,
      mbid: selectedReleaseGroup?.id ?? "",
      title: albumTitle,
      artistName: artistName,
      releaseYear: releaseYear.toString(),
      bestSongTitle: bestSong,
      worstSongTitle: worstSong,
      discussionDate: "1992-01-01",
      summary: summary,
      ratings: ratings,
      listeningOccasion: occasion
    }

    await albumRepositoryInstance.add(newAlbum)
  }

  const ratingSelectors = ratings.map(rating => (
    <RatingSelector 
      ratingUserName={rating.user.name} 
      onValueChange={newRating => {
        rating.rating = newRating
        setRatings(ratings)
      }} />
    )
  )

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
              {ratingSelectors}
            </div>

            <button type="submit">Spara</button>
          </form>
        </div>

        <SearchResults searchResults={searchResults} />

      </div>
    </div>
  )
}
