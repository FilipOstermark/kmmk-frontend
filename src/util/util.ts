import { Album } from "src/model/Album"

export const getCoverArtUrl: (mbid: string) => string | undefined = 
  mbid => `http://coverartarchive.org/release-group/${mbid}/front-250`

export const sortAlbumsByRating = (
  array: Album[], 
  order: "asc" | "desc" = "desc"
): Album[] => {
  const arrayCopy: Album[] = [...array]
  
  arrayCopy.sort((a, b) => getAverageRating(b) - getAverageRating(a))
  if (order === "asc") {
    arrayCopy.reverse()
  }

  return arrayCopy
}

export const roundToDecimals = (value: number, decimals: number): number => {
  const exp = Math.pow(10, decimals)
  return Math.round(value * exp) / exp
}

export const getAverageRating = ({ ratings }: Album): number => ratings
  .map(rating => rating.rating)
  .reduce((a, b) => a + b) / ratings.length
