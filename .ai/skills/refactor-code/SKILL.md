---
name: refactor-code
description: Restructure existing playforge code while preserving behavior and verification baselines.
---

# refactor-code

`refactor-code` is the execution capability for behavior-preserving restructuring.

## When To Use

Use this skill when the goal is to reshape existing code without changing user-facing behavior.

Do not use it when behavior is being added, removed, or intentionally changed.

## Mandatory Behavior

### 1. Frame The Refactor

State what is being reshaped, why, what behavior must be preserved, the protective tests, and the intended verification.

If the refactor crosses into `framework/core/`, `framework/fixtures/`, or `eslint-plugin-xframework/`, stop and surface the system-level risk before editing.

### 2. Read Required Context

Read the existing implementation thoroughly before editing.

Also read the relevant authoritative sources:

- `.ai/docs/project_specification.md`
- `docs/architecture/overview.md`
- `docs/guides/authoring-with-the-dsl.md`
- `docs/conventions/page-objects.md`
- `docs/conventions/components.md`
- `.ai/conventions/code.md`
- `.ai/conventions/verification.md`

### 3. Establish A Behavior Baseline

Before editing, run targeted tests covering the touched behavior, `npm run typecheck`, and `npm run lint`.

If the baseline fails, stop and surface the failure instead of refactoring against an unstable state.

### 4. Refactor Under Project Boundaries

Follow `.ai/conventions/code.md`.

Preserve the public API of the touched abstraction unless the user has approved a breaking rename. Do not change behavior incidentally.

### 5. Verify Preservation

After editing, re-run the same targeted tests from the baseline, `npm run typecheck`, and `npm run lint`.

Run `npm run test` when shared framework behavior is touched. If a previously passing targeted test now fails or had to be modified, stop and surface the behavior change.

## Output Contract

Report the changed files, the before-and-after verification commands, and any intentionally skipped checks with reasons.
