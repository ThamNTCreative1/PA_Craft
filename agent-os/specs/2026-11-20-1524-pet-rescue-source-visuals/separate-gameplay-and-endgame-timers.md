# Separate gameplay countdown and global EndGame limit - v3.3
Status: APPROVED BY DIRECT USER CORRECTION AND FOLLOW-UP ANSWER
User correction: visible time is a 15-second countdown, not the EndGame timer. Explicit follow-up: when those 15 gameplay seconds reach zero, lose and open store immediately. Existing early rescue store policy remains.
Interpretation combining prior explicit requirements: UI gameplay countdown=15 starts on first touch; hidden overall EndGame limit=30 starts at scene flow initialization and remains a separate cap. No input consumes no gameplay countdown, but the global cap can still close the ad. No endcard.

## Exact existing files
- Scripts/RescueGameFlow.cs: _duration default 15 for RescueRules; independent serialized _endGameTime default 30 and private scene elapsed clock; terminal early-return guard. Check global cap before input/gameplay, then normal first-touch countdown. Add HandleEndGame for global cap to stop input/motion/tutorial and invoke the existing facade's new generic EndGame entry followed by OpenStore. Preserve separate HandleWin and HandleLose (15s timeout) flows.
- Scripts/LunaController.cs: add NotifyEndGame() -> existing private EndOnce() -> real Luna.Unity.LifeCycle.GameEnded(). Existing shared event/install guards, Win/Lose entry points and InstallFullGame mapping unchanged. No new class/interface/service.
- Editor/RescueSceneBuilder.cs: initial centered countdown label 15; fresh flow serializes gameplay 15 and global cap 30. No layout/material/asset change.
- Tests/Editor/RescueRulesTests.cs: use 15-second gameplay windows; no-tap does not count down; no reset by repeated Start; strict 15s boundary and early rescue.
- Tests/Editor/RescueSceneTests.cs: verify independent serialized durations 15/30 and UI initially 15; existing font/tutorial/terrain/actor checks retained.
- Scenes/PetRescue.unity: update serialized durations and initial label; regenerate only while clean.
Rules already support a caller-supplied duration and need no source edit. HUD already formats remaining seconds and needs no source edit.

## Verification
Compile and Console; full rules/scene suite; Play Mode controlled tests: waiting gameplay remaining 15, start then 2 sec =>13; at gameplay 15 =>Lost and SDK/store requested; scene cap 30 while waiting =>SDK/store requested with gameplay countdown unconsumed; terminal repeated updates do not advance either clock or duplicate dispatch. Original early rescue behavior remains covered. Real mouse/touch, store destination and correct-scene exported Luna runtime/size remain unverified if not actually tested. Do not change separately pending lighting/species/Luna scene config proposals.

Result: IMPLEMENTED. Full suite 17/17 pass; Editor verified independent 15s round loss/store request and 30s overall cap, with no input leaving UI countdown 15.
