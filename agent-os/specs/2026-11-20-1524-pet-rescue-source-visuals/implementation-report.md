# Pet Rescue visual correction and close-follow report
Approved: v2.1 original visuals/scenery plus user-requested three-pet amendment (v2.2).
Status: APPROVED WORK IMPLEMENTED; SOURCE SHADER LIGHTING AND LUNA SCENE CONFIGURATION PENDING APPROVAL.

## Implemented
- Exactly one Dog, one Duck, one Rabbit. Close staggered offsets, small phase-offset oscillations, soft separation, bounded heading variation and road limits. No RNG/allocation per frame. Followers stop wandering/moving during hero recovery or terminal outcome; lost/rescued pets stop.
- Existing flow injects companions explicitly; no runtime object search or new interface/service.
- Original animal/TNT materials copied with GUID remaps; source pixels and shader code unchanged. Original per-face TNT side/top/bottom textures replace handmade bands/text. No source C# gameplay system imported.
- Native grass top/side, soil, oak/log/leaves, stone and stone-brick textures; 12 surrounding trees, 6 decorative stone pillars outside the road without colliders. Existing hero/HUD gameplay retained; initial HUD count now 3.
- Source shader closure: 21 files, byte-identical to source including CubeSurfaceShader and twenty Voxel Play shader/include files; target source references use copied shader GUIDs to avoid relying on Shader.Find name lookup. Existing target Voxel Play shader has the same display name but older/different bytes and was not overwritten.
- Two generated UV meshes GrassBlock.asset/LogBlock.asset; no new runtime mesh generation.
- No external source project writes, package/pipeline change, custom shader rewrite, commit or publication.

## Verification so far
- Compile complete; Console checks report zero errors.
- All 13 EditMode tests passed: job 9b4d50d2d15e47358178aa79916f2e02, 13/13, 0 failures. Includes original rules, exactly three unique species, native block-texture pixel comparison, source shader allowlist, per-face TNT textures/_Glow=0, scene references, foliage/pillar counts, swept blast checks, close-follow wandering/freeze/separation, hero recovery, and the consequence of losing one of three while goal remains three.
- Controlled Play Mode diagnostic: safe route at X=2.5 reaches Won with 3 rescued/3 alive at 9.62003 seconds. This uses explicit Editor simulation and does not prove touch/browser behavior.
- Original shaders Dog/Duck/Rabbit/TNT each report isSupported=true, no shader messages/errors in the active Editor pipeline. Missing URP package did not prevent the Built-in subshader from working. No package installed.
- Every copied shader/include compared byte-for-byte with source; all passed. New Unity assets have meta files.
- Screenshot source-visuals-ready.png shows textured environment and source TNT, but Duck/Rabbit are dark due to missing global ambient uniform. ambient-diagnostic.png shows the reversible diagnostic correction; it is not a persisted implementation result. Evidence in Temp/PetRescueEvidenceV2 (outside Assets).

## Actual blocker and proposed scope change
Duck/Rabbit original source shader requires _VPAmbientLight supplied by the source environment. Current runner value is 0. Testing value 1 in Editor restores the colors, without touching material or texture. Test value was restored to 0. Material substitution would violate the requested original appearance policy.
See lighting-proposal.md: proposed new RescueVisualLighting MonoBehaviour supplies/restores this shader uniform, with serialized value 1 and explicit tests. This new class is NOT implemented and requires approval under the project scope-change rule. Current material files remain original.

## Luna build
Current authorized-scope diagnostic build launched with PROJECT_PATH=D:/Source/PA_Craft TARGET_PLATFORM=playground, installed Playworks 7.2.0 project:build. Command completed stages 1-4 successfully, but subsequent inspection found luna.json unity.scenes still selects Gameplay.unity. The resulting 3,822,218-byte local ZIP is therefore an OLD MISSION scene package and MUST NOT be counted as PetRescue size verification. Earlier approximately 3.82MB reports likewise did not prove PetRescue export. C# source compilation passed, but current PetRescue asset/export/runtime/size acceptance remains unverified. This corrects the previous package-size inference.
Proposed pending correction: luna.json unity.scenes=["Assets/_Playable_/Scenes/PetRescue.unity"], unity.startupScene=0; no unrelated config changes. See lighting-proposal.md. No scene-list configuration change has been made without approval. No upload/deploy command used.
No release-ready appearance claim while ambient support is pending. Browser/device/CTA navigation and network-specific final HTML remain unverified; do not repeat the previously rejected headless browser/server command.

## File scope
Modified existing Scripts/RescuePetFollower.cs, Scripts/RescueGameFlow.cs, Editor/RescueSceneBuilder.cs, Tests/Editor/RescueSceneTests.cs, Tests/Editor/RescueRulesTests.cs; scene, animal/TNT prefabs, source material remaps, listed environment materials/textures, shaders and generated mesh assets per plan.
Pre-build copies of local SDK/editor-generated files stored under Temp/PetRescueEvidenceV2/sdk-baseline.json so cleanup restores this turn's starting state, including pre-existing modifications, rather than discarding user work.

SDK build completed with no fatal diagnostics; existing LP3007 (no custom events), LP1022 (shader variants), LP1032 (Timeline package) warnings belong to the scene actually exported. They do not establish support for PetRescue original-material shaders.

## Completed direct terrain amendment v2.4
- User-specified jungle_door_top.png and jungle_grass_block_side.png copied pixel-identically into Textures/Blocks with generated meta files. Native 16x16 pixels preserved, point filter and alpha settings retained.
- Border material Stone.mat now uses jungle_door_top with built-in Unlit/Transparent Cutout; border geometry repeats in 1-unit segments rather than stretching one door image along a 90-unit strip. Source stone pillars continue using their original stone-brick materials.
- GrassSide.mat uses jungle_grass_block_side on vertical grass-block sides; horizontal grass remains grass_block_top. The jungle side PNG has identical native bytes to the prior grass_block_side, so its visual pattern legitimately does not change. No source PNG editing or recoloring.
- Road, side banks, fence/borders and pit floor extend to Z=130; gate remains Z=65, hero speed/stop/goal unchanged. Scene inspection: 828 road tiles, final tile center Z=129.5; no gaps at sampled road columns through gate and Z=80/100/129.
- Changed existing Editor/RescueSceneBuilder.cs, Tests/Editor/RescueSceneTests.cs, Materials/Stone.mat, GrassSide.mat and PetRescue.unity; two new PNGs/metas only for this amendment. Original animal/TNT materials remain source-based. Current three pets retained: the three new species proposal remains unconfirmed.
- Verification: compilation and Console no errors; EditMode job 47d64d1eaf894f8796e3d2701ef9419f passed 14/14. Screenshot: Temp/PetRescueEvidenceV2/jungle-border-ground-extension.png (landscape Editor view). Active scene saved, clean, not in Play Mode.
- No Luna package-size claim for this amendment: original shader ambient support and correct Luna scene selection are still separately pending approval. No new runtime class/config change or browser command executed.

## Completed UI/deadline/store amendment v3.0 (latest behavior)
This section supersedes the previous 15-second first-tap timer and endcard flow. Explicit user answer confirms early success opens store immediately.
- Global 30-second round timer begins at scene flow initialization, including Waiting/tutorial time. First tap still starts hero motion; it does not restart/extend the deadline. Tick in Won/Lost remains guarded, and exact deadline takes priority over a late press/goal.
- Third safe rescue before 30 seconds: StopGameplay -> existing Luna facade NotifyWin (GameEnded) -> OpenStore. Timeout, including no input: StopGameplay -> NotifyLose (GameEnded) -> OpenStore. Facade's existing terminal/install guards remain unchanged. No SDK calls outside the facade; no new runtime class/interface.
- Removed timer text object, all endcard/title/result/install-button generation, HUD time/endcard fields and button events. Counter remains; no timer is displayed, including before or after start.
- All generated UI Text references existing Assets/Game/Fonts/FFFFORWA.TTF. Existing Assets/Game/Textures/UI/Common/icon_hand.png sprite replaces text arrows; hand Image preserves aspect, does not block input and moves horizontally with slight tilt. Real steering or round end hides it. Final tutorial layout separates hand and prompt in the landscape screenshot.
- Modified existing RescueRules.cs, RescueGameFlow.cs, RescueHudView.cs, RescueTutorialView.cs, Editor/RescueSceneBuilder.cs, RescueRulesTests.cs, RescueSceneTests.cs and PetRescue.unity. No font/texture imports, material/model changes, package/config change or extra facade API for this amendment.
- Full EditMode suite: 17/17 pass, job 97a110548e4748b7ab23b9ffca2524cb. After the small final hand-layout adjustment, focused UI test also passed 1/1, job 7e982e72814049a5b00a5ac1ff7b9e04.
- Play Mode observation without any first tap: state Waiting with elapsed 3.45268226 seconds, remaining 26.5473175 seconds, proving clock starts before input. Live UI contains only Rescue count and Prompt, both font FFFFORWA; timer/endcard absent.
- Controlled timeout diagnostic: advancing rules to elapsed=30 and ticking flow produced Lost, facade _ended=true, _installRequested=true and terminal guard=true. Calling flow again did not create an endcard; only rescue counter remains visible. This confirms dispatch to guarded SDK requests in Editor, not actual browser/store navigation.
- Controlled early success diagnostic after waiting before movement: Won at elapsed 17.9198856 (<30), rescued=3, facade _ended=true and _installRequested=true, endcardCount=0. Goal/store no longer waits for deadline.
- Compile/Console checks: no errors. Final evidence Temp/PetRescueEvidenceV3/font-hand-final.png. Scene left saved/clean and not in Play Mode.
- No claim of real touch/browser/store-destination validation or updated Luna size. Actual Luna scene selection and original-source lighting remain independently pending; three-new-species proposal also remains pending.

## Completed reference onboarding / first-touch clock amendment v3.1 (latest authority)
Latest user request explicitly supersedes v3.0's scene-start hidden clock. Duration remains 30 seconds; first valid screen press starts both hero auto-run and counting. Existing early-success/store and no-endcard outcomes are retained.
- HUD now shows only n/3 at upper left and one plain numeric countdown centered at top. No SAFE/alive/PETS suffix and no tap-to-run instruction. Initial values: 0/3 and 30.
- Waiting does not consume time. Start remains idempotent; subsequent taps cannot reset time. Flow starts the round on press before ticking movement/clock. No scene-load/no-input timeout in this latest version.
- Initial tutorial directly shows the existing hand swiping horizontally between left/right arrows above LEAD THE HERD and the short pet-to-gate goal. Transparent layer; FFFFORWA retained; hand remains on first press and hides on actual steering or terminal result. Relative vertical anchors keep hand above the title in portrait/landscape without overlap.
- Changed existing RescueRules.cs, RescueGameFlow.cs, RescueHudView.cs, RescueTutorialView.cs, Editor/RescueSceneBuilder.cs, both existing Editor test files and PetRescue.unity. No new source asset, runtime class, package, material or configuration change.
- Full EditMode suite: 17/17 pass, job d6fb5ce0777947f084f33171eab1016f. After final responsive hand-layout change, focused UI check 1/1 pass, job bfa74a9927c44d3581964ef91be7ed96.
- Play Mode waiting observation: state Waiting, elapsed 0, remaining 30; UI exactly 0/3 and 30, swipe/goal labels and no TAP text. Controlled Start + 2 seconds -> Running, elapsed 2, remaining/UI 28, counter 0/3, tutorial still visible. Repeated Start did not reset time. This diagnostic uses explicit rules/flow calls, not native touch injection.
- Compile complete; Console checks zero errors. Final evidence Temp/PetRescueEvidenceV31/initial-swipe-final.png. Current screenshot is landscape Editor view; responsive anchor constraint also tested. No claim of actual device/browser/portrait capture verification.
- Existing lighting/Luna scene configuration and additional species proposals remain pending. Actual PetRescue Luna runtime/store-destination/package budget not validated by this amendment; no old-mission size claim.

## Completed tutorial layout/pulse amendment v3.2
- LEAD THE HERD moved to upper-screen center beneath the score/timer HUD; uses existing DOTween DOScale pulse 1 -> 1.06 -> 1, 0.55s each leg, InOutSine, unscaled time.
- Goal caption increased from max font 15 to 22 with a larger two-line region. Hand stays above this caption.
- Left/right arrows are now centered children of the hand; horizontal positions use the actual preserve-aspect sprite width plus a 6-UI-unit gap. They move with the hand and no longer spread across panel-width percentages in landscape. Live left offset observed approximately -53.835 UI units (old panel percentage placement was much wider).
- Title sits outside the lower tutorial panel, so ShowSwipe/Hide explicitly manage title visibility. Hide/disable kills owned pulse and restores scale to one. Builder initializes a static preview layout without creating a tween outside Play Mode.
- Changed existing RescueTutorialView.cs, Editor/RescueSceneBuilder.cs, focused existing RescueSceneTests.cs check and PetRescue.unity. No new asset/class/package/material/shader, timer or outcome changes.
- Compilation/Console: no errors. Focused UI EditMode check passed 1/1, job 59c4821fcdea48d8b8a310dd1f6fd11d. The unchanged broader gameplay tests were not rerun for this UI-only edit; the prior v3.1 suite result remains 17/17 at that revision.
- Live Play Mode pulse inspection: scaleX=1.05143821 with tween active/playing; later scaleX=1.00903428. After OnSteered/Hide, owned tween inactive, title hidden, scale restored to exactly 1.0. Screenshot Temp/PetRescueEvidenceV32/title-pulse-near-arrows.png confirms top title, larger caption and tight arrows in landscape.
- Initial attempt to assert runtime tween disposal inside an EditMode preview failed: DOTween runtime manager is absent there. Runtime Play Mode verified the real cleanup; source now intentionally creates the pulse only when Application.isPlaying, while preview tests validate static layout/hide/reset. No claim that an inactive Editor preview runs an animation.
- Pending original-shader lighting, Luna scene-selection configuration and new species proposals remain unchanged. No new Luna export, device/browser or package-size claim.

## Completed independent timer correction v3.3 (latest authority)
- User explicitly corrected that visible gameplay countdown is 15s, separate from EndGame time, and answered that reaching gameplay zero must lose/open store immediately.
- Existing flow now has independent serialized _duration=15 (gameplay, first-touch start) and _endGameTime=30 (hidden scene-start overall cap), plus private global elapsed value. Waiting does not consume the 15s gameplay time. Existing early rescue opens store immediately. No endcard.
- Global cap invokes HandleEndGame -> new existing-facade NotifyEndGame -> guarded GameEnded -> OpenStore. Win and 15s Lose handlers remain separate and reuse existing guards. Terminal early return freezes both clocks and prevents later input/duplicate dispatch.
- Initial HUD countdown 15. Layout, title DOScale, caption, close hand arrows, assets and pet configuration unchanged.
- Changed existing RescueGameFlow.cs, LunaController.cs, Editor/RescueSceneBuilder.cs, both existing test files and PetRescue.unity. No new runtime class, package, setting or asset.
- Full EditMode suite passed 17/17, job ab86d01946ea4f6b828b4aa8e453fbb6. Compile/Console no errors.
- Play Mode waiting observation: gameplay elapsed 0, remaining/UI 15 while independent global elapsed was 7.99911451 seconds. Controlled first start + gameplay Tick(15) produced Lost, gameplay remaining 0, facade ended/store-requested flags true. Repeated flow update left global time frozen.
- Independent global-cap diagnostic in a fresh Play session: forced global elapsed 30 while gameplay still Waiting/remaining 15. Flow stopped and facade ended/store-requested flags became true, proving these are separate clocks rather than a mislabeled single duration. Diagnostics use controlled Editor calls and do not prove device input/store navigation.
- Final screenshot Temp/PetRescueEvidenceV33/gameplay-countdown-15.png; no endcard. Actual correct-scene Luna build/runtime/size and browser store destination remain unverified; pending proposals unchanged.

## Completed stationary swipe-arrow amendment v3.4
- Arrows reparented from animated hand to fixed tutorial panel; positions refer to fixed swipe origin and hand size, rotations remain identity. Only hand swipes/tilts; stroke reduced to +/-30 UI units to stay between close fixed arrows.
- Modified existing tutorial controller, builder, focused UI test and saved scene only. Title DOScale, caption, gameplay/global timer behavior unchanged.
- Focused UI test passed 1/1, job c0bf8ec8885f499a80b3ccb22612e05c. Compilation/Console no errors. Play Mode snapshot: hand X=-27.4943256 while arrow X=-83.83521/+83.83521 and rotations 0; subsequent snapshot confirms same fixed arrow positions while hand moves. No broad gameplay retest or Luna build claimed for this small UI change.

## Six-species import - rendering completion blocked
- User explicitly selected original Pig/Sheep/Fox prefabs. Added these to Dog/Duck/Rabbit, six unique followers with a loose rear cluster. Preserved source model/PNG bytes and material properties, including Pig original cutout-double-sided shader. Added native animation controllers and target prefabs; source project unchanged.
- Updated existing builder, follower trailing clamp, scene and tests. Full EditMode suite passed 18/18 (job 85d3891a959f43bcb888d1a5f0bd09af); source asset/material mapping checks included.
- Console now reports original URP shader dependency missing Lighting.hlsl in Built-in target. Existing original shader ambient dependency also remains unsupplied. Material assignment is verified, final visual appearance is not complete. No shader adaptation, lighting component, URP install or pipeline/config change performed.
- Stopped pending renewed approval: source-material-compatibility-proposal.md lists exact target-only Built-in shader adaptation and lighting adapter. No Play Mode, Luna export, browser/store or final package-size verification claimed for this import.

## Portrait top UI safe-area amendment
- Lowered count/countdown/title together in portrait, using actual unsafe top inset plus 3.5 percent screen height. Landscape keeps original positions. Existing HUD view, builder and scene changed; no new runtime class or asset. See portrait-top-ui-amendment.md.
- Synthetic portrait/no-notch, portrait44px-notch, repeated application and landscape reset diagnostics passed. Existing focused HUD/tutorial EditMode test passed 1/1, job 4ceb3dfab8804710b29d56d0eb419c7b. Compile complete; current Console error query returned zero entries. Prior source-material shader blocker remains pending; no shader reimport/fix was performed here. Actual device safe-area and Luna runtime not verified.

## TMP black-outline UI amendment
- Migrated all six PetRescue labels to TextMeshProUGUI, rebound existing HUD/tutorial TMP_Text references and updated builder. Reused existing FFFFORWA SDF font and matching black outline material (width0.25), without modifying shared assets. Rect transforms, portrait safe-area grouping, tutorial pulse and stationary arrows retained.
- Focused HUD/tutorial test passed1/1 (ea30c891f6374770aa67c34438d13511); verifies six TMP labels, zero legacy Text, font/outline and live text/hide/fixed-arrow logic. Compile complete, Console current errors0, six meshes generated. Actual browser/device and Luna export not run. Existing unrelated source-material compatibility remains pending.

## Continuous run and pet-triggered TNT amendment
- Hero now plays existing humanoid run clip via new Hero.controller. Recovery changes height only, keeps speed/steering every frame, removes pause and blast-position teleport. Pets continue following and can independently sweep-hit TNT; triggering pet/blast pets are lost, spent TNT creates a tile-footprint crater, nearby/later-entering hero auto-recovers. Distant pet blast does not pull hero backward.
- Changed existing motor/flow/hazard/builder, Hero prefab, PetRescue scene and scene tests; added Hero.controller/meta, no runtime class/package/shader/material changes.
- Full suite20 total:18 pass,2 unrelated state failures (current Pig shader Particles/Standard Unlit differs from original requirement; swipe-arrow TMP materials currently width0). No claim of all tests passing. New gameplay checks pass. See continuous-run-pet-tnt-amendment.md.
- Play Mode confirms actual Run state and leg motion16.10309deg, continuous recovery travel, automatic return to y0; Console query0 errors. Editor diagnostics only; device/browser/Luna export/budget not revalidated.

## Demo stepped crater correction
- Reviewed actual reference video explosion sequence. Replaced small removed-tile disk with wide irregular voxel depression, three1/2/3-block depth terraces, dirt walls and native stone floor.43-56 shared columns per hazard. Shared columns only lower on overlapping explosions. Added two sealed dirt road-edge walls and24-vertex tiled UV mesh to avoid sky gaps/stretched texture. Existing Pit.mat uses imported stone.png via Unlit/Texture.
- Existing hazard/flow/builder, scene/TNT prefab and tests updated; new RoadEarthWall mesh asset/meta. No new runtime type, package, source texture, pet material or UI modification. Hero retains continuous running and auto-jump; repeat triggering inside same crater suppressed.
- Focused crater/pet TNT/recovery/sweep tests4/4 pass, jobc170fe9268f14bec8eb4358a3a099700. Final Play Mode screenshot inspected: Temp/PetRescueDemoReview/stepped-crater-final.png. Console current errors0. Prior unrelated full-suite material/UI failures not reclassified as passed. No actual Luna runtime/export/budget claim.

## Half speed, closer camera, no holes and audio
- User requested speed and camera distance halved, no explosion crater and complete audio. Confirmed route/time must remain unchanged despite slower speed. Hero now3.5, animation0.5; camera offset(0,3,-4.5) and half portrait compensation; no fall/recovery or terrain mutation after TNT. Hero/pet TNT activation, burst and blast pet loss retained.
- Added scene-bound RescueAudioView with four sources and16 short balanced mono cues for music/start/steps/six pets/explosion/loss/rescue/countdown/outcomes; first-touch start, terminal/background cleanup and duplicate guards. Source assets136697bytes total, not final build size. Audio provenance recorded separately; no source project edits.
- Existing motor/camera/hazard/flow/builder/tests, scene and Hero/TNT prefabs updated; new Audio folder/clips/meta and RescueAudioView.cs/meta. No new package/shader/material change.
- Full suite21/23; all new behavior checks passed, old Pig material/swipe outline checks still fail. Play Mode source start/stop/one-shot and camera diagnostics passed; Console error query0. Portrait/landscape world-camera screenshots inspected. Actual device/browser output, autoplay, store sound completion and Luna export/budget not validated.

## Original animation speed and selected skybox
- Restored player Animator speed1; forward speed3.5 retained. Current selected Day02 skybox was assigned correctly but Main Camera SolidColor prevented rendering. Camera now Skybox, SceneView skybox display enabled, builder preserves user's chosen sky instead of erasing it. No material/cubemap changes.
- Existing motor/builder/tests, scene/Hero prefab updated. Focused3/3 tests pass (309584fe6d484c6d9ae9fc2d9df43fd9); camera render inspected, assigned sky visible. Console current errors0. No new Luna/device/browser verification.

## Source TNT VFX and background audio
- Imported user-selected tnt_explosion prefab with4 native particle systems,4 materials and5 PNG dependencies. User explicitly approved Built-in material conversion and exclusion of source HAVIGAME audio/pool scripts. Source files untouched; target-only Particles/Standard Unlit conversion retains alpha/additive settings and active BaseMap texture selection. No copied runtime source logic.
- Existing hazard/builder/TNT prefab/scene/tests updated. Nine preloaded source effects,36 inactive systems; effect starts only on once-only detonation and deactivates after final particles, without scaling old cube or creating holes. Source2 MonoBehaviours and duplicate AudioSource excluded.
- Explosion.ogg is byte-identical source explode1.ogg; background replaced with24s source an_ordinary_day excerpt and loop volume0.22. Existing first-touch unlock/outcome cleanup retained. No gameplay/camera/speed/timer/material-troubleshooting scope expansion.
- Final focused4/4 EditMode checks passed jobce4d62acff14476c8897fd7c4177d266, including particle lifetime/cleanup/retrigger, original audio, background reference, pet activation and unchanged terrain. Four source particle blocks match except lifecycle flags; five PNG byte checks pass.
- Controlled Play Mode screenshot inspected: Temp/PetRescueSourceVfx/source-explosion.png; impact particle counts17/15/15/1, music/explosion playback observed. Initial paused Simulate IsAlive issue fixed and covered by final lifetime assertions. Final Console error query0. No actual Luna/browser/device/export/size validation; old unrelated Pig/swipe-outline failures remain unaddressed. See source-tnt-vfx-background-amendment.md and dependency/provenance manifests.

## Reference endcard and CTA-only store
- User supplied loss-card image and explicitly confirmed store opens only on INSTALL NOW. This supersedes immediate automatic store behavior. Separate win/lose/overall-end handlers keep existing SDK GameEnded notifications and stop gameplay, then show modal endcard. Store callback remains in existing guarded LunaController, supplied explicitly by flow.
- New RescueEndcardView owns responsive native UI, title/message and once-only install callback; duplicate initialization removes owned listener first, OnDestroy detaches. Initial root hidden; backdrop raycasts block gameplay, active card at last sibling. Repeated Show cannot overwrite first outcome; CTA disables after first request.
- Builder creates gray/taupe pixel-style beveled panel, shadow, INSTALL NOW button and three TMP labels with existing FFFFORWA SDF/black outline. New runtime script/meta plus existing flow/builder/tests and scene changed. No image/font/material/package/SDK API changes.
- Focused3/3 EditMode checks passed job8b6b86f9af9d410981ccbe4468c334d3 (two win/loss variants plus scene references). Controlled Play Mode loss: endcard active, facade ended=true, installRequested=false before click; after two direct Button.onClick invokes installRequested=true and button disabled. This is Editor callback verification, not native device click/store destination.
- Actual overlay Game View screenshot inspected: Temp/PetRescueEndcard/endcard-landscape.png. Additional offscreen camera/UI captures at540x960 and960x540 verify centered430x250 card and readable content; temporary ScreenSpaceCamera changes discarded by exiting Play Mode. During capture helper an unnecessary CanvasScaler.SendMessage(Update) logged one Editor diagnostic error (no receiver); compilation/gameplay checks had no errors. This helper call is not in product scripts. No claim that final Console contains zero historical diagnostics.
- Existing old Pig material and swipe-arrow outline discrepancies remain outside amendment. No full-suite rerun, Luna/browser/device/store-destination or final budget verification. See reference-endcard-amendment.md.

## White endcard text correction
Direct user request: all endcard text white. Updated existing builder title/message colors and all three saved-scene TMP labels to Color.white. Existing black outline/materials/layout/CTA logic unchanged. Verified all3 label colors RGBA1,1,1,1. Stopped active Play Mode before saving edit scene; no tests added for this color-only change.

## Previous background restored
Direct user request: use old background sound. Restored exact prior Music.ogg from retained Temp/PetRescueAudioMix/Music.ogg (16s a_familiar_room source excerpt30-46s), retained asset GUID and source references. Restored old volume0.14 in scene/builder; loop and first-touch behavior unchanged. Updated existing length/volume assertion and provenance. Imported clip verified16s/looptrue/volume0.14. Explosion/VFX/pet/event sounds untouched. No new tests for this audio-selection-only change.

## Loss auto-store and tap-anywhere retries
- User explicitly superseded loss CTA-only policy: show loss card then automatic store, and every later tap anywhere requests store. Existing EndcardView, flow and LunaController updated, no scene/asset/class additions. Win stays CTA-only. Auto callback once; gesture retries bypass previous install-request guard but require ended game. Loss CTA remains usable; Unity pointer handler covers panel/backdrop and standard Button handles CTA.
- Focused3/3 pass (55e5efe6288b4f3c9c0cdec476628e2c). Play Mode automatic request flag true; rendered EventSystem raycasts at backdrop/card/CTA each dispatch one gesture callback; CTA remains enabled. Console current errors0. Actual native browser/store delivery not validated, UI routing uses injected counter callback for gesture checks.

## User-selected Go Up Music background
Direct user request: bind Assets/Sound/Go Up Music.mp3. Existing scene music source and builder now reference exact existing clip directly (100.656s), looptrue, volume0.14, playOnAwakefalse. First-touch start/terminal stop and other sounds unchanged. Source music file/import settings unmodified, old generated Music.ogg retained unused. Verified loaded clip reference/settings; updated existing binding assertion. No export/budget check or new tests for audio selection.

## Portrait top UI additional50-unit shift
Direct screenshot request: lower top counter/timer/title another50 in portrait. Existing HudView applies equal-50 to both vertical root offsets, preserving prior safe-area inset/root height/spacing; landscape offsets return0. Saved scene with actual current layout. Synthetic portrait/notch/repeated application/landscape reset checks passed; no tests added for this small reversible layout change.

## Portrait top offset -55
User corrected portrait top shift from -50 to -55 UI units. Existing safe-area padding and landscape layout retained; saved current scene layout.
