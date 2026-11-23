# Standards — PetRescue feedback round 2

Status: APPROVED WITH AMENDMENTS (2026-11-23)

- **Governance:** nothing is implemented before you explicitly approve. Any change to scope, a class or a pattern goes back to you first.
- **Architecture:** each class has one responsibility (see the plan table). Dependencies are concrete and serialized, and wired by the patch menu. No new interface, event bus, singleton or service is added, because each new type has exactly one consumer. `LunaController` and `RescueServices` stay untouched.
- **Luna runtime:**
  - No `Physics`/`Rigidbody`/`Collider` gameplay; analytic math only.
  - Old Input Manager only (`Input.touches` / `Input.GetMouseButton`).
  - No LINQ or reflection in runtime code, and no per-frame allocations.
  - No `async`/`System.Threading`.
- **Rendering:** Built-in pipeline. New material is Unlit/Texture. No custom shader. Textures use point filter, no mipmaps, and the smallest size that works.
- **Scene safety:** never run the full scene builder. Use only the idempotent `PetRescue/Patch Round 2` menu, which does not touch Canvas layout or hand-tuned UI.
- **Fields:** `[SerializeField] private` only. You arrange `[TabGroup]` tabs yourself.
- **Tests:** EditMode tests cover the new rules (input, course, crater, hero jump, walls, HUD layout). Existing tests change only where the approved behavior changes them, and every such change is listed in the report.
- **Verification evidence:** compile, Console errors = 0, test job id plus pass/fail counts, portrait and landscape screenshots, and Play Mode diagnostics. Anything not verified is stated explicitly (Luna export, device, size).
- **Budget:** record the scene file size and new asset bytes before and after. Overall target is under 4.5 MB (no full build measurement unless you ask).
