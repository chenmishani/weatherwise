import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CurrentWeather from '../../components/CurrentWeather';

describe('CurrentWeather', () => {
  const mockCity = {
    id: '123',
    name: 'Tel Aviv',
    admin1: 'Tel Aviv District',
    country: 'Israel',
    latitude: 32.08,
    longitude: 34.78,
  };

  const mockWeather = {
    current: {
      temperature: 24.5,
      apparentTemperature: 25.0,
      humidity: 60,
      weatherCode: 0,
      windSpeed: 12.5,
      isDay: true,
      time: '2026-07-19T14:00',
    },
    units: {
      temperature: '°C',
      humidity: '%',
      windSpeed: 'km/h',
    },
  };

  it('renders city location label, current temperature, and metrics', () => {
    render(
      <CurrentWeather
        city={mockCity}
        weather={mockWeather}
        isLoading={false}
        error={null}
        isFavorite={false}
        onToggleFavorite={() => {}}
      />
    );

    expect(
      screen.getByText('Tel Aviv, Tel Aviv District, Israel')
    ).toBeInTheDocument();
    expect(screen.getByText('24.5 °C')).toBeInTheDocument();
    expect(screen.getByText('Clear sky')).toBeInTheDocument();
    expect(screen.getByText('60 %')).toBeInTheDocument();
  });

  it('triggers onToggleFavorite callback when favorite button is clicked', () => {
    const handleToggle = vi.fn();
    render(
      <CurrentWeather
        city={mockCity}
        weather={mockWeather}
        isLoading={false}
        error={null}
        isFavorite={false}
        onToggleFavorite={handleToggle}
      />
    );

    const favBtn = screen.getByRole('button', {
      name: 'Add Tel Aviv to favorites',
    });
    fireEvent.click(favBtn);

    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
