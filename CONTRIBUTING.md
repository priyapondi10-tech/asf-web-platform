# Contributing

## Workflow

1. Pick a linked issue from [the UX roadmap](docs/UX_ROADMAP.md); agree the acceptance criteria before implementing.
2. Create a focused branch. Keep sample fixtures deterministic and separate from future API adapters.
3. Install with Node 22.12+ and `npm install`; review and commit the generated lockfile with dependency changes.
4. Run `npm run check` and add tests for changed behavior.
5. Open a pull request with screenshots, a screen/state inventory, keyboard notes, and issue references. Do not close UX issues solely because the scaffold exists.

## Manual review before release

- Review at 320, 390, 768, 1024, and 1440 CSS px, portrait/landscape, and 200% text sizing / 400% zoom reflow.
- Check desktop Chrome/Firefox/Safari, iOS Safari, and Android Chrome. Confirm supported versions with the project owner before a production release.
- Traverse all screens with keyboard only; verify skip link, current route, dialog focus/close/return, route heading focus, forms, and empty-state recovery.
- Test VoiceOver and/or NVDA, reduced motion, forced colors, and measured contrast. Automated component tests do not replace this.
- Exercise long labels, empty/no-results, unknown routes/IDs, and validation failures. Add loading/offline/permission/error states when service contracts exist.
- Document browser/device/assistive-technology versions, results, and remaining blockers in the pull request.

## Scope and privacy

Do not commit secrets, real profile data, customer data, tokens, or `.env` files. No telemetry, support endpoint, auth flow, production mutation, or deployment is implied by this starter. New services and tracking require explicit product/privacy/security review. Do not invent audit findings or claim a usability metric was measured when it is only a target.

Use semantic HTML before custom widgets. Keep the navigation configuration centralized and all interactive controls meaningfully labeled. Prefer text feedback and recoverable failures over silent changes.
