# UX improvement roadmap

**Status:** initial planning baseline · **Created:** 2026-11-15 · **Owner:** unassigned; repository owner to designate product/design/engineering reviewers.

## Scope and evidence

This roadmap accompanies seven newly scaffolded frontend screens. No existing ASF screen designs, business requirements, production app, analytics, or user research were provided. Screen inventory, priorities, sizes, and success targets are **hypotheses approved as starting defaults**, not observed usability defects or delivery promises. All nine linked issues are open work. Code bootstrap is not acceptance of the improvements.

The delivered baseline is a client-only React/TypeScript/Vite app with responsive navigation, fixtures, recoverable unknown routes, shared components, local interactions, component tests, and CI configuration. There is no backend, authentication, deployed site, support service, telemetry, or production persistence. API-dependent work cannot be completed by UI scaffolding alone.

## Priorities and sequencing

- **P0:** shared navigation/accessibility release blockers.
- **P1:** core comprehension, project discovery/detail, and trustworthy settings.
- **P2:** supporting workflow efficiency and self-service guidance.
- **S/M/L:** relative effort only; validate after discovery. No dates, assignees, or GitHub milestones are committed.

| Phase | Focus | Issues | Exit gate |
| --- | --- | --- | --- |
| 0 — Discovery | Confirm ASF domain, audience, screen inventory, terms, permission model, and user tasks. | Review all nine with stakeholders. | Agreed IA, metric definitions, data/state contracts, supported browsers, research plan, and owners. |
| 1 — Foundations | Harden navigation and audit shared tokens/accessibility/state patterns. | [NAV #1](https://github.com/priyapondi10-tech/asf-web-platform/issues/1), [A11Y #2](https://github.com/priyapondi10-tech/asf-web-platform/issues/2) | Keyboard/AT and responsive findings recorded; critical blockers resolved; reusable state patterns agreed. |
| 2 — Core workflows | Dashboard → Projects → Project Details, including return-to-list context. | [DASH #3](https://github.com/priyapondi10-tech/asf-web-platform/issues/3), [PROJECTS #4](https://github.com/priyapondi10-tech/asf-web-platform/issues/4), [DETAIL #6](https://github.com/priyapondi10-tech/asf-web-platform/issues/6) | Representative tasks pass on desktop/mobile; empty/error cases designed; API-dependent criteria tested with fixtures and explicitly gated. |
| 3 — Supporting workflows | Settings first for persistence semantics, then notification triage, history, and help. | [SETTINGS #7](https://github.com/priyapondi10-tech/asf-web-platform/issues/7), [NOTIFICATIONS #8](https://github.com/priyapondi10-tech/asf-web-platform/issues/8), [ACTIVITY #5](https://github.com/priyapondi10-tech/asf-web-platform/issues/5), [HELP #9](https://github.com/priyapondi10-tech/asf-web-platform/issues/9) | Cross-screen state/copy consistent; form/read-state recovery and content ownership agreed; no implied live service. |
| 4 — Release validation | Cross-screen usability, browser, accessibility, performance, and content review. | Verify acceptance evidence on all issues; no separate issue is implied. | Release checklist below met and production dependencies approved. |

Phase 2/3 discovery can overlap with Phase 1; final screen acceptance depends on shared navigation/accessibility. Priority expresses impact, not a rigid calendar order. Settings remains P1 even though its integration follows core workflows.

## Per-screen plan

### Dashboard — `/`

**Issue:** [#3](https://github.com/priyapondi10-tech/asf-web-platform/issues/3) · P1 · M · Depends on #1/#2 plus metric/API definitions.

- **Baseline:** sample counts and reusable project cards with clear demo labeling.
- **Next UX work:** validate information hierarchy, prioritize attention-needed work, make metric destinations meaningful, and distinguish unavailable metrics from zero.
- **Desktop/mobile:** desktop summary grid; mobile prioritizes the essential status and next action with matching reading order.
- **States:** first-use empty, loading, partial failure, stale/offline, retry, populated.
- **Acceptance focus:** users explain the metrics and reach the right project; status remains comprehensible without charts/color.
- **Proposed measure:** >=90% identify the highest-priority project within 15 seconds in a moderated task.

### Projects — `/projects`

**Issue:** [#4](https://github.com/priyapondi10-tech/asf-web-platform/issues/4) · P1 · M · Depends on #1/#2; coordinates list context with #6.

- **Baseline:** sample cards, labeled search/status filtering, shareable query state, result count, clear/no-results recovery, and filter URL passed to detail return links.
- **Next UX work:** validate sort/filter vocabulary, filter chips, list/card tradeoffs, pagination, and full Back/Forward/scroll restoration.
- **Desktop/mobile:** compare desktop scan density with compact cards; keep filters labeled and usable without crowding mobile results.
- **States:** workspace empty vs. no matches vs. permission/API failure; loading and long-content fixtures.
- **Acceptance focus:** copied URLs restore equivalent results and users return to the same list context; result counts are announced without stealing focus.
- **Proposed measure:** >=90% find a named project in a representative dataset.

### Project Details — `/projects/:projectId`

**Issue:** [#6](https://github.com/priyapondi10-tech/asf-web-platform/issues/6) · P1 · L · Depends on #1/#2/#4 and future API/permission contracts.

- **Baseline:** read-only overview, labeled sample progress/milestones, return link, and unknown-project recovery.
- **Next UX work:** confirm content hierarchy, decide whether sections/tabs are warranted, specify safe future actions and edit/conflict behavior, and preserve originating list context.
- **Desktop/mobile:** readable metadata/milestones on desktop; stacked sections and unobscured focus on mobile before considering sticky actions.
- **States:** loading, no milestones, missing/deleted, forbidden, offline/retry, and future editing pending/error/conflict.
- **Acceptance focus:** status/next milestone are understandable without color; inaccessible resources do not leak information; future mutations have permission and recovery tests.
- **Proposed measure:** >=90% identify status and next milestone in the task study.

### Activity — `/activity`

**Issue:** [#5](https://github.com/priyapondi10-tech/asf-web-platform/issues/5) · P2 · M · Depends on #1/#2, event/retention/permission contracts, and valid detail targets.

- **Baseline:** descending static event list, local project filter, explicit UTC timestamps.
- **Next UX work:** date grouping, user timezone semantics, useful filters/URL state, stable refresh, pagination, and privacy/retention rules.
- **Desktop/mobile:** scan-friendly event metadata; wrap long descriptions with project link and timestamp preserved at narrow widths.
- **States:** no events, no filtered results, initial loading, partial load failure, offline/stale, pagination end.
- **Acceptance focus:** deterministic order and dates, no duplicate/dropped events, and recovery that retains existing content.
- **Proposed measure:** >=90% locate the latest change to a named project.

### Notifications — `/notifications`

**Issue:** [#8](https://github.com/priyapondi10-tech/asf-web-platform/issues/8) · P2 · M · Depends on #1/#2, coordinates preferences with #7, and requires a persistent read-state API for production.

- **Baseline:** static items, unread filter, per-item and bulk in-memory read actions; reset scope is explicit.
- **Next UX work:** category/priority validation, read-on-open rules, reversible bulk changes, pending/rollback/retry, and a consistent cross-screen count source.
- **Desktop/mobile:** keep primary target and read action distinct; allow full titles and practical touch targets rather than hover-only controls.
- **States:** all/unread, no items, caught up, persistence pending/failure, stale or unavailable target.
- **Acceptance focus:** status conveyed beyond color, exact-once count changes, no unintended navigation, and rollback/retry once service-backed.
- **Proposed measure:** >=90% locate and resolve an unread item.

### Settings — `/settings`

**Issue:** [#7](https://github.com/priyapondi10-tech/asf-web-platform/issues/7) · P1 · M · Depends on #1/#2, approved privacy/auth/preferences contracts.

- **Baseline:** demo display-name/digest form, associated errors, dirty/save/reset behavior, and honest memory-only save feedback.
- **Next UX work:** validate preference grouping/defaults, add intentional unsaved-change flows, define server validation/conflicts, and coordinate digest semantics with #8.
- **Desktop/mobile:** readable bounded-width form; stacked fields/actions with labels and errors adjacent on small screens.
- **States:** pristine, dirty, invalid, reset, future pending/success/API failure/conflict.
- **Acceptance focus:** no silent input loss, predictable focus/errors, truthful persistence feedback, and no keyboard traps.
- **Proposed measure:** >=95% complete save-and-confirm task without silent data loss.

### Help — `/help`

**Issue:** [#9](https://github.com/priyapondi10-tech/asf-web-platform/issues/9) · P2 · S · Depends on #1/#2, confirmed terminology, documentation, and content ownership.

- **Baseline:** static searchable FAQs, native disclosures, and setup/roadmap links.
- **Next UX work:** validate top questions, stable answer anchors/contextual links, better search/no-results guidance, link checking, and a content review cadence.
- **Desktop/mobile:** readable answer width; disclosure/search controls and code content wrap without horizontal page scroll.
- **States:** relevant answers, no matches, expanded/collapsed answers; do not invent a live support SLA or endpoint.
- **Acceptance focus:** keyboard/disclosure semantics, working recovery and public documentation links; no private data in feedback.
- **Proposed measure:** >=80% resolve a representative setup/help task without assistance.

## Shared state and accessibility matrix

| State / concern | Starter coverage | Required follow-up |
| --- | --- | --- |
| Populated | Deterministic fixtures on all screens | Validate hierarchy and realistic long content. |
| No results | Projects and Help recovery; Notifications unread empty | Add dataset-empty and filter variants as applicable. |
| Unknown route/resource | Recoverable route and project fallbacks | Specify real missing vs. forbidden semantics with auth. |
| Loading/error/offline/stale | No service exists; not simulated as real behavior | Define contracts, shared patterns, fixtures, and retries before integration. |
| Forms/mutations | Local Settings validation and notification read state | Add server errors, permissions, cancellation/idempotency, conflicts, and rollback. |
| Responsive | CSS 3/2/1-column grids; sidebar/mobile menu | Test 320/390/768/1024/1440 CSS px, landscape, long labels, zoom. |
| Accessibility | Semantic HTML, labels, focus/skip/route patterns | Manual AT/keyboard/contrast/forced-colors review plus axe/browser tests (#1/#2). |

## Research, measurement, and ownership

1. Repository owner designates product, design, engineering, and content owners; none are auto-assigned.
2. Confirm the ASF domain, audience, critical journeys, and permission boundaries before adding more screens.
3. Run a small moderated study on representative desktop/mobile tasks; record qualitative failures as well as completion/time. Proposed targets above are not measured results or statistically validated commitments.
4. Agree sample size, baseline, performance budgets, privacy/consent requirements, and any analytics plan separately. No tracking code is installed.
5. Reprioritize issues using findings; link prototypes, decisions, test evidence, and follow-ups inside the corresponding issue.

## Definition of done / release gate

- [ ] Issue-specific acceptance criteria met, with product/design/engineering review and evidence.
- [ ] Typecheck, component tests, and production build pass; browser-level and accessibility checks added for critical paths.
- [ ] Supported desktop/mobile browsers, keyboard, VoiceOver/NVDA, reduced motion, forced colors, text resize, reflow, and measured contrast reviewed; blockers tracked/resolved.
- [ ] Empty/loading/error/offline/permission/long-content states covered where relevant; no demo-only behavior represented as production persistence.
- [ ] API/auth/authorization/privacy contracts approved and service-backed criteria tested before any production data is exposed.
- [ ] Documentation/content reviewed; no broken navigation, credentials, customer data, or unapproved telemetry.
- [ ] Hosting, licensing, security/dependency review, monitoring, and rollback decisions approved separately before production release.

Issue dependencies above are documentation links, not configured GitHub dependency metadata or milestones. Use the issue templates and [contributing guide](../CONTRIBUTING.md) to maintain this roadmap.
