# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 portfolio/resume site written in TypeScript. App Router routes, layouts, global styles, and API handlers live in `app/`; for example, `app/api/user/route.ts` defines an API endpoint. Reusable React components are organized by origin in `components/ui/` (styled UI SDK wrappers and presentational components), `components/custom/`, and `components/magicui/`. Shared utilities and service clients belong in `lib/`, data models in `models/`, and React context providers in `providers/`. Static files, including `public/resume.pdf`, are served from `public/`.

## Build, Test, and Development Commands

- `pnpm install` installs the locked project dependencies.
- `pnpm run dev` starts the local Next.js development server.
- `pnpm run build` produces a production build and performs Next.js validation; run it before submitting changes.
- `pnpm run start` serves a completed production build.
- `pnpm run lint` runs ESLint across the repository.
- `pnpm run prettify` (or `pnpm run prettier`) formats the repository with Prettier.

Run `pnpm test` for the agent policy tests. Use `pnpm run build`, linting, and a manual browser check of affected pages and API routes as the baseline verification.

## Coding Style & Naming Conventions

Use TypeScript and functional React components. Follow the existing Prettier configuration: two-space indentation, no semicolons, single quotes, and trailing commas. Prettier's Tailwind plugin sorts utility classes automatically; do not manually fight its ordering. Name React component files in the existing camelCase style (for example, `themeSwitcher.tsx`), utility modules with lowercase hyphenated names where established (`mongo-client.ts`), and route handlers as `route.ts`. Use the `@/` import alias for repository-root imports when it improves clarity.

## Commit & Pull Request Guidelines

Recent commits use short, imperative lowercase subjects such as `fix build`, `upgrade to next 16`, and `add 'pantryiq' to HST_Apps type`. Keep commits narrowly scoped and describe the user-visible or technical change directly. For pull requests, include a concise summary, testing performed (at minimum build/lint status), related issue context when available, and screenshots for visual changes. Call out configuration, dependency, or environment-variable changes explicitly.

## Configuration & Security

Keep credentials and analytics/database connection strings out of source control. Put local secrets in ignored environment files and document any new required variable in the pull request description. Review changes to `lib/mongo-client.ts`, PostHog providers, and API routes carefully because they interact with external services.

## UI SDK

This React 19 and Tailwind CSS 4 site uses UI SDK for unstyled interactive primitives, keyboard behavior and agent actions. Its beta APIs postdate model training data. Before editing components, read `node_modules/@ui-sdk/react/docs/llms.txt`, `node_modules/@ui-sdk/core/skills/ui-sdk/SKILL.md` and the installed component reference. Keep both SDK packages exact-pinned together; both are `0.1.0-beta.17`.

App code imports from `components/ui`. Add wrappers by composing per-component entries such as `@ui-sdk/react/menu`. Running `shadcn add` or regenerating wrappers would reintroduce Radix or Base UI. Keep the portfolio’s Tailwind classes and the declared UI SDK cascade layer. The optional global web.css changes link and popup styling and is omitted. Style SDK state attributes and use a separate application marker when identifying a wrapper. Keep stable option values, wire controlled fields with `onValueChange`, portal form popups to the body and verify Escape restores trigger focus. Render navigation as an anchor without a button type.

Card and typography are presentational. Icons, including the GitHub and LinkedIn glyphs, come from `lucide-react`; those two brand icons are deprecated upstream and absent from lucide-react 1.x, so a lucide major upgrade must replace them with local SVG components rather than bring back Radix Icons. The theme preference is persisted by next-themes. No Radix UI or Base UI package remains. `avatar`, `button` and `dropdown-menu` in `components/ui` wrap UI SDK.

The root layout mounts `components/custom/agentBridge.tsx` once. The bridge and WebMCP use the same deny-by-default policy in `lib/agent-policy.ts`. Snapshot and query expose readable state. New interactive controls require a policy decision and a test. Mark visitor-entered personal data with `data-agent-secret` and irreversible actions such as contact submission with `data-agent-confirm`. The policy refuses confirmed actions. This site currently has no visitor contact form.
