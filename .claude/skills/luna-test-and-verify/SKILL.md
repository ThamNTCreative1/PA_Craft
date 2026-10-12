---
name: luna-test-and-verify
description: Define and execute verification for approved Unity/Luna implementations. Use for acceptance criteria, tests, Console checks, MCP verification, Luna builds and completion reports.
---

# Luna Test and Verify

Before implementation, map each acceptance criterion to an EditMode, PlayMode, manual Editor, Luna runtime or build-size check.

After C# changes, wait for compilation/domain reload and inspect Console before dependent scene work. Test the core happy path, every approved outcome path, reset/retry only when applicable, tutorial branches, old Input mouse/touch behavior, missing references, repeated initialization and event subscription lifetime. Confirm no unapproved Win/Lose/EndCard/CTA path was added.

Audit prohibited Luna APIs, Built-in/Unlit policy, unauthorized packages/shaders, tris/assets and actual build size. Use screenshots/logs/reports where they materially prove behavior.

`implementation-report.md` must state approved plan/version, changed files/assets, tests and results, Console status, runtime/build evidence, size/tris measurements, approved deviations, unverified items and remaining risks. Never report a check as passed when it was not run.
