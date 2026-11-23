# Pet rescue runner research
Status: RESEARCH READY
Implementation: NOT APPROVED. Handoff for Claude planning.

## User scenario
Tap starts automatic forward movement; horizontal drag steers left/right. No forward or jump button. Pets follow hero; bring at least three pets safely through the gate. Avoid TNT. Hitting TNT causes explosion, a deep pit fall, then automatic jump/recovery and continued movement. At 15 seconds: lose, show endcard and CTA. Requested assets: Dog, Duck, Rabbit and TNT in the minecraft source project (references.md).

## Observed target
- Unity 6000.0.60f1. Only enabled build scene: Assets/_Playable_/Scenes/Gameplay.unity. Current open Editor scene was not checked.
- Legacy input activeInputHandler=0; Built-in pipeline m_CustomRenderPipeline fileID=0.
- Playworks manifest dependency points to file:F:/7.2.0/scripts; availability/build not verified.
- GameController currently handles walking/vehicle tutorials, ride UI and brightness. PlayerController depends on Rigidbody/CapsuleCollider, joystick, keyboard and ride state. CameraController supports first/third person, vehicles and paintball. These are not already a pet runner implementation.
- GameManager.Start starts its own countdown; source default _endTime=30 (scene/Playground overrides unverified). EndGame is guarded, emits Ended, calls GameEnded, then immediately InstallFullGame unless _isApplovin. This differs from the requested timeout -> lose -> endcard -> CTA flow and may conflict with the new timer.
- FailPanel.Show attaches a button calling GameManager.EndGame. EndCardView.Show animates its UI; comment relies on Button Block for install taps. Do not assume these already provide the requested new outcome flow.
- No LunaController or ServiceLocator class found by C# search in Assets. Standards require a Luna facade and typed locator: Claude must explicitly include the required scope or identify the decision needed.
- GameController uses _PlayableBrightnessOverride; Assets/GameAsset/Shaders/BrightUnlit.shader exists. Existing custom shader use differs from the current built-in Unlit allowlist. Do not silently refactor the whole project or introduce another custom shader.
- Pre-existing unrelated change: .idea/.idea.PA_Craft/.idea/claudeCodeTabState.xml. Preserve it.

## Read-only source inspection
All four requested prefabs exist. Dog YAML is 34,968 bytes; TNT YAML is 3,749 bytes. These are source sizes, not build contributions.
Animal prefabs include multiple scripts, Canvas/UI, nested prefabs and Animator controllers. Direct model dependencies include Assets/Game/Models/Animals/dog.fbx, Duck.fbx and Rabbit.fbx in the source project; override controllers are under Assets/Game/Models/AnimatorController/. Audio dependencies are also referenced. Full transitive material/texture/animation dependency mapping and budgets remain unverified.
TNT prefab has a built-in cube mesh, MeshRenderer, BoxCollider and TNT.cs. TNT.Explosion(DamageData) tweens shader glow, then InternalExplosion destroys surrounding voxels, damages health via overlap, spawns an effect and recycles itself. Dependencies: VoxelPlayEnvironment, VoxelDefinition_TNT, DamageData, GameEffect, GameRaycaster, EntityHealth, HAVIGAME, DOTween and custom glow properties. This source behavior does not itself implement the requested hero fall/automatic recovery.
No source logic has been selected or approved for reuse. User specified asset references, not authorization to copy the source subsystem. Claude should identify the minimal visual extraction and target-native behavior. If actual code reuse is proposed, first identify the exact source logic and obtain Gate A confirmation before integration design. License/ownership remains unverified before copying assets. Source project unchanged.

## Creative evidence
Video: C:/Users/Admin/Downloads/Ghi Màn hình 2026-11-13 lúc 10.11.34.mp4. ffprobe: duration 16.322 seconds, 2938x1554, 60fps. Viewed a contact sheet sampled at 0/3/6/9/12/15 seconds, stored outside the project. Portrait gameplay sits inside a desktop recording. Hero appears in a pit at about 3s, on ground at 6-9s, HERO LOST endcard at about 12s. Sampling does not prove collision timing, exact jump animation, pet loss rules or the timer duration; the user's explicit 15s requirement takes precedence.
Attached image 1 shows rear camera, voxel grass corridor, TNT, gate, 0/3 count, timer, Download button and hand tutorial. Image 2 shows HERO LOST / INSTALL NOW. These are visual references, not approval to copy all source UI behavior.

## User-confirmed product decisions
Confirmed by the user in the follow-up answers on 2026-11-20:
1. Pets inside the TNT explosion area are lost. Do not treat pets outside that area as automatically lost. Blast radius and visual feedback remain to be specified in the plan.
2. Rescuing at least three pets safely through the gate before the deadline immediately triggers Win -> endcard -> CTA.
3. The 15-second timer starts on the first tap that starts the hero, not when the scene becomes ready.
These confirm product behavior only; they do not approve an implementation plan or source-code reuse.

## Outstanding product decisions
Also resolve in shape/plan: initial pets versus pickup; total count/spawns; reaching gate with fewer than three; recovery duration and whether timer runs during recovery; continuous drag versus lanes; target scene and build-scene replacement; exact hero/environment assets; CTA policy. Do not inherit the old product's automatic store opening after 3s as approval for this scenario.

## Claude handoff
Use only this spec folder, current product/standards and current source. Do not read older specs. Produce shape.md, plan.md (PENDING APPROVAL) and standards.md. No implementation authorized.
Plan must enumerate exact classes/interfaces/files, scenes/GameObjects/prefabs, asset extraction/import/material/animation operations, dependencies, initialization/event flow, alternatives and verification. No implementation file list has been approved yet.
Load luna-code-architecture and luna-test-and-verify for the implementation plan; route input, tutorial, runtime, material and build-budget skills as needed. Use cross-project-reuse if proposing source logic. No Blender work is currently needed/authorized; Claude may plan it if justified, Codex executes approved changes.
Applicable standards: ai-agent/*; unity/architecture, assets, materials-built-in-unlit; luna/runtime-compatibility, luna-controller, tutorial-and-onboarding, build-budget, scene-budget-4_5mb; testing/luna-verification; git/repository-and-assets.

## Verification requirements to plan (not executed)
- Single tap start; continued forward motion after release; horizontal drag only, boundary clamp; mouse/touch parity, primary pointer ownership, cancel/focus and UI overlap.
- All three pet types follow; safe gate crossing counted once; 2/3/4-pet boundary cases. Verify pets inside the blast area are lost, pets outside survive, and lost pets cannot count toward rescue. Define and verify blast-boundary behavior.
- One explosion per TNT; pit -> automatic jump -> resume without a user jump button; repeated TNT and timeout during recovery cannot deadlock.
- Timer remains idle before first gameplay tap and starts only once on that tap. Rescue >=3 before the 15s deadline triggers Win -> endcard -> CTA; timeout without prior win triggers Lose -> endcard -> CTA. Define simultaneous goal/timeout priority; outcome fires exactly once, gameplay input stops, and store behavior matches approval.
- Tutorial teaches tap/drag without swallowing first input. Camera and supported orientations/resolutions verified.
- Compile/Console, serialized references, Luna API scan, allowed Unlit materials, animation bindings and actual Luna build under 4.5MB. Measure final output, not source bytes.

## Limits
Only research.md, references.md and current.md were written. No gameplay/scene/prefab/settings/package changes, Play Mode, compile, tests or Luna build. No claim of runtime compatibility, triangle counts, licensing or build budget compliance.
