# NPC 5 Cutout arm repair
Status: APPROVED
Approved by: user ("oke" in this conversation)
Scope: repair only missing arm texture pixels in Assets/GameAsset/Sprites/SkinCharacter/NPC_5.png; change Assets/GameAsset/Model/Character/Skin/Materials/NPC_5.mat to Cutout using its existing Particles/Standard Unlit shader. Keep texture dimensions/import configuration, mesh, animation, material count and renderer slots unchanged.
Evidence: 64x64 texture uses slim arm opacity while the arm meshes sample wider face UV rectangles. The back/underside UV regions include transparent pixels. Fill only transparent pixels in the sampled arm face rectangles with adjacent black clothing pixels. Leave unused UV space transparent.
No C# classes, interfaces, scene or prefab edits are required. No new shaders/materials/draw calls.
Verification: compare pixel buffers before/after (only approved arm pixels differ, dimensions unchanged); validate Cutout mode/keyword/render queue; preview both arms in idle and run poses in Unity; Console errors. Report Luna build/browser unverified unless run.
