# Reference onboarding and first-touch clock - v3.1
Status: APPROVED BY DIRECT USER INSTRUCTION
Latest request supersedes v3.0 timer visibility/start behavior: only 0/3 at upper left, one visible countdown centered at top, initial horizontal swipe-hand tutorial matching supplied image, no tap instruction. First screen press starts BOTH hero motion and the countdown. Duration remains 30 seconds because latest request does not change the previously confirmed duration. Early rescue/store and no endcard behavior remain unchanged.
Reference viewed: C:/Users/Admin/.codemoss/codex-images/codex-img-1795165095846-044612ac.png. Do not add the screenshot's download button, close button or other unrelated gameplay/UI.

## Exact existing files/classes
- Scripts/RescueRules.cs: Tick does not consume elapsed time in Waiting; Start once begins Running and cannot reset elapsed time. Terminal guards unchanged.
- Scripts/RescueGameFlow.cs: start rules on first valid pointer press, then tick rules and movement; Initialize HUD with remaining time. ShowSwipe tutorial on scene ready; do not switch prompt to a tap/start step.
- Scripts/RescueHudView.cs: serialized counter and countdown Text references; Refresh(rescued,remaining). Counter displays only n/3, no SAFE/alive/pet-count suffix. Countdown displays ceil(remaining) as a plain number, cached per whole-second change.
- Scripts/RescueTutorialView.cs: ShowSwipe sets LEAD THE HERD, uses existing sprite hand movement and real-steer dismissal; remove ShowTap/OnStarted step. First tap alone does not dismiss swipe guidance. End hides guidance.
- Editor/RescueSceneBuilder.cs: create left counter 0/3, top-centered countdown 30; arrange existing hand above LEAD THE HERD and short goal subtitle with left/right arrows on a transparent tutorial layer, matching the supplied reference's teaching interaction. Keep FFFFORWA on all UI Text. No new sprite/font/package or runtime class/interface.
- Tests/Editor/RescueRulesTests.cs: no input never consumes time, late first press gets full 30s, repeated starts do not reset running time, strict deadline/goal and terminal guards.
- Tests/Editor/RescueSceneTests.cs: exact compact counter, single centered countdown, first-swipe title/no TAP prompt, hand and font bindings, no endcard; retain source asset/terrain/actor tests.
- Assets/_Playable_/Scenes/PetRescue.unity: regenerate only while clean, update references/layout. Source visual assets, gameplay coordinates and unrelated settings unchanged.

## Verification
Compile and Console; full rule/scene suite; waiting Play Mode observation shows elapsed 0 and countdown 30, starting then advancing reduces it; repeated start cannot reset; swipe-hand cue remains on first press and disappears on real steer. Capture initial UI and running state. No native mouse/touch, exported Luna runtime/store-destination or package-size claim unless actually tested. Existing pending lighting/Luna config/new-species proposals remain pending.

Result: IMPLEMENTED. Editor suite 17/17 and focused final UI check 1/1 pass. Waiting 0/30 and controlled start 2/28 verified; source scene saved without TAP instruction or endcard.
