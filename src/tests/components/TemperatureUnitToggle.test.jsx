import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TemperatureUnitToggle from '../../components/TemperatureUnitToggle';

describe('TemperatureUnitToggle', () => {
  it('renders °C and °F unit buttons with active state', () => {
    render(<TemperatureUnitToggle unit="celsius" onUnitChange={() => {}} />);

    const celsiusBtn = screen.getByRole('radio', { name: '°C' });
    const fahrenheitBtn = screen.getByRole('radio', { name: '°F' });

    expect(celsiusBtn).toHaveClass('active');
    expect(celsiusBtn).toHaveAttribute('aria-checked', 'true');
    expect(fahrenheitBtn).not.toHaveClass('active');
    expect(fahrenheitBtn).toHaveAttribute('aria-checked', 'false');
  });

  it('triggers onUnitChange callback when a unit is clicked', () => {
    const handleUnitChange = vi.fn();
    render(
      <TemperatureUnitToggle unit="celsius" onUnitChange={handleUnitChange} />
    );

    const fahrenheitBtn = screen.getByRole('radio', { name: '°F' });
    fireEvent.click(fahrenheitBtn);

    expect(handleUnitChange).toHaveBeenCalledTimes(1);
    expect(handleUnitChange).toHaveBeenCalledWith('fahrenheit');
  });
});
