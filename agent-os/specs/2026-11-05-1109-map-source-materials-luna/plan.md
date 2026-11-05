# Source map material conversion
Status: APPROVED
Approved by: user replied "oke" after exact61-material plan was presented.
Planner: Codex. User explicitly approved Codex planning in place of unavailable Claude CLI. The latest user reply authorizes implementation of this exact plan.

## Result and visual limits
Convert only 61 materials actually used by current CityMap_Park, into independent local materials using existing built-in `Particles/Standard Unlit`. Preserve existing texture bytes/import settings, UV scale/offset, numerically matching source tint, alpha cutoff, transparency and two-sided rendering. This shader exposes all required properties, verified live in Unity. Scope exception requested: use this built-in particle shader on static map meshes (already used by two current map materials); Luna runtime support for every selected variant still needs proof.
This preserves base texture/color detail without additional textures or resolution loss. It does not reproduce URP real-time illumination, shadows, specular, wetness, tree/grass motion or water animation. Source FBX contains no scene lighting; all61existing target textures/ST/tints already match source, so the migration alone cannot be presented as reproducing the source-lit screenshot. A small visual/runtime pilot is a required gate; if its appearance is insufficient, stop and present a separate lighting-bake plan. No arbitrary saturation/brightness correction or claimed pixel match.

## Architecture and exact changes
No new class/interface/pattern/runtime dependency. `GameController.cs` stays unchanged. It only controls BrightUnlit globals; the new map materials are independent of Game Brightness. Other existing BrightUnlit consumers retain current behavior. Do not silently replace the global slider with a different control.
- Create61material assets and metas listed below under `Assets/_Playable_/3D Model/Map/Materials/` (folder meta if absent). Source properties copied as data, no source assets overwritten. Existing target shared materials unchanged.
- Modify `Assets/_Playable_/Scenes/Gameplay.unity`: only material array entries on Base_Map(44),Grass(11),Road(4),Water(2), preserving slot order, mesh, transforms, colliders, spawns and gameplay references.
- Modify importer remaps in `Assets/_Playable_/3D Model/Map/CityMap_Park.fbx.meta` for these same61names after pilot passes, ensuring newly instantiated selected map also uses local materials. Retain all other importer settings and remaps. Do not force re-import broken unrelated external copies.
- No shader,texture,FBX geometry,renderpipeline,colorSpace,package,SDK,SVC change. No persistent conversion script; approved Editor MCP operation only. Build output and evidence under Library/spec evidence.

## Material property conversion
Source `BaseMap`/effective base color to `_MainTex`/`_Color`; verify graph property semantics before copying values, particularly5ShaderGraph materials. Preserve ST and full alpha channel. All4map meshes have no vertex-color attribute; verify no unintended vertex-color multiplication.
-39opaque: Mode0, One/Zero blending,ZWrite1,Geometry queue.
-19cutout: Mode1, sourceCutoff, alpha-test keyword,One/Zero blending,ZWrite1,AlphaTest queue.
-3transparent: Mode2 alpha fade,SrcAlpha/OneMinusSrcAlpha,ZWrite0,Transparent queue. Preserve sorting and source opacity; validate water/glass against reference.
-Cull0 for17double-sided materials, Cull2 for44back-face materials, based on inventory. Do not duplicate mesh faces or lose plant backfaces.
-ColorMode0 multiply, Lighting0,SoftParticles0,CameraFading0,Flipbook0, distortion/depth-dependent effects disabled. Do not enable emission merely because old serialized emissionColor is white: verify active source shader usage first. Copy only active color contribution; unexpected graph color/effect dependencies stop work.
-Use actual installed StandardParticles editor material validation for mode/keyword/pass consistency; no assumed keyword list or modified shader source. Source pipeline is Linear,target Gamma; preserve raw source values initially and use controlled visual proof rather than changing project color space or blindly gamma-converting twice.

## Work order and safety
1.Record user-scene unsaved state. Gameplay is currently dirty. Backup saved scene and in-memory scene to evidence without changing active scene path/dirty state; document user state before saving integration. Never blindly reload/revert. Backup map importer meta and source/texture hashes.
2.Create pilot `grass_block_top_Luna.mat`, `acacia_leaves_Luna.mat`, `water_still_Luna.mat`; temporary preview renderers/materials in isolated PreviewScene. Test correct opaque color,double-sided cutout edges,transparent water. No active scene material change yet.
3.Local Luna export/runtime proof of same three materials using controlled existing local build workflow; no SDK/package/config changes. Need a safe saved-state snapshot or isolated test scene under Library, not replacement of user's unsaved gameplay. If exporter cannot consume isolated preview safely, stop before risking user state and report exact limitation.
4.Compare source texture/tint sample at same view and candidate render side-by-side; full screenshot lighting is an artistic reference, not a numerically identical target. Report visual proof. If source-lit quality is required beyond preserved base color, pause for the separate bake approach before expanding.
5.If pilot preserves intended base-color appearance and works on Luna, create remaining58materials and assign61slots/remaps in approved scope. Save only requested assets; retain source hashes. Record measured material/texture/drawcall/build deltas.

## Verification and completion
-61bindings correct;0missing materials/scripts/references,slotcounts44/11/4/2; no geometry/tri changes.
-Source texture bytes, target texture imports and sourceFBX/material files unchanged; no resolution/compression loss or new texture duplication.
-SceneView + PlayMode 1920x1080/1080x1920: grass/stone/road/water/foliage color,alpha/culling/sorting,no pink or invisible geometry. Preserve current aim/spawns/gameplay.
-Compile/domain reload and Console checks (no C#changes expected), no extra runtime loops/allocations/material clones. Real Luna runtime has no shader unsupported errors and matches chosen preview. Editor-only success is insufficient.
-Actual runnable Luna output<4500000bytes, contributor ledger; unchanged61draw slots and no new textures do not alone prove budget. Stop if unsupported shader variant/exporter/size needs changes beyond list. No deploy/upload/commit/push.

## Exact material asset list
- `Assets/_Playable_/3D Model/Map/Materials/acacia_leaves_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\acacia_leaves.mat`
- `Assets/_Playable_/3D Model/Map/Materials/azalea_leaves_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\azalea_leaves.mat`
- `Assets/_Playable_/3D Model/Map/Materials/iron_chain_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\iron_chain.mat`
- `Assets/_Playable_/3D Model/Map/Materials/pale_oak_planks_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\pale_oak_planks.mat`
- `Assets/_Playable_/3D Model/Map/Materials/beacon_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\beacon.mat`
- `Assets/_Playable_/3D Model/Map/Materials/birch_leaves_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\birch_leaves.mat`
- `Assets/_Playable_/3D Model/Map/Materials/birch_log_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\birch_log.mat`
- `Assets/_Playable_/3D Model/Map/Materials/quartz_block_side_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\quartz_block_side.mat`
- `Assets/_Playable_/3D Model/Map/Materials/quartz_block_top_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\quartz_block_top.mat`
- `Assets/_Playable_/3D Model/Map/Materials/bricks_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\bricks.mat`
- `Assets/_Playable_/3D Model/Map/Materials/campfire_log_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\campfire_log.mat`
- `Assets/_Playable_/3D Model/Map/Materials/cherry_planks_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\cherry_planks.mat`
- `Assets/_Playable_/3D Model/Map/Materials/cobblestone_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\cobblestone.mat`
- `Assets/_Playable_/3D Model/Map/Materials/cracked_stone_bricks_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\cracked_stone_bricks.mat`
- `Assets/_Playable_/3D Model/Map/Materials/dark_oak_planks_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\dark_oak_planks.mat`
- `Assets/_Playable_/3D Model/Map/Materials/diorite_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\diorite.mat`
- `Assets/_Playable_/3D Model/Map/Materials/dirt_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\dirt.mat`
- `Assets/_Playable_/3D Model/Map/Materials/glass_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\glass.mat`
- `Assets/_Playable_/3D Model/Map/Materials/grass_block_top_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\grass_block_top.mat`
- `Assets/_Playable_/3D Model/Map/Materials/iron_bars_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\iron_bars.mat`
- `Assets/_Playable_/3D Model/Map/Materials/mangrove_log_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\mangrove_log.mat`
- `Assets/_Playable_/3D Model/Map/Materials/nether_bricks_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\nether_bricks.mat`
- `Assets/_Playable_/3D Model/Map/Materials/oak_leaves_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\oak_leaves.mat`
- `Assets/_Playable_/3D Model/Map/Materials/oak_log_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\oak_log.mat`
- `Assets/_Playable_/3D Model/Map/Materials/oak_log_top_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\oak_log_top.mat`
- `Assets/_Playable_/3D Model/Map/Materials/obsidian_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\obsidian.mat`
- `Assets/_Playable_/3D Model/Map/Materials/orange_concrete_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\orange_concrete.mat`
- `Assets/_Playable_/3D Model/Map/Materials/pale_oak_trapdoor_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\pale_oak_trapdoor.mat`
- `Assets/_Playable_/3D Model/Map/Materials/prismarine_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\prismarine.mat`
- `Assets/_Playable_/3D Model/Map/Materials/purple_concrete_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\purple_concrete.mat`
- `Assets/_Playable_/3D Model/Map/Materials/sea_lantern_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\sea_lantern.mat`
- `Assets/_Playable_/3D Model/Map/Materials/quartz_block_bottom_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\quartz_block_bottom.mat`
- `Assets/_Playable_/3D Model/Map/Materials/smooth_stone_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\smooth_stone.mat`
- `Assets/_Playable_/3D Model/Map/Materials/spore_blossom_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\spore_blossom.mat`
- `Assets/_Playable_/3D Model/Map/Materials/spore_blossom_base_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\spore_blossom_base.mat`
- `Assets/_Playable_/3D Model/Map/Materials/spruce_leaves_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\spruce_leaves.mat`
- `Assets/_Playable_/3D Model/Map/Materials/spruce_log_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\spruce_log.mat`
- `Assets/_Playable_/3D Model/Map/Materials/stone_bricks_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\stone_bricks.mat`
- `Assets/_Playable_/3D Model/Map/Materials/smooth_stone_slab_side_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\smooth_stone_slab_side.mat`
- `Assets/_Playable_/3D Model/Map/Materials/stripped_acacia_log_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\stripped_acacia_log.mat`
- `Assets/_Playable_/3D Model/Map/Materials/stripped_acacia_log_top_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\stripped_acacia_log_top.mat`
- `Assets/_Playable_/3D Model/Map/Materials/stripped_cherry_log_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\stripped_cherry_log.mat`
- `Assets/_Playable_/3D Model/Map/Materials/warped_planks_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\warped_planks.mat`
- `Assets/_Playable_/3D Model/Map/Materials/white_candle_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\white_candle.mat`
- `Assets/_Playable_/3D Model/Map/Materials/dandelion_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\dandelion.mat`
- `Assets/_Playable_/3D Model/Map/Materials/lilac_bottom_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\lilac_bottom.mat`
- `Assets/_Playable_/3D Model/Map/Materials/lilac_top_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\lilac_top.mat`
- `Assets/_Playable_/3D Model/Map/Materials/peony_bottom_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\peony_bottom.mat`
- `Assets/_Playable_/3D Model/Map/Materials/peony_top_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\peony_top.mat`
- `Assets/_Playable_/3D Model/Map/Materials/poppy_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\poppy.mat`
- `Assets/_Playable_/3D Model/Map/Materials/rose_bush_bottom_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\rose_bush_bottom.mat`
- `Assets/_Playable_/3D Model/Map/Materials/rose_bush_top_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\rose_bush_top.mat`
- `Assets/_Playable_/3D Model/Map/Materials/short_grass_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\short_grass.mat`
- `Assets/_Playable_/3D Model/Map/Materials/tall_grass_bottom_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\tall_grass_bottom.mat`
- `Assets/_Playable_/3D Model/Map/Materials/tall_grass_top_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\tall_grass_top.mat`
- `Assets/_Playable_/3D Model/Map/Materials/blackstone_top_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\blackstone_top.mat`
- `Assets/_Playable_/3D Model/Map/Materials/blackstone_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\blackstone.mat`
- `Assets/_Playable_/3D Model/Map/Materials/white_wool_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\white_wool.mat`
- `Assets/_Playable_/3D Model/Map/Materials/yellow_wool_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\yellow_wool.mat`
- `Assets/_Playable_/3D Model/Map/Materials/water_still_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\water_still.mat`
- `Assets/_Playable_/3D Model/Map/Materials/water_flow_Luna.mat` (+ `.meta`), from `D:\Source\party-craft\Assets\GameAsset\Model\Map\Materials\water_flow.mat`

## Isolated pilot scope addition - APPROVED
User instructed continuation after proposal of Assets/_Playable_/Scenes/MapMaterialPilot.unity(+meta) and Library/MapMaterialPilot/luna-pilot.json. Use process-only LUNA_JSON_PATH override; project luna.json/SDK/packages unchanged. Create scene additively/save pilot only/close pilot, retaining active Gameplay unsaved state. Inspect exporter safety before local build.

## Static water bake + user-selected replacement map - APPROVED
User replied oke, instructed continuation, and explicitly selected Assets/GameAsset/Model/Map/CityMap_Park_OriginalMaterials.fbx. Use its four meshes/imported transforms as new Gameplay map and update only that FBX importer61materialremaps (supersedes oldCityMap_Park importer target). Existing approved61materialoutputs remain. Create only two approved256x256staticwatertextures Textures/{water_still_Luna,water_flow_Luna}.png(+metas), t=0, referenceeyeDepth18m declared before execution; use sourceColor1+WaterTexture/noDepthfoam, preserve source hash, builtinUnlit only; no movingfoam/dynamicdepth/fog. Source URP Linear sampling/color converted to targetGamma display data deliberately and recorded. Opaque/cutout/transparent/sourceculling preserved; water source shader uses fixedCullBack,correct effective sourceCull2 rather than obsolete savedCull0. Road actualDiffuse uses existing Asphalt.png. No shader/CSharp/framework/package change. FinalLunabuild and size validation still required; no unapproved size reduction.
