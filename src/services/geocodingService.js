import { GEOCODING_API_BASE } from './apiConfig';

/**
 * Searches for cities matching a query string via Open-Meteo Geocoding API.
 * @param {string} query - City name or partial name to search for.
 * @returns {Promise<Array<{id: string|number, name: string, country: string, countryCode: string, admin1: string, latitude: number, longitude: number, timezone: string}>>}
 */
export async function searchCities(query, { signal } = {}) {
  if (typeof query !== 'string') {
    return [];
  }

  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return [];
  }

  const url = `${GEOCODING_API_BASE}?name=${encodeURIComponent(trimmedQuery)}&count=10&language=en&format=json`;

  let response;
  try {
    response = await fetch(url, { signal });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    throw new Error(`Location search failed: Network error (${error.message})`);
  }

  if (!response.ok) {
    throw new Error(
      `Location search failed: HTTP error ${response.status} (${response.statusText})`
    );
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error(
      `Location search failed: Malformed API response (${error.message})`
    );
  }

  if (!data || !Array.isArray(data.results)) {
    return [];
  }

  return data.results.map((city) => ({
    id: city.id ?? `${city.latitude}_${city.longitude}`,
    name: city.name || '',
    country: city.country || '',
    countryCode: city.country_code || '',
    admin1: city.admin1 || '',
    latitude: city.latitude,
    longitude: city.longitude,
    timezone: city.timezone || 'auto',
  }));
}
