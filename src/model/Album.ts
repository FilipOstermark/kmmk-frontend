import { Rating } from "./Rating"

export interface Album {
  id: number,
  mbid: string,
  title: string,
  artistName: string,
  releaseYear: string,
  ratings: Rating[],
  summary: string,
  bestSongTitle: string,
  worstSongTitle: string,
  listeningOccasion: string,
  discussionDate: string
}