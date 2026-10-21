using System;
using TMPro;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.Rendering;
using UnityEngine.UI;
using Object = UnityEngine.Object;
namespace Playable.Editor
{
    public static class StealEggsSceneSetup
    {
        const string Art = "Assets/_Playable_/StealEggs/";
        const string Source = "Assets/_Playable_/3D Model/Animal/Steal an egg/";
        static TMP_FontAsset Font => AssetDatabase.LoadAssetAtPath<TMP_FontAsset>("Assets/TextMesh Pro/Fonts/FFFFORWA SDF.asset");
        [MenuItem("Tools/Playable/Build Steal Eggs")]
        public static void Build()
        {
            var scene = EditorSceneManager.GetActiveScene();
            if(scene.path != "Assets/_Playable_/Scenes/Gameplay.unity" || Application.isPlaying) throw new InvalidOperationException("Open Gameplay in Edit mode.");
            int endTime = 30;
            foreach(var root in scene.GetRootGameObjects()) { var old = root.GetComponent<GameManager>(); if(old) endTime=old.EndTime; }
            Selection.activeObject=null;
            foreach(var root in scene.GetRootGameObjects()) Object.DestroyImmediate(root);
            RenderSettings.skybox=null; RenderSettings.fog=false;
            RenderSettings.ambientMode=AmbientMode.Flat; RenderSettings.ambientLight=new Color(.78f,.78f,.78f);
            var light = new GameObject("Sun").AddComponent<Light>(); light.type=LightType.Directional; light.intensity=1.1f; light.transform.rotation=Quaternion.Euler(48,-35,0); light.shadows=LightShadows.Soft;
            var map=(GameObject)PrefabUtility.InstantiatePrefab(AssetDatabase.LoadAssetAtPath<GameObject>(Source+"Map_Steal_Eggs.prefab")); map.name="Map - final forest corner";
            var manager = new GameObject("GameManager").AddComponent<GameManager>();
            var so=new SerializedObject(manager); so.FindProperty("_endTime").intValue=endTime; so.ApplyModifiedPropertiesWithoutUndo();
            // The final forest corner uses the original authored map geometry.
            var center=new Vector3(0,0,1840);
            var monster = Model(Art+"TungTungTung/Tung Tung Tung Sahur.fbx", "Tung Tung Sahur", center+new Vector3(-2,0,4), 5.3f, 155);
            ConfigureSahurIdle(monster);
            var mat = AssetDatabase.LoadAssetAtPath<Material>(Art+"TungTungTung/Sahur.mat");
            if(!mat){mat=new Material(Shader.Find("Standard")); AssetDatabase.CreateAsset(mat,Art+"TungTungTung/Sahur.mat");}
            mat.mainTexture=AssetDatabase.LoadAssetAtPath<Texture2D>(Art+"TungTungTung/Tung Tung Tung Sahur (1).png"); mat.SetFloat("_Glossiness",0);
            foreach(var r in monster.GetComponentsInChildren<Renderer>()) {var ms=r.sharedMaterials; for(int i=0;i<ms.Length;i++)ms[i]=mat;r.sharedMaterials=ms;}
            Model(Source+"Model/v1_Animal_Egg/Egg/Forest.fbx","Egg Left",center+new Vector3(-2,0,0),1.55f,0);
            Model(Source+"Model/v1_Animal_Egg/Egg/Forest.fbx","Egg Center",center+new Vector3(0,0,1.3f),1.55f,0);
            Model(Source+"Model/v1_Animal_Egg/Egg/Forest.fbx","Egg Right",center+new Vector3(2,0,0),1.55f,0);
            var player=Model("Assets/Game/Models/Player/BaseCharacter/S_Base_03.fbx","Player",center+new Vector3(1,0,-3),2.25f,-20);
            ConfigurePlayerIdle(player);
            var cam=new GameObject("Main Camera").AddComponent<Camera>();cam.tag="MainCamera";
            cam.transform.position=center+new Vector3(8,7,-13);cam.transform.LookAt(center+new Vector3(0,1.8f,.8f));cam.nearClipPlane=.1f;cam.farClipPlane=500;cam.clearFlags=CameraClearFlags.SolidColor;cam.backgroundColor=new Color(.55f,.8f,1);
            RestoreBackgroundMusic(manager, cam);
            new GameObject("EventSystem",typeof(EventSystem),typeof(StandaloneInputModule));
            var canvas=new GameObject("Steal Eggs UI",typeof(RectTransform),typeof(Canvas),typeof(CanvasScaler),typeof(GraphicRaycaster));
            var cv=canvas.GetComponent<Canvas>();cv.renderMode=RenderMode.ScreenSpaceCamera;cv.worldCamera=cam;cv.planeDistance=1;
            var scaler=canvas.GetComponent<CanvasScaler>();scaler.uiScaleMode=CanvasScaler.ScaleMode.ScaleWithScreenSize;
            var footer=Text("Footer",canvas.transform,"Steal eggs from brainrot",58);footer.fontStyle=FontStyles.UpperCase;
            var egg=Image("Egg Button",canvas.transform,Sprite("Assets/_Playable_/2D Texture/Button Egg.png"),new Vector2(230,230));var button=egg.gameObject.AddComponent<Button>();button.targetGraphic=egg;egg.raycastTarget=true;
            var tutorial=Rect("Tutorial",egg.transform,Vector2.zero,Vector2.zero);
            var hint=Text("Tap to steal",tutorial,"tap to steal",38);hint.rectTransform.sizeDelta=new Vector2(430,65);hint.rectTransform.anchoredPosition=new Vector2(0,165);
            var hand=Image("Tap Hand",tutorial,Sprite("Assets/Texture/UI/icon_hand.png"),new Vector2(100,118));hand.rectTransform.anchoredPosition=new Vector2(112,-108);hand.rectTransform.localRotation=Quaternion.Euler(0,0,15);
            var card=Image("End Card",canvas.transform,null,Vector2.zero);Stretch(card.rectTransform);card.color=new Color(0,0,0,.78f);card.raycastTarget=true;
            var fullButton=card.gameObject.AddComponent<Button>();fullButton.targetGraphic=card;fullButton.transition=Selectable.Transition.None;
            var content=Rect("Card Content",card.transform,new Vector2(950,850),Vector2.zero);
            var icon=Image("App Icon",content,Sprite("Assets/_Playable_/2D Texture/ChatGPT Image Oct 21, 2026, 03_24_24 PM.png"),new Vector2(430,430));icon.rectTransform.anchoredPosition=new Vector2(0,190);
            var title=Text("App Title",content,"Obby Brainrot Playground",54);title.rectTransform.sizeDelta=new Vector2(1050,105);title.rectTransform.anchoredPosition=new Vector2(0,-80);
            var play=Image("Play Now",content,Sprite("Assets/_Playable_/2D Texture/Layer 2.png"),new Vector2(600,190));play.rectTransform.anchoredPosition=new Vector2(0,-340);play.rectTransform.localScale=Vector3.one*(4f/3f);
            var mask=play.gameObject.AddComponent<Mask>();mask.showMaskGraphic=true;
            var shine=Image("Diagonal Shine",play.transform,null,new Vector2(52,340));shine.color=new Color(1,1,1,.32f);shine.rectTransform.anchoredPosition=new Vector2(-420,0);shine.rectTransform.localRotation=Quaternion.Euler(0,0,-25);
            var game=new GameObject("Steal Eggs Gameplay").AddComponent<StealEggsGame>();game.Manager=manager;game.EggButton=button;game.EndCardButton=fullButton;game.EndCard=card.gameObject;game.Tutorial=tutorial;game.Hand=hand.rectTransform;game.PlayNow=play.rectTransform;game.Shine=shine.rectTransform;
            var layout=canvas.AddComponent<StealEggsLayout>();layout.Scaler=scaler;layout.View=cam;layout.Egg=egg.rectTransform;layout.Footer=footer.rectTransform;layout.CardContent=content;layout.Apply(1920,1080);
            card.gameObject.SetActive(false);
            AssetDatabase.SaveAssets();EditorSceneManager.MarkSceneDirty(scene);EditorSceneManager.SaveScene(scene);
        }
        public static void ConfigurePlayerIdle(GameObject player)
        {
            const string clipPath = Art + "Player Idle.anim";
            const string controllerPath = Art + "Player Idle.controller";
            var idle = AssetDatabase.LoadAssetAtPath<AnimationClip>(clipPath);
            if (idle == null)
            {
                foreach (var asset in AssetDatabase.LoadAllAssetsAtPath("Assets/Game/Models/Player/Skeleton.fbx"))
                {
                    if (!(asset is AnimationClip source) || source.name != "Idle") continue;
                    idle = Object.Instantiate(source);
                    idle.name = "Player Idle";
                    var settings = AnimationUtility.GetAnimationClipSettings(idle);
                    settings.loopTime = true;
                    AnimationUtility.SetAnimationClipSettings(idle, settings);
                    AssetDatabase.CreateAsset(idle, clipPath);
                    break;
                }
            }
            if (idle == null) throw new InvalidOperationException("Player skeleton idle clip is missing.");
            var controller = AssetDatabase.LoadAssetAtPath<UnityEditor.Animations.AnimatorController>(controllerPath);
            if (controller == null)
            {
                controller = UnityEditor.Animations.AnimatorController.CreateAnimatorControllerAtPath(controllerPath);
                var state = controller.layers[0].stateMachine.AddState("Idle");
                state.motion = idle;
                controller.layers[0].stateMachine.defaultState = state;
            }
            var animator = player.GetComponent<Animator>();
            if (animator == null) animator = player.AddComponent<Animator>();
            animator.runtimeAnimatorController = controller;
            animator.applyRootMotion = false;
            animator.enabled = true;
            EditorUtility.SetDirty(animator);
            AssetDatabase.SaveAssets();
        }
        public static void RestoreBackgroundMusic(GameManager manager, Camera camera)
        {
            var clip = AssetDatabase.LoadAssetAtPath<AudioClip>("Assets/Sound/Push-Long-Version(chosic.com).mp3");
            if (clip == null) throw new InvalidOperationException("Original background music is missing.");
            var audio = Object.FindFirstObjectByType<AudioManager>();
            if (audio == null) audio = new GameObject("AudioManager").AddComponent<AudioManager>();
            var settings = new SerializedObject(audio);
            foreach (string field in new[] { "_audioMusic", "_audioSound" })
            {
                var property = settings.FindProperty(field);
                if (property.objectReferenceValue != null) continue;
                var source = new GameObject(field == "_audioMusic" ? "Music" : "Sound").AddComponent<AudioSource>();
                source.transform.SetParent(audio.transform, false);
                source.playOnAwake = false;
                source.loop = field == "_audioMusic";
                source.spatialBlend = 0;
                source.volume = 1;
                property.objectReferenceValue = source;
            }
            settings.ApplyModifiedPropertiesWithoutUndo();
            var gameSettings = new SerializedObject(manager);
            gameSettings.FindProperty("_backgroundMusic").objectReferenceValue = clip;
            gameSettings.ApplyModifiedPropertiesWithoutUndo();
            if (Object.FindFirstObjectByType<AudioListener>() == null) camera.gameObject.AddComponent<AudioListener>();
        }
        public static void ConfigureSahurIdle(GameObject monster)
        {
            const string modelPath = Art + "TungTungTung/Tung Tung Tung Sahur.fbx";
            const string controllerPath = Art + "TungTungTung/Sahur Idle.controller";
            var importer = (ModelImporter)AssetImporter.GetAtPath(modelPath);
            var clips = importer.clipAnimations;
            if (clips.Length == 0) clips = importer.defaultClipAnimations;
            bool changed = false;
            foreach (var clip in clips)
            {
                if (clip.name != "Armature|idle") continue;
                if (!clip.loopTime) { clip.loopTime = true; changed = true; }
            }
            if (changed) { importer.clipAnimations = clips; importer.SaveAndReimport(); }
            AnimationClip idle = null;
            foreach (var asset in AssetDatabase.LoadAllAssetsAtPath(modelPath))
                if (asset is AnimationClip clip && clip.name == "Armature|idle") idle = clip;
            if (idle == null) throw new InvalidOperationException("Sahur model is missing its embedded idle clip.");
            var controller = AssetDatabase.LoadAssetAtPath<UnityEditor.Animations.AnimatorController>(controllerPath);
            if (controller == null)
            {
                controller = UnityEditor.Animations.AnimatorController.CreateAnimatorControllerAtPath(controllerPath);
                var state = controller.layers[0].stateMachine.AddState("Idle");
                state.motion = idle;
                controller.layers[0].stateMachine.defaultState = state;
            }
            var animator = monster.GetComponent<Animator>();
            if (animator == null) animator = monster.AddComponent<Animator>();
            animator.runtimeAnimatorController = controller;
            animator.applyRootMotion = false;
            animator.enabled = true;
            EditorUtility.SetDirty(animator);
            AssetDatabase.SaveAssets();
        }
        static GameObject Model(string path,string name,Vector3 position,float height,float yaw)
        {
            var go=Object.Instantiate(AssetDatabase.LoadAssetAtPath<GameObject>(path));go.name=name;go.transform.position=Vector3.zero;go.transform.rotation=Quaternion.Euler(0,yaw,0);
            foreach(var a in go.GetComponentsInChildren<Animator>()) a.enabled=false;
            if(path.EndsWith("Egg/Forest.fbx")) foreach(Transform child in go.transform) child.gameObject.SetActive(child.name=="Bear_Egg");
            var rs=go.GetComponentsInChildren<Renderer>();var b=rs[0].bounds;foreach(var r in rs)b.Encapsulate(r.bounds);
            go.transform.localScale*=height/b.size.y;b=rs[0].bounds;foreach(var r in rs)b.Encapsulate(r.bounds);
            go.transform.position=position-new Vector3(b.center.x,b.min.y,b.center.z);return go;
        }
        static RectTransform Rect(string name,Transform parent,Vector2 size,Vector2 pos)
        {var r=new GameObject(name,typeof(RectTransform)).GetComponent<RectTransform>();r.SetParent(parent,false);r.sizeDelta=size;r.anchoredPosition=pos;return r;}
        static Image Image(string name,Transform parent,Sprite sprite,Vector2 size)
        {var r=Rect(name,parent,size,Vector2.zero);var i=r.gameObject.AddComponent<Image>();i.sprite=sprite;i.preserveAspect=true;i.raycastTarget=false;return i;}
        static TMP_Text Text(string name,Transform parent,string value,float size)
        {var r=Rect(name,parent,new Vector2(900,100),Vector2.zero);var t=r.gameObject.AddComponent<TextMeshProUGUI>();t.font=Font;t.fontSharedMaterial=Font.material;t.text=value;t.fontSize=size;t.alignment=TextAlignmentOptions.Center;t.enableAutoSizing=true;t.fontSizeMin=24;t.fontSizeMax=size;t.raycastTarget=false;return t;}
        static void Stretch(RectTransform r){r.anchorMin=Vector2.zero;r.anchorMax=Vector2.one;r.offsetMin=r.offsetMax=Vector2.zero;}
        static Sprite Sprite(string path)
        {var importer=(TextureImporter)AssetImporter.GetAtPath(path);importer.textureType=TextureImporterType.Sprite;importer.spriteImportMode=SpriteImportMode.Single;importer.mipmapEnabled=false;importer.maxTextureSize=1024;importer.SaveAndReimport();return AssetDatabase.LoadAssetAtPath<Sprite>(path);}
        public static void Capture(int width,int height,string file,bool card)
        {
            var layout=Object.FindFirstObjectByType<StealEggsLayout>();layout.Apply(width,height);
            var game=Object.FindFirstObjectByType<StealEggsGame>();game.EndCard.SetActive(card);game.Tutorial.gameObject.SetActive(!card);
            var camera=layout.View;var rt=new RenderTexture(width,height,24);camera.targetTexture=rt;Canvas.ForceUpdateCanvases();camera.Render();RenderTexture.active=rt;
            var tex=new Texture2D(width,height,TextureFormat.RGB24,false);tex.ReadPixels(new Rect(0,0,width,height),0,0);tex.Apply();System.IO.File.WriteAllBytes(file,tex.EncodeToPNG());RenderTexture.active=null;camera.targetTexture=null;Object.DestroyImmediate(rt);Object.DestroyImmediate(tex);game.EndCard.SetActive(false);game.Tutorial.gameObject.SetActive(true);
        }
    }
}

