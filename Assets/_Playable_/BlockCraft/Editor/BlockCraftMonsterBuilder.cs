using System;
using System.IO;
using UnityEditor;
using UnityEditor.Animations;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;
using Object = UnityEngine.Object;

public static class BlockCraftMonsterBuilder
{
    private const string Folder = "Assets/_Playable_/BlockCraft/";
    private const string Art = Folder + "Art/monster_parts/";
    private const float Duration = 2.4f;

    [Serializable] private class Part
    {
        public string name;
        public string file;
        public int[] size;
        public int[] pivot_canvas;
        public int[] pivot_local;
    }
    [Serializable] private class Manifest { public Part[] parts; }

    [MenuItem("Tools/Block Craft/Install Monster Idle")]
    public static void Install()
    {
        var scene = UnityEngine.SceneManagement.SceneManager.GetActiveScene();
        if (EditorApplication.isPlaying || scene.path != "Assets/_Playable_/Scenes/Gameplay.unity")
            throw new InvalidOperationException("Open Gameplay in Edit Mode.");
        var existing = GameObject.Find("Monster");
        if (existing != null && existing.GetComponent<Animator>() != null)
        {
            Selection.activeGameObject = existing;
            return;
        }
        var previous = GameObject.Find("Green Character");
        if (previous == null) throw new InvalidOperationException("Expected the original Green Character in Gameplay.");
        var manifest = JsonUtility.FromJson<Manifest>(File.ReadAllText(Art + "pivots.json"));
        foreach (Part part in manifest.parts)
        {
            var importer = (TextureImporter)AssetImporter.GetAtPath(Art + part.file);
            importer.textureType = TextureImporterType.Sprite;
            importer.spriteImportMode = SpriteImportMode.Single;
            importer.mipmapEnabled = false;
            importer.alphaIsTransparency = true;
            importer.filterMode = FilterMode.Point;
            importer.npotScale = TextureImporterNPOTScale.None;
            importer.maxTextureSize = 256;
            importer.textureCompression = TextureImporterCompression.Compressed;
            importer.SaveAndReimport();
        }

        var root = new GameObject("Monster", typeof(RectTransform), typeof(Animator));
        Undo.RegisterCreatedObjectUndo(root, "Install Monster Idle");
        var oldRect = (RectTransform)previous.transform;
        var rect = (RectTransform)root.transform;
        rect.SetParent(oldRect.parent, false);
        rect.anchorMin = oldRect.anchorMin;
        rect.anchorMax = oldRect.anchorMax;
        rect.pivot = oldRect.pivot;
        rect.anchoredPosition = oldRect.anchoredPosition;
        rect.sizeDelta = oldRect.sizeDelta;
        rect.SetSiblingIndex(oldRect.GetSiblingIndex());
        var rig = new GameObject("Rig", typeof(RectTransform)).GetComponent<RectTransform>();
        rig.SetParent(rect, false);
        rig.anchorMin = rig.anchorMax = rig.pivot = new Vector2(0, 1);
        rig.sizeDelta = new Vector2(192, 396);
        rig.localScale = new Vector3(rect.sizeDelta.x / 192f, rect.sizeDelta.y / 396f, 1);

        // Arms and legs behind the torso keep the cutout joints covered.
        string[] drawOrder = { "leg_screen_left", "leg_screen_right", "arm_screen_left", "arm_screen_right", "torso", "head" };
        foreach (string name in drawOrder)
        {
            Part part = Array.Find(manifest.parts, p => p.name == name);
            var image = new GameObject(name, typeof(RectTransform), typeof(Image)).GetComponent<Image>();
            image.transform.SetParent(rig, false);
            var partRect = image.rectTransform;
            partRect.anchorMin = partRect.anchorMax = new Vector2(0, 1);
            partRect.pivot = new Vector2((float)part.pivot_local[0] / part.size[0],
                1f - (float)part.pivot_local[1] / part.size[1]);
            partRect.sizeDelta = new Vector2(part.size[0], part.size[1]);
            partRect.anchoredPosition = new Vector2(part.pivot_canvas[0], -part.pivot_canvas[1]);
            image.sprite = AssetDatabase.LoadAssetAtPath<Sprite>(Art + part.file);
            image.raycastTarget = false;
        }

        Directory.CreateDirectory(Folder + "Animations");
        Directory.CreateDirectory(Folder + "Prefabs");
        AssetDatabase.Refresh();
        string clipPath = Folder + "Animations/MonsterIdle.anim";
        var clip = AssetDatabase.LoadAssetAtPath<AnimationClip>(clipPath);
        if (clip == null)
        {
            clip = new AnimationClip { name = "MonsterIdle", frameRate = 30 };
            AssetDatabase.CreateAsset(clip, clipPath);
        }
        clip.ClearCurves();
        // The feet stay planted. The torso breathes, the head bobs and both arms sway gently.
        Curve(clip, "torso", "m_LocalScale.y", 1f, 0.012f, true);
        Curve(clip, "head", "m_AnchoredPosition.y", -110f, 1.8f, true);
        Curve(clip, "head", "localEulerAnglesRaw.z", 0f, 1.2f, false);
        Curve(clip, "arm_screen_left", "localEulerAnglesRaw.z", 0f, 2.5f, false);
        Curve(clip, "arm_screen_right", "localEulerAnglesRaw.z", 0f, -2.5f, false);
        Curve(clip, "arm_screen_left", "m_AnchoredPosition.y", -145f, 0.8f, true);
        Curve(clip, "arm_screen_right", "m_AnchoredPosition.y", -145f, 0.8f, true);
        var clipSettings = AnimationUtility.GetAnimationClipSettings(clip);
        clipSettings.loopTime = true;
        clipSettings.loopBlend = true;
        AnimationUtility.SetAnimationClipSettings(clip, clipSettings);
        EditorUtility.SetDirty(clip);

        string controllerPath = Folder + "Animations/MonsterIdle.controller";
        var controller = AssetDatabase.LoadAssetAtPath<AnimatorController>(controllerPath);
        if (controller == null)
        {
            controller = AnimatorController.CreateAnimatorControllerAtPath(controllerPath);
            var state = controller.layers[0].stateMachine.AddState("Idle");
            state.motion = clip;
            controller.layers[0].stateMachine.defaultState = state;
        }
        var animator = root.GetComponent<Animator>();
        animator.runtimeAnimatorController = controller;
        animator.updateMode = AnimatorUpdateMode.UnscaledTime;
        animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;
        animator.applyRootMotion = false;
        PrefabUtility.SaveAsPrefabAssetAndConnect(root, Folder + "Prefabs/Monster.prefab", InteractionMode.AutomatedAction);
        Undo.RecordObject(previous, "Replace static monster");
        previous.SetActive(false);
        AssetDatabase.SaveAssets();
        EditorSceneManager.MarkSceneDirty(scene);
        EditorSceneManager.SaveScene(scene);
        Selection.activeGameObject = root;
        Debug.Log("Monster prefab installed with looping 2.4-second idle.");
    }

    private static void Curve(AnimationClip clip, string part, string property, float origin, float amplitude, bool breathe)
    {
        var curve = new AnimationCurve();
        for (int i = 0; i <= 8; i++)
        {
            float angle = i / 8f * Mathf.PI * 2;
            float value = breathe ? (1 - Mathf.Cos(angle)) * 0.5f : Mathf.Sin(angle);
            float slope = breathe ? Mathf.Sin(angle) * 0.5f : Mathf.Cos(angle);
            slope *= amplitude * Mathf.PI * 2 / Duration;
            curve.AddKey(new Keyframe(i / 8f * Duration, origin + amplitude * value, slope, slope));
        }
        clip.SetCurve("Rig/" + part, typeof(RectTransform), property, curve);
    }
}
