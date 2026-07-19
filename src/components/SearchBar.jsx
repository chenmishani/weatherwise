import LoadingIndicator from './LoadingIndicator';

function SearchBar({
  query,
  onChange,
  onClear,
  onKeyDown,
  isLoading,
  isOpen,
  activeOptionId,
}) {
  return (
    <div className="search-bar-container">
      <label htmlFor="city-search-input" className="search-label">
        Search for a city
      </label>
      <div className="search-input-wrapper">
        <input
          id="city-search-input"
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="city-search-listbox"
          aria-activedescendant={activeOptionId || undefined}
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Enter city name (e.g. London, Tokyo, Paris)..."
          className="search-input"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={onClear}
            className="clear-button"
            aria-label="Clear search input"
          >
            &times;
          </button>
        )}
      </div>
      {isLoading && (
        <LoadingIndicator message="Searching locations..." size="small" />
      )}
    </div>
  );
}

export default SearchBar;
