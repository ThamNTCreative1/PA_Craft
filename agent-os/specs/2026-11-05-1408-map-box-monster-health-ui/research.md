# Research: map boxes and monster health UI
Status: RESEARCH COMPLETE; requires Claude plan and user approval.

Request: continue map BoxCollider layout and take only UI from D:/Source/minecraft/Assets/Game/Prefabs/UI/Elements/HealthBar.prefab. No source gameplay logic.

Gameplay.unity serialized BoxColliders: Ground Flat, BoundaryWest/North/East/South, plus character spine/hips. No direct interior obstacle boxes found. Inherited prefab/model colliders and unsaved Editor state remain unverified. Ground local size is (101.5,1,91), center (29.75,12.96,18.01). Scene has Colliders and MapBoundaries objects. Exact obstacle bounds/count/positions need read-only Unity spatial inspection before the plan.

CameraController.UpdateCamera uses SphereCastNonAlloc, ignores triggers and player/vehicle descendants, and pulls inward at obstacles. Scene mask is all layers, radius 0.23. New boxes affect camera; no camera code change is currently indicated.

Monster.prefab has HealthBarAnchor, Background and Health. WorldHealthBar.SetValue clamps normalized health into Image.fillAmount; LateUpdate copies the serialized camera rotation. Prefab camera is null; scene overrides must be checked before diagnosing it. MonsterController owns health and updates this existing adapter; preserve gameplay.

Source UI hierarchy: HealthBar/HP/{GhostBar,FillBar,Text (TMP)}. Components are only RectTransform, CanvasRenderer, Image and TMP; no custom gameplay script found. HP is 2.6 x 0.4, y=-0.3. Root Y rotation is 180 degrees; reconcile with target billboard rather than copying blindly.
FillBar/GhostBar sprite GUID 4a5f1855d898deb459a14ff351cd56c5 resolves to Assets/Game/Textures/Common/progressBar_HP_2_.png. Frame GUID eb4bba0c7d960104b9c29e3d2104f902 resolves to progressBar_HP_1.png. Source TMP font is Assets/Game/Fonts/FFFFORWA SDF.asset. Target has font candidates. Source text 5/20 is sample content, not real HP.

Claude planning considerations: use frame/fill with existing WorldHealthBar, explicitly decide omission of static sample text and GhostBar (a full static ghost can misrepresent HP). Candidate changed assets: Gameplay.unity, Prefabs/Monster/Monster.prefab and two UI PNGs/import metadata if no equivalent target sprites exist. Exact destination and object lists must be settled in plan. No new class/interface/pattern is currently indicated.

Verification required: box fit to map, open routes/entrances, player/monster collisions; camera orbit/zoom near obstacles and portrait/landscape; full/partial/zero health, facing camera, no sample text, no foreign gameplay components, serialized references, Console/missing scripts, Luna runtime and measured build under 4.5 MB. No functional/build verification has run.

Working tree has extensive pre-existing changes including Gameplay and monster assets: preserve them. No earlier specs/plans/approvals were read or inherited. Only research artifacts and current pointer are written.

Handoff: Claude must inspect remaining spatial/dependency details read-only, write shape.md, plan.md, standards.md and request approval. Codex implements only after exact approval.

## Live Unity follow-up
Read-only Editor inspection found CityMap/CityMap_Cropped_Colliders with 110 direct child groups and many existing BoxColliders (including Structure groups). This corrects the earlier disk-only scan, which did not include inherited/unsaved objects. Do not add another overlapping collider set. Ground and map boundaries describe a cropped region, while some existing structure colliders extend beyond it. Need compare existing coverage with requested remaining box work before changing layout. Implementation remains stopped under unexpected-issue rule; user must choose whether to audit/continue existing group or replace it. Replacement is not authorized.

## Audit and UI preservation constraint
User explicitly requires all existing gameplay UI to remain intact. Live Unity audit: 1164 boxes in 110 collider groups; disabled=0, triggers=0, duplicate world AABBs=0, fully outside cropped map=0. Scene monster WorldHealthBar camera IS assigned. HealthBarAnchor is WorldSpace Canvas, rect 300x32, world scale .01. Existing two images are Background and Health. Source two PNGs are sufficient for visual frame/fill; do not import sample text or source scripts. Keep the entire gameplay Canvas hierarchy and active states. Meshes are non-readable; no importer settings were changed. Gap coverage is not yet established; collider counts alone do not prove completeness. No implementation assets have been changed.
