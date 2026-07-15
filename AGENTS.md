# Playwright Project Root Contract
 
## Purpose
This fixture contains TypeScript and Playwright test code. Protect readable tests and preserve the separation between page objects, reusable components, and specs.
 
## Authority
- `package.json` defines available commands.
- `playwright.config.ts` defines test-runner behavior.
- `docs/conventions/page-objects.md` defines page-object rules.
- `docs/conventions/components.md` defines component rules.
- Existing files under `pages/`, `pages/components/`, and `tests/` show the current implementation style.
 
## Routing
- Before creating or updating a page object, read `docs/conventions/page-objects.md`.
- Before creating or updating a component, read `docs/conventions/components.md`.
- Test implementation work starts by reading the relevant existing test, page object, and component.
- Changes to test conventions require human review.
 
## Boundaries
- Do not expose secrets or commit generated credentials.
- Do not place page objects, components, or specs outside their documented folders without human approval.
- Do not report a test as passing without running it and observing the result.

## Capability Routing
- When the user asks to create or modify a test, follow the `clarify-test-scope` skill at `instructions/skills/clarify-test-scope.md` before reading or writing any code.
- After a test file has been created or modified, run the `test-reviewer` agent at `instructions/agents/test-reviewer.md` and report its verdict before declaring the work done.
- Before adding a new skill or agent, classify it with `docs/conventions/skill-vs-agent.md`.
