import { useEffect, useState } from "react"
import ReactDropdown from "react-dropdown"
import { Link } from "react-router-dom"
import { Rating } from "src/model/Rating"
import { ReleaseGroup } from "src/model/ReleaseGroup"
import { emptyReleaseGroupSearchResult, type ReleaseGroupSearchResult } from "src/model/ReleaseGroupSearchResult"
import { User } from "src/model/User"
import { albumRepositoryInstance } from "src/repository/AlbumRepository"
import { userRepositoryInstance } from "src/repository/UserRepository"
import { getAverageRating } from "src/util/util"
import { useDebounce } from "usehooks-ts"
import './NewAlbum.css'
import { RatingSelectorList } from "./RatingSelectorList"
import { SearchSuggestion } from "./SearchSuggestion"

export const NewAlbum: () => JSX.Element = () => {
  const [searchResults, setSearchResults] = useState<ReleaseGroupSearchResult>(
    emptyReleaseGroupSearchResult()
  )
  
  const [albumTitle, setAlbumTitle] = useState("")
  const [artistName, setArtistName] = useState("")
  const [releaseYear, setReleaseYear] = useState<number>(
    new Date().getFullYear()
  )
  const [summary, setSummary] = useState("")
  const [bestSong, setBestSong] = useState("")
  const [worstSong, setWorstSong] = useState("")
  const [occasion, setOccasion] = useState("")
  const [discussionDate, setDiscussionDate] = useState(
    new Date().toJSON().slice(0, 10)
  )
  const [ratings, setRatings] = useState<Rating[]>([])
  const [pickedBy, setPickedBy] = useState<User |null>(null)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function fetchUsers(): Promise<void> {
      const userList = await userRepositoryInstance.getAll()
      const ratingList: Rating[] = userList.map(user => ({
          user: user,
          rating: 0
        }))

      setUsers(userList)
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
    
    async function search(): Promise<void> {
      const searchResult = await albumRepositoryInstance.searchReleaseGroup(
        debouncedAlbumTitle, debouncedArtistName
      )
      setSearchResults(searchResult)
    }

    search().catch(() => {
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
    await albumRepositoryInstance.add(
      {
        id: -1,
        mbid: selectedReleaseGroup?.id ?? "",
        title: albumTitle,
        artistName: artistName,
        releaseYear: releaseYear.toString(),
        bestSongTitle: bestSong,
        worstSongTitle: worstSong,
        discussionDate: discussionDate,
        summary: summary,
        ratings: ratings,
        listeningOccasion: occasion,
        pickedBy: pickedBy
      }
    )
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
              <h2>Datum för diskussion</h2>
              <input 
                required
                type="date" 
                value={discussionDate} 
                onChange={e => { setDiscussionDate(e.target.value) }}/>
            </div>

            <div className="new-album-input">
              <h2>Betyg ({averageUserRating}/10)</h2>
              <RatingSelectorList ratings={ratings} setRatings={setRatings} />
            </div>

            <div className="new-album-input">
              <h2>Väljare</h2>
              <ReactDropdown 
                options={users.map(user => new Option(user.name, user.id?.toString()))} 
                placeholder="Väljare" 
                onChange={option => {
                  const selectedUser = users.find(user => option.value == user.id) ?? null
                  console.log("Selected 'pickedBy' user: ", JSON.stringify(selectedUser))
                  setPickedBy(selectedUser)
                }} />
            </div>

            <button type="submit">Spara</button>
          </form>
        </div>

        <SearchResults searchResults={searchResults} />

      </div>
    </div>
  )
}
