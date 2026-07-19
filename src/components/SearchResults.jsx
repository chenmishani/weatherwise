import SearchResultItem from './SearchResultItem';
import ErrorMessage from './ErrorMessage';
import EmptyState from './EmptyState';

function SearchResults({ results, onSelect, error, query, highlightedIndex }) {
  if (error) {
    return <ErrorMessage message={error} type="search" />;
  }

  if (query && results.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No Locations Found"
        message={`No matching cities found for "${query}". Please check spelling.`}
      />
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <ul
      id="city-search-listbox"
      role="listbox"
      className="search-results-list"
      aria-label="Search Results"
    >
      {results.map((city, index) => (
        <SearchResultItem
          key={city.id}
          city={city}
          onSelect={onSelect}
          isHighlighted={index === highlightedIndex}
        />
      ))}
    </ul>
  );
}

export default SearchResults;
