# Scenario 01 — Happy Path

**Target:** `pipelines/create-test-from-spec`
**Level:** pipeline
**Fixtures:** none — all three stages run with live AI execution

## Spec

> Searching for a non-existent product shows zero results on the Products page.

## Pipeline notes

Runs the full `create-test-from-spec` stage sequence with no fixtures:

1. **Stage 1 — Explorer** receives the spec. Scans `pages/`, `pages/components/`, `tests/ui/`, `assertions/`, `framework/fixtures/`. Produces EXPLORER OUTPUT.
2. **Stage 2 — Developer** receives the spec + EXPLORER OUTPUT. Implements the test and runs `npm run typecheck`, `npm run lint`, and `npm run test:ui`. Produces DEVELOPER OUTPUT.
3. **Stage 3 — Reviewer** receives both blocks. Evaluates DSL compliance, selector quality, flakiness, and reuse. Produces Verdict + Findings.

No revision cycles are expected on the happy path.

## Steps

1. Invoke Stage 1 (explorer) with the explorer template, the scenario path, the spec above, target `Products page search flow`, and injected fixtures `none`.
2. Invoke Stage 2 (developer) with the developer template, the scenario path, the spec, the complete EXPLORER OUTPUT, and reviewer findings `none`.
3. Invoke Stage 3 (reviewer) with the reviewer template, the scenario path, the spec, the complete EXPLORER OUTPUT, the complete DEVELOPER OUTPUT, and revision cycle `none`.

## Pass criterion

The reviewer verdict is `Approve` or `Approve with minor fixes` AND the changed file is `tests/ui/products.spec.ts` (no new spec file created) AND the DEVELOPER OUTPUT block shows `npm run typecheck — passed`, `npm run lint — passed`, and `Browser verification — passed`.

The generated test must use `searchProducts`, `assertUrl`, `assertTextEquals`, and `assertCount` with no raw Playwright locators.

## Cleanup

Restore `tests/ui/products.spec.ts` to its pre-scenario state. If it has pre-existing uncommitted changes before the scenario, record `SKIP` with reason `dirty scenario target`. If cleanup cannot restore the pre-scenario worktree state without touching unrelated changes, record `FAIL`.

## Failure signals

The explorer omits relevant existing files. The developer creates a duplicate Products page or bypasses the DSL. The reviewer approves an implementation with raw Playwright selectors. The scenario leaves generated edits in the worktree after cleanup.
