import SearchResultItem from './SearchResultItem';

function SearchResults({ results, onSelect, error, query }) {
  if (error) {
    return <div className="search-error-message">{error}</div>;
  }

  if (query && results.length === 0) {
    return (
      <div className="no-results-message">
        No locations found matching &ldquo;{query}&rdquo;.
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <ul className="search-results-list" aria-label="Search Results">
      {results.map((city) => (
        <SearchResultItem key={city.id} city={city} onSelect={onSelect} />
      ))}
    </ul>
  );
}

export default SearchResults;
