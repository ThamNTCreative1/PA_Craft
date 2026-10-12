# Architecture, OOP, SOLID and Patterns

## Design output required before implementation

For every proposed type, list:

- Name and intended path.
- Single responsibility and reason it exists.
- Inputs, outputs and public API.
- Dependencies and how they are supplied.
- Lifecycle/ownership and cleanup.
- Events published/subscribed.
- Unity scene/prefab/serialized references affected.
- Pattern used, problem solved and simpler alternative considered.

Also provide a dependency/event-flow diagram in text when three or more components interact.

## OOP rules

- Encapsulate mutable state; expose intention-revealing operations instead of public writable fields.
- Keep invariants inside the owning type.
- Prefer composition over deep inheritance. Inheritance requires a genuine is-a relationship and substitutability.
- Separate Data, domain/gameplay Logic and Unity View/Adapter code.
- Keep methods cohesive and small enough that their side effects are evident.
- Avoid static mutable state except the explicitly approved Service Locator/bootstrap boundary.

## SOLID review

- **SRP:** identify the one reason each class changes. Split input, rules, presentation, persistence and Luna reporting when they change independently.
- **OCP:** use extension points only where variants are real. Do not add speculative plugin architectures.
- **LSP:** derived implementations preserve contracts, valid inputs, outputs and side effects. Do not hide unsupported behavior with exceptions.
- **ISP:** interfaces are capability-focused; consumers do not depend on unused members.
- **DIP:** gameplay policy depends on small abstractions at real boundaries; Unity adapters implement them. Inject dependencies through approved constructors, initialization methods or serialized references.

## Pattern selection guide

Patterns are tools, not mandatory decorations. Use only when its trigger is present:

- **Service Locator:** approved project-wide access to `LunaController` and a small set of stable services. Registration happens during bootstrap; missing services fail clearly. Do not use it for arbitrary scene objects.
- **Facade:** `LunaController` exposes a narrow Luna event API while hiding SDK details.
- **Observer/Event:** multiple independent consumers respond to state change. Define subscription ownership and unsubscribe deterministically.
- **State:** behavior changes by a finite game/tutorial state and conditionals are becoming coupled. State transitions must be explicit.
- **Strategy:** one behavior has approved interchangeable algorithms, such as targeting or scoring variants.
- **Command:** actions need queueing, undo, replay or input-to-action decoupling. Do not use for simple direct calls.
- **Factory:** construction varies or needs dependency assembly. Do not wrap a single trivial `new`/Instantiate without benefit.
- **Object Pool:** measured repeated allocation/instantiation causes runtime pressure. Define reset contract and capacity.
- **Adapter:** isolate Luna SDK, legacy code, third-party API or Blender/Unity data differences.
- **Repository:** only when data access/storage is a meaningful boundary; avoid for transient scene state.
- **Template Method:** stable algorithm skeleton with safe controlled variation; prefer composition if subclasses would become coupled.

For every chosen pattern, record why a direct solution is insufficient. Reject patterns that increase script size, generic instantiations or runtime overhead without measured benefit.

## Required Luna game shape

- `LunaController`: facade for Luna lifecycle/events and approved SDK calls.
- Service registration/bootstrap: explicit initialization order.
- Outcome flow: include only user-approved Win, Lose, EndCard and CTA paths. Keep each approved outcome in a separate handler/service/state transition; a direct EndCard flow must not gain artificial Win/Lose states.
- Scenario classes consume the approved facade/service contract; they do not duplicate SDK calls.
- Tutorial controller/state exists only as required by the project scenario and remains separate from core gameplay rules.
