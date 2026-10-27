using System.Linq;
using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement;
using Playable.KeyboardEscape;

public static partial class KeyboardEscapeBuilder
{
    public static string CenterHelmetPickups()
    {
        var scene = UnityEngine.SceneManagement.SceneManager.GetActiveScene();
        var game = scene.GetRootGameObjects().SelectMany(g => g.GetComponentsInChildren<EscapeGame>(true)).First();
        var batches = game.GetComponentInChildren<EscapeKeyboardBatches>();
        var centers = batches ? batches.chunks.SelectMany(c => c.keyCenters).ToArray()
            : game.GetComponentsInChildren<Minigames.KeyboardEscape.Gameplay.KeyNote>().Select(k => k.transform.position).ToArray();
        Physics.SyncTransforms();
        var report = new System.Collections.Generic.List<string>();
        foreach (var pickup in game.helmets)
        {
            var old = pickup.transform.position;
            var row = centers.Where(v => Mathf.Abs(v.z - old.z) < 2f).ToArray();
            if (row.Length == 0) throw new System.InvalidOperationException("No keyboard surface near " + old);
            float middle = (row.Min(v => v.x) + row.Max(v => v.x)) * .5f;
            var candidates = row.Where(v => Mathf.Abs(v.x - middle) <= 2f)
                .OrderBy(v => Mathf.Abs(v.z - old.z) + Mathf.Abs(v.x - middle) * .5f).ToArray();
            bool placed = false;
            foreach (var key in candidates)
            {
                Vector3 target = key + Vector3.up * 1.2f;
                if (Physics.CheckSphere(target, .6f, ~0, QueryTriggerInteraction.Ignore)) continue;
                Undo.RecordObject(pickup.transform, "Center helmet pickup");
                pickup.transform.position = target;
                report.Add(old + " -> " + target);
                placed = true;
                break;
            }
            if (!placed) throw new System.InvalidOperationException("No clear central pickup position near " + old);
        }
        EditorSceneManager.MarkSceneDirty(scene); EditorSceneManager.SaveScene(scene);
        return string.Join("\n", report.ToArray());
    }

    public static string ApplyPresentationFixes()
    {
        var scene = UnityEngine.SceneManagement.SceneManager.GetActiveScene();
        var game = scene.GetRootGameObjects().SelectMany(g => g.GetComponentsInChildren<EscapeGame>(true)).First();
        if (!AssetDatabase.IsValidFolder(Root + "/Materials")) AssetDatabase.CreateFolder(Root, "Materials");
        game.viewCamera.farClipPlane = 500;
        game.hint.fontSize = 64; game.hint.enableAutoSizing = false;
        game.countdown.fontSize = 200; game.countdown.enableAutoSizing = false;
        game.countdown.rectTransform.sizeDelta = new Vector2(1000, 300);
        var materialPath = Root + "/Materials/Red Helmet.mat";
        var material = AssetDatabase.LoadAssetAtPath<Material>(materialPath);
        if (!material) { material = new Material(Shader.Find("Playable/KeyboardEscape/Unlit")); AssetDatabase.CreateAsset(material, materialPath); }
        material.mainTexture = AssetDatabase.LoadAssetAtPath<Texture2D>("Assets/_Playable_/3D Model/Other/red_helmet_pack/helmet_palette.png");
        material.color = Color.white;
        var meshPath = Root + "/BakedKeys/Red Helmet.asset";
        var mesh = AssetDatabase.LoadAssetAtPath<Mesh>(meshPath);
        if (!mesh)
        {
            var model = Object.Instantiate(AssetDatabase.LoadAssetAtPath<GameObject>("Assets/_Playable_/3D Model/Other/red_helmet_pack/red_helmet.glb"));
            var combines = model.GetComponentsInChildren<MeshFilter>().Select(f => new CombineInstance { mesh = f.sharedMesh, transform = model.transform.worldToLocalMatrix * f.transform.localToWorldMatrix }).ToArray();
            mesh = new Mesh { name = "Red Helmet" }; mesh.CombineMeshes(combines, true, true);
            mesh.colors32 = Enumerable.Repeat(new Color32(255,255,255,255), mesh.vertexCount).ToArray();
            AssetDatabase.CreateAsset(mesh, meshPath); Object.DestroyImmediate(model);
        }
        foreach (var pickup in game.helmets)
        {
            foreach (Transform child in pickup.transform.Cast<Transform>().ToArray()) Object.DestroyImmediate(child.gameObject);
            pickup.billboard = null;
            var visual = new GameObject("Red Helmet", typeof(MeshFilter), typeof(MeshRenderer));
            var hover = new GameObject("Helmet Hover").transform;
            hover.SetParent(pickup.transform, false);
            pickup.animatedVisual = hover;
            visual.transform.SetParent(hover, false);
            float size = 1.2f / mesh.bounds.size.y;
            visual.transform.localScale = Vector3.one * size;
            visual.transform.localPosition = -mesh.bounds.center * size;
            visual.GetComponent<MeshFilter>().sharedMesh = mesh;
            visual.GetComponent<MeshRenderer>().sharedMaterial = material;
            visual.GetComponent<MeshRenderer>().shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
        }
        var shieldMaterialPath = Root + "/Materials/Helmet Shield.mat";
        var shieldMaterial = AssetDatabase.LoadAssetAtPath<Material>(shieldMaterialPath);
        if (!shieldMaterial) { shieldMaterial = new Material(Shader.Find("Playable/KeyboardEscape/Shield")); AssetDatabase.CreateAsset(shieldMaterial, shieldMaterialPath); }
        if (game.player.helmetIndicator) Object.DestroyImmediate(game.player.helmetIndicator);
        var shield = GameObject.CreatePrimitive(PrimitiveType.Sphere); shield.name = "Helmet Shield";
        Object.DestroyImmediate(shield.GetComponent<Collider>());
        shield.transform.SetParent(game.player.transform, false);
        shield.transform.localPosition = new Vector3(0, 1.45f, 0);
        shield.transform.localScale = Vector3.one * 3.6f;
        var renderer = shield.GetComponent<MeshRenderer>(); renderer.sharedMaterial = shieldMaterial;
        renderer.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off; renderer.receiveShadows = false;
        game.player.helmetIndicator = shield; shield.SetActive(false);
        AssetDatabase.SaveAssets(); EditorSceneManager.MarkSceneDirty(scene); EditorSceneManager.SaveScene(scene);
        return "Far plane 500; red helmet pickups=" + game.helmets.Length + "; shield ready; hint 64, countdown 200";
    }
}
