using System;
using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

// Assigns the original UI to StealEggGame's serialized references (it does not rebuild or move any UI).
// Row templates get a small view component holding their children, so runtime clones need no name lookups.
public static class StealEggUIBinder
{
    [MenuItem("Steal Egg/Bind UI references")]
    static void BindMenu()
    {
        StealEggGame game=UnityEngine.Object.FindFirstObjectByType<StealEggGame>();
        if(!game)throw new Exception("StealEggGame not found in the open scene.");
        Bind(game);
        EditorSceneManager.SaveScene(game.gameObject.scene);
    }

    static readonly List<string> missing=new List<string>();
    static Transform At(Transform root,string path)
    {
        Transform t=root?root.Find(path):null;
        if(!t)missing.Add((root?root.name:"<null>")+"/"+path);
        return t;
    }
    static T Get<T>(Transform root,string path) where T:Component
    {
        Transform t=At(root,path);if(!t)return null;
        T c=t.GetComponent<T>();if(!c)missing.Add(root.name+"/"+path+" ("+typeof(T).Name+")");
        return c;
    }
    // Optional UI: a reference left empty when the object is not in the scene.
    static T Optional<T>(Transform root,string path) where T:Component{Transform t=root?root.Find(path):null;return t?t.GetComponent<T>():null;}
    static GameObject Obj(Transform root,string path){Transform t=At(root,path);return t?t.gameObject:null;}
    // A clickable target: keeps (or adds) its Button and lets its own graphic receive the press.
    static Button Btn(Transform root,string path){Transform t=At(root,path);return t?Clickable(t):null;}
    static Button Clickable(Transform t)
    {
        Button b=t.GetComponent<Button>();if(!b)b=t.gameObject.AddComponent<Button>();
        Graphic g=t.GetComponent<Graphic>();if(g){g.raycastTarget=true;if(!b.targetGraphic)b.targetGraphic=g;}
        return b;
    }
    static T View<T>(Transform t) where T:Component{T v=t.GetComponent<T>();return v?v:t.gameObject.AddComponent<T>();}
    // First child of a runtime list: the inactive row template.
    static Transform Template(Transform content)
    {
        if(!content)return null;
        if(content.childCount==0){missing.Add(content.name+" has no row template");return null;}
        Transform t=content.GetChild(0);t.gameObject.SetActive(false);return t;
    }

    public static void Bind(StealEggGame game)
    {
        missing.Clear();
        Transform ui=game.originalUI;
        if(!ui)throw new Exception("StealEggGame.originalUI is not assigned.");
        SerializedObject so=new SerializedObject(game);

        // Ad frames and the original Spine instruction hands are never shown in the playable.
        foreach(Transform t in ui.GetComponentsInChildren<Transform>(true).Where(t=>t && (t.name=="MrectAd" || t.name=="Instruction")).ToArray())
            if(t)UnityEngine.Object.DestroyImmediate(t.gameObject);

        // ---- HUD ----
        Transform hudRoot=At(ui,"SAEGamePlayPanel"),hud=At(hudRoot,"Panel");
        var h=new StealEggGame.HudUI();
        h.functions=(RectTransform)At(hud,"[Container] FuntionButtons");
        h.actionButtons=h.functions?h.functions.Cast<Transform>().Select(t=>t.gameObject).ToArray():new GameObject[0];
        foreach(GameObject b in h.actionButtons)
        {
            if(b.name=="[Button] Steal")
            {
                PlayableHoldButton hold=View<PlayableHoldButton>(b.transform);hold.fill=Get<Image>(b.transform,"fill");
                if(hold.fill)hold.fill.fillAmount=0;
            }
            else Clickable(b.transform);
        }
        h.incubateTapHint=TapHint(At(h.functions,"[Button] Incubate/"+StealEggGame.TapHintName));
        h.hatchTapHint=TapHint(At(h.functions,"[Button] Hatch/"+StealEggGame.TapHintName));
        h.equipTapHint=TapHint(At(h.functions,"[Button] Equip Monster/"+StealEggGame.TapHintName));
        h.trainTapHint=TapHint(At(h.functions,"[Button] Use Treadmil/"+StealEggGame.TapHintName));
        h.attack=Optional<Button>(hud,"Button_Attack");if(h.attack)Clickable(h.attack.transform);
        h.settings=Btn(hud,"Button_Setting");
        h.trailShop=Btn(hud,"Left/Button_ShopTrail");h.index=Btn(hud,"Left/Button_Index");
        h.speedMode=Btn(hud,"Left/[Toggle] Speed Mode");
        h.speedOn=Obj(hud,"Left/[Toggle] Speed Mode/Marks/On");h.speedOff=Obj(hud,"Left/[Toggle] Speed Mode/Marks/Off");
        h.money=Get<TMP_Text>(hud,"MoneyFrame/Text (TMP)");h.speed=Get<TMP_Text>(hud,"SpeedPowerFrame/Text (TMP)");
        h.moneyIcon=Get<Image>(hud,"MoneyFrame/Image");h.speedIcon=Get<Image>(hud,"SpeedPowerFrame/Image");
        Transform timeFrame=hud.Find("Left/TimeOfDay Frame")?hud.Find("Left/TimeOfDay Frame"):hud.Find("TimeOfDay Frame");
        h.time=Optional<TMP_Text>(timeFrame,"Text (TMP)");h.timeIcon=Optional<Image>(timeFrame,"Image");
        h.indexHighlight=Obj(hud,"Left/Button_Index/Highlight");h.incubateHighlight=Obj(hud,"Right/[Button] Incubate Egg/Highlight");h.right=Obj(hud,"Right");
        h.equipMonster=Btn(hud,"Right/[Button] Equip Monster");h.incubateEgg=Btn(hud,"Right/[Button] Incubate Egg");
        h.boostContainer=At(hud,"UIBoost/Container_Boost");
        Transform boost=Template(h.boostContainer);
        if(boost){var v=View<IconAmountView>(boost);v.icon=boost.GetComponent<Image>();v.amount=Get<TMP_Text>(boost,"Text_Duration");h.boostTemplate=v;}
        h.zoneBanner=Obj(hud,"ZoneEnterHighlight");h.zoneFrame=(RectTransform)At(hud,"ZoneEnterHighlight/Frame");h.zoneName=Get<TMP_Text>(hud,"ZoneEnterHighlight/Frame/Back/Text_ZoneName");
        h.incomeTemplate=At(hudRoot,"Templates/Income");
        Set(so,"hudUI",h);

        // ---- Equipped pets and incubating eggs popups ----
        Transform petsPopup=At(hud,"EquipPetPopup");
        var pets=new StealEggGame.PetsPopupUI();
        pets.root=petsPopup?petsPopup.gameObject:null;pets.content=At(petsPopup,"Scroll View/Viewport/Content");
        Transform petRow=Template(pets.content);
        if(petRow){var v=View<PetRowView>(petRow);v.content=Get<TMP_Text>(petRow,"[Text] Content");v.thumbnail=Get<Image>(petRow,"Thumbnail Frame/Thumbnail");v.unequip=Btn(petRow,"[Button] UnEquip");pets.template=v;}
        pets.close=Btn(petsPopup,"[Button] Close");pets.equipBest=Btn(petsPopup,"[Button] Equip Best");pets.upgradeSlot=Btn(petsPopup,"[Button] Upgrade Slot");
        pets.slots=Get<TMP_Text>(petsPopup,"Container_Slot/Text_SlotContent");pets.upgradePrice=Get<TMP_Text>(petsPopup,"[Button] Upgrade Slot/Text_Price");
        pets.upgradeUnavailable=Obj(petsPopup,"[Button] Upgrade Slot/unavailable");
        Set(so,"petsUI",pets);

        Transform incubatePopup=At(hud,"IncubatingEggPopup");
        var incubate=new StealEggGame.IncubatePopupUI();
        incubate.root=incubatePopup?incubatePopup.gameObject:null;incubate.content=At(incubatePopup,"Scroll View/Viewport/Content");
        Transform incubateRow=Template(incubate.content);
        if(incubateRow)
        {
            var v=View<IncubateRowView>(incubateRow);v.thumbnail=Get<Image>(incubateRow,"Thumbnail Frame/Thumbnail");v.progressFill=Get<Image>(incubateRow,"ProgressContainer/Progress/ProgressFill");
            v.content=Get<TMP_Text>(incubateRow,"ProgressContainer/[Text] Content");v.open=Btn(incubateRow,"[Button] Open");v.opening=Obj(incubateRow,"Opening");incubate.template=v;
        }
        incubate.close=Btn(incubatePopup,"[Button] Close");
        Set(so,"incubateUI",incubate);

        // ---- Inventory: quick slots and bag ----
        Transform inv=At(ui,"SAEInventoryPanel/Panel");
        Transform bar=At(inv,"ExposeSlot/[Container] ExposeSlots");
        var inventory=new StealEggGame.InventoryUI();
        var slots=new List<QuickSlotView>();
        if(bar)foreach(Transform slot in bar)
        {
            if(!slot.name.StartsWith(StealEggGame.QuickSlotName))continue;
            var v=View<QuickSlotView>(slot);v.button=Clickable(slot);v.thumbnail=Get<Image>(slot,"[Image] Thumbnail");
            v.highlight=Get<Image>(slot,"[Image] Selected Highlight");v.content=Get<TMP_Text>(slot,"[Text] Content");slots.Add(v);
        }
        inventory.quickSlots=slots.ToArray();
        inventory.bag=Btn(bar,"[Button] Bag");
        Transform bagPopup=At(inv,"BagPopup"),container=At(bagPopup,"Panel/Container");
        inventory.bagPopup=bagPopup?bagPopup.gameObject:null;inventory.bagClose=Btn(bagPopup,"Panel/[Button] Close");
        inventory.bagContent=At(container,"[Container] Selection/Scroll View/Viewport/Content");
        Transform cell=Template(inventory.bagContent);
        if(cell)
        {
            var v=View<BagCellView>(cell);v.button=Clickable(cell);v.thumbnail=Get<Image>(cell,"Thumbnail");v.highlight=Get<Image>(cell,"Highlight");
            v.exposeMark=Get<Image>(cell,"Expose_Mark");v.amount=Get<TMP_Text>(cell,"[Text] Amount");inventory.bagTemplate=v;
        }
        Transform petInfo=At(container,"[Container] Info/Info_Monster"),eggInfo=At(container,"[Container] Info/Info_Egg");
        inventory.petInfo=petInfo?petInfo.gameObject:null;
        inventory.petThumbnail=Get<Image>(petInfo,"Thumbnail");inventory.petName=Get<TMP_Text>(petInfo,"Text_Name");
        inventory.petIncome=Get<TMP_Text>(petInfo,"Text_Income");inventory.petRarity=Get<TMP_Text>(petInfo,"Text_Rarity");
        inventory.petEquip=Btn(petInfo,"Button_Equip");inventory.petDrop=Btn(petInfo,"Button_Drop");
        inventory.eggInfo=eggInfo?eggInfo.gameObject:null;
        inventory.eggThumbnail=Get<Image>(eggInfo,"Thumbnail");inventory.eggName=Get<TMP_Text>(eggInfo,"Text_Name");inventory.eggWeight=Get<TMP_Text>(eggInfo,"Text_Weight");
        inventory.eggIncubate=Btn(eggInfo,"Button_Incubate");inventory.eggDrop=Btn(eggInfo,"Button_Drop");
        Set(so,"inventoryUI",inventory);

        // ---- Reward, dialog, warning ----
        Transform rewardRoot=At(ui,"SAE_RewardEarnPanel");
        var reward=new StealEggGame.RewardUI();
        reward.root=rewardRoot?rewardRoot.gameObject:null;reward.title=Get<TMP_Text>(rewardRoot,"Panel/Content/Title/Text_Title");
        reward.content=At(rewardRoot,"Panel/Content/Reward_Container");
        Transform rewardRow=Template(reward.content);
        if(rewardRow){var v=View<IconAmountView>(rewardRow);v.icon=Get<Image>(rewardRow,"Image");v.amount=Get<TMP_Text>(rewardRow,"Text (TMP)");reward.template=v;}
        reward.close=Btn(rewardRoot,"Panel/Button_Close");reward.tapToClose=Btn(rewardRoot,"Panel/Content/TapToClose");
        Set(so,"rewardUI",reward);
        Transform dialogRoot=At(ui,"SAE_DialogPanel");
        var dialog=new StealEggGame.DialogUI();dialog.root=dialogRoot?dialogRoot.gameObject:null;dialog.message=Get<TMP_Text>(dialogRoot,"Panel/MessagePopup/[Text] Message");
        Set(so,"dialogUI",dialog);
        so.FindProperty("warningPanel").objectReferenceValue=Obj(ui,"SAEWarningPanel");

        // ---- Treadmill upgrade ----
        Transform treadmillRoot=At(ui,"SAE_UpgradeTreadmilPanel"),treadmillPopup=At(treadmillRoot,"Panel/Popup");
        var treadmill=new StealEggGame.TreadmillPanelUI();
        treadmill.root=treadmillRoot?treadmillRoot.gameObject:null;treadmill.close=Btn(treadmillPopup,"Button_Close");treadmill.upgrade=Btn(treadmillPopup,"Buttons/Button_Upgrade");
        treadmill.level=Get<TMP_Text>(treadmillPopup,"Image/[Text] Content Level");treadmill.train=Get<TMP_Text>(treadmillPopup,"Image/[Text] Content Train");
        treadmill.price=Get<TMP_Text>(treadmillPopup,"Buttons/Button_Upgrade/[Text] Price");treadmill.max=Obj(treadmillPopup,"Image/[Text] MAX");
        Set(so,"treadmillUI",treadmill);

        // ---- Monster Index ----
        Transform indexRoot=At(ui,"SAE_MonsterIndexPanel"),indexPopup=At(indexRoot,"Panel/Popup");
        var index=new StealEggGame.IndexUI();
        index.root=indexRoot?indexRoot.gameObject:null;index.close=Btn(indexPopup,"Button_Close");index.claim=Btn(indexPopup,"Monster_Reward_Frame/Content/Button_Claim");
        index.zones=At(indexPopup,"[Scroll View] Container_Zones/Viewport/Zone_Container");
        Transform lockedZone=indexPopup?indexPopup.Find(StealEggGame.LockedZone):null;
        if(!lockedZone && index.zones)lockedZone=index.zones.Find(StealEggGame.LockedZone);
        if(lockedZone && index.zones && lockedZone.parent!=index.zones){lockedZone.SetParent(index.zones,false);lockedZone.SetAsLastSibling();}
        if(lockedZone)lockedZone.gameObject.SetActive(false);
        index.lockedZone=lockedZone;
        Transform zoneRow=Template(index.zones);
        if(zoneRow)
        {
            var v=View<IndexZoneView>(zoneRow);v.zoneName=Get<TMP_Text>(zoneRow,"Zone_Thumnail/Text_ZoneName");v.thumbnail=Get<Image>(zoneRow,"Zone_Thumnail/Image_Zoner_Thumbnail");
            v.progressFill=Get<Image>(zoneRow,"Zone_Progress/Zone_Progress_Fill");v.progress=Get<TMP_Text>(zoneRow,"Zone_Progress/Text_Zone_Progress");
            v.petContent=At(zoneRow,"[Scroll View] Pet/Viewport/Content");
            Transform petCell=Template(v.petContent);
            if(petCell)
            {
                var c=View<IndexPetCellView>(petCell);c.button=Clickable(petCell);c.frame=petCell.GetComponent<Image>();c.thumbnail=Get<Image>(petCell,"Thumbnail");
                c.petName=Get<TMP_Text>(petCell,"Text_Name");c.selected=Obj(petCell,"Selected Highlight");c.mark=Obj(petCell,"Mark");v.petTemplate=c;
            }
            index.zoneTemplate=v;
        }
        index.progressFill=Get<Image>(indexPopup,"IndexProgress/Fill");index.progress=Get<TMP_Text>(indexPopup,"IndexProgress/Text_Progress");
        index.information=Obj(indexPopup,"Infomation");index.rewardFrame=Obj(indexPopup,"Monster_Reward_Frame");index.claimed=Obj(indexPopup,"Monster_Reward_Frame/Content/Button_Claimed");
        index.infoImage=Get<Image>(indexPopup,"Infomation/Content/Image");index.infoName=Get<TMP_Text>(indexPopup,"Infomation/Content/Text_Name");
        index.infoIncome=Get<TMP_Text>(indexPopup,"Infomation/Content/Text_Income");index.infoRarity=Get<TMP_Text>(indexPopup,"Infomation/Content/Text_Rarity");
        index.rewardContent=At(indexPopup,"Monster_Reward_Frame/Content/Scroll View/Viewport/Content");
        if(index.rewardContent)for(int i=index.rewardContent.childCount-1;i>=1;i--)UnityEngine.Object.DestroyImmediate(index.rewardContent.GetChild(i).gameObject);
        Transform indexReward=Template(index.rewardContent);
        if(indexReward){var v=View<IconAmountView>(indexReward);v.icon=Get<Image>(indexReward,"Thumbnail");v.amount=Get<TMP_Text>(indexReward,"Text_Amount");index.rewardTemplate=v;}
        Set(so,"indexUI",index);

        // ---- Features left to the full game ----
        foreach(var locked in new[]{("settingsUI","SAE_SettingPanel"),("coopUI","SAE_UpgradeCoopPanel"),("fuseUI","SAE_FuseMachinePanel"),("frogUI","SAE_LuckyFrogPanel"),("shopUI","SAE_ExchangeShopPanel"),("trailUI","SAE_TrailShopPanel")})
        {
            Transform root=At(ui,locked.Item2);
            var v=new StealEggGame.LockedPanelUI();v.root=root?root.gameObject:null;v.close=Btn(root,"Panel/Popup/Button_Close");
            Set(so,locked.Item1,v);
        }
        // Station panels follow the player in and out of their trigger: their backdrop must not cover the joystick.
        foreach(string station in new[]{"SAE_UpgradeCoopPanel","SAE_UpgradeTreadmilPanel","SAE_FuseMachinePanel","SAE_LuckyFrogPanel","SAE_ExchangeShopPanel"})
        {Image backdrop=ui.Find(station+"/Panel")?ui.Find(station+"/Panel").GetComponent<Image>():null;if(backdrop)backdrop.raycastTarget=false;}

        // ---- Playable controls: the jump tap hint ----
        SerializedProperty jump=so.FindProperty("jumpHint");
        Transform jumpButton=so.FindProperty("jumpButton").objectReferenceValue?((Component)so.FindProperty("jumpButton").objectReferenceValue).transform:null;
        jump.objectReferenceValue=TapHint(At(jumpButton,"Jump hint"));

        so.ApplyModifiedPropertiesWithoutUndo();
        EditorUtility.SetDirty(game);EditorSceneManager.MarkSceneDirty(game.gameObject.scene);
        if(missing.Count>0)throw new Exception("UI references not found:\n"+string.Join("\n",missing));
        Debug.Log("UI references bound.");
    }
    static TapHintView TapHint(Transform hint)
    {
        if(!hint)return null;
        var v=View<TapHintView>(hint);v.hand=(RectTransform)hint.Find("Hand");v.shine=(RectTransform)hint.Find("Shine");
        v.shineGraphic=v.shine?v.shine.GetComponent<Graphic>():null;
        if(!v.hand)missing.Add(hint.name+"/Hand");
        return v;
    }
    // Writes a [Serializable] reference group into the serialized field of the same name.
    static void Set(SerializedObject so,string field,object value)
    {
        SerializedProperty p=so.FindProperty(field);
        if(p==null)throw new Exception("StealEggGame has no field "+field);
        p.boxedValue=value;
    }
}
