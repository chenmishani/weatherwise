import { countryCodeToFlag } from '../utils/countryFlag';
import { formatLocationLabel } from '../utils/formatLocation';

function RecentSearches({ searches, onSelectCity, onClearRecents }) {
  if (!searches || searches.length === 0) {
    return null;
  }

  return (
    <section
      className="recent-searches-section"
      aria-label="Recent City Searches"
    >
      <header className="recent-searches-header">
        <h2>Recent Searches</h2>
        <button
          type="button"
          onClick={onClearRecents}
          className="clear-recents-btn"
        >
          Clear recent searches
        </button>
      </header>
      <ul className="recent-searches-list">
        {searches.map((city) => {
          const locationLabel = formatLocationLabel(city);
          const flag = countryCodeToFlag(city.countryCode);

          return (
            <li key={city.id}>
              <button
                type="button"
                className="recent-city-chip"
                onClick={() => onSelectCity(city)}
              >
                <span className="recent-chip-flag" aria-hidden="true">
                  {flag}
                </span>{' '}
                {locationLabel}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default RecentSearches;
