---
name: create-test
description: Sequence the creation of a new test from request to verified closure.
---

# Create-Test Pipeline

## Responsibility
Sequence the creation of a new test from request to verified closure. This file orders the steps; each step's procedure lives in its own skill or agent.

## Sequence
1. **Clarify test scope** — follow `instructions/skills/clarify-test-scope.md`. Before advancing, verify the output artifact `Skill: clarify-test-scope - output below` is present.
2. **Craft test cases** — follow `instructions/skills/craft-test-cases.md`. Before advancing, verify the output artifact `Skill: craft-test-cases - output below` is present.
3. **Implement** — follow `instructions/skills/implement-test.md`. Before advancing, verify the output artifact `Skill: implement-test - output below` is present.
4. **Review** — run `instructions/agents/test-reviewer.md` on the changed spec. Before advancing, verify the output artifact `Agent: test-reviewer - output below` is present and the verdict is `approve`.
5. **Close** — follow `instructions/skills/task-complete.md`. Before advancing, verify the output artifact `Skill: task-complete - output below` is present.

Never skip a step, reorder steps, or start a step before the previous step's output artifact exists.
