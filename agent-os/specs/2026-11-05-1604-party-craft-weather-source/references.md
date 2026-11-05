# Source references

Root: D:/Source/party-craft/Assets/

- Game/Scripts/Weather/WeatherController.cs:19 — WeatherType states; :265 Init; :302 fog; :308 time selection; :351 rain request; :383 rain intensity; :494 empty NightRain; :560 morning transition; :586 afternoon; :612 night; :638 rain transition; :733 stop rain; :793 rain duration; :810 flare; :831 player-follow; :843 ignore areas.
- Game/Scripts/Weather/WeatherUI.cs — time formatting and weather icon presentation.
- Game/Scripts/Weather/SkyBoxSetLightDirection.cs:7 — light direction shader property.
- Game/Scripts/Weather/RainIgnoreAreaChecker.cs and RainIgnoreArea.cs — precipitation exclusion volumes.
- Game/Prefabs/WeatherController.prefab:379 — referenced sky material and serialized preset/default values.
- GameAsset/Shaders/SkyBox/Sky.mat — material GUID 4008a63bd1c9b9440a8e4c667ca945e6; shader GUID 7ae35fa2529b12d408a3d45c685e2943.
- GameAsset/Shaders/SkyBox/Sky.shadergraph:2093 and :11674 — Universal Unlit subtarget and Universal target.
- GameAsset/VFXs/Rain/Rain.prefab:44 — VisualEffect asset reference.
- GameAsset/VFXs/Rain/Rain VFX.vfx.meta:2 — referenced VFX GUID 779e9cbc0580ca64aaf2504107917ba2.
- GameAsset/Model/Map/Materials/blackstone_top.mat — referenced wet material; _WetStrength property.

Target comparison: D:/Source/PA_Craft/Assets/_Playable_/Scripts/Weather/WeatherPresetController.cs uses camera background plus UI overlay and rain particles/audio. This differs from the source material-property approach. No target code was changed.
