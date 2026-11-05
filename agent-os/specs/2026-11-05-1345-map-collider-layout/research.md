# Map collider layout research
Status: RESEARCH READY — implementation not approved

## Request
Rearrange colliders for the current map: one ground BoxCollider, no pedestrian-crossing colliders, perimeter boxes to prevent leaving the map. User referenced CameraController.cs.

## Observed current state
- Unity 6000.0.60f1, active scene Assets/_Playable_/Scenes/Gameplay.unity; stopped, idle, not compiling.
- CityMap world position (0,0,0), scale (1,1,1), four renderers: Base_Map, Grass, Road, Water.
- Rendered map XZ bounds approximately X [-21,80.50], Z [-27.49,63.51]. Base_Map Y [11,45]; Road Y [11.44,13.45]; Grass Y [14,16]. Rendered aggregate bounds alone do not establish traversable surface heights.
- CityMap/CityMap_Cropped_Colliders contains 3360 colliders: Structure 3343, Wall 11, canopy 5, Ground Flat 1.
- Existing Ground Flat center (7,12.96,-24.49), size (150,1,167); top Y 13.46.
- 2187 collider AABBs lie entirely outside the current rendered XZ bounds. This indicates the collision layout does not fit the cropped visual map. Source history/cause has not been investigated.
- Sample Wall colliders at Y 13.42 are tiny flat boxes, including locations outside the map. Names do not reliably distinguish crossing markings from real obstacles.
- Collider hierarchy is a prefab instance of Assets/GameAsset/Model/Map/Map cropped/CityMap_Cropped_Colliders.prefab.
- Working tree already contains extensive user modifications, including scene/assets/scripts; preserve all existing changes.

## Relevant behavior
- CameraController.ApplyPose uses SphereCastNonAlloc with _collisionMask, ignores triggers and player/vehicle children, and pulls the camera inward on hits. Perimeter boxes may affect camera near map edges.
- PlayerController uses Rigidbody collisions plus ground probing (_groundMask, SphereCastNonAlloc), slope checks and step probing. A perimeter needs non-trigger boxes on layers that collide with the player.
- No new runtime class/interface appears necessary for a scene collider adjustment; final decisions belong to Claude planning.

## Planning questions and candidates (not an approved implementation plan)
- Target Gameplay.unity and CityMap collider hierarchy. Prefer scene instance overrides unless a shared prefab modification is explicitly planned and approved.
- Fit the single ground collider to the current cropped footprint and confirm surface Y visually/with mesh sampling before fixing dimensions.
- Add closed perimeter boxes with no gaps, sufficiently tall for supported player jumps; keep player spawn within bounds.
- Identify and omit crossing paint colliders; preserve appropriately fitted collisions for substantial structures/obstacles. Do not interpret the request as deleting all obstacle collisions.
- Inspect the 1173 remaining potentially intersecting collider boxes individually/by geometry; mere AABB intersection does not prove suitability.
- Determine whether the visible Grass Y 14–16 surfaces need obstacle/platform collisions beyond the single base ground box.

## Verification required in Claude plan
- Inventory ground and perimeter boxes; validate bounds, overlap at corners, layer collision matrix and absence of marking colliders.
- Ground rays at spawn, road, intersections and map corners; player walking/jumping against every edge and corner; obstacle contact and camera obstruction near walls.
- Console/compile checks and clean startup. No code changes expected, but verify serialized references and prefab override scope.
- Measure Luna build output against 4.5 MB; Editor checks alone do not establish Luna compatibility or size.

## Scope and status
Research only. No scene, prefab, script, material, model, package or setting was modified. Only research documents and current work-item pointer were written, as required by workflow.
Next: Claude writes shape.md, plan.md and standards.md, loading mandatory architecture and verification skills; user approves exact files/objects and verification plan before Codex implements.
