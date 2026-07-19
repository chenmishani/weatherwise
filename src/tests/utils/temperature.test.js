import { describe, it, expect } from 'vitest';
import {
  celsiusToFahrenheit,
  formatTemperature,
} from '../../utils/temperature';

describe('temperature utility', () => {
  describe('celsiusToFahrenheit', () => {
    it('converts 0°C to 32°F', () => {
      expect(celsiusToFahrenheit(0)).toBe(32);
    });

    it('converts 100°C to 212°F', () => {
      expect(celsiusToFahrenheit(100)).toBe(212);
    });

    it('converts 25°C to 77°F', () => {
      expect(celsiusToFahrenheit(25)).toBe(77);
    });

    it('handles negative temperatures correctly', () => {
      expect(celsiusToFahrenheit(-10)).toBe(14);
    });

    it('returns 0 for non-finite inputs', () => {
      expect(celsiusToFahrenheit('abc')).toBe(0);
      expect(celsiusToFahrenheit(Infinity)).toBe(0);
    });
  });

  describe('formatTemperature', () => {
    it('formats Celsius by default', () => {
      expect(formatTemperature(22.4)).toBe('22.4 °C');
    });

    it('formats Fahrenheit when unit is fahrenheit', () => {
      expect(formatTemperature(0, 'fahrenheit')).toBe('32 °F');
    });

    it('rounds values to 1 decimal place', () => {
      expect(formatTemperature(22.456, 'celsius')).toBe('22.5 °C');
    });

    it('returns empty string for non-numeric inputs', () => {
      expect(formatTemperature(undefined)).toBe('');
      expect(formatTemperature('invalid')).toBe('');
    });
  });
});
