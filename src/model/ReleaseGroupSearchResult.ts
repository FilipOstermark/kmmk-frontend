import { type ReleaseGroup } from "./ReleaseGroup"

export interface ReleaseGroupSearchResult {
  "created": string,
  "count": number,
  "offset": number,
  "release-groups": ReleaseGroup[]
}
