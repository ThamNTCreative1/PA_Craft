# Pet Rescue Runner - Implementation report
Approved scope: plan.md v1 + shape.md v1; user approval: "oke".
Status: IMPLEMENTED; Editor checks and local Luna package build passed. Browser/device and final network HTML verification remain open.

## Delivered
- New Assets/_Playable_/Scenes/PetRescue.unity; enabled as the build entry. Original Gameplay.unity retained and disabled in build settings; existing gameplay code and scene untouched.
- Eleven runtime classes under Assets/_Playable_/PetRescue/Scripts exactly as planned: pure rules, Legacy pointer adapter, hero motor, pet follower, TNT hazard, camera, HUD, tutorial, game flow, Luna facade and typed locator.
- Editor scene builder, two Editor test files; five prefabs, three visual-only model copies, three texture copies, three minimal animation controllers and fourteen shared Unlit materials. New assets have paired meta files. No source project script/controller/UI/audio imported; source project unchanged.
- Six initial pets, nine TNT hazards, continuous horizontal steering, single tap start, 15-second deadline, blast-only pet loss, visible pits and automatic hero recovery, >=3 safe gate crossings to win. Win/Lose are separate terminal handlers followed by corresponding endcard and a fresh explicit CTA.
- No replay, automatic store opening, new package, custom shader, Blender operation, commit or publish.

## Verification evidence
- Unity compilation completed; Console reported zero errors at checks before and during Play Mode.
- Final runtime/scene suite: 10/10 passed (job 560c01c82e4842c8bfec6a43418606e5). Coverage includes no clock before start, duplicate start, pet identity guards, third rescue, deadline priority, serialized scene wiring/counts, allowed render materials, swept hit, inclusive blast boundary and auto-recovery/stop.
- Earlier tests caught blast-boundary float rounding (fixed with a small comparison tolerance) and a stale in-memory material shader after export (restored approved shader; builder now explicitly reapplies intended shaders). Tests were rerun after fixes.
- Controlled Play Mode simulation (through Editor diagnostic calls, not actual mouse/touch): safe route x=2.5 reached Won with 3 rescued / 6 alive at 9.760034 seconds; win endcard captured.
- Controlled blast: pet inside radius hidden/lost; pet outside survives; hero at y=-3 during fall; remaining time 14.62 seconds. Recovery completed at y=0, z=28.84 with 13.72 seconds remaining. Then timeout produced Lost, zero remaining and lose endcard. Earlier recovery endpoint floating residue was fixed by snapping to exact exit position.
- Additional live-frame Editor check: CTA disabled on the outcome frame, enabled on a subsequent frame once no pointer was held. Actual store navigation and real device touch were not triggered during diagnostics.
- Scene geometry inspection: 19,528 triangles including repeated/hidden primitive meshes; 1,548 MeshFilter/SkinnedMeshRenderer entries. No claim of draw-call or device performance validation.
- Runtime source scan found no prohibited object search, Physics2D, new Input System or reflection in new runtime scripts; only LunaController contains direct Luna SDK calls. Editor diagnostics do use Editor-only search/reflection.
- Visual assets copied: 2,278,103 source bytes; source bytes are not used as final build size.

## Build
- Installed Playworks 7.2.0 pipeline: project:build completed stage1 export, stage2 assets, stage3 code, stage4 develop package. project:recompile also passed after the recovery endpoint fix.
- Explicit package:bundle with TARGET_PLATFORM=playground produced a local create-hub build ZIP; no upload/deploy command was invoked.
- TARGET_PLATFORM=ironsource was unavailable in this installation (no such template); no project configuration changed to add one.
- Final command: PROJECT_PATH=D:/Source/PA_Craft TARGET_PLATFORM=playground, node F:/7.2.0/pipeline/jake.js -f Jakefile.js project:build (working directory F:/7.2.0/pipeline). Stages 1-4 completed successfully, exit 0; no upload/deploy task used.
- Local artifact: LunaTemp/stage4/create-hub/C1_2611_HuyNQ_UAC_V90_ThamNT_build.zip. Final size: 3,822,512 bytes (3.82 decimal MB), below 4,500,000 bytes for this ZIP; remaining headroom 677,488 bytes. This is the local Playground upload package, not a network-specific single HTML ad; final channel HTML size is unverified.
- SHA256: c642b53ebd696099aa63b9b3b79bfa276d9d343798e1c255921dfc364cf185c4.
- ZIP content contributions (raw bytes / compressed member bytes): assets 1,741,745 / 1,598,159; scripts+data 1,287,514 / 974,545; engine 4,479,105 / 1,167,041; other 573,005 / 75,644. ZIP metadata adds the remaining bytes. Raw member sum is larger than ZIP size and must not be represented as a sub-4.5MB HTML result.
- Final build diagnostics: EarliestFatalError=0; nonfatal LP3007 (no custom events), LP1022 (32 shader variants), LP1032 (existing Timeline package). Final feature material inspection: all fourteen use the intended Unlit/Color or Unlit/Texture and none dirty.

## Evidence locations (local, outside Assets)
Temp/PetRescueEvidence/ready-ui.png, win-ui-1.png, pit-ui-1.png, lose-ui.png. Pit capture is from a paused controlled simulation; burst effect time was also paused. These images do not prove native device input.
Test results available from Unity test jobs; build diagnostics generated under LunaTemp (not committed).

## Unverified checks / limitations
- Automatic approval review rejected the command launching an Edge headless browser and local HTTP server as "blocked by policy". The command did not run. Exported playable browser behavior, touch on a device, actual CTA navigation and channel-specific final HTML are not verified.
- Playworks diagnostics report existing com.unity.timeline 1.8.9 as unsupported, 32 shader variants and no custom analytics events. No package or analytics changes were made outside the approved scope. Exporter warning severity was nonfatal; browser/device verification remains necessary.
- Source FBX import warns that several Duck/Rabbit meshes have no normals for tangent calculation. Materials are unlit; mesh optimization/repair was not added to scope.
- The complete develop directory includes the SDK development shell and uncompressed engines; it is not the ad package and is not used as evidence for the 4.5MB ad limit. The local upload ZIP size will be recorded separately; no assertion of final per-network HTML size is made.
- Mouse/touch cancellation, focus, multi-touch, landscape layout and performance still need hands-on checks; no claim that all acceptance criteria are verified.

## Scope cleanup
- Restored only task-generated changes in Assets/SVC_Luna.asset, luna.json (SDK mono version detection) and UserSettings/EditorUserSettings.asset (recent scenes) to their known-clean pre-task tracked bytes after final build. No pre-existing changes in these files were present at task start.
- Pre-existing .idea/.idea.PA_Craft/.idea/claudeCodeTabState.xml is preserved.

Final prefab correction: TNT prefab stores an empty tile list; scene-specific tile references are wired after saving the reusable prefab. This avoids cross-scene null references in the prefab. Scene hazards retain their tile footprints. No runtime behavior or new asset scope added.
