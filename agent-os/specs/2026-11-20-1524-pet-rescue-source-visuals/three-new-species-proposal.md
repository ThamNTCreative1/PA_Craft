# Three additional species - v2.3 proposal
Status: APPROVED
Approved by: user
Approved scope: explicit Pig.prefab, Sheep.prefab and Fox.prefab paths with instruction to add all three and retain original game materials.
User confirmed: three NEW species, not duplicate Dog/Duck/Rabbit. Existing three remain. Recommended available source species: Sheep (cuu), Pig (heo), Fox (cao).

## Exact visual sources (read-only inspected)
Source prefab root: D:/Source/minecraft/Assets/Game/Voxel Play/Resources/Prefabs/Animals/.
- Sheep.prefab; visual dependencies D:/Source/minecraft/Assets/Game/Models/Animals/Sheep.fbx, Sheep.mat, Sheep.png. Idle and Run takes exist. Original shader: Voxel Play/Models/Texture/Opaque.
- Pig.prefab; visual dependencies in the same model directory: Pig.fbx, Pig.mat, Pig.png. Idle and Run takes exist. Original shader: Voxel Play/Models/Texture/Cutout Double Sided, GUID a040ea38086c74d1085b6c18587da7c9.
- Fox.prefab; Fox.fbx, Fox.mat, Fox.png in the same model directory. Idle and Run takes exist. Original shader: Voxel Play/Models/Texture/Opaque.
No source entity/gameplay/damage/health/navigation/UI/audio script is selected for reuse.

## Exact target files/assets
Under Assets/_Playable_/PetRescue/:
- New Models/Sheep.fbx, Pig.fbx, Fox.fbx; Textures/Sheep.png, Pig.png, Fox.png; Materials/Sheep.mat, Pig.mat, Fox.mat; Animation/Sheep.controller, Pig.controller, Fox.controller; Prefabs/Sheep.prefab, Pig.prefab, Fox.prefab. Paired new .meta files, source pixels/material values/UVs unchanged with target GUID remaps.
- New Shaders/Source/VoxelPlay/VPModelTextureCutoutDoubleSided.shader: unchanged source file D:/Source/minecraft/Assets/Voxel Play/Resources/VoxelPlay/Shaders/VPModelTextureCutoutDoubleSided.shader. Its local include and UsePass dependencies are already in the approved imported closure. Preserve original Cull Off/alpha behavior; no shader substitution.
- Modify existing Editor/RescueSceneBuilder.cs: instantiate six different species; source material/animation remaps for three added species; retain compact HUD n/3 (do not add an alive-count suffix); keep original three prefab IDs.
- Modify existing Scripts/RescuePetFollower.cs: allow the additional trailing offsets without clamping them all to the previous 2.1-unit depth. Keep per-pet oscillation, soft separation, bounded heading and recovery/outcome freeze; no new class/interface.
- Modify existing Tests/Editor/RescueSceneTests.cs: six unique species, three rear followers, bounded cluster/road limits, no rows, source pixel/material/shader mapping, freeze/separation and reference integrity. Existing pure rules remain unchanged; retain reusable three-pet edge-case tests.
- Update Assets/_Playable_/Scenes/PetRescue.unity with the added three follower instances and serialized flow list. No camera, source hero, scenery or extra hazard changes.

## Placement and behavior
Keep front group offsets Dog(-.55,0,-.85), Duck(.50,0,-1.15), Rabbit(-.05,0,-1.65).
Propose rear group Sheep(-.8,0,-2.1), Pig(.75,0,-2.3), Fox(.05,0,-2.85), each with existing independent phase offsets. This creates staggered clusters, not straight rows or a rigid single-file line. New followers use registered companions explicitly, no scene search or navigation package.
Goal remains rescue >=3 before the 15-second deadline. TNT can remove any of the six inside its blast area. No new loss/retry/respawn rule.

## Verification
Compile/Console; inspect six species and original materials, native texture hashes and local source shader closure; close-follow/road/separation/freeze tests, six-pet safe route and TNT pet loss, screenshot front/rear cluster. Run actual PetRescue Luna export and size checks only after the existing pending scene-configuration correction is approved. Source FBX/texture sizes are not final package sizes.

## Pending related work, not implicitly approved
lighting-proposal.md remains pending: original Voxel Play shaders require ambient support; Luna configuration still selects the old mission scene. Do not treat this species request as approval of either rendering component or Luna configuration change.
Implementing now after explicit source-species confirmation. Original material parameter/texture preservation remains mandatory.

Current timing/UI v3.3/v3.4 supersedes earlier wording: visible gameplay 15s after first press; hidden global EndGame 30s from scene start; n/3 only; stationary swipe arrows. No timing/UI edits in this species import. Original-material ambient component and Luna scene selection remain independently pending.
