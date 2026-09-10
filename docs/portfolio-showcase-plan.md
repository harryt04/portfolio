# Harry Thomas Portfolio: C1 Orbit Card + Uniform Grid Implementation Plan

## 1. Outcome

Build the approved C1 design as two responsive pages:

- `/` remains a quiet digital business card. Preserve Harry's portrait, existing introduction, existing tagline copy, résumé link, GitHub link, LinkedIn link, and theme control. Add one new uniform `My work` button linking to `/work`.
- `/work` is a separate project showcase containing one card for every public personal project listed below. Each card offers a current live-site preview when embedding is healthy, a direct app link, and a direct GitHub source link.

This is not a résumé redesign and not a long-form staff-engineering case-study site. The résumé remains a PDF link. The showcase's job is to make Harry's shipped personal work easy to scan and open.

Approved visual direction: **C1 — Orbit Card + Uniform Grid**.

Approved review artifact (temporary local file): `/private/tmp/harryt-portfolio-concepts/index.html`. The implementation must not depend on this file existing; all decisions needed to reproduce it are specified below.

## 2. Non-negotiable content and behavior

### Landing copy

Use this copy verbatim, including capitalization and emoji:

```text
Hi, I'm Harry Thomas
I'm a staff software engineer.
I have a passion for separating signal from noise.
Please ask me about it! 😊
```

Do not replace the intro with slogans such as `Signal over noise`, do not add résumé content to the page, and do not add a technology cloud or skills list.

### Landing actions

Render four visually uniform actions in this order:

1. `My work` → `/work`
2. `My resume` → `/resume.pdf`
3. `My GitHub` → `https://github.com/harryt04`
4. `My LinkedIn` → `https://www.linkedin.com/in/harrison-thomas04/`

Use a Radix or Lucide icon for each action: briefcase/grid for work, file for résumé, GitHub logo, and LinkedIn logo. Do not label links `Open work_`, `resume.pdf`, or similar technical shorthand. The work button may receive the accent border on hover/focus, but it must have the same dimensions, typography, and base surface as the other buttons.

External links open in a new tab with `rel="noreferrer"`. `/work` and `/resume.pdf` stay in the current tab.

### Portrait

Preserve the current portrait shown by the GitHub avatar URL in `app/page.tsx` (`https://avatars.githubusercontent.com/u/22422276?v=4`). Download that exact image once during implementation and commit it as a local static asset such as `public/harry-thomas.jpg`; reference the local file from the page. This avoids the current network-dependent avatar fallback while preserving the selected portrait. Use descriptive alt text such as `Harry Thomas in ski gear in the mountains`.

### Project set and order

Use a local, curated project data file. Do not fetch GitHub at request time and do not require GitHub credentials or a database to render `/work`.

Render these ten public projects in this order:

| Project | Description | Live URL | Source URL | Initial preview state |
| --- | --- | --- | --- | --- |
| KanjiForge | Offline-first kanji and vocabulary study PWA. | `https://kanjiforge.app` | `https://github.com/harryt04/kanji-forge` | enabled |
| Platter | Recipes into one trustworthy, shared grocery list. | `https://platter.harryt.dev` | `https://github.com/harryt04/platter` | disabled until HTTPS is healthy |
| Blockparty | Private multiplayer board game with a deterministic engine. | `https://blockparty.harryt.dev` | `https://github.com/harryt04/blockparty` | disabled until HTTPS is healthy |
| MailFlow | A voice-first, hands-free experience for Gmail. | `https://mail.harryt.dev` | `https://github.com/harryt04/mail-flow` | enabled |
| PantryIQ | Explainable restaurant waste analysis from operational data. | `https://pantry-iq.com` | `https://github.com/harryt04/pantry-iq` | enabled, subject to browser verification |
| VoiceBridge | Visual communication tools for autistic people and families. | `https://vb.harryt.dev` | `https://github.com/harryt04/voice-bridge` | enabled |
| Grub Roulette | A simple way to discover a random local restaurant. | `https://grub.harryt.dev` | `https://github.com/harryt04/grub-roulette` | enabled |
| Sunshine Flower Bar | A warm gifting brand and customer lead experience. | `https://www.sunshineflowerbar.com` | `https://github.com/harryt04/flowers` | enabled |
| Route Roulette | Random scenic-drive planning near your location. | `https://rr.harryt.dev` | `https://github.com/harryt04/route-roulette` | enabled |
| Tokei | A multi-timer workspace designed for busy kitchens. | `https://tokei.harryt.dev` | `https://github.com/harryt04/tokei` | enabled, subject to browser verification |

Exclude the portfolio repository itself, private repositories, and the archived private MiniZinc project. A private repository must never be inferred into the list from authenticated GitHub data.

## 3. Visual system

### Overall character

The approved C1 direction is a restrained technical window system, not a terminal parody:

- full-viewport grid field behind the landing card;
- dark navy/charcoal surfaces with cyan focus and hover accents;
- thin borders and square-to-small-radius panels;
- circular portrait with a subtle cyan ring;
- compact monospace only for labels/status text;
- normal sans-serif for the name, descriptions, and buttons;
- no gradients used as decoration except a very subtle radial illumination behind the card;
- no glassmorphism blur on primary content;
- no typewriter effects, fake commands, blinking cursors, or gratuitous code syntax.

Use the repo's current Tailwind/shadcn foundation rather than adding a new component framework. Reuse the existing Button and theme primitives where practical, but add portfolio-specific variants/classes instead of forcing the old neutral button variants to imitate C1.

### Theme tokens

Keep light, dark, and system modes. System is the default. A manual Light/Dark/System choice overrides the OS and persists using the existing `next-themes` storage key.

Use semantic CSS variables so both pages and all states switch together. Suggested C1 values:

```css
:root {
  --background: 210 20% 98%;
  --foreground: 210 30% 10%;
  --card: 0 0% 100%;
  --card-foreground: 210 30% 10%;
  --muted: 210 18% 94%;
  --muted-foreground: 210 9% 42%;
  --border: 210 16% 82%;
  --accent: 193 82% 35%;
  --accent-foreground: 0 0% 100%;
  --success: 145 55% 34%;
}

.dark {
  --background: 207 35% 6%;
  --foreground: 198 48% 96%;
  --card: 209 31% 10%;
  --card-foreground: 198 48% 96%;
  --muted: 209 25% 14%;
  --muted-foreground: 208 18% 67%;
  --border: 210 28% 23%;
  --accent: 189 100% 69%;
  --accent-foreground: 207 45% 7%;
  --success: 83 100% 71%;
}
```

Translate these into the existing variable format in `app/globals.css` and expose any new semantic colors through Tailwind only if class generation requires it. Confirm actual WCAG contrast; adjust luminance rather than abandoning the palette.

The grid background should be CSS-only, approximately 30–40px spacing, with lines at very low opacity. It must not compete with text in light mode.

### Type and spacing

- Keep Inter through `next/font`; do not add another webfont dependency.
- Use the system monospace stack for status labels only.
- Landing name: approximately 26–30px desktop and 24px mobile, bold, tight tracking.
- Showcase heading: approximately 64–72px desktop, 42–48px mobile, bold, tight tracking.
- Body copy: never below 14px on the production page. The smaller sizes in the Lavish board were due to mockup scaling and must not be copied literally.
- Project descriptions: 14–16px with at least 1.45 line height.
- Interactive controls: minimum 44px touch target; use 48px for the four landing actions.
- Content width: cap `/work` around 1200–1280px and maintain 16px mobile gutters, 24–32px tablet gutters, and 32–48px desktop gutters.

## 4. Page and component design

### `/` landing page

Desktop/tablet:

- Fill the viewport using `min-height: 100svh`, not fixed `100vh`, so mobile browser chrome does not crop the content.
- Center one bordered card over the grid field.
- Card width: about 420–440px; padding: about 28px.
- Place the theme switcher at the card's top-right as a 44px icon control.
- Portrait: 160–168px circular crop.
- Keep the four lines of approved copy centered.
- Render actions as a two-column grid at widths where each action can remain at least 180px wide. At narrower widths, stack them.

Mobile (target reference viewport 390×844, support down to 320px):

- 16px safe outer gutter.
- Card uses the available width, with 18–20px internal horizontal padding.
- Portrait: about 132px.
- Theme control: 44×44px and inset far enough not to overlap the portrait.
- Four actions stack vertically, each full width and 48px tall.
- The entire card should fit without horizontal scrolling. Vertical page scrolling is acceptable on short devices and at 200% text zoom.
- Respect `env(safe-area-inset-*)` where relevant; do not place controls under a notch or home indicator.

### `/work` showcase shell

- Add a compact header with `HT / Work` or `Harry Thomas / Work` at left and clear `Home`, `My resume`, `My GitHub`, and `My LinkedIn` destinations at right on desktop.
- On mobile, show `HT / My work` plus one obvious `Home` action; the remaining external destinations can live below the project list or in a small accessible menu. Do not squeeze four text links into the mobile header.
- Use a page heading `My work` and one short line: `Personal products and open-source projects. Open the app or inspect the source.`
- Do not repeat the résumé narrative, skills list, or staff-level competency prose on this page.

### Project card

Define a typed static model similar to:

```ts
export type PortfolioProject = {
  slug: string
  name: string
  description: string
  liveUrl: string
  sourceUrl: string
  previewEnabled: boolean
  previewDisabledReason?: string
}
```

Keep project data in one module such as `lib/portfolio-projects.ts`. The page and tests must import the same source of truth.

Each card contains:

1. A browser-like live preview region with a subtle `LIVE` status when mounted.
2. Project name.
3. One-sentence description from the approved table.
4. `Open app` and `Source` actions, both always visible and keyboard reachable.

Do not hide names, descriptions, or links behind hover. Hover/focus is enhancement only.

Desktop card layout:

- Two equal columns at wide widths; one column when there is not enough room for readable preview cards.
- Use a consistent preview aspect ratio, approximately 16:10.
- Border changes to accent, card lifts about 4px, and shadow strengthens on hover/focus-within.
- Keep all card action areas aligned even when descriptions wrap.

Mobile card layout:

- Exactly one card per row.
- Show name and description before any preview is loaded.
- Include a full-width `Load live preview` control followed by two 44px actions (`Open app`, `Source`).
- When preview opens, place it between the description and action row with a stable aspect ratio.
- Change the control label to `Close live preview` while open.
- Only one mobile iframe may be mounted at a time. Opening a second preview must close and unmount the first.
- Disabled previews show `Preview unavailable` as a non-interactive status while leaving both external actions visible.

## 5. Live iframe lifecycle and resilience

The preview feature must never make the showcase slow, blank, or unusable.

### Desktop behavior

- Render the card shell immediately without an iframe `src`.
- Use an `IntersectionObserver` to set the `src` only when a card is within roughly 300–500px of the viewport.
- Use native `loading="lazy"` as a second layer, not the only layer.
- Do not allow pointer interaction inside the miniature iframe; use `pointer-events: none` and provide the explicit `Open app` link outside it.
- Set a fixed container aspect ratio before loading to prevent layout shift.
- Show a neutral loading surface/skeleton until the frame reports load.

### Mobile behavior

- Never auto-mount all iframes.
- Mount only after the user taps `Load live preview`.
- Keep at most one iframe mounted. Remove its `src` or remove the element when another card opens.
- Preserve the user's scroll position when previews open or close.

### Frame attributes

Use a descriptive `title`, `loading="lazy"`, and a conservative referrer policy. Start with:

```tsx
<iframe
  title={`${project.name} live preview`}
  src={mounted ? project.liveUrl : undefined}
  loading="lazy"
  referrerPolicy="strict-origin-when-cross-origin"
  sandbox="allow-scripts allow-same-origin"
/>
```

Test every live site with the sandbox. If a specific site cannot render without an additional capability, add the minimum required token for that project and document why. Never add `allow-top-navigation` or `allow-popups-to-escape-sandbox` for a non-interactive preview.

### Failures and embedding restrictions

- An iframe cannot reliably detect every `X-Frame-Options`, CSP `frame-ancestors`, TLS, DNS, or child-app runtime failure. Therefore, external links must remain the real navigation path and the preview must be treated as optional enhancement.
- The current checks found no `X-Frame-Options` or `frame-ancestors` header on successfully responding sites.
- As of the planning session, `platter.harryt.dev` and `blockparty.harryt.dev` fail TLS negotiation. Configure them with `previewEnabled: false` and a concise reason until their deployments are repaired and verified.
- PantryIQ and Tokei showed inconsistent command-line responses during inspection even though browser navigation partially worked. Verify them in the actual embedded browser before leaving their previews enabled.
- If a preview is disabled or fails, show a designed project-colored or neutral fallback with the project name and `Preview unavailable`; never show an empty white rectangle, browser error page, or spinner that runs forever.
- Set an 8–10 second visual timeout that replaces the skeleton with the fallback. The iframe may remain mounted if it subsequently loads, but the card must remain usable.

### Analytics and privacy

Embedding a live app can cause that child app's own analytics to count a preview page view. Append a stable query parameter such as `?embed=portfolio` to preview URLs while keeping `Open app` pointed at the clean canonical URL. Where the child apps support it, exclude or separately label portfolio-preview traffic. Do not add new analytics events to the portfolio as part of this work unless needed to diagnose preview failures.

## 6. Theme control and accessibility

### Theme behavior

- Preserve the existing `ThemeProvider` with `defaultTheme="system"`, `enableSystem`, and the existing storage key.
- Keep explicit Light, Dark, and Automatic/System choices.
- The theme control needs `aria-label="Choose color theme"`; the menu items must expose the current selection.
- Both `/` and `/work` use the same theme preference without flashes or hydration warnings.

### Accessibility requirements

- Meet WCAG 2.2 AA contrast for text, borders that carry meaning, focus indicators, and controls in both themes.
- All interactive targets are at least 44×44px.
- Provide strong `:focus-visible` styles using the accent color and a background-offset outline.
- Keep DOM and visual order aligned.
- Use real links for navigation and buttons only for state changes such as loading/closing a preview.
- The project list should be semantic (`section` + heading, or `ul`/`li`) and every card title should be a heading.
- Iframes need unique titles; decorative browser dots and grid backgrounds are hidden from assistive technology.
- Honor `prefers-reduced-motion`: remove lift/translate animation and transition the color/border only or instantly.
- Confirm the landing works at 200% browser zoom and with long translated system labels, even though the product copy remains English.
- Do not require hover to discover links or preview availability.

## 7. Suggested implementation structure

Keep the implementation small and local to the portfolio:

- Update `app/page.tsx` for the approved C1 landing and the `My work` link.
- Add `app/work/page.tsx` as the server-rendered route shell and metadata owner.
- Add a small client component such as `components/custom/projectShowcase.tsx` for viewport detection, iframe mounting, and the one-open-mobile-preview invariant.
- Add the typed static catalog in `lib/portfolio-projects.ts`.
- Update `app/globals.css` and, only if needed, `tailwind.config.ts` for the semantic C1 tokens, grid field, focus states, and reduced-motion rules.
- Add the local portrait asset under `public/`.

Avoid bringing in a carousel, animation library, iframe SDK, CMS, GitHub API client, or state-management package. React state, `matchMedia`, and `IntersectionObserver` are enough.

The project showcase should remain statically renderable. The client component owns only progressive preview behavior; all project names, descriptions, and links must exist in server-rendered HTML.

## 8. Metadata and polish

- Fix the current metadata typo (`Deveoloper`).
- Landing title: `Harry Thomas — Staff Software Engineer`.
- Landing description: concise digital-business-card copy, e.g. `Harry Thomas is a staff software engineer who builds web and mobile products.`
- Work title: `My Work — Harry Thomas`.
- Work description: `Personal products and open-source projects built by Harry Thomas.`
- Add canonical paths for `/` and `/work` if the existing deployment metadata supports a stable base URL.
- Keep `/resume.pdf` unchanged.
- Do not expose private repository names or authenticated GitHub metadata in page source.

## 9. Testing and acceptance criteria

### Automated checks

Add focused tests if the repo's chosen test runner is introduced; otherwise keep logic independently testable and use build plus Playwright/manual checks. Minimum logical cases:

1. Project catalog contains exactly the ten approved slugs in the approved order.
2. Every project has a name, description, valid HTTPS live URL, and valid HTTPS GitHub URL.
3. A disabled preview has a reason and never mounts an iframe.
4. Desktop observer mounting adds a preview URL only after eligibility.
5. Mobile preview starts closed.
6. Opening mobile project B closes and unmounts mobile project A.
7. Closing a mobile preview restores the `Load live preview` label.
8. Landing page has exactly the four approved actions with the approved labels and destinations.
9. Theme preference defaults to system and manual choices persist.

### Browser matrix

Verify current Chrome/Chromium, Safari/WebKit, and Firefox at these representative sizes:

- 320×568 (small phone)
- 390×844 (approved mobile reference)
- 768×1024 (tablet)
- 1440×900 (desktop)

For each size/theme combination, verify:

- no horizontal overflow;
- portrait remains correctly cropped;
- landing copy is verbatim and unobscured;
- actions remain at least 44px and keyboard/touch accessible;
- `/work` is reachable and back navigation is obvious;
- cards remain readable before previews load;
- only one mobile preview can be open;
- live and disabled preview states are visually deliberate;
- app/source links work independently of the iframe;
- focus order is logical;
- reduced-motion mode removes transforms;
- light/dark/system selection persists across both routes.

### Live-preview verification

For every enabled project:

1. Confirm TLS and DNS work.
2. Confirm response headers permit framing.
3. Confirm the page renders with the chosen sandbox tokens.
4. Confirm no child page can navigate the portfolio's top frame.
5. Confirm the scaled preview is recognizable at desktop card size.
6. Confirm mobile tap mounts the current page and a second tap/another card unmounts it.
7. Confirm a slow or failed page reaches the fallback within 10 seconds.

### Repository checks

- Run `npm install` only if dependencies are absent; do not casually rewrite the lockfile.
- Run `npm run build` as the primary Next.js/TypeScript validation.
- The current `npm run lint` script uses the removed `next lint` command and may fail under Next 16. If so, report that existing toolchain issue separately; do not turn this design task into an unrelated lint migration unless necessary to validate changed files.
- Run Prettier in check mode first. If formatting is needed, format only intentional changed files rather than the whole dirty worktree.
- Preserve the user's existing `.gitignore` modification and any unrelated worktree changes.

## 10. Definition of done

The work is complete when:

- the deployed landing still feels like the original noise-free digital business card;
- the portrait and all original copy remain present;
- `My work` appears as one of four uniform icon actions;
- `/work` renders all ten approved public projects without calling GitHub or MongoDB;
- desktop shows the C1 equal-card grid and mobile shows the approved single-column layout;
- live previews are current, lazy, non-interactive, failure-tolerant, and do not mount ten apps on mobile;
- Platter and Blockparty show a clean disabled state until their HTTPS endpoints are repaired;
- both complete light and dark themes work, system is the default, and manual override persists;
- keyboard, touch, reduced-motion, zoom, contrast, and responsive acceptance checks pass;
- `npm run build` succeeds;
- screenshots of both pages are captured at 390×844 and 1440×900 for final review.

## 11. Assumptions locked by this plan

- Route name is `/work`.
- The showcase includes all ten public non-portfolio projects listed above and no private repos.
- Project metadata is curated in source control; only the preview contents are live.
- C1 is the selected desktop and mobile visual direction.
- The current introduction and tagline are not rewritten.
- The existing résumé remains a PDF link.
- Both light and dark themes are required; system preference is the default and users can override it.
- Preview failures must degrade to working app/source links rather than blocking the page.
