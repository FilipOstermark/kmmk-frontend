import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BackendError } from "src/api/BackendServiceImpl"
import { Rating } from "src/model/Rating"
import { ReleaseGroup } from "src/model/ReleaseGroup"
import { emptyReleaseGroupSearchResult, type ReleaseGroupSearchResult } from "src/model/ReleaseGroupSearchResult"
import { User } from "src/model/User"
import { albumRepositoryInstance } from "src/repository/AlbumRepository"
import { userRepositoryInstance } from "src/repository/UserRepository"
import { ALBUM_RATING_MAX } from "src/util/constants"
import { getAverageRating, roundToDecimals } from "src/util/util"
import { useDebounce } from "usehooks-ts"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"
import './NewAlbum.css'
import { RatingSelectorList } from "./RatingSelectorList"
import { SearchResults } from "./SearchResults"

export const NewAlbum: () => JSX.Element = () => {
  const navigate = useNavigate()

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

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  useEffect(() => {
    async function fetchUsers(): Promise<void> {
      const userList = await userRepositoryInstance.getAll()
      const ratingList: Rating[] = userList.map(user => ({
          user: user,
          rating: 50
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

    albumRepositoryInstance.searchReleaseGroup(
        debouncedAlbumTitle, 
        debouncedArtistName
      )
      .then(result => { setSearchResults(result) })
      .catch(err => {
        if (err instanceof BackendError) {
          console.error("Release group search failed: ", err, err.cause)
        } else {
          console.error("Release group search failed: ", err)
        }

        setSearchResults(emptyReleaseGroupSearchResult())
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

  const img = `http://coverartarchive.org/release-group/${selectedReleaseGroup?.id}/front-250`

  const averageUserRating: "-" | number = (ratings.length == 0) 
    ? "-" : roundToDecimals(getAverageRating(ratings), 1)

  const submitNewAlbum = async () => {
    setIsLoadingSubmit(true)
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
        pickedBy: pickedBy,
        coverArtUrl: null
      }
    )
  }

  const ratingSelectorList = useMemo(() => {
    return (<RatingSelectorList ratings={ratings} setRatings={setRatings} />)
  }, [ratings, setRatings])

  const searchResultsMemo = useMemo(() => {
    return (
      <SearchResults 
        searchResults={searchResults}
        onClick={releaseGroup => setSelectedReleaseGroup(releaseGroup)} />
    )
  }, [searchResults])

  if (isLoadingSubmit) {
    return (
      <>
        <h3>Sparar nytt album...</h3>
        <LoadingSpinner />
      </>
      )
  }

  return (
    <div className="new-album-page">
      <h2>Nytt album</h2>

      <div className="new-album-page-content" >
        <div 
        className="new-album-page-content-coverart" 
        style={{backgroundImage: `url(${img})`}} />
        
        <div className="new-album-input-section">

          <form onSubmit={() => { 
            submitNewAlbum()
            .then(() => {
              navigate("/")
            })
            .catch(() => { 
              console.error('error')
              setIsLoadingSubmit(false)
            }) 
          }}>

            <div className="new-album-input">
              <h2>Titel</h2>
              <input 
                required
                type="search" 
                value={albumTitle} 
                onChange={e => { setAlbumTitle(e.target.value) }}/>
            </div>

            {searchResultsMemo}

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
              <h2>Betyg</h2>
              {ratingSelectorList}
              <h3>Genomsnitt: ({averageUserRating}/{ALBUM_RATING_MAX})</h3>
            </div>

            <div className="new-album-input">
              <h2>Väljare</h2>
              <select
                required
                className="picked-by-select"
                onChange={event => {
                  const userId = parseInt(event.target.value)
                  const user = users.find(u => u.id == userId)
                  setPickedBy(user ?? null)
              }}>
                <option value="">-</option>
                {users.map(user => (<option key={"pickedBy-" + user.id} value={user.id}>{user.name}</option>))}
              </select>
            </div>
            <hr />
            <button type="submit" className="new-album-submit-button">Spara</button>
          </form>
        </div>
      </div>
    </div>
  )
}
