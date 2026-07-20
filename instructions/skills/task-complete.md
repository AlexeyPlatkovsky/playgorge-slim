---
name: task-complete
description: Close a pipeline run only when the result verifiably meets the original request.
---

# Task Complete

## Purpose
Close a pipeline run only when the result verifiably meets the original request.

## When to run
Run as the final step of a pipeline, after every earlier step has produced its output.

## Procedure
1. Verify that this is running as the final step of the create-test pipeline. If no expected artifact chain (`Skill: clarify-test-scope`, `Skill: craft-test-cases`, `Skill: implement-test`, `Agent: test-reviewer`) is visible in the conversation, refuse closure and require manager routing.
2. Restate the original request in one sentence.
3. Check: every planned output artifact from the pipeline is present in the conversation; every crafted case ID appears implemented in the reported spec file; the spec was executed and passed; the reviewer's verdict is `approve`; no checklist item from the confirmed scope is unaddressed.
4. If any check fails, refuse closure, name the failing check, and hand back to the step that owns it.
5. If all checks pass, produce the closure table and declare the task complete.

## Output Contract
Emit the closure table as a visible artifact:

`Skill: task-complete - output below`

Use exactly this three-column table:

| Step | Skill / Agent | Comment |
|------|---------------|---------|

Every executed step must appear as a row. Skipped steps must appear with an explanation. The Comment column must reference each step's output artifact label. Do not add extra columns.