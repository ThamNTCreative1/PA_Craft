# Shape — Claude planning handoff
Status: PENDING APPROVAL

Claude CLI generated the planning proposal on 2026-11-05; this records its concrete UI scope. Preserve all gameplay UI, gameplay scripts, CameraController, existing colliders and serialized camera references. Reuse existing WorldHealthBar presentation adapter. No new classes/interfaces/patterns. No source health logic, GhostBar or sample TMP text.

Follow-up review: map geometry is combined into Base_Map/Grass/Road/Water meshes. Whole-renderer AABB overlap cannot establish individual obstacle coverage; do not use the proposed 90% threshold to generate colliders. Exact spatial gap inspection remains required.
