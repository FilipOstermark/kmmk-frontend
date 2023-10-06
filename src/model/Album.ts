import { Rating } from "./Rating"
import { User } from "./User"

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
  discussionDate: string,
  pickedBy: User | null
}
