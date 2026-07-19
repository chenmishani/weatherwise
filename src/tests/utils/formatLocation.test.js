import { describe, it, expect } from 'vitest';
import { formatLocationLabel } from '../../utils/formatLocation';

describe('formatLocation utility', () => {
  it('formats full location with city name, region, and country', () => {
    const city = {
      name: 'Tel Aviv',
      admin1: 'Tel Aviv District',
      country: 'Israel',
    };
    expect(formatLocationLabel(city)).toBe(
      'Tel Aviv, Tel Aviv District, Israel'
    );
  });

  it('formats location omitting city name when includeCityName is false', () => {
    const city = {
      name: 'Tel Aviv',
      admin1: 'Tel Aviv District',
      country: 'Israel',
    };
    expect(formatLocationLabel(city, false)).toBe('Tel Aviv District, Israel');
  });

  it('handles missing admin1 region gracefully', () => {
    const city = { name: 'Monaco', country: 'Monaco' };
    expect(formatLocationLabel(city)).toBe('Monaco, Monaco');
    expect(formatLocationLabel(city, false)).toBe('Monaco');
  });

  it('handles city with only name', () => {
    const city = { name: 'Singapore' };
    expect(formatLocationLabel(city)).toBe('Singapore');
    expect(formatLocationLabel(city, false)).toBe('');
  });

  it('returns empty string for null, undefined, or malformed input', () => {
    expect(formatLocationLabel(null)).toBe('');
    expect(formatLocationLabel(undefined)).toBe('');
    expect(formatLocationLabel('invalid')).toBe('');
  });
});
