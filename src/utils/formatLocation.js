/**
 * Formats city name, administrative region (admin1), and country into a readable location string.
 * @param {Object} city - Location object containing name, admin1, and country fields.
 * @param {boolean} [includeCityName=true] - Whether to include city.name in the output.
 * @returns {string} Formatted location string (e.g. "Tel Aviv, Tel Aviv, Israel" or "Tel Aviv, Israel").
 */
export function formatLocationLabel(city, includeCityName = true) {
  if (!city || typeof city !== 'object') {
    return '';
  }

  const parts = includeCityName
    ? [city.name, city.admin1, city.country]
    : [city.admin1, city.country];

  return parts.filter(Boolean).join(', ');
}
