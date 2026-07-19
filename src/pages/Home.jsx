import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import RecentSearches from '../components/RecentSearches';
import CurrentWeather from '../components/CurrentWeather';
import Forecast from '../components/Forecast';
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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
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

  const weatherSectionRef = useRef(null);
  const prevSelectedCityIdRef = useRef(null);

  // Smooth scroll to weather section when a new city is selected
  useEffect(() => {
    if (selectedCity && selectedCity.id !== prevSelectedCityIdRef.current) {
      prevSelectedCityIdRef.current = selectedCity.id;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      weatherSectionRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  }, [selectedCity]);

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

  // Reset highlighted keyboard index when results change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [results]);

  // Search effect
  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (!trimmed) {
      setResults([]);
      setSearchError(null);
      setSearchIsLoading(false);
      setHighlightedIndex(-1);
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
        setHighlightedIndex(-1);
        lastFetchedQueryRef.current = trimmed;
        setSearchIsLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return;
        }
        setSearchError(err.message || 'Location search failed');
        setResults([]);
        setHighlightedIndex(-1);
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
      setHighlightedIndex(-1);
      lastFetchedQueryRef.current = '';
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setSearchError(null);
    setHighlightedIndex(-1);
    lastFetchedQueryRef.current = '';
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setQuery('');
    setResults([]);
    setSearchError(null);
    setHighlightedIndex(-1);
    lastFetchedQueryRef.current = '';

    const updatedRecents = saveRecentSearch(city);
    setRecentSearches(updatedRecents);
  };

  const handleKeyDown = (e) => {
    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && results[highlightedIndex]) {
        e.preventDefault();
        handleSelectCity(results[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setResults([]);
      setHighlightedIndex(-1);
    }
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

  const activeOptionId =
    highlightedIndex >= 0 && results[highlightedIndex]
      ? `city-option-${results[highlightedIndex].id}`
      : undefined;

  return (
    <div className="page-container">
      <header className="dashboard-top-bar">
        <div>
          <h1>WeatherWise Dashboard</h1>
          <p className="welcome-text">
            Search for a city below to view current weather.
          </p>
        </div>
      </header>

      <section className="search-section">
        <SearchBar
          query={query}
          onChange={handleQueryChange}
          onClear={handleClear}
          onKeyDown={handleKeyDown}
          isLoading={searchIsLoading}
          isOpen={results.length > 0}
          activeOptionId={activeOptionId}
        />
        <SearchResults
          results={results}
          onSelect={handleSelectCity}
          error={searchError}
          query={debouncedQuery.trim()}
          highlightedIndex={highlightedIndex}
        />
      </section>

      <RecentSearches
        searches={recentSearches}
        onSelectCity={handleSelectCity}
        onClearRecents={handleClearRecents}
      />

      <div ref={weatherSectionRef} className="weather-dashboard-layout">
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
          onUnitChange={handleUnitChange}
          isLoading={weatherIsLoading}
          error={weatherError}
        />
      </div>
    </div>
  );
}

export default Home;
