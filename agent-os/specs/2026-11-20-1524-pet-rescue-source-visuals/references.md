# Source references
- D:/Source/minecraft/Assets/Game/Voxel Play/Resources/Prefabs/Animals/{Dog,Duck,Rabbit}.prefab - authoritative animal visual/transform references.
- D:/Source/minecraft/Assets/Game/Voxel Play/Resources/Prefabs/TNT.prefab - cube mesh/material reference; no gameplay-script reuse.
- D:/Source/minecraft/Assets/Game/Models/Animals/{dog,Duck,Rabbit}.fbx - visual hierarchies, UVs and skinning.
- D:/Source/minecraft/Assets/Game/Models/Animals/{Dog,Duck,Rabbit}.mat and {Dog,Duck,Rabbit}.png - source properties and texture pixels.
- D:/Source/minecraft/Assets/Game/Materials/TNT.mat and Assets/Game/Shaders/CubeSurfaceShader.shader - six-face texture mapping; _Glow=0.
- D:/Source/minecraft/Assets/Voxel Play/Resources/VoxelPlay/Shaders/ - VPModelTexture.shader and dependency inventory below.
- D:/Source/minecraft/Assets/ResourceCache/Resource Packs/vanilla-1.21.4/assets/minecraft/textures/block/ - user-specified grass_block_top.png and adjacent block textures.
- C:/Users/Admin/.codemoss/codex-images/codex-img-1795162866116-c67a2c76.png - new appearance reference, viewed.
- Assets/_Playable_/PetRescue/Editor/RescueSceneBuilder.cs - current construction/material overrides.
- .agents/skills/luna-production-governance/SKILL.md; luna-material-authoring/SKILL.md; agent-os/standards/unity/materials-built-in-unlit.md - approval and shader policy. Latest requested material preservation must be explicit in revised scope.

## Exact local VP shader/include closure
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

Other include paths (Unity built-ins/packages; not copied):
- AutoLight.cginc
- Lighting.cginc
- Packages/com.unity.render-pipelines.universal/ShaderLibrary/DeclareDepthTexture.hlsl
- Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl
- UnityCG.cginc

## Added stone texture sources (read-only verified)
- D:/Source/minecraft/Assets/ResourceCache/Resource Packs/vanilla-1.21.4/assets/minecraft/textures/block/stone_bricks.png (225 bytes).
- D:/Source/minecraft/Assets/ResourceCache/Resource Packs/vanilla-1.21.4/assets/minecraft/textures/block/mossy_stone_bricks.png (440 bytes).
Both copied pixel-identically only after approval of plan v2.1. No new stone shader is proposed.
