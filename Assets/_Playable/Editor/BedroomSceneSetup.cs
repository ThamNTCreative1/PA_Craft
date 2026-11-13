#if UNITY_EDITOR
using System;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEngine.EventSystems;
using CEBB.Playable;

public static class BedroomSceneSetup
{
    private const string Root = "Assets/_Playable/";
    private static Font font;
    private static Material[] furnitureMaterials;
    private static Color Ink = new Color(0.13f, 0.17f, 0.21f);

    [MenuItem("Tools/CEBB/Setup Bedroom")]
    public static void Setup()
    {
        if (Application.isPlaying) throw new InvalidOperationException("Stop Play mode first.");
        var active = UnityEngine.SceneManagement.SceneManager.GetActiveScene();
        if (active.path == "") EditorSceneManager.SaveScene(active, "Assets/Scenes/BeforeBedroomSetup.unity");
        else if (active.isDirty) EditorSceneManager.SaveScene(active);
        EditorSceneManager.OpenScene("Assets/Scenes/SampleScene.unity");
        foreach (var existing in UnityEngine.SceneManagement.SceneManager.GetActiveScene().GetRootGameObjects())
            if (existing.name == "CEBB Bedroom") throw new InvalidOperationException("Bedroom already exists; edit Inspector or use Undo.");
        var sceneRoot = new GameObject("CEBB Bedroom");
        foreach (var c in Camera.allCameras) c.gameObject.SetActive(false);
        font = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");
        foreach (string folder in new[] {"Prefabs","Data","Materials","Icons"})
            if (!AssetDatabase.IsValidFolder(Root + folder)) AssetDatabase.CreateFolder("Assets/_Playable", folder);
        ImportUi();
        furnitureMaterials = new Material[12];
        for (int i = 0; i < 12; i++)
        {
            var tex = AssetDatabase.LoadAssetAtPath<Texture2D>("Assets/Outsources/noithat/textures/gltf_embedded_" + i + ".png");
            furnitureMaterials[i] = MakeMaterial("Furniture_" + i, Color.white, tex);
            furnitureMaterials[i].SetFloat("_Cull", 0);
        }
        var room = new GameObject("Bedroom shell").transform; room.SetParent(sceneRoot.transform);
        var floor = MakeMaterial("Oak floor", new Color(0.74f, 0.55f, 0.36f), AssetDatabase.LoadAssetAtPath<Texture2D>(Root + "UI/Wood.png"));
        var wall = MakeMaterial("Warm plaster", new Color(0.89f, 0.85f, 0.75f));
        var trim = MakeMaterial("Dark oak trim", new Color(0.27f, 0.19f, 0.13f));
        var glass = MakeMaterial("Window sky", new Color(0.47f, 0.77f, 0.91f));
        var leaf = MakeMaterial("Plant leaves", new Color(0.29f, 0.49f, 0.2f));
        var pot = MakeMaterial("Terracotta", new Color(0.59f, 0.31f, 0.19f));
        Cube("Floor", room, new Vector3(0,-0.17f,0), new Vector3(7.4f,0.32f,6.6f), floor);
        // Individual planks preserve the voxel look using the supplied texture.
        for (int x=0;x<9;x++) for(int z=0;z<8;z++) Cube("Oak plank",room,new Vector3(-3.2f+x*.8f,0,z*.8f-2.8f),new Vector3(.785f,.025f,.785f),floor);
        Cube("Back wall",room,new Vector3(0,1.55f,3.2f),new Vector3(7.4f,3.1f,.2f),wall);
        Cube("Left wall",room,new Vector3(-3.6f,1.55f,0),new Vector3(.2f,3.1f,6.6f),wall);
        Cube("Back skirting",room,new Vector3(0,.15f,3.05f),new Vector3(7.2f,.3f,.13f),trim);
        Cube("Left skirting",room,new Vector3(-3.45f,.15f,0),new Vector3(.13f,.3f,6.4f),trim);
        Cube("Wall crown",room,new Vector3(0,3.05f,3.05f),new Vector3(7.4f,.15f,.32f),trim);
        Cube("Window frame",room,new Vector3(-3.43f,1.9f,-.7f),new Vector3(.12f,1.6f,2.3f),trim);
        Cube("Window",room,new Vector3(-3.34f,1.9f,-.7f),new Vector3(.08f,1.34f,2.03f),glass);
        Cube("Window cross horizontal",room,new Vector3(-3.27f,1.9f,-.7f),new Vector3(.1f,.10f,2.1f),wall);
        Cube("Window cross vertical",room,new Vector3(-3.27f,1.9f,-.7f),new Vector3(.1f,1.4f,.1f),wall);
        Cube("Window sill",room,new Vector3(-3.25f,1.15f,-.7f),new Vector3(.5f,.12f,2.6f),trim);
        Cube("Planter",room,new Vector3(2.9f,.23f,-2.5f),new Vector3(.48f,.46f,.48f),pot);
        Cube("Plant trunk",room,new Vector3(2.9f,.6f,-2.5f),new Vector3(.12f,.65f,.12f),trim);
        Cube("Plant foliage",room,new Vector3(2.9f,1f,-2.5f),new Vector3(.8f,.75f,.8f),leaf);
        var bg = NewCamera("Backdrop camera",sceneRoot.transform,-10,0); bg.backgroundColor = new Color(.64f,.79f,.87f);
        var cam = NewCamera("Room Camera",sceneRoot.transform,0,~(1<<5));cam.clearFlags=CameraClearFlags.Depth;cam.orthographic=true;
        cam.gameObject.tag="MainCamera";cam.gameObject.AddComponent<AudioListener>();
        var uiCam=NewCamera("UI camera",sceneRoot.transform,10,1<<5);uiCam.clearFlags=CameraClearFlags.Depth;uiCam.orthographic=true;
        var canvasGo=new GameObject("Playable UI",typeof(RectTransform),typeof(Canvas),typeof(CanvasScaler),typeof(GraphicRaycaster));canvasGo.transform.SetParent(sceneRoot.transform);
        var canvas=canvasGo.GetComponent<Canvas>();canvas.renderMode=RenderMode.ScreenSpaceCamera;canvas.worldCamera=uiCam;canvas.planeDistance=2;canvas.sortingOrder=200;
        var scaler=canvasGo.GetComponent<CanvasScaler>();scaler.uiScaleMode=CanvasScaler.ScaleMode.ScaleWithScreenSize;scaler.referenceResolution=new Vector2(1080,1920);scaler.matchWidthOrHeight=.5f;
        var es=UnityEngine.Object.FindFirstObjectByType<EventSystem>();if(es==null){var eventGo=new GameObject("UI EventSystem",typeof(EventSystem),typeof(StandaloneInputModule));eventGo.transform.SetParent(sceneRoot.transform);}
        var manager=sceneRoot.AddComponent<BedroomPlayable>();
        var start=Panel("Tap anywhere to start",canvasGo.transform,new Color(1,1,1,.001f));Stretch(start);start.raycastTarget=true;manager.startSurface=start.gameObject.AddComponent<Button>();
        var header=Panel("Logo",canvasGo.transform,Color.white);header.sprite=SpriteAt("Logo");header.preserveAspect=true;
        var prompt=Label("Tutorial prompt",canvasGo.transform,"Tap to build",62,Color.white);prompt.gameObject.AddComponent<Outline>().effectDistance=new Vector2(3,-3);manager.promptText=prompt;
        var stats=Panel("Stats",canvasGo.transform,new Color(.1f,.15f,.17f,.8f));SetAnchors(stats.rectTransform,new Vector2(.67f,.88f),new Vector2(.96f,.975f));
        manager.timerText=Label("Timer",stats.transform,"30s",46,Color.white);SetAnchors(manager.timerText.rectTransform,new Vector2(0,.5f),Vector2.one);
        manager.countText=Label("Count",stats.transform,"COUNT  0",29,new Color(1,.86f,.35f));SetAnchors(manager.countText.rectTransform,Vector2.zero,new Vector2(1,.5f));
        var progress=Panel("Progress",canvasGo.transform,new Color(.12f,.2f,.21f,.85f));
        manager.progressFill=Panel("Fill",progress.transform,new Color(.37f,.76f,.32f));Stretch(manager.progressFill);manager.progressFill.type=Image.Type.Filled;manager.progressFill.fillMethod=Image.FillMethod.Horizontal;manager.progressFill.fillAmount=0;
        manager.progressText=Label("Progress count",progress.transform,"0 / 12",28,Color.white);Stretch(manager.progressText.rectTransform);
        var catalog=Panel("Furniture catalog",canvasGo.transform,new Color(.1f,.15f,.18f,.9f));
        var grid=catalog.gameObject.AddComponent<GridLayoutGroup>();grid.constraint=GridLayoutGroup.Constraint.FixedColumnCount;grid.constraintCount=6;grid.spacing=new Vector2(8,8);grid.padding=new RectOffset(16,16,10,10);grid.childAlignment=TextAnchor.MiddleCenter;
        var cta=Panel("Play Now CTA",canvasGo.transform,Color.white);cta.sprite=SpriteAt("PlayButton");manager.ctaRoot=cta.gameObject;manager.ctaButton=cta.gameObject.AddComponent<Button>();cta.raycastTarget=true;
        var ctaLabel=Label("Play Now",cta.transform,"PLAY NOW",56,Color.white);Stretch(ctaLabel.rectTransform);ctaLabel.gameObject.AddComponent<Outline>().effectDistance=new Vector2(2,-2);
        string[] modelNames={"bed_100","nightstand_77","cabinet_10","cabinetopen_55","sideboard_64","lamp_167","carpet_171","riail_155","picture2x1_83","clocl_91","picture1x1_177","mirror_183"};
        string[] names={"Bed","Nightstand","Wardrobe","Bookshelf","Dresser","Lamp","Rug","Clothes rail","Painting","Clock","Picture","Mirror"};
        Vector3[] positions={new Vector3(.3f,.04f,-.4f),new Vector3(-1.1f,.04f,.4f),new Vector3(-2.3f,.04f,2.45f),new Vector3(-.15f,.04f,2.45f),new Vector3(2.1f,.04f,2.45f),new Vector3(-1.1f,1.045f,.4f),new Vector3(.2f,.045f,-2.05f),new Vector3(-2.7f,.04f,-2.25f),new Vector3(1.85f,1.6f,3.04f),new Vector3(-.3f,2.1f,3.04f),new Vector3(-2.35f,2.15f,3.04f),new Vector3(3.02f,1.4f,3.04f)};
        var anchors=new GameObject("Build slots — move and rotate in Inspector").transform;anchors.SetParent(sceneRoot.transform);
        manager.slots=new FurnitureSlot[modelNames.Length];
        for(int i=0;i<modelNames.Length;i++)
        {
            string modelPath=Root+"Models/"+modelNames[i]+".obj";
            var importer=(ModelImporter)AssetImporter.GetAtPath(modelPath);importer.globalScale=1;importer.materialImportMode=ModelImporterMaterialImportMode.ImportStandard;importer.SaveAndReimport();
            var source=AssetDatabase.LoadAssetAtPath<GameObject>(modelPath);var instance=(GameObject)PrefabUtility.InstantiatePrefab(source);
            instance.name=names[i];
            foreach(var renderer in instance.GetComponentsInChildren<Renderer>())
            {
                var mats=renderer.sharedMaterials;
                for(int k=0;k<mats.Length;k++){int matIndex=0;if(mats[k]!=null)int.TryParse(mats[k].name.Replace("Furniture_", ""),out matIndex);mats[k]=furnitureMaterials[Mathf.Clamp(matIndex,0,11)];}
                renderer.sharedMaterials=mats;
            }
            var prefab=PrefabUtility.SaveAsPrefabAsset(instance,Root+"Prefabs/"+modelNames[i]+".prefab");UnityEngine.Object.DestroyImmediate(instance);
            var definition=ScriptableObject.CreateInstance<FurnitureDefinition>();definition.furnitureId=modelNames[i];definition.displayName=names[i];definition.prefab=prefab;
            definition.icon=CaptureIcon(prefab,modelNames[i]);AssetDatabase.CreateAsset(definition,Root+"Data/"+modelNames[i]+".asset");
            var anchor=new GameObject((i+1).ToString("00")+" "+names[i]).transform;anchor.SetParent(anchors);anchor.localPosition=positions[i];
            var cell=Panel(names[i],catalog.transform,Color.white);cell.sprite=SpriteAt("ItemFrame");cell.type=Image.Type.Sliced;cell.raycastTarget=true;var button=cell.gameObject.AddComponent<Button>();
            var icon=Panel("Furniture icon",cell.transform,Color.white);SetAnchors(icon.rectTransform,new Vector2(.1f,.22f),new Vector2(.9f,.96f));icon.sprite=definition.icon;icon.preserveAspect=true;
            var title=Label("Name",cell.transform,names[i],19,Ink);SetAnchors(title.rectTransform,new Vector2(.03f,.03f),new Vector2(.97f,.23f));
            var badge=Panel("Built badge",cell.transform,new Color(.2f,.63f,.29f));SetAnchors(badge.rectTransform,new Vector2(.63f,.66f),new Vector2(.97f,.97f));var badgeText=Label("Done",badge.transform,"OK",20,Color.white);Stretch(badgeText.rectTransform);badge.gameObject.SetActive(false);
            manager.slots[i]=new FurnitureSlot{definition=definition,anchor=anchor,buildOrder=i,button=button,frame=cell,builtBadge=badge.gameObject,localScale=Vector3.one};
        }
        var hand=Panel("Tutorial hand",manager.slots[0].button.transform,Color.white);hand.sprite=SpriteAt("Hand");hand.preserveAspect=true;hand.rectTransform.sizeDelta=new Vector2(90,100);hand.rectTransform.anchorMin=hand.rectTransform.anchorMax=new Vector2(.65f,.1f);hand.rectTransform.anchoredPosition=Vector2.zero;manager.hand=hand.rectTransform;
        manager.slots[0].frame.color=new Color(1,.85f,.25f);
        var layout=bg.gameObject.AddComponent<BedroomLayout>();layout.canvas=canvas;layout.roomCamera=cam;layout.catalog=catalog.rectTransform;layout.grid=grid;layout.header=header.rectTransform;layout.prompt=prompt.rectTransform;layout.cta=cta.rectTransform;layout.progress=progress.rectTransform;
        SetUiLayer(canvasGo.transform);layout.ApplyLayout(9f/16f);
        EditorUtility.SetDirty(manager);AssetDatabase.SaveAssets();EditorSceneManager.SaveScene(UnityEngine.SceneManagement.SceneManager.GetActiveScene());
        Selection.activeGameObject=sceneRoot;SceneView.RepaintAll();Debug.Log("[CEBB] Bedroom setup complete. CTA Count threshold = 0.");
    }

    private static Camera NewCamera(string name,Transform parent,float depth,int mask)
    {var go=new GameObject(name,typeof(Camera));go.transform.SetParent(parent);var c=go.GetComponent<Camera>();c.depth=depth;c.cullingMask=mask;c.clearFlags=CameraClearFlags.SolidColor;c.farClipPlane=100;c.nearClipPlane=.1f;return c;}
    private static void SetUiLayer(Transform t){t.gameObject.layer=5;foreach(Transform child in t)SetUiLayer(child);}
    private static Material MakeMaterial(string name,Color color,Texture texture=null)
    {var m=new Material(Shader.Find("CEBB/Scene Unlit"));m.name=name;m.color=color;if(texture!=null)m.mainTexture=texture;AssetDatabase.CreateAsset(m,Root+"Materials/"+name+".mat");return m;}
    private static void Cube(string name,Transform parent,Vector3 position,Vector3 scale,Material material)
    {var go=GameObject.CreatePrimitive(PrimitiveType.Cube);go.name=name;go.transform.SetParent(parent);go.transform.localPosition=position;go.transform.localScale=scale;go.GetComponent<Renderer>().sharedMaterial=material;UnityEngine.Object.DestroyImmediate(go.GetComponent<Collider>());}
    private static Image Panel(string name,Transform parent,Color color)
    {var go=new GameObject(name,typeof(RectTransform),typeof(Image));go.transform.SetParent(parent,false);var image=go.GetComponent<Image>();image.color=color;image.raycastTarget=false;return image;}
    private static TextMeshProUGUI Label(string name,Transform parent,string value,int size,Color color)
    {var go=new GameObject(name,typeof(RectTransform),typeof(TextMeshProUGUI));go.transform.SetParent(parent,false);var t=go.GetComponent<TextMeshProUGUI>();t.font=TmpSceneMigration.GetFont(font);t.text=value;t.fontSize=size;t.fontStyle=FontStyles.Bold;t.color=color;t.alignment=TextAlignmentOptions.Center;t.enableAutoSizing=true;t.fontSizeMin=12;t.fontSizeMax=size;t.raycastTarget=false;return t;}
    private static void Stretch(Image i){Stretch(i.rectTransform);}
    private static void Stretch(RectTransform r){SetAnchors(r,Vector2.zero,Vector2.one);}
    private static void SetAnchors(RectTransform r,Vector2 min,Vector2 max){r.anchorMin=min;r.anchorMax=max;r.offsetMin=Vector2.zero;r.offsetMax=Vector2.zero;}
    private static Sprite SpriteAt(string name){return AssetDatabase.LoadAssetAtPath<Sprite>(Root+"UI/"+name+".png");}
    private static void ImportUi()
    {
        foreach(string p in AssetDatabase.FindAssets("t:Texture2D",new[]{Root+"UI"}))
        {var ti=(TextureImporter)AssetImporter.GetAtPath(AssetDatabase.GUIDToAssetPath(p));ti.textureType=TextureImporterType.Sprite;ti.mipmapEnabled=false;ti.maxTextureSize=512;ti.spriteBorder=new Vector4(24,24,24,24);ti.SaveAndReimport();}
    }
    public static Sprite CaptureIcon(GameObject prefab,string name)
    {
        var go=(GameObject)PrefabUtility.InstantiatePrefab(prefab);go.transform.position=new Vector3(1000,1000,1000);var bounds=new Bounds(go.transform.position,Vector3.zero);foreach(var r in go.GetComponentsInChildren<Renderer>())bounds.Encapsulate(r.bounds);
        var cg=new GameObject("Icon camera",typeof(Camera));var c=cg.GetComponent<Camera>();c.orthographic=true;c.clearFlags=CameraClearFlags.SolidColor;c.backgroundColor=new Color(0,0,0,0);c.transform.position=bounds.center+new Vector3(-4,3,5);c.transform.LookAt(bounds.center);c.orthographicSize=Mathf.Max(bounds.size.x,bounds.size.y,bounds.size.z)*.7f;c.nearClipPlane=.1f;c.farClipPlane=30;
        var rt=RenderTexture.GetTemporary(192,192,24,RenderTextureFormat.ARGB32);c.targetTexture=rt;c.Render();var previous=RenderTexture.active;RenderTexture.active=rt;var texture=new Texture2D(192,192,TextureFormat.RGBA32,false);texture.ReadPixels(new Rect(0,0,192,192),0,0);texture.Apply();string path=Root+"Icons/"+name+".png";System.IO.File.WriteAllBytes(path,texture.EncodeToPNG());RenderTexture.active=previous;c.targetTexture=null;RenderTexture.ReleaseTemporary(rt);UnityEngine.Object.DestroyImmediate(texture);UnityEngine.Object.DestroyImmediate(cg);UnityEngine.Object.DestroyImmediate(go);AssetDatabase.ImportAsset(path);var ti=(TextureImporter)AssetImporter.GetAtPath(path);ti.textureType=TextureImporterType.Sprite;ti.mipmapEnabled=false;ti.alphaIsTransparency=true;ti.SaveAndReimport();return AssetDatabase.LoadAssetAtPath<Sprite>(path);
    }
}
#endif
