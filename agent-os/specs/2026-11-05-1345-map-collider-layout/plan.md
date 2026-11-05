# Map collider layout — plan v1
Status: APPROVED
Approved by: user
Approved scope: plan v1, confirmed by user reply oke after presentation
Planner: Codex, explicitly authorized by user to bypass Claude for this item.

## Exact change list
- Modify only Assets/_Playable_/Scenes/Gameplay.unity for runtime content.
- Edit existing CityMap/CityMap_Cropped_Colliders instance through scene overrides. Do not apply overrides to Assets/GameAsset/Model/Map/Map cropped/CityMap_Cropped_Colliders.prefab.
- Resize existing Ground Flat BoxCollider to world center (29.75,12.96,18.01), size (101.50,1.00,91.00). Its top is Y=13.46, covering X [-21,80.50], Z [-27.49,63.51]. Use precise renderer bounds measured at execution, with displayed coordinates rounded here; maximum rounding tolerance 0.02 units.
- Remove collider components whose complete AABB is outside that XZ rectangle. Remove empty collider-only leaf GameObjects when their collider is removed, after confirming no scripts/references/children/renderers depend on them. Otherwise retain the object.
- Remove colliders for crossing markings and redundant thin ground decoration covered by the ground box: fully at/below ground top + 0.10, height <=0.15, with geometry verified to be horizontal ground decoration. Do not classify merely by the existing Wall/Structure names. If source geometry cannot establish a marking, stop and report rather than guess.
- Preserve substantial in-map obstacle and raised platform colliders; inspect their correspondence to visible geometry. Do not rebuild all buildings or remove their collisions.
- Create CityMap/MapBoundaries with identity world scale and four collider-only children, all non-trigger BoxCollider, no Rigidbody, on a player-colliding layer verified from the current scene. Prefer the current ground layer if the matrix permits it.
- BoundaryWest: center (-21.50,37.46,18.01), size (1,50,93).
- BoundaryEast: center (81.00,37.46,18.01), size (1,50,93).
- BoundarySouth: center (29.75,37.46,-27.99), size (103.5,50,1).
- BoundaryNorth: center (29.75,37.46,64.01), size (103.5,50,1).
- Inner wall faces match the map rectangle. Wall bottoms Y=12.46 overlap the floor; corners overlap without gaps. Walls extend to Y=62.46, above current map structures.
- Update planning status after approval and write implementation-report.md following work.

## Classes / interfaces / architecture
No new or changed C# classes, interfaces, base classes, public APIs, state or event subscriptions. No design pattern is required: serialized static collider composition is sufficient.
CameraController.cs: inspect and verify its current obstruction mask and SphereCastNonAlloc behavior; no code change planned.
PlayerController.cs: inspect ground mask, collision layer matrix and Rigidbody collision behavior; no code change planned.
Prefabs, model meshes/import settings, materials, packages, project settings, outcomes and tutorial flows: no modifications.
Flow: Player Rigidbody contacts ground/obstacles/walls; PlayerController probes the same ground through its configured mask; CameraController spherecasts against applicable non-trigger obstruction layers. Unity owns static collision data.

## Ordered implementation and gates
1. Recheck editor state, current bounds, transforms, prefab overrides, layers and existing dirty state. Capture pre-change collider inventory and affected serialized object references. Preserve existing working-tree changes.
2. Confirm current walking surface around player spawn is compatible with Y=13.46. Inspect marking candidates against rendered geometry without adding a persistent MeshCollider or changing mesh import settings.
3. If current geometry, layer setup, references or map shape contradict these assumptions, stop with cause, impact and options before changing this solution.
4. Resize ground; remove only confirmed obsolete/decoration collisions; add the four walls. Use Undo-aware Editor operations and scene overrides.
5. Validate counts, geometry, overlaps and reference integrity, then perform functional checks. Save Gameplay only after inspecting resulting changes.
6. Build/verify Luna using the existing project build workflow if available without configuration changes. Record actual output size; do not change build settings or optimize unrelated assets to force a pass.
7. Report verification evidence, unchanged/unverified areas and remaining issues.

## Acceptance and verification
- One ground BoxCollider remains for the flat base: inventory and bounds checks; downward ground probes at player spawn, road, crossing and unobstructed corners return the intended ground height.
- No crossing marking collision: inspect candidates against geometry and confirm they are absent from the final collider inventory. Elevated platforms remain solid.
- No obsolete collision fully outside map: final collider inventory for the original collider group.
- Four solid boundary boxes: verify world bounds, corner overlap, ground intersection, layer matrix and no triggers.
- Player remains inside: controlled PlayMode movement and jump attempts against all four edges and corners; inspect Rigidbody position and report each checked case. Restore temporary test state afterward.
- Obstacles remain solid: representative building, tree/trunk and raised platform contact checks.
- Camera remains usable: approach walls and obstacles, rotate and zoom using existing controls; confirm no clipping through solid geometry or persistent collapse of view. If fixing it needs a CameraController code or mask change beyond planned wall-layer selection, stop for revised approval.
- No new Console errors/exceptions; no missing references introduced; inspect scene diff and prefab override list.
- Luna: smoke test supported movement/camera against ground/walls in the built playable; measure final output versus 4.5 MB. Label unavailable build/runtime validation explicitly as unverified; do not equate Editor success with Luna success.
- Geometry/materials unchanged: verify no mesh/material/import changes introduced. No unit test files needed for this serialized scene adjustment.

## Rollback and limits
Use Undo and a baseline of affected scene objects to roll back only this work. Never reset/revert the entire dirty scene or working tree. Do not apply/unpack the shared collider prefab. If in-map obstacle collisions prove mismatched and require reconstruction, stop for a separate approved scope rather than silently rebuilding them.

