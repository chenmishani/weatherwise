/**
 * Maps WMO Weather Interpretation Codes from Open-Meteo into human-readable English descriptions.
 * @param {number} code - WMO weather code.
 * @returns {string} Human readable weather condition description.
 */
export function getWeatherConditionText(code) {
  const numericCode = Number(code);

  switch (numericCode) {
    case 0:
      return 'Clear sky';
    case 1:
      return 'Mainly clear';
    case 2:
      return 'Partly cloudy';
    case 3:
      return 'Overcast';
    case 45:
    case 48:
      return 'Foggy';
    case 51:
    case 53:
    case 55:
      return 'Drizzle';
    case 56:
    case 57:
      return 'Freezing drizzle';
    case 61:
    case 63:
    case 65:
      return 'Rain';
    case 66:
    case 67:
      return 'Freezing rain';
    case 71:
    case 73:
    case 75:
      return 'Snow fall';
    case 77:
      return 'Snow grains';
    case 80:
    case 81:
    case 82:
      return 'Rain showers';
    case 85:
    case 86:
      return 'Snow showers';
    case 95:
      return 'Thunderstorm';
    case 96:
    case 99:
      return 'Thunderstorm with hail';
    default:
      return 'Unknown conditions';
  }
}

/**
 * Maps WMO weather code and day/night state to a local SVG background path.
 * @param {number} code - WMO weather code.
 * @param {boolean} [isDay=true] - Day vs night indicator.
 * @returns {string} Asset path relative to public root (e.g. "/weather-backgrounds/clear-day.svg").
 */
export function getWeatherBackgroundPath(code, isDay = true) {
  const numericCode = Number(code);
  const dayNightSuffix = isDay ? 'day' : 'night';

  if (numericCode === 0 || numericCode === 1) {
    return `/weather-backgrounds/clear-${dayNightSuffix}.svg`;
  }
  if (numericCode === 2 || numericCode === 3) {
    return `/weather-backgrounds/cloudy-${dayNightSuffix}.svg`;
  }
  if (numericCode === 45 || numericCode === 48) {
    return '/weather-backgrounds/fog.svg';
  }
  if (
    (numericCode >= 51 && numericCode <= 67) ||
    (numericCode >= 80 && numericCode <= 82)
  ) {
    return `/weather-backgrounds/rainy-${dayNightSuffix}.svg`;
  }
  if (
    (numericCode >= 71 && numericCode <= 77) ||
    numericCode === 85 ||
    numericCode === 86
  ) {
    return '/weather-backgrounds/snow.svg';
  }
  if (numericCode === 95 || numericCode === 96 || numericCode === 99) {
    return '/weather-backgrounds/thunderstorm.svg';
  }

  return '/weather-backgrounds/default.svg';
}
