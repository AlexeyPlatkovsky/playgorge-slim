# Scenario 12 — Product Details Subscription

**Target:** `pipelines/create-test-from-spec`
**Level:** pipeline
**Fixtures:** none — all three stages run with live AI execution

## Spec

> A user can navigate from Products to the Blue Top details page and successfully subscribe from the details-page footer.

## Pipeline notes

Runs the full `create-test-from-spec` stage sequence for a cross-page flow. Confirms reuse of product navigation and footer subscription components across pages.

1. **Stage 1 — Explorer** scans `pages/`, `pages/components/`, `tests/ui/`, `assertions/`, `framework/fixtures/`. Produces EXPLORER OUTPUT identifying reusable product navigation and footer subscription components.
2. **Stage 2 — Developer** adds a disposable test to `tests/ui/products.spec.ts` and runs `npm run typecheck`, `npm run lint`, `npm run test:ui`. Produces DEVELOPER OUTPUT.
3. **Stage 3 — Reviewer** evaluates cross-page component reuse, DSL compliance, and verification completeness.

## Steps

1. If `tests/ui/products.spec.ts` has pre-existing uncommitted changes before the scenario, record `SKIP` with reason `dirty scenario target`.
2. Invoke Stage 1 (explorer) with the explorer template, the scenario path, the spec above, target `Product details footer subscription flow`, and injected fixtures `none`.
3. Invoke Stage 2 (developer) with the developer template, the scenario path, the spec, the complete EXPLORER OUTPUT, and reviewer findings `none`.
4. Invoke Stage 3 (reviewer) with the reviewer template, the scenario path, the spec, the complete EXPLORER OUTPUT, the complete DEVELOPER OUTPUT, and revision cycle `none`.

## Pass criterion

The reviewer verdict is `Approve` or `Approve with minor fixes` AND the changed file is `tests/ui/products.spec.ts` only AND the DEVELOPER OUTPUT block shows `npm run typecheck — passed`, `npm run lint — passed`, and `Browser verification — passed`.

The generated test uses `ProductsPage.openProductDetails`, `ProductDetailsPage.isOpened`, `ProductDetailsPage.subscription.subscribeAs`, and assertion helpers; asserts details-page URL/readiness and the subscription success message; and contains no raw Playwright locators.

## Cleanup

Restore `tests/ui/products.spec.ts` to its pre-scenario state. If it has pre-existing uncommitted changes before the scenario, record `SKIP` with reason `dirty scenario target`. If cleanup cannot restore the pre-scenario worktree state without touching unrelated changes, record `FAIL`.

## Failure signals

The developer duplicates the subscription footer logic, uses raw locators in the test, forgets browser verification, or leaves products-spec edits in the worktree after cleanup.
