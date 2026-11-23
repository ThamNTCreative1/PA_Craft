# Shape — PetRescue feedback round 2

Status: APPROVED WITH AMENDMENTS (2026-11-23)
Scene: `Assets/_Playable_/Scenes/PetRescue.unity` · Code: `Assets/_Playable_/PetRescue/`
Reference demo: `C:/Users/Admin/Downloads/Ghi Màn hình 2026-11-13 lúc 10.11.34.mp4` (2938x1554, 16 s, portrait game captured in a desktop browser)

> No Codex `research.md` exists for this request. Claude collected the findings below directly from the source, the live scene (Unity MCP, read-only) and frames extracted from the demo video. If you want Codex research first, say so before approving.

## User feedback (verbatim)
1. Text bị đè khi xoay màn ngang (screenshot: "LEAD THE HERD" pressed against the top edge in landscape).
2. Khi bị nổ TNT thì thụt hố, user vuốt lên để nhảy.
3. Tăng vật cản (bức tường) như video demo.
4. Nâng cam lên cao và gần hơn, zoom gần thú đi sau to hơn.

## Findings

### F1 — Landscape text overlap (root cause confirmed)
- In the live scene, `Top UI/Rescue count`, `Countdown` and `Prompt` all have `anchoredPosition.y = +112`.
- `RescueHudView.ApplyScreenLayout` cancels that +112 with `shift = down*110` **only in portrait**. In landscape the shift is `0`.
- Canvas: reference 1080x1920, match 0.5. At 960x540 the canvas is about 1920x1080 units, so:
  - Counter/timer (anchors .90–.97, +112) end up at y ≈ 1084–1160, which is **above the screen top**, so they are clipped or invisible.
  - Prompt (anchors .79–.88, +112) ends up at y ≈ 965–1062, against the top edge where the counter row should be. This matches the screenshot.

### F2 — Crater and jump
- The crater was implemented earlier (`demo-stepped-crater-amendment.md`) and later **removed** by the user's own request (`half-speed-close-camera-audio-amendment.md`: "stop creating craters"). This request brings the crater back, this time with a **manual swipe-up jump** instead of the old automatic recovery.
- `Assets/_Playable_/PetRescue/` is untracked in git, so the old crater code cannot be restored from git. It must be re-implemented. Reusable pieces still in the project:
  - Road tiles `World/Tile x z` (6 columns, x = -2.5…2.5, 1 m grid, each with `Grass` + `Earth` children).
  - Mesh `Meshes/RoadEarthWall.asset`.
  - `Materials/Pit.mat` and `Materials/Dirt.mat`.
- `RescuePetFollower.Advance(dt, heroRecovering)` already supports pausing pets. `RescueGameFlow` currently always passes `false`.
- `RescuePointerInput` reports horizontal delta only. It has no vertical gesture.
- Demo frames at 2–6 s: a wide, jagged crater with dirt terraces and a stone floor. The hero runs inside it and climbs out further ahead.

### F3 — Walls
- The scene has no lane obstacles. The only obstacles are 9 TNT (z = 12, 19, 26, 33, 40, 47, 54, 59, 62). `Pillar block`/`Pillar cap` objects belong to the gate and roadside decoration.
- Demo frames at 7–10 s: gray **cobblestone pillars**, 1 block wide and 2 blocks tall, sometimes 2 side by side. They stand in the lane between TNTs and the hero has to steer around them.
- A cobblestone texture already exists: `Assets/Texture/vanilla-1.21.4/assets/minecraft/textures/block/cobblestone.png`, the same vanilla pack the existing block textures come from.

### F4 — Camera and pets
- Camera offset is (0, 3, -4.5), FOV 55, look-at = focus + (0, .8, 1.5). In portrait the camera also moves up and back by `max(0, .65 - aspect) * 2`.
- Pets trail up to 3.2 m behind the hero (offsets z -0.85…-2.85). Their height is 0.5–0.7 m, with scale normalized by the builder.
- Moving the camera closer with no other change would put the rear pets under or behind the camera's view. "Closer + pets bigger" therefore needs a matching change to formation, pitch or pet scale.

## Scope
In scope: the four items above, limited to the PetRescue scene, scripts, editor patch utility and tests.
Out of scope: timers and durations, outcome/store flow, audio cue set (except one optional jump/fall cue, see D6), the pending material-compatibility proposals, the Luna export and luna.json scene selection.

## Decisions needed from you (recommended option first)

| # | Decision | Options |
|---|---|---|
| D1 | When can the hero jump? | **A (rec.) Only when in a crater.** Swipe-up elsewhere is ignored, so steering never triggers an accidental jump. · B: Any time; jumping also clears TNT and walls, which makes the game easier. |
| D2 | What happens in the crater before the player swipes up? | **A (rec.)** Hero drops to the floor (about 1.5 m) and can steer, but forward movement stops at the far rim. A "SWIPE UP" hint appears after 0.6 s. The game timer keeps running, so the wasted time is the penalty. · B: Same, plus an automatic climb-out after N s if the player never swipes. · C: Hero keeps moving forward inside the crater and the swipe only shortens the time spent there. |
| D3 | Pets around a crater | **A (rec.)** Pets pause at the rim while the hero is in the pit (existing `heroRecovering` path), then hop over the crater with a visual-only arc. No pet is lost to craters. · B: A pet that walks into a crater is lost. Harsher, and it adds a new loss rule. |
| D4 | What happens when the hero or a pet hits a wall? | **A (rec.)** Walls are solid. Hero and pets slide along them, and the hero's forward motion is blocked until they steer around. No pet loss. · B: Hitting a wall loses the nearest pet. · C: Hitting a wall briefly stuns the hero (0.4 s). |
| D5 | Wall count and layout | **A (rec.)** 10 cobblestone pillar groups (1- or 2-wide, 2 high) placed between TNTs, always leaving a gap of at least 1.6 m (see plan §4). · B: Fewer (6). · C: You give the positions. |
| D6 | Fall and jump sound | **A (rec.)** Reuse an existing clip (Step1 at a higher pitch for the jump, Start for the landing). No new assets. · B: No sound. · C: Copy new clips from the vanilla pack (adds bytes). |
| D7 | Camera and "pets look bigger" | **A (rec.)** Camera offset (0, 4.2, -3.6), steeper look-at (0, 0, 2.0), FOV 50, pet formation pulled in about 30% (rear pet at -2.0 instead of -2.85). No change to pet scale. · B: A + pet scale ×1.25. · C: Camera only, values tuned by you in Play Mode. Final numbers are confirmed with portrait and landscape screenshots before handoff. |
| D8 | Applying the scene change | **A (rec.)** A narrow editor menu `PetRescue/Patch Round 2` that only adds crater data to TNTs, a `Walls` root, camera values and Top UI offsets, and never rebuilds the scene or touches hand-tuned UI (see memory rule). The full builder is updated so a future rebuild stays consistent, but it is not run. · B: One-off MCP `execute_code` patch with no menu. |
