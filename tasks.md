# Implementation Tasks & Roadmap — WeatherWise

This document tracks all step-by-step tasks required to implement the WeatherWise web application. Each task corresponds to a single logical Git commit in sequential order.

---

## Task Progress Checklist

- [x] **TASK-01**: Define product requirements and documentation
  - **Commit Message**: `docs: define product requirements [TASK-01]`
  - **Scope**: Create `PRD.md`, `tasks.md`, and initial `README.md`.
  - **Category**: Documentation

- [x] **TASK-02**: Initialize React Vite project structure
  - **Commit Message**: `chore: initialize React Vite project structure with ESLint and Prettier [TASK-02]`
  - **Scope**: Setup Vite React project, package dependencies, ESLint, Prettier, folder layout (`src/components`, `src/services`, `src/context`, `src/hooks`, `src/pages`, `src/styles`).
  - **Category**: Project initialization

- [x] **TASK-03**: Setup React Router navigation and layout
  - **Commit Message**: `feat: setup React Router navigation and app layout skeleton [TASK-03]`
  - **Scope**: Configure React Router v6 routes (`/`, `/favorites`, `*`), Main Layout, Header, Navigation links, and Footer.
  - **Category**: Routing

- [x] **TASK-04**: Implement Open-Meteo API integration services
  - **Commit Message**: `feat: implement Open-Meteo API integration services [TASK-04]`
  - **Scope**: Build `src/services/weatherService.js` and `src/services/geocodingService.js` fetching functions with parameter formatting and response transformations.
  - **Category**: Weather service

- [ ] **TASK-05**: Implement LocalStorage helper utilities
  - **Commit Message**: `feat: implement LocalStorage helper utilities for state persistence [TASK-05]`
  - **Scope**: Build `src/services/storageService.js` with safe getters/setters for favorites, recent searches, and unit preferences with JSON error wrapping.
  - **Category**: LocalStorage / Persistence

- [ ] **TASK-06**: Build city search bar component
  - **Commit Message**: `feat: build city search bar component with auto-suggest menu [TASK-06]`
  - **Scope**: Create `SearchBar.jsx` component with debounced search input and live query handling.
  - **Category**: City search

- [ ] **TASK-07**: Implement multiple search results selection view
  - **Commit Message**: `feat: implement multiple search results selection view [TASK-07]`
  - **Scope**: Create `SearchResults.jsx` to list matching cities (showing city, state/region, country) and handle location selection.
  - **Category**: City search

- [ ] **TASK-08**: Create current weather display card component
  - **Commit Message**: `feat: create current weather display card component [TASK-08]`
  - **Scope**: Build `CurrentWeather.jsx` rendering temperature, feels like, humidity, wind speed, weather code icons, and condition text.
  - **Category**: Current weather

- [ ] **TASK-09**: Build 7-day forecast cards component
  - **Commit Message**: `feat: build 7-day forecast cards component [TASK-09]`
  - **Scope**: Create `ForecastList.jsx` and `ForecastCard.jsx` displaying daily weather icons, weekday names, and max/min temperatures.
  - **Category**: Forecast

- [ ] **TASK-10**: Implement temperature unit toggle (°C / °F)
  - **Commit Message**: `feat: implement temperature unit toggle (Celsius/Fahrenheit) [TASK-10]`
  - **Scope**: Create `UnitToggle.jsx` component and unit context to instantly convert displayed values across the entire dashboard.
  - **Category**: Temperature units

- [ ] **TASK-11**: Implement favorite cities bookmarking system
  - **Commit Message**: `feat: implement favorite cities bookmarking system [TASK-11]`
  - **Scope**: Add star bookmark icon on weather view, sync with `LocalStorage`, and display quick-access favorites bar and dedicated route.
  - **Category**: Favorites

- [ ] **TASK-12**: Implement recent search history tracking
  - **Commit Message**: `feat: implement recent search history tracking [TASK-12]`
  - **Scope**: Create `RecentSearches.jsx` to store and display the last 5 searched locations for quick re-fetching.
  - **Category**: Recent searches

- [ ] **TASK-13**: Add loading skeletons, empty results, and error state UI
  - **Commit Message**: `feat: add loading skeletons, empty search results, and error state UI [TASK-13]`
  - **Scope**: Create skeleton loader components, empty welcome state on initial load, "No cities found" graphic, and network error banners with Retry actions.
  - **Category**: Error handling / UI States

- [ ] **TASK-14**: Implement responsive CSS layout and visual polish
  - **Commit Message**: `feat: implement responsive CSS layout, weather-themed color system, and visual polish [TASK-14]`
  - **Scope**: Refine responsive flex/grid layouts, CSS custom properties, weather-themed color system, smooth transitions, and glassmorphism styling across all viewports.
  - **Category**: Responsive styling

- [ ] **TASK-15**: Add unit and integration tests
  - **Commit Message**: `test: add unit and integration tests for services and components [TASK-15]`
  - **Scope**: Configure Vitest and React Testing Library; test API services (`src/services/geocodingService.js`, `src/services/weatherService.js`), `src/services/storageService.js`, `UnitToggle`, and `SearchBar`.
  - **Category**: Testing

- [ ] **TASK-16**: Configure GitHub Actions CI workflow
  - **Commit Message**: `ci: configure GitHub Actions workflow for automated tests and build [TASK-16]`
  - **Scope**: Create `.github/workflows/ci.yml` running linting, tests, and Vite production build on push and PR.
  - **Category**: GitHub Actions CI

- [ ] **TASK-17**: Complete README documentation review and final verification
  - **Commit Message**: `docs: complete README setup instructions and architecture review [TASK-17]`
  - **Scope**: Update `README.md` with finalized project screenshots, verified setup commands, architecture review, and DoD confirmation.
  - **Category**: Documentation review

---

## Traceability & Commit Mapping Matrix

| Task ID     | Task Description                    | Status    | Target Commit Hash | Linked Requirements         |
| ----------- | ----------------------------------- | --------- | ------------------ | --------------------------- |
| **TASK-01** | Define product requirements & docs  | Completed | Pending commit     | N/A (Project Planning)      |
| **TASK-02** | Initialize React Vite project       | Completed | Pending commit     | N/A (Foundation)            |
| **TASK-03** | React Router & layout skeleton      | Completed | Pending commit     | FR-08, NFR-02               |
| **TASK-04** | Open-Meteo API integration          | Completed | Pending commit     | FR-01, FR-03, FR-04, NFR-01 |
| **TASK-05** | LocalStorage helper utilities       | Pending   | Pending commit     | NFR-05                      |
| **TASK-06** | City search bar component           | Pending   | Pending commit     | FR-01, NFR-03               |
| **TASK-07** | Search results selection view       | Pending   | Pending commit     | FR-02                       |
| **TASK-08** | Current weather card component      | Pending   | Pending commit     | FR-03, NFR-02               |
| **TASK-09** | 7-day forecast cards component      | Pending   | Pending commit     | FR-04, NFR-02               |
| **TASK-10** | Celsius / Fahrenheit unit toggle    | Pending   | Pending commit     | FR-05                       |
| **TASK-11** | Favorite cities bookmark system     | Pending   | Pending commit     | FR-06                       |
| **TASK-12** | Recent searches history tracking    | Pending   | Pending commit     | FR-07                       |
| **TASK-13** | UI loading skeletons & error states | Pending   | Pending commit     | FR-09, NFR-06               |
| **TASK-14** | Responsive CSS styling & polish     | Pending   | Pending commit     | NFR-02, NFR-03, NFR-04      |
| **TASK-15** | Vitest unit and component tests     | Pending   | Pending commit     | DoD Requirement             |
| **TASK-16** | GitHub Actions CI pipeline          | Pending   | Pending commit     | DoD Requirement             |
| **TASK-17** | Final README & documentation review | Pending   | Pending commit     | DoD Requirement             |
