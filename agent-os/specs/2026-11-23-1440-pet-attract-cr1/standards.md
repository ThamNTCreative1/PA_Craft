# Standards — Pet Attract (cr1)

Status: APPROVED (2026-11-23)

- **Governance:** no code, scene or asset change before your explicit approval. Any change to scope, a class, a pattern or the outcome flow goes back to you first.
- **Architecture (OOP/SOLID):**
  - One responsibility per class (plan §2).
  - Logic that needs no Unity lifecycle is pure C#: `RescueRules` and `RescueTutorialFlow`.
  - Views (`Hud`, `Tutorial`, `HeartFeedback`, `Endcard`, `Audio`) contain no rules.
  - `RescueGameFlow` orchestrates and owns no rendering.
  - Dependencies are concrete `[SerializeField] private` references wired by the patch menu.
  - **Patterns used:** a small state machine (`RescueTutorialFlow`) to replace scattered tutorial booleans, and an object pool (`RescueHeartFeedback`, 5 hearts) to avoid runtime `Instantiate`. The existing typed Service Locator (`RescueServices`) is unchanged.
  - **Not added:** no interface, event bus, singleton or new locator, because each type has exactly one consumer.
- **LunaController:** unchanged. Only `RescueGameFlow` (outcomes, end time) and `RescueEndcardView` (button gesture, through delegates) reach it. No consumer calls the Luna API directly.
- **Luna runtime:**
  - Old Input Manager only.
  - No `Physics`/`Rigidbody`/`Collider` gameplay; analytic distance and box math only.
  - No LINQ, reflection or `async`.
  - No per-frame allocations.
  - No `Find*` or tag lookups.
  - DOTween only for UI tweens, killed on disable.
- **Rendering:** Built-in pipeline, Unlit/Texture materials, no custom shader. Sprites and textures use point filter, no mipmaps, and the smallest size that works.
- **Scene safety:** the scene builder is never run. Only the idempotent `Playable/Pet Rescue/Patch Attract (cr1)` menu edits the scene. It does not touch the Canvas layout of hand-tuned UI beyond the elements listed in plan §5, and the endcard green button is untouched.
- **Fields:** declare `[SerializeField] private` only. You arrange `[TabGroup]` tabs yourself.
- **Tutorial:** follows `luna/tutorial-and-onboarding.md`. The report includes first prompt time, first successful action time and onboarding duration.
- **Tests:** EditMode coverage per plan §8. Every removed or changed existing test is listed in the report.
- **Verification evidence:**
  - Compile result, Console errors = 0, test job id with counts.
  - Portrait and landscape screenshots.
  - Play Mode run.
  - Anything not verified (Luna export, device, final build size) is stated explicitly.
- **Budget:** under the 4.5 MB target. Record the scene file size and new asset bytes before and after.
