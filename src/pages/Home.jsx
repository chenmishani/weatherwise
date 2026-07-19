import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import RecentSearches from '../components/RecentSearches';
import CurrentWeather from '../components/CurrentWeather';
import Forecast from '../components/Forecast';
import { useCitySearch } from '../hooks/useCitySearch';
import { useCityWeather } from '../hooks/useCityWeather';
import {
  getRecentSearches,
  saveRecentSearch,
  clearRecentSearches,
  isFavoriteCity,
  saveFavoriteCity,
  removeFavoriteCity,
  getTemperatureUnit,
  saveTemperatureUnit,
  FAVORITES_UPDATED_EVENT,
} from '../services/storageService';

function Home() {
  const location = useLocation();

  const [selectedCity, setSelectedCity] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [unit, setUnit] = useState(() => getTemperatureUnit());

  const weatherSectionRef = useRef(null);
  const prevSelectedCityIdRef = useRef(null);

  const handleSelectCityInternal = (city) => {
    setSelectedCity(city);
    const updatedRecents = saveRecentSearch(city);
    setRecentSearches(updatedRecents);
  };

  const {
    query,
    results,
    highlightedIndex,
    isLoading: searchIsLoading,
    error: searchError,
    debouncedQuery,
    activeOptionId,
    handleQueryChange,
    handleClear,
    handleSelectCity,
    handleKeyDown,
  } = useCitySearch(handleSelectCityInternal);

  const {
    weatherData,
    isLoading: weatherIsLoading,
    error: weatherError,
  } = useCityWeather(selectedCity);

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
      handleSelectCityInternal(city);
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
    window.addEventListener(FAVORITES_UPDATED_EVENT, syncFav);

    return () => {
      window.removeEventListener(FAVORITES_UPDATED_EVENT, syncFav);
    };
  }, [selectedCity]);

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
          query={debouncedQuery}
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
