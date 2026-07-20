---
name: craft-test-cases
description: Turn a confirmed test scope into concrete, implementable test cases before any code is written.
---

# Craft Test Cases

## Purpose
Turn a confirmed test scope into concrete, implementable test cases before any code is written.

## When to run
Run in the main conversation, after the test scope has been confirmed and before implementation starts.

## Procedure
0. If the request is a test modification (not creation), stop — this skill is only for new test creation. If no confirmed scope artifact (`Skill: clarify-test-scope - output below`) is present in the conversation, stop and report the missing scope.
1. If the confirmed scope already contains explicit test cases, reuse or refine them rather than deriving from scratch.
2. From the confirmed scope, derive the test cases. Cover the stated happy path, every stated negative case, and any boundary the scope implies.
3. Give each case an ID (`TC-1`, `TC-2`, …), a one-line title, numbered steps, the exact expected result, and the test data it uses.
4. If two cases differ only in data, merge them into one parameterized case and note the parameter values.
5. Output all cases as one table with columns: ID, Title, Steps, Expected result, Test data. Do not start implementing.
6. Emit the output artifact.

## Output Contract
Emit the case table as a visible artifact:

`Skill: craft-test-cases - output below`

Include: the complete case table with all columns, and any parameterization notes.
   