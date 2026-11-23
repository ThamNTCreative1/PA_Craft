# Shape — Pet Attract (cr1)

Status: APPROVED (2026-11-23)
Reference: `C:\Users\Admin\Downloads\cr1.mp4` (18 s, portrait gameplay)

## Concept (from user)

The hero stands in a wide open field. The player drags to move. Pets wander around. When the hero gets close to a pet, the pet is collected: hearts pop and one heart is added to the bar. Collect 5 hearts → CTA. TNT blocks are scattered around and must be avoided.

## What the reference video shows (frame analysis)

| Time | Observed |
|---|---|
| 0–2 s | Third-person view behind the hero, open grass field, stone-brick border wall, trees, water strip, TNT blocks, pig/sheep/cow. HUD top-left: pet icon + `0/5` + 5 empty slots + countdown `13`. |
| 3–5 s | Hero reaches a pig → `Collected!` toast at top center, 3D pixel hearts float up from the pet, first slot turns red (`1/5`). Tutorial overlay: hand inside a joystick ring at bottom center, `DRAG TO MOVE`, small line `Tap every pet to collect them all!`. |
| 5–12 s | Free roaming; countdown keeps going; TNT stays on the field. |
| 12–18 s | Time runs out → dark overlay, endcard `TIME'S UP!`, small message, `INSTALL NOW` button. |

Video extras the user **declined**: jump button (bottom right), DOWNLOAD button (top right).

## Approved decisions (user answers 2026-11-23)

| # | Question | Answer |
|---|---|---|
| A1 | Which scene? | **Modify `Assets/_Playable_/Scenes/PetRescue.unity` in place.** The runner gameplay is replaced and stays recoverable only through git history. |
| A2 | TNT consequence | **Explode, knock the hero back and stun for 0.8 s.** No heart is lost. |
| A3 | Jump button / HUD DOWNLOAD button | **Neither.** |
| A4 | 5 hearts → CTA | **Open the store immediately on the 5th heart, then show the endcard.** Time up (15 s) without 5 hearts → endcard `TIME'S UP!`. |
| A5 | Endcard | Keep the current green `Install button` as is; only the texts change. |

## Player journey

1. Scene loads → hero idles in the field, pets wander nearby, TNT visible. Tutorial appears at once: ring + hand loop + `DRAG TO MOVE`. The 15 s timer is frozen until the first touch (existing rule).
2. First drag → timer starts, the drag hint fades out, and an arrow points at the nearest pet with the hint `Get close to pets!`.
3. Hero gets within the attract radius of a pet → `Collected!` toast, hearts burst over the pet, a heart flies to the bar, the slot fills, and a sound plays. The pet then follows the hero.
4. First time the hero comes near an armed TNT → a short `AVOID TNT!` warning marker. Touching TNT → explosion, knockback, 0.8 s stun.
5. No input for 3 s while playing → the drag hint returns until the player drags again.
6. 5th heart → gameplay stops → store opens → endcard (win texts).
7. 15 s elapsed with fewer than 5 hearts → gameplay stops → endcard `TIME'S UP!`. Tapping the green button opens the store.
8. The existing global 30 s `End Time` (Luna Playground field) still ends the game and opens the store, unchanged.

## Out of scope

- Jump, swipe-up, craters, runner road/gate, wall corridors (all removed).
- HUD DOWNLOAD button, restart/replay.
- New 3D models or animations. Existing Hero and the 6 pet prefabs are reused.

## Open decisions (need your answer — see plan.md §9)

D1 time-up auto-store · D2 endcard texts · D3 heart feedback asset · D4 nearest-pet pointer · D5 attract radius and pet behavior after collection · D6 removal of runner scripts/tests.
