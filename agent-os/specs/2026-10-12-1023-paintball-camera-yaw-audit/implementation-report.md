# Paintball yaw correction

User requested the fix after the diagnosis. Scope was presented before editing and recorded in plan.md. No Claude planning pass was performed for this direct follow-up correction.

## Changes
- PlayerController: separate aim request and yaw; FixedUpdate prioritizes aim over the camera-view request and movement direction.
- PlayerPaintballController: writes/releases only the aim request; clears it on pause, unequip and inactive-player callbacks.
- No new types, interfaces, dependencies, patterns, serialized references, assets, scenes or prefabs. Existing working-tree changes were preserved using a pre-edit file snapshot for diff review.

## Evidence
- Unity 6000.0.60f1 refreshed scripts, completed compilation and domain reload. The loaded PlayerController exposes SetAimYaw.
- Console: zero errors. Warnings observed concern ModelSwitcher.cs obsolete lookup, MCP duplicate-command suppression and Account API connectivity; none comes from the changed files.
- Eight checks passed against the compiled components in an isolated temporary preview scene, invoking real callback methods: camera-before-paintball, paintball-before-camera, post-shot aim hold, release timeout, first-person fallback, pause cleanup, unequip cleanup, disabled-player cleanup.
- Test harness ran via in-memory MCP execute_code; no test scripts were added under Assets. Two initial harness attempts failed before scene creation (ambiguous Object name, then use of a play-mode-only scene API); corrected harness used NewPreviewScene and finally closed its temporary scene.
- git diff --check passed for changed script paths; baseline comparison reviewed both files including the untracked paintball script.
- Gameplay.unity remained active and not dirty after checks. No scene was saved.
- New runtime code uses only private scalar state and direct existing references; no runtime searches, new input APIs, packages, shaders or asset changes.

## Limits
- These checks verify callback/state behavior in Editor; they do not simulate a full gameplay session or measure the Rigidbody's rendered heading.
- A fresh Luna build, browser/touch gameplay, walking while firing, full mission/vehicle switching, and final build size remain unverified. Existing generated Luna output predates this fix and was not changed.
- No geometry/assets changed; triangle measurements are not applicable to this source correction. Under-4.5-MB compliance is not newly asserted.
