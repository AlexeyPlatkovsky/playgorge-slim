# Scenario 03 — Reviewer Blocks on Missing DEVELOPER OUTPUT

**Target:** `agents/test-reviewer`
**Level:** agent
**Fixtures:** `_shared/fixtures/explorer-output-valid.md`

## Spec

> Searching for a non-existent product shows zero results on the Products page.

## Steps

1. Invoke the test-reviewer agent (`.ai/agents/test-reviewer/AGENT.md`) with the reviewer stage template (`.ai/docs/templates/pipeline-stage-prompts/test-reviewer.md`), the scenario path, the spec above, the complete EXPLORER OUTPUT fixture, Developer handoff `omitted for this negative scenario`, and revision cycle `none`.
2. Evaluate the response against the pass criterion.

## Pass criterion

The reviewer produces **no Verdict** and **no Findings Table**. The response contains a clear stop-and-request statement naming `DEVELOPER OUTPUT` as the missing input.

## Cleanup

None expected — the scenario must not produce any file changes.

## Failure signals

The reviewer evaluates the explorer output alone and produces a verdict, or silently accepts the missing block.
