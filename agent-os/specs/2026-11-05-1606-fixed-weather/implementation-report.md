# Fixed weather v1 implementation

Approved by user: oke. Implemented exact plan scope, no deviations.

## Changes

- GameController.cs: serialized Luna weather selector0..3, explicit weather controller dependency, Start-only sampling/invalid fallback; pre-existing brightness implementation preserved.
- WeatherPresetController.cs: four material/tint/exposure presets, one owned runtime material clone, one-shot Initialize guard, rain/audio looping only Rain, disable/re-enable support, original skybox/camera restoration and clone destruction. No timer, random selection, source framework, imported shader or VFX Graph.
- Gameplay.unity: controller reference and default Day0, four approved presets, disabled only World Tint. Scene comparison with captured current Editor scene shows exactly three changed YAML blocks (GameController726936418, Weather680794211, World Tint1237303567), no added/deleted blocks. Existing dirty Editor state was captured as before/Gameplay-editor.unity before implementation, then retained in saved scene. On-disk pre-change snapshot is before/Gameplay.unity.
- Existing enum, HeroSelectionPanel, CameraController, map, monster prefab, gameplay HUD and material assets untouched. HeroSelectionPanel/CameraController SHA256 match pre-change values (evidence/file-hashes.json).

## Verification performed

- Unity6000.0.60f1 scripts compiled/domain reload completed; initial and final Console queries show0 errors. Final warning: Account API unavailable within30 seconds, unrelated network/editor integration. Intentional missing-reference test produced expected actionable error in a prior Play session. Two in-memory diagnostic snippets needed correction (C# local/lambda variable collision, camera name); these did not create project files or compilation errors.
- Actual PlayMode startup Day: Day01 clone, tint(.5,.5,.5,.5), exposure1, no rain/audio. Duplicate Initialize(Night) and changing GameController configuration during run preserved the captured Day sky.
- Sunny startup: Day01 clone, tint(.55,.53,.47,.5), exposure1.25, no rain/audio.
- Night startup: Night01 clone, exposure1, no rain/audio. Screenshot evidence/night.png. Map brightness intentionally unchanged per approved plan.
- Rain startup: Day01 clone, tint(.4,.43,.47,.5), exposure.7, particle/audio both running and looping. Sustained65-second monitor: sameSky=True, rain=True, emitting=True, audio=True,260particles (evidence/rain-65s.txt). Weather also retained across timeout.
- Rain disable stops particle/audio; enable resumes both; duplicate initialization cannot replace sky. Temporary valid adapter with invalid enum99 falls back to Day. Destroying that adapter restores original sky and camera flags. Temporary adapter with missing references disables itself and leaves current sky untouched. Temporary objects removed.
- Hero card button invoked in fresh runtime: selection hidden, joystick/fire/look cue all active; composited screenshot evidence/rain-ui.png confirms old HUD/player UI retained and no weather black overlay. Tutorial tap handler advances Look->Move while weather persists. This is callback-level verification; physical mouse/touch movement and full tutorial shooting path were not rerun.
- Existing Win and Lose entry methods invoked in separate runtime scenarios, weather retained; Timeout also retained weather. These verify outcome integration, not full combat input/endcard/CTA replay. Runtime diagnostic end-time extension/CTA delay did not persist: final EditMode EndTime30.
- Repeated PlayMode exit/re-entry restores Day01 shared sky; final scene saved clean, PlayMode off, weather default0, controller reference valid, World Tint inactive, UIPlayer present.
- Static audit of changed scripts: no prohibited scene searches, source URP/VFXGraph imports, weather coroutine/timer or additional runtime packages. Existing brightness global shader call unchanged. Existing Built-in Skybox/Cubemap limited exception approved in plan; no shader assets modified.

## Unverified / remaining limits

- No fresh Luna build, browser/device runtime, shader export or build-size measurement performed. Under4.5MB is not verified. Night01 adds a cubemap dependency; source PNG4039430bytes is not the compressed build contribution. No importer/texture changes made.
- No geometry changes, so triangle remeasurement unnecessary for this scope. Original procedural sky, wet materials and source lighting/fog are deliberately not reproduced. Night changes sky only, map Unlit appearance stays unchanged.

Evidence: scene-diff.json, before snapshots, evidence/rain.png, evidence/rain-ui.png, evidence/night.png, evidence/rain-65s.txt and evidence/file-hashes.json.
