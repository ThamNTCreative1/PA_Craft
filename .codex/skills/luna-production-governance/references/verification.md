# Verification and Completion Evidence

## Before implementation

The approved plan must define:

- Acceptance criteria traceable to the user scenario.
- Unit/EditMode tests for pure logic and state transitions where practical.
- PlayMode/manual checks for Unity lifecycle, input, tutorial and every approved outcome flow (Win/Lose/EndCard/CTA as applicable).
- Unity Console expectation: no new errors and reviewed warnings.
- Luna/runtime compatibility checks.
- Asset, triangle and build-size measurement method.
- Rollback boundary for scene/prefab/material/Blender changes.

## After script changes

Wait until Unity compilation and domain reload finish. Read Console errors before attaching components or continuing dependent changes. Fix only failures within approved scope; otherwise report and request direction.

## Required functional checks

- Core scenario happy path.
- Every approved outcome path; no unapproved Win/Lose/EndCard/CTA behavior.
- EndCard and CTA order/guards when applicable.
- Restart/retry/reset behavior.
- Tutorial start, progress, completion and skip behavior when applicable.
- Mouse/touch input through old Input handling as required.
- Missing/invalid serialized reference behavior.
- Duplicate event/subscription and repeated initialization behavior.

## Required Luna checks

- Search for prohibited runtime APIs in changed and imported code.
- Confirm Built-in/Unlit material policy and brightness control.
- Confirm no unauthorized packages/shaders/modules.
- Measure final output and record whether it is under 4.5 MB.
- Record script-size, texture/audio/model contributors when the build approaches budget.

## Completion report

`implementation-report.md` must include:

- Approved plan/version implemented.
- Changed files/assets/scenes/prefabs/Blender files.
- Class/pattern decisions actually used.
- Commands/tests/builds run and their results.
- Unity Console evidence.
- Triangle/asset/build-size evidence.
- Luna checks completed versus still requiring manual verification.
- Approved deviations and unresolved risks.

Do not claim completion when compilation, tests or size checks were not run; label them unverified and explain why.
