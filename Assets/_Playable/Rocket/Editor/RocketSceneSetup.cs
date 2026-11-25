#if UNITY_EDITOR
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;
using CEBB.Playable;

// CC_Playable_AutoBuildRocket1 — builds Assets/Scenes/AutoBuildRocket.unity from SampleScene (keeps its UI / Luna setup).
// Moon: voxel terrain rebuilt from "Moon Minecraft terrain" (DURVESH S, CC-BY-4.0). Rocket: 160 blocks voxelised from rocket.zip.
// Menu: Tools/CEBB/Rocket/Build Scene
public static class RocketSceneSetup
{
    const string Root="Assets/_Playable/Rocket/";
    // grass = same playable on the Minecraft green-meadow map (Outsources/generated-assets) instead of the moon
    static bool grass;
    // mars = 2019 Nacho Rocket (Outsources/2019_nacho_rocket) on the crashed-rocket Minecraft map (Outsources/rocket map); uses the voxel-map world like grass
    static bool mars;
    // launch = the Nacho scene + "choose 1 of 4 rockets" before building (CC_Playable_LaunchRocket)
    static bool launch;
    static string ScenePath{get{return launch?"Assets/Scenes/LaunchRocket.unity":mars?"Assets/Scenes/AutoBuildNachoRocket.unity":grass?"Assets/Scenes/AutoBuildRocketGrass.unity":"Assets/Scenes/AutoBuildRocket.unity";}}
    static string AssetTag{get{return mars?"Nacho ":"";}} /* keeps the nacho materials / icons apart from the moon rocket ones */
    [System.Serializable] class GrassTile{public int u,v;}
    [System.Serializable] class GrassData{public int width,depth;public float originX,originZ;public string atlas;public GrassTile[] tiles;public int[] quads;}
    [System.Serializable] class BlockType{public string name;public int[] color;}
    [System.Serializable] class Block{public int x,y,z,t,m;}
    [System.Serializable] class BlockMesh{public float[] v,u,s;}
    // meshes: optional per-block geometry taken from the source model (slabs, stairs, bars, panes...), blocks[i].m indexes it
    [System.Serializable] class RocketData{public BlockType[] types;public Block[] blocks;public BlockMesh[] meshes;public string atlas;}
    [System.Serializable] class Pad{public float x,z,y,w,d;}
    [System.Serializable] class MoonData{public int width,depth;public float originX,originZ;public int[] heights;public Pad pad;public float spawnX,spawnZ;}
    static Font font;

    [MenuItem("Tools/CEBB/Rocket/Build Grass Scene")]
    public static void BuildGrass(){grass=true;try{Build();}finally{grass=false;}}
    [MenuItem("Tools/CEBB/Rocket/Build Nacho Rocket Scene (Mars map)")]
    public static void BuildMars(){grass=true;mars=true;try{Build();}finally{grass=false;mars=false;}}
    [MenuItem("Tools/CEBB/Rocket/Build LaunchRocket Scene (Nacho + choose 1 of 4)")]
    public static void BuildLaunch(){grass=true;mars=true;launch=true;try{Build();}finally{grass=false;mars=false;launch=false;}}
    [MenuItem("Tools/CEBB/Rocket/Build Scene")]
    public static void Build()
    {
        if(Application.isPlaying)throw new System.InvalidOperationException("Stop Play mode first");
        Folder(Root+"Materials");Folder(Root+"Meshes");
        ImportSettings();
        if(RocketSceneSetup.launch)WriteNachoWithoutBase(); /* qualified: Build() has a local Button called "launch" */
        var rocket=JsonUtility.FromJson<RocketData>(File.ReadAllText(Root+(RocketSceneSetup.launch?NachoLaunchJson:mars?"Data/nacho_blocks.json":"Data/rocket_blocks.json")));
        string mapJson=File.ReadAllText(Root+(mars?"Data/mars_map.json":grass?"Data/grass_map.json":"Data/moon_heights.json"));var moon=JsonUtility.FromJson<MoonData>(mapJson);
        font=AssetDatabase.LoadAssetAtPath<Font>("Assets/_Playable/Fonts/FFFFORWA.ttf");

        // ---------- materials
        var concrete=Tex("moon_concrete");var diorite=Tex("moon_diorite");
        // terrain, Earth and stars use a plain unlit shader: URP Unlit is not supported by Luna and the lit terrain rendered black there
        var topA=Unlit("Moon top concrete",concrete,new Color(.95f,.95f,.97f));var topB=Unlit("Moon top diorite",diorite,new Color(.95f,.95f,.96f));
        var topC=Unlit("Moon top dark",diorite,new Color(.8f,.8f,.83f));var sideA=Unlit("Moon side concrete",concrete,new Color(.68f,.68f,.72f));var sideB=Unlit("Moon side diorite",diorite,new Color(.68f,.68f,.7f));
        var typeMats=new Material[rocket.types.Length];for(int i=0;i<typeMats.Length;i++)typeMats[i]=Lit("Block "+AssetTag+rocket.types[i].name,Tex("block_"+AssetTag.Trim().ToLower()+(mars?"_":"")+rocket.types[i].name.ToLower()),Color.white);
        var earthMat=Unlit("Earth",Tex("earth"),Color.white);
        var starMat=Unlit("Stars",null,Color.white);
        var ghostShader=Shader.Find("CEBB/Ghost Unlit");
        var ghostMat=new Material(ghostShader){name="Guide block"};ghostMat.SetColor("_Color",new Color(.3f,.95f,1f,.2f));ghostMat.renderQueue=3000;Save(ghostMat);
        var edgeMat=new Material(ghostShader){name="Guide block edges"};edgeMat.SetColor("_Color",new Color(1f,1f,1f,.5f));edgeMat.renderQueue=3001;Save(edgeMat);

        // ---------- scene from SampleScene
        if(AssetDatabase.LoadAssetAtPath<SceneAsset>(ScenePath)!=null)AssetDatabase.DeleteAsset(ScenePath);
        AssetDatabase.CopyAsset("Assets/Scenes/SampleScene.unity",ScenePath);
        var scene=EditorSceneManager.OpenScene(ScenePath,OpenSceneMode.Single);
        var old=Object.FindFirstObjectByType<BedroomPlayable>();var rootGo=old.gameObject;rootGo.name="CC Rocket";
        BedroomLayout layout=null;foreach(var l in Object.FindObjectsByType<BedroomLayout>(FindObjectsInactive.Include,FindObjectsSortMode.None))if(l.enabled&&l.gameObject.activeInHierarchy)layout=l; /* the live one (Room Camera), not the disabled backdrop copy */var oldPlayer=Object.FindFirstObjectByType<FirstPersonRoom>();
        var camera=layout.roomCamera;camera.transform.SetParent(rootGo.transform,false);
        var inv=old.inventory;var prompt=old.promptText;var timer=old.timerText;var count=old.countText;var hand=old.hand;var ctaRoot=old.ctaRoot;var ctaButton=old.ctaButton;
        var endButton=old.endOverlayButton;var bgm=old.bgmSource;var bgmClip=old.bgmClip;var logo=old.logoImage;var sfxSource=old.placementAudio;var sfx=old.placementSfx;
        var movePad=oldPlayer.movePad;var reticle=oldPlayer.reticle;var progress=old.progressFill!=null?old.progressFill.transform.parent.gameObject:null;var loop=old.lookTutorialLoop;var startSurface=old.startSurface;
        foreach(var n in new[]{"Closed home — four walls, ceiling and roof","Completed room preview — hidden in Play","Furniture placements — quantities come from these slots"}){var t=rootGo.transform.Find(n);if(t!=null)Object.DestroyImmediate(t.gameObject);}
        Object.DestroyImmediate(oldPlayer.gameObject);
        var lookOld=Object.FindFirstObjectByType<RoomLookSurface>();var lookGo=lookOld.gameObject;Object.DestroyImmediate(lookOld);
        Object.DestroyImmediate(old);
        if(progress!=null)progress.SetActive(false);if(loop!=null)loop.gameObject.SetActive(false);if(startSurface!=null)startSurface.gameObject.SetActive(false);if(reticle!=null)reticle.gameObject.SetActive(false);
        if(bgm!=null&&bgmClip!=null){bgm.clip=bgmClip;bgm.loop=true;bgm.playOnAwake=false;}

        // ---------- world: moon (terrain, stars, earth) or green meadow (voxel map, clouds), sky, light
        Vector3 pad=new Vector3(moon.pad.x,moon.pad.y,moon.pad.z);int sz0=0;foreach(var b in rocket.blocks)sz0=Mathf.Max(sz0,b.z+1);
        Vector3 rig0=moon.spawnX!=0||moon.spawnZ!=0?pad+new Vector3(moon.spawnX,0,moon.spawnZ):pad+new Vector3(-1.5f,0,-(sz0*.5f+9f));
        if(grass)
        {
            var world=new GameObject(mars?"Mars — crashed-rocket Minecraft map":"Meadow — Minecraft map, clouds").transform;world.SetParent(rootGo.transform,false);
            BuildGrassWorld(world,JsonUtility.FromJson<GrassData>(mapJson));
        }
        else
        {
            var world=new GameObject("Moon — terrain, sky, earth").transform;world.SetParent(rootGo.transform,false);
            var model=AssetDatabase.LoadAssetAtPath<GameObject>(Root+"Models/moon_terrain.obj");
            var terrain=(GameObject)PrefabUtility.InstantiatePrefab(model);terrain.name="Moon terrain (CC-BY DURVESH S)";terrain.transform.SetParent(world,false);
            foreach(var r in terrain.GetComponentsInChildren<MeshRenderer>())
            {
                var mats=r.sharedMaterials;
                for(int i=0;i<mats.Length;i++){string n=mats[i]!=null?mats[i].name:"";mats[i]=n.Contains("top_a")?topA:n.Contains("top_b")?topB:n.Contains("top_c")?topC:n.Contains("side_b")?sideB:sideA;}
                r.sharedMaterials=mats;r.shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;r.receiveShadows=false;
            }
            foreach(var c in terrain.GetComponentsInChildren<Collider>())Object.DestroyImmediate(c);
            var stars=new GameObject("Stars",typeof(MeshFilter),typeof(MeshRenderer));stars.transform.SetParent(world,false);stars.GetComponent<MeshFilter>().sharedMesh=StarMesh();var sr=stars.GetComponent<MeshRenderer>();sr.sharedMaterial=starMat;sr.shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;sr.receiveShadows=false;
            var earth=GameObject.CreatePrimitive(PrimitiveType.Sphere);earth.name="Earth";Object.DestroyImmediate(earth.GetComponent<Collider>());earth.transform.SetParent(world,false);
            earth.transform.position=rig0+new Vector3(45,128,232); /* above the rocket, between the logo and the mini map */earth.transform.localScale=Vector3.one*58;earth.transform.rotation=Quaternion.Euler(-20,140,15);
            var er=earth.GetComponent<MeshRenderer>();er.sharedMaterial=earthMat;er.shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;er.receiveShadows=false;
        }
        var sun=GameObject.Find("Directional Light");if(sun!=null){sun.transform.rotation=Quaternion.Euler(48,-35,0);var l=sun.GetComponent<Light>();l.intensity=1.6f;l.color=new Color(1,.98f,.95f);l.shadows=LightShadows.None;}
        RenderSettings.ambientMode=UnityEngine.Rendering.AmbientMode.Flat;RenderSettings.ambientLight=new Color(.68f,.7f,.75f);RenderSettings.fog=false;
        camera.clearFlags=CameraClearFlags.SolidColor;camera.backgroundColor=mars?new Color(.97f,.79f,.62f):grass?new Color(.53f,.78f,.98f):new Color(.01f,.012f,.03f);camera.farClipPlane=700;camera.nearClipPlane=.1f;

        // ---------- rocket blocks (baked, inactive until built)
        int sx=0,sy=0,sz=0;foreach(var b in rocket.blocks){sx=Mathf.Max(sx,b.x+1);sy=Mathf.Max(sy,b.y+1);sz=Mathf.Max(sz,b.z+1);}
        var rocketRoot=new GameObject("Rocket — "+rocket.blocks.Length+" blocks").transform;rocketRoot.SetParent(rootGo.transform,false);rocketRoot.position=pad;
        var cube=Resources.GetBuiltinResource<Mesh>("Cube.fbx");
        Mesh[] modelMeshes=null;Material atlasMat=null;
        if(rocket.meshes!=null&&rocket.meshes.Length>0)
        {
            string md=Root+"Nacho/Meshes";Folder(md);
            var ti=(TextureImporter)AssetImporter.GetAtPath(rocket.atlas);ti.textureType=TextureImporterType.Default;ti.filterMode=FilterMode.Point;ti.mipmapEnabled=false;ti.wrapMode=TextureWrapMode.Clamp;ti.alphaIsTransparency=false;ti.textureCompression=TextureImporterCompression.Uncompressed;ti.SaveAndReimport();
            atlasMat=new Material(Shader.Find("CEBB/Unlit Cutout VColor")){name="Nacho rocket atlas"};atlasMat.SetTexture("_MainTex",AssetDatabase.LoadAssetAtPath<Texture2D>(rocket.atlas));Save(atlasMat);
            modelMeshes=new Mesh[rocket.meshes.Length];
            for(int i=0;i<rocket.meshes.Length;i++)
            {
                var bm=rocket.meshes[i];int n=bm.s.Length;var vs=new Vector3[n];var us=new Vector2[n];var cs=new Color[n];var ts=new int[n];
                for(int k=0;k<n;k++){vs[k]=new Vector3(bm.v[k*3],bm.v[k*3+1],bm.v[k*3+2]);us[k]=new Vector2(bm.u[k*2],bm.u[k*2+1]);cs[k]=new Color(bm.s[k],bm.s[k],bm.s[k],1);ts[k]=k;}
                var mesh=new Mesh{name="Nacho block "+i};mesh.vertices=vs;mesh.uv=us;mesh.colors=cs;mesh.triangles=ts;mesh.RecalculateNormals();mesh.RecalculateBounds();
                string mp=md+"/block_"+i.ToString("000")+".asset";if(AssetDatabase.LoadAssetAtPath<Mesh>(mp)!=null)AssetDatabase.DeleteAsset(mp);AssetDatabase.CreateAsset(mesh,mp);modelMeshes[i]=mesh;
            }
        }
        var blocks=new GameObject[rocket.blocks.Length];var blockTypes=new int[rocket.blocks.Length];
        for(int i=0;i<rocket.blocks.Length;i++)
        {
            var b=rocket.blocks[i];var go=new GameObject((i+1).ToString("000")+" "+rocket.types[b.t].name,typeof(MeshFilter),typeof(MeshRenderer));go.transform.SetParent(rocketRoot,false);
            go.transform.localPosition=new Vector3(b.x-sx*.5f+.5f,b.y+.5f,b.z-sz*.5f+.5f);if(modelMeshes!=null){go.GetComponent<MeshFilter>().sharedMesh=modelMeshes[b.m];go.GetComponent<MeshRenderer>().sharedMaterial=atlasMat;}else{go.GetComponent<MeshFilter>().sharedMesh=cube;go.GetComponent<MeshRenderer>().sharedMaterial=typeMats[b.t];}
            var br=go.GetComponent<MeshRenderer>();br.shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;br.receiveShadows=false;
            blocks[i]=go;blockTypes[i]=b.t;
        }
        var ghost=new GameObject("Guide block (next to build)",typeof(MeshFilter),typeof(MeshRenderer));ghost.transform.SetParent(rocketRoot,false);ghost.GetComponent<MeshFilter>().sharedMesh=cube;var gr=ghost.GetComponent<MeshRenderer>();gr.sharedMaterial=ghostMat;gr.shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;gr.receiveShadows=false;
        for(int e=0;e<12;e++)
        {
            int axis=e/4,k=e%4;float a=(k&1)==0?-.5f:.5f,c=(k&2)==0?-.5f:.5f;Vector3 p=axis==0?new Vector3(0,a,c):axis==1?new Vector3(a,0,c):new Vector3(a,c,0);Vector3 s=axis==0?new Vector3(1.04f,.07f,.07f):axis==1?new Vector3(.07f,1.04f,.07f):new Vector3(.07f,.07f,1.04f);
            var edge=new GameObject("Edge",typeof(MeshFilter),typeof(MeshRenderer));edge.transform.SetParent(ghost.transform,false);edge.transform.localPosition=p;edge.transform.localScale=s;edge.GetComponent<MeshFilter>().sharedMesh=cube;var mr=edge.GetComponent<MeshRenderer>();mr.sharedMaterial=edgeMat;mr.shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;mr.receiveShadows=false;
        }
        ghost.transform.localPosition=blocks[0].transform.localPosition;
        // icons + blueprint picture
        var preview=grass&&!mars&&AssetDatabase.LoadAssetAtPath<Sprite>(Root+"UI/RocketBlueprint.png")!=null?AssetDatabase.LoadAssetAtPath<Sprite>(Root+"UI/RocketBlueprint.png"):RenderRocket(rocketRoot,blocks,mars?"RocketBlueprint_Nacho":"RocketBlueprint"); /* same rocket: reuse the moon render */
        foreach(var go in blocks)go.SetActive(false);
        var typeIcons=new Sprite[rocket.types.Length];for(int i=0;i<typeIcons.Length;i++){var ex=AssetDatabase.LoadAssetAtPath<Sprite>(Root+"UI/Block_"+rocket.types[i].name+".png");typeIcons[i]=grass&&!mars&&ex!=null?ex:RenderBlockIcon(typeMats[i],(mars?"Nacho_":"")+rocket.types[i].name);}

        // ---------- player
        var game=rootGo.AddComponent<RocketPlayable>();
        var rig=new GameObject("Player — joystick / drag to look / FLY");rig.transform.SetParent(rootGo.transform,false);var player=rig.AddComponent<RocketPlayer>();
        player.game=game;player.playerCamera=camera;player.movePad=movePad;camera.transform.SetParent(rig.transform,false);
        player.gridWidth=moon.width;player.gridDepth=moon.depth;player.originX=moon.originX;player.originZ=moon.originZ;player.heights=moon.heights;
        player.rocketMin=pad+new Vector3(-sx*.5f,0,-sz*.5f);player.rocketMax=pad+new Vector3(sx*.5f,sy,sz*.5f);
        rig.transform.position=rig0;player.flyHeight=12f;game.orbitRadius=Mathf.Max(17f,sy*1.05f);game.quickBuildSeconds=mars?1.8f:3f;player.yaw=8;player.pitch=12;player.ApplyView();
        lookGo.AddComponent<RocketLookSurface>().player=player;

        // ---------- UI
        var canvas=prompt.canvas.transform;var playSprite=ctaRoot!=null?ctaRoot.GetComponent<Image>().sprite:null;
        var types=new RocketBlockType[rocket.types.Length];
        for(int i=0;i<inv.Length;i++)
        {
            var e=inv[i];if(i>=types.Length){e.button.gameObject.SetActive(false);continue;}
            string nm=rocket.types[i].name;e.button.gameObject.name=nm;e.icon.sprite=typeIcons[i];e.icon.preserveAspect=true;
            var nameT=e.button.transform.Find("Name");Text nameText=nameT!=null?nameT.GetComponent<Text>():null;if(nameText!=null)nameText.text=nm.ToUpperInvariant();
            var h=e.button.transform.Find("Tutorial hand");if(h!=null&&h!=hand)h.gameObject.SetActive(false);
            if(e.emptyBadge!=null)e.emptyBadge.SetActive(false);
            types[i]=new RocketBlockType{name=nm,material=typeMats[i],button=e.button,frame=e.frame,icon=e.icon,countText=e.quantityText,nameText=nameText,emptyBadge=e.emptyBadge};
        }
        var mini=Panel("Mini map — rocket blueprint",canvas,new Color(.05f,.07f,.09f,.82f));mini.gameObject.AddComponent<Outline>().effectColor=new Color(1,1,1,.85f);mini.GetComponent<Outline>().effectDistance=new Vector2(3,-3);
        var pic=Panel("Blueprint",mini.transform,Color.white);pic.sprite=preview;pic.preserveAspect=true;Anchors(pic.rectTransform,new Vector2(.06f,.13f),new Vector2(.94f,.97f));
        var target=Label("Label",mini.transform,"TARGET",22);Anchors(target.rectTransform,new Vector2(0,0),new Vector2(1,.15f));
        var fly=Panel("FLY button",canvas,Color.white);fly.sprite=UiSprite("FlyIcon");fly.preserveAspect=true;fly.raycastTarget=true;var flyBtn=fly.gameObject.AddComponent<Button>();flyBtn.targetGraphic=fly;
        var flyLabel=Label("FLY",fly.transform,"FLY",22);Anchors(flyLabel.rectTransform,new Vector2(0,-.24f),new Vector2(1,-.02f));
        var quick=BigButton("QUICK BUILD button",canvas,playSprite,"QUICK BUILD");var launch=BigButton("LAUNCH button",canvas,playSprite,"LAUNCH");
        if(ctaRoot!=null)ctaRoot.SetActive(false); // no Play Now button: QUICK BUILD docks in its place
        if(false)
        {
            ctaRoot.SetActive(true);var le=ctaRoot.GetComponent<LayoutElement>();if(le==null)le=ctaRoot.AddComponent<LayoutElement>();le.ignoreLayout=true;ctaRoot.transform.SetParent(canvas,false);
            var t=ctaRoot.GetComponentInChildren<Text>(true);if(t!=null){t.text="PLAY NOW";t.font=font;t.resizeTextForBestFit=false;t.fontSize=30;t.horizontalOverflow=HorizontalWrapMode.Overflow;t.verticalOverflow=VerticalWrapMode.Overflow;t.alignment=TextAnchor.MiddleCenter;Anchors(t.rectTransform,new Vector2(.08f,.1f),new Vector2(.92f,.9f));if(t.GetComponent<Outline>()==null)t.gameObject.AddComponent<Outline>().effectDistance=new Vector2(2,-2);}
        }
        if(movePad!=null){var ml=movePad.transform.Find("Move label");if(ml!=null)ml.gameObject.SetActive(false);}
        var statsT=canvas.Find("Stats");
        if(statsT!=null)
        {
            // timer + built count: padded inside the box, white stroke around it
            var bg=statsT.GetComponent<Image>();if(bg!=null){bg.color=new Color(.06f,.08f,.1f,.85f);var o=statsT.GetComponent<Outline>();if(o==null)o=statsT.gameObject.AddComponent<Outline>();o.effectColor=new Color(1,1,1,.9f);o.effectDistance=new Vector2(3,-3);}
            var tm=statsT.Find("Timer");if(tm!=null){var t=tm.GetComponent<Text>();Anchors(t.rectTransform,new Vector2(.1f,.5f),new Vector2(.9f,.92f));t.resizeTextForBestFit=true;t.resizeTextMinSize=10;t.resizeTextMaxSize=40;t.alignment=TextAnchor.MiddleCenter;}
            var ct=statsT.Find("Count");if(ct!=null){var t=ct.GetComponent<Text>();Anchors(t.rectTransform,new Vector2(.1f,.1f),new Vector2(.9f,.5f));t.resizeTextForBestFit=true;t.resizeTextMinSize=10;t.resizeTextMaxSize=30;t.alignment=TextAnchor.MiddleCenter;}
        }
        if(hand!=null){hand.gameObject.SetActive(true);hand.SetParent(canvas,false);hand.SetAsLastSibling();}
        prompt.fontSize=40;prompt.resizeTextMaxSize=40;prompt.text="TAP TO BUILD ROCKET";count.text="BUILT 0/"+blocks.Length;
        var logoHolder=canvas.Find("Logo");if(logoHolder!=null)logoHolder.gameObject.SetActive(false);

        // ---------- wiring
        var luna=rootGo.AddComponent<RocketLuna>();luna.game=game;luna.ctaOverlay=endButton;luna.timerText=timer;if(logo!=null)logo.gameObject.SetActive(false); /* no game name */
        game.rocketRoot=rocketRoot;game.blocks=blocks;game.blockTypes=blockTypes;game.types=types;game.ghost=ghost.transform;
        game.player=player;game.luna=luna;game.promptText=prompt;game.countText=count;game.hand=hand;
        game.quickBuildButton=quick;game.launchButton=launch;game.flyButton=flyBtn;game.flyIcon=fly;
        game.minimap=mini.rectTransform;game.stats=statsT!=null?(RectTransform)statsT:null;game.playNow=null;
        game.layout=layout;game.grid=layout.grid;game.catalog=layout.catalog;
        game.hideOnShowcase=new[]{layout.catalog.gameObject,movePad!=null?movePad.gameObject:null,fly.gameObject,mini.gameObject};
        // basic tutorials: infinity-loop look guide + joystick demo
        var guide=Panel("Look guide — infinity loop",canvas,Color.white);guide.sprite=AssetDatabase.LoadAssetAtPath<Sprite>("Assets/_Playable/LivingRoom/UI/LookGuideInfinity.png");guide.preserveAspect=true;
        var gr2=guide.rectTransform;gr2.anchorMin=gr2.anchorMax=gr2.pivot=new Vector2(.5f,.5f);gr2.sizeDelta=new Vector2(680*170f/320f,264*170f/320f);guide.gameObject.SetActive(false);
        game.lookGuide=gr2;game.lookGuideRadius=new Vector2(170,59.5f);game.movePad=movePad;
        game.placementAudio=sfxSource;game.placementSfx=sfx;game.bgmSource=bgm;
        layout.stats=null;layout.firstPersonMode=true;
        if(RocketSceneSetup.launch)AddRocketChoices(rootGo,canvas,game,luna,camera,inv,pic,new[]{layout.catalog.gameObject,movePad!=null?movePad.gameObject:null,fly.gameObject,mini.gameObject},rocketRoot,blocks,blockTypes,rocket,typeIcons,preview,cube,pad);
        hand.SetAsLastSibling();endButton.transform.SetAsLastSibling();
        SetLayer(canvas);layout.ApplyLayout(9f/16f);player.LookAt(blocks[0].transform.position,false);
        if(mars)File.WriteAllText(Root+"CREDITS_NachoRocket.txt","Rocket: \"2019 Nacho Rocket\" (https://sketchfab.com/3d-models/2019-nacho-rocket-9d04abbee6e84b969fd680ccf6056d59) by niubit, licensed under CC-BY-4.0. Rebuilt as an outer block shell.\nMap: crashed-rocket-minecraft-gommehdnet-citybuild (Outsources/rocket map). Rebuilt as a reduced voxel mesh.\n");
        else File.WriteAllText(Root+"CREDITS.txt","Moon terrain: \"Moon Minecraft terrain\" (https://sketchfab.com/3d-models/moon-minecraft-terrain-3efc99245eaf45eeba558c879e0931a0) by DURVESH S, licensed under CC-BY-4.0. Rebuilt as a reduced voxel mesh.\n");
        EditorUtility.SetDirty(game);EditorUtility.SetDirty(player);EditorUtility.SetDirty(luna);EditorUtility.SetDirty(layout);
        ConvertOutlines(scene); /* Luna drops UI.Outline: swap for RocketOutline copies */
        EditorSceneManager.MarkSceneDirty(scene);EditorSceneManager.SaveScene(scene);AssetDatabase.SaveAssets();
        Selection.activeGameObject=rootGo;Debug.Log("[Rocket] Scene built: "+ScenePath+" ("+blocks.Length+" blocks, rocket "+sx+"x"+sy+"x"+sz+")");
    }

    // ------------------------------------------------------------------ helpers
    static void ImportSettings()
    {
        foreach(var guid in AssetDatabase.FindAssets("t:Texture2D",new[]{Root+"Textures"}))
        {
            var ti=(TextureImporter)AssetImporter.GetAtPath(AssetDatabase.GUIDToAssetPath(guid));
            if(ti.filterMode==FilterMode.Point&&!ti.mipmapEnabled&&ti.wrapMode==TextureWrapMode.Repeat)continue;
            ti.textureType=TextureImporterType.Default;ti.filterMode=FilterMode.Point;ti.mipmapEnabled=false;ti.wrapMode=TextureWrapMode.Repeat;ti.textureCompression=TextureImporterCompression.Uncompressed;ti.SaveAndReimport();
        }
        var fly=(TextureImporter)AssetImporter.GetAtPath(Root+"UI/FlyIcon.png");
        if(fly!=null&&fly.textureType!=TextureImporterType.Sprite){fly.textureType=TextureImporterType.Sprite;fly.spriteImportMode=SpriteImportMode.Single;fly.mipmapEnabled=false;fly.alphaIsTransparency=true;fly.SaveAndReimport();}
        var mi=(ModelImporter)AssetImporter.GetAtPath(Root+"Models/moon_terrain.obj");
        if(mi!=null){mi.materialImportMode=ModelImporterMaterialImportMode.ImportStandard;mi.importAnimation=false;mi.isReadable=false;mi.addCollider=false;mi.importNormals=ModelImporterNormals.Import;mi.SaveAndReimport();}
    }
    // ---------- LaunchRocket: rockets 2-4 (Data/launch_rocketN.json), the "choose your rocket" cards, grass map toggle, lift-off fx
    static void AddRocketChoices(GameObject rootGo,Transform canvas,RocketPlayable game,RocketLuna luna,Camera camera,FurnitureInventoryEntry[] inv,Image pic,GameObject[] hide,
        Transform rocketRoot,GameObject[] blocks,int[] blockTypes,RocketData rocket,Sprite[] typeIcons,Sprite preview,Mesh cube,Vector3 pad)
    {
        string dir=Root+"Launch/";Folder(dir+"Meshes");Folder(dir+"Materials");
        // hotbar slots: every catalog slot, filled per rocket when it is chosen
        var pool=new RocketBlockType[inv.Length];
        for(int i=0;i<inv.Length;i++)
        {
            var e=inv[i];var nameT=e.button.transform.Find("Name");var h=e.button.transform.Find("Tutorial hand");if(h!=null&&h!=game.hand)h.gameObject.SetActive(false);if(e.emptyBadge!=null)e.emptyBadge.SetActive(false);
            pool[i]=new RocketBlockType{name=e.button.gameObject.name,button=e.button,frame=e.frame,icon=e.icon,countText=e.quantityText,nameText=nameT!=null?nameT.GetComponent<Text>():null,emptyBadge=e.emptyBadge};
        }
        string[] titles={"Nacho Rocket","Saturn V","Tier 6 Rocket","Pablo Rocket"};
        var choices=new RocketChoice[4];var names0=new string[rocket.types.Length];for(int i=0;i<names0.Length;i++)names0[i]=rocket.types[i].name;
        rocketRoot.name="Rocket 1 — "+titles[0]+" ("+blocks.Length+" blocks)";
        // Nacho boarding ladder = the diagonal run from the ground up to the hatch (x<15, x<=y+3): it stays behind at LAUNCH
        var ladder=new List<GameObject>();for(int i=0;i<rocket.blocks.Length;i++){var b=rocket.blocks[i];if((b.x<15&&b.x<=b.y+3+NachoBaseLayers)||(b.x<=16&&b.y==11-NachoBaseLayers))ladder.Add(blocks[i]);} /* + the brick landing at the hatch (y already lowered by the removed base) */
        choices[0]=new RocketChoice{name=titles[0],root=rocketRoot,blocks=blocks,blockTypes=blockTypes,typeNames=names0,typeIcons=typeIcons,blueprint=preview,hideOnLaunch=ladder.ToArray()};
        var white=Tex("block_white");var shadedCube=ShadedCube(cube,dir+"Meshes/shaded_cube.asset");
        for(int r=2;r<=4;r++)
        {
            var d=JsonUtility.FromJson<RocketData>(File.ReadAllText(Root+"Data/launch_rocket"+r+".json"));
            var mats=new Material[d.types.Length];var icons=new Sprite[d.types.Length];var names=new string[d.types.Length];
            for(int t=0;t<d.types.Length;t++){var c=d.types[t].color;names[t]=d.types[t].name;mats[t]=BlockMat("Block Launch"+r+" "+names[t],white,new Color(c[0]/255f,c[1]/255f,c[2]/255f,1f)); /* Luna-safe unlit (URP/Lit renders pink in Luna) */icons[t]=RenderBlockIcon(mats[t],"Launch"+r+"_"+names[t].Replace(" ",""));}
            int sx=0,sz=0;foreach(var b in d.blocks){sx=Mathf.Max(sx,b.x+1);sz=Mathf.Max(sz,b.z+1);}
            var root=new GameObject("Rocket "+r+" — "+titles[r-1]+" ("+d.blocks.Length+" blocks)").transform;root.SetParent(rootGo.transform,false);root.position=pad;
            var gos=new GameObject[d.blocks.Length];var bt=new int[d.blocks.Length];
            for(int i=0;i<d.blocks.Length;i++)
            {
                var b=d.blocks[i];var go=new GameObject((i+1).ToString("0000")+" "+names[b.t],typeof(MeshFilter),typeof(MeshRenderer));go.transform.SetParent(root,false);
                go.transform.localPosition=new Vector3(b.x-sx*.5f+.5f,b.y+.5f,b.z-sz*.5f+.5f);go.GetComponent<MeshFilter>().sharedMesh=shadedCube;var mr=go.GetComponent<MeshRenderer>();mr.sharedMaterial=mats[b.t];mr.shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;mr.receiveShadows=false;
                gos[i]=go;bt[i]=b.t;
            }
            var bp=RenderRocket(root,gos,"RocketBlueprint_Launch"+r);foreach(var go in gos)go.SetActive(false);
            choices[r-1]=new RocketChoice{name=titles[r-1],root=root,blocks=gos,blockTypes=bt,typeNames=names,typeIcons=icons,blueprint=bp};
        }
        // choice cards (rounded frame + surface + rocket picture), one row where the hotbar goes
        var round=RoundSlotSprite();
        var panelGo=new GameObject("Choose rocket — 4 options",typeof(RectTransform),typeof(GridLayoutGroup));panelGo.transform.SetParent(canvas,false);
        var grid=panelGo.GetComponent<GridLayoutGroup>();grid.spacing=new Vector2(22,22);grid.childAlignment=TextAnchor.MiddleCenter;grid.constraint=GridLayoutGroup.Constraint.FixedColumnCount;grid.constraintCount=4;
        for(int i=0;i<4;i++)
        {
            string json=i==0?Root+NachoLaunchJson:Root+"Data/launch_rocket"+(i+1)+".json";string ip=Root+"UI/LaunchRocket"+(i+1)+".png";
            RocketVoxelizer.Preview(new[]{json},ip,30f,true,256);AssetDatabase.ImportAsset(ip);var ti=(TextureImporter)AssetImporter.GetAtPath(ip);ti.textureType=TextureImporterType.Sprite;ti.spriteImportMode=SpriteImportMode.Single;ti.mipmapEnabled=false;ti.alphaIsTransparency=true;ti.SaveAndReimport();
            var frame=Panel("Rocket option "+(i+1)+" — "+titles[i],panelGo.transform,new Color(1f,1f,1f,.9f)); /* light, see-through cards */frame.sprite=round;frame.type=Image.Type.Sliced;frame.raycastTarget=true;
            var btn=frame.gameObject.AddComponent<Button>();btn.transition=Selectable.Transition.None;
            var surf=Panel("Surface",frame.transform,new Color(.55f,.8f,1f,.45f));surf.sprite=round;surf.type=Image.Type.Sliced;Anchors(surf.rectTransform,Vector2.zero,Vector2.one);surf.rectTransform.offsetMin=new Vector2(9,9);surf.rectTransform.offsetMax=new Vector2(-9,-9);
            var icon=Panel("Rocket",frame.transform,Color.white);icon.sprite=AssetDatabase.LoadAssetAtPath<Sprite>(ip);icon.preserveAspect=true;Anchors(icon.rectTransform,Vector2.zero,Vector2.one);icon.rectTransform.offsetMin=new Vector2(14,14);icon.rectTransform.offsetMax=new Vector2(-14,-14);
            choices[i].button=btn;choices[i].frame=frame;
        }
        // lift-off fx, normal 3D-game look (not blocks): soft glowing billboards. No ParticleSystem (excluded from this
        // Luna build): pooled quads driven by RocketPlayable, plain-CG shaders CEBB/Particle Additive + CEBB/Particle Alpha.
        Folder(dir+"Textures");
        var glowTex=FxTexture(dir+"Textures/fx_glow.png",64,64,(u,v)=>{float r=Mathf.Clamp01(Vector2.Distance(new Vector2(u,v),new Vector2(.5f,.5f))*2f);float a=1f-r;return a*a*(3f-2f*a);});
        var flameTex=FxTexture(dir+"Textures/fx_flame.png",64,128,(u,v)=>{float half=.5f*(.18f+.82f*Mathf.Pow(v,.55f));float dx=Mathf.Abs(u-.5f)/Mathf.Max(.01f,half);if(dx>=1f)return 0f;float side=1f-dx*dx;return side*Mathf.Pow(v,.7f);}); /* v=1 nozzle (wide, bright) -> v=0 tip */
        var smokeTex=FxTexture(dir+"Textures/fx_smoke.png",64,64,(u,v)=>{float r=Mathf.Clamp01(Vector2.Distance(new Vector2(u,v),new Vector2(.5f,.5f))*2f);float n=.75f+.25f*Mathf.PerlinNoise(u*5.3f,v*5.3f);float a=Mathf.Clamp01((1f-r)*1.4f);return a*a*n;});
        var glowMat=FxMat("FX glow additive","CEBB/Particle Additive",glowTex);var flameMat=FxMat("FX flame additive","CEBB/Particle Additive",flameTex);var smokeMatShared=FxMat("FX smoke","CEBB/Particle Alpha",smokeTex);
        var vcol=glowMat;
        var fx=new GameObject("Launch fx — flames, smoke").transform;fx.SetParent(rootGo.transform,false);
        var flames=new Transform[3];
        flames[0]=FxCube("Flame 0 — nozzle glow",fx,FxMesh(FxQuad(new Color(1f,.82f,.5f),false),dir+"Meshes/fx_glow.asset"),glowMat);
        flames[1]=FxCube("Flame 1 — outer orange",fx,FxMesh(FxQuad(new Color(1f,.42f,.1f),true),dir+"Meshes/fx_flame_outer.asset"),flameMat);
        flames[2]=FxCube("Flame 2 — hot core",fx,FxMesh(FxQuad(new Color(1f,.93f,.7f),true),dir+"Meshes/fx_flame_core.asset"),flameMat);
        var smokeMesh=FxMesh(FxQuad(Color.white,false),dir+"Meshes/fx_smoke.asset");var smoke=new Transform[160];for(int i=0;i<smoke.Length;i++)smoke[i]=FxCube("Smoke "+i,fx,smokeMesh,smokeMatShared);
        // grass map from AutoBuildRocketGrass, shifted (whole blocks) so its launch pad sits on ours; the player walks on its heights when it is on
        var gData=JsonUtility.FromJson<MoonData>(File.ReadAllText(Root+"Data/grass_map.json"));
        Vector3Int delta=Vector3Int.RoundToInt(pad-new Vector3(gData.pad.x,gData.pad.y,gData.pad.z));
        GameObject desert=null;foreach(Transform t in rootGo.transform)if(t.name.StartsWith("Mars"))desert=t.gameObject;
        var gs=UnityEditor.SceneManagement.EditorSceneManager.OpenScene("Assets/Scenes/AutoBuildRocketGrass.unity",UnityEditor.SceneManagement.OpenSceneMode.Additive);GameObject grassGo=null;
        foreach(var g in gs.GetRootGameObjects())foreach(Transform t in g.transform)if(t.name.StartsWith("Meadow")){grassGo=Object.Instantiate(t.gameObject);UnityEngine.SceneManagement.SceneManager.MoveGameObjectToScene(grassGo,rootGo.scene);}
        UnityEditor.SceneManagement.EditorSceneManager.CloseScene(gs,true);
        if(grassGo!=null){grassGo.name="Grass map (Luna: Desert map off)";grassGo.transform.SetParent(rootGo.transform,true);grassGo.transform.position+=delta;grassGo.SetActive(false);}
        if(desert!=null)desert.name="Desert map — crashed-rocket Minecraft map";
        luna.desertWorld=desert;luna.grassWorld=grassGo;luna.skyCamera=camera;
        luna.grassWidth=gData.width;luna.grassDepth=gData.depth;luna.grassOriginX=gData.originX+delta.x;luna.grassOriginZ=gData.originZ+delta.z;
        luna.grassHeights=new int[gData.heights.Length];for(int i=0;i<gData.heights.Length;i++)luna.grassHeights[i]=gData.heights[i]+delta.y;
        // wiring
        // fireworks when the rocket is complete: 90 pooled glowing streak billboards (additive) driven by RocketPlayable
        // (no ParticleSystem: that module is excluded from this project's Luna build and crashes the playable)
        Color[] sc={new Color(1f,.85f,.3f),new Color(1f,.45f,.2f),new Color(.35f,.85f,1f),new Color(.55f,1f,.45f),new Color(1f,.35f,.75f),new Color(.75f,.55f,1f)};
        var sparkMeshes=new Mesh[sc.Length];for(int i=0;i<sc.Length;i++)sparkMeshes[i]=FxMesh(FxQuad(sc[i],false),dir+"Meshes/fx_spark"+i+".asset");
        var sparkRoot=new GameObject("Fireworks — spark pool").transform;sparkRoot.SetParent(fx,false);
        var sparks=new Transform[90];for(int i=0;i<sparks.Length;i++)sparks[i]=FxCube("Spark "+i,sparkRoot,sparkMeshes[i%sc.Length],vcol);
        game.sparks=sparks;
        game.smokeLife=5f;game.groundSmokeLife=7f; /* long-lived haze the camera rises through */
        game.transitionHeight=200f;game.transitionMaxSeconds=10f; /* cards come in once the rocket has vanished (10 s safety) */
        game.flyHeight=550f;game.camFollowMax=55f; /* camera stops rising, the rocket shrinks to a dot and disappears (far clip 700) */
        BuildEndScreen(canvas,game,luna,choices,round,dir);
        // CONTINUE: shown 3 s after LAUNCH, tap = end game + store
        var cont=BigButton("CONTINUE button",canvas,game.launchButton!=null?game.launchButton.GetComponent<Image>().sprite:null,"CONTINUE");
        var cr=(RectTransform)cont.transform;cr.anchorMin=cr.anchorMax=cr.pivot=new Vector2(.5f,.5f);cr.sizeDelta=new Vector2(520,160);cr.anchoredPosition=new Vector2(0,-560);cont.gameObject.SetActive(false);game.continueButton=cont;
        // no countdown on screen (time limit still ends the game): hide the timer, built count fills the box
        if(luna.timerText!=null){luna.timerText.gameObject.SetActive(false);luna.timerText=null;}
        if(game.countText!=null){var ct=game.countText.rectTransform;ct.anchorMin=new Vector2(.08f,.15f);ct.anchorMax=new Vector2(.92f,.85f);ct.offsetMin=ct.offsetMax=Vector2.zero;}
        // brighter grass map: own copies of its materials (the grass scene keeps the originals) + lighter sky
        if(grassGo!=null)
        {
            var copies=new Dictionary<Material,Material>();
            foreach(var r in grassGo.GetComponentsInChildren<Renderer>(true))
            {
                var ms=r.sharedMaterials;
                for(int i=0;i<ms.Length;i++)
                {
                    var m=ms[i];if(m==null||!m.HasProperty("_Color"))continue;Material c;
                    if(!copies.TryGetValue(m,out c)){c=new Material(m){name="Bright "+m.name};c.SetColor("_Color",m.GetColor("_Color")*1.22f);string p=dir+"Materials/Bright_"+copies.Count+".mat";if(AssetDatabase.LoadAssetAtPath<Material>(p)!=null)AssetDatabase.DeleteAsset(p);AssetDatabase.CreateAsset(c,p);copies[m]=c;}
                    ms[i]=c;
                }
                r.sharedMaterials=ms;
            }
        }
        luna.grassSky=new Color(.62f,.86f,1f);
        foreach(var t in game.types)if(t!=null)t.material=null; /* icon-only URP/Lit mats: unused at runtime, Luna would export them as missing shaders */
        game.choices=choices;game.slotPool=pool;game.choicePanel=(RectTransform)panelGo.transform;game.choiceGrid=grid;game.minimapPicture=pic;game.hideWhileChoosing=hide;
        game.moveTutorialDistance=0.1f; /* any joystick drag finishes the move tutorial */
        // sounds: synthesised here (no external service), mono Vorbis 0.7. Engine = looping AudioSource faded by height in RocketPlayable
        Folder(dir+"Audio");
        game.engineSfx=SynthClip(dir+"Audio/sfx_rocket_engine.wav",EngineSamples());game.fireworkSfx=SynthClip(dir+"Audio/sfx_firework.wav",FireworkSamples());
        var realFw=AssetDatabase.LoadAssetAtPath<AudioClip>(dir+"Audio/sfx_firework_real.mp3");if(realFw!=null){game.fireworkSfx=realFw;game.fireworkBangs=CutBangs(realFw,dir+"Audio/sfx_firework_bang",4,1.3f);} /* user's sound, cut into short overlapping bangs */
        var eng=fx.gameObject.GetComponent<AudioSource>();if(eng==null)eng=fx.gameObject.AddComponent<AudioSource>();eng.playOnAwake=false;eng.loop=true;eng.spatialBlend=0f;eng.volume=0f;game.engineSource=eng;
        game.launchFly=true;game.launchFlames=flames;game.launchSmoke=smoke;game.quickBuildSeconds=2.2f;
        File.WriteAllText(Root+"CREDITS_LaunchRocket.txt","Rocket 1: \"2019 Nacho Rocket\" by niubit (CC-BY-4.0). Rocket 2: \"Low poly Saturn V\" (MODHUB). Rocket 3: \"Tier 6 Rocket Galaxy Space Mod\" by SubSlimeCrafter (CC-BY-4.0). Rocket 4: \"2019 Pablo Rocket\" (see Outsources/LaunchRockets/pablo/license.txt). All rebuilt as Minecraft-style blocks.\n");
    }
    // LaunchRocket uses the Nacho rocket without its base (the 6x6 landing-pad frames, layers 0-1), lowered to the ground
    const string NachoLaunchJson="Data/nacho_launch_blocks.json";const int NachoBaseLayers=2;
    static void WriteNachoWithoutBase()
    {
        var d=JsonUtility.FromJson<RocketData>(File.ReadAllText(Root+"Data/nacho_blocks.json"));var keep=new List<Block>();
        foreach(var b in d.blocks)if(b.y>=NachoBaseLayers){b.y-=NachoBaseLayers;keep.Add(b);}
        // the source model is missing blocks on one leg: make the 4 legs (x 16-29, z 0-13, below the body) mirror-symmetric
        var have=new HashSet<long>();foreach(var b in keep)have.Add(((long)b.x<<32)|((long)b.y<<16)|(long)b.z);
        var src=keep.ToArray();
        foreach(var b in src)
        {
            if(b.y>=10-NachoBaseLayers||b.x<16||b.x>29||b.z>13)continue;
            foreach(var m in new[]{new Vector2Int(45-b.x,b.z),new Vector2Int(b.x,13-b.z),new Vector2Int(45-b.x,13-b.z)})
            {
                long k=((long)m.x<<32)|((long)b.y<<16)|(long)m.y;if(have.Contains(k))continue;have.Add(k);
                keep.Add(new Block{x=m.x,y=b.y,z=m.y,t=b.t,m=b.m});
            }
        }
        keep.Sort((p,q)=>p.y!=q.y?p.y.CompareTo(q.y):p.z!=q.z?p.z.CompareTo(q.z):p.x.CompareTo(q.x));
        d.blocks=keep.ToArray();File.WriteAllText(Root+NachoLaunchJson,JsonUtility.ToJson(d));AssetDatabase.ImportAsset(Root+NachoLaunchJson);
    }
    // Luna-safe block material: same plain-CG shader as the Nacho atlas, texture x tint x baked face shading
    static Material BlockMat(string name,Texture2D tex,Color tint)
    {
        var m=new Material(Shader.Find("CEBB/Unlit Cutout VColor")){name=name};m.SetTexture("_MainTex",tex);m.SetColor("_Color",tint);m.SetFloat("_Cutoff",.5f);Save(m);return m;
    }
    // built-in cube + vertex colours: top 1, sides .8/.65, bottom .5 (Minecraft-like shading without lights)
    static Mesh ShadedCube(Mesh cube,string path)
    {
        var m=Object.Instantiate(cube);m.name="Shaded cube";var n=m.normals;var c=new Color[n.Length];
        for(int i=0;i<n.Length;i++){var v=n[i];float s=v.y>.5f?1f:v.y<-.5f?.5f:Mathf.Abs(v.x)>.5f?.8f:.65f;c[i]=new Color(s,s,s,1);}
        m.colors=c;return FxMesh(m,path);
    }
    // soft particle texture from an alpha function a(u,v) in 0..1 (white rgb, colour comes from the quad's vertex colours)
    static Texture2D FxTexture(string path,int w,int h,System.Func<float,float,float> alpha)
    {
        var tex=new Texture2D(w,h,TextureFormat.RGBA32,false);
        for(int y=0;y<h;y++)for(int x=0;x<w;x++)tex.SetPixel(x,y,new Color(1,1,1,Mathf.Clamp01(alpha((x+.5f)/w,(y+.5f)/h))));
        File.WriteAllBytes(path,tex.EncodeToPNG());Object.DestroyImmediate(tex);AssetDatabase.ImportAsset(path);
        var ti=(TextureImporter)AssetImporter.GetAtPath(path);ti.textureType=TextureImporterType.Default;ti.mipmapEnabled=false;ti.alphaIsTransparency=true;ti.wrapMode=TextureWrapMode.Clamp;ti.filterMode=FilterMode.Bilinear;ti.SaveAndReimport();
        return AssetDatabase.LoadAssetAtPath<Texture2D>(path);
    }
    static Material FxMat(string name,string shader,Texture2D tex){var m=new Material(Shader.Find(shader)){name=name};m.SetTexture("_MainTex",tex);m.SetColor("_Color",Color.white);Save(m);return m;}
    // 1x1 quad facing -Z with vertex colour; top=true hangs it below its pivot (flames grow down from the nozzle)
    static Mesh FxQuad(Color c,bool top)
    {
        float y0=top?-1f:-.5f,y1=top?0f:.5f;var m=new Mesh{name="FX quad"};
        m.vertices=new[]{new Vector3(-.5f,y0,0),new Vector3(.5f,y0,0),new Vector3(.5f,y1,0),new Vector3(-.5f,y1,0)};
        m.uv=new[]{new Vector2(0,0),new Vector2(1,0),new Vector2(1,1),new Vector2(0,1)};m.colors=new[]{c,c,c,c};m.triangles=new[]{0,2,1,0,3,2};
        m.RecalculateNormals();m.RecalculateBounds();return m;
    }
    // ---------- end screen: smoke cover + 2x2 rocket pictures (rendered from the 4 rockets on a space background)
    static void BuildEndScreen(Transform canvas,RocketPlayable game,RocketLuna luna,RocketChoice[] choices,Sprite round,string dir)
    {
        var pics=new Sprite[4];
        for(int i=0;i<4;i++)
        {
            /* the user's 4 pictures (Outsources/LaunchRockets/end_cards/cardN.png): square crop, 512 px, sharpened */
            pics[i]=ProcessCardImage("Outsources/LaunchRockets/end_cards/card"+(i+1)+".png",Root+"UI/EndCard"+(i+1)+".png");
        }
        // panel
        var panel=Panel("End — 4 rocket cards over the live view (no background)",canvas,new Color(0,0,0,0));Anchors(panel.rectTransform,Vector2.zero,Vector2.one);panel.raycastTarget=false;
        var gridGo=new GameObject("Grid 2x2",typeof(RectTransform),typeof(GridLayoutGroup));gridGo.transform.SetParent(panel.transform,false);
        var gr=(RectTransform)gridGo.transform;gr.anchorMin=gr.anchorMax=gr.pivot=new Vector2(.5f,.5f);gr.sizeDelta=new Vector2(900,900);
        var gl=gridGo.GetComponent<GridLayoutGroup>();gl.constraint=GridLayoutGroup.Constraint.FixedColumnCount;gl.constraintCount=2;gl.childAlignment=TextAnchor.MiddleCenter;gl.cellSize=new Vector2(420,420);gl.spacing=new Vector2(30,30);
        var cards=new RectTransform[4];var pictures=new Image[4];var buttons=new Button[4];
        for(int i=0;i<4;i++)
        {
            var cell=new GameObject("Cell "+(i+1),typeof(RectTransform));cell.transform.SetParent(gridGo.transform,false);
            /* thin white rounded frame (6 px), picture (rounded corners baked in) inside it */
            var frame=Panel("Card "+(i+1),cell.transform,Color.white);frame.sprite=round;frame.type=Image.Type.Sliced;frame.raycastTarget=true;Anchors(frame.rectTransform,Vector2.zero,Vector2.one);
            var pic=Panel("Picture",frame.transform,Color.white);pic.sprite=pics[i];pic.preserveAspect=false;Anchors(pic.rectTransform,Vector2.zero,Vector2.one);pic.rectTransform.offsetMin=new Vector2(6,6);pic.rectTransform.offsetMax=new Vector2(-6,-6);
            var btn=frame.gameObject.AddComponent<Button>();btn.transition=Selectable.Transition.None;
            cards[i]=frame.rectTransform;pictures[i]=pic;buttons[i]=btn;
        }
        panel.gameObject.SetActive(false);
        var title=Label("End title",panel.transform,"BUILD YOUR OWN ROCKET!",64);title.alignment=TextAnchor.MiddleCenter;title.color=Color.white;
        title.horizontalOverflow=HorizontalWrapMode.Wrap;title.verticalOverflow=VerticalWrapMode.Truncate; /* best fit only shrinks text that is not allowed to overflow */
        title.resizeTextForBestFit=true;title.resizeTextMinSize=20;title.resizeTextMaxSize=60;var to=title.gameObject.AddComponent<Outline>();to.effectColor=new Color(0,0,0,.85f);to.effectDistance=new Vector2(4,-4);
        game.endTitle=title;luna.endTitle="BUILD YOUR OWN ROCKET!";
        game.endPanel=panel.rectTransform;game.endGrid=gr;game.endCards=cards;game.endPictures=pictures;game.endButtons=buttons;game.smokeCover=null;
        luna.endImage1=pics[0].texture;luna.endImage2=pics[1].texture;luna.endImage3=pics[2].texture;luna.endImage4=pics[3].texture;
    }
    // ---------- 4 extra rocket designs for the end cards (voxel, vertex colours), written as Data/card_rocketN.json
    // 0 classic red-nose rocket with fins + portholes, 1 stainless "star" ship with flaps and heat-shield side,
    // 2 orange tank + 2 white side boosters, 3 retro multi-stage moon rocket with big fins
    static string WriteCardRocket(int design)
    {
        var cols=new List<Color32>();var cells=new Dictionary<Vector3Int,int>();
        System.Func<Color32,int> T=c=>{int i=cols.IndexOf(c);if(i<0){cols.Add(c);i=cols.Count-1;}return i;};
        System.Action<int,int,int,Color32> Put=(x,y,z,c)=>{cells[new Vector3Int(x,y,z)]=T(c);};
        System.Action<float,float,int,float,System.Func<int,int,int,Color32>> Disc=(ox,oz,y,r,col)=>{int R=Mathf.CeilToInt(r)+1;for(int x=-R;x<=R;x++)for(int z=-R;z<=R;z++){float d=Mathf.Sqrt((x+.5f)*(x+.5f)+(z+.5f)*(z+.5f));if(d<=r+.1f)Put(x+(int)ox,y,z+(int)oz,col(x,y,z));}};
        System.Action<int,int,int,int,Color32> Fins=(y0,y1,inner,len,c)=>{for(int y=y0;y<y1;y++){int l=Mathf.Max(1,Mathf.RoundToInt(len*(1f-(float)(y-y0)/(y1-y0))));for(int k=0;k<l;k++){int p=inner+k;Put(p,y,0,c);Put(p,y,-1,c);Put(-p-1,y,0,c);Put(-p-1,y,-1,c);Put(0,y,p,c);Put(-1,y,p,c);Put(0,y,-p-1,c);Put(-1,y,-p-1,c);}}};
        Color32 white=new Color32(236,236,232,255),red=new Color32(214,48,40,255),blue=new Color32(60,140,230,255),dark=new Color32(40,42,48,255),orange=new Color32(232,120,40,255),yellow=new Color32(250,200,50,255),steel=new Color32(196,200,206,255),steel2=new Color32(168,173,180,255),glass=new Color32(120,200,255,255);
        if(design==0)
        {
            for(int y=0;y<34;y++){float r=y<25 ? 3.6f : 3.6f*(1f-(y-25)/9f);if(r<.6f)r=.6f;int yy=y;Disc(0,0,y,r,(x,_,z)=>yy>=25 ? red : (yy==7||yy==8) ? red : (yy>=17&&yy<=19&&z>=2&&Mathf.Abs(x+.5f)<1.2f) ? glass : white);}
            Fins(0,10,3,4,red);for(int x=-1;x<=0;x++)for(int z=-1;z<=0;z++)Put(x,-1,z,dark);
        }
        else if(design==1)
        {
            for(int y=0;y<44;y++){float r=y<36 ? 4.4f : 4.4f*Mathf.Sqrt(Mathf.Max(0f,1f-((y-36)/8.5f)*((y-36)/8.5f)));if(r<.6f)r=.6f;int yy=y;Disc(0,0,y,r,(x,_,z)=>z>1 ? dark : (yy%6==0 ? steel2 : steel));} /* heat shield on the far side: the card shows the steel side */
            for(int y=2;y<10;y++)for(int k=0;k<3;k++){Put(5+k,y,0,steel2);Put(-6-k,y,0,steel2);Put(5+k,y,1,dark);Put(-6-k,y,1,dark);}
            for(int y=32;y<38;y++)for(int k=0;k<2;k++){Put(5+k,y,0,steel2);Put(-6-k,y,0,steel2);}
            for(int x=-2;x<=1;x++)for(int z=-2;z<=1;z++)Put(x,-1,z,dark);
        }
        else if(design==2)
        {
            for(int y=0;y<40;y++){float r=y<32 ? 3.6f : 3.6f*(1f-(y-32)/8.5f);if(r<.6f)r=.6f;int yy=y;Disc(0,0,y,r,(x,_,z)=>yy%9==0 ? new Color32(200,100,30,255) : orange);}
            foreach(int sx in new[]{-6,6})for(int y=0;y<34;y++){float r=y<29 ? 1.7f : 1.7f*(1f-(y-29)/5.5f);if(r<.4f)r=.4f;int yy=y;Disc(sx,0,y,r,(x,_,z)=>yy<2 ? dark : (yy==10||yy==20) ? new Color32(200,200,200,255) : white);}
            for(int y=8;y<24;y++)for(int x=-1;x<=0;x++)for(int z=4;z<=5;z++)Put(x,y,z,z==4 ? dark : white); /* small orbiter on the front */
            for(int y=8;y<13;y++)for(int x=-4;x<=3;x++)Put(x,y,5,white);
        }
        else
        {
            for(int y=0;y<38;y++)
            {
                float r=y<12 ? 4.6f : y<24 ? 3.6f : y<32 ? 2.6f : 2.6f*(1f-(y-32)/6.5f);if(r<.6f)r=.6f;int yy=y;
                Disc(0,0,y,r,(x,_,z)=>yy<12 ? ((yy/2)%2==0 ? blue : yellow) : yy<24 ? (yy==18||yy==19 ? red : white) : yy<32 ? ((yy==27&&z>=1&&Mathf.Abs(x+.5f)<1.2f) ? glass : blue) : red);
            }
            Fins(0,12,4,5,blue);for(int x=-2;x<=1;x++)for(int z=-2;z<=1;z++)Put(x,-1,z,dark);
        }
        // shift to positive coords, write in the RocketData json layout (types + blocks)
        int mx=int.MaxValue,my=int.MaxValue,mz=int.MaxValue;foreach(var k in cells.Keys){mx=Mathf.Min(mx,k.x);my=Mathf.Min(my,k.y);mz=Mathf.Min(mz,k.z);}
        var d=new RocketData{types=new BlockType[cols.Count],blocks=new Block[cells.Count]};
        for(int i=0;i<cols.Count;i++)d.types[i]=new BlockType{name="c"+i,color=new[]{(int)cols[i].r,(int)cols[i].g,(int)cols[i].b}};
        int n=0;foreach(var kv in cells)d.blocks[n++]=new Block{x=kv.Key.x-mx,y=kv.Key.y-my,z=kv.Key.z-mz,t=kv.Value};
        string path=Root+"Data/card_rocket"+(design+1)+".json";File.WriteAllText(path,JsonUtility.ToJson(d));return path;
    }
    // user picture -> centre square crop -> 512x512 (area-averaged when shrinking, bilinear when enlarging) -> unsharp mask
    static Sprite ProcessCardImage(string src,string dst)
    {
        const int S=512;var t=new Texture2D(2,2,TextureFormat.RGBA32,false);t.LoadImage(File.ReadAllBytes(src));
        int side=Mathf.Min(t.width,t.height),ox=(t.width-side)/2,oy=(t.height-side)/2;float step=(float)side/S;int taps=Mathf.Clamp(Mathf.CeilToInt(step),1,4);
        var px=new Color[S*S];
        for(int y=0;y<S;y++)for(int x=0;x<S;x++)
        {
            Color c=Color.clear;
            for(int j=0;j<taps;j++)for(int i=0;i<taps;i++){float u=(ox+(x+(i+.5f)/taps)*step)/t.width,v=(oy+(y+(j+.5f)/taps)*step)/t.height;c+=t.GetPixelBilinear(u,v);}
            px[y*S+x]=c/(taps*taps);
        }
        Object.DestroyImmediate(t);
        float amount=step<1f ? 0.9f : 0.5f; /* enlarged pictures need more sharpening */
        var o=new Color[S*S];
        for(int y=0;y<S;y++)for(int x=0;x<S;x++)
        {
            Color sum=Color.clear;float w=0f;
            for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){int xx=Mathf.Clamp(x+i,0,S-1),yy=Mathf.Clamp(y+j,0,S-1);float k=(i==0&&j==0) ? 4f : (i==0||j==0) ? 2f : 1f;sum+=px[yy*S+xx]*k;w+=k;}
            Color c=px[y*S+x],blur=sum/w;Color r=c+(c-blur)*amount;r.r=Mathf.Clamp01(r.r);r.g=Mathf.Clamp01(r.g);r.b=Mathf.Clamp01(r.b);
            /* rounded corners baked into the alpha (no border, no UI Mask needed in Luna) */
            const float CR=22f; /* about frame radius (20) minus the 6 px border at card size */float cx=Mathf.Max(0f,Mathf.Max(CR-(x+.5f),(x+.5f)-(S-CR))),cy=Mathf.Max(0f,Mathf.Max(CR-(y+.5f),(y+.5f)-(S-CR)));
            r.a=Mathf.Clamp01(CR-Mathf.Sqrt(cx*cx+cy*cy)+.5f);o[y*S+x]=r;
        }
        var tex=new Texture2D(S,S,TextureFormat.RGBA32,false);tex.SetPixels(o);tex.Apply();var sp=SavePicture(tex,dst);
        var ti=(TextureImporter)AssetImporter.GetAtPath(dst);ti.textureCompression=TextureImporterCompression.Uncompressed;ti.filterMode=FilterMode.Bilinear;ti.alphaIsTransparency=true;ti.SaveAndReimport(); /* keep it crisp; clean rounded edges */
        return AssetDatabase.LoadAssetAtPath<Sprite>(dst);
    }
    static Color[] SpacePixels(int s,int seed)
    {
        var rnd=new System.Random(seed);var px=new Color[s*s];float ox=seed*1.37f,oy=seed*2.11f;
        for(int y=0;y<s;y++)for(int x=0;x<s;x++)
        {
            float u=(float)x/s,v=(float)y/s;Color c=Color.Lerp(new Color(.02f,.03f,.1f),new Color(.1f,.04f,.18f),v);
            float n=Mathf.PerlinNoise(ox+u*3f,oy+v*3f);n=Mathf.Clamp01((n-.35f)*2f);float n2=Mathf.Clamp01((Mathf.PerlinNoise(oy+u*5f,ox+v*5f)-.45f)*2.5f);
            c+=new Color(.35f,.12f,.5f)*n*n*.9f+new Color(.55f,.28f,.12f)*n2*n2*.5f+new Color(.1f,.25f,.5f)*Mathf.PerlinNoise(u*7f+oy,v*7f)*.15f;
            px[y*s+x]=c;
        }
        for(int k=0;k<s*s/400;k++){int x=rnd.Next(s),y=rnd.Next(s);float b=(float)rnd.NextDouble();px[y*s+x]+=Color.white*(.4f+.6f*b);if(b>.85f){for(int d=1;d<=1;d++){if(x+d<s)px[y*s+x+d]+=Color.white*.35f;if(x-d>=0)px[y*s+x-d]+=Color.white*.35f;if(y+d<s)px[(y+d)*s+x]+=Color.white*.35f;if(y-d>=0)px[(y-d)*s+x]+=Color.white*.35f;}}}
        return px;
    }
    static Sprite SpacePicture(string path,int seed){const int S=512;var t=new Texture2D(S,S,TextureFormat.RGBA32,false);t.SetPixels(SpacePixels(S,seed));t.Apply();return SavePicture(t,path);}
    static Sprite SmokeCoverPicture(string path)
    {
        const int S=256;var t=new Texture2D(S,S,TextureFormat.RGBA32,false);
        for(int y=0;y<S;y++)for(int x=0;x<S;x++){float u=(float)x/S,v=(float)y/S;float n=Mathf.PerlinNoise(u*4f,v*4f)*.6f+Mathf.PerlinNoise(u*9f+3f,v*9f+7f)*.4f;float g=.82f+.18f*n;t.SetPixel(x,y,new Color(g,g,g*.98f,1f));}
        t.Apply();return SavePicture(t,path);
    }
    // space background + exhaust glow + billowing smoke under the rocket, rocket (scaled to leave room for the flame) on top
    static Sprite ComposeEndPicture(string rawPath,string outPath,int seed)
    {
        const int S=512;var raw=new Texture2D(2,2,TextureFormat.RGBA32,false);raw.LoadImage(File.ReadAllBytes(rawPath));
        int rw=raw.width,rh=raw.height;int minX=rw,maxX=0,minY=rh;
        for(int y=0;y<rh;y++)for(int x=0;x<rw;x++)if(raw.GetPixel(x,y).a>.1f){minX=Mathf.Min(minX,x);maxX=Mathf.Max(maxX,x);minY=Mathf.Min(minY,y);}
        float sc=.72f,offY=1f-sc-.03f;var px=SpacePixels(S,seed);var rnd=new System.Random(seed);
        float cx=((minX+maxX)*.5f/rw*sc+(1f-sc)*.5f)*S,by=(minY/(float)rh*sc+offY)*S,rwid=(maxX-minX)/(float)rw*sc*S;
        // smoke clouds (behind the flame), soft white-grey blobs spread around the nozzle
        var blobs=new List<Vector4>();for(int k=0;k<14;k++){float a=(float)rnd.NextDouble();float side=(k%2==0?-1f:1f)*(.2f+(float)rnd.NextDouble()*1.1f);blobs.Add(new Vector4(cx+side*rwid*.7f,by-(.05f+.25f*a)*S,(.08f+.08f*(float)rnd.NextDouble())*S,.7f+.3f*(float)rnd.NextDouble()));}
        for(int y=0;y<S;y++)for(int x=0;x<S;x++)
        {
            Color c=px[y*S+x];float sm=0f;
            foreach(var b in blobs){float d=Vector2.Distance(new Vector2(x,y),new Vector2(b.x,b.y))/b.z;if(d<1f){float a=(1f-d*d)*b.w;sm=Mathf.Max(sm,a*(.75f+.25f*Mathf.PerlinNoise(x*.04f+b.x,y*.04f)));}}
            c=Color.Lerp(c,new Color(.88f,.86f,.84f),sm*.9f);
            // flame: long glow cone hanging from the nozzle (additive)
            float fy=(by-y)/(S*.3f);if(fy>-.04f&&fy<1f){float half=rwid*(.22f*(1f-fy)+.05f);float fx=Mathf.Abs(x-cx)/Mathf.Max(1f,half);if(fx<1.6f){float glow=Mathf.Clamp01(1f-fx/1.6f)*Mathf.Clamp01(1f-fy);c+=new Color(1f,.55f,.15f)*glow*1.1f+new Color(1f,.95f,.7f)*Mathf.Clamp01(1f-fx)*Mathf.Clamp01(1f-fy*1.6f)*.9f;}}
            // rocket on top
            float ru=((float)x/S-(1f-sc)*.5f)/sc,rv=((float)y/S-offY)/sc;
            if(ru>=0f&&ru<=1f&&rv>=0f&&rv<=1f){var r=raw.GetPixelBilinear(ru,rv);c=Color.Lerp(c,new Color(r.r,r.g,r.b),r.a);}
            c.a=1f;px[y*S+x]=c;
        }
        Object.DestroyImmediate(raw);var t=new Texture2D(S,S,TextureFormat.RGBA32,false);t.SetPixels(px);t.Apply();return SavePicture(t,outPath);
    }
    static Sprite SavePicture(Texture2D t,string path)
    {
        File.WriteAllBytes(path,t.EncodeToPNG());Object.DestroyImmediate(t);AssetDatabase.ImportAsset(path);
        var ti=(TextureImporter)AssetImporter.GetAtPath(path);ti.textureType=TextureImporterType.Sprite;ti.spriteImportMode=SpriteImportMode.Single;ti.mipmapEnabled=false;ti.alphaIsTransparency=false;ti.maxTextureSize=512;ti.SaveAndReimport();
        return AssetDatabase.LoadAssetAtPath<Sprite>(path);
    }
    // ---------- synthesised sound effects (22.05 kHz mono)
    const int SfxRate=22050;
    // rocket engine: deep brown-noise roar + low rumble + crackle, 2 s, seamless loop (tail cross-faded into the head)
    static float[] EngineSamples()
    {
        var rnd=new System.Random(7);int n=SfxRate*2,fade=SfxRate/2;var s=new float[n+fade];float b=0f,b2=0f;
        for(int i=0;i<s.Length;i++)
        {
            float w=(float)(rnd.NextDouble()*2-1);b=(b+0.025f*w)/1.025f;b2=b2*0.96f+w*0.04f; /* brown noise (roar) + softer band (hiss) */
            float t=(float)i/SfxRate;float rumble=Mathf.Sin(t*2f*Mathf.PI*42f)*0.25f*(0.7f+0.3f*Mathf.Sin(t*2f*Mathf.PI*3.1f));
            float crackle=rnd.NextDouble()<0.004 ? (float)(rnd.NextDouble()*2-1)*0.5f : 0f;
            s[i]=b*9f+b2*0.6f+rumble+crackle;
        }
        var o=new float[n];for(int i=0;i<n;i++)o[i]=s[i];
        for(int i=0;i<fade;i++){float k=(float)i/fade;o[i]=s[i]*k+s[n+i]*(1f-k);} /* loop point */
        return Normalize(o,0.8f);
    }
    // firework: low boom + bright crackle tail, 1.8 s
    static float[] FireworkSamples()
    {
        var rnd=new System.Random(11);int n=(int)(SfxRate*1.8f);var o=new float[n];float lp=0f,prev=0f;
        for(int i=0;i<n;i++)
        {
            float t=(float)i/SfxRate;float w=(float)(rnd.NextDouble()*2-1);lp=lp*0.85f+w*0.15f;
            float boom=(lp*1.6f+Mathf.Sin(t*2f*Mathf.PI*(70f-25f*t))*0.9f)*Mathf.Exp(-t*9f);
            float density=t<0.12f ? 0f : 0.03f*Mathf.Exp(-(t-0.12f)*2.2f);
            float crack=rnd.NextDouble()<density ? (w-prev)*1.4f : 0f;prev=w;
            o[i]=boom+crack+(w-prev)*0.02f*Mathf.Exp(-t*3f);
        }
        return Normalize(o,0.85f);
    }
    // finds the 'count' loudest onsets (>= 0.5 s apart) in a long firework clip and saves each as a short one-shot
    // (from just before the bang, 'seconds' long, faded out over the last 30 %), resampled to SfxRate mono
    static AudioClip[] CutBangs(AudioClip clip,string pathPrefix,int count,float seconds)
    {
        int ch=clip.channels,fr=clip.frequency,n=clip.samples;var raw=new float[n*ch];if(!clip.GetData(raw,0))return new AudioClip[0];
        var mono=new float[n];for(int i=0;i<n;i++){float v=0f;for(int c=0;c<ch;c++)v+=raw[i*ch+c];mono[i]=v/ch;}
        int win=fr/100;int frames=n/win;var env=new float[frames];for(int f=0;f<frames;f++){float e=0f;for(int i=0;i<win;i++){float v=mono[f*win+i];e+=v*v;}env[f]=Mathf.Sqrt(e/win);}
        // onset strength = rise of the envelope over the previous 50 ms
        var onset=new float[frames];for(int f=5;f<frames;f++){float prev=0f;for(int k=1;k<=5;k++)prev=Mathf.Max(prev,env[f-k]);onset[f]=Mathf.Max(0f,env[f]-prev);}
        int len=(int)(seconds*fr);var picks=new List<int>();var used=new bool[frames];
        for(int p=0;p<count;p++)
        {
            int best=-1;float bv=0f;for(int f=0;f<frames;f++){if(used[f]||f*win+len>=n)continue;if(onset[f]>bv){bv=onset[f];best=f;}}
            if(best<0)break;picks.Add(best);for(int f=Mathf.Max(0,best-50);f<Mathf.Min(frames,best+50);f++)used[f]=true; /* 0.5 s apart */
        }
        picks.Sort();var res=new List<AudioClip>();
        for(int p=0;p<picks.Count;p++)
        {
            int start=Mathf.Max(0,picks[p]*win-fr*3/100);int outN=(int)(seconds*SfxRate);var o=new float[outN];
            for(int i=0;i<outN;i++){float src=start+(float)i*fr/SfxRate;int a=(int)src;float t=src-a;float v=a+1<n ? mono[a]*(1f-t)+mono[a+1]*t : 0f;float k=(float)i/outN;float fade=k<0.7f ? 1f : 1f-(k-0.7f)/0.3f;o[i]=v*fade*(i<SfxRate/200 ? (float)i/(SfxRate/200) : 1f);}
            res.Add(SynthClip(pathPrefix+(p+1)+".wav",Normalize(o,0.9f)));
        }
        return res.ToArray();
    }
    static float[] Normalize(float[] s,float peak){float m=0.0001f;foreach(var v in s)m=Mathf.Max(m,Mathf.Abs(v));for(int i=0;i<s.Length;i++)s[i]=s[i]/m*peak;return s;}
    static AudioClip SynthClip(string path,float[] s)
    {
        using(var fs=new FileStream(path,FileMode.Create))using(var bw=new BinaryWriter(fs))
        {
            int bytes=s.Length*2;bw.Write(System.Text.Encoding.ASCII.GetBytes("RIFF"));bw.Write(36+bytes);bw.Write(System.Text.Encoding.ASCII.GetBytes("WAVEfmt "));
            bw.Write(16);bw.Write((short)1);bw.Write((short)1);bw.Write(SfxRate);bw.Write(SfxRate*2);bw.Write((short)2);bw.Write((short)16);
            bw.Write(System.Text.Encoding.ASCII.GetBytes("data"));bw.Write(bytes);foreach(var v in s)bw.Write((short)Mathf.RoundToInt(Mathf.Clamp(v,-1f,1f)*32767f));
        }
        AssetDatabase.ImportAsset(path);var ai=(AudioImporter)AssetImporter.GetAtPath(path);ai.forceToMono=true;
        var st=ai.defaultSampleSettings;st.compressionFormat=AudioCompressionFormat.Vorbis;st.quality=0.7f;st.loadType=AudioClipLoadType.DecompressOnLoad;ai.defaultSampleSettings=st;ai.SaveAndReimport();
        return AssetDatabase.LoadAssetAtPath<AudioClip>(path);
    }
    static Mesh FxMesh(Mesh m,string path){if(AssetDatabase.LoadAssetAtPath<Mesh>(path)!=null)AssetDatabase.DeleteAsset(path);AssetDatabase.CreateAsset(m,path);return m;}
    static Transform FxCube(string name,Transform parent,Mesh mesh,Material mat)
    {
        var go=new GameObject(name,typeof(MeshFilter),typeof(MeshRenderer));go.transform.SetParent(parent,false);go.GetComponent<MeshFilter>().sharedMesh=mesh;
        var r=go.GetComponent<MeshRenderer>();r.sharedMaterial=mat;r.shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;r.receiveShadows=false;go.SetActive(false);return go.transform;
    }
    // white rounded square, 9-sliced (corner radius 20 px)
    static Sprite RoundSlotSprite()
    {
        string path=Root+"UI/RoundSlot.png";const int S=64,R=20;var tex=new Texture2D(S,S,TextureFormat.RGBA32,false);
        for(int y=0;y<S;y++)for(int x=0;x<S;x++){float cx=Mathf.Clamp(x+.5f,R,S-R),cy=Mathf.Clamp(y+.5f,R,S-R);float d=Vector2.Distance(new Vector2(x+.5f,y+.5f),new Vector2(cx,cy));tex.SetPixel(x,y,new Color(1,1,1,Mathf.Clamp01(R-d+.5f)));}
        File.WriteAllBytes(path,tex.EncodeToPNG());Object.DestroyImmediate(tex);AssetDatabase.ImportAsset(path);
        var ti=(TextureImporter)AssetImporter.GetAtPath(path);ti.textureType=TextureImporterType.Sprite;ti.spriteImportMode=SpriteImportMode.Single;ti.mipmapEnabled=false;ti.alphaIsTransparency=true;ti.spriteBorder=new Vector4(R+2,R+2,R+2,R+2);ti.SaveAndReimport();
        return AssetDatabase.LoadAssetAtPath<Sprite>(path);
    }
    static Texture2D Tex(string n){return AssetDatabase.LoadAssetAtPath<Texture2D>(Root+"Textures/"+n+".png");}
    static void Folder(string path){if(AssetDatabase.IsValidFolder(path))return;string parent=Path.GetDirectoryName(path).Replace('\\','/');Folder(parent);AssetDatabase.CreateFolder(parent,Path.GetFileName(path));}
    static void Save(Material m){string p=Root+"Materials/"+m.name+".mat";if(AssetDatabase.LoadAssetAtPath<Material>(p)!=null)AssetDatabase.DeleteAsset(p);AssetDatabase.CreateAsset(m,p);}
    static Material Lit(string name,Texture2D tex,Color tint)
    {
        var m=new Material(Shader.Find("Universal Render Pipeline/Lit")){name=name};m.SetTexture("_BaseMap",tex);m.mainTexture=tex;m.SetColor("_BaseColor",tint);m.color=tint;m.SetFloat("_Smoothness",0f);m.SetFloat("_Metallic",0f);Save(m);return m;
    }
    // Green meadow: per-tile textures cut from the Mineways atlas, greedy-merged quads (from Data/grass_map.json),
    // Minecraft-style face shading baked into vertex colours, plain unlit shader (Luna safe), a few flat clouds.
    public static int ConvertOutlines(UnityEngine.SceneManagement.Scene scene)
    {
        int n=0;
        foreach(var root in scene.GetRootGameObjects())foreach(var o in root.GetComponentsInChildren<Outline>(true))
        {
            var go=o.gameObject;var ro=go.GetComponent<CEBB.Playable.RocketOutline>();if(ro==null)ro=go.AddComponent<CEBB.Playable.RocketOutline>();
            ro.color=o.effectColor;ro.distance=Mathf.Max(Mathf.Abs(o.effectDistance.x),Mathf.Abs(o.effectDistance.y));Object.DestroyImmediate(o);n++;
        }
        return n;
    }
    static void BuildGrassWorld(Transform world,GrassData g)
    {
        string dir=Root+(mars?"Mars/":"Grass/");Folder(dir+"Tiles");Folder(dir+"Materials");Folder(dir+"Meshes");
        var atlas=new Texture2D(2,2,TextureFormat.RGBA32,false);atlas.LoadImage(File.ReadAllBytes(string.IsNullOrEmpty(g.atlas)?"Assets/Outsources/generated-assets/textures/Mineways2Skfb-RGBA.png":g.atlas));
        var shader=Shader.Find("CEBB/Unlit VColor");var mats=new Material[g.tiles.Length];
        for(int i=0;i<g.tiles.Length;i++)
        {
            var px=atlas.GetPixels(g.tiles[i].u,g.tiles[i].v,16,16);Color avg=Color.black;int n=0;foreach(var c in px)if(c.a>.5f){avg+=c;n++;}avg=n>0?avg/n:Color.gray;
            for(int k=0;k<px.Length;k++){if(px[k].a<.5f)px[k]=avg*.55f;px[k].a=1;} // leaves: fill the holes with a darker leaf colour (opaque)
            var t=new Texture2D(16,16,TextureFormat.RGBA32,false);t.SetPixels(px);t.Apply();string path=dir+"Tiles/tile_"+i.ToString("00")+".png";File.WriteAllBytes(path,t.EncodeToPNG());Object.DestroyImmediate(t);
            AssetDatabase.ImportAsset(path);var ti=(TextureImporter)AssetImporter.GetAtPath(path);ti.textureType=TextureImporterType.Default;ti.filterMode=FilterMode.Point;ti.mipmapEnabled=false;ti.wrapMode=TextureWrapMode.Repeat;ti.textureCompression=TextureImporterCompression.Uncompressed;ti.SaveAndReimport();
            string mp=dir+"Materials/tile_"+i.ToString("00")+".mat";if(AssetDatabase.LoadAssetAtPath<Material>(mp)!=null)AssetDatabase.DeleteAsset(mp);
            var m=new Material(shader){name=(mars?"Mars tile ":"Meadow tile ")+i};m.SetTexture("_MainTex",AssetDatabase.LoadAssetAtPath<Texture2D>(path));AssetDatabase.CreateAsset(m,mp);mats[i]=m;
        }
        Object.DestroyImmediate(atlas);
        Vector3[] dirs={Vector3.right,Vector3.left,Vector3.up,Vector3.down,Vector3.forward,Vector3.back};float[] shade={.8f,.8f,1f,.55f,.68f,.68f};
        int quadCount=g.quads.Length/7,perMesh=14000,chunk=0;
        for(int start=0;start<quadCount;start+=perMesh,chunk++)
        {
            int end=Mathf.Min(quadCount,start+perMesh);var verts=new List<Vector3>();var uvs=new List<Vector2>();var cols=new List<Color>();var tris=new List<int>[g.tiles.Length];
            for(int q=start;q<end;q++)
            {
                int o=q*7,tile=g.quads[o],d=g.quads[o+1],w=g.quads[o+5],h=g.quads[o+6];int[] pos={g.quads[o+2],g.quads[o+3],g.quads[o+4]};
                int ax=d/2;int o0=ax==0?1:0,o1=ax==2?1:2;float plane=pos[ax]+(d%2==0?1:0);
                var c=new Vector3[4];int[,] ab={{0,0},{1,0},{1,1},{0,1}};var uv=new Vector2[4];
                for(int k=0;k<4;k++)
                {
                    var p=new float[3];p[ax]=plane;p[o0]=pos[o0]+ab[k,0]*w;p[o1]=pos[o1]+ab[k,1]*h;
                    c[k]=new Vector3(p[0]+g.originX,p[1],p[2]+g.originZ);
                    uv[k]=ax==0?new Vector2(ab[k,1]*h,ab[k,0]*w):new Vector2(ab[k,0]*w,ab[k,1]*h); // sides: u horizontal, v up
                }
                int b0=verts.Count;verts.AddRange(c);uvs.AddRange(uv);var col=new Color(shade[d],shade[d],shade[d],1);for(int k=0;k<4;k++)cols.Add(col);
                if(tris[tile]==null)tris[tile]=new List<int>();
                bool flip=Vector3.Dot(Vector3.Cross(c[1]-c[0],c[2]-c[0]),dirs[d])<0;
                if(!flip)tris[tile].AddRange(new[]{b0,b0+1,b0+2,b0,b0+2,b0+3});else tris[tile].AddRange(new[]{b0,b0+2,b0+1,b0,b0+3,b0+2});
            }
            var mesh=new Mesh{name="Meadow chunk "+chunk};mesh.SetVertices(verts);mesh.SetUVs(0,uvs);mesh.SetColors(cols);
            var used=new List<Material>();int sub=0;mesh.subMeshCount=0;var subs=new List<int[]>();
            for(int i=0;i<tris.Length;i++)if(tris[i]!=null){subs.Add(tris[i].ToArray());used.Add(mats[i]);}
            mesh.subMeshCount=subs.Count;foreach(var a in subs)mesh.SetTriangles(a,sub++);mesh.RecalculateBounds();
            string meshPath=dir+"Meshes/"+(mars?"mars_":"meadow_")+chunk+".asset";if(AssetDatabase.LoadAssetAtPath<Mesh>(meshPath)!=null)AssetDatabase.DeleteAsset(meshPath);AssetDatabase.CreateAsset(mesh,meshPath);
            var go=new GameObject("Meadow terrain "+chunk,typeof(MeshFilter),typeof(MeshRenderer));go.transform.SetParent(world,false);go.GetComponent<MeshFilter>().sharedMesh=mesh;
            var r=go.GetComponent<MeshRenderer>();r.sharedMaterials=used.ToArray();r.shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;r.receiveShadows=false;
        }
        if(mars)return; /* no clouds on the dusty map */
        // clouds
        var cloudMat=Unlit("Cloud",null,new Color(1,1,1,1));var rng=new System.Random(5);var cube=Resources.GetBuiltinResource<Mesh>("Cube.fbx");
        for(int i=0;i<16;i++)
        {
            float a=(float)rng.NextDouble()*Mathf.PI*2,dist=50+(float)rng.NextDouble()*120;
            var cl=new GameObject("Cloud",typeof(MeshFilter),typeof(MeshRenderer));cl.transform.SetParent(world,false);cl.GetComponent<MeshFilter>().sharedMesh=cube;
            cl.transform.position=new Vector3(Mathf.Sin(a)*dist,85+(float)rng.NextDouble()*20,Mathf.Cos(a)*dist);cl.transform.localScale=new Vector3(14+(float)rng.NextDouble()*16,3,8+(float)rng.NextDouble()*10);
            var cr=cl.GetComponent<MeshRenderer>();cr.sharedMaterial=cloudMat;cr.shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;cr.receiveShadows=false;
        }
    }
    static Material Unlit(string name,Texture2D tex,Color tint)
    {
        var m=new Material(Shader.Find("CEBB/Unlit Texture")){name=name};if(tex!=null)m.SetTexture("_MainTex",tex);m.SetColor("_Color",tint);Save(m);return m;
    }
    static Mesh StarMesh()
    {
        string path=Root+"Meshes/Stars.asset";var old=AssetDatabase.LoadAssetAtPath<Mesh>(path);if(old!=null)AssetDatabase.DeleteAsset(path);
        var rng=new System.Random(11);var v=new List<Vector3>();var t=new List<int>();
        for(int i=0;i<900;i++)
        {
            Vector3 d=new Vector3((float)rng.NextDouble()*2-1,(float)rng.NextDouble()*1.15f-.15f,(float)rng.NextDouble()*2-1);if(d.sqrMagnitude<.05f){i--;continue;}d.Normalize();
            Vector3 c=d*480f;Vector3 r=Vector3.Cross(d,Mathf.Abs(d.y)>.9f?Vector3.right:Vector3.up).normalized,u=Vector3.Cross(r,d);float s=rng.NextDouble()<.12?1.6f:.85f;
            int b=v.Count;v.Add(c+(-r-u)*s);v.Add(c+(-r+u)*s);v.Add(c+(r+u)*s);v.Add(c+(r-u)*s);t.AddRange(new[]{b,b+1,b+2,b,b+2,b+3,b,b+2,b+1,b,b+3,b+2});
        }
        var m=new Mesh{name="Stars"};m.SetVertices(v);m.SetTriangles(t,0);m.RecalculateBounds();AssetDatabase.CreateAsset(m,path);return m;
    }
    static Sprite RenderRocket(Transform rocketRoot,GameObject[] blocks,string file)
    {
        const int layer=31;var copies=new List<GameObject>();
        foreach(var b in blocks){var c=Object.Instantiate(b);c.transform.position=b.transform.position+new Vector3(0,-600,0);c.transform.rotation=b.transform.rotation;c.transform.localScale=Vector3.one;c.SetActive(true);c.layer=layer;copies.Add(c);}
        Bounds bb=new Bounds(copies[0].transform.position,Vector3.zero);foreach(var c in copies)bb.Encapsulate(c.GetComponent<Renderer>().bounds);
        return RenderLayer(copies,bb,file,512,layer,-28,22);
    }
    static Sprite RenderBlockIcon(Material mat,string name)
    {
        const int layer=31;var c=GameObject.CreatePrimitive(PrimitiveType.Cube);Object.DestroyImmediate(c.GetComponent<Collider>());c.GetComponent<Renderer>().sharedMaterial=mat;c.transform.position=new Vector3(0,-600,0);c.layer=layer;
        return RenderLayer(new List<GameObject>{c},c.GetComponent<Renderer>().bounds,"Block_"+name,128,layer,-45,30);
    }
    static Sprite RenderLayer(List<GameObject> objs,Bounds b,string file,int size,int layer,float yaw,float pitch)
    {
        var camGo=new GameObject("Icon camera");var cam=camGo.AddComponent<Camera>();cam.cullingMask=1<<layer;cam.clearFlags=CameraClearFlags.SolidColor;cam.backgroundColor=new Color(0,0,0,0);cam.orthographic=true;
        float radius=b.extents.magnitude;cam.orthographicSize=radius*(size>200?.82f:.95f);cam.nearClipPlane=.01f;cam.farClipPlane=radius*8;
        cam.transform.rotation=Quaternion.Euler(pitch,yaw,0);cam.transform.position=b.center-cam.transform.forward*radius*3;
        var lightGo=new GameObject("Icon light");var light=lightGo.AddComponent<Light>();light.type=LightType.Directional;light.intensity=1.05f;light.cullingMask=1<<layer;lightGo.transform.rotation=Quaternion.Euler(40,-40,0);
        var rt=RenderTexture.GetTemporary(size,size,24,RenderTextureFormat.ARGB32);cam.targetTexture=rt;var amb=RenderSettings.ambientLight;var mode=RenderSettings.ambientMode;RenderSettings.ambientMode=UnityEngine.Rendering.AmbientMode.Flat;RenderSettings.ambientLight=new Color(.5f,.5f,.53f);
        var others=new List<Light>();foreach(var ol in Object.FindObjectsByType<Light>(FindObjectsSortMode.None))if(ol!=light&&ol.enabled){ol.enabled=false;others.Add(ol);} /* scene sun would light the icon twice (washed-out white blocks) */
        cam.Render();RenderSettings.ambientLight=amb;RenderSettings.ambientMode=mode;foreach(var ol in others)ol.enabled=true;
        var prev=RenderTexture.active;RenderTexture.active=rt;var tex=new Texture2D(size,size,TextureFormat.RGBA32,false);tex.ReadPixels(new Rect(0,0,size,size),0,0);tex.Apply();RenderTexture.active=prev;
        string path=Root+"UI/"+file+".png";File.WriteAllBytes(path,tex.EncodeToPNG());
        Object.DestroyImmediate(tex);cam.targetTexture=null;RenderTexture.ReleaseTemporary(rt);Object.DestroyImmediate(camGo);Object.DestroyImmediate(lightGo);foreach(var o in objs)Object.DestroyImmediate(o);
        AssetDatabase.ImportAsset(path);var ti=(TextureImporter)AssetImporter.GetAtPath(path);ti.textureType=TextureImporterType.Sprite;ti.spriteImportMode=SpriteImportMode.Single;ti.mipmapEnabled=false;ti.alphaIsTransparency=true;ti.filterMode=FilterMode.Bilinear;ti.SaveAndReimport();
        return AssetDatabase.LoadAssetAtPath<Sprite>(path);
    }
    static Sprite UiSprite(string name){return AssetDatabase.LoadAssetAtPath<Sprite>(Root+"UI/"+name+".png");}
    static Button BigButton(string name,Transform canvas,Sprite sprite,string text)
    {
        var img=Panel(name,canvas,Color.white);img.sprite=sprite;img.raycastTarget=true;var btn=img.gameObject.AddComponent<Button>();btn.targetGraphic=img;
        var t=Label("Text",img.transform,text,44);Anchors(t.rectTransform,new Vector2(.1f,.28f),new Vector2(.9f,.76f));t.alignByGeometry=true; /* centred on the green face of PlayButton.png */ t.horizontalOverflow=HorizontalWrapMode.Wrap;t.verticalOverflow=VerticalWrapMode.Truncate; /* best fit shrinks the text when the button is docked small */img.gameObject.SetActive(false);return btn;
    }
    static Image Panel(string name,Transform parent,Color color){var go=new GameObject(name,typeof(RectTransform),typeof(Image));go.transform.SetParent(parent,false);var image=go.GetComponent<Image>();image.color=color;image.raycastTarget=false;return image;}
    static Text Label(string name,Transform parent,string value,int size)
    {
        var go=new GameObject(name,typeof(RectTransform),typeof(Text));go.transform.SetParent(parent,false);var t=go.GetComponent<Text>();t.font=font;t.text=value;t.fontSize=size;t.color=Color.white;t.alignment=TextAnchor.MiddleCenter;
        t.resizeTextForBestFit=true;t.resizeTextMinSize=10;t.resizeTextMaxSize=size;t.raycastTarget=false;t.horizontalOverflow=HorizontalWrapMode.Overflow;go.AddComponent<Outline>().effectDistance=new Vector2(2,-2);return t;
    }
    static void Anchors(RectTransform r,Vector2 min,Vector2 max){r.anchorMin=min;r.anchorMax=max;r.offsetMin=r.offsetMax=Vector2.zero;}
    static void SetLayer(Transform t){t.gameObject.layer=5;foreach(Transform child in t)SetLayer(child);}
}
#endif
