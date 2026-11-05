# References

- Assets/_Playable_/Scripts/Monster/MonsterController.cs: FixedUpdate/OnAnimationHit/ReceiveHit/Freeze.
- Assets/_Playable_/Scripts/Combat/PlayerHealth.cs and Health.cs —100health anddeath event.
- Assets/_Playable_/Scripts/Flow/MonsterHeroFlowController.cs — OnTutorialCompleted/OnEnded/outcome events.
- Assets/_Playable_/Scripts/Manager/GameManager.cs — timer, separateoutcomes, FinishEnd andautoCTA.
- Assets/_Playable_/Scripts/GameController.cs and Heroes/HeroRoster.cs — Lunaattributes.
- Assets/_Playable_/Scripts/UI/WinPanel.cs and FailPanel.cs —existingShow/input/pulse, unchangedcandidate.
- Assets/_Playable_/Scenes/Gameplay.unity — refs,Canvasorder,HPdamage50stimeout,fontbindings.
- Assets/_Playable_/Prefabs/Monster/Monster.prefab — attackDamage25,HP750.
- Assets/_Playable_/Prefabs/InfinitySwipe.prefab — extraFFFFfontdependency.
- Assets/Game/Fonts/FFFFORWA SDF.asset; FredokaOne-Regular SDF.asset — canonicalfonts.
- Assets/_Playable_/UI/MissionsJournal/FredokaOne-Regular SDF.asset; Assets/TextMesh Pro/Fonts/FFFFORWA SDF.asset — redundant playabledependencycandidates, retainfiles.
- Assets/TextMesh Pro/Resources/TMP Settings.asset — defaultalreadycanonical, nochange.
- Assets/_Playable_/Sound/victory.wav; Assets/Sound/game-over.mp3 — existingoutcomesounds.
- RuntimeEditor reflection confirms LunaPlaygroundFieldAttribute constructor supports fieldSection/order; noSDKcodecopied.
- Governance/architecture/verification/runtime/buildbudgetskills and AGENTSworkflow.
