#if UNITY_EDITOR
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEditor.Events;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.Rendering;
using UnityEngine.UI;

// Menu: Tools/Playable/Build Boxing Ring Scene  -> Assets/Scenes/BoxingRing.unity
// Rebuilds everything from Assets/BoxingRing/{Textures,Sprites,Audio}. Tiles come from
// Assets/Outsources/generated-assets/textures/Mineways2Skfb-RGBA.png (18px cells, 16px tiles).
public static class BoxingRingSceneBuilder
{
    const string Root = "Assets/BoxingRing";
    const string ScenePath = "Assets/Scenes/BoxingRing.unity";
    static readonly Color Sky = Hex(0x87CEEB);

    const ShadowCastingMode NoShadowCasting = (ShadowCastingMode)0;

    static Dictionary<string, Material> mats;
    static Dictionary<string, Mesh> meshes;

    [MenuItem("Tools/Playable/Build Boxing Ring Scene", false, 40)]
    public static void Build()
    {
        mats = new Dictionary<string, Material>();
        meshes = new Dictionary<string, Mesh>();
        Directory.CreateDirectory(Root + "/Materials");
        Directory.CreateDirectory(Root + "/Meshes");
        SetupImports();

        var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);

        // ---------- render settings (three.js: ambient .6, directional .8, fog 20..50) ----------
        RenderSettings.skybox = null;
        RenderSettings.ambientMode = AmbientMode.Flat;
        RenderSettings.ambientLight = new Color(0.6f, 0.6f, 0.6f);
        RenderSettings.fog = true;
        RenderSettings.fogMode = FogMode.Linear;
        RenderSettings.fogColor = Sky;
        RenderSettings.fogStartDistance = 22f;
        RenderSettings.fogEndDistance = 58f;

        var camGo = new GameObject("Main Camera");
        camGo.tag = "MainCamera";
        var cam = camGo.AddComponent<Camera>();
        cam.clearFlags = CameraClearFlags.SolidColor;
        cam.backgroundColor = Sky;
        cam.fieldOfView = 45f;
        cam.nearClipPlane = 0.1f;
        cam.farClipPlane = 100f;
        camGo.AddComponent<AudioListener>();
        var orbit = camGo.AddComponent<BoxingRingOrbit>();
        camGo.transform.position = new Vector3(22f, 28f, 30f);
        camGo.transform.LookAt(new Vector3(0f, 2f, 0f));

        var lightGo = new GameObject("Directional Light");
        var light = lightGo.AddComponent<Light>();
        light.type = LightType.Directional;
        light.intensity = 0.8f;
        light.shadows = LightShadows.Soft;
        light.shadowStrength = 0.75f;
        lightGo.transform.rotation = Quaternion.LookRotation(-new Vector3(10f, 20f, 10f).normalized);

        // ---------- environment ----------
        var env = new GameObject("Environment").transform;
        var island = new GameObject("Island").transform; island.SetParent(env, false);
        Material grassTop = TexMat("grass_top"), grassSide = TexMat("grass_side"), dirt = TexMat("dirt");
        Box("GrassLayer", island, new Vector3(0f, -0.5f, 0f), new Vector3(26f, 1f, 18f), grassTop, grassSide, dirt);
        Box("DirtLayer", island, new Vector3(0f, -2.5f, 0f), new Vector3(26f, 3f, 18f), dirt, dirt, dirt);
        var rnd = new System.Random(7);
        for (int i = 0; i < 8; i++)
        {
            Vector3 s = new Vector3(1f + (float)rnd.NextDouble(), 1f + (float)rnd.NextDouble(), 1f + (float)rnd.NextDouble());
            Vector3 p = new Vector3(20f * ((float)rnd.NextDouble() - 0.5f), -4f - 4f * (float)rnd.NextDouble(), 14f * ((float)rnd.NextDouble() - 0.5f));
            Box("Chunk" + i, island, p, s, dirt, dirt, dirt);
        }

        Material logSide = TexMat("oak_log_side"), logTop = TexMat("log_top"), leaves = TexMat("leaves");
        Vector2[] treePos = { new Vector2(-11, -7), new Vector2(11, -7), new Vector2(-10, 6), new Vector2(10, 7), new Vector2(-4, -8) };
        var trees = new List<Transform>();
        for (int i = 0; i < treePos.Length; i++)
        {
            var t = new GameObject("Tree" + i).transform;
            t.SetParent(env, false);
            t.localPosition = new Vector3(treePos[i].x, 0f, treePos[i].y);
            Box("Trunk", t, new Vector3(0f, 1f, 0f), new Vector3(0.8f, 2f, 0.8f), logTop, logSide, logTop);
            Box("Leaves", t, new Vector3(0f, 3f, 0f), new Vector3(2.5f, 2.5f, 2.5f), leaves, leaves, leaves);
            trees.Add(t);
        }

        // ---------- boxing ring (local origin = ring centre on the ground) ----------
        var ring = new GameObject("BoxingRing").transform;
        ring.position = new Vector3(0f, 0f, -1f);

        var ph = GameObject.CreatePrimitive(PrimitiveType.Quad);
        ph.name = "Placeholder";
        Object.DestroyImmediate(ph.GetComponent<Collider>());
        ph.transform.SetParent(ring, false);
        ph.transform.localPosition = new Vector3(0f, 0.01f, 0f);
        ph.transform.localEulerAngles = new Vector3(90f, 0f, 0f);
        ph.transform.localScale = new Vector3(9f, 9f, 1f);
        ph.GetComponent<MeshRenderer>().sharedMaterial = PlaceholderMat();
        ph.GetComponent<MeshRenderer>().shadowCastingMode = NoShadowCasting;

        Material oak = TexMat("oak_planks"), spruce = TexMat("spruce_planks");
        Material post = TexMat("log_dark_side"), wool = TexMat("white_wool", new Color(0.88f, 0.88f, 0.9f));

        // Part 1: floor — 9x9 platform, spruce frame + oak plank deck, front step
        var floor = new GameObject("Part1_Floor").transform; floor.SetParent(ring, false);
        Box("FrameFront", floor, new Vector3(0f, 0.5f, 4f), new Vector3(9f, 1f, 1f), spruce, spruce, spruce);
        Box("FrameBack", floor, new Vector3(0f, 0.5f, -4f), new Vector3(9f, 1f, 1f), spruce, spruce, spruce);
        Box("FrameLeft", floor, new Vector3(-4f, 0.5f, 0f), new Vector3(1f, 1f, 7f), spruce, spruce, spruce);
        Box("FrameRight", floor, new Vector3(4f, 0.5f, 0f), new Vector3(1f, 1f, 7f), spruce, spruce, spruce);
        Box("Deck", floor, new Vector3(0f, 0.5f, 0f), new Vector3(7f, 1f, 7f), oak, spruce, spruce);
        Box("Step", floor, new Vector3(-1.5f, 0.25f, 5f), new Vector3(2f, 0.5f, 1f), spruce, spruce, spruce);

        // Part 2: four corner posts (dark log), 3 blocks tall
        var posts = new GameObject("Part2_Posts").transform; posts.SetParent(ring, false);
        int n = 0;
        for (int sx = -1; sx <= 1; sx += 2)
            for (int sz = -1; sz <= 1; sz += 2)
                Box("Post" + (n++), posts, new Vector3(4f * sx, 2.5f, 4f * sz), new Vector3(1f, 3f, 1f), logTop, post, logTop);

        // Part 3: ropes, 3 levels on all four sides
        var ropes = new GameObject("Part3_Ropes").transform; ropes.SetParent(ring, false);
        float[] levels = { 1.8f, 2.65f, 3.5f };
        const float th = 0.18f, len = 7f;
        for (int l = 0; l < levels.Length; l++)
        {
            float y = levels[l];
            Box("RopeF" + l, ropes, new Vector3(0f, y, 4f), new Vector3(len, th, th), wool, wool, wool);
            Box("RopeB" + l, ropes, new Vector3(0f, y, -4f), new Vector3(len, th, th), wool, wool, wool);
            Box("RopeL" + l, ropes, new Vector3(-4f, y, 0f), new Vector3(th, th, len), wool, wool, wool);
            Box("RopeR" + l, ropes, new Vector3(4f, y, 0f), new Vector3(th, th, len), wool, wool, wool);
        }

        // ---------- characters (original blocky critters) ----------
        var crit = new GameObject("Critters").transform;
        var critters = new List<Transform>
        {
            Chick(crit, new Vector3(-8f, 0f, 4f), 45f),
            Frog(crit, new Vector3(-3.5f, 0f, 5.5f), 22.5f),
            Penguin(crit, new Vector3(3.5f, 0f, 5.5f), -22.5f),
            Bear(crit, new Vector3(8f, 0f, 4f), -45f)
        };
        Transform friend = Bunny(crit, new Vector3(0f, 0f, 7f));

        // payoff bushes
        var bushes = new List<Transform>();
        Vector3[] bushPos = { new Vector3(-6f, 0.5f, 2f), new Vector3(6f, 0.5f, 2f), new Vector3(6f, 0.5f, -4.5f) };
        for (int i = 0; i < bushPos.Length; i++)
            bushes.Add(Box("Bush" + i, env, bushPos[i], new Vector3(1.5f, 1.5f, 1.5f), leaves, leaves, leaves).transform);

        // ---------- UI ----------
        var canvasGo = new GameObject("Canvas");
        var canvas = canvasGo.AddComponent<Canvas>();
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;
        var scaler = canvasGo.AddComponent<CanvasScaler>();
        scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
        scaler.referenceResolution = new Vector2(1080f, 1920f);
        scaler.matchWidthOrHeight = 1f; // height: portrait 1:1, landscape shrinks like the CSS vw clamp
        canvasGo.AddComponent<GraphicRaycaster>();
        Font font = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");

        var instr = MakeText("Instruction", canvasGo.transform, font, "TAP TO BUILD A RING!", 58, Color.white);
        var irt = instr.rectTransform;
        irt.anchorMin = irt.anchorMax = new Vector2(0.5f, 1f);
        irt.pivot = new Vector2(0.5f, 1f);
        irt.sizeDelta = new Vector2(1040f, 120f);
        irt.anchoredPosition = new Vector2(0f, -110f);
        var sh = instr.gameObject.AddComponent<Shadow>(); sh.effectColor = new Color(0f, 0f, 0f, 0.5f); sh.effectDistance = new Vector2(0f, -12f);

        var handGo = new GameObject("Hand", typeof(RectTransform), typeof(CanvasGroup), typeof(Image));
        handGo.transform.SetParent(canvasGo.transform, false);
        var himg = handGo.GetComponent<Image>();
        himg.sprite = LoadSprite("hand"); himg.raycastTarget = false; himg.preserveAspect = true;
        var hrt = handGo.GetComponent<RectTransform>();
        hrt.anchorMin = hrt.anchorMax = new Vector2(0.5f, 0.5f);
        hrt.sizeDelta = new Vector2(220f, 220f);
        hrt.anchoredPosition = new Vector2(55f, -165f);

        var ctaGo = new GameObject("CTA", typeof(RectTransform), typeof(CanvasGroup), typeof(Image));
        ctaGo.transform.SetParent(canvasGo.transform, false);
        var crt = ctaGo.GetComponent<RectTransform>();
        crt.anchorMin = crt.anchorMax = new Vector2(0.5f, 0f);
        crt.pivot = new Vector2(0.5f, 0f);
        crt.sizeDelta = new Vector2(780f, 360f);
        crt.anchoredPosition = new Vector2(0f, 288f);
        var box = ctaGo.GetComponent<Image>(); box.sprite = LoadSprite("cta_box"); box.type = Image.Type.Sliced;
        var ctaText = MakeText("CtaText", ctaGo.transform, font, "Your friends are ready to fight!", 50, Hex(0x333333));
        var ctrt = ctaText.rectTransform;
        ctrt.anchorMin = new Vector2(0f, 1f); ctrt.anchorMax = new Vector2(1f, 1f);
        ctrt.pivot = new Vector2(0.5f, 1f);
        ctrt.sizeDelta = new Vector2(-80f, 130f);
        ctrt.anchoredPosition = new Vector2(0f, -30f);

        var btnGo = new GameObject("PlayButton", typeof(RectTransform), typeof(Image), typeof(Button));
        btnGo.transform.SetParent(ctaGo.transform, false);
        var brt = btnGo.GetComponent<RectTransform>();
        brt.anchorMin = brt.anchorMax = new Vector2(0.5f, 0f);
        brt.pivot = new Vector2(0.5f, 0f);
        brt.sizeDelta = new Vector2(430f, 150f);
        brt.anchoredPosition = new Vector2(0f, 50f);
        var bimg = btnGo.GetComponent<Image>(); bimg.sprite = LoadSprite("play_btn"); bimg.type = Image.Type.Sliced;
        var btnText = MakeText("Label", btnGo.transform, font, "PLAY NOW", 64, Color.black);
        var btrt = btnText.rectTransform;
        btrt.anchorMin = Vector2.zero; btrt.anchorMax = Vector2.one;
        btrt.offsetMin = new Vector2(0f, 16f); btrt.offsetMax = Vector2.zero;

        var es = new GameObject("EventSystem");
        es.AddComponent<EventSystem>();
        es.AddComponent<StandaloneInputModule>();

        // ---------- game controller ----------
        var gameGo = new GameObject("Game");
        var game = gameGo.AddComponent<BoxingRingGame>();
        var audio = gameGo.AddComponent<AudioSource>();
        audio.playOnAwake = false;
        game.cam = cam;
        game.ringRoot = ring;
        game.placeholder = ph;
        game.parts = new[] { floor, posts, ropes };
        game.critters = critters.ToArray();
        game.friend = friend;
        game.trees = trees.ToArray();
        game.bushes = bushes.ToArray();
        game.instruction = instr;
        game.hand = hrt;
        game.handGroup = handGo.GetComponent<CanvasGroup>();
        game.cta = crt;
        game.ctaGroup = ctaGo.GetComponent<CanvasGroup>();
        game.playButton = brt;
        game.heartSprite = LoadSprite("heart");
        game.sfx = audio;
        game.tapClips = new[]
        {
            AssetDatabase.LoadAssetAtPath<AudioClip>(Root + "/Audio/tap_0.wav"),
            AssetDatabase.LoadAssetAtPath<AudioClip>(Root + "/Audio/tap_1.wav"),
            AssetDatabase.LoadAssetAtPath<AudioClip>(Root + "/Audio/tap_2.wav")
        };
        UnityEventTools.AddPersistentListener(btnGo.GetComponent<Button>().onClick, game.OnPlayClicked);
        EditorUtility.SetDirty(game);

        EditorSceneManager.SaveScene(scene, ScenePath);
        var list = new List<EditorBuildSettingsScene> { new EditorBuildSettingsScene(ScenePath, true) };
        foreach (var s in EditorBuildSettings.scenes)
            if (s.path != ScenePath) list.Add(new EditorBuildSettingsScene(s.path, false));
        EditorBuildSettings.scenes = list.ToArray();
        AssetDatabase.SaveAssets();
        Debug.Log("[BoxingRing] Scene built: " + ScenePath);
    }

    // ================= imports =================
    static void SetupImports()
    {
        foreach (var f in Directory.GetFiles(Root + "/Textures", "*.png"))
        {
            var ti = (TextureImporter)AssetImporter.GetAtPath(f.Replace("\\", "/"));
            ti.textureType = TextureImporterType.Default;
            ti.filterMode = FilterMode.Point;
            ti.mipmapEnabled = false;
            ti.textureCompression = TextureImporterCompression.Uncompressed;
            bool ph = f.Contains("placeholder");
            ti.wrapMode = ph ? TextureWrapMode.Clamp : TextureWrapMode.Repeat;
            ti.alphaIsTransparency = ph;
            ti.SaveAndReimport();
        }
        foreach (var f in Directory.GetFiles(Root + "/Sprites", "*.png"))
        {
            string p = f.Replace("\\", "/");
            var ti = (TextureImporter)AssetImporter.GetAtPath(p);
            ti.textureType = TextureImporterType.Sprite;
            ti.spriteImportMode = SpriteImportMode.Single;
            ti.mipmapEnabled = false;
            ti.filterMode = FilterMode.Bilinear;
            ti.textureCompression = TextureImporterCompression.Uncompressed;
            ti.alphaIsTransparency = true;
            ti.spritePixelsPerUnit = p.EndsWith("heart.png") ? 64f : 100f;
            if (p.EndsWith("cta_box.png")) ti.spriteBorder = new Vector4(28, 28, 28, 28);
            if (p.EndsWith("play_btn.png")) ti.spriteBorder = new Vector4(20, 22, 20, 20);
            ti.SaveAndReimport();
        }
    }

    static Sprite LoadSprite(string name)
    {
        return AssetDatabase.LoadAssetAtPath<Sprite>(Root + "/Sprites/" + name + ".png");
    }

    // ================= materials =================
    static Material NewLit(string key)
    {
        string path = Root + "/Materials/" + key + ".mat";
        var m = AssetDatabase.LoadAssetAtPath<Material>(path);
        if (m == null)
        {
            m = new Material(Shader.Find("Universal Render Pipeline/Lit"));
            AssetDatabase.CreateAsset(m, path);
        }
        else m.shader = Shader.Find("Universal Render Pipeline/Lit");
        m.SetFloat("_Smoothness", 0f);
        m.SetFloat("_Metallic", 0f);
        m.SetFloat("_SpecularHighlights", 0f);
        m.SetFloat("_EnvironmentReflections", 0f);
        m.EnableKeyword("_SPECULARHIGHLIGHTS_OFF");
        m.EnableKeyword("_ENVIRONMENTREFLECTIONS_OFF");
        return m;
    }

    static Material TexMat(string tex) { return TexMat(tex, Color.white); }

    static Material TexMat(string tex, Color tint)
    {
        string key = "M_" + tex;
        Material m;
        if (mats.TryGetValue(key, out m)) return m;
        m = NewLit(key);
        var t = AssetDatabase.LoadAssetAtPath<Texture2D>(Root + "/Textures/" + tex + ".png");
        m.SetTexture("_BaseMap", t);
        m.mainTexture = t;
        m.SetColor("_BaseColor", tint);
        EditorUtility.SetDirty(m);
        mats[key] = m;
        return m;
    }

    static Material ColMat(int hex)
    {
        string key = "C_" + hex.ToString("X6");
        Material m;
        if (mats.TryGetValue(key, out m)) return m;
        m = NewLit(key);
        m.SetColor("_BaseColor", Hex(hex));
        EditorUtility.SetDirty(m);
        mats[key] = m;
        return m;
    }

    static Material PlaceholderMat()
    {
        string path = Root + "/Materials/M_Placeholder.mat";
        var m = AssetDatabase.LoadAssetAtPath<Material>(path);
        if (m == null) { m = new Material(Shader.Find("Universal Render Pipeline/Unlit")); AssetDatabase.CreateAsset(m, path); }
        var t = AssetDatabase.LoadAssetAtPath<Texture2D>(Root + "/Textures/ring_placeholder.png");
        m.SetTexture("_BaseMap", t);
        m.mainTexture = t;
        m.SetColor("_BaseColor", new Color(1f, 1f, 1f, 0.5f));
        m.SetFloat("_Surface", 1f);
        m.SetFloat("_Blend", 0f);
        m.SetFloat("_SrcBlend", (float)BlendMode.SrcAlpha);
        m.SetFloat("_DstBlend", (float)BlendMode.OneMinusSrcAlpha);
        m.SetFloat("_ZWrite", 0f);
        m.SetOverrideTag("RenderType", "Transparent");
        m.EnableKeyword("_SURFACE_TYPE_TRANSPARENT");
        m.renderQueue = (int)RenderQueue.Transparent;
        EditorUtility.SetDirty(m);
        return m;
    }

    // ================= geometry =================
    // Box mesh with 3 sub-meshes: 0 = top, 1 = sides, 2 = bottom. UVs in world units (1 tile per block).
    static Mesh BoxMesh(Vector3 s)
    {
        string key = string.Format("Box_{0:0.###}x{1:0.###}x{2:0.###}", s.x, s.y, s.z).Replace(',', '.');
        Mesh m;
        if (meshes.TryGetValue(key, out m)) return m;
        string path = Root + "/Meshes/" + key + ".asset";
        m = AssetDatabase.LoadAssetAtPath<Mesh>(path);
        bool isNew = m == null;
        if (isNew) m = new Mesh();
        m.Clear();
        m.name = key;
        float x = s.x * 0.5f, y = s.y * 0.5f, z = s.z * 0.5f;
        var v = new List<Vector3>(); var nrm = new List<Vector3>(); var uv = new List<Vector2>();
        var top = new List<int>(); var side = new List<int>(); var bot = new List<int>();
        // face: origin corner, axis U, axis V, size u, size v
        Face(v, nrm, uv, top, new Vector3(-x, y, -z), Vector3.right, Vector3.forward, s.x, s.z, Vector3.up);
        Face(v, nrm, uv, bot, new Vector3(-x, -y, z), Vector3.right, Vector3.back, s.x, s.z, Vector3.down);
        Face(v, nrm, uv, side, new Vector3(x, -y, z), Vector3.left, Vector3.up, s.x, s.y, Vector3.forward);
        Face(v, nrm, uv, side, new Vector3(-x, -y, -z), Vector3.right, Vector3.up, s.x, s.y, Vector3.back);
        Face(v, nrm, uv, side, new Vector3(x, -y, -z), Vector3.forward, Vector3.up, s.z, s.y, Vector3.right);
        Face(v, nrm, uv, side, new Vector3(-x, -y, z), Vector3.back, Vector3.up, s.z, s.y, Vector3.left);
        m.SetVertices(v); m.SetNormals(nrm); m.SetUVs(0, uv);
        m.subMeshCount = 3;
        m.SetTriangles(top, 0); m.SetTriangles(side, 1); m.SetTriangles(bot, 2);
        m.RecalculateBounds();
        m.RecalculateTangents();
        if (isNew) AssetDatabase.CreateAsset(m, path); else EditorUtility.SetDirty(m);
        meshes[key] = m;
        return m;
    }

    static void Face(List<Vector3> v, List<Vector3> n, List<Vector2> uv, List<int> tris, Vector3 o, Vector3 du, Vector3 dv, float su, float sv, Vector3 normal)
    {
        int b = v.Count;
        v.Add(o); v.Add(o + du * su); v.Add(o + du * su + dv * sv); v.Add(o + dv * sv);
        for (int i = 0; i < 4; i++) n.Add(normal);
        // anchor the texture at the top edge so a 1-tall grass layer shows its grass strip
        float v0 = Mathf.Ceil(sv - 0.0001f) - sv;
        uv.Add(new Vector2(0f, v0)); uv.Add(new Vector2(su, v0)); uv.Add(new Vector2(su, v0 + sv)); uv.Add(new Vector2(0f, v0 + sv));
        Vector3 c = Vector3.Cross(du, dv);
        // Unity is left-handed: if du x dv points along the normal, (b, b+1, b+2) is clockwise seen from outside = front face
        if (Vector3.Dot(c, normal) > 0f) { tris.Add(b); tris.Add(b + 1); tris.Add(b + 2); tris.Add(b); tris.Add(b + 2); tris.Add(b + 3); }
        else { tris.Add(b); tris.Add(b + 2); tris.Add(b + 1); tris.Add(b); tris.Add(b + 3); tris.Add(b + 2); }
    }

    static GameObject Box(string name, Transform parent, Vector3 center, Vector3 size, Material top, Material side, Material bottom)
    {
        var go = new GameObject(name);
        go.transform.SetParent(parent, false);
        go.transform.localPosition = center;
        go.AddComponent<MeshFilter>().sharedMesh = BoxMesh(size);
        var r = go.AddComponent<MeshRenderer>();
        r.sharedMaterials = new[] { top, side, bottom };
        return go;
    }

    static GameObject CBox(string name, Transform parent, Vector3 center, Vector3 size, int hex, bool shadow = true)
    {
        var m = ColMat(hex);
        var go = Box(name, parent, center, size, m, m, m);
        if (!shadow) go.GetComponent<MeshRenderer>().shadowCastingMode = NoShadowCasting;
        return go;
    }

    static Transform Critter(Transform parent, string name, Vector3 pos, float rotY, float headY, out Transform head)
    {
        var t = new GameObject(name).transform;
        t.SetParent(parent, false);
        t.localPosition = pos;
        t.localEulerAngles = new Vector3(0f, rotY, 0f);
        t.localScale = Vector3.one * 0.6f;
        head = new GameObject("head").transform;
        head.SetParent(t, false);
        head.localPosition = new Vector3(0f, headY, 0f);
        return t;
    }

    static Transform Chick(Transform parent, Vector3 pos, float rotY)
    {
        Transform h; var t = Critter(parent, "Chick", pos, rotY, 2.2f, out h);
        const int Y = 0xFFD54F, O = 0xFF8F00, K = 0x222222;
        CBox("Body", t, new Vector3(0, 0.8f, 0), new Vector3(1.6f, 1.5f, 1.6f), Y);
        CBox("WingL", t, new Vector3(-0.9f, 0.9f, 0), new Vector3(0.2f, 0.8f, 1f), 0xFFC107);
        CBox("WingR", t, new Vector3(0.9f, 0.9f, 0), new Vector3(0.2f, 0.8f, 1f), 0xFFC107);
        CBox("FootL", t, new Vector3(-0.4f, 0.04f, 0.3f), new Vector3(0.4f, 0.08f, 0.5f), O, false);
        CBox("FootR", t, new Vector3(0.4f, 0.04f, 0.3f), new Vector3(0.4f, 0.08f, 0.5f), O, false);
        CBox("Head", h, Vector3.zero, new Vector3(1.4f, 1.4f, 1.4f), Y);
        CBox("EyeL", h, new Vector3(-0.35f, 0.15f, 0.72f), new Vector3(0.2f, 0.3f, 0.05f), K, false);
        CBox("EyeR", h, new Vector3(0.35f, 0.15f, 0.72f), new Vector3(0.2f, 0.3f, 0.05f), K, false);
        CBox("Beak", h, new Vector3(0, -0.15f, 0.85f), new Vector3(0.5f, 0.25f, 0.4f), O);
        CBox("Tuft", h, new Vector3(0, 0.85f, 0), new Vector3(0.2f, 0.4f, 0.2f), 0xFFB300);
        return t;
    }

    static Transform Frog(Transform parent, Vector3 pos, float rotY)
    {
        Transform h; var t = Critter(parent, "Frog", pos, rotY, 1.5f, out h);
        const int G = 0x66BB6A, D = 0x388E3C, W = 0xFFFFFF, K = 0x222222;
        CBox("Body", t, new Vector3(0, 0.55f, 0), new Vector3(2f, 1.1f, 1.8f), G);
        CBox("LegL", t, new Vector3(-1.1f, 0.2f, 0.4f), new Vector3(0.5f, 0.4f, 0.6f), D);
        CBox("LegR", t, new Vector3(1.1f, 0.2f, 0.4f), new Vector3(0.5f, 0.4f, 0.6f), D);
        CBox("Head", h, Vector3.zero, new Vector3(1.9f, 0.9f, 1.6f), G);
        CBox("EyeL", h, new Vector3(-0.55f, 0.6f, 0.4f), new Vector3(0.5f, 0.5f, 0.5f), W);
        CBox("EyeR", h, new Vector3(0.55f, 0.6f, 0.4f), new Vector3(0.5f, 0.5f, 0.5f), W);
        CBox("PupilL", h, new Vector3(-0.55f, 0.62f, 0.67f), new Vector3(0.25f, 0.25f, 0.05f), K, false);
        CBox("PupilR", h, new Vector3(0.55f, 0.62f, 0.67f), new Vector3(0.25f, 0.25f, 0.05f), K, false);
        CBox("Mouth", h, new Vector3(0, -0.15f, 0.81f), new Vector3(1f, 0.08f, 0.05f), 0x8E2430, false);
        return t;
    }

    static Transform Penguin(Transform parent, Vector3 pos, float rotY)
    {
        Transform h; var t = Critter(parent, "Penguin", pos, rotY, 2.5f, out h);
        const int N = 0x263238, W = 0xF5F5F5, O = 0xFF9800, K = 0x111111;
        CBox("Body", t, new Vector3(0, 0.9f, 0), new Vector3(1.5f, 1.8f, 1.3f), N);
        CBox("Belly", t, new Vector3(0, 0.85f, 0.66f), new Vector3(1.1f, 1.4f, 0.1f), W, false);
        CBox("FlipL", t, new Vector3(-0.85f, 1f, 0), new Vector3(0.2f, 1f, 0.6f), N);
        CBox("FlipR", t, new Vector3(0.85f, 1f, 0), new Vector3(0.2f, 1f, 0.6f), N);
        CBox("FootL", t, new Vector3(-0.35f, 0.04f, 0.35f), new Vector3(0.45f, 0.08f, 0.5f), O, false);
        CBox("FootR", t, new Vector3(0.35f, 0.04f, 0.35f), new Vector3(0.45f, 0.08f, 0.5f), O, false);
        CBox("Head", h, Vector3.zero, new Vector3(1.5f, 1.3f, 1.4f), N);
        CBox("Face", h, new Vector3(0, -0.05f, 0.71f), new Vector3(1.1f, 0.8f, 0.1f), W, false);
        CBox("EyeL", h, new Vector3(-0.3f, 0.1f, 0.77f), new Vector3(0.18f, 0.25f, 0.05f), K, false);
        CBox("EyeR", h, new Vector3(0.3f, 0.1f, 0.77f), new Vector3(0.18f, 0.25f, 0.05f), K, false);
        CBox("Beak", h, new Vector3(0, -0.2f, 0.9f), new Vector3(0.35f, 0.2f, 0.4f), O);
        return t;
    }

    static Transform Bear(Transform parent, Vector3 pos, float rotY)
    {
        Transform h; var t = Critter(parent, "Bear", pos, rotY, 2.4f, out h);
        const int B = 0x8D6E63, L = 0xD7CCC8, K = 0x222222;
        CBox("Body", t, new Vector3(0, 0.8f, 0), new Vector3(1.6f, 1.6f, 1.4f), B);
        CBox("Belly", t, new Vector3(0, 0.8f, 0.72f), new Vector3(1f, 1f, 0.1f), L, false);
        CBox("Head", h, Vector3.zero, new Vector3(1.8f, 1.6f, 1.6f), B);
        CBox("EarL", h, new Vector3(-0.7f, 0.95f, 0), new Vector3(0.5f, 0.5f, 0.3f), B);
        CBox("EarR", h, new Vector3(0.7f, 0.95f, 0), new Vector3(0.5f, 0.5f, 0.3f), B);
        CBox("Muzzle", h, new Vector3(0, -0.3f, 0.88f), new Vector3(0.8f, 0.5f, 0.2f), L);
        CBox("Nose", h, new Vector3(0, -0.15f, 0.99f), new Vector3(0.3f, 0.2f, 0.05f), K, false);
        CBox("EyeL", h, new Vector3(-0.45f, 0.2f, 0.82f), new Vector3(0.2f, 0.25f, 0.05f), K, false);
        CBox("EyeR", h, new Vector3(0.45f, 0.2f, 0.82f), new Vector3(0.2f, 0.25f, 0.05f), K, false);
        return t;
    }

    static Transform Bunny(Transform parent, Vector3 pos)
    {
        Transform h; var t = Critter(parent, "FriendBunny", pos, 0f, 1.9f, out h);
        const int P = 0xFFB7C5, W = 0xFFFFFF, K = 0x5B3A8C;
        CBox("Body", t, new Vector3(0, 0.6f, 0), new Vector3(1f, 1.2f, 1f), P);
        CBox("Head", h, Vector3.zero, new Vector3(1.6f, 1.4f, 1.6f), P);
        CBox("EyeL", h, new Vector3(-0.4f, 0.1f, 0.82f), new Vector3(0.3f, 0.4f, 0.05f), K, false);
        CBox("EyeR", h, new Vector3(0.4f, 0.1f, 0.82f), new Vector3(0.3f, 0.4f, 0.05f), K, false);
        var earL = CBox("EarL", h, new Vector3(-0.4f, 1.2f, 0), new Vector3(0.35f, 1.1f, 0.3f), P);
        earL.transform.localEulerAngles = new Vector3(0, 0, 10f);
        var earR = CBox("EarR", h, new Vector3(0.4f, 1.2f, 0), new Vector3(0.35f, 1.1f, 0.3f), P);
        earR.transform.localEulerAngles = new Vector3(0, 0, -10f);
        var tail = new GameObject("tail").transform;
        tail.SetParent(t, false);
        tail.localPosition = new Vector3(0, 0.5f, -0.6f);
        tail.localEulerAngles = new Vector3(0, -45f, 0);
        CBox("Puff", tail, new Vector3(0, 0, -0.2f), new Vector3(0.5f, 0.5f, 0.5f), W);
        t.localScale = Vector3.one * 0.5f;
        return t;
    }

    static Text MakeText(string name, Transform parent, Font font, string text, int size, Color color)
    {
        var go = new GameObject(name, typeof(RectTransform), typeof(Text));
        go.transform.SetParent(parent, false);
        var t = go.GetComponent<Text>();
        t.font = font;
        t.text = text;
        t.fontSize = size;
        t.fontStyle = FontStyle.Bold;
        t.color = color;
        t.alignment = TextAnchor.MiddleCenter;
        t.horizontalOverflow = HorizontalWrapMode.Wrap;
        t.verticalOverflow = VerticalWrapMode.Overflow;
        t.raycastTarget = false;
        return t;
    }

    static Color Hex(int h)
    {
        return new Color(((h >> 16) & 255) / 255f, ((h >> 8) & 255) / 255f, (h & 255) / 255f, 1f);
    }
}
#endif
