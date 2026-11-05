# Selection pulse, named heroes, flood and start roar

Status: SOURCE LOGIC CONFIRMED by user oke, 2026-11-05. No gameplay code/assets modified. Preparing target plan.

User request: selected tutorial target button also DOScale with pointing hand; add original-project flood to weather; choose four hero slots using named dropdowns like screenshot; monster roar at game start. Earlier fixed-weather requirement remains: selected weather stays whole game.

## Current target facts

- HeroSelectionHandHint owns hand pulse1..1.15/.45sec, unscaled, hop dwell.8+move.35 across4explicit RectTransform targets; no button tween. Stop kills hand tweens/restores hand only. Target pulse must restore previous card scale when moving, on Stop/choice/hide/resize, avoid overlapping tweens and account hand point calculation under target scaling. Current compact card gaps20; need peak bounds check to avoid overlapping adjacent cards (1.15 at narrowgap may exceed gap).
- HeroRoster has four int slot fields0..7 in Heroes group. HeroId numeric IDs0..7 include cryptic Npc names; serialized values and unique resolver must be preserved. Roster names: Default, Summer Vacation, Tribal Youth, Derpy Fishman, Panda Onesie, Doctor, FireFighter, Police. Demo is a real named dropdown, not number tooltips. SDK EditorScripts has Luna.Unity.DTO.UnityEngine.Assets.EnumDescription, supporting enum metadata; exporter/browser dropdown still requires verification before claiming parity. Runtime enum conversion can retain numeric IDs and current slots. Do not change roster skin/controller identity when naming options.
- WeatherPreset enum Day0/Sunny1/Rain2/Night3. GameController Luna int_weather0..3, Start captures once. WeatherPresetController validates4presets and owns one skyboxclone/rain lifecycle. Flood is not present. Adding a new preset must preserve fixed selection, Day fallback, cleanup, existing rain/audio, and shouldn't damage combat timers/outcomes.
- Existing monster2D AudioSource and clip Assets/_Playable_/Sound/505131__mitchanary__monster-roar_8.wav already used for attack/death. New start roar can reuse asset reference; define scene-start (selection entry) once, not every enable/retry/attack, in future approved plan. No sound asset generation required.
- Existing target water materials available, e.g. _Playable_/3D Model/Map/Materials/water_still_Luna.mat, built-in shader fileID211 with alpha blending. Actual shader/property compatibility and appearance require validation before reuse; do not import original URP water shader. Current map groundaroundY14, so literal source transform levels cannot be used without geometry/parent mapping.

## Exact original flood logic inspected (read-only)

Source D:/Source/party-craft/Assets/Game/Scripts/Weather/FloodControl.cs:
- public Transform flood, HAVIGAME.Audio sound, bool isFlood, PrimeTween.Tween tween.
- Start subscribes Observer flood event and hides flood object; logs tide state analytics.
- Flood handler toggles: on ->play sound, setflagtrue, activate flood object, stop prior tween, Tween.PositionY(flood,10,13,2,Ease.OutQuad). Off ->setflagfalse, stopprior, Tween.PositionY(flood,13,10,2,Ease.InQuad), hide object oncomplete.
- OnDestroy unsubscribes Observer event. No periodic rising/falling timer or damage rule in this controller.
- FloodButton.cs just emits Observer flood on GameButton click. WeatherController's day/rain cycle does not own this toggle.

City.unity source binds flood Transform1375292910 under52318168. Its serialized localpos(-201,13,-194), scale(2,1,2); water object has custom mesh and Bitgem.VFX.StylisedWater.WaterVolumeTransforms (IncludeFaces/IncludeFoam-1, TileSize1.9, RealtimeUpdates1). Material GUIDf1a6504bf99af724887270f330db3918 resolves Assets/Bitgem/StylisedWater/URP/Materials/example-water-Custom2.mat. A transform tween level is not necessarily rendered water-surface height.

Source sound GUID9d6ee0e329ab5594993567ab7c2de8d7 resolves Assets/Game/Audios/SoundFX/watersplash.mp3. Reference only; no copy/import yet.

## Smallest source slice for user confirmation

Take only flood-object activation, water transform rising over2seconds with OutQuad and splash playback. For fixed weather selection, retain flooded state for entire run; no automatic recede or in-game toggle. Exclude original Observer/GameButton, HAVIGAME, PrimeTween, analytics, URP/Bitgem custom shader/mesh runtime generation, and unrelated swimming/buoyancy/damage behavior. Target-native renderer/material/water-level mapping and files must be planned by Claude only after user confirms this source slice.

Original lowering/disable branch may inform teardown but should not introduce mid-game weather changes. Need user confirmation of identified source logic before design/copy per cross-project reuse gate. Remaining three requests researched and retained in same work item.

Future verification needs: card and hand synchronized pulse only current target, no overlap/raycast issue and complete cleanup; named dropdown SDK export + stable IDs/unique fallback; fixed flood mode visible at proper local map height, no physics/combat displacement and no shader imports, cleanup/mode invalid fallback; roar exactly once with selection visible; compile/Console and portrait/landscape. Build/device/size claims require actual measurement.

Additional planning evidence: water_still_Luna.mat is existing Particles/Standard Unlit transparent material (queue3000); alternate Park water is opaqueUnlit/Texture (queue2000). Use existing transparent target material only, no sourceassetcopy. No watersplash audio exists in target; existing Assets/Game/Audios/SoundFX/player/sfx_swimming.ogg is a target-native water sound candidate, avoids originalaudioimport. Existing monsterroar length2.7167sec. SDK EnumDescription contains Value:int, AllNames:string[], AllValues:int[]; actual Playgroundexport still needs validation. Compact20-unit gaps mean target pulse must cap by neighbor gap, especially portrait, instead of blindlyusinghand1.15 onwidecards.
