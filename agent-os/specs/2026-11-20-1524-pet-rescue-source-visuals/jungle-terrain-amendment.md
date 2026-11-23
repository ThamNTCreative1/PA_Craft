# Jungle border/grass and ground continuation - v2.4
Status: APPROVED BY DIRECT USER REQUEST
User explicitly supplies jungle_door_top.png for the border, jungle_grass_block_side.png for grass, and requests ground beyond the gate.

## Exact implementation scope
Existing Editor/RescueSceneBuilder.cs: import two native PNGs, assign the door texture to the border material Stone.mat (only border surfaces use it), use jungle grass side on GrassSide.mat while keeping green grass on horizontal tops; make border segments repeat per block instead of stretching over the full road; extend road/banks/fences and underlying pit floor from end Z=82 to Z=130 (gate remains Z=65). No gameplay position/timer/goal change.
Existing Materials/Stone.mat: built-in Unlit/Transparent Cutout for the original door alpha, mapped to jungle_door_top; GrassSide.mat remains Unlit/Texture mapped to jungle_grass_block_side. Preserve textures, no baking/tint/repaint. Existing source pet/TNT materials unchanged in intent.
New Textures/Blocks/jungle_door_top.png and jungle_grass_block_side.png (+ metas), copied byte-for-byte from D:/Source/minecraft/Assets/ResourceCache/Resource Packs/vanilla-1.21.4/assets/minecraft/textures/block/.
Existing Scenes/PetRescue.unity: regenerate only while scene is clean, keeping the current three-pet and original-material/scenery configuration. Do not discard unsaved Editor changes. Source asset files are read-only.
Existing Tests/Editor/RescueSceneTests.cs: material pixel/binding verification and continuous ground checks at gate and beyond it. No new runtime class/interface/shader/package.

## Observations
Both supplied PNGs are 16x16 RGBA; door 302 bytes, grass side 466 bytes. The supplied jungle grass side has the same native bytes as the previously used grass_block_side, so the name/source binding changes while its pixels legitimately remain the same. Grass-side image includes soil below its top grass edge: use on vertical block faces, not as a replacement for the green horizontal top.

## Verification
Compile/reload and Console, run scene suite, inspect border UV repetition and continuous ground through/beyond gate in Editor screenshots. Preserve three current pets and gameplay thresholds. Actual Luna size/runtime remain unverified until the separately pending Luna scene-selection correction is approved. Lighting adapter and Sheep/Pig/Fox proposals are still pending; this request does not approve them.

Result: IMPLEMENTED. Editor suite 14/14 passed; active scene saved clean, road extends 65 units past gate. Full PetRescue Luna export remains pending the separately proposed scene configuration fix.
