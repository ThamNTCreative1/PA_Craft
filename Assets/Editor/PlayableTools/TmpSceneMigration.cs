#if UNITY_EDITOR
using System;
using System.Collections.Generic;
using System.IO;
using TMPro;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.TextCore.LowLevel;
using UnityEngine.UI;

public static class TmpSceneMigration
{
    const string FontPath="Assets/_Playable/Fonts/FFFFORWA SDF.asset";
    const string RefsPath=".agents/tmp-text-references.json";
    [Serializable] public class Link { public string owner,path,target; }
    [Serializable] public class Links { public List<Link> items=new List<Link>(); }
    public static TMP_FontAsset GetFont(Font source)
    {
        if(source!=null&&AssetDatabase.GetAssetPath(source).Contains("FFFFORWA"))
            return AssetDatabase.LoadAssetAtPath<TMP_FontAsset>(FontPath);
        return AssetDatabase.LoadAssetAtPath<TMP_FontAsset>("Assets/TextMesh Pro/Resources/Fonts & Materials/LiberationSans SDF.asset");
    }
    public static string ConvertScene()
    {
        if(Application.isPlaying)throw new InvalidOperationException("Stop Play mode first");
        var scene=SceneManager.GetActiveScene();
        EditorSceneManager.SaveScene(scene);
        File.Copy(scene.path,".agents/LivingRoomTap-before-TMP.unity",true);
        var font=AssetDatabase.LoadAssetAtPath<TMP_FontAsset>(FontPath);
        if(font==null)
        {
            font=TMP_FontAsset.CreateFontAsset(AssetDatabase.LoadAssetAtPath<Font>("Assets/_Playable/Fonts/FFFFORWA.ttf"),90,9,GlyphRenderMode.SDFAA,1024,1024,AtlasPopulationMode.Dynamic,false);
            font.name="FFFFORWA SDF";AssetDatabase.CreateAsset(font,FontPath);
            string chars="";for(int i=32;i<=126;i++)chars+=(char)i;
            string missing;font.TryAddCharacters(chars,out missing);
            font.atlasPopulationMode=AtlasPopulationMode.Static;
            foreach(var atlas in font.atlasTextures){atlas.name="FFFFORWA SDF Atlas";atlas.filterMode=FilterMode.Bilinear;AssetDatabase.AddObjectToAsset(atlas,font);}
            font.material.shader=Shader.Find("TextMeshPro/Mobile/Distance Field");
            AssetDatabase.AddObjectToAsset(font.material,font);EditorUtility.SetDirty(font);
        }
        var links=new Links();
        foreach(var component in UnityEngine.Object.FindObjectsByType<MonoBehaviour>(FindObjectsInactive.Include,FindObjectsSortMode.None))
        {
            if(component.gameObject.scene!=scene||component is CEBB.Playable.LunaTextOutline)continue;
            var serialized=new SerializedObject(component);var p=serialized.GetIterator();
            while(p.Next(true))if(p.propertyType==SerializedPropertyType.ObjectReference&&p.objectReferenceValue is Text)
            {
                var text=(Text)p.objectReferenceValue;
                links.items.Add(new Link{owner=GlobalObjectId.GetGlobalObjectIdSlow(component).ToString(),path=p.propertyPath,target=GlobalObjectId.GetGlobalObjectIdSlow(text.gameObject).ToString()});
            }
        }
        File.WriteAllText(RefsPath,JsonUtility.ToJson(links,true));
        var outlined=new Dictionary<GameObject,Color>();
        foreach(var helper in UnityEngine.Object.FindObjectsByType<CEBB.Playable.LunaTextOutline>(FindObjectsInactive.Include,FindObjectsSortMode.None))
        {
            if(helper.source!=null)outlined[helper.source.gameObject]=helper.effectColor;
            helper.enabled=false;
            if(helper.borders!=null)foreach(var border in helper.borders)if(border!=null)UnityEngine.Object.DestroyImmediate(border.gameObject);
            UnityEngine.Object.DestroyImmediate(helper);
        }
        foreach(var layout in UnityEngine.Object.FindObjectsByType<CEBB.Playable.BedroomLayout>(FindObjectsInactive.Include,FindObjectsSortMode.None))layout.textOutlines=new CEBB.Playable.LunaTextOutline[0];
        int converted=0;
        foreach(var old in UnityEngine.Object.FindObjectsByType<Text>(FindObjectsInactive.Include,FindObjectsSortMode.None))
        {
            if(old.gameObject.scene!=scene)continue;
            var go=old.gameObject;string value=old.text;Color color=old.color;Font originalFont=old.font;
            float size=old.fontSize,min=old.resizeTextMinSize,max=old.resizeTextMaxSize;
            bool auto=old.resizeTextForBestFit,raycast=old.raycastTarget,rich=old.supportRichText,enabled=old.enabled;
            var alignment=old.alignment;var style=old.fontStyle;bool wrap=old.horizontalOverflow==HorizontalWrapMode.Wrap;
            bool truncate=old.verticalOverflow==VerticalWrapMode.Truncate;
            var effect=old.GetComponent<Outline>();if(effect!=null){outlined[go]=effect.effectColor;UnityEngine.Object.DestroyImmediate(effect);}
            var rt=old.rectTransform;Vector2 anchorMin=rt.anchorMin,anchorMax=rt.anchorMax,pivot=rt.pivot,delta=rt.sizeDelta;Vector3 position=rt.anchoredPosition3D,scale=rt.localScale;Quaternion rotation=rt.localRotation;
            UnityEngine.Object.DestroyImmediate(old);
            var text=go.AddComponent<TextMeshProUGUI>();text.font=GetFont(originalFont);text.text=value;text.color=color;
            text.fontSize=size;text.fontSizeMin=min;text.fontSizeMax=max;text.enableAutoSizing=auto;
            text.alignment=Alignment(alignment);text.fontStyle=style==FontStyle.Bold?FontStyles.Bold:style==FontStyle.Italic?FontStyles.Italic:style==FontStyle.BoldAndItalic?FontStyles.Bold|FontStyles.Italic:FontStyles.Normal;
            text.enableWordWrapping=wrap;text.overflowMode=truncate?TextOverflowModes.Truncate:TextOverflowModes.Overflow;
            text.raycastTarget=raycast;text.richText=rich;text.enabled=enabled;text.margin=Vector4.zero;
            // Shared SDF presets avoid a separate material instance for every label.
            Color outlineColor;
            if(outlined.TryGetValue(go,out outlineColor))
            {
                string materialPath="Assets/_Playable/Fonts/"+text.font.name+" Outline "+(outlineColor.a>.7f?"Strong":"Soft")+".mat";
                var material=AssetDatabase.LoadAssetAtPath<Material>(materialPath);
                if(material==null){material=new Material(text.font.material);material.SetColor("_OutlineColor",outlineColor);material.SetFloat("_OutlineWidth",.14f);material.EnableKeyword("OUTLINE_ON");AssetDatabase.CreateAsset(material,materialPath);}
                text.fontSharedMaterial=material;text.extraPadding=true;
            }
            rt.anchorMin=anchorMin;rt.anchorMax=anchorMax;rt.pivot=pivot;rt.sizeDelta=delta;rt.anchoredPosition3D=position;rt.localScale=scale;rt.localRotation=rotation;
            EditorUtility.SetDirty(text);converted++;
        }
        AssetDatabase.SaveAssets();EditorSceneManager.MarkSceneDirty(scene);EditorSceneManager.SaveScene(scene);
        return converted+" texts converted; "+links.items.Count+" serialized links recorded";
    }
    static TextAlignmentOptions Alignment(TextAnchor anchor)
    {
        TextAlignmentOptions[] values={TextAlignmentOptions.TopLeft,TextAlignmentOptions.Top,TextAlignmentOptions.TopRight,TextAlignmentOptions.Left,TextAlignmentOptions.Center,TextAlignmentOptions.Right,TextAlignmentOptions.BottomLeft,TextAlignmentOptions.Bottom,TextAlignmentOptions.BottomRight};
        return values[(int)anchor];
    }
    public static string RestoreReferences()
    {
        var links=JsonUtility.FromJson<Links>(File.ReadAllText(RefsPath));int restored=0;
        foreach(var link in links.items)
        {
            GlobalObjectId id,targetId;if(!GlobalObjectId.TryParse(link.owner,out id)||!GlobalObjectId.TryParse(link.target,out targetId))continue;
            var owner=GlobalObjectId.GlobalObjectIdentifierToObjectSlow(id);var target=GlobalObjectId.GlobalObjectIdentifierToObjectSlow(targetId) as GameObject;
            if(owner==null||target==null)throw new InvalidOperationException("Missing migration link "+link.path);
            var serialized=new SerializedObject(owner);var p=serialized.FindProperty(link.path);
            if(p==null)throw new InvalidOperationException("Missing serialized field "+link.path);
            p.objectReferenceValue=target.GetComponent<TMP_Text>();serialized.ApplyModifiedPropertiesWithoutUndo();EditorUtility.SetDirty(owner);restored++;
        }
        EditorSceneManager.MarkSceneDirty(SceneManager.GetActiveScene());EditorSceneManager.SaveScene(SceneManager.GetActiveScene());return restored+" TMP references restored";
    }
}
#endif
