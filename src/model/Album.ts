import { Rating } from "./Rating"

export interface Album {
  mbid: string,
  title: string,
  artistName: string,
  releaseYear: string,
  ratings: Rating[],
  discussionSummary: string,
  bestSongTitle: string,
  worstSongTitle: string,
  occasion: string,
  discussionDate: string
}