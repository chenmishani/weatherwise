import ForecastDay from './ForecastDay';
import EmptyState from './EmptyState';
import TemperatureUnitToggle from './TemperatureUnitToggle';

function Forecast({ daily, unit, onUnitChange, isLoading, error }) {
  if (isLoading || error || !daily) {
    return null;
  }

  if (daily.length === 0) {
    return (
      <section className="forecast-section" aria-label="7-Day Forecast">
        <header className="forecast-header-row">
          <h2>7-Day Forecast</h2>
          {onUnitChange && (
            <TemperatureUnitToggle unit={unit} onUnitChange={onUnitChange} />
          )}
        </header>
        <EmptyState
          icon="📅"
          title="Forecast Unavailable"
          message="7-Day forecast data is currently unavailable for this location."
        />
      </section>
    );
  }

  return (
    <section className="forecast-section" aria-label="7-Day Forecast">
      <header className="forecast-header-row">
        <h2>7-Day Forecast</h2>
        {onUnitChange && (
          <TemperatureUnitToggle unit={unit} onUnitChange={onUnitChange} />
        )}
      </header>
      <ul className="forecast-grid">
        {daily.map((day, index) => (
          <ForecastDay
            key={day.date || index}
            day={day}
            index={index}
            unit={unit}
          />
        ))}
      </ul>
    </section>
  );
}

export default Forecast;
