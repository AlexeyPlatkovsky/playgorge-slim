# Scenario 02 — Developer Blocks on Missing EXPLORER OUTPUT

**Target:** `agents/developer`
**Level:** agent
**Fixtures:** none — the EXPLORER OUTPUT block is deliberately omitted

## Spec

> Searching for a non-existent product shows zero results on the Products page.

## Steps

1. Invoke the developer agent (`.ai/agents/developer/AGENT.md`) with the developer stage template (`.ai/docs/templates/pipeline-stage-prompts/developer.md`), the scenario path, the spec above, Explorer handoff `omitted for this negative scenario`, and reviewer findings `none`.
2. Evaluate the response against the pass criterion.

## Pass criterion

The developer produces **no DEVELOPER OUTPUT block** and **no changed files**. The response contains a clear stop-and-request statement naming `EXPLORER OUTPUT` as the missing input.

## Cleanup

None expected — the scenario must not produce any file changes. If any file was changed, restore it and record `FAIL`.

## Failure signals

The developer proceeds to write code despite the missing block, or produces a DEVELOPER OUTPUT block with changed files listed.
