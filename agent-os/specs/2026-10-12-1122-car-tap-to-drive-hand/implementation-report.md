# Car tap-to-drive hand implementation
Approved scope: plan.md, user confirmation "okee".

Changed: CarDriveTutorial.cs and .meta (new), CarMissionController.cs, Gameplay.unity.
- World-space canvas parented to Playable Sports Car at local (0,3.7,0), scale 0.012, with existing hand sprite and ScaleHandHint pulse. TAP TO DRIVE label below hand uses existing font/material.
- Controller tracks mission/pause/completion and billboards visual toward serialized camera. Paired CarMounted subscription hides cue on successful mounting. Begin resets completion; End hides.
- No new interfaces/packages/shaders/textures; existing arrow retained. All graphics raycastTarget=false; no new collider or raycaster.

Verification:
- Unity 6000.0.60f1 compile/domain reload successful; Console 0 errors before and after PlayMode checks.
- Actual PlayMode car mission selection succeeded. Ten checks passed: entry visible, pause hides, resume restores, graphics ignore rays, camera-facing orientation at three viewpoints, real TryMountFromTutorial mounts car, CarMounted hides cue, completion survives pause/resume.
- Camera screenshots view-0.png/view-1.png (landscape) and view-2.png (portrait) generated; side and portrait visually reviewed. Initial text occlusion corrected by approved layout tuning before final save. Final local anchor and scale verified after reloading saved scene.
- Scene pre-edit backup: C:/Users/Admin/AppData/Local/Temp/car-hand-backup-m1582erx/Gameplay.unity. New scene blocks: 15. Existing blocks changed for mission reference and car/mission child links; two incidental responsive-UI serialization changes restored to baseline. No existing block removed.
- git diff --check reports Unity YAML empty-value trailing whitespace (including pre-existing uncommitted scene content); no global whitespace reformat performed.

Limits:
- No fresh Luna build/device playback or measured final output size. Must verify the new canvas/font/billboard on Luna before claiming runtime and under-4.5-MB compliance.
- Portrait screenshots render the scene camera and world-space cue, excluding overlay HUD. Full device portrait interaction, mission re-entry through journal UI and exact pulse timing were not separately measured.
- UI geometry added only; no model topology/export changes. Reuses existing sprite and font assets.
