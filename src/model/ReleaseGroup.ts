import { ArtistCredit } from "src/model/ArtistCredit"

export interface ReleaseGroup {
  "id": string,
  "score": number,
  "count": number,
  "title": string,
  "first-release-date": string | undefined,
  "type-id": string,
  "primary-type": string,
  "primary-type-id": string,
  "artist-credit": ArtistCredit[]
}