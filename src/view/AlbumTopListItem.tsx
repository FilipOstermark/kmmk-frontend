import { Album } from "src/model/Album";

export interface AlbumTopListItemProps {
  album: Album
}

export const AlbumTopListItem: (
  props: AlbumTopListItemProps
) => JSX.Element = ({album}: AlbumTopListItemProps) => {
  const {title, releaseDate, rating} = album

  const ratingDisplay: string = rating ? `${rating}/10` : '-/10'
  
  return (
    <p>{title} ({releaseDate}) - {ratingDisplay}</p>
  )
}
