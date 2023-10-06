import { useState } from "react"
import { Album } from "src/model/Album"
import { getAverageAlbumRating, getCoverArtUrl, roundToDecimals } from "src/util/util"
import "src/view/css/TopListItem.css"

export interface AlbumTopListItemProps {
  album: Album
}

export const AlbumTopListItem: (
  props: AlbumTopListItemProps
) => JSX.Element = ({album}: AlbumTopListItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const averageUserRating: number = roundToDecimals(getAverageAlbumRating(album), 2)
  const ratingDisplay: string = `${averageUserRating}/10`
  const extraInfoDisplay = isExpanded ? "block" : "none"
  
  function toggleExpanded() {
    setIsExpanded(prev => prev = !prev)
  }

  return (
    <div className="top-list-item" onClick={toggleExpanded}>
      <img src={ getCoverArtUrl(album.mbid)} alt="Cover art"></img>

      <div className="top-list-item-info">
        
        <h3>{album.title}</h3>
        <p>{album.releaseYear}</p>
        <div className="top-list-item-rating">
          <span className="top-list-item-rating-star material-symbols-rounded">star</span>
          <p className="top-list-item-rating-text">{ratingDisplay}</p>
        </div>

        <div className="top-list-item-info-extra" style={{ display: extraInfoDisplay }}>
          <hr />
          <p>Bästa låt: {album.bestSongTitle}</p>
          <p>Sämsta låt: {album.worstSongTitle}</p>
          <p>Lyssningstillfälle: {album.listeningOccasion}</p>
          <p>Sammanfattning: {album.summary}</p>
          <p>Väljare: {album.pickedBy?.name}</p>
        </div>

      </div>

      <h3 className="top-list-item-expand-sign">{(isExpanded ? "-" : "+")}</h3>
    </div>
  )
}
