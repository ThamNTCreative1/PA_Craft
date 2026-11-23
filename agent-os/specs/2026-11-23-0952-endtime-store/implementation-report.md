# Implementation report

User instruction: "lam di" after confirming direct store at 30 seconds without Endcard and after research identified RescueGameFlow.HandleEndGame. Implemented this narrow scope directly on user instruction; no Claude-authored plan was produced.

Changed runtime file: Assets/_Playable_/PetRescue/Scripts/RescueGameFlow.cs.
HandleEndGame now finishes audio, stops gameplay, deactivates the existing Endcard GameObject, notifies endgame, and opens the store using the existing timeout method. Removed timeout Show(false). No new class, interface, dependency, scene or prefab changes.

Verification:
- Unity scripts refresh/compile requested via MCP; editor reported compilation completed, no pending reload, ready_for_tools true.
- Console inspection returned warnings only: obsolete FindObjectOfType in unrelated ModelSwitcher.cs and unsupported WebGL1 Hidden/InternalErrorShader warnings. No compile errors returned.
- Source inspection confirms timeout cannot call Show and deactivates an already displayed Endcard before store opening. Existing timeout guards and Win/Lose handlers retained.
- PlayMode timeout, actual Luna-host store display and build size were not verified. No assets added; final playable size is unmeasured.
