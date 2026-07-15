# Clarify Test Scope
 
## Purpose
Turn an underspecified test request into a confirmed, implementable scope before any code is written or changed.
 
## When to run
Run in the main conversation, before reading or editing any test code, whenever the user asks to create or modify a test.
 
## Procedure
1. Restate the requested behavior in one sentence and list the steps the test must perform.
2. Check the request against this checklist and note every point the user did not specify:
   - Starting state: the page or URL the test begins on, and whether the user is already authenticated
   - Test data: which credentials or fixtures the test uses, and where they come from
   - Expected result: the exact text, element, or state the test must assert, and how to locate it
   - Negative cases: whether any failure or edge scenarios are in scope
   - Placement: which spec file the test belongs in, and which existing page objects or components it should reuse
3. Ask the user about every unspecified point in a single message, as one numbered list of concise questions. Do not guess missing details and do not start implementing.
4. After the user answers, restate the confirmed scope as a short plan and implement only from that plan.
