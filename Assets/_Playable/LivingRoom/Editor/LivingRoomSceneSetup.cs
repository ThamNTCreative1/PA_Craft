#if UNITY_EDITOR
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using CEBB.Playable;

// Builds the decorating scenes from SampleScene (bedroom), keeping its UI style and the same gameplay / tutorial / Luna setup.
// One "variant" per scene: LivingRoom, GreenLiving (medieval living-room furniture) and Kitchen.
// Menu: Tools/CEBB/<Scene>/1 Import Furniture, then 2 Build Scene.
public static class LivingRoomSceneSetup
{
    sealed class Variant
    {
        public string title,root,texDir,prefix,scene,firstPrompt;public bool kitchen;public int first,guide;
        public string[] models,names,wall,top,walk;public int[] qty;
    }
    const string LivingRoot="Assets/_Playable/LivingRoom/",SharedUI=LivingRoot+"UI/";
    static readonly Variant Living=new Variant{title="Living room",root=LivingRoot,texDir="Assets/Outsources/livingroom/textures/",prefix="lr_",scene="Assets/Scenes/LivingRoom.unity",firstPrompt="TAP TO DECOR LIVING ROOM",first=0,guide=2,
        models=new[]{"sofa_double","armchair","coffee_table","tv_cabinet","tv","bookshelf_high","floor_lamp","plant_pot_large","rug_square","painting","wall_clock","pouf"},
        names=new[]{"Sofa","Armchair","Table","TV Stand","TV","Bookshelf","Lamp","Plant","Rug","Painting","Clock","Pouf"},qty=new[]{2,2,2,1,1,2,2,3,2,3,2,2},
        wall=new[]{"painting","wall_clock"},top=new[]{"tv_cabinet","coffee_table"},walk=new[]{"rug_square"}};
    // living2 (medieval furniture) — only 11 models, so the 12th hotbar slot is hidden
    static readonly Variant Green=new Variant{title="Green living",root="Assets/_Playable/GreenLiving/",texDir="Assets/Outsources/living2/textures/",prefix="gl_",scene="Assets/Scenes/GreenLiving.unity",firstPrompt="TAP TO DECOR LIVING ROOM",first=0,guide=1,
        models=new[]{"group2","group12","group19","group10","group11","group3","group4","group5","group17","group15","cube"},
        names=new[]{"Sofa","Table","Armchair","Fireplace","Cabinet","Side Table","Plant","Big Plant","Candle","Wall Candle","Rug"},qty=new[]{2,2,2,1,1,2,3,2,3,3,2},
        wall=new[]{"group15"},top=new[]{"group11","group12","group3"},walk=new[]{"cube"}};
    static readonly Variant Kitchen=new Variant{title="Kitchen",root="Assets/_Playable/Kitchen/",texDir="Assets/Outsources/kitchen/textures/",prefix="kt_",scene="Assets/Scenes/Kitchen.unity",firstPrompt="TAP TO DECOR KITCHEN",kitchen=true,first=0,guide=1,
        models=new[]{"group17","group","group2","group3","group9","group29","group5","group22","group11","group12","group16","bone"},
        names=new[]{"Island","Fridge","Counter","Sink","Stove","Microwave","Toaster","Fruit","Cabinet","Shelf","Hood","Bin"},qty=new[]{1,1,4,1,1,1,1,2,3,2,1,1},
        wall=new[]{"group11","group12","group16"},top=new[]{"group17","group2"},walk=new string[0]};
    static Variant V=Living;
    static string Root{get{return V.root;}}
    static string TexDir{get{return V.texDir;}}
    static string ScenePath{get{return V.scene;}}
    static string[] CatalogModels{get{return V.models;}}
    static string[] CatalogNames{get{return V.names;}}
    static int[] CatalogQty{get{return V.qty;}}
    static bool In(string[] list,string v){return System.Array.IndexOf(list,v)>=0;}

    [MenuItem("Tools/CEBB/Living Room/1 Import Furniture")] public static void LivingImport(){V=Living;ImportFurniture();}
    [MenuItem("Tools/CEBB/Living Room/2 Build Scene")] public static void LivingBuild(){V=Living;BuildScene();}
    [MenuItem("Tools/CEBB/Green Living/1 Import Furniture")] public static void GreenImport(){V=Green;ImportFurniture();}
    [MenuItem("Tools/CEBB/Green Living/2 Build Scene")] public static void GreenBuild(){V=Green;BuildScene();}
    [MenuItem("Tools/CEBB/Kitchen/1 Import Furniture")] public static void KitchenImport(){V=Kitchen;ImportFurniture();}
    [MenuItem("Tools/CEBB/Kitchen/2 Build Scene")] public static void KitchenBuild(){V=Kitchen;BuildScene();}

    static void ImportFurniture()
    {
        Folder(Root+"Materials");Folder(Root+"Prefabs");Folder(Root+"Data");Folder(Root+"Icons");Folder(Root+"Textures");
        // pixel-art textures: point filter, no mips
        foreach(var guid in AssetDatabase.FindAssets("t:Texture2D",new[]{TexDir.TrimEnd('/')}))
        {
            var ti=(TextureImporter)AssetImporter.GetAtPath(AssetDatabase.GUIDToAssetPath(guid));
            ti.filterMode=FilterMode.Point;ti.mipmapEnabled=false;ti.wrapMode=TextureWrapMode.Clamp;ti.alphaIsTransparency=true;ti.textureCompression=TextureImporterCompression.Uncompressed;ti.SaveAndReimport();
        }
        var lit=Shader.Find("CEBB/Scene Unlit");
        var models=AssetDatabase.FindAssets(V.prefix+" t:Model",new[]{Root+"Models"});
        foreach(var guid in models)
        {
            string path=AssetDatabase.GUIDToAssetPath(guid);var mi=(ModelImporter)AssetImporter.GetAtPath(path);
            mi.materialImportMode=ModelImporterMaterialImportMode.ImportStandard; // keeps one submesh per usemtl (needs the .mtl next to the .obj)mi.importAnimation=false;mi.importCameras=false;mi.importLights=false;mi.isReadable=false;mi.SaveAndReimport();
            string name=Path.GetFileNameWithoutExtension(path);string text=File.ReadAllText(path);
            // one submesh per "usemtl LR_mNN" group, in file order
            var used=new List<Material>();int at=0;
            while((at=text.IndexOf("usemtl LR_m",at))>=0){int matIndex=int.Parse(text.Substring(at+11,2));at+=13;used.Add(FurnitureMaterial(matIndex,lit));}
            var src=AssetDatabase.LoadAssetAtPath<GameObject>(path);var go=(GameObject)Object.Instantiate(src);go.name=name;
            foreach(var r in go.GetComponentsInChildren<MeshRenderer>())
            {
                // submesh materials are named "LR_mNN" from the .mtl; files without .mtl fall back to usemtl order
                var mats=r.sharedMaterials;int idx;
                for(int i=0;i<mats.Length;i++)mats[i]=mats[i]!=null&&mats[i].name.StartsWith("LR_m")&&int.TryParse(mats[i].name.Substring(4),out idx)?FurnitureMaterial(idx,lit):used[Mathf.Min(i,used.Count-1)];
                r.sharedMaterials=mats;
            }
            PrefabUtility.SaveAsPrefabAsset(go,Root+"Prefabs/"+name+".prefab");Object.DestroyImmediate(go);
        }
        AssetDatabase.SaveAssets();
        foreach(var guid in models){string n=Path.GetFileNameWithoutExtension(AssetDatabase.GUIDToAssetPath(guid));var pf=AssetDatabase.LoadAssetAtPath<GameObject>(Root+"Prefabs/"+n+".prefab");if(pf!=null)RenderIcon(pf,n);} // every model, for picking catalogs
        for(int i=0;i<CatalogModels.Length;i++)
        {
            var prefab=AssetDatabase.LoadAssetAtPath<GameObject>(Root+"Prefabs/"+V.prefix+CatalogModels[i]+".prefab");
            string dataPath=Root+"Data/"+CatalogModels[i]+".asset";var item=AssetDatabase.LoadAssetAtPath<DecorItem>(dataPath);
            if(item==null){item=ScriptableObject.CreateInstance<DecorItem>();AssetDatabase.CreateAsset(item,dataPath);}
            item.itemId=CatalogModels[i];item.displayName=CatalogNames[i];item.prefab=prefab;item.quantity=CatalogQty[i];
            item.mount=In(V.wall,CatalogModels[i])?DecorMount.Wall:DecorMount.Floor;
            item.walkableSurface=In(V.walk,CatalogModels[i]);item.topSurface=In(V.top,CatalogModels[i]);
            Bounds b=MeshBounds(prefab);item.boundsSize=new Vector3(b.size.x,Mathf.Max(.02f,b.size.y),b.size.z);
            item.icon=AssetDatabase.LoadAssetAtPath<Sprite>(Root+"Icons/"+V.prefix+CatalogModels[i]+".png");EditorUtility.SetDirty(item);
        }
        AssetDatabase.SaveAssets();Debug.Log("[CEBB] "+V.title+" furniture imported: "+models.Length+" models, "+CatalogModels.Length+" catalog items.");
    }
    static Material FurnitureMaterial(int matIndex,Shader lit)
    {
        string matPath=Root+"Materials/LR_m"+matIndex.ToString("00")+".mat";var mat=AssetDatabase.LoadAssetAtPath<Material>(matPath);
        bool fresh=mat==null;if(fresh){mat=new Material(lit);mat.name="LR_m"+matIndex.ToString("00");}
        var tex=VividTexture(matIndex);
        mat.mainTexture=tex;mat.color=Color.white;
        mat.SetFloat("_Cull",0);mat.SetFloat("_AlphaClip",1);mat.SetFloat("_Cutoff",.5f);mat.renderQueue=2450;
        if(fresh)AssetDatabase.CreateAsset(mat,matPath);else EditorUtility.SetDirty(mat);
        return mat;
    }
    // Copy of a glTF texture with more saturation + a little contrast (originals in Outsources stay untouched).
    const float Saturation=1.3f,Contrast=1.1f;
    static Texture2D VividTexture(int index)
    {
        Folder(Root+"Textures/Furniture");string src=TexDir+"gltf_embedded_"+index+".png",dst=Root+"Textures/Furniture/lr_tex_"+index.ToString("00")+".png";
        var t=new Texture2D(2,2,TextureFormat.RGBA32,false);t.LoadImage(File.ReadAllBytes(src));var px=t.GetPixels();
        for(int i=0;i<px.Length;i++)
        {
            Color c=px[i];float h,sat,v;Color.RGBToHSV(c,out h,out sat,out v);
            sat=Mathf.Clamp01(sat*Saturation);v=Mathf.Clamp01((v-.5f)*Contrast+.5f+.02f);
            Color n=Color.HSVToRGB(h,sat,v);n.a=c.a;px[i]=n;
        }
        t.SetPixels(px);t.Apply();File.WriteAllBytes(dst,t.EncodeToPNG());Object.DestroyImmediate(t);AssetDatabase.ImportAsset(dst);
        var ti=(TextureImporter)AssetImporter.GetAtPath(dst);ti.filterMode=FilterMode.Point;ti.mipmapEnabled=false;ti.wrapMode=TextureWrapMode.Clamp;ti.alphaIsTransparency=true;ti.textureCompression=TextureImporterCompression.Uncompressed;ti.SaveAndReimport();
        return AssetDatabase.LoadAssetAtPath<Texture2D>(dst);
    }
    static Bounds MeshBounds(GameObject prefab)
    {
        Bounds result=new Bounds();bool init=false;
        foreach(var mf in prefab.GetComponentsInChildren<MeshFilter>())
        {
            var m=mf.sharedMesh;if(m==null)continue;var t=mf.transform;Bounds mb=m.bounds;
            for(int i=0;i<8;i++){Vector3 p=prefab.transform.InverseTransformPoint(t.TransformPoint(new Vector3((i&1)==0?mb.min.x:mb.max.x,(i&2)==0?mb.min.y:mb.max.y,(i&4)==0?mb.min.z:mb.max.z)));if(!init){result=new Bounds(p,Vector3.zero);init=true;}else result.Encapsulate(p);}
        }
        return result;
    }
    // Renders a 256px icon with a transparent background (3/4 view of the item's front).
    static Sprite RenderIcon(GameObject prefab,string name)
    {
        const int layer=31;var go=(GameObject)Object.Instantiate(prefab);go.transform.position=new Vector3(0,-500,0);go.transform.rotation=Quaternion.Euler(0,-32,0);
        foreach(var t in go.GetComponentsInChildren<Transform>())t.gameObject.layer=layer;
        Bounds b=new Bounds();bool init=false;foreach(var r in go.GetComponentsInChildren<Renderer>()){if(!init){b=r.bounds;init=true;}else b.Encapsulate(r.bounds);}
        var camGo=new GameObject("Icon camera");var cam=camGo.AddComponent<Camera>();cam.cullingMask=1<<layer;cam.clearFlags=CameraClearFlags.SolidColor;cam.backgroundColor=new Color(0,0,0,0);cam.orthographic=true;
        float radius=b.extents.magnitude;cam.orthographicSize=radius*1.02f;cam.nearClipPlane=.01f;cam.farClipPlane=radius*6;
        cam.transform.position=b.center+new Vector3(0,Mathf.Sin(24*Mathf.Deg2Rad),-Mathf.Cos(24*Mathf.Deg2Rad))*radius*3;cam.transform.LookAt(b.center);
        var lightGo=new GameObject("Icon light");var light=lightGo.AddComponent<Light>();light.type=LightType.Directional;light.intensity=1.6f;light.cullingMask=1<<layer;lightGo.transform.rotation=Quaternion.Euler(40,-30,0);
        var rt=RenderTexture.GetTemporary(256,256,24,RenderTextureFormat.ARGB32);cam.targetTexture=rt;var ambient=RenderSettings.ambientLight;var mode=RenderSettings.ambientMode;RenderSettings.ambientMode=UnityEngine.Rendering.AmbientMode.Flat;RenderSettings.ambientLight=new Color(.75f,.75f,.75f);
        cam.Render();RenderSettings.ambientLight=ambient;RenderSettings.ambientMode=mode;
        var prev=RenderTexture.active;RenderTexture.active=rt;var tex=new Texture2D(256,256,TextureFormat.RGBA32,false);tex.ReadPixels(new Rect(0,0,256,256),0,0);tex.Apply();RenderTexture.active=prev;
        string path=Root+"Icons/"+name+".png";File.WriteAllBytes(path,tex.EncodeToPNG());
        Object.DestroyImmediate(tex);cam.targetTexture=null;RenderTexture.ReleaseTemporary(rt);Object.DestroyImmediate(camGo);Object.DestroyImmediate(lightGo);Object.DestroyImmediate(go);
        AssetDatabase.ImportAsset(path);var ti=(TextureImporter)AssetImporter.GetAtPath(path);ti.textureType=TextureImporterType.Sprite;ti.spriteImportMode=SpriteImportMode.Single;ti.mipmapEnabled=false;ti.alphaIsTransparency=true;ti.SaveAndReimport();
        return AssetDatabase.LoadAssetAtPath<Sprite>(path);
    }

    // ------------------------------------------------------------------ scene
    static Font font;
    static void BuildScene()
    {
        if(Application.isPlaying)throw new System.InvalidOperationException("Stop Play mode first");
        if(CatalogModels.Length==0)throw new System.InvalidOperationException(V.title+": catalog not chosen yet");
        if(AssetDatabase.LoadAssetAtPath<DecorItem>(Root+"Data/"+CatalogModels[0]+".asset")==null)ImportFurniture();
        if(AssetDatabase.LoadAssetAtPath<SceneAsset>(ScenePath)!=null)AssetDatabase.DeleteAsset(ScenePath);
        AssetDatabase.CopyAsset("Assets/Scenes/SampleScene.unity",ScenePath);
        EditorSceneManager.OpenScene(ScenePath,OpenSceneMode.Single);
        font=AssetDatabase.LoadAssetAtPath<Font>("Assets/_Playable/Fonts/FFFFORWA.ttf");

        var old=Object.FindFirstObjectByType<BedroomPlayable>();var rootGo=old.gameObject;rootGo.name="CEBB Living Room";
        var layout=Object.FindFirstObjectByType<BedroomLayout>();var oldPlayer=Object.FindFirstObjectByType<FirstPersonRoom>();
        var camera=layout.roomCamera;camera.transform.SetParent(rootGo.transform,false);
        // keep references from the bedroom controller
        var inv=old.inventory;var prompt=old.promptText;var timer=old.timerText;var count=old.countText;var hand=old.hand;var ctaRoot=old.ctaRoot;var ctaButton=old.ctaButton;
        var endRoot=old.endOverlayRoot;var endButton=old.endOverlayButton;var bgm=old.bgmSource;var bgmClip=old.bgmClip;var logo=old.logoImage;var sfxSource=old.placementAudio;var sfx=old.placementSfx;
        var ghostMat=old.ghostMaterial;var movePad=oldPlayer.movePad;var reticle=oldPlayer.reticle;
        var progress=old.progressFill!=null?old.progressFill.transform.parent.gameObject:null;var loop=old.lookTutorialLoop;var startSurface=old.startSurface;
        foreach(var n in new[]{"Closed home — four walls, ceiling and roof","Completed room preview — hidden in Play","Furniture placements — quantities come from these slots"}){var t=rootGo.transform.Find(n);if(t!=null)Object.DestroyImmediate(t.gameObject);}
        Object.DestroyImmediate(oldPlayer.gameObject);
        var lookOld=Object.FindFirstObjectByType<RoomLookSurface>();var lookGo=lookOld.gameObject;Object.DestroyImmediate(lookOld);
        Object.DestroyImmediate(old);
        if(progress!=null)progress.SetActive(false);if(loop!=null)loop.gameObject.SetActive(false);if(startSurface!=null)startSurface.gameObject.SetActive(false);

        // ---- materials for the room + outdoor
        var oakTex=AssetDatabase.LoadAssetAtPath<Texture2D>("Assets/_Playable/UI/OakPixels.png");
        var floor=V.kitchen?Mat("Floor tiles",Color.white,PixelTex("FloorTiles",new Color(.9f,.89f,.86f),.05f,5),new Vector2(10,9)):Mat("Floor light oak",new Color(.95f,.68f,.42f),oakTex,new Vector2(20,18));
        var wall=V.kitchen?Mat("Wall cream",new Color(.97f,.94f,.86f)):Mat("Wall white",new Color(.93f,.92f,.88f));var ceiling=Mat("Ceiling white",new Color(.96f,.95f,.92f));
        var frame=Mat("Window frame",new Color(.13f,.13f,.14f));var skirting=Mat("Skirting",new Color(.75f,.73f,.69f));
        var grass=Mat("Grass",Color.white,PixelTex("Grass",new Color(.36f,.68f,.2f),.13f,1),new Vector2(120,120));
        var leaves=Mat("Leaves",Color.white,PixelTex("Leaves",new Color(.2f,.55f,.13f),.2f,2),Vector2.one);
        var log=Mat("Log",Color.white,PixelTex("Log",new Color(.42f,.31f,.19f),.14f,3),Vector2.one);
        var stone=Mat("Patio stone",Color.white,PixelTex("Stone",new Color(.72f,.71f,.68f),.08f,4),new Vector2(12,4));
        var hillA=Mat("Hill near",new Color(.33f,.55f,.24f));var hillB=Mat("Hill far",new Color(.45f,.62f,.52f));var cloud=Mat("Cloud",Color.white);
        var water=new Material(Shader.Find("CEBB/Ghost Unlit"));water.name="LR Pool water";water.SetColor("_Color",new Color(.2f,.62f,.9f,.78f));water.renderQueue=3000;Save(water);
        var glass=new Material(Shader.Find("CEBB/Ghost Unlit"));glass.name="LR Window glass";glass.SetColor("_Color",new Color(.78f,.92f,1f,.13f));glass.renderQueue=3000;Save(glass);
        var ghostRed=new Material(Shader.Find("CEBB/Ghost Unlit"));ghostRed.name="LR Ghost blocked";ghostRed.SetColor("_Color",new Color(1f,.25f,.2f,.28f));ghostRed.renderQueue=3000;Save(ghostRed);
        var delMat=new Material(Shader.Find("CEBB/Ghost Unlit"));delMat.name="LR Delete marker";delMat.SetColor("_Color",new Color(1f,.2f,.15f,.22f));delMat.renderQueue=3001;Save(delMat);
        var ghost=new Material(Shader.Find("CEBB/Ghost Unlit"));ghost.name="LR Ghost";ghost.SetColor("_Color",new Color(.25f,.9f,1f,.3f));ghost.renderQueue=3000;Save(ghost);

        // ---- room: x -5..5, z -4.5..4.5, height 4. North (+z) and east (+x) walls are glass.
        var room=new GameObject("Living room — walls, glass, lights").transform;room.SetParent(rootGo.transform,false);
        Box("Floor",room,new Vector3(0,-.1f,0),new Vector3(10.4f,.2f,9.4f),floor);
        Box("Ceiling",room,new Vector3(0,4.1f,0),new Vector3(10.4f,.2f,9.4f),ceiling);
        Wall("South wall",room,new Vector3(0,2,-4.6f),new Vector3(10.4f,4.2f,.2f),wall);
        Wall("West wall",room,new Vector3(-5.1f,2,0),new Vector3(.2f,4.2f,9.4f),wall);
        if(V.kitchen)
        {
            // kitchen backsplash: glossy blue-grey tiles at worktop height on the two solid walls (visual only)
            var tiles=Mat("Backsplash tiles",Color.white,PixelTex("Backsplash",new Color(.62f,.78f,.84f),.05f,6),new Vector2(20,2));
            Box("South backsplash",room,new Vector3(0,1.35f,-4.485f),new Vector3(10f,.9f,.03f),tiles,false);
            var west=Box("West backsplash",room,new Vector3(-4.985f,1.35f,0),new Vector3(9f,.9f,.03f),tiles,false);west.transform.localEulerAngles=new Vector3(0,90,0);
        }
        Box("South skirting",room,new Vector3(0,.07f,-4.48f),new Vector3(10f,.14f,.05f),skirting,false);
        Box("West skirting",room,new Vector3(-4.98f,.07f,0),new Vector3(.05f,.14f,9f),skirting,false);
        GlassWall(room,"North glass",new Vector3(0,2,4.55f),true,10.2f,glass,frame);
        GlassWall(room,"East glass",new Vector3(5.05f,2,0),false,9.2f,glass,frame);
        Box("Ceiling trim north",room,new Vector3(0,3.95f,4.45f),new Vector3(10.2f,.1f,.12f),frame,false);
        Box("Ceiling trim east",room,new Vector3(4.95f,3.95f,0),new Vector3(.12f,.1f,9.2f),frame,false);
        var ceilingLight=AssetDatabase.LoadAssetAtPath<GameObject>(LivingRoot+"Prefabs/lr_ceiling_light.prefab");
        foreach(var p in new[]{new Vector3(-2.2f,4f-.88f,-1.2f),new Vector3(2.2f,4f-.88f,1.4f)}){var l=(GameObject)PrefabUtility.InstantiatePrefab(ceilingLight);l.transform.SetParent(room,false);l.transform.localPosition=p;}
        LightAt(room,"Ceiling light west",new Vector3(-2.2f,3.0f,-1.2f),.9f,new Color(1,.9f,.75f));
        LightAt(room,"Ceiling light east",new Vector3(2.2f,3.0f,1.4f),.9f,new Color(1,.9f,.75f));

        // ---- fake outdoor seen through the glass
        var outdoor=new GameObject("Outdoor — fake environment").transform;outdoor.SetParent(rootGo.transform,false);
        Box("Grass ground",outdoor,new Vector3(0,-.3f,0),new Vector3(160,.3f,160),grass,false);
        Box("Patio",outdoor,new Vector3(1.5f,-.12f,7.2f),new Vector3(13,.06f,5),stone,false);
        Box("Pool rim",outdoor,new Vector3(3f,-.1f,8.1f),new Vector3(7,.08f,3.2f),stone,false);
        Box("Pool water",outdoor,new Vector3(3f,-.06f,8.1f),new Vector3(6.4f,.02f,2.6f),water,false);
        var rng=new System.Random(7);
        Vector2[] trees={new Vector2(-6,12),new Vector2(-2,14),new Vector2(5,13.5f),new Vector2(10,10),new Vector2(9,4),new Vector2(11,-2),new Vector2(9.5f,-7),new Vector2(-9,9),new Vector2(14,6),new Vector2(1,19),new Vector2(-12,15),new Vector2(15,-5),new Vector2(8,18),new Vector2(-5,22),new Vector2(17,12)};
        foreach(var t in trees)Tree(outdoor,new Vector3(t.x,-.15f,t.y),3.2f+(float)rng.NextDouble()*2.2f,log,leaves);
        for(int i=0;i<9;i++){float a=Mathf.Lerp(-35,110,i/8f)*Mathf.Deg2Rad;float d=48+(float)rng.NextDouble()*14;float w=18+(float)rng.NextDouble()*14,h=6+(float)rng.NextDouble()*9;
            var hill=Box("Hill",outdoor,new Vector3(Mathf.Sin(a)*d,h*.5f-.5f,Mathf.Cos(a)*d),new Vector3(w,h,w),i%2==0?hillA:hillB,false);hill.transform.localEulerAngles=new Vector3(0,(float)rng.NextDouble()*90,0);
            Box("Hill top",outdoor,hill.transform.localPosition+new Vector3(0,h*.5f+1.5f,0),new Vector3(w*.55f,3,w*.55f),i%2==0?hillA:hillB,false).transform.localEulerAngles=hill.transform.localEulerAngles;}
        for(int i=0;i<7;i++){float a=Mathf.Lerp(-40,110,i/6f)*Mathf.Deg2Rad;float d=30+(float)rng.NextDouble()*25;Box("Cloud",outdoor,new Vector3(Mathf.Sin(a)*d,22+(float)rng.NextDouble()*8,Mathf.Cos(a)*d),new Vector3(8+(float)rng.NextDouble()*6,1.2f,4+(float)rng.NextDouble()*3),cloud,false);}
        var sun=GameObject.Find("Directional Light");if(sun!=null){sun.transform.rotation=Quaternion.Euler(42,215,0);var sl=sun.GetComponent<Light>();sl.intensity=1.6f;sl.color=new Color(1,.96f,.88f);}
        RenderSettings.ambientMode=UnityEngine.Rendering.AmbientMode.Flat;RenderSettings.ambientLight=new Color(.6f,.59f,.56f);
        camera.clearFlags=CameraClearFlags.SolidColor;camera.backgroundColor=new Color(.58f,.8f,.96f);camera.farClipPlane=120;

        // ---- game objects
        var placedRoot=new GameObject("Placed furniture (pooled)").transform;placedRoot.SetParent(rootGo.transform,false);
        var foot=GameObject.CreatePrimitive(PrimitiveType.Cube);foot.name="Footprint marker";Object.DestroyImmediate(foot.GetComponent<Collider>());foot.transform.SetParent(rootGo.transform,false);foot.GetComponent<Renderer>().sharedMaterial=ghost;foot.GetComponent<Renderer>().shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;foot.SetActive(false);
        var marker=GameObject.CreatePrimitive(PrimitiveType.Cube);marker.name="Delete marker";Object.DestroyImmediate(marker.GetComponent<Collider>());marker.transform.SetParent(rootGo.transform,false);marker.GetComponent<Renderer>().sharedMaterial=delMat;marker.GetComponent<Renderer>().shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;marker.SetActive(false);
        var game=rootGo.AddComponent<LivingRoomPlayable>();
        var rig=new GameObject("Player — joystick or WASD, drag to look");rig.transform.SetParent(rootGo.transform,false);var player=rig.AddComponent<LivingRoomPlayer>();
        player.game=game;player.playerCamera=camera;player.movePad=movePad;player.spawnPosition=new Vector3(0,0,-3.3f);player.yaw=0;player.pitch=22;rig.transform.position=player.spawnPosition;camera.transform.SetParent(rig.transform,false);player.ApplyView();
        lookGo.AddComponent<LivingRoomLookSurface>().player=player;
        game.player=player;game.roomRoot=room;game.placedRoot=placedRoot;game.ghostMaterial=ghost;game.ghostInvalidMaterial=ghostRed;game.deleteMarker=marker.transform;game.footprintMarker=foot.transform;
        game.firstEntry=V.first;game.guideEntry=V.guide;game.firstPrompt=V.firstPrompt;
        game.promptText=prompt;game.countText=count;game.hand=hand;game.ctaButton=ctaButton;
        var luna=rootGo.AddComponent<LunaController>();luna.game=game;luna.ctaOverlay=endButton;luna.timerText=timer;luna.timeLimit=30;luna.itemsToEnd=5;luna.clicksToEnd=0;game.luna=luna;
        game.bgmSource=bgm;game.bgmClip=bgmClip;luna.logoImage=logo;if(logo!=null){var tight=TightLogo();if(tight!=null){logo.sprite=tight;logo.preserveAspect=true;luna.gameLogo=tight.texture;}}game.placementAudio=sfxSource;game.placementSfx=sfx;game.reticle=reticle;

        // ---- catalog: reuse the 12 hotbar slots
        for(int i=CatalogModels.Length;i<inv.Length;i++)inv[i].button.gameObject.SetActive(false); // fewer than 12 items
        game.catalog=new DecorCatalogEntry[CatalogModels.Length];
        for(int i=0;i<CatalogModels.Length;i++)
        {
            var item=AssetDatabase.LoadAssetAtPath<DecorItem>(Root+"Data/"+CatalogModels[i]+".asset");var e=inv[i];
            e.button.gameObject.name=item.displayName;e.icon.sprite=item.icon;e.icon.preserveAspect=true;
            var nameT=e.button.transform.Find("Name");TextMeshProUGUI nameText=nameT!=null?nameT.GetComponent<TextMeshProUGUI>():null;if(nameText!=null)nameText.text=item.displayName.ToUpperInvariant();
            if(e.quantityText!=null)e.quantityText.text="x"+item.quantity;if(e.emptyBadge!=null)e.emptyBadge.SetActive(false);
            game.catalog[i]=new DecorCatalogEntry{item=item,button=e.button,frame=e.frame,icon=e.icon,quantityText=e.quantityText,nameText=nameText,emptyBadge=e.emptyBadge};
        }
        // ---- HUD: BUILD (right side, mirrors the move joystick), trash above it, Play Now under the stats
        var canvas=prompt.canvas.transform;var catalogRect=layout.catalog;var circle=AssetDatabase.LoadAssetAtPath<Sprite>("Assets/_Playable/UI/MoveCircle.png");
        var buildIcon=UiSprite("BuildButtonIcon");var trashIcon=UiSprite("DemolishButtonIcon");var rotateIcon=UiSprite("RotateButtonIcon");
        var build=Panel("BUILD button",catalogRect,Color.white);build.sprite=buildIcon;build.preserveAspect=true;build.raycastTarget=true;build.gameObject.AddComponent<LayoutElement>().ignoreLayout=true;
        var br=build.rectTransform;br.anchorMin=br.anchorMax=new Vector2(1,1);br.pivot=new Vector2(1,0);br.sizeDelta=new Vector2(260,260);br.anchoredPosition=new Vector2(-25,150);
        var buildBtn=build.gameObject.AddComponent<Button>();buildBtn.targetGraphic=build;
        var trash=Panel("Trash button",catalogRect,Color.white);trash.sprite=trashIcon;trash.preserveAspect=true;trash.raycastTarget=true;trash.gameObject.AddComponent<LayoutElement>().ignoreLayout=true;
        var tr=trash.rectTransform;tr.anchorMin=tr.anchorMax=new Vector2(1,1);tr.pivot=new Vector2(1,0);tr.sizeDelta=new Vector2(160,160);tr.anchoredPosition=new Vector2(-75,430);
        var trashBtn=trash.gameObject.AddComponent<Button>();trashBtn.targetGraphic=trash;
        var rot=Panel("Rotate button",catalogRect,Color.white);rot.sprite=rotateIcon;rot.preserveAspect=true;rot.raycastTarget=true;rot.gameObject.AddComponent<LayoutElement>().ignoreLayout=true;
        var rr=rot.rectTransform;rr.anchorMin=rr.anchorMax=new Vector2(1,1);rr.pivot=new Vector2(1,0);rr.sizeDelta=new Vector2(140,140);rr.anchoredPosition=new Vector2(-300,190);
        var rotBtn=rot.gameObject.AddComponent<Button>();rotBtn.targetGraphic=rot;
        game.rotateButton=rotBtn;
        game.buildButton=buildBtn;game.buildFill=build;game.buildLabel=null;game.trashButton=trashBtn;game.trashImage=trash;
        if(ctaRoot!=null)
        {
            ctaRoot.SetActive(true);var le=ctaRoot.GetComponent<LayoutElement>();if(le==null)le=ctaRoot.AddComponent<LayoutElement>();le.ignoreLayout=true;var cr=ctaRoot.GetComponent<RectTransform>();var statsT=canvas.Find("Stats");cr.SetParent(statsT!=null?statsT:canvas,false);cr.anchorMin=new Vector2(0,-.95f);cr.anchorMax=new Vector2(1,-.12f);cr.offsetMin=cr.offsetMax=Vector2.zero;
            var img=ctaRoot.GetComponent<Image>();if(img!=null)img.preserveAspect=true;
            var ctaText=ctaRoot.GetComponentInChildren<TextMeshProUGUI>(true);if(ctaText!=null){ctaText.text="PLAY NOW";ctaText.font=TmpSceneMigration.GetFont(font);ctaText.enableAutoSizing=false;ctaText.fontSize=34;ctaText.enableWordWrapping=false;ctaText.overflowMode=TextOverflowModes.Overflow;ctaText.alignment=TextAlignmentOptions.Center;var rt=ctaText.rectTransform;rt.anchorMin=new Vector2(.1f,.12f);rt.anchorMax=new Vector2(.9f,.88f);rt.offsetMin=rt.offsetMax=Vector2.zero;if(ctaText.GetComponent<Outline>()==null)ctaText.gameObject.AddComponent<Outline>().effectDistance=new Vector2(2,-2);}
        }
        if(movePad!=null){var ml=movePad.transform.Find("Move label");if(ml!=null)ml.gameObject.SetActive(false);}
        game.lookGuideRadius=new Vector2(170,59.5f);game.lookGuide=InfinityGuide(canvas,game.lookGuideRadius);
        if(hand!=null){hand.gameObject.SetActive(true);hand.SetParent(canvas,false);hand.SetAsLastSibling();}
        prompt.fontSize=40;prompt.fontSizeMax=40;prompt.text=game.firstPrompt;count.text="BUILT 0";
        var logoHolder=canvas.Find("Logo");if(logoHolder!=null)logoHolder.gameObject.SetActive(false);
        layout.firstPersonMode=true;EditorUtility.SetDirty(layout);SetLayer(canvas);layout.ApplyLayout(9f/16f);player.ApplyView();
        EditorUtility.SetDirty(game);EditorUtility.SetDirty(player);
        EditorSceneManager.MarkSceneDirty(UnityEngine.SceneManagement.SceneManager.GetActiveScene());EditorSceneManager.SaveScene(UnityEngine.SceneManagement.SceneManager.GetActiveScene());
        Selection.activeGameObject=rootGo;Debug.Log("[CEBB] "+V.title+" scene built: "+ScenePath);
    }

    // ------------------------------------------------------------------ helpers
    static void Folder(string path){if(AssetDatabase.IsValidFolder(path))return;string parent=Path.GetDirectoryName(path).Replace('\\','/');Folder(parent);AssetDatabase.CreateFolder(parent,Path.GetFileName(path));}
    static void Save(Material m){string p=Root+"Materials/"+m.name+".mat";if(AssetDatabase.LoadAssetAtPath<Material>(p)!=null)AssetDatabase.DeleteAsset(p);AssetDatabase.CreateAsset(m,p);}
    static Material Mat(string name,Color color,Texture tex=null,Vector2? tiling=null)
    {
        var m=new Material(Shader.Find("CEBB/Scene Unlit"));m.name="LR "+name;m.color=color;
        if(tex!=null){m.mainTexture=tex;var s=tiling??Vector2.one;m.mainTextureScale=s;}
        Save(m);return m;
    }
    // 16x16 noisy Minecraft-style texture (style 1 grass, 2 leaves with holes darkened, 3 log, 4 stone)
    static Texture2D PixelTex(string name,Color baseColor,float noise,int style)
    {
        string path=Root+"Textures/"+name+".png";var tex=new Texture2D(16,16,TextureFormat.RGBA32,false);var r=new System.Random(name.GetHashCode());
        for(int y=0;y<16;y++)for(int x=0;x<16;x++)
        {
            float v=1+((float)r.NextDouble()*2-1)*noise;if(style==2&&r.NextDouble()<.18)v*=.6f;if(style==3&&(x%4==0))v*=.82f;if(style==4&&(x==0||y%8==0))v*=.86f;if(style==5){v=((x/8+y/8)%2==0)?1f:.82f;if(x%8==0||y%8==0)v*=.9f;}if(style==6&&(x%8==0||y%8==0))v*=.75f;
            tex.SetPixel(x,y,new Color(baseColor.r*v,baseColor.g*v,baseColor.b*v,1));
        }
        tex.Apply();File.WriteAllBytes(path,tex.EncodeToPNG());Object.DestroyImmediate(tex);AssetDatabase.ImportAsset(path);
        var ti=(TextureImporter)AssetImporter.GetAtPath(path);ti.filterMode=FilterMode.Point;ti.mipmapEnabled=false;ti.wrapMode=TextureWrapMode.Repeat;ti.textureCompression=TextureImporterCompression.Uncompressed;ti.SaveAndReimport();
        return AssetDatabase.LoadAssetAtPath<Texture2D>(path);
    }
    static Sprite TrashSprite()
    {
        string path=Root+"Textures/TrashIcon.png";var existing=AssetDatabase.LoadAssetAtPath<Sprite>(path);if(existing!=null)return existing;
        var tex=new Texture2D(32,32,TextureFormat.RGBA32,false);
        for(int y=0;y<32;y++)for(int x=0;x<32;x++)
        {
            bool lid=y>=24&&y<=26&&x>=5&&x<=26,handle=y>=27&&y<=29&&x>=12&&x<=19&&!(y<=28&&x>=14&&x<=17);
            bool body=y>=3&&y<=22&&x>=8&&x<=23&&!(y>=6&&y<=19&&(x==11||x==12||x==15||x==16||x==19||x==20));
            tex.SetPixel(x,y,lid||handle||body?Color.white:Color.clear);
        }
        tex.Apply();File.WriteAllBytes(path,tex.EncodeToPNG());Object.DestroyImmediate(tex);AssetDatabase.ImportAsset(path);
        var ti=(TextureImporter)AssetImporter.GetAtPath(path);ti.textureType=TextureImporterType.Sprite;ti.spriteImportMode=SpriteImportMode.Single;ti.filterMode=FilterMode.Point;ti.mipmapEnabled=false;ti.alphaIsTransparency=true;ti.SaveAndReimport();
        return AssetDatabase.LoadAssetAtPath<Sprite>(path);
    }
    // Button icons taken from the AutoBuildHalloween reference playable (Assets/_Playable/LivingRoom/UI).
    static Sprite UiSprite(string name)
    {
        string path=SharedUI+name+".png";var ti=(TextureImporter)AssetImporter.GetAtPath(path);
        if(ti!=null&&(ti.textureType!=TextureImporterType.Sprite||ti.mipmapEnabled)){ti.textureType=TextureImporterType.Sprite;ti.spriteImportMode=SpriteImportMode.Single;ti.mipmapEnabled=false;ti.alphaIsTransparency=true;ti.SaveAndReimport();}
        return AssetDatabase.LoadAssetAtPath<Sprite>(path);
    }
    // Green infinity loop (64 short segments), same construction as the reference playable's look guide.
    // One anti-aliased image (UI/LookGuideInfinity.png, 680x264, curve radius 320x112 px) scaled so the curve matches `radius`.
    static RectTransform InfinityGuide(Transform canvas,Vector2 radius)
    {
        var img=Panel("Look guide — infinity loop",canvas,Color.white);img.sprite=UiSprite("LookGuideInfinity");var root=img.rectTransform;
        root.anchorMin=root.anchorMax=root.pivot=new Vector2(.5f,.5f);float k=radius.x/320f;root.sizeDelta=new Vector2(680*k,264*k);
        root.gameObject.SetActive(false);return root;
    }
    // Game logo with transparent padding trimmed, saved as a real texture so the Luna "Game logo" field has a matching default.
    static Sprite TightLogo()
    {
        string src="Assets/_Playable/UI/Logo.png",dst=SharedUI+"GameLogo.png";
        if(AssetDatabase.LoadAssetAtPath<Sprite>(dst)==null)
        {
            if(!File.Exists(src))return null;var t=new Texture2D(2,2);t.LoadImage(File.ReadAllBytes(src));var px=t.GetPixels32();int minX=t.width,minY=t.height,maxX=0,maxY=0;
            for(int y=0;y<t.height;y++)for(int x=0;x<t.width;x++)if(px[y*t.width+x].a>20){minX=Mathf.Min(minX,x);minY=Mathf.Min(minY,y);maxX=Mathf.Max(maxX,x);maxY=Mathf.Max(maxY,y);}
            var crop=new Texture2D(maxX-minX+1,maxY-minY+1,TextureFormat.RGBA32,false);crop.SetPixels(t.GetPixels(minX,minY,crop.width,crop.height));crop.Apply();
            File.WriteAllBytes(dst,crop.EncodeToPNG());Object.DestroyImmediate(t);Object.DestroyImmediate(crop);AssetDatabase.ImportAsset(dst);
        }
        return UiSprite("GameLogo");
    }
    static Sprite RotateSprite()
    {
        string path=Root+"Textures/RotateIcon.png";var existing=AssetDatabase.LoadAssetAtPath<Sprite>(path);if(existing!=null)return existing;
        var tex=new Texture2D(32,32,TextureFormat.RGBA32,false);Vector2 c=new Vector2(15.5f,15.5f);
        Vector2 Dir(float deg){return new Vector2(Mathf.Cos(deg*Mathf.Deg2Rad),Mathf.Sin(deg*Mathf.Deg2Rad));}
        Vector2 A=c+Dir(50)*15.5f,B=c+Dir(50)*5f,C=c+Dir(5)*10.5f;
        for(int y=0;y<32;y++)for(int x=0;x<32;x++)
        {
            Vector2 p=new Vector2(x,y),d=p-c;float r=d.magnitude,a=Mathf.Repeat(Mathf.Atan2(d.y,d.x)*Mathf.Rad2Deg,360f);
            bool ring=r>=7.5f&&r<=12f&&a>=55f;
            float s1=(B.x-A.x)*(p.y-A.y)-(B.y-A.y)*(p.x-A.x),s2=(C.x-B.x)*(p.y-B.y)-(C.y-B.y)*(p.x-B.x),s3=(A.x-C.x)*(p.y-C.y)-(A.y-C.y)*(p.x-C.x);
            bool arrow=(s1>=0&&s2>=0&&s3>=0)||(s1<=0&&s2<=0&&s3<=0);
            tex.SetPixel(x,y,ring||arrow?Color.white:Color.clear);
        }
        tex.Apply();File.WriteAllBytes(path,tex.EncodeToPNG());Object.DestroyImmediate(tex);AssetDatabase.ImportAsset(path);
        var ti=(TextureImporter)AssetImporter.GetAtPath(path);ti.textureType=TextureImporterType.Sprite;ti.spriteImportMode=SpriteImportMode.Single;ti.filterMode=FilterMode.Point;ti.mipmapEnabled=false;ti.alphaIsTransparency=true;ti.SaveAndReimport();
        return AssetDatabase.LoadAssetAtPath<Sprite>(path);
    }
    static GameObject Box(string name,Transform parent,Vector3 position,Vector3 size,Material mat,bool collider=true)
    {var go=GameObject.CreatePrimitive(PrimitiveType.Cube);go.name=name;go.transform.SetParent(parent,false);go.transform.localPosition=position;go.transform.localScale=size;go.GetComponent<Renderer>().sharedMaterial=mat;if(!collider)Object.DestroyImmediate(go.GetComponent<Collider>());return go;}
    static void Wall(string name,Transform parent,Vector3 position,Vector3 size,Material mat){Box(name,parent,position,size,mat).AddComponent<PlacementSurface>();}
    // Floor-to-ceiling glass with dark mullions; one thin collider blocks walking and catches the aim ray.
    static void GlassWall(Transform room,string name,Vector3 centre,bool alongX,float length,Material glass,Material frame)
    {
        var holder=new GameObject(name).transform;holder.SetParent(room,false);holder.localPosition=centre;
        Vector3 Along(float a,float h,float d){return alongX?new Vector3(a,h,d):new Vector3(d,h,a);}
        var pane=Box("Glass",holder,Vector3.zero,Along(length,4.2f,.04f),glass,true);pane.GetComponent<Renderer>().shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;
        Box("Bottom frame",holder,Along(0,-1.97f,0),Along(length,.12f,.14f),frame,false);
        Box("Top frame",holder,Along(0,1.93f,0),Along(length,.14f,.14f),frame,false);
        int panels=Mathf.RoundToInt(length/2.5f);for(int i=0;i<=panels;i++){float a=-length*.5f+length*i/panels;Box("Mullion",holder,Along(a,0,0),Along(.1f,4.1f,.12f),frame,false);}
    }
    static void Tree(Transform parent,Vector3 basePos,float height,Material log,Material leaves)
    {
        var t=new GameObject("Tree").transform;t.SetParent(parent,false);t.localPosition=basePos;
        Box("Trunk",t,new Vector3(0,height*.5f,0),new Vector3(.5f,height,.5f),log,false);
        Box("Leaves",t,new Vector3(0,height,0),new Vector3(3,1.6f,3),leaves,false);
        Box("Leaves top",t,new Vector3(0,height+1.2f,0),new Vector3(1.9f,1f,1.9f),leaves,false);
    }
    static void LightAt(Transform root,string name,Vector3 p,float intensity,Color color)
    {var go=new GameObject(name,typeof(Light));go.transform.SetParent(root,false);go.transform.localPosition=p;var l=go.GetComponent<Light>();l.type=LightType.Point;l.range=7;l.intensity=intensity;l.color=color;l.shadows=LightShadows.None;}
    static Image Panel(string name,Transform parent,Color color)
    {var go=new GameObject(name,typeof(RectTransform),typeof(Image));go.transform.SetParent(parent,false);var image=go.GetComponent<Image>();image.color=color;image.raycastTarget=false;return image;}
    static TextMeshProUGUI Label(string name,Transform parent,string value,int size)
    {var go=new GameObject(name,typeof(RectTransform),typeof(TextMeshProUGUI));go.transform.SetParent(parent,false);var t=go.GetComponent<TextMeshProUGUI>();t.font=TmpSceneMigration.GetFont(font);t.text=value;t.fontSize=size;t.color=Color.white;t.alignment=TextAlignmentOptions.Center;t.enableAutoSizing=true;t.fontSizeMin=14;t.fontSizeMax=size;t.raycastTarget=false;go.AddComponent<Outline>().effectDistance=new Vector2(2,-2);return t;}
    static void Anchors(RectTransform r,Vector2 min,Vector2 max){r.anchorMin=min;r.anchorMax=max;r.offsetMin=r.offsetMax=Vector2.zero;}
    static void SetLayer(Transform t){t.gameObject.layer=5;foreach(Transform child in t)SetLayer(child);}
}
#endif
