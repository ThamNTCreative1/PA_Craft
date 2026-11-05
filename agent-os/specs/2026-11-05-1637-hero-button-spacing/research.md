# Hero button spacing

Research only. User requests equal compact button gaps in landscape, equal upper/lower button spacing in portrait. Keep button size and existing tutorial hand.

Current Assets/_Playable_/Scripts/Heroes/HeroSelectionPanel.cs RefreshLayout computes slot width from grid rect/columns then reduces actual cardWidth to height*.6. X position still uses old full slot width, yielding excessive visible gaps. Vertical position already uses card height+spacing and centers group; preserve symmetry. Scene GridLayoutGroup.spacing=(20,20), padding0. Responsive4columns landscape,2x2portrait. Realign hook already follows changed layouts.

Smallest fix: same one source file, retain all size computation, compute totalWidth=columns*cardWidth+(columns-1)*spacing.x; x=-totalWidth/2+cardWidth/2+column*(cardWidth+spacing.x). Keep totalHeight=rows*height+(rows-1)*spacing.y; y=totalHeight/2-height/2-row*(height+spacing.y). Thus gaps20 on both axes, centered group yields equal top/bottom margins. No scene/prefab/assets/newclasses/fields/interface changes. No input, roster, weather or hand behavior changes.

Verification: Unity compile/Console, actual card-edge gaps and group-center symmetry in landscape/portrait, screenshots, resize hand realignment, existing click selection remains. Luna build/device size unverified if not run. No new dependencies or build assets.
