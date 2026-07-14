---
name: review-code
description: Review playforge changes against project rules without modifying repository files.
---

# review-code

`review-code` is the read-only execution capability for non-trivial code or instruction-system review.

## When To Use

Use this skill when the goal is to evaluate changes, branches, diffs, or instruction artifacts without implementing edits.

## Mandatory Behavior

### 1. Frame The Review Scope

State which files, branch, PR, or artifact set is in scope and what review depth is requested.

### 2. Load Relevant References

Read the project references needed for the review. For code review, include:

- `.ai/docs/project_specification.md`
- `docs/architecture/overview.md`
- `docs/conventions/page-objects.md`
- `docs/conventions/components.md`
- `.ai/conventions/code.md`
- `.ai/conventions/verification.md`

For instruction-system review, include the applicable manifesto stage, canonical protocols, root contract, skills, pipelines, conventions, and project profile.

### 3. Inspect The Scope

For code changes, inspect in dependency order: framework, assertions, pages, tests.

Check DSL boundaries, naming and placement, test tagging, assertion helper usage, reporting boundaries, ESLint guardrail risk, and verification sufficiency.

For instruction-system changes, check root contract validity, protocol coverage, layer purity, duplicated authority, validation gates, and risky structural changes.

### 4. Produce Findings

Lead with findings ordered by severity and grounded in file references.

Use these sections:

- **Blocking**
- **Non-blocking**
- **Questions**

Empty sections are allowed.

## Output Contract

Do not modify repository files. Report findings and note any residual verification gaps.
