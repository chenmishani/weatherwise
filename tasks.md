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

- [x] **TASK-05**: Implement city search and selection flow
  - **Commit Message**: `feat: implement city search and selection flow [TASK-05]`
  - **Scope**: Create `SearchBar.jsx`, `SearchResults.jsx`, `SearchResultItem.jsx`, and `useDebounce.js` integrating Open-Meteo geocoding search.
  - **Category**: City search

- [x] **TASK-06**: Fetch and display current weather for selected city
  - **Commit Message**: `feat: fetch and display current weather for selected city [TASK-06]`
  - **Scope**: Create `CurrentWeather.jsx` component and `weatherCodes.js` utility; integrate `getWeatherByCoordinates` with state separation and AbortController request protection.
  - **Category**: Current weather

- [x] **TASK-07**: Display seven-day weather forecast
  - **Commit Message**: `feat: display seven-day weather forecast [TASK-07]`
  - **Scope**: Create `Forecast.jsx` and `ForecastDay.jsx` components and `formatDate.js` utility reusing `weatherData.daily` response.
  - **Category**: Forecast

- [x] **TASK-08**: Persist and display recent city searches
  - **Commit Message**: `feat: persist and display recent city searches [TASK-08]`
  - **Scope**: Create `storageService.js` and `RecentSearches.jsx` to persist and display up to 5 recently selected cities using LocalStorage.
  - **Category**: Recent searches

- [x] **TASK-09**: Implement favorite cities and favorites page
  - **Commit Message**: `feat: implement favorite cities and favorites page [TASK-09]`
  - **Scope**: Extend `storageService.js` with favorite cities helpers, activate `FavoritesPage.jsx`, add favorite toggle button in `CurrentWeather.jsx`, and link navigation to Home dashboard.
  - **Category**: Favorites

- [x] **TASK-10**: Implement temperature unit toggle (°C / °F)
  - **Commit Message**: `feat: add temperature unit preference and local conversion [TASK-10]`
  - **Scope**: Create `temperature.js` and `TemperatureUnitToggle.jsx`, extend `storageService.js` with unit storage, and format all temperatures dynamically without extra API requests.
  - **Category**: Units

- [x] **TASK-11**: Improve loading states and user experience
  - **Commit Message**: `feat: improve loading states and user experience [TASK-11]`
  - **Scope**: Create `LoadingIndicator.jsx`, `ErrorMessage.jsx`, and `EmptyState.jsx` components; enhance loading spinner transitions, accessibility roles, and error banner consistency across the app.
  - **Category**: UX / Polish

- [x] **TASK-12**: Improve responsive layout and visual consistency
  - **Commit Message**: `style: improve responsive layout and visual consistency [TASK-12]`
  - **Scope**: Enhance CSS flexbox/grid layout, fluid typography, touch target padding, focus outlines, word wrapping, and reduced-motion accessibility rules across viewports.
  - **Category**: Responsiveness / Styling

- [x] **TASK-13**: Clean up application structure and shared logic
  - **Commit Message**: `refactor: clean up application structure and shared logic [TASK-13]`
  - **Scope**: Extract `formatLocationLabel` utility and custom hooks (`useCitySearch`, `useCityWeather`), centralize LocalStorage keys and custom event constants, and optimize CSS cascade.
  - **Category**: Refactoring / Architecture

- [x] **TASK-14**: Add automated test suite for core application logic
  - **Commit Message**: `test: add automated test suite for core application logic [TASK-14]`
  - **Scope**: Configure Vitest and React Testing Library; create test suites for utilities, storage service, and components including SearchBar keyboard interactions.
  - **Category**: Testing / Automated QA

- [x] **TASK-15**: Add GitHub Actions CI quality check workflow
  - **Commit Message**: `ci: add GitHub Actions quality checks [TASK-15]`
  - **Scope**: Configure `.github/workflows/ci.yml` to run format:check, lint, test:run, and build on Node.js 20 on every push and pull request.
  - **Category**: CI/CD / Automation

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
| **TASK-05** | City search & selection flow        | Completed | Pending commit     | FR-01, FR-02                |
| **TASK-06** | Fetch & display current weather     | Completed | Pending commit     | FR-03, NFR-01, NFR-06       |
| **TASK-07** | Display 7-day weather forecast      | Completed | Pending commit     | FR-04, NFR-02               |
| **TASK-08** | Persist recent city searches        | Completed | Pending commit     | FR-07, NFR-05               |
| **TASK-09** | Favorite cities & favorites page    | Completed | Pending commit     | FR-06                       |
| **TASK-10** | Celsius / Fahrenheit unit toggle    | Completed | Pending commit     | FR-05                       |
| **TASK-11** | UI loading skeletons & error states | Completed | Pending commit     | FR-09, NFR-06               |
| **TASK-12** | Responsive CSS styling & polish     | Completed | Pending commit     | NFR-02, NFR-03, NFR-04      |
| **TASK-13** | Code cleanup & architecture pass    | Completed | Pending commit     | NFR-05, NFR-06              |
| **TASK-14** | Automated test suite (Vitest + RTL) | Completed | Pending commit     | NFR-05, DoD                 |
| **TASK-15** | GitHub Actions CI pipeline          | Completed | Pending commit     | DoD Requirement             |
| **TASK-16** | GitHub Actions CI pipeline          | Pending   | Pending commit     | DoD Requirement             |
| **TASK-17** | Final README & documentation review | Pending   | Pending commit     | DoD Requirement             |
