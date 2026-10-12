---
name: luna-blender-optimization
description: Plan and execute approved Blender asset optimization for Unity/Luna through Codex-only Blender MCP. Use for topology, tris, UVs, materials, rigging, animation or export.
---

# Luna Blender Optimization

Only Codex may use Blender MCP. Never mutate a `.blend` file before the user approves the exact object/operation list.

## Required plan

For each object/collection list topology operation and triangle target, modifiers, UV/material slots, rig/bones/weights, animation changes, pivot/origin/scale, collider strategy, export format/settings, Unity destination and estimated size contribution.

## Optimization rules

- Preserve silhouette and deformation-critical loops; remove safe hidden/internal geometry.
- Merge static meshes only when culling/material/animation control remains acceptable.
- Remove unused UVs, vertex colors, material slots, blend shapes, bones and curves.
- Normalize naming/transforms according to approved export settings.
- Prefer simple Unity colliders and compressed non-readable meshes where runtime access is unnecessary.
- Blender materials do not authorize custom Unity shaders; replace with Built-in/Unlit.

Before/after evidence must include triangles, material slots, relevant attributes, transforms, export output and Unity import verification. Measure asset/build contribution and retain the source `.blend` without overwriting unrelated work.
