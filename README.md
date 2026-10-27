# portfolio

Wiki + resume site for Harry Thomas. Hosts latest resume PDF and shared user/CRM API endpoints.

## Quick start

```
pnpm install
cp .env.sample .env.local
pnpm run dev
```

See [AGENTS.md](./AGENTS.md) and [CONTRIBUTING.md](./CONTRIBUTING.md)

## Package manager

Use pnpm 11.24.0, pinned in `package.json`. Install it with
`npm install --global pnpm@11.24.0` if pnpm is not available.
Run `pnpm install --frozen-lockfile` after cloning. Commit `pnpm-lock.yaml`
when dependencies change; do not generate npm or Yarn lockfiles.

## Node.js runtime

Use Node.js 24 for local development, validation, and deployment.
The runtime is declared in `package.json` and `.nvmrc`.
