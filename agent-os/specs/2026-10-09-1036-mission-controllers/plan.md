Status: APPROVED
Approved by: user (oke h?y tri?n khai)
# Mission controllers
New scripts under Assets/_Playable_/Scripts/Missions/:
- MissionController.cs: common abstract MonoBehaviour, serialized content root, PlayerController, CameraController, optional look target, player yaw, camera yaw/pitch and look-at-target toggle. Enter/Exit methods own content activation and apply entry orientation while retaining player position. Explicit references only; no runtime global searches. Shared implementation justified by three actual mission variants.
- CarMissionController.cs: car mission type with car target; existing vehicle physics unchanged.
- MotorbikeMissionController.cs: motorcycle mission type with motorcycle target.
- PaintballMissionController.cs: distinct placeholder, unavailable until gameplay exists; does not invent shooting behavior.
- MissionManager.cs: serialized controller list and active mission, initialize content inactive, select available mission, exit previous then enter next; reject riding switches. On shared active root, independent of hidden journal.
Edit PlayerAction.cs: remove mission-specific activation/facing and Awake vehicle visibility ownership; retain vehicle interaction and mount lists. Guide visibility follows mission content.
Edit MissionRowView.cs: serialized MissionController reference replaces hardcoded mission type booleans, retain IDs for existing display metadata.
Edit MissionsJournalController.cs: delegate selection to MissionManager, close journal only on successful selection, preserve input freeze/restore and tutorials. Unavailable row does not stop hand sequence.
Edit CameraController.cs: explicit entry-angle API setting yaw/pitch without changing target or camera mode; use current LookAtPoint for optional target mode.
Scene Gameplay.unity: Missions root with manager; CarMission, MotorbikeMission, PaintballMission roots containing controllers, each with Content child. Car + Car Guide Arrow under car Content; motorcycle + Motorbike Guide Arrow under bike Content; paintball Content empty. Player/camera/map/HUD shared. Preserve world transforms and all references. No prefab/assets copied.
Default car target-facing preserves current behavior; bike angles initialized from current scene camera/player; all can be overridden per mission in Inspector. No player position reset.
Verification: compile/Console; all serialized references; root/content membership and world-pose preservation; car/bike/reselect toggles only corresponding objects; configured yaw/pitch in third/first person; car target-facing; journal freeze/input restoration; vehicle mount/dismount; unavailable paintball behavior and hand sequence. No new gameplay outcomes. Luna build not claimed unless run.
