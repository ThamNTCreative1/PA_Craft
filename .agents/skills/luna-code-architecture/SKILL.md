---
name: luna-code-architecture
description: Design or review Unity/Luna C# architecture with pragmatic OOP, SOLID and justified design patterns. Use when proposing classes, interfaces, dependencies, events or refactors.
---

# Luna Code Architecture

Do not implement before the user approves the exact class/file design.

## Required design record

For every type specify path, responsibility, public API, state ownership, dependencies/injection, lifecycle, events, Unity references and tests. For every interface/base class/pattern, name the concrete problem and the simpler alternative considered.

## Rules

- Encapsulate mutable state and invariants; prefer intention-revealing methods.
- Separate Data, gameplay/domain Logic and Unity View/Adapter.
- Prefer composition; inheritance requires a true is-a relationship and Liskov substitutability.
- Apply SRP, OCP, LSP, ISP and DIP without speculative abstraction.
- Do not create an interface for one stable implementation unless it establishes a real boundary, enables testing or an approved variant exists.
- Dependencies are explicit through constructors, initialization or `[SerializeField]`; avoid runtime lookup.
- Static mutable state is prohibited except the approved bootstrap/Service Locator boundary.

## Pattern triggers

- Service Locator: only `LunaController` and a small approved stable service set.
- Facade: isolate Luna SDK behind `LunaController`.
- Observer: multiple independent listeners; define subscription lifetime.
- State: finite gameplay/tutorial phases with explicit transitions.
- Strategy: approved interchangeable algorithms.
- Command: only for queue/replay/undo or input-action decoupling.
- Factory: variable construction/dependency assembly.
- Object Pool: measured allocation/instantiation pressure and an explicit reset contract.
- Adapter: Luna SDK, third-party or legacy boundary.

Reject a pattern if a direct solution is clearer or the pattern increases IL2CPP size/runtime cost without benefit. Plan only the approved outcome flows (Win/Lose/EndCard/CTA as applicable), keep their responsibilities separate, and show the event/dependency flow before approval.
