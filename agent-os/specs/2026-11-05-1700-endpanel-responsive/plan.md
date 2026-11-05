# End panels responsive v1

Status: APPROVED
Approved by: user (oke, 2026-11-05)
Approved scope: End panels responsive v1.
Planner: Claude CLI, recorded by Codex

## Exact scope

- NEW Assets/_Playable_/Scripts/UI/EndPanelResponsiveLayout.cs plus Unity-generated.meta.
- Assets/_Playable_/Scenes/Gameplay.unity: attach component and configure title/button refs/base dimensions on Win_Panel and Fail_Panel roots; Title/Button Image preserveAspecttrue.
- Existing WinPanel.cs, FailPanel.cs, GameManager.cs, root backgrounds, CTA/store/retry behavior, other UI/assets unchanged.

## Class and lifecycle

Playable.EndPanelResponsiveLayout sealed MonoBehaviour, DisallowMultipleComponent. Responsibility only responsive positioning/sizing. No public API, events, interfaces, runtime searches or new design pattern.

Serialized fields RectTransform _title,_button; Vector2 _titleBaseSize,_buttonBaseSize. Cache root from transform as RectTransform and last root size. OnEnable validate refs/root/positive base dimensions then apply. Invalid config logs one actionable error and disables layout only (does not hide panel). LateUpdate compares cached root.rect.size and reapplies only if changed. No GetComponent/search/allocation in per-frame path.

Uniform fit=min(root.width*.90/1360,root.height*.88/1120). Title/Button anchors/pivotscenter. Title size=base*fit, position(0,200)*fit. Button size=base*fit, position(0,-340)*fit. Never write either localScale; current title scale1 verified, CTA localScale remains owned by existing1..1.12pulse.

Scene base sizes: title1353.5x676.76 both; WinCTA901.22x300.97; FailCTA861.34x317.96. These are original dimensions, no sprite stretching. Virtual design1360x1120 bounds reserve pulse: titletop538.38/bottom-138.38; max WinCTA bottom-508.54/top-171.46; FailCTA bottom-518.06/top-161.94. Title/CTA gaps33.08/23.56; all within+-560height/+-680width. No panel content overlaps at1.12peak.

## Implementation order and verification

Snapshot scoped scene/current state preserving unrelated dirty edits. Add script, wait for compile/domain reload and Console before attaching scene components. Wire/configure both roots, preserveAspect, save only scoped edits. Unexpected required file/class/behavior change needs renewed approval.

Test both outcomes at1920x1080 and540x960: screenshots rest/peak, readably large title/CTA, fit within root, no overlap. Resize runtime updates layout. Missing ref actionable one-time failure leaves existing panel visible. Existing Show first-frameguard, pulse and cleanup preserved; never trigger actual store. Check Console and static Luna API/dependency scope. No asset/geometry addition beyond component/script. Fresh Luna browser/device/build-size evidence only claimed if run; under4.5MB unverified otherwise.
