# Implementation report — map collider layout v1
Status: IMPLEMENTED; UNITY EDITOR VERIFIED; LUNA BUILD/RUNTIME UNVERIFIED
Approved by: user reply oke following the v1 plan presentation.
Planner: Codex; user explicitly waived the Claude planning step.

## Delivered scene change
- Assets/_Playable_/Scenes/Gameplay.unity saved before PlayMode tests and before Luna export.
- CityMap collision count: 3360 -> 1171.
- Removed 2187 colliders entirely outside the cropped visual map and 6 thin road-decoration colliders. Read-only mesh intersection confirmed all six lie on the Road surface at Y 13.44–13.45; overhead screenshot also confirmed surface markings.
- Removed 65 empty collider-only leaf objects after checking serialized references; preserved referenced objects and substantial in-map obstacles/platforms.
- Existing Ground Flat resized to center (29.75,12.96,18.01), size (101.5,1,91), top Y=13.46.
- Created CityMap/MapBoundaries and BoundaryWest/East/South/North, with four non-trigger layer-0 BoxColliders matching approved coordinates. Walls overlap ground and corners, and extend from Y=12.46 to Y=62.46.
- Original collider prefab remains linked; all collision edits are scene overrides. Shared prefab hash unchanged:
  D045F129359F3B823578BDE2A87076DCA2BC005B09F15A3A77271F8C09B77210.
- CameraController.cs hash unchanged:
  A5DE16EFAA2ABD533ED924AB80AF34F5B06DE5DEE0587484F05294A18CC2F517.
- No runtime classes, interfaces, events, patterns, packages, materials or model geometry were manually changed.
- Existing working-tree changes were preserved. No commits or resets.

## Unity verification evidence
- Static: zero original colliders entirely outside map, zero thin road-decoration candidates, exactly four perimeter colliders.
- Ground rays hit Y=13.46 at seven tested locations: spawn, crossing, road and four inner corners. At spawn and another platform location the preserved raised Structure collision correctly remains at Y=14, matching Base_Map mesh surface.
- Layer matrix: ground/walls layer 0 collides with Player layer 31; player ground mask and camera collision mask both include the layer.
- References: zero missing scripts or nonzero broken serialized object references. Prefab instance intact; scene clean after save and after exiting PlayMode.
- Actual PlayerController.FixedUpdate + Rigidbody simulation in paused PlayMode, with controlled move input: walking outward at four sides and four corners stayed inside all 8 cases.
- Jump tests at the same 8 locations: every case actually rose to peak Y=14.730–14.770 and stayed inside; final capsule center positions respect wall faces with approximately 0.35 radius clearance.
- Harness correction: the first combined run reused a frozen Time.time while _ignoreGroundUntil persisted, so only its first jump activated. That result was not accepted as jump evidence. Re-ran all eight cases with each test resetting its transient ignore timer; all eight actual jumps then passed.
- Camera tests invoked existing CameraController public controls at four edges and four corners, normal and paintball zoom views: all 16 tested camera positions remained inside map bounds. At point-blank walls camera obstruction pulls distance to about 0.053 units; after moving away the distance recovered to 3.774 units. No camera code was changed. This checks sampled collision positions, not exhaustive visual comfort across every rotation/aspect.
- Representative preserved structure and oak canopy collider ray tests returned hits at Y=16 and Y=22.
- Before export, Console error query returned zero entries after PlayMode tests. Warnings seen during PlayMode were MCP port-rebinding warnings (6400 -> 6401), not gameplay exceptions.
- No new test scripts were added; no script compilation requested. Existing project entered and exited PlayMode successfully.

## Luna export/build interruption — unresolved
- SDK is installed at F:/7.2.0; invoked the installed LunaCLI.Export API and attempted local jake project:build. No upload/deploy task was invoked.
- CLI discovery first encountered Jake absolute-path resolution; corrected by running in the installed pipeline directory with a relative Jakefile. This was a command setup correction, not a project change.
- During export the Unity Editor exited; no Unity instance remained connected. The saved scene remained on disk. Cause of exit was not proven; do not attribute it to a collider error.
- Editor log contains export diagnostics: Unsupported platform WebGL1: Particles/Standard Unlit[0][0]. These shaders were not changed by this work. Did not broaden scope to repair rendering or SDK configuration.
- The local build remained waiting after authorization; terminated only our identified project:build node process (PID 30952). No new final package was produced or validated.
- Export touched/generated Assets/SVC_Luna.asset (shader variant collection). Its pre-export content was not backed up, and the original status output was incomplete around this file; cannot safely separate pre-existing user edits from exporter output. Preserved it rather than resetting user changes. QualitySettings has no Git diff after export.
- Existing old package artifacts were not used as evidence for this scene change.
- Luna runtime behavior and current final package size versus 4.5 MB remain UNVERIFIED. No triangle/material changes were manually introduced; build contribution was not measured.

## Verification artifacts and rollback limitation
- Pre-change scene backup was created at Temp/MapColliderAudit/Gameplay.before.unity. Unity exit subsequently removed the Temp directory; this backup is no longer available.
- Pre-change inventory was captured at Temp/MapColliderAudit/collider-baseline.txt, also removed with Temp.
- Static, PlayMode, jump, camera and reference checks returned the results recorded above through Unity MCP. Their additional temporary text files were removed with Temp.
- Temporary crossing screenshot and local build log were removed with Temp. No persistent image/log artifacts are delivered; observed tool results are summarized in this report.
- Scene diff against backup: 2511 added lines / 2 removed lines, chiefly prefab removed-component/object overrides and four boundary boxes. Shared prefab and CameraController unchanged.
- Do not restore whole scene from Git HEAD: working tree had extensive prior changes. Automatic scene-backup/Undo rollback is unavailable after Editor exit. Any requested rollback must reconstruct only this task's known ground, removal and boundary overrides, and requires reviewing current scene changes first.

## Next options requiring a separate decision if pursued
1. Keep the verified collider scene and reopen Unity normally for manual review.
2. Investigate Luna export/unsupported shader diagnostics and rebuild under a separately approved scope if asset/config changes are needed.
No shader, SDK or camera behavior fix was attempted beyond plan v1.

Diff whitespace check against Git HEAD includes existing scene changes and reports Unity YAML trailing spaces; not cleaned because unrelated to this task. A task-only whitespace check could not be rerun because Editor exit removed the Temp backup.

Final saved Gameplay scene SHA256: D63EB707424F761C237560CFE55BFD9807E022E565A29F00F962F28F94BD4CB9.
Evidence-handling limitation: temporary verification files should have been copied outside Unity Temp before running the export; the durable evidence is this report and the recorded tool outputs.

