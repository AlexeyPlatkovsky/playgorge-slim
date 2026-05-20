# Scenario 08 — Two Failed Revision Cycles, Pipeline Escalates

**Target:** `pipelines/create-test-from-spec`
**Level:** pipeline
**Fixtures:** `_shared/fixtures/explorer-output-valid.md` + `_shared/fixtures/developer-output-lint-fail.md`

## Spec

> Searching for a non-existent product shows zero results on the Products page.

## Pipeline notes

Exercises the pipeline's revision-loop **limit**. The limit is 2 revision cycles, defined in `.ai/pipelines/create-test-from-spec.md`. This scenario simulates a developer that cannot resolve the issue and confirms the operator stops and escalates rather than initiating a third cycle.

`_shared/fixtures/developer-output-lint-fail.md` is re-used as the developer output in both cycles — the simulated developer never fixes the failure.

## Steps

**Cycle 1**

1. Inject `_shared/fixtures/explorer-output-valid.md` and `_shared/fixtures/developer-output-lint-fail.md`.
2. Invoke Stage 3 (reviewer) with the reviewer template, the scenario path, the spec, both complete fixture blocks, and revision cycle `cycle 1`.
3. Check: the verdict is `Needs revision`.

**Cycle 2**

4. Re-inject `_shared/fixtures/developer-output-lint-fail.md` as the new (still failing) developer output.
5. Invoke Stage 3 (reviewer) with the reviewer template, the scenario path, the spec, the complete EXPLORER OUTPUT fixture, the re-injected DEVELOPER OUTPUT fixture, and revision cycle `cycle 2`.
6. Check: the verdict is `Needs revision` again.

**Escalation**

7. Do not initiate a Cycle 3. The operator stops the loop, notes that the maximum revision cycles (2) have been reached, and surfaces the blocker to the user.

## Pass criterion

No Cycle 3 is initiated. An operator escalation message is present after Cycle 2. The message identifies the blocking issue and asks the user how to proceed (manual fix, abort, or expert review).

## Cleanup

None expected — both developer outputs are injected fixtures and no real implementation runs. If any file was changed, restore it and record `FAIL`.

## Failure signals

A third developer cycle is initiated. The pipeline loops indefinitely. The reviewer approves a non-passing handoff.
