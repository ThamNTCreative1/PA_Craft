using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Playable;
using TMPro;
using UnityEditor;
using UnityEditor.Animations;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.UI;
using Object = UnityEngine.Object;

/// <summary>Editor-only assembly from the supplied map, eggs and creatures.</summary>
public static class StealHatchSceneSetup
{
    public const string Output = "Assets/_Playable_/StealHatch";
    const string Animal = "Assets/_Playable_/3D Model/Animal/Steal an egg/";
    const BindingFlags Fields = BindingFlags.Instance | BindingFlags.NonPublic;
    static readonly Dictionary<Material, Material> Materials = new Dictionary<Material, Material>();
    static T Asset<T>(string path) where T : Object
    {
        var value = AssetDatabase.LoadAssetAtPath<T>(path);
        if (value == null) throw new Exception("Missing supplied asset: " + path);
        return value;
    }
    static T Get<T>(object target, string field) => (T)target.GetType().GetField(field, Fields).GetValue(target);
    static void Set(Object target, string field, object value)
    {
        var info = target.GetType().GetField(field, Fields);
        if (info == null) throw new Exception("Missing field " + target.GetType().Name + "." + field);
        info.SetValue(target, value);
        EditorUtility.SetDirty(target);
    }
    static T Save<T>(T asset, string path) where T : Object
    {
        var existing = AssetDatabase.LoadAssetAtPath<T>(path);
        if (existing != null) { EditorUtility.CopySerialized(asset, existing); Object.DestroyImmediate(asset); return existing; }
        AssetDatabase.CreateAsset(asset, path);
        return asset;
    }
    static Bounds VisualBounds(GameObject root)
    {
        var renderers = root.GetComponentsInChildren<Renderer>(true).Where(r => !(r is ParticleSystemRenderer)).ToArray();
        if (renderers.Length == 0) throw new Exception("No renderers: " + root.name);
        var bounds = renderers[0].bounds;
        foreach (var renderer in renderers) bounds.Encapsulate(renderer.bounds);
        return bounds;
    }
    static Material CompatibleMaterial(Material original)
    {
        if (Materials.TryGetValue(original, out var found)) return found;
        var mat = new Material(original) { name = original.name };
        var color = original.HasProperty("_Color") ? original.GetColor("_Color") : Color.white;
        var texture = original.HasProperty("_MainTex") ? original.GetTexture("_MainTex") : null;
        mat.shader = Shader.Find("Playable/Egg Unlit");
        mat.shaderKeywords = new string[0];
        mat.SetColor("_Color", color);
        mat.SetTexture("_MainTex", texture);
        string source = AssetDatabase.GetAssetPath(original);
        string suffix = AssetDatabase.AssetPathToGUID(source).Substring(0, 8);
        string safe = string.Concat(original.name.Select(c => Path.GetInvalidFileNameChars().Contains(c) ? '_' : c));
        mat.name = suffix + "_" + safe;
        mat = Save(mat, Output + "/Materials/" + suffix + "_" + safe + ".mat");
        Materials.Add(original, mat);
        return mat;
    }
    static AnimationClip LoopClip(string modelPath, string clipName, string outputName)
    {
        var source = AssetDatabase.LoadAllAssetsAtPath(modelPath).OfType<AnimationClip>()
            .First(c => c.name.Equals(clipName, StringComparison.OrdinalIgnoreCase));
        var clip = Object.Instantiate(source);
        clip.name = outputName;
        AnimationUtility.SetAnimationEvents(clip, new AnimationEvent[0]);
        var settings = AnimationUtility.GetAnimationClipSettings(clip);
        settings.loopTime = true; settings.loopBlend = true;
        AnimationUtility.SetAnimationClipSettings(clip, settings);
        return Save(clip, Output + "/" + outputName + ".anim");
    }
    static AnimatorController Controller(string name, AnimationClip idle, AnimationClip walk, bool guard)
    {
        string path = Output + "/" + name + ".controller";
        var old = AssetDatabase.LoadAssetAtPath<AnimatorController>(path);
        if (old != null) return old;
        var controller = AnimatorController.CreateAnimatorControllerAtPath(path);
        var machine = controller.layers[0].stateMachine;
        var idleState = machine.AddState("Idle"); idleState.motion = idle;
        var walkState = machine.AddState("Walk"); walkState.motion = walk;
        controller.AddParameter(guard ? "IsWalk" : "IsWalking", AnimatorControllerParameterType.Bool);
        var transition = idleState.AddTransition(walkState);
        transition.hasExitTime = false; transition.duration = .15f;
        transition.AddCondition(AnimatorConditionMode.If, 0, guard ? "IsWalk" : "IsWalking");
        transition = walkState.AddTransition(idleState);
        transition.hasExitTime = false; transition.duration = .15f;
        transition.AddCondition(AnimatorConditionMode.IfNot, 0, guard ? "IsWalk" : "IsWalking");
        if (guard)
        {
            controller.AddParameter("IsRun", AnimatorControllerParameterType.Bool);
            var run = machine.AddState("Run"); run.motion = walk; run.speed = 2.2f;
            var runTransition = machine.AddAnyStateTransition(run);
            runTransition.canTransitionToSelf = false; runTransition.hasExitTime = false; runTransition.duration = .15f;
            runTransition.AddCondition(AnimatorConditionMode.If, 0, "IsRun");
            var end = run.AddTransition(idleState);
            end.hasExitTime = false; end.duration = .15f; end.AddCondition(AnimatorConditionMode.IfNot, 0, "IsRun");
        }
        machine.defaultState = idleState;
        return controller;
    }
    static GameObject Creature(string name, string path, float height, bool guard)
    {
        var root = new GameObject(name);
        var model = Object.Instantiate(Asset<GameObject>(path), root.transform);
        model.name = "Visual";
        model.transform.localPosition = Vector3.zero; model.transform.localRotation = Quaternion.identity;
        foreach (var r in model.GetComponentsInChildren<Renderer>(true))
            r.sharedMaterials = r.sharedMaterials.Select(CompatibleMaterial).ToArray();
        var animator = model.GetComponent<Animator>();
        if (animator == null) animator = model.AddComponent<Animator>();
        animator.runtimeAnimatorController = Controller(name, LoopClip(path, "idle", name + "_Idle"), LoopClip(path, "walk", name + "_Walk"), guard);
        animator.applyRootMotion = false; animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;
        var bounds = VisualBounds(root);
        model.transform.localScale *= height / bounds.size.y;
        bounds = VisualBounds(root);
        model.transform.position -= new Vector3(bounds.center.x, bounds.min.y, bounds.center.z);
        if (guard)
        {
            var monster = root.AddComponent<Monster>();
            Set(monster, "_animator", animator); Set(monster, "_sleepUntilEggTaken", false);
            Set(monster, "_isWalkingParam", "IsWalk"); Set(monster, "_moveSpeed", 54f);
            Set(monster, "_patrolSpeed", 3f); Set(monster, "_chaseDelay", 2f);
            Set(monster, "_patrolAnimationSpeed", 2.4f); Set(monster, "_runAnimationSpeed", 1.6f);
            Set(monster, "_patrolRadii", new Vector2(13, 4));
            Set(monster, "_patrolWalkDuration", new Vector2(6, 9));
            Set(monster, "_patrolRestDuration", new Vector2(.5f, 1));
            var collider = root.AddComponent<BoxCollider>();
            bounds = VisualBounds(root); collider.center = bounds.center;
            collider.size = new Vector3(bounds.size.x * .7f, bounds.size.y * .8f, bounds.size.z * .6f);
            collider.isTrigger = true;
            var voice = root.AddComponent<AudioSource>(); voice.playOnAwake = false; voice.volume = .7f;
            var feet = root.AddComponent<AudioSource>(); feet.playOnAwake = false; feet.loop = true; feet.volume = .35f;
            feet.clip = Asset<AudioClip>("Assets/_Playable_/Sound/Monster_Footsteps_2x.wav");
            Set(monster, "_voiceSource", voice); Set(monster, "_chaseFootstepSource", feet);
            Set(monster, "_chaseRoar", Asset<AudioClip>("Assets/_Playable_/Sound/505131__mitchanary__monster-roar_8.wav"));
            Set(monster, "_biteSound", Asset<AudioClip>("Assets/SoundFX/sfx_click.wav"));
        }
        else
        {
            var wanderer = root.AddComponent<PenWanderer>();
            Set(wanderer, "_animator", animator); Set(wanderer, "_speed", 2.6f);
            bounds = VisualBounds(root);
            Set(wanderer, "_edgePadding", Mathf.Max(bounds.extents.x, bounds.extents.z) + .5f);
        }
        var prefab = PrefabUtility.SaveAsPrefabAsset(root, Output + "/" + name + ".prefab");
        Object.DestroyImmediate(root);
        return prefab;
    }
    static GameObject EggPrefab(string name)
    {
        var root = new GameObject(name);
        var source = Object.Instantiate(Asset<GameObject>("Assets/_Playable_/3D Model/Egg/" + name + ".fbx"), root.transform);
        var bounds = VisualBounds(root);
        source.transform.localScale *= 5.4f / Mathf.Max(bounds.size.x, bounds.size.y, bounds.size.z);
        bounds = VisualBounds(root);
        source.transform.position -= new Vector3(bounds.center.x, bounds.min.y, bounds.center.z);
        // Bake the many decorative FBX nodes into one renderer, retaining their supplied colors.
        var grouped = new Dictionary<Material, List<CombineInstance>>();
        foreach (var filter in source.GetComponentsInChildren<MeshFilter>())
        {
            var materials = filter.GetComponent<MeshRenderer>().sharedMaterials;
            for (int s = 0; s < filter.sharedMesh.subMeshCount; s++)
            {
                var mat = CompatibleMaterial(materials[s]);
                if (!grouped.ContainsKey(mat)) grouped[mat] = new List<CombineInstance>();
                grouped[mat].Add(new CombineInstance { mesh = filter.sharedMesh, subMeshIndex = s, transform = root.transform.worldToLocalMatrix * filter.transform.localToWorldMatrix });
            }
        }
        var pieces = new List<Mesh>(); var combines = new List<CombineInstance>();
        foreach (var group in grouped)
        {
            var piece = new Mesh { indexFormat = IndexFormat.UInt32 };
            piece.CombineMeshes(group.Value.ToArray(), true, true); pieces.Add(piece);
            combines.Add(new CombineInstance { mesh = piece, transform = Matrix4x4.identity });
        }
        var mesh = new Mesh { name = name, indexFormat = IndexFormat.UInt32 };
        mesh.CombineMeshes(combines.ToArray(), false, false); mesh.RecalculateBounds();
        mesh = Save(mesh, Output + "/" + name + ".asset");
        foreach (var piece in pieces) Object.DestroyImmediate(piece);
        Object.DestroyImmediate(source);
        root.AddComponent<MeshFilter>().sharedMesh = mesh;
        root.AddComponent<MeshRenderer>().sharedMaterials = grouped.Keys.ToArray();
        var carry = root.AddComponent<BoxCollider>();
        carry.center = mesh.bounds.center; carry.size = mesh.bounds.size * .85f;
        carry.enabled = false;
        var egg = root.AddComponent<Egg>();
        Set(egg, "_stealRadius", 6f); Set(egg, "_triggerCenter", Vector3.up * 2f); Set(egg, "_carryCollider", carry);
        var prefab = PrefabUtility.SaveAsPrefabAsset(root, Output + "/" + name + ".prefab");
        Object.DestroyImmediate(root);
        return prefab;
    }

    [MenuItem("Tools/Playable/Steal and Hatch/Prepare Supplied Art")]
    public static void PrepareArt()
    {
        Directory.CreateDirectory(Output + "/Materials"); Directory.CreateDirectory(Output + "/Map");
        AssetDatabase.Refresh(); Materials.Clear();
        Creature("Cerberus Guard", Animal + "Monsters/Cerberus.fbx", 8f, true);
        Creature("Cosmic Dragon Hatchling", Animal + "Cosmic/Cosmic_Dragon.fbx", 7f, false);
        foreach (var name in new[] { "Cyan Orbit Egg", "Violet Reactor Egg", "Neon Crescent Egg", "Prism Unicorn Egg" }) EggPrefab(name);
        HatchFlashVfxSetup.Build();
        AssetDatabase.SaveAssets();
    }

    struct CutVertex
    {
        public Vector3 p, n;
        public Vector2 uv;
        public static CutVertex Lerp(CutVertex a, CutVertex b, float t) => new CutVertex
        { p = Vector3.Lerp(a.p, b.p, t), n = Vector3.Lerp(a.n, b.n, t).normalized, uv = Vector2.Lerp(a.uv, b.uv, t) };
    }
    static List<CutVertex> Clip(List<CutVertex> input, int axis, float plane, bool greater)
    {
        var result = new List<CutVertex>();
        if (input.Count == 0) return result;
        var previous = input[input.Count - 1];
        bool wasInside = greater ? previous.p[axis] >= plane : previous.p[axis] <= plane;
        foreach (var current in input)
        {
            bool inside = greater ? current.p[axis] >= plane : current.p[axis] <= plane;
            if (inside != wasInside)
            {
                float t = (plane - previous.p[axis]) / (current.p[axis] - previous.p[axis]);
                result.Add(CutVertex.Lerp(previous, current, t));
            }
            if (inside) result.Add(current);
            previous = current; wasInside = inside;
        }
        return result;
    }
    static List<List<CutVertex>> OpenPortal(List<CutVertex> polygon, float z)
    {
        // Subtract a doorway from the original closed end walls; preserve the ground and lintel.
        var remainder = polygon;
        var outside = new List<List<CutVertex>>();
        int[] axes = { 0, 0, 1, 1, 2, 2 };
        float[] planes = { -18f, 18f, .1f, 20f, z - 10f, z + 10f };
        for (int p = 0; p < 6 && remainder.Count >= 3; p++)
        {
            bool greater = p % 2 == 0;
            var keep = Clip(remainder, axes[p], planes[p], !greater);
            if (keep.Count >= 3) outside.Add(keep);
            remainder = Clip(remainder, axes[p], planes[p], greater);
        }
        return outside;
    }
    static GameObject CutSection(Mesh source, Material[] materials, Transform parent, string name,
        float from, float to, float scale, float start)
    {
        var positions = source.vertices; var normals = source.normals; var uv = source.uv;
        var vertices = new List<Vector3>(); var outNormals = new List<Vector3>(); var outUV = new List<Vector2>();
        var submeshes = new List<int[]>(); var usedMaterials = new List<Material>();
        for (int s = 0; s < source.subMeshCount; s++)
        {
            var triangles = source.GetTriangles(s); var indices = new List<int>();
            for (int i = 0; i < triangles.Length; i += 3)
            {
                var polygon = new List<CutVertex>(3);
                for (int j = 0; j < 3; j++)
                {
                    int id = triangles[i + j];
                    polygon.Add(new CutVertex { p = positions[id], n = normals[id], uv = uv[id] });
                }
                polygon = Clip(Clip(polygon, 2, from, true), 2, to, false);
                // Keep the supplied corridor and its edge decorations, excluding other branches of the main map.
                polygon = Clip(Clip(polygon, 0, -150, true), 0, 150, false);
                if (polygon.Count < 3) continue;
                var polygons = OpenPortal(polygon, from);
                polygons = polygons.SelectMany(p => OpenPortal(p, to)).ToList();
                foreach (var part in polygons)
                {
                    int first = vertices.Count;
                    foreach (var vertex in part)
                    {
                        vertices.Add(new Vector3(vertex.p.x, vertex.p.y, vertex.p.z - from) * scale);
                        outNormals.Add(vertex.n); outUV.Add(vertex.uv);
                    }
                    for (int j = 1; j < part.Count - 1; j++)
                    {
                        indices.Add(first); indices.Add(first + j); indices.Add(first + j + 1);
                    }
                }
            }
            if (indices.Count > 0) { submeshes.Add(indices.ToArray()); usedMaterials.Add(materials[s]); }
        }
        var mesh = new Mesh { name = name, indexFormat = IndexFormat.UInt32 };
        mesh.SetVertices(vertices); mesh.SetNormals(outNormals); mesh.SetUVs(0, outUV);
        mesh.subMeshCount = submeshes.Count;
        for (int s = 0; s < submeshes.Count; s++) mesh.SetTriangles(submeshes[s], s);
        mesh.RecalculateBounds();
        if (name == "Photo 4 - Forest") RemoveExitPartition(mesh, (to - from) * scale, scale);
        mesh = Save(mesh, Output + "/Map/" + name + ".asset");
        var go = new GameObject(name, typeof(MeshFilter), typeof(MeshRenderer));
        go.transform.SetParent(parent, false); go.transform.localPosition = Vector3.forward * start;
        go.GetComponent<MeshFilter>().sharedMesh = mesh;
        go.GetComponent<MeshRenderer>().sharedMaterials = usedMaterials.ToArray();
        go.isStatic = true;
        GenerateBoxColliders(go, mesh, (to - from) * scale, 80f * scale);
        return go;
    }

    static void RemoveExitPartition(Mesh mesh, float length, float scale)
    {
        // The cut Forest end contains a full-width partition and its raised stone details.
        // Remove those connected pieces without cutting the ground or the long side walls.
        var vertices = mesh.vertices;
        var parents = Enumerable.Range(0, vertices.Length).ToArray();
        var welded = new Dictionary<Vector3Int, int>();
        for (int i = 0; i < vertices.Length; i++)
        {
            var key = Vector3Int.RoundToInt(vertices[i] * 1000f);
            if (welded.TryGetValue(key, out var other)) parents[Root(parents, i)] = Root(parents, other);
            else welded.Add(key, i);
        }
        var triangles = mesh.triangles;
        for (int i = 0; i < triangles.Length; i += 3)
        {
            parents[Root(parents, triangles[i + 1])] = Root(parents, triangles[i]);
            parents[Root(parents, triangles[i + 2])] = Root(parents, triangles[i]);
        }
        var bounds = new Dictionary<int, Bounds>();
        for (int i = 0; i < vertices.Length; i++)
        {
            int root = Root(parents, i);
            if (!bounds.TryGetValue(root, out var b)) b = new Bounds(vertices[i], Vector3.zero);
            b.Encapsulate(vertices[i]); bounds[root] = b;
        }
        var removed = new HashSet<int>(bounds.Where(pair =>
            pair.Value.min.z >= length - 8f * scale && pair.Value.min.y >= -.5f * scale &&
            pair.Value.max.y > .5f * scale && pair.Value.min.x < 75f * scale &&
            pair.Value.max.x > -75f * scale).Select(pair => pair.Key));
        for (int s = 0; s < mesh.subMeshCount; s++)
        {
            var source = mesh.GetTriangles(s);
            var kept = new List<int>();
            for (int i = 0; i < source.Length; i += 3)
            {
                if (removed.Contains(Root(parents, source[i]))) continue;
                kept.Add(source[i]); kept.Add(source[i + 1]); kept.Add(source[i + 2]);
            }
            mesh.SetTriangles(kept, s);
        }
    }

    static int Root(int[] parents, int i)
    {
        while (parents[i] != i) { parents[i] = parents[parents[i]]; i = parents[i]; }
        return i;
    }
    static BoxCollider Box(Transform parent, string name, Vector3 center, Vector3 size, bool trigger = false)
    {
        var go = new GameObject(name);
        // PlayerController probes the Ground layer to select run versus airborne animation.
        go.layer = trigger ? 6 : LayerMask.NameToLayer("Ground");
        go.transform.SetParent(parent, false); go.transform.localPosition = center;
        var box = go.AddComponent<BoxCollider>(); box.size = size; box.isTrigger = trigger;
        go.isStatic = true;
        return box;
    }
    static void GenerateBoxColliders(GameObject section, Mesh mesh, float length, float halfWidth)
    {
        var colliderRoot = new GameObject("Generated Box Colliders").transform;
        colliderRoot.SetParent(section.transform, false);
        Box(colliderRoot, "Continuous walkable ground", new Vector3(0, -.25f, length * .5f), new Vector3(halfWidth * 2f, .5f, length + .04f));
        var vertices = mesh.vertices; var triangles = mesh.triangles; var parents = new int[vertices.Length];
        var welded = new Dictionary<Vector3Int, int>();
        for (int i = 0; i < parents.Length; i++)
        {
            parents[i] = i;
            var key = Vector3Int.RoundToInt(vertices[i] * 1000f);
            if (welded.TryGetValue(key, out var other)) parents[i] = Root(parents, other);
            else welded.Add(key, i);
        }
        for (int i = 0; i < triangles.Length; i += 3)
        {
            int root = Root(parents, triangles[i]);
            parents[Root(parents, triangles[i + 1])] = root;
            parents[Root(parents, triangles[i + 2])] = root;
        }
        var components = new Dictionary<int, Bounds>();
        var usedVertices = new HashSet<int>(triangles);
        for (int i = 0; i < vertices.Length; i++)
        {
            if (!usedVertices.Contains(i)) continue;
            int root = Root(parents, i);
            if (components.TryGetValue(root, out var bounds)) { bounds.Encapsulate(vertices[i]); components[root] = bounds; }
            else components.Add(root, new Bounds(vertices[i], Vector3.zero));
        }
        int index = 0;
        foreach (var bounds in components.Values)
        {
            // Flat ground has its continuous slab; model details retain individual simple colliders.
            if (bounds.max.y <= .2f || bounds.min.y >= 8f || bounds.size.sqrMagnitude < .04f) continue;
            Vector3 size = bounds.size;
            size.x = Mathf.Max(.12f, size.x); size.y = Mathf.Max(.12f, size.y); size.z = Mathf.Max(.12f, size.z);
            var pieces = new List<Bounds> { new Bounds(bounds.center, size) };
            float portalHalfWidth = halfWidth * 18f / 80f;
            foreach (float edge in new[] { 0f, length })
            {
                var cut = new Bounds(new Vector3(0, 4.05f, edge), new Vector3(portalHalfWidth * 2, 7.9f, 8.1f));
                pieces = pieces.SelectMany(b => SubtractBounds(b, cut)).ToList();
            }
            foreach (var piece in pieces)
                Box(colliderRoot, "Detail " + (++index).ToString("D3"), piece.center, piece.size);
        }
    }
    static IEnumerable<Bounds> SubtractBounds(Bounds source, Bounds hole)
    {
        if (!source.Intersects(hole)) { yield return source; yield break; }
        Vector3 low = source.min, high = source.max;
        for (int axis = 0; axis < 3; axis++)
        {
            if (low[axis] < hole.min[axis])
            {
                Vector3 end = high; end[axis] = Mathf.Min(high[axis], hole.min[axis]);
                yield return new Bounds((low + end) * .5f, end - low);
                low[axis] = end[axis];
            }
            if (high[axis] > hole.max[axis])
            {
                Vector3 start = low; start[axis] = Mathf.Max(low[axis], hole.max[axis]);
                yield return new Bounds((start + high) * .5f, high - start);
                high[axis] = start[axis];
            }
        }
    }

    static T SceneComponent<T>() where T : Component
    {
        foreach (var root in EditorSceneManager.GetActiveScene().GetRootGameObjects())
        {
            var component = root.GetComponentInChildren<T>(true);
            if (component != null) return component;
        }
        throw new Exception("Missing existing scene component " + typeof(T).Name);
    }
    static Transform Child(Transform parent, string name)
    {
        foreach (var t in parent.GetComponentsInChildren<Transform>(true)) if (t.name == name) return t;
        return null;
    }
    static Transform Point(Transform parent, string name, Vector3 position)
    {
        var t = new GameObject(name).transform; t.SetParent(parent, false); t.position = position; return t;
    }

    // The route scale is an explicit input so map length is never silently changed by this tool.
    public static string BuildScene(float routeScale)
    {
        if (EditorApplication.isPlaying || routeScale <= 0) throw new Exception("Edit mode and a positive route scale are required.");
        var scene = EditorSceneManager.GetActiveScene();
        if (scene.path != "Assets/_Playable_/Scenes/Gameplay.unity") throw new Exception("Open Gameplay first.");
        Directory.CreateDirectory("Temp/StealHatch");
        string backup = Path.GetFullPath("Temp/StealHatch/Gameplay-before-setup-" + DateTime.Now.ToString("yyyyMMdd-HHmmss") + ".unity");
        if (!EditorSceneManager.SaveScene(scene, backup, true)) throw new Exception("Scene backup failed.");
        var raising = SceneComponent<EggRaisingController>();
        var player = Get<PlayerController>(raising, "_player");
        var camera = Get<CameraController>(raising, "_cameraInput");
        var action = Get<Button>(raising, "_action");
        var tutorial = Get<HandTutorial>(raising, "_tutorial");
        var line = Get<TutorialLineIndicator>(raising, "_line");
        var manager = SceneComponent<GameManager>();
        var canvas = action.GetComponentInParent<Canvas>();
        var gameplay = action.transform.parent;
        var title = Child(gameplay, "Title");
        var run = Child(gameplay, "Run");
        if (run == null) run = Child(gameplay, "Run UI");
        if (run == null) run = Child(gameplay, "Warning");
        if (title == null || run == null) throw new Exception("Existing STEAL/RUN artwork could not be located.");
        var source = Asset<GameObject>(Animal + "Map_Steal_Eggs.prefab");
        var mesh = source.GetComponent<MeshFilter>().sharedMesh;
        var materials = source.GetComponent<MeshRenderer>().sharedMaterials;
        foreach (var root in scene.GetRootGameObjects())
            if (root.name == "Map_Steal_Eggs" || root.name == "GameplayZones" || root.name == "Guard Nest Patrol Center" ||
                root.name == "Pen Lunar Dragon" || root.name == "Pen Oni Tiger" || root.name == "Steal and Hatch Map") Object.DestroyImmediate(root);
        var map = new GameObject("Steal and Hatch Map");
        float homeFrom = 102.54f, homeTo = 199.41f, forestFrom = 3815.89f, forestTo = 4681f;
        float gardenFrom = 3078.08f, gardenTo = 3815.89f, desertFrom = 1931.06f, desertTo = 2436.09f;
        float homeLength = (homeTo - homeFrom) * routeScale;
        float forestLength = (forestTo - forestFrom) * routeScale;
        float gardenLength = (gardenTo - gardenFrom) * routeScale;
        float desertLength = (desertTo - desertFrom) * routeScale;
        CutSection(mesh, materials, map.transform, "Photo 1 - Home", homeFrom, homeTo, routeScale, 0);
        CutSection(mesh, materials, map.transform, "Photo 4 - Forest", forestFrom, forestTo, routeScale, homeLength);
        CutSection(mesh, materials, map.transform, "Photo 3 - Sakura", gardenFrom, gardenTo, routeScale, homeLength + forestLength);
        var desert = CutSection(mesh, materials, map.transform, "Photo 2 - Guarded Nests", desertFrom, desertTo, routeScale, homeLength + forestLength + gardenLength);
        float length = homeLength + forestLength + gardenLength + desertLength;
        float halfWidth = 80 * routeScale;
        AddBoundary(map.transform, mesh, materials, routeScale, length, halfWidth);
        var pen = BuildHome(map.transform, routeScale, homeLength, halfWidth, out var nest, out var gate);
        var nestPrefab = Asset<GameObject>(Animal + "Trap&nest.fbx").transform.Find("nest").gameObject;
        var eggs = new Egg[4];
        string[] names = { "Cyan Orbit Egg", "Violet Reactor Egg", "Neon Crescent Egg", "Prism Unicorn Egg" };
        float spacing = Mathf.Min(9f, halfWidth * .65f);
        var positions = new[] { new Vector3(0, 0, length - 8), new Vector3(-spacing, 0, length - 8), new Vector3(spacing, 0, length - 8), new Vector3(-spacing * .5f, 0, length - 18), new Vector3(spacing * .5f, 0, length - 18) };
        for (int i = 0; i < 5; i++)
        {
            var nestModel = Object.Instantiate(nestPrefab, map.transform);
            nestModel.name = i == 4 ? "Guard Nest 5 - Empty" : "Guard Nest " + (i + 1);
            nestModel.transform.position = positions[i]; nestModel.transform.localScale = Vector3.one * 1.25f;
            if (i == 4) continue;
            var egg = (GameObject)PrefabUtility.InstantiatePrefab(Asset<GameObject>(Output + "/" + names[i] + ".prefab"));
            egg.transform.SetParent(map.transform); egg.transform.position = positions[i] + Vector3.up * 1.15f;
            eggs[i] = egg.GetComponent<Egg>();
        }
        var guard = ((GameObject)PrefabUtility.InstantiatePrefab(Asset<GameObject>(Output + "/Cerberus Guard.prefab"))).GetComponent<Monster>();
        guard.transform.SetParent(map.transform);
        var patrol = Point(map.transform, "Cerberus Patrol Center", new Vector3(0, 0, length - 30));
        Set(guard, "_patrolCenter", patrol); Set(guard, "_patrolRadii", new Vector2(Mathf.Min(7, halfWidth - 5), 3));
        guard.transform.position = patrol.position + Vector3.right * Mathf.Min(7, halfWidth - 5);
        Set(raising, "_nest", nest); Set(raising, "_pen", pen); Set(raising, "_stealFlow", true);
        Set(raising, "_incubationSeconds", 2f); Set(raising, "_creatureScaleMultiplier", 1f);
        Set(raising, "_hatchlingRoar", Asset<AudioClip>("Assets/_Playable_/Sound/505131__mitchanary__monster-roar_8.wav"));
        Set(raising, "_hatchlings", new[] { Asset<GameObject>(Output + "/Cosmic Dragon Hatchling.prefab").GetComponent<PenWanderer>() });
        ConfigurePenResidents();
        var hatchAura = (GameObject)PrefabUtility.InstantiatePrefab(Asset<GameObject>(Output + "/Hatch Aura.prefab"), nest);
        hatchAura.name = "Hatch VFX";
        hatchAura.transform.localPosition = Vector3.up * 1.5f;
        hatchAura.transform.localRotation = Quaternion.identity;
        hatchAura.transform.localScale = Vector3.one * 18f;
        hatchAura.SetActive(false);
        Set(raising, "_revealAura", hatchAura);
        Set(raising, "_eggs", new GameObject[0]);
        Set(raising, "_hatchGround", Point(map.transform, "Hatchling Ground", new Vector3(nest.position.x, .1f, nest.position.z)));
        Set(raising, "_openRadius", 8f);
        var selection = Get<GameObject>(raising, "_selection");
        if (selection != null) Object.DestroyImmediate(selection);
        var oldCta = Get<FailPanel>(raising, "_cta"); if (oldCta != null) oldCta.gameObject.SetActive(false);
        Set(manager, "_stealHatchCta", oldCta);
        var flow = raising.GetComponent<StealHatchController>(); if (flow == null) flow = raising.gameObject.AddComponent<StealHatchController>();
        Set(flow, "_player", player); Set(flow, "_camera", camera); Set(flow, "_holdPoint", Get<Transform>(raising, "_holdPoint"));
        Set(flow, "_guard", guard); Set(flow, "_eggs", eggs); Set(flow, "_home", pen); Set(flow, "_homeGate", gate);
        Set(flow, "_raising", raising); Set(flow, "_line", line); Set(flow, "_tutorial", tutorial);
        Set(flow, "_action", action); Set(flow, "_actionLabel", Get<TMP_Text>(raising, "_label"));
        Set(flow, "_stealTitle", title.gameObject); Set(flow, "_runTitle", run.gameObject);
        Set(flow, "_blood", canvas.GetComponentInChildren<BloodOverlay>(true));
        Set(flow, "_stealSound", Asset<AudioClip>("Assets/SoundFX/sfx_click.wav"));
        Set(flow, "_failSound", Asset<AudioClip>("Assets/_Playable_/Sound/ohh-no (mp3cut.net).mp3"));
        Set(manager, "_eggRaisingMode", false); Set(manager, "_stealAndHatchMode", true); Set(manager, "_endTime", 30);
        var fail = Get<FailPanel>(manager, "_failPanel");
        Set(fail, "_installOnClick", true); fail.gameObject.SetActive(false);
        var layout = canvas.GetComponent<StealHatchLayout>(); if (layout == null) layout = canvas.gameObject.AddComponent<StealHatchLayout>();
        Set(layout, "_title", (RectTransform)title); Set(layout, "_run", (RectTransform)run);
        var scaler = canvas.GetComponent<ResponsiveCanvasScaler>(); Set(scaler, "_useOrientationReference", true);
        Get<Button>(manager, "_btnBlock").GetComponent<Image>().color = Color.clear;
        Get<Button>(manager, "_btnBlock").gameObject.SetActive(false);
        action.onClick = new Button.ButtonClickedEvent(); action.gameObject.SetActive(false);
        player.transform.SetPositionAndRotation(new Vector3(0, 1.2f, homeLength - 1), Quaternion.identity);
        Set(player, "_isWorking", true); Set(player, "_useContinuousCollision", true);
        Set(camera, "_initialYaw", 0f); Set(camera, "_initialPitch", 12f); camera.enabled = true;
        tutorial.HideAll(); line.StopDraw(); title.gameObject.SetActive(true); run.gameObject.SetActive(false);
        Get<WinPanel>(manager, "_winPanel").gameObject.SetActive(false);
        AssetDatabase.SaveAssets(); EditorSceneManager.MarkSceneDirty(scene); EditorSceneManager.SaveScene(scene);
        return "Built supplied map 2-3-4-1; length=" + length + ", route scale=" + routeScale + ", backup=" + backup;
    }

    static void AddBoundary(Transform map, Mesh source, Material[] materials, float scale, float length, float halfWidth)
    {
        // Reuse the existing cut wall assets and original dirt/grass materials at both ends.
        var wall = Asset<Mesh>("Assets/_Playable_/3D Model/Map/StealEggAssembly/EndWall_Desert.asset");
        var cap = Asset<Mesh>("Assets/_Playable_/3D Model/Map/StealEggAssembly/EndWall_GrassCap.asset");
        for (int end = 0; end < 2; end++)
        {
            var go = new GameObject(end == 0 ? "Home Back Wall" : "Desert End Wall", typeof(MeshFilter), typeof(MeshRenderer));
            go.transform.SetParent(map, false); go.transform.position = Vector3.forward * (end == 0 ? 0 : length);
            go.transform.localScale = Vector3.one * scale;
            go.GetComponent<MeshFilter>().sharedMesh = wall;
            go.GetComponent<MeshRenderer>().sharedMaterial = materials[end == 0 ? 0 : 20];
            var top = new GameObject("Grass Cap", typeof(MeshFilter), typeof(MeshRenderer));
            top.transform.SetParent(go.transform, false); top.transform.localPosition = Vector3.up * 18;
            top.GetComponent<MeshFilter>().sharedMesh = cap; top.GetComponent<MeshRenderer>().sharedMaterial = materials[1];
            float collisionHeight = 6f;
            if (end == 1)
            {
                // Match the desert side walls, including their sand-colored coping.
                float bodyHeight = 36.4517f * scale;
                float yScale = bodyHeight / wall.bounds.size.y;
                go.transform.localScale = new Vector3(scale, yScale, scale);
                go.transform.position += Vector3.up * (-wall.bounds.min.y * yScale);
                go.GetComponent<MeshRenderer>().sharedMaterial = materials.First(m => m.name == "Dirt Surface 11");
                top.GetComponent<MeshRenderer>().sharedMaterial = go.GetComponent<MeshRenderer>().sharedMaterial;
                top.transform.localScale = new Vector3(1, scale / yScale, 1);
                top.transform.localPosition = Vector3.up *
                    ((bodyHeight - cap.bounds.min.y * scale - go.transform.position.y) / yScale);
                collisionHeight = bodyHeight + cap.bounds.size.y * scale;
            }
            Box(map, go.name + " Collider", new Vector3(0, collisionHeight * .5f, end == 0 ? 0 : length),
                new Vector3(halfWidth * 2, collisionHeight, Mathf.Max(.5f, scale * 10)));
        }
        Box(map, "Left continuous boundary", new Vector3(-halfWidth, 4, length * .5f), new Vector3(.5f, 8, length));
        Box(map, "Right continuous boundary", new Vector3(halfWidth, 4, length * .5f), new Vector3(.5f, 8, length));
    }

    [MenuItem("Tools/Playable/Steal and Hatch/Expand Pen and Add Residents")]
    public static void ConfigurePenResidents()
    {
        if (EditorApplication.isPlaying) throw new Exception("Edit mode is required.");
        var raising = SceneComponent<EggRaisingController>();
        var pen = Get<BoxCollider>(raising, "_pen");
        var home = pen.transform.parent;
        const float width = 50f;
        float oldWidth = pen.size.x + 1;
        var visual = home.Find("Existing Ranch Pen");
        var visualScale = visual.localScale;
        visualScale.x *= width / oldWidth;
        visual.localScale = visualScale;
        var size = pen.size; size.x = width - 1; pen.size = size;
        foreach (int side in new[] { -1, 1 })
        {
            var fence = home.Find(side < 0 ? "Pen Left Fence" : "Pen Right Fence");
            var position = fence.localPosition; position.x = side * width * .5f; fence.localPosition = position;
            var front = home.Find("Pen Front Fence " + side);
            var collider = front.GetComponent<BoxCollider>();
            float fenceLength = (width - 8f) * .5f;
            size = collider.size; size.x = fenceLength; collider.size = size;
            position = front.localPosition; position.x = side * (8f + fenceLength) * .5f; front.localPosition = position;
        }
        var back = home.Find("Pen Back Fence").GetComponent<BoxCollider>();
        size = back.size; size.x = width; back.size = size;
        foreach (var resident in Get<PenWanderer[]>(raising, "_residents"))
            if (resident != null) Object.DestroyImmediate(resident.gameObject);
        var residents = new PenWanderer[2];
        float residentHeight = VisualBounds(SceneComponent<Monster>().gameObject).size.y;
        string[] names = { "TitanTempleKingkong", "OniTiger" };
        for (int i = 0; i < residents.Length; i++)
        {
            var prefab = Asset<GameObject>("Assets/_Playable_/EggRaising/" + names[i] + ".prefab");
            var go = (GameObject)PrefabUtility.InstantiatePrefab(prefab, home);
            go.name = "Pen " + names[i];
            var position = pen.bounds.center + new Vector3(i == 0 ? -10 : 10, 0, -4);
            position.y = 0;
            go.transform.position = position;
            var bounds = VisualBounds(go);
            go.transform.localScale *= residentHeight / Mathf.Max(.001f, bounds.size.y);
            bounds = VisualBounds(go);
            go.transform.position += Vector3.up * (position.y - bounds.min.y);
            residents[i] = go.GetComponent<PenWanderer>();
            Set(residents[i], "_speed", 2.5f);
            Set(residents[i], "_edgePadding", Mathf.Max(4f,
                new Vector2(bounds.extents.x, bounds.extents.z).magnitude + .5f));
        }
        Set(raising, "_residents", residents);
        EditorSceneManager.MarkSceneDirty(raising.gameObject.scene);
    }

    static BoxCollider BuildHome(Transform map, float scale, float length, float halfWidth, out Transform nest, out Transform gate)
    {
        var home = new GameObject("Home - Single Large Pen"); home.transform.SetParent(map, false);
        var model = Asset<GameObject>("Assets/_Playable_/3D Model/Map/StealEggAssembly/Ranch/Plot&sign.fbx").transform.Find("Plots");
        var visual = new GameObject("Existing Ranch Pen"); visual.transform.SetParent(home.transform, false);
        var fence = Object.Instantiate(model.gameObject, visual.transform);
        fence.transform.localPosition = Vector3.zero;
        fence.transform.localRotation = Quaternion.Euler(0, 90, 0);
        var bounds = VisualBounds(visual);
        float width = Mathf.Min(50, halfWidth * 1.8f), depth = Mathf.Max(9, length - 4);
        visual.transform.localScale = new Vector3(width / bounds.size.x, 2.5f, depth / bounds.size.z);
        bounds = VisualBounds(visual);
        visual.transform.position += new Vector3(-bounds.center.x, -bounds.min.y, depth * .5f + 1 - bounds.center.z);
        var zone = Box(home.transform, "Safe Home and Hatching Zone", new Vector3(0, 3, depth * .5f + 1), new Vector3(width - 1, 8, depth - 1), true);
        float zFront = depth + 1, zBack = 1;
        Box(home.transform, "Pen Left Fence", new Vector3(-width * .5f, 2, (zFront + zBack) * .5f), new Vector3(.5f, 4, depth));
        Box(home.transform, "Pen Right Fence", new Vector3(width * .5f, 2, (zFront + zBack) * .5f), new Vector3(.5f, 4, depth));
        Box(home.transform, "Pen Back Fence", new Vector3(0, 2, zBack), new Vector3(width, 4, .5f));
        float gateWidth = 8f, fenceLength = (width - gateWidth) * .5f;
        for (int side = -1; side <= 1; side += 2)
            Box(home.transform, "Pen Front Fence " + side, new Vector3(side * (gateWidth + fenceLength) * .5f, 2, zFront), new Vector3(fenceLength, 4, .5f));
        nest = Point(home.transform, "Home Egg Placement", new Vector3(0, .1f, depth * .5f + 1));
        var nestAsset = Asset<GameObject>(Animal + "Trap&nest.fbx").transform.Find("nest");
        var nestVisual = Object.Instantiate(nestAsset.gameObject, home.transform);
        nestVisual.name = "Home Incubation Nest";
        nestVisual.transform.position = nest.position;
        nestVisual.transform.localScale = Vector3.one * 1.25f;
        nest.position += Vector3.up * 1.2f;
        gate = Point(home.transform, "Home Gate Guide", new Vector3(0, .1f, zFront - 2));
        return zone;
    }
}
