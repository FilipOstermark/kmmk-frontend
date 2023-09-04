export interface Album {
  id: string, // Use MBID if available
  title: string,
  releaseYear: string
  rating: number
  discussionSummary: string
  bestSongTitle: string
  worstSongTitle: string
  occasion: string
  discussionDate: string
}