# End Time 30s -> Endgame -> Store
Status: RESEARCH READY

Request: When End Time reaches 30 seconds, end the game and open the store.

Observed current source:
- EditorBuildSettings enables PetRescue.unity; Gameplay.unity is disabled.
- PetRescue.unity serializes _endGameTime as 30.
- RescueGameFlow.Start initializes the clock from Time.unscaledTime and registers LunaController in RescueServices.
- Update advances the global end timer before the _presented guard. This clock therefore continues after an early win or loss and starts from scene startup, independently of the 15-second gameplay countdown.
- AdvanceEndTime guards repeated triggers and calls HandleEndGame at the configured limit.
- HandleEndGame finishes audio, stops gameplay, calls NotifyEndGame, then OpenStoreAtEndTime, then shows the endcard.
- LunaController maps these calls to Luna.Unity.LifeCycle.GameEnded and Luna.Unity.Playable.InstallFullGame. EndOnce guards duplicate lifecycle notifications; OpenStoreAtEndTime has its own once-only guard.
- Existing RescueSceneTests checks the configured global limit equals 30. This is a configuration assertion, not proof of actual store display.

Conclusion: Requested behavior is already implemented in the enabled scene. No runtime implementation change is currently indicated.

Caveats / verification remaining:
- No Editor play session or Luna build was run for this research. Actual host store opening remains unverified.
- Waiting without input, playing normally, and winning/losing before 30 seconds should all reach the global store trigger once at 30 seconds.
- Legacy GameManager in the disabled Gameplay scene conditionally opens the store based on _isApplovin and uses scaled time; do not confuse that flow with PetRescue.
- Existing working tree contains unrelated modified/untracked files; left untouched.

No scripts, scenes, prefabs or assets changed. No prior spec artifacts were read. If runtime behavior differs, reproduce in the target Luna host before proposing a Claude plan and user approval.

## User clarification (2026-11-23)
Confirmed scenario: At global End Time 30 seconds, end game and open store directly, without showing Endcard.
Current mismatch: RescueGameFlow.HandleEndGame ends with _endcard.Show(false).
Additional relevant observation: HandleWin/HandleLose can already show Endcard before the global timeout; removing the timeout Show call alone would leave that existing card visible. Planner should account for hiding an already-visible Endcard at timeout to satisfy the confirmed scenario.
Candidate affected source: RescueGameFlow.cs, specifically HandleEndGame; existing serialized _endcard reference provides access. No new class/interface, scene or prefab is indicated by research. Win/Lose handlers are separate flows.
Verification required in the plan: timeout without interaction; timeout while playing; timeout after an earlier result card; gameplay stopped; no card visible at timeout; GameEnded notified at most once and timeout store call once; Unity compile/Console and actual Luna-host store behavior.
Status: RESEARCH READY FOR CLAUDE PLAN. User confirmed desired behavior, not an exact implementation plan. No runtime source changed.
