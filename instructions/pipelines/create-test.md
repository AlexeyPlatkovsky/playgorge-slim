# Create-Test Pipeline
 
## Responsibility
Sequence the creation of a new test from request to verified closure. This file orders the steps; each step's procedure lives in its own skill or agent.
 
## Sequence
1. Analyze requirement — follow the skill at `<clarify-skill-path>`; do not continue until the user confirms the scope.
2. Craft test cases — follow `instructions/skills/craft-test-cases.md`; do not continue until the case table is produced.
3. Implement — follow `instructions/skills/implement-test.md`; do not continue until the spec file and covered case IDs are reported.
4. Review — run the agent at `<reviewer-agent-path>` on the changed spec; do not continue until its table and verdict are returned.
5. Close — follow `instructions/skills/task-complete.md`; the run ends only when it declares completion.
 
Never skip a step, reorder steps, or start a step before the previous step's output exists.
