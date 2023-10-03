import { Album } from "src/model/Album"

export const getCoverArtUrl: (mbid: string) => string | undefined = 
  mbid => `http://coverartarchive.org/release-group/${mbid}/front-250`

export const sortAlbumsByRating = (
  array: Album[], 
  order: "asc" | "desc" = "desc"
): Album[] => {
  const arrayCopy: Album[] = [...array]
  const ratedAlbums: Album[] = arrayCopy.filter(album => album.ratings.length != 0)
  const unratedAlbums: Album[] = arrayCopy.filter(album => album.ratings.length == 0)
  
  ratedAlbums.sort((a, b) => getAverageRating(b) - getAverageRating(a))
  if (order === "asc") {
    arrayCopy.reverse()
  }

  return ratedAlbums.concat(unratedAlbums)
}

export const roundToDecimals = (value: number, decimals: number): number => {
  const exp = Math.pow(10, decimals)
  return Math.round(value * exp) / exp
}

export const getAverageRating = ({ ratings }: Album): number => {
  if (ratings.length == 0) {
    return 0
  }

  return ratings
    .map(rating => rating.rating)
    .reduce((a, b) => a + b) / ratings.length
}
