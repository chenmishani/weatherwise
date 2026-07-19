import {
  getWeatherConditionText,
  getWeatherBackgroundPath,
} from '../utils/weatherCodes';
import { formatTemperature } from '../utils/temperature';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import TemperatureUnitToggle from './TemperatureUnitToggle';

function CurrentWeather({
  city,
  weather,
  isLoading,
  error,
  isFavorite,
  onToggleFavorite,
  unit = 'celsius',
  onUnitChange,
}) {
  if (!city) {
    return null;
  }

  const locationName = [city.name, city.admin1, city.country]
    .filter(Boolean)
    .join(', ');

  const currentTempFormatted = weather
    ? formatTemperature(weather.current.temperature, unit)
    : '';
  const feelsLikeFormatted = weather
    ? formatTemperature(weather.current.apparentTemperature, unit)
    : '';

  const hasWeather = !isLoading && !error && weather?.current;
  const bgPath = hasWeather
    ? getWeatherBackgroundPath(
        weather.current.weatherCode,
        weather.current.isDay
      )
    : null;

  const cardStyle = bgPath
    ? {
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.75)), url(${bgPath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <section
      className={`current-weather-card ${hasWeather ? 'has-weather-bg' : ''}`}
      style={cardStyle}
      aria-label="Current Weather"
    >
      <header className="current-weather-header">
        <div className="location-header-row">
          <div>
            <span className="location-badge">Selected Location</span>
            <h2>{locationName}</h2>
          </div>
          <div className="weather-card-actions">
            {onUnitChange && (
              <TemperatureUnitToggle unit={unit} onUnitChange={onUnitChange} />
            )}
            {onToggleFavorite && (
              <button
                type="button"
                onClick={onToggleFavorite}
                className={`favorite-toggle-btn ${isFavorite ? 'is-favorite' : ''}`}
                aria-label={
                  isFavorite
                    ? `Remove ${city.name} from favorites`
                    : `Add ${city.name} to favorites`
                }
              >
                {isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}
              </button>
            )}
          </div>
        </div>
      </header>

      {isLoading && (
        <div className="weather-loading-state">
          <LoadingIndicator
            message="Retrieving weather forecast..."
            size="medium"
          />
        </div>
      )}

      {!isLoading && error && <ErrorMessage message={error} type="weather" />}

      {hasWeather && (
        <div className="weather-details-body">
          <div className="weather-main-metric">
            <span className="current-temp">{currentTempFormatted}</span>
            <span className="condition-text">
              {getWeatherConditionText(weather.current.weatherCode)}
            </span>
          </div>

          <dl className="weather-metrics-list">
            <div className="metric-item">
              <dt>Feels Like</dt>
              <dd>{feelsLikeFormatted}</dd>
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
