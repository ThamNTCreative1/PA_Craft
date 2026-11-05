# HUD recovery addendum
Status: APPROVED
Approved by: user
Approved scope: restore confirmed original MiniMap/profile/coin/Home/Mission/Setting/Chat/jump and related HUD groups from Git while preserving player controls/map/health changes.
Planner: Claude CLI; implementation reviewed by Codex.

Only implementation file: Assets/_Playable_/Scenes/Gameplay.unity. Restore40 GameObjects /159 scene blocks under8 original UIPlayer roots: Btn Jump, ButtonTopRight, HappyCard, RightTop, Chest, ProfileItem, Pet Button, Garbage. Existing RectTransform parent491263489 matches HEAD. No fileID collisions. No new scripts/classes/interfaces/patterns/assets. Preserve existing UIPlayer children,1165 map boxes,Monster prefab/sprites and camera.
Source Mission Button has one callback to missing MissionsJournalController2049079748.Show; omit this unavailable callback only, disclose visual-only Mission button, do not reintroduce deleted mission logic.
Preserve live dirty scene by saving it before making a full backup and extracting/patching source blocks. Check clean state immediately before disk patch/reload. Append8 root references in original relative order. Verify all prior scene blocks byte-identical except parent child list; all159 restored blocks match HEAD except unavailable callback. Reload only clean scene; verify hierarchy/missing refs/sprites/fonts/player bindings/collider count; screenshot and Console. No Luna runtime/build/size claim without running them.
