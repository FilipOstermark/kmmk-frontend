import { Rating } from "./Rating"

export interface Album {
  id: string, // Use MBID if available
  title: string,
  releaseYear: string,
  ratings: Rating[],
  discussionSummary: string,
  bestSongTitle: string,
  worstSongTitle: string,
  occasion: string,
  discussionDate: string
}