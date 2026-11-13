#if UNITY_EDITOR
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEditor;
using UnityEditor.SceneManagement;
using CEBB.Playable;

public static class BedroomInteriorRestyle
{
    const string Root="Assets/_Playable/";
    static Material oak,darkOak,blue,white,wall,crystal,orange,gold;
    public static void Apply()
    {
        var m=Object.FindFirstObjectByType<BedroomPlayable>();
        var layout=GameObject.Find("Room Camera").GetComponent<BedroomLayout>();
        EditorSceneManager.SaveScene(UnityEngine.SceneManagement.SceneManager.GetActiveScene(),"Assets/Scenes/SampleScene_BeforeInterior.unity",true);
        var old=GameObject.Find("Bedroom shell");if(old!=null)old.SetActive(false);
        foreach(var go in Object.FindObjectsByType<Light>(FindObjectsSortMode.None))go.enabled=false;
        oak=Mat("Interior Oak",new Color(.53f,.29f,.12f),WoodTexture());
        darkOak=Mat("Interior Dark Oak",new Color(.25f,.12f,.045f),WoodTexture());
        blue=Mat("Blue quilt",new Color(.18f,.32f,.92f),QuiltTexture());
        white=Mat("White pillow",new Color(.96f,.94f,.83f));
        wall=Mat("Charcoal wall",new Color(.19f,.18f,.165f));
        crystal=Mat("Blue crystals",new Color(.12f,.26f,.91f));
        orange=Mat("Item frame leather",new Color(.5f,.20f,.055f));
        gold=Mat("Item frame rim",new Color(.88f,.65f,.27f));
        var room=new GameObject("Minecraft bedroom interior").transform;room.SetParent(m.transform);
        Box("Back wall",room,new Vector3(0,3,2.6f),new Vector3(16,6,.25f),wall);
        Box("Left wall",room,new Vector3(-3.15f,3,-3),new Vector3(.25f,6,12),wall);
        Box("Floor base",room,new Vector3(0,-.13f,-2),new Vector3(18,.2f,20),darkOak);
        for(int x=-4;x<7;x++)for(int z=-8;z<4;z++)
        {
            var tile=Box("Oak parquet block",room,new Vector3(x*.8f,-.015f,z*.8f),new Vector3(.79f,.08f,.79f),oak);
            tile.transform.localEulerAngles=new Vector3(0,((x+z)%2==0)?0:90,0);
        }
        Box("Wood headboard",room,new Vector3(-.7f,.63f,1.76f),new Vector3(3.7f,1.2f,.25f),darkOak);
        for(int i=0;i<7;i++)Box("Headboard planks",room,new Vector3(-2.23f+i*.51f,.78f,1.6f),new Vector3(.49f,.85f,.16f),oak);
        Box("Bedside block",room,new Vector3(1.35f,.5f,1.3f),new Vector3(.85f,1,.85f),darkOak);
        Box("Bedside top",room,new Vector3(1.35f,1.02f,1.3f),new Vector3(.94f,.12f,.94f),oak);
        var bed=new GameObject("Blue voxel bed");
        Box("Frame",bed.transform,new Vector3(0,.36f,0),new Vector3(2.12f,.22f,2.62f),oak);
        for(int x=-1;x<=1;x+=2)for(int z=-1;z<=1;z+=2)Box("Bed leg",bed.transform,new Vector3(x*.91f,.22f,z*1.12f),new Vector3(.18f,.44f,.18f),oak);
        Box("Mattress",bed.transform,new Vector3(0,.58f,0),new Vector3(2,.26f,2.45f),white);
        Box("Blue duvet",bed.transform,new Vector3(0,.75f,-.27f),new Vector3(2.04f,.20f,1.91f),blue);
        Box("Duvet side",bed.transform,new Vector3(.995f,.61f,-.26f),new Vector3(.1f,.38f,1.92f),blue);
        Box("Pillow left",bed.transform,new Vector3(-.49f,.77f,.91f),new Vector3(.86f,.20f,.52f),white);
        Box("Pillow right",bed.transform,new Vector3(.49f,.77f,.91f),new Vector3(.86f,.20f,.52f),white);
        var bedPrefab=PrefabUtility.SaveAsPrefabAsset(bed,Root+"Prefabs/BlueVoxelBed.prefab");Object.DestroyImmediate(bed);
        m.slots[0].definition.prefab=bedPrefab;m.slots[0].definition.displayName="Blue bed";m.slots[0].anchor.localPosition=new Vector3(-.7f,.02f,.12f);
        var crystals=new GameObject("Blue crystal cluster");
        for(int i=0;i<9;i++)
        {
            float x=((i%3)-1)*.19f,z=((i/3)-1)*.18f,h=.28f+(i%4)*.1f;
            var stem=Box("Crystal",crystals.transform,new Vector3(x,h*.5f,z),new Vector3(.14f,h,.14f),crystal);stem.transform.localEulerAngles=new Vector3(i%2==0?10:-9,i*25,0);
            Box("Crystal cap",crystals.transform,new Vector3(x,h,z),new Vector3(.10f,.10f,.10f),crystal);
        }
        var crystalPrefab=PrefabUtility.SaveAsPrefabAsset(crystals,Root+"Prefabs/BlueCrystals.prefab");Object.DestroyImmediate(crystals);
        m.slots[5].definition.prefab=crystalPrefab;m.slots[5].definition.displayName="Crystals";m.slots[5].anchor.localPosition=new Vector3(1.35f,1.09f,1.3f);
        var frame=new GameObject("Minecraft item frame");
        Box("Rim",frame.transform,Vector3.zero,new Vector3(.55f,.55f,.08f),gold);
        Box("Leather",frame.transform,new Vector3(0,0,-.052f),new Vector3(.45f,.45f,.025f),orange);
        var framePrefab=PrefabUtility.SaveAsPrefabAsset(frame,Root+"Prefabs/ItemFrame.prefab");Object.DestroyImmediate(frame);
        m.slots[8].definition.prefab=framePrefab;m.slots[8].definition.displayName="Item frame";m.slots[8].anchor.localPosition=new Vector3(1.05f,1.9f,2.39f);
        m.slots[10].definition.prefab=framePrefab;m.slots[10].definition.displayName="Wall frame";m.slots[10].anchor.localPosition=new Vector3(1.85f,2.8f,2.39f);
        m.slots[1].anchor.localPosition=new Vector3(-2.4f,0,.45f);
        m.slots[2].anchor.localPosition=new Vector3(-2f,0,-3f);
        m.slots[3].anchor.localPosition=new Vector3(3.2f,0,2.05f);
        m.slots[4].anchor.localPosition=new Vector3(3.8f,0,-.7f);
        m.slots[6].anchor.localPosition=new Vector3(-.6f,.04f,-1.7f);
        m.slots[7].anchor.localPosition=new Vector3(-2f,0,-1.7f);
        m.slots[9].anchor.localPosition=new Vector3(-.6f,2.8f,2.39f);
        m.slots[11].anchor.localPosition=new Vector3(3f,1.7f,2.39f);
        var preview=new GameObject("Furniture preview — hidden automatically in Play mode");preview.transform.SetParent(m.transform);m.editorPreviewRoot=preview;
        foreach(int i in new[]{0,5,8,10}){var p=(GameObject)PrefabUtility.InstantiatePrefab(m.slots[i].definition.prefab);p.transform.SetParent(preview.transform);p.transform.position=m.slots[i].anchor.position;}
        foreach(var s in m.slots)
        {
            s.definition.icon=BedroomSceneSetup.CaptureIcon(s.definition.prefab,s.definition.furnitureId);
            string path=Root+"Icons/"+s.definition.furnitureId+".png";var ti=(TextureImporter)AssetImporter.GetAtPath(path);ti.spriteImportMode=SpriteImportMode.Single;ti.SaveAndReimport();s.definition.icon=AssetDatabase.LoadAssetAtPath<Sprite>(path);
            s.button.transform.Find("Furniture icon").GetComponent<Image>().sprite=s.definition.icon;
            var name=s.button.transform.Find("Name").GetComponent<TextMeshProUGUI>();name.text=s.definition.displayName;name.color=Color.white;name.fontSize=17;
            EditorUtility.SetDirty(s.definition);
        }
        var lightGo=new GameObject("Warm bedside light",typeof(Light));lightGo.transform.SetParent(room);lightGo.transform.position=new Vector3(.3f,3,-1.1f);var key=lightGo.GetComponent<Light>();key.type=LightType.Point;key.intensity=5;key.range=10;key.color=new Color(1,.73f,.43f);key.shadows=LightShadows.Soft;
        var fillGo=new GameObject("Soft cool fill",typeof(Light));fillGo.transform.SetParent(room);fillGo.transform.position=new Vector3(-1,3,-4);var fill=fillGo.GetComponent<Light>();fill.type=LightType.Point;fill.range=10;fill.intensity=1.5f;fill.color=new Color(.63f,.73f,1);
        RenderSettings.ambientMode=UnityEngine.Rendering.AmbientMode.Flat;RenderSettings.ambientLight=new Color(.28f,.27f,.25f);RenderSettings.ambientIntensity=.7f;
        layout.lookTarget=new Vector3(-.4f,1.05f,.6f);layout.viewOffset=new Vector3(4f,2.15f,-6.1f);
        layout.roomCamera.cullingMask=-1;layout.roomCamera.clearFlags=CameraClearFlags.SolidColor;layout.roomCamera.backgroundColor=new Color(.12f,.11f,.10f);
        var headerImage=layout.header.GetComponent<Image>();headerImage.sprite=null;headerImage.color=Color.white;
        var titleGo=new GameObject("Blue Bedroom Ideas",typeof(RectTransform),typeof(TextMeshProUGUI));titleGo.transform.SetParent(headerImage.transform,false);var tr=titleGo.GetComponent<RectTransform>();tr.anchorMin=Vector2.zero;tr.anchorMax=Vector2.one;tr.offsetMin=tr.offsetMax=Vector2.zero;var title=titleGo.GetComponent<TextMeshProUGUI>();title.font=TmpSceneMigration.GetFont(Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf"));title.fontStyle=FontStyles.Bold;title.text="<  BLUE BEDROOM IDEAS  >";title.color=new Color(.18f,.18f,.18f);title.alignment=TextAlignmentOptions.Center;title.enableAutoSizing=true;title.fontSizeMin=14;title.fontSizeMax=36;title.raycastTarget=false;titleGo.layer=5;
        var stats=m.timerText.transform.parent.GetComponent<RectTransform>();stats.anchorMin=new Vector2(.71f,.86f);stats.anchorMax=new Vector2(.96f,.91f);stats.offsetMin=stats.offsetMax=Vector2.zero;
        m.countText.fontSize=19;m.timerText.fontSize=24;layout.progress.gameObject.SetActive(false);
        layout.catalog.GetComponent<Image>().color=new Color(.08f,.07f,.055f,.75f);
        var logo=new GameObject("Game logo",typeof(RectTransform),typeof(Image));logo.transform.SetParent(layout.canvas.transform,false);logo.layer=5;var logoImage=logo.GetComponent<Image>();logoImage.sprite=AssetDatabase.LoadAssetAtPath<Sprite>(Root+"UI/Logo.png");logoImage.preserveAspect=true;logoImage.raycastTarget=false;var lr=logo.GetComponent<RectTransform>();lr.anchorMin=new Vector2(.03f,.012f);lr.anchorMax=new Vector2(.27f,.06f);lr.offsetMin=lr.offsetMax=Vector2.zero;
        layout.ApplyLayout(9f/16f);EditorUtility.SetDirty(m);EditorUtility.SetDirty(layout);AssetDatabase.SaveAssets();EditorSceneManager.SaveScene(UnityEngine.SceneManagement.SceneManager.GetActiveScene());
    }
    static GameObject Box(string name,Transform parent,Vector3 p,Vector3 s,Material m)
    {var go=GameObject.CreatePrimitive(PrimitiveType.Cube);go.name=name;go.transform.SetParent(parent,false);go.transform.localPosition=p;go.transform.localScale=s;go.GetComponent<Renderer>().sharedMaterial=m;Object.DestroyImmediate(go.GetComponent<Collider>());return go;}
    static Material Mat(string name,Color color,Texture texture=null)
    {var m=new Material(Shader.Find("CEBB/Scene Unlit"));m.name=name;m.color=color;if(texture!=null)m.mainTexture=texture;AssetDatabase.CreateAsset(m,Root+"Materials/"+name+".mat");return m;}
    static Texture2D WoodTexture()
    {
        var t=new Texture2D(32,32,TextureFormat.RGB24,false);t.filterMode=FilterMode.Point;
        for(int y=0;y<32;y++)for(int x=0;x<32;x++){float n=((x*13+y*3)%9)*.025f;float stripe=(y%8==0||x==0||x==31)?.55f:.78f+n;t.SetPixel(x,y,new Color(stripe,stripe*.90f,stripe*.72f));}t.Apply();return SaveTexture(t,"OakPixels");
    }
    static Texture2D QuiltTexture()
    {
        var t=new Texture2D(32,32,TextureFormat.RGB24,false);t.filterMode=FilterMode.Point;
        for(int y=0;y<32;y++)for(int x=0;x<32;x++){float n=.66f+((x/3*7+y/4*11)%9)*.038f;t.SetPixel(x,y,new Color(n,n,n));}t.Apply();return SaveTexture(t,"QuiltPixels");
    }
    static Texture2D SaveTexture(Texture2D t,string name)
    {string path=Root+"UI/"+name+".png";System.IO.File.WriteAllBytes(path,t.EncodeToPNG());Object.DestroyImmediate(t);AssetDatabase.ImportAsset(path);var ti=(TextureImporter)AssetImporter.GetAtPath(path);ti.textureType=TextureImporterType.Default;ti.filterMode=FilterMode.Point;ti.mipmapEnabled=false;ti.SaveAndReimport();return AssetDatabase.LoadAssetAtPath<Texture2D>(path);}
}
#endif
