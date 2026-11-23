# UI, round deadline and hand tutorial - v3.0
Status: APPROVED BY DIRECT USER INSTRUCTION AND FOLLOW-UP ANSWER
Confirmed behavior: no timer display; 30-second deadline starts at scene gameplay initialization (not the first tap). Rescue >=3 before that deadline opens the store immediately, per explicit follow-up answer. At the deadline, including no-input/tutorial/recovery cases, call GameEnded then open store directly. No endcard and no install-button interaction is required.

## Exact file/class/scene scope
All paths except scene are under Assets/_Playable_/PetRescue/.
- Scripts/RescueRules.cs: keep existing pure C# ownership/API and Waiting/Running/Won/Lost states. Tick elapsed time in Waiting as well as Running; terminal states remain immutable. Start begins forward-play state, never resets elapsed time. This separates global round deadline from first input without another timer/class.
- Scripts/RescueGameFlow.cs: duration default 30, call rules Tick every frame before first input/start transitions (deadline priority). First tap still starts hero automatic forward movement; horizontal drag remains the only steering input. Both terminal handlers stop gameplay/tutorial, call existing facade NotifyWin/NotifyLose (both map to GameEnded), then OpenStore directly. Remove endcard calls and button event subscriptions. No extra coroutine/timer/search or SDK calls outside existing facade.
- Scripts/RescueHudView.cs: retain only rescue/alive counter and Refresh(rescued,alive). Remove time/endcard/CTA references and events; no hidden timer text object.
- Scripts/RescueTutorialView.cs: retain tap/start/real-steer cue lifecycle; animate a UI Image hand side-to-side instead of text arrows. Cue does not block input; no auto-completion. Hide on actual steering or any terminal outcome.
- Editor/RescueSceneBuilder.cs: all UI Text uses existing Assets/Game/Fonts/FFFFORWA.TTF; existing sprite Assets/Game/Textures/UI/Common/icon_hand.png supplies a preserve-aspect, raycast-disabled hand Image. Delete generation of timer, endcard/card/install UI objects; generate only counter/tutorial. Keep current original terrain/material/scenery and current pet configuration.
- Tests/Editor/RescueRulesTests.cs and RescueSceneTests.cs: update deadline assertions, no-input deadline, non-resetting start, strict win/deadline race, terminal guards; assert no timer/endcard/install objects, font on every UI text, hand sprite/gesture movement and nonblocking behavior, duration=30, references and existing gameplay/terrain integrity.
- Assets/_Playable_/Scenes/PetRescue.unity: regenerate after successful compilation only if scene is clean. No discard of unsaved scene changes; no material/texture/model/package change in this amendment.
- Existing Scripts/LunaController.cs stays unchanged: NotifyWin/NotifyLose already map to guarded GameEnded; OpenStore maps to guarded InstallFullGame. No invented SDK method or new facade/API.
No new runtime class/interface/pattern, font import, sprite import, shader, project setting or external dependency.

## Verification
Compile/domain reload and Console; pure rules at Waiting 29.999/30, first tap at elapsed >0, third rescue before deadline, duplicate terminal input; scene tests for font/hand/no timer or endcard; Play Mode tutorial swipe ready/running and early success/30s no-input/recovery timeout direct store order. Do not trigger a real external store navigation during diagnostics if SDK cannot be safely observed; label the limit. Record Editor screenshots and test results.
Actual PetRescue Luna export/size remains dependent on the separately pending Luna scene-selection correction; do not report the old mission ZIP as proof. Pending lighting component and new species selection remain independent and unapproved by this UI request.

Result: IMPLEMENTED, Editor verified. Full suite 17/17 pass; focused final UI check 1/1 pass. Play Mode early success and no-input timeout request GameEnded/store directly with no endcard. Actual browser navigation and correct-scene Luna build remain unverified.
