import { type ReleaseGroup } from "./ReleaseGroup"

export interface ReleaseGroupSearchResult {
  "created": string,
  "count": number,
  "offset": number,
  "release-groups": ReleaseGroup[]
}

export const emptyReleaseGroupSearchResult: () => ReleaseGroupSearchResult = 
  () => ({
    "created": '',
    "count": 0,
    "offset": 0,
    "release-groups": []
  })
