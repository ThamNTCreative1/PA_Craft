# Shape
Status: APPROVED V2.2 - LIGHTING EXTENSION PENDING
Restore source material identity and visual bindings for the four linked animal/TNT prefabs. Add textured Minecraft ground/soil/wood/leaves to match the supplied appearance reference. Timer/TNT/goal rules remain unchanged; user explicitly requests exactly three pets and close irregular follow. Keep the current hero pending a specific replacement source; do not infer copying screenshot UI.
Architecture: no new runtime class, interface, service or pattern. Existing Editor builder remaps original visual dependencies and creates scene geometry. Existing tests validate source identity and gameplay invariants. Source project read-only; no source gameplay logic reuse.
Main tradeoff: exact source material preservation requires importing the original custom shaders, versus the previous forced-Unlit policy. The plan explicitly lists this exception; if Luna cannot support the originals, stop and ask instead of changing them.

User addition incorporated into pending plan v2.1: twelve surrounding trees plus six decorative stone pillars, using original stone-brick/mossy-stone-brick textures. All scenery remains outside the road, has no collision, and must preserve camera readability.

Confirmed amendment: one pet per species, close smooth wandering, not rows. Actual implementation blocker: original Duck/Rabbit shader requires a scene ambient uniform. See lighting-proposal.md; new rendering adapter is pending and not implemented.
