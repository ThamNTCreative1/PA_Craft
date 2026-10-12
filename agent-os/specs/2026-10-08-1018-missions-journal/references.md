# References
Source paths relative to D:/Source/party-craft/Assets. Target paths relative to D:/Source/PA_Craft.

## Source code
- Game/Scripts/UI/MissionsPanel/MissionsPanel.cs: MissionsPanel.Awake, OnShow(bool), OnHide(bool): list display, database, camera and tracking dependencies.
- Game/Scripts/UI/MissionsPanel/MissionItemView.cs: MissionItemView.Show, UpdateUI, ClaimReward: UI rendering versus excluded reward effects.
- Game/Scripts/Utilities/GameButton.cs: GameButton.OnPointerClick/OnPointerDown/OnPointerUp/DoScale: Button, DOTween and HAVIGAME audio dependencies.
- Game/Scripts/Systems/Mission/Mission.cs: FullName/State/CurrentProgress/RequireProgress/Rewards; Start/AddProgress/Complete/Claim; MissionStates. Inspected to understand UI, not to port.
- Game/Scripts/Systems/Mission/MovementMission.cs: MovementMission.OnUpdate(OnMovementDistance); ActionMission.cs: ActionMission.OnUpdate(OnMissionEvent). Excluded tracking logic.
- Game/Scripts/UI/MissionsPanel/MissionButton.cs: Start/OnEnable/OnMissionCompleted/OnNewMissionAdded/OnDestroy: notification highlight, not mission selection.
- HAVIGAME/Runtime/Core/Modules/UI/View/View.cs: CollectionView<TView,TModel>; HAVIGAME/Runtime/Core/Modules/UI/UI/UIFrame.cs: UIFrame. Framework dependencies identified, not required for target reuse.
- Game/Data/Missions/DriveDistanceMission.asset and FirePaintballMission.asset: observed source definitions.

## Prefab evidence
- Game/Resources/UI/MissionsPanel.prefab: title line 504; item/container lines 710-711; item GUID 04b49bfa7eb021c4780b71383093e551.
- Game/Prefabs/UI/Mission/MissionItemUI.prefab: In progress line 220; GO object line 929, empty onClick within component near line 999; view bindings 1144-1153; GO label 1219; ClaimReward callback 1415. GO component fileID 214056802214350636; view fileID 4637846730277352893.

## Resolved direct visual dependencies
| Path ngu?n | GUID | Direct visual dependency |
|---|---| Direct visual dependency |
| GameAsset/Sprites/UI/popup_frame.png | 02643dd07e74833469cd67305584cdf9 | Direct visual dependency |
| GameAsset/Sprites/UI/mission_fr.png | 3b20d3c780181c64e8cd65a1018e517b | Direct visual dependency |
| GameAsset/Sprites/UI/tag_title.png | dd8cd65d2ab2bb347bc66b2093ee1c6f | Direct visual dependency |
| GameAsset/Sprites/UI/Btn_Blue.png | 6414d63259ac6964a89d23d5b847dacb | Direct visual dependency |
| GameAsset/Sprites/UI/btn_buy_2.png | f63b6ce006c68de4b97dafc497e41423 | Direct visual dependency |
| GameAsset/Sprites/UI/Icon_ImageIcon_Glod01_l 1.png | 396dcb965a0c9f5468fde405c5066c24 | Direct visual dependency |
| GameAsset/Sprites/UI/SlideBack.png | 8b3602d820d2808438852864f5476b5f | Direct visual dependency |
| GameAsset/Sprites/UI/SlideFill 1.png | 90384d78025418b45bedb500eed125ca | Direct visual dependency |
| Game/Textures/Common/square.psd | 3fdd1a701897bfc47b27a5ecb33c9f23 | Direct visual dependency |
| Game/Fonts/FredokaOne-Regular SDF.asset | 80a57da7f321fa040a2c410b9eb936a0 | Direct visual dependency |
| Game/Fonts/FredokaOne-Green.asset | d855615352f0f714ca1b27c5e57acd92 | Direct visual dependency |
| Game/Fonts/FredokaOne-Orange.asset | 7505b084a25ef6344bbbfb3b3e688547 | Direct visual dependency |
| Game/Fonts/FredokaOne-Regular Orange Material.mat | baa3948ebca716646a2e8d8fd0bc0178 | Direct visual dependency |

These are direct references, not a complete recursive import manifest. Font atlas/material closure and existing target asset equivalence remain to be checked before an approved import.

## Other resolved prefab dependencies
- Game/Scripts/Systems/Tracking/FeatureTracking.cs: cd5c6a50a6874b87ac79de4389db7211; exclude tracking.
- Game/Scripts/Extensions/UI/UIAnimation/UIDOTweenTransition.cs: 46746917279ba0b46ba9755ed209e239; transition coupling, do not import automatically.
- Plugins/Demigiant/DOTweenPro/DOTweenAnimation.cs: 4d0390bd8b8ffd640b34fe25065ff1df.
- Game/Prefabs/UI/MrectAd.prefab: 38fc347606b79b046b5ecb7b758175e3; exclude ads.
- Game/Prefabs/UI/Elements/btnBackToHome.prefab: 3c2962d7a592a4d41bfe4a30883afefb; exclude home navigation behavior.
These dependencies were resolved from YAML GUIDs; their full transitive implementations were not audited.

## Target references
- Assets/_Playable_/Scripts/Controller/CameraController.cs: SetTarget 89, FollowVehicle 108, FollowPlayer 121/129, SetTouchController 137, SnapToTarget 170; user-linked camera.
- Assets/_Playable_/Scripts/GameController.cs: Awake/Start/Update, HandleStartTutorialPress, DismissStartTutorial, OnDrivingStarted, IEShowMap, SetRiding.
- Assets/_Playable_/Scripts/Controller/PlayerAction.cs: UseMotorbike, TryMountFromTutorial, CarEntered. MotorbikeController.cs: TryMount/RequestDismount/TryDismount.
- Assets/_Playable_/Scripts/UI/SwipeHandHint.cs: OnEnable/Update/OnDisable; single-origin oscillation.
- Assets/_Playable_/Scripts/Manager/GameManager.cs: Start/CountdownEndGame/IECountdownEndGame/EndGame; existing timer and direct Luna calls.
- Assets/_Playable_/Scenes/Gameplay.unity: UI fields 3775-3780; GamePanel 11606; Mission Button 13047. Exact IDs recorded in research.
- ProjectSettings/EditorBuildSettings.asset, ProjectSettings/ProjectVersion.txt, ProjectSettings/ProjectSettings.asset (activeInputHandler 0).

## Instructions and standards
AGENTS.md; agent-os/workflows/codex-claude-codex.md; agent-os/product/mission.md, roadmap.md, tech-stack.md; agent-os/standards/index.yml; ai-agent approval-gates-and-change-control, cross-project-logic-reuse, roles-and-handoff, safety-scope-and-verification; luna runtime-compatibility, luna-controller, tutorial-and-onboarding, build-budget, scene-budget-4_5mb; unity/architecture.
Skills: .agents/skills/analyze-luna-project/SKILL.md, .agents/skills/luna-production-governance/SKILL.md, .agents/skills/luna-cross-project-reuse/SKILL.md, .agents/skills/luna-tutorial-onboarding/SKILL.md.
No old specs, Git URL, checkout or credentials used.


## User-provided visual reference and constraints
- C:/Users/Admin/AppData/Local/Temp/ai-chat-attachment-17491682296737800804.png: visually inspected; blue journal frame/rows, yellow title tab, red X, orange In progress status, blue GO, coin decoration. Extra missions, Claim states and REWARD CLAIMED overlay are excluded from the requested three-entry UI. Temporary path may not persist; image was not copied.
- User clarification: exclude all actual ads/tracking, GO enters matching gameplay, mission 3 uses existing motorbike gameplay and unchanged tutorial. CameraController.cs is explicitly protected from edits. No code or Unity assets changed.
