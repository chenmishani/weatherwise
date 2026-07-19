import { useState, useEffect, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import SelectedCityDisplay from '../components/SelectedCityDisplay';
import { useDebounce } from '../hooks/useDebounce';
import { searchCities } from '../services/geocodingService';

function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 300);
  const lastFetchedQueryRef = useRef('');

  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (!trimmed) {
      setResults([]);
      setError(null);
      setIsLoading(false);
      lastFetchedQueryRef.current = '';
      return;
    }

    if (trimmed === lastFetchedQueryRef.current) {
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    searchCities(trimmed, { signal: controller.signal })
      .then((cities) => {
        setResults(cities);
        lastFetchedQueryRef.current = trimmed;
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return;
        }
        setError(err.message || 'Location search failed');
        setResults([]);
        setIsLoading(false);
        lastFetchedQueryRef.current = '';
      });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    if (!newQuery.trim()) {
      setResults([]);
      setError(null);
      lastFetchedQueryRef.current = '';
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setError(null);
    lastFetchedQueryRef.current = '';
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setQuery('');
    setResults([]);
    setError(null);
    lastFetchedQueryRef.current = '';
  };

  return (
    <div className="page-container">
      <h1>WeatherWise Dashboard</h1>
      <p className="welcome-text">
        Search for a city below to select a location.
      </p>

      <section className="search-section">
        <SearchBar
          query={query}
          onChange={handleQueryChange}
          onClear={handleClear}
          isLoading={isLoading}
        />
        <SearchResults
          results={results}
          onSelect={handleSelectCity}
          error={error}
          query={debouncedQuery.trim()}
        />
      </section>

      <SelectedCityDisplay city={selectedCity} />
    </div>
  );
}

export default Home;
