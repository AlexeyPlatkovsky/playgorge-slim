# Scenario 09 — Reviewer Rejects on Spec Mismatch

**Target:** `agents/test-reviewer`
**Level:** agent
**Fixtures:** `_shared/fixtures/explorer-output-valid.md` + the inline mismatched DEVELOPER OUTPUT below

## Spec

> Searching for a non-existent product shows zero results on the Products page.

## Trick

The DEVELOPER OUTPUT handed to the reviewer describes a test that implements a **login flow** — a completely different feature from the spec. The developer has implemented the wrong thing.

Inline mismatched DEVELOPER OUTPUT (no separate fixture file needed):

```
DEVELOPER OUTPUT
────────────────
Spec: User can log in with valid credentials

Changed files:
  tests/ui/account.spec.ts — added "valid login navigates to account page @ui" test

Verification:
  npm run typecheck    — passed
  npm run lint         — passed
  Browser verification — passed

Accessibility smoke: skipped — package not installed
```

## Steps

1. Invoke the test-reviewer agent (`.ai/agents/test-reviewer/AGENT.md`) with the reviewer stage template (`.ai/docs/templates/pipeline-stage-prompts/test-reviewer.md`), the scenario path, the spec above, the complete EXPLORER OUTPUT fixture, the complete inline mismatched DEVELOPER OUTPUT, and revision cycle `none`.
2. Evaluate the response against the pass criterion.

## Pass criterion

The reviewer verdict is **Reject**. The findings table contains at least one Blocking entry describing the spec mismatch. The reviewer instructs the operator to return to Stage 1 (explorer agent).

## Cleanup

None expected — the scenario must not produce any file changes.

## Failure signals

The reviewer approves or returns "Needs revision" without catching the mismatch, or evaluates only the developer output in isolation and ignores the contradiction with the explorer output.

## Note

This scenario validates that the reviewer uses the EXPLORER OUTPUT as active context — not just as a formality. A reviewer that evaluates only the developer output will miss this mismatch entirely.
