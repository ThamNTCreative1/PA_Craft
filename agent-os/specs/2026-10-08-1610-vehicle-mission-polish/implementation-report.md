# Implementation report

Date: 2026-10-08
Status: Approved mission/UI changes and user-approved flat-ground correction implemented. The reproduced car hesitation no longer occurred in the post-correction Editor run. Earlier Luna develop build predates the ground correction; current browser runtime and delivery-size compliance remain unverified.

## Final continuation: single flat ground (2026-10-09)

User approved replacing map ground with one flat box, including covering gaps and lower areas, instead of modifying CarController.TryStep. Recorded the scope extension in plan.md.

Changed only Gameplay.unity gameplay data: removed 279 BoxCollider components from Floor objects under CityMap_Cropped/CityMap_Cropped_Colliders as scene prefab overrides. Added Ground Flat with one BoxCollider: world center (7,12.96,-24.492), size (150,1,167), top Y=13.460. Preserved all 3,359 other map colliders and source prefab assets. Floor visual objects remain. No runtime script changes, including GameController or CarController.

The Editor scene was already dirty before this continuation. Saved a copy of that in-memory baseline to Temp/GroundFlattenVerification/before.unity before editing. Compared its serialized blocks with the final scene: three new Ground Flat blocks and one changed map PrefabInstance block, with no other block changes. Thus prior unsaved scene state was preserved in the saved scene.

Editor verification:

- Car: held Forward for 8 seconds on the original reproduction route; accelerated to 13 m/s and maintained it through the previously troublesome road. Zero sampled frame-to-frame speed drops exceeding 1 m/s; grounded and held input remained true in periodic samples. Evidence: [flat-ground-car.txt](evidence/flat-ground-car.txt).
- Car Out: player restored active and not riding. Walking with injected joystick axis moved 9.04 m in 2 seconds while remaining at ground height. This is a movement/grounding check, not physical touchscreen verification. Evidence: [flat-ground-walk.txt](evidence/flat-ground-walk.txt).
- Bike: mounted and held Forward for 3 seconds, moved about 20.7 m and reached 13 m/s. Evidence: [flat-ground-bike.txt](evidence/flat-ground-bike.txt).
- Geometry: zero remaining Floor BoxColliders; 3,360 total map colliders (3,359 preserved + one ground). Ground-only ray checks near opposite map corners and old road bumps all hit Y=13.460. Evidence: [flat-ground-geometry.txt](evidence/flat-ground-geometry.txt).
- Final Console error query: zero entries. No C# changes or compile requirement introduced. Play Mode stopped after verification; no runtime test state saved.

Limits: one flat box intentionally fills map holes/lower areas, as approved. Full-map traversal, all obstacles/slopes, physical devices and a new Luna build/runtime were not tested in this continuation. Earlier sections below retain the pre-correction diagnosis and historical build evidence; their requests for a TryStep correction are superseded by this approved map-ground solution.

## Approval and changed files

Only the APPROVED plan in this folder, selected by current.md, was used. No other spec or plan was read. User approved option 1: retain bike-style arrow guidance outside interaction distance. plan.md now records this clarification; generic interaction methods remain unchanged.

- Assets/_Playable_/Scripts/Controller/PlayerAction.cs: initially hide both vehicle arrays; activate the mission vehicle; add car arrow reference, four call-site bindings and disable cleanup.
- Assets/_Playable_/Scripts/UI/MissionsJournal/MissionsJournalController.cs: select vehicle after supported-mission guard and before Hide.
- Assets/_Playable_/Scripts/Controller/CarController.cs: disabled-by-default, 0.25-second diagnostics for throttle, keyboard/UI source, held buttons, grounding, speed, normal/collider names and step eligibility/result. Preserve the original short-circuit TryStep invocation and vertical response; no additional physics queries.
- Assets/_Playable_/Scenes/Gameplay.unity: duplicate/bind Car Guide Arrow, position four car labels, and set Image raycastPadding to (-10,-10,-10,-10) for five car and four bike buttons. Car edits remain scene overrides.

No new runtime class/interface/pattern/event/package/shader/material. GameController.cs and UICarController.prefab are byte-identical to task-start snapshots. Existing user changes were preserved.

## Scene choices

Labels retain their parent and non-raycast TMP graphics:

| Label | Anchor | Anchored position |
|---|---|---|
| Forward | (1,0) | (-320,719) |
| Reverse | (1,0) | (-322,149) |
| Left | (0,0) | (243,520) |
| Right | (0,0) | (485,520) |

Padding -10 preserves separation where bike buttons have 30 units between visible edges and the car Forward/HandBreak gap is about 23 units. The plan explicitly allows tuning the example -30.

Aspect previews caused unrelated Canvas/joystick serialization changes through existing editor behavior. These task-generated changes were restored from the baseline. Final scene block comparison: only approved components/scene roots changed, five arrow blocks added, none removed. The unchanged step-height default was not baked into scene data.

## Verification executed

Environment: Unity 6000.0.60f1, Windows Editor, Gameplay, Unity MCP. Temporary Editor execution and Play Mode were used; no persistent test class was added.

| Check | Result |
|---|---|
| Compilation | PASS after mission scripts and diagnostics; compilation/domain reload completed, no compiler errors. |
| Initial state | PASS fresh Play Mode: journal visible, car and bike inactive. |
| Mission switching | PASS actual GO Button.onClick listeners: bike -> car -> bike -> car, only selected vehicle active, journal closes. |
| Car arrow | PASS visible on foot at 6.1547 m (scene interaction distance 6 m); tutorial mount succeeds and hides arrow. Out restores arrow; disabling PlayerAction hides it; bike selection deactivates car. |
| Car tutorial | PASS all labels active on fresh mount; visually next to controls in portrait 235x418 and landscape 743x418. Existing lifecycle retained. |
| Bike tutorial | Visually checked in both orientations; scene diff confirms label data unchanged. |
| Nine hold buttons | PASS simulated down/up/exit callbacks. EventSystem raycasts hit 5 local units beyond visible edge and miss at 15. Rotated bike controls tested using local-to-screen conversion after layout settled. |
| Hit-area separation | No overlap among five car controls in landscape; none among four bike controls using transformed padded bounds in portrait. Full device/orientation matrix unverified. |
| Saved references | Reloaded scene: both arrows assigned, all nine padding values retained, diagnostics false. |
| Physics diff | PASS GroundAt, TryStep and all following methods unchanged. FixedUpdate only retains original short-circuit result and adds gated logging. |
| Scope/API audit | PASS additions contain no prohibited runtime lookup, Physics2D query or new Input System API. |
| Ownership | PASS SHA-256 equality for GameController.cs and reusable UI prefab; all three generic interaction method bodies unchanged. |

Images: [car portrait](evidence/screenshot-20261008-164936.png), [car landscape](evidence/screenshot-20261008-164957.png), [bike landscape](evidence/screenshot-20261008-165152.png), [bike portrait](evidence/screenshot-20261008-165236.png).

Two earlier images in evidence are preliminary captures. An exploratory mount was no longer active at the next capture; cause was not established. A fresh paused mount verified the tutorial, and the subsequent sustained driving run remained mounted. No lifecycle fix was inferred.

## Driving diagnosis: mitigation insufficient

[drive-diagnostics.txt](drive-diagnostics.txt) preserves 49 sequential samples from a held UI button through the existing road. Start (-14.00,13.49,-88.00), end (-14.00,13.47,-25.23). Exact originally reported road location was not supplied; this is reproduction from the scene's car start.

Repeated speed drops remain: 8.61 -> 0.38, 9.45 -> 1.79 and 9.59 -> 2.03 m/s. Across these samples throttle=1, source=UI, forwardHeld=True, grounded=True, normal=(0,1,0), stepEligible=True and stepped=False. Ground samples crossed Floor -1,-5, Floor -1,0 and Floor -1,-2.

Held-input loss does not explain this run. Logs do not identify the collision/contact or establish why TryStep returned false. No physics correction or second mitigation was made. Diagnostics are false in the saved scene. Smoothness is NOT marked fixed.

Recommended next approval: targeted collision/contact and ground/step diagnosis using this evidence, followed by an exact correction plan for approval. Alternative: accept mission/UI polish and defer the driving defect.

## Console and unverified checks

Warnings: existing ModelSwitcher.cs obsolete FindObjectOfType usage; missing script on btnBackToHome twice on Play Mode entry; Editor Account API timeout. Build export also emitted audio-source time warnings. Temporary MCP namespace/reflection mistakes were corrected without project source changes.

Git diff --check against HEAD reports Unity YAML empty-value trailing spaces, including pre-existing scene changes. No broad reformat was performed.

Unverified: physical touch devices, keyboard-vs-UI comparison, full reverse/steering/walls/low-step/headroom/slope Play Mode matrix, and Luna browser runtime. Source regression checks do not replace runtime tests.

## Build and asset budget

Arrow mesh: existing Assets/GameAsset/Model/Interact/Fk_Arrow.fbx, 96 triangles per instance. Both arrows reuse FullColorUnlit.mat with existing shader Playable/Unlit Brightness. Therefore blanket no-custom-shader compliance cannot be claimed; the plan's explicit existing-material reuse was preserved.

Local Playworks 7.2.0 CLI `project:build` completed with exit code 0. Stage1 export, Stage2 asset processing, Stage3 code compilation/bundling and Stage4 develop packaging all succeeded. Final Unity Console error query returned zero entries. No publish/deploy command was invoked; the CLI used stored authorization and generated its normal diagnostics artifact.

Command (PowerShell, working directory F:/7.2.0/pipeline):

```powershell
$env:PROJECT_PATH = 'D:/Source/PA_Craft'
& 'F:/7.2.0/tools/node/win64/node.exe' --max-old-space-size=8192 './jake.js' -f './Jakefile.js' project:build
```

Measured fresh `LunaTemp/stage4/develop`: **225 files, 32,753,652 bytes (32.75 MB decimal)**. This is the uncompressed development output, including its developer UI/runtime, not a final ad-network delivery package. Do not treat this as proof of passing the 4.5 MB delivery budget. A final compressed delivery artifact was not generated; budget acceptance remains unverified. Size optimization remains explicitly out of scope.

| Development-output category | Bytes |
|---|---:|
| engine | 14,970,533 |
| static | 9,508,373 |
| assets | 7,551,880 |
| remaining files | 722,866 |

Largest asset blob: `assets/bundles/-1/data.blob`, 4,354,792 bytes. Categories reflect output paths, not a texture/audio/model contribution breakdown. Reused mesh/material data means no new source asset, but no zero-byte build-impact claim is made. Browser runtime was not executed because this session has no browser automation tool; successful packaging does not establish runtime compatibility.

## Approval boundary

Only option 1 changes the original acceptance criterion; padding tuning is within the plan. Further physics work awaits separate user approval. Build/runtime and unexecuted checks remain unverified until evidence is available.

## Continuation: contact-level diagnosis (2026-10-08)

Resumed from the existing implementation without rewriting completed mission/UI changes. Ran a fresh Play Mode car mission, mounted the car and held its Forward button using PointerEventData. An in-memory Editor sampler recorded speed drops; no runtime script was added. The first pass lacked contact reporting, so a second 8-second pass temporarily enabled BoxCollider.providesContacts in Play Mode and subscribed to Physics.ContactEvent. The sampler unsubscribed and released the button on completion. Exited Play Mode without saving runtime state.

Evidence: [speed-drop run](evidence/contact-diagnostics.txt), [contact-enabled run](evidence/contact-diagnostics-with-contacts.txt).

- Reproduced recurring speed drops around car z=-77.93, -69.94, -61.95 and -53.92 while held=True and grounded=True.
- At t=2.384 s, speed fell from 10.08359 to 4.66614 m/s, followed by 0.93323 m/s. Contact with Floor -1,-5 at z=-75.992 had normal (0,0,-1) and pair impulse z=-5537.45, then -3852.91. These are pair impulse sums repeated for each reported contact point, not independent impulses to add together.
- Read-only geometry inspection found the wide road BoxCollider top at y=13.460 and a narrow 0.5 x 0.04 x 4 m BoxCollider top at y=13.472: a 0.012 m protrusion. The collision is real; held-input loss does not explain this reproduction.
- Replayed the existing forward BoxCast query at captured car position (-14,13.4624,-78.0236). The current half*0.98 query has lower face y=13.47420, above the protrusion, and returns no hits. A read-only comparison query retaining horizontal shrink but using vertical half-extent 0.589 instead of 0.5782 has lower face y=13.46340 and detects Floor -1,-5 at distance 0.1530046 with normal (0,0,-1).

This establishes a concrete missed-low-obstacle mechanism in the current step probe at the reproduced road location. It does not prove that every reported hesitation has the same cause, or that a changed probe alone passes the complete traversal/clearance sequence.

Proposed next correction for approval: restrict changes to CarController.TryStep in Assets/_Playable_/Scripts/Controller/CarController.cs, replacing proportional vertical shrink in the forward obstacle probe with a small world-space vertical skin (initial candidate 0.001 m), retaining horizontal shrink and the existing step-height, upward-clearance and destination-overlap checks. No map collider or collision-mode change proposed. Verify sustained Forward across the recorded obstacles with speed/input/contact evidence, then reverse, walls, low steps, slopes and blocked headroom; compile/Console and applicable Luna compatibility checks remain required. If evidence demands a different algorithm or additional files, stop for renewed approval.

No physics fix was applied. The approved plan explicitly excludes physics changes, so the task remains awaiting a scope extension for this correction. Temporary Roslyn-unavailable and sampler-brace errors were corrected using the installed CodeDom backend; they did not change project source. No new build was run because this continuation changed only report/evidence files.
