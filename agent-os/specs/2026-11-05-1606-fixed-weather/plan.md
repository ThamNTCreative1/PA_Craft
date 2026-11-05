# Fixed weather adaptation v1

Status: APPROVED
Approved by: user (oke, 2026-11-05)
Approved scope: Fixed weather adaptation v1, exact two scripts and Gameplay scene below.
Planner: Claude CLI; recorded by Codex from returned planning output.

## Exact implementation scope

1. Assets/_Playable_/Scripts/GameController.cs — preserve existing brightness code. Add serialized Luna int _weather default0 Range0..3, label Weather (0 Day, 1 Sunny, 2 Rain, 3 Night), and serialized WeatherPresetController _weatherController. Start samples weather exactly once, warns/falls back Day for invalid value, logs error if controller missing, calls Initialize(WeatherPreset). No weather change in Update.
2. Assets/_Playable_/Scripts/Weather/WeatherPresetController.cs — Unity visual adapter, owns captured preset and exactly one cloned sky material. Remove local Luna _weather and overlay/color-only fields. Preset struct becomes Material Skybox, Color Tint, float Exposure. Keep explicit camera, rain particles/audio and four presets. Public Initialize(WeatherPreset) validates references, preset count/material properties (_Tint/_Exposure), saves original RenderSettings.skybox and camera clear flags, clones selected material once, applies tint/exposure and CameraClearFlags.Skybox. Subsequent Initialize calls warn and do nothing. Rain loops only for captured Rain mode; explicitly configure/verify particle and audio loop so this does not depend on assumptions about scene defaults. OnDisable stops precipitation/audio; OnEnable resumes captured Rain only when initialized. OnDestroy restores owned environment state and destroys clone; failed initialization cannot leave partial changes. No per-frame weather mutation, timer or framework imports.
3. Assets/_Playable_/Scenes/Gameplay.unity — wire explicit controller dependency, move existing selected weather value to GameController, serialize four presets below, disable only World Tint GameObject (do not delete), preserve other UI/modal backgrounds and existing rain/audio wiring. Verify other references before disabling this object.

Unchanged: WeatherPreset enum, CameraController.cs, HeroSelectionPanel.cs, HUD, joystick, tutorials, combat, monster prefab, brightness code, source project and all existing material assets. No new scripts/interfaces/prefabs/packages/shaders/textures.

## Presets

Materials under Assets/Polygrade/Toon Skyboxes/Materials/.

| Mode | Material | Tint RGBA | Exposure |
| --- | --- | --- | --- |
| Day0 | Day01.mat | .5,.5,.5,.5 | 1 |
| Sunny1 | Day01.mat | .55,.53,.47,.5 | 1.25 |
| Rain2 | Day01.mat | .40,.43,.47,.5 | .7 |
| Night3 | Night01.mat | .5,.5,.5,.5 | 1 |

Tint/exposure values are proposed defaults requiring visual verification. Night changes sky only; map retains current brightness. No source procedural cloud/stars/wetness parity promised. Built-in Skybox/Cubemap already exists in scene but is outside strict Unlit allowlist; approval includes its limited use for these skyboxes, no custom shader exception.

Flow: GameController.Start -> WeatherPresetController.Initialize -> owned sky material + camera + rain ParticleSystem/audio. Explicit serialized composition; no service/interface/event/pattern added for one stable adapter.

## Verification and order

- Snapshot scoped files/current scene, preserving unrelated dirty edits. Inspect rain/audio loop defaults and World Tint references before mutations.
- Modify scripts, wait for Unity compile/domain reload, inspect Console before scene binding changes.
- Apply scoped scene references; verify four serialized presets/material property support and no missing references.
- Play each mode, check skybox/tint/exposure and rain/audio emission; exercise hero choice/tutorial/combat/outcome and sustained elapsed time without preset changes. Verify repeated Initialize cannot change mode, and modifying configuration mid-run cannot auto-change it.
- Check invalid mode fallback, missing-reference clear failure, disable/re-enable and scene re-entry cleanup without modifying shared material assets.
- Check gameplay/player UI remains visible, only World Tint removed; CameraController/HeroSelectionPanel unchanged.
- Static Luna API/package/shader audit on changed scope. Built-in skybox exception explicitly approved as above.
- Measure Luna build if available, target under4.5MB; any required texture reduction or changed material strategy needs renewed approval. Night cubemap adds dependency; do not promise budget before measurement. Label unavailable runtime/device/build checks unverified.

Rollback boundary: scoped script/scene edits only; restore original skybox/flags on runtime teardown; no source or shared material edits. Unexpected dependencies/compile failures beyond scope: report cause/impact/options and stop.
