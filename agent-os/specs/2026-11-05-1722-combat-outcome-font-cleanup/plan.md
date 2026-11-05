# Combat outcomes, Luna groups and font cleanup v1

Status: APPROVED
Approved by: user (oke, 2026-11-05)
Approved scope: Combat outcomes, Luna groups and font cleanup v1, including runtime cause gate.
Planner: Claude CLI; recorded by Codex with routine choices resolved in shape.md.

## Gate and verified findings

Before source edits, reproduce current natural flow in Editor with transient state/hit/end-type diagnostics. Confirm whether50second timer counting selection/tutorial triggers Timeout->Ended->Freeze and prevents laterWin/Lose. If observed freeze/missing panel happens without that path and needs a different solution, stop/report/reapprove, do not guess another fix.

Other verified facts:100HP/25damage means4hits; ButtonBlock sibling4 lies aboveWin2/Fail3; existing autoCTA1second; monsterAttack already loops; synchronous OnAnimationHit->Died->Ended->Freeze can return into FixedUpdate unless guarded; duplicate font dependencies via Ammo and InfinitySwipe. Keep fallbacks/otherassets until proven unnecessary.

## Exact files/classes

1. Assets/_Playable_/Scripts/GameController.cs — attribute section/order only: existing Weather Environment1, Brightness Environment2. Preserve field names/titles/brightness/weather logic.
2. Assets/_Playable_/Scripts/Heroes/HeroRoster.cs — existing HeroSlot1..4 attrs Heroes section, order1..4. Keep resolver/defaults/config ownership.
3. Assets/_Playable_/Scripts/Manager/GameManager.cs:
   - New private bool _timerArmed and public void BeginCombatTimer(): ignore repeat/ended; arm/reset elapsed once. Update counts/checks timeout only whenarmed. EndTime remains combatlimit and existing Timeout panel/flow stays separate.
   - Accepted EndWithWin/EndWithLose only: raise chosen panel SetAsLastSibling, Show, play correct endcliponce, FinishEnd. TryBeginEnd guard remains sole outcome gate, no new outcome/replay/store flow. Preserve first-frameinputguard.
   - Explicit serialized AudioSource _endAudio, AudioClip _winSound,_failSound. PlayOneShot on dedicated2Dsource, actionable missingref error while stillshowingpanel. No new singleton/query. Source independent of gameplay weapon/audio and remains active through outcome.
   - Luna attrs: EndTime Gameplay1; BackgroundMusic Audio1; Win Sound Audio2; Fail Sound Audio3; existing _autoCtaDelay exposed as Auto CTA Delay EndCard1, proposeddefault5seconds and scene5. Attrctor confirmed support section/order; use named fieldSection/fieldOrder on fields, positional title/order/section on assetattrs if necessary. Existing autoCTA behavior retained, delayed forvisiblefeedback/full4.36secondwinsound.
   - No timeout SFX added.
4. Assets/_Playable_/Scripts/Flow/MonsterHeroFlowController.cs — OnTutorialCompleted calls BeginCombatTimer beforemonster.Activate. Existing cleanup/eventsubscriptionsunchanged.
5. Assets/_Playable_/Scripts/Monster/MonsterController.cs — default attackDamage20, Stop motor eachAttacktick, after OnAnimationHit return ifstate no longerAttack to preserve synchronousFreeze/Dying. Existing Approach/Attack cadence/rangechecks remain; no reactivation aftervalidend. Retain standingstillduringattack/chaseafterwards.
6. Assets/_Playable_/Prefabs/Monster/Monster.prefab — attackDamage20; preserve750HP, transforms, motor/animator/UI/audio refs.
7. Assets/_Playable_/Scenes/Gameplay.unity — ensure no instance damageoverride; dedicated nonloop/nonPlayOnAwake spatial0 AudioSource on active GameManager root, wire winclip Assets/_Playable_/Sound/victory.wav and failclip Assets/Sound/game-over.mp3; delay5. Rebind Ammo to canonical Assets/Game/Fonts/FredokaOne-Regular SDF.asset and defaultmaterial, remove only stale fontoverrides relevant to redundant clone dependency. Keep other UI/styles/gameplay refs intact.
8. Assets/_Playable_/Prefabs/InfinitySwipe.prefab — SWIPE TO MOVE text font/defaultmaterial -> canonical Assets/Game/Fonts/FFFFORWA SDF.asset; no other presentation/actionchanges.

No new classes/interfaces/patterns. Unchanged: PlayerHealth/Health, AudioManager, WinPanel/FailPanel/responsivelayout, camera/playerinput/tutorial scripts, font/material/texture files, TMP Settings/globalfallbacks/audioimporters. Do not delete fonts or LiberationSans fallback atlaspages. Existing death-animation freeze outside scope.

## Flow/lifetime

Tutorial.Completed -> Flow armscombatclock and Activatemonster -> repeated rangechecked hits ->100,80,60,40,20,0 -> PlayerHealth.Died -> Flow.EndWithLose. Projectiles -> monsterhealth0 -> Defeated -> Flow.EndWithWin. Acceptedresult -> Endedcleanup/Freeze -> selectedpanelraised+shown -> one SFX -> existing LunaGameEnded and5secondautoCTA. Sound lifecycle owned by GameManager existing active root; no subscriptions added. Guard afterhit prevents return toApproach aftersynchronousend.

## Order / checks

- Snapshot scoped files/current dirtyscene, record beforedependencies/Console. Reproduce gate above beforemutations.
- Script changes first, fullUnityassetrefresh ifneeded, waitcompile/domainreload, Console before dependent prefab/scene edits.
- Apply20damage/config/audio/fontbindings, keep unrelatedchanges. Verify attributesmetadata sections/order and no dupfields.
- Natural selection/tutorial/actualcombat: exactly5real landedattackcycles at20damage;4hitsleavealive;fifthdeathonce, Failvisibleaboveblock, soundcorrectonce, Frozenstate retained. Playeroutofrange avoidsdamage, monsterresumeschase/attack.
- Actualprojectilekill givesWinonce andcorrectsound. Waitmorethan50seconds inselection/tutorial withouttimeout; combatlimit still triggers existingTimeoutwithnosound. Do not trigger actualstore; use runtime diagnostic interception/delay to inspect5seconddeadline without externalaction.
- Panelmouse/raycast firstframeguard, responsiveportrait/landscape and cuecleanup unchanged;audio2Dnonloop/oneshot. Duplicateoutcome calls cannotduplicateSFX/end.
- Fontmissingglyphscan forAmmo dynamiclabels/digits andSwipe; before/aftervisuals andGetDependencies: removeMissionFredoka andTextMeshProFFFFdependencies fromplayablescene/prefab, retain2canonicalfamilies. Newmaterialdependencywouldneedapproval.
- ActualLuna build/export before/afterbytes/atlascounts needed for any sizeclaim; if unavailable markunverified. Sourcefontfilepresence is notexportsize. No under4.5MBpromise withoutmeasurement.
- Report changedscope,tests/errors/warnings, measured/unverifiedLunaevidence and remainingrisks. Any differentclass/file/asset/architecture needed -> renewedapproval.
