using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEditor.Animations;
using TMPro;
using Playable;
using Playable.KeyboardEscape;
using Minigames.KeyboardEscape.Gameplay;
public static partial class KeyboardEscapeBuilder {
 static GameObject Instance(string path,Transform parent=null){var a=AssetDatabase.LoadAssetAtPath<GameObject>(path);if(!a)throw new Exception("Missing asset "+path);var g=(GameObject)PrefabUtility.InstantiatePrefab(a);if(parent)g.transform.SetParent(parent,true);return g;}
 static void Set(UnityEngine.Object o,string field,UnityEngine.Object value){var s=new SerializedObject(o);s.FindProperty(field).objectReferenceValue=value;s.ApplyModifiedPropertiesWithoutUndo();}
 static Transform Find(Transform root,string name){return root.GetComponentsInChildren<Transform>(true).FirstOrDefault(t=>t.name==name);}
 static Bounds BoundsOf(GameObject g){var rs=g.GetComponentsInChildren<Renderer>();var b=rs[0].bounds;foreach(var r in rs)b.Encapsulate(r.bounds);return b;}
 static RectTransform Rect(string name,Transform parent,Vector2 anchor,Vector2 size,Vector2 position){var g=new GameObject(name,typeof(RectTransform));var t=(RectTransform)g.transform;t.SetParent(parent,false);t.anchorMin=t.anchorMax=anchor;t.sizeDelta=size;t.anchoredPosition=position;return t;}
 static TextMeshProUGUI Label(string name,Transform parent,Vector2 anchor,Vector2 size,Vector2 position,int fontSize){var t=Rect(name,parent,anchor,size,position);var text=t.gameObject.AddComponent<TextMeshProUGUI>();text.font=AssetDatabase.LoadAssetAtPath<TMP_FontAsset>(Root+"/Source/TextMesh Pro/Fonts/Customs/museo-sans-rounded-cufonfonts/MuseoSansRounded1000 SDF.asset");text.fontSize=fontSize;text.alignment=TextAlignmentOptions.Center;text.color=Color.white;text.raycastTarget=false;return text;}
 static void Bottom(RectTransform t,bool right){t.anchorMin=t.anchorMax=new Vector2(right?1:0,0);t.pivot=new Vector2(.5f,.5f);t.anchoredPosition=new Vector2(right?-160:160,170);t.sizeDelta=new Vector2(160,160);}
 static Vector3 Ground(float x,float z,float fallback){RaycastHit hit;return Physics.Raycast(new Vector3(x,fallback+4,z),Vector3.down,out hit,40,~0,QueryTriggerInteraction.Ignore)?hit.point:new Vector3(x,fallback,z);}
 static Material SimpleMaterial(string name,Texture texture,Color color){string path=Root+"/"+name+".mat";var m=AssetDatabase.LoadAssetAtPath<Material>(path);if(!m){m=new Material(Shader.Find("Playable/KeyboardEscape/Unlit"));AssetDatabase.CreateAsset(m,path);}m.SetTexture("_MainTex",texture);m.SetColor("_Color",color);return m;}
 static void NativeMaterials(GameObject g,string prefix){int i=0;foreach(var r in g.GetComponentsInChildren<Renderer>(true)){var mats=r.sharedMaterials;for(int j=0;j<mats.Length;j++){var m=mats[j];if(!m)continue;if(m.shader.name.StartsWith("Playable/KeyboardEscape"))continue;var tex=m.mainTexture;Color color=m.HasProperty("_BaseColor")?m.GetColor("_BaseColor"):(m.HasProperty("_Color")?m.color:Color.white);mats[j]=SimpleMaterial(prefix+"_"+i++,tex,color);}r.sharedMaterials=mats;}}
 public static string BuildScene(){
  var scene=UnityEngine.SceneManagement.SceneManager.GetActiveScene();if(scene.path!="Assets/_Playable_/Scenes/Gameplay.unity")throw new Exception("Wrong scene");
  string backup="Temp/Gameplay.before-keyboard-escape.unity";if(!File.Exists(backup))File.Copy(scene.path,backup);
  var gm=scene.GetRootGameObjects().SelectMany(g=>g.GetComponentsInChildren<GameManager>(true)).First();
  foreach(var g in scene.GetRootGameObjects())if(g!=gm.gameObject && g.name!="AudioManager")UnityEngine.Object.DestroyImmediate(g);
  var root=new GameObject("KeyboardEscape");var game=root.AddComponent<EscapeGame>();game.manager=gm;
  var map=Instance(Root+"/Prefabs/Stages 1-4.prefab",root.transform);
  PrefabUtility.UnpackPrefabInstance(map,PrefabUnpackMode.Completely,InteractionMode.AutomatedAction);
  var removedStage=Find(map.transform,"Stage 4");if(removedStage)UnityEngine.Object.DestroyImmediate(removedStage.gameObject);
  foreach(var generator in map.GetComponentsInChildren<KeyboardGenerator>(true)){if(generator.transform.childCount==0)generator.SpawnPrefab();generator.enabled=false;}
  foreach(var key in map.GetComponentsInChildren<KeyNote>(true))if(key.transform.position.z>234.2f||Mathf.Abs(key.transform.position.x)>60)UnityEngine.Object.DestroyImmediate(key.gameObject);
  foreach(var t in map.GetComponentsInChildren<Transform>(true)){GameObjectUtility.RemoveMonoBehavioursWithMissingScript(t.gameObject);t.gameObject.layer=0;}
  foreach(var c in map.GetComponentsInChildren<Collider>(true))if(c.CompareTag("DeathZone")&&!c.GetComponent<EscapeHazard>())c.gameObject.AddComponent<EscapeHazard>();
  // Scene overrides in the source attach audio separately; attach missing sources locally.
  foreach(var trap in map.GetComponentsInChildren<MonoBehaviour>(true))if(trap is KeyboardEscape_TsunamiTrap||trap is KeyboardEscape_WaterUpTrap){var so=new SerializedObject(trap);var a=so.FindProperty("audioSource");if(a.objectReferenceValue==null){a.objectReferenceValue=trap.gameObject.AddComponent<AudioSource>();so.ApplyModifiedPropertiesWithoutUndo();}}
  Physics.SyncTransforms();
  var home=new GameObject("Home Stage 1").transform;home.SetParent(root.transform);home.position=Ground(3.18f,-13.34f,.104f)+Vector3.up*.1f;game.home=home;
  var playerObject=new GameObject("Scooter Player");playerObject.transform.SetParent(root.transform);playerObject.transform.position=home.position;
  var player=playerObject.AddComponent<ScooterPlayer>();game.player=player;player.game=game;
  var body=playerObject.AddComponent<EscapePlayerBody>();body.player=player;player.body=body;var playerBox=playerObject.AddComponent<BoxCollider>();playerBox.center=body.center;playerBox.size=new Vector3(body.radius*2,body.height,body.radius*2);playerBox.isTrigger=true;var playerRigid=playerObject.AddComponent<Rigidbody>();playerRigid.isKinematic=true;playerRigid.useGravity=false;
  var visual=Instance("Assets/_Playable_/3D Model/Map/original_player_scooter_pack/original_player_scooter.glb",playerObject.transform);visual.transform.localPosition=Vector3.zero;visual.transform.localRotation=Quaternion.Euler(0,180,0);visual.transform.localScale=Vector3.one;
  player.visual=visual.transform;player.frontWheel=Find(visual.transform,"Wheel_Front");player.rearWheel=Find(visual.transform,"Wheel_Rear");NativeMaterials(visual,"Scooter");
  var shatter=playerObject.AddComponent<EscapePlayerShatter>();shatter.pieces=visual.GetComponentsInChildren<MeshRenderer>(true).Select(r=>r.transform).ToArray();var debris=new GameObject("Player Debris").transform;debris.SetParent(root.transform,false);shatter.debrisRoot=debris;player.shatter=shatter;
  var yaw=new GameObject("Camera Yaw").transform;yaw.SetParent(root.transform);yaw.position=home.position+Vector3.up*1.4f;var pitch=new GameObject("Camera Pitch").transform;pitch.SetParent(yaw,false);pitch.localRotation=Quaternion.Euler(20,0,0);
  var cameraObject=new GameObject("Main Camera",typeof(Camera),typeof(AudioListener));cameraObject.tag="MainCamera";cameraObject.transform.SetParent(pitch,false);cameraObject.transform.localPosition=new Vector3(0,0,-6);var cam=cameraObject.GetComponent<Camera>();cam.nearClipPlane=.1f;cam.farClipPlane=140;cam.fieldOfView=60;cam.clearFlags=CameraClearFlags.SolidColor;cam.backgroundColor=new Color(.35f,.7f,.95f);game.viewCamera=cam;player.cameraYaw=yaw;
  var light=new GameObject("Directional Light",typeof(Light));light.transform.SetParent(root.transform);light.GetComponent<Light>().type=LightType.Directional;light.transform.rotation=Quaternion.Euler(50,-30,0);
  var canvasObject=new GameObject("Gameplay UI",typeof(RectTransform),typeof(Canvas),typeof(CanvasScaler),typeof(GraphicRaycaster));canvasObject.transform.SetParent(root.transform);var canvas=canvasObject.GetComponent<Canvas>();canvas.renderMode=RenderMode.ScreenSpaceOverlay;var scaler=canvasObject.GetComponent<CanvasScaler>();scaler.uiScaleMode=CanvasScaler.ScaleMode.ScaleWithScreenSize;scaler.referenceResolution=new Vector2(1920,1080);scaler.screenMatchMode=CanvasScaler.ScreenMatchMode.Expand;
  var touch=Rect("Swipe Camera",canvasObject.transform,new Vector2(.5f,.5f),Vector2.zero,Vector2.zero);touch.anchorMin=Vector2.zero;touch.anchorMax=Vector2.one;var image=touch.gameObject.AddComponent<Image>();image.color=Color.clear;var look=touch.gameObject.AddComponent<EscapeLookInput>();look.game=game;look.yaw=yaw;look.pitch=pitch;look.target=player.transform;look.viewCamera=cam;
  var sourceUI=Instance(Root+"/Source/MiniGames/Commons/Resources/UI/PlayerInputPanel.prefab",canvasObject.transform);PrefabUtility.UnpackPrefabInstance(sourceUI,PrefabUnpackMode.Completely,InteractionMode.AutomatedAction);sourceUI.transform.localScale=Vector3.one;
  foreach(var c in sourceUI.GetComponentsInChildren<GraphicRaycaster>(true))UnityEngine.Object.DestroyImmediate(c);
  foreach(var c in sourceUI.GetComponentsInChildren<Canvas>(true))UnityEngine.Object.DestroyImmediate(c);
  foreach(var c in sourceUI.GetComponentsInChildren<CanvasScaler>(true))UnityEngine.Object.DestroyImmediate(c);
  foreach(var t in sourceUI.GetComponentsInChildren<Transform>(true))GameObjectUtility.RemoveMonoBehavioursWithMissingScript(t.gameObject);
  var sourceRect=(RectTransform)sourceUI.transform;sourceRect.anchorMin=Vector2.zero;sourceRect.anchorMax=Vector2.one;sourceRect.offsetMin=sourceRect.offsetMax=Vector2.zero;sourceRect.localScale=Vector3.one;sourceRect.localPosition=Vector3.zero;
  var jump=Find(sourceUI.transform,"Jump Button");var stick=Find(sourceUI.transform,"Floating Joystick Input System");
  var joy=stick.gameObject.AddComponent<Joystick>();Set(joy,"background",Find(stick,"Background"));Set(joy,"joystickKnob",Find(stick,"Handle"));player.joystick=joy;
  var stickRect=(RectTransform)stick;Bottom(stickRect,false);Bottom((RectTransform)jump,true);
  var bg=(RectTransform)Find(stick,"Background");bg.anchorMin=bg.anchorMax=new Vector2(.5f,.5f);bg.anchoredPosition=Vector2.zero;bg.sizeDelta=new Vector2(160,160);bg.gameObject.SetActive(true);
  var button=jump.GetComponent<Button>();if(!button)button=jump.gameObject.AddComponent<Button>();UnityEditor.Events.UnityEventTools.AddPersistentListener(button.onClick,player.Jump);
  foreach(var t in sourceUI.GetComponentsInChildren<Transform>(true))if(t.name=="Screen Delta Input"||t.name=="SettingButton")t.gameObject.SetActive(false);
  var speedUI=Instance(Root+"/Source/MiniGames/KeyboardEscape/Prefab/UI/KeyboardEscape_GameplayPanel.prefab",canvasObject.transform);PrefabUtility.UnpackPrefabInstance(speedUI,PrefabUnpackMode.Completely,InteractionMode.AutomatedAction);var speed=Find(speedUI.transform,"Speed Frame");speed.SetParent(canvasObject.transform,false);UnityEngine.Object.DestroyImmediate(speedUI);var sr=(RectTransform)speed;sr.anchorMin=sr.anchorMax=new Vector2(1,.5f);sr.anchoredPosition=new Vector2(-110,60);sr.localScale=Vector3.one;
  player.speedSlider=speed.GetComponentInChildren<Slider>(true);player.speedSlider.minValue=.05f;player.speedSlider.maxValue=1;player.speedSlider.value=1;look.inputBlockers=new[]{stickRect,(RectTransform)jump,sr};
  var hud=canvasObject.AddComponent<EscapeHUD>();hud.player=player;hud.scaler=scaler;hud.speedFrame=sr;hud.speedLabels=speed.GetComponentsInChildren<TMP_Text>(true);
  game.hint=Label("Tutorial",canvasObject.transform,new Vector2(.5f,.2f),new Vector2(800,90),Vector2.zero,46);game.countdown=Label("Start Countdown",canvasObject.transform,new Vector2(.5f,.5f),new Vector2(600,180),Vector2.zero,100);
  var blocker=Rect("CTA Touch",canvasObject.transform,new Vector2(.5f,.5f),Vector2.zero,Vector2.zero);blocker.anchorMin=Vector2.zero;blocker.anchorMax=Vector2.one;var bi=blocker.gameObject.AddComponent<Image>();bi.color=Color.clear;var bb=blocker.gameObject.AddComponent<Button>();bb.targetGraphic=bi;blocker.gameObject.SetActive(false);
  var eventSystem=new GameObject("EventSystem",typeof(EventSystem),typeof(StandaloneInputModule));eventSystem.transform.SetParent(root.transform);
  var gmso=new SerializedObject(gm);gmso.FindProperty("_startGameplayAutomatically").boolValue=false;gmso.FindProperty("_countdownText").objectReferenceValue=null;gmso.FindProperty("_btnBlock").objectReferenceValue=bb;gmso.FindProperty("_failPanel").objectReferenceValue=null;gmso.FindProperty("_winPanel").objectReferenceValue=null;gmso.FindProperty("_backgroundMusic").objectReferenceValue=AssetDatabase.LoadAssetAtPath<AudioClip>(Root+"/Source/MiniGames/KeyboardEscape/Sounds/KE_Music.mp3");gmso.ApplyModifiedPropertiesWithoutUndo();
  game.sound=root.AddComponent<AudioSource>();game.hurtSound=AssetDatabase.LoadAssetAtPath<AudioClip>(Root+"/Source/MiniGames/KeyboardEscape/Sounds/KE_hurt-4.mp3");player.keySound=playerObject.AddComponent<AudioSource>();player.keyClips=AssetDatabase.FindAssets("t:AudioClip",new[]{Root+"/Source/MiniGames/KeyboardEscape/Sounds/SwitchSounds/Default"}).Select(g=>AssetDatabase.LoadAssetAtPath<AudioClip>(AssetDatabase.GUIDToAssetPath(g))).ToArray();
  var goal=Instance(Root+"/Source/MiniGames/KeyboardEscape/Prefab/ReturnZone.prefab",root.transform);goal.name="Stage 3 Goal";goal.transform.position=new Vector3(4.58f,10.62f,231.3f);
  foreach(var t in goal.GetComponentsInChildren<Transform>(true)){GameObjectUtility.RemoveMonoBehavioursWithMissingScript(t.gameObject);t.gameObject.layer=0;if(t.name=="[Text] Bonus Amount"||t.name=="LevelUp")t.gameObject.SetActive(false);}
  var cup=Find(goal.transform,"Trophy").gameObject;game.cup=cup.transform;var cupCollider=cup.AddComponent<SphereCollider>();cupCollider.radius=1.8f/Mathf.Max(.001f,cup.transform.lossyScale.x);cupCollider.isTrigger=true;var cp=cup.AddComponent<EscapePickup>();cp.game=game;cp.isCup=true;
  var fx=Instance(Root+"/Source/Game/Assets/VFX/Confetti/Confetti_3d.prefab",root.transform);fx.transform.position=cup.transform.position;game.fireworks=fx.GetComponentInChildren<ParticleSystem>();
  game.guide=null;
  var helmetUI=Label("Helmet Equipped",canvasObject.transform,new Vector2(.5f,.83f),new Vector2(400,60),Vector2.zero,32);helmetUI.text="HELMET";helmetUI.color=Color.cyan;player.helmetIndicator=helmetUI.gameObject;helmetUI.gameObject.SetActive(false);
  var pickups=new List<EscapePickup>();var random=new System.Random(427);foreach(float z in new[]{40f,190f}){var pos=Ground((float)(random.NextDouble()*6-3)+4.7f,z,z>240?11:(z>170?7:1));var go=new GameObject("Helmet Pickup");go.transform.SetParent(root.transform);go.transform.position=pos+Vector3.up*1.2f;var trigger=go.AddComponent<SphereCollider>();trigger.radius=1.3f;trigger.isTrigger=true;var pickup=go.AddComponent<EscapePickup>();pickup.game=game;var labelObject=new GameObject("Helmet UI",typeof(RectTransform),typeof(Canvas));labelObject.transform.SetParent(go.transform,false);var cv=labelObject.GetComponent<Canvas>();cv.renderMode=RenderMode.WorldSpace;labelObject.transform.localScale=Vector3.one*.01f;var text=Label("Helmet",labelObject.transform,new Vector2(.5f,.5f),new Vector2(160,70),Vector2.zero,32);text.text="HELMET";text.color=Color.cyan;pickup.billboard=labelObject.transform;pickups.Add(pickup);}game.helmets=pickups.ToArray();
  var giantList=new List<EscapeGiant>();int index=0;foreach(string model in new[]{"Ballerina Capuchina/Ballerina Capuchina.fbx","TungTungTung/Tung Tung Tung Sahur.fbx"}){var go=Instance(Root+"/Source/Giants/"+model,root.transform);var bounds=BoundsOf(go);go.transform.localScale*=BoundsOf(visual).size.y*5/bounds.size.y;go.transform.position=Ground(index==0?3:7,210+index*10,11);go.transform.position+=Vector3.up*(go.transform.position.y-BoundsOf(go).min.y+.03f);var giant=go.AddComponent<EscapeGiant>();giant.game=game;giant.animator=go.GetComponent<Animator>();if(!giant.animator)giant.animator=go.AddComponent<Animator>();giant.animator.applyRootMotion=false;giantList.Add(giant);index++;}game.giants=giantList.ToArray();
  WireControls(game);
  EditorSceneManager.MarkSceneDirty(scene);EditorSceneManager.SaveScene(scene);EditorBuildSettings.scenes=new[]{new EditorBuildSettingsScene(scene.path,true)};
  File.WriteAllText("Temp/keyboard-scene-build.txt","Scene built; home="+home.position+" cup="+cup.transform.position+" stages=3 giants="+game.giants.Length+" helmets="+game.helmets.Length);
  return File.ReadAllText("Temp/keyboard-scene-build.txt");
 }
}
