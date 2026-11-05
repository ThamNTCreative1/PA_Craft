# Hero button spacing v1

Approved user oke. Implemented only HeroSelectionPanel.cs RefreshLayout: total group width uses actual cardWidth, and x positions use cardWidth+existing spacing. No other gameplay code, scene, prefab or asset edits.

Verification:
- Unity compile/domain reload completed; initial Console0errors.
- Landscape1920x1080 measured3visible edge gaps[20,20,20], group center(0,0). Card241.56x402.60. Additional landscape782x352 measured[20,20,20], center(0,0).
- Portrait540x960 measured horizontal20 and vertical20, center(0,0), card470.34x783.90. Actual9:16 verification, not a full1080x1920 render.
- Screenshots evidence/landscape.png and evidence/portrait-final.png show compact centered layout. evidence/portrait.png is an intermediate landscape screenshot captured before resize settled, not portrait proof.
- Runtime hand Begin/Realign on resized layout matched target point within.01. Double button invocation emitted1choice, hand hidden afterward.
- Initial play transition/domain reload interrupted initialization (GameManager.Instance null), leading to transient missing-script/Luna-not-registered diagnostics in that session. Restarted PlayMode; fresh session initialized correctly and completed tests. Final Console query0errors, one existing Animator.Update inactive-object warning after skin selection. No changes to Luna or Animator behavior made.
- Final Editor PlayModeoff, scene clean. GameView size selection restored to captured original8. Scene SHA256 unchanged:5E18EFA855C3783DC49A94C27260C8116F5DEB3A1C5DBCD4A11F3495B54EE3DF. Existing selection background state in current scene retained; this task did not change it.
- Source diff evidence/code.diff: one local totalWidth and one x-formula replacement. Button sizing, y-formula, hand code, HUD, input and roster unchanged.

No new assets/dependencies/geometry. Luna browser/device/build size not measured; under4.5MB unverified. Tests used Editor diagnostics and button callbacks, not physical touch.
