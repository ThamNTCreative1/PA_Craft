# Missions Journal research
Status: RESEARCH READY
Gate A source confirmation: CONFIRMED BY USER
No implementation plan or implementation approval.

## Scope
Read-only investigation of D:/Source/PA_Craft and D:/Source/party-craft/Assets. No previous specs read. Only these research documents and agent-os/specs/current.md are written. No code/assets copied, Unity changes, commit/push, checkout or credentials.
User requests the original Missions Journal appearance, exactly three entries in this order: Drive Car Distance, Fire Paintballs, Drive Motor Bike Distance. All display In progress and GO. Selecting a mission activates its object and gameplay UI. A hand visits the GO buttons sequentially at startup. The user subsequently supplied a reference image, visually inspected in this research update; see the reference-image section below.

## Observed source behavior
MissionsPanel.Awake creates a HAVIGAME CollectionView. OnShow displays MissionDatabase entries whose State != None, enables UICharacterCameraController and emits tracking. OnHide disables that camera. This is not a fixed three-entry panel.
MissionItemView.Show calls UpdateUI. UpdateUI renders FullName, CurrentProgress/RequireProgress, Rewards[0], state label, progress fill and toggles GO/In progress for State < Completed; Completed/Claim for State >= Completed. This comparison also includes Failed, not just Running. A separately assigned progressStatusText displays the enum value.
MissionItemUI.prefab has an In progress label, GO, Claim, reward decoration and progress bar. GO component 214056802214350636 has empty persistent onClick calls. Claim invokes ClaimReward. No GO selection method exists in MissionItemView; searching goBtn in source scripts finds only the field and visibility/interactable assignments. GameButton.OnPointerClick invokes base Button and audio, not mission activation.
DriveDistanceMission.asset is MovementMission: name Drive Distance, id drive_distance, requirement 275, reward 120, moveType 1. FirePaintballMission.asset is ActionMission: Fire Paintballs, id fire_paintball, requirement 55, reward 150, missionType 1. Search of FullName in Game/Data found no separate Drive Car Distance / Drive Motor Bike Distance definitions. The requested three-entry selection is target behavior, not an existing source flow.

## Proposed behavior contract for confirmation, not a plan
1. Show the three requested names in order, all In progress with enabled GO.
2. One hand visits car GO, paintballs GO, motorbike GO. It guides only; it does not select automatically.
3. Selecting GO activates the corresponding mission object and gameplay UI. Proposed adaptation: hide the journal, stop/hide the hand, prevent the same pointer action from triggering gameplay behind the panel.
4. Do not import mission progression, completion, claiming, persistence, rewards logic, win/lose, tracking or CTA.
5. GO is the confirmed selection action. Still undecided: hand one pass versus repeating, displayed progress/reward values, exact roots for missions 1 and 2, common versus per-mission gameplay UI, reopening behavior. Do not assume teleport, auto-mount or a new camera mode.

## Extraction table
| Source element | Keep / Adapt / Remove | Reason |
|---|---|---|
| MissionsPanel frame/title/scroll/content/layout | Keep appearance, adapt clean hierarchy | Preserve requested UI without nested ads/navigation/tracking |
| MissionItemUI name/progress/status/GO/reward decoration | Keep visual, adapt binding | uGUI, TMP and referenced sprites/fonts; values still need confirmation |
| MissionItemView.Show/UpdateUI | Adapt minimal rendering | Fixed three entries, all In progress; no full Mission model |
| MissionsPanel.Awake/OnShow | Adapt list display only | No need to import HAVIGAME UIFrame/CollectionView/database |
| GameButton | Replace source dependencies | Target Button/EventSystem; source audio framework unnecessary; scale feedback needs design decision |
| ClaimReward, Mission.Start/AddProgress/Complete/Claim | Remove from reuse | No claim/progression requested |
| MovementMission.OnUpdate, ActionMission.OnUpdate | Remove from reuse | Gameplay tracking is outside this UI request |
| MissionManager/Database/SaveData, SimpleJSON, source event globals | Remove dependencies | Not needed for a fixed journal selector |
| UICharacterCameraController | Remove dependency | Existing target gameplay camera remains the integration candidate |
| FeatureTracking, GameTrackingManager, MrectAd, notification highlight, home navigation | Remove | Unrelated behavior |
| GO to mission/gameplay and three-target hand | New target behavior | Not supplied by inspected source UI |

## Target observations and adaptation constraints
Unity 6000.0.60f1; activeInputHandler 0. EditorBuildSettings enables only Assets/_Playable_/Scenes/Gameplay.unity. This identifies a candidate scene, not the current open Editor scene or confirmed Luna export scene.
Gameplay.unity has GamePanel fileID 2754030885986225168 active, UIPlayer 491263488 active, UI motobike 539229847 inactive, Player 1887026683 active, Mission Button 5719810765228622297 active. GameController fields reference those UI roots. Three independent mission roots have not been established. Existing names do not prove all three gameplay modes are available.
GameController.Awake enables startup/movement tutorials and calls SetRiding(false). Update handles raw touch/mouse; HandleStartTutorialPress can invoke PlayerAction.TryMountFromTutorial. Overlaying a journal alone risks GO also mounting a vehicle behind it. The integration plan must explicitly address this input/lifecycle interaction.
OnDrivingStarted calls SetRiding(true) and starts IEShowMap once; default delay 8 seconds then hides GamePanel and shows minimap. Do not silently remove/reset this existing flow.
PlayerAction.UseMotorbike/TryMountFromTutorial lead to MotorbikeController.TryMount. CarEntered is an event name, not proof of a separate car mission.
User-linked CameraController exposes SetTarget, FollowVehicle(MotorbikeController), FollowPlayer, SetFollowTarget/ClearFollowTarget, SetTouchController and SnapToTarget. It is the existing gameplay camera. Activating an object alone does not ensure correct camera/input ownership. No confirmed need to edit CameraController or auto-mount/teleport yet.
SwipeHandHint.OnEnable/Update/OnDisable oscillates horizontally around one origin with unscaledDeltaTime. It does not sequence three GO targets; only lifecycle behavior is a useful local reference.
GameManager.Start starts CountdownEndGame immediately. EndGame directly calls Luna GameEnded/InstallFullGame. Search of Assets did not find a LunaController/ServiceLocator class. This is a standards gap, not authorization to refactor CTA or add a controller. Time spent in journal may consume the existing end timer; changing that requires a decision.

## Dependencies and risks
Keep only approved visual dependencies: RectTransform/layout, uGUI Image/ScrollRect/Button, TMP, corresponding sprites/fonts/materials. references.md contains resolved direct asset paths/GUIDs, not a full recursive import manifest. Asset ownership/license and recursive font/material dependencies must be checked before copying. No copying occurred.
Legacy input/EventSystem, explicit serialized references, no runtime Find APIs. Hand must not block GO raycasts and must stop cleanly when selected/disabled. Avoid duplicate subscriptions and pointer fall-through. Built-in/Unlit and no new custom shader; source TMP materials/atlas still need Luna validation. Build budget must be measured below 4.5 MB, target 3.8 MB; source file sizes cannot establish compliance.
Source UpdateUI assumes Rewards[0] and nonzero RequireProgress. Do not carry these assumptions into fixed data silently.
No Editor play, rendered screenshot, Console validation, compilation, Luna build or device testing performed. Research is static source/YAML inspection.

## Open decisions before planning
Exact target roots/UI for missions 1 and 2; hand looping/timing; progress and reward display including motorbike values; journal hide/reopen; activation/deactivation of other mission roots; journal integration around the unchanged motorbike tutorial, minimap and timer interactions. Source provides no separate motorbike requirement/reward to adopt automatically.

## Handoff and evidence
Stop at Gate A for user confirmation of the source UI slice and the new requested target behavior. Claude plans only after that confirmation, with exact classes/interfaces/files/scenes/prefabs and verification. Architecture and verification skills are mandatory then. Source confirmation is not implementation approval.
Read source/prefab YAML, resolved direct GUIDs through metadata, inspected target camera/tutorial/UI, build/input settings and Git status. Existing changes include Packages/manifest.json, Packages/packages-lock.json, luna.json, deletion of .idea indexLayout and untracked instruction/spec directories. None altered by this research. No previous spec read or inherited.


## User clarification and image inspection (same research work item)
The user supplied C:/Users/Admin/AppData/Local/Temp/ai-chat-attachment-17491682296737800804.png. Inspected using view_image without modifying or copying the image. This is evidence for this work item, not a new spec or an inherited old spec.
Observed visual: rounded blue outer panel with darker lower border, yellow/orange title tab reading Missions Journal, red X at upper right, cyan mission rows, white outlined mission names/progress counters, orange In progress labels, blue GO buttons at right, gold coin/reward decoration. The image also shows Claim/Claimed/Completed rows and a REWARD CLAIMED overlay; these are visual reference context, not requested states or flows. The requested panel still has exactly the three named missions, all In progress with GO. Do not reproduce unrelated rows or the reward-claimed overlay. Background world is context, not authorization to import the source environment. Final three-row dimensions and red-X behavior remain design decisions; image alone does not authorize a close/reopen flow.
Confirmed user constraints:
- No real ads or tracking. Decorative/mock elements must not invoke ad SDKs, analytics or reward transactions. Keep only required journal visuals.
- GO selects the corresponding playable activity, not just an inert preview.
- Mission 3, Drive Motor Bike Distance, enters the existing target motorbike gameplay.
- Preserve the motorbike tutorial and gameplay behavior exactly. Do not edit Assets/_Playable_/Scripts/Controller/CameraController.cs.
- Interpret entering existing gameplay as handing over to its current tutorial/start flow; the user has not separately requested bypassing that tutorial, teleporting or automatic mounting. Do not add these actions by assumption.
- Missions 1 and 2 must eventually enter their respective gameplay, but their existing target roots/availability have not been established. Do not map them to motorbike, implement placeholder GO actions or import unrelated source gameplay without a decision.
Integration implication: journal hand and visibility/input boundary must be outside the preserved motorbike tutorial/camera behavior. If later investigation shows this cannot work without changing that behavior, report cause/impact/options and stop; do not silently modify it.
Source-understanding clarification is recorded. The user subsequently confirmed the revised research/source contract. Gate A is complete; no implementation permission was given.

## Gate A confirmation
The user confirmed the research/source understanding in the latest reply. Ready for Claude planning. This does not approve an implementation plan or resolve mission 1/2 target mapping: no specific roots or deferral option were selected. Preserve the motorbike tutorial and do not edit CameraController.cs. No implementation performed.
