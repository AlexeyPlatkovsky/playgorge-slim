# Implement Test

   ## Purpose
   Implement the crafted test cases as Playwright specs that follow the fixture's conventions.

   ## When to run
   Run after `craft-test-cases` has produced its case table, using that table as the only source of scenarios.

   ## Procedure
   1. Implement every case from the table, and nothing that is not in the table. Reference each case ID in a comment above its test.
   2. Follow the placement rules in `docs/conventions/page-objects.md` and `docs/conventions/components.md`: selectors come from page objects or components, never inline in the spec.
   3. Use the locator convention the scope names (`data-qa` attributes) and the test data from the case table.
   4. Use condition-based waits only; no fixed sleeps.
   5. Report which spec file was created or changed and which case IDs it covers.
   