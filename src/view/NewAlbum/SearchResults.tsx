import { ReleaseGroup } from "src/model/ReleaseGroup";
import { ReleaseGroupSearchResult } from "src/model/ReleaseGroupSearchResult";
import { SearchSuggestion } from "./SearchSuggestion";

export interface SearchResultsProps {
  searchResults: ReleaseGroupSearchResult | undefined,
  onClick: (releaseGroup: ReleaseGroup) => void
}

export const SearchResults: (props: SearchResultsProps) => JSX.Element = (
  { searchResults, onClick }
) => (
  <div className="search-results-section">
    <h2>Förslag ({searchResults?.["release-groups"].length ?? 0})</h2>
    <div className="search-results-scroll">
      <div className="search-results">
        {
          searchResults?.["release-groups"].map(
            (releaseGroup: ReleaseGroup) => (
              <SearchSuggestion
                key={releaseGroup.id}
                releaseGroup={releaseGroup}
                onClick={() => { onClick(releaseGroup) }} />
            )
          )
        }
      </div>
    </div>
  </div>
)