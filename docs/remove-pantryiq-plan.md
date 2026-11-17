# Remove PantryIQ from the portfolio showcase

Status: proposed implementation plan, 2026-11-17. This PR adds the plan only.

## Evidence and outcome

On 2026-11-17, a rendered browser inspection of <https://harryt.dev/work>
confirmed a PantryIQ heading, an Open app link to <https://pantry-iq.com>,
and a Source link to <https://github.com/harryt04/pantry-iq>.

Source inspection at `1ed509e29d2522286507e59fd4ba66737aab46e1` confirms
that [`lib/portfolio-projects.ts`](../lib/portfolio-projects.ts) includes the
`pantry-iq` entry with previews enabled. [`app/work/page.tsx`](../app/work/page.tsx)
passes that catalog to the showcase component.

Desired outcome: visitors to `/work` no longer see a PantryIQ card, its links,
or its live preview. The other ten projects retain their order and behavior.

## Implementation

1. Remove the complete `pantry-iq` object from `portfolioProjects` in
   [`lib/portfolio-projects.ts`](../lib/portfolio-projects.ts). Removing the
   catalog entry removes the card, links, and preview together; no component
   filtering or special-case hidden state is needed.
2. Update the owning [showcase specification](portfolio-showcase-plan.md): remove
   PantryIQ from the project table and preview-verification note. Reconcile its
   exact-project-set assertions and counts with the resulting ten-entry catalog,
   including Tokei, which is already present in source. Keep the remaining order.
3. Review the diff and search active showcase source/specification for remaining
   PantryIQ references. Historical commit messages need no edits.

## Scope boundary

Keep the `pantryiq` application identifier in [`models/users.ts`](../models/users.ts)
and the shared user/CRM API behavior intact. Removing a public showcase card
is separate from retiring an application's API integration, stored records,
repository, domain, or deployment. This plan proposes no changes to those systems,
the résumé PDF, other projects, dependencies, or site navigation.

## Validation and acceptance

- Run `pnpm install --frozen-lockfile` if needed, then `pnpm run ci` using the
  repository's Node 24 environment. This covers formatting, lint, and the
  production build with the CI script's dummy configuration.
- Inspect `/work` in a browser at desktop and mobile sizes. Confirm ten project
  cards remain in their previous relative order, with no PantryIQ card, app/source
  link, or preview iframe. Check keyboard navigation, grid wrapping, and another
  project's preview and links.
- Confirm `/` still links to `/work`, and the shared CRM app identifier is unchanged.
- Run `git diff --check` and review the final diff for unrelated changes/secrets.
- Deliver the implementation in a Treehouse worktree as a separate PR. After an
  authorized merge and normal deployment, recheck the production `/work` page;
  a local build alone does not prove the deployed page changed.

The implementation is complete when these checks pass and the public showcase
omits PantryIQ. This planning PR does not remove it from production or authorize
merging or deploying the later implementation.
