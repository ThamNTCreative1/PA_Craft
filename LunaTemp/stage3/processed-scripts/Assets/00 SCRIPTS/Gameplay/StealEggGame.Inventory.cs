using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

// Original SAE_Inventory: owned eggs, pets and the bat; a quick-slot bar and the bag popup.
public partial class StealEggGame
{
    public enum ItemKind { Egg, Pet, Bat }
    public class Item
    {
        public ItemKind kind;
        public Zone zone;
        public int variant, pet;
        public float size=1;
        public double income;
    }
    private readonly List<Item> items=new List<Item>();
    private readonly List<Item> quick=new List<Item>();
    private Item hand, bagSelection;
    private GameObject handVisual;
    public const string QuickSlotName="Quick Slot ";
    private readonly List<GameObject> bagCells=new List<GameObject>();
    private int QuickSlotCount {get{return inventoryUI.quickSlots!=null?inventoryUI.quickSlots.Length:0;}}

    private void AddItem(Item item,bool expose)
    {
        items.Add(item);
        if(expose && quick.Count<QuickSlotCount)quick.Add(item);
        if(item.kind==ItemKind.Egg && !IsCarrying && hand==null)EquipHand(item);
        RefreshInventoryUI();
    }
    private void RemoveItem(Item item)
    {
        items.Remove(item);quick.Remove(item);
        if(hand==item)UnequipHand();
        if(bagSelection==item)bagSelection=null;
        RefreshInventoryUI();
    }
    private Item PetItem(int pet,float size)
    {
        Item item=new Item();item.kind=ItemKind.Pet;item.pet=pet;item.size=size;
        item.income=System.Math.Max(1,System.Math.Floor(petCatalog[pet].income*System.Math.Pow(incomeMultiplierBySize,size)));
        return item;
    }
    private PlayableEggRules ItemRule(Item item){return item.kind==ItemKind.Egg?Rule(item.zone,item.variant):null;}
    private Sprite ItemIcon(Item item)
    {
        if(item==null)return null;
        if(item.kind==ItemKind.Bat)return batIcon;
        if(item.kind==ItemKind.Pet)return petCatalog[item.pet].thumbnail;
        PlayableEggRules rule=ItemRule(item);return rule!=null?rule.thumbnail:null;
    }
    private string ItemName(Item item)
    {
        if(item.kind==ItemKind.Bat)return "Ballbat";
        if(item.kind==ItemKind.Pet)return petCatalog[item.pet].name;
        PlayableEggRules rule=ItemRule(item);return rule!=null?rule.name.Replace('_',' '):"Egg";
    }
    private GameObject ItemModel(Item item)
    {
        GameObject obj=null;
        if(item.kind==ItemKind.Bat && batPrefab)obj=Instantiate(batPrefab);
        else if(item.kind==ItemKind.Pet && petCatalog[item.pet].prefab){obj=Instantiate(petCatalog[item.pet].prefab);obj.transform.localScale*=item.size;}
        else if(item.kind==ItemKind.Egg){obj=Instantiate(item.zone.eggPrefabs[item.variant]);obj.transform.localScale=Vector3.one*Mathf.Clamp(item.size/5,1,6);}
        if(obj)DisablePhysics(obj);
        if(obj && item.kind==ItemKind.Pet)ShowPetInfo(obj.transform,item);
        return obj;
    }

    // ---- Hand slot ----
    private void EquipHand(Item item)
    {
        if(IsCarrying || item==null)return;
        UnequipHand();
        hand=item;handVisual=ItemModel(item);
        if(handVisual){handVisual.transform.SetParent(carryPoint,false);handVisual.transform.localPosition=Vector3.zero;handVisual.transform.localRotation=Quaternion.identity;if(item.kind==ItemKind.Pet)handVisual.transform.localScale=Vector3.one*.5f;}
        PlaySound(equipSound);RefreshInventoryUI();
    }
    private void UnequipHand()
    {
        if(handVisual)Destroy(handVisual);
        hand=null;handVisual=null;RefreshInventoryUI();
    }
    private void UpdateHandVisual()
    {
        if(rightHandSlot && hand!=null && hand.kind==ItemKind.Bat && !IsCarrying)
            carryPoint.SetPositionAndRotation(rightHandSlot.position,rightHandSlot.rotation);
        else if(carryHand && hand!=null && !IsCarrying)
        {
            BonePose(carryHand,player,out Vector3 handPosition,out Quaternion handRotation);
            carryPoint.position=handPosition+Vector3.up*.1f+player.forward*.1f;
            carryPoint.rotation=player.rotation;
        }
        else if(carryPoint){carryPoint.localPosition=new Vector3(0,1.5f,1.1f);carryPoint.localRotation=Quaternion.identity;}
        ApplyBatSwing();
    }
    private bool CanUseInventory {get{return !IsKnockedDown && !training && !EndCardVisible && !IsCarrying;}}

    // ---- Quick-slot bar and bag popup UI ----
    private void BindInventoryUI()
    {
        InventoryUI ui=inventoryUI;
        for(int i=0;i<QuickSlotCount;i++){int index=i;Bind(ui.quickSlots[i].button,()=>TapQuickSlot(index));Show(ui.quickSlots[i],false);}
        Bind(ui.bag,ToggleBag);
        Bind(ui.petEquip,()=>{if(bagSelection!=null && EquipPetToCoop(bagSelection))RefreshBag();});
        Bind(ui.petDrop,()=>{if(bagSelection!=null){RemoveItem(bagSelection);RefreshBag();}});
        Bind(ui.eggIncubate,()=>{if(bagSelection!=null){IncubateFromBag(bagSelection);RefreshBag();}});
        Bind(ui.eggDrop,()=>{if(bagSelection!=null){RemoveItem(bagSelection);RefreshBag();}});
        Bind(ui.bagClose,CloseModal,true);
        Show(ui.bagPopup,false);
    }
    private void TapQuickSlot(int index)
    {
        if(!TutorialCompleted){ShowDialog("You must finish tutorial first");return;}
        if(index>=quick.Count || !CanUseInventory)return;
        Item item=quick[index];
        if(hand==item)UnequipHand();else EquipHand(item);
    }
    private void ToggleBag()
    {
        if(!TutorialCompleted){ShowDialog("You must finish tutorial first");return;}
        if(modal==inventoryUI.bagPopup){CloseModal();return;}
        bagSelection=null;OpenModal(inventoryUI.bagPopup);RefreshBag();
    }
    private void RefreshInventoryUI()
    {
        for(int i=0;i<QuickSlotCount;i++)
        {
            QuickSlotView slot=inventoryUI.quickSlots[i];Item item=i<quick.Count?quick[i]:null;
            Show(slot,item!=null);if(item==null)continue;
            SetImage(slot.thumbnail,ItemIcon(item));
            ShowMark(slot.highlight,item==hand);
            SetText(slot.content,"");
        }
        Show(hudUI.attack,hand!=null && hand.kind==ItemKind.Bat && !IsCarrying);
    }
    private void RefreshBag()
    {
        InventoryUI ui=inventoryUI;
        if(!ui.bagPopup || !ui.bagPopup.activeSelf)return;
        foreach(GameObject cell in bagCells)Destroy(cell);bagCells.Clear();
        foreach(Item item in items)
        {
            Item captured=item;
            BagCellView cell=Instantiate(ui.bagTemplate,ui.bagContent,false);cell.gameObject.SetActive(true);bagCells.Add(cell.gameObject);
            SetImage(cell.thumbnail,ItemIcon(item));SetText(cell.amount,"");
            ShowMark(cell.highlight,item==bagSelection);ShowMark(cell.exposeMark,quick.Contains(item));
            Bind(cell.button,()=>{bagSelection=captured;RefreshBag();});
        }
        bool pet=bagSelection!=null && bagSelection.kind==ItemKind.Pet,egg=bagSelection!=null && bagSelection.kind==ItemKind.Egg;
        Show(ui.petInfo,pet);Show(ui.eggInfo,egg);
        if(pet)
        {
            PetInfo info=petCatalog[bagSelection.pet];
            SetImage(ui.petThumbnail,info.thumbnail);SetText(ui.petName,info.name);
            SetText(ui.petIncome,"$"+Num(bagSelection.income)+"/s");SetRarityText(ui.petRarity,info.rarity);
        }
        if(egg)
        {
            SetImage(ui.eggThumbnail,ItemIcon(bagSelection));SetText(ui.eggName,ItemName(bagSelection));
            SetText(ui.eggWeight,Num(EggWeightOf(bagSelection))+"kg");
        }
    }
    private float EggWeightOf(Item item){PlayableEggRules rule=ItemRule(item);return rule!=null?rule.incubationTime:10;}
}
