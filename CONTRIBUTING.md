# Contributing

## Setup

1. Clone repo
2. `pnpm install`
3. Copy .env.sample to .env.local and fill (never commit secrets)
4. `pnpm run dev`

## PR

- Branch from master
- All changes must pass `pnpm run ci`
- No secrets in code or PRs
- See AGENTS.md for rules

CI runs on every PR to master.
