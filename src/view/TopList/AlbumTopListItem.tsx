import { useState } from "react"
import { Album } from "src/model/Album"
import { MAX_ALBUM_RATING } from "src/util/constants"
import { getAverageAlbumRating, getCoverArtUrl, roundToDecimals } from "src/util/util"
import "src/view/TopList/AlbumTopListItem.css"
import { IndividualRatings } from "./IndividualRatings"

export interface AlbumTopListItemProps {
  album: Album
}

export const AlbumTopListItem: (
  props: AlbumTopListItemProps
) => JSX.Element = ({album}: AlbumTopListItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const averageUserRating: number = roundToDecimals(getAverageAlbumRating(album), 2)
  const ratingDisplay: string = `${averageUserRating} / ${MAX_ALBUM_RATING}`
  const extraInfoDisplay = isExpanded ? "block" : "none"
  const coverArtUrl = getCoverArtUrl(album.mbid)
  
  function toggleExpanded() {
    setIsExpanded(prev => prev = !prev)
  }

  return (
    <div className="top-list-item" onClick={toggleExpanded} >
      <div 
        className="list-item-background-image" 
        style={{ backgroundImage: `url(${coverArtUrl})` }} />
      <img src={coverArtUrl} alt="Cover art" />

      <div className="top-list-item-info">
        
        <h3>{album.title} ({album.releaseYear})</h3>
        <p>{album.artistName}</p>
        <div className="top-list-item-rating">
          <span className="top-list-item-rating-star material-symbols-rounded">star</span>
          <p className="top-list-item-rating-text">{ratingDisplay}</p>
        </div>

        <div className="top-list-item-info-extra" style={{ display: extraInfoDisplay }}>
          <h3>Individuella betyg</h3>
          <IndividualRatings ratings={album.ratings} />

          <h3>Övrigt</h3>
          <ul className="top-list-info-list">
          <li><p>Bästa låt: {album.bestSongTitle}</p></li>
          <li><p>Sämsta låt: {album.worstSongTitle}</p></li>
          <li><p>Lyssningstillfälle: {album.listeningOccasion}</p></li>
          <li><p>Sammanfattning: {album.summary}</p></li>
          <li><p>Väljare: {album.pickedBy?.name}</p></li>
          </ul>
        </div>

      </div>

      <h3 className="top-list-item-expand-sign">{(isExpanded ? "-" : "+")}</h3>
    </div>
  )
}
