import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getFavoriteCities,
  removeFavoriteCity,
} from '../services/storageService';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const syncFavorites = () => {
      setFavorites(getFavoriteCities());
    };

    syncFavorites();
    window.addEventListener('weatherwise_favorites_updated', syncFavorites);

    return () => {
      window.removeEventListener(
        'weatherwise_favorites_updated',
        syncFavorites
      );
    };
  }, []);

  const handleSelectFavorite = (city) => {
    navigate('/', { state: { selectedCity: city } });
  };

  const handleRemoveFavorite = (e, cityId) => {
    e.stopPropagation();
    const updated = removeFavoriteCity(cityId);
    setFavorites(updated);
  };

  return (
    <div className="page-container">
      <h1>Favorite Cities</h1>

      {favorites.length === 0 ? (
        <div className="placeholder-panel">
          <h2>No Favorite Cities Saved</h2>
          <p>
            You have no saved favorite locations. Search for a city on the Home
            dashboard and click &ldquo;☆ Add to Favorites&rdquo; to bookmark it
            here.
          </p>
        </div>
      ) : (
        <ul className="favorites-grid" aria-label="Favorite Cities List">
          {favorites.map((city) => {
            const locationDetails = [city.admin1, city.country]
              .filter(Boolean)
              .join(', ');

            return (
              <li key={city.id} className="favorite-card">
                <div
                  tabIndex={0}
                  role="button"
                  className="favorite-card-content"
                  onClick={() => handleSelectFavorite(city)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSelectFavorite(city);
                    }
                  }}
                >
                  <span className="favorite-city-name">{city.name}</span>
                  {locationDetails && (
                    <span className="favorite-location-details">
                      {locationDetails}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  className="remove-favorite-btn"
                  onClick={(e) => handleRemoveFavorite(e, city.id)}
                  aria-label={`Remove ${city.name} from favorites`}
                >
                  &times; Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default FavoritesPage;
