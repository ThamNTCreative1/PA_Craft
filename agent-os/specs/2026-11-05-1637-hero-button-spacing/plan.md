# Hero button spacing v1

Status: APPROVED
Approved by: user (oke, 2026-11-05)
Approved scope: One-file hero button spacing v1.
Planner: Claude CLI

Exact scope: only Assets/_Playable_/Scripts/Heroes/HeroSelectionPanel.cs, RefreshLayout. Scene/prefab/hand/input/roster unchanged.

Root cause: card positions use full slot width despite actual narrower cardWidth.

Keep all size/column calculations. Add local totalWidth=columns*cardWidth+(columns-1)*_grid.spacing.x. Set x=-totalWidth*.5+cardWidth*.5+(i%columns)*(cardWidth+_grid.spacing.x). Keep current totalHeight and y formula. Result: gaps equal existing spacing20on both axes, actual group centered with equal opposing margins.

Architecture: no new class/interface/serialized field/pattern. Existing layout-to-hand Realign hook retained. Sizes, selection, HUD and weather unchanged.

Verification: snapshot source; compile/domain reload/Console before dependent actions; measure landscape3edge gaps20+-1 and symmetric margins, portrait horizontal/vertical gaps20+-1 and symmetric margins; screenshots; resize hand follows moved card; selection callback fires once and cleans hand. No new dependencies/build assets. Fresh Luna build/device and output size only claimed if actually run.
