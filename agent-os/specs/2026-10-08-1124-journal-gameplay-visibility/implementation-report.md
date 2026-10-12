# Implementation report ? journal gameplay visibility and hand pulse

Date: 2026-10-08
Status: Implementation complete; functional verification passed; build-size acceptance FAILED.

## Scope and approval

Implemented only the APPROVED plan selected by agent-os/specs/current.md, with its default decisions. This is a follow-up to the existing Missions Journal implementation. No other plan was read.

Preflight found DrivingPlayModeChecks assigning the removed _timeToShowMap property. Implementation paused and the exact three-line removal was proposed. User subsequently instructed ?h?y tri?n khai ?i?; this pass applies that amendment only, preserving the surrounding null guard, StopAllCoroutines and other checks.

## Changed files

- Assets/_Playable_/Scripts/GameController.cs: removed minimap fields, delayed coroutine and trigger; OnDrivingStarted only calls SetRiding(true). Removed unused imports.
- Assets/_Playable_/Scripts/UI/MissionsJournal/MissionsJournalController.cs: required serialized GamePanel reference; hides HUD on every Show; reveals it only on GO3 after closing the journal. World/player GameObjects remain active.
- Assets/_Playable_/Scripts/UI/MissionsJournal/JournalHandSequencer.cs: one 1.2x pulse (0.12s up, 0.12s down) per target including the initial arrival; retains remaining hold and movement; resets scale on Begin/Stop/disable.
- Assets/_Playable_/Scripts/Editor/DrivingPlayModeChecks.cs: approved removal of three obsolete SerializedObject minimap-delay setup lines.
- Assets/_Playable_/Scenes/Gameplay.unity: assigned Canvas/GamePanel (fileID 2754030885986225168), persisted pulse defaults and removed obsolete serialized fields. MinimapPanel remains inactive. Comparison to pre-task snapshot shows exactly three changed MonoBehaviour blocks (726936418, 2049079748, 2059272148), with no added/deleted blocks.

No new runtime class, interface, asset, material, shader, package, input path or lookup was introduced. Existing unrelated working-tree changes were preserved.

## Verification evidence

- Unity recompilation: passed, no new compilation errors. Source scan finds no remaining references to removed minimap fields/coroutine. git diff --check passes for tracked edited C# files.
- Deterministic Editor sequence sampling at all three targets: peak scale 1.2, target position error 0, settled scale 1; Stop clears sequence and restores scale.
- Play Mode: startup HUD false, CityMap_Cropped active, player GameObject active. GO1 keeps journal/HUD state; GO3 reveals HUD and enables player. Five repeated Show/GO3 cycles passed.
- Disabling the hand component mid-pulse in Play Mode resets scale to one and clears sequence. Five Begin/Stop repetitions do not compound scale.
- Actual mount ? drive ? dismount ? remount passed: travel 0.1002242 units; dismount at 0.5593538s; after 13.00309s HUD remained active and minimap inactive.
- Fresh Playworks project:build: exit 0, all four stages successful, including Luna code compilation and develop package.
- Headless Edge web preview: actual mouse clicks and emulated touch taps both passed startup HUD hidden/player active, GO1 unchanged, GO3 reveal and three HUD-button reopen/GO3 cycles. Pulse samples ranged 1?1.19967 (mouse) and 1?1.19994 (touch); GO resets scale to exactly one. See browser-verification.json and verification-startup.png in this folder.

## Limits and existing diagnostics

The first rendered frame was not captured with frame-level instrumentation. Startup state and the screenshot confirm hidden HUD after initialization; source calls Show from Start before ordinary rendering. Physical mobile hardware was not tested; touch was browser-emulated. No new permanent test script was added.

Existing Console diagnostics include missing script on btnBackToHome, Account API timeout, deprecated FindObjectOfType in ModelSwitcher, and audio-source time warnings during export. Web preview retains its existing unsupported-API banner. These were not changed within this plan. Editor checks and the specified web flows produced no new journal reference errors.

## Build size

Fresh playground package: package:bundle exit 0. Artifact: LunaTemp/stage4/create-hub/CCPW_V02_AnhPP_HuyNQ_build.zip, 5,722,859 bytes (5.723 MB decimal / 5.458 MiB). Gameplay.unity text serialization: 518,988 bytes; this is not the delivery size.

The ZIP exceeds both the 3.8 MB green target and 4.5 MB limit. Full acceptance therefore cannot be claimed. The prior package measured in this session was 5,728,645 bytes; the current package is 5,786 bytes smaller, but that comparison alone does not attribute every byte to the code changes. The project already exceeded budget before this pass; no fresh asset attribution audit was performed, so the exact dominant cause remains unverified.

Impact: functional implementation and compilation pass, but delivery budget remains unmet. Options requiring separate approval: audit and optimize existing assets/build configuration, or explicitly revise the delivery budget. No optimization or configuration change was applied; work stops at reporting this failed criterion.
