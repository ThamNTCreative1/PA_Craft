# References

## Current source

- Assets/_Playable_/Scripts/GameController.cs: Awake, Start, OnDrivingStarted, IEShowMap, SetRiding, DismissStartTutorial. Owns delayed minimap switch and existing tutorial state.
- Assets/_Playable_/Scripts/UI/MissionsJournal/MissionsJournalController.cs: Awake, Start, Show, Hide, OnGoPressed. Owns journal visibility, input/Rigidbody lock and mission-3 handoff.
- Assets/_Playable_/Scripts/UI/MissionsJournal/JournalHandSequencer.cs: Begin, Stop, OnDisable, KillSequence. Existing move/hold loop and cleanup.
- Assets/_Playable_/Scripts/Controller/PlayerController.cs: Awake and Start/SetDrivingControls initialization relevant to hiding the Player root.
- Assets/_Playable_/Scripts/Manager/GameManager.cs: independent startup/end timer, outside requested behavior unless explicitly added to the plan.
- Assets/_Playable_/Scenes/Gameplay.unity: live Inspector mapping and root hierarchy recorded in research.md.

## Read-only evidence

Unity MCP editor state: PA_Craft, Unity 6000.0.60f1, Gameplay.unity, Edit Mode, not compiling. SerializedObject inspection gives minimap delay 10 seconds, GamePanel active and MinimapPanel inactive. Hand timing 0.4/0.8 seconds and unit scale. No play session, source edit, scene save, asset import or build was performed in this research pass.

## Instructions and standards

- AGENTS.md; agent-os/workflows/codex-claude-codex.md.
- agent-os/product/mission.md; product context and agent-os/standards/index.yml already available in session.
- Applicable standards: ai-agent/approval-gates-and-change-control, roles-and-handoff, safety-scope-and-verification; unity/architecture; luna/runtime-compatibility, tutorial-and-onboarding, scene-budget-4_5mb; testing/luna-verification.
- Skills: analyze-luna-project, luna-production-governance, luna-code-architecture, luna-test-and-verify, luna-tutorial-onboarding.

No cross-project source reuse. No earlier spec artifact read for this work item.
