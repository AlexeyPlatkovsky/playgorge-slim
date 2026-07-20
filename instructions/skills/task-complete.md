# Task Complete

   ## Purpose
   Close a pipeline run only when the result verifiably meets the original request.

   ## When to run
   Run as the final step of a pipeline, after every earlier step has produced its output.

   ## Procedure
   0. Provide final report in table view like: Step, Invoked items, Status and comment
   1. Restate the original request in one sentence.
   2. Check: every crafted case ID appears implemented in the reported spec file; the reviewer's verdict is `approve`; no checklist item from the confirmed scope is unaddressed.
   3. If any check fails, refuse closure, name the failing check, and hand back to the step that owns it.
   4. If all checks pass, declare the task complete in one line that references the case IDs and the reviewer verdict.