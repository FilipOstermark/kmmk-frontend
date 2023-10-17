import { useState } from "react"
import { Album } from "src/model/Album"
import { ALBUM_RATING_MAX } from "src/util/constants"
import { getAverageAlbumRating, getCoverArtUrl, roundToDecimals, toggleBoolean } from "src/util/util"
import "src/view/TopList/AlbumTopListItem.css"
import { GlowImage } from "../Common/GlowImage"
import { IndividualRatings } from "./IndividualRatings"

export interface AlbumTopListItemProps {
  album: Album
  index: number
}

export const AlbumTopListItem: (
  props: AlbumTopListItemProps
) => JSX.Element = ({ album, index }: AlbumTopListItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const averageUserRating: number = roundToDecimals(
    getAverageAlbumRating(album), 
    2
  )
  const ratingDisplay: string = `${averageUserRating} / ${ALBUM_RATING_MAX}`
  const coverArtUrl = getCoverArtUrl(album.mbid)
  const ranking = (index + 1).toString().padStart(2, "0")
  const toggleExpanded = () => setIsExpanded(toggleBoolean)

  return (
    <div 
      className="top-list-item" 
      onClick={toggleExpanded} 
      data-is-expanded={isExpanded}
    >
      <div 
        className="list-item-background-image" 
        style={{ backgroundImage: `url(${coverArtUrl})` }} />
      
      <GlowImage 
        wrapperClassName="top-list-item-cover-art-wrapper" 
        blurRadiusPx={30} 
        imageSrc={coverArtUrl ?? ""}
        imageClassName="top-list-item-cover-art" />

      <div className="top-list-item-info-header">
        <h3>{ranking}. {album.title}</h3>
        <p>{album.artistName}</p>
        <p>{album.releaseYear}</p>
      </div>

      <div className="top-list-item-rating">
        <span className="top-list-item-rating-star material-symbols-rounded">star</span>
        <p className="top-list-item-rating-text">{ratingDisplay}</p>
      </div>

      <div 
        className="top-list-item-info-extra-wrapper" 
        data-expanded={isExpanded}
      >
        <div className="top-list-item-info-extra">
          <h3>Individuella betyg</h3>
          <IndividualRatings ratings={album.ratings} />

          <h3>Övrigt</h3>
          <ul className="top-list-info-list">
            <li><p><b>Bästa låt:</b> {album.bestSongTitle}</p></li>
            <li><p><b>Sämsta låt:</b> {album.worstSongTitle}</p></li>
            <li><p><b>Lyssningstillfälle:</b> {album.listeningOccasion}</p></li>
            <li><p><b>Sammanfattning:</b> {album.summary}</p></li>
            <li><p><b>Väljare:</b> {album.pickedBy?.name}</p></li>
          </ul>
        </div>
      </div>

      <h3 className="top-list-item-expand-sign">{(isExpanded ? "-" : "+")}</h3>
    </div>
  )
}
