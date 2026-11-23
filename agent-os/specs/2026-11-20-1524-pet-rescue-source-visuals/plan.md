# Source visual preservation - plan v2.2
Status: APPROVED
Approved by: user
Approved scope: v2.1 visuals/scenery plus explicit follow-up request for three close, loosely moving pets (v2.2).
Planner: Codex per user's ongoing request to plan and implement directly.
Scope: source visual/scenery correction plus the user-requested three-pet close-follow amendment. Timer, TNT loss and goal threshold remain unchanged.

## Intended appearance
Use original model/UV/material bindings and material parameter values for linked Dog/Duck/Rabbit and TNT. No automatic Unlit conversion, arbitrary tints or redesigned TNT. Preserve original source files read-only; target copies remap asset GUIDs without changing visual values. Preserve native pixels/dimensions, point filtering and deliberate source alpha/wrap settings. Keep current hero because no new hero source is identified.
Use the supplied green grass_block_top texture on ground tops, matching grass_block_side/dirt on sides. Use source oak/leaf textures for 12 decorative trees (six pairs at X +/-6.5; Z=2,14,26,38,50,62) and low grassy/soil banks outside the existing road. Add six decorative stone pillars (three pairs at X +/-4.6; Z=8,32,56), each 0.8 x 0.8 units wide and 2.5 units high, with a 1 x 1 top cap. Use native stone_bricks and mossy_stone_bricks textures from the same original resource pack; alternate clean/mossy pillars. Pillars are scenery only: no collider, obstacle, destructible behavior or new gameplay rule. Tree, bank and pillar geometry stays outside the playable road and all TNT footprints; pillars must not obscure the hero, pets, TNT or gate from the gameplay camera. Source oak_planks/stone textures cover existing gate/fence/stone surfaces. Do not copy the reference image's mission UI or joystick.

## Existing classes/files to change (no new runtime class/interface)
1. Assets/_Playable_/PetRescue/Editor/RescueSceneBuilder.cs:
   - Replace forced animal material overrides with source material remapping per renderer slot. Preserve authored relative transforms and mesh proportions; use only a documented outer gameplay-root placement/scale to fit the runner. Do not normalize/recenter individual visual nodes.
   - Copy source materials and required shader/texture dependencies into the target paths listed below, remapping GUIDs. Remove the automatic original-material-to-Unlit rewrite for these four assets.
   - Instantiate the source-equivalent TNT cube/visual material, replacing handmade red/white cubes and stroke labels. Existing RescueTntHazard references remain wired on the target gameplay root. No source TNT.cs or VoxelPlay logic is copied.
   - Build properly UV-mapped grass/log blocks, textured soil, backdrop trees and decorative stone pillars. Change Grass/Dirt/Stone/Wood feature materials to textured versions, assign new side/top/leaf materials explicitly.
   - Separate source copies from any diagnostic/preview material. Preserve source colors, emission/glow defaults and alpha settings; no silent brightness conversion.
2. Assets/_Playable_/PetRescue/Tests/Editor/RescueSceneTests.cs:
   - Retain actor counts, reference/collision/recovery checks. Replace the blanket Unlit-only assertion with exact allowed-source-material/shader mapping for Dog/Duck/Rabbit/TNT; environment remains approved built-in Unlit.
   - Check per-face TNT texture mapping, source pixel hashes, active source properties, no missing active dependencies and scene tile/pet wiring. Check trees and pillars outside road and hazard footprints; verify no pillar collider and native stone textures.
3. Assets/_Playable_/Scenes/PetRescue.unity: update renderer assignments, textured terrain/gate/fence and decorative trees/banks/pillars; keep camera/input/HUD/rules and gameplay coordinates.
4. Assets/_Playable_/PetRescue/Prefabs/{Dog,Duck,Rabbit,TNT}.prefab: update only visual hierarchy/material assignments and retain target gameplay components.
5. Existing Materials/{Dog,Duck,Rabbit}.mat: replace substituted materials with remapped originals. Existing Grass.mat,Dirt.mat,Stone.mat,Wood.mat become textured. Old TntRed/TntWhite/TntInk materials may remain unused; no asset deletion in this correction.
6. Existing model import material remaps under Models/{Dog,Duck,Rabbit}.fbx.meta: map authored slots to original copied materials; retain target IDs and gameplay animation setup. Existing texture copies remain pixel-identical, no new bake/compression edits.
All paths in items 4-6 are under Assets/_Playable_/PetRescue/.

## New exact assets under Assets/_Playable_/PetRescue/
- Materials/TNT.mat (source Game/Materials/TNT.mat).
- Materials/GrassSide.mat, LogSide.mat, LogTop.mat, Leaves.mat, StoneBricks.mat, MossyStoneBricks.mat (new environment materials using source textures, not replacements for animal/TNT originals).
- Textures/Blocks/grass_block_top.png, grass_block_side.png, dirt.png, stone.png, stone_bricks.png, mossy_stone_bricks.png, oak_log.png, oak_log_top.png, oak_leaves.png, oak_planks.png, tnt_side.png, tnt_top.png, tnt_bottom.png (native pixels from the specified vanilla block directory).
- Shaders/Source/CubeSurfaceShader.shader (unchanged source shader; GUID remapped).
- Shaders/Source/VoxelPlay/ with the exact closure listed below; preserve relative include paths and original shader code. No whole VoxelPlay package, C# code or additional shader families.
- Meshes/GrassBlock.asset, LogBlock.asset (simple six-face UV meshes, top/side/bottom material slots). Geometry only; no runtime mesh generation.
- Paired .meta files for all new assets/directories; no global package/input/graphics/build configuration changes.

### Exact VP shader/include files
- VPCommon.cginc
- VPCommonBevel.cginc
- VPCommonCore.cginc
- VPCommonInput.cginc
- VPCommonOptions.cginc
- VPCommonSeeThrough.cginc
- VPCommonSky.cginc
- VPCommonURP.cginc
- VPCommonURPSSAO.cginc
- VPCommonVertexModifier.cginc
- VPModel.cginc
- VPModelShadows.cginc
- VPModelShadowsURP.cginc
- VPModelTexture.shader
- VPVoxelTriangleDepthNormalsURP.cginc
- VPVoxelTriangleDepthOnlyURP.cginc
- VPVoxelTriangleOpaque.shader
- VPVoxelTriangleOpaquePass.cginc
- VPVoxelTriangleShadows.cginc
- VPVoxelTriangleShadowsURP.cginc

## Shader exception and alternatives
Recommended to satisfy "keep original materials": retain source Dog built-in particle unlit shader, Duck/Rabbit VoxelPlay shader and TNT CubeSurfaceShader. This narrowly scoped exception supersedes v1's forced-Unlit substitution for these assets; no new shader is authored and no global pipeline changes. Source shader include paths that reference unavailable packages must be diagnosed before importing additional dependencies. Never install URP or rewrite the shaders silently.
Alternative if the original shader fails in Luna: retain texture pixels/UVs and recreate the appearance with approved built-in Unlit materials (TNT per-face meshes). This changes material/shader identity and therefore REQUIRES a separate user decision; it is not automatically approved by this plan.

## Verification sequence
1. Compile builder/test changes; wait for Unity reload, inspect Console.
2. Compare source/target texture hashes and active material properties, UVs, renderer slots, source visual transforms, shader dependency bindings and source-file checksums (source stays untouched).
3. Build scene, visually compare animals/TNT against source references and terrain against the screenshot. Capture close-ups of TNT sides/top, species and ground/soil/tree/stone-pillar textures, plus runner overview. Check the six pillars and twelve trees do not obstruct the gameplay camera in portrait/landscape. No claim of exact screenshot reproduction from texture reuse alone.
4. Run all rules/scene tests and Play Mode win/lose/TNT recovery checks to verify visual changes do not affect gameplay.
5. Run Luna compilation and shader export checks. If original shaders cannot export/render, stop with exact cause and options; do not substitute them. Measure package bytes again against 4.5MB and disclose final channel HTML/device checks still unavailable.
6. Write implementation-report.md with changed files, before/after captures, source comparisons, shader compatibility and measured size. No new headless-browser attempt unless policy allows the previously blocked action.

## User-requested pet amendment (v2.2)
Exactly three pets: one Dog, one Duck, one Rabbit. Tight irregular cluster behind hero, not two-column rows. Nominal offsets: Dog (-0.55,0,-0.85), Duck (0.50,0,-1.15), Rabbit (-0.05,0,-1.65). Independent small smooth wandering offsets (X <=0.18, Z <=0.12), with deterministic per-pet phase; no per-frame RNG/allocation. Soft separation prevents overlap. Clamp to road, cap drift away from hero and keep pets behind hero; root yaw follows motion with a small bounded variation. Freeze during recovery and after outcome, including wandering. Lost/rescued pets do not move.
Additional exact existing files authorized by this request:
- Scripts/RescuePetFollower.cs: owns follow/wander/separation state; existing Initialize receives registered companions explicitly from flow; Advance uses close offsets, bounded oscillation and heading. No new class, interface, package or source-project behavior.
- Scripts/RescueGameFlow.cs: pass its serialized pet array to follower Initialize; no new outcome policy.
- Editor/RescueSceneBuilder.cs: instantiate one of each species; author irregular close offsets, wire companions through flow; initial HUD shows three pets. Regenerate same three animal prefabs and existing scene.
- Tests/Editor/RescueSceneTests.cs: assert three unique species, close cluster, separation/road bounds/heading variation, recovery/terminal freeze and winnable route with all three. Add a three-pet loss test in existing Tests/Editor/RescueRulesTests.cs: losing one makes the unchanged >=3 goal unattainable and timeout still controls loss (no new immediate-loss behavior).
Acceptance: visually close and naturally staggered in rear camera, not a rigid line; all three can pass the gate before 15s on a safe path. Any pet lost in TNT still counts as lost; do not secretly respawn it or reduce the goal threshold.

## Approval boundary
User approved v2.1 and directly requested the explicit three-pet amendment above; implement this combined scope. Stop for a new decision only if an actual blocker requires changing the approved solution. Existing unrelated tracked/untracked work must be preserved; no commit/delete/publish or source-project mutation.
