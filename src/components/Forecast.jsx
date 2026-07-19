import ForecastDay from './ForecastDay';
import EmptyState from './EmptyState';

function Forecast({ daily, unit, isLoading, error }) {
  if (isLoading || error || !daily) {
    return null;
  }

  if (daily.length === 0) {
    return (
      <section className="forecast-section" aria-label="7-Day Forecast">
        <h2>7-Day Forecast</h2>
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
      <h2>7-Day Forecast</h2>
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
