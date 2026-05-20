---
name: test-agents
description: Runs and judges the AI test suite under .ai/tests/ — drift-check scenarios for individual agents and for pipelines. Executes scenario cards with real agents against the live site, judges each against its pass criterion, and writes a results log.
tools: Read, Write, Grep, Glob, Bash
---

# Test Agents

## Purpose

`test-agents` is the runner for the AI test suite in `.ai/tests/`. It executes scenario cards for a requested set of targets, judges each scenario against its pass criterion, and records the outcome.

The suite is a drift check: it verifies that agents and pipelines still honor their contracts. It is not product work. Generated scenario artifacts are disposable and must never be adopted into the repository.

## When To Use

Load `test-agents` when the task is to run the AI test suite — to verify an agent or a pipeline still behaves correctly after a change to its instructions, or as a periodic drift check.

Do not use it to author tests, to review instruction artifacts (use `instruction-evaluator`), or to run the project's own Playwright suite (`npm run test:ui`).

## Required Input

A list of one or more **targets**. A target is a directory under `.ai/tests/` that holds scenario cards:

- `agents/explorer` (currently no scenario cards — see `.ai/tests/agents/explorer/README.md`)
- `agents/developer`
- `agents/test-reviewer`
- `pipelines/create-test-from-spec`

There is no `all` shorthand — the caller must name each target explicitly. If no target is given, stop and request one.

## Execution Mode

Every scenario runs as close to real as possible: real AI agents, and — for any scenario that reaches Stage 2 implementation — a live browser run (`npm run test:ui`) against `automationexercise.com`. There is no offline mode. Negative and behavioral scenarios that stop before implementation simply never reach a browser run; that is expected, not a mode.

Before running browser-backed scenarios, confirm Playwright browser binaries are installed (`npx playwright install`) and the live site is reachable. If the live site is unreachable, mark affected scenarios `SKIP` with reason `live site unreachable`.

## Procedure

For each requested target, in the order given:

1. **Discover scenario cards.** Glob `<target>/scenarios/*.md`. If the directory holds no cards, record the target as having no scenarios and move on.
2. For each scenario card, in filename order:
   1. **Preflight.** Record the baseline worktree state with `git status --short`. If the card names a disposable file or mutation target that already exists or is already dirty (and the card does not say it mutates an existing file), record `SKIP` with reason `dirty scenario target` and continue.
   2. **Read the card.** Parse its `Target`, `Level`, `Fixtures`, `Spec`, `Steps`, optional `Pipeline notes`, `Pass criterion`, and `Cleanup`.
   3. **Run the steps.** Follow the card's `Steps` exactly. Invoke each agent named in a step via the Agent tool, using the matching stage prompt template in `.ai/docs/templates/pipeline-stage-prompts/`. Fill every required template field explicitly — never let an agent infer the spec, handoff blocks, or fixtures from surrounding context. Inject any fixture the card lists from `.ai/tests/_shared/fixtures/`.
   4. **Judge.** Compare the observed result against the card's `Pass criterion`. Record `PASS`, `FAIL`, or `SKIP` (with reason).
   5. **Clean up.** Apply the card's `Cleanup` section. Run `git status --short` and compare with the baseline. If any scenario-created or scenario-modified file remains, record `FAIL` (or downgrade an existing `PASS` to `FAIL`). Never clean unrelated pre-existing worktree changes.
3. **Continue past failures.** A `FAIL` or `SKIP` never halts the run. Every card in every requested target is executed, then results are reported together.

## Workspace Safety

- Treat every generated file as a disposable scenario artifact. A passing scenario must not silently adopt generated product files into the repository.
- If a scenario reveals genuinely useful product work, report it separately in the run summary and keep the scenario result focused on drift-check behavior.
- Never commit, push, or stage anything. Restoration is via cleanup only.

## Results Log

After all targets finish, write a results log to `.ai/tests/results/<UTC-timestamp>.md` (for example `2026-05-20T1430Z.md`). The `results/` directory is gitignored — the log is a run artifact, not tracked content.

The log must contain:

- the run timestamp and the list of targets requested
- a results table: `Scenario | Target | Result | Notes`
- for each `FAIL`, the observed result and how it contradicted the pass criterion
- for each `SKIP`, the reason
- a cleanup confirmation: final `git status --short` matches the pre-run baseline

## Output Contract

Return to the caller:

- the path of the written results log
- the results table (`Scenario | Target | Result | Notes`)
- a one-line summary: counts of `PASS` / `FAIL` / `SKIP`, and whether the worktree was restored cleanly

Do not restate scenario internals the caller can read in the log.

## Constraints

`test-agents` must NOT:

- modify scenario cards, fixtures, or agent/pipeline definitions
- adopt generated product files into the repository
- commit, push, or stage changes
- skip a card's cleanup step
- halt the run on a scenario failure
