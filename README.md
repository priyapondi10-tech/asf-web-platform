# ASF Web Platform

A React + TypeScript + Vite frontend starter with shared desktop/mobile navigation, seven screen scaffolds, and an actionable UX backlog.

> **Demo only:** all projects, activity, and notifications are fixtures. Settings and read-state changes exist only while their screen is mounted and reset on navigation/reload. No authentication, backend, analytics, email, or deployment is configured. Do not enter sensitive information.

## Getting started

Use Node.js **22.12+** (Node 22 LTS recommended) and **npm 11**. CI validates this combination. An npm 10 resolver crash (`Cannot read properties of null (reading 'edgesOut')`) was observed with the patched dependency graph; use npm 11 rather than bypassing peer or security checks.

```sh
git clone https://github.com/priyapondi10-tech/asf-web-platform.git
cd asf-web-platform
nvm use                 # optional, if nvm is installed
npm install --global npm@11  # if npm 11 is not already installed
npm install
npm run dev
```

Open the local URL Vite prints. No environment variables or provider accounts are required.

```sh
npm run typecheck       # strict TypeScript checks
npm test                # Vitest + Testing Library component tests
npm run build           # typecheck and production bundle in dist/
npm run preview         # inspect the production bundle locally
npm run check           # all automated application checks
npm audit --audit-level=high  # dependency security gate used by CI
```

Direct dependencies are pinned. Review dependency updates and commit a generated npm lockfile when changing the dependency graph. GitHub Actions runs application checks and the dependency audit on pushes and pull requests; it does not deploy. CI actions are pinned to reviewed commit SHAs and receive read-only repository permissions.

## Screen inventory

Routes use `HashRouter` so refresh/deep links work on ordinary static hosting without rewrite rules. Example: `/#/projects/platform-foundation`. Hash routing is an intentional starter tradeoff, not an SEO recommendation for a public marketing site.

| Screen | Route | UX issue |
| --- | --- | --- |
| Dashboard | `/` | [#3](https://github.com/priyapondi10-tech/asf-web-platform/issues/3) |
| Projects | `/projects` | [#4](https://github.com/priyapondi10-tech/asf-web-platform/issues/4) |
| Project Details | `/projects/:projectId` | [#6](https://github.com/priyapondi10-tech/asf-web-platform/issues/6) |
| Activity | `/activity` | [#5](https://github.com/priyapondi10-tech/asf-web-platform/issues/5) |
| Notifications | `/notifications` | [#8](https://github.com/priyapondi10-tech/asf-web-platform/issues/8) |
| Settings | `/settings` | [#7](https://github.com/priyapondi10-tech/asf-web-platform/issues/7) |
| Help | `/help` | [#9](https://github.com/priyapondi10-tech/asf-web-platform/issues/9) |

Unknown routes/project IDs have recovery links. Projects supports shareable `q` and `status` query parameters inside the hash route. The starter includes search/filtering, sample notification triage, a validated local preferences form, and searchable FAQs; it does not pretend that these are production services.

## Project structure

```text
src/
  components/        Shared page, card, empty-state, and project-card UI
  data/              Typed deterministic fixtures
  layouts/           Shared desktop sidebar/header + mobile dialog navigation
  pages/             One component per agreed screen
  test/              Test environment setup
  App.tsx            Route composition and fallback
  App.test.tsx       Route and interaction smoke tests
  navigation.test.tsx Navigation and recovery regression tests
  navigation.ts      Single navigation configuration
  styles.css         Responsive design tokens and component styles
docs/
  ARCHITECTURE.md     Decisions, extension points, and scope boundaries
  DESIGN_SYSTEM.md    Tokens, breakpoints, and interaction conventions
  UX_ROADMAP.md       Phased, issue-linked per-screen UX plan
.github/             CI and contribution templates
```

## Navigation and accessibility baseline

- Desktop: persistent sidebar plus workspace header at 1024 CSS px and wider.
- Compact/mobile: labeled native menu dialog, explicit close action, Escape/backdrop dismissal, and scroll locking while open.
- Active route indication, breadcrumbs, a functional skip link, route titles/focus management, semantic landmarks, and visible focus styles.
- Responsive cards/forms, text status labels, native disclosure elements, and reduced-motion support.

These patterns are a baseline, **not a claim of WCAG compliance**. Real-browser, assistive-technology, contrast, touch, and zoom reviews remain tracked in [navigation #1](https://github.com/priyapondi10-tech/asf-web-platform/issues/1) and [accessibility #2](https://github.com/priyapondi10-tech/asf-web-platform/issues/2).

## Planning and contributing

Start with the [UX roadmap](docs/UX_ROADMAP.md), [architecture](docs/ARCHITECTURE.md), [design system](docs/DESIGN_SYSTEM.md), and [contributing guide](CONTRIBUTING.md). The nine issues describe remaining validation and enhancements, not completed production features. Priorities, estimates, and usability targets are provisional. No license has been selected; `UNLICENSED` prevents an accidental licensing choice.
