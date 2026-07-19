import { useState, useEffect, useRef } from 'react';
import { useDebounce } from './useDebounce';
import { searchCities } from '../services/geocodingService';

/**
 * Custom hook to manage city autocomplete search state, request cancellation, debouncing, and keyboard navigation.
 * @param {Function} onSelectCityCallback - Function called when a city is selected.
 * @returns {Object} Search state and handler functions.
 */
export function useCitySearch(onSelectCityCallback) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 300);
  const lastFetchedQueryRef = useRef('');

  // Reset keyboard highlight when results update
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [results]);

  // Geocoding fetch effect with AbortController lifecycle safeguard
  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (!trimmed) {
      setResults([]);
      setError(null);
      setIsLoading(false);
      setHighlightedIndex(-1);
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
        setHighlightedIndex(-1);
        lastFetchedQueryRef.current = trimmed;
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return;
        }
        setError(err.message || 'Location search failed');
        setResults([]);
        setHighlightedIndex(-1);
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
      setHighlightedIndex(-1);
      lastFetchedQueryRef.current = '';
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setError(null);
    setHighlightedIndex(-1);
    lastFetchedQueryRef.current = '';
  };

  const handleSelectCity = (city) => {
    setQuery('');
    setResults([]);
    setError(null);
    setHighlightedIndex(-1);
    lastFetchedQueryRef.current = '';

    if (onSelectCityCallback) {
      onSelectCityCallback(city);
    }
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

  const activeOptionId =
    highlightedIndex >= 0 && results[highlightedIndex]
      ? `city-option-${results[highlightedIndex].id}`
      : undefined;

  return {
    query,
    results,
    highlightedIndex,
    isLoading,
    error,
    debouncedQuery: debouncedQuery.trim(),
    activeOptionId,
    handleQueryChange,
    handleClear,
    handleSelectCity,
    handleKeyDown,
  };
}
