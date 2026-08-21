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
- [Testing](#testing)
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
| `pnpm biome:fix` | Applies Biome formatting and lint fixes |
| `pnpm check:bundle` | Checks production assets in `dist` against their gzip size budgets |
| `pnpm test:unit` | Runs unit tests with coverage |
| `pnpm test:component` | Runs component tests with coverage |
| `pnpm test:integrations` | Runs integration tests with coverage |
| `pnpm test:e2e` | Runs Playwright end-to-end tests |
| `pnpm test:e2e:ui` | Opens the Playwright test UI |
| `pnpm test:accessibility` | Runs Playwright accessibility tests in Chromium |

## Testing

The test types have different jobs:

- Unit tests check small utility functions.
- Component tests check one component and its user behavior.
- Integration tests check a page flow with mocked API requests.
- End-to-end tests check important browser flows against the configured frontend and backend environment.
- Accessibility tests use axe-core to find common accessibility problems.
- Bundle checks prevent unexpected growth in generated JavaScript and CSS assets.

Primary user flows are also tested manually with keyboard navigation. Automated checks and keyboard testing do not replace testing with screen readers and other assistive technologies.

Run the production build before checking its bundle sizes:

```bash
pnpm build
pnpm check:bundle
```

The bundle budgets are defined in `bundlesize.config.json`. If a budget fails, investigate new dependencies, broad imports, lost tree-shaking, and opportunities for lazy loading before increasing the limit.

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
│   ├── auth/            # Login and current-user code
│   ├── dashboard/       # Dashboard stats
│   ├── roles/           # Role management
│   └── users/           # User management
├── shared/              # Reusable API, components, hooks, state, and utilities
└── styles/              # Global styles
```

Each feature keeps its API code, components, hooks, pages, schemas, tests, and utilities close together. Code goes in `shared` only when more than one feature can use it.

## State and Data

- TanStack Query stores data received from the backend.
- Zustand stores small pieces of shared UI state, such as alerts and management state.
- React context provides the theme to the component tree.
- Local React state is used when only one component or flow needs the value.

## Design Decisions and Tradeoffs

- Keeping the frontend and backend in separate repositories allows independent development and deployment, but API and environment changes must stay coordinated.
- Using TanStack Query for server state and Zustand for shared UI state keeps their responsibilities clear, but adds dependencies and concepts to the application.
- Organizing code by feature keeps related implementation and tests together as the project grows, but creates more folders and conventions than a smaller application needs.
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
