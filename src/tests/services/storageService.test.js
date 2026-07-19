import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  saveFavoriteCity,
  getFavoriteCities,
  removeFavoriteCity,
  isFavoriteCity,
  saveRecentSearch,
  getRecentSearches,
  clearRecentSearches,
  getTemperatureUnit,
  saveTemperatureUnit,
  STORAGE_KEYS,
} from '../../services/storageService';

describe('storageService', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  const mockCity = {
    id: '123',
    name: 'Tel Aviv',
    country: 'Israel',
    countryCode: 'IL',
    admin1: 'Tel Aviv',
    latitude: 32.0853,
    longitude: 34.7818,
    timezone: 'Asia/Jerusalem',
  };

  describe('Favorite Cities', () => {
    it('returns empty array when no favorites are saved', () => {
      expect(getFavoriteCities()).toEqual([]);
    });

    it('saves a city to favorites and deduplicates by id', () => {
      saveFavoriteCity(mockCity);
      saveFavoriteCity(mockCity);

      const favorites = getFavoriteCities();
      expect(favorites).toHaveLength(1);
      expect(favorites[0].name).toBe('Tel Aviv');
      expect(isFavoriteCity('123')).toBe(true);
    });

    it('removes a city from favorites by id', () => {
      saveFavoriteCity(mockCity);
      expect(isFavoriteCity('123')).toBe(true);

      removeFavoriteCity('123');
      expect(getFavoriteCities()).toEqual([]);
      expect(isFavoriteCity('123')).toBe(false);
    });

    it('handles malformed JSON in LocalStorage safely', () => {
      window.localStorage.setItem(STORAGE_KEYS.FAVORITE_CITIES, 'invalid-json');
      expect(getFavoriteCities()).toEqual([]);
    });

    it('handles restricted LocalStorage gracefully', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });

      expect(() => saveFavoriteCity(mockCity)).not.toThrow();
    });
  });

  describe('Recent Searches', () => {
    it('saves recent searches up to max 5 items placing newest first', () => {
      for (let i = 1; i <= 6; i++) {
        saveRecentSearch({
          id: `${i}`,
          name: `City ${i}`,
          latitude: 10 + i,
          longitude: 20 + i,
        });
      }

      const recents = getRecentSearches();
      expect(recents).toHaveLength(5);
      expect(recents[0].name).toBe('City 6');
    });

    it('clears recent searches', () => {
      saveRecentSearch(mockCity);
      expect(getRecentSearches()).toHaveLength(1);

      clearRecentSearches();
      expect(getRecentSearches()).toEqual([]);
    });
  });

  describe('Temperature Unit', () => {
    it('defaults to celsius when storage is empty', () => {
      expect(getTemperatureUnit()).toBe('celsius');
    });

    it('saves and retrieves fahrenheit unit setting', () => {
      saveTemperatureUnit('fahrenheit');
      expect(getTemperatureUnit()).toBe('fahrenheit');

      saveTemperatureUnit('celsius');
      expect(getTemperatureUnit()).toBe('celsius');
    });
  });
});
