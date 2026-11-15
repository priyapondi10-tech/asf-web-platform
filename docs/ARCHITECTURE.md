# Architecture and decisions

## Approved starter scope

React, TypeScript, and Vite compose a client-only application. The initial information architecture is a general-purpose platform assumption approved as the starting default, not a domain-specific ASF requirements specification. Seven screen components share an application shell and reusable UI. No existing design, production app, or user research was supplied.

## Decisions

| Area | Decision | Rationale / tradeoff |
| --- | --- | --- |
| Routing | React Router `HashRouter` | Works with static file hosting and refreshes; choose server-rewritten browser routing or SSR later if SEO/clean paths are required. |
| Desktop navigation | Sidebar/header from 1024 CSS px | Stable top-level wayfinding; validate the breakpoint and labels with real content. |
| Mobile navigation | Native modal `dialog` below 1024 CSS px | One shared route configuration, built-in focus containment/Escape; manual browser/AT testing remains required. |
| State | URL search params for Projects; component state elsewhere | Keeps demo scope explicit and dependencies small. No localStorage or cookies. |
| Data | Typed static fixtures | Deterministic demo/test behavior, no credentials or customer data. |
| Styling | Plain CSS custom properties | Small, inspectable token system with no styling runtime. |
| Quality | Strict TypeScript + Vitest/Testing Library + CI | Fast component checks; no current browser E2E or accessibility certification. |

## Extension points

- Keep domain/service adapters separate from `src/data/demo.ts`; add request cancellation, typed responses, retry rules, and response fixtures when APIs are approved.
- Add an explicit authorization model before exposing real project details, profile information, or mutations. A hidden UI control is not authorization.
- Define loading, empty, error, offline, stale, and forbidden states per screen using the roadmap. Do not manufacture fake loading/error controls for nonexistent services.
- Keep navigation labels/order in `src/navigation.ts`. Project detail routes belong to Projects in the primary navigation.
- Use shared tokens/components for future screens; retain local route headings and avoid nested main landmarks.
- Agree telemetry purposes/consent, hosting, domain, licensing, auth, data retention, and a backend contract separately. None is configured here.

## Known limitations

Settings and notification changes reset when their page unmounts or reloads. Activity has only a local project filter; Help searches static text. Project list/detail return preserves the filter URL but does not yet restore scroll. Menu focus behavior in jsdom is polyfilled for smoke tests; real native-dialog behavior must be checked in actual browsers. The sidebar is not collapsible. There is no deployment or production data integration.

See [the roadmap](UX_ROADMAP.md) for the difference between delivered baseline and remaining work.
