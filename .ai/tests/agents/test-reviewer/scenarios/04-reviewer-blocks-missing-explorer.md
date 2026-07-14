# Scenario 04 — Reviewer Blocks on Missing EXPLORER OUTPUT

**Target:** `agents/test-reviewer`
**Level:** agent
**Fixtures:** `_shared/fixtures/developer-output-valid.md`

## Spec

> Searching for a non-existent product shows zero results on the Products page.

## Steps

1. Invoke the test-reviewer agent (`.ai/agents/test-reviewer/AGENT.md`) with the reviewer stage template (`.ai/docs/templates/pipeline-stage-prompts/test-reviewer.md`), the scenario path, the spec above, Explorer handoff `omitted for this negative scenario`, the complete DEVELOPER OUTPUT fixture, and revision cycle `none`.
2. Evaluate the response against the pass criterion.

## Pass criterion

The reviewer produces **no Verdict** and **no Findings Table**. The response contains a clear stop-and-request statement naming `EXPLORER OUTPUT` as the missing input.

## Cleanup

None expected — the scenario must not produce any file changes.

## Failure signals

The reviewer evaluates only the developer output (without explorer context) and produces a verdict, or silently proceeds despite the missing block.

## Note

This scenario targets the asymmetric input-blocking fix committed in `38d9298`. Before that fix, the reviewer only blocked on a missing DEVELOPER OUTPUT — not on a missing EXPLORER OUTPUT. This scenario is the regression guard for that fix.
