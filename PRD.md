# Product Requirements Document (PRD) — WeatherWise

## 1. Product Overview

**WeatherWise** is a lightweight, responsive web application built with React and Vite that provides users with real-time weather information and a 7-day weather forecast for cities worldwide using the Open-Meteo APIs. WeatherWise offers a clean user interface with search history, favorite locations bookmarking, dynamic unit conversion (Celsius/Fahrenheit), and graceful error state handling—all without requiring user registration or backend infrastructure.

---

## 2. Problem Statement

Many mainstream weather applications are cluttered with heavy advertisements, intrusive user tracking, complex maps, and unnecessary paywalls. Users seeking quick, reliable, and clean weather updates need a fast, responsive, and privacy-respecting application that saves their favorite locations locally and functions seamlessly across desktop and mobile devices.

---

## 3. Goals

- Provide an intuitive, modern weather dashboard with zero layout shift during data loading.
- Enable fast city search with support for handling multiple matching locations (e.g., distinguishing between Springfield, IL and Springfield, MA).
- Deliver 7-day daily forecasts alongside detailed current weather metrics (temperature, apparent temperature, wind speed, relative humidity, weather conditions).
- Maintain local user preferences (favorite cities, search history, temperature units) using `LocalStorage`.
- Maintain high accessibility, responsive design, robust error handling, and clean modular code.

---

## 4. Target Users

- **Daily Commuters & Travelers**: Need accurate weather forecasts and quick switching between saved locations.
- **Students & General Users**: Seeking an ad-free, minimal, visually pleasing dashboard on desktop and mobile.
- **Academic Evaluators**: Reviewing the project architecture, code quality, unit tests, and CI setup for a university final project.

---

## 5. User Flow

1. **Landing / Home View**:
   - The user opens WeatherWise.
   - The application begins with an empty welcome state prompting the user to search for a city.
   - The header/navigation displays quick access to saved Favorite Cities and Recent Searches (if available in LocalStorage).
2. **Searching for a City**:
   - The user enters a search query in the search bar.
   - A dropdown or results list appears showing matching cities with country, region/state, and coordinates.
   - The user clicks a city result.
3. **Viewing Weather**:
   - The app fetches current weather and 7-day forecast from Open-Meteo.
   - The dashboard displays the current weather card and daily forecast cards.
   - The city is automatically appended to Recent Searches in `LocalStorage`.
4. **Interacting with Dashboard**:
   - User toggles temperature unit (°C / °F) via header switch; all displayed temperatures update instantly.
   - User clicks the Star/Favorite icon to save/unsave the active city in `LocalStorage`.
   - User selects a favorite city from the quick access bar to load its weather instantly.

---

## 6. Scope

- Responsive single-page web application (React + Vite + React Router + CSS).
- Open-Meteo Geocoding API for city search.
- Open-Meteo Forecast API for weather metrics.
- Current weather view (Temperature, Feels Like, Humidity, Wind Speed, Weather Code Icon, Weather Description).
- 7-Day weather forecast view (Max/Min temp, Weather Icon, Weather Condition).
- Unit toggle: Celsius (°C) and Fahrenheit (°F).
- Persistence via `LocalStorage`: Favorite cities list and Recent searches list.
- Comprehensive UI states: Loading skeletons, empty welcome state, empty search results, API error banners, offline/network failure notices.
- Service layer modularization: `src/services/geocodingService.js`, `src/services/weatherService.js`, and `src/services/storageService.js`.
- Unit tests & GitHub Actions CI pipeline.

---

## 7. Out of Scope

- User authentication, login, or user account management.
- Backend server or database (SQLite, PostgreSQL, Firebase, etc.).
- Interactive maps (Leaflet, Mapbox, Google Maps).
- Historical weather data archive access.
- Real-time push notifications or active severe weather push alerts.
- Production hosting/deployment (deployment scripts or cloud hosting setup).

---

## 8. Functional Requirements

| ID        | Feature                  | Description                                                                                                                                                                               | Priority |
| --------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **FR-01** | City Search              | Users can enter a city name into a search bar to search for locations via Open-Meteo Geocoding API.                                                                                       | High     |
| **FR-02** | Search Results Selection | When multiple search results match a query, display a list showing city name, administrative region/state, and country for explicit selection.                                            | High     |
| **FR-03** | Current Weather Display  | Display current temperature, apparent temperature, humidity, wind speed, weather code description, and icon.                                                                              | High     |
| **FR-04** | 7-Day Forecast           | Display a 7-day forecast including daily high/low temperatures, day of the week, and weather condition icon.                                                                              | High     |
| **FR-05** | Temperature Unit Toggle  | Global toggle allowing users to switch between Celsius (°C) and Fahrenheit (°F) across all current and forecast views.                                                                    | Medium   |
| **FR-06** | Favorites System         | Users can bookmark/un-bookmark cities as favorites. Saved cities persist in `LocalStorage` and appear in a quick-access menu.                                                             | Medium   |
| **FR-07** | Recent Searches          | Automatically track the last 5 searched locations in `LocalStorage` for quick re-selection.                                                                                               | Medium   |
| **FR-08** | Navigation / Routing     | Use `React Router` to navigate between Main Dashboard (`/`), Favorites View (`/favorites`), and Not Found (`*`).                                                                          | Medium   |
| **FR-09** | State Feedback           | Show loading skeletons while fetching API data, empty welcome state on initial load, empty state graphics when search returns 0 results, and user-friendly error messages on API failure. | High     |

---

## 9. Non-Functional Requirements

| ID         | Category           | Requirement                                                                                                                                                                                                          |
| ---------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **NFR-01** | Performance        | The UI remains responsive and provides immediate loading feedback (e.g., skeletons/spinners) during async requests. Initial page render time under 1 second.                                                         |
| **NFR-02** | Responsiveness     | Fluid layout supporting breakpoints for Mobile (<600px), Tablet (600px–1024px), and Desktop (>1024px).                                                                                                               |
| **NFR-03** | Usability          | Clear typography, high contrast colors, accessible ARIA roles on buttons/inputs, keyboard navigation support.                                                                                                        |
| **NFR-04** | Maintainability    | Modular component structure, separated service utilities (`src/services/geocodingService.js`, `src/services/weatherService.js`, `src/services/storageService.js`), clean CSS styling without external UI frameworks. |
| **NFR-05** | Persistence Safety | Safe `LocalStorage` read/write handlers with JSON parsing try/catch blocks and fallback to empty defaults.                                                                                                           |
| **NFR-06** | Reliability        | Graceful handling of failed API requests, missing or malformed API data, and corrupted LocalStorage values without crashing the visible application.                                                                 |

---

## 10. Technical Stack

- **Framework**: React 18+
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)
- **Routing**: React Router v6+
- **Styling**: Vanilla CSS (CSS Modules / Custom Properties / Flexbox / Grid)
- **API Fetching**: Native Web Fetch API
- **Services**:
  - `src/services/geocodingService.js` (Open-Meteo Geocoding API handler)
  - `src/services/weatherService.js` (Open-Meteo Forecast API handler)
  - `src/services/storageService.js` (LocalStorage helper utility)
- **State Management**: React Context / Hooks (`useState`, `useEffect`, `useContext`)
- **Storage**: Browser `LocalStorage` API
- **Testing**: Vitest + React Testing Library
- **CI**: GitHub Actions workflow (`.github/workflows/ci.yml`)

---

## 11. APIs Used

### 11.1 Open-Meteo Geocoding API

- **Endpoint**: `https://geocoding-api.open-meteo.com/v1/search`
- **Method**: `GET`
- **QueryParams**:
  - `name` (string, required): Search term (e.g., `London`)
  - `count` (number, optional): Max results (default `10`)
  - `language` (string, optional): Language code (default `en`)
  - `format` (string, optional): Output format (`json`)
- **Sample Request**:
  `GET https://geocoding-api.open-meteo.com/v1/search?name=London&count=5&language=en&format=json`

### 11.2 Open-Meteo Weather Forecast API

- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **Method**: `GET`
- **QueryParams**:
  - `latitude` (float, required)
  - `longitude` (float, required)
  - `current` (string): `temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`
  - `daily` (string): `weather_code,temperature_2m_max,temperature_2m_min`
  - `temperature_unit` (string): `celsius` or `fahrenheit`
  - `timezone` (string): `auto`
- **Sample Request**:
  `GET https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`

---

## 12. Main Data Models

### City Location Model

```json
{
  "id": 2643743,
  "name": "London",
  "latitude": 51.50853,
  "longitude": -0.12574,
  "country": "United Kingdom",
  "admin1": "England",
  "countryCode": "GB"
}
```

### Weather Data Model

```json
{
  "current": {
    "temperature": 18.5,
    "apparentTemperature": 17.2,
    "humidity": 65,
    "windSpeed": 12.4,
    "weatherCode": 1,
    "conditionText": "Mainly Clear",
    "icon": "weather-sunny"
  },
  "daily": [
    {
      "date": "2026-07-19",
      "dayOfWeek": "Sunday",
      "tempMax": 22.1,
      "tempMin": 14.0,
      "weatherCode": 0,
      "conditionText": "Clear Sky",
      "icon": "weather-sunny"
    }
  ]
}
```

---

## 13. LocalStorage Strategy

| Key                     | Description                | Data Structure                         | Fallback    |
| ----------------------- | -------------------------- | -------------------------------------- | ----------- |
| `weatherwise_favorites` | Saved favorite cities      | Array of `City` objects                | `[]`        |
| `weatherwise_recents`   | Last 5 searched cities     | Array of `City` objects                | `[]`        |
| `weatherwise_unit`      | Preferred temperature unit | String (`"celsius"` \| `"fahrenheit"`) | `"celsius"` |

---

## 14. Error Handling

1. **Failed API Requests / Offline**: Display user-friendly error card or offline banner notifying the user to check their network connection, with a "Retry" button.
2. **Missing or Malformed API Data**: Service layer validates API response fields, providing default fallbacks without crashing the visible application.
3. **Corrupted LocalStorage Values**: Utility in `src/services/storageService.js` wraps JSON parsing in try/catch blocks, resetting corrupted items to safe fallbacks (`[]` or default unit) without crashing the application.
4. **City Not Found**: Display a friendly empty state message when a search returns zero results ("No locations found matching 'xyz'").

---

## 15. Definition of Done (DoD)

- All Functional Requirements (FR-01 to FR-09) and Non-Functional Requirements are implemented.
- Application passes all Vitest unit and component tests.
- Zero ESLint warnings/errors.
- GitHub Actions CI build passes successfully.
- Complex service and utility functions include concise comments where needed.
- `README.md` and `tasks.md` are up to date.

---

## 16. Wireframe Blueprint

```
+-----------------------------------------------------------------------------------+
|  [Logo] WeatherWise               [Search City Input... [Search]]   [ °C | °F ]   |
+-----------------------------------------------------------------------------------+
|  Quick Links / Favorites: [ London ★ ] [ New York ★ ] [ Tokyo ★ ]                |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | WELCOME TO WEATHERWISE                                                       |  |
|  | Please search for a city above to view current weather and 7-day forecast.    |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  +-------------------------------------+  +------------------------------------+  |
|  | CURRENT WEATHER: London, UK         |  | RECENT SEARCHES                    |  |
|  |                                     |  |                                    |  |
|  |       [ ☀️  18.5 °C ]               |  |  • Paris, France                   |  |
|  |       Mainly Clear                  |  |  • Sydney, Australia               |  |
|  |                                     |  |  • Toronto, Canada                 |  |
|  | Feels Like: 17.2°C | Humidity: 65%  |  +------------------------------------+  |
|  | Wind Speed: 12.4 km/h               |                                      |
|  | [ ★ Save as Favorite ]              |                                      |
|  +-------------------------------------+                                      |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | 7-DAY FORECAST                                                              |  |
|  |                                                                             |  |
|  | [Sun]        [Mon]        [Tue]        [Wed]        [Thu]        [Fri]        |  |
|  |  ☀️           🌤️           🌧️           🌤️           ☀️           🌦️        |  |
|  | 22° / 14°   20° / 13°   17° / 11°   19° / 12°   23° / 15°   18° / 10°    |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
+-----------------------------------------------------------------------------------+
| Footer: WeatherWise © 2026 — University Final Project | Data by Open-Meteo         |
+-----------------------------------------------------------------------------------+
```
