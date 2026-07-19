import { getWeatherConditionText } from '../utils/weatherCodes';
import { formatForecastDate } from '../utils/formatDate';

function ForecastDay({ day, index, unit }) {
  const dateLabel = formatForecastDate(day.date, index);
  const conditionText = getWeatherConditionText(day.weatherCode);

  return (
    <li className="forecast-card">
      <span className="forecast-date">{dateLabel}</span>
      <span className="forecast-condition">{conditionText}</span>
      <div className="forecast-temp-range">
        <span
          className="temp-max"
          aria-label={`High temperature ${day.temperatureMax} ${unit}`}
        >
          {day.temperatureMax} {unit}
        </span>
        <span
          className="temp-min"
          aria-label={`Low temperature ${day.temperatureMin} ${unit}`}
        >
          {day.temperatureMin} {unit}
        </span>
      </div>
    </li>
  );
}

export default ForecastDay;
