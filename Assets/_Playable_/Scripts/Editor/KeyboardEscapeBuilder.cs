using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement;
public static partial class KeyboardEscapeBuilder {
 const string Root="Assets/_Playable_/KeyboardEscape";
 public static string ConvertMaterials(){
  var shader=Shader.Find("Playable/KeyboardEscape/Unlit");var key=Shader.Find("Playable/KeyboardEscape/Key");
  if(shader==null||key==null)throw new Exception("Shaders not imported");
  int count=0;
  foreach(var guid in AssetDatabase.FindAssets("t:Material",new[]{Root+"/Source"})){
   var p=AssetDatabase.GUIDToAssetPath(guid);var m=AssetDatabase.LoadAssetAtPath<Material>(p);
   if(m==null)continue;var so=new SerializedObject(m);var tex=so.FindProperty("m_SavedProperties.m_TexEnvs");var colors=so.FindProperty("m_SavedProperties.m_Colors");
   Texture texture=null,keyTexture=null;Color color=Color.white;Vector2 scale=Vector2.one,offset=Vector2.zero;
   foreach(string name in new[]{"_mainTex","_BaseMap","_MainTex"})for(int i=0;i<tex.arraySize;i++){var e=tex.GetArrayElementAtIndex(i);if(e.FindPropertyRelative("first").stringValue!=name)continue;var v=e.FindPropertyRelative("second");var t=v.FindPropertyRelative("m_Texture").objectReferenceValue as Texture;if(t!=null){texture=t;scale=v.FindPropertyRelative("m_Scale").vector2Value;offset=v.FindPropertyRelative("m_Offset").vector2Value;}}
   for(int i=0;i<tex.arraySize;i++){var e=tex.GetArrayElementAtIndex(i);if(e.FindPropertyRelative("first").stringValue=="_keyMap")keyTexture=e.FindPropertyRelative("second.m_Texture").objectReferenceValue as Texture;}
   foreach(string name in new[]{"_Color","_BaseColor","_mainColor"})for(int i=0;i<colors.arraySize;i++){var e=colors.GetArrayElementAtIndex(i);if(e.FindPropertyRelative("first").stringValue==name)color=e.FindPropertyRelative("second").colorValue;}
   string original=m.shader!=null?m.shader.name:"";
   if(original.StartsWith("TextMeshPro/")||original=="UI/Default")continue;
   bool transparent=m.renderQueue>=3000||p.ToLower().Contains("transparent")||original.ToLower().Contains("particle");
   if(m.name=="Direction"||m.name=="Direction 1"){m.shader=Shader.Find("Playable/KeyboardEscape/Direction");m.SetColor("_Color",m.name=="Direction 1"?new Color(0,1.0212144f,2.5945866f,1):Color.white);m.shaderKeywords=new string[0];EditorUtility.SetDirty(m);AssetDatabase.SaveAssetIfDirty(m);count++;continue;}
   if(p.Contains("/Lego/")){m.shader=Shader.Find("Playable/KeyboardEscape/Lego");m.shaderKeywords=new string[0];EditorUtility.SetDirty(m);AssetDatabase.SaveAssetIfDirty(m);count++;continue;}
   m.shader=keyTexture!=null?key:shader;m.shaderKeywords=new string[0];
   if(keyTexture==null){m.SetTexture("_MainTex",texture);m.SetColor("_Color",color);m.SetTextureScale("_MainTex",scale);m.SetTextureOffset("_MainTex",offset);m.SetFloat("_SrcBlend",transparent?5:1);m.SetFloat("_DstBlend",transparent?10:0);m.SetFloat("_ZWrite",transparent?0:1);m.SetFloat("_Cull",transparent?0:2);m.SetFloat("_Cutoff",0);m.renderQueue=transparent?3000:2000;}
   else {m.SetTexture("_keyMap",keyTexture);m.SetFloat("_alpha",1);m.SetColor("_charactersColor",Color.black);}
   EditorUtility.SetDirty(m);AssetDatabase.SaveAssetIfDirty(m);count++;
  }
  return "Converted "+count+" source materials";
 }
 public static string PrepareMap(){
  string p=Root+"/Source/MiniGames/KeyboardEscape/Prefab/keyboard.prefab";var map=PrefabUtility.LoadPrefabContents(p);
  try{
   foreach(var t in map.GetComponentsInChildren<Transform>(true))if(t&&t.name.StartsWith("Stage ")){int stage;var number=t.name.Substring(6).Split('_')[0];if(int.TryParse(number,out stage)&&stage>4)UnityEngine.Object.DestroyImmediate(t.gameObject);}
   var keys=map.transform.Find("[Container] Keys");
   if(keys)foreach(Transform child in keys.Cast<Transform>().ToArray())if(child.position.z>350||Mathf.Abs(child.position.x)>60)UnityEngine.Object.DestroyImmediate(child.gameObject);
   foreach(var t in map.GetComponentsInChildren<Transform>(true)){
    if(!t)continue;var n=t.name.ToLower();
    if(n.Contains("treadmill")||n.Contains("teleport")||n.Contains("returnzone")||n.Contains("navlink")||n=="step"||n.Contains("levelrecommended")||n=="[container] ladders")UnityEngine.Object.DestroyImmediate(t.gameObject);
   }
   foreach(var t in map.GetComponentsInChildren<Transform>(true)){GameObjectUtility.RemoveMonoBehavioursWithMissingScript(t.gameObject);t.gameObject.layer=0;}
   foreach(var c in map.GetComponentsInChildren<MonoBehaviour>(true))if(c && c.GetType().Namespace=="Unity.AI.Navigation")UnityEngine.Object.DestroyImmediate(c);
   map.name="Keyboard Escape Stages 1-4";
   Directory.CreateDirectory(Root+"/Prefabs");PrefabUtility.SaveAsPrefabAsset(map,Root+"/Prefabs/Stages 1-4.prefab");
   var report=new List<string>();
   foreach(var c in map.GetComponentsInChildren<Collider>(true))if(c.gameObject.tag=="DeathZone")report.Add("HAZARD "+c.name+" "+c.bounds.center);
   foreach(var t in map.GetComponentsInChildren<Transform>(true))if(t.name.StartsWith("Stage ")||t.parent==keys)report.Add(t.name+" "+t.position);
   File.WriteAllLines("Temp/keyboard-map-report.txt",report);return "Saved trimmed map. Objects="+map.GetComponentsInChildren<Transform>(true).Length;
  }finally{PrefabUtility.UnloadPrefabContents(map);}
 }
}
