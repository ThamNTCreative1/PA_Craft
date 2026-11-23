# References
- ProjectSettings/EditorBuildSettings.asset: enabled PetRescue scene.
- Assets/_Playable_/Scenes/PetRescue.unity: _endGameTime: 30.
- Assets/_Playable_/PetRescue/Scripts/RescueGameFlow.cs: Start, Update, AdvanceEndTime, StopGameplay, HandleEndGame.
- Assets/_Playable_/PetRescue/Scripts/LunaController.cs: EndOnce, NotifyEndGame, OpenStoreAtEndTime.
- Assets/_Playable_/PetRescue/Scripts/RescueServices.cs: typed service registration/access.
- Assets/_Playable_/PetRescue/Tests/Editor/RescueSceneTests.cs: FlowReferencesAndActorArraysAreComplete (not executed).
- Assets/_Playable_/Scripts/Manager/GameManager.cs: legacy timer and conditional CTA in disabled scene.
- AGENTS.md; agent-os/workflows/codex-claude-codex.md; agent-os/standards/index.yml; ai-agent standards; luna/luna-controller.md; testing/luna-verification.md: research and approval rules.
- Assets/_Playable_/PetRescue/Scripts/RescueEndcardView.cs: Show activates the endcard GameObject, guards repeated showing, and has no Hide method. Relevant to timeout following an earlier result card.
