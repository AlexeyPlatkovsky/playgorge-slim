# Evaluation Report: `.ai/skills/refactor-code/SKILL.md`

### Verdict

**Accept with minor edits**

---

### Artifact Findings

| Artifact | Severity | Area | Finding | Suggested fix |
|---|---|---|---|---|
| `refactor-code/SKILL.md` | Minor | Layer Purity | Step 2 (Read Required Context) embeds a full, explicit list of authoritative docs instead of deferring entirely to the conventions. `.ai/conventions/code.md` already has a "Authoritative Detail" section pointing to those same docs. Restating the list in the skill creates a drift risk if paths change. | Keep the reference to `.ai/conventions/code.md` and `.ai/conventions/verification.md` as the delegation point. The skill can note that those conventions list the authoritative detail docs; it does not need to repeat the full list. |
| `refactor-code/SKILL.md` | Minor | Explicitness / Authority Duplication | Step 3 (Establish A Behavior Baseline) manually spells out the three required verification commands (`targeted tests`, `npm run typecheck`, `npm run lint`) rather than deferring to `.ai/conventions/verification.md`, which owns the required-checks definition. If the verification convention changes, the skill becomes stale. | Replace the manual command list in step 3 with "Run the checks required by `.ai/conventions/verification.md`" — matching how `implement-feature` phrases it. |
| `refactor-code/SKILL.md` | Minor | Explicitness / Authority Duplication | Step 5 (Verify Preservation) likewise repeats the same command set and adds `npm run test` for shared framework behavior. The "when to add broader test run" rule already lives in `.ai/conventions/verification.md`. Duplicating it here is redundant and may drift. | Same fix: delegate to `.ai/conventions/verification.md` rather than restating the commands. The skill-specific clarification worth keeping is the behavior-preservation stop condition ("if a previously passing targeted test now fails or had to be modified, stop and surface the behavior change") — that is refactor-specific and belongs here. |
| `refactor-code/SKILL.md` | Minor | Explicitness — Stopping Condition | Step 1 (Frame The Refactor) names the system-level risk gate for `framework/core/`, `framework/fixtures/`, and `eslint-plugin-xframework/`, which is correct. However, it does not reference `AGENTS.md`'s "Risky Changes Require User Consent" list as the authoritative gate. This creates a subtle duplication: if new risky paths are added to `AGENTS.md`, the skill won't pick them up. | After naming the three system-level paths, add: "See 'Risky Changes Require User Consent' in `AGENTS.md` for the complete list of gates." This makes it clear the root contract owns the full enumeration. |
| `refactor-code/SKILL.md` | Info | Context Weight | Step 2 includes `.ai/docs/project_specification.md` in the required-reading list. The project spec is broad project knowledge; reading it unconditionally for every refactor adds context weight without a clear benefit beyond what `code.md` already provides. Typically a refactor needs the code and verification conventions plus the architecture/guide docs for the area being touched. | Consider making project spec loading conditional on the refactor crossing architectural boundaries, or simply remove it from the unconditional list (the manager ensures it is loaded for context at routing time). This is advisory; no functional defect. |
| `refactor-code/SKILL.md` | Info | Output Contract | The output contract says "report the changed files, the before-and-after verification commands, and any intentionally skipped checks with reasons." This is correct and matches the convention's reporting requirement. No change needed — noted for consistency with `verification.md` §Reporting. | No action required. |

---

### Cross-Artifact Findings

**Overlap with `code-refactoring` pipeline (`code-refactoring.md`)**
The pipeline currently has exactly one sequence step: `Run .ai/skills/refactor-code/SKILL.md`. This is a minimal but correct single-skill pipeline. The pipeline's validation gate ("baseline targeted tests must pass after the refactor without modification") is already the stop condition stated inside the skill at step 5. That's not a conflict, but it is a mild duplication of the gate language. If the skill's stop condition wording ever diverges from the pipeline's gate, both files would need to be updated. This is low risk given the current very small size of the pipeline.

**Step 2 doc list vs. `.ai/conventions/code.md` §Authoritative Detail**
`code.md` lists the same four docs (architecture overview, authoring guide, page-objects, components) as the authoritative detail sources and explicitly says "This file states the rules. Detailed authoring patterns live in the project docs and are referenced below." The skill repeating those exact same paths is duplication. One Owner Per Concern requires the skill to reference the convention rather than maintain a parallel list.

**Verification commands vs. `.ai/conventions/verification.md`**
`verification.md` owns the required checks, failure handling, and when `npm run test` is added. Both steps 3 and 5 of the skill partially reproduce this. By contrast, `implement-feature` step 5 correctly says "Run the checks required by `.ai/conventions/verification.md`" without restating the commands. `refactor-code` should align to the same delegation pattern.

**No conflict with `review-code` or `implement-feature`**
The skill's trigger condition ("reshape existing code without changing user-facing behavior") is well-separated from `implement-feature` ("new behavior being introduced") and `review-code` ("read-only evaluation"). The "when to use / when not to use" language is reciprocal and consistent across all three skills. No responsibility overlap.

**No conflict with `manager`**
The skill correctly performs pure execution. It does not contain routing logic, capability selection, or `report-completion` language. All of those are owned by `manager`, consistent with the AGENTS.md constraint ("Pipelines and execution skills must not restate that rule").

---

### Layer Fit

`refactor-code` is correctly placed as a skill. It has one clear responsibility (behavior-preserving restructuring), executes atomically, does not sequence other skills, does not decide routing, and does not restate root contract policy beyond what is needed to gate system-level risk. The layer assignment is correct.

The minor issues identified are authorship discipline problems (duplication of convention-owned content) within a correctly typed artifact, not layer violations.

---

### Final Recommendation

Apply three targeted edits before accepting:

1. In step 2, replace the explicit doc list with a reference to the conventions (`code.md` and `verification.md` hold the authoritative detail sources; the skill does not need to repeat them).
2. In steps 3 and 5, replace the manual verification command lists with "Run the checks required by `.ai/conventions/verification.md`." Retain the refactor-specific behavior-preservation stop condition in step 5 — that is skill-specific and must stay.
3. In step 1, after naming the system-level paths, add a pointer to the "Risky Changes Require User Consent' section in `AGENTS.md` as the authoritative gate list.

These three edits eliminate the duplication, prevent drift when conventions change, and ensure the root contract remains the single source of truth for risky-change gates. No structural changes or splits are needed.
