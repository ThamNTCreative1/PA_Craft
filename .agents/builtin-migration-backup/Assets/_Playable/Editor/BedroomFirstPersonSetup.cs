#if UNITY_EDITOR
using UnityEngine;
using UnityEngine.UI;
using UnityEditor;
using UnityEditor.SceneManagement;
using CEBB.Playable;

public static class BedroomFirstPersonSetup
{
    const string Root="Assets/_Playable/";
    static Font font;
    public static void Apply()
    {
        if(Application.isPlaying)throw new System.InvalidOperationException("Stop Play mode first");
        if(Object.FindFirstObjectByType<FirstPersonRoom>()!=null)throw new System.InvalidOperationException("First-person room already installed");
        var m=Object.FindFirstObjectByType<BedroomPlayable>();var layout=GameObject.Find("Room Camera").GetComponent<BedroomLayout>();
        EditorSceneManager.SaveScene(UnityEngine.SceneManagement.SceneManager.GetActiveScene(),"Assets/Scenes/SampleScene_BeforeFirstPerson.unity",true);
        font=Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");
        FurnitureDefinition[] definitions=new FurnitureDefinition[12];m.inventory=new FurnitureInventoryEntry[12];
        for(int i=0;i<12;i++)
        {
            var old=m.slots[i];definitions[i]=old.definition;
            var number=old.button.transform.Find("Slot number");if(number!=null)number.gameObject.SetActive(false);
            var qty=Text("Remaining quantity",old.button.transform,"x1",26,Color.white);Anchors(qty.rectTransform,new Vector2(.55f,.72f),new Vector2(.94f,.96f));qty.alignment=TextAnchor.UpperRight;qty.gameObject.AddComponent<Outline>().effectDistance=new Vector2(1,-1);
            old.builtBadge.GetComponentInChildren<Text>().text="EMPTY";
            m.inventory[i]=new FurnitureInventoryEntry{definition=old.definition,button=old.button,frame=old.frame,icon=old.button.transform.Find("Furniture icon").GetComponent<Image>(),quantityText=qty,emptyBadge=old.builtBadge};
        }
        var oldRoom=GameObject.Find("Minecraft bedroom interior");if(oldRoom!=null)Undo.DestroyObjectImmediate(oldRoom);
        var oldAnchors=m.slots[0].anchor.parent.gameObject;Undo.DestroyObjectImmediate(oldAnchors);
        if(m.editorPreviewRoot!=null)Undo.DestroyObjectImmediate(m.editorPreviewRoot);
        var room=new GameObject("Closed home — four walls, ceiling and roof").transform;room.SetParent(m.transform);
        var oak=AssetDatabase.LoadAssetAtPath<Material>(Root+"Materials/Interior Oak.mat");
        var dark=AssetDatabase.LoadAssetAtPath<Material>(Root+"Materials/Interior Dark Oak.mat");
        var floor=MakeMaterial("Indoor floor",new Color(.46f,.34f,.22f),oak.mainTexture);floor.mainTextureScale=new Vector2(5,4);
        var plaster=MakeMaterial("Indoor plaster",new Color(.4f,.38f,.32f));
        var ceiling=MakeMaterial("Indoor ceiling",new Color(.49f,.43f,.34f),oak.mainTexture);ceiling.mainTextureScale=new Vector2(4,3);
        var glass=MakeMaterial("Indoor window sky",new Color(.39f,.65f,.77f));glass.EnableKeyword("_EMISSION");glass.SetColor("_EmissionColor",new Color(.07f,.14f,.18f));
        Box("Floor",room,new Vector3(0,-.11f,0),new Vector3(9.8f,.2f,8.6f),floor);
        Box("North wall",room,new Vector3(0,1.75f,4.3f),new Vector3(10,.0f+3.5f,.2f),plaster);
        Box("South wall",room,new Vector3(0,1.75f,-4.3f),new Vector3(10,3.5f,.2f),plaster);
        Box("West wall",room,new Vector3(-4.9f,1.75f,0),new Vector3(.2f,3.5f,8.6f),plaster);
        Box("East wall",room,new Vector3(4.9f,1.75f,0),new Vector3(.2f,3.5f,8.6f),plaster);
        Box("Ceiling",room,new Vector3(0,3.6f,0),new Vector3(10,.2f,8.8f),ceiling);
        var roofA=Box("Pitched roof west",room,new Vector3(-2.5f,4.3f,0),new Vector3(5.3f,.2f,9),dark);roofA.transform.localEulerAngles=new Vector3(0,0,18);
        var roofB=Box("Pitched roof east",room,new Vector3(2.5f,4.3f,0),new Vector3(5.3f,.2f,9),dark);roofB.transform.localEulerAngles=new Vector3(0,0,-18);
        for(int z=-2;z<=2;z+=2)Box("Ceiling beam",room,new Vector3(0,3.42f,z),new Vector3(9.8f,.16f,.16f),dark,false);
        Box("North skirting",room,new Vector3(0,.09f,4.15f),new Vector3(9.6f,.18f,.08f),dark,false);
        Box("South skirting",room,new Vector3(0,.09f,-4.15f),new Vector3(9.6f,.18f,.08f),dark,false);
        Box("West skirting",room,new Vector3(-4.75f,.09f,0),new Vector3(.08f,.18f,8.4f),dark,false);
        Box("East skirting",room,new Vector3(4.75f,.09f,0),new Vector3(.08f,.18f,8.4f),dark,false);
        Box("Door surround",room,new Vector3(0,1.2f,-4.16f),new Vector3(1.45f,2.4f,.07f),dark,false);
        Box("Closed front door",room,new Vector3(0,1.15f,-4.1f),new Vector3(1.25f,2.3f,.08f),oak);
        Box("Door handle",room,new Vector3(.43f,1.03f,-4.02f),new Vector3(.1f,.08f,.08f),dark,false);
        Window(room,-4.76f,1.9f,1.1f,glass,oak);Window(room,4.76f,1.9f,-2.1f,glass,oak);
        LightAt(room,"Main ceiling light",new Vector3(0,3.15f,.2f),9,new Color(1,.87f,.68f));
        LightAt(room,"Front room fill",new Vector3(2,2.9f,-2.4f),6,new Color(.75f,.83f,1));
        LightAt(room,"Bedside fill",new Vector3(-2,2.9f,2.2f),5,new Color(1,.87f,.7f));
        RenderSettings.ambientMode=UnityEngine.Rendering.AmbientMode.Flat;RenderSettings.ambientLight=new Color(.43f,.43f,.4f);
        var preview=new GameObject("Completed room preview — hidden in Play");preview.transform.SetParent(m.transform);m.editorPreviewRoot=preview;
        var anchors=new GameObject("Furniture placements — quantities come from these slots").transform;anchors.SetParent(m.transform);
        int[] types={0,1,1,5,5,2,3,4,4,6,6,7,8,8,9,10,10,11,11};
        Vector3[] positions={
            new Vector3(-1.1f,.02f,2.45f),new Vector3(-2.75f,.02f,2.9f),new Vector3(.6f,.02f,2.9f),
            new Vector3(-2.75f,.67f,2.9f),new Vector3(.6f,.67f,2.9f),new Vector3(3.1f,.02f,3.45f),new Vector3(-4.05f,.02f,-2.5f),
            new Vector3(4.2f,.02f,.6f),new Vector3(2.4f,.02f,-3.55f),new Vector3(-1.1f,.035f,.2f),new Vector3(2.3f,.035f,-2.2f),
            new Vector3(-4.05f,.02f,0),new Vector3(-1.1f,2.1f,4.12f),new Vector3(-2.2f,1.75f,-4.12f),new Vector3(1f,2.45f,-4.12f),
            new Vector3(3.1f,2.65f,4.12f),new Vector3(-4.72f,1.9f,-2.7f),new Vector3(4.72f,1.35f,.6f),new Vector3(2.4f,1.25f,-4.12f)};
        float[] yaw={180,0,0,0,0,180,90,-90,0,0,0,90,180,0,0,180,90,-90,0};
        Vector3[] scales={new Vector3(1.25f,.9f,1.35f),Vector3.one*.65f,Vector3.one*.65f,Vector3.one*.45f,Vector3.one*.45f,Vector3.one*1.1f,Vector3.one*1.05f,Vector3.one*.9f,Vector3.one*.85f,new Vector3(2.2f,1,1.3f),new Vector3(1.1f,1,.75f),Vector3.one*1.3f,Vector3.one*.85f,Vector3.one*.75f,Vector3.one*.65f,Vector3.one*.65f,Vector3.one*.7f,Vector3.one*.85f,Vector3.one*.8f};
        m.slots=new FurnitureSlot[types.Length];
        for(int i=0;i<types.Length;i++)
        {
            var definition=definitions[types[i]];var anchor=new GameObject((i+1).ToString("00")+" "+definition.displayName).transform;anchor.SetParent(anchors);anchor.localPosition=positions[i];anchor.localEulerAngles=new Vector3(0,yaw[i],0);
            m.slots[i]=new FurnitureSlot{definition=definition,anchor=anchor,localScale=scales[i],buildOrder=i};
            var furniture=(GameObject)PrefabUtility.InstantiatePrefab(definition.prefab);furniture.name=anchor.name;furniture.transform.SetParent(preview.transform);furniture.transform.position=anchor.position;furniture.transform.rotation=anchor.rotation;furniture.transform.localScale=scales[i];
        }
        var ghostShader=AssetDatabase.LoadAssetAtPath<Shader>(Root+"Shaders/GhostUnlit.shader");var ghost=new Material(ghostShader);ghost.name="Aim ghost";ghost.SetColor("_Color",new Color(.25f,.9f,1,.14f));ghost.SetFloat("_UseVertexColor",0);ghost.renderQueue=3000;AssetDatabase.CreateAsset(ghost,Root+"Materials/Aim ghost.mat");m.ghostMaterial=ghost;m.ghostOutlineMaterial=AssetDatabase.LoadAssetAtPath<Material>(Root+"Materials/Ghost outline.mat");m.aimToBuild=true;
        var rig=new GameObject("Player — joystick or WASD, drag to look");rig.transform.SetParent(m.transform);var player=rig.AddComponent<FirstPersonRoom>();player.game=m;player.playerCamera=layout.roomCamera;player.spawnPosition=new Vector3(1.2f,0,-2.7f);rig.transform.position=player.spawnPosition;layout.roomCamera.transform.SetParent(rig.transform,false);player.ApplyView();m.playerBody=rig.transform;
        layout.firstPersonMode=true;layout.header.GetComponent<Image>().sprite=TightLogo();layout.header.GetComponent<Image>().preserveAspect=true;
        if(m.startSurface!=null)m.startSurface.gameObject.SetActive(false);if(m.hand!=null)m.hand.gameObject.SetActive(false);
        var look=Panel("Look area — drag or tap centre",layout.canvas.transform,new Color(1,1,1,.001f));Anchors(look.rectTransform,Vector2.zero,Vector2.one);look.transform.SetAsFirstSibling();look.raycastTarget=true;look.gameObject.AddComponent<RoomLookSurface>().player=player;
        var pad=Panel("Move joystick",layout.canvas.transform,new Color(.08f,.1f,.11f,.65f));pad.sprite=CircleSprite("MoveCircle",false);pad.raycastTarget=true;var move=pad.gameObject.AddComponent<RoomMovePad>();
        var knob=Panel("Thumb",pad.transform,new Color(.8f,.84f,.8f,.8f));knob.sprite=pad.sprite;knob.rectTransform.anchorMin=new Vector2(.3f,.3f);knob.rectTransform.anchorMax=new Vector2(.7f,.7f);knob.rectTransform.offsetMin=knob.rectTransform.offsetMax=Vector2.zero;move.thumbRect=knob.rectTransform;player.movePad=move;layout.movePad=pad.rectTransform;
        var moveLabel=Text("Move label",pad.transform,"MOVE",23,new Color(.9f,.92f,.88f));Anchors(moveLabel.rectTransform,new Vector2(0,-.19f),new Vector2(1,-.01f));
        var reticle=Panel("Centre crosshair",layout.canvas.transform,Color.white);reticle.sprite=CircleSprite("CentreCrosshair",true);reticle.rectTransform.anchorMin=reticle.rectTransform.anchorMax=new Vector2(.5f,.5f);reticle.rectTransform.sizeDelta=new Vector2(32,32);reticle.rectTransform.anchoredPosition=Vector2.zero;player.reticle=reticle;
        m.promptText.fontSize=34;m.promptText.resizeTextMaxSize=34;m.promptText.text="Move + drag to look around";m.countText.text="BUILT  0 / "+types.Length;
        for(int i=0;i<m.inventory.Length;i++){int count=0;for(int j=0;j<types.Length;j++)if(types[j]==i)count++;m.inventory[i].quantityText.text="x"+count;m.inventory[i].emptyBadge.SetActive(false);}
        layout.ApplyLayout(9f/16f);SetLayer(layout.canvas.transform);EditorUtility.SetDirty(m);EditorUtility.SetDirty(layout);EditorUtility.SetDirty(player);AssetDatabase.SaveAssets();EditorSceneManager.SaveScene(UnityEngine.SceneManagement.SceneManager.GetActiveScene());Selection.activeGameObject=rig;
        Debug.Log("[CEBB] First-person home: "+types.Length+" placements, 12 inventory types.");
    }
    static GameObject Box(string name,Transform parent,Vector3 position,Vector3 size,Material mat,bool collider=true)
    {var go=GameObject.CreatePrimitive(PrimitiveType.Cube);go.name=name;go.transform.SetParent(parent,false);go.transform.localPosition=position;go.transform.localScale=size;go.GetComponent<Renderer>().sharedMaterial=mat;if(!collider)Object.DestroyImmediate(go.GetComponent<Collider>());return go;}
    static Material MakeMaterial(string name,Color color,Texture texture=null)
    {var mat=new Material(Shader.Find("Universal Render Pipeline/Lit"));mat.name=name;mat.color=color;mat.SetFloat("_Smoothness",.03f);if(texture!=null)mat.mainTexture=texture;AssetDatabase.CreateAsset(mat,Root+"Materials/"+name+".mat");return mat;}
    static void LightAt(Transform root,string name,Vector3 p,float intensity,Color color)
    {var go=new GameObject(name,typeof(Light));go.transform.SetParent(root,false);go.transform.localPosition=p;var l=go.GetComponent<Light>();l.type=LightType.Point;l.range=12;l.intensity=intensity;l.color=color;l.shadows=LightShadows.Soft;}
    static void Window(Transform root,float x,float y,float z,Material glass,Material frame)
    {Box("Window frame",root,new Vector3(x,y,z),new Vector3(.06f,1.45f,1.95f),frame,false);float inset=x<0?.05f:-.05f;Box("Window pane",root,new Vector3(x+inset,y,z),new Vector3(.035f,1.25f,1.75f),glass,false);Box("Window mullion",root,new Vector3(x+inset*2,y,z),new Vector3(.04f,1.25f,.06f),frame,false);Box("Window crossbar",root,new Vector3(x+inset*2,y,z),new Vector3(.04f,.06f,1.75f),frame,false);}
    static Image Panel(string name,Transform parent,Color color)
    {var go=new GameObject(name,typeof(RectTransform),typeof(Image));go.transform.SetParent(parent,false);var image=go.GetComponent<Image>();image.color=color;image.raycastTarget=false;return image;}
    static Text Text(string name,Transform parent,string value,int size,Color color)
    {var go=new GameObject(name,typeof(RectTransform),typeof(Text));go.transform.SetParent(parent,false);var t=go.GetComponent<Text>();t.font=font;t.text=value;t.fontSize=size;t.fontStyle=FontStyle.Bold;t.color=color;t.alignment=TextAnchor.MiddleCenter;t.resizeTextForBestFit=true;t.resizeTextMinSize=12;t.resizeTextMaxSize=size;t.raycastTarget=false;return t;}
    static void Anchors(RectTransform r,Vector2 min,Vector2 max){r.anchorMin=min;r.anchorMax=max;r.offsetMin=r.offsetMax=Vector2.zero;}
    static void SetLayer(Transform t){t.gameObject.layer=5;foreach(Transform child in t)SetLayer(child);}
    static Sprite TightLogo()
    {
        var result=AssetDatabase.LoadAssetAtPath<Sprite>(Root+"UI/LogoTight.asset");if(result!=null)return result;
        var temp=new Texture2D(2,2);temp.LoadImage(System.IO.File.ReadAllBytes(Root+"UI/Logo.png"));var pixels=temp.GetPixels32();int minX=temp.width,minY=temp.height,maxX=0,maxY=0;
        for(int y=0;y<temp.height;y++)for(int x=0;x<temp.width;x++)if(pixels[y*temp.width+x].a>20){minX=Mathf.Min(minX,x);minY=Mathf.Min(minY,y);maxX=Mathf.Max(maxX,x);maxY=Mathf.Max(maxY,y);}
        var texture=AssetDatabase.LoadAssetAtPath<Texture2D>(Root+"UI/Logo.png");float sx=(float)texture.width/temp.width,sy=(float)texture.height/temp.height;result=Sprite.Create(texture,new Rect(minX*sx,minY*sy,(maxX-minX+1)*sx,(maxY-minY+1)*sy),new Vector2(.5f,.5f));result.name="Game name — tight crop";AssetDatabase.CreateAsset(result,Root+"UI/LogoTight.asset");Object.DestroyImmediate(temp);return result;
    }
    static Sprite CircleSprite(string name,bool cross)
    {
        string path=Root+"UI/"+name+".png";var existing=AssetDatabase.LoadAssetAtPath<Sprite>(path);if(existing!=null)return existing;
        var texture=new Texture2D(128,128,TextureFormat.RGBA32,false);
        for(int y=0;y<128;y++)for(int x=0;x<128;x++){float dx=x-63.5f,dy=y-63.5f;bool visible=cross?((Mathf.Abs(dx)<3&&Mathf.Abs(dy)<30)||(Mathf.Abs(dy)<3&&Mathf.Abs(dx)<30)):dx*dx+dy*dy<61*61;texture.SetPixel(x,y,visible?Color.white:Color.clear);}texture.Apply();System.IO.File.WriteAllBytes(path,texture.EncodeToPNG());Object.DestroyImmediate(texture);AssetDatabase.ImportAsset(path);var importer=(TextureImporter)AssetImporter.GetAtPath(path);importer.textureType=TextureImporterType.Sprite;importer.spriteImportMode=SpriteImportMode.Single;importer.mipmapEnabled=false;importer.alphaIsTransparency=true;importer.SaveAndReimport();return AssetDatabase.LoadAssetAtPath<Sprite>(path);
    }
}
#endif
