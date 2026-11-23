# Plan — PetRescue feedback round 2

Status: APPROVED WITH AMENDMENTS (2026-11-23) — see "Approved decisions" below; they override conflicting sections.

## 0. Architecture summary
- No physics engine. All movement stays kinematic and analytic, like the current code. This avoids Luna physics risk.
- One new **query object** answers "how high is the ground here, and is this spot blocked?" for the hero and the pets. That keeps terrain and wall knowledge out of the motor, the followers and the flow.
- Every new class has a single job. No interfaces, events, service registration or new patterns: each new class has exactly one consumer, so an abstraction would solve no problem. The existing `RescueServices`/`LunaController` stay untouched.

| Class | New/Existing | Responsibility | Public API |
|---|---|---|---|
| `RescueCourse` | **New** MonoBehaviour on `World` | Heightfield over the road tiles plus registered walls. Pure queries. | `float HeightAt(float x, float z)`; `bool IsBlocked(float x, float z, float feetY, float radius)`; `int TileIndex(float x, float z)` (−1 outside the road); `Transform Tile(int index)` |
| `RescueCrater` | **New** MonoBehaviour on each `TNT n` | Owns that TNT's precomputed crater footprint (tile indices plus depth tier) and lowers the tiles once. Overlapping craters only ever lower, never raise. | `void Open()`; `bool IsOpen` |
| `RescueWallObstacle` | **New** MonoBehaviour per wall | Box footprint in XZ (center plus half-extents) and height. | `bool Overlaps(float x, float z, float radius)`; `float Top` |
| `RescueTntHazard` | Existing | Also calls `_crater.Open()` inside `Explode()` (optional serialized ref). | unchanged |
| `RescueHeroMotor` | Existing | Adds vertical state (y, vy, gravity), per-axis slide against `RescueCourse`, and a jump. | `Advance(float dt, float delta, RescueCourse course)`; `bool TryJump(RescueCourse course)`; `bool InPit {get;}`; `bool Airborne {get;}` |
| `RescuePetFollower` | Existing | Per-axis slide against walls, a visual hop over lowered tiles, and a 0.4 s "unstick" so a pet never gets lost behind a wall. | `Advance(float dt, bool heroInPit, RescueCourse course)` |
| `RescuePointerInput` | Existing | Also reports one swipe-up per upward stroke. | `Sample(out bool pressed, out float delta, out bool swipeUp)`; `ProcessContact(..., float viewportWidth, float viewportHeight, out pressed, out delta, out swipeUp)` |
| `RescueGameFlow` | Existing | Wires the jump, the pit-hint timer and the course into `Advance`. No change to rules or outcomes. | unchanged public surface |
| `RescueTutorialView` | Existing | Adds a jump hint mode: the hand moves vertically, the prompt reads "SWIPE UP!" and the goal hint is hidden. | `ShowJump()`; `HideJump()` |
| `RescueCameraFollow` | Existing | Look offset is serialized. Focus Y follows half of the hero's Y so the pit stays framed. | unchanged |
| `RescueHudView` | Existing | The 110-unit compensation applies in **both** orientations. Landscape gets a small top margin. | unchanged |
| `RescueAudioView` | Existing | Adds `PlayJump()` and `PlayLand()` using existing clips (D6-A). | +2 methods |
| `RescueSceneBuilder` (Editor) | Existing | New menu `PetRescue/Patch Round 2` (idempotent, narrow). The full `Build` gets the same steps so a future rebuild stays consistent, but it is **not run**. | menu only |

## 1. Landscape text (F1)
`RescueHudView.ApplyScreenLayout`:
- `shift = Vector2.down * 110` in every orientation (today: portrait only). This cancels the +112 authored on the three top labels.
- Landscape inset = `max(0, height - safeArea.yMax) + height * .02f`. Portrait keeps `.035f`.
- Result at 960x540: counter/timer at about 1026–1102 → about 916–992 after the inset; prompt at about 855–952 → about 745–842. No overlap and nothing off-screen.
- No scene change is needed: the offsets are applied at runtime in `LateUpdate`.

## 2. Crater + swipe-up jump (F2)

### 2.1 Geometry, computed by the patch menu and serialized
- For each TNT at (tx, tz): take the tiles whose centers fall inside the ellipse rx = 2.6, rz = 2.2 (clipped to the 6-column road) and add ±0.4 per-tile jagged noise from a fixed seed, so the result is deterministic.
- Depth tier by normalized distance d: d < .45 → 1.5 m; d < .75 → 1.0 m; otherwise 0.5 m. That gives 3 terraces, with **stone (`Pit.mat`) at the 1.5 m floor and dirt on the upper terraces**, as in the demo.
- About 14–20 tiles per crater. The far-rim length is about 4.4 m, which a jump from the far rim can clear.
- `Open()` lowers `Tile.position.y = min(current, -depth)` and swaps the `Grass` child's material to Dirt or Pit. The existing `Earth` children of the neighboring tiles form the crater walls.
- Road edges: if an edge tile is lowered and you can see into the void, the existing `RoadEarthWall` mesh is re-added below each road edge (one per side, Dirt material). The screenshot check decides whether this is needed, because `Bank block` may already cover it.

### 2.2 Hero vertical model (`RescueHeroMotor`)
- Gravity −22 m/s². `y` lands on `course.HeightAt(x, z)`.
- **Step-up rule:** a horizontal move into a tile whose top is higher than `feetY + 0.25` is blocked on that axis (per-axis slide). Inside a crater the hero can therefore steer and fall deeper, but cannot walk out: forward motion stops at the far rim. The same rule blocks walls (`IsBlocked`).
- `InPit` = grounded and `y < -0.25`.
- `TryJump` succeeds only if `InPit && grounded` (D1-A). It sets `vy = 9.5`, which gives an apex about 0.55 m above the road from the 1.5 m floor. Forward speed and steering continue in the air, so a jump from the far rim lands on the road.
- Hero hit radius 0.3. The Animator keeps `Running` throughout. Any extra jump animation is out of scope.

### 2.3 Flow (`RescueGameFlow.Advance`)
```
Sample(pressed, delta, swipeUp)
if swipeUp && hero.TryJump(course): tutorial.HideJump(); audio.PlayJump(); pitTime = 0
hero.Advance(dt, delta, course)          // falls, slides and lands; reports a landing → audio.PlayLand()
pitTime = hero.InPit ? pitTime + dt : 0
if pitTime >= .6 && !jumpHintVisible: tutorial.ShowJump()
TNT sweep (unchanged 2D test; skipped while the hero is in a pit, because opened TNTs are disarmed anyway)
for each pet: pets[i].Advance(dt, hero.InPit, course)  → existing TNT sweep, gate rescue
Detonate(...) → hazard.Explode() → crater.Open()        // if the hero is standing there, they fall on the next frame
```
- Pets use the existing `heroRecovering` pause while the hero is in the pit (D3-A). When they resume, they hop over the lowered tiles (visual y arc of up to 0.5 m). No new loss rule.
- `RescueRules`, the timers, Win/Lose/EndTime and the store flow are **unchanged**.

### 2.4 Input (`RescuePointerInput`)
- Track `_anchorY` for each held contact.
- `swipeUp` fires once when `(y - _anchorY) / viewportHeight >= .06` and the vertical travel since the anchor is larger than the horizontal travel. After it fires, or whenever the finger moves down, `_anchorY` resets to the current y.
- A finger already held for steering can therefore flick up without releasing. Mouse and touch both work through the same path. Old Input Manager only.

### 2.5 Tutorial (`RescueTutorialView`)
- `ShowJump()`: activate the group, hide the goal hint and the ← → arrows, set the prompt to "SWIPE UP!" (same pulse), and move the hand along y (0 → +90) instead of x.
- `HideJump()` restores the hidden state.
- New `[SerializeField] GameObject _goalHint`, bound by the patch. Per your preference, fields are declared `[SerializeField]` only and you arrange the tabs yourself.

## 3. Walls (F3, D4-A, D5-A)
- `Walls` root object with 10 children `Wall n`. Each child holds `RescueWallObstacle` (half-extents x = 0.5·width, z = 0.5, height 2) and stacked unit cubes (1 block = 1 cube) using the new `Materials/Cobblestone.mat`.
- Cobblestone.mat: **Unlit/Texture**, texture copied from the vanilla pack into `PetRescue/Textures/cobblestone.png` (16x16, point filter, no mipmaps; about 0.5 KB).
- No colliders.

Proposed layout (x = tile centers, all 2 high):

| Wall | z | x tiles | Free corridor (accounting for TNT hit radius .65 and hero radius .3) |
|---|---|---|---|
| 1 | 6.5 | 0.5 | both sides ≥ 2 m |
| 2 | 9.5 | -1.5 | right ≥ 3 m |
| 3 | 15.5 | -0.5, 0.5 | sides 2 m each |
| 4 | 22.5 | 1.5 | left ≥ 3 m |
| 5 | 29.5 | -0.5 | sides ≥ 2 m |
| 6 | 36.5 | -2.5, -1.5 | right ≥ 3 m |
| 7 | 43.5 | 1.5, 2.5 | left ≥ 3 m |
| 8 | 50.5 | -0.5, 0.5 | sides 2 m |
| 9 | 56.5 | 1.5 | left ≥ 2 m |
| 10 | 3.5 | -2.5 | right ≥ 4 m (the gate zone z ≥ 60 stays clear) |

- Every wall stays at least 2.5 m away in z from every TNT, so a TNT and a wall never form a closed band. An EditMode test enforces a ≥ 1.6 m corridor for every z-slice.
- Hero: blocked by `IsBlocked` with per-axis slide, so they slide along the wall's side while steering.
- Pets: same slide. If a pet stays blocked for more than 0.4 s, walls are ignored for that pet until it clears, so it never gets stuck behind.

## 4. Camera and pets (F4, D7-A)
- `RescueCameraFollow`: new `[SerializeField] Vector3 _lookOffset` (default (0, 0, 2.0)). Scene `_offset` = (0, 4.2, -3.6). Camera FOV 50. The portrait extra factor 2 is kept.
- Focus y = `hero.y * .5` (smooth), so the pit stays framed.
- Pet `_offset` values are scaled ×0.7 (rear pet z -2.0) and the separation stays at 0.55 m. Pet scale is unchanged (D7-B would multiply it by 1.25).
- These are starting values. They get tuned with screenshots at 540x960, 1080x2340 and 960x540 until the rear pets are fully in frame and visibly larger than today, and the final numbers go in the report.

## 5. Files

Modified:
- `Scripts/RescueHudView.cs`, `RescuePointerInput.cs`, `RescueHeroMotor.cs`, `RescuePetFollower.cs`, `RescueTntHazard.cs`, `RescueGameFlow.cs`, `RescueTutorialView.cs`, `RescueCameraFollow.cs`, `RescueAudioView.cs`
- `Editor/RescueSceneBuilder.cs` (Patch Round 2 menu plus mirrored steps in Build)
- `Tests/Editor/RescueInputTests.cs`, `RescueSceneTests.cs`
- `Scenes/PetRescue.unity` (by the patch menu only)

New:
- `Scripts/RescueCourse.cs`, `Scripts/RescueCrater.cs`, `Scripts/RescueWallObstacle.cs`
- `Textures/cobblestone.png` (+ meta)
- `Materials/Cobblestone.mat`

Scene patch (idempotent; never touches Canvas children or the hand-tuned UI layout):
- `World` += `RescueCourse` (tiles array in row-major order, walls array)
- each `TNT n` += `RescueCrater` (indices, depths, Dirt/Pit materials) and hazard `_crater`
- `Walls` root
- `RescueFlow._course`
- Main Camera offset, look offset and FOV
- pet `_offset` values
- `Canvas.RescueTutorialView._goalHint` (reference only)
- The TNT prefab is not changed: scene TNTs are not prefab instances.

## 6. Task order
1. `RescueCourse`, `RescueWallObstacle`, `RescueCrater` plus pure-logic tests.
2. Input swipe-up plus tests.
3. Hero motor vertical model, then pet follower slide/hop.
4. Hazard → crater hook; flow wiring; tutorial jump hint; audio cues.
5. HUD landscape fix.
6. Camera fields.
7. Patch menu, run it once, save the scene. Builder mirror.
8. Compile, Console, EditMode tests, screenshots, Play Mode diagnostics, report.

## 7. Verification
EditMode (new or updated):
- HUD: at 960x540 and 540x960, the top labels' screen rects are inside the canvas and do not intersect each other.
- Input: an upward stroke ≥ 6 % fires exactly once; a diagonal mostly-horizontal drag does not fire; a downward move re-arms; a secondary finger cannot fire.
- Course: `HeightAt` returns the tile y; positions off the road return 0; `IsBlocked` returns true for a wall footprint plus radius and for a step-up above 0.25.
- Crater: `Open` lowers 14–20 tiles with all 3 tiers and Pit at the floor; an overlapping open never raises; a second `Open` does nothing.
- Hero: falls into an opened crater, cannot exit forward without a jump, `TryJump` is refused on the road (D1-A), and a jump from the far rim lands at y = 0 with forward speed preserved.
- Walls: the hero is blocked in z and slides in x; pets unstick within 0.5 s; the corridor test (≥ 1.6 m) passes for every z-slice of the course.
- Camera: serialized offset, look offset and FOV equal the approved values.
- Existing tests updated **only** where the approved behavior changes them: `TntExplosionLeavesEveryTerrainColumnAndMaterialUnchanged` is inverted to a crater test; `CameraUsesHalfDistance…` gets the new values; the pet-offset assertion `z < -2` is adjusted. The 2 pre-existing material failures stay reported as pre-existing, not "fixed".

Play Mode / visual:
- Screenshots in portrait (540x960) and landscape (960x540), checked visually for: the top UI, a crater with terraces and stone floor, the walls, pet size before and after, and the jump hint.
- Diagnostic run: hero triggers TNT → falls → hint after 0.6 s → simulated swipe-up → lands beyond the rim. Console errors 0.

Luna / budget:
- No physics, no new package, no custom shader; Unlit/Texture only. DOTween already present.
- New bytes are about 0.5 KB texture plus 1 material plus about 6 KB of code. Scene size grows by about 10 walls × 2–4 cubes plus serialized crater arrays (record the .unity size before and after).
- A full Luna export or size measurement is **not** part of this plan unless you ask. luna.json scene selection is still pending from earlier work.

## 8. Risks
- 1 m tile resolution means crater edges look blocky. That matches the Minecraft style of the demo.
- If the hero jumps from the middle of the crater, they land back inside and need another swipe. This is intended under D2-A.
- The game is 15 s long and the hero only reaches about z 52 (already accepted earlier). Walls and pits cost extra time, so fewer pets reach the gate. That is consistent with the feedback, but tell me if you want easier timing.

## Approved decisions (user, 2026-11-23) — override the sections above
- D1: Swipe-up jump only while sunk in a crater. While in the pit the SWIPE UP tutorial is shown (immediately, no 0.6 s delay).
- D2: Stuck in pit = hero stands still (no forward, no steering, Running=false); game timer keeps running.
- D3: Pets keep following the player. They wait while the hero is stuck; when the hero jumps, every following pet jumps too (same arc). Pets follow terrain height (drop into the crater behind the hero) and are never lost to craters.
- D4: Touching a wall without steering away blocks forward movement (hero can still steer sideways to slide off).
- D5: Wall count/placement random: generated by the patch with a random seed, then baked into the scene (so it is editable), validated against TNT clearance and a >= 1.6 m free corridor.
- D6: Existing project clips converted: `Assets/Sound/jump.wav` -> `Audio/Jump.ogg` (4.8 KB), `Assets/_Playable_/Sound/Xmas/sfx_land_poof.wav` -> `Audio/Land.ogg` (6.6 KB), mono 22050 Hz.
- D7: Recommended camera/pet formation values (tuned with screenshots).
- D8: Apply directly to the current PetRescue scene (narrow patch, no rebuild, Canvas layout untouched).
