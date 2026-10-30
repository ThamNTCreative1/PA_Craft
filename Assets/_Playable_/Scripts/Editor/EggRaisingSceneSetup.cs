using System;
using System.IO;
using System.Linq;
using System.Reflection;
using Playable;
using TMPro;
using UnityEditor;
using UnityEditor.Animations;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;
using Object = UnityEngine.Object;

public static class EggRaisingSceneSetup
{
    const string Output = "Assets/_Playable_/EggRaising";
    const string Art = "Assets/_Playable_/2D Texture/";
    const BindingFlags Fields = BindingFlags.Instance | BindingFlags.NonPublic;
    static T Get<T>(object target, string field) => (T)target.GetType().GetField(field, Fields).GetValue(target);
    static void Set(Object target, string field, object value)
    {
        target.GetType().GetField(field, Fields).SetValue(target, value);
        EditorUtility.SetDirty(target);
    }
    static T Asset<T>(string path) where T : Object
    {
        var value = AssetDatabase.LoadAssetAtPath<T>(path);
        if (value == null) throw new Exception("Missing asset: " + path);
        return value;
    }

    static Sprite Sprite(string path)
    {
        var importer = (TextureImporter)AssetImporter.GetAtPath(path);
        importer.textureType = TextureImporterType.Sprite;
        importer.spriteImportMode = SpriteImportMode.Single;
        importer.mipmapEnabled = false;
        importer.alphaIsTransparency = true;
        importer.maxTextureSize = 2048;
        importer.SaveAndReimport();
        return Asset<Sprite>(path);
    }

    static RectTransform Rect(string name, Transform parent)
    {
        var rect = new GameObject(name, typeof(RectTransform)).GetComponent<RectTransform>();
        rect.SetParent(parent, false);
        rect.anchorMin = rect.anchorMax = new Vector2(.5f, .5f);
        return rect;
    }
    static void Stretch(RectTransform rect)
    {
        rect.anchorMin = Vector2.zero; rect.anchorMax = Vector2.one;
        rect.offsetMin = rect.offsetMax = Vector2.zero;
    }
    static Image Image(string name, Transform parent, Sprite sprite, bool stretch = false)
    {
        var rect = Rect(name, parent);
        if (stretch) Stretch(rect);
        var image = rect.gameObject.AddComponent<Image>();
        image.sprite = sprite; image.preserveAspect = !stretch; image.raycastTarget = false;
        return image;
    }

    static AnimationClip Clip(string path, string name)
    {
        return AssetDatabase.LoadAllAssetsAtPath(path).OfType<AnimationClip>()
            .First(x => x.name.Equals(name, StringComparison.OrdinalIgnoreCase));
    }

    static AnimationClip Loop(AnimationClip source, string name)
    {
        string path = Output + "/" + name + ".anim";
        var clip = Object.Instantiate(source); clip.name = name;
        AnimationUtility.SetAnimationEvents(clip, new AnimationEvent[0]);
        var settings = AnimationUtility.GetAnimationClipSettings(clip);
        settings.loopTime = true; settings.loopBlend = true;
        AnimationUtility.SetAnimationClipSettings(clip, settings);
        AssetDatabase.CreateAsset(clip, path);
        return clip;
    }

    static AnimationClip KongIdle(AnimationClip run)
    {
        var clip = new AnimationClip { name = "TitanTemple_Idle", frameRate = 30 };
        foreach (var binding in AnimationUtility.GetCurveBindings(run))
        {
            var curve = AnimationUtility.GetEditorCurve(run, binding);
            float value = curve.Evaluate(.2f);
            AnimationUtility.SetEditorCurve(clip, binding, AnimationCurve.Constant(0, 2f, value));
        }
        var settings = AnimationUtility.GetAnimationClipSettings(clip);
        settings.loopTime = true; AnimationUtility.SetAnimationClipSettings(clip, settings);
        clip.SetCurve("Armature/mixamorig:Hips/mixamorig:Spine/mixamorig:Spine1", typeof(Transform), "m_LocalScale.y",
            new AnimationCurve(new Keyframe(0, 1), new Keyframe(1, 1.025f), new Keyframe(2, 1)));
        AssetDatabase.CreateAsset(clip, Output + "/TitanTemple_Idle.anim");
        return clip;
    }

    static Bounds Bounds(GameObject root)
    {
        var renderers = root.GetComponentsInChildren<Renderer>(true).Where(x => !(x is ParticleSystemRenderer)).ToArray();
        var bounds = renderers[0].bounds;
        foreach (var renderer in renderers) bounds.Encapsulate(renderer.bounds);
        return bounds;
    }

    static PenWanderer Monster(string name, string sourcePath, string modelPath, AnimationClip idle, AnimationClip walk, float height, bool kong = false)
    {
        var source = Asset<GameObject>(sourcePath);
        Transform visual = string.IsNullOrEmpty(modelPath) ? source.transform : source.transform.Find(modelPath);
        if (visual == null) throw new Exception("Missing visual " + modelPath);
        var root = new GameObject(name);
        var model = Object.Instantiate(visual.gameObject, root.transform);
        model.name = "Visual";
        model.transform.localPosition = Vector3.zero;
        model.transform.localRotation = Quaternion.identity;
        foreach (var t in model.GetComponentsInChildren<Transform>(true)) GameObjectUtility.RemoveMonoBehavioursWithMissingScript(t.gameObject);
        foreach (var behaviour in model.GetComponentsInChildren<MonoBehaviour>(true)) Object.DestroyImmediate(behaviour);
        foreach (var collider in model.GetComponentsInChildren<Collider>(true)) Object.DestroyImmediate(collider);
        foreach (var body in model.GetComponentsInChildren<Rigidbody>(true)) Object.DestroyImmediate(body);
        var animator = model.GetComponent<Animator>();
        if (animator == null) animator = model.AddComponent<Animator>();
        animator.applyRootMotion = false; animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;
        var controller = AnimatorController.CreateAnimatorControllerAtPath(Output + "/" + name + ".controller");
        var machine = controller.layers[0].stateMachine;
        var idleState = machine.AddState("Idle"); idleState.motion = idle;
        var walkState = machine.AddState("Walk"); walkState.motion = walk; walkState.speed = kong ? .5f : 1f;
        controller.AddParameter("IsWalking", AnimatorControllerParameterType.Bool);
        var startWalking = idleState.AddTransition(walkState);
        startWalking.hasExitTime = false; startWalking.hasFixedDuration = true; startWalking.duration = .2f;
        startWalking.AddCondition(AnimatorConditionMode.If, 0, "IsWalking");
        var stopWalking = walkState.AddTransition(idleState);
        stopWalking.hasExitTime = false; stopWalking.hasFixedDuration = true; stopWalking.duration = .2f;
        stopWalking.AddCondition(AnimatorConditionMode.IfNot, 0, "IsWalking");
        machine.defaultState = idleState; animator.runtimeAnimatorController = controller;
        idle.SampleAnimation(model, 0);
        var bounds = Bounds(root);
        model.transform.localScale *= height / Mathf.Max(.001f, bounds.size.y);
        bounds = Bounds(root);
        model.transform.position -= new Vector3(bounds.center.x, bounds.min.y, bounds.center.z);
        var wanderer = root.AddComponent<PenWanderer>(); Set(wanderer, "_animator", animator);
        bounds = Bounds(root);
        Set(wanderer, "_edgePadding", Mathf.Max(3f, new Vector2(bounds.extents.x, bounds.extents.z).magnitude + .5f));
        var prefab = PrefabUtility.SaveAsPrefabAsset(root, Output + "/" + name + ".prefab");
        Object.DestroyImmediate(root);
        return prefab.GetComponent<PenWanderer>();
    }

    static GameObject Egg(string name, string path)
    {
        var root = new GameObject(name);
        var model = Object.Instantiate(Asset<GameObject>(path), root.transform);
        model.name = "Visual"; model.transform.localPosition = Vector3.zero; model.transform.localRotation = Quaternion.identity;
        var bounds = Bounds(root);
        model.transform.localScale *= 1.8f / Mathf.Max(bounds.size.x, bounds.size.y, bounds.size.z);
        bounds = Bounds(root);
        model.transform.position -= new Vector3(bounds.center.x, bounds.min.y, bounds.center.z);
        var prefab = PrefabUtility.SaveAsPrefabAsset(root, Output + "/" + name + ".prefab");
        Object.DestroyImmediate(root); return prefab;
    }

    [MenuItem("Tools/Playable/Build Egg Raising Scene")]
    public static void Build()
    {
        if (EditorApplication.isPlaying) throw new Exception("Exit Play mode before setup.");
        if (Object.FindFirstObjectByType<EggRaisingController>() != null) throw new Exception("Scene already configured.");
        Directory.CreateDirectory(Output); AssetDatabase.Refresh();
        var old = Object.FindFirstObjectByType<GameController>();
        if (old == null) throw new Exception("Gameplay scene required.");
        var player = Get<PlayerController>(old, "_player");
        var hold = Get<Transform>(old, "_eggHoldPoint");
        var nest = Get<Transform>(old, "_home");
        var pen = Get<BoxCollider>(old, "_homeZone");
        var action = Get<Button>(old, "_stealButton");
        var tutorial = Get<HandTutorial>(old, "_handTutorial");
        var line = Get<TutorialLineIndicator>(old, "_tutorialLineIndicator");
        var camera = Get<CameraController>(player, "_cameraController");
        var manager = Object.FindFirstObjectByType<GameManager>();
        // Imported URP materials use the same albedo texture and tint under Built-in Standard.
        foreach (var name in new[] { "sae_Monster", "sae_Diamon", "sae_Light" })
        {
            var material = Asset<Material>("Assets/MiniGames/StealAnEgg/Material/Monsters/" + name + ".mat");
            material.shader = Shader.Find("Standard");
            material.shaderKeywords = new string[0];
            if (name != "sae_Monster") material.EnableKeyword("_EMISSION");
            EditorUtility.SetDirty(material);
        }
        string animal = "Assets/_Playable_/3D Model/Animal/Steal an egg/";
        string yetiModel = "Assets/MiniGames/StealAnEgg/Models/Monsters/Yeti.fbx";
        string kongModel = "Assets/MiniGames/StealAnEgg/Models/ProtectMonster/titan_Temple_Guard.fbx";
        var dragon = Monster("LunarDragon", "Assets/MiniGames/StealAnEgg/Prefabs/Monsters/Cosmic/Eternal Lunar Dragon Variant.prefab", "Model/Eternal Lunar Dragon(Clone)",
            Loop(Clip(animal + "Cosmic/Eternal Lunar Dragon.fbx", "idle"), "Dragon_Idle"), Loop(Clip(animal + "Cosmic/Eternal Lunar Dragon.fbx", "walk"), "Dragon_Walk"), 3.4f);
        var yeti = Monster("Yeti", "Assets/MiniGames/StealAnEgg/Prefabs/Monsters/Yeti Variant.prefab", "Model/Yeti(Clone)",
            Loop(Clip(yetiModel, "Idle"), "Yeti_Idle"), Loop(Clip(yetiModel, "Walk"), "Yeti_Walk"), 3.2f);
        var tiger = Monster("OniTiger", animal + "CherryBlossom/oni tiger.fbx", "",
            Loop(Clip(animal + "CherryBlossom/oni tiger.fbx", "idle"), "Tiger_Idle"), Loop(Clip(animal + "CherryBlossom/oni tiger.fbx", "walk"), "Tiger_Walk"), 2.6f);
        var kongRun = Loop(Clip(kongModel, "run"), "TitanTemple_Walk");
        var kong = Monster("TitanTempleKingkong", "Assets/MiniGames/StealAnEgg/Prefabs/ProtectMonster/ProtectEggMonster_Titan_Temple_Kingkong Variant.prefab", "Model/titan_Temple_Guard",
            KongIdle(kongRun), kongRun, 3.8f, true);
        var verity = Monster("Verity", "Assets/Game/Models/NewMob/Verity/Verity.prefab", "Verity",
            Loop(Asset<AnimationClip>("Assets/Game/Models/NewMob/Verity/idle.anim"), "Verity_Idle"), Loop(Asset<AnimationClip>("Assets/Game/Models/NewMob/Verity/walk.anim"), "Verity_Walk"), 3.3f);
        string eggs = "Assets/_Playable_/3D Model/Monster/Steal an eggg/";
        var eggPrefabs = new[] { Egg("YetiEgg", eggs + "yeti_obj/block_wing.obj"), Egg("OniTigerEgg", eggs + "onitiget_obj/armored_egg.obj"),
            Egg("KingkongEgg", eggs + "kingkong_obj/winged_vine_egg.obj"), Egg("VerityEgg", eggs + "verity_obj/grin_egg.obj") };

        var game = old.gameObject.AddComponent<EggRaisingController>();
        Set(game, "_player", player); Set(game, "_holdPoint", hold); Set(game, "_nest", nest); Set(game, "_pen", pen);
        Set(game, "_action", action); Set(game, "_label", action.GetComponentInChildren<TMP_Text>(true));
        Set(game, "_tutorial", tutorial); Set(game, "_line", line); Set(game, "_cameraInput", camera);
        Set(game, "_eggs", eggPrefabs); Set(game, "_hatchlings", new[] { yeti, tiger, kong, verity });
        // Keep one enlarged Home pen, including its existing gate and colliders.
        pen.transform.position = new Vector3(8, 2, 1360);
        var centralPen = pen.transform.parent;
        foreach (var sibling in centralPen.parent.Cast<Transform>().Where(t => t != centralPen).ToArray())
            Object.DestroyImmediate(sibling.gameObject);
        centralPen.localScale = new Vector3(2.5f, 1f, 2.5f);
        pen.center = Vector3.zero;
        Vector3 penScale = pen.transform.lossyScale;
        pen.size = new Vector3(50f / penScale.x, 8f / penScale.y, 50f / penScale.z);
        nest.position = new Vector3(8, .1f, 1380);
        player.transform.SetPositionAndRotation(new Vector3(8, 1.2f, 1394), Quaternion.Euler(0, 180, 0));
        var playerSettings = new SerializedObject(player);
        playerSettings.FindProperty("_groundMask").intValue |= 1 << 6;
        playerSettings.ApplyModifiedProperties();
        Set(camera, "_initialYaw", 0f);
        var residents = new[] { (PenWanderer)Object.Instantiate(dragon), (PenWanderer)Object.Instantiate(tiger) };
        residents[0].name = "Pen Lunar Dragon"; residents[0].transform.position = new Vector3(3, .1f, 1358);
        residents[1].name = "Pen Oni Tiger"; residents[1].transform.position = new Vector3(13, .1f, 1358);
        Set(game, "_residents", residents);

        var canvas = action.GetComponentInParent<Canvas>().transform;
        var selection = Rect("Select Egg", canvas); Stretch(selection);
        var background = selection.gameObject.AddComponent<Image>(); background.sprite = Sprite(Art + "EggCards_UI/screen/screen_background.png");
        var title = Image("Choose Your Egg", selection, Sprite(Art + "EggCards_UI/screen/title_banner.png"));
        var cards = new Button[4]; string[] names = { "yeti", "oni_tiger", "kingkong", "verity" };
        for (int i = 0; i < cards.Length; i++)
        {
            var card = Image(names[i], selection, Sprite(Art + "EggCards_UI/cards/card_" + names[i] + "_full.png"));
            card.raycastTarget = true; cards[i] = card.gameObject.AddComponent<Button>(); cards[i].targetGraphic = card;
        }
        var selectPanel = selection.gameObject.AddComponent<EggSelectionPanel>();
        Set(selectPanel, "_game", game); Set(selectPanel, "_title", title.rectTransform); Set(selectPanel, "_cards", cards);
        var selectionHand = Image("Selection Hand", selection, Get<RectTransform>(tutorial, "_stealHand").GetComponent<Image>().sprite);
        Set(selectPanel, "_hand", selectionHand.rectTransform);
        Set(game, "_selection", selection.gameObject);
        action.name = "Hatch Open Button"; action.onClick = new Button.ButtonClickedEvent();
        action.GetComponentInChildren<TMP_Text>(true).text = "HATCH";
        var colors = action.colors; colors.disabledColor = new Color(.35f, .35f, .35f, .65f); action.colors = colors;
        action.transition = Selectable.Transition.ColorTint;
        var outlineRect = Rect("Incubation Clockwise Outline", action.transform); Stretch(outlineRect);
        outlineRect.offsetMin = new Vector2(-6, -6); outlineRect.offsetMax = new Vector2(6, 6);
        var outline = outlineRect.gameObject.AddComponent<HatchCountdownOutline>();
        outline.color = new Color(1, .84f, .15f, 1); outline.raycastTarget = false; Set(game, "_countdown", outline);
        var originalFail = Get<FailPanel>(manager, "_failPanel");
        var cta = Object.Instantiate(originalFail, canvas); cta.name = "Egg CTA";
        Set(cta, "_installOnClick", true);
        var ctaTitle = cta.transform.Find("Title").GetComponent<Image>(); ctaTitle.sprite = Sprite(Art + "text.png"); ctaTitle.preserveAspect = true;
        var ctaButton = Get<Button>(cta, "_retryButton"); ctaButton.image.sprite = Sprite(Art + "button.png"); ctaButton.image.preserveAspect = true;
        ctaButton.onClick = new Button.ButtonClickedEvent();
        var layout = cta.gameObject.AddComponent<EggCtaLayout>();
        Set(layout, "_title", ctaTitle.rectTransform); Set(layout, "_button", (RectTransform)ctaButton.transform);
        Set(game, "_cta", cta); cta.gameObject.SetActive(false);
        string[] soundFields = { "_selectSound", "_placeSound", "_tickSound", "_readySound", "_hatchSound", "_ctaSound" };
        string[] sounds = { "Assets/SoundFX/sfx_click.wav", "Assets/SoundFX/plant a tree.mp3", "Assets/SoundFX/sfx_click.wav",
            "Assets/Epic Toon FX/Sound/etfx_explosion_sparkle2.wav", "Assets/Epic Toon FX/Sound/etfx_explosion_magic.wav", "Assets/_Playable_/Sound/yeah-kids.mp3" };
        for (int i = 0; i < sounds.Length; i++) Set(game, soundFields[i], Asset<AudioClip>(sounds[i]));
        Set(manager, "_eggRaisingMode", true);
        Get<WinPanel>(manager, "_winPanel").gameObject.SetActive(false);
        originalFail.gameObject.SetActive(false);
        Set(manager, "_gameController", null);
        Get<GameObject>(old, "_title").SetActive(false);
        Get<GameObject>(old, "_runUI").SetActive(false);
        Object.DestroyImmediate(Get<Monster>(old, "_monster").gameObject);
        var oldEgg = Get<Egg>(old, "_egg");
        Object.DestroyImmediate(oldEgg.transform.root.gameObject);
        var reward = Get<HomeRewardPopup>(manager, "_homeRewardPopup");
        if (reward != null) { reward.Hide(); reward.enabled = false; }
        Object.DestroyImmediate(old);
        action.gameObject.SetActive(false); tutorial.HideAll(); line.StopDraw();
        Canvas.ForceUpdateCanvases(); selectPanel.Layout();
        AssetDatabase.SaveAssets(); EditorSceneManager.MarkSceneDirty(player.gameObject.scene);
        EditorSceneManager.SaveScene(player.gameObject.scene);
        Debug.Log("Egg raising scene configured: 4 eggs, 2 residents, 3s incubation and 3s reveal.");
    }
}
