# Validation report — 12 October 2026

Environment: Linux, Node.js 24.19.0, Chromium 153.0.8010.0, Playwright 1.64.0, axe-core integration 4.13.0. See package-lock.json for resolved versions.

## Executed results

- `npm test`: 8 passed, 0 failed. Valid input, empty input, whitespace-only description, malformed email, unsupported enums, exact size limits, invalid lengths and normalization without mutation.
- `npm run build`: TypeScript checking and Vite production build passed.
- `npm run test:e2e`: 5 passed, 0 failed on the corrected build.
  1. Summary focus, error-to-field navigation, input preservation, ARIA attributes.
  2. Keyboard-only completion, skip link, reverse tab navigation, confirmation focus and reset.
  3. Recovery after invalid submission, escaped text rendering and reset on reload.
  4. axe checks on initial/error/confirmation states, tags wcag2a/wcag2aa/wcag21aa: zero violations in those checks.
  5. No horizontal document overflow at 390 px and 320 px, with successful mobile submission.
- `npm audit --omit=dev`: zero known production dependency advisories returned during this run. Not a security certification; development dependencies were excluded.

## Defect found and fixed

The first browser run passed 4/5 tests. The narrow layout test found horizontal overflow at 320 px. The header's brand and demonstration badge needed wrapping; the description helper layout also received a narrow-screen rule. After correction, all five browser tests passed.

## Evidence

`unit-test-output.txt`, `browser-test-results.json`, `dependency-audit.json`, and the real screenshots/video in `media/`.

## Not verified

Manual NVDA/VoiceOver use, real devices, Firefox/Safari, high contrast mode, browser zoom and testing with disabled users. No backend or network behavior is implemented. No GitHub Actions run or public deployment was performed. These results do not establish WCAG compliance.
