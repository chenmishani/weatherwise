import SearchResultItem from './SearchResultItem';
import ErrorMessage from './ErrorMessage';
import EmptyState from './EmptyState';

function SearchResults({ results, onSelect, error, query }) {
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
    <ul className="search-results-list" aria-label="Search Results">
      {results.map((city) => (
        <SearchResultItem key={city.id} city={city} onSelect={onSelect} />
      ))}
    </ul>
  );
}

export default SearchResults;
