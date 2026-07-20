---
name: implement-test
description: Implement the crafted test cases as Playwright specs that follow the fixture's conventions.
---

# Implement Test

## Purpose
Implement the crafted test cases as Playwright specs that follow the fixture's conventions.

## When to run
Run after `craft-test-cases` has produced its case table, using that table as the only source of scenarios.

## Procedure
0. If no case table artifact (`Skill: craft-test-cases - output below`) is present in the conversation, stop and report the missing case table.
1. Implement every case from the table where possible. If a case cannot be implemented, report the reason as a deviation.
2. Follow the placement rules in `docs/conventions/page-objects.md` and `docs/conventions/components.md`: selectors come from page objects or components, never inline in the spec.
3. Use the locator convention specified in the confirmed scope. If no convention was named, default to `data-qa` attributes.
4. Use condition-based waits only; no fixed sleeps.
5. Run the implemented spec with `npx playwright test <spec-path>` and confirm it passes. If it fails, fix until it passes.
6. Report which spec file was created or changed and which case IDs it covers.
7. Emit the output artifact.

## Output Contract
Emit the implementation report as a visible artifact:

`Skill: implement-test - output below`

Include: the spec file path, the case IDs implemented, and any deviations from the case table.
   