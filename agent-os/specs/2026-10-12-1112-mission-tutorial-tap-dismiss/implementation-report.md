# Mission tutorial tap dismissal
Authorization: User explicitly confirmed movement and camera-look guidance; other tutorials keep their individual completion actions. Three-file scope and verification were presented before editing. No separate Claude planning pass was performed.

Changes:
- GameController: any opening tutorial press dismisses existing movement guidance after preserving the existing vehicle interaction attempt. ShowStartTutorial records the display frame and controls existing hint references. Input skips the display frame and disabled-player state.
- PaintballMovementTutorial: mouse down / touch Began completes both movement and look hints. Touch takes priority over mouse. Begin/resume record the current frame to exclude the activating press. Existing movement/look completion and pause/re-entry behavior remain.
- MissionsJournalController: routes the existing display request through GameController so mission selection establishes the frame guard. Preserves existing direct display fallback when the controller is missing.
- No new classes, interfaces, assets, serialized references, scene/prefab edits, input packages or gameplay outcome changes. Shooting and first-ride dismissal code was not changed.

Verification:
- Unity 6000.0.60f1 script compilation/domain reload completed; Console zero errors.
- Ten in-memory Editor preview-scene checks passed: initial display, opening press dismissal without vehicle hit, independent hint preservation, opening re-entry, display-frame recording, paintball entry, pause hiding, resume restoration, completed hints staying dismissed on resume, paintball re-entry reset.
- Paintball completed state was injected for its lifecycle checks; no real touch/mouse event was synthesized. Opening press used the actual handler. This is not an end-to-end input test.
- git diff --check passed for scoped files. Existing project work preserved.

Unverified: fresh Luna build/browser/device touch, actual mission-selection click timing, complete mounting/driving/shooting flows, and final build size. No asset/geometry changes; no new size-compliance claim.
