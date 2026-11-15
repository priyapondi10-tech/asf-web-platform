# Design system baseline

All tokens live in `src/styles.css`. Treat these as starter conventions to validate, not a finalized brand identity.

## Tokens

| Category | Baseline |
| --- | --- |
| Color | Dark navy text/sidebar; blue action/accent; light neutral canvas; explicit text labels on status badges. |
| Typography | System UI stack; fluid page title; 1rem body with 1.55 line height. |
| Space | CSS variables at 0.5, 1, 1.5, and 2rem; responsive page padding. |
| Shape | 0.75rem cards, smaller controls, consistent 1px borders. |
| Focus | High-visibility 3px outline with offset; no removal of keyboard focus. |
| Targets | Controls use a minimum 2.75rem height; inline prose links remain inline. |
| Layout | Desktop sidebar from 64rem; cards reduce from three to two to one column at 64/40rem. |

## Components / interactions

`Page` owns the screen h1 and description. `Card` supplies a shared surface with an optional h2. `EmptyState` explains absence and offers a meaningful recovery action. `ProjectCards` reuses status/progress labels and detail navigation. Shared navigation is declared once and rendered in the sidebar and mobile dialog.

The menu trigger exposes expanded/controls state. The dialog has a visible name and close action, uses native modal focus behavior, locks body scroll while open, closes on route selection/desktop resize, and supports Escape/backdrop dismissal. Route changes update the document title and focus the new h1. The skip link focuses main without modifying the hash route.

Use persistent labels, text errors associated via `aria-describedby`, `aria-invalid` for invalid fields, and polite status messages for local updates. Prefer native form/disclosure/progress elements. Respect reduced motion and allow content wrapping; do not encode state solely in color.

## Release checks still required

Measure all color pairs, inspect forced-colors behavior, test 320 CSS px and high zoom, and validate screen-reader/touch/native-dialog behavior across supported browsers. Add automated axe/browser tests and document results through [#2](https://github.com/priyapondi10-tech/asf-web-platform/issues/2). No formal conformance claim is made by the starter.
