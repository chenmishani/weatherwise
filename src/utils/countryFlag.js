/**
 * Converts a 2-letter ISO country code into a unicode country flag emoji.
 * Returns a neutral fallback emoji ('🌍') if code is invalid or unavailable.
 *
 * @param {string} countryCode - 2-letter ISO country code (e.g. 'IL', 'US', 'GB').
 * @returns {string} Country flag emoji or fallback globe.
 */
export function countryCodeToFlag(countryCode) {
  if (!countryCode || typeof countryCode !== 'string') {
    return '🌍';
  }

  const code = countryCode.trim().toUpperCase();

  if (!/^[A-Z]{2}$/.test(code)) {
    return '🌍';
  }

  // Convert A-Z characters to regional indicator symbol codepoints (0x1F1E6 to 0x1F1FF)
  const codePoints = [...code].map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
