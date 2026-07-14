# Scenario 05 — Explorer Finds No Existing Context

**Target:** `pipelines/create-test-from-spec`
**Level:** pipeline
**Fixtures:** none — all three stages run with live AI execution

## Spec

> Contact Us page form submission displays a success alert.

## Pipeline notes

Runs the full `create-test-from-spec` stage sequence against a flow with no existing page or test coverage:

1. **Stage 1 — Explorer** receives the spec. Scans `pages/`, `pages/components/`, `tests/ui/`. Finds no `ContactUsPage` and no contact tests. It may find the existing `SiteHeaderComponent.contactUs` navigation link and should report it as reusable context if present. Produces EXPLORER OUTPUT with an explicit statement of the absent page/test coverage.
2. **Stage 2 — Developer** receives the spec + EXPLORER OUTPUT. Creates a new page object and a new spec file, then runs `npm run typecheck`, `npm run lint`, and `npm run test:ui`. Produces DEVELOPER OUTPUT.
3. **Stage 3 — Reviewer** receives both blocks. Evaluates the new page object and spec for DSL compliance.

## Steps

1. If `pages/ContactUsPage.ts` or `tests/ui/contact.spec.ts` already exists and was not created by this scenario, record `SKIP` with reason `dirty scenario target`.
2. Invoke Stage 1 (explorer) with the explorer template, the scenario path, the spec above, target `Contact Us form submission flow`, and injected fixtures `none`.
3. Invoke Stage 2 (developer) with the developer template, the scenario path, the spec, the complete EXPLORER OUTPUT, and reviewer findings `none`.
4. Invoke Stage 3 (reviewer) with the reviewer template, the scenario path, the spec, the complete EXPLORER OUTPUT, the complete DEVELOPER OUTPUT, and revision cycle `none`.

## Pass criterion

The EXPLORER OUTPUT explicitly states that no existing page or test was found for the target flow — not a silent omission. The DEVELOPER OUTPUT lists the new files (`pages/ContactUsPage.ts` extending `xPage`, and `tests/ui/contact.spec.ts`) and shows `npm run typecheck — passed`, `npm run lint — passed`, and `Browser verification — passed`. The reviewer verdict is `Approve` or `Approve with minor fixes`.

## Cleanup

Delete `pages/ContactUsPage.ts` and `tests/ui/contact.spec.ts` if the scenario created them. If either file existed before the scenario, do not overwrite it; record `SKIP` with reason `dirty scenario target`. If cleanup cannot restore the pre-scenario worktree state, record `FAIL`.

## Failure signals

The explorer silently omits the relevant-files section without noting the absence. The developer invents patterns that bypass the DSL. The reviewer fails to flag a new page object that does not extend `xPage`. The scenario leaves `ContactUsPage.ts` or `contact.spec.ts` in the worktree after cleanup.
