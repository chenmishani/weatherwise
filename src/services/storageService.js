const RECENT_SEARCHES_KEY = 'weatherwise_recent_searches';
const FAVORITE_CITIES_KEY = 'weatherwise_favorite_cities';
const MAX_RECENT_ITEMS = 5;

/**
 * Normalizes a city object to include only persistent location fields.
 * @param {Object} city - Location object.
 * @returns {Object|null} Clean city object without weather data.
 */
function normalizeCityForStorage(city) {
  if (!city || typeof city !== 'object') {
    return null;
  }

  return {
    id: city.id ?? `${city.latitude}_${city.longitude}`,
    name: city.name || '',
    country: city.country || '',
    countryCode: city.countryCode || city.country_code || '',
    admin1: city.admin1 || '',
    latitude: Number(city.latitude),
    longitude: Number(city.longitude),
    timezone: city.timezone || 'auto',
  };
}

/**
 * Safely reads recent searches from LocalStorage.
 * @returns {Array<Object>} Array of recent city objects.
 */
export function getRecentSearches() {
  try {
    const dataStr = window.localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!dataStr) {
      return [];
    }

    const parsed = JSON.parse(dataStr);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map(normalizeCityForStorage)
      .filter(
        (city) =>
          city &&
          Number.isFinite(city.latitude) &&
          Number.isFinite(city.longitude)
      );
  } catch {
    return [];
  }
}

/**
 * Saves a city to recent searches in LocalStorage.
 * Places the city first, deduplicates by id, and limits to 5 items.
 * @param {Object} city - Location object to save.
 * @returns {Array<Object>} Updated list of recent searches.
 */
export function saveRecentSearch(city) {
  const normalized = normalizeCityForStorage(city);
  if (
    !normalized ||
    !Number.isFinite(normalized.latitude) ||
    !Number.isFinite(normalized.longitude)
  ) {
    return getRecentSearches();
  }

  const current = getRecentSearches();
  const filtered = current.filter(
    (item) => String(item.id) !== String(normalized.id)
  );
  const updated = [normalized, ...filtered].slice(0, MAX_RECENT_ITEMS);

  try {
    window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // Fail gracefully if LocalStorage is unavailable or restricted
  }

  return updated;
}

/**
 * Clears recent searches from LocalStorage.
 * @returns {Array} Empty array.
 */
export function clearRecentSearches() {
  try {
    window.localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch {
    // Fail gracefully if LocalStorage is unavailable
  }
  return [];
}

/**
 * Safely reads favorite cities from LocalStorage.
 * @returns {Array<Object>} Array of favorite city objects.
 */
export function getFavoriteCities() {
  try {
    const dataStr = window.localStorage.getItem(FAVORITE_CITIES_KEY);
    if (!dataStr) {
      return [];
    }

    const parsed = JSON.parse(dataStr);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map(normalizeCityForStorage)
      .filter(
        (city) =>
          city &&
          Number.isFinite(city.latitude) &&
          Number.isFinite(city.longitude)
      );
  } catch {
    return [];
  }
}

/**
 * Saves a city to favorites in LocalStorage.
 * Deduplicates by id.
 * @param {Object} city - Location object to favorite.
 * @returns {Array<Object>} Updated list of favorite cities.
 */
export function saveFavoriteCity(city) {
  const normalized = normalizeCityForStorage(city);
  if (
    !normalized ||
    !Number.isFinite(normalized.latitude) ||
    !Number.isFinite(normalized.longitude)
  ) {
    return getFavoriteCities();
  }

  const current = getFavoriteCities();
  const filtered = current.filter(
    (item) => String(item.id) !== String(normalized.id)
  );
  const updated = [normalized, ...filtered];

  try {
    window.localStorage.setItem(FAVORITE_CITIES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('weatherwise_favorites_updated'));
  } catch {
    // Fail gracefully
  }

  return updated;
}

/**
 * Removes a city from favorites in LocalStorage by cityId.
 * @param {string|number} cityId - ID of city to remove.
 * @returns {Array<Object>} Updated list of favorite cities.
 */
export function removeFavoriteCity(cityId) {
  if (cityId === undefined || cityId === null) {
    return getFavoriteCities();
  }

  const current = getFavoriteCities();
  const updated = current.filter((item) => String(item.id) !== String(cityId));

  try {
    window.localStorage.setItem(FAVORITE_CITIES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('weatherwise_favorites_updated'));
  } catch {
    // Fail gracefully
  }

  return updated;
}

/**
 * Checks if a city ID exists in favorites.
 * @param {string|number} cityId - ID of city to check.
 * @returns {boolean} True if favorite.
 */
export function isFavoriteCity(cityId) {
  if (cityId === undefined || cityId === null) {
    return false;
  }
  const current = getFavoriteCities();
  return current.some((item) => String(item.id) === String(cityId));
}
