function SearchResultItem({ city, onSelect }) {
  const locationDetails = [city.admin1, city.country]
    .filter(Boolean)
    .join(', ');

  return (
    <li>
      <button
        type="button"
        className="search-result-item"
        onClick={() => onSelect(city)}
      >
        <span className="city-name">{city.name}</span>
        {locationDetails && (
          <span className="location-details"> &mdash; {locationDetails}</span>
        )}
      </button>
    </li>
  );
}

export default SearchResultItem;
