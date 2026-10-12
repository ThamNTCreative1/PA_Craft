---
name: luna-tutorial-onboarding
description: Design, implement or review scenario-specific tutorial and onboarding flows for Luna playables. Use when guidance, hand cues, gating, progression, skip or replay behavior is involved.
---

# Luna Tutorial and Onboarding

Tutorial is project-specific, not a universal copied sequence. Before implementation define steps, entry/exit conditions, allowed input, visual cue, timeout/fallback, analytics/Luna events if approved and the gameplay state unlocked by each step.

- Keep tutorial orchestration separate from core gameplay rules.
- Prefer an explicit small state machine when there are multiple ordered steps.
- Tutorial may gate input through an approved interface; it must not duplicate gameplay actions.
- Cues subscribe/unsubscribe deterministically and release resources on finish/reset.
- Every approved outcome transition (Win/Lose/EndCard/CTA as applicable) cancels or finalizes tutorial explicitly.
- Do not add tutorial assets or behavior not in the approved scenario.

Verify first run, step progression, invalid action, rapid action, approved outcomes during tutorial, reset/retry/skip only when supported, and no stuck input/cue. Report all untested branches.
