/**
 * Converts a Celsius temperature value to Fahrenheit.
 * Formula: (°C × 9 / 5) + 32
 * @param {number} celsius - Temperature in Celsius.
 * @returns {number} Temperature in Fahrenheit rounded to 1 decimal place.
 */
export function celsiusToFahrenheit(celsius) {
  const num = Number(celsius);
  if (!Number.isFinite(num)) {
    return 0;
  }
  const fahrenheit = (num * 9) / 5 + 32;
  return Math.round(fahrenheit * 10) / 10;
}

/**
 * Formats a temperature value into a display string according to unit.
 * @param {number} value - Temperature in Celsius (API standard).
 * @param {'celsius'|'fahrenheit'} unit - Target unit ('celsius' or 'fahrenheit').
 * @returns {string} Formatted string (e.g. "18.5 °C" or "65.3 °F").
 */
export function formatTemperature(value, unit) {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return '';
  }

  if (unit === 'fahrenheit') {
    const fahrenheitVal = celsiusToFahrenheit(num);
    return `${fahrenheitVal} °F`;
  }

  const roundedCelsius = Math.round(num * 10) / 10;
  return `${roundedCelsius} °C`;
}
