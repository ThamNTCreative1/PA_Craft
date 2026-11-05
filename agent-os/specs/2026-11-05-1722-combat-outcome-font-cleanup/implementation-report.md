# Combat outcomes / Luna groups / font cleanup v1

Approved by user oke. Implemented approved eight-file scope, no new classes/interfaces/packages/shaders/font/material/audio assets or importer changes.

## Confirmed original cause

Transient Editor diagnostic exercised selection, screen-press handler, joystick pointer drag and fire pointer input without changing combat code. Baseline trace before/reproduction.txt:

- Hero selected at scene38.01s, tutorial completed41.72s.
- Quái Attack47.89s, landed hit49.04s: HP100->75.
- At50.00s: tutorialCancelled, monsterFrozen, HP75, timeout=True, win=False, fail=False.

This satisfied approved reproduction gate: scene timer counted selection/tutorial and cut combat off. It was not a one-attack animation-only stop.

## Changes

- GameController.cs / HeroRoster.cs: existing attrs grouped/order metadata, stable field labels/names retained.
- GameManager.cs: one-shot BeginCombatTimer arm/reset API; only armed combat increments/checks timer. Accepted Win/Lose raises its panel above fullscreen block, shows it, plays matching dedicated end AudioSource once, then existing FinishEnd. Explicit Win/Fail Sound assets grouped Audio; Auto CTA Delay grouped EndCard, default/scene5seconds. No new timeout sound or result/retry/store behavior.
- MonsterHeroFlowController.cs: arm timer after tutorial completion before activating monster.
- MonsterController.cs: damage default20; motorStop duringAttack; state guard immediately after synchronous hit callback preserves Frozen/Dying if end happened during hit.
- Monster.prefab: ONLY attackDamage25->20;750HP/other config unchanged (evidence/Monster.prefab.diff).
- Gameplay.unity: dedicated 2DAudioSource on GameManager, clips victory.wav/game-over.mp3, delay5; Ammo canonicalFredoka/defaultmaterial.
- InfinitySwipe.prefab: ONLY TMP font+material refs changed to canonical Game FFFFORWA.

Scene diff (evidence/scene-diff.json) has GameManager root+component and Ammo font edits, one new AudioSource block. Four Hero-name TMP m_fontSizeMax30->45 changes appeared concurrently in Editor during work and were retained; no implementation command targeted those values. No existing objects removed. Final scene clean, EditMode, Win/Fail inactive, delay5, monsterdamage20, endAudio valid. Unrelated work preserved, no commits/resets.

## Runtime verification

All input automation uses existing Unity handlers/events; no permanent test scripts or physical-device claims.

1. **No premature timeout / five attacks:** evidence/five-hits.txt waited55real seconds on selection: elapsed stayed0, game alive. Natural callback/pointer tutorial progression then monster's normal FixedUpdate attack cycles yielded HP100->80->60->40->20->0 at combat6.55,7.95,9.35,10.75,12.15s. Fifth hit alone caused Lose; Frozen retained; timeoutFalse, winFalse, failTrue; SFX playingTrue. Recorded autoCTA deadline4.994seconds before test interception to avoid opening a store.
2. **Fail visibility/input:** repeated actual five-hit run evidence/lose-verified.txt/png: failTrue only, aboveBlockTrue, topRaycastButton. Dedicated end source playing at accepted result. Diagnostic deadline was already intercepted to MaxValue in repeated sample; use first run above for5second timing, not repeated sample.
3. **Projectile Win:** evidence/projectile-win-verified.txt and win-verified.png: existing pooled projectiles dealt10 repeatedly, monster750->0 at15.00combatseconds; WinTrue, FailFalse, TimeoutFalse, SFXplayingTrue. Player was diagnostically invulnerable for this isolated Win-route test; no health/source configuration was saved. A prior stationary, unprotected shooting attempt correctly lost on fifth hit with monster150HP left; not a game balance change or a successful Win test.
4. **Duplicate result guards / CTA:** after Win sound finished, repeated EndWithWin/EndWithLose did not restart sound or reveal Fail. Win aboveBlockTrue; EventSystem raycast hits Button then Win_Panel then ButtonBlock. No store button invoked; runtime _autoCtaAt intercepted after each accepted outcome. Existing first-frame CTA guard untouched; no real browser/store/auto-install call exercised.
5. **Tutorial wait / range miss / Timeout:** evidence/tutorial-miss-timeout.txt waits55seconds atLook with combatelapsed0; then normal input-handler tutorial completion. At first Attack a runtime target relocation moved player10units out of range: HP100 retained through the swing, state returnedApproach and resumed chase. Test then advanced elapsed to49.95 (accelerated boundary test), existingTimeout fired at50 with no Win/Fail and no outcomeSFX. This is not a full50secondcombat idle duration test.
6. **Sound wiring:** source volume1, spatialBlend0, playOnAwakeFalse, loopFalse; existing victory4.36s and game-over2.04s. PlayOneShot observed playing during both results; correct explicit clip refs verified. No new AudioManager coupling, no device listening test claimed.

An intermediate diagnostic ran after an Editor Play session had already stopped and inadvertently activated Win in EditMode. Its mixed Win/Fail result and camera-only image were discarded. Known temporary root active/sibling changes were restored before clean reruns; final source and Editor both have Win/Fail inactive. The verified images/traces named above are authoritative. Runtime-only guards added to later diagnostic invocations.

## Font and Luna verification

- Direct scene dependency font assets4->2: removed MissionsJournal/Fredoka clone and TextMeshPro/Fonts/FFFFORWA duplicate (evidence/dependency-summary.json and before/afterdependency lists). Canonical families remain Game FFF Forward and Fredoka One; Bold Outline material retained. No source font files/fallback pages deleted.
- Current scene text glyph scan empty; Ammo dynamic digits/UNLIMITED/RELOADING scan empty. Fredoka face family/style/normalized line metrics identical; FFF Forward normalized line-height ratio identical despite differing atlas point sizes. Existing hierarchy/text actions preserved.
- Installed SDK reflected attrs confirm11field/assetentries grouped Environment, Heroes, Gameplay, Audio, EndCard with required orders (evidence/luna-groups.txt). No duplicate config fields or ownership migration. Playground browser/export UI itself not inspected.
- Scripts compiled/domain reload completed before asset edits; final Console error query0. Reviewed warnings during tests: Account API unavailable and Unsupported platform WebGL1 Hidden/InternalErrorShader. No shader modified to address these unrelated export warnings.
- Static changed-script audit: no prohibited scene searches, runtime reflection, new input/package/shader APIs. Editor diagnostics used reflection only in memory. Unchanged WinPanel/FailPanel/PlayerHealth/Health/selection/layout hashes recorded.

## Size / remaining limits

No fresh Luna build or measured before/after exported bytes; manage_build provides ordinary Unity player builds, not a configured Luna export. Removing direct font dependencies does not prove all Resources/fallback atlas export counts or total size. Added endclip references may offset byte savings; source file sizes are not compressed build contribution. Under4.5MB and browser/device/audio behavior remain unverified. No geometry changes. Existing frozen monster death animation remains outside scope as approved.
