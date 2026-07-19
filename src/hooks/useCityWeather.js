import { useState, useEffect } from 'react';
import { getWeatherByCoordinates } from '../services/weatherService';

/**
 * Custom hook to manage weather data fetching and cancellation for a selected city.
 * @param {Object|null} selectedCity - Currently selected city object.
 * @returns {Object} Weather state (weatherData, isLoading, error).
 */
export function useCityWeather(selectedCity) {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedCity) {
      setWeatherData(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setError(null);
    setWeatherData(null);

    getWeatherByCoordinates(
      selectedCity.latitude,
      selectedCity.longitude,
      selectedCity.timezone,
      { signal: controller.signal }
    )
      .then((data) => {
        setWeatherData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return;
        }
        setError(err.message || 'Failed to fetch weather data.');
        setWeatherData(null);
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [selectedCity]);

  return {
    weatherData,
    isLoading,
    error,
  };
}
