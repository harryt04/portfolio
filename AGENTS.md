# AGENTS.md

## Project

Dual-purpose: public resume site + shared CRM/user API backend.

## Stack

- Next.js App Router (TypeScript)
- MongoDB (MONGO_CONNECTION_STRING)
- PostHog (NEXT*PUBLIC_POSTHOG*\*)
- Tailwind + shadcn/ui + MagicUI

## API

- Real routes only under app/api/
- Shared user/CRM endpoints
- ALLOWED_APPS for cross-app auth (if present in env)

## Env

Use names exactly from .env.sample:

- NEXT_PUBLIC_POSTHOG_KEY
- NEXT_PUBLIC_POSTHOG_HOST
- MONGO_CONNECTION_STRING

## Scripts

- npm run dev
- npm run build
- npm run lint
- npm run prettify / prettier
- npm run ci (added)

## Do nots

- No Clerk, Redis, or invented services
- No mutating prod data in scripts
- Match existing patterns only

## Verification

Run `npm run ci` before PR.
