# Hero selection UI v1

Status: APPROVED
Approved by: user (oke, 2026-11-05)
Approved scope: Hero selection UI v1 as listed below.
Planner: Claude CLI; recorded by Codex from returned plan.

## Exact files and responsibilities

1. Assets/_Playable_/Scripts/Heroes/HeroSelectionPanel.cs — retain binding/selection contract; serialized HeroSelectionHandHint _handHint, float _cardWidthToHeight=.6 clamped.45..1. RefreshLayout returns bool for actual layout application. Keep slotWidth/slotHeight, existing height cap and slot centers. Set card width=min(slotWidth,height*ratio), height unchanged; _grid.cellSize reflects new card size, horizontal stride still slotWidth+spacing. Reset layout cache on Show if necessary to ensure refreshed card bindings/size are aligned. Show starts hint after layout; missing hint warns once and selection continues. OnChosen stops hint before HeroChosen, Hide/OnDisable stop it idempotently. LateUpdate/OnRectTransformDimensionsChange call Realign only after an actual layout change. Use Unity null checks, not null-conditional on destroyed components.
2. Assets/_Playable_/Scripts/Heroes/HeroRoster.cs — only add Inspector Tooltip on each existing _slot1..4: id0Default/redshirt,1Summer,2Browncoat,3Fish,4Panda,5Doctor,6FireFighter,7Police; invalid/duplicate falls back first unused. Existing LunaPlaygroundField labels, Range/defaults, ResolveSlots unchanged. No duplicate fields on GameController. Scene defaults remain0,1,5,7.
3. NEW Assets/_Playable_/Scripts/UI/HeroSelectionHandHint.cs and Unity-generated.meta — sealed MonoBehaviour in Playable, presentation only. Serialized RectTransform _hand; RectTransform[] _targets exactly4; Vector2 _targetPoint(.55,.45); _moveDuration.35, _dwellDuration.8, _pulseScale1.15, _pulseDuration.45. Own _index, _running, Sequence _hop, Tween _pulse, cached rest local position/scale captured in Awake. Public Begin(), Realign(), Stop(). No published events or global/input/flow dependencies.
   - Awake caches rest and hides hand.
   - Begin first Stop; validate hand and4nonnull targets, warn actionable and hide hand on failure without blocking selection. Set index0/running, activate hand/last sibling, snap to target0, pulse and schedule next.
   - Target point: transform normalized point in target.rect to world then InverseTransformPoint into hand parent. Explicit serialized refs, no searches.
   - Hop sequence: wait.8s, DOLocalMove next target over.35s Ease.OutQuad, then update index modulo4 and schedule next. Sequence uses SetUpdate(true). Pulse DOScale(restScale*1.15,.45).SetEase(InOutSine).SetLoops(-1,Yoyo).SetUpdate(true).
   - Realign when running kills only hop, snaps current target and schedules again; pulse continues.
   - Stop kills/nulls both tweens, resets running/rest position/scale, hides hand; safe repeated. OnDisable/OnDestroy call Stop. Reopening through Show resets cycle.
4. Assets/_Playable_/Scenes/Gameplay.unity — root HeroSelectionPanel Image alpha.698->0, raycastTarget stays true (alphaHitTestMinimumThreshold0, preserve modal blocking). New HandHint last child of selection root, stretch RectTransform/noGraphic/new component; child Hand Image existing Assets/Game/Textures/UI/Common/icon_hand.png, preserveAspect, raycastTargetfalse,110x110, pivot measured at sprite fingertip, initially inactive. Wire four target card root RectTransforms, hand and panel hint reference. Not under grid. Serialize approved ratio/timings. No other backgrounds touched.

Unchanged: HeroCardView.cs, HeroSlotResolver.cs, MonsterHeroFlowController.cs, CameraController.cs, all weather/gameplay classes, other prefabs/materials/textures/packages. Existing labels auto-size14..30 and portraits preserveAspect.

## Flow and lifecycle

Flow.Start -> panel.Show -> bind4 -> activate/layout -> hint.Begin. Hint loops0->1->2->3->0 without gating input. Resize layout -> hint.Realign. Card choice -> chosen guard -> hint.Stop -> HeroChosen -> existing Flow -> Hide -> gameplay tutorial. Existing outcome -> Flow.OnEnded -> Hide -> Stop. No new outcome or analytics flows.

## Task order

Snapshot scoped files/current scene preserving dirty work. Add hint class and compile/Console. Update panel and roster, compile/domain reload/Console before scene changes. Modify selection Image and add/wire hand objects, save. Verify and write implementation report. Any additional class/file/dependency or changed solution requires renewed approval.

## Acceptance / verification

- Unity compile, Console errors reviewed (no new unexpected errors), static prohibited API/package/shader audit.
- Landscape1920x1080 and portrait1080x1920 screenshots: no black selection overlay;4columns/2x2, narrower centered frames, no cropped portraits, readable names, hand fingertip placed sensibly and not obscuring labels.
- Loop visits all4 in order with pulse, works timeScale0; resize realigns current index, no duplicate tweens. Measure owned tweens rather than relying on global tween count affected by unrelated animations.
- Mouse/touch-simulation raycast on each card including hand area reaches correct card; transparent root still blocks gameplay; rapid double click emits one choice.
- Choice stops/hides hand immediately; existing look/move/fire onboarding starts; verify hide/reopen/disable/outcome cleanup and no stuck tween/input. Report physical device tests unverified unless run.
- Missing panel hint or missing target warns without trapping selection or leaving hand running.
- Existing Luna Hero Slot1..4 fields exactly once, slots[2,3,4,6] bind correct images/names/id and selected skin; invalid/duplicate resolver remains unique. Restore defaults0,1,5,7 after testing.
- Record first prompt latency (expected immediate Show) and successful selection timing, distinguishing diagnostic/manual tests.
- No new textures/shaders/packages or geometry; actual Luna build size/runtime only claimed if fresh build executed. Under4.5MB remains a measured target, otherwise unverified.

Existing skin-rejection chosen guard risk stays outside this plan (see shape.md); do not add Flow/rearm logic.
