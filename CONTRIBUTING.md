# Contributing

## Setup

1. Clone repo
2. `npm install`
3. Copy .env.sample to .env.local and fill (never commit secrets)
4. `npm run dev`

## PR

- Branch from master
- All changes must pass `npm run ci`
- No secrets in code or PRs
- See AGENTS.md for rules

CI runs on every PR to master.
