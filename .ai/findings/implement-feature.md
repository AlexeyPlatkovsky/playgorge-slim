# Evaluation Report: `.ai/skills/implement-feature/SKILL.md`

### Verdict

**Accept with minor edits**

---

### Artifact Findings

| Artifact | Severity | Area | Finding | Suggested fix |
| --- | --- | --- | --- | --- |
| `implement-feature/SKILL.md` | Minor | Responsibility scope | The opening description names specific artifact types ("page objects, components, assertion helpers, fixture extensions, ESLint rules, or combinations") as an enumeration inside the responsibility statement. This is accurate but locks the scope in two places: once in the frontmatter description and once in the body. If the project grows new artifact types (e.g., migration scripts), the body sentence will silently exclude them while the frontmatter does not. | Rephrase the opening body sentence to be category-level ("new behavior that introduces or extends project artifacts"), and keep the enumeration only in the "When To Use" block as illustrative examples, or drop it entirely and rely on the convention for what constitutes additive work. |
| `implement-feature/SKILL.md` | Minor | Explicitness — stopping conditions | Step 1 "Frame The Change" says "stop and surface the ambiguity before editing" but gives no concrete stopping condition. What constitutes unresolvable ambiguity is left implicit. This uses soft language where the framework principle "Make Behavior Explicit" calls for a hard gate. | Add a single sentence naming what must be confirmed before proceeding: at minimum, a clear user-facing intent and a defined success criterion. |
| `implement-feature/SKILL.md` | Minor | Context weight / duplication | Step 2 "Read Required Context" lists six specific file paths in full. The same list appears verbatim in `refactor-code/SKILL.md`. The convention files are already the authoritative source. Repeating the full list in each skill creates two drift risks: the list can go out of date, and it subtly implies these docs are skill-specific rather than project-wide. | Reference `.ai/conventions/code.md` and `.ai/conventions/verification.md` by name as the authoritative sources. Let the convention files point to their own detail docs. Individual doc paths need not be listed inside a skill. If a skill has skill-specific additional reading (e.g., "when adding pages, inspect reference flows"), name only that addition. |
| `implement-feature/SKILL.md` | Minor | Layer purity — verification detail | Step 5 "Verify" says "Run the checks required by `.ai/conventions/verification.md`." This is correct and lean. However, the failure-handling instruction ("fix the underlying cause and re-run the full required set") partially restates a rule already owned by `verification.md` (its "Failure Handling" section says exactly that). | Remove the failure-handling sentence from the skill and let `.ai/conventions/verification.md` own that rule entirely. The skill can simply say "Follow the failure-handling rules in `.ai/conventions/verification.md`." |
| `implement-feature/SKILL.md` | Info | Output contract | The output contract ("Report the changed files, verification commands run, and any intentionally skipped checks with reasons") is correct and consistent with `refactor-code`. However, it does not mention that `report-completion` runs as the final step. Per `AGENTS.md`, that is enforced by `manager`, not by skills — so the omission is correct. Worth confirming this is intentional and not a gap the caller might misread. | No change required. Observation only. |
| `implement-feature/SKILL.md` | Info | Frontmatter | Frontmatter contains `name` and `description` as required by IMPLEMENTATION.md. No `version`, `url`, or other framework metadata fields are present, which is consistent with the framework-standard skill format for project-local skills (the contract only mandates `name` and `description` for skills). | No change required. |

---

### Cross-Artifact Findings

**1. Duplicated context list with `refactor-code`**
Both `implement-feature` and `refactor-code` list the same six authoritative source paths verbatim in their "Read Required Context" steps. This creates a shared drift risk: if a doc is renamed or added, both skills must be updated independently. The correct owner of that list is `.ai/conventions/code.md` (which already names these docs in its "Authoritative Detail" section). Both skills should delegate to the convention rather than restating the list.

**2. Feature-implementation pipeline relationship — no conflict, but clarification useful**
The `feature-implementation` pipeline at step 3 calls `implement-feature` and at step 4 runs `npm run test` after code is written. The skill's Step 5 "Verify" delegates to `verification.md`, which requires targeted tests, typecheck, and lint — but not the full `npm run test` unconditionally. The pipeline adds the full suite run on top of the skill's targeted checks. This is a valid sequencing layering, not a conflict. However, a reader of the skill alone would not know the pipeline adds a broader suite run. This is architecturally correct (the pipeline owns the sequencing) but worth confirming the skill's verification step is not expected to include the full `npm run test` on its own.

**3. No competing skill**
`implement-feature` is clearly differentiated from `refactor-code` (behavior-preserving restructuring) and `review-code` (read-only). No responsibility overlap exists.

**4. `review-code` references instruction-system review scope**
`review-code` claims it can review "instruction artifacts." `AGENTS.md` explicitly routes instruction-artifact review to `instruction-evaluator` instead of `review-code`. The `review-code` skill contains a soft allowance ("For instruction-system review, include the applicable manifesto stage...") that technically competes with the routing gate in `AGENTS.md`. This is a cross-artifact finding about `review-code`, not about `implement-feature`, but it is worth noting as it was observed while reading related artifacts.

---

### Layer Fit

`implement-feature/SKILL.md` belongs in the skill layer. It has one clear responsibility (atomic execution of additive code changes), contains no sequencing of sibling skills, no routing logic, no root policy, and does not attempt to own verification standards beyond delegating to the convention. The artifact is correctly placed.

---

### Final Recommendation

Accept the skill with three targeted edits:

1. Remove or scope the artifact-type enumeration in the opening body sentence to avoid silent exclusion of future artifact types.
2. Replace the verbatim six-path context list with a delegation to `.ai/conventions/code.md`'s "Authoritative Detail" section (mirrors the same fix needed in `refactor-code`).
3. Remove the failure-handling sentence from Step 5 and let `verification.md` own that rule entirely.

None of these require user consent for a risky structural change — all are localized text corrections within the skill file itself.
