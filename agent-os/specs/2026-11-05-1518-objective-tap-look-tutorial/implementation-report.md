# Implementation report
Status: APPROVED THREE-FILE IMPLEMENTATION COMPLETE; EDITOR/EVENT-LEVEL PLAYMODE VERIFICATION PASSED
User approved exact plan with oke.

## Changes
- TouchController.cs: new OnScreenPressed C# event and allocation-free LegacyInput Update. TouchBegan prioritized over mouseDown, at most one notification perframe; regardless UI position. Existing OnLookDelta/pointerownership/camera drag unchanged.
- CombatTutorialController.cs: subscribes/unsubscribes screenpress, removes45deglooktracking/dependency. Begin recordsframe; fresh post-Begin press in Look transitionsMove/hidesLook cue. Move.25s,Fire,Completed,Cancel,visiblecontrols/firegating unchanged.
- Gameplay.unity: Objective anchoredY-30->-60; originalanchors,pivot,size,text/style untouched. Removed only obsolete camera/threshold values from tutorialcomponent. Diskblockcomparison proves exactlytwo scene blocks changed139923338 and319163886; no objects added/removed. No CameraController/Flow/monster/prefabchanges.

## Verification
- Backups: gameplay-before.unity.bak,touch-before.cs.bak,tutorial-before.cs.bak.
- Compile/domainreload completed; errorqueries returned0.
- playmode-evidence.txt records normalizedscreen-event tests using the actual event delegate (not physical hardware input): sameBeginframeignored; freshpress Look->Move with zero camera rotation/no drag; repeatedpress cannot skipMove; complete/cancelpressesignored; unsubscribe/re-subscribe exactlyonce; restartframeguard passed.
- Actual joystick/fire pointer handlers and realframes: holdMove->Fire,firstshotcompletes,Cancelreleasesheldpointer. Controlsvisible andfiregated atBegin. Existing TouchController drag still changescameraYaw.
- Physical mouse/touchBegan polling was source-inspected, not injected from hardware; do not claim device or left/right/UI-position hardware tests passed. No DeviceSimulator/Luna build or final4.5MB measurement.
- ObjectivepositionY-60 confirmed before/afterPlayMode;anchors(.15,.87)..(.85,.98),size(0,-60) unchanged. FinalHP750,monsterroot18,14,18,endTime30. Runtime-only test timeout/CTA extensions notsaved.
- CameraSHA256 a5de16efaa2abd533ed924ab80af34f5b06de5dee0587484f05294a18cc2f517 unchanged. diff-evidence.json/final-state.json included.
- FinalConsolewarning: Account API inaccessible within30seconds (network/editorfocus). No out-of-scope fix; do not claim warning-freeConsole.
- Planned scene edits saved beforePlayMode. At finalcheck Editoralready exitedPlayMode and sceneDirty=true; on-disk scene still has only intendedtwo blocks changed. LeftcurrentdirtyEditorstateuntouched rather than saving/unloading unknown livechanges. No whole-scene reset or unrelated UI modification.
- No commits,newclasses/interfaces/packages/shaders orprohibitedruntimesearch introduced.
