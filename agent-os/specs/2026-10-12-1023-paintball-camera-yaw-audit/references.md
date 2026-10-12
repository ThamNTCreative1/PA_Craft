# References
- Assets/_Playable_/Scripts/GameController.cs: entry file; no paintball rotation logic.
- Assets/_Playable_/Scripts/Paintball/PlayerPaintballController.cs: Equip, Update, LateUpdate, TryFire, FireProjectile, GetAimRay.
- Assets/_Playable_/Scripts/Controller/CameraController.cs: DefaultExecutionOrder, LateUpdate, UpdateCamera, Yaw.
- Assets/_Playable_/Scripts/Controller/PlayerController.cs: FixedUpdate, SetCameraYaw, StopFollowingCameraYaw, ConfigureWalkingPhysics.
- Assets/_Playable_/Scripts/Paintball/PaintballFireButton.cs: pointer hold and drag camera input.
- Assets/_Playable_/Scripts/Missions/PaintballMissionController.cs: equip/pause/exit lifecycle.
- Assets/_Playable_/Scenes/Gameplay.unity: player and camera references, third-person mode.
- LunaTemp/stage1/assets/project-settings/-1.json and stage2 equivalent: exported execution priorities at data[0].
- LunaTemp/stage4/develop/engine/luna/script1.js: component order resolution and callback sorting.
- LunaTemp/stage4/develop/engine/unity/bin/UnityScriptsCompiler.js: generated state writers and consumer.
- https://docs.unity.com/en-us/engine/6000.0/script-reference/unityengine/defaultexecutionorder : Unity attribute semantics.
No previous spec artifacts or cross-project source were used.
