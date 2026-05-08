---
name: bead-work
description: Ensure a relevant bead is active before any significant change begins. Enforces the cpw ID schema and hierarchy rules for epics, features, and tasks.
---

# bead-work

`bead-work` gates the start of significant work. It finds or proposes a tracking bead before any implementation begins. It does not write code or modify project files.

## When To Use

Run as the mandatory first step of every non-trivial pipeline, before writing code, editing files, or running significant operations.

## Mandatory Behavior

### 1. Check For An Active Bead

Run `bd list --status=in_progress`.

If any in-progress bead title covers the same goal, feature, or subsystem as the current task, state its ID and title. That bead is the active context. Proceed to the next pipeline step.

### 2. Search Open Beads

If no in-progress bead matches, run `bd search <task-keywords>` to locate open beads whose title or description covers the same goal or subsystem as the current task.

If such a bead exists, claim it with `bd update <id> --claim` and state the claimed bead. Proceed to the next pipeline step.

### 3. Propose A New Bead

If no relevant bead exists, propose a creation plan and wait for explicit user confirmation before running any `bd create` command.

Choose the proposal type based on scope:

| Scope | Proposal |
|---|---|
| Single focused change | Standalone task — no parent required |
| Medium multi-step work | Feature under an existing epic, plus at least 2 child tasks |
| Large body of new work | New epic, plus at least 2 immediate children (features or tasks) |

After confirmation, create the proposed structure using the commands below.

## ID Schema

The project prefix is `cpw`.

| Type | ID pattern | Notes |
|---|---|---|
| Epic | `cpw-NNN` (sequential) | Run `bd list --type=epic` to find the next number |
| Feature or Task under an epic | `cpw-NNN.N` | Assigned automatically by `bd` when `--parent=<epic-id>` is supplied |
| Standalone task | `cpw-NNN` | Sequential; no parent |

Do not manually assign child IDs. Supply `--parent=<epic-id>` and `bd` assigns the dotted suffix.

## Hierarchy Rules

- Supported hierarchy: `epic → feature → task`.
- An epic must have at least 2 immediate children (features or tasks).
- A feature must have at least 2 child tasks.
- A standalone task requires no parent and is always valid.
- When creating an epic or feature, create its minimum required children in the same operation.

Note: `bd` does not enforce minimum-child counts. These constraints are project policy enforced by this skill at creation time.

## Key Commands

```bash
# Find active and open work
bd list --status=in_progress
bd search <keywords>
bd list --status=open

# Claim an existing bead
bd update <id> --claim

# Create a standalone task
bd create --title="<title>" --type=task --priority=2

# Create an epic with two child tasks
bd create --title="<epic title>" --type=epic --priority=2
bd create --title="<child 1>" --type=task --priority=2 --parent=<epic-id>
bd create --title="<child 2>" --type=task --priority=2 --parent=<epic-id>

# Find next epic number
bd list --type=epic
```

## Output Contract

State exactly one outcome before proceeding:

- **Continuing**: `<ID> — <title>` (in-progress bead matched)
- **Claimed**: `<ID> — <title>` (open bead claimed)
- **Proposed**: description of the proposed bead structure, awaiting user confirmation
