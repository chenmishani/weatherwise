/**
 * Formats an ISO date string (YYYY-MM-DD) into a concise, readable weekday/date label.
 * @param {string} dateString - ISO date string (e.g. "2026-07-19").
 * @param {number} index - Index of the forecast day (0 for first day).
 * @returns {string} Formatted label (e.g. "Today", "Mon, Jul 20").
 */
export function formatForecastDate(dateString, index) {
  if (index === 0) {
    return 'Today';
  }

  if (!dateString) {
    return '';
  }

  try {
    const date = new Date(`${dateString}T00:00:00`);
    if (isNaN(date.getTime())) {
      return dateString;
    }

    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    return formatter.format(date);
  } catch {
    return dateString;
  }
}
