# Theme dropdown implementation

## Authorization
User explicitly requested direct implementation: "tri?n khai lu?n ?i" after research. Implemented directly per that instruction; no Claude-authored or user-approved exact implementation plan is claimed.

## Changes
- New Assets/_Playable_/Scripts/UI/TapToBuildThemeSelector.cs (+meta), enum Default=0, Green=1, Red=2; Luna Appearance / Theme field. OnEnable applies the initial value; Update detects changes and Apply assigns serialized sprite references. No interfaces, services, events, runtime object searches, packages or shaders added.
- Gameplay.unity: component on Canvas/Game with explicit Image/sprite bindings. Added inactive FestiveHouseArtwork UI child under HousePanel, showing provided house artwork at alpha 0.2 for festive themes. Default initial value remains 0.
- Imported eleven PNGs (+meta) from supplied ZIP into Assets/_Playable_/UI/TapToBuild: bg_green, bg_red, title_green, title_red, house_panel_festive, house_artwork, top_tools_festive, mat_stone_festive, mat_grass_festive, mat_dirt_festive, mat_more_festive. Sprite imports follow existing UI settings: mipmaps/read-write off, clamp, single sprite, default platform max 1024.
- Green uses green background, red title, yellow house panel and five yellow accent sprites. Red uses red background, green title, same yellow UI. Default restores original sprites and hides extra house artwork.
- End card, gameplay button handling, audio and outcome code unchanged. Existing local changes to luna.json and IDE state preserved. SDK-generated SVC_Luna bookkeeping changes reverted; unrelated Canvas scaler/background scale serialization excluded.

## Evidence
- Unity compile completed; Console error query returned zero entries after changes and after Play Mode checks.
- TapToBuildSceneTests: 5/5 passed after final runtime implementation (job bebdca8c6b174e6391d577c90038c0b9).
- Explicit reference audit: twelve references and fifteen accent array entries non-null; enum exactly Default, Green, Red.
- Play Mode checks drove Update through Default -> Green -> Red -> Default and asserted background, title, house panel, artwork visibility and all five accents: passed.
- Portrait Game View screenshots inspected: green-preview-1.png and red-preview.png. green-preview.png records the intermediate background/title-only version, superseded by green-preview-1.png.
- Returned Editor to stopped mode and persisted Default selection.

## Limitations
- No Luna build performed; Playground dropdown rendering and actual Luna package size under 4.5 MB remain unverified. Eleven new PNG source files total about 4.67 MB; source size is not final compressed build size.
- Landscape visual checks and mouse/touch/store regression were not executed; existing orientation and flow code unchanged and scene wiring tests passed.
- Console warnings included scene culling mask allocation, unsupported WebGL1 InternalErrorShader variants and an MCP duplicate-command notice. Error query remained empty. No custom shaders added by this feature.

## Follow-up: lower festive UI to clear bell
User requested Green/Red gameplay UI to move down slightly. TapToBuildThemeSelector now passes a serialized 0.06 normalized top inset to the serialized OrientationLayout reference. OrientationLayout rebuilds gameplay anchors from the authored portrait/landscape data, reserving 6% at the top and keeping bottom space, so repeated switches cannot accumulate offsets. Default uses zero inset; end-card entries are excluded by hierarchy. Changed two scripts and the existing Gameplay scene selector wiring; no new assets.

Verification: 5/5 TapToBuildSceneTests passed (job 59151916a0174d0fb67f604122050f8a). Play Mode theme cycles confirmed exact Default restoration and no cumulative drift. All nine layout entries checked in both portrait and landscape against expected anchors, including unchanged end-card entries. Inspected green-ui-lowered.png and red-ui-lowered-live.png: bell clear of the top tool row. red-ui-lowered.png was captured while paused/resizing and is superseded by the live capture. Console error query returned zero. Editor returned to stopped mode; scene remains Default. Luna build remains unverified.

## Follow-up: shared house above separate panel backgrounds
User supplied a separate blue.png panel background and requested one house image over both blue/yellow panels. Updated selector to keep existing shared artwork active for every theme; changed serialized default panel reference from composite house_panel.png to user blue.png. Kept yellow house_panel_festive.png, authored house transparency/placement, and a single existing artwork child. Explicit sibling order is background parent -> house -> title. Saved current user scene edits without reloading or replacing their changes.
Play Mode asserted all three themes and restoration: same house sprite active, correct blue/yellow panel, house drawn below title. Inspected shared-house-default.png. Compilation/Console error check: zero errors. No Luna build run.

## Follow-up: replace end card with preview3
Imported preview3.png from the user-supplied V89 ZIP. Gameplay EndBG now displays the complete artwork with preserveAspect and a stretched RectTransform; disabled its previous landscape UICoverScaler. Added black Image backdrop to EndCard for aspect-ratio differences, with raycast disabled. Hid old Logo/Download Image graphics because preview3 already includes them, retaining their RectTransforms and EndCardView references. Existing store input and outcome scripts unchanged. EndCard remains hidden initially. Inspected endcard-preview3.png after invoking EndCardView.Show in Play Mode. Console error query returned zero. Luna build and actual store navigation not exercised.

## Correction: separate end-card background and UI
Replaced composite preview usage with bg14.jpg as EndBG sprite and restored enabled independent Logo and Download Image components. Imported ZIP text.png as logo_xmas.png: snowy yellow logo matching the user reference. Existing btn_download.png remains the separate CTA graphic, with original EndCardView pop/float/pulse animations. Restored EndBG UICoverScaler with authored 1920x1080 dimensions to fill the screen. No runtime script changes; existing end-card store flow preserved. Inspected endcard-bg14-separate-ui.png in Play Mode: independent logo and CTA above the new background. Console error query zero. Actual store navigation and Luna build not executed.
