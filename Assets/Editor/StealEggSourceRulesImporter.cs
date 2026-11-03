using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

public static class StealEggSourceRulesImporter
{
    const string Source="F:/GAME/StealEgg/steal-an-egg-main/";
    const string Root="Assets/MiniGames/StealAnEgg/";
    static readonly Dictionary<string,string> paths=new Dictionary<string,string>();
    static readonly Dictionary<string,string> texts=new Dictionary<string,string>();
    static float Number(string value){return float.Parse(value,CultureInfo.InvariantCulture);}
    public static string Text(string path){if(!texts.ContainsKey(path))texts[path]=File.ReadAllText(Source+path);return texts[path];}
    public static string Resolve(string guid){string path;if(!paths.TryGetValue(guid,out path))throw new Exception("Missing source GUID "+guid);return path;}
    public static T Load<T>(string path) where T:UnityEngine.Object{return path==null?null:AssetDatabase.LoadAssetAtPath<T>(path);}
    static string Parent(string path)
    {
        Match m=Regex.Match(Text(path),@"m_SourcePrefab:.*?guid: ([a-f0-9]{32})");
        return m.Success?Resolve(m.Groups[1].Value):null;
    }
    public static string Value(string path,string field,string fallback=null,int depth=0)
    {
        if(path==null || depth>8)return fallback;
        string key=Regex.Escape(field),yaml=Text(path);
        Match m=Regex.Match(yaml,@"propertyPath: "+key+@"\r?\n\s+value: ([^\r\n]*)");
        if(m.Success)return m.Groups[1].Value;
        m=Regex.Match(yaml,@"(?m)^\s+"+key+@": ([^\r\n]+)");
        return m.Success?m.Groups[1].Value:Value(Parent(path),field,fallback,depth+1);
    }
    public static string Reference(string path,string field,int depth=0)
    {
        if(path==null || depth>8)return null;
        string key=Regex.Escape(field),yaml=Text(path);
        Match m=Regex.Match(yaml,@"propertyPath: "+key+@"\r?\n[^\r\n]*\r?\n\s+objectReference:.*?guid: ([a-f0-9]{32})");
        if(!m.Success)m=Regex.Match(yaml,@"(?m)^\s+"+key+@":.*?guid: ([a-f0-9]{32})");
        return m.Success?Resolve(m.Groups[1].Value):Reference(Parent(path),field,depth+1);
    }
    [MenuItem("Steal Egg/Apply original gameplay rules")]
    public static void ApplyToScene()
    {
        if(EditorApplication.isPlaying)throw new Exception("Stop Play mode first.");
        Apply(UnityEngine.Object.FindFirstObjectByType<StealEggGame>());
        EditorSceneManager.SaveScene(UnityEngine.SceneManagement.SceneManager.GetActiveScene());
    }
    public static void IndexSource()
    {
        if(paths.Count>0)return;
        foreach(string file in Directory.GetFiles(Source+"Assets","*.meta",SearchOption.AllDirectories))
        {
            Match m=Regex.Match(File.ReadAllText(file),@"(?m)^guid: ([a-f0-9]{32})");
            if(m.Success)paths[m.Groups[1].Value]=file.Substring(Source.Length).Replace('\\','/').Replace(".meta","");
        }
    }
    public static void Apply(StealEggGame game)
    {
        if(!game)throw new Exception("Playable controller missing.");
        paths.Clear();texts.Clear();IndexSource();
        var catalog=new List<StealEggGame.PetInfo>();
        string config=Text(Root+"Data/SAE_GameConfigSO.asset");
        game.baseMoveSpeed=Number(Regex.Match(config,@"moveSpeedBase:\s+remoteKey:[^\r\n]+\s+defaultValue: ([\d.]+)").Groups[1].Value);
        game.speedPowerMultiplier=Number(Regex.Match(config,@"powerMoveSpeedMultiplier:\s+remoteKey:[^\r\n]+\s+defaultValue: ([\d.]+)").Groups[1].Value);
        CameraController cameraController=CameraController.ConfigureFor(game);
        var cameraSettings=new SerializedObject(cameraController);
        cameraSettings.FindProperty("initialVerticalAngle").floatValue=5.4f;
        cameraSettings.FindProperty("initialHorizontalAngle").floatValue=3.3f;
        cameraSettings.ApplyModifiedPropertiesWithoutUndo();
        game.moveSpeed=game.baseMoveSpeed;cameraController.distance=9;game.gameCamera.fieldOfView=45;
        CameraController.ConfigureFor(game);
        game.trainingPowerPerTick=Number(Value(Root+"Prefabs/SAE_Treadmil.prefab","trainValueBase"));
        game.incubationSeconds=3;game.startingMoney=100;
        game.moneyIcon=AssetDatabase.LoadAssetAtPath<Sprite>(Reference(Root+"Data/Items/[SAE_ItemConsume] Money.asset","thumbnail"));
        game.speedIcon=AssetDatabase.LoadAssetAtPath<Sprite>(Reference(Root+"Data/Items/[SAE_Item] Speed Power.asset","thumbnail"));
        string[] zones={"Forest","Lake","Desert","Jungle","Snow","Volcano","AbyssOcean","Prehistoric","Cosmic","CherryBlossom","Titan Temple"};
        // Index zone pictures, listed in zone order in the original SAE_MonsterIndexDatabase.
        var eggOf=new Dictionary<PlayableEggRules,GameObject>();
        MatchCollection zoneThumbnails=Regex.Matches(Text(Root+"Data/SAE_MonsterIndexDatabase.asset"),@"- zoneName: \d+\s+thumbnail: \{fileID: \d+, guid: ([a-f0-9]{32})");
        for(int i=0;i<game.zones.Length;i++)
        {
            StealEggGame.Zone zone=game.zones[i];
            if(i<zoneThumbnails.Count)zone.thumbnail=Load<Sprite>(Resolve(zoneThumbnails[i].Groups[1].Value));
            zone.guardianSpeed=game.baseMoveSpeed+Number(Value(Root+"Data/Zones/[ZoneDataSO] "+zones[i]+".asset","protectMonsterSpeed"));
            zone.attackDistance=Number(Value(Root+"Prefabs/ProtectEggMonster.prefab","attackDistance"));
            string guardianPath=Root+"Prefabs/ProtectMonster/"+zone.guardian.name+(zone.guardian.name.EndsWith("Variant")?"":" Variant")+".prefab";
            if(File.Exists(Source+guardianPath))zone.attackDistance=Number(Value(guardianPath,"attackDistance",zone.attackDistance.ToString(CultureInfo.InvariantCulture)));
            string database=Text(Root+"Data/ZoneEgg/[EggZoneDatabase] "+(i==9?"CheeyBlossom":zones[i])+".asset");
            var rules=new List<PlayableEggRules>();
            foreach(Match entry in Regex.Matches(database,@"egg:.*?guid: ([a-f0-9]{32}).*?\r?\n\s+rate: ([\d.]+)"))
            {
                string path=Resolve(entry.Groups[1].Value);var rule=new PlayableEggRules();
                eggOf[rule]=AssetDatabase.LoadAssetAtPath<GameObject>(path);
                if(!eggOf[rule])throw new Exception("Egg not imported: "+path);
                rule.name=Value(path,"eggName");rule.spawnWeight=Number(entry.Groups[2].Value);
                rule.thumbnail=Load<Sprite>(Reference(path,"thumbnail"));
                rule.incubationTime=Number(Value(path,"incubateTimeBase"));
                string size=Reference(path,"sizeData");
                MatchCollection ranges=Regex.Matches(Text(size),@"sizeRange: \{x: ([\d.]+), y: ([\d.]+)\}\s+rate: ([\d.]+)");
                rule.sizeRanges=ranges.Cast<Match>().Select(m=>new Vector2(Number(m.Groups[1].Value),Number(m.Groups[2].Value))).ToArray();
                rule.sizeWeights=ranges.Cast<Match>().Select(m=>Number(m.Groups[3].Value)).ToArray();
                var pets=new List<GameObject>();var rates=new List<float>();var incomes=new List<float>();var ids=new List<int>();
                int count=(int)Number(Value(path,"monsters.Array.size","1"));
                for(int p=0;p<count;p++)
                {
                    string petPath=Reference(path,"monsters.Array.data["+p+"].obj");
                    if(petPath==null)throw new Exception("Pet reference missing: "+path);
                    GameObject pet=AssetDatabase.LoadAssetAtPath<GameObject>(petPath);
                    if(!pet)throw new Exception("Pet not imported: "+petPath);
                    pets.Add(pet);rates.Add(Number(Value(path,"monsters.Array.data["+p+"].rate","1")));
                    incomes.Add(Number(Value(petPath,"baseStats.income",Value(petPath,"income","1"))));
                    int id=catalog.FindIndex(c=>c.prefab==pet);
                    if(id<0)
                    {
                        var info=new StealEggGame.PetInfo();info.prefab=pet;info.zone=i;info.income=incomes[incomes.Count-1];
                        info.name=Value(petPath,"displayment.name",pet.name.Replace(" Variant",""));
                        info.thumbnail=Load<Sprite>(Reference(petPath,"displayment.thumbnail"));
                        string rarity=Reference(petPath,"rarityPreset");
                        info.rarity=rarity!=null?(int)Number(Regex.Match(Text(rarity),@"rarityType: (\d+)").Groups[1].Value):0;
                        catalog.Add(info);id=catalog.Count-1;
                    }
                    ids.Add(id);
                }
                rule.pets=pets.ToArray();rule.petWeights=rates.ToArray();rule.petIncome=incomes.ToArray();rule.petIds=ids.ToArray();rules.Add(rule);
            }
            zone.eggRules=rules.ToArray();
        }
        LimitPets(game,catalog,eggOf);
        StealEggRagdollSetup.Configure(game);
        EditorUtility.SetDirty(game);
        Debug.Log("Original rules applied: "+game.zones.Length+" zone speeds, weighted eggs, size tables, hatch times, pet rewards, speed power, training and camera.");
    }

    // Playable size budget: zone 1 keeps its 2 lightest pets, every other zone its lightest one. Eggs that hatch
    // only dropped pets go too, and the catalog is rebuilt so pet ids stay dense.
    static readonly int[] PetsPerZone={2,1,1};
    static void LimitPets(StealEggGame game,List<StealEggGame.PetInfo> catalog,Dictionary<PlayableEggRules,GameObject> eggOf)
    {
        // A pet's weight is the size of the files it pulls in that not every pet already shares (base prefab, fonts).
        var files=catalog.ToDictionary(c=>c,c=>new HashSet<string>(EditorUtility.CollectDependencies(new UnityEngine.Object[]{c.prefab})
            .Select(AssetDatabase.GetAssetPath).Where(p=>p.StartsWith("Assets/") && !p.EndsWith(".cs") && !p.EndsWith(".shader"))));
        var shared=new HashSet<string>(files.Values.First());foreach(var set in files.Values)shared.IntersectWith(set);
        Func<StealEggGame.PetInfo,long> weight=c=>files[c].Where(p=>!shared.Contains(p)).Sum(p=>new FileInfo(p).Length);
        var kept=new List<StealEggGame.PetInfo>();
        for(int z=0;z<game.zones.Length;z++)
            kept.AddRange(catalog.Where(c=>c.zone==z).OrderBy(weight).Take(z<PetsPerZone.Length?PetsPerZone[z]:1));
        kept=catalog.Where(kept.Contains).ToList();
        foreach(StealEggGame.Zone zone in game.zones)
        {
            var rules=new List<PlayableEggRules>();
            foreach(PlayableEggRules rule in zone.eggRules)
            {
                int[] keep=Enumerable.Range(0,rule.pets.Length).Where(p=>kept.Any(c=>c.prefab==rule.pets[p])).ToArray();
                if(keep.Length==0)continue;
                rule.pets=keep.Select(p=>rule.pets[p]).ToArray();rule.petWeights=keep.Select(p=>rule.petWeights[p]).ToArray();
                rule.petIncome=keep.Select(p=>rule.petIncome[p]).ToArray();
                rule.petIds=rule.pets.Select(p=>kept.FindIndex(c=>c.prefab==p)).ToArray();
                rules.Add(rule);
            }
            if(rules.Count==0)throw new Exception("No pets left in "+zone.name);
            zone.eggRules=rules.ToArray();zone.eggPrefabs=rules.Select(r=>eggOf[r]).ToArray();
            zone.petPrefabs=rules.SelectMany(r=>r.pets).Distinct().ToArray();
        }
        game.petCatalog=kept.ToArray();
        Debug.Log("Pets limited to "+kept.Count+": "+string.Join(", ",kept.Select(c=>"zone "+(c.zone+1)+" "+c.name+" "+weight(c)/1024+"KB")));
    }
}
