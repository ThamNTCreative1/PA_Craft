using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

// Day/night, boosts, Lucky Egg and Monster Index. Fuse, Exchange shop, Lucky Frog, Trail shop and Settings
// are left to the full game: their station only opens the PLAY NOW popup.
public partial class StealEggGame
{
    private bool night;
    private float phaseClock;
    private class ActiveBoost { public BoostInfo info; public float left; public IconAmountView view; }
    private readonly List<ActiveBoost> boosts=new List<ActiveBoost>();
    private class LuckyEgg { public Transform obj; public Vector3 from, to; public float clock, openClock; public bool landed, opening; public Quaternion rotation; }
    private readonly List<LuckyEgg> luckyEggs=new List<LuckyEgg>();
    private float frogPunch=-1, eggSpawnAt=-1;
    private Vector3 frogScale;
    private readonly List<GameObject> indexRows=new List<GameObject>();
    private readonly HashSet<int> collected=new HashSet<int>(), claimed=new HashSet<int>();
    private int indexSelection=-1;

    private float BoostMultiplier(int type)
    {
        float sum=0;bool any=false;
        foreach(ActiveBoost boost in boosts)if(boost.info.type==type){sum+=boost.info.value;any=true;}
        return any?Mathf.Clamp(sum,1,9999):1;
    }
    private void StartWorld()
    {
        if(sun)sun.intensity=dayLightIntensity;
        if(nightGraphic)nightGraphic.SetActive(false);
        if(luckyFrog)frogScale=luckyFrog.localScale;
    }
    private void UpdateWorld()
    {
        UpdateDayNight();UpdateBoosts();UpdateLuckyEggs();UpdateFrog();
    }

    // ---- Day / night (SAE_DayCircleSystem) ----
    private float PhaseLeft {get{return (night?nightDuration:dayDuration)-phaseClock;}}
    private void UpdateDayNight()
    {
        if(!TutorialCompleted)return;
        phaseClock+=Time.deltaTime;
        float left=PhaseLeft;
        if(sun)
        {
            float t=Mathf.Clamp01(left/Mathf.Max(.01f,lightTransition));
            sun.intensity=night?(left<lightTransition?Mathf.Lerp(dayLightIntensity,0,t):0):(left<lightTransition?Mathf.Lerp(0,dayLightIntensity,t):dayLightIntensity);
        }
        if(night && nightText)nightText.text=Mathf.CeilToInt(left)+"s";
        if(left>0)return;
        night=!night;phaseClock=0;
        if(night){SendEveryoneToLobby();ResetZoneEggs();}
        if(nightGraphic)nightGraphic.SetActive(night);
    }

    // ---- Boosts (SAE_BoostManager) ----
    private void AddBoost(BoostInfo info)
    {
        foreach(ActiveBoost active in boosts)if(active.info==info){active.left+=info.duration;return;}
        ActiveBoost boost=new ActiveBoost();boost.info=info;boost.left=info.duration;
        if(hudUI.boostTemplate)
        {
            boost.view=Instantiate(hudUI.boostTemplate,hudUI.boostContainer,false);boost.view.gameObject.SetActive(true);
            SetImage(boost.view.icon,info.icon);
        }
        boosts.Add(boost);
    }
    private void UpdateBoosts()
    {
        for(int i=boosts.Count-1;i>=0;i--)
        {
            ActiveBoost boost=boosts[i];boost.left-=Time.deltaTime;
            if(boost.left<=0){if(boost.view)Destroy(boost.view.gameObject);boosts.RemoveAt(i);continue;}
            if(boost.view)
            {
                int s=Mathf.CeilToInt(boost.left);
                SetText(boost.view.amount,s>=3600?s/3600+"h":s>=60?s/60+"mins":s.ToString("00")+"s");
            }
        }
    }

    // ---- Lucky Frog and Lucky Egg ----
    private void UpdateFrog()
    {
        if(luckyFrog && frogPunch>0)
        {
            float t=(Time.time-frogPunch)/.25f;
            if(t>=0)luckyFrog.localScale=frogScale*(1+.25f*Mathf.Sin(Mathf.Clamp01(t)*Mathf.PI));
            if(t>=1){luckyFrog.localScale=frogScale;frogPunch=-1;}
        }
        if(eggSpawnAt>0 && Time.time>=eggSpawnAt)
        {
            eggSpawnAt=-1;PlaySound(deliverSound);
            if(luckyEggPrefab)
            {
                GameObject obj=Instantiate(luckyEggPrefab);DisablePhysics(obj);
                LuckyEgg egg=new LuckyEgg();egg.obj=obj.transform;
                egg.from=luckyEggSpawn?luckyEggSpawn.position:luckyFrog.position;egg.to=luckyEggTarget?luckyEggTarget.position:egg.from+Vector3.back*3;
                obj.transform.position=egg.from;egg.rotation=obj.transform.rotation;luckyEggs.Add(egg);
            }
        }
    }
    private void UpdateLuckyEggs()
    {
        for(int i=luckyEggs.Count-1;i>=0;i--)
        {
            LuckyEgg egg=luckyEggs[i];if(!egg.obj){luckyEggs.RemoveAt(i);continue;}
            if(!egg.landed)
            {
                egg.clock+=Time.deltaTime;float t=Mathf.Clamp01(egg.clock);
                Vector3 p=Vector3.Lerp(egg.from,egg.to,t);p.y+=Mathf.Sin(t*Mathf.PI)*3;egg.obj.position=p;
                if(t>=1){egg.landed=true;egg.rotation=egg.obj.rotation;}
                continue;
            }
            if(!egg.opening)continue;
            egg.openClock+=Time.deltaTime;
            float progress=egg.openClock/Mathf.Max(.1f,luckyEggOpenDuration);
            egg.obj.rotation=egg.rotation*Quaternion.Euler(0,0,Mathf.Sin(egg.openClock*25)*.26f*30);
            if(progress<1)continue;
            luckyEggs.RemoveAt(i);Destroy(egg.obj.gameObject);
            if(luckyEggRewards==null || luckyEggRewards.Length==0)continue;
            float[] weights=new float[luckyEggRewards.Length];for(int w=0;w<weights.Length;w++)weights[w]=luckyEggRewards[w].weight;
            BoostInfo reward=luckyEggRewards[PlayableEggRules.Pick(weights,weights.Length)];
            AddBoost(reward);ShowReward("Lucky Egg Reward",new[]{reward.icon},new[]{"1"});
        }
    }
    private LuckyEgg NearestLuckyEgg()
    {
        foreach(LuckyEgg egg in luckyEggs)if(egg.landed && !egg.opening && egg.obj && FlatDistance(player.position,egg.obj.position)<2.5f)return egg;
        return null;
    }
    private void OpenLuckyEgg(LuckyEgg egg){if(egg==null || egg.opening)return;egg.opening=true;egg.openClock=0;PlaySound(crackSound);}

    // ---- Trail shop (left to the full game) ----
    private void OpenTrailShop()
    {
        if(!TutorialCompleted){ShowDialog("You must finish tutorial first");return;}
        OpenModal(trailUI.root);
    }

    // ---- Monster Index ----
    private void RegisterIndex(int pet){if(pet>=0)collected.Add(pet);}
    private double IndexMoney(int pet){return 110*petCatalog[pet].income;}
    private double IndexSpeed(int pet){return 25*Mathf.Clamp(petCatalog[pet].income*.001f,1,10000);}
    private bool IndexClaimable {get{foreach(int pet in collected)if(!claimed.Contains(pet))return true;return false;}}
    private void BindIndexUI()
    {
        Bind(indexUI.close,CloseModal,true);
        Bind(indexUI.claim,ClaimIndexReward);
        Show(indexUI.root,false);
    }
    private void OpenIndex()
    {
        if(!TutorialCompleted){ShowDialog("You must finish tutorial first");return;}
        indexSelection=-1;OpenModal(indexUI.root);RefreshIndex();
    }
    private readonly List<GameObject> indexRewardRows=new List<GameObject>();
    private void RefreshIndex()
    {
        IndexUI ui=indexUI;
        foreach(GameObject row in indexRows)Destroy(row);indexRows.Clear();
        int total=0;
        for(int z=0;z<zones.Length;z++)
        {
            IndexZoneView view=Instantiate(ui.zoneTemplate,ui.zones,false);view.gameObject.SetActive(true);indexRows.Add(view.gameObject);
            SetText(view.zoneName,zones[z].name);SetImage(view.thumbnail,zones[z].thumbnail);
            int count=0,found=0;
            for(int p=0;p<petCatalog.Length;p++)
            {
                if(petCatalog[p].zone!=z)continue;
                count++;bool have=collected.Contains(p);if(have)found++;int pet=p;
                IndexPetCellView cell=Instantiate(view.petTemplate,view.petContent,false);cell.gameObject.SetActive(true);
                if(cell.frame && rarityFrames!=null && petCatalog[p].rarity<rarityFrames.Length)SetImage(cell.frame,rarityFrames[petCatalog[p].rarity]);
                SetImage(cell.thumbnail,petCatalog[p].thumbnail);if(cell.thumbnail)cell.thumbnail.color=have?Color.white:Color.black;
                SetText(cell.petName,petCatalog[p].name);Show(cell.petName,have);
                Show(cell.selected,p==indexSelection);Show(cell.mark,have && !claimed.Contains(p));
                Bind(cell.button,()=>{indexSelection=pet;RefreshIndex();});
            }
            total+=count;
            if(view.progressFill)view.progressFill.fillAmount=count>0?(float)found/count:0;
            SetText(view.progress,found+"/"+count);
        }
        // The full-game placeholder stays after the zone rows created above.
        if(ui.lockedZone){ui.lockedZone.SetAsLastSibling();ui.lockedZone.gameObject.SetActive(true);}
        if(ui.progressFill)ui.progressFill.fillAmount=total>0?(float)collected.Count/total:0;
        SetText(ui.progress,collected.Count+"/"+total);
        bool selected=indexSelection>=0,known=selected && collected.Contains(indexSelection);
        Show(ui.information,selected);Show(ui.rewardFrame,selected);
        if(!selected)return;
        PetInfo data=petCatalog[indexSelection];
        SetImage(ui.infoImage,data.thumbnail);if(ui.infoImage)ui.infoImage.color=known?Color.white:Color.black;
        SetText(ui.infoName,known?data.name:"???");SetText(ui.infoIncome,known?"$"+Num(data.income)+"/s":"???");SetRarityText(ui.infoRarity,data.rarity);
        Show(ui.claim,known && !claimed.Contains(indexSelection));Show(ui.claimed,claimed.Contains(indexSelection));
        foreach(GameObject row in indexRewardRows)Destroy(row);indexRewardRows.Clear();
        if(ui.rewardTemplate)
        {
            AddIndexReward(moneyIcon,"+"+Num(IndexMoney(indexSelection)));
            AddIndexReward(speedIcon,"+"+Num(IndexSpeed(indexSelection)));
        }
    }
    private void AddIndexReward(Sprite icon,string amount)
    {
        IconAmountView row=Instantiate(indexUI.rewardTemplate,indexUI.rewardContent,false);row.gameObject.SetActive(true);indexRewardRows.Add(row.gameObject);
        SetImage(row.icon,icon);SetText(row.amount,amount);
    }
    private void ClaimIndexReward()
    {
        if(indexSelection<0 || !collected.Contains(indexSelection) || claimed.Contains(indexSelection))return;
        claimed.Add(indexSelection);
        double money=IndexMoney(indexSelection),speed=IndexSpeed(indexSelection);
        AddMoney(money);AddSpeedPower(speed);
        ShowReward("You was claimed rewards!",new[]{moneyIcon,speedIcon},new[]{Num(money),Num(speed)});
        RefreshIndex();
    }
}
