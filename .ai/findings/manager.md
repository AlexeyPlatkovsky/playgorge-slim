# Evaluation Report: `.ai/skills/manager/SKILL.md`

### Verdict

**Accept with minor edits**

---

### Artifact Findings

| Artifact | Severity | Area | Finding | Suggested fix |
|---|---|---|---|---|
| `manager/SKILL.md` | Minor | Frontmatter | The frontmatter includes `name` and `description` but is missing a `version` field. While IMPLEMENTATION.md only mandates `name` and `description` as the minimum for skill frontmatter, the other skill files in the registry (`brainstorm`, `report-completion`) also follow this minimal pattern — no blocking gap here, but worth noting for consistency. | No action required unless the team adopts a versioned skill format. Info only. |
| `manager/SKILL.md` | Minor | Responsibility boundary — skill layer classification | IMPLEMENTATION.md states: "Execution skills must not contain manager handoff text, stage metadata, or routing to other skills." and separately: "When a protocol derives a manager-equivalent routing capability, keep it in the routing layer rather than formatting it as a normal execution skill." The artifact is stored as a skill (`/skills/manager/SKILL.md`) and uses the skill YAML frontmatter format, yet its function is routing, not execution. IMPLEMENTATION.md explicitly says manager-equivalent capabilities should stay in the routing layer. The AGENTS.md root contract lists it in the Capability Registry under "skills" — that mapping is consistent across AGENTS.md and the file itself, and the Protocol Mapping note maps it correctly. However, the layer classification (as a skill) is technically impure per IMPLEMENTATION.md §Layer Purity. | This is a known deliberate choice (it is listed as a skill in the registry, and AGENTS.md explicitly treats it as a skill). If the team wishes to be strict about layer purity, this should move out of `.ai/skills/`. Since it would require a risky structural rename, raise it with the user before acting. For now flag as Minor / structural debt, not blocking. |
| `manager/SKILL.md` | Minor | Protocol naming gap | The canonical protocol (`manager.md`) uses "task-complete" as the required closure step name. The project renames it `report-completion` and notes this mapping in AGENTS.md §Protocol Mapping. The manager SKILL.md body correctly references `report-completion` consistently. However, the artifact itself carries no protocol mapping note. If this file is read in isolation, a reviewer may not know it fulfills the canonical `manager` protocol. | Add a one-line comment at the bottom of the file, or in the frontmatter as `protocol_mapping: manager`, noting the mapping. AGENTS.md already holds this note authoritatively; this is a convenience suggestion, not a requirement. |
| `manager/SKILL.md` | Info | `report-completion` enforcement | Section 4 states "The manager owns this responsibility; pipelines and execution skills must not restate it." This is the correct centralization and matches IMPLEMENTATION.md §5 and the manager protocol. The pipelines (`feature-implementation`, `code-review`, `code-refactoring`) correctly do not restate `report-completion`, confirming the rule is enforced consistently across the landscape. | No action required. Observation only. |
| `manager/SKILL.md` | Info | Output contract completeness | The output contract is minimal — it lists four items (classification, selected capabilities, validation/review requirements, and explicit final `report-completion`). This matches the manager protocol's output contract exactly, adapted to the project's local names. The brevity is appropriate given routing-only responsibility. | No action required. |
| `manager/SKILL.md` | Info | Ad-hoc path wording | Section 3 reads: "For non-trivial work that none of those fit … describe an ad-hoc step sequence and end it with `report-completion`." This is correct, practical, and within the routing role. The manager protocol allows this. The phrase "describe an ad-hoc step sequence" is marginally close to "invent execution steps" which the routing-only rule forbids, but in context it clearly means name/sequence capabilities, not implement them. | If there is ever confusion in practice, tighten to "name an ad-hoc capability sequence." No change required now. |

---

### Cross-Artifact Findings

**Routing consistency — AGENTS.md vs. manager SKILL.md**
AGENTS.md §Routing Gate says: "Stop. Load `manager` and let it produce a routing decision before any implementation begins." The manager SKILL.md's "When To Use" section is consistent with this gate. No conflict.

**report-completion boundary — pipelines do not restate it**
All three pipelines (`feature-implementation`, `code-review`, `code-refactoring`) correctly omit any reference to `report-completion`. The responsibility is centralized exclusively in manager, as required. No duplication.

**brainstorm escalation path — consistent**
AGENTS.md routes design ambiguity to `brainstorm` before `manager`. The manager SKILL.md §6 correctly routes design ambiguity to `brainstorm` and permission ambiguity to the user directly, matching AGENTS.md §Routing Gate. No conflict.

**Layer tension: skill vs. routing-layer classification**
IMPLEMENTATION.md §Layer Purity states pipeline body must be "ordered references to skills, agents, or single trivial commands" and skill body must be "one atomic execution capability." The manager SKILL.md is neither — it is a routing artifact. IMPLEMENTATION.md also explicitly states: "When a protocol derives a manager-equivalent routing capability, keep it in the routing layer rather than formatting it as a normal execution skill." Storing it under `.ai/skills/` creates a layer classification mismatch. This is the most material cross-artifact observation. However, since AGENTS.md already explicitly labels it a skill in the Capability Registry and the protocol mapping is noted at the root contract level, this is a known, intentional trade-off. The current instruction landscape has no separate "routing layer" directory, and the mislabeling does not break any runtime behavior. Moving it would be a risky structural change requiring user consent per AGENTS.md §Risky Changes.

**No duplication of root policy**
The manager SKILL.md does not restate DSL rules, verification rules, or reporting rules. It references capabilities by path only. No duplication of root contract or convention content.

**No competing capabilities**
No other artifact in the landscape claims routing authority for non-trivial work. The `instruction-evaluator` agent is scoped to instruction artifact review only. No overlap.

---

### Layer Fit

| Artifact | Current Layer | Correct Layer | Assessment |
|---|---|---|---|
| `manager/SKILL.md` | Skill (`.ai/skills/`) | Routing layer (no dedicated directory exists) | Misclassified by IMPLEMENTATION.md standards, but intentionally so. The project has no separate routing-layer directory. The AGENTS.md root contract explicitly registers it as a skill. This is acceptable as a known deviation provided the team understands the protocol intends the routing layer to remain distinct from execution skills. The artifact's internal behavior is correctly limited to routing. |

---

### Final Recommendation

The skill is functionally correct and internally consistent. Every mandatory behavior from the canonical `manager` protocol is present and correctly adapted to project-local names (`report-completion` for `task-complete`, project pipeline paths). Cross-artifact relationships with AGENTS.md, the pipelines, `brainstorm`, and `report-completion` are coherent with no policy duplication or competing authority.

The smallest safe next action is: **accept the artifact as-is**, and optionally add a single `protocol_mapping: manager` line to the frontmatter or a trailing comment to make the canonical-protocol derivation visible when the file is read in isolation. The layer classification gap (skill vs. routing-layer) is structural debt worth acknowledging; if the team later introduces a dedicated routing-layer directory, this file should migrate there — but that requires a user-consented structural refactor per AGENTS.md §Risky Changes and should not be done now.
