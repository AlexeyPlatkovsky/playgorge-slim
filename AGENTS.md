# Playwright Project Root Contract

## Purpose
This fixture contains TypeScript and Playwright test code. Protect readable tests and preserve the separation between page objects, reusable components, and specs.

## Authority
- `package.json` defines available commands.
- `playwright.config.ts` defines test-runner behavior.
- `docs/conventions/page-objects.md` defines page-object rules.
- `docs/conventions/components.md` defines component rules.
- `docs/conventions/skill-vs-agent.md` defines how to classify execution capabilities.
- Existing files under `pages/`, `pages/components/`, and `tests/` show the current implementation style.

## Boundaries
- Do not expose secrets or commit generated credentials.
- Do not place page objects, components, or specs outside their documented folders without human approval.
- Do not report a test as passing without running it and observing the result.
- Changes to test conventions require human review.

## Classification and Routing
Before any non-trivial work, load and follow `instructions/manager.md`. It classifies the task, selects the correct pipeline or direct execution path, and enforces handoff verification and completion.

## Capability Registry
- **create-test pipeline** (`instructions/pipelines/create-test.md`): sequences the creation of a new test from request to verified closure.
- **clarify-test-scope skill** (`instructions/skills/clarify-test-scope.md`): turns an underspecified test request into a confirmed scope.
- **craft-test-cases skill** (`instructions/skills/craft-test-cases.md`): derives concrete test cases from a confirmed scope.
- **implement-test skill** (`instructions/skills/implement-test.md`): implements test cases as Playwright specs.
- **task-complete skill** (`instructions/skills/task-complete.md`): closure reporting for non-trivial routed work.
- **test-reviewer agent** (`instructions/agents/test-reviewer.md`): independent isolated-context review of changed test files.
- **instruction-evaluator agent** (`instructions/agents/instruction-evaluator.md`): reviews instruction artifacts for quality and compliance.
- **artifact-acceptance-tester agent** (`instructions/agents/artifact-acceptance-tester.md`): scenario-tests new or changed instruction artifacts.
