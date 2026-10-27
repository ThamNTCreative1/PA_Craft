using System;
using System.IO;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine.SceneManagement;

public static class ReferenceHouseAssembler
{
    const string Folder = "Assets/3D Models/Reference House";
    static Transform root;
    static readonly Dictionary<Material,Material> materials = new Dictionary<Material,Material>();

    [MenuItem("Tools/CEBB/Assemble Reference House")]
    public static void Assemble()
    {
        if (EditorApplication.isPlaying) throw new InvalidOperationException("Exit Play mode first.");
        Directory.CreateDirectory(Folder); Directory.CreateDirectory("output/reference-house");
        AssetDatabase.Refresh(); materials.Clear();
        var previous = SceneManager.GetActiveScene();
        var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Additive);
        SceneManager.SetActiveScene(scene);
        root = new GameObject("Reference House - Existing Assets").transform;
        foreach(float x in new[]{-1.5f,1.5f}) foreach(float z in new[]{-.5f,2.5f})
        {
            Add("Dog Shelter/Prefabs/Done/Pale_Base.prefab", "Corner Base", new Vector3(x,0,z), new Vector3(1,1,1));
            Add("Gray Stone Block/GrayStoneBlock.fbx", "Stone Pillar",new Vector3(x,1,z),new Vector3(.5f,1,.5f));
        }
        for(int x=0;x<2;x++) for(int z=0;z<2;z++)
        {
            Add("Dog Shelter/Prefabs/Done/Glow_Base.prefab","Foundation",new Vector3(x-.5f,-1,z+.5f),Vector3.one);
            Cube("Pink Carpet",new Vector3(x-.5f,.015f,z+.5f),new Vector3(1,.03f,1),"Assets/3D Models/Dog Shelter/Materials/Pink_Carpet_00_PinkCarpet.mat");
        }
        foreach(float z in new[]{.5f,1.5f}) foreach(float x in new[]{-1.5f,1.5f})
        {
            Add("Pink Fence/PinkFence.fbx","Side Fence",new Vector3(x,1,z),new Vector3(1,.75f,.16f),new Vector3(0,90,0));
            Add("Glass Window/GlassWindow.fbx","Side Glass",new Vector3(x,2,z),new Vector3(1,1,.16f),new Vector3(0,90,0));
        }
        foreach(float x in new[]{-.5f,.5f})
        {
            Add("Pink Fence/PinkFence.fbx","Rear Fence",new Vector3(x,1,2.5f),new Vector3(1,.75f,.16f));
            Add("Glass Window/GlassWindow.fbx","Rear Glass",new Vector3(x,2,2.5f),new Vector3(1,1,.16f));
        }
        foreach(float z in new[]{-.5f,.5f,1.5f,2.5f}) foreach(float x in new[]{-1.5f,-.5f,.5f,1.5f})
        {
            bool inner=Mathf.Abs(x)<1 && z>0 && z<2;
            Add(inner?"Pink Roof/PinkRoof.fbx":"Dog Shelter/Prefabs/White_Roof_Slab.prefab",inner?"Pink Lattice Roof":"Ivory Roof Rim",new Vector3(x,3,z),new Vector3(1,inner?.25f:.5f,1));
        }
        foreach(float x in new[]{-2.5f,2.5f}) foreach(float z in new[]{-.5f,.5f,1.5f,2.5f})
            Add("Pink Roof/PinkRoof.fbx","Side Canopy",new Vector3(x,3,z),new Vector3(1,.25f,1));
        foreach(float x in new[]{-.5f,.5f})
        {
            Cube("Ivory Sign Backing",new Vector3(x,4,-.5f),Vector3.one,"Assets/3D Models/Dog Shelter/Materials/White_Roof_Slab_00_Solid_F0F5ED.mat");
            Add("Bone Decor Tile/BoneDecorTile.fbx","Bone Sign",new Vector3(x,4,-1.005f),new Vector3(.8f,.1f,.8f),new Vector3(-90,0,0));
        }
        Add("Water Basin/WaterBasin.fbx","Water Basin",new Vector3(-2.5f,0,-.5f),Vector3.one);
        Add("Purple Decor Block/PurpleDecorBlock.fbx","Purple Decor",new Vector3(2.5f,0,-.5f),Vector3.one);
        foreach(float x in new[]{-2.5f,2.5f}) foreach(float z in new[]{-.5f,2.5f})
            Add("Craft Lantern/CraftLantern.fbx","Hanging Lantern",new Vector3(x,2.13f,z),new Vector3(.44f,.87f,.44f));
        foreach(Transform piece in root)
            if(piece.name.Contains("Fence") || piece.name.Contains("Glass") || piece.name.Contains("Roof") || piece.name=="Side Canopy" || piece.name=="Ivory Sign Backing" || piece.name=="Bone Sign" || piece.name=="Hanging Lantern")
                piece.localPosition-=Vector3.up;
        var path=AssetDatabase.GenerateUniqueAssetPath(Folder+"/ReferenceHouse.prefab");
        PrefabUtility.SaveAsPrefabAsset(root.gameObject,path);
        var camera=new GameObject("Preview Camera").AddComponent<Camera>(); camera.tag="MainCamera";
        camera.transform.position=new Vector3(8,6,-11); camera.transform.LookAt(new Vector3(0,1.8f,1));
        camera.orthographic=true; camera.orthographicSize=4.8f; camera.clearFlags=CameraClearFlags.SolidColor; camera.backgroundColor=new Color(.37f,.55f,.64f);
        var light=new GameObject("Sun").AddComponent<Light>(); light.type=LightType.Directional; light.intensity=1.2f; light.transform.eulerAngles=new Vector3(45,-35,0);
        RenderSettings.ambientLight=new Color(.65f,.65f,.65f);
        var scenePath=AssetDatabase.GenerateUniqueAssetPath("Assets/Scenes/ReferenceHouse.unity");
        EditorSceneManager.SaveScene(scene,scenePath); AssetDatabase.SaveAssets();
        Render(camera,"output/reference-house/House_Perspective.png");
        camera.transform.position=new Vector3(0,2,-12); camera.transform.LookAt(new Vector3(0,2,1));
        Render(camera,"output/reference-house/House_Front.png");
        camera.transform.position=new Vector3(0,12,1); camera.transform.rotation=Quaternion.Euler(90,0,0);
        Render(camera,"output/reference-house/House_Top.png");
        camera.transform.position=new Vector3(8,6,-11); camera.transform.LookAt(new Vector3(0,1.8f,1));
        EditorSceneManager.SaveScene(scene,scenePath);
        Selection.activeGameObject=root.gameObject;
        Debug.Log("REFERENCE_HOUSE_READY: "+path+" | "+scenePath+" | pieces="+root.childCount);
    }
    static GameObject Add(string path,string name,Vector3 position,Vector3 size,Vector3 rotation=default(Vector3))
    {
        var source=AssetDatabase.LoadAssetAtPath<GameObject>("Assets/3D Models/"+path);
        if(source==null) throw new InvalidOperationException("Missing asset: "+path);
        var holder=new GameObject(name); holder.transform.SetParent(root,false);
        var model=(GameObject)PrefabUtility.InstantiatePrefab(source); model.transform.SetParent(holder.transform,false);
        var renderers=model.GetComponentsInChildren<Renderer>();
        var bounds=renderers[0].bounds; foreach(var r in renderers) bounds.Encapsulate(r.bounds);
        model.transform.localScale=Vector3.Scale(model.transform.localScale,new Vector3(size.x/bounds.size.x,size.y/bounds.size.y,size.z/bounds.size.z));
        bounds=renderers[0].bounds; foreach(var r in renderers) bounds.Encapsulate(r.bounds);
        model.transform.position-=new Vector3(bounds.center.x,bounds.min.y,bounds.center.z);
        foreach(var r in renderers)
        {
            var mats=r.sharedMaterials;
            for(int i=0;i<mats.Length;i++) mats[i]=MaterialFor(mats[i]);
            r.sharedMaterials=mats;
        }
        holder.transform.localPosition=position; holder.transform.localEulerAngles=rotation;
        return holder;
    }
    static Material MaterialFor(Material source)
    {
        if(source==null) throw new InvalidOperationException("Missing material");
        if(materials.TryGetValue(source,out var found)) return found;
        var shader=Shader.Find("Universal Render Pipeline/Lit"); if(shader==null) shader=Shader.Find("Standard");
        var mat=new Material(shader); mat.name=source.name; mat.color=source.color; mat.mainTexture=source.mainTexture;
        bool transparent=source.color.a<.99f;
        if(transparent)
        {
            mat.SetFloat("_Surface",1); mat.SetFloat("_Mode",3); mat.SetInt("_SrcBlend",5); mat.SetInt("_DstBlend",10); mat.SetInt("_ZWrite",0);
            mat.EnableKeyword("_SURFACE_TYPE_TRANSPARENT"); mat.EnableKeyword("_ALPHABLEND_ON"); mat.renderQueue=3000;
        }
        mat.SetFloat("_Smoothness",.15f);
        var path=AssetDatabase.GenerateUniqueAssetPath(Folder+"/"+source.name.Replace('/','_')+".mat"); AssetDatabase.CreateAsset(mat,path); materials[source]=mat; return mat;
    }
    static void Cube(string name,Vector3 pos,Vector3 size,string material)
    {
        var go=GameObject.CreatePrimitive(PrimitiveType.Cube); go.name=name; go.transform.SetParent(root,false); go.transform.localPosition=pos; go.transform.localScale=size;
        go.GetComponent<Renderer>().sharedMaterial=MaterialFor(AssetDatabase.LoadAssetAtPath<Material>(material));
    }
    static void Render(Camera cam,string path)
    {
        var rt=new RenderTexture(1200,1000,24); cam.targetTexture=rt; cam.Render(); var previous=RenderTexture.active; RenderTexture.active=rt;
        var png=new Texture2D(1200,1000,TextureFormat.RGB24,false); png.ReadPixels(new Rect(0,0,1200,1000),0,0); png.Apply(); File.WriteAllBytes(path,png.EncodeToPNG());
        cam.targetTexture=null; RenderTexture.active=previous; UnityEngine.Object.DestroyImmediate(png); UnityEngine.Object.DestroyImmediate(rt);
    }
}
