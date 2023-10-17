import { Album } from "src/model/Album"
import { JWT } from "src/model/JWT"
import { Rating } from "src/model/Rating"

export const getCoverArtUrl: (mbid: string) => string | undefined = 
  mbid => `http://coverartarchive.org/release-group/${mbid}/front-250`

export const sortAlbumsByRating = (
  array: Album[], 
  order: "asc" | "desc" = "desc"
): Album[] => {
  const arrayCopy: Album[] = [...array]
  const ratedAlbums: Album[] = arrayCopy.filter(album => album.ratings.length != 0)
  const unratedAlbums: Album[] = arrayCopy.filter(album => album.ratings.length == 0)
  
  ratedAlbums.sort((a, b) => getAverageAlbumRating(b) - getAverageAlbumRating(a))
  if (order === "asc") {
    arrayCopy.reverse()
  }

  return ratedAlbums.concat(unratedAlbums)
}

export const getAverageRating = (ratings: Rating[]): number => {
  if (ratings.length == 0) {
    return 0
  }

  return ratings
    .map(rating => rating.rating)
    .reduce((a, b) => a + b) / ratings.length
}

export const getAverageAlbumRating = ({ ratings }: Album): number => 
  getAverageRating(ratings)

  
export const roundToDecimals = (value: number, decimals: number): number => {
  const exp = Math.pow(10, decimals)
  return Math.round(value * exp) / exp
}

export const parseJwt: (token: string) => JWT = token => {
  const base64Url: string = token.split('.')[1]
  const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload: string = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16))
      .slice(-2)
  ).join(''))

  return JSON.parse(jsonPayload) as JWT
}

export const toggleBoolean: (prev: boolean) => boolean = prev => !prev
