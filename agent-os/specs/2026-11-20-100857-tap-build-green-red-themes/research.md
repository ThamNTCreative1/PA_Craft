# Theme selection research
Status: RESEARCH READY

## Request
Add Green and Red visual themes from the user-provided V89 ZIP and a single Luna dropdown with Default, Green, Red. Reference images show green background with red title and red background with green title.

## Observed current source
- Enabled build scene: Assets/_Playable_/Scenes/Gameplay.unity. UI-only Tap to build scene, verified through YAML and existing scene tests; not executed in Editor.
- TapToBuildFlow wires four material buttons to GameManager.EndGame, hides hint and shows EndCardView on Ended. This feature should preserve this behavior.
- Scene includes BG, TapToBuild, HousePanel, TopTools, TopCurrency, Material1..4, EndBG. Existing sprites live in Assets/_Playable_/UI/TapToBuild.
- No theme selector found in relevant source. NoelSkinSelector demonstrates an existing enum field with LunaPlaygroundField/Section and serialized references; no code reuse from another project is required.
- OrientationLayout sets nine portrait/landscape anchor entries. Background fit/cropping needs visual validation: source backgrounds are landscape while supplied reference compositions are portrait.

## Source asset inventory
ZIP: C:/Users/Admin/Downloads/V89 - TaptpbuildXmas (Assets Playable) (ThamNT) (AnhNTN) (1).zip
- bgg.png: green festive background, 1920x1080, 1,999,079 bytes.
- bgr.png: red festive background, 1920x1080, 1,886,350 bytes.
- Tap to build_g.png: green transparent title, 641x118, 7,794 bytes.
- Tap to build_r.png: red transparent title, 641x118, 7,726 bytes.
- preview_fix1.png: portrait green reference, visually inspected, red title.
- preview_fix2.png: portrait reference available; not inspected. User supplied red reference visibly uses green title.
Only selected assets were extracted to OS temp for inspection. No assets imported into Unity.

## Interpretation for Claude to resolve in plan
- Default should retain current appearance and be the initial enum value.
- Green maps bgg.png plus red title; Red maps bgr.png plus green title, matching user images despite title filename suffixes.
- User requested gameplay themes; whether EndCard also changes is unspecified. Do not silently extend scope.
- Prefer serialized UI Image references and direct sprite assignment. Exact class/file/assets and lifecycle are Claude planning decisions, not approved here.
- Plan must list exact script, scene/component, imported assets/meta changes and verification before approval.

## Risks and verification requirements
- Existing dirty files before research: .idea/.idea.PA_Craft/.idea/claudeCodeTabState.xml, agent-os/specs/current.md, luna.json; existing untracked spec folder 2026-11-20-1000-luna-theme-dropdown. No old spec contents read or inherited. Preserve those changes except the workflow-authorized current pointer replacement.
- Product mission documentation differs from current scene; current source is the evidence for this request.
- Source PNG bytes are not build bytes. Measure final Luna package against under-4.5-MB requirement; additional backgrounds may materially increase size.
- Verify actual dropdown has exactly three labels, initial Default, correct theme/title pairing, restoration to Default, portrait/landscape composition, button/hint/end flow unchanged, compile/Console and actual Luna runtime/build. Dropdown support evidenced by existing enum pattern, not verified in Playground.
- No implementation, Unity mutation, test run or build performed.

## Handoff
Claude must create shape.md, plan.md, standards.md for this work item per agent-os/workflows/codex-claude-codex.md. Load architecture and verification skills for the implementation plan. User approves exact plan before Codex implements.
