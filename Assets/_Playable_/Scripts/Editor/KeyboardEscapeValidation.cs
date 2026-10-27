using System;
using System.IO;
using System.Linq;
using UnityEngine;
using UnityEditor;
using UnityEditor.Animations;
using UnityEditor.SceneManagement;
using Playable.KeyboardEscape;
public static partial class KeyboardEscapeBuilder {
 public static string ConfigureGiants(){
  var game=UnityEngine.SceneManagement.SceneManager.GetActiveScene().GetRootGameObjects().SelectMany(g=>g.GetComponentsInChildren<EscapeGame>(true)).First();
  int count=0;
  for(int i=0;i<game.giants.Length;i++){
   if(i==0){BakeCapuchinoWalk();continue;}
   var giant=game.giants[i];string fbx=i==0?Root+"/Source/Giants/Walking.fbx":Root+"/Source/Giants/TungTungTung/Tung Tung Tung Sahur.fbx";
   var clips=AssetDatabase.LoadAllAssetsAtPath(fbx).OfType<AnimationClip>().Where(c=>!c.name.StartsWith("__preview__")).ToArray();
   var source=clips.FirstOrDefault(c=>c.name.ToLower().Contains("walk"))??clips.FirstOrDefault();if(!source)throw new Exception("Missing source walk clip "+fbx);
   string clipPath=Root+"/Prefabs/Giant Walk "+i+".anim";var clip=AssetDatabase.LoadAssetAtPath<AnimationClip>(clipPath);if(!clip){clip=new AnimationClip();AssetDatabase.CreateAsset(clip,clipPath);}else clip.ClearCurves();clip.frameRate=source.frameRate;
   foreach(var binding in AnimationUtility.GetCurveBindings(source)){
    if(binding.type!=typeof(Transform))continue;
    var name=binding.path.Split('/').Last();var bone=giant.GetComponentsInChildren<Transform>(true).FirstOrDefault(t=>t.name==name);if(!bone)continue;
    var b=binding;b.path=AnimationUtility.CalculateTransformPath(bone,giant.transform);
    if(i==0 && b.propertyName.Contains("Scale"))continue;
    if(i==0 && b.propertyName.Contains("Position")&&!name.Contains("Hips"))continue;
    var curve=AnimationUtility.GetEditorCurve(source,binding);var keys=curve.keys;
    if(keys.Length>0 && b.propertyName.StartsWith("m_LocalPosition")){
     int axis=b.propertyName.EndsWith(".x")?0:b.propertyName.EndsWith(".y")?1:2;
     float initial=keys[0].value;float duration=keys[keys.Length-1].time-keys[0].time;float drift=duration>0?(keys[keys.Length-1].value-initial)/duration:0;
     float ratio=1;if(i==0){var hips=giant.GetComponentsInChildren<Transform>().First(t=>t.name.Contains("Hips"));var ybind=binding;ybind.propertyName="m_LocalPosition.y";var ycurve=AnimationUtility.GetEditorCurve(source,ybind);if(ycurve!=null&&Mathf.Abs(ycurve.keys[0].value)>.001f)ratio=hips.localPosition.y/ycurve.keys[0].value;}
     for(int k=0;k<keys.Length;k++){
      if(axis!=1){keys[k].value-=drift*(keys[k].time-keys[0].time);keys[k].inTangent-=drift;keys[k].outTangent-=drift;}
      if(i==0){keys[k].value=bone.localPosition[axis]+(keys[k].value-initial)*ratio;keys[k].inTangent*=ratio;keys[k].outTangent*=ratio;}
     }
     curve.keys=keys;
    }
    AnimationUtility.SetEditorCurve(clip,b,curve);count++;
   }
   AnimationUtility.SetAnimationEvents(clip,new AnimationEvent[0]);var settings=AnimationUtility.GetAnimationClipSettings(clip);settings.loopTime=true;AnimationUtility.SetAnimationClipSettings(clip,settings);EditorUtility.SetDirty(clip);AssetDatabase.SaveAssetIfDirty(clip);
   string controllerPath=Root+"/Prefabs/Giant "+i+".controller";var controller=AssetDatabase.LoadAssetAtPath<AnimatorController>(controllerPath);if(!controller){controller=AnimatorController.CreateAnimatorControllerAtPath(controllerPath);var state=controller.layers[0].stateMachine.AddState("Walk");state.motion=clip;controller.layers[0].stateMachine.defaultState=state;}
   giant.animator.runtimeAnimatorController=controller;giant.animator.avatar=null;giant.animator.applyRootMotion=false;giant.animator.cullingMode=AnimatorCullingMode.AlwaysAnimate;
   var bounds=BoundsOf(giant.gameObject);giant.transform.position+=Vector3.up*(Ground(giant.transform.position.x,giant.transform.position.z,11).y-bounds.min.y);
  }
  EditorSceneManager.MarkSceneDirty(game.gameObject.scene);EditorSceneManager.SaveScene(game.gameObject.scene);return "Giant animations configured; curves="+count;
 }
 public static string Screenshot(string path,int width,int height){
  var camera=UnityEngine.SceneManagement.SceneManager.GetActiveScene().GetRootGameObjects().SelectMany(g=>g.GetComponentsInChildren<Camera>(true)).First();var rt=new RenderTexture(width,height,24);camera.targetTexture=rt;camera.Render();var before=RenderTexture.active;RenderTexture.active=rt;var tex=new Texture2D(width,height,TextureFormat.RGB24,false);tex.ReadPixels(new Rect(0,0,width,height),0,0);tex.Apply();File.WriteAllBytes(path,tex.EncodeToPNG());RenderTexture.active=before;camera.targetTexture=null;UnityEngine.Object.DestroyImmediate(tex);UnityEngine.Object.DestroyImmediate(rt);return path;
 }
}
