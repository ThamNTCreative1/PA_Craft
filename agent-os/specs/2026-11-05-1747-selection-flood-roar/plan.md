# Selection / Flood / hero dropdown / roar v1

Status: APPROVED
Approved by: user (oke, 2026-11-05)
Approved scope: Selection / Flood / hero dropdown / roar v1, including corrected Unlit/Texture material.
Planner: Claude CLI; main plan plus final Unlit/Texture correction.

## Exact file scope

1. Assets/_Playable_/Scripts/UI/HeroSelectionHandHint.cs
2. Assets/_Playable_/Scripts/Heroes/HeroRoster.cs
3. NEW Assets/_Playable_/Scripts/Heroes/HeroSlotOption.cs +Unitymeta
4. Assets/_Playable_/Scripts/Weather/WeatherPreset.cs
5. Assets/_Playable_/Scripts/Weather/WeatherPresetController.cs
6. Assets/_Playable_/Scripts/GameController.cs
7. NEW Assets/_Playable_/Scripts/Weather/FloodWeatherView.cs +Unitymeta
8. Assets/_Playable_/Scripts/Monster/MonsterController.cs
9. Assets/_Playable_/Prefabs/Monster/Monster.prefab
10. Assets/_Playable_/Scenes/Gameplay.unity
11. NEW Assets/_Playable_/Materials/Weather/FloodWater.mat +Unitymeta; Unity-generated folder metadata as needed.

No other asset/script/package/shader changes. Existing HUD, health/timer/outcome code, font consolidation, HeroId/slot resolver/skin identity retained.

## Named hero dropdowns

New public enum Playable.HeroSlotOption: RedHero0, SummerVacation1, TribalYouth2, Fishman3, Panda4, Doctor5, Firefighter6, Police7. Data only, no dependencies/lifecycle/events.

HeroRoster same _slot1..4 field names become enum type, retain numeric defaults0,1,2,3 and actual scene values; remove Range. Luna titles Hero Slot1..4, same Heroes section/order. ResolveSlots casts enums to int before existing unique fallback resolver. Scene HeroEntry names align: Red Hero, Summer Vacation, Tribal Youth, Fishman, Panda, Doctor, Firefighter, Police. Names shown on cards change accordingly; IDs/portraits/skins/controllers unchanged.

Before delivery verify Inspector enum and installed SDK export metadata gives AllNames/AllValues for4fields; actual Playground/export check if available. If SDK cannot export named choices, stop/report rather than quietly retain number fields or promise dropdown parity. No SDK code mutation/reflection in gameplay.

## Current card and hand pulse

HeroSelectionHandHint remains sole animation owner. Add serialized _targetPulseScale1.08 and _minEdgeGap4. Cache4base scales,4Rect bounds in hand-parent coordinates and reusable4corners once, with _basesCached/_moving flags. No scene searches/per-frame allocations.

Begin validates4targets/hand, restores previous state, caches scales/bounds, starts dwell at0. Current hand and current target join one unscaled InOutSine/Yoyo pulse sequence, same .45secondduration; hand peak1.15, target peak capped at1.08. Cap by nearest actual edge gap on matching row/column: allowed=1+(gap-minEdgeGap)/(pivot-to-edge distance), clamp>=1. Only current target scales, preserve >=4units between actual edges even in portrait.

Existing .8dwell/.35move cadence retained. At move start kill pulse and restore old button; move hand to next with rest scale, then begin new joint dwell. LateUpdate only while dwelling follows PointFor(current scaled target), does not fight DOMove during movement. Realign kills hop/pulse, restores targets, recomputes bounds and restarts current dwell. Stop/choice/hide/disable/destroy kill owned tweens and restore all cached target scales +hand pose. No HeroSelectionPanel/HeroCardView code change needed; existing hooks retained.

## Fixed Flood weather

WeatherPreset append Flood4, retain0..3. GameController same int_weather Range0..4, label lists Flood, invalid values use Day with0..4warning. WeatherPresetController explicit FloodWeatherView _flood reference, five presets validated; fifth uses existing Rain sky material/tint/exposure, no rain particles/audio (Rain stays mode2only). Initialize/OnEnable apply flood via BeginFlood only mode4, else HideFlood. OnDisable stops rain and hides flood with Unity null checks. Existing captured-weather guard and sky clone cleanup retained.

New sealed Playable.FloodWeatherView: serialized Transform _water, AudioSource _audio, AudioClip _sound, _lowY12.5, _highY14.6, _riseDuration2(min.01). Own _risen flag and Tween; public BeginFlood()/HideFlood(), no events/interfaces.

- BeginFlood validates refs/levels, warns actionable and returns on invalidconfig. Activate water. First call marks _risen, sets worldYlow, DOMoveYhigh over2seconds OutQuad/unscaled +PlayOneShot. Later enable snaps high with no new sound/rise. Fixed mode stays flooded whole run.
- HideFlood kills/nulls tween, stops sound, resets lowY and hides water. Keep _risen to avoid repeat sound on controller re-enable. OnDisable/OnDestroy cleanup via HideFlood/null guards. No receding toggle, damage, collision, buoyancy or swimming dependency.

Scene root FloodWeather at(29.75,14,18.01), new component and dedicated2Dnonloop/nonPlayOnAwakeAudioSource. Use existing target sound Assets/Game/Audios/SoundFX/player/sfx_swimming.ogg(1.9s), not sourcewatersplash. Child FloodWater initiallyinactive: built-inQuad2triangles, rotationX90, scale(121.5,111,1), localY-1.5/worldY12.5; NOcollider; shadows/receiveShadows off. Existing mapgroundabout14, high14.6 covers lowerlegs without changing motor/physics.

New FloodWater.mat: allowlisted Unlit/Texture, renderQueue2000, existing RGB texture Assets/_Playable_/3D Model/Map/textures/water_still_Luna.png256x256, tiling16x16, offset0. Texture wrap alreadyRepeat. One shared material, no renderer.material clones, no tint/alpha writes, no sourceURP/Bitgem/PrimeTween/Observer/HAVIGAME imports. Opaque water is an explicit adaptation; do not claim source transparency.

## Start roar

MonsterController adds serialized AudioClip _startSound and Start calls existing PlaySound(_startSound). Unity Start once per object at scene/selection entry; no OnEnable replay. Monster.prefab assigns existing monster-roar_8.wav(2.7167s) via current2D_audio. Attack/hit/death clips/playback unchanged; no AudioManager/flow dependency or new clip import.

## Implementation and verification

Snapshot scoped files/current Editor state preserving unrelated dirty work. Code changes first, full asset import/compile/domain reload, Console before scene/prefab/material setup. Verify enum SDK metadata before promising dropdown. Wire material/quad/audio/presets/names/roar. Any required extra file/class/dependency/solution needs renewed approval.

- All4hero slots old values still map sameIDs/skins; named choices inInspector and SDK export; duplicates/invalid values retain existing fallback. Character labels readable.
- Pulse only pointed button, matches hand rhythm; measured peak gaps>=4 in landscape/portrait, no blocked clicks; previousbutton reset on hop; Stop/resize/hide/choice restores scales and kills owned tweens (do not rely on global DOTween count affected by unrelated UI).
- Five weather modes each sampled once/stayfixed; invalid-1/5fall backDay. Flood visible low->high over2s, soundonce, no rain, no collider/projectileblocking, disable/enable high/no repeat sound, proper teardown. Check default nonFlood waterinactive and no splash. Existing0..3visuals preserved.
- Roar once at scene/selection entry; disable/re-enable does not replay intro, attack/death retain their existing sounds.
- CompileConsole; actual portrait/landscape and fivehit/outcome/timer regressions. No shader/package/texture/clip imports. Onequad/+2triangles/onewaterdraw; sourceassetexistence does not prove same exportmemory. Actual Luna build/device/bytes only claimed if measured; otherwise unverified, no under4.5MBpromise.
