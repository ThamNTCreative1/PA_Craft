# Pet Rescue Runner - Implementation Plan v1
Status: APPROVED
Approved by: user
Approved scope: plan.md v1 and shape.md v1, user response "oke" after the v1 proposal.
Planner: Codex per latest user instruction.
Scope: shape.md v1 plus the exact file/asset and verification list below.
The request to plan and implement establishes intent; no exact plan existed when it was sent. Under the current project approval rule, implementation starts after approval of this concrete v1 scope. Do not mark this plan self-approved.

## 1. Runtime file/class list
All paths below are relative to Assets/_Playable_/PetRescue/.
One primary type per file; namespace Playable.PetRescue. Serialized arrays/references only, no runtime searches.

| File / type | Kind and ownership | Important API / dependencies / lifecycle |
|---|---|---|
| Scripts/RescueRules.cs / RescueRules | Pure C#; owns Waiting/Running/Won/Lost, elapsed seconds and fixed pet states Following/Lost/Rescued | Constructor(duration,required,petCount); Start(), Tick(delta), LosePet(id), RescuePet(id). Reject repeated IDs, terminal writes and duplicate starts; expose read-only counters/state. Called by flow. No SDK or Unity dependencies. Tick deadline before goal checks; no independent clock. |
| Scripts/RescuePointerInput.cs / RescuePointerInput | MonoBehaviour; samples Legacy mouse/touch and owns primary pointer | Initialize(gameplayRect,ctaRect), Sample(out pressed,out horizontalDelta), Cancel(). Touch takes precedence over mouse; track fingerId; release/cancel/disable/focus loss resets ownership. Relative delta divided by gameplay viewport width, then converted to road width by flow. Ignore input on CTA. No per-frame object search. |
| Scripts/RescueHeroMotor.cs / RescueHeroMotor | MonoBehaviour; owns hero transform, ground height and movement/recovery phase | Initialize(visual), Advance(dt,normalizedDelta), BeginRecovery(pitPosition), Stop(). Serialized speed, clamp, depth/timings; kinematic scripted motion, no dynamic terrain physics dependency. Animate existing voxel limbs locally; no modification to source model/controller. Flow ticks it explicitly; no autonomous Update. |
| Scripts/RescuePetFollower.cs / RescuePetFollower | MonoBehaviour; owns one pet ID, transform, follow offset and animation | Initialize(id,hero,offset,animator), Advance(dt,heroRecovering), MarkLost(), MarkRescued(), Stop(). Serialized model/Animator. Follow smooth lateral movement and forward offsets; only registered pets participate. Lost pets hide and stop. Rescued pets park past gate. New controller Idle/Run toggled via Running bool; no source animation events. |
| Scripts/RescueTntHazard.cs / RescueTntHazard | MonoBehaviour; owns one hazard armed/spent state, tile references and effect | TryHit(previousHero,currentHero), ContainsBlast(petPosition), Explode(), TickEffect(dt). Swept XZ segment test prevents tunneling; footprint tiles disabled once. Shared primitive burst objects pre-authored, no runtime material clones. No direct outcome/pet mutation. |
| Scripts/RescueCameraFollow.cs / RescueCameraFollow | MonoBehaviour; owns camera pose | Initialize(hero), Tick(dt). Follow stable rear offset; track hero X/Z while keeping safe ground-level camera height during recovery. Called by flow after motor/pets. Serialized camera/offset and aspect-aware distance. |
| Scripts/RescueHudView.cs / RescueHudView | MonoBehaviour; owns HUD/endcard visuals only | Refresh(remaining,rescued,alive), ShowWin(count), ShowLose(count), Tick(dt). Separate win/lose view methods; one explicit button event InstallRequested, subscribed by flow. Display endcard, enable CTA only for a fresh pointer after outcome (at least one release/all fingers up). No SDK or gameplay rules. Remove subscriptions on disable. |
| Scripts/RescueTutorialView.cs / RescueTutorialView | MonoBehaviour; owns tap/drag cue state | ShowTap(), OnStarted(), OnSteered(), Hide(), Tick(dt). Serialized text/hand-arrow references; input passes through cue. No gameplay mutation or automatic completion. |
| Scripts/RescueGameFlow.cs / RescueGameFlow | MonoBehaviour; composition root and deterministic gameplay tick | Serialized rules configuration, pointer, motor, pets[], hazards[], camera, HUD, tutorial, LunaController; Awake validates own references, Start registers facade then initializes all dependencies. Update: pointer -> start/timer tick -> if active motor -> earliest armed swept TNT hit -> blast pet losses -> followers -> gate counts -> outcome -> camera/HUD/tutorial. HandleWin() and HandleLose() separate; terminal input/effects stop, facade notified once, corresponding endcard shown. OnDestroy unsubscribes and unregisters service. |
| Scripts/LunaController.cs / LunaController | Plain C# facade; only SDK boundary | NotifyWin() and NotifyLose() separately both map to verified Luna.Unity.LifeCycle.GameEnded(); a shared terminal guard permits only one. OpenStore() maps to Luna.Unity.Playable.InstallFullGame(), invoked solely by fresh CTA click. No invented SDK win/endcard method and no auto store timer. Endcard is local HUD. |
| Scripts/RescueServices.cs / RescueServices | Static typed locator; only approved static mutable boundary | Register(LunaController), Luna property, Unregister(expected). Reject duplicate registration, fail clearly if missing; no dictionary/generics/reflection. Bootstrap owns cleanup. Only flow consumes locator; other components use explicit references. |

No runtime interfaces or base classes proposed. State enums live in their owning files. MonoBehaviour components have validation and explicit initialization; scene creation APIs/searches are Editor-only.

## 2. Editor and test files
- Editor/RescueSceneBuilder.cs / RescueSceneBuilder: explicit menu command builds only this feature's assets and scene. Source project read-only. Generate materials/controllers/prefabs, serialized component wiring, road tiles/pits, gate, camera, HUD, legacy EventSystem. Validate sources and refuse to overwrite a dirty scene. Save PetRescue scene; change build-scene enable flags as listed below. Not an InitializeOnLoad script; never automatically rebuild on project load.
- Tests/Editor/RescueRulesTests.cs: meaningful pure-rule tests covering start/timer, loss/rescue identity, >=3 threshold, strict deadline, outcome guards.
- Tests/Editor/RescueSceneTests.cs: scene reference integrity, exact six pets, nine hazards, one camera/EventSystem/flow, no old GameManager, allowed materials and gate reachability at configured speed; swept collision and blast-boundary checks through exposed pure helpers where needed.
- Tests use existing Editor test setup; add no new test package/assembly definition unless a concrete compilation dependency requires a revised plan.

## 3. Exact scene/prefab/asset list
New scene: Assets/_Playable_/Scenes/PetRescue.unity (+ meta).
Roots: RescueFlow (flow/input/facade registration), World (road/pit tiles, boundary fence, gate), Hero (motor + visual), Pets (six follower instances), TNTs (nine hazards), Main Camera (camera follow), Canvas (HUD/tutorial/endcard/CTA), EventSystem (StandaloneInputModule).
New prefabs under Assets/_Playable_/PetRescue/Prefabs/: Hero.prefab, Dog.prefab, Duck.prefab, Rabbit.prefab, TNT.prefab. Scene owns road/gate/pits; no other environment prefab files.
New model copies under Assets/_Playable_/PetRescue/Models/: Dog.fbx, Duck.fbx, Rabbit.fbx. Sources respectively D:/Source/minecraft/Assets/Game/Models/Animals/dog.fbx, Duck.fbx, Rabbit.fbx. New target GUIDs; never copy existing source .meta files unchanged.
New texture copies under Assets/_Playable_/PetRescue/Textures/: Dog.png, Duck.png, Rabbit.png from the same source Animals directory.
New animation controllers under Assets/_Playable_/PetRescue/Animation/: Dog.controller, Duck.controller, Rabbit.controller; use embedded metarig|Idle and metarig|Run clips only, no source override controllers. Model importer keeps those takes, loops enabled, strips animation events, disables cameras/lights/material auto-generation, generic rigs and no root motion.
Existing assets referenced read-only: Assets/GameAsset/Model/Character/Player/Character.fbx and Base_Character.png. Do not mutate existing material/importer/animation assets.
New materials under Assets/_Playable_/PetRescue/Materials/: Hero.mat, Dog.mat, Duck.mat, Rabbit.mat (Unlit/Texture); Grass.mat, Dirt.mat, Stone.mat, Wood.mat, Pit.mat, TntRed.mat, TntWhite.mat, TntInk.mat, Gate.mat, Burst.mat (Unlit/Color). UI uses UI/Default. Texture brightness baked into feature copies if needed; solid-color brightness uses _Color. Opaque assets; point-filter textures, <=256 max size unless visual validation proves insufficient, no mipmaps for pet textures. Do not reimport unrelated assets.
TNT labels use text mesh with the existing built-in font material, verify material shader is compatible unlit; if unavailable, generate TNT letter strokes from cube primitives using TntInk.mat (within builder, no extra file/shader).
Modified setting: ProjectSettings/EditorBuildSettings.asset: new PetRescue enabled, existing Gameplay entry retained but disabled. No package, input, graphics or other project setting changes.
All new Unity files/folders include generated .meta files. No commits, deletion, Blender operation or source-project writes.

## 4. Data/event flow and patterns
Legacy pointer -> RescueGameFlow -> RescueRules + HeroMotor -> TNT blast / PetFollower -> gate rescue -> HandleWin OR HandleLose -> RescueServices.Luna.NotifyWin OR NotifyLose -> HUD endcard -> new CTA press -> OpenStore.
Facade isolates real Luna calls; typed locator satisfies the project integration boundary. Simple enum states isolate terminal and recovery behavior without a state-class framework. Button event is the only observer boundary; subscription lifetime belongs to flow. Direct serialized calls are simpler for all remaining relationships. No generic factory/pool/event bus.

## 5. Ordered implementation
1. Add pure rules, facade/locator and rule tests. Compile and inspect Console.
2. Add pointer, motion/follow, hazard, camera, HUD/tutorial and flow. Compile and inspect Console before scene assembly.
3. Import only listed visual assets; generate listed unlit materials, minimal controllers and prefabs. Verify orientation, feet/pivot, run loops, no source scripts/events and texture mapping.
4. Run scene builder, verify serialized links and gameplay framing. Set build entry, preserve old scene.
5. Execute EditMode tests and manual Play Mode paths. Capture portrait ready/running/pit/win/lose evidence outside Assets.
6. Execute Luna build through installed Playworks pipeline; inspect Console/build output and measure actual final artifact bytes. Test exported playable mouse/touch and CTA behavior where supported.
7. Write implementation-report.md in this spec folder with actual changes/results, unresolved checks and budget evidence. Stop on scope-changing failures.

## 6. Verification and acceptance
- Rules tests: no time before tap; duplicate taps cannot reset time; 14.999 vs 15.000 boundary; loss cannot count as rescue; duplicate rescue cannot increase count; exactly three wins; outcome immutable; timeout after two loses.
- Motion/collision: release preserves forward travel, drag clamps X; swept TNT collision at low frame rates; blast exactly on radius loses pet, outside radius survives; spent TNT cannot explode again; lost pet never reaches rescue count.
- Recovery: visible pit remains; hero falls and automatically jumps out with no jump input; survivors resume; timer continues; timeout during recovery ends once; no steering during recovery or after outcome.
- Happy path: six pets initially follow, >=3 cross gate safely before deadline and win immediately; missing goal count waits for timeout. No double win/lose on same update.
- Tutorial and input: mouse + touch pointer ownership, cancellation, release outside viewport, focus loss, multi-touch/simulated mouse arbitration, UI overlaps, re-drag; no CTA from finishing gameplay gesture.
- Visuals: three recognizable species, correct facing/scale/run animation, hero readable, TNT labels, rear camera, HUD rescue/time count, portrait and landscape safe layout, proper endcard layering.
- Console: compilation complete, no new errors/missing scripts/null references; existing warnings reported, not silently fixed.
- Runtime scan: no prohibited searches/Physics2D/new Input System/reflection in new runtime path; imported visuals bring no source scripts or shaders. Only facade calls Luna SDK in the new scene.
- Luna: exported build actually runs; timing/outcome/touch/CTA confirmed. Measured final playable <4.5 MB (record bytes, category contributions and headroom). Source FBX sizes are not acceptance evidence. If build/runtime unavailable or budget exceeded, report blocked/unverified, do not declare finished or add optimizations outside scope.

## 7. Rollback and boundaries
Feature is isolated in its own folder/new scene. Restore build settings entry flags to return to mission gameplay; no existing gameplay script/scene/prefab is edited. Preserve unrelated .idea changes. Do not auto-delete files or create a commit. Unexpected API/import/size failures requiring new files/dependencies or changed behavior require a revised plan.
