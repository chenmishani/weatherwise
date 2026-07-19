import { FORECAST_API_BASE } from './apiConfig';

/**
 * Fetches 7-day weather forecast and current weather metrics by coordinates from Open-Meteo.
 * @param {number} latitude - Latitude coordinate.
 * @param {number} longitude - Longitude coordinate.
 * @param {string} [timezone='auto'] - Timezone string (e.g. 'Europe/London' or 'auto').
 * @returns {Promise<{current: Object, daily: Array, units: Object, timezone: string}>}
 */
export async function getWeatherByCoordinates(
  latitude,
  longitude,
  timezone = 'auto'
) {
  const numLat = Number(latitude);
  const numLon = Number(longitude);

  if (!Number.isFinite(numLat) || !Number.isFinite(numLon)) {
    throw new Error(
      'Invalid coordinates: latitude and longitude must be finite numbers.'
    );
  }

  const tz = timezone || 'auto';
  const url = `${FORECAST_API_BASE}?latitude=${numLat}&longitude=${numLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=7&timezone=${encodeURIComponent(tz)}`;

  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error(`Weather fetch failed: Network error (${error.message})`);
  }

  if (!response.ok) {
    throw new Error(
      `Weather fetch failed: HTTP error ${response.status} (${response.statusText})`
    );
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error(
      `Weather fetch failed: Malformed API response (${error.message})`
    );
  }

  if (!data || typeof data !== 'object' || !data.current || !data.daily) {
    throw new Error(
      'Malformed API response: Missing current or daily weather data.'
    );
  }

  const { current, daily, current_units: units, timezone: respTimezone } = data;

  const normalizedDaily = Array.isArray(daily.time)
    ? daily.time.slice(0, 7).map((time, index) => ({
        date: time,
        weatherCode: daily.weather_code?.[index] ?? 0,
        temperatureMax: daily.temperature_2m_max?.[index] ?? 0,
        temperatureMin: daily.temperature_2m_min?.[index] ?? 0,
      }))
    : [];

  return {
    current: {
      time: current.time || '',
      temperature: current.temperature_2m ?? 0,
      apparentTemperature: current.apparent_temperature ?? 0,
      humidity: current.relative_humidity_2m ?? 0,
      weatherCode: current.weather_code ?? 0,
      windSpeed: current.wind_speed_10m ?? 0,
    },
    daily: normalizedDaily,
    units: {
      temperature: units?.temperature_2m || '°C',
      windSpeed: units?.wind_speed_10m || 'km/h',
      humidity: units?.relative_humidity_2m || '%',
    },
    timezone: respTimezone || tz,
  };
}
