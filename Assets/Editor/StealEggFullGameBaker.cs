using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using UnityEditor;
using UnityEditor.Animations;
using UnityEditor.Events;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;

// Bakes the full original game into the playable scene: original UI prefabs (scripts stripped), NPC stealers,
// scene references for houses/stations and the data tables read from the source project.
public static class StealEggFullGameBaker
{
    const string Source="F:/GAME/StealEgg/steal-an-egg-main/";
    const string Root="Assets/MiniGames/StealAnEgg/";
    const string Generated="Assets/PlayableGenerated/Original/";
    // Original MinigameUIManager sorts frames by push order; HUD lowest, toasts highest.
    static readonly (string prefab,int order)[] Panels=
    {
        ("UI/SAEGamePlayPanel",10),("UI/SAEInventoryPanel",12),("UI/SAEWarningPanel",14),
        ("UI/SAE_UpgradeCoopPanel",30),("UI/SAE_UpgradeTreadmilPanel",30),("UI/SAE_FuseMachinePanel",30),("UI/SAE_LuckyFrogPanel",30),
        ("UI/SAE_ExchangeShopPanel",30),("UI/SAE_TrailShopPanel",30),("UI/Index/SAE_MonsterIndexPanel",30),("UI/SAE_SettingPanel",40),
        ("UI/SAE_RewardEarnPanel",50),("UI/SAE_DialogPanel",60),
    };
    // Features left to the full game: their popup shows only a CTA (title and close button stay).
    static readonly string[] LockedPanels={"SAE_UpgradeCoopPanel","SAE_FuseMachinePanel","SAE_ExchangeShopPanel","SAE_LuckyFrogPanel","SAE_TrailShopPanel","SAE_SettingPanel"};
    const string FullGameText="Download game to play full version";

    [MenuItem("Steal Egg/Bake full game (original UI, NPCs, features)")]
    public static void ApplyToScene()
    {
        if(EditorApplication.isPlaying)throw new Exception("Stop Play mode first.");
        StealEggGame game=UnityEngine.Object.FindFirstObjectByType<StealEggGame>();
        if(!game)throw new Exception("StealEggGame missing. Open Assets/Scenes/StealEggPlayable.unity.");
        StealEggSourceRulesImporter.Apply(game);
        Apply(game);
        EditorSceneManager.SaveScene(game.gameObject.scene);
        // New UI, NPC and combat references change which meshes/clips Luna must keep.
        StealEggLunaMeshFilter.Apply();
        Debug.Log("FULL GAME BAKED: "+game.petCatalog.Length+" pets, "+game.trails.Length+" trails, "+game.npcModels.Length+" NPCs, original UI under '"+game.originalUI.name+"'.");
    }
    public static void Apply(StealEggGame game)
    {
        StealEggSourceRulesImporter.IndexSource();
        Directory.CreateDirectory(Generated);AssetDatabase.Refresh();
        if(game.name=="Luna Playable")game.name="Steal Egg Game";
        BakeOriginalUI(game);
        StealEggFontSetup.ApplyToScene(game.gameObject.scene);
        BakeLockedFeatures(game);
        RemoveUnusedUI(game);
        BakePlayableControls(game);
        BakeLunaController(game);
        StealEggUIBinder.Bind(game);
        BakeSceneReferences(game);
        BakeNpcs(game);
        BakeData(game);
        BakeCombatAnimation(game);
        BakePetAnimations(game);
        BakeOutfits(game);
        BakeSkinnedHair(game);
        BakeArrowMaterials(game);
        BakeMissingShaders(game);
        BakeBoxColliders(game);
        StealEggSpatialAudioSetup.Apply();
        StealEggWorldTextSetup.Apply(game);
        CheckNoBlendTrees(game);
        EditorUtility.SetDirty(game);
        EditorSceneManager.MarkSceneDirty(game.gameObject.scene);
        AssetDatabase.SaveAssets();
    }

    // ---- Original UI ----
    static void BakeOriginalUI(StealEggGame game)
    {
        // Scene-authored tutorial hints under the original buttons survive the rebuild with their own layout.
        var keptHints=new List<KeyValuePair<string,Transform>>();
        // Scene roots are searched directly: GameObject.Find misses an inactive Original UI.
        foreach(GameObject old in game.gameObject.scene.GetRootGameObjects().Where(r=>r.name=="Original UI").ToArray())
        {
            foreach(Transform t in old.GetComponentsInChildren<Transform>(true))
                if(t.name==StealEggGame.TapHintName && t.parent && !keptHints.Any(k=>k.Key==RelativePath(t.parent,old.transform)))
                    keptHints.Add(new KeyValuePair<string,Transform>(RelativePath(t.parent,old.transform),t));
            foreach(var kept in keptHints)if(kept.Value.IsChildOf(old.transform))kept.Value.SetParent(null,false);
            UnityEngine.Object.DestroyImmediate(old);
        }
        GameObject root=new GameObject("Original UI");
        foreach(var panel in Panels)
        {
            GameObject instance=InstantiateClean(Root+"Prefabs/"+panel.prefab+".prefab",root.transform);
            Canvas canvas=instance.GetComponent<Canvas>();if(canvas){canvas.renderMode=RenderMode.ScreenSpaceOverlay;canvas.sortingOrder=panel.order;}
            if(!instance.GetComponent<GraphicRaycaster>())instance.AddComponent<GraphicRaycaster>();
        }
        BakeQuickSlots(root.transform);
        AddTemplate(root.transform.Find("SAEGamePlayPanel"),"Income",Root+"Prefabs/UI/[Text] Income Displayment.prefab");
        // Always-on HUD layers must not swallow camera drags: only interactive graphics keep raycasts.
        foreach(string hud in new[]{"SAEGamePlayPanel","SAEInventoryPanel","SAEWarningPanel","SAE_DialogPanel"})
            foreach(Graphic g in root.transform.Find(hud).GetComponentsInChildren<Graphic>(true))
                g.raycastTarget=g.GetComponent<Selectable>()!=null || g.GetComponentInParent<ScrollRect>(true)!=null;
        game.originalUI=root.transform;
        foreach(var kept in keptHints)
        {
            Transform button=root.transform.Find(kept.Key);
            if(!button){UnityEngine.Object.DestroyImmediate(kept.Value.gameObject);throw new Exception("Tap hint parent missing after rebuild: "+kept.Key);}
            kept.Value.SetParent(button,false);kept.Value.SetAsLastSibling();
        }
        // Playable rule: no CanvasGroup anywhere in the UI.
        foreach(GameObject sceneRoot in root.scene.GetRootGameObjects())
            foreach(CanvasGroup g in sceneRoot.GetComponentsInChildren<CanvasGroup>(true))UnityEngine.Object.DestroyImmediate(g);
        // Duplicates left in the original scene are not used by the playable.
        GameObject controller=GameObject.Find("GameController");
        if(controller)foreach(string path in new[]{"EggNotification/SAE_EggNotificationPanel","GatherIncomeSystem/SAEIncomePanel"})
        {Transform o=controller.transform.Find(path);if(o)UnityEngine.Object.DestroyImmediate(o.gameObject);}
    }
    static string RelativePath(Transform t,Transform root){string path=t.name;while(t.parent && t.parent!=root){t=t.parent;path=t.name+"/"+path;}return path;}
    static GameObject InstantiateClean(string path,Transform parent)
    {
        GameObject prefab=AssetDatabase.LoadAssetAtPath<GameObject>(path);
        if(!prefab)throw new Exception("Missing prefab "+path);
        GameObject instance=(GameObject)PrefabUtility.InstantiatePrefab(prefab,parent);
        PrefabUtility.UnpackPrefabInstance(instance,PrefabUnpackMode.Completely,InteractionMode.AutomatedAction);
        instance.name=prefab.name;
        Clean(instance);
        return instance;
    }
    // Missing source scripts are removed; button/toggle events pointing at them are cleared.
    static void Clean(GameObject obj)
    {
        foreach(Transform t in obj.GetComponentsInChildren<Transform>(true))GameObjectUtility.RemoveMonoBehavioursWithMissingScript(t.gameObject);
        foreach(Button b in obj.GetComponentsInChildren<Button>(true))for(int i=b.onClick.GetPersistentEventCount()-1;i>=0;i--)UnityEventTools.RemovePersistentListener(b.onClick,i);
        foreach(Toggle t in obj.GetComponentsInChildren<Toggle>(true))for(int i=t.onValueChanged.GetPersistentEventCount()-1;i>=0;i--)UnityEventTools.RemovePersistentListener(t.onValueChanged,i);
        foreach(ScrollRect s in obj.GetComponentsInChildren<ScrollRect>(true))for(int i=s.onValueChanged.GetPersistentEventCount()-1;i>=0;i--)UnityEventTools.RemovePersistentListener(s.onValueChanged,i);
    }
    // Quick slots (original ExposeSlot bar): laid out in the scene before the bag button, hidden until they hold an item.
    const int QuickSlots=6;
    static void BakeQuickSlots(Transform ui)
    {
        Transform bar=ui.Find("SAEInventoryPanel/Panel/ExposeSlot/[Container] ExposeSlots");
        Transform bag=bar?bar.Find("[Button] Bag"):null;
        if(!bag)throw new Exception("Inventory quick slot bar missing.");
        for(int i=0;i<QuickSlots;i++)
        {
            GameObject slot=InstantiateClean(Root+"Prefabs/UI/Selections/[Button] Inventory Expose Selection.prefab",bar);
            slot.name=StealEggGame.QuickSlotName+i;slot.transform.SetSiblingIndex(bag.GetSiblingIndex());
            Transform mark=slot.transform.Find("[Image] Editing Mark");if(mark)UnityEngine.Object.DestroyImmediate(mark.gameObject);
            slot.SetActive(false);
        }
    }
    static void AddTemplate(Transform panel,string name,string prefabPath)
    {
        Transform templates=panel.Find("Templates");
        if(!templates)
        {
            RectTransform rt=new GameObject("Templates",typeof(RectTransform)).GetComponent<RectTransform>();
            rt.SetParent(panel,false);rt.anchorMin=Vector2.zero;rt.anchorMax=Vector2.one;rt.offsetMin=rt.offsetMax=Vector2.zero;templates=rt;
        }
        GameObject template=InstantiateClean(prefabPath,templates);template.name=name;template.SetActive(false);
    }

    // ---- Locked features: original popup frame, title and close button, then the full-version text and PLAY NOW ----
    static void BakeLockedFeatures(StealEggGame game)
    {
        Transform ui=game.originalUI;
        Transform coop=ui.Find("SAE_UpgradeCoopPanel/Panel/Popup");
        Transform textStyle=coop.Find("[Text] Title"),closeStyle=coop.Find("Button_Close");
        Transform buttonStyle=ui.Find("SAE_SettingPanel/Panel/Popup/[Container] Buttons/[Button] Continue");
        if(!textStyle || !closeStyle || !buttonStyle)throw new Exception("Locked feature styles missing in the original UI.");
        textStyle=UnityEngine.Object.Instantiate(textStyle);closeStyle=UnityEngine.Object.Instantiate(closeStyle);buttonStyle=UnityEngine.Object.Instantiate(buttonStyle);
        foreach(string name in LockedPanels)
        {
            Transform popup=ui.Find(name+"/Panel/Popup");
            if(!popup)throw new Exception("Locked panel missing: "+name);
            // Only the title and close button stay; the rest of the feature UI is removed.
            foreach(Transform child in popup.Cast<Transform>().ToArray())
                if(!child.name.Contains("Title") && child.name!="Button_Close")UnityEngine.Object.DestroyImmediate(child.gameObject);
            if(!popup.Find("Button_Close"))
            {
                Transform close=UnityEngine.Object.Instantiate(closeStyle,popup,false);close.name="Button_Close";close.gameObject.SetActive(true);
            }
            RectTransform locked=NewRect(StealEggGame.LockedContent,popup);
            locked.anchorMin=Vector2.zero;locked.anchorMax=Vector2.one;locked.offsetMin=new Vector2(40,40);locked.offsetMax=new Vector2(-40,-130);
            AddFullGameCTA(locked,textStyle,buttonStyle);
        }
        // Index: a fourth zone row stands for the zones of the full game (gameplay moves it after the real zones).
        Transform indexPopup=ui.Find("SAE_MonsterIndexPanel/Panel/Popup");
        Transform zoneTemplate=indexPopup.Find("[Scroll View] Container_Zones/Viewport/Zone_Container").GetChild(0);
        Transform lockedZone=UnityEngine.Object.Instantiate(zoneTemplate,indexPopup,false);lockedZone.name=StealEggGame.LockedZone;lockedZone.gameObject.SetActive(false);
        Transform zoneProgress=lockedZone.Find("Zone_Progress");if(zoneProgress)UnityEngine.Object.DestroyImmediate(zoneProgress.gameObject);
        Transform zoneName=lockedZone.Find("Zone_Thumnail/Text_ZoneName");if(zoneName)zoneName.GetComponent<TMPro.TMP_Text>().text="???";
        Transform box=lockedZone.Find("[Scroll View] Pet");
        ScrollRect scroll=box.GetComponent<ScrollRect>();if(scroll)UnityEngine.Object.DestroyImmediate(scroll);
        foreach(Transform child in box.Cast<Transform>().ToArray())UnityEngine.Object.DestroyImmediate(child.gameObject);
        // Empty picture slot: no zone thumbnail, same backdrop as the pet box.
        Image slot=lockedZone.Find("Zone_Thumnail").GetComponent<Image>(),boxImage=box.GetComponent<Image>();
        Transform thumbnail=lockedZone.Find("Zone_Thumnail/Image_Zoner_Thumbnail");if(thumbnail)UnityEngine.Object.DestroyImmediate(thumbnail.gameObject);
        if(slot && boxImage){slot.sprite=boxImage.sprite;slot.type=boxImage.type;slot.color=boxImage.color;}
        RectTransform boxRect=(RectTransform)box;boxRect.sizeDelta=new Vector2(boxRect.sizeDelta.x,((RectTransform)lockedZone).sizeDelta.y-20);
        boxRect.anchoredPosition=new Vector2(boxRect.anchoredPosition.x,0);
        RectTransform zoneCta=NewRect(StealEggGame.LockedContent,box);
        zoneCta.anchorMin=Vector2.zero;zoneCta.anchorMax=Vector2.one;zoneCta.offsetMin=new Vector2(30,30);zoneCta.offsetMax=new Vector2(-30,-30);
        AddFullGameCTA(zoneCta,textStyle,buttonStyle);
        foreach(Transform style in new[]{textStyle,closeStyle,buttonStyle})UnityEngine.Object.DestroyImmediate(style.gameObject);
        Debug.Log("Locked features: "+string.Join(", ",LockedPanels)+" and Index zone 4 show the full-version CTA.");
    }
    // Original UI the playable never shows (IAP, gifts, editing tools, ads buttons, arrows).
    static readonly string[] UnusedUI=
    {
        "SAEGamePlayPanel/Panel/Left/Button_IAPShop","SAEGamePlayPanel/Panel/Left/Button_OnlineGift",
        "SAE_UpgradeTreadmilPanel/Panel/Popup/Buttons/Button_AdsUpgrade",
        "SAEInventoryPanel/Panel/BagPopup/Panel/Container/[Container] Tab","SAEInventoryPanel/Panel/BagPopup/Panel/Container/Editor",
        "SAEInventoryPanel/Panel/BagPopup/Panel/Container/[Button] Close (1)",
        "SAEInventoryPanel/Panel/EdtingMark","SAEInventoryPanel/Panel/ItemDragHighlight","SAEInventoryPanel/Panel/IgnoreInteractionMask",
        "SAE_MonsterIndexPanel/Panel/Popup/[Scroll View] Container_Zones/Arrows",
    };
    // Lists filled at runtime: the first row is the template, the other placeholder rows are never shown.
    static readonly string[] RowLists=
    {
        "SAEGamePlayPanel/Panel/EquipPetPopup/Scroll View/Viewport/Content","SAEGamePlayPanel/Panel/IncubatingEggPopup/Scroll View/Viewport/Content",
        "SAEGamePlayPanel/Panel/UIBoost/Container_Boost","SAE_RewardEarnPanel/Panel/Content/Reward_Container",
        "SAEInventoryPanel/Panel/BagPopup/Panel/Container/[Container] Selection/Scroll View/Viewport/Content",
        "SAE_MonsterIndexPanel/Panel/Popup/[Scroll View] Container_Zones/Viewport/Zone_Container",
        "SAE_MonsterIndexPanel/Panel/Popup/[Scroll View] Container_Zones/Viewport/Zone_Container/*/[Scroll View] Pet/Viewport/Content",
    };
    static void RemoveUnusedUI(StealEggGame game)
    {
        Transform ui=game.originalUI;int removed=0;
        foreach(string path in UnusedUI){Transform t=ui.Find(path);if(t){UnityEngine.Object.DestroyImmediate(t.gameObject);removed++;}}
        Transform incubateRow=ui.Find(RowLists[1]).GetChild(0);
        foreach(string path in new[]{"ProgressContainer/[Button] Grow","Thumbnail Frame/FX/1","Thumbnail Frame/FX/2","Thumbnail Frame/FX/3"})
        {Transform t=incubateRow.Find(path);if(t){UnityEngine.Object.DestroyImmediate(t.gameObject);removed++;}}
        foreach(string path in RowLists)
        {
            string[] parts=path.Split(new[]{"/*/"},StringSplitOptions.None);
            Transform list=ui.Find(parts[0]);
            if(parts.Length>1)list=list && list.childCount>0?list.GetChild(0).Find(parts[1]):null;
            if(!list)throw new Exception("Row list missing: "+path);
            for(int i=list.childCount-1;i>=1;i--){UnityEngine.Object.DestroyImmediate(list.GetChild(i).gameObject);removed++;}
        }
        Debug.Log("Unused UI removed: "+removed+" objects.");
    }
    // Text in the upper part, the PLAY NOW button in the lower part of the given area.
    static void AddFullGameCTA(RectTransform area,Transform textStyle,Transform buttonStyle)
    {
        RectTransform text=(RectTransform)UnityEngine.Object.Instantiate(textStyle,area,false);text.name="[Text] Full Game";
        text.anchorMin=new Vector2(0,.45f);text.anchorMax=Vector2.one;text.offsetMin=text.offsetMax=Vector2.zero;
        var label=text.GetComponent<TMPro.TMP_Text>();label.text=FullGameText;label.enableWordWrapping=true;
        label.enableAutoSizing=true;label.fontSizeMin=24;label.fontSizeMax=56;label.alignment=TMPro.TextAlignmentOptions.Center;
        RectTransform button=(RectTransform)UnityEngine.Object.Instantiate(buttonStyle,area,false);button.name=StealEggGame.PlayNowButton;
        button.anchorMin=button.anchorMax=new Vector2(.5f,.2f);button.pivot=new Vector2(.5f,.5f);button.anchoredPosition=Vector2.zero;button.sizeDelta=new Vector2(340,110);
        var caption=button.GetComponentInChildren<TMPro.TMP_Text>(true);caption.text="PLAY NOW";caption.fontSize=46;
        button.gameObject.SetActive(true);
    }

    // ---- Playable controls and Luna ----
    static void BakePlayableControls(StealEggGame game)
    {
        SerializedObject so=new SerializedObject(game);
        RectTransform safe=(RectTransform)so.FindProperty("safeUI").objectReferenceValue;
        if(!safe){game.BakeUI();so.Update();safe=(RectTransform)so.FindProperty("safeUI").objectReferenceValue;}
        Canvas canvas=safe.GetComponentInParent<Canvas>();canvas.sortingOrder=0;
        CanvasScaler scaler=canvas.GetComponent<CanvasScaler>();scaler.referenceResolution=new Vector2(1920,864);scaler.matchWidthOrHeight=1;
        string[] keep={"Camera drag","Joystick","Jump","End card"};
        foreach(Transform child in safe.Cast<Transform>().ToArray())if(Array.IndexOf(keep,child.name)<0)UnityEngine.Object.DestroyImmediate(child.gameObject);
        Transform drag=safe.Find("Camera drag");
        if(drag){Image image=drag.GetComponent<Image>();if(image){image.color=Color.clear;image.raycastTarget=true;}PlayableCameraDrag d=drag.GetComponent<PlayableCameraDrag>();if(d)d.cameraController=CameraController.ConfigureFor(game);}
        // Joystick and jump keep the layout saved in the scene (ConfigureControls runs only when BakeUI first creates them).
    }
    static void BakeLunaController(StealEggGame game)
    {
        LunaController luna=UnityEngine.Object.FindFirstObjectByType<LunaController>();
        if(!luna){GameObject go=new GameObject("Luna Controller");luna=go.AddComponent<LunaController>();}
        AudioSource music=luna.GetComponent<AudioSource>();if(!music)music=luna.gameObject.AddComponent<AudioSource>();music.playOnAwake=false;
        SerializedObject gameSo=new SerializedObject(game);
        RectTransform safe=(RectTransform)gameSo.FindProperty("safeUI").objectReferenceValue;
        // Luna ignores nested canvases (overrideSorting): top-most UI (end card, tutorial hints) lives in its own root canvas.
        Transform overlay=OverlayCanvas(safe);
        Transform endCard=overlay.Find("End card");
        if(!endCard){endCard=safe.Find("End card");if(endCard)endCard.SetParent(overlay,false);}
        if(!endCard)endCard=BuildEndCard(game,(RectTransform)overlay);
        foreach(GraphicRaycaster r in endCard.GetComponents<GraphicRaycaster>())UnityEngine.Object.DestroyImmediate(r);
        foreach(Canvas c in endCard.GetComponents<Canvas>())UnityEngine.Object.DestroyImmediate(c);
        endCard.SetAsLastSibling();
        foreach(Button b in endCard.GetComponentsInChildren<Button>(true))for(int i=b.onClick.GetPersistentEventCount()-1;i>=0;i--)UnityEventTools.RemovePersistentListener(b.onClick,i);
        endCard.gameObject.SetActive(false);
        SerializedObject so=new SerializedObject(luna);
        so.FindProperty("musicSource").objectReferenceValue=music;
        so.FindProperty("endCard").objectReferenceValue=endCard.gameObject;
        Transform install=endCard.Find("Install"),cont=endCard.Find("Continue");
        so.FindProperty("continueButton").objectReferenceValue=cont?cont.GetComponent<Button>():null;
        var ctaButtons=new List<Button>();
        if(install)ctaButtons.Add(install.GetComponent<Button>());
        ctaButtons.AddRange(game.originalUI.GetComponentsInChildren<Button>(true).Where(b=>b.name==StealEggGame.PlayNowButton));
        SerializedProperty cta=so.FindProperty("CTA");cta.arraySize=ctaButtons.Count;
        for(int i=0;i<ctaButtons.Count;i++)cta.GetArrayElementAtIndex(i).objectReferenceValue=ctaButtons[i];
        so.ApplyModifiedPropertiesWithoutUndo();
    }
    public const string OverlayName="Overlay UI";
    // Root canvas above every original panel, scaled like the playable controls.
    static Transform OverlayCanvas(RectTransform safe)
    {
        GameObject existing=GameObject.Find(OverlayName);
        if(existing)return existing.transform;
        Canvas source=safe.GetComponentInParent<Canvas>().rootCanvas;
        var go=new GameObject(OverlayName,typeof(RectTransform),typeof(Canvas),typeof(CanvasScaler),typeof(GraphicRaycaster));
        Canvas canvas=go.GetComponent<Canvas>();canvas.renderMode=RenderMode.ScreenSpaceOverlay;canvas.sortingOrder=100;
        EditorUtility.CopySerialized(source.GetComponent<CanvasScaler>(),go.GetComponent<CanvasScaler>());
        return go.transform;
    }
    static Transform BuildEndCard(StealEggGame game,RectTransform safe)
    {
        RectTransform card=NewRect("End card",safe);Image bg=card.gameObject.AddComponent<Image>();bg.color=new Color(.025f,.05f,.12f,.96f);
        AddLabel(card,"Victory","EGG-CELLENT!",49,new Vector2(.05f,.64f),new Vector2(.95f,.78f),game.uiFont);
        AddLabel(card,"Pitch","Build your collection.\nOutrun every guardian!",27,new Vector2(.1f,.46f),new Vector2(.9f,.62f),game.uiFont);
        AddButton(card,"Install","PLAY NOW",new Vector2(.3f,.28f),new Vector2(.7f,.40f),new Color(.18f,.76f,.18f),game.uiFont);
        AddButton(card,"Continue","KEEP EXPLORING",new Vector2(.35f,.17f),new Vector2(.65f,.24f),new Color(.12f,.39f,.76f),game.uiFont);
        return card;
    }
    static RectTransform NewRect(string name,Transform parent)
    {RectTransform rt=new GameObject(name,typeof(RectTransform)).GetComponent<RectTransform>();rt.SetParent(parent,false);rt.anchorMin=Vector2.zero;rt.anchorMax=Vector2.one;rt.offsetMin=rt.offsetMax=Vector2.zero;return rt;}
    static void AddLabel(Transform parent,string name,string value,int size,Vector2 min,Vector2 max,Font font)
    {RectTransform rt=NewRect(name,parent);rt.anchorMin=min;rt.anchorMax=max;Text t=rt.gameObject.AddComponent<Text>();t.font=font;t.text=value;t.fontSize=size;t.alignment=TextAnchor.MiddleCenter;t.color=Color.white;t.raycastTarget=false;}
    static void AddButton(Transform parent,string name,string value,Vector2 min,Vector2 max,Color color,Font font)
    {RectTransform rt=NewRect(name,parent);rt.anchorMin=min;rt.anchorMax=max;Image i=rt.gameObject.AddComponent<Image>();i.color=color;rt.gameObject.AddComponent<Button>().targetGraphic=i;AddLabel(rt,"Label",value,26,Vector2.zero,Vector2.one,font);}

    // ---- Scene references ----
    static Transform FindPath(string path){GameObject o=GameObject.Find(path);return o?o.transform:null;}
    static void BakeSceneReferences(StealEggGame game)
    {
        Transform houses=FindPath("GameController/[Container] Houses");
        if(!houses)throw new Exception("GameController/[Container] Houses not found.");
        var list=new List<StealEggGame.House>();
        Transform player=houses.Find("House");
        foreach(Transform h in new[]{player}.Concat(houses.Cast<Transform>().Where(t=>t!=player && t.name.StartsWith("House"))))
        {
            var house=new StealEggGame.House();house.root=h;
            house.coopModels=h.Find("Coop/Model/Model Levels").Cast<Transform>().OrderBy(t=>LevelOf(t.name)).Select(t=>t.GetComponent<BoxCollider>()).ToArray();
            house.treadmills=h.Find("[Container] Treadmils").Cast<Transform>().Where(t=>t.name.StartsWith("SAE_Treadmil")).OrderBy(t=>TreadmillLevel(t.name)).ToArray();
            house.coopPad=h.Find("UpgradeCoopPoint");house.treadmillPad=h.Find("UpgradeTreadmilPoint");house.petContainer=h.Find("Coop/[Container] Monsters");
            if(list.Count>0){if(house.coopPad)house.coopPad.gameObject.SetActive(false);if(house.treadmillPad)house.treadmillPad.gameObject.SetActive(false);}
            list.Add(house);
        }
        game.houses=list.ToArray();
        game.playerCoopArea=game.houses[0].coopModels[0];
        game.fuseMachine=FindPath("GameController/FuseHandler");game.exchangeShop=FindPath("GameController/Shop");
        game.luckyFrog=FindPath("GameController/Lucky Frog");
        game.luckyEggSpawn=game.luckyFrog?game.luckyFrog.Find("EggSpawn"):null;game.luckyEggTarget=game.luckyFrog?game.luckyFrog.Find("EggTarget"):null;
        game.teleportPoint=FindPath("GameController/CharacterManager/Teleport Point");
        game.lobbyCenter=FindPath("GameController/[Container] Zone/LobbyZone");
        Match size=Regex.Match(File.ReadAllText(Source+Root+"StealAnEgg.unity"),@"lobbyZoneCenter: \{fileID: -?\d+\}\s+size: \{x: ([-\d.]+), y: ([-\d.]+), z: ([-\d.]+)\}");
        if(size.Success)game.lobbySize=new Vector3(F(size.Groups[1].Value),F(size.Groups[2].Value),F(size.Groups[3].Value));
        Transform combat=FindPath("Environment/Map_Steal_Eggs/CombatArea");game.combatArea=combat?combat.GetComponent<BoxCollider>():null;
        Transform night=FindPath("GameController/DayCircleSystem/NightGraphic");
        game.nightGraphic=night?night.gameObject:null;game.nightText=night?night.GetComponentInChildren<TMPro.TMP_Text>(true):null;
        Transform sun=FindPath("Directional Light");game.sun=sun?sun.GetComponent<Light>():null;
        foreach(var zone in game.zones)if(zone.root)zone.bounds=zone.root.GetComponent<BoxCollider>();
    }
    static int LevelOf(string name){Match m=Regex.Match(name,@"(\d+)$");return m.Success?int.Parse(m.Groups[1].Value):0;}
    static int TreadmillLevel(string name){Match m=Regex.Match(name,@"\((\d+)\)");return m.Success?int.Parse(m.Groups[1].Value)+1:1;}
    static float F(string v){return float.Parse(v,CultureInfo.InvariantCulture);}

    // ---- NPC stealers ----
    static void BakeNpcs(StealEggGame game)
    {
        GameObject old=GameObject.Find("NPC Stealers");if(old)UnityEngine.Object.DestroyImmediate(old);
        GameObject root=new GameObject("NPC Stealers");
        RuntimeAnimatorController controller=AssetDatabase.LoadAssetAtPath<RuntimeAnimatorController>(StealEggCompactPlayerAnimator.Path);
        var npcs=new List<Transform>();
        for(int i=0;i<game.npcCount;i++)
        {
            GameObject npc=InstantiateClean(Root+"Prefabs/SAE_NPC.prefab",root.transform);npc.name="NPC "+(i+1);
            foreach(Joint j in npc.GetComponentsInChildren<Joint>(true))UnityEngine.Object.DestroyImmediate(j);
            foreach(UnityEngine.AI.NavMeshAgent a in npc.GetComponentsInChildren<UnityEngine.AI.NavMeshAgent>(true))UnityEngine.Object.DestroyImmediate(a);
            foreach(Rigidbody b in npc.GetComponentsInChildren<Rigidbody>(true))UnityEngine.Object.DestroyImmediate(b);
            foreach(Collider c in npc.GetComponentsInChildren<Collider>(true))UnityEngine.Object.DestroyImmediate(c);
            foreach(string child in new[]{"Equipment","Abilities","AI","Trail"}){Transform t=npc.transform.Find(child);if(t)UnityEngine.Object.DestroyImmediate(t.gameObject);}
            Animator animator=npc.GetComponentInChildren<Animator>(true);
            if(animator){animator.runtimeAnimatorController=controller;animator.applyRootMotion=false;animator.cullingMode=AnimatorCullingMode.CullUpdateTransforms;}
            npcs.Add(npc.transform);
        }
        game.npcModels=npcs.ToArray();
    }

    // ---- Data tables from the source project ----
    static void BakeData(StealEggGame game)
    {
        string data=Root+"Data/";
        // Rarity text materials and index frames, ordered by rarityType.
        var materials=new Material[StealEggGame.RarityNames.Length];var frames=new Sprite[StealEggGame.RarityNames.Length];
        foreach(string file in Directory.GetFiles(Source+data+"Rarity","*.asset"))
        {
            string yaml=File.ReadAllText(file);int type=int.Parse(Regex.Match(yaml,@"rarityType: (\d+)").Groups[1].Value);
            if(type>=materials.Length)continue;
            materials[type]=LoadGuid<Material>(yaml,"materialPreset");frames[type]=LoadGuid<Sprite>(yaml,"thumbnail2x2");
        }
        game.rarityMaterials=materials;game.rarityFrames=frames;
        game.rarityFont=AssetDatabase.LoadAssetAtPath<TMPro.TMP_FontAsset>("Assets/TextMesh Pro/Fonts/Customs/museo-sans-rounded-cufonfonts/MuseoSansRounded1000 SDF.asset");
        if(!game.rarityFont)throw new Exception("MuseoSansRounded1000 SDF missing (rarity text font).");
        // Trail shop.
        var trails=new List<StealEggGame.TrailInfo>();
        string shop=File.ReadAllText(Source+data+"SAE_TrailShopDatabaseSO.asset");
        foreach(Match slot in Regex.Matches(shop,@"trailItem: \{[^}]*guid: (\w+)[^}]*\}[\s\S]*?price: ([\d.e+]+)[\s\S]*?frameSprite: \{([^}]*)\}"))
        {
            string yaml=StealEggSourceRulesImporter.Text(StealEggSourceRulesImporter.Resolve(slot.Groups[1].Value));
            var trail=new StealEggGame.TrailInfo();
            trail.name=Regex.Match(yaml,@"itemName: ([^\r\n]+)").Groups[1].Value.Trim();
            Match rarity=Regex.Match(yaml,@"itemRarity: (\d+)");trail.rarity=rarity.Success?int.Parse(rarity.Groups[1].Value):0;
            trail.multiplier=F(Regex.Match(yaml,@"speedPowerMultiplier: ([\d.]+)").Groups[1].Value);
            trail.price=double.Parse(slot.Groups[2].Value,CultureInfo.InvariantCulture);
            trail.thumbnail=LoadGuid<Sprite>(yaml,"thumbnail");trail.prefab=LoadGuid<GameObject>(yaml,"prefab");
            Match frame=Regex.Match(slot.Groups[3].Value,@"guid: (\w+)");
            if(frame.Success)trail.frame=StealEggSourceRulesImporter.Load<Sprite>(AssetPath(frame.Groups[1].Value));
            trails.Add(trail);
        }
        game.trails=trails.ToArray();
        // Lucky Egg rewards (boost items).
        var rewards=new List<StealEggGame.BoostInfo>();var byAsset=new Dictionary<string,StealEggGame.BoostInfo>();
        string lucky=File.ReadAllText(Source+Root+"Prefabs/Lucky_Egg.prefab");
        foreach(Match entry in Regex.Matches(lucky,@"item: \{[^}]*guid: (\w+)[^}]*\}\s+amount: \d+\s+rate: ([\d.]+)"))
        {
            string guid=entry.Groups[1].Value;StealEggGame.BoostInfo boost;
            if(!byAsset.TryGetValue(guid,out boost))
            {
                string yaml=StealEggSourceRulesImporter.Text(StealEggSourceRulesImporter.Resolve(guid));
                boost=new StealEggGame.BoostInfo();boost.name=Regex.Match(yaml,@"itemName: ([^\r\n]+)").Groups[1].Value.Trim();
                boost.type=int.Parse(Regex.Match(yaml,@"boostType: (\d+)").Groups[1].Value);
                boost.value=F(Regex.Match(yaml,@"boostValue: ([\d.]+)").Groups[1].Value);boost.duration=F(Regex.Match(yaml,@"boostDuration: ([\d.]+)").Groups[1].Value);
                boost.icon=LoadGuid<Sprite>(yaml,"thumbnail");byAsset[guid]=boost;rewards.Add(boost);
            }
            boost.weight+=F(entry.Groups[2].Value);
        }
        game.luckyEggRewards=rewards.ToArray();
        string bat=File.ReadAllText(Source+data+"Items/Weapons/[SAE_WeaponItemSO] Ballbat.asset");
        game.batIcon=LoadGuid<Sprite>(bat,"thumbnail");
        game.batPrefab=CleanPrefab(Root+"Prefabs/Weapons/SAE_WeaponBase.prefab");
        game.luckyEggPrefab=CleanPrefab(Root+"Prefabs/Lucky_Egg.prefab");
        game.incubateTimerPrefab=CleanPrefab(Root+"Prefabs/IncubateTimeDisplayment.prefab");
        game.floatingTextPrefab=CleanPrefab(Root+"Prefabs/AnimationText.prefab");
        game.nightIcon=AssetDatabase.LoadAssetAtPath<Sprite>(Root+"Sprites/UIs/SAE_Night.png");
        game.dayIcon=AssetDatabase.LoadAssetAtPath<Sprite>(Root+"Sprites/UIs/SAE_Sun.png");
        string sounds=Root+"Sounds/";
        game.clickSound=Clip(sounds+"SAE_ButtonSelected.mp3");game.closeSound=Clip(sounds+"SAE_ButtonClose.mp3");
        game.rewardSound=Clip(sounds+"SAE_GetReward.mp3");game.upgradeSound=Clip(sounds+"SAE_UpgradeSound.mp3");
        game.trainSound=Clip(sounds+"SAE_CheckPoint2.wav");game.equipSound=Clip(sounds+"EquipSound.mp3");
        game.fuseSound=Clip(sounds+"SAE_FuseSound.mp3");game.frogSound=Clip(sounds+"sae_frog.mp3");
        game.progressSound=Clip(sounds+"ProgressUp.mp3");game.warningSound=Clip(sounds+"sae_warning.mp3");
        game.crackSound=Clip(sounds+"Egg_Cracking.mp3");game.popupSound=Clip(sounds+"sae_PopupSound.mp3");
        game.hatchSound=Clip(sounds+"EggOpen1.mp3");
        // Player sounds of SAE_Player Variant: footsteps, steal (EquipSound), gather (GetReward), death (hurt-4).
        game.footstepSound=Clip(sounds+"Footstep.mp3");game.stealSound=Clip(sounds+"EquipSound.mp3");
        game.deliverSound=Clip(sounds+"SAE_GetReward.mp3");game.caughtSound=Clip(sounds+"SAE_hurt-4.mp3");
    }
    static AudioClip Clip(string path){return AssetDatabase.LoadAssetAtPath<AudioClip>(path);}
    static string AssetPath(string guid){string path=AssetDatabase.GUIDToAssetPath(guid);return string.IsNullOrEmpty(path)?null:path;}
    static T LoadGuid<T>(string yaml,string field) where T:UnityEngine.Object
    {
        Match m=Regex.Match(yaml,@"(?m)^\s*"+Regex.Escape(field)+@": \{[^}]*guid: (\w+)");
        return m.Success?StealEggSourceRulesImporter.Load<T>(AssetPath(m.Groups[1].Value)):null;
    }
    // Runtime-spawned prefabs get a copy without the original (missing) scripts.
    static GameObject CleanPrefab(string path)
    {
        GameObject instance=InstantiateClean(path,null);
        string target=Generated+Path.GetFileName(path);
        GameObject saved=PrefabUtility.SaveAsPrefabAsset(instance,target);
        UnityEngine.Object.DestroyImmediate(instance);
        return saved;
    }

    // ---- Player and NPC animator: one layer (playable rule), the original overlay layers baked into clips ----
    // Original: base locomotion + "Stealing" (StealPose, sae_Up), "Taking" (Take, Sae_RighHand) and "Combat" (Fight, sae_Up)
    // layers. Here each overlay is merged into the locomotion clips (upper-body muscles from the pose, the rest from the
    // locomotion), and StealEggGame.Animation picks the state.
    static void BakeCombatAnimation(StealEggGame game)
    {
        var source=AssetDatabase.LoadAssetAtPath<AnimatorController>(Root+"Animation/Character/SAE_MinigameCharacterController.controller");
        if(!source)throw new Exception("SAE_MinigameCharacterController missing.");
        AnimationClip Clip(string name)
        {
            AnimationClip c=source.animationClips.FirstOrDefault(x=>x.name==name);
            if(!c)throw new Exception("Clip "+name+" missing in SAE_MinigameCharacterController.");
            return c;
        }
        string folder=Generated+"PlayerClips/";Directory.CreateDirectory(folder);AssetDatabase.Refresh();
        var motions=new[]{("Idle","Happy Idle",1f),("Walk","HumanoidWalk",1f),("Run","HumanoidRun",1f),
            // The original Airborne blend tree plays these 0.07 s poses at timescale 0.1.
            ("Jump","HumanoidJumpUp",.1f),("Fall","HumanoidFall",.1f)};
        AnimationClip steal=Clip("StealPose"),take=Clip("Take"),fight=Clip("Armature|Fight");
        Func<string,bool> upperBody=p=>!(p.StartsWith("Root") || p.StartsWith("Motion") || p.Contains("Leg") || p.Contains("Foot") || p.Contains("Toes"));
        Func<string,bool> rightArm=p=>p.StartsWith("Right Shoulder") || p.StartsWith("Right Arm") || p.StartsWith("Right Forearm") || p.StartsWith("Right Hand") || p.StartsWith("RightHand");

        AssetDatabase.DeleteAsset(StealEggCompactPlayerAnimator.Path);
        var controller=AnimatorController.CreateAnimatorControllerAtPath(StealEggCompactPlayerAnimator.Path);
        AnimatorStateMachine machine=controller.layers[0].stateMachine;
        // Parameters pick the state (StealEggGame.Animation): Set = plain/Carry/Hold/Fight, Motion = Idle/Walk/Run/Jump/Fall.
        controller.AddParameter(StealEggGame.AnimSet,AnimatorControllerParameterType.Int);
        controller.AddParameter(StealEggGame.AnimMotion,AnimatorControllerParameterType.Int);
        var states=new List<(AnimatorState state,int set,int motion)>();
        AnimatorState AddState(string name,AnimationClip clip,float speed,int set,int motion)
        {
            AnimatorState s=machine.AddState(name);s.motion=clip;s.speed=speed;s.writeDefaultValues=true;
            states.Add((s,set,motion));
            return s;
        }
        for(int m=0;m<motions.Length;m++)
        {
            var (state,clip,speed)=motions[m];
            AnimationClip locomotion=StandaloneClip(Clip(clip),folder+state+".anim");
            AnimatorState plain=AddState(state,locomotion,speed,StealEggGame.SetPlain,m);
            if(state=="Idle")machine.defaultState=plain;
            AddState("Carry"+state,MergedClip(locomotion,steal,upperBody,false,folder+"Carry"+state+".anim"),speed,StealEggGame.SetCarry,m);
            AddState("Hold"+state,MergedClip(locomotion,take,rightArm,false,folder+"Hold"+state+".anim"),speed,StealEggGame.SetHold,m);
        }
        // Swing at the original state speed 1.5, over standing (Motion Idle) or running (Motion Run) legs.
        AddState("FightIdle",MergedClip(Clip("Happy Idle"),fight,upperBody,true,folder+"FightIdle.anim"),1.5f,StealEggGame.SetFight,StealEggGame.MotionIdle);
        AddState("FightRun",MergedClip(Clip("HumanoidRun"),fight,upperBody,true,folder+"FightRun.anim"),1.5f,StealEggGame.SetFight,StealEggGame.MotionRun);
        // State -> state as soon as both parameters match (no exit time). The blend follows SAE_MinigameCharacterController.
        foreach(var from in states)foreach(var to in states)
        {
            if(from.state==to.state)continue;
            AnimatorStateTransition t=from.state.AddTransition(to.state);
            t.hasExitTime=false;t.offset=0;t.interruptionSource=TransitionInterruptionSource.None;
            OriginalBlend(from.set,from.motion,to.set,to.motion,t);
            t.AddCondition(AnimatorConditionMode.Equals,to.set,StealEggGame.AnimSet);
            t.AddCondition(AnimatorConditionMode.Equals,to.motion,StealEggGame.AnimMotion);
        }
        EditorUtility.SetDirty(controller);
        foreach(string stale in new[]{"PlayerUpperBody.mask","PlayerRightArm.mask","Fight.anim"})AssetDatabase.DeleteAsset(Generated+stale);
        // NPCs share the player's controller (one layer: nothing is written to the shared controller at runtime).
        foreach(Animator animator in new[]{game.playerAnimator}.Concat((game.npcModels??new Transform[0]).Where(n=>n).Select(n=>n.GetComponentInChildren<Animator>(true))))
        {
            if(!animator)continue;
            animator.runtimeAnimatorController=controller;EditorUtility.SetDirty(animator);
        }
        foreach(string copy in AssetDatabase.FindAssets("PlayerDirect_ t:AnimatorController",new[]{Generated.TrimEnd('/')}).Select(AssetDatabase.GUIDToAssetPath).ToArray())AssetDatabase.DeleteAsset(copy);
        AssetDatabase.SaveAssets();
        // Original EquipSlot RightHand (RightHandSlot under mixamorig:RightHand_end) as SAE_Player Variant overrides it
        // (Player.base_character -> BasePlayer -> SAE_Player Variant): the weapon copies its position and rotation every frame.
        Transform handEnd=game.player.GetComponentsInChildren<Transform>(true).FirstOrDefault(t=>t.name=="mixamorig:RightHand_end");
        if(!handEnd)throw new Exception("mixamorig:RightHand_end missing on the player.");
        // Earlier bakes left "Right hand slot" / "Weapon Slot" here.
        foreach(Transform old in handEnd.Cast<Transform>().Where(t=>t.name=="Right hand slot" || t.name=="Weapon Slot").ToArray())UnityEngine.Object.DestroyImmediate(old.gameObject);
        Transform slot=handEnd.Find("RightHandSlot");
        if(!slot){slot=new GameObject("RightHandSlot").transform;slot.SetParent(handEnd,false);}
        slot.localPosition=new Vector3(-.014f,-.081f,.048f);slot.localRotation=new Quaternion(-.5972581f,.3785269f,.37852684f,.5972583f);slot.localScale=Vector3.one;
        game.rightHandSlot=slot;
    }

    // Transition timing of the original character controller, mapped onto the merged single-layer states:
    //   Fight in or out: Combat layer Any State -> Fight 0.25 s, Fight -> Exit 0.25 s.
    //   Carry/Hold on or off: the original sets the Stealing/Taking layer weight to 0 or 1 at once.
    //   Grounded -> Airborne: 0.102 of the state (offset 0.018); Airborne -> Grounded: 0.118 of the state.
    //   Idle/Walk/Run and Jump/Fall: one blend tree each in the original, its parameter damped over 0.1 s.
    // true: every transition switches at once (0 s); false: the original controller's timing below.
    const bool InstantTransitions=true;
    static void OriginalBlend(int fromSet,int fromMotion,int toSet,int toMotion,AnimatorStateTransition t)
    {
        if(InstantTransitions){t.hasFixedDuration=true;t.duration=0;t.offset=0;return;}
        bool fromAir=fromMotion>=StealEggGame.MotionJump,toAir=toMotion>=StealEggGame.MotionJump;
        if(fromSet==StealEggGame.SetFight || toSet==StealEggGame.SetFight){t.hasFixedDuration=true;t.duration=fromSet==toSet?0:.25f;return;}
        if(fromSet!=toSet){t.hasFixedDuration=true;t.duration=0;return;}
        if(!fromAir && toAir){t.hasFixedDuration=false;t.duration=.10203097f;t.offset=.018051635f;return;}
        if(fromAir && !toAir){t.hasFixedDuration=false;t.duration=.11774184f;return;}
        t.hasFixedDuration=true;t.duration=.1f;
    }
    // Standalone .anim copies: Luna does not evaluate some clips straight from their FBX (Action_fight stayed still).
    static AnimationClip StandaloneClip(AnimationClip source,string path)
    {
        var clip=new AnimationClip{name=Path.GetFileNameWithoutExtension(path),frameRate=source.frameRate};
        foreach(EditorCurveBinding binding in AnimationUtility.GetCurveBindings(source))
            AnimationUtility.SetEditorCurve(clip,binding,AnimationUtility.GetEditorCurve(source,binding));
        AnimationUtility.SetAnimationClipSettings(clip,AnimationUtility.GetAnimationClipSettings(source));
        return SaveClip(clip,path);
    }
    // Base muscles from the locomotion clip, the overlay's muscles where the mask applies. A one-shot overlay keeps its
    // length (and settings) and repeats the locomotion under it; a pose overlay follows the locomotion's length and loop.
    static AnimationClip MergedClip(AnimationClip locomotion,AnimationClip overlay,Func<string,bool> masked,bool oneShot,string path)
    {
        var clip=new AnimationClip{name=Path.GetFileNameWithoutExtension(path),frameRate=locomotion.frameRate};
        float length=oneShot?overlay.length:locomotion.length;
        foreach(EditorCurveBinding binding in AnimationUtility.GetCurveBindings(locomotion))
        {
            if(masked(binding.propertyName))continue;
            AnimationCurve curve=AnimationUtility.GetEditorCurve(locomotion,binding);
            AnimationUtility.SetEditorCurve(clip,binding,oneShot?Repeat(curve,locomotion.length,length):curve);
        }
        foreach(EditorCurveBinding binding in AnimationUtility.GetCurveBindings(overlay))
        {
            if(!masked(binding.propertyName))continue;
            AnimationCurve curve=AnimationUtility.GetEditorCurve(overlay,binding);
            if(!oneShot)curve=Hold(curve,length);
            AnimationUtility.SetEditorCurve(clip,binding,curve);
        }
        AnimationUtility.SetAnimationClipSettings(clip,AnimationUtility.GetAnimationClipSettings(oneShot?overlay:locomotion));
        return SaveClip(clip,path);
    }
    // The locomotion under a one-shot overlay, looped until the overlay ends.
    static AnimationCurve Repeat(AnimationCurve curve,float period,float length)
    {
        if(period<=0)return curve;
        var keys=new List<Keyframe>();
        for(float offset=0;offset<length;offset+=period)
            foreach(Keyframe k in curve.keys)
            {
                if(offset>0 && k.time<=0)continue;
                Keyframe c=k;c.time+=offset;keys.Add(c);
            }
        return new AnimationCurve(keys.ToArray());
    }
    // A pose clip (0.3 s) under a longer loop: its first value held for the whole loop.
    static AnimationCurve Hold(AnimationCurve curve,float length)
    {
        float v=curve.Evaluate(0);
        return new AnimationCurve(new Keyframe(0,v),new Keyframe(Mathf.Max(length,.01f),v));
    }
    static AnimationClip SaveClip(AnimationClip clip,string path)
    {
        AnimationClip existing=AssetDatabase.LoadAssetAtPath<AnimationClip>(path);
        if(existing){EditorUtility.CopySerialized(clip,existing);EditorUtility.SetDirty(existing);return existing;}
        AssetDatabase.CreateAsset(clip,path);return clip;
    }

    // ---- Hair skinned to the head bone ----
    // A transform that copies the head pose is a frame off what Luna skins (the hair slid front/back while running), so
    // the hair becomes a skinned mesh bound to the head bone and moves in the same skinning pass as the head.
    const string SkinnedHairName=StealEggGame.SkinnedHairName;
    static void BakeSkinnedHair(StealEggGame game)
    {
        string folder=Generated+"Hair/";
        if(AssetDatabase.IsValidFolder(folder.TrimEnd('/')))AssetDatabase.DeleteAsset(folder.TrimEnd('/'));
        Directory.CreateDirectory(folder);AssetDatabase.Refresh();
        var boundMeshes=new List<(Mesh source,Mesh mesh)>();
        bool SameMatrix(Matrix4x4 a,Matrix4x4 b){for(int i=0;i<16;i++)if(Mathf.Abs(a[i]-b[i])>1e-4f)return false;return true;}
        var characters=new List<(Transform character,GameObject hair)>{(game.player,game.playerHair)};
        GameObject npcHair=game.outfitHairs!=null && game.outfitHairs.Length==1?game.outfitHairs[0]:null;
        if(npcHair)
        {
            if(game.npcModels!=null)foreach(Transform npc in game.npcModels)if(npc)characters.Add((npc,npcHair));
            if(game.exchangeShop)characters.Add((game.exchangeShop,npcHair));
        }
        int count=0;
        foreach(var (character,hair) in characters)
        {
            foreach(Transform old in character.GetComponentsInChildren<Transform>(true).Where(t=>t.name==SkinnedHairName).ToArray())UnityEngine.Object.DestroyImmediate(old.gameObject);
            Animator animator=character.GetComponentInChildren<Animator>(true);
            Transform head=animator && animator.isHuman?animator.GetBoneTransform(HumanBodyBones.Head):null;
            Transform slot=character.GetComponentsInChildren<Transform>(true).FirstOrDefault(t=>t.name=="HairSlot");
            if(!hair || !head || !slot)continue;
            // Placed like the runtime WearHair (prefab under HairSlot at zero local position), then bound to the head.
            GameObject placed=(GameObject)PrefabUtility.InstantiatePrefab(hair,slot);placed.transform.localPosition=Vector3.zero;
            foreach(MeshRenderer source in placed.GetComponentsInChildren<MeshRenderer>(true))
            {
                MeshFilter filter=source.GetComponent<MeshFilter>();if(!filter || !filter.sharedMesh)continue;
                var holder=new GameObject(SkinnedHairName);holder.transform.SetParent(character,false);
                var skinned=holder.AddComponent<SkinnedMeshRenderer>();
                skinned.sharedMaterials=source.sharedMaterials;skinned.bones=new[]{head};skinned.rootBone=head;
                // Every vertex on the head bone, bound where the hair sits on the head now. Characters with the same
                // rig and hair share one mesh.
                // Hair space -> head space from the local chain (HairSlot under HeadTop_End), identical for one rig.
                Matrix4x4 bind=Matrix4x4.identity;
                for(Transform t=source.transform;t && t!=head;t=t.parent)bind=Matrix4x4.TRS(t.localPosition,t.localRotation,t.localScale)*bind;
                Mesh bound=boundMeshes.Where(m=>m.source==filter.sharedMesh && SameMatrix(m.mesh.bindposes[0],bind)).Select(m=>m.mesh).FirstOrDefault();
                if(!bound)
                {
                    bound=UnityEngine.Object.Instantiate(filter.sharedMesh);bound.name=filter.sharedMesh.name+"_Head";
                    bound.boneWeights=Enumerable.Repeat(new BoneWeight{boneIndex0=0,weight0=1},bound.vertexCount).ToArray();
                    bound.bindposes=new[]{bind};
                    AssetDatabase.CreateAsset(bound,folder+bound.name+"_"+boundMeshes.Count+".asset");boundMeshes.Add((filter.sharedMesh,bound));
                }
                skinned.sharedMesh=bound;skinned.localBounds=new Bounds(Vector3.zero,Vector3.one*2);
                skinned.shadowCastingMode=source.shadowCastingMode;skinned.receiveShadows=source.receiveShadows;
                count++;
            }
            UnityEngine.Object.DestroyImmediate(placed);
        }
        AssetDatabase.SaveAssets();
        Debug.Log("Skinned hair: "+count+" hair meshes bound to head bones.");
    }

    // ---- Monster idle/walk clips (original SAE_MonsterAnimator overrides them at runtime) ----
    // Every monster shares SAE_MonsterAnimatorController; without its own clips the shared
    // ones pose the model at another monster's offsets and it floats above the ground.
    static void BakePetAnimations(StealEggGame game)
    {
        var shared=AssetDatabase.LoadAssetAtPath<RuntimeAnimatorController>(Root+"Animation/Monsters/SAE_MonsterAnimatorController.controller");
        if(!shared)throw new Exception("SAE_MonsterAnimatorController missing.");
        string folder=Generated+"PetAnimators/";Directory.CreateDirectory(folder);AssetDatabase.Refresh();
        int baked=0;
        foreach(GameObject prefab in game.petCatalog.Select(p=>p.prefab).Where(p=>p).Distinct())
        {
            string path=AssetDatabase.GetAssetPath(prefab);
            AnimationClip idle=MonsterClip(path,"idle"),walk=MonsterClip(path,"walk");
            if(!idle || !walk)throw new Exception("Monster clips missing: "+path);
            string overridePath=folder+prefab.name+".overrideController";
            // Updated in place: deleting and recreating it left every prefab pointing at a missing controller on rebake.
            var controller=AssetDatabase.LoadAssetAtPath<AnimatorOverrideController>(overridePath);
            if(!controller){controller=new AnimatorOverrideController(shared);AssetDatabase.CreateAsset(controller,overridePath);}
            controller.runtimeAnimatorController=shared;controller["idle"]=idle;controller["walk"]=walk;
            EditorUtility.SetDirty(controller);
            GameObject contents=PrefabUtility.LoadPrefabContents(path);
            try
            {
                // The monster model's animator (one per pet prefab); a missing reference reads as null.
                foreach(Animator animator in contents.GetComponentsInChildren<Animator>(true))
                {
                    // Always animated: Luna's bounds-based culling can freeze a pet that is on screen.
                    animator.runtimeAnimatorController=controller;animator.cullingMode=AnimatorCullingMode.AlwaysAnimate;
                }
                PrefabUtility.SaveAsPrefabAsset(contents,path);
            }
            finally{PrefabUtility.UnloadPrefabContents(contents);}
            // The loaded prefab kept the old (missing) reference until reimported.
            AssetDatabase.ImportAsset(path,ImportAssetOptions.ForceUpdate);
            if(prefab.GetComponentsInChildren<Animator>(true).Any(a=>a.runtimeAnimatorController!=controller))throw new Exception("Pet controller not saved on "+path);
            baked++;
        }
        Debug.Log("Monster animations: "+baked+" prefabs use their own idle/walk clips.");
    }
    // ---- Any scene material still on a URP shader (InternalErrorShader here) falls back to Standard ----
    static void BakeMissingShaders(StealEggGame game)
    {
        var roots=game.gameObject.scene.GetRootGameObjects().Cast<UnityEngine.Object>().ToArray();
        var broken=EditorUtility.CollectDependencies(roots).OfType<Material>()
            .Where(m=>AssetDatabase.Contains(m) && (!m.shader || m.shader.name=="Hidden/InternalErrorShader" || !m.shader.isSupported)).Distinct().ToArray();
        foreach(Material material in broken)ToStandard(material);
        Debug.Log("Missing shaders: "+broken.Length+" materials moved to Standard"+(broken.Length>0?" ("+string.Join(", ",broken.Select(m=>m.name))+")":"")+".");
    }

    // ---- Playable rule: every animator has one layer and every state plays a single clip, no blend trees ----
    static void CheckNoBlendTrees(StealEggGame game)
    {
        var roots=game.gameObject.scene.GetRootGameObjects().Cast<UnityEngine.Object>().ToArray();
        var controllers=new HashSet<AnimatorController>();
        foreach(UnityEngine.Object o in EditorUtility.CollectDependencies(roots))
        {
            if(o is AnimatorController c)controllers.Add(c);
            if(o is AnimatorOverrideController oc && oc.runtimeAnimatorController is AnimatorController b)controllers.Add(b);
        }
        var found=new List<string>();
        void Walk(AnimatorController c,AnimatorStateMachine machine)
        {
            foreach(ChildAnimatorState s in machine.states)if(s.state.motion is BlendTree)found.Add(c.name+"/"+s.state.name);
            foreach(ChildAnimatorStateMachine sub in machine.stateMachines)Walk(c,sub.stateMachine);
        }
        foreach(AnimatorController c in controllers)foreach(AnimatorControllerLayer layer in c.layers)Walk(c,layer.stateMachine);
        if(found.Count>0)throw new Exception("Blend trees are not allowed in the playable: "+string.Join(", ",found));
        // Playable rule: one animation layer per controller.
        var layered=controllers.Where(c=>c.layers.Length>1).Select(c=>c.name+" ("+c.layers.Length+" layers)").ToArray();
        if(layered.Length>0)throw new Exception("Only one animator layer is allowed in the playable: "+string.Join(", ",layered));
        Debug.Log("Animators: "+controllers.Count+" controllers, one layer each, no blend trees.");
    }

    // ---- Box colliders:Luna raycasts against some MeshColliders read past the mesh (getUVInTriangle -> indexBuffer) ----
    // Box-shaped meshes become one box; hollow rings become one box per side; anything else stays a mesh.
    // Disabled ones (the coop fences) are removed: Luna still raycasts against them.
    static void BakeBoxColliders(StealEggGame game)
    {
        var replaced=new List<string>();var kept=new List<string>();int removed=0;
        foreach(GameObject root in game.gameObject.scene.GetRootGameObjects())
            foreach(MeshCollider collider in root.GetComponentsInChildren<MeshCollider>(true))
            {
                if(!collider.enabled){UnityEngine.Object.DestroyImmediate(collider,true);removed++;continue;}
                Mesh mesh=collider.sharedMesh;
                if(collider.isTrigger || !mesh || !mesh.isReadable){kept.Add(collider.name);continue;}
                Bounds b=mesh.bounds;Vector3[] vertices=mesh.vertices;
                Vector3 tolerance=Vector3.Max(b.size*.03f,Vector3.one*.01f);
                float band=0;bool onFaces=true;
                foreach(Vector3 p in vertices)
                {
                    band=Mathf.Max(band,Mathf.Min(Mathf.Min(p.x-b.min.x,b.max.x-p.x),Mathf.Min(p.z-b.min.z,b.max.z-p.z)));
                    onFaces&=Mathf.Abs(p.x-b.min.x)<tolerance.x || Mathf.Abs(p.x-b.max.x)<tolerance.x || Mathf.Abs(p.y-b.min.y)<tolerance.y
                        || Mathf.Abs(p.y-b.max.y)<tolerance.y || Mathf.Abs(p.z-b.min.z)<tolerance.z || Mathf.Abs(p.z-b.max.z)<tolerance.z;
                }
                var boxes=new List<Bounds>();
                if(band>0 && band<=.25f*Mathf.Min(b.size.x,b.size.z))
                {
                    boxes.Add(new Bounds(new Vector3(b.min.x+band*.5f,b.center.y,b.center.z),new Vector3(band,b.size.y,b.size.z)));
                    boxes.Add(new Bounds(new Vector3(b.max.x-band*.5f,b.center.y,b.center.z),new Vector3(band,b.size.y,b.size.z)));
                    boxes.Add(new Bounds(new Vector3(b.center.x,b.center.y,b.min.z+band*.5f),new Vector3(b.size.x,b.size.y,band)));
                    boxes.Add(new Bounds(new Vector3(b.center.x,b.center.y,b.max.z-band*.5f),new Vector3(b.size.x,b.size.y,band)));
                }
                else if(onFaces)boxes.Add(b);
                else
                {
                    replaced.Add(collider.name+"x"+HeightfieldBoxes(collider));
                    UnityEngine.Object.DestroyImmediate(collider,true);continue;
                }
                foreach(Bounds box in boxes)
                {
                    BoxCollider c=collider.gameObject.AddComponent<BoxCollider>();
                    c.center=box.center;c.size=box.size;c.sharedMaterial=collider.sharedMaterial;
                }
                replaced.Add(collider.name+"x"+boxes.Count);
                UnityEngine.Object.DestroyImmediate(collider,true);
            }
        Debug.Log("Box colliders: "+removed+" disabled mesh colliders removed, "+replaced.Count+" replaced ("+string.Join(", ",replaced)+"); kept as mesh: "+string.Join(", ",kept)+".");
    }
    // Terrain (floor, cliffs, steps): sample the top surface on a 1 m grid, merge equal heights into rectangles,
    // and give each one a box from below the floor up to that height.
    static int HeightfieldBoxes(MeshCollider collider)
    {
        const float Cell=1,Step=.25f,Bottom=-2;
        Bounds world=collider.bounds;
        int nx=Mathf.CeilToInt(world.size.x/Cell),nz=Mathf.CeilToInt(world.size.z/Cell);
        var height=new float[nx,nz];
        for(int x=0;x<nx;x++)for(int z=0;z<nz;z++)
        {
            Vector3 top=new Vector3(world.min.x+(x+.5f)*Cell,world.max.y+5,world.min.z+(z+.5f)*Cell);
            height[x,z]=collider.Raycast(new Ray(top,Vector3.down),out RaycastHit hit,world.size.y+10)?Mathf.Round(hit.point.y/Step)*Step:float.NaN;
        }
        string name=collider.name+" box colliders";
        Transform parent=collider.transform.parent,old=parent?parent.Find(name):null;
        if(old)UnityEngine.Object.DestroyImmediate(old.gameObject);
        var holder=new GameObject(name);holder.transform.SetParent(parent,true);holder.isStatic=true;
        // The floor (most common height) is one box: Luna's CharacterController has no step offset and catches on the
        // seam between two floor boxes of the same height (it stopped the player at the safe line).
        var counts=new Dictionary<float,int>();
        foreach(float h in height)if(!float.IsNaN(h))counts[h]=(counts.TryGetValue(h,out int c)?c:0)+1;
        float floor=counts.OrderByDescending(kv=>kv.Value).First().Key;
        BoxCollider ground=holder.AddComponent<BoxCollider>();
        ground.center=new Vector3(world.min.x+nx*Cell*.5f,(floor+Bottom)*.5f,world.min.z+nz*Cell*.5f);ground.size=new Vector3(nx*Cell,floor-Bottom,nz*Cell);
        // The map's own floor slabs (GroundLobby, Ground) meet at the safe line and leave the same seam: the box above replaces them.
        foreach(BoxCollider slab in collider.GetComponentsInChildren<BoxCollider>(true))
        {
            Bounds b=slab.bounds;
            if(!slab.isTrigger && Mathf.Abs(b.max.y-floor)<.05f && b.size.y<1)UnityEngine.Object.DestroyImmediate(slab);
        }
        var used=new bool[nx,nz];int count=1;
        for(int z=0;z<nz;z++)for(int x=0;x<nx;x++)
        {
            float h=height[x,z];if(used[x,z] || float.IsNaN(h) || h==floor)continue;
            int x2=x;while(x2+1<nx && !used[x2+1,z] && height[x2+1,z]==h)x2++;
            int z2=z;
            while(z2+1<nz)
            {
                bool row=true;for(int i=x;i<=x2 && row;i++)row=!used[i,z2+1] && height[i,z2+1]==h;
                if(!row)break;z2++;
            }
            for(int i=x;i<=x2;i++)for(int j=z;j<=z2;j++)used[i,j]=true;
            float bottom=Mathf.Min(Bottom,h-2);
            BoxCollider box=holder.AddComponent<BoxCollider>();
            box.center=new Vector3(world.min.x+(x+x2+1)*.5f*Cell,(h+bottom)*.5f,world.min.z+(z+z2+1)*.5f*Cell);
            box.size=new Vector3((x2-x+1)*Cell,h-bottom,(z2-z+1)*Cell);
            count++;
        }
        return count;
    }

    // ---- Scrolling arrows (original URP graph SAE_Treadmil_Arrow) for the tutorial line and treadmills ----
    static void BakeArrowMaterials(StealEggGame game)
    {
        Shader shader=Shader.Find("SAE/Scroll Arrow");
        if(!shader)throw new Exception("SAE/Scroll Arrow shader missing.");
        foreach(string name in new[]{"SAE_InstructionLine","SAE_Treadmil_Arrow"})
        {
            string path=Root+"Shaders/TreadmilArrow/"+name+".mat";
            var material=AssetDatabase.LoadAssetAtPath<Material>(path);
            if(!material)throw new Exception("Arrow material missing: "+path);
            string yaml=StealEggSourceRulesImporter.Text(path);
            material.shader=shader;
            material.SetTexture("_mainTexture",YamlTexture(yaml,"_mainTexture"));
            material.SetTexture("_mask",YamlTexture(yaml,"_mask"));
            material.SetColor("_color",YamlColor(yaml,"_color"));
            Color scroll=YamlColor(yaml,"_scrollDirection"),tiling=YamlColor(yaml,"_tiling");
            material.SetVector("_scrollDirection",new Vector4(scroll.r,scroll.g,0,0));
            material.SetVector("_tiling",new Vector4(tiling.r,tiling.g,0,0));
            EditorUtility.SetDirty(material);
            if(name=="SAE_InstructionLine")game.guideMaterial=material;
        }
        // Original InstructionLine: 1 m wide scrolling arrows lying flat (TransformZ alignment, rotated 90 on X).
        Transform existing=game.transform.Find("Tutorial route");
        LineRenderer line=existing?existing.GetComponent<LineRenderer>():null;
        if(!line){line=new GameObject("Tutorial route").AddComponent<LineRenderer>();line.transform.SetParent(game.transform,false);}
        line.transform.rotation=Quaternion.Euler(90,0,0);
        line.sharedMaterial=game.guideMaterial;line.alignment=LineAlignment.TransformZ;line.textureMode=LineTextureMode.Tile;
        line.widthMultiplier=1;line.widthCurve=AnimationCurve.Constant(0,1,1);line.useWorldSpace=true;line.loop=false;
        line.colorGradient=new Gradient{colorKeys=new[]{new GradientColorKey(Color.white,0),new GradientColorKey(Color.white,1)},alphaKeys=new[]{new GradientAlphaKey(1,0),new GradientAlphaKey(1,1)}};
        line.positionCount=2;line.SetPositions(new[]{Vector3.zero,Vector3.forward});
        line.shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;line.receiveShadows=false;line.enabled=false;
        game.guide=line;
    }
    static Texture YamlTexture(string yaml,string key)
    {
        Match m=Regex.Match(yaml,@"- "+key+@":\s+m_Texture: \{[^}]*guid: ([a-f0-9]{32})");
        Texture texture=m.Success?AssetDatabase.LoadAssetAtPath<Texture>(AssetDatabase.GUIDToAssetPath(m.Groups[1].Value)):null;
        if(!texture)throw new Exception("Material texture missing: "+key);
        return texture;
    }
    static Color YamlColor(string yaml,string key)
    {
        Match m=Regex.Match(yaml,@"- "+key+@": \{r: ([-\d.e]+), g: ([-\d.e]+), b: ([-\d.e]+), a: ([-\d.e]+)\}");
        if(!m.Success)throw new Exception("Material value missing: "+key);
        Func<int,float> f=i=>float.Parse(m.Groups[i].Value,CultureInfo.InvariantCulture);
        return new Color(f(1),f(2),f(3),f(4));
    }

    // ---- Outfits (original GameItemDatabase / DefaultOutfitDatabase; wings are not used) ----
    const int OutfitTextureSize=512;
    // Every NPC wears this one original outfit set (item names contain it).
    const string NpcOutfit="Goku";
    static void BakeOutfits(StealEggGame game)
    {
        string database=StealEggSourceRulesImporter.Text("Assets/Game/Resources/GameItemDatabase.asset");
        Func<string,IEnumerable<string>> npcItems=section=>OutfitSection(database,section).Where(p=>Path.GetFileName(p).Contains(NpcOutfit));
        game.outfitHairs=npcItems("hairs").Select(OutfitModel).Where(m=>m).ToArray();
        game.outfitFaces=npcItems("faces").Select(OutfitMaterial).Where(m=>m).ToArray();
        game.outfitShirts=npcItems("shirts").Select(OutfitMaterial).Where(m=>m).ToArray();
        game.outfitPants=npcItems("pants").Select(OutfitMaterial).Where(m=>m).ToArray();
        // The default outfit is Squid Game clothes (already worn) plus this hair.
        string defaults=StealEggSourceRulesImporter.Text("Assets/Game/Resources/DefaultOutfitDatabase.asset");
        game.playerHair=Regex.Matches(defaults.Substring(0,defaults.IndexOf("outfitBundles:")),@"guid: ([a-f0-9]{32})").Cast<Match>()
            .Select(m=>StealEggSourceRulesImporter.Resolve(m.Groups[1].Value)).Where(p=>p.Contains("/Hairs/")).Select(OutfitModel).FirstOrDefault();
        if(!game.playerHair || game.outfitHairs.Length==0 || game.outfitFaces.Length==0 || game.outfitShirts.Length==0 || game.outfitPants.Length==0)
            throw new Exception("Outfit assets missing ("+NpcOutfit+" set or player hair): copy them from the source project first.");
        foreach(Material material in game.outfitFaces.Concat(game.outfitShirts).Concat(game.outfitPants)
            .Concat(game.outfitHairs.Concat(new[]{game.playerHair}).SelectMany(h=>h.GetComponentsInChildren<Renderer>(true)).SelectMany(r=>r.sharedMaterials)).Where(m=>m).Distinct())
            ToStandard(material);
        Debug.Log("Outfits: "+game.outfitHairs.Length+" hairs, "+game.outfitFaces.Length+" faces, "+game.outfitShirts.Length+" shirts, "+game.outfitPants.Length+" pants; player hair "+game.playerHair.name+".");
    }
    static IEnumerable<string> OutfitSection(string database,string section)
    {
        Match block=Regex.Match(database,@"\n    "+section+@":\r?\n((?:    - [^\r\n]*\r?\n)+)");
        if(!block.Success)throw new Exception("Outfit list missing: "+section);
        return Regex.Matches(block.Groups[1].Value,@"guid: ([a-f0-9]{32})").Cast<Match>().Select(m=>StealEggSourceRulesImporter.Resolve(m.Groups[1].Value));
    }
    // OutfitContentModel.model / OutfitContentMaterial.materials[0] of an outfit item.
    static GameObject OutfitModel(string item)
    {
        Match m=Regex.Match(StealEggSourceRulesImporter.Text(item),@"model: \{fileID: -?\d+, guid: ([a-f0-9]{32})");
        return m.Success?AssetDatabase.LoadAssetAtPath<GameObject>(AssetDatabase.GUIDToAssetPath(m.Groups[1].Value)):null;
    }
    static Material OutfitMaterial(string item)
    {
        Match m=Regex.Match(StealEggSourceRulesImporter.Text(item),@"materials:\s+- \{fileID: -?\d+, guid: ([a-f0-9]{32})");
        return m.Success?AssetDatabase.LoadAssetAtPath<Material>(AssetDatabase.GUIDToAssetPath(m.Groups[1].Value)):null;
    }
    // The source uses URP Lit/SimpleLit; TE_V06 renders with the built-in pipeline.
    static void ToStandard(Material material)
    {
        Shader standard=Shader.Find("Standard");
        if(material.shader==standard || material.shader.name.StartsWith("Legacy") || material.shader.name.StartsWith("Unlit"))return;
        var so=new SerializedObject(material);
        Texture texture=null,emissionMap=null;Color color=Color.white,emission=Color.black;
        foreach(SerializedProperty entry in so.FindProperty("m_SavedProperties.m_TexEnvs"))
        {
            string key=entry.FindPropertyRelative("first").stringValue;var value=entry.FindPropertyRelative("second.m_Texture").objectReferenceValue as Texture;
            if(key=="_BaseMap")texture=value;else if(key=="_EmissionMap")emissionMap=value;
        }
        foreach(SerializedProperty entry in so.FindProperty("m_SavedProperties.m_Colors"))
        {
            string key=entry.FindPropertyRelative("first").stringValue;
            if(key=="_BaseColor")color=entry.FindPropertyRelative("second").colorValue;else if(key=="_EmissionColor")emission=entry.FindPropertyRelative("second").colorValue;
        }
        material.shader=standard;
        if(texture)material.SetTexture("_MainTex",texture);
        color.a=1;
        material.SetColor("_Color",color);material.SetFloat("_Glossiness",0);material.SetFloat("_Metallic",0);
        if(emission.maxColorComponent>0)
        {
            material.EnableKeyword("_EMISSION");material.globalIlluminationFlags=MaterialGlobalIlluminationFlags.None;
            material.SetColor("_EmissionColor",emission);if(emissionMap)material.SetTexture("_EmissionMap",emissionMap);
        }
        EditorUtility.SetDirty(material);
        var importer=texture?AssetImporter.GetAtPath(AssetDatabase.GetAssetPath(texture)) as TextureImporter:null;
        if(importer && importer.maxTextureSize>OutfitTextureSize){importer.maxTextureSize=OutfitTextureSize;importer.SaveAndReimport();}
    }
    static AnimationClip MonsterClip(string path,string field,int depth=0)
    {
        if(path==null || depth>8)return null;
        string yaml=StealEggSourceRulesImporter.Text(path);
        Match m=Regex.Match(yaml,@"propertyPath: _animation\."+field+@"\r?\n[^\r\n]*\r?\n\s+objectReference: \{fileID: (-?\d+), guid: ([a-f0-9]{32})");
        if(!m.Success)m=Regex.Match(yaml,@"_animation:\s+idle: \{fileID: (-?\d+), guid: ([a-f0-9]{32})[^\r\n]*\r?\n\s+walk: \{fileID: (-?\d+), guid: ([a-f0-9]{32})");
        if(m.Success)
        {
            int offset=field=="walk" && m.Groups.Count>3 && m.Groups[3].Success?2:0;
            long id=long.Parse(m.Groups[1+offset].Value,CultureInfo.InvariantCulture);string guid=m.Groups[2+offset].Value;
            foreach(AnimationClip clip in AssetDatabase.LoadAllAssetsAtPath(AssetDatabase.GUIDToAssetPath(guid)).OfType<AnimationClip>())
            {
                string g;long local;
                if(AssetDatabase.TryGetGUIDAndLocalFileIdentifier(clip,out g,out local) && local==id)return clip;
            }
            return null;
        }
        Match parent=Regex.Match(yaml,@"m_SourcePrefab:.*?guid: ([a-f0-9]{32})");
        return parent.Success?MonsterClip(StealEggSourceRulesImporter.Resolve(parent.Groups[1].Value),field,depth+1):null;
    }
}
