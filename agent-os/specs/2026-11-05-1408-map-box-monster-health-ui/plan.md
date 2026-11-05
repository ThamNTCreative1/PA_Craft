# Implementation plan
Status: APPROVED
Approved by: user
Approved scope: UI sprite replacement and read-only map gap audit, exact plan confirmed by user: oke hay tiep tuc
Planner: Claude CLI; scoped and reviewed by Codex.

## Exact UI file/object scope
- Add Assets/_Playable_/UI/MonsterHealth/ directory and metadata.
- Add progressBar_HP_1.png, progressBar_HP_2_.png and Unity-generated metadata in that directory, copied from D:/Source/minecraft/Assets/Game/Textures/Common/. Import as single UI sprites; preserve slicing border from source importer, disable mipmaps.
- Modify Assets/_Playable_/Prefabs/Monster/Monster.prefab only within HealthBarAnchor: existing Background Image uses frame sprite, white tint and source slicing; existing Health Image uses fill sprite, white tint, horizontal Filled/Left. Map source relative inset to existing 300x32 rect. Keep WorldSpace canvas, scale .01, hierarchy, components, _fill reference and all other serialized references.
- Assets/_Playable_/Scenes/Gameplay.unity only if existing Monster image overrides mask prefab visuals; preserve camera override and all gameplay Canvas objects, components, references and active states. No source rotation, GhostBar or sample text imported.
- No C# edits, no new classes/interfaces; preserve CameraController, WorldHealthBar and MonsterController.

## Map scope
Keep CityMap/CityMap_Cropped_Colliders (110 groups,1164 boxes). Read-only audit found no disabled boxes, triggers, duplicate world AABBs or boxes fully outside map. This is not proof of complete geometry coverage. Combined map renderer bounds cannot identify gaps. No collider additions have an approved measured position/size yet. Continue read-only spatial inspection and supply exact gap rows before changes; never invent positions or fill whole map renderer bounds.

## Verification
Capture gameplay Canvas hierarchy/component/reference/active state baseline and compare after edits. Check only monster images changed, existing scene camera assigned, sprite dependencies valid, no missing scripts. Exercise normalized HP 1/.5/0, retain full original value after diagnostic, verify left fill, camera facing, portrait/landscape. Check Console and camera collision near any later approved boxes. Luna build/runtime and measured output below4.5MB are required for final compatibility/size claims; report checks not run honestly. Preserve pre-existing working tree changes, no commits/reset/reverts.


## User clarification
Main gameplay UI and player controls must be preserved. Vehicle UI is not required and must not be restored merely to match the old baseline. This resolves the vehicle-only hierarchy discrepancy. Read-only map gap audit continues; specific new collider operations remain pending approval.

## Approved extension
User approved collider-addendum.md: one NorthFenceGap BoxCollider in Gameplay.unity, exact Option B bounds, preserve all existing colliders and main gameplay/player UI.

## Approved corrective HUD restoration
User confirmed original HUD recovery in hud-recovery-addendum.md. Keep map/health and existing joystick; restore original UIPlayer HUD children from Git. No old mission gameplay logic is restored.
