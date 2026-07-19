import { describe, it, expect } from 'vitest';
import {
  getWeatherConditionText,
  getWeatherBackgroundPath,
} from '../../utils/weatherCodes';

describe('weatherCodes utility', () => {
  describe('getWeatherConditionText', () => {
    it('returns Clear sky for WMO code 0', () => {
      expect(getWeatherConditionText(0)).toBe('Clear sky');
    });

    it('returns Overcast for WMO code 3', () => {
      expect(getWeatherConditionText(3)).toBe('Overcast');
    });

    it('returns Foggy for WMO code 45', () => {
      expect(getWeatherConditionText(45)).toBe('Foggy');
    });

    it('returns Rain for WMO code 61', () => {
      expect(getWeatherConditionText(61)).toBe('Rain');
    });

    it('returns Thunderstorm for WMO code 95', () => {
      expect(getWeatherConditionText(95)).toBe('Thunderstorm');
    });

    it('returns Unknown conditions for unrecognized code', () => {
      expect(getWeatherConditionText(999)).toBe('Unknown conditions');
    });
  });

  describe('getWeatherBackgroundPath', () => {
    it('returns clear day SVG path for code 0 during day', () => {
      expect(getWeatherBackgroundPath(0, true)).toBe(
        '/weather-backgrounds/clear-day.svg'
      );
    });

    it('returns clear night SVG path for code 0 at night', () => {
      expect(getWeatherBackgroundPath(0, false)).toBe(
        '/weather-backgrounds/clear-night.svg'
      );
    });

    it('returns rainy day SVG path for code 61 during day', () => {
      expect(getWeatherBackgroundPath(61, true)).toBe(
        '/weather-backgrounds/rainy-day.svg'
      );
    });

    it('returns snow SVG path for code 71', () => {
      expect(getWeatherBackgroundPath(71, true)).toBe(
        '/weather-backgrounds/snow.svg'
      );
    });

    it('returns default SVG path for unrecognized code', () => {
      expect(getWeatherBackgroundPath(999, true)).toBe(
        '/weather-backgrounds/default.svg'
      );
    });
  });
});
