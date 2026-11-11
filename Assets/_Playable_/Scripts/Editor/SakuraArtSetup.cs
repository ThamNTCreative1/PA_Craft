using System;
using System.Linq;
using System.Reflection;
using UnityEngine;
using UnityEditor;
using UnityEditor.Animations;
using UnityEditor.SceneManagement;
using Playable;
using Object = UnityEngine.Object;

public static class SakuraArtSetup
{
    const string Output = StealHatchSceneSetup.Output;
    const string Models = "Assets/_Playable_/3D Model/Animal/Steal an egg/Monsters/CherryBlossom/";
    const BindingFlags Private = BindingFlags.Static | BindingFlags.NonPublic;
    static object Invoke(string name, params object[] args) => typeof(StealHatchSceneSetup).GetMethod(name, Private).Invoke(null, args);
    static void Set(Object target, string field, Object value) { var s = new SerializedObject(target); s.FindProperty(field).objectReferenceValue = value; s.ApplyModifiedPropertiesWithoutUndo(); }
    static Bounds Bounds(GameObject go) { var rs = go.GetComponentsInChildren<Renderer>(true).Where(r => !(r is ParticleSystemRenderer)).ToArray(); var b = rs[0].bounds; foreach(var r in rs) b.Encapsulate(r.bounds); return b; }
    static void ReplaceVisual(GameObject root, string modelPath, bool pink)
    {
        var old = root.GetComponentInChildren<Animator>(true);
        float height = Bounds(old.gameObject).size.y;
        var controller = old.runtimeAnimatorController;
        var grounding = root.GetComponent<CreatureGrounding>();
        if (grounding != null) Object.DestroyImmediate(grounding);
        Object.DestroyImmediate(old.gameObject);
        var model = Object.Instantiate(AssetDatabase.LoadAssetAtPath<GameObject>(modelPath), root.transform);
        model.name = "Visual"; model.transform.localPosition = Vector3.zero; model.transform.localRotation = Quaternion.identity;
        var b = Bounds(model); model.transform.localScale *= height / b.size.y;
        b = Bounds(model); model.transform.position -= new Vector3(b.center.x-root.transform.position.x, b.min.y-root.transform.position.y, b.center.z-root.transform.position.z);
        foreach(var r in model.GetComponentsInChildren<Renderer>(true)) r.sharedMaterials = r.sharedMaterials.Select(m => {
            var mat = (Material)Invoke("CompatibleMaterial", m);
            if (!pink) return mat;
            string path = Output + "/Materials/Kitsune White Pink " + mat.name + ".mat";
            var copy = AssetDatabase.LoadAssetAtPath<Material>(path);
            if(copy == null) { copy = new Material(mat); AssetDatabase.CreateAsset(copy,path); }
            copy.color = mat.name.Contains("Light") ? new Color(1f,.60f,.78f,1) : new Color(1f,.94f,.97f,1); copy.mainTexture = null; EditorUtility.SetDirty(copy); return copy;
        }).ToArray();
        var animator = model.GetComponent<Animator>(); if(animator == null) animator = model.AddComponent<Animator>();
        var over = new AnimatorOverrideController(controller);
        var pairs = new System.Collections.Generic.List<System.Collections.Generic.KeyValuePair<AnimationClip,AnimationClip>>();
        over.GetOverrides(pairs);
        for(int i=0;i<pairs.Count;i++) {
            string clipName = pairs[i].Key.name.ToLowerInvariant().Contains("idle") ? "idle" : "walk";
            var clip = (AnimationClip)Invoke("LoopClip",modelPath,clipName,(pink?"Kitsune":"Oni Tiger")+"_"+clipName);
            pairs[i] = new System.Collections.Generic.KeyValuePair<AnimationClip,AnimationClip>(pairs[i].Key,clip);
        }
        over.ApplyOverrides(pairs);
        string controllerPath=Output+"/"+(pink?"Kitsune":"Oni Tiger")+".overrideController";
        var existing=AssetDatabase.LoadAssetAtPath<AnimatorOverrideController>(controllerPath);
        if(existing==null) AssetDatabase.CreateAsset(over,controllerPath); else { EditorUtility.CopySerialized(over,existing); Object.DestroyImmediate(over); over=existing; }
        animator.runtimeAnimatorController=over; animator.applyRootMotion=false; animator.cullingMode=AnimatorCullingMode.AlwaysAnimate;
        Set(root.GetComponent<Monster>() != null ? (Object)root.GetComponent<Monster>() : root.GetComponent<PenWanderer>(),"_animator",animator);
    }
    [MenuItem("Tools/Playable/Steal and Hatch/Apply Sakura Art")]
    public static void Apply()
    {
        if(GameObject.Find("Guarded Nests - Sakura") != null) throw new Exception("Sakura art is already applied.");
        var scene=EditorSceneManager.GetActiveScene();
        if(EditorApplication.isPlaying || scene.path!="Assets/_Playable_/Scenes/Gameplay.unity") throw new Exception("Open Gameplay in Edit mode.");
        System.IO.Directory.CreateDirectory("Temp/StealHatch");
        EditorSceneManager.SaveScene(scene,"Temp/StealHatch/Before-Sakura-Art.unity",true);
        var flow=Object.FindFirstObjectByType<StealHatchController>();
        var raising=Object.FindFirstObjectByType<EggRaisingController>();
        var fs=new SerializedObject(flow);
        var guard=(Monster)fs.FindProperty("_guard").objectReferenceValue;
        if(PrefabUtility.IsPartOfPrefabInstance(guard)) PrefabUtility.UnpackPrefabInstance(guard.gameObject,PrefabUnpackMode.Completely,InteractionMode.AutomatedAction);
        ReplaceVisual(guard.gameObject,Models+"oni tiger.fbx",false); guard.name="Oni Tiger Guard";
        var rs=new SerializedObject(raising);
        var hatch=(PenWanderer)rs.FindProperty("_hatchlings").GetArrayElementAtIndex(0).objectReferenceValue;
        var h=Object.Instantiate(hatch.gameObject); h.name="Kitsune Hatchling";
        ReplaceVisual(h,Models+"kitsine.fbx",true);
        var hp=PrefabUtility.SaveAsPrefabAsset(h,Output+"/Kitsune Hatchling.prefab"); Object.DestroyImmediate(h);
        rs.Update(); rs.FindProperty("_hatchlings").GetArrayElementAtIndex(0).objectReferenceValue=hp.GetComponent<PenWanderer>(); rs.ApplyModifiedPropertiesWithoutUndo();
        string[] eggs={"Magenta Seraph Egg","Rose Pixel Egg","Violet Fox Claw Egg","Magenta Pixel Egg"};
        fs.Update(); var list=fs.FindProperty("_eggs");
        for(int i=0;i<list.arraySize;i++) {
            var old=(Egg)list.GetArrayElementAtIndex(i).objectReferenceValue;
            var prefab=(GameObject)Invoke("EggPrefab",eggs[i%eggs.Length]);
            var n=(GameObject)PrefabUtility.InstantiatePrefab(prefab); n.transform.SetParent(old.transform.parent,false); n.transform.SetPositionAndRotation(old.transform.position,old.transform.rotation);
            // Preserve pickup settings and collider behaviour from the existing egg.
            var so=new SerializedObject(old); var sn=new SerializedObject(n.GetComponent<Egg>());
            foreach(string field in new[]{"_stealRadius","_triggerCenter"}) sn.CopyFromSerializedProperty(so.FindProperty(field));
            sn.ApplyModifiedPropertiesWithoutUndo(); list.GetArrayElementAtIndex(i).objectReferenceValue=n.GetComponent<Egg>(); Object.DestroyImmediate(old.gameObject);
        }
        fs.ApplyModifiedPropertiesWithoutUndo();
        var map=GameObject.Find("Steal and Hatch Map").transform;
        var sakura=map.Find("Photo 3 - Sakura"); var nests=map.Find("Photo 2 - Guarded Nests");
        float a=sakura.position.z,b=nests.position.z,end=map.Find("Desert End Wall").position.z;
        // Move the complete Sakura section, including all its box colliders, into the nests footprint.
        float sakuraLength=b-a;
        sakura.position=Vector3.forward*b; sakura.localScale=new Vector3(1,1,(end-b)/sakuraLength); sakura.name="Guarded Nests - Sakura";
        // The supplied sand/ruins section corresponds to the beige demo arena.
        var src=AssetDatabase.LoadAssetAtPath<GameObject>("Assets/_Playable_/3D Model/Animal/Steal an egg/Map_Steal_Eggs.prefab");
        var demo=(GameObject)Invoke("CutSection",src.GetComponent<MeshFilter>().sharedMesh,src.GetComponent<Renderer>().sharedMaterials,map,"Photo 3 - Sand Ruins Demo",346.081f,557.04f,.4f,a);
        demo.transform.localScale=Vector3.one; Object.DestroyImmediate(nests.gameObject);
        var wall=map.Find("Desert End Wall").gameObject; wall.name="Sakura End Wall";
        var floor=sakura.GetComponent<Renderer>().sharedMaterials.FirstOrDefault(m=>m.name == "Sakura Bright - Green Surface 2") ?? sakura.GetComponent<Renderer>().sharedMaterials[0];
        var wallMat=new Material(floor); wallMat.name="Sakura Wall";
        string wp=Output+"/Materials/Sakura Wall.mat"; var wm=AssetDatabase.LoadAssetAtPath<Material>(wp);
        if(wm==null) { AssetDatabase.CreateAsset(wallMat,wp); wm=wallMat; } else { EditorUtility.CopySerialized(wallMat,wm); Object.DestroyImmediate(wallMat); }
        wm.mainTextureScale=new Vector2(20,5); wall.GetComponent<Renderer>().sharedMaterial=wm;
        // Close the gap left by restoring the ruins to their original proportions.
        float shift = a + (557.04f - 346.081f) * .4f - b;
        foreach (Transform child in map)
            if (child != demo.transform && child.position.z >= b - .01f)
            {
                child.position += Vector3.forward * shift;
                PrefabUtility.RecordPrefabInstancePropertyModifications(child);
            }
        float routeEnd = wall.transform.position.z;
        foreach (string boundaryName in new[] { "Left continuous boundary", "Right continuous boundary" })
        {
            var boundary = map.Find(boundaryName);
            var position = boundary.position; position.z = routeEnd * .5f; boundary.position = position;
            var box = boundary.GetComponent<BoxCollider>();
            var size = box.size; size.z = routeEnd; box.size = size;
        }
        AssetDatabase.SaveAssets(); EditorSceneManager.MarkSceneDirty(scene); EditorSceneManager.SaveScene(scene);
        Debug.Log("Sakura art applied; runtime scripts unchanged.");
    }
}




