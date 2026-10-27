using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;

/// <summary>Updates counts and visibility on the fully scene-authored HUD.</summary>
public class BuildProgressUI : MonoBehaviour
{
    public event System.Action BlockSlotClicked;
    private int slotPointer=-99,pressedSlot=-1;
    private Vector2 slotPressPosition;
    private GameController controller;
    [SerializeField] private RectTransform canvasRoot,logo,install,bar,fill,building,inventory;
    [SerializeField] private Text title,count;
    [SerializeField] private RectTransform[] slots=new RectTransform[7];
    [SerializeField] private Image[] blockImages=new Image[7];
    [System.Serializable]
    public class BlockItem
    {
        public string label;
        public string[] types;
        [System.NonSerialized] public List<BuildBlock> blocks;
    }
    [SerializeField] private BlockItem[] blockItems=new BlockItem[0];
    [SerializeField] private Text[] amounts=new Text[7];
    private int lastBuilt=-1,lastPart=-1,lastBlock=-1;
    private int installPointer=-99;
    private int[] previousRemaining;
    private bool changeTutorialUsed;
    private int changeTutorialIndex=-1;
    public RectTransform ChangeBlockTutorialTarget => changeTutorialIndex>=0 ? slots[changeTutorialIndex] : null;

    public void Initialize(GameController gameController)
    {
        controller=gameController;
        if(canvasRoot==null || fill==null || count==null)
        {
            Debug.LogError("Assign the saved Gameplay UI references on BuildProgressUI.",this);
            enabled=false;return;
        }
        lastBuilt=lastPart=-1;
        foreach(var item in blockItems)item.blocks=new List<BuildBlock>();
        for(int p=0;p<controller.PartCount;p++)
            foreach(var block in controller.GetPart(p).blocks)
                for(int g=0;g<blockItems.Length;g++)
                    if(Matches(blockItems[g],block.type)){blockItems[g].blocks.Add(block);break;}
        Refresh();
    }
    private void Update()
    {
        if(controller==null||canvasRoot==null)return;
        if(lastBuilt!=controller.BuiltBlocks||lastPart!=controller.CurrentPartIndex||lastBlock!=controller.CurrentBlockIndex)Refresh();
    }
    private void Refresh()
    {
        if(controller==null)return;
        lastBuilt=controller.BuiltBlocks;lastPart=controller.CurrentPartIndex;
        lastBlock=controller.CurrentBlockIndex;
        if(title!=null)title.text=controller.IsComplete?"BUILD COMPLETE!":"DOG SHELTER";
        count.text=controller.BuiltBlocks+"/"+controller.TotalBlocks;
        float progress=controller.TotalBlocks>0?(float)controller.BuiltBlocks/controller.TotalBlocks:0;
        fill.localScale=new Vector3(progress,1,1);fill.gameObject.SetActive(progress>0);
        int active=-1;
        var current=controller.GetPart(controller.CurrentPartIndex);
        if(current!=null && lastBlock>=0 && lastBlock<current.blocks.Count)
            for(int g=0;g<blockItems.Length;g++)
                if(Matches(blockItems[g],current.blocks[lastBlock].type)){active=g;break;}
        int page=Mathf.Max(0,active)/7*7;
        var remainingCounts=new int[blockItems.Length];
        bool completedType=false;
        for(int i=0;i<blockItems.Length;i++)
        {
            foreach(var block in blockItems[i].blocks)if(!block.built)remainingCounts[i]++;
            if(previousRemaining!=null && previousRemaining[i]>0 && remainingCounts[i]==0)completedType=true;
        }
        previousRemaining=remainingCounts;
        if(controller.IsComplete)changeTutorialIndex=-1;
        else if(!changeTutorialUsed && completedType)
        {
            changeTutorialIndex=FindChangeTutorialTarget(remainingCounts,active);
            changeTutorialUsed=changeTutorialIndex>=0;
        }
        if(changeTutorialIndex>=0)
        {
            if(remainingCounts[changeTutorialIndex]==0 || changeTutorialIndex==active)
                changeTutorialIndex=FindChangeTutorialTarget(remainingCounts,active);
            if(changeTutorialIndex>=0)page=changeTutorialIndex/7*7;
        }
        for(int index=0;index<blockItems.Length;index++)
        {
            slots[index].gameObject.SetActive(index>=page && index<page+7);
            var item=blockItems[index];
            int remaining=0;foreach(var block in item.blocks)if(!block.built)remaining++;
            slots[index].GetComponent<Image>().color=index==active?Color.white:new Color(1,1,1,.25f);
            blockImages[index].color=remaining>0?Color.white:new Color(1,1,1,.35f);
            amounts[index].text=remaining.ToString();
        }
    }
    private static int FindChangeTutorialTarget(int[] remainingCounts,int active)
    {
        for(int i=0;i<remainingCounts.Length;i++)
            if(i!=active && remainingCounts[i]>0)return i;
        return -1;
    }
    private static bool Matches(BlockItem item,string type)
    {
        foreach(string member in item.types)if(member==type)return true;
        return false;
    }
    public bool BeginPointer(int id,[Bridge.Ref] Vector2 position)
    {
        for(int i=0;i<slots.Length;i++)
            if(CraftHudStyle.Hit(slots[i],position))
            {
                if(slotPointer==-99){slotPointer=id;pressedSlot=i;slotPressPosition=position;}
                return true;
            }
        if(CraftHudStyle.Hit(install,position)){if(installPointer==-99)installPointer=id;return true;}
        return CraftHudStyle.Hit(logo,position)||CraftHudStyle.Hit(bar,position)||CraftHudStyle.Hit(building,position)||CraftHudStyle.Hit(inventory,position);
    }
    public void EndPointer(int id,[Bridge.Ref] Vector2 position,bool canceled)
    {
        if(id==slotPointer)
        {
            int index=pressedSlot;slotPointer=-99;pressedSlot=-1;
            if(!canceled && index>=0 && (position-slotPressPosition).sqrMagnitude<=144f && CraftHudStyle.Hit(slots[index],position))
            {
                if(controller!=null && index<blockItems.Length && controller.SelectBlockTypes(blockItems[index].types))
                {
                    changeTutorialIndex=-1;
                    Refresh();
                }
                BlockSlotClicked?.Invoke();
            }
        }
        if(id!=installPointer)return;installPointer=-99;
        if(canceled||!CraftHudStyle.Hit(install,position))return;
        if(LunaController.Ins!=null)LunaController.Ins.ShowEndCard();
    }
}
