# References
## Target
- ProjectSettings/ProjectVersion.txt ? Unity version.
- ProjectSettings/EditorBuildSettings.asset ? enabled build scene.
- ProjectSettings/ProjectSettings.asset ? activeInputHandler.
- ProjectSettings/GraphicsSettings.asset ? Built-in pipeline setting.
- Packages/manifest.json ? Playworks local dependency.
- Assets/_Playable_/Scenes/Gameplay.unity ? scene metadata: GameManager, Camera, Canvas, EndCard.
- Assets/_Playable_/Scripts/GameController.cs ? Awake/Update/HandleStartTutorialPress; mission/ride tutorial, brightness.
- Assets/_Playable_/Scripts/Controller/PlayerController.cs ? ReadMoveInput, ReadDriveInput, Update and component/dependency inventory; not a pet runner.
- Assets/_Playable_/Scripts/Controller/CameraController.cs ? serialized references and camera modes.
- Assets/_Playable_/Scripts/Manager/GameManager.cs ? Start, CountdownEndGame, IECountdownEndGame, EndGame, ShowCta.
- Assets/_Playable_/Scripts/UI/FailPanel.cs ? Show, button interaction.
- Assets/_Playable_/Scripts/UI/EndCardView.cs ? Show, tween cleanup.
- Assets/GameAsset/Shaders/BrightUnlit.shader ? existing custom shader risk, no modification authorized.
## Source assets (read-only)
- D:/Source/minecraft/Assets/Game/Voxel Play/Resources/Prefabs/Animals/Dog.prefab
- D:/Source/minecraft/Assets/Game/Voxel Play/Resources/Prefabs/Animals/Duck.prefab
- D:/Source/minecraft/Assets/Game/Voxel Play/Resources/Prefabs/Animals/Rabbit.prefab
- D:/Source/minecraft/Assets/Game/Voxel Play/Resources/Prefabs/TNT.prefab
- D:/Source/minecraft/Assets/Game/Scripts/VoxelPlay/Objects/TNT.cs ? Explosion/InternalExplosion; dependency explanation only, not selected for reuse.
- Script GUID mapping identified VoxelPlayVoxelLightReceiver.cs, Utilities/AnimationEventListener.cs and AnimationEventListener2.cs; methods not audited, no reuse claim.
## Creative
- C:/Users/Admin/Downloads/Ghi Ma?n hi?nh 2026-11-13 lu?c 10.11.34.mp4 ? metadata + sampled contact sheet.
- User attached images #1 and #2 ? gameplay/tutorial and HERO LOST endcard.
## Authority
- AGENTS.md (user instructions), agent-os/workflows/codex-claude-codex.md.
- agent-os/product/{mission,roadmap,tech-stack}.md; agent-os/standards/index.yml and applicable standards listed in research.md.
- .agents/skills/luna-production-governance/SKILL.md and references/verification.md.
- .agents/skills/analyze-luna-project/SKILL.md; luna-input-handling, luna-cross-project-reuse, luna-git-workflow.

Direct model dependencies: D:/Source/minecraft/Assets/Game/Models/Animals/dog.fbx, Duck.fbx, Rabbit.fbx; animal override controllers in Assets/Game/Models/AnimatorController/. Transitive dependencies not fully audited.
