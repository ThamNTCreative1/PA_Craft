# Player death animation
Status: APPROVED
Approved by: user ("oke hãy làm di" following the explicit player-death plan)
Scope: add terminal Death animation/state for all player skins; on player death stop input/shooting/physics immediately, play Death without the weapon pause freezing it, then show Lose after the clip. Preserve Win and Timeout.
Code: Assets/_Playable_/Scripts/Controller/PlayerController.cs (death playback and duration); Scripts/Flow/MonsterHeroFlowController.cs (death delay and playback after common pause); Scripts/Manager/GameManager.cs (delay Lose presentation only, guard installs until endcard). No weapon, health/damage, monster, movement or tutorial rules changed.
Assets: shared player fall clip under Animations/Luna/Player_Death.anim; Death state in the current eight armed hero controllers plus the existing on-foot controller. Reuse DefaultVisual/HeroSkins transform wrappers, preserve rigs/materials.
Verification: Unity compile/Console; all eight skin controllers/Death progression; lethal damage: immediate pause, moving corpse pose before Lose, delayed Lose once, no install before endcard; immediate Win/Timeout regressions. Report Luna build/browser unverified if not run.
