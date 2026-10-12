# References
- Assets/_Playable_/Scripts/GameController.cs: SetDrivingCar, RideUIState.Tick — UI transition; no car terrain response.
- Assets/_Playable_/Scripts/Controller/CarController.cs: Awake (54–86), GroundAt (116–128), FixedUpdate (129–185), TryStep (187–239), LateUpdate (241–247).
- Assets/_Playable_/Scenes/Gameplay.unity: Playable Car 8 (7927 onward), configuration (7975–7993), body collider (7994–8017).
- Assets/_Playable_/Scripts/Editor/DrivingPlayModeChecks.cs: motorcycle 20cm curb case (261–273).
- ProjectSettings/EditorBuildSettings.asset: Gameplay is enabled build scene.
- ProjectSettings/TimeManager.asset: fixed timestep 0.02.
- Live Unity read-only evidence: instance PA_Craft@4181e929, active Gameplay, Application.isPlaying=false; measured collider bounds and hypothetical Physics queries recorded in research.md.
- Standards: ai-agent/safety-scope-and-verification, luna/runtime-compatibility, testing/luna-verification.
