---
name: implement-feature
description: Add new behavior in playforge while preserving Component-DSL boundaries and required verification.
---

# implement-feature

`implement-feature` is the execution capability for non-trivial additive work: page objects, components, assertion helpers, fixture extensions, ESLint rules, or combinations of those changes.

## When To Use

Use this skill when new behavior is being introduced.

Do not use it when the task is read-only review or behavior-preserving restructuring.

## Mandatory Behavior

### 1. Frame The Change

State the user-facing intent, touched abstractions, expected blast radius, success criteria, and intended verification.

If intent or scope is ambiguous, stop and surface the ambiguity before editing.

### 2. Read Required Context

Before editing, read only the relevant authoritative sources:

- `.ai/docs/project_specification.md`
- `docs/architecture/overview.md`
- `docs/guides/authoring-with-the-dsl.md`
- `docs/conventions/page-objects.md`
- `docs/conventions/components.md`
- `.ai/conventions/code.md`
- `.ai/conventions/verification.md`

When adding pages or components, also inspect the existing reference flows named in `.ai/conventions/code.md`. When touching framework primitives, inspect the relevant files under `framework/core/` or `framework/fixtures/`.

### 3. Implement Under Project Boundaries

Follow `.ai/conventions/code.md`.

If a needed framework primitive is missing, stop and surface it instead of bypassing the Component-DSL in tests.

### 4. Add Or Adjust Tests

Add or update tests at the risk level required by `.ai/conventions/code.md` and `.ai/conventions/verification.md`.

### 5. Verify

Run the checks required by `.ai/conventions/verification.md`.

If any required check fails, fix the underlying cause and re-run the full required set.

## Output Contract

Report the changed files, verification commands run, and any intentionally skipped checks with reasons.
