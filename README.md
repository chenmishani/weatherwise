# 🌤️ WeatherWise

A modern, lightweight React web application for real-time weather metrics, location search, and 7-day weather forecasts across the globe. Built with a privacy-first, client-side persistence architecture requiring no user accounts, backend servers, or API keys.

- **Repository**: [https://github.com/chenmishani/weatherwise](https://github.com/chenmishani/weatherwise)
- **Live Demo**: [https://chenmishani.github.io/weatherwise/](https://chenmishani.github.io/weatherwise/)

> ✅ **Project Status**: All project requirements, automated test suite, GitHub Actions CI, GitHub Pages deployment, and final submission audit completed (`TASK-17`).

---

## 📌 Overview & Main Features

**WeatherWise** provides an intuitive, responsive interface for discovering and monitoring weather conditions worldwide. Powered by the Open-Meteo APIs, it features client-side persistence using browser `LocalStorage` to save user preferences, search history, and favorite locations.

### Key Features

- **Global Location Search**: Fast autocomplete search for cities worldwide with country flags and administrative region details.
- **Accessible Keyboard Navigation**: Complete `ArrowDown`, `ArrowUp`, `Enter`, and `Escape` keyboard controls for autocomplete results.
- **Real-Time Current Weather**: Displays temperature, feels-like temperature, humidity, wind speed, observation timestamp, and condition descriptions.
- **Condition-Aware Atmospheric Backgrounds**: Dynamic SVG atmospheric illustrations tailored to weather conditions and day/night state.
- **7-Day Forecast Grid**: Deterministic responsive 4+3 forecast grid layout on desktop, adapting seamlessly to tablet and mobile.
- **Temperature Unit Conversion**: Toggle between Celsius (°C) and Fahrenheit (°F) with persistent user preference.
- **Favorite Locations**: Bookmarking system to save favorite cities for quick navigation.
- **Recent Searches**: Quick-access chip list tracking the 5 most recently selected locations.
- **Sticky Header & Auto-Scroll**: Sticky top navigation bar and smooth automatic scrolling to weather results upon city selection.
- **Fully Responsive & Accessible**: Built with standard CSS custom properties, screen-reader alert/status roles, `:focus-visible` outline rings, and `prefers-reduced-motion` support.

---

## 🛠️ Technology Stack

- **Frontend Library**: React 18+
- **Build Tool & Dev Server**: Vite
- **Language**: JavaScript (ES6+)
- **Routing**: React Router v6
- **Styling**: Vanilla CSS (Custom Properties, Flexbox, & CSS Grid)
- **Data Fetching**: Native Web `Fetch API` with `AbortController` request cancellation
- **Persistence**: Web `LocalStorage API`
- **Data APIs**: Open-Meteo Geocoding API & Open-Meteo Forecast API
- **Automated Testing**: Vitest, React Testing Library, `@testing-library/jest-dom`, `jsdom`
- **Code Quality**: ESLint, Prettier
- **Continuous Integration**: GitHub Actions

---

## 🌐 APIs Used

WeatherWise integrates with Open-Meteo public APIs requiring **no API keys or authentication**:

1. **Open-Meteo Geocoding API**
   - **Endpoint**: `https://geocoding-api.open-meteo.com/v1/search`
   - **Purpose**: Converts city search query strings into normalized location objects containing name, country, ISO country code, administrative region (`admin1`), latitude, longitude, and timezone.
2. **Open-Meteo Forecast API**
   - **Endpoint**: `https://api.open-meteo.com/v1/forecast`
   - **Purpose**: Retrieves current weather metrics (`temperature_2m`, `apparent_temperature`, `relative_humidity_2m`, `is_day`, `weather_code`, `wind_speed_10m`) and 7-day daily forecast ranges (`temperature_2m_max`, `temperature_2m_min`, `weather_code`).

---

## 📦 Installation & Running Instructions

### Prerequisites

- **Node.js**: `v20.0.0` or higher
- **npm**: `v10.0.0` or higher

### Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/chenmishani/weatherwise.git

# 2. Navigate into the project directory
cd weatherwise

# 3. Install dependencies deterministically
npm ci

# 4. Start the local development server
npm run dev
```

The application will be available at `http://localhost:5173/` (or the next available port).

---

## 🚀 Development & Verification Commands

| Command                | Description                                                                                                                          |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`          | Starts Vite local development server with hot module replacement (HMR).                                                              |
| `npm run format`       | Formats all source files across the project using Prettier.                                                                          |
| `npm run format:check` | Verifies code formatting compliance without modifying files.                                                                         |
| `npm run lint`         | Runs ESLint to check for code quality and syntax issues.                                                                             |
| `npm run test`         | Launches Vitest test runner in interactive watch mode.                                                                               |
| `npm run test:run`     | Runs the full automated test suite once in non-watch mode.                                                                           |
| `npm run build`        | Compiles production bundle to the `dist/` directory.                                                                                 |
| `npm run check`        | Executes full CI verification sequence locally (`format:check` $\rightarrow$ `lint` $\rightarrow$ `test:run` $\rightarrow$ `build`). |

---

## 📁 Project Structure

```text
weatherwise/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI quality pipeline
├── public/
│   └── weather-backgrounds/     # Vector SVG atmospheric background assets
├── src/
│   ├── components/              # Reusable presentation components
│   │   ├── CurrentWeather.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── Footer.jsx
│   │   ├── Forecast.jsx
│   │   ├── ForecastDay.jsx
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   ├── LoadingIndicator.jsx
│   │   ├── RecentSearches.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SearchResultItem.jsx
│   │   ├── SearchResults.jsx
│   │   └── TemperatureUnitToggle.jsx
│   ├── hooks/                   # Custom React hooks
│   │   ├── useCitySearch.js
│   │   ├── useCityWeather.js
│   │   └── useDebounce.js
│   ├── pages/                   # Application route views
│   │   ├── FavoritesPage.jsx
│   │   ├── Home.jsx
│   │   └── NotFound.jsx
│   ├── services/                # API integration & LocalStorage service layer
│   │   ├── apiConfig.js
│   │   ├── geocodingService.js
│   │   ├── storageService.js
│   │   └── weatherService.js
│   ├── styles/                  # CSS tokens, base styles, & responsive layout
│   │   ├── main.css
│   │   └── variables.css
│   ├── tests/                   # Vitest & React Testing Library test suite
│   │   ├── components/
│   │   ├── services/
│   │   ├── utils/
│   │   └── setup.js
│   ├── utils/                   # Shared utility modules
│   │   ├── countryFlag.js
│   │   ├── formatDate.js
│   │   ├── formatLocation.js
│   │   ├── temperature.js
│   │   └── weatherCodes.js
│   ├── App.jsx                  # React Router routes definition
│   └── main.jsx                 # Application entry point
├── index.html
├── package.json
├── vite.config.js
├── tasks.md
├── PRD.md
└── README.md
```

---

## 🏗️ Application Architecture Overview

- **View & Hook Separation**: `Home.jsx` delegates search lifecycle and weather fetching to focused custom hooks (`useCitySearch`, `useCityWeather`), ensuring clean separation between data fetching and UI rendering.
- **Race Condition Safeguards**: Asynchronous geocoding and weather API requests employ `AbortController` instances to automatically cancel pending requests when queries change or components unmount.
- **Decoupled Service Layer**: API network calls and LocalStorage read/write logic are isolated in `src/services/` without framework dependencies.
- **Centralized Utilities**: Location string formatting, date formatting, temperature unit conversions, WMO code descriptions, and country flag generation are maintained in `src/utils/`.

---

## 🚦 Routing Overview

Routing is managed by **React Router v6** inside `App.jsx` with a consistent `<Layout>` shell:

- `/` (**Home**): Main dashboard containing location search, recent search chips, current weather presentation, and 7-day forecast.
- `/favorites` (**FavoritesPage**): Grid of saved favorite cities with instant location removal and quick navigation back to Home.
- `*` (**NotFound**): Friendly 404 error page for unrecognized URL paths.

---

## 💾 LocalStorage Behavior

All user data persists locally in the browser via `src/services/storageService.js`:

- `weatherwise_recent_searches`: Stores up to 5 recently selected city objects (placed newest first, deduplicated by `id`).
- `weatherwise_favorite_cities`: Stores bookmarked favorite city objects (deduplicated by `id`).
- `weatherwise_temperature_unit`: Persists temperature preference (`'celsius'` or `'fahrenheit'`).

_Note_: Malformed JSON or restricted storage environments fail gracefully without throwing unhandled exceptions. Custom window events (`weatherwise_favorites_updated`) keep route views in sync.

---

## 🧪 Testing & Quality Assurance

Automated testing is configured using **Vitest** and **React Testing Library**:

- **Test Suite**: **48 automated tests** passing across **11 test files**.
- **Coverage Areas**:
  - `temperature.js`: Celsius to Fahrenheit conversion, rounding, and display formatting.
  - `countryFlag.js`: ISO country code to Unicode flag emoji mapping and fallback globe `🌍`.
  - `formatLocation.js`: Location string construction for cities, regions, and countries.
  - `weatherCodes.js`: WMO code descriptions and day/night SVG background mapping.
  - `storageService.js`: Favorites, recent searches, unit storage, duplicate prevention, and malformed JSON recovery.
  - `Components`: Controlled inputs, button clicks, status/alert roles, and `SearchBar` keyboard navigation (`ArrowDown`, `ArrowUp`, `Enter`, `Escape`).

---

## ⚙️ Continuous Integration (CI)

A GitHub Actions CI workflow is configured in `.github/workflows/ci.yml`.

On every `push` and `pull_request` to `main` and `master` branches, the runner executes on `ubuntu-latest` with Node.js 20:

1. `npm ci` (Deterministic dependency installation)
2. `npm run format:check` (Prettier code style check)
3. `npm run lint` (ESLint static code inspection)
4. `npm run test:run` (Automated Vitest test suite)
5. `npm run build` (Production bundle build compilation)

---

## 🚀 Deployment

Automatic deployment to **GitHub Pages** is configured in `.github/workflows/deploy-pages.yml`.

- **Live URL**: [https://chenmishani.github.io/weatherwise/](https://chenmishani.github.io/weatherwise/)
- **Trigger**: Pushes to `main` branch or manual `workflow_dispatch`.
- **Process**: Builds the production bundle with base path `/weatherwise/` and deploys static assets using official GitHub Actions (`actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`).

---

## ♿ Accessibility & Responsive Design

- **Accessibility**: ARIA combobox and listbox attributes (`role="combobox"`, `role="listbox"`, `role="option"`, `aria-activedescendant`), alert/status announcement regions (`role="alert"`, `role="status"`), `:focus-visible` focus rings, and `@media (prefers-reduced-motion: reduce)` animation adjustments.
- **Responsive Layout**: Mobile-first CSS flexbox and grid layouts, sticky header navigation, fluid typography (`clamp()`), and text wrapping rules preventing horizontal overflow across desktop, tablet, and mobile devices.

---

## ⚠️ Known Limitations

- **API Dependency**: Weather accuracy depends on upstream Open-Meteo API availability.
- **Connectivity**: Requires an active internet connection (no offline service worker caching).
- **Client Storage Only**: Favorites and recent searches are tied to the local browser instance (no cloud user accounts).

---

## 🔮 Future Improvement Ideas

- Geolocation-based weather fetching ("Use Current Location").
- Hourly weather forecast and precipitation chance charts.
- Severe weather alert banner notifications.
- Offline Progressive Web App (PWA) support.
- One-click deployment pipeline to GitHub Pages or Vercel.

---

## 🎓 Academic Project Note

This project was developed as an academic final project demonstrating modern React architecture, clean code practices, client-side storage patterns, accessibility standards, automated testing, and CI/CD automation.
