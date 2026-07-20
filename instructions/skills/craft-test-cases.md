# Craft Test Cases

   ## Purpose
   Turn a confirmed test scope into concrete, implementable test cases before any code is written.

   ## When to run
   Run in the main conversation, after the test scope has been confirmed and before implementation starts.

   ## Procedure
   1. From the confirmed scope, derive the test cases. Cover the stated happy path, every stated negative case, and any boundary the scope implies.
   2. Give each case an ID (`TC-1`, `TC-2`, …), a one-line title, numbered steps, the exact expected result, and the test data it uses.
   3. If two cases differ only in data, merge them into one parameterized case and note the parameter values.
   4. Output all cases as one table with columns: ID, Title, Steps, Expected result, Test data. Do not start implementing.
   