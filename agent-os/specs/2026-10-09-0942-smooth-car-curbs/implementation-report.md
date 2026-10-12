# Smooth car curbs ? implementation report
Status: Implemented; Editor regression checks passed. Luna build/device verification pending.
Approval: user approved the proposed three-file scope and explicitly waived Claude planning in chat.

## Changes
- CarController: predictive curb detection includes speed and acceleration over a 0.2-second lift interval. A private step transition raises the body via bounded vertical velocity instead of teleporting the entire rise. Clearance is checked during lifting/advance. Cancel on braking, throttle release, direction change, dismount/disable. Support sensing covers the configured step range. Top clearance includes contact skin to reduce speculative collision impulses; completed lift does not retain upward velocity as a jump.
- Gameplay: Playable Car 8 step height set to 0.6. Actual pre-task scene value was 3 (the earlier research had found 0.3); the only task change to this scene is that one scalar.
- DrivingPlayModeChecks: opt-in Playable/Checks/Car Curbs entry, temporary isolated physics fixtures in Play Mode, test result and maximum-speed trajectory files under Temp/DrivingSetup. Uses the real car, Rigidbody, mounting flow and FixedUpdate; drives input fields directly, not UI pointer events. No new runtime class, interface, prefab, dependency or package.

## Verification
Unity 6000.0.60f1 PA_Craft. Compilation complete, no Console errors. 12 PASS entries: mount plus 11 scenarios. Heights 0.04/0.2/0.54, forward/reverse, diagonal, accelerating and initial speed 13; 0.8 obstacle and low ceiling correctly block; brake and release during lift cancel traversal. Per-tick upward displacement <0.09; permitted curb cases do not stop and maximum height remains within 0.09 above curb. Final maximum tick rise 0.059. On 0.54 curb at initial speed 13, minimum sampled crossing speed 8.283 and maximum elevation 0.615 above road. Slow forward/reverse retain 2.0 crossing speed.
Editor returned to Edit Mode, scene clean. The only Console warnings observed are existing missing scripts on btnBackToHome; not changed.
Task-only diff preserved against snapshots, existing unrelated working-tree modifications retained. Runtime changed file contains no prohibited search/InputSystem/Physics2D APIs. Physics queries remain NonAlloc with fixed reusable buffers. No graphics/assets/materials were changed.

## Limits
Checks are deterministic manual physics stepping in Play Mode, not a visual ride-through or a pointer-input test. The exact curb from the original user report was not identified. Luna build, device/touch validation, final playable size and visual camera smoothness have not been verified; no claim of Luna runtime compatibility or under-4.5-MB output is made. Source byte changes below are not compiled/download size. No mesh or triangle changes.

## Source sizes
- CarController.cs: 17793 -> 21351 source bytes (not build size).
- Gameplay.unity: 569452 -> 569454 source bytes (not build size).
- DrivingPlayModeChecks.cs: 21375 -> 28217 source bytes (not build size).
