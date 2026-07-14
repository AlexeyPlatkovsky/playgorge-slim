# Explorer agent — test target

This directory is the test target for the `explorer` agent (`.ai/agents/explorer/AGENT.md`).

It currently has no isolated scenario cards. The explorer is exercised end-to-end by the pipeline scenarios under `.ai/tests/pipelines/create-test-from-spec/scenarios/` (01, 05, 10, 11, 12), each of which runs Stage 1 with live explorer execution.

Add isolated explorer scenarios here when a behavior needs to be tested without running the full pipeline — for example, the explorer surfacing an ambiguous spec, or explicitly reporting the absence of existing page/test coverage. New cards must follow the scenario card schema in `.ai/tests/README.md`.
