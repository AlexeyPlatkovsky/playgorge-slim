# Evaluation Report: `.ai/skills/review-code/SKILL.md`

### Verdict

**Needs revision**

---

### Artifact Findings

| Artifact | Severity | Area | Finding | Suggested fix |
| --- | --- | --- | --- | --- |
| `review-code/SKILL.md` | Blocking | Responsibility / Layer Purity | The skill declares it handles both code review _and_ instruction-system review ("For instruction-system review, include the applicable manifesto stage, canonical protocols, root contract, skills, pipelines, conventions, and project profile"). Instruction-system review is not a code-review responsibility; it is the dedicated responsibility of the `instruction-evaluator` agent. `AGENTS.md` explicitly says: "use `instruction-evaluator` in place of `review-code` when reviewing skills, agents, pipelines, conventions, or adapters." The skill currently contradicts that routing gate and competes with the agent. | Remove the instruction-system review branch entirely. Keep `review-code` as a code-only execution capability. |
| `review-code/SKILL.md` | Major | Explicitness — trigger | The "When To Use" section is generic ("evaluate changes, branches, diffs, or instruction artifacts") and does not match `AGENTS.md`'s routing gate, which explicitly excludes instruction-artifact review from this skill. The skill's scope description invites misuse. | Rewrite "When To Use" to state the skill's actual scope: code changes, branches, PRs, and diffs. Add a negative case: "For instruction-artifact review, use `instruction-evaluator`." |
| `review-code/SKILL.md` | Major | Authority duplication | Step 2 "Load Relevant References" lists six specific files (the project spec, four doc files, two convention files) in a skill. The `code.md` convention already names the authoritative detail sources; `verification.md` names its own scope. Inlining this file list in the skill creates a second partial copy that can drift when sources change. | Replace the inline list with a reference: "Read the sources required by `.ai/conventions/code.md` and `.ai/conventions/verification.md`." Keep file names only if the convention genuinely does not cover that reference (check each one first). |
| `review-code/SKILL.md` | Major | Explicitness — stopping conditions | The skill contains no stopping condition. "When To Use" describes the scenario but does not define when the skill refuses to proceed (e.g., scope is ambiguous, conflicting references, artifact in scope is an instruction file). Peer skills `implement-feature` and `refactor-code` both have an explicit "stop and surface" instruction at ambiguity or risky scope. | Add an explicit blocking condition: stop and redirect to `instruction-evaluator` when the review scope is an instruction artifact. Add a stop-and-surface rule for ambiguous review scope. |
| `review-code/SKILL.md` | Minor | Explicitness — inputs | The skill never states what a caller must provide as input (diff, branch name, PR, file list). Compare: `implement-feature` frames "user-facing intent, touched abstractions, expected blast radius, success criteria, and intended verification" in step 1. `review-code` step 1 says "State which files, branch, PR, or artifact set is in scope" but frames it as something the skill itself does, not what the caller provides. | Clarify step 1 as an input requirement on the caller before execution begins, not a self-declaration during execution. |
| `review-code/SKILL.md` | Minor | Explicitness — output contract | The output contract ("Do not modify repository files. Report findings and note any residual verification gaps.") is minimal. It names finding structure (Blocking/Non-blocking/Questions sections) in step 4 but not in the contract section. The pipeline's validation gate already enforces this, but the skill itself should state its own complete output contract clearly. | Move or repeat the three-section requirement ("Blocking, Non-blocking, Questions; empty sections allowed") into the output contract section so the contract is self-contained. |
| `review-code/SKILL.md` | Minor | Layer purity — YAML frontmatter | The frontmatter is present and includes `name` and `description` per framework minimum. However, the description still says "changes, branches, diffs, or instruction artifacts" — inaccurate after the blocking issue above is fixed. | Update the `description` field to match the narrowed code-only scope once the blocking issue is resolved. |
| `review-code/SKILL.md` | Info | Context weight | Step 3 enumerates a review checklist that partially overlaps `code.md` (DSL boundaries, test tagging, assertion helpers, reporting boundaries, ESLint risk). This is borderline context weight. The convention is the authority; the skill's checklist risks divergence. It is acceptable as a mnemonic list as long as it is explicitly tied to the convention as its source, not treated as its own definition. | Consider replacing the inline checklist with "Check per `.ai/conventions/code.md`" or label it explicitly as derived from that convention. |

---

### Cross-Artifact Findings

**1. Direct responsibility conflict with `instruction-evaluator`.**
`review-code/SKILL.md` claims instruction-system review as part of its scope ("For instruction-system review, include the applicable manifesto stage…"). `AGENTS.md` explicitly routes instruction-artifact review to `instruction-evaluator` and says to use the agent "in place of `review-code`" for those cases. These two artifacts currently have overlapping stated scope. The skill must surrender that branch.

**2. Reference list duplication with `code.md` and `verification.md`.**
The six-file reference list in step 2 partially re-states what `code.md` already names as its own authoritative sources. `verification.md` names its own commands and scope. The skill inlining those file paths creates a second partial list that can drift. The convention files are the single owners of that knowledge; the skill should delegate to them.

**3. Structural asymmetry with sibling skills.**
`implement-feature` and `refactor-code` both carry: explicit input framing (step 1 as caller requirement), explicit stop-and-surface conditions, and an output contract that lists their deliverables completely. `review-code` is structurally weaker on all three points, reducing consistency across the skill layer.

**4. Pipeline alignment.**
`code-review.md` (the pipeline) has a single step: run `review-code`. The pipeline's validation gate already requires Blocking/Non-blocking/Questions sections and states the review is read-only. Once the skill's output contract is made explicit, the pipeline and skill will be consistent. No change needed in the pipeline; it correctly defers execution detail to the skill.

---

### Layer Fit

`review-code` is correctly placed in `.ai/skills/` as an atomic execution capability. The layer assignment is appropriate. The issues are internal to the skill (scope overreach, duplication, and structural incompleteness), not a layer mismatch requiring relocation or reclassification.

---

### Final Recommendation

Revise `review-code/SKILL.md` with three targeted edits:

1. **Remove the instruction-system review branch** (the second branch of "Load Relevant References" and the second branch of "Inspect The Scope"). Add a negative "When To Use" case pointing to `instruction-evaluator`.
2. **Replace the inline file list in step 2** with a delegation to `.ai/conventions/code.md` and `.ai/conventions/verification.md`, keeping only any references genuinely not covered by those conventions.
3. **Add a minimal stopping condition** and move the three-section output requirement into the output contract section.

These three edits resolve all Blocking and Major findings without structural changes to other artifacts.
