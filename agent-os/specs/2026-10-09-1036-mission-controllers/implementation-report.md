# Implemented approved mission separation
Approved by user: oke hãy triển khai.
Added Missions/MissionController, MissionManager, CarMissionController, MotorbikeMissionController, PaintballMissionController and Unity metadata.
Changed PlayerAction (removed mission activation/facing ownership), CameraController (SetEntryAngles), MissionRowView (serialized mission), MissionsJournalController (manager selection), Gameplay scene.
Scene: Missions manager root; CarMission/Content holds existing car and arrow; MotorbikeMission/Content holds existing motorcycle and arrow; PaintballMission/Content empty and unavailable. Controller roots stay active, content inactive initially. Shared player/camera/map/HUD retained. Vehicle world positions retained: car(-14,13.5,-88), bike(-9,13.54,-90.7).
Inspector: Look At Target and Look Target use target-facing for both player/camera. Disable to use Player Yaw, Camera Yaw, Camera Pitch. First-person player follows camera yaw by existing movement contract. Entry keeps player position. Car default target-facing; bike uses original scene entry angles. No CarController physics changes.
Checks in Unity 6000.0.60f1 Play Mode:
- Compile and Console: 0 errors.
- Initial car/bike hidden: PASS.
- Actual row GO buttons car/bike/car: correct active mission, exclusive content, positionDelta0, journal closed, player input restored.
- Car facing forward dot1, camera yaw error0.
- Car mount, normal dismount request: PASS.
- Mission switch while riding rejected: PASS.
- Runtime-configured bike playerYaw75/cameraYaw110/pitch23: exact values applied.
- First-person reselect: player/camera yaw110 synchronized.
- Bike mount, normal dismount request: PASS.
- Paintball unavailable before/after another selection: journal and hand remain active, previous mission preserved.
- Null selection rejected.
- Script diff whitespace check passed. Scene contains normal Unity serialized empty-value whitespace; no blanket cleanup.
Stopped Play Mode without saving temporary test angles. No Luna browser/build-size run; no new packages, meshes, textures or shaders.
