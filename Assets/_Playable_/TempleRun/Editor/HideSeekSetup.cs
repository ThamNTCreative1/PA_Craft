using UnityEditor;
using UnityEditor.Animations;
using UnityEditor.Events;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
namespace Playable.TempleRun.EditorTools
{
    public static class HideSeekSetup
    {
        const string Art = "Assets/_Playable_/2D Texture/";
        const string Character = "Assets/_Playable_/3D Model/Other/Chameleon player/";
        static Sprite Sprite(string path)
        {
            var importer = AssetImporter.GetAtPath(path) as TextureImporter;
            if (importer != null && importer.textureType != TextureImporterType.Sprite)
            { importer.textureType = TextureImporterType.Sprite; importer.spriteImportMode = SpriteImportMode.Single; importer.mipmapEnabled = false; importer.SaveAndReimport(); }
            return AssetDatabase.LoadAssetAtPath<Sprite>(path);
        }
        static RectTransform Rect(string name, Transform parent, Vector2 anchor, Vector2 size, Vector2 pos)
        {
            var r = new GameObject(name, typeof(RectTransform)).GetComponent<RectTransform>();
            r.SetParent(parent,false); r.anchorMin=r.anchorMax=anchor; r.sizeDelta=size; r.anchoredPosition=pos; return r;
        }
        static RectTransform Full(string name, Transform parent)
        {
            var r=Rect(name,parent,Vector2.zero,Vector2.zero,Vector2.zero); r.anchorMax=Vector2.one; r.offsetMin=r.offsetMax=Vector2.zero;return r;
        }
        static Image Img(string name,Transform parent,Sprite sprite,Vector2 anchor,Vector2 size,Vector2 pos,Color color)
        {
            var r=Rect(name,parent,anchor,size,pos);var image=r.gameObject.AddComponent<Image>();image.sprite=sprite;image.color=color;image.preserveAspect=true;image.raycastTarget=false;return image;
        }
        static TMP_Text Text(string name,Transform parent,string value,Vector2 anchor,Vector2 size,Vector2 pos,float fontSize)
        {
            var r=Rect(name,parent,anchor,size,pos);var t=r.gameObject.AddComponent<TextMeshProUGUI>(); t.font=AssetDatabase.LoadAssetAtPath<TMP_FontAsset>("Assets/_Playable_/Font/Arial Rounded MT Bold Regular SDF.asset");t.text=value;t.fontSize=fontSize;t.alignment=TextAlignmentOptions.Center;t.color=Color.white;t.raycastTarget=false;t.enableWordWrapping=false;return t;
        }
        static Button Button(Image i, UnityEngine.Events.UnityAction action)
        {
            i.raycastTarget=true;var b=i.gameObject.AddComponent<Button>();b.targetGraphic=i;if(action!=null)UnityEventTools.AddPersistentListener(b.onClick,action);return b;
        }
        [MenuItem("Tools/Hide Seek/Setup Playable")]
        public static void Apply()
        {
            var scene=UnityEngine.SceneManagement.SceneManager.GetActiveScene();
            foreach(var old in scene.GetRootGameObjects()) if(old.name=="HideSeekPlayable")throw new System.InvalidOperationException("HideSeekPlayable already exists");
            foreach(var old in scene.GetRootGameObjects()) if(old.name!="AudioManager" && old.name!="EventSystem" && old.name!="Directional Light")old.SetActive(false);
            var root=new GameObject("HideSeekPlayable");
            var intro=root.AddComponent<RunnerDemoIntro>(); var gm=root.AddComponent<Playable.GameManager>();
            var so=new SerializedObject(gm);so.FindProperty("_tapToCtaMode").boolValue=true;so.FindProperty("_endTime").intValue=30;so.ApplyModifiedPropertiesWithoutUndo();intro.gameManager=gm;
            var map=(GameObject)PrefabUtility.InstantiatePrefab(AssetDatabase.LoadAssetAtPath<GameObject>("Assets/_Playable_/3D Model/Map/Map lowpoly/lowpoly-fps-tdm-game-map-by-resoforge.blend"));
            map.name="HideSeek Map";map.transform.SetParent(root.transform,false);map.transform.rotation=Quaternion.Euler(-90,0,0);map.transform.localScale=Vector3.one*3;
            foreach(var c in map.GetComponentsInChildren<Camera>(true))Object.DestroyImmediate(c);
            foreach(var l in map.GetComponentsInChildren<Light>(true))Object.DestroyImmediate(l);
            var player=(GameObject)PrefabUtility.InstantiatePrefab(AssetDatabase.LoadAssetAtPath<GameObject>(Character+"Chameleon_Idle_Player.prefab"));player.transform.SetParent(root.transform,false);player.name="Player Idle";player.transform.position=new Vector3(5,0,12);player.transform.localScale=Vector3.one*1.2f;
            var cam=new GameObject("HideSeek Camera",typeof(Camera),typeof(AudioListener)).GetComponent<Camera>();cam.transform.SetParent(root.transform,false);cam.transform.position=new Vector3(5,3.5f,17);cam.transform.LookAt(new Vector3(5,1.2f,10));cam.fieldOfView=57;cam.nearClipPlane=0.05f;cam.farClipPlane=100;cam.clearFlags=CameraClearFlags.Skybox;intro.introCamera=cam;
            var walkPath=Character+"Chameleon_Run.controller";
            var controller=AssetDatabase.LoadAssetAtPath<AnimatorController>(walkPath);
            if(controller==null)controller=AnimatorController.CreateAnimatorControllerAtPath(walkPath);
            AnimationClip walk=null;foreach(var a in AssetDatabase.LoadAllAssetsAtPath(Character+"chameleon-man-lite-simple-player-model.glb"))if(a is AnimationClip && a.name=="Walking.001")walk=(AnimationClip)a;
            var walkClip=Object.Instantiate(walk);walkClip.name="Chameleon_Run";var settings=AnimationUtility.GetAnimationClipSettings(walkClip);settings.loopTime=true;AnimationUtility.SetAnimationClipSettings(walkClip,settings);AssetDatabase.CreateAsset(walkClip,Character+"Chameleon_Run.anim");var state=controller.layers[0].stateMachine.AddState("Run");state.motion=walkClip;controller.layers[0].stateMachine.defaultState=state;
            intro.actors=new HideSeekActor[4];
            for(int i=0;i<4;i++)
            {
                var actorRoot=new GameObject("Enemy "+(i+1));actorRoot.transform.SetParent(root.transform,false);
                var actor=actorRoot.AddComponent<HideSeekActor>();intro.actors[i]=actor;
                var model=(GameObject)PrefabUtility.InstantiatePrefab(AssetDatabase.LoadAssetAtPath<GameObject>(Character+"Chameleon_Idle_Player.prefab"));model.transform.SetParent(actorRoot.transform,false);model.transform.localScale=Vector3.one*1.2f;
                actor.model=model.transform;actor.animator=model.GetComponent<Animator>();actor.animator.runtimeAnimatorController=controller;
                actor.pointA=new Vector3(1+i*1.5f,0,13+i*1.1f);actor.pointB=new Vector3(7+i*0.4f,0,15+i*1.1f);actor.phase=i*1.4f;actor.speed=2.1f+i*0.15f;actorRoot.transform.position=Vector3.Lerp(actor.pointA,actor.pointB,i/4f);
                actor.stepSound=AssetDatabase.LoadAssetAtPath<AudioClip>("Assets/_Playable_/TempleRun/Audio/TR_Step.wav");actor.jumpSound=AssetDatabase.LoadAssetAtPath<AudioClip>("Assets/_Playable_/TempleRun/Audio/TR_Jump.wav");
            }
            var canvas=new GameObject("HideSeek Canvas",typeof(RectTransform),typeof(Canvas),typeof(CanvasScaler),typeof(GraphicRaycaster));canvas.transform.SetParent(root.transform,false);canvas.GetComponent<Canvas>().renderMode=RenderMode.ScreenSpaceOverlay;
            var scaler=canvas.GetComponent<CanvasScaler>();scaler.uiScaleMode=CanvasScaler.ScaleMode.ScaleWithScreenSize;scaler.referenceResolution=new Vector2(1920,1080);scaler.screenMatchMode=CanvasScaler.ScreenMatchMode.Expand;
            var view=canvas.AddComponent<HideSeekView>();intro.view=view;view.safeRoot=Full("Safe Area",canvas.transform);
            var gameplay=Full("Gameplay",view.safeRoot);view.gameplay=gameplay.gameObject;
            var circle=AssetDatabase.GetBuiltinExtraResource<Sprite>("UI/Skin/Knob.psd");
            var top=Rect("Status",gameplay,new Vector2(.5f,1),new Vector2(760,100),new Vector2(0,-65));
            for(int i=0;i<6;i++) Img("Hider status",top,Sprite(Art+"UI/icon-smiley-yellow.png"),new Vector2(.5f,.5f),new Vector2(48,48),new Vector2(-330+i*53,0),Color.white);
            var timer=Img("Timer border",top,circle,new Vector2(.5f,.5f),new Vector2(83,83),Vector2.zero,new Color(.3f,.85f,.32f));Img("Timer fill",timer.transform,circle,new Vector2(.5f,.5f),new Vector2(72,72),Vector2.zero,new Color(.14f,.24f,.24f));view.timer=Text("Countdown",timer.transform,"30",new Vector2(.5f,.5f),new Vector2(75,75),Vector2.zero,43);
            for(int i=0;i<2;i++) Img("Seeker status",top,Sprite(Art+"UI/icon-seeker-red.png"),new Vector2(.5f,.5f),new Vector2(48,48),new Vector2(85+i*58,0),Color.white);
            view.instructionRoot=Rect("Role instruction",gameplay,new Vector2(.5f,1),new Vector2(850,150),new Vector2(0,-210));
            var joystick=Img("Joystick",gameplay,Sprite("Assets/Game/Textures/UI/Ingame/joystick_frame.png"),Vector2.zero,new Vector2(175,175),new Vector2(145,145),new Color(1,1,1,.65f));view.joystick=joystick.rectTransform;
            Img("Handle",joystick.transform,Sprite("Assets/Game/Textures/UI/Ingame/joystick_handle.png"),new Vector2(.5f,.5f),new Vector2(70,70),Vector2.zero,Color.white);
            Text("Move prompt",joystick.transform,"SWIPE TO MOVE",new Vector2(.5f,1),new Vector2(310,70),new Vector2(40,65),36);
            var hand=Sprite("Assets/_Playable_/TempleRun/UI/Sprites/hand.png");view.moveHand=Img("Move hand",joystick.transform,hand,new Vector2(.5f,.5f),new Vector2(110,110),new Vector2(28,-28),Color.white).rectTransform;
            Img("Jump",gameplay,Sprite("Assets/btn jump .png"),new Vector2(1,0),new Vector2(130,130),new Vector2(-105,300),Color.white);
            var body=Img("Character button",gameplay,circle,new Vector2(1,0),new Vector2(125,125),new Vector2(-260,130),new Color(.3f,.6f,.75f,.7f));
            Img("Head",body.transform,circle,new Vector2(.5f,.5f),new Vector2(24,24),new Vector2(0,27),Color.white);Img("Body",body.transform,null,new Vector2(.5f,.5f),new Vector2(18,35),Vector2.zero,Color.white);
            for(int i=0;i<4;i++){var limb=Img("Limb",body.transform,null,new Vector2(.5f,.5f),new Vector2(10,38),new Vector2(i<2?-15:15,i%2==0?8:-24),Color.white);limb.transform.localRotation=Quaternion.Euler(0,0,i<2?-28:28);}
            var palette=Img("Color button",gameplay,circle,new Vector2(1,0),new Vector2(125,125),new Vector2(-105,130),new Color(.3f,.6f,.75f,.7f));var disk=Img("Palette",palette.transform,circle,new Vector2(.5f,.5f),new Vector2(78,78),Vector2.zero,Color.white);
            for(int i=0;i<4;i++)Img("Paint dot",disk.transform,circle,new Vector2(.5f,.5f),new Vector2(15,15),new Vector2(Mathf.Cos(i*1.2f)*23,Mathf.Sin(i*1.2f)*23),new Color(.3f,.6f,.75f));
            var select=Full("Selection",view.safeRoot);view.selection=select.gameObject;var shade=select.gameObject.AddComponent<Image>();shade.color=new Color(.04f,.035f,.01f,.86f);shade.raycastTarget=true;
            Rect("Title",select,new Vector2(.5f,1),new Vector2(950,140),new Vector2(0,-135));
            view.cards=Rect("Cards",select,new Vector2(.5f,.5f),new Vector2(900,500),new Vector2(0,-30));
            intro.hiderButton=Button(Img("Hider",view.cards,Sprite(Art+"button-hider.png"),new Vector2(.5f,.5f),new Vector2(410,460),new Vector2(-225,0),Color.white),null);
            intro.seekerButton=Button(Img("Seeker",view.cards,Sprite(Art+"button-sneeker.png"),new Vector2(.5f,.5f),new Vector2(410,460),new Vector2(225,0),Color.white),null);
            view.selectHand=Img("Selection hand",view.cards,hand,new Vector2(.5f,.5f),new Vector2(130,130),new Vector2(-220,-70),Color.white).rectTransform;
            var close=Img("Close",view.safeRoot,circle,Vector2.one,new Vector2(55,55),new Vector2(-45,-45),new Color(0,0,0,.65f));Text("X",close.transform,"×",new Vector2(.5f,.5f),new Vector2(55,55),Vector2.zero,40);Button(close,intro.ShowCTA);
            intro.backgroundMusic=AssetDatabase.LoadAssetAtPath<AudioClip>("Assets/SoundFX/an_ordinary_day.ogg");intro.selectSound=AssetDatabase.LoadAssetAtPath<AudioClip>("Assets/SoundFX/sfx_click.wav");intro.timeoutSound=AssetDatabase.LoadAssetAtPath<AudioClip>("Assets/_Playable_/TempleRun/Audio/TR_TimeEnd.wav");
            HideSeekFontSetup.Apply();gameplay.gameObject.SetActive(false);AssetDatabase.SaveAssets();EditorSceneManager.MarkSceneDirty(scene);EditorSceneManager.SaveScene(scene);
        }
    }
}

