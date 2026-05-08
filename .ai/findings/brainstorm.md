# Evaluation Report: `.ai/skills/brainstorm/SKILL.md`

### Verdict

**Accept with minor edits**

---

### Artifact Findings

| Artifact | Severity | Area | Finding | Suggested fix |
|---|---|---|---|---|
| `brainstorm/SKILL.md` | Minor | Protocol compliance — Rule 2 detail | The protocol's Rule 2 states: "For factual setup or profile fields, include or allow a free-form correction path when the listed options may not fit the user's actual role, tool, path, or project fact." The skill omits this nuance entirely. For option-generation during profile or setup clarification, there is no instruction to allow a free-form path. The skill says options must be "specific enough to compare" but gives no escape for cases where none of the enumerated options fit. | Add a sentence to the "Always Provide Options" section: for setup or profile clarification, always include or allow a free-form response path when the listed options may not cover the user's actual situation. |
| `brainstorm/SKILL.md` | Minor | Explicitness — trigger boundary | The "When To Use" list names five positive triggers and three negative triggers. The negative trigger "for purely factual questions with no choice between meaningful options" is correct, but the skill does not state the related constraint from the protocol: brainstorming applies only when a protocol `requires_when` trigger is present. At runtime, this has no practical impact because `AGENTS.md` loads brainstorm only when already appropriate, but the skill's own "When To Use" section would benefit from explicit language that the three listed positive triggers are exhaustive — not a recommendation of possible occasions, but the complete set of occasions. | Rephrase "Use `brainstorm` when:" as "Use `brainstorm` only when one of these conditions holds:" to close the ambiguity about whether unlisted situations could also qualify. |
| `brainstorm/SKILL.md` | Minor | Layer purity — playforge-specific list in Rule 7 | Rule 7 (Focus On High-Impact Decisions) appends a project-specific list: "For playforge specifically, high-impact discussion areas include: DSL boundary changes, fixture layout changes, ESLint rule additions or relaxations, CI workflow changes, new test categories, and new tool adoptions." This is illustrative, not behavioral. It slightly overloads the skill with context that could drift if the project evolves and is not matched by equivalent updates to this list. | Move the playforge-specific examples to a parenthetical note or a single example line, and make clear it is illustrative rather than exhaustive or mandatory. Alternatively, omit it entirely and rely on Rule 7's general criteria. |
| `brainstorm/SKILL.md` | Info | Output contract — confirmation gate | The output contract says "Execution may begin only after the user confirms that summary." This is correct and matches the protocol. However, neither the skill nor the protocol specifies what to do if the user declines the summary (e.g., wants to revisit a decision). This is not a defect — the skill inherits the protocol's silence — but worth noting for future refinement. | No action required now. |
| `brainstorm/SKILL.md` | Info | Frontmatter completeness | The skill frontmatter contains only `name` and `description`, which meets the IMPLEMENTATION.md minimum ("At minimum, the frontmatter must include `name` and `description`"). Sibling skills follow the same pattern. No issue. | No action required. |

---

### Cross-Artifact Findings

**AGENTS.md routing gate:** `AGENTS.md` instructs tools to load `brainstorm` before `manager` "if the task requires choosing between meaningful options before implementation can begin (open design, profile clarification, ambiguous user request with material trade-offs)." The skill's own triggers align with this language. No conflict.

**Manager skill:** `manager/SKILL.md` contains "Do not load `manager` for: design discussion before a direction is chosen — use `brainstorm` first" and "design ambiguity → load `brainstorm`." These are consistent with the brainstorm skill's own boundary. No conflict or responsibility overlap.

**Protocol coverage:** The brainstorm protocol is marked `implementation: mandatory` with three `requires_when` triggers. All three are addressed in the skill's "When To Use" section (open design, trade-off evaluation, setup/profile clarification). The seven mandatory implementation rules from the protocol are all represented in the skill. The one omission (free-form correction path for factual setup fields) is noted as a Minor finding above.

**No duplication of root policy:** The skill does not restate routing gates, verification rules, DSL constraints, or any content owned by `AGENTS.md`, `code.md`, or `verification.md`. Clean.

**No competing artifact:** No other skill, pipeline, or agent covers brainstorming or structured design discussion. The skill has clear exclusive ownership of this capability.

---

### Layer Fit

The artifact is a **skill** under `.ai/skills/brainstorm/SKILL.md`. It satisfies the skill layer definition:

- One responsibility: structured discussion mode for open design decisions.
- No orchestration logic: it does not sequence sibling skills and does not route to other capabilities.
- No cross-skill routing: it explicitly forbids implementation during brainstorming.
- No duplicated root policy: it references no convention files and does not restate constraints owned elsewhere.
- Standalone project-local behavior: it is a complete execution contract on its own.

The content that might be questioned for layer purity is the playforge-specific examples in Rule 7. These do not cross into convention territory (they are illustrative, not normative standards), but they are marginally closer to reference-doc content than pure execution instruction. This is the source of the Minor finding above — it is acceptable at the skill layer but could be trimmed for cleanliness.

The skill does not contain any pipeline sequencing, routing gate language, or convention-style shared standards. Layer fit is **correct**.

---

### Final Recommendation

Accept with one targeted edit: add the free-form correction path for factual setup or profile fields to the "Always Provide Options" section (Minor finding 1). This is the only deviation from a mandatory protocol rule.

The remaining two Minor findings (trigger boundary phrasing, illustrative example list in Rule 7) are quality improvements and may be addressed in the same pass or deferred — neither weakens behavior or creates a compliance gap.
