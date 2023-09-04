import { useState } from "react"
import { Album } from "src/model/Album"
import { getCoverArtUrl } from "src/util/util"
import "src/view/css/TopListItem.css"

export interface AlbumTopListItemProps {
  album: Album
}

export const AlbumTopListItem: (
  props: AlbumTopListItemProps
) => JSX.Element = ({album}: AlbumTopListItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const {title, releaseYear, rating} = album

  const ratingDisplay: string = rating ? `${rating}/10` : '-/10'
  const extraInfoDisplay = isExpanded ? "block" : "none"
  
  function toggleExpanded() {
    setIsExpanded(prev => prev = !prev)
  }

  return (
    <div className="top-list-item" onClick={toggleExpanded}>
      <img src={ getCoverArtUrl(album.id)} alt="Cover art"></img>

      <div className="top-list-item-info">
        
        <h3>{title}</h3>
        <p>{releaseYear}</p>
        <div className="top-list-item-rating">
          <span className="top-list-item-rating-star material-symbols-rounded">star</span>
          <p className="top-list-item-rating-text">{ratingDisplay}</p>
        </div>

        <div style={{ display: extraInfoDisplay }}>
          <p>Bästa låt: {album.bestSongTitle}</p>
          <p>Sämsta låt: {album.worstSongTitle}</p>
          <p>Lyssningstillfälle: {album.occasion}</p>
          <p>Sammanfattning: {album.discussionSummary}</p>
        </div>

      </div>

      <h3 className="top-list-item-expand-sign">{(isExpanded ? "-" : "+")}</h3>
    </div>
  )
}
