function TemperatureUnitToggle({ unit, onUnitChange }) {
  return (
    <div
      className="unit-toggle-container"
      role="radiogroup"
      aria-label="Temperature unit selection"
    >
      <span className="unit-toggle-label">Unit:</span>
      <div className="unit-toggle-buttons">
        <button
          type="button"
          role="radio"
          aria-checked={unit === 'celsius'}
          className={`unit-toggle-btn ${unit === 'celsius' ? 'active' : ''}`}
          onClick={() => onUnitChange('celsius')}
        >
          °C
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={unit === 'fahrenheit'}
          className={`unit-toggle-btn ${unit === 'fahrenheit' ? 'active' : ''}`}
          onClick={() => onUnitChange('fahrenheit')}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default TemperatureUnitToggle;
