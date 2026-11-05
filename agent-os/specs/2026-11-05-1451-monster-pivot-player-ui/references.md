# References
- Assets/_Playable_/Scripts/Monster/MonsterController.cs: Activate,FixedUpdate,ReceiveHit; controller on model child.
- Assets/_Playable_/Scripts/Paintball/PaintballNpcMotor.cs: MoveTowards,Face,ground sampling anchored at Rigidbody root.
- Assets/_Playable_/Prefabs/Monster/Monster.prefab: motor/root and model/collider/controller references; child localzero,HP750.
- Assets/_Playable_/Scenes/Gameplay.unity: current root/child transform overrides causing large positional offset.
- Assets/_Playable_/Scripts/Tutorial/CombatTutorialController.cs: Begin,OnLook,Update,OnShot,Cancel and cues.
- Assets/_Playable_/Scripts/Flow/MonsterHeroFlowController.cs: Start,OnHeroChosen,OnTutorialCompleted,OnEnded.
- Assets/_Playable_/Scripts/Paintball/PlayerPaintballController.cs: Equip sets HUD active, ShotFired progression.
- Assets/_Playable_/Scripts/Paintball/PaintballProjectile.cs: collider.GetComponentInParent<MonsterController> and damage.
- agent-os/workflows/codex-claude-codex.md; governance,architecture,tutorial,verification skills and standards index.
