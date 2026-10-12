# Paintball shared movement tutorial and portrait crosshair
User explicitly requested shared vehicle-mission movement/look tutorial for paintball and larger portrait crosshair. Two-file scope and 1.8x portrait adjustment stated before edits.

Changes:
- PaintballMissionController inherits the common UsesDrivingTutorial=true flag used by MissionsJournalController to show GameController guidance. Legacy paintball guidance explicitly ends on entry and no longer begins; existing scene references retained.
- PlayerPaintballController caches the original crosshair local scale and adjusts it with camera aspect. Landscape/square multiplier 1; 9:16 portrait and narrower multiplier 1.8; intermediate ratios blend smoothly. Serialized multiplier allows tuning. Existing reticle-center aim ray remains in use.
No scene/prefab/font/export setting changes. Prior font atlas issue is outside this request.

Verification:
Unity compilation/domain reload succeeded; Console zero errors.
Seven PlayMode checks passed through journal OnGoPressed and actual scene components: weapon equipped, common hints visible, legacy tutorial hidden, one HandleStartTutorialPress call hides both, firing hint retained, 9:16 multiplier 1.8, landscape restored.
Input check directly invoked the existing press handler (no physical mouse/touch synthesized). Aspect check directly invoked sizing method; full portrait viewport visual QA and fresh Luna/device build not performed.
No new interfaces/classes/dependencies/packages or asset budget changes. Source backups: C:/Users/Admin/AppData/Local/Temp/paintball-shared-ui-u1gasxi4. PlayMode stopped without saving scene.
