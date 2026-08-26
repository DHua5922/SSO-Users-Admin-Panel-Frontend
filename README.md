[![Continuous Integration](https://github.com/DHua5922/SSO-Users-Admin-Panel-Frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/DHua5922/SSO-Users-Admin-Panel-Frontend/actions/workflows/ci.yml)

# SSO Users Admin Panel Frontend

A React admin panel for managing users and roles. It connects to a separate backend API and supports normal login and guest login.

## Table of Contents

- [Live Site](#live-site)
- [Related Repository](#related-repository)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Run Locally](#run-locally)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Automated Testing](#automated-testing)
- [Accessibility](#accessibility)
- [Continuous Integration](#continuous-integration)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [State and Data](#state-and-data)
- [Design Decisions and Tradeoffs](#design-decisions-and-tradeoffs)
- [What I Would Improve](#what-i-would-improve)
- [License](#license)
- [Deployment](#deployment)

## Live Site

[Open the deployed app](https://sso-users-admin-panel-frontend.vercel.app/).

## Related Repository

The backend API is maintained separately:

- [SSO Users Admin Panel — Backend](https://github.com/DHua5922/SSO-Users-Admin-Panel-Backend)

## Features

- View dashboard totals for users and roles
- Add, edit, search, filter, and delete users
- Add, edit, search, and delete roles
- Prevent deletion of system-managed users and roles
- Log in with an account or as a guest
- Refresh expired login tokens
- Switch between light and dark themes
- Use protected routes for signed-in users
- Show loading, empty, success, and error states
- Support keyboard use and screen readers
- Keep client-side routes working after a Vercel page refresh

## Tech Stack

- React and TypeScript — user interface and type-safe code
- Vite — development server and production builds
- React Router — client-side routing and protected routes
- TanStack Query — server-state fetching, caching, and synchronization
- Zustand — shared UI state
- React Hook Form and Zod — form state and validation
- Axios — backend API requests
- Tailwind CSS and CSS Modules — component styling
- Vitest and React Testing Library — unit and component tests
- Mock Service Worker — API mocking for integration tests
- Playwright — end-to-end and accessibility tests
- axe-core — automated accessibility checks
- bundlesize — gzip-compressed JavaScript and CSS size budgets
- Biome, TypeScript, and Knip — formatting, linting, type checking, and unused-code detection

## Requirements

- Node.js 24
- pnpm 11
- A running backend API that works with this frontend

## Run Locally

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create a `.env` file in the project root:

   ```env
   VITE_BACKEND_BASE_URL=http://localhost:8080
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open `http://localhost:5173`.

Environment files are ignored by Git. Do not put secrets in variables that start with `VITE_`. Vite adds those values to the browser bundle.

## Environment Variables

| Name | Used for | Required |
| --- | --- | --- |
| `VITE_BACKEND_BASE_URL` | Backend API URL | Yes |
| `VITE_FRONTEND_BASE_URL` | Frontend URL used by Playwright | For end-to-end tests |
| `VITE_TEST_EMAIL` | Test account email | For account-login end-to-end tests |
| `VITE_TEST_PASSWORD` | Test account password | For account-login end-to-end tests |

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Starts the local Vite server |
| `pnpm build` | Type-checks and creates a production build |
| `pnpm preview` | Serves the production build locally |
| `pnpm quality:check` | Runs Biome, Knip, and TypeScript checks |
| `pnpm lint` | Checks formatting and lint rules with Biome |
| `pnpm format` | Applies Biome formatting and safe lint fixes |
| `pnpm check:unused` | Finds unused files, dependencies, and exports with Knip |
| `pnpm typescript:check` | Type-checks the project without emitting files |
| `pnpm check:bundle` | Checks production assets in `dist` against their gzip size budgets |
| `pnpm test:unit` | Runs unit tests with coverage |
| `pnpm test:component` | Runs component tests with coverage |
| `pnpm test:integrations` | Runs integration tests with coverage |
| `pnpm test:e2e` | Runs Playwright end-to-end tests |
| `pnpm test:e2e:ui` | Opens the Playwright test UI |
| `pnpm test:accessibility` | Runs Playwright accessibility tests in Chromium |

## Automated Testing

The project uses several automated test layers, each with a distinct scope:

- Unit tests check small utility functions.
- Component tests render one component with React Testing Library and verify its behavior.
- Integration tests exercise page flows with React Testing Library and APIs mocked by Mock Service Worker.
- End-to-end tests use Playwright across desktop and mobile browser projects against the configured frontend and backend.
- Accessibility tests use Playwright and axe-core in Chromium to detect common WCAG A and AA violations.
- Bundle checks prevent unexpected growth in generated JavaScript and CSS assets.

Run the automated suites independently:

```bash
pnpm test:unit
pnpm test:component
pnpm test:integrations
pnpm test:e2e
pnpm test:accessibility
```

Unit, component, and integration suites generate coverage reports. End-to-end and accessibility suites require the Playwright browsers, `VITE_FRONTEND_BASE_URL`, and a reachable backend environment. Account login E2E coverage also requires `VITE_TEST_EMAIL` and `VITE_TEST_PASSWORD`.

Vitest configuration and setup live in `src/shared/tests/vitest`. Playwright end-to-end and accessibility configuration live in `src/shared/tests/playwright`. The package scripts pass these configuration paths explicitly, so run tests through the documented scripts from the repository root.

Shared test helpers expose focused public APIs:

- `shared/tests` for framework-neutral helpers
- `shared/tests/react-testing-library` for component and integration helpers
- `shared/tests/vitest` for Vitest and MSW support
- `shared/tests/playwright` for browser-test helpers

Biome prevents unit, component, and integration tests from importing across test categories. It also prevents consumers from bypassing the shared test public APIs.

Run the production build before checking its bundle sizes:

```bash
pnpm build
pnpm check:bundle
```

The bundle budgets are defined in `bundlesize.config.json`. If a budget fails, investigate new dependencies, broad imports, lost tree-shaking, and opportunities for lazy loading before increasing the limit.

## Accessibility

Accessibility is treated as both an implementation requirement and a testing concern. The interface includes semantic landmarks and headings, associated form labels and validation messages, keyboard-operable controls, visible loading and error states, a skip link, and accessible names for icon-only actions.

Automated coverage runs at two levels:

- Component tests call `axe-core` through React Testing Library to catch violations close to the component that introduced them.
- Playwright accessibility tests scan important authenticated and unauthenticated page states in a real Chromium browser, including open dialogs and responsive navigation behavior.

Run the browser accessibility suite with:

```bash
pnpm test:accessibility
```

Primary flows are also checked manually with keyboard navigation. Automated scanners can detect only a subset of accessibility issues, so passing tests does not replace screen-reader testing, keyboard review, zoom and reflow checks, or evaluation by people who use assistive technology.

## Continuous Integration

GitHub Actions runs the following automated checks:

- Quality, bundle-size, unit, and component checks run on every push.
- Integration tests run on pushes and pull requests to `main`.
- End-to-end and accessibility tests run daily against the configured frontend environment.

The production bundle job builds the app before running `pnpm check:bundle`. The `pnpm build` command itself only runs TypeScript and Vite; the remaining checks are separate CI jobs.

## Architecture Overview

The frontend is a single-page React application deployed separately from the backend API. UI components use feature hooks backed by TanStack Query, which calls the backend through a shared Axios client and caches server data. Zustand holds shared UI state, React context provides theme state, and component state handles local interactions.

```text
React pages and components
          │
          ▼
Feature hooks and TanStack Query ──► Query cache
          │
          ▼
Shared Axios API client
          │
          ▼
Separately deployed backend API
```

Protected routes check the current authentication state before rendering private pages. The API client sends authentication requests to the backend and attempts to refresh an expired login token before surfacing an authorization error. Because the frontend and backend are deployed independently, their base URLs, allowed origins, and cookie settings must be configured together.

## Project Structure

```text
src/
├── app/                 # App routes, layouts, providers, and error boundaries
├── assets/              # Images and other static assets imported by the app
├── features/
│   ├── auth/            # Login and current-user code; exported through index.ts
│   ├── dashboard/       # Dashboard stats; exported through index.ts
│   ├── roles/           # Role management; exported through index.ts
│   └── users/           # User management; exported through index.ts
├── shared/
│   ├── api/             # Shared HTTP client public API
│   ├── components/      # Reusable components in lowercase folders
│   ├── hooks/           # Shared hook public API
│   ├── store/           # Shared UI-state public API
│   ├── tests/           # Shared test APIs and test-runner configuration
│   └── utilities/       # Shared utility public API
└── styles/              # Global styles
```

Each feature keeps its API code, components, hooks, pages, schemas, tests, and utilities close together. A feature's root `index.ts` is its only public entry point; app code and other features must not import feature internals. Shared code uses focused segment entry points such as `shared/components` instead of one broad barrel. Biome enforces these boundaries.

Code goes in `shared` only when more than one file consumes it. Constants and test locator helpers used by only one file stay local to that consumer.

## State and Data

- TanStack Query stores data received from the backend.
- Zustand stores small pieces of shared UI state, such as alerts and management state.
- React context provides the theme to the component tree.
- Local React state is used when only one component or flow needs the value.

## Design Decisions and Tradeoffs

- Keeping the frontend and backend in separate repositories allows independent development and deployment, but API and environment changes must stay coordinated.
- Using TanStack Query for server state and Zustand for shared UI state keeps their responsibilities clear, but adds dependencies and concepts to the application.
- Organizing code by feature keeps related implementation and tests together as the project grows, but creates more folders and conventions than a smaller application needs.
- Explicit public APIs make dependencies easier to understand and refactor, but feature root barrels can limit route-level code splitting when pages and consumed exports share the same entry point.
- Client-side routing provides fast navigation without full page reloads, but direct visits and refreshes require a Vercel rewrite.
- Token refresh and cookie-based authentication support persistent, secure sessions, but require careful CORS and cookie configuration across environments.
- Unit, component, integration, end-to-end, and accessibility tests provide coverage at several levels, but increase CI time and maintenance work.

## What I Would Improve

Given more time, I would prioritize these improvements:

- Consolidate repeated GitHub Actions setup into reusable workflow steps and share production build artifacts between jobs to reduce CI time.
- Add server-side pagination, filtering, and searching. Then, virtualize long user and role lists so both data transfer and rendered DOM size remain manageable as the datasets grow.
- Profile rendering with React DevTools and selectively apply `useMemo` and `useCallback` where expensive calculations or unstable references cause measurable unnecessary re-renders.

## License

Copyright © 2026 DHua5922. All rights reserved. The source code is available for viewing and evaluation, but reuse, modification, and redistribution are not permitted without prior written permission. See [LICENSE](LICENSE) for details.

## Deployment

The app is set up for Vercel. `vercel.json` sends page requests to `index.html`, which lets React Router handle a direct visit or page refresh.

Before deploying:

1. Add the production backend URL to Vercel as `VITE_BACKEND_BASE_URL`.
2. Make sure the backend allows the Vercel frontend origin.
3. Make sure the backend CORS policy and production cookie attributes, including `SameSite` and `Secure`, support the deployed frontend.
