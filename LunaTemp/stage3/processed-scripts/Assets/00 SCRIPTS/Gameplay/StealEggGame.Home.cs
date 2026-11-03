using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

// Player house: coop slots and income, incubators, hatching, treadmill training and the two upgrade pads.
public partial class StealEggGame
{
    private class CoopPet { public Item item; public Transform obj; public Animator animator; public BoxCollider coop; public Vector3 target; public float nextMove, incomeClock; }
    private class Incubator { public Item item; public Transform obj, timer; public TMPro.TMP_Text label; public float clock, duration, openClock; public bool ready, opening; public Vector3 startScale, endScale; public Quaternion rotation; }
    private class FlyingPet { public Item item; public Transform obj; public Vector3 from, scale; public float clock; }
    private readonly List<CoopPet> coopPets=new List<CoopPet>();
    private readonly List<CoopPet> decorPets=new List<CoopPet>();
    private readonly List<Incubator> incubators=new List<Incubator>();
    private readonly List<FlyingPet> flying=new List<FlyingPet>();
    private int coopLevel=1, treadmillLevel=1;
    private readonly List<GameObject> petRows=new List<GameObject>();
    private readonly List<IncubateRowView> incubateRows=new List<IncubateRowView>();
    private House MyHouse {get{return houses[0];}}
    private int SlotsAt(int level){return coopBaseSlots+level-1;}
    private int MaxSlots {get{return SlotsAt(coopLevel);}}
    private int MaxCoopLevel {get{return coopPrices.Length;}}
    private int MaxTreadmillLevel {get{return Mathf.Min(treadmillPrices.Length,MyHouse.treadmills.Length);}}
    private double Price(double value){return value*priceMultiplier;}
    private float IncubateTick {get{return (night?nightIncubateMultiplier:1)*BoostMultiplier(1);}}

    private void StartHome()
    {
        int bigPetHouse=Random.Range(1,houses.Length);
        float largestPetSize=0;for(int p=0;p<petCatalog.Length;p++)largestPetSize=Mathf.Max(largestPetSize,MaxPetSize(p));
        for(int h=0;h<houses.Length;h++)
        {
            House house=houses[h];
            if(h==0){ShowCoopModel(house,coopModelByLevel[0]);ShowTreadmill(house,1);continue;}
            ShowCoopModel(house,Random.Range(1,house.coopModels.Length+1));ShowTreadmill(house,Random.Range(1,house.treadmills.Length+1));
            // One random NPC coop shows a single pet at the largest size any pet can reach; the others hold two small ones.
            bool big=h==bigPetHouse;
            List<int> pool=new List<int>();
            for(int p=0;p<petCatalog.Length;p++)if(!big || MaxPetSize(p)>=largestPetSize)pool.Add(p);
            for(int i=0;i<(big?1:npcCoopSmallPets) && pool.Count>0;i++)
            {
                int pet=pool[Random.Range(0,pool.Count)];
                CoopPet decor=SpawnCoopPet(PetItem(pet,big?LargestPetSize(pet):RollSmallPetSize(pet)),house.Coop,house.petContainer);
                if(decor!=null)decorPets.Add(decor);
            }
        }
        playerCoopArea=MyHouse.Coop;trainingPoint=MyHouse.TrainSlot;
        RefreshPads();
    }
    private float RollPetSize(int pet)
    {
        foreach(Zone zone in zones)foreach(PlayableEggRules rule in zone.eggRules)
            if(rule.petIds!=null)foreach(int id in rule.petIds)if(id==pet)return rule.RollSize();
        return 1;
    }
    // Rolls from the egg's size table until the size stays under npcCoopBigPetSize.
    private float RollSmallPetSize(int pet)
    {
        for(int i=0;i<64;i++){float size=RollPetSize(pet);if(size<npcCoopBigPetSize)return size;}
        return 1;
    }
    // A size inside the pet's top size range.
    private float LargestPetSize(int pet)
    {
        Vector2 top=Vector2.one;
        foreach(Zone zone in zones)foreach(PlayableEggRules rule in zone.eggRules)
            if(rule.petIds!=null && System.Array.IndexOf(rule.petIds,pet)>=0 && rule.sizeRanges!=null)
                foreach(Vector2 range in rule.sizeRanges)if(Mathf.Max(range.x,range.y)>Mathf.Max(top.x,top.y))top=range;
        return Random.Range(Mathf.Min(top.x,top.y),Mathf.Max(top.x,top.y));
    }
    private float MaxPetSize(int pet)
    {
        float max=1;
        foreach(Zone zone in zones)foreach(PlayableEggRules rule in zone.eggRules)
            if(rule.petIds!=null && System.Array.IndexOf(rule.petIds,pet)>=0 && rule.sizeRanges!=null)
                foreach(Vector2 range in rule.sizeRanges)max=Mathf.Max(max,range.x,range.y);
        return max;
    }
    private void ShowCoopModel(House house,int id){house.coopModel=id;for(int i=0;i<house.coopModels.Length;i++)if(house.coopModels[i])house.coopModels[i].gameObject.SetActive(i==id-1);}
    private void ShowTreadmill(House house,int level){house.treadmill=level;for(int i=0;i<house.treadmills.Length;i++)if(house.treadmills[i])house.treadmills[i].gameObject.SetActive(i==level-1);}
    private bool InsideMyCoop {get{return InsideBox(MyHouse.Coop,player.position,.35f);}}
    private Vector3 CoopCenter {get{BoxCollider c=MyHouse.Coop;return c.transform.TransformPoint(c.center);}}
    private Vector3 RandomInCoop(BoxCollider box)
    {
        Vector3 half=box.size*.5f;
        Vector3 local=box.center+new Vector3(Random.Range(-half.x,half.x)*.75f,-half.y,Random.Range(-half.z,half.z)*.75f);
        Vector3 point=box.transform.TransformPoint(local);
        RaycastHit hit;if(Physics.Raycast(point+Vector3.up*3,Vector3.down,out hit,8,~0,QueryTriggerInteraction.Ignore))point.y=hit.point.y;
        return point;
    }
    private CoopPet SpawnCoopPet(Item item,BoxCollider coop,Transform parent)
    {
        GameObject prefab=petCatalog[item.pet].prefab;if(!prefab)return null;
        GameObject obj=Instantiate(prefab,RandomInCoop(coop),Quaternion.Euler(0,Random.Range(0,360),0));
        DisablePhysics(obj);obj.transform.localScale*=item.size;if(parent)obj.transform.SetParent(parent,true);
        ShowPetInfo(obj.transform,item);
        CoopPet pet=new CoopPet();pet.item=item;pet.obj=obj.transform;pet.coop=coop;pet.animator=obj.GetComponentInChildren<Animator>();
        pet.target=obj.transform.position;pet.nextMove=Time.time+Random.Range(1f,4f);
        return pet;
    }
    // Original SAE_MonsterInfoDisplayment: name, rarity and income above every monster, turned to the camera.
    private readonly List<Transform> petInfos=new List<Transform>();
    private void ShowPetInfo(Transform model,Item item)
    {
        Transform content=model.Find("UI_Info/Content");if(!content)return;
        // DisablePhysics hides every label on a spawned model; the info labels are wanted here.
        foreach(TMPro.TMP_Text label in content.GetComponentsInChildren<TMPro.TMP_Text>(true))label.gameObject.SetActive(true);
        SetText(ChildText(content,"Name"),petCatalog[item.pet].name.Replace('_',' '));
        SetRarityText(ChildText(content,"Rarity"),petCatalog[item.pet].rarity);
        SetText(ChildText(content,"Income"),"$"+Num(item.income)+"/s");
        petInfos.Add(content);
    }
    // Pet model prefabs (world space) carry their own labels; they are looked up on the spawned model.
    private static TMPro.TMP_Text ChildText(Transform root,string name){Transform t=root.Find(name);return t?t.GetComponent<TMPro.TMP_Text>():null;}
    private void UpdatePetInfos()
    {
        Vector3 eye=gameCamera.transform.position;
        for(int i=petInfos.Count-1;i>=0;i--)
        {
            Transform info=petInfos[i];
            if(!info){petInfos.RemoveAt(i);continue;}
            float range=50*Mathf.Max(1,info.lossyScale.x/3);
            Vector3 direction=info.position-eye;
            if(direction.sqrMagnitude<=range*range && direction.sqrMagnitude>.0001f)info.rotation=Quaternion.LookRotation(direction);
        }
    }
    private void MoveCoopPet(CoopPet pet)
    {
        if(!pet.obj)return;
        if(Time.time>=pet.nextMove){pet.target=RandomInCoop(pet.coop);pet.nextMove=Time.time+Random.Range(8f,12f);}
        Vector3 to=pet.target-pet.obj.position;to.y=0;bool moving=to.magnitude>.2f;
        if(moving)
        {
            pet.obj.rotation=Quaternion.Slerp(pet.obj.rotation,Quaternion.LookRotation(to),Time.deltaTime*4);
            Vector3 next=Vector3.MoveTowards(pet.obj.position,new Vector3(pet.target.x,pet.obj.position.y,pet.target.z),2*Time.deltaTime);
            pet.obj.position=next;
        }
        if(pet.animator)SetAnimatorMovement(pet.animator,moving?1:0);
    }
    private void UpdateHome()
    {
        foreach(CoopPet pet in coopPets)
        {
            MoveCoopPet(pet);
            pet.incomeClock+=Time.deltaTime;
            if(pet.incomeClock>=1){pet.incomeClock-=1;AddMoney(pet.item.income);IncomePopup(pet.obj.position,pet.item.income);}
        }
        foreach(CoopPet pet in decorPets)MoveCoopPet(pet);
        for(int i=incubators.Count-1;i>=0;i--)UpdateIncubator(incubators[i]);
        for(int i=flying.Count-1;i>=0;i--)UpdateFlyingPet(flying[i]);
        if(incubateUI.root && incubateUI.root.activeSelf)RefreshIncubatePopup(false);
    }

    // ---- Incubation and hatching ----
    private void IncubateHand()
    {
        if(hand==null || hand.kind!=ItemKind.Egg || !InsideMyCoop)return;
        Item item=hand;RemoveItem(item);
        StartIncubation(item,player.position+player.forward,Quaternion.LookRotation(player.forward));
    }
    private void IncubateFromBag(Item item){RemoveItem(item);StartIncubation(item,RandomInCoop(MyHouse.Coop),Quaternion.identity);}
    private void StartIncubation(Item item,[Bridge.Ref] Vector3 point,[Bridge.Ref] Quaternion rotation)
    {
        Incubator incubator=new Incubator();incubator.item=item;
        GameObject obj=Instantiate(item.zone.eggPrefabs[item.variant],point,rotation);DisablePhysics(obj);
        RaycastHit hit;if(Physics.Raycast(point+Vector3.up*2,Vector3.down,out hit,6,~0,QueryTriggerInteraction.Ignore) && !hit.transform.IsChildOf(player))obj.transform.position=hit.point;
        incubator.obj=obj.transform;incubator.rotation=obj.transform.rotation;
        incubator.startScale=Vector3.one;incubator.endScale=Vector3.one*Mathf.Clamp(item.size/5,1,6);obj.transform.localScale=incubator.startScale;
        PlayableEggRules rule=ItemRule(item);
        incubator.duration=!TutorialCompleted?3:rule!=null?rule.incubationTime:incubationSeconds;
        if(incubateTimerPrefab)
        {
            GameObject timer=Instantiate(incubateTimerPrefab);
            foreach(Collider c in timer.GetComponentsInChildren<Collider>(true))c.enabled=false;
            incubator.timer=timer.transform;incubator.label=timer.GetComponentInChildren<TMPro.TMP_Text>(true);
        }
        incubators.Add(incubator);PlaySound(equipSound);
        if(LunaController.Instance)LunaController.Instance.EggIncubated();
        if(Step==TutorialStep.Incubate)SetStep(TutorialStep.Hatch);
    }
    private void UpdateIncubator(Incubator incubator)
    {
        if(!incubator.obj)return;
        if(incubator.opening)
        {
            if(incubator.timer){Destroy(incubator.timer.gameObject);incubator.timer=null;}
            incubator.openClock+=Time.deltaTime;
            float progress=Mathf.Clamp01(incubator.openClock/Mathf.Max(.1f,hatchDuration));
            incubator.obj.rotation=incubator.rotation*Quaternion.Euler(0,0,Mathf.Sin(progress*42)*Mathf.Lerp(4,22,progress));
            if(progress>=1)CompleteHatch(incubator);
            return;
        }
        if(!incubator.ready)
        {
            incubator.clock+=Time.deltaTime*IncubateTick;
            float ratio=Mathf.Clamp01(incubator.clock/incubator.duration);
            incubator.obj.localScale=Vector3.Lerp(incubator.startScale,incubator.endScale,ratio);
            if(ratio>=1)incubator.ready=true;
        }
        if(incubator.timer)
        {
            incubator.timer.position=new Vector3(incubator.obj.position.x,TopOf(incubator.obj)+.6f,incubator.obj.position.z);
            incubator.timer.rotation=gameCamera.transform.rotation;
            // Ready to hatch: the label above the egg reads "Open" until the egg is opened.
            if(incubator.label)incubator.label.text=incubator.ready?"Open":Clock(incubator.duration-incubator.clock);
        }
    }
    private void Hatch(Incubator incubator)
    {
        if(incubator==null || !incubator.ready || incubator.opening)return;
        incubator.opening=true;incubator.openClock=0;PlaySound(crackSound);
        if(LunaController.Instance)LunaController.Instance.EggHatched();
    }
    private int RollPet(PlayableEggRules rule,Zone zone,int variant)
    {
        if(rule!=null && rule.petIds!=null && rule.petIds.Length>0)return rule.petIds[PlayableEggRules.Pick(rule.petWeights,rule.petIds.Length)];
        GameObject prefab=rule!=null && rule.pets.Length>0?rule.pets[PlayableEggRules.Pick(rule.petWeights,rule.pets.Length)]:zone.petPrefabs.Length>0?zone.petPrefabs[variant%zone.petPrefabs.Length]:null;
        for(int i=0;i<petCatalog.Length;i++)if(petCatalog[i].prefab==prefab)return i;
        return petCatalog.Length>0?0:-1;
    }
    private void CompleteHatch(Incubator incubator)
    {
        incubators.Remove(incubator);
        Vector3 position=incubator.obj.position;
        if(eggBreakEffect)
        {
            GameObject effect=Instantiate(eggBreakEffect,position,Quaternion.identity);
            effect.transform.localScale=incubator.obj.localScale;effect.SetActive(true);
            foreach(ParticleSystem particles in effect.GetComponentsInChildren<ParticleSystem>(true))particles.Play();
            Destroy(effect,4);
        }
        PlaySound(hatchSound);
        Item egg=incubator.item;
        int pet=RollPet(ItemRule(egg),egg.zone,egg.variant);
        Destroy(incubator.obj.gameObject);if(incubator.timer)Destroy(incubator.timer.gameObject);
        if(pet<0)return;
        Item item=PetItem(pet,egg.size);RegisterIndex(pet);
        GameObject model=petCatalog[pet].prefab?Instantiate(petCatalog[pet].prefab,position,Quaternion.LookRotation(player.position-position==Vector3.zero?Vector3.forward:Vector3.ProjectOnPlane(player.position-position,Vector3.up))):null;
        if(model){DisablePhysics(model);model.transform.localScale*=egg.size;ShowPetInfo(model.transform,item);}
        FlyingPet fly=new FlyingPet();fly.item=item;fly.obj=model?model.transform:null;fly.from=position;fly.scale=model?model.transform.localScale:Vector3.one;
        flying.Add(fly);
        if(Step==TutorialStep.Hatch)SetStep(TutorialStep.Equip);
    }
    // Original SAE_MoveMonsterToInventoryHandler: show for 3 s, then arc into the player over 1 s.
    private void UpdateFlyingPet(FlyingPet fly)
    {
        fly.clock+=Time.deltaTime;
        float t=Mathf.Clamp01((fly.clock-3)/1);
        if(fly.obj && t>0)
        {
            Vector3 target=player.position+Vector3.up;
            Vector3 p=Vector3.Lerp(fly.from,target,t);p.y+=Mathf.Sin(t*Mathf.PI)*3;
            fly.obj.position=p;fly.obj.localScale=Vector3.Lerp(fly.scale,Vector3.zero,t);
        }
        if(t<1)return;
        flying.Remove(fly);
        if(fly.obj)Destroy(fly.obj.gameObject);
        AddItem(fly.item,true);
        if(!IsCarrying)EquipHand(fly.item);
    }
    private Incubator NearestIncubator(bool readyOnly)
    {
        Incubator best=null;float distance=2.5f;
        foreach(Incubator incubator in incubators)
        {
            if(!incubator.obj || incubator.opening || (readyOnly && !incubator.ready))continue;
            float d=FlatDistance(player.position,incubator.obj.position);if(d<distance){distance=d;best=incubator;}
        }
        return best;
    }

    // ---- Coop slots ----
    private bool EquipPetToCoop(Item item)
    {
        if(item==null || item.kind!=ItemKind.Pet)return false;
        if(coopPets.Count>=MaxSlots){ShowDialog("you do not have enough slots");return false;}
        RemoveItem(item);
        CoopPet pet=SpawnCoopPet(item,MyHouse.Coop,MyHouse.petContainer);
        if(pet!=null)coopPets.Add(pet);
        PlaySound(equipSound);RefreshPetsPopup();
        if(Step==TutorialStep.Equip)SetStep(TutorialStep.Train);
        if(TutorialCompleted && !endCardShown && capturesForEndCard>0 && coopPets.Count>=capturesForEndCard){endCardShown=true;}
        return true;
    }
    private void EquipHandPet(){if(hand!=null && hand.kind==ItemKind.Pet && InsideMyCoop)EquipPetToCoop(hand);}
    private void UnequipCoopPet(CoopPet pet)
    {
        coopPets.Remove(pet);if(pet.obj)Destroy(pet.obj.gameObject);
        AddItem(pet.item,true);RefreshPetsPopup();
    }
    private void EquipBest()
    {
        foreach(CoopPet pet in coopPets){if(pet.obj)Destroy(pet.obj.gameObject);items.Add(pet.item);}
        coopPets.Clear();
        List<Item> pets=new List<Item>();foreach(Item item in items)if(item.kind==ItemKind.Pet)pets.Add(item);
        pets.Sort((a,b)=>b.income.CompareTo(a.income));
        for(int i=0;i<pets.Count && i<MaxSlots;i++)
        {
            items.Remove(pets[i]);quick.Remove(pets[i]);if(hand==pets[i])UnequipHand();
            CoopPet pet=SpawnCoopPet(pets[i],MyHouse.Coop,MyHouse.petContainer);if(pet!=null)coopPets.Add(pet);
        }
        foreach(Item item in items)if(item.kind==ItemKind.Pet && !quick.Contains(item) && quick.Count<QuickSlotCount)quick.Add(item);
        PlaySound(equipSound);RefreshInventoryUI();RefreshPetsPopup();
    }

    // ---- Treadmill ----
    private bool NearTreadmill {get{return !training && FlatDistance(player.position,MyHouse.TrainSlot.position)<2.2f;}}
    private void BeginTraining()
    {
        Transform slot=MyHouse.TrainSlot;
        training=true;trainingClock=0;motor.enabled=false;player.position=slot.position;player.rotation=slot.rotation;motor.enabled=true;
        joystick.ResetInput();
        if(Step==TutorialStep.Train)SetStep(TutorialStep.Done);
    }
    private void UpdateTraining()
    {
        if(joystick.Value.sqrMagnitude>.05f || Input.GetAxisRaw("Horizontal")!=0 || Input.GetAxisRaw("Vertical")!=0){training=false;return;}
        playerForward=1;
        trainingClock+=Time.deltaTime;
        if(trainingClock<trainTick)return;
        trainingClock-=trainTick;
        double gain=treadmillTrainValues[Mathf.Clamp(MyHouse.treadmill-1,0,treadmillTrainValues.Length-1)]*BoostMultiplier(0);
        AddSpeedPower(gain);PlaySound(trainSound);
        FloatText(player.position+player.right*2+Vector3.up*2,"+"+Num(gain),speedIcon);
    }

    // ---- Upgrade pads and panels ----
    private void BindHomeUI()
    {
        Bind(treadmillUI.close,CloseModal,true);
        Bind(treadmillUI.upgrade,UpgradeTreadmill);
        Show(treadmillUI.root,false);
        Bind(petsUI.close,CloseModal,true);
        Bind(petsUI.equipBest,EquipBest);
        Bind(petsUI.upgradeSlot,UpgradeCoop);
        Bind(incubateUI.close,CloseModal,true);
        Bind(hudUI.equipMonster,()=>{if(!TutorialCompleted){ShowDialog("You must finish tutorial first");return;}OpenModal(petsUI.root);RefreshPetsPopup();});
        Bind(hudUI.incubateEgg,()=>{if(!TutorialCompleted){ShowDialog("You must finish tutorial first");return;}OpenModal(incubateUI.root);RefreshIncubatePopup(true);});
        Show(petsUI.root,false);Show(incubateUI.root,false);
    }
    private void UpgradeCoop()
    {
        if(coopLevel>=MaxCoopLevel)return;
        if(!SpendMoney(Price(coopPrices[coopLevel])))return;
        coopLevel++;ShowCoopModel(MyHouse,coopModelByLevel[Mathf.Min(coopLevel,coopModelByLevel.Length)-1]);
        BoxCollider coop=MyHouse.Coop;playerCoopArea=coop;foreach(CoopPet pet in coopPets){pet.coop=coop;pet.nextMove=0;}
        PlaySound(upgradeSound);RefreshPads();RefreshPetsPopup();
    }
    private void UpgradeTreadmill()
    {
        if(treadmillLevel>=MaxTreadmillLevel)return;
        if(!SpendMoney(Price(treadmillPrices[treadmillLevel])))return;
        treadmillLevel++;ShowTreadmill(MyHouse,treadmillLevel);trainingPoint=MyHouse.TrainSlot;
        PlaySound(upgradeSound);RefreshPads();
    }
    private void RefreshPads()
    {
        SetPad(MyHouse.coopPad,coopLevel,MaxCoopLevel,coopLevel<MaxCoopLevel?Price(coopPrices[coopLevel]):0);
        SetPad(MyHouse.treadmillPad,treadmillLevel,MaxTreadmillLevel,treadmillLevel<MaxTreadmillLevel?Price(treadmillPrices[treadmillLevel]):0);
        if(treadmillUI.root)
        {
            bool max=treadmillLevel>=MaxTreadmillLevel;
            SetText(treadmillUI.level,max?"":"Level "+treadmillLevel+" -> "+(treadmillLevel+1));
            SetText(treadmillUI.train,max?"":"Up to "+Num(treadmillTrainValues[Mathf.Min(treadmillLevel,treadmillTrainValues.Length-1)])+"/step");
            Show(treadmillUI.max,max);Show(treadmillUI.upgrade,!max);
            if(!max)SetText(treadmillUI.price,"$"+Num(Price(treadmillPrices[treadmillLevel])));
        }
    }
    private void SetPad(Transform pad,int level,int max,double price)
    {
        if(!pad)return;
        foreach(TMPro.TMP_Text label in pad.GetComponentsInChildren<TMPro.TMP_Text>(true))
        {
            if(label.name=="Text_Price"){label.text="$"+Num(price);label.gameObject.SetActive(level<max);}
            if(label.name=="Level")label.text=level<max?"Lv"+level+"->Lv"+(level+1):"MAXIMUM";
        }
    }
    private void RefreshPetsPopup()
    {
        if(!petsUI.root || !petsUI.root.activeSelf)return;
        foreach(GameObject row in petRows)Destroy(row);petRows.Clear();
        foreach(CoopPet pet in coopPets)
        {
            CoopPet captured=pet;
            PetRowView row=Instantiate(petsUI.template,petsUI.content,false);row.gameObject.SetActive(true);petRows.Add(row.gameObject);
            SetText(row.content,petCatalog[pet.item.pet].name+" - $"+Num(pet.item.income)+"/s");
            SetImage(row.thumbnail,petCatalog[pet.item.pet].thumbnail);
            Bind(row.unequip,()=>UnequipCoopPet(captured));
        }
        SetText(petsUI.slots,"Slot: "+coopPets.Count+"/"+MaxSlots);
        bool max=coopLevel>=MaxCoopLevel;Show(petsUI.upgradeSlot,!max);
        if(!max)
        {
            double price=Price(coopPrices[coopLevel]);
            SetText(petsUI.upgradePrice,"$"+Num(price));
            Show(petsUI.upgradeUnavailable,Money<price);
        }
    }
    private void RefreshIncubatePopup(bool rebuild)
    {
        if(rebuild || incubateRows.Count!=incubators.Count)
        {
            foreach(IncubateRowView row in incubateRows)Destroy(row.gameObject);incubateRows.Clear();
            foreach(Incubator incubator in incubators)
            {
                Incubator captured=incubator;
                IncubateRowView row=Instantiate(incubateUI.template,incubateUI.content,false);row.gameObject.SetActive(true);incubateRows.Add(row);
                SetImage(row.thumbnail,ItemIcon(incubator.item));
                Bind(row.open,()=>{Hatch(captured);RefreshIncubatePopup(true);});
            }
        }
        for(int i=0;i<incubateRows.Count && i<incubators.Count;i++)
        {
            IncubateRowView row=incubateRows[i];Incubator incubator=incubators[i];
            if(row.progressFill)row.progressFill.fillAmount=Mathf.Clamp01(incubator.clock/incubator.duration);
            SetText(row.content,incubator.ready?"":Clock(incubator.duration-incubator.clock));
            Show(row.open,incubator.ready && !incubator.opening);Show(row.opening,incubator.opening);
        }
    }
    private bool AnyIncubatorReady {get{foreach(Incubator incubator in incubators)if(incubator.ready && !incubator.opening)return true;return false;}}
}
