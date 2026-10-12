---
name: luna-build-budget-audit
description: Measure and reduce Unity/Luna playable size against the under-4.5-MB target. Use for build audits, asset budgets, optimization plans or size regressions.
---

# Luna Build Budget Audit

Do not estimate completion from source file sizes alone. Record the actual measurement method and final playable/build output.

## Audit categories

- Compiled scripts/modules and generic/reflection expansion.
- Textures: dimensions, format, alpha, mipmaps and atlas use.
- Audio: duration, channels, sample rate, compression and preload.
- Meshes: tris, attributes, bones, blend shapes and compression.
- Animation: clips, curves, key density and unused tracks.
- Materials/shaders, packages, scenes and duplicated assets.

Produce a ranked table with current contribution, proposed saving, visual/functional risk and verification. Require approval before destructive compression, mesh reduction, audio trimming or asset removal.

After changes, rebuild and report before/after bytes, remaining headroom below 4.5 MB, largest contributors and quality regression checks. Never claim the budget is met from an estimate.
