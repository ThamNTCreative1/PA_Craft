# Hero selection UI v1 implementation

Approved by user: oke. Implemented approved class/file architecture.

## Changes

- HeroSelectionPanel.cs: responsive card width=min(slotWidth,height*.6), existing slot centers/height and columns retained. Hint Begin after Show layout; Realign after layout change; Stop before choice, on Hide/disable. Missing hint warns once without blocking selection.
- HeroRoster.cs: Inspector tooltips on existing4 Luna Hero Slot fields only. Existing field labels, resolver and defaults preserved.
- New UI/HeroSelectionHandHint.cs and Unity-generated.meta: explicit hand/4targets, unscaled DOTween move and DOScale, target-space conversion, deterministic tween cleanup, missing-reference warning.
- Gameplay.unity: selection Image alpha0/raycasttrue, hint reference/ratio, new HandHint and Hand UI objects, existing icon_hand sprite, raycastfalse. Existing images/UI/backgrounds otherwise retained.

Scene baseline/diff in before/ and evidence/scene-diff.json. Expected edits are panel component/Image/RectTransform plus7new YAML blocks for2objects. One unrelated CanvasScaler block changed m_MatchWidthOrHeight .5->.304 during this work; none of the implementation commands target this field. This existing/concurrent Editor change was retained rather than reverted. No existing objects deleted.

## Verification

- New hint script compiled, then panel/roster compiled; Unity domain reload completed and Console had0errors before scene changes. Final test Console showed only2intentional missing-reference warnings.
- Final scene clean, PlayMode off, root alpha0, roster slots[0,1,5,7], EndTime30, no missing scripts. Temporary runtime changes did not persist. An earlier Play session was interrupted by an Editor reload; its unscaled diagnostic did not complete, so it was rerun. A transient missing-script warning appeared during that interruption; final scene scan found0missing components.
- Landscape1920x1080 screenshot evidence/selection-landscape-fullhd.png and portrait540x960 screenshot evidence/selection-portrait-clear.png: transparent background,4columns/2x2, narrower frames and visible portraits/names. Portrait resolution is same9:16 ratio, not an actual1080x1920 render. Existing HUD retained. GameView index restored to original10 after checks.
- Hand unscaled diagnostic5.2s while timeScale0: indexes1,2,3,0,1, scale1..1.15 (evidence/hand-unscaled.txt). Initial index0 was advanced before first sampled callback. The hand stayed running through live landscape/portrait size changes and used current targets; no final screenshot claimed from interrupted run. Exactly one owned hop/pulse retained per component by replacement/cleanup code.
- EventSystem raycasts at all4card centers hit Hero1/2/3/4. At hand fingertip, first hit Hero1, not hand Image. Transparent root first hit HeroSelectionPanel, ahead of underlying Pet Button. These are synthesized EventSystem raycasts/button invocations; physical touchscreen testing not performed.
- Runtime custom slots[2,3,4,6] produced browncoat/fish/panda/firefighter portraits and matching IDs. Clicking FireFighter applied its skin; twice-invoked button yielded1HeroChosen, hid panel/hand and cleared both tween fields; joystick and existing combat tutorial became active. Actual selection test was callback-driven; all4skin choices/full look-move-fire input not rerun.
- Resolver[0,0,99,-1] produced[0,1,2,3]. Existing four Luna attribute declarations retained exactly once each; Luna browser editor field display was not verified.
- Missing target warning hides hand safely; missing panel hint warning leaves selection open. Hide->Show restarts hint. Timeout outcome while selection open hides hand and clears hop/pulse. Win/Lose were not separately rerun because unchanged Flow routes all outcomes through Hide; this equivalence is code inspection, not a runtime pass.
- Measured Show call to visible hint startup about0.00028seconds in Editor diagnostic; successful button choice processed synchronously in same diagnostic invocation. No user-facing time-to-choice metric claimed.
- Static scan: no prohibited runtime searches/new InputSystem, no packages/shaders/textures/geometry added; existing sprite/DOTween only. HeroCardView, resolver, flow, gameplay/weather code unchanged by this implementation.

## Limits

No fresh Luna build/browser/device test or output-size measurement performed; under4.5MB not verified. No geometry changes. Existing skin-apply rejection chosen-guard issue remains outside scope, as recorded in shape.md. Narrow frames/hand defaults remain serialized for later art tuning.
