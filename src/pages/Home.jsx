import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import RecentSearches from '../components/RecentSearches';
import CurrentWeather from '../components/CurrentWeather';
import Forecast from '../components/Forecast';
import TemperatureUnitToggle from '../components/TemperatureUnitToggle';
import { useDebounce } from '../hooks/useDebounce';
import { searchCities } from '../services/geocodingService';
import { getWeatherByCoordinates } from '../services/weatherService';
import {
  getRecentSearches,
  saveRecentSearch,
  clearRecentSearches,
  isFavoriteCity,
  saveFavoriteCity,
  removeFavoriteCity,
  getTemperatureUnit,
  saveTemperatureUnit,
} from '../services/storageService';

function Home() {
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const [recentSearches, setRecentSearches] = useState([]);
  const [isFav, setIsFav] = useState(false);

  const [unit, setUnit] = useState(() => getTemperatureUnit());

  const [weatherData, setWeatherData] = useState(null);
  const [weatherIsLoading, setWeatherIsLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  const debouncedQuery = useDebounce(query, 300);
  const lastFetchedQueryRef = useRef('');

  // Handle navigation from FavoritesPage
  useEffect(() => {
    if (location.state?.selectedCity) {
      const city = location.state.selectedCity;
      setSelectedCity(city);
      const updatedRecents = saveRecentSearch(city);
      setRecentSearches(updatedRecents);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Initial load for recent searches
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // Favorite status sync effect for selectedCity
  useEffect(() => {
    if (!selectedCity) {
      setIsFav(false);
      return;
    }

    const syncFav = () => {
      setIsFav(isFavoriteCity(selectedCity.id));
    };

    syncFav();
    window.addEventListener('weatherwise_favorites_updated', syncFav);

    return () => {
      window.removeEventListener('weatherwise_favorites_updated', syncFav);
    };
  }, [selectedCity]);

  // Search effect
  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (!trimmed) {
      setResults([]);
      setSearchError(null);
      setSearchIsLoading(false);
      lastFetchedQueryRef.current = '';
      return;
    }

    if (trimmed === lastFetchedQueryRef.current) {
      return;
    }

    const controller = new AbortController();
    setSearchIsLoading(true);
    setSearchError(null);

    searchCities(trimmed, { signal: controller.signal })
      .then((cities) => {
        setResults(cities);
        lastFetchedQueryRef.current = trimmed;
        setSearchIsLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return;
        }
        setSearchError(err.message || 'Location search failed');
        setResults([]);
        setSearchIsLoading(false);
        lastFetchedQueryRef.current = '';
      });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  // Weather effect for selected city
  useEffect(() => {
    if (!selectedCity) {
      setWeatherData(null);
      setWeatherError(null);
      setWeatherIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setWeatherIsLoading(true);
    setWeatherError(null);
    setWeatherData(null);

    getWeatherByCoordinates(
      selectedCity.latitude,
      selectedCity.longitude,
      selectedCity.timezone,
      { signal: controller.signal }
    )
      .then((data) => {
        setWeatherData(data);
        setWeatherIsLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return;
        }
        setWeatherError(err.message || 'Failed to fetch weather data.');
        setWeatherData(null);
        setWeatherIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [selectedCity]);

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    if (!newQuery.trim()) {
      setResults([]);
      setSearchError(null);
      lastFetchedQueryRef.current = '';
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setSearchError(null);
    lastFetchedQueryRef.current = '';
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setQuery('');
    setResults([]);
    setSearchError(null);
    lastFetchedQueryRef.current = '';

    const updatedRecents = saveRecentSearch(city);
    setRecentSearches(updatedRecents);
  };

  const handleClearRecents = () => {
    const cleared = clearRecentSearches();
    setRecentSearches(cleared);
  };

  const handleToggleFavorite = () => {
    if (!selectedCity) return;
    if (isFav) {
      removeFavoriteCity(selectedCity.id);
    } else {
      saveFavoriteCity(selectedCity);
    }
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    saveTemperatureUnit(newUnit);
  };

  return (
    <div className="page-container">
      <header className="dashboard-top-bar">
        <div>
          <h1>WeatherWise Dashboard</h1>
          <p className="welcome-text">
            Search for a city below to view current weather.
          </p>
        </div>
        <TemperatureUnitToggle unit={unit} onUnitChange={handleUnitChange} />
      </header>

      <section className="search-section">
        <SearchBar
          query={query}
          onChange={handleQueryChange}
          onClear={handleClear}
          isLoading={searchIsLoading}
        />
        <SearchResults
          results={results}
          onSelect={handleSelectCity}
          error={searchError}
          query={debouncedQuery.trim()}
        />
      </section>

      <RecentSearches
        searches={recentSearches}
        onSelectCity={handleSelectCity}
        onClearRecents={handleClearRecents}
      />

      <CurrentWeather
        city={selectedCity}
        weather={weatherData}
        isLoading={weatherIsLoading}
        error={weatherError}
        isFavorite={isFav}
        onToggleFavorite={handleToggleFavorite}
        unit={unit}
      />
      <Forecast
        daily={weatherData?.daily}
        unit={unit}
        isLoading={weatherIsLoading}
        error={weatherError}
      />
    </div>
  );
}

export default Home;
