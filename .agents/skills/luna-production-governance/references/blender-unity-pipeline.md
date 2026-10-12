# Blender → Unity → Luna Pipeline

## Authority

Only Codex uses Blender MCP. Claude may specify asset requirements and plan operations. Codex must not mutate `.blend` files before the user approves the asset operation list.

## Plan requirements

List each target object/collection and proposed:

- Modeling/topology changes and triangle target.
- Modifier application/retention.
- UV, texture and material changes.
- Rig, bone, skinning and animation changes.
- Object naming, pivot, origin, scale and transform cleanup.
- Collider strategy after Unity import.
- Export format/settings and Unity destination.
- Estimated contribution to the 4.5 MB budget.

## Optimization

- Preserve silhouette and deformation-critical topology; remove unseen/internal geometry when safe.
- Merge static meshes only when it reduces draw calls without losing required culling, material or animation control.
- Limit material slots, UV sets, vertex colors, blend shapes, bones and animation curves to those actually used.
- Prefer simple Box/Sphere/Capsule colliders in Unity; avoid MeshCollider for large imported meshes unless explicitly justified.
- Apply/normalize transforms according to the approved export workflow; verify scale and orientation in Unity.
- Textures use the smallest acceptable dimensions/channels and project-approved compression.

## Verification before handoff

- Save source `.blend` and export to the approved location without overwriting unrelated assets.
- Record object/mesh triangle counts before and after.
- Inspect normals, UVs, material slots, armature weights, animation ranges, origin and scale.
- Import into Unity and confirm mesh/material/animation behavior.
- Confirm Built-in/Unlit replacement in Unity; Blender shader graphs are not shipped as custom Unity shaders.
- Measure resulting Unity/Luna size contribution and report it.
