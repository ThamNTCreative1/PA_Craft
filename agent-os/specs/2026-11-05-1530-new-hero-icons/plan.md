# Plan
Status: APPROVED
Approved by: user
Approved scope: eight HeroRoster portraits and four preview sprites in Gameplay.unity only; confirmation oke
Planner: Claude CLI; reviewed by Codex.
Only implementation file: Assets/_Playable_/Scenes/Gameplay.unity.

## Exact mapping
HeroRoster._heroes portrait refs:
- ID0 Default -> Assets/_Playable_/2D Texture/nhan-vat-ao-do-chinh-dien.png
- ID1 Summer Vacation/Npc7 -> Assets/_Playable_/2D Texture/nhan-vat-ky-nghi-he-chinh-dien.png
- ID2 Tribal Youth/Npc33 -> Assets/_Playable_/2D Texture/nhan-vat-ao-khoac-nau-chinh-dien.png
- ID3 Derpy Fishman/Npc26 -> Assets/_Playable_/2D Texture/nhan-vat-ca-cam-chinh-dien.png
- ID4 Panda Onesie/Npc5 -> Assets/_Playable_/2D Texture/nhan-vat-panda-chinh-dien.png
- ID5 Doctor -> Assets/_Playable_/2D Texture/nhan-vat-nhan-vien-y-te-chinh-dien.png
- ID6 FireFighter -> Assets/_Playable_/2D Texture/nhan-vat-linh-cuu-hoa-chinh-dien.png
- ID7 Police -> Assets/_Playable_/2D Texture/nhan-vat-canh-sat-chinh-dien.png
Also update existing4 HeroCardView Portrait Images editor-preview sprite refs from resolvedslots0,1,5,7. Total12 reference values,notlayoutchanges. Verify actual sprite GUID/localID instead of assumingfileID. All8assetsalreadyvalidSingleSprite930x1692.

## Unchanged
IDs,names,slots,skins,controllers,weaponsockets; SimplewhitepreserveAspecttrue and allrect/layout/buttonlogic; gameplayHUD/avatar,camera,tutorial,monster750. No C# edits,newclasses/interfaces/patterns,newassets/importsettings/imageedits,atlasdeletion,gitstaging/commits. ProfileHUDavatar is outside this portraitselection scope.

## Execution/verification
Preservecurrentuseredits,saveonlyEditModeandbackupbeforechange. Assign8rosterSpriteand4previewSpritevalues viaUnity then save. Compareagainstbackup: only12 referencevalues inroster+4Imageblocks; no otherobjects/components/layoutchanges. Verify8identitiesand4currentcards,PlayModeShow/Bind correctportraits,choicecorrectskin andexistingHUDretained,Console/missingreferences,visualaspect. Existing4ImagepreserveAspecttrue meansnocrop/stretchlayoutchange; reportiflayoutissuesratherthanadjustwithoutapproval. No sourcebuildsize/runtimeclaim: Luna/buildsizeunverifiedunlessrun.

