# 🌤️ WeatherWise

> **University Final Project** — A responsive, modern weather dashboard web application built with React, Vite, and the Open-Meteo API.

---

## 📌 Overview

**WeatherWise** is a lightweight single-page web application that provides real-time weather metrics and a 7-day forecast for locations around the globe. Designed with a privacy-first approach, it relies entirely on client-side storage (`LocalStorage`) for user preferences such as favorite cities, search history, and temperature unit settings—requiring no user accounts, backend server, or tracking.

> ⚠️ **Project Status**: Application foundation initialized (React + Vite + ESLint + Prettier). Feature implementation begins in TASK-03.

---

## 🛠️ Planned Technologies

- **Frontend Library**: React 18+
- **Build Tool & Dev Server**: Vite
- **Language**: JavaScript (ES6+)
- **Routing**: React Router v6
- **Styling**: Vanilla CSS (CSS Modules & Custom Properties)
- **Data Fetching**: Native Web `Fetch API`
- **State Persistence**: Browser `LocalStorage` API
- **Testing Framework**: Vitest & React Testing Library
- **Continuous Integration**: GitHub Actions CI (`.github/workflows/ci.yml`)

---

## 🌐 APIs Used

WeatherWise uses the free and open [Open-Meteo](https://open-meteo.com/) APIs (no API key required):

1. **Open-Meteo Geocoding API**
   - Endpoint: `https://geocoding-api.open-meteo.com/v1/search`
   - Purpose: Real-time search and geocoding auto-complete for city names, returning matching cities with latitude, longitude, region, and country code.

2. **Open-Meteo Weather Forecast API**
   - Endpoint: `https://api.open-meteo.com/v1/forecast`
   - Purpose: Fetching current weather metrics (temperature, apparent temperature, humidity, wind speed, weather condition) and 7-day daily forecasts (daily max/min temperatures, weather codes).

---

## 📁 Planned Project Structure

```
weatherwise/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI configuration (TASK-16)
├── PRD.md                         # Product Requirements Document (TASK-01)
├── tasks.md                       # Task Roadmap & Commit Matrix (TASK-01)
├── README.md                      # Project documentation (TASK-01)
├── index.html                     # HTML entry point (TASK-02)
├── vite.config.js                 # Vite build configuration (TASK-02)
├── package.json                   # Project dependencies and scripts (TASK-02)
└── src/
    ├── main.jsx                   # React application entry point (TASK-02)
    ├── App.jsx                    # Root App component with React Router (TASK-03)
    ├── components/                # Reusable UI components
    │   ├── Header.jsx             # Top bar navigation & logo (TASK-03)
    │   ├── SearchBar.jsx          # City search input (TASK-06)
    │   ├── SearchResults.jsx      # Multi-result location picker (TASK-07)
    │   ├── CurrentWeather.jsx     # Current weather card (TASK-08)
    │   ├── ForecastList.jsx       # 7-day forecast container (TASK-09)
    │   ├── ForecastCard.jsx       # Single day forecast card (TASK-09)
    │   ├── UnitToggle.jsx         # °C / °F toggle switch (TASK-10)
    │   ├── RecentSearches.jsx     # Recent search history bar (TASK-12)
    │   └── LoadingSkeleton.jsx    # Loading skeletons & error states (TASK-13)
    ├── context/                   # React Context Providers
    │   └── WeatherContext.jsx     # App state (unit, active city, recents, favorites) (TASK-10)
    ├── services/                  # External API & LocalStorage handlers
    │   ├── geocodingService.js    # Geocoding API service (TASK-04)
    │   ├── weatherService.js      # Weather Forecast API service (TASK-04)
    │   └── storageService.js      # LocalStorage helper functions (TASK-05)
    ├── pages/                     # Route pages
    │   ├── Home.jsx               # Dashboard main page
    │   ├── FavoritesPage.jsx      # Dedicated saved cities page
    │   └── NotFound.jsx           # 404 page
    └── styles/                    # Styling files
        ├── variables.css          # CSS theme variables & design tokens
        └── main.css               # Global layout and responsive styles
```

---

## 🚀 Local Development Instructions

> ⚠️ **Note**: Application foundation has been initialized (TASK-02). You can run dev, build, lint, and format scripts as shown below.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (v9.0.0 or higher)

### Setup Steps (Pending TASK-02)

```bash
# 1. Clone the repository
git clone https://github.com/your-username/weatherwise.git

# 2. Navigate to project root
cd weatherwise

# 3. Install project dependencies
npm install

# 4. Start Vite development server
npm run dev

# 5. Run test suite
npm run test
```

---

## 📑 Core Documentation References

- **Product Requirements Document**: See [PRD.md](./PRD.md) for detailed user flows, functional/non-functional requirements, data models, error handling, and wireframes.
- **Task Implementation Roadmap**: See [tasks.md](./tasks.md) for the complete list of ordered tasks, commit message conventions, and traceability matrix.

---

## 📄 License

Created for academic evaluation purposes as a University Final Project.
