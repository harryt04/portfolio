# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 portfolio/resume site written in TypeScript. App Router routes, layouts, global styles, and API handlers live in `app/`; for example, `app/api/user/route.ts` defines an API endpoint. Reusable React components are organized by origin in `components/ui/` (Radix-style primitives), `components/custom/`, and `components/magicui/`. Shared utilities and service clients belong in `lib/`, data models in `models/`, and React context providers in `providers/`. Static files, including `public/resume.pdf`, are served from `public/`.

## Build, Test, and Development Commands

- `npm install` installs the locked project dependencies.
- `npm run dev` starts the local Next.js development server.
- `npm run build` produces a production build and performs Next.js validation; run it before submitting changes.
- `npm run start` serves a completed production build.
- `npm run lint` runs ESLint across the repository.
- `npm run prettify` (or `npm run prettier`) formats the repository with Prettier.

There is no dedicated automated test suite yet. Use `npm run build`, linting, and a manual browser check of affected pages and API routes as the baseline verification.

## Coding Style & Naming Conventions

Use TypeScript and functional React components. Follow the existing Prettier configuration: two-space indentation, no semicolons, single quotes, and trailing commas. Prettier's Tailwind plugin sorts utility classes automatically; do not manually fight its ordering. Name React component files in the existing camelCase style (for example, `themeSwitcher.tsx`), utility modules with lowercase hyphenated names where established (`mongo-client.ts`), and route handlers as `route.ts`. Use the `@/` import alias for repository-root imports when it improves clarity.

## Commit & Pull Request Guidelines

Recent commits use short, imperative lowercase subjects such as `fix build`, `upgrade to next 16`, and `add 'pantryiq' to HST_Apps type`. Keep commits narrowly scoped and describe the user-visible or technical change directly. For pull requests, include a concise summary, testing performed (at minimum build/lint status), related issue context when available, and screenshots for visual changes. Call out configuration, dependency, or environment-variable changes explicitly.

## Configuration & Security

Keep credentials and analytics/database connection strings out of source control. Put local secrets in ignored environment files and document any new required variable in the pull request description. Review changes to `lib/mongo-client.ts`, PostHog providers, and API routes carefully because they interact with external services.
