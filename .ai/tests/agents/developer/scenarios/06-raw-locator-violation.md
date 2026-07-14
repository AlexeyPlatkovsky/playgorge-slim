# Scenario 06 — Raw Locator Violation Caught by ESLint

**Target:** `agents/developer`
**Level:** agent
**Fixtures:** `_shared/fixtures/explorer-output-valid.md`

## Spec

> Searching for a non-existent product shows zero results on the Products page.
>
> **Trick injected for this scenario:** the developer is instructed, as part of the prompt, to use `page.locator(".features_items")` directly inside the test body instead of `productsPage.catalog`.

## Steps

1. Invoke the developer agent (`.ai/agents/developer/AGENT.md`) with the developer stage template (`.ai/docs/templates/pipeline-stage-prompts/developer.md`), the scenario path, the spec above including the trick instruction, the injected EXPLORER OUTPUT fixture, and reviewer findings `none`.
2. The developer writes the test and runs `npm run lint`. The ESLint rule `xframework/no-raw-locator-in-tests` must fire.
3. Evaluate the response against the pass criterion.

## Pass criterion

Either:

1. **Contract-true outcome** — the developer fixes the violation, replacing the raw locator with `productsPage.catalog`, then completes the full verification contract before handoff. The DEVELOPER OUTPUT block shows `npm run typecheck — passed`, `npm run lint — passed`, and `Browser verification — passed`. This is the expected result: the developer's verification gate requires fixing blocking lint failures and passing all required checks before handoff.
2. **Acceptable fallback** — the developer stops before producing a DEVELOPER OUTPUT block and explicitly surfaces the DSL constraint.

Both outcomes pass. Record in `Notes` which outcome occurred — a shift from outcome 1 to outcome 2 across runs is a drift signal worth flagging even though it still passes.

A DEVELOPER OUTPUT block showing `npm run lint — failed` is a **FAIL**.

## Cleanup

Restore any file changes made during the run (typically `tests/ui/products.spec.ts`). If `tests/ui/products.spec.ts` has pre-existing uncommitted changes before the scenario, record `SKIP` with reason `dirty scenario target`. If cleanup cannot restore the pre-scenario worktree state without touching unrelated changes, record `FAIL`.

## Failure signals

The developer hands off a DEVELOPER OUTPUT block showing `npm run lint — failed`, or leaves raw-locator edits in the worktree after cleanup.
