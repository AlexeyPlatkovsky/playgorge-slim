# code-review

Ordered pipeline for reviewing changes in playforge.

## When To Use

Use this pipeline for non-trivial review work where the goal is to evaluate changes against project rules without implementing edits.

For trivial review (one-line obvious correctness check), proceed directly without a pipeline.

If review surfaces required changes that the user wants implemented, handle that as a separate task.

## Sequence

1. Run `.ai/skills/review-code/SKILL.md`.

## Validation Gate

`review-code` must complete its output contract with explicit Blocking, Non-blocking, and Questions sections. The review is read-only.
