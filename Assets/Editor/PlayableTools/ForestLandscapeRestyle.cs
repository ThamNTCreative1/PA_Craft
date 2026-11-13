#if UNITY_EDITOR
using System.Collections.Generic;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using CEBB.Playable;

// Scene art tools: all geometry is authored in Edit mode and saved as assets.
public static class ForestLandscapeRestyle
{
    const string Root = "Assets/_Playable/ForestDecor/";
    static Material grass, soil, cream, wood, rose, water;
    static Material Mat(string name, Color color)
    {
        string path=Root+name+".mat";
        var m=AssetDatabase.LoadAssetAtPath<Material>(path);
        if(m==null){m=new Material(Shader.Find("CEBB/Scene Unlit"));AssetDatabase.CreateAsset(m,path);}
        m.color=color;EditorUtility.SetDirty(m);return m;
    }
    static GameObject Box(Transform parent,string name,Vector3 p,Vector3 size,Material mat,bool collision=false)
    {
        var go=GameObject.CreatePrimitive(PrimitiveType.Cube);go.name=name;go.transform.SetParent(parent,false);
        go.transform.localPosition=p;go.transform.localScale=size;go.GetComponent<Renderer>().sharedMaterial=mat;
        if(!collision)Object.DestroyImmediate(go.GetComponent<Collider>());return go;
    }
    // Collapse decorative blocks to one mesh per material; individual trees stay separate.
    static void Merge(GameObject go,string assetName)
    {
        var groups=new Dictionary<Material,List<CombineInstance>>();
        foreach(var f in go.GetComponentsInChildren<MeshFilter>())
        {
            var m=f.GetComponent<Renderer>().sharedMaterial;
            if(!groups.ContainsKey(m))groups[m]=new List<CombineInstance>();
            groups[m].Add(new CombineInstance{mesh=f.sharedMesh,transform=go.transform.worldToLocalMatrix*f.transform.localToWorldMatrix});
        }
        var old=new List<GameObject>();foreach(Transform t in go.transform)old.Add(t.gameObject);
        foreach(var o in old)Object.DestroyImmediate(o);
        foreach(var kv in groups)
        {
            var mesh=new Mesh();mesh.name=assetName+kv.Key.name;mesh.indexFormat=UnityEngine.Rendering.IndexFormat.UInt32;
            mesh.CombineMeshes(kv.Value.ToArray());mesh.RecalculateBounds();
            if(assetName=="Terraces")
            {
                var vertices=mesh.vertices;var normals=mesh.normals;var uv=new Vector2[vertices.Length];
                float tile=kv.Key==grass ? 90f : 90f/56f;
                for(int i=0;i<uv.Length;i++)
                {
                    var v=vertices[i];var n=normals[i];
                    uv[i]=Mathf.Abs(n.y)>.5f ? new Vector2(v.x,v.z)/tile : (Mathf.Abs(n.x)>.5f ? new Vector2(v.z,v.y)/tile : new Vector2(v.x,v.y)/tile);
                }
                mesh.uv=uv;
            }
            string path=Root+mesh.name+".asset";
            var existing=AssetDatabase.LoadAssetAtPath<Mesh>(path);
            if(existing!=null)
            {
                existing.Clear();existing.indexFormat=mesh.indexFormat;existing.vertices=mesh.vertices;existing.uv=mesh.uv;existing.normals=mesh.normals;existing.triangles=mesh.triangles;
                existing.RecalculateBounds();existing.UploadMeshData(false);EditorUtility.SetDirty(existing);Object.DestroyImmediate(mesh);mesh=existing;
            }
            else AssetDatabase.CreateAsset(mesh,path);
            var child=new GameObject(kv.Key.name);child.transform.SetParent(go.transform,false);
            child.AddComponent<MeshFilter>().sharedMesh=mesh;child.AddComponent<MeshRenderer>().sharedMaterial=kv.Key;
        }
    }
    static float Height(float x,float z)
    {
        float h=0;
        foreach(var peak in new[]{new Vector3(-33,11,8),new Vector3(33,13,10),new Vector3(-12,14,39),new Vector3(17,12,40),new Vector3(-31,9,-26),new Vector3(33,10,-25)})
        {
            float d=Mathf.Max(Mathf.Abs(x-peak.x)*.83f,Mathf.Abs(z-peak.z));
            h=Mathf.Max(h,Mathf.Floor((peak.y-d*.46f)/1.25f)*1.25f);
        }
        if(Mathf.Abs(x)<19&&z<24&&z> -23)return 0;
        float edge=Mathf.Max(Mathf.Abs(x)-18,z-23,-z-22);
        h=Mathf.Min(h,Mathf.Floor(edge*.30f/1.25f)*1.25f);
        return Mathf.Max(0,h);
    }
    public static void ApplyTerrainFaces(Transform hills)
    {
        var topMaterial=AssetDatabase.LoadAssetAtPath<Material>("Assets/_Playable/CherryForest/GroundGrassUnlit.mat");
        var sideMaterial=AssetDatabase.LoadAssetAtPath<Material>(Root+"Hill earth.mat");
        foreach(var r in hills.GetComponentsInChildren<MeshRenderer>())
        {
            if(r.sharedMaterial!=topMaterial)continue;
            var mesh=r.GetComponent<MeshFilter>().sharedMesh;
            var vertices=mesh.vertices;var normals=mesh.normals;var triangles=mesh.triangles;
            var tops=new List<int>();var sides=new List<int>();var uv=new Vector2[vertices.Length];
            for(int i=0;i<vertices.Length;i++)
            {
                var v=vertices[i];var n=normals[i];
                uv[i]=Mathf.Abs(n.y)>.5f ? new Vector2(v.x,v.z)/90f : (Mathf.Abs(n.x)>.5f ? new Vector2(v.z,v.y) : new Vector2(v.x,v.y))/90f;
            }
            for(int i=0;i<triangles.Length;i+=3)
            {
                var list=tops;
                list.Add(triangles[i]);list.Add(triangles[i+1]);list.Add(triangles[i+2]);
            }
            mesh.uv=uv;mesh.subMeshCount=2;mesh.SetTriangles(tops,0);mesh.SetTriangles(sides,1);mesh.UploadMeshData(false);
            r.sharedMaterials=new[]{topMaterial,sideMaterial};EditorUtility.SetDirty(mesh);EditorUtility.SetDirty(r);
        }
    }
    public static int RebuildTerraces(Transform hills)
    {
        grass=AssetDatabase.LoadAssetAtPath<Material>("Assets/_Playable/CherryForest/GroundGrassUnlit.mat");
        soil=AssetDatabase.LoadAssetAtPath<Material>(Root+"Hill earth.mat");
        var children=new List<GameObject>();foreach(Transform t in hills)children.Add(t.gameObject);
        foreach(var child in children)Object.DestroyImmediate(child);
        const float grassDepth=1.25f*.25f;
        int columns=0;
        for(int x=-48;x<=48;x+=3)for(int z=-42;z<=51;z+=3)
        {
            float h=Height(x,z);if(h<1)continue;
            Box(hills,"Earth terrace",new Vector3(x,(h-grassDepth)/2,z),new Vector3(3,h-grassDepth,3),soil);
            Box(hills,"Grass lip",new Vector3(x,h-grassDepth/2,z),new Vector3(3,grassDepth,3),grass);columns++;
        }
        Merge(hills.gameObject,"Terraces");ApplyTerrainFaces(hills);return columns;
    }
    public static void GroundWoodlandTrees(Transform trees)
    {
        foreach(Transform tree in trees)
        {
            Vector3 p=tree.position;
            float ground=Height(Mathf.Round(p.x/3)*3,Mathf.Round(p.z/3)*3);
            float bottom=float.MaxValue;
            foreach(var r in tree.GetComponentsInChildren<Renderer>())
                if(r.name=="Oak_Log"&&r.enabled)bottom=Mathf.Min(bottom,r.bounds.min.y);
            if(bottom!=float.MaxValue){p.y+=ground-bottom;tree.position=p;}
        }
    }
    public static string Build()
    {
        var game=Object.FindFirstObjectByType<BedroomPlayable>();
        var old=GameObject.Find("Forest Decor - oak groves and wildflowers");if(old!=null)old.SetActive(false);
        var prior=GameObject.Find("Pastel landscape");if(prior!=null)Object.DestroyImmediate(prior);
        var root=new GameObject("Pastel landscape");Undo.RegisterCreatedObjectUndo(root,"Restyle landscape");
        grass=Mat("Hill meadow",new Color(.50f,.68f,.35f));soil=Mat("Hill earth",new Color(.46f,.36f,.27f));
        cream=Mat("Garden ivory",new Color(.96f,.92f,.82f));wood=Mat("Garden cedar",new Color(.55f,.39f,.30f));
        rose=Mat("Garden blush",new Color(.87f,.67f,.72f));water=Mat("Garden water",new Color(.47f,.75f,.77f));
        var ground=AssetDatabase.LoadAssetAtPath<Material>("Assets/_Playable/CherryForest/GroundGrassUnlit.mat");
        ground.color=new Color(.84f,.88f,.78f);ground.SetFloat("_Saturation",.9f);ground.SetFloat("_PastelMix",.02f);EditorUtility.SetDirty(ground);
        grass=ground;
        soil.mainTexture=AssetDatabase.LoadAssetAtPath<Texture2D>("Assets/_Playable/CherryForest/BlockSurface_2_2.png");soil.color=new Color(.80f,.74f,.68f);
        var hills=new GameObject("Terraced hills");hills.transform.SetParent(root.transform);
        int columns=RebuildTerraces(hills.transform);
        var trees=new GameObject("Individual woodland trees");trees.transform.SetParent(root.transform);
        var random=new System.Random(934);int treeCount=0;
        for(int x=-42;x<=42;x+=7)for(int z=-33;z<=45;z+=8)
        {
            if(Mathf.Abs(x)<21&&z<26)continue;if(random.NextDouble()<.30)continue;
            float px=x+(float)random.NextDouble()*2,pz=z+(float)random.NextDouble()*2;
            var model=AssetDatabase.LoadAssetAtPath<GameObject>(Root+(treeCount%3==0?"BirchSingle":"OakSingle")+".obj");
            var tree=Object.Instantiate(model,trees.transform);tree.name="Woodland tree "+(++treeCount);
            tree.transform.position=new Vector3(px,Height(x,z),pz);tree.transform.rotation=Quaternion.Euler(0,random.Next(4)*90,0);
            tree.transform.localScale=Vector3.one*(.7f+(float)random.NextDouble()*.4f);
            foreach(var r in tree.GetComponentsInChildren<Renderer>())
            {
                r.sharedMaterial=AssetDatabase.LoadAssetAtPath<Material>(Root+r.name+".mat");
                if(r.name=="Oak_Leaves")
                {
                    var leaves=AssetDatabase.LoadAssetAtPath<Mesh>(Root+"Azalea"+((treeCount-1)%3==0?"Birch":"Oak")+"Leaves.asset");
                    if(leaves!=null)r.GetComponent<MeshFilter>().sharedMesh=leaves;
                }
            }
        }
        GroundWoodlandTrees(trees.transform);
        var flowers=new GameObject("Wildflower borders");flowers.transform.SetParent(root.transform);
        int plants=0;
        for(int i=0;i<420;i++)
        {
            float x=(float)random.NextDouble()*84-42,z=(float)random.NextDouble()*80-32;
            if(Mathf.Abs(x)<10&&z<20&&z> -23)continue;
            string n=i%11==0?"Sunflower":i%4==0?"Poppy":i%3==0?"Dandelion":"Grass";
            var go=Object.Instantiate(AssetDatabase.LoadAssetAtPath<GameObject>(Root+n+".obj"),flowers.transform);go.name=n+" "+(++plants);
            float h=Height(Mathf.Round(x/3)*3,Mathf.Round(z/3)*3);
            go.transform.position=new Vector3(x,h+.02f,z);go.transform.localScale=Vector3.one*(.45f+(float)random.NextDouble()*.4f);go.transform.rotation=Quaternion.Euler(0,random.Next(360),0);
            foreach(var r in go.GetComponentsInChildren<Renderer>())r.sharedMaterial=AssetDatabase.LoadAssetAtPath<Material>(Root+n+".mat");
        }
        // Reuse the imported meshes but batch all small plants by material.
        Merge(flowers,"Wildflowers");
        Color[] palette={new Color(.89f,.69f,.75f),new Color(.97f,.83f,.85f),new Color(.98f,.95f,.87f),new Color(.72f,.49f,.56f),new Color(.58f,.78f,.80f),new Color(.51f,.69f,.39f)};
        for(int i=0;i<palette.Length;i++){var m=AssetDatabase.LoadAssetAtPath<Material>("Assets/_Playable/PinkCottage/Palette"+i+".mat");if(m!=null){m.color=palette[i];EditorUtility.SetDirty(m);}}
        var purple=AssetDatabase.LoadAssetAtPath<Material>("Assets/_Playable/PinkCottage/Palette9.mat");purple.color=new Color(.77f,.69f,.84f);EditorUtility.SetDirty(purple);
        var blossom=AssetDatabase.LoadAssetAtPath<Material>("Assets/_Playable/CherryForest/BlossomAtlas.mat");blossom.SetFloat("_Brightness",1.32f);blossom.SetFloat("_Saturation",1.15f);blossom.SetFloat("_PastelMix",.07f);EditorUtility.SetDirty(blossom);
        game.ghostMaterial=Mat("Unbuilt light grey",new Color(.72f,.74f,.76f,.30f));
        game.ghostMaterial.shader=Shader.Find("CEBB/Ghost Unlit");
        game.ghostMaterial.SetFloat("_UseVertexColor",0);
        game.ghostMaterial.renderQueue=3000;
        if(game.ghostOutlineMaterial!=null){game.ghostOutlineMaterial.color=new Color(.92f,.93f,.93f,.6f);EditorUtility.SetDirty(game.ghostOutlineMaterial);}
        game.timerText.gameObject.SetActive(false);
        AddDecor(game,root.transform);
        EditorUtility.SetDirty(game);AssetDatabase.SaveAssets();EditorSceneManager.MarkSceneDirty(game.gameObject.scene);
        return columns+" terrace columns, "+treeCount+" individual trees, "+plants+" plants, 3 new buildable decorations";
    }
    static void AddDecor(BedroomPlayable game,Transform parent)
    {
        var slots=new List<FurnitureSlot>(game.slots);var inventory=new List<FurnitureInventoryEntry>(game.inventory);
        string[] names={"Garden Arch","Flower Planter","Bird Bath"};
        Vector3[][] placements={new[]{new Vector3(0,0,-12),new Vector3(0,0,21)},new[]{new Vector3(-10,0,-11),new Vector3(10,0,-11)},new[]{new Vector3(-16,0,4),new Vector3(16,0,5)}};
        for(int i=0;i<3;i++)
        {
            var go=new GameObject(names[i]);
            if(i==0)
            {
                for(int side=-1;side<=1;side+=2){Box(go.transform,"Cedar post",new Vector3(side*1.65f,1.7f,0),new Vector3(.32f,3.4f,.38f),cream);Box(go.transform,"Cap",new Vector3(side*1.65f,3.5f,0),new Vector3(.65f,.25f,.7f),rose);}
                Box(go.transform,"Arch lintel",new Vector3(0,3.25f,0),new Vector3(4.2f,.3f,.65f),rose);
                for(int k=0;k<7;k++)Box(go.transform,"Blossom",new Vector3(-1.5f+k*.5f,3.55f,0),new Vector3(.35f,.25f,.5f),k%2==0?cream:rose);
            }
            else if(i==1)
            {
                Box(go.transform,"Planter",new Vector3(0,.35f,0),new Vector3(2.4f,.7f,1),cream);Box(go.transform,"Soil",new Vector3(0,.73f,0),new Vector3(2.1f,.1f,.8f),soil);
                for(int k=0;k<5;k++){Box(go.transform,"Stem",new Vector3(-.9f+k*.45f,1,0),new Vector3(.12f,.6f,.12f),grass);Box(go.transform,"Flower",new Vector3(-.9f+k*.45f,1.3f,0),new Vector3(.4f,.3f,.45f),k%2==0?rose:cream);}
            }
            else
            {
                Box(go.transform,"Plinth",new Vector3(0,.15f,0),new Vector3(1.3f,.3f,1.3f),cream);Box(go.transform,"Pillar",new Vector3(0,.8f,0),new Vector3(.4f,1.3f,.4f),cream);Box(go.transform,"Basin",new Vector3(0,1.5f,0),new Vector3(1.8f,.25f,1.8f),rose);Box(go.transform,"Water",new Vector3(0,1.64f,0),new Vector3(1.5f,.035f,1.5f),water);
                for(int side=-1;side<=1;side+=2){Box(go.transform,"Basin rim",new Vector3(side*.85f,1.72f,0),new Vector3(.15f,.3f,1.8f),cream);Box(go.transform,"Basin rim",new Vector3(0,1.72f,side*.85f),new Vector3(1.8f,.3f,.15f),cream);}
            }
            Merge(go,names[i].Replace(" ",""));var prefab=PrefabUtility.SaveAsPrefabAsset(go,Root+names[i]+".prefab");Object.DestroyImmediate(go);
            string path=Root+names[i]+".asset";var def=AssetDatabase.LoadAssetAtPath<FurnitureDefinition>(path);if(def==null){def=ScriptableObject.CreateInstance<FurnitureDefinition>();AssetDatabase.CreateAsset(def,path);}def.prefab=prefab;def.displayName=names[i];def.furnitureId=names[i].Replace(" ","").ToLowerInvariant();EditorUtility.SetDirty(def);
            if(inventory.Exists(e=>e.definition==def))continue;
            foreach(var p in placements[i]){var anchor=new GameObject(names[i]+" placement");anchor.transform.SetParent(game.slots[0].anchor.parent,false);anchor.transform.position=p;slots.Add(new FurnitureSlot{definition=def,anchor=anchor.transform,buildOrder=slots.Count,localScale=Vector3.one});}
            var card=Object.Instantiate(game.inventory[0].button.gameObject,game.inventory[0].button.transform.parent);card.name=names[i];card.transform.Find("Name").GetComponent<TextMeshProUGUI>().text=names[i].ToUpperInvariant();
            var entry=new FurnitureInventoryEntry{definition=def,button=card.GetComponent<Button>(),frame=card.GetComponent<Image>(),icon=card.transform.Find("Furniture icon").GetComponent<Image>(),quantityText=card.transform.Find("Remaining quantity").GetComponent<TextMeshProUGUI>(),emptyBadge=card.transform.Find("Built badge").gameObject};
            card.transform.Find("Tutorial hand").gameObject.SetActive(false);inventory.Add(entry);
        }
        game.slots=slots.ToArray();game.inventory=inventory.ToArray();
        foreach(var layout in Object.FindObjectsByType<BedroomLayout>(FindObjectsInactive.Include,FindObjectsSortMode.None))if(layout.canvas!=null)layout.catalogItemCount=inventory.Count;
        // Fixed scenery gives the clearing detail before the player builds anything.
        var border=new GameObject("Garden fence and stepping stones");border.transform.SetParent(parent,false);
        for(int side=-1;side<=1;side+=2)for(int z=-15;z<=19;z+=3)
        {
            Box(border.transform,"Fence post",new Vector3(side*18, .7f,z),new Vector3(.25f,1.4f,.25f),cream);
            Box(border.transform,"Fence rail",new Vector3(side*18,.9f,z+1.5f),new Vector3(.14f,.18f,3),wood);
        }
        for(int i=0;i<9;i++)Box(border.transform,"Stepping stone",new Vector3((i%2==0?-.3f:.3f),.04f,-20+i*.85f),new Vector3(1.2f,.08f,.55f),cream);
        Merge(border,"GardenBorders");
    }
}
#endif
