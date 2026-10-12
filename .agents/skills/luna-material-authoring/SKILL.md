---
name: luna-material-authoring
description: Plan, create or audit Unity materials for Luna using the Built-in render pipeline and Unlit materials with controllable brightness. Use for materials, textures, rendering or Blender-to-Unity appearance.
---

# Luna Material Authoring

- Built-in render pipeline only.
- Use built-in/approved Unlit shaders; never create or import a custom shader.
- Brightness/darkness must use an approved tint/color/intensity property supported by the chosen material path.
- Minimize material count and texture channels; remove unused alpha, maps and slots.
- Blender shader graphs are authoring references only and must not become custom Unity shaders.
- Preserve transparency mode, render queue and batching behavior deliberately.

Before mutation, list every target material/renderer/texture, current shader, proposed Unlit replacement, brightness control, transparency and expected size/draw-call effect. Require user approval.

Verify appearance in Unity, expected brightness range, transparency/sorting, missing references, batching/material instances and Luna build behavior. Record texture format/max size/mipmap/alpha decisions and size contribution.
