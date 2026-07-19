function SelectedCityDisplay({ city }) {
  if (!city) {
    return null;
  }

  const locationLabel = [city.name, city.admin1, city.country]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="selected-city-card">
      <span className="selected-city-tag">Selected Location</span>
      <h2>{locationLabel}</h2>
      <p className="no-weather-notice">No weather information yet.</p>
    </div>
  );
}

export default SelectedCityDisplay;
