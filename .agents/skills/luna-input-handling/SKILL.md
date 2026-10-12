---
name: luna-input-handling
description: Design, implement or audit Luna-compatible Unity input using old Input handling. Use for mouse, touch, drag, click, swipe, tutorial interaction or input bugs.
---

# Luna Input Handling

- Use old Unity Input handling compatible with Luna. Do not introduce the new Input System/package without explicit approval and verified support.
- Separate input sampling, gesture interpretation and gameplay action.
- Do not combine input, domain rules and rendering in one component.
- Cache camera/targets; do not search scenes during input.
- Define mouse/touch equivalence, UI blocking, pointer ownership, drag threshold, cancel/release and multi-touch policy.
- Avoid blocked Physics2D queries; use approved bounds/hit-test logic.

The plan must list input classes, state transitions, coordinate conversion, event flow and scenario consumers. Verify press/move/release, missed release, pointer leaving target, UI overlap, rapid input, restart, tutorial lock/unlock and Luna runtime. Report devices/modes actually tested.
