# Required source shader lighting and Luna scene selection
Status: PENDING APPROVAL
Reason: imported original Duck/Rabbit Voxel Play shader reads global _VPAmbientLight. New runner scene does not contain the VoxelPlayEnvironment that normally supplies it. Actual initial value observed in Unity: 0. Material/shader imports compile and are supported, but these two pets render dark. Editor-only diagnostic SetGlobalFloat(_VPAmbientLight,1) restores visible texture/color without changing any source material. Diagnostic was then reverted to 0.

## Smallest proposed correction
New file: Assets/_Playable_/PetRescue/Scripts/RescueVisualLighting.cs.
Type: sealed MonoBehaviour, namespace Playable.PetRescue. One responsibility: supply the original Voxel Play shader's required scene ambient uniform. No copied source C# logic, package or shader rewrite.
Fields: serialized ambient float in [0,1], default 1 (the verified diagnostic value); private saved previous global value and applied guard.
OnEnable: save current Shader.GetGlobalFloat("_VPAmbientLight"), then Shader.SetGlobalFloat with configured value. OnDisable: restore saved value if this component applied it. No global scene search, Update, reflection, material mutation or SDK call.
Propose ExecuteAlways so the source materials also preview correctly in the Editor; lifecycle must restore the global when disabling/changing scene and avoid leaking the value into mission gameplay.
Existing files additionally changed: Editor/RescueSceneBuilder.cs (attach one component to RescueFlow root); Scenes/PetRescue.unity (one component/configuration); Tests/Editor/RescueSceneTests.cs (single component, enable/disable restoration test and no material changes). All but the new runtime class already appear in the approved scope.

## Verification
Compile and inspect Console; enable/disable and scene switching restore previous global; compare original material/texture properties and source hashes unchanged; screenshot preview and Play Mode with all three visible; rerun rule/scene suite and verify win/TNT/lose; final Luna runtime/export and size checks. Do not claim browser/device checks if unavailable.

## Alternatives and impact
Recommended: this one scene-level rendering adapter, retaining original shaders/materials and leaving source environment/gameplay out.
Keeping the current class list unchanged leaves the original shader uniform unsupplied and the two pets too dark. Do not auto-convert shaders/materials because the user explicitly requested originals.
Full VoxelPlayEnvironment import is not recommended: unrelated gameplay/generation dependencies and size overhead.

Approval required because a new runtime class/component is outside approved v2.2. No lighting component has been implemented; only the reversible Editor diagnostic was performed.

## Required Luna scene selection correction
Observed in luna.json: unity.scenes still equals ["Assets/_Playable_/Scenes/Gameplay.unity"]. Playworks uses this explicit list rather than simply following EditorBuildSettings. Thus previous successful package runs and the approximately 3.82MB ZIP measurement exported the old mission scene, not PetRescue. Compilation of all current C# source succeeded, but PetRescue asset export/runtime/size are NOT proven by those packages.
Additional exact file proposed: luna.json. Set unity.scenes to ["Assets/_Playable_/Scenes/PetRescue.unity"], unity.startupScene to 0. Preserve disabledScenes, SDK versions, campaign IDs, account configuration and all unrelated settings. Do not publish/upload. This is a build configuration change outside v2.2, so it is pending approval, not silently applied.
Verification after approval: run full Playworks export/build, inspect LunaTemp/stage1/assets/scenes/0.json and generated unity config to prove PetRescue selection, inspect shader export diagnostics, record actual PetRescue package bytes, rerun shader/material/close-follow tests and Play Mode paths. If Luna cannot support the original shader, report the exact failure; do not substitute it.
