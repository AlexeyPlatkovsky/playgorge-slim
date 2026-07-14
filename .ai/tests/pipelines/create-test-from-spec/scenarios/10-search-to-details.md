# Scenario 10 — Search Result Opens Product Details

**Target:** `pipelines/create-test-from-spec`
**Level:** pipeline
**Fixtures:** none — all three stages run with live AI execution

## Spec

> Searching for "Blue Top" on the Products page lets the user open the product details page and verify structured product information.

## Pipeline notes

Runs the full `create-test-from-spec` stage sequence for a multi-step search-to-details flow. Confirms the generated test reuses existing Products and Product Details abstractions rather than duplicating them.

1. **Stage 1 — Explorer** scans `pages/`, `pages/components/`, `tests/ui/`, `assertions/`, `framework/fixtures/`. Produces EXPLORER OUTPUT identifying reusable Products and Product Details page objects.
2. **Stage 2 — Developer** adds a disposable test to `tests/ui/products.spec.ts` and runs `npm run typecheck`, `npm run lint`, `npm run test:ui`. Produces DEVELOPER OUTPUT.
3. **Stage 3 — Reviewer** evaluates the multi-step flow for DSL compliance, selector quality, and reuse.

## Steps

1. If `tests/ui/products.spec.ts` has pre-existing uncommitted changes before the scenario, record `SKIP` with reason `dirty scenario target`.
2. Invoke Stage 1 (explorer) with the explorer template, the scenario path, the spec above, target `Products search to product details flow`, and injected fixtures `none`.
3. Invoke Stage 2 (developer) with the developer template, the scenario path, the spec, the complete EXPLORER OUTPUT, and reviewer findings `none`.
4. Invoke Stage 3 (reviewer) with the reviewer template, the scenario path, the spec, the complete EXPLORER OUTPUT, the complete DEVELOPER OUTPUT, and revision cycle `none`.

## Pass criterion

The reviewer verdict is `Approve` or `Approve with minor fixes` AND the changed file is `tests/ui/products.spec.ts` only AND the DEVELOPER OUTPUT block shows `npm run typecheck — passed`, `npm run lint — passed`, and `Browser verification — passed`.

The generated test uses `ProductsPage.searchProducts`, `ProductsPage.openProductDetails`, `ProductDetailsPage.isOpened`, and assertion helpers; asserts URL/search state before opening details; validates name, category, price, availability, condition, and brand on the details page; and contains no raw Playwright locators.

## Cleanup

Restore `tests/ui/products.spec.ts` to its pre-scenario state. If it has pre-existing uncommitted changes before the scenario, record `SKIP` with reason `dirty scenario target`. If cleanup cannot restore the pre-scenario worktree state without touching unrelated changes, record `FAIL`.

## Failure signals

The explorer misses the existing Product Details page object. The developer duplicates page objects, uses raw locators in the test, or omits browser verification. The scenario leaves products-spec edits in the worktree after cleanup.
