# Unity/Luna C# Coding Standard

## Structure and naming

- One primary type per file; filename matches the primary type.
- Names communicate domain intent. Avoid `Manager`, `Helper`, `Utils` unless the responsibility is genuinely narrow and named in the plan.
- `PascalCase` for types/methods/properties/events; `_camelCase` for private fields; interfaces use `I` only for real contracts.
- Use namespaces consistent with the project/module.
- Prefer explicit access modifiers and `[SerializeField] private` over public Unity fields.

## Dependencies and lifecycle

- Inspector/serialized references are validated early with actionable errors.
- Cache references during initialization; do not query every frame.
- Initialization order is explicit. Do not rely on accidental `Awake`/`Start` ordering.
- Subscribe/unsubscribe symmetrically (`OnEnable`/`OnDisable` or an approved lifetime owner).
- Avoid work, allocations, LINQ and string building in per-frame hot paths unless measured acceptable.

## Luna compatibility

Do not use runtime search APIs prohibited by project Luna standards, including `FindObjectOfType`, `GameObject.Find`, tag searches and `Resources.FindObjectsOfTypeAll`. Do not use blocked Physics2D query APIs. Prefer serialized references, registration and cached bounds logic.

Use old Input handling approved for Luna. Do not introduce the new Input System package or APIs without explicit user approval and verified Luna compatibility.

## Error handling and state

- Guard external/serialized input at boundaries; keep internal invariants strong.
- Do not swallow exceptions or replace a failure with an invisible fallback.
- Log actionable context without per-frame spam.
- Avoid boolean combinations that create implicit states; use an approved state model when behavior has meaningful phases.
- Random/time behavior needed for tests must be injectable or isolated behind a small boundary.

## Materials and rendering

- Built-in render pipeline only.
- Unlit materials only unless the user explicitly approves an exception after compatibility/size evidence.
- No custom shaders.
- Brightness/darkness customization uses an approved property/tint/intensity approach supported by the chosen built-in Unlit material.

## Review checklist

- Responsibility and dependencies match the approved plan.
- No unauthorized file/class/pattern/package changes.
- No duplicated rules or Luna SDK calls outside the facade.
- No hidden scene lookup, uncontrolled singleton or event leak.
- Public API is minimal; mutable state is encapsulated.
- Hot paths and allocations are reasonable for WebGL/IL2CPP.
- Comments explain non-obvious why/constraints, not restate code.
- Dead code, unused imports and source-project-specific code are removed.
