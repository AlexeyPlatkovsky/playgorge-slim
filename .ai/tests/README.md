# AI Test System

Drift-check suite for the AI capabilities in `playforge`. These scenarios verify that individual **agents** and full **pipelines** still honor their contracts. They are not product work.

The suite is run and judged by the `test-agents` agent (`.ai/agents/test-agents/AGENT.md`).

## What This Suite Tests

Two test levels:

- **Agent tests** — a single agent invoked in isolation, with fixtures standing in for any upstream stage. They verify one agent's input handling, refusal behavior, and output contract.
- **Pipeline tests** — a full multi-stage sequence with real agents end to end. They verify stage sequencing, handoff propagation, revision loops, and that the generated test is functionally correct.

Skill tests are out of scope.

## Execution Model

Every scenario runs as close to real as possible: real AI agents, and a live browser run (`npm run test:ui` against `automationexercise.com`) for any scenario that reaches Stage 2 implementation. There is no offline mode. Negative and behavioral scenarios that stop before implementation simply never reach a browser run — that is expected behavior, not a mode.

## Layout

```
.ai/tests/
  README.md                              # this file
  _shared/fixtures/                      # pre-baked handoff blocks shared across scenarios
  results/                               # gitignored — timestamped run logs
  agents/
    explorer/        scenarios/          # isolated explorer tests (none yet — see its README)
    developer/       scenarios/          # isolated developer tests
    test-reviewer/   scenarios/          # isolated test-reviewer tests
  pipelines/
    create-test-from-spec/ scenarios/    # full-pipeline tests
```

A **target** is any directory holding a `scenarios/` folder: `agents/developer`, `pipelines/create-test-from-spec`, and so on. `test-agents` is invoked with a list of targets.

## Scenario Card Schema

Every scenario card is a Markdown file under a target's `scenarios/` directory. It uses a uniform core, plus one optional block for pipeline-level cards.

Each card has three parts: a **heading line**, a **metadata preamble** of bold-label lines, and a set of `##` **sections**.

**Heading line** — `# Scenario NN — <name>`. The `NN` number is stable and traces to the card's history; numbers need not be contiguous within a directory.

**Metadata preamble** — bold-label lines immediately under the heading:

- **`Target:`** — the target directory, e.g. `agents/developer`.
- **`Level:`** — `agent` or `pipeline`.
- **`Fixtures:`** — fixture files injected for this scenario, or `none`.

**Core sections (all cards):**

- **`## Spec`** — the test specification handed to the agents.
- **`## Steps`** — the exact run steps: which agent to invoke, with which template, and which fixtures to inject.
- **`## Pass criterion`** — the condition that makes the scenario `PASS`.
- **`## Cleanup`** — how to restore the worktree, and when to record `SKIP` or `FAIL`.
- **`## Failure signals`** — what a failed run looks like (diagnostic aid).

**Optional section (pipeline cards only):**

- **`## Pipeline notes`** — the full stage sequence, revision-loop behavior, and loop limits.

A card may also embed an **inline handoff block** inside a section (see scenario 09) when a one-off fixture is not worth promoting to a shared file.

Minimal example:

```markdown
# Scenario NN — Short Name

**Target:** `agents/developer`
**Level:** agent
**Fixtures:** `_shared/fixtures/explorer-output-valid.md`

## Spec
> One-line test specification.

## Steps
1. Invoke the developer agent with ... and the injected fixture.
2. Evaluate the response against the pass criterion.

## Pass criterion
The condition that must hold for PASS.

## Cleanup
How to restore the worktree; when to record SKIP or FAIL.

## Failure signals
What a failed run looks like.
```

## Fixtures

`_shared/fixtures/` holds pre-baked handoff blocks. Inject them instead of running the upstream stage.

| File | Contents |
|---|---|
| `explorer-output-valid.md` | Well-formed EXPLORER OUTPUT for a products search spec |
| `explorer-output-no-context.md` | EXPLORER OUTPUT with no relevant files found |
| `developer-output-valid.md` | Well-formed DEVELOPER OUTPUT, all checks passed |
| `developer-output-lint-fail.md` | DEVELOPER OUTPUT with `npm run lint` failed |

## Running The Suite

Invoke the `test-agents` agent with a list of one or more targets, for example `agents/developer` and `pipelines/create-test-from-spec`. There is no `all` shorthand — name each target.

`test-agents` discovers each target's scenario cards, runs them with real agents, judges each against its pass criterion, continues past any failure, applies each card's cleanup, and writes a results log to `.ai/tests/results/<timestamp>.md` (gitignored).

## Pass / Fail

A scenario passes when its `Pass criterion` is met. It fails when the observed result contradicts that criterion, or when cleanup cannot restore the pre-scenario worktree state without touching unrelated work. Record results as `PASS`, `FAIL`, or `SKIP` (with reason).

Generated code that passes lint and tests is still disposable unless the user explicitly asks to keep it.

## Coverage

This table is a human reference only — it is not authoritative. `test-agents` discovers scenarios by globbing each target's `scenarios/` directory, not from this list.

| # | Scenario | Target | Level |
|---|---|---|---|
| 01 | Happy path — full pipeline, reviewer approves | `pipelines/create-test-from-spec` | pipeline |
| 02 | Developer blocks on missing EXPLORER OUTPUT | `agents/developer` | agent |
| 03 | Reviewer blocks on missing DEVELOPER OUTPUT | `agents/test-reviewer` | agent |
| 04 | Reviewer blocks on missing EXPLORER OUTPUT | `agents/test-reviewer` | agent |
| 05 | Explorer finds no existing context | `pipelines/create-test-from-spec` | pipeline |
| 06 | Raw locator violation caught by ESLint | `agents/developer` | agent |
| 07 | Reviewer returns Needs revision, developer fixes | `pipelines/create-test-from-spec` | pipeline |
| 08 | Two failed revision cycles — pipeline escalates | `pipelines/create-test-from-spec` | pipeline |
| 09 | Reviewer rejects on spec mismatch | `agents/test-reviewer` | agent |
| 10 | Search result opens product details | `pipelines/create-test-from-spec` | pipeline |
| 11 | Brand filter opens product details | `pipelines/create-test-from-spec` | pipeline |
| 12 | Product details subscription | `pipelines/create-test-from-spec` | pipeline |

The `explorer` agent has no isolated scenarios yet — it is exercised by the pipeline scenarios. See `agents/explorer/README.md`.
