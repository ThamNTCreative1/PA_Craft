# Plan — Pet Attract (cr1)

Status: **APPROVED (2026-11-23)** — D1 (a) endcard only, store on button tap; D2–D6 as recommended; D7 accepted; global 30 s End Time → store kept unchanged; work stays on current branch UAC_V87.
Scene: `Assets/_Playable_/Scenes/PetRescue.unity` (modified in place, per A1)
Namespace: `Playable.PetRescue`, folder `Assets/_Playable_/PetRescue/`

## 1. Outcome flow (approved shape: gameplay → Win(store now) | TimeUp(endcard))

```
Load ─► Waiting (tutorial: DRAG TO MOVE, timer frozen)
          │ first press
          ▼
       Running (15 s) ──5th heart──► Won:  StopGameplay → audio win → Luna.NotifyWin → Luna.OpenStore (non-gesture, once)
          │                                        → Endcard.Show(won:true)  [button → OpenStoreFromGesture]
          └──timer = 0──────────────► Lost: StopGameplay → audio lose → Luna.NotifyLose
                                                   → Endcard.Show(won:false) [button → OpenStoreFromGesture; auto-store per D1]
Global End Time (30 s, Playground) ─► unchanged: NotifyEndGame → OpenStoreAtEndTime
```

Guard: `RescueRules` keeps phase transitions one-way (`Waiting→Running→Won|Lost`), and an exact deadline wins over goal (existing tested behavior). `_presented` blocks a double outcome.

## 2. Class list

### 2.1 Unchanged

| Class | File | Why unchanged |
|---|---|---|
| `LunaController` | `Scripts/LunaController.cs` | `NotifyWin/NotifyLose/NotifyEndGame/OpenStore/OpenStoreFromGesture/OpenStoreAtEndTime` already cover the flow. |
| `RescueServices` | `Scripts/RescueServices.cs` | Existing typed locator; no new service. |
| `RescueRules` | `Scripts/RescueRules.cs` | `RescuePet(id)` = collect a pet once; `_required` is set to **5** via `RescueGameFlow` serialized field; `_duration` stays 15. `LosePet` becomes unused (kept, tested, 8 lines). |
| `RescueWallObstacle` | `Scripts/RescueWallObstacle.cs` | Box blocker reused for tree trunks and border walls. |

### 2.2 Modified

| Class | File | New responsibility | Public interaction |
|---|---|---|---|
| `RescuePointerInput` | `Scripts/RescuePointerInput.cs` | Floating joystick on the old Input Manager. Press anywhere sets the anchor, and the drag offset becomes a stick vector clamped to length 1. The radius is 9% of `min(screenW,screenH)`. If the finger goes past the radius, the anchor is dragged along. Keeps the existing touch/mouse handoff and secondary-finger rules. **Swipe-up removed.** | `Initialize(ctaRect)`, `Sample(out bool pressed, out bool held, out Vector2 stick, out Vector2 anchorScreen)`, `Cancel()` |
| `RescueHeroMotor` | `Scripts/RescueHeroMotor.cs` | Free XZ movement. Camera yaw is fixed, so screen-up = world +Z. Speed 4.5 (Playground field kept). Turns smoothly to face the move direction. Blocked by arena walls and bounds. Idle/Running animator bool. Knockback: 0.25 s push of about 2.5 m away from the blast plus a 0.8 s stun in which input is ignored. **Jump, pit and crater logic removed.** | `Initialize()`, `Move(float dt, Vector2 stick, RescueArena arena)`, `Knockback(Vector3 origin)`, `bool Stunned`, `bool Moving`, `Stop()` |
| `RescueCourse` → **`RescueArena`** | `Scripts/RescueArena.cs` (rename keeps the same `.meta` GUID so scene references survive) | Read-only arena queries: rectangular bounds `[min,max]` in XZ, wall overlap, and `Clamp(position, radius)`. **Tile grid/height removed** (flat ground, y = 0). | `Clamp(Vector3,float)`, `HitsWall(x,z,r)`, `RandomPoint(System.Random, Vector3 near, float range)` |
| `RescuePetFollower` | `Scripts/RescuePetFollower.cs` | Two states. **Wandering**: a seeded random waypoint within `_roamRange` of its home point, walk speed 1.2, idle pause 0.5–1.5 s, separation from other pets, stays inside the arena. **Following** (after collect, D5): trails the hero using the existing follow, separation and turn code. | `Initialize(id, hero, companions, arena, seed)`, `Tick(dt)`, `Collect()`, `bool Collected`, `ScatterFrom(Vector3 origin)`, `Stop()` |
| `RescueTntHazard` | `Scripts/RescueTntHazard.cs` | Same swept hit and explosion VFX. The crater reference and delay are removed. | `HitFraction`, `ContainsBlast`, `Explode`, `TickEffect`, `Armed` (unchanged) |
| `RescueCameraFollow` | `Scripts/RescueCameraFollow.cs` | Follows the hero fully on X and Z with smoothing. Separate portrait and landscape offset+pitch, picked by aspect each frame (landscape: lower and closer, because it is wider). No yaw rotation. | `Initialize(hero)`, `Tick(dt)` |
| `RescueHudView` | `Scripts/RescueHudView.cs` | Top cluster: pet icon + `x/5` + 5 heart slots, and the countdown timer. A slot pops (DOTween punch) when filled. Under 5 s the timer turns red and pulses. Portrait/landscape layout (§6). | `Refresh(int hearts, float remaining)`, `FillSlot(int index)`, `RectTransform SlotRect(int index)`, `ShowToast(string)` |
| `RescueTutorialView` | `Scripts/RescueTutorialView.cs` | Visuals only. Drag hint: ring + hand circling inside it, `DRAG TO MOVE`, subline. Pet pointer: an arrow above the nearest pet that is clamped to the screen edge if the pet is off-screen. TNT warning: a red `!` marker over the TNT plus `AVOID TNT!`. Swipe/jump visuals are removed. | `ShowDrag()`, `HideDrag()`, `ShowPetPointer(Vector3 world)`, `HidePetPointer()`, `ShowTntWarning(Vector3 world)`, `HideTntWarning()`, `Hide()`, `Tick(dt)` |
| `RescueEndcardView` | `Scripts/RescueEndcardView.cs` | Texts only (D2). The green `Install button` object, color and size are untouched. `Show(won)`: when won, the flow has already opened the store and the button stays tappable. Time-up auto-store depends on D1. | `Initialize`, `Show(bool won)` (unchanged signature) |
| `RescueAudioView` | `Scripts/RescueAudioView.cs` | Adds `PlayCollect()` (reuses the `Rescue.ogg` clip) and `PlayHit()` (stun). The jump/land calls are no longer used by the flow, and their clips are kept so the validation stays unchanged. | `PlayCollect()`, `PlayHit()` + existing |
| `RescueGameFlow` | `Scripts/RescueGameFlow.cs` | Orchestrator. Samples input, moves the hero, checks TNT (swept hit), checks proximity collect (hero within `_attractRadius` of a wandering pet → `Rules.RescuePet`), and forwards gameplay events to the tutorial flow and views. Runs the outcome flow in §1. | Serialized refs only; no public API besides `Rules` |

### 2.3 New

| Class | File | Responsibility | Justification |
|---|---|---|---|
| `RescueTutorialFlow` (pure C#) | `Scripts/RescueTutorialFlow.cs` | Small step state machine: `Drag → FindPet → Free`, plus one-shot `TntWarning` and an `IdleReprompt` overlay. Inputs: `OnPress`, `OnMoved(dt)`, `OnIdle(dt)`, `OnPetCollected`, `OnNearTnt(index)`, `OnTntHit(index)`. Output: `Visible` flags the view applies. | The tutorial standard requires a small explicit state machine instead of scattered booleans (the current flow has `_jumpHint/_jumpHintUsed`). Pure C# makes the step timing EditMode-testable. One consumer, so **no interface**. |
| `RescueHeartFeedback` | `Scripts/RescueHeartFeedback.cs` | Collect feedback: shows a `Collected!` toast, plays the world heart burst at the pet (D3), and flies a pooled UI heart (5 instances, no runtime Instantiate) from the pet's screen position to `Hud.SlotRect(i)`. On arrival it calls `Hud.FillSlot(i)`. | Keeps tween/pool logic out of the HUD and the flow (SRP). Pooling avoids per-collect allocations on Luna. |

### 2.4 Removed (D6)

| File | Reason |
|---|---|
| `Scripts/RescueCrater.cs` | No craters in the open field. |
| `Editor/RescueRound2Patch.cs` | Patches runner objects that no longer exist; it would not compile against the new APIs. |
| Runner-only tests in `Tests/Editor/RescueSceneTests.cs` (crater, jump, pit, walls corridor, gate, swipe-up) and `RescueInputTests` swipe-up cases | They test removed behavior. Each removed test is listed in the implementation report. |
| `Editor/RescueSceneBuilder.cs` | Rebuilds the whole runner scene. Per your rule it must never be run again, and it references the removed course API. **Option:** delete it, or strip it to compile-only. Recommended: delete. |

**No new interfaces, events, singletons or service locators.** All dependencies are concrete `[SerializeField] private` refs wired by the patch menu.

## 3. Event flow per frame (`RescueGameFlow.Update`)

1. Advance global end time (unchanged).
2. `_pointer.Sample(...)` → `pressed, held, stick, anchor`.
3. When `Waiting` and pressed → `Rules.Start()`, `_audio.BeginRun()`, `_tutorialFlow.OnPress()`.
4. `Rules.Tick(dt)`.
5. When `Running`:
   1. `_hero.Move(dt, stunned ? zero : stick, _arena)`, and the tutorial flow is told moved/idle.
   2. TNT: swept `HitFraction(prev, now)` → on hit, `Explode()`, `_hero.Knockback(tnt)`, `_audio.PlayExplosion/PlayHit`, wandering pets in the blast `ScatterFrom()`, and `_tutorialFlow.OnTntHit`.
   3. Near armed TNT (≤ 3 m) the first time → `_tutorialFlow.OnNearTnt`.
   4. For each pet: `Tick(dt)`. If not collected and distance(hero, pet) ≤ `_attractRadius` → `Rules.RescuePet(i)` → `pet.Collect()`, `_feedback.Play(i, pet, slot = Rules.Rescued-1)`, `_audio.PlayCollect()`, `_tutorialFlow.OnPetCollected()`.
6. Outcome checks (§1).
7. Camera, HUD `Refresh`, apply the tutorial view state (nearest uncollected pet is computed here, O(6)), and tick the hazard effects.

On Won, the 5th heart's fly-in is still running when gameplay stops. The flow calls `_feedback.Complete()` to snap the slot full before the endcard covers the HUD.

## 4. Tutorial definition (required by the tutorial standard)

| Step | Trigger | Visual | Completion | Wrong input / no input |
|---|---|---|---|---|
| T1 Drag | Scene start (<0.3 s) | Ring + hand circling at bottom center, `DRAG TO MOVE`, subline `Get close to pets to collect hearts!`, gentle title pulse | 0.35 s of cumulative movement with stick magnitude ≥ 0.25 | Tap without drag: hint stays. Timer starts on the first press (existing rule). |
| T2 Find pet | T1 complete | Bouncing arrow over the nearest uncollected pet, or at the screen edge if the pet is off-screen (D4) | First collect, or 4 s timeout | — |
| T3 Collect feedback | Each collect | `Collected!` toast, heart burst, heart flies into the slot, sound | Auto (0.8 s) | — |
| T4 TNT warning (once) | Hero ≤ 3 m from an armed TNT for the first time, or the first TNT hit | Red pulsing `!` over that TNT, `AVOID TNT!` | 1.5 s, or the hero moves > 4 m away | After a hit: knockback + stun show the consequence. |
| T5 Idle re-prompt | Running and no movement for 3 s | T1 hand + ring only (no title) | Next movement | Repeats each time |
| T6 Hurry | Remaining ≤ 5 s | Red pulsing timer + existing warning beep | Outcome | — |

Targets: first prompt < 0.5 s, first successful action (moving) about 1 s, first heart about 2–4 s (pets spawn 3–6 m from the hero, see §5). Tutorial never triggers CTA. The CTA rect gate in `RescuePointerInput` still applies on the endcard.

## 5. Scene / asset changes (idempotent Editor patch `Playable/Pet Rescue/Patch Attract (cr1)`)

New editor file: `Editor/RescueAttractPatch.cs`. It patches the open scene and never rebuilds the Canvas layout or hand-tuned UI (memory rule). It is safe to run twice.

| Change | Detail |
|---|---|
| Remove runner geometry | Delete road tile rows, craters, gate, and corridor walls under the course root. |
| Ground | One `Quad` 40×40 m, `grass_block_top.png` (repeat wrap, point filter), new material `Materials/AttractGround.mat` Unlit/Texture, tiling 40×40. |
| Border | 4 stone-brick wall strips around a 30×30 m arena, built from existing block meshes/materials, each with a `RescueWallObstacle`. |
| Props | Reposition existing trees (trunks get `RescueWallObstacle`) and flowers to frame the arena. Optional water strip reused from the existing scene if present. |
| Hero | At arena center (0,0,0), facing +Z. |
| Pets | **6 existing pets** (Dog, Duck, Fox, Pig, Rabbit, Sheep) — 5 needed, 1 spare. Homes 3–9 m from the hero in a ring, roam range 2.5 m, fixed seeds. |
| TNT | 6–8 existing `TNT.prefab` instances between the hero and the pet homes, crater refs cleared. |
| Arena | `RescueArena` bounds ±14 m, wall list wired. |
| HUD | Counter text `0/5`. Add 5 slot `Image`s (pixel heart sprite, D3) next to the counter. Timer unchanged. |
| Tutorial | Drag ring image + existing hand image. Add pet pointer arrow (reuse existing `>>` arrow sprite) and TNT `!` marker. Remove the `<<`/`>>` swipe arrows from the active layout. |
| Feedback | `RescueHeartFeedback` object with 5 pooled heart `Image`s under the Canvas, `Collected!` toast text. |
| Endcard | Texts only (D2). |
| Flow | `_required = 5`, `_duration = 15`, `_attractRadius = 1.6`. Wire all refs. |

New assets: `Textures/UI/heart_pixel.png` (16×16, about 1 KB), `Textures/UI/joystick_ring.png` (64×64 alpha, about 2 KB), `Materials/AttractGround.mat`. No new models or audio.

## 6. Portrait / landscape UI

| Element | Portrait (1080×1920 ref) | Landscape |
|---|---|---|
| Canvas scaler | Existing scaler, match 0.5 → change to **portrait match width (0), landscape match height (1)** via the existing `Scripts/UI/ResponsiveCanvasScaler.cs` added to the Canvas | same component |
| HUD cluster | Top-left inside the safe area: icon, `x/5`, 5 slots in one row; timer top-center | Top-center row: icon, `x/5`, slots, timer, at 0.85 scale |
| Toast `Collected!` | Below the HUD, top-center | Below the HUD, top-center |
| Drag hint | Bottom center, 24% from the bottom | Bottom center, 18% from the bottom, 0.8 scale |
| Pointer arrow | Clamped to a safe rect inset 10% | same |
| Endcard | Existing `Resize()` (88% width, 76% height caps) | same |
| Camera | Offset (0, 6.5, -6.5), pitch 40°, so the pets around the hero are visible on the narrow screen | Offset (0, 5, -6), pitch 35° |

Layout is applied by `RescueHudView.ApplyScreenLayout(width,height,safeArea)` and `RescueTutorialView` (pure geometry and testable). These are the same mechanisms already used, so no new layout framework.

## 7. Task order

1. Branch check (you are on `UAC_V87`; confirm whether to create a branch first, per git standard).
2. `RescueArena` (rename from `RescueCourse`, same GUID) + tests.
3. `RescuePointerInput` floating stick + tests.
4. `RescueHeroMotor` move/knockback/stun + tests.
5. `RescuePetFollower` wander/follow + tests.
6. `RescueTntHazard` crater removal; delete `RescueCrater`, `RescueRound2Patch`, `RescueSceneBuilder` (D6).
7. `RescueTutorialFlow` + tests.
8. `RescueHudView`, `RescueTutorialView`, `RescueHeartFeedback`, `RescueEndcardView`, `RescueAudioView`.
9. `RescueGameFlow` orchestration.
10. Assets: heart sprite, ring sprite, ground material.
11. `RescueAttractPatch` editor menu → run once on `PetRescue.unity` → save.
12. Update `RescueSceneTests` (scene wiring, HUD 5 slots, layout portrait/landscape, endcard texts, green button).
13. Verification (§8) → implementation report.

## 8. Verification

**EditMode tests (new/updated)**
- Input: drag produces a stick clamped to 1; the anchor follows past the radius; release zeroes the stick; secondary finger is ignored; touch/mouse handoff is kept.
- Hero: moves along the stick direction at speed; is clamped by bounds and walls; knockback pushes away and stun ignores input for 0.8 s; idle when the stick is zero.
- Pet: wander stays within the roam range and the arena (1000 ticks, fixed seed); collect switches to follow; collect is idempotent.
- Rules: 5th collect → Won; the deadline beats the goal at the exact time; the timer waits for the first press (existing).
- Flow (scene preview): collect within the radius only; TNT hit → knockback, no heart change; Won → `OpenStore` requested once, then endcard won texts; Lost → endcard `TIME'S UP!`.
- Tutorial flow: T1 → T2 on movement; T2 → Free on collect or 4 s; T4 fires once; T5 after 3 s idle and clears on move.
- Layout: portrait 1080×1920 and landscape 1920×1080 / 2400×1080 → HUD, toast, drag hint and timer stay on screen without overlap; the green install button keeps its color and size.

**Editor/MCP evidence**: compile, Console errors = 0, test job id with pass/fail counts, Play Mode run, portrait and landscape screenshots (start, tutorial, collect, TNT, win endcard, time-up endcard).

**Luna/runtime**: no Physics, LINQ, reflection or async in runtime code; old Input only; no per-frame allocations; DOTween already in the project.

**Budget**: record scene file size and new asset bytes before and after. Removing the road tile grid should shrink the scene (currently 17.2 MB text YAML). The final < 4.5 MB build check needs a Luna export, which is **not run unless you ask**.

## 9. Open decisions (please answer)

| # | Decision | Options | Recommendation |
|---|---|---|---|
| D1 | Time up (15 s) → auto-open the store too? The current lose endcard auto-calls install once. | (a) Endcard only, store opens on button tap. (b) Keep the current behavior: endcard + auto store once. | **(a)**, which matches your wording "hết thời gian → endcard". The 30 s global End Time still auto-opens the store. |
| D2 | Endcard texts (button stays green) | Win: title `PETS LOVE YOU!`, message `Collect every pet in the full game!`. Time up: title `TIME'S UP!`, message `So close! Collect all the pets in the full game.` Button label: keep `INSTALL NOW`. | As listed; change any text you want. |
| D3 | Heart feedback asset | (a) New 16×16 pixel-heart sprite (UI fly-in) + small UI heart burst, about 1 KB. (b) Reuse `Epic Toon FX/Prefabs/Interactive/Hearts/HeartExplosion.prefab` for the world burst, plus the sprite for the fly-in (adds particle material and texture bytes and must be checked for shader/Luna compatibility). | **(a)** for its tiny size and pixel style matching the video. |
| D4 | Nearest-pet pointer arrow in T2 (not in the video) | (a) Include it (helps in open space). (b) Omit it and rely on pets spawning close. | **(a)** |
| D5 | Pet after collect, and attract radius | (a) Follows the hero (the "thu hút" feel), radius 1.6 m. (b) Stays and does a happy hop, radius 1.6 m. | **(a)** |
| D6 | Delete runner-only files (`RescueCrater.cs`, `RescueRound2Patch.cs`, `RescueSceneBuilder.cs`) and runner tests | (a) Delete. (b) Keep and patch to compile. | **(a)**, since the runner lives on in git history. |
| D7 | Non-gesture `OpenStore` on the 5th heart (A4). Some ad networks block store opening without a user gesture. | Accepted risk (same as the current lose auto-store) — confirm. | Confirm. The endcard button stays as the gesture fallback. |
