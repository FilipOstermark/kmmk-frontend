export interface Album {
  id: string,
  title: string,
  releaseDate: string | undefined,
  rating: number | undefined,
  discussionSummary: string | undefined,
  bestSongTitle: string | undefined,
  worstSongTitle: string | undefined,
  occasion: string | undefined,
  discussionDate: string | undefined
}