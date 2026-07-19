import { getWeatherConditionText } from '../utils/weatherCodes';
import { formatForecastDate } from '../utils/formatDate';
import { formatTemperature } from '../utils/temperature';

function ForecastDay({ day, index, unit = 'celsius' }) {
  const dateLabel = formatForecastDate(day.date, index);
  const conditionText = getWeatherConditionText(day.weatherCode);

  const maxTempFormatted = formatTemperature(day.temperatureMax, unit);
  const minTempFormatted = formatTemperature(day.temperatureMin, unit);

  return (
    <li className="forecast-card">
      <span className="forecast-date">{dateLabel}</span>
      <span className="forecast-condition">{conditionText}</span>
      <div className="forecast-temp-range">
        <span
          className="temp-max"
          aria-label={`High temperature ${maxTempFormatted}`}
        >
          {maxTempFormatted}
        </span>
        <span
          className="temp-min"
          aria-label={`Low temperature ${minTempFormatted}`}
        >
          {minTempFormatted}
        </span>
      </div>
    </li>
  );
}

export default ForecastDay;
