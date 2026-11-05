# Control tutorial anchors v1

Approved user oke. Scene-only implementation complete. No scripts/classes/assets added or changed.

- Swipe To Move is child of Minimalist Joystick04 root, anchor(.5,1), pivot(.5,0), position(0,24), size380x80.
- Hint is child of Fire, same anchor/pivot/position, size300x70. Existing Fire Hand relative transform and ScaleHandHint retained.
- Cue graphics remain raycastfalse; serialized tutorial refs and activeSelf states retained. Joystick root settings disableVisuals/dynamicPositioning/inputTransition/useFade allfalse: no root fade conflict identified.
- Scene diff vs current Editor snapshot: exactly6existing RectTransform blocks (2cue roots,4old/newparents), no added/deleted objects (evidence/scene-diff.json). Source snapshot in before/.

Verification:
- Confirmed saved hierarchy/anchors/top-gap24 and nonblocking graphics. Final Editor scene dirty=true after PlayMode exit; unrelated/unknown dirty state left untouched, not saved over the approved on-disk changes.
- Move screenshot evidence/move-landscape-final.png: text directly above joystick in landscape. Other move screenshot names are interrupted attempts, not visual proof.
- Fire screenshot evidence/fire-portrait-preview.png: text above Fire and retained hand points to button in portrait. This was a forced runtime Fire-stage preview via existing SetCues; not proof of full physical input progression.
- Synthesized UltimateJoystick pointerDown/Drag/Up produced nonzero horizontal axis. Initial transition test was interrupted/reset to Cancelled, so uninterrupted Move->Fire timing is not verified. Repeated Play sessions ended/reloaded during diagnostics; no gameplay logic changes made to bypass that outside scope.
- Begin and screen-press handler diagnostic showed Move cue active with joystick; forced Fire preview showed fire cue active. Existing OnShot callback hid fire cue; Cancel hid both. Actual firing/device touch and full natural Look->Move->Fire->Completed/outcome pass remain unverified.
- Console checked throughout; final0errors, warnings Animator.Update inactive object and Account API unavailable30seconds. Existing warnings/integration state from interrupted sessions must not be described as warning-free. No C# edits, so no new compilation requested.
- Original GameView index7 restored. Temporary runtime stage/control changes were not saved.

No fresh Luna browser/device build, final output size or geometry measurement. No new dependencies/geometry/assets. Under4.5MB unverified. Existing HUD, selection and other backgrounds retained.
