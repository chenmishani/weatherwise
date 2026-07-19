import { getWeatherConditionText } from '../utils/weatherCodes';

function CurrentWeather({ city, weather, isLoading, error }) {
  if (!city) {
    return null;
  }

  const locationName = [city.name, city.admin1, city.country]
    .filter(Boolean)
    .join(', ');

  return (
    <section className="current-weather-card" aria-label="Current Weather">
      <header className="current-weather-header">
        <span className="location-badge">Selected Location</span>
        <h2>{locationName}</h2>
      </header>

      {isLoading && (
        <div className="weather-loading-state">
          <p>Loading current weather...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="weather-error-state">
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && weather && (
        <div className="weather-details-body">
          <div className="weather-main-metric">
            <span className="current-temp">
              {weather.current.temperature} {weather.units.temperature}
            </span>
            <span className="condition-text">
              {getWeatherConditionText(weather.current.weatherCode)}
            </span>
          </div>

          <dl className="weather-metrics-list">
            <div className="metric-item">
              <dt>Feels Like</dt>
              <dd>
                {weather.current.apparentTemperature}{' '}
                {weather.units.temperature}
              </dd>
            </div>
            <div className="metric-item">
              <dt>Humidity</dt>
              <dd>
                {weather.current.humidity} {weather.units.humidity}
              </dd>
            </div>
            <div className="metric-item">
              <dt>Wind Speed</dt>
              <dd>
                {weather.current.windSpeed} {weather.units.windSpeed}
              </dd>
            </div>
            {weather.current.time && (
              <div className="metric-item">
                <dt>Observed At</dt>
                <dd>{weather.current.time.replace('T', ' ')}</dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </section>
  );
}

export default CurrentWeather;
