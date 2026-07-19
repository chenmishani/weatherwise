import { countryCodeToFlag } from '../utils/countryFlag';
import { isFavoriteCity } from '../services/storageService';

function SearchResultItem({ city, onSelect, isHighlighted }) {
  const locationDetails = [city.admin1, city.country]
    .filter(Boolean)
    .join(', ');

  const flag = countryCodeToFlag(city.countryCode);
  const isFav = isFavoriteCity(city.id);
  const optionId = `city-option-${city.id}`;

  return (
    <li
      id={optionId}
      role="option"
      aria-selected={isHighlighted}
      className={`search-result-item-wrapper ${isHighlighted ? 'highlighted' : ''}`}
    >
      <button
        type="button"
        className="search-result-item"
        tabIndex={-1}
        onClick={() => onSelect(city)}
      >
        <span className="country-flag" aria-hidden="true">
          {flag}
        </span>
        <span className="city-name">{city.name}</span>
        {isFav && (
          <span className="favorite-indicator" title="Favorite location">
            {' '}
            ★
          </span>
        )}
        {locationDetails && (
          <span className="location-details"> &mdash; {locationDetails}</span>
        )}
      </button>
    </li>
  );
}

export default SearchResultItem;
