# Scenario 11 — Brand Filter Opens Product Details

**Target:** `pipelines/create-test-from-spec`
**Level:** pipeline
**Fixtures:** none — all three stages run with live AI execution

## Spec

> Filtering Products by the Polo brand still allows the user to open the Blue Top details page and verify the product information remains consistent.

## Pipeline notes

Runs the full `create-test-from-spec` stage sequence for a brand-filter-to-details flow. Confirms reuse of the brand sidebar, catalog, and product details abstractions.

1. **Stage 1 — Explorer** scans `pages/`, `pages/components/`, `tests/ui/`, `assertions/`, `framework/fixtures/`. Produces EXPLORER OUTPUT identifying the brand sidebar, catalog, and product details abstractions.
2. **Stage 2 — Developer** adds a disposable test to `tests/ui/products.spec.ts` and runs `npm run typecheck`, `npm run lint`, `npm run test:ui`. Produces DEVELOPER OUTPUT.
3. **Stage 3 — Reviewer** evaluates whether the test reuses the DSL and avoids brittle selectors.

## Steps

1. If `tests/ui/products.spec.ts` has pre-existing uncommitted changes before the scenario, record `SKIP` with reason `dirty scenario target`.
2. Invoke Stage 1 (explorer) with the explorer template, the scenario path, the spec above, target `Products brand filter to product details flow`, and injected fixtures `none`.
3. Invoke Stage 2 (developer) with the developer template, the scenario path, the spec, the complete EXPLORER OUTPUT, and reviewer findings `none`.
4. Invoke Stage 3 (reviewer) with the reviewer template, the scenario path, the spec, the complete EXPLORER OUTPUT, the complete DEVELOPER OUTPUT, and revision cycle `none`.

## Pass criterion

The reviewer verdict is `Approve` or `Approve with minor fixes` AND the changed file is `tests/ui/products.spec.ts` only AND the DEVELOPER OUTPUT block shows `npm run typecheck — passed`, `npm run lint — passed`, and `Browser verification — passed`.

The generated test uses `ProductsPage.openBrand`, `ProductsPage.openProductDetails`, `ProductDetailsPage.isOpened`, and assertion helpers; asserts the brand-filter URL/title; confirms `Blue Top` is visible in the filtered catalog; opens its details; validates product name and brand; and contains no raw Playwright locators.

## Cleanup

Restore `tests/ui/products.spec.ts` to its pre-scenario state. If it has pre-existing uncommitted changes before the scenario, record `SKIP` with reason `dirty scenario target`. If cleanup cannot restore the pre-scenario worktree state without touching unrelated changes, record `FAIL`.

## Failure signals

The developer bypasses `BrandSidebarComponent`, uses index-based selectors, opens a product unrelated to the filtered brand, or leaves products-spec edits in the worktree after cleanup.
