---
name: luna-runtime-compatibility
description: Audit or implement Unity code for Luna Web runtime and IL2CPP compatibility. Use for APIs, initialization, physics, packages, performance or build-runtime failures.
---

# Luna Runtime Compatibility

## Prohibited or high-risk behavior

- No `FindObjectOfType`, `FindObjectsOfType`, `GameObject.Find`, tag searches or `Resources.FindObjectsOfTypeAll` at runtime.
- No blocked Physics2D query APIs; use approved cached bounds/AABB logic when required.
- Avoid MeshCollider for large imported meshes; prefer simple colliders.
- Do not add packages, reflection-heavy systems, dynamic code generation, threads or unsupported APIs without explicit approval and a Luna proof.
- Do not depend on accidental `Awake`/`Start` order.

## Required approach

- Supply serialized references or explicit registration and cache once.
- Make bootstrap order and missing dependency failures clear.
- Keep hot paths allocation-light; avoid LINQ, closures and string building per frame.
- Guard serialized/external boundaries and preserve internal invariants.
- Review imported third-party code for prohibited APIs and unused modules.

## Audit output

Report each finding with file/member, Luna impact, smallest compatible correction and verification. Do not apply corrections until included in an approved plan. After implementation, compile, inspect Console and verify in the Luna build/runtime rather than relying only on Editor success.
