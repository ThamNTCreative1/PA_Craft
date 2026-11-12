using System;
using System.Linq;
using System.Reflection;
using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using Object = UnityEngine.Object;

public static class InfernoArtSetup
{
    const BindingFlags Flags = BindingFlags.Static | BindingFlags.NonPublic;
    const string Output = StealHatchSceneSetup.Output;
    const string Models = "Assets/_Playable_/3D Model/Animal/Steal an egg/Monsters/";
    static object Invoke(string method, params object[] args) => typeof(StealHatchSceneSetup).GetMethod(method, Flags).Invoke(null, args);
    static T Get<T>(Object obj, string field) => (T)obj.GetType().GetField(field, BindingFlags.Instance | BindingFlags.NonPublic).GetValue(obj);
    static void Set(Object obj, string field, object value) {
        obj.GetType().GetField(field, BindingFlags.Instance | BindingFlags.NonPublic).SetValue(obj, value);
        EditorUtility.SetDirty(obj); PrefabUtility.RecordPrefabInstancePropertyModifications(obj);
    }
    static float Height(GameObject obj) {
        var rs = obj.GetComponentsInChildren<Renderer>(true).Where(r => !(r is ParticleSystemRenderer)).ToArray();
        var b = rs[0].bounds; foreach(var r in rs) b.Encapsulate(r.bounds); return b.size.y;
    }
    [MenuItem("Tools/Playable/Steal and Hatch/Apply Inferno Creatures and Eggs")]
    public static void Apply() {
        var scene = EditorSceneManager.GetActiveScene();
        if(EditorApplication.isPlaying || scene.path != "Assets/_Playable_/Scenes/Gameplay.unity") throw new Exception("Open Gameplay in Edit mode.");
        System.IO.Directory.CreateDirectory("Temp/StealHatch");
        EditorSceneManager.SaveScene(scene,"Temp/StealHatch/Before-Inferno.unity",true);
        var flow = Object.FindFirstObjectByType<StealHatchController>();
        var raising = Object.FindFirstObjectByType<EggRaisingController>();
        var guard = Get<Monster>(flow,"_guard");
        var old = guard.GetComponentInChildren<Animator>(true);
        float height = Height(old.gameObject);
        var template = (GameObject)Invoke("Creature", "Cerberus Guard", Models+"Cerberus.fbx", height, true);
        if(PrefabUtility.IsPartOfPrefabInstance(guard)) PrefabUtility.UnpackPrefabInstance(guard.gameObject, PrefabUnpackMode.Completely, InteractionMode.AutomatedAction);
        var grounding = guard.GetComponent<CreatureGrounding>(); if(grounding != null) Object.DestroyImmediate(grounding);
        Object.DestroyImmediate(old.gameObject);
        var visual = Object.Instantiate(template.transform.Find("Visual").gameObject, guard.transform, false);
        visual.name="Visual"; Set(guard,"_animator",visual.GetComponent<Animator>());
        DinosaurGroundingSetup.Bake(guard.gameObject);
        Set(guard,"_sleepState","Idle"); Set(guard,"_sleepHeightOffset",0f);
        guard.name="Cerberus Guard";
        var previous = Get<PenWanderer[]>(raising,"_hatchlings")[0];
        var hatch = (GameObject)Invoke("Creature","LavaDragon Hatchling",Models+"LavaDragon.fbx",Height(previous.gameObject),false);
        Set(raising,"_hatchlings",new[]{hatch.GetComponent<PenWanderer>()});
        string[] names={"Inferno Coil Egg","Graphite Armor Egg","Crimson Horn Egg","Sunflare Egg"};
        var eggs = Get<Egg[]>(flow,"_eggs");
        for(int i=0;i<eggs.Length;i++) {
            var prefab=(GameObject)Invoke("EggPrefab",names[i%names.Length]);
            var n=(GameObject)PrefabUtility.InstantiatePrefab(prefab);
            n.transform.SetParent(eggs[i].transform.parent,false); n.transform.SetPositionAndRotation(eggs[i].transform.position,eggs[i].transform.rotation);
            foreach(var f in new[]{"_stealRadius","_triggerCenter"}) Set(n.GetComponent<Egg>(),f,Get<object>(eggs[i],f));
            Object.DestroyImmediate(eggs[i].gameObject); eggs[i]=n.GetComponent<Egg>();
        }
        Set(flow,"_eggs",eggs);
        AssetDatabase.SaveAssets(); EditorSceneManager.MarkSceneDirty(scene); EditorSceneManager.SaveScene(scene);
        Debug.Log("Inferno art applied: Cerberus matched guard height; LavaDragon and four supplied eggs, with Idle/Walk/Run controllers.");
    }
}
