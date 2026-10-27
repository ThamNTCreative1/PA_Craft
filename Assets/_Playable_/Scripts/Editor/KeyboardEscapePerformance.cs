using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine.UI;
using Playable.KeyboardEscape;
using Minigames.KeyboardEscape.Gameplay;

public static partial class KeyboardEscapeBuilder
{
    public static string OptimizeKeyboardScene()
    {
        var scene = UnityEngine.SceneManagement.SceneManager.GetActiveScene();
        var game = scene.GetRootGameObjects().SelectMany(g => g.GetComponentsInChildren<EscapeGame>(true)).First();
        var keys = game.GetComponentsInChildren<KeyNote>(true);
        if (keys.Length > 0)
        {
            Directory.CreateDirectory("Library/KeyboardEscapeBackups");
            File.Copy(scene.path, "Library/KeyboardEscapeBackups/Gameplay.before-key-batching.unity", true);
            Directory.CreateDirectory(Root + "/BakedKeys");
            var material = AssetDatabase.LoadAssetAtPath<Material>(Root + "/BakedKeys/Keys.mat");
            if (!material)
            {
                material = new Material(Shader.Find("Playable/KeyboardEscape/BatchedKey"));
                AssetDatabase.CreateAsset(material, Root + "/BakedKeys/Keys.mat");
            }
            material.SetTexture("_keyMap", keys[0].GetComponentInChildren<MeshRenderer>().sharedMaterial.GetTexture("_keyMap"));
            var root = new GameObject("Batched Keyboard"); root.transform.SetParent(game.transform, false);
            var system = root.AddComponent<EscapeKeyboardBatches>(); system.player = game.player; system.material = material;
            var chunks = new List<EscapeKeyChunk>(); var random = new System.Random(427);
            foreach (var group in keys.GroupBy(k => new Vector2Int(Mathf.FloorToInt(k.transform.position.x / 16), Mathf.FloorToInt(k.transform.position.z / 16))))
            {
                var vertices = new List<Vector3>(); var normals = new List<Vector3>(); var colors = new List<Color>();
                var uv = new List<Vector2>(); var pivotsXZ = new List<Vector2>(); var pivotsY = new List<Vector2>(); var triangles = new List<int>();
                var centers = new List<Vector3>();
                foreach (var key in group)
                {
                    var serialized = new SerializedObject(key);
                    var gradient = serialized.FindProperty("gradient").gradientValue;
                    var grid = serialized.FindProperty("keyCharacterSize").vector2IntValue;
                    var pivot = ((Transform)serialized.FindProperty("scaler").objectReferenceValue).position;
                    var color = gradient.Evaluate((float)random.NextDouble());
                    var offset = new Vector2(random.Next(Mathf.Max(1, grid.x)), random.Next(Mathf.Max(1, grid.y)));
                    var filter = key.GetComponentInChildren<MeshFilter>(true); var mesh = filter.sharedMesh;
                    var sourceVertices = mesh.vertices; var sourceNormals = mesh.normals; var sourceUV = mesh.uv;
                    int start = vertices.Count;
                    for (int i = 0; i < sourceVertices.Length; i++)
                    {
                        var point = filter.transform.TransformPoint(sourceVertices[i]);
                        vertices.Add(new Vector3(Mathf.Round(point.x * 1000) / 1000, Mathf.Round(point.y * 1000) / 1000, Mathf.Round(point.z * 1000) / 1000));
                        normals.Add(filter.transform.TransformDirection(sourceNormals[i]).normalized);
                        colors.Add(color);
                        uv.Add(new Vector2((sourceUV[i].x + offset.x) / 6f, (sourceUV[i].y + offset.y) / 5f));
                        pivotsXZ.Add(new Vector2(pivot.x, pivot.z)); pivotsY.Add(new Vector2(pivot.y, 0));
                    }
                    foreach (var triangle in mesh.triangles) triangles.Add(start + triangle);
                    centers.Add(pivot);
                }
                var combined = new Mesh { name = "Keys " + group.Key.x + " " + group.Key.y };
                combined.SetVertices(vertices); combined.SetNormals(normals); combined.SetColors(colors);
                combined.colors32 = combined.colors32;
                combined.SetUVs(0, uv); combined.SetUVs(1, pivotsXZ); combined.SetUVs(2, pivotsY);
                combined.SetTriangles(triangles, 0); combined.RecalculateBounds();
                string path = Root + "/BakedKeys/" + combined.name + ".asset";
                var old = AssetDatabase.LoadAssetAtPath<Mesh>(path);
                if (old) { EditorUtility.CopySerialized(combined, old); UnityEngine.Object.DestroyImmediate(combined); combined = old; }
                else AssetDatabase.CreateAsset(combined, path);
                var go = new GameObject(combined.name, typeof(MeshFilter), typeof(MeshRenderer));
                go.transform.SetParent(root.transform, false);
                go.GetComponent<MeshFilter>().sharedMesh = combined;
                var renderer = go.GetComponent<MeshRenderer>(); renderer.sharedMaterial = material;
                renderer.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off; renderer.receiveShadows = false;
                chunks.Add(new EscapeKeyChunk { root = go, bounds = combined.bounds, boundsCenter = combined.bounds.center, boundsExtents = combined.bounds.extents, keyCenters = centers.ToArray() });
            }
            system.chunks = chunks.ToArray();
            foreach (var key in keys) UnityEngine.Object.DestroyImmediate(key.gameObject);
            // Generator containers are empty after baking and do not participate in gameplay.
            system.RefreshVisibility();
        }
        WireControls(game);
        SetupTutorialHands(game);
        game.viewCamera.farClipPlane = 500f;
        AssetDatabase.SaveAssets(); EditorSceneManager.MarkSceneDirty(scene); EditorSceneManager.SaveScene(scene);
        var batches = game.GetComponentInChildren<EscapeKeyboardBatches>(true);
        var report = "Keys baked=" + (batches ? batches.chunks.Sum(c => c.keyCenters.Length) : 0) + "; renderers=" + game.GetComponentsInChildren<Renderer>(true).Length + "; colliders=" + game.GetComponentsInChildren<Collider>(true).Length;
        Directory.CreateDirectory("docs/keyboard-escape"); File.WriteAllText("docs/keyboard-escape/performance-scene.txt", report);
        return report;
    }

    public static void SetupTutorialHands(EscapeGame game)
    {
        var canvas = game.player.controls.canvas;
        var tutorial = canvas.GetComponent<EscapeTutorialHands>();
        if (!tutorial) tutorial = canvas.gameObject.AddComponent<EscapeTutorialHands>();
        tutorial.game = game; tutorial.joystickArea = game.player.controls.joystickArea;
        if (tutorial.infinityRoot) return;
        var hand = AssetDatabase.LoadAssetAtPath<Sprite>("Assets/_Playable_/LavaCorridor/Jump hand.asset");
        var infinityPath = "Assets/toppng.com-white-infinity-symbol-png-white-infinity-logo-abstract-backgrounds-1024x441.png";
        var infinity = AssetDatabase.LoadAssetAtPath<Sprite>(infinityPath);
        if (!infinity)
        {
            var texture = AssetDatabase.LoadAssetAtPath<Texture2D>(infinityPath);
            infinity = Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), new Vector2(.5f, .5f));
            AssetDatabase.CreateAsset(infinity, Root + "/Infinity Tutorial.asset");
        }
        tutorial.infinityRoot = Rect("Camera Infinity Tutorial", canvas.transform, new Vector2(.5f, .35f), new Vector2(360, 160), Vector2.zero);
        var graphic = tutorial.infinityRoot.gameObject.AddComponent<Image>(); graphic.sprite = infinity; graphic.preserveAspect = true; graphic.raycastTarget = false;
        tutorial.cameraHand = Rect("Camera Hand", tutorial.infinityRoot, new Vector2(.5f, .5f), new Vector2(90, 110), Vector2.zero);
        tutorial.movementHand = Rect("Move Hand", canvas.transform, new Vector2(.5f, .5f), new Vector2(90, 110), Vector2.zero);
        foreach (var rect in new[] { tutorial.cameraHand, tutorial.movementHand })
        {
            rect.pivot = new Vector2(.2f, .85f);
            var image = rect.gameObject.AddComponent<Image>(); image.sprite = hand; image.preserveAspect = true; image.raycastTarget = false;
        }
        tutorial.movementHand.gameObject.SetActive(false);
    }
}
