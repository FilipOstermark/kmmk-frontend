import { Album } from "src/model/Album"

export const getCoverArtUrl: (mbid: string) => string | undefined = 
  mbid => `http://coverartarchive.org/release-group/${mbid}/front-250`

export const sortAlbumsByRating = (
  array: Album[], 
  order: "asc" | "desc" = "desc"
): Album[] => {
  const arrayCopy: Album[] = [...array]
  
  arrayCopy.sort((a, b) => b.rating - a.rating)
  if (order === "asc") {
    arrayCopy.reverse()
  }

  return arrayCopy
}