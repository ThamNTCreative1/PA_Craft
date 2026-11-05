# North fence collider addendum
Status: APPROVED
Approved by: user
Approved scope: exact NorthFenceGap box, Option B, confirmed: opke hay lam di
Planner: Claude CLI, reviewed by Codex. Recommended Option B selected for proposal: box bottom at ground top; implementation authorized by latest user confirmation.

File: Assets/_Playable_/Scenes/Gameplay.unity only.
New object: CityMap/CityMap_Cropped_Colliders/Structure 4,2/NorthFenceGap.
One static enabled non-trigger BoxCollider, no renderer/Rigidbody/scripts. World center(72.25,14.73,62.26), size(16.5,2.54,2.5); extents x64..80.5,y13.46..16,z61.01..63.51. Convert world to local under existing parent without changing parent. Keep all1164 existing boxes, total1165 in collider group. No classes/interfaces/patterns added, no UI/camera/prefab edits.

Evidence: read-only triangle-centroid sampling isolated missing bricks, iron bars and prismarine on north fence. north-map-candidate.png shows continuous base wall and no visible entrance. Proposed envelope is approximate and intentionally treats the barred fence as solid. Box bottom at ground top avoids unnecessary ground overlap; north face touches existing boundary. Decorative hanging chains near7.5,16.5,15.51 remain without new collider.

Verify exact world bounds and no positive-volume overlap with existing obstacle boxes, preserve gameplay/player UI snapshot, no missing refs/Console errors; player/monster traversal blocked at fence and camera spherecast/orbit at edges. Luna build/runtime/size unverified until actually run. No unrelated fixes. Require user approval for this exact measured row before implementation, per existing approved plan.

