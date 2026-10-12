# Luna diagnostics fix

Scope: user requested fixing current displayed diagnostics; direct implementation authorized in conversation.

Changes:
- CarController.cs: exclude maxDepenetrationVelocity under UNITY_LUNA, retain Editor setting.
- GameManager.cs: remove Playground attribute from unused null background texture; serialized field and optional runtime behavior retained.
- Five reported TMP fonts: bake scene text and ASCII, switch atlas population to Static. Paths: Assets/Game/Fonts/{FFFFORWA,FredokaOne-Regular} SDF.asset; Assets/TextMesh Pro/Fonts/FFFFORWA SDF.asset; Assets/_Playable_/Font/LevelUp SDF.asset; Assets/TextMesh Pro/Resources/Fonts & Materials/LiberationSans SDF - Fallback.asset.
- MissionsJournalController.cs: optional title guard; cache, kill and reset title tween on disable/destroy; pulse relative to authored scale.
- No new runtime classes, interfaces, packages or scene structure.

Verification:
- Unity compilation completed; Console: zero errors.
- All current scene TMP texts pass HasCharacters with existing fallback lookup, without dynamic generation.
- PlayMode: title tween starts; three Hide/Show cycles each clear and restart tween; zero Console errors.
- Screenshot: Temp/LunaDiagnosticsFix/journal.png. Mission labels visually readable.
- Local Luna project:build log: Temp/LunaDiagnosticsFix/luna-build.log. Stage1 export, Stage2 assets, Stage3 C# compilation and Stage4 develop package completed successfully. CLI shell exit code was 1 despite stage completion; diagnostics have EarliestFatalError=0 and no CS1061, LP1030 or LP1009.
- Editor stopped after verification.

Limitations:
- Remaining diagnostics are advisories: custom events absent, Rigidbody/ParticleSystem counts, Facebook file count, unsupported Timeline package. No unrelated package removal or gameplay optimization performed.
- No browser gameplay test or release-ad size certification performed; generated output is a develop package, not a measured release ad.
- Requested full ASCII bake could not add q/z to TextMesh Pro/Fonts/FFFFORWA and angle brackets to LevelUp. Current UI glyph audit passes; future localization/new copy requires a new bake/check.
