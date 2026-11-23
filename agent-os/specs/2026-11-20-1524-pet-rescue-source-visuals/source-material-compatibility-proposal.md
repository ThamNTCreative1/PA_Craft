# Original animal material compatibility
Status: PENDING APPROVAL - implementation stopped at rendering dependency blocker.

## Evidence and impact
Six pets are imported and bound to their original material definitions. Added Pig uses Voxel Play/Models/Texture/Cutout Double Sided; Sheep/Fox use Voxel Play/Models/Texture/Opaque. Source models/PNG bytes and active material float values match. Full EditMode suite: 18/18, job 85d3891a959f43bcb888d1a5f0bd09af.
Importing the original cutout shader triggers compilation of URP passes in the source shader closure. Console reports missing Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl through VPCommonURP.cginc for model opaque and voxel triangle opaque. The target uses Built-in. Passing asset tests and supported shader fallbacks do not establish error-free rendering.
Original VP model shaders also require global _VPAmbientLight, currently absent/default 0 in this scene. The prior reversible diagnostic at 1 restored color. No permanent adapter was added.

## Proposed exact correction, requires renewed approval
1. Change only target shader copies under Assets/_Playable_/PetRescue/Shaders/Source/VoxelPlay/: VPModelTexture.shader, VPModelTextureCutoutDoubleSided.shader, VPVoxelTriangleOpaque.shader. Remove unavailable UniversalPipeline SubShader sections and their URP UsePass links; retain original Built-in SubShader code, Properties, shader names and asset GUIDs. Do not change original material values, texture pixels, UVs, source files, packages or render pipeline. This is an explicit exception to previous byte-identical shader copying, subject to approval.
2. New Scripts/RescueVisualLighting.cs, sealed MonoBehaviour: one scene-level adapter supplies _VPAmbientLight with serialized default 1. Save previous global on enable, restore on disable; ExecuteAlways supports scene preview. No Update, searches, interface, source gameplay import or additional pattern. Explicit component on existing flow root; builder initializes it. This uses the existing original shader uniform rather than material replacement.
3. Existing Editor/RescueSceneBuilder.cs, Tests/Editor/RescueSceneTests.cs and Assets/_Playable_/Scenes/PetRescue.unity: attach/configure single adapter; verify lifecycle and unchanged material binding. No gameplay/UI/timer changes.

## Verification
Compile shaders and C#; inspect Console for errors after reimport. Check original Built-in pass bodies/properties preserved and original material floats/colors/texture bindings unchanged. Verify ambient enable/disable restoration and scene isolation, preview plus Play Mode screenshots of all six species. Rerun rules/scene suite including follow/recovery/TNT behavior. Keep original minecraft project read-only.
Correct-scene Luna export/size/runtime remains independently pending luna.json approval from lighting-proposal.md; no export or store-destination claim here.
