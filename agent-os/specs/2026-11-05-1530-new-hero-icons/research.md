# Research
User requests replacing character icons using Assets/_Playable_/2D Texture. No implementation mutation yet.
HeroRoster in Gameplay.unity currently maps8 IDs to sprites from Assets/_Playable_/UI/HeroPortraits.png. HeroCardView.Bind applies entry.Portrait at hero-selection Show. Currentslots0,1,5,7. Four existing Portrait Images are Simple/white/preserveAspecttrue.
Eight new nhan-vat-*-chinh-dien.png assets all already load as single Sprite, imported930x1692. No importer/image creation needed. Visualinspection of red/brown images versus oldatlas confirms Default redjacket,TribalYouth brownjacket. Other filenamecharacteridentities map unambiguously.
Mapping from HeroId and currentdisplayname:
0 Default -> nhan-vat-ao-do-chinh-dien.png
1 Summer Vacation/Npc7 -> nhan-vat-ky-nghi-he-chinh-dien.png
2 Tribal Youth/Npc33 -> nhan-vat-ao-khoac-nau-chinh-dien.png
3 Derpy Fishman/Npc26 -> nhan-vat-ca-cam-chinh-dien.png
4 Panda Onesie/Npc5 -> nhan-vat-panda-chinh-dien.png
5 Doctor -> nhan-vat-nhan-vien-y-te-chinh-dien.png
6 FireFighter -> nhan-vat-linh-cuu-hoa-chinh-dien.png
7 Police -> nhan-vat-canh-sat-chinh-dien.png
All above under Assets/_Playable_/2D Texture/.
Candidateonlyimplementationfile Gameplay.unity:8 HeroRoster._heroes[i]._portrait references and4 current HeroCardViewPortraitImage sprite preview references matching slots0,1,5,7. PreserveIDs/names/slots/skins/controllers/weaponsocket/layout/buttonlogic/camera/monster/gameplayHUD. No scripts/classes/interfaces/patterns/importsettings/imageedits/deletes oroldatlas removal. Existing bindingmakesnewiconsfollowfuturePlaygroundslotchanges.
Verify8 refs and4 previewmatches; realShow withresolvedslots matchesentryportraits, preserveAspect, herochoicestillselectscorrectskin; existingUIunchanged andConsole. No new runtimecode needscompilation. Newtexturesmaycontributetobuildsize; noLunabuild/sizeclaimunlessmeasured. Existingworkingtree preserved; EditorEditModeatinspection.
