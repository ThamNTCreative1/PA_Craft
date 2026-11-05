# Plan
Status: APPROVED
Approved by: user
Approved scope: exact three-file Objective Y -60 and fresh screen-press tutorial plan; confirmation oke
Planner: Claude CLI; reviewed by Codex.

## Exact files/types
1. Assets/_Playable_/Scripts/Controller/TouchController.cs (existing MonoBehaviour): add public event Action OnScreenPressed; new Update samples Unity Legacy Input only. If Input.touchCount>0, use indexed GetTouch(i), invoke once if any TouchPhase.Began, never process mouse in same frame. Else invoke on GetMouseButtonDown(0). No allocations/LINQ, global searches or gameplay actions. Existing pointer ownership/layout/OnLookDelta/camera drag unchanged.
2. Assets/_Playable_/Scripts/Tutorial/CombatTutorialController.cs (existing MonoBehaviour): subscribe/unsubscribe OnScreenPressed instead of OnLookDelta in existing OnEnable/OnDisable. Replace rotation-counting handler with HandleScreenPressed: only Step.Look and frameCount>_beginFrame completes Look->Move using existing state/cues/movement transition. Add private int _beginFrame initialized/reset in Begin; remove serialized _camera,_lookThresholdDegrees and unused _lookDegrees,_lastYaw,_lastPitch. Keep _moveTime,existing.25sMove condition,Fire/Completed/Cancel,controlvisibility and firepointer gating unchanged. No newserializeddependencies/classes/interfaces.
3. Assets/_Playable_/Scenes/Gameplay.unity: Objective RectTransform anchoredPosition.y -30->-60 only; preserve x,anchors,pivot,size,text,font/style. Remove obsolete _camera and _lookThresholdDegrees entries only from CombatTutorialController component after scripts compile, preserving other components with similarlynamed fields.

## Design/event flow
Existing input owner samples press -> C# event -> tutorial state transition. Observer boundary separates input and tutorial; no new abstraction. Begin frame excluded; held touch/mouse doesn't repeat; UI clicks count by explicit anywhere assumption. CameraControl code/Flow/monster/prefabs unchanged. Remove old fields only where verified unused.

## Verification
Back up current edits before mutation; compile/domainreload thenConsole before dependent scene changes. Confirm exact30-unit downshift and otherUI unchanged. Test fresh mouse/touch beginning withoutdrag, left/right/UI positions; sameframe Begin gesture ignored; held/moved/ended/canceled do not repeat; Look->Move once; presses elsewhere in progression have noextraeffect; Move .25s->Fire and firstshot complete; controlsvisible/firegated; Cancel/endedignore; camera drag stillworks. No claim of real-device/Luna/buildsize checks unless run. User approval required before implementation.

