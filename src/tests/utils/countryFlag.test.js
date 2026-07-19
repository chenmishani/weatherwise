import { describe, it, expect } from 'vitest';
import { countryCodeToFlag } from '../../utils/countryFlag';

describe('countryFlag utility', () => {
  it('converts valid 2-letter uppercase ISO country codes to flags', () => {
    expect(countryCodeToFlag('IL')).toBe('🇮🇱');
    expect(countryCodeToFlag('US')).toBe('🇺🇸');
    expect(countryCodeToFlag('GB')).toBe('🇬🇧');
    expect(countryCodeToFlag('FR')).toBe('🇫🇷');
  });

  it('normalizes lowercase ISO country codes', () => {
    expect(countryCodeToFlag('il')).toBe('🇮🇱');
    expect(countryCodeToFlag('us')).toBe('🇺🇸');
  });

  it('trims leading/trailing whitespace', () => {
    expect(countryCodeToFlag('  il ')).toBe('🇮🇱');
  });

  it('returns fallback globe emoji for invalid or missing codes', () => {
    expect(countryCodeToFlag('')).toBe('🌍');
    expect(countryCodeToFlag(null)).toBe('🌍');
    expect(countryCodeToFlag(undefined)).toBe('🌍');
    expect(countryCodeToFlag('123')).toBe('🌍');
    expect(countryCodeToFlag('ISR')).toBe('🌍');
  });
});
