# Implementation report
Status: APPROVED DATA CHANGE IMPLEMENTED AND VERIFIED
User confirmation: oke for exact plan.md.

## Changes
Only implementationfile Assets/_Playable_/Scenes/Gameplay.unity. EightHeroRoster portraitrefs nowuse corresponding existing nhan-vat-*-chinh-dien Sprites in2DTexture; fourcurrentcardImage previewrefs updated forslots0,1,5,7. Exactly12 referencevalues across5scene blocks; allother scene fields identical to pre-changebackup. No objects/classes/interfaces/patterns/scripts/importsettings/layout/IDs/names/slots/skins/controllers/weaponsockets changed. Oldatlas preserved; profileHUDavatar untouched by scope.

## Evidence
- gameplay-before.unity.bak preserves savedcurrentuserstate.
- diff-evidence.json proves12refs only, no otherfields/objects changed.
- EightSpriteassets existed and loaded; mapping verified beforeassignment. Metadata,CameraController andoldatlas SHA256 unchanged (untouched-hashes.json).
- PlayMode4cards bind correct newportraits forDefault,SummerVacation,Doctor,Police;allpreserveAspecttrue.
- Actual existing cardButton callback forDoctor selectedID5; onlyskinID5 active andselectionpanelhidden. Other7hero choices notclicked; their datarefs verified and selectioncode unchanged.
- evidence/new-hero-icons.png is SceneViewpreview showingnewicons. No layout/croppingadjustments made.
- playmode-verification.json recordsbindings/selection. Finalerrorquery0. Warnings: MCPduplicate-command suppression andAccountAPI30sec/network/editorfocus; no warning-freeConsoleclaim. Initial diagnostic assumedrosteronFlow and failed; corrected read-onlydiscovery, no productioncode changes.
- Runtime-only diagnostic extendedgameTimeout/CTAdelay toavoidtimeout/storeactions; notsaved. PlayModeexited. No commits/staging/newassets/oldatlasdeletion.

## Limits
NoLunabuild/runtime or4.5MBmeasurement. Existingnewtexturesnowreferenced maychangebuildsize; notmeasured. No realdevice/completeorientation/layoutsuite. No claim all8skinsclicked orbuildbudgetpassed.
