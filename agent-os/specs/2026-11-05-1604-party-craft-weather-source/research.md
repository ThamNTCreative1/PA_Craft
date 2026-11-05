# Party-craft weather source research

Status: RESEARCH COMPLETE; no implementation or reuse approved.

Request: inspect sunshine, rain and day/night logic in D:/Source/party-craft. Source and target gameplay assets/scripts remain unchanged.

## Verified behavior

- WeatherController uses one referenced Sky.mat. It interpolates _Color, _Color2, _Color3, _CloudAlpha and _State; it does not swap separate day/night materials. _State targets 0 for morning/afternoon and 1 for night. It also writes _MainLightDirection.
- currentTime advances by timeOfDaySpeed * deltaTime. Prefab defaults: start 08:00, speed 0.02 hours/second, transition 3 seconds. Full cycle is approximately 20 real minutes. These are prefab defaults; scene overrides were not audited.
- Morning range is 6..14 inclusive; afternoon is >14..18 inclusive because morning wins the shared boundary; remaining hours are night. No explicit Sunny enum exists.
- Main light intensity is interpolated: morning 1, afternoon 0.75, night 0.1. Fog color follows a time gradient when fog is enabled. Lens flare depends on weather, quality and occlusion.
- Rain changes the same sky material colors/cloud alpha and _Rain toward 1. It activates a VisualEffect, ramps SpawnAmount toward 400, ramps the referenced wet material _WetStrength toward 0.5, plays startup audio and fades rain-loop volume in. Rain light is reduced 20% during daytime; nighttime rain intensity is 0.2.
- Rain follows the player with offset (0,4,0); marked indoor/ignore areas hide its container. StopRain fades particles, wetness, _Rain and audio to zero and deactivates rain.
- Rain requests use a 40% default chance. Prefab rain duration 1.8..2.4 game hours corresponds to 90..120 real seconds at default speed. Refresh wait 1.2..1.8 hours corresponds to 60..90 seconds; scheduling starts through state handlers, not an unconditional periodic weather switch.
- NightRain enum and handler exist, but the handler is empty. DayRain retains control while the clock advances and chooses light intensity based on current time.
- WeatherUI only presents time and weather icons. The weather controller does not darken the screen through a UI overlay.
- Noel-specific snow branches and project audio/quality/event systems are separate dependencies, not required to understand the basic weather visuals.

## Assets and adaptation boundary

- Sky.mat uses a custom URP Unlit Shader Graph (Sky.shadergraph), including specialized sky properties. Existing target Built-in Skybox/Cubemap materials do not supply the same properties.
- Rain.prefab uses VisualEffect / Rain VFX.vfx (GUID 779e9cbc0580ca64aaf2504107917ba2), not an ordinary ParticleSystem.
- The wet material reference resolves to GameAsset/Model/Map/Materials/blackstone_top.mat. Only the referenced material is written by this controller; no claim that every map material changes.
- Minimal candidate logic for later confirmation: preset sky appearance, time/preset selection, precipitation activation, wetness and audio fades. Exclude singleton, Noel, source GameManager, HAVIGAME audio, quality menus and WeatherUI unless explicitly requested.
- Source shader and VFX Graph cannot be copied directly into the target under its Built-in/no-custom-shader rules. A later approved design must adapt visual behavior to supported target materials/VFX.

Verification: static source reads, prefab serialized-value inspection and asset GUID resolution. No runtime appearance, source scene overrides, Luna compilation or build-size validation performed.
