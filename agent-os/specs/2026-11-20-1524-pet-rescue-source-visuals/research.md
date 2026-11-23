# Preserve source visuals - research
Status: RESEARCH READY
User correction: preserve the original appearances/materials of the linked Dog, Duck, Rabbit and TNT; match the Minecraft texture treatment in the newly attached forest screenshot. Grass/tree textures may come from the provided vanilla block-texture directory.

## Observed current source
Assets/_Playable_/PetRescue/Editor/RescueSceneBuilder.cs overwrites animal render materials with new Unlit/Texture, normalizes visual size/pivot, builds TNT from colored cubes/stroke labels, and uses Unlit/Color grass/soil/wood. Those choices lose material properties and terrain texture detail relative to the latest request.
Dog.mat source shader uses Unity built-in fileID 211 (Particles/Standard Unlit). Duck.mat and Rabbit.mat reference shader GUID 558d42793a1534d9cb4ac60bcd2cce7a = Voxel Play/Models/Texture/Opaque. It has Built-in and URP subshaders and local cginc dependencies plus UsePass references to VPVoxelTriangleOpaque.shader. TNT.mat uses Custom/CubeSurfaceShader, maps tnt_side to the four sides, tnt_top to the top and tnt_bottom to the bottom, _Glow=0. Source shader samples faces by normals; cannot be reproduced by assigning one image to every cube face.
Animal source FBX material bindings point to Dog.mat/Duck.mat/Rabbit.mat; source albedo PNGs identified and available. Preserve material values/active textures, UVs and relative visual hierarchy. Source mats contain old unused serialized properties (including a Matcap texture GUID not resolved in PNG/JPG inventory); these are not read by the active Duck/Rabbit shader. Do not invent a replacement for a dormant missing source reference.
Grass source grass_block_top.png is a green pixel texture (393 bytes) and was visually inspected. Adjacent grass_block_side, dirt, stone, oak_log, oak_log_top, oak_leaves, oak_planks and TNT textures exist. No pixel edits or baked recoloring needed.
New screenshot shows textured grass tops, soil/grass edges, trees and leafy surroundings. It does not independently specify a replacement hero asset or authorize copying mission UI/joystick from the image. Keep current hero/gameplay unless requested separately.
No source project writes or Unity implementation edits in this correction research.

## Constraints and remaining verification
The latest explicit requirement to preserve original materials conflicts with the previous Unlit-only substitution. Revised plan proposes original source shaders as a narrowly scoped visual exception, with no global rendering-pipeline/package change. Actual Luna support and final size must be checked; if incompatible, report the exact shader and wait for a decision instead of silently replacing it.
No external gameplay logic reuse is proposed; only visual assets and their required shaders. No source TNT damage/voxel code, entity system, analytics, UI or audio is imported.
Previous task artifacts were not used as authority for this correction; current implementation source and user messages are the basis. Current feature folder is untracked and contains existing work; preserve it and unrelated modifications.

## User addition: surrounding trees or stone pillars
User explicitly permits source stone textures. Read-only inventory in the same source block directory confirms stone.png (330 bytes), cobblestone.png (316), stone_bricks.png (225), mossy_stone_bricks.png (440), chiseled_stone_bricks.png (333). Plan v2.1 selects native stone_bricks and mossy_stone_bricks for six decorative pillars, in addition to the twelve trees already proposed. No external source logic or additional runtime class is needed.

## Confirmed follow amendment and implementation evidence
User approved v2.1 and requested exactly one Dog, Duck and Rabbit in a close loosely wandering cluster. Existing follower, flow initialization, builder and tests changed accordingly within the explicit request. Original shader imports compile in Built-in without installing URP; actual visual blocker is _VPAmbientLight=0. Temporary Editor diagnostic value 1 restores source colors, then was reverted. New rendering adapter proposal requires approval; no copied source environment logic.

## Latest request: three genuinely new species
User explicitly clarified three new species, not a second Dog/Duck/Rabbit set. Read-only source inventory found Sheep/Pig/Fox prefab+FBX+PNG+material and Idle/Run clips. Proposed exact import/placement scope is three-new-species-proposal.md; awaiting species/scope confirmation. Pig uses the original double-sided cutout VP shader (one additional source shader; includes already available). No new implementation mutation in this request yet.
