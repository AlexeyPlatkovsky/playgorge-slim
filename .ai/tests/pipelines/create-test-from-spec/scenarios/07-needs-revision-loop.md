# Scenario 07 — Reviewer Returns Needs Revision, Developer Fixes

**Target:** `pipelines/create-test-from-spec`
**Level:** pipeline
**Fixtures:** `_shared/fixtures/explorer-output-valid.md` + `_shared/fixtures/developer-output-lint-fail.md`

## Spec

> Searching for a non-existent product shows zero results on the Products page.

## Pipeline notes

Exercises the pipeline's revision loop across two cycles. The loop limit is 2 revision cycles, defined in `.ai/pipelines/create-test-from-spec.md`. This scenario confirms the loop terminates with an approval inside the limit.

## Steps

**Cycle 1**

1. Inject `_shared/fixtures/explorer-output-valid.md` and `_shared/fixtures/developer-output-lint-fail.md` as the Stage 1 and Stage 2 handoffs.
2. Invoke Stage 3 (reviewer) with the reviewer template, the scenario path, the spec, both complete fixture blocks, and revision cycle `cycle 1`.
3. Check: the verdict is `Needs revision` with at least one Blocking finding referencing the lint failure.

**Cycle 2**

4. Invoke Stage 2 (developer) with the developer template, the scenario path, the spec, the complete EXPLORER OUTPUT fixture, and the Cycle 1 reviewer findings.
5. Invoke Stage 3 (reviewer) with the reviewer template, the scenario path, the spec, the complete EXPLORER OUTPUT fixture, the Cycle 2 DEVELOPER OUTPUT, and revision cycle `cycle 2`.
6. Check: the verdict is `Approve` or `Approve with minor fixes`.

## Pass criterion

The Cycle 1 reviewer produces `Needs revision` with a Blocking finding. The Cycle 2 developer removes the raw locator (uses `productsPage.catalog`) and produces a DEVELOPER OUTPUT showing `npm run typecheck — passed`, `npm run lint — passed`, and `Browser verification — passed`. The Cycle 2 reviewer produces `Approve` or `Approve with minor fixes`. The revision loop terminates in exactly two cycles.

## Cleanup

Restore any file changes made by the Cycle 2 developer (typically `tests/ui/products.spec.ts`). If `tests/ui/products.spec.ts` has pre-existing uncommitted changes before the scenario, record `SKIP` with reason `dirty scenario target`. If cleanup cannot restore the pre-scenario worktree state without touching unrelated changes, record `FAIL`.

## Failure signals

The Cycle 1 reviewer approves despite the lint failure. The Cycle 2 developer fails lint again. The reviewer approves a non-passing handoff. The scenario leaves products-spec edits in the worktree after cleanup.
