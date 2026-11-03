using System.Collections.Generic;
using System.IO;
using System.Linq;
using TMPro;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

// World-space TextMeshPro (signs, pet labels, incubator timers) shared its material with the UI. Luna's canvases set
// unity_GUIZTestMode to ALWAYS on that material, so the 3D texts drew through walls; Cull Off showed them from behind.
// They get their own copies on TMP_SDF World: depth-tested (LEqual) and front faces only.
public static class StealEggWorldTextSetup
{
    const string Folder="Assets/PlayableGenerated/WorldText/";
    const string WorldShader="TextMeshPro/Distance Field World";
    const float CullBack=2;

    [MenuItem("Steal Egg/Set up world text materials")]
    static void Menu(){StealEggGame game=Object.FindFirstObjectByType<StealEggGame>();Apply(game);EditorSceneManager.SaveScene(game.gameObject.scene);}

    static readonly Dictionary<Material,Material> made=new Dictionary<Material,Material>();
    public static Material World(Material source)
    {
        if(!source)return null;
        if(made.TryGetValue(source,out Material m) && m)return m;
        // Already a world copy (an earlier run): only its shader and cull are brought up to date.
        if(source.name.EndsWith(" World"))m=source;
        else
        {
            Directory.CreateDirectory(Folder);
            string path=Folder+source.name+" World.mat";
            m=AssetDatabase.LoadAssetAtPath<Material>(path);
            if(!m){m=new Material(source);AssetDatabase.CreateAsset(m,path);}
            else m.CopyPropertiesFromMaterial(source);
            m.name=source.name+" World";
        }
        // Same properties, on the TMP_SDF copy whose ZTest is LEqual instead of [unity_GUIZTestMode].
        Shader shader=Shader.Find(WorldShader);
        if(!shader)throw new System.Exception("Shader "+WorldShader+" missing (Assets/TextMesh Pro/Shaders/TMP_SDF World.shader).");
        m.shader=shader;
        m.SetFloat("_CullMode",CullBack);
        EditorUtility.SetDirty(m);
        made[source]=m;
        return m;
    }
    static int Retarget(IEnumerable<TextMeshPro> texts)
    {
        int count=0;
        foreach(TextMeshPro text in texts)
        {
            Material world=World(text.fontSharedMaterial);
            if(!world || text.fontSharedMaterial==world)continue;
            text.fontSharedMaterial=world;EditorUtility.SetDirty(text);count++;
        }
        return count;
    }
    public static void Apply(StealEggGame game)
    {
        made.Clear();
        int scene=Retarget(game.gameObject.scene.GetRootGameObjects().SelectMany(r=>r.GetComponentsInChildren<TextMeshPro>(true)));
        int prefabs=0;
        var assets=game.petCatalog.Select(p=>p.prefab).Concat(new[]{game.incubateTimerPrefab}).Where(p=>p).Distinct();
        foreach(GameObject prefab in assets)
        {
            string path=AssetDatabase.GetAssetPath(prefab);
            GameObject contents=PrefabUtility.LoadPrefabContents(path);
            try{int n=Retarget(contents.GetComponentsInChildren<TextMeshPro>(true));if(n>0){PrefabUtility.SaveAsPrefabAsset(contents,path);prefabs+=n;}}
            finally{PrefabUtility.UnloadPrefabContents(contents);}
        }
        // Pet rarity labels are 3D: SetRarityText picks these for TextMeshPro, the originals for the UI.
        game.rarityWorldMaterials=(game.rarityMaterials??new Material[0]).Select(World).ToArray();
        EditorUtility.SetDirty(game);
        AssetDatabase.SaveAssets();
        Debug.Log("World text: "+scene+" scene texts, "+prefabs+" prefab texts, "+game.rarityWorldMaterials.Length+" rarity materials.");
    }
}
