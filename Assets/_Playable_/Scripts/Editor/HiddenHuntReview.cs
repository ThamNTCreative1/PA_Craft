using System;
using System.Linq;
using System.Reflection;
using UnityEditor;
using UnityEngine;
using Object = UnityEngine.Object;

namespace Playable.Editor
{
    public static class HiddenHuntReview
    {
        [MenuItem("Tools/Playable/Raise Hidden Hands")]
        public static void RaiseHiddenHands()
        {
            if (Application.isPlaying) throw new InvalidOperationException("Exit Play mode before posing hidden models.");
            foreach (var target in Object.FindObjectsOfType<HiddenHuntTarget>())
            {
                var model = target.transform.Find("PlayerSkinny");
                if (model == null) continue;
                foreach (var bone in model.GetComponentsInChildren<Transform>())
                {
                    if (bone.name != "LArm" && bone.name != "RArm") continue;
                    var tip = bone.Find(bone.name + "_end");
                    if (tip == null) continue;
                    Undo.RecordObject(bone, "Raise hidden hand");
                    Vector3 direction = model.TransformDirection(new Vector3(0, .75f, bone.name == "LArm" ? -.65f : .65f));
                    bone.rotation = Quaternion.FromToRotation(tip.position - bone.position, direction) * bone.rotation;
                    PrefabUtility.RecordPrefabInstancePropertyModifications(bone);
                }
                var bounds = new Bounds();
                bool initialized = false;
                foreach (var renderer in model.GetComponentsInChildren<SkinnedMeshRenderer>())
                {
                    Undo.RecordObject(renderer, "Update posed hidden bounds");
                    renderer.updateWhenOffscreen = true;
                    PrefabUtility.RecordPrefabInstancePropertyModifications(renderer);
                    var mesh = new Mesh();
                    renderer.BakeMesh(mesh);
                    foreach (var vertex in mesh.vertices)
                    {
                        // BakeMesh already includes the renderer's scale. Applying TransformPoint
                        // here would scale the FBX vertices twice and engulf the player in the hitbox.
                        var worldPoint = renderer.transform.position + renderer.transform.rotation * vertex;
                        var point = target.transform.InverseTransformPoint(worldPoint);
                        if (!initialized) { bounds = new Bounds(point, Vector3.zero); initialized = true; }
                        else bounds.Encapsulate(point);
                    }
                    Object.DestroyImmediate(mesh);
                }
                var collider = target.GetComponent<BoxCollider>();
                if (collider != null && initialized)
                {
                    Undo.RecordObject(collider, "Fit raised hands collider");
                    collider.center = bounds.center;
                    collider.size = bounds.size;
                }
                UnityEditor.SceneManagement.EditorSceneManager.MarkSceneDirty(target.gameObject.scene);
            }
            UnityEditor.SceneManagement.EditorSceneManager.SaveOpenScenes();
        }

        [MenuItem("Tools/Playable/Use PlayerSkinny For Hidden Targets")]
        public static void UsePlayerSkinny()
        {
            if (Application.isPlaying) throw new InvalidOperationException("Exit Play mode before replacing hidden models.");
            var prefab = AssetDatabase.LoadAssetAtPath<GameObject>("Assets/_Playable_/3D Model/Map/MinecraftPlayer/PlayerSkinny.fbx");
            if (prefab == null) throw new InvalidOperationException("PlayerSkinny.fbx could not be loaded.");
            var targets = Object.FindObjectsOfType<HiddenHuntTarget>();
            foreach (var target in targets)
            {
                var so = new SerializedObject(target);
                var oldVisual = so.FindProperty("_visual").objectReferenceValue as Renderer;
                if (oldVisual == null) continue;
                var oldRoot = oldVisual.transform;
                while (oldRoot.parent != target.transform && oldRoot.parent != null) oldRoot = oldRoot.parent;
                var collider = target.GetComponent<BoxCollider>();
                if (collider == null) continue;
                float height = collider.size.y;
                var material = oldVisual.sharedMaterial;
                var instance = (GameObject)PrefabUtility.InstantiatePrefab(prefab, target.gameObject.scene);
                Undo.RegisterCreatedObjectUndo(instance, "Use PlayerSkinny hidden model");
                instance.name = "PlayerSkinny";
                instance.transform.SetPositionAndRotation(Vector3.zero, Quaternion.Euler(0, -90, 0));
                instance.transform.localScale = Vector3.one;
                foreach (var animator in instance.GetComponentsInChildren<Animator>()) animator.enabled = false;
                var renderers = instance.GetComponentsInChildren<SkinnedMeshRenderer>();
                var bounds = renderers[0].bounds;
                foreach (var renderer in renderers)
                {
                    bounds.Encapsulate(renderer.bounds);
                    renderer.sharedMaterial = material;
                }
                float scale = height / bounds.size.y;
                instance.transform.SetParent(target.transform, false);
                instance.transform.localRotation = Quaternion.Euler(0, -90, 0);
                instance.transform.localScale = Vector3.one * scale;
                instance.transform.localPosition = -new Vector3(bounds.center.x, bounds.min.y, bounds.center.z) * scale;
                Undo.RecordObject(collider, "Fit hidden collider");
                collider.center = new Vector3(0, height * .5f, 0);
                collider.size = bounds.size * scale;
                Undo.RecordObject(target, "Set hidden renderer");
                so.FindProperty("_visual").objectReferenceValue = renderers[0];
                so.ApplyModifiedProperties();
                Undo.DestroyObjectImmediate(oldRoot.gameObject);
                UnityEditor.SceneManagement.EditorSceneManager.MarkSceneDirty(target.gameObject.scene);
            }
            UnityEditor.SceneManagement.EditorSceneManager.SaveOpenScenes();
        }

        public static void SetResolution(int width, int height)
        {
            var asm = typeof(UnityEditor.Editor).Assembly;
            var sizesType = asm.GetType("UnityEditor.GameViewSizes");
            var singleton = typeof(ScriptableSingleton<>).MakeGenericType(sizesType);
            var sizes = singleton.GetProperty("instance").GetValue(null);
            var group = sizesType.GetProperty("currentGroup").GetValue(sizes);
            var groupType = group.GetType();
            var sizeType = asm.GetType("UnityEditor.GameViewSize");
            var enumType = asm.GetType("UnityEditor.GameViewSizeType");
            var entry = Activator.CreateInstance(sizeType, new object[] { Enum.ToObject(enumType, 1), width, height, "Hunt " + width + "x" + height });
            groupType.GetMethod("AddCustomSize").Invoke(group, new[] { entry });
            int count = (int)groupType.GetMethod("GetTotalCount").Invoke(group, null);
            var viewType = asm.GetType("UnityEditor.GameView");
            var view = EditorWindow.GetWindow(viewType);
            viewType.GetProperty("selectedSizeIndex", BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic).SetValue(view, count - 1);
            view.Repaint();
        }

        public static void RefreshModelMeshes()
        {
            const string folder = "Assets/_Playable_/HiddenHunt/";
            var source = Object.Instantiate(AssetDatabase.LoadAssetAtPath<GameObject>("Assets/_Playable_/3D Model/Map/MinecraftPlayer/PlayerSkinny.fbx"));
            var renderers = source.GetComponentsInChildren<SkinnedMeshRenderer>().Where(r => !r.name.EndsWith("Out")).ToArray();
            var combine = new CombineInstance[renderers.Length];
            for (int i = 0; i < renderers.Length; i++)
            {
                var r = renderers[i]; var baked = new Mesh(); r.BakeMesh(baked);
                combine[i] = new CombineInstance { mesh = baked, transform = HiddenHuntSceneSetup.HiddenPose(r) };
            }
            var mesh = new Mesh(); mesh.CombineMeshes(combine, true, true);
            var bounds = mesh.bounds; var vertices = mesh.vertices;
            for (int i = 0; i < vertices.Length; i++) vertices[i] = Quaternion.Euler(0, -90, 0) * ((vertices[i] - new Vector3(bounds.center.x, bounds.min.y, bounds.center.z)) / bounds.size.y);
            mesh.vertices = vertices; mesh.RecalculateNormals(); mesh.RecalculateBounds(); mesh.name = "PlayerSkinny_Hidden";
            var saved = AssetDatabase.LoadAssetAtPath<Mesh>(folder + "HiddenMesh.asset"); EditorUtility.CopySerialized(mesh, saved);
            foreach (var c in combine) Object.DestroyImmediate(c.mesh);
            Object.DestroyImmediate(mesh); Object.DestroyImmediate(source);
            foreach (var target in GameObject.Find("Hidden Targets - Hand Placed").GetComponentsInChildren<HiddenHuntTarget>())
            {
                var scale = target.GetComponentInChildren<MeshFilter>().transform.localScale.x;
                var box = target.GetComponent<BoxCollider>(); box.size = saved.bounds.size * scale; box.center = saved.bounds.center * scale;
            }
            AssetDatabase.SaveAssets();
        }
    }
}
