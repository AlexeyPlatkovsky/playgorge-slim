---
name: manager
description: Centralized routing and completion enforcement for non-trivial project work.
---

# Manager

## Purpose
Classify non-trivial work, select the correct pipeline or direct execution path, verify handoff artifacts, and enforce completion.

## When to run
Load and follow this file before any non-trivial work, after the task is classified as non-trivial by the root contract.

## Procedure

### 1. Classify the Task

Explicitly state:
- complexity: trivial or non-trivial
- risk: low, medium, high, or system-level
- domain: create-test, modify-test, or other

If trivial, say so and proceed directly without this manager.

### 2. Route to the Correct Capability

| Trigger | Route | Risk Level |
|---------|-------|------------|
| User asks to create a new test | `instructions/pipelines/create-test.md` | Low to medium |
| User asks to modify an existing test | `instructions/skills/clarify-test-scope.md` then implement directly | Low |
| Other non-trivial work | Stop and ask the user for clarification | Variable |

### 3. Name Expected Output Artifacts

For the **create-test pipeline**, the expected artifacts in order are:
- `Skill: clarify-test-scope - output below`
- `Skill: craft-test-cases - output below`
- `Skill: implement-test - output below`
- `Agent: test-reviewer - output below`
- `Skill: task-complete - output below`

For **modify-test** (direct execution), the expected artifacts are:
- `Skill: clarify-test-scope - output below`
- `Agent: test-reviewer - output below`

### 4. Verify Handoff Artifacts

At each non-trivial routed handoff, inspect the previous step's output artifact before advancing. Do not advance when the expected artifact is absent. Raw tool output or a private recollection does not satisfy a handoff artifact.

### 5. Documentation Maintenance Check

After the substantive work and before task-complete, check whether documentation maintenance is needed. The trigger applies when the change affects project behavior, interfaces, commands, architecture, or domain facts. Adding a test file rarely triggers this — state the conclusion out loud.

### 6. Enforce Task-Complete

Append `task-complete` as the final step of every non-trivial routed work. Before invoking it, verify every required planned output artifact is present in the conversation. If any is missing, return to the missing step or report the missing artifact as a blocker.

## Output Contract

At routing time, emit a short execution plan:

`Manager: manager - output below`

Include:
- task classification
- selected pipeline or immediate next capability
- validation and review requirements
- documentation maintenance step if its trigger applies
- expected output artifact for each non-trivial routed handoff
- explicit final `task-complete` step
