# Paintball yaw correction
Authorization: User requested implementation after the diagnosis: "hay sua di cho toi" (2026-10-12).
Scope presented before editing: two existing classes below; no new class/interface, serialized reference, scene, prefab, package or rendering change.

- PlayerController (Assets/_Playable_/Scripts/Controller/PlayerController.cs): own an independent aiming yaw request. Add SetAimYaw(float) and StopAiming(); FixedUpdate prioritizes aim yaw, then existing camera-follow yaw, then travel heading. Existing camera API only controls its own request. No new dependency/event/pattern.
- PlayerPaintballController (Assets/_Playable_/Scripts/Paintball/PlayerPaintballController.cs): use aim request API with existing aim predicate; clear own request on pause, unequip and inactive player. Dependencies remain serialized player/camera references.
- CameraController continues its existing first/third-person request behavior.
Flow: fire state -> paintball aim request -> player physics rotation; camera view -> separate camera request -> same player physics rotation.
Direct fields/methods suffice; no speculative abstraction.

Verification: Unity compile and Console; in-memory regression check exercising real components with both callback orders and actual Rigidbody heading, aim release, first-person fallback, pause and unequip. Review patch/prohibited APIs. Fresh Luna runtime/build verification if available; otherwise report explicitly unverified. Preserve pre-existing uncommitted work; do not save scenes during checks.
