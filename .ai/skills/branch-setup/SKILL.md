---
name: branch-setup
description: Determine whether a git branch is needed for the current task, derive its name from the task type, and create it from origin/main with the correct confirmation behavior.
---

# branch-setup

`branch-setup` decides whether to create a git branch, derives the branch name, and creates it.

## When To Use

Run as a pipeline step. Also invoked by `manager` for ad-hoc non-trivial work classified as a new feature or significant change.

## Decision Rules

### 1. Check For Uncommitted Changes

Run `git status --porcelain`. If any uncommitted changes exist, stop immediately and ask:

> There are uncommitted changes on `<current-branch>`. Commit, stash, or abort before continuing?

Do not proceed until the user resolves this.

### 2. Determine Whether A Branch Is Needed

| Current branch | Task | Action |
|---|---|---|
| `main` or `master` | Trivial | Skip |
| `main` or `master` | Non-trivial | Create silently |
| Feature branch | Trivial | Skip |
| Feature branch | Related to current branch | Skip — continue on current branch |
| Feature branch | Unrelated, non-trivial | Ask (see §4) |
| Any | User explicitly requested branch creation | Create silently |

### 3. Derive The Branch Name

Choose the prefix from the task type:

| Task type | Prefix |
|---|---|
| New behavior | `feature/` |
| Bug fix | `fix/` |
| Behavior-preserving restructuring | `refactoring/` |
| CI, config, docs, tooling | `chore/` |

Name format:
- `<prefix><slugified-task-description>` → e.g. `fix/login-button-broken`

Slugify: lowercase; spaces and special characters replaced with hyphens; no leading or trailing hyphens.

### 4. Ask When Required

When the current branch is not `main`/`master` and the user did not explicitly request branch creation:

> Should I create branch `<derived-name>`?

If yes → create. If no → stop and do not create.

### 5. Create The Branch

```bash
git fetch origin main
git checkout -b <branch-name> origin/main
```

## Output Contract

State exactly one outcome before proceeding:

- **Skipped**: `<reason>` (trivial task / ongoing related work)
- **Created**: `<branch-name>` from `origin/main`
- **Blocked**: uncommitted changes — waiting for user resolution
