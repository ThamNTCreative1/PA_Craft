using System;
using System.Linq;
using System.IO;
using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement;
using Playable.KeyboardEscape;
using Minigames.KeyboardEscape.Gameplay;
public static partial class KeyboardEscapeBuilder {
 public static string FinalizeScene(){
  var scene=UnityEngine.SceneManagement.SceneManager.GetActiveScene();var game=scene.GetRootGameObjects().SelectMany(g=>g.GetComponentsInChildren<EscapeGame>(true)).First();int removed=0;
  WireControls(game);
  foreach(var key in game.GetComponentsInChildren<KeyNote>(true))if(key.transform.position.z>351||Mathf.Abs(key.transform.position.x)>60){UnityEngine.Object.DestroyImmediate(key.gameObject);removed++;}
  foreach(var c in game.GetComponentsInChildren<MonoBehaviour>(true))if(c&&c.GetType().Namespace=="Unity.AI.Navigation")UnityEngine.Object.DestroyImmediate(c);
  foreach(var generator in game.GetComponentsInChildren<KeyboardGenerator>(true))UnityEngine.Object.DestroyImmediate(generator);
  foreach(var c in game.GetComponentsInChildren<MonoBehaviour>(true)){
   if(!(c is KeyboardEscape_TsunamiTrap)&&!(c is KeyboardEscape_WaterUpTrap))continue;
   var so=new SerializedObject(c);var prop=so.FindProperty("audioSource");var audio=prop.objectReferenceValue as AudioSource;
   if(!audio) {audio=c.GetComponentInChildren<AudioSource>(true);if(!audio)audio=c.gameObject.AddComponent<AudioSource>();prop.objectReferenceValue=audio;so.ApplyModifiedPropertiesWithoutUndo();}
   if(!audio.clip){string name=c is KeyboardEscape_TsunamiTrap?"Tsunami":"WaterBubble";string guid=AssetDatabase.FindAssets(name+" t:AudioClip",new[]{Root+"/Source"}).FirstOrDefault();if(guid!=null)audio.clip=AssetDatabase.LoadAssetAtPath<AudioClip>(AssetDatabase.GUIDToAssetPath(guid));}
  }
  // Place the temporary pickup markers on existing keys, away from lethal floors.
  var keys=game.GetComponentsInChildren<KeyNote>();var random=new System.Random(427);
  for(int i=0;i<game.helmets.Length;i++){float lo=new[]{20f,110f,180f,250f}[i],hi=new[]{70f,160f,230f,320f}[i];var candidates=keys.Where(k=>k.transform.position.z>lo&&k.transform.position.z<hi).ToArray();if(candidates.Length>0)game.helmets[i].transform.position=candidates[random.Next(candidates.Length)].transform.position+Vector3.up*1.2f;}
  var hud=game.GetComponentInChildren<EscapeHUD>();hud.scaler=game.GetComponentInChildren<UnityEngine.UI.CanvasScaler>();hud.speedFrame=game.player.speedSlider.transform.parent as RectTransform;hud.ApplyLayout(1920,1080);
  // Luna resolves materials even on disabled emitter renderers.
  var particleRenderers=game.fireworks.GetComponentsInChildren<ParticleSystemRenderer>(true);
  var particleMaterial=particleRenderers.First(r=>r.sharedMaterial!=null).sharedMaterial;
  foreach(var renderer in particleRenderers)if(!renderer.sharedMaterial)renderer.sharedMaterial=particleMaterial;
  EditorSceneManager.MarkSceneDirty(scene);EditorSceneManager.SaveScene(scene);return "Removed out-of-course keys="+removed+"; retained keys="+keys.Length;
 }
 public static string ScreenshotUI(string path,int width,int height){
  var game=UnityEngine.SceneManagement.SceneManager.GetActiveScene().GetRootGameObjects().SelectMany(g=>g.GetComponentsInChildren<EscapeGame>(true)).First();var cam=game.viewCamera;var canvas=game.GetComponentsInChildren<Canvas>(true).First(c=>c.name=="Gameplay UI");var rt=new RenderTexture(width,height,24);var previous=RenderTexture.active;var oldCamera=canvas.worldCamera;var oldMode=canvas.renderMode;float distance=canvas.planeDistance;
  var hud=game.GetComponentInChildren<EscapeHUD>();var oldRef=hud.scaler.referenceResolution;var oldPosition=cam.transform.localPosition;
  try{hud.ApplyLayout(width,height);cam.transform.localPosition=new Vector3(0,0,height>width?-7.5f:-6f);cam.targetTexture=rt;canvas.renderMode=RenderMode.ScreenSpaceCamera;canvas.worldCamera=cam;canvas.planeDistance=.3f;Canvas.ForceUpdateCanvases();cam.Render();RenderTexture.active=rt;var tex=new Texture2D(width,height,TextureFormat.RGB24,false);tex.ReadPixels(new Rect(0,0,width,height),0,0);tex.Apply();File.WriteAllBytes(path,tex.EncodeToPNG());UnityEngine.Object.DestroyImmediate(tex);}
  finally{hud.scaler.referenceResolution=oldRef;cam.transform.localPosition=oldPosition;canvas.renderMode=oldMode;canvas.worldCamera=oldCamera;canvas.planeDistance=distance;cam.targetTexture=null;RenderTexture.active=previous;UnityEngine.Object.DestroyImmediate(rt);Canvas.ForceUpdateCanvases();}return path;
 }
}
