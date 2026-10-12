# Missions Journal — Implementation Report

Date: 2026-10-08
Status: APPROVED IMPLEMENTATION AND RIGIDBODY AMENDMENT COMPLETE; RELEASE ACCEPTANCE BLOCKED by Luna touch-cancel behavior and package budget.

## Scope and approvals

Only the spec selected by `agent-os/specs/current.md` was read: `2026-10-08-1018-missions-journal`. Its APPROVED plan and Option A defaults govern this implementation. No other plan/spec was read.

User-approved amendments:

1. Use GameController's actual references: `_startTutorial` = `Canvas/GamePanel/UIPlayer/InfinitySwipe`; `_moveTutorial` = `Canvas/GamePanel/UIPlayer/Minimalist Joystick 04/Text (TMP)`.
2. Add a serialized Rigidbody dependency to MissionsJournalController and wire the existing player's Rigidbody; save constraints, clear velocity, freeze while shown, restore constraints on close. User explicitly approved implementation after the physics failure report.
3. The subsequent request to continue was followed by deeper Luna input diagnosis and asset-contribution measurement. No platform/pipeline workaround or unrelated optimization was applied.

## Changes

New scripts and metadata under `Assets/_Playable_/Scripts/UI/MissionsJournal/`:

- `MissionRowView.cs`: fixed row labels/mission ID, GO event and RectTransform target; listener cleanup.
- `JournalHandSequencer.cs`: repeating GO1 -> GO2 -> GO3 sequence, Begin/Stop, tween cleanup on disable.
- `MissionsJournalController.cs`: startup journal, player/tutorial input lock, mission 1/2 no-op, mission 3 handoff, repeat guard, riding guard, Rigidbody freeze/restore.

Scene: `Assets/_Playable_/Scenes/Gameplay.unity`:

- Added Canvas/MissionsJournalPanel, frame/title, three fixed rows, non-raycasting hand and serialized dependencies.
- Added one Button to existing Mission Button (fileID 5719810765228622297), with one persistent Show callback.
- Assigned the exact two existing tutorial references and existing player Rigidbody.
- Final diff: 2,454 additions, zero removals. Only original blocks 1156745260 (Canvas child list) and 5719810765228622297 (HUD component list) changed; 91 new serialized blocks added. Unrelated adaptive UI serialization changes were restored. Scene diff whitespace check passes.

New visual assets and metadata under `Assets/_Playable_/UI/MissionsJournal/`:

- mission_fr.png, Btn_Blue.png (approved source copies, fresh GUIDs).
- FredokaOne-Regular SDF.asset and FredokaOne-Regular Orange Material.mat (approved source adaptation; atlas reference remapped; required glyphs populated; Static mode; dynamic-data clearing disabled).
- Reused existing identical popup_frame.png/tag_title.png and existing icon_hand.png.
- No progress/reward assets, extra button state or unused green/claim asset imported.

Three composed MonoBehaviours; no interface/framework/package added. No existing C# file modified, including GameController.cs, PlayerAction.cs, PlayerController.cs, CameraController.cs, MotorbikeController.cs and GameManager.cs. No project/package/build configuration change by this task. Existing working-tree changes preserved. No commit, push, publish or upload command performed.

## Unity Editor verification

Unity 6000.0.60f1 / PA_Craft / Gameplay.unity, via Unity MCP.

Passed:

- New scripts compile after refresh/domain reload without new C# errors.
- Three rows in required order, correct labels, enabled GO; ten TMP labels report no overflow. See journal-editor.png.
- Hand sampled at 0.1/1.3/2.5/3.7 seconds: GO1/GO2/GO3/GO1, error <=0.000016 world units. Stop hides hand and releases tween.
- Startup journal disables both player components and both tutorial objects.
- GO1/GO2 keep journal open, stop hand, do not mount/move the player.
- GO3 closes journal, re-enables player and tutorials, without auto-mount.
- Five repeated GO3 callbacks do not perform another handoff.
- HUD callback reopens journal and restarts hint/input lock.
- Existing TryMountFromTutorial succeeds after GO3. While riding, HUD is hidden and Show rejects reopening.
- New scripts have zero missing required serialized references. Tutorial identity matches GameController; Rigidbody identity matches PlayerController's GameObject.
- Journal materials resolve to UI/Default and the plan-approved TextMeshPro/Distance Field. Journal font is Static.

Rigidbody regression, after approved amendment:

| Check | Observed result |
|---|---|
| Startup | FreezeAll; velocity zero |
| Reopen during walking, simulate 10 x 0.02s physics | 0 m displacement; velocity zero |
| Close after repeated Show | Restores original FreezeRotation |
| Resume existing movement | Velocity (0.19, -2.00, 0.53), player enabled |
| Reopen with airborne velocity (1, 5, 0) | 0 m displacement; velocity zero |
| Five repeated reopen/close cycles | Constraints restored every cycle |

The earlier 0.1119669 m sliding failure is resolved. Airborne test injected the velocity state; it was not a physical device jumping test.

Console is not globally clean: existing missing script on btnBackToHome, deprecated FindObjectOfType in ModelSwitcher, and intermittent tooling/account/relay warnings remain. No journal exception observed in successful functional checks. These unrelated issues were not modified.

## Luna build and browser verification

Installed Playworks pipeline: F:/7.2.0, version 7.2.0.

Commands (working directory F:/7.2.0/pipeline):

- PROJECT_PATH=D:/Source/PA_Craft; node --max-old-space-size=8192 jake.js -f Jakefile.js project:build
- PROJECT_PATH=D:/Source/PA_Craft; TARGET_PLATFORM=playground; node --max-old-space-size=8192 jake.js -f Jakefile.js package:bundle

Results:

- Unity asset export, asset processing, C# transpilation/bundling and development package completed successfully (exit 0).
- Playground package completed successfully (exit 0), producing the archive under stage4/create-hub.
- A direct TARGET_PLATFORM=create-hub attempt failed because that template does not exist in plugin 7.2.0. The supported playground template succeeded; no configuration file was changed to work around it.
- The exported new scripts include the Rigidbody field/logic.

Browser: local development server http://localhost:8071, installed Microsoft Edge headless through Playwright, software WebGL. Separate desktop mouse and touch-enabled browser contexts. See `browser-verification.json`, `luna-startup.png`, `luna-interaction.png`.

Passed on Luna:

- Journal renders in the iPhone X/XS portrait preview with all three rows and animated hand.
- Mouse GO1 and touch GO1/GO2: stay open; hint stops.
- Mouse drag starting on GO3 and released outside: no selection, journal stays open.
- Mouse and touch GO3: close journal, enable player, no automatic mount.
- Mouse and touch HUD: reopen journal, disable player, restart hint.

Failed on Luna:

- Browser touchCancel on GO3 is treated as selection: journal closes and enables player.
- Follow-up instrumentation of the same GO button callback observed Input.touchCount=1 and GetTouch(0).phase=3 (Ended), despite CDP dispatching touchCancel. The canceled state is lost before the row's C# callback. A simple check for TouchPhase.Canceled (4) in MissionRowView cannot fix this observed path; no ineffective guard was added.

Runtime also reported `Unable to decode audio data` and displayed an unsupported-API notice. The exact API warning was not localized; neither issue was fixed or claimed to pass. Full physical-device testing and a complete manual tutorial comparison remain unverified. Browser checks do not certify all devices or the final packaged host integration.

## Actual package measurement

Fresh output: `LunaTemp/stage4/create-hub/CCPW_V02_AnhPP_HuyNQ_build.zip`, 2026-10-08 11:07:19 local time.

**5,728,645 bytes**: exceeds 4,500,000-byte hard limit by **1,228,645 bytes** and 3,800,000-byte green target by **1,928,645 bytes**. Budget FAIL. It also exceeds 4.5 MiB if interpreted in binary units.

Largest ZIP entries (compressed bytes):

| Entry | Compressed bytes |
|---|---:|
| engine/scripts.js | 1,491,086 |
| cache/210/scripts.js | 1,278,819 |
| assets/bundles/-1/data.blob | 807,848 |
| assets/bundles/-1/47358.mp3 | 474,247 |
| cache/210/blobs.js | 317,432 |
| assets/bundles/-1/bundle.json | 182,205 |
| assets/bundles/-1/43970.png | 153,725 |
| assets/bundles/-1/62206.png | 122,617 |

New journal texture contribution, mapped from stage2 asset paths to ZIP entry IDs:

| Asset | ZIP entry | Compressed bytes |
|---|---|---:|
| New Fredoka static atlas | 1110254.png | 29,654 |
| Btn_Blue | 1110264.png | 1,650 |
| mission_fr | 1110268.png | 243 |
| Total | | 31,547 |

This texture subtotal excludes script/material/scene metadata, which is packed into shared bundles and was not isolated. Removing all three new textures would still leave the package far above the limit. No unrelated asset deletion, compression or package configuration change was applied. No 3D assets or geometry changed.

The previous 6,434,255-byte archive predates this work and used an earlier build state; it is not a controlled baseline for calculating the feature's size delta. The development directory is 32,521,857 bytes uncompressed and is not the delivery package budget measurement.

## Static audit

- No prohibited runtime Find/tag/Resources lookup, InputSystem, Physics2D or direct Luna SDK call in the three new scripts.
- No modified tracked gameplay scripts; camera and GameController remain unchanged.
- Scene whitespace check passes after removing trailing spaces only from new serialized blocks.
- Old Input/EventSystem modules, existing timer/outcome behavior and mission 1/2 deferral preserved.

## Remaining decisions

The approved Rigidbody work is complete. Overall release acceptance is blocked by two issues that cannot be resolved by the measured journal-only asset reduction or a simple canceled-touch C# guard.

Option A: explicitly accept the current package size and touch-cancel limitation for this delivery. This changes acceptance criteria and requires user approval.

Option B (recommended for the original acceptance targets): have Claude prepare an additional approved plan covering (1) a cancellation signal at the Luna/browser input boundary, with exact bridge/script/config files and verification, and (2) measured optimization of existing script/cache/audio/asset contributors sufficient to reach the budget. Codex can then implement that exact plan. Current evidence does not authorize editing the installed Luna plugin, adding a browser bridge, altering GameController or reducing unrelated assets.

No claim of full acceptance, clean Console, device certification or budget compliance is made.
