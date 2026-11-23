using System;
using System.Collections.Generic;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace Playable.PetRescue.Editor
{
    /// Narrow, re-runnable patch for feedback round 2. Touches only course/crater/wall data, camera framing,
    /// pet formation, audio clip references and the tutorial goal-hint reference. Canvas layout is never changed.
    public static class RescueRound2Patch
    {
        private const string Root = RescueSceneBuilder.Root;
        private const int Columns = 6, MinX = -3, MinZ = -8;
        public static readonly Vector3 CameraOffset = new Vector3(0, 2.6f, -4.5f), CameraAngles = new Vector3(25, 0, 0);
        public const float CameraFov = 50, FormationScale = .7f, CraterRadiusX = 2.6f, CraterRadiusZ = 1.6f, WallCraterGap = 1.5f;
        private static readonly string[] Species = { "Dog", "Duck", "Rabbit", "Pig", "Sheep", "Fox" };
        private static readonly Vector3[] BaseOffsets = { new Vector3(-.55f,0,-.85f), new Vector3(.50f,0,-1.15f), new Vector3(-.05f,0,-1.65f), new Vector3(.75f,0,-2.3f), new Vector3(-.8f,0,-2.1f), new Vector3(.05f,0,-2.85f) };

        [MenuItem("Playable/Pet Rescue/Patch Round 2 (Crater, Walls, Camera)")]
        public static void PatchMenu()
        {
            if (EditorApplication.isPlaying) throw new InvalidOperationException("Stop Play Mode first.");
            Scene scene = SceneManager.GetActiveScene();
            if (scene.path != RescueSceneBuilder.ScenePath) throw new InvalidOperationException("Open " + RescueSceneBuilder.ScenePath + " first.");
            int seed = Environment.TickCount & 0x7fffffff;
            Patch(scene, seed);
            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene);
            AssetDatabase.SaveAssets();
        }

        public static void Patch(Scene scene, int wallSeed)
        {
            var world = Find(scene, "World");
            var flow = Component<RescueGameFlow>(scene);
            var course = world.GetComponent<RescueCourse>();
            if (course == null) course = world.gameObject.AddComponent<RescueCourse>();
            var tiles = CollectTiles(world);
            SetArray(course, "_tiles", tiles);
            var so = new SerializedObject(course);
            so.FindProperty("_columns").intValue = Columns; so.FindProperty("_minX").floatValue = MinX; so.FindProperty("_minZ").floatValue = MinZ;
            so.ApplyModifiedPropertiesWithoutUndo();

            var hazards = ObjectArray<RescueTntHazard>(flow, "_hazards");
            var craterZ = ConfigureCraters(course, hazards, tiles);
            var walls = BuildWalls(scene, wallSeed, craterZ);
            SetArray(course, "_walls", walls.ToArray());
            Set(flow, "_course", course);

            var camera = Component<RescueCameraFollow>(scene);
            var cam = new SerializedObject(camera);
            cam.FindProperty("_offset").vector3Value = CameraOffset;
            cam.FindProperty("_angles").vector3Value = CameraAngles;
            cam.ApplyModifiedPropertiesWithoutUndo();
            camera.GetComponent<Camera>().fieldOfView = CameraFov;
            camera.transform.position = CameraOffset; camera.transform.rotation = Quaternion.Euler(CameraAngles);

            var pets = ObjectArray<RescuePetFollower>(flow, "_pets");
            foreach (var pet in pets)
            {
                int index = Array.IndexOf(Species, pet.name);
                if (index < 0) throw new InvalidOperationException("Unknown pet " + pet.name);
                Vector3 offset = BaseOffsets[index] * FormationScale;
                var p = new SerializedObject(pet); p.FindProperty("_offset").vector3Value = offset; p.ApplyModifiedPropertiesWithoutUndo();
                pet.transform.position = offset;
            }

            var audio = Component<RescueAudioView>(scene);
            Set(audio, "_jump", Clip("Jump")); Set(audio, "_land", Clip("Land"));

            var tutorial = Component<RescueTutorialView>(scene);
            var hint = FindDeep(tutorial.transform, "Goal hint");
            if (hint == null) throw new InvalidOperationException("Tutorial Goal hint is missing.");
            Set(tutorial, "_goalHint", hint.gameObject);
            Debug.Log("PetRescue round 2 patch applied: " + walls.Count + " walls (seed " + wallSeed + "), " + hazards.Length + " craters.");
        }

        private static Transform[] CollectTiles(Transform world)
        {
            var byIndex = new Dictionary<int, Transform>();
            int maxIndex = -1;
            foreach (Transform child in world)
            {
                if (!child.name.StartsWith("Tile ")) continue;
                string[] parts = child.name.Split(' ');
                int x = int.Parse(parts[1]), z = int.Parse(parts[2]);
                int index = (z - MinZ) * Columns + (x - MinX);
                byIndex[index] = child; maxIndex = Mathf.Max(maxIndex, index);
            }
            var tiles = new Transform[maxIndex + 1];
            for (int i = 0; i < tiles.Length; i++)
                if (!byIndex.TryGetValue(i, out tiles[i])) throw new InvalidOperationException("Road tile grid has a hole at index " + i);
            return tiles;
        }

        /// Returns the z of every crater tile so walls can keep clear of crater rims.
        private static List<float> ConfigureCraters(RescueCourse course, RescueTntHazard[] hazards, Transform[] tiles)
        {
            var craterZ = new List<float>();
            var terrace = Material("Dirt"); var floor = Material("Pit");
            for (int h = 0; h < hazards.Length; h++)
            {
                var hazard = hazards[h];
                var crater = hazard.GetComponent<RescueCrater>();
                if (crater == null) crater = hazard.gameObject.AddComponent<RescueCrater>();
                Vector3 c = hazard.transform.position;
                var random = new System.Random(7919 * (h + 1));
                var indices = new List<int>(); var depths = new List<float>();
                for (int i = 0; i < tiles.Length; i++)
                {
                    Vector3 t = tiles[i].position;
                    if (Mathf.Abs(t.z - c.z) > CraterRadiusZ + 1) continue;
                    float dx = (t.x - c.x) / CraterRadiusX, dz = (t.z - c.z) / CraterRadiusZ;
                    float r = Mathf.Sqrt(dx * dx + dz * dz) + ((float)random.NextDouble() - .5f) * .3f;
                    bool center = Mathf.Abs(t.x - c.x) <= .5f && Mathf.Abs(t.z - c.z) <= .5f;
                    if (r > 1 && !center) continue;
                    craterZ.Add(t.z); indices.Add(i); depths.Add(center || r < .45f ? 1.5f : r < .75f ? 1f : .5f);
                }
                Set(crater, "_course", course); Set(crater, "_terrace", terrace); Set(crater, "_floor", floor);
                var so = new SerializedObject(crater);
                var pi = so.FindProperty("_tiles"); pi.arraySize = indices.Count;
                var pd = so.FindProperty("_depths"); pd.arraySize = depths.Count;
                for (int i = 0; i < indices.Count; i++) { pi.GetArrayElementAtIndex(i).intValue = indices[i]; pd.GetArrayElementAtIndex(i).floatValue = depths[i]; }
                so.ApplyModifiedPropertiesWithoutUndo();
                Set(hazard, "_crater", crater);
            }
            return craterZ;
        }

        /// Random cobblestone walls. A wall never touches a crater and leaves a landing gap beyond every rim,
        /// so a hero jumping out of a pit always lands on open road.
        private static List<RescueWallObstacle> BuildWalls(Scene scene, int seed, List<float> craterZ)
        {
            foreach (var root in scene.GetRootGameObjects()) if (root.name == "Walls") UnityEngine.Object.DestroyImmediate(root);
            var material = WallMaterial();
            var parent = new GameObject("Walls").transform;
            SceneManager.MoveGameObjectToScene(parent.gameObject, scene);
            var random = new System.Random(seed);
            var walls = new List<RescueWallObstacle>();
            float last = -100;
            for (float wz = 3.5f; wz <= 57; wz += .5f)
            {
                if (wz - last < 3.5f || !ClearOfCraters(wz, craterZ) || random.NextDouble() > .6) continue;
                int width = random.NextDouble() < .45 ? 2 : 1;
                int start;
                do start = random.Next(0, Columns - width + 1);
                while (wz < 6 && start <= 3 && start + width > 2); // keep the opening lane clear
                walls.Add(Wall(parent, walls.Count + 1, MinX + start + width * .5f, wz, width, material));
                last = wz;
            }
            return walls;
        }
        private static bool ClearOfCraters(float wz, List<float> craterZ)
        {
            // Wall spans wz +- .5 and each crater tile spans z +- .5. Behind a crater keep a landing gap;
            // in front of a crater the wall may stand close to the near rim but never on lowered tiles.
            foreach (float z in craterZ)
            {
                if (z <= wz && wz - z < 1 + WallCraterGap) return false;
                if (z > wz && z - wz < 1.25f) return false;
            }
            return true;
        }

        private static RescueWallObstacle Wall(Transform parent, int number, float x, float z, int width, Material material)
        {
            var wall = new GameObject("Wall " + number); wall.transform.SetParent(parent, false);
            wall.transform.position = new Vector3(x, 0, z);
            for (int column = 0; column < width; column++)
                for (int level = 0; level < 2; level++)
                {
                    var cube = GameObject.CreatePrimitive(PrimitiveType.Cube); cube.name = "Cobblestone";
                    UnityEngine.Object.DestroyImmediate(cube.GetComponent<Collider>());
                    cube.transform.SetParent(wall.transform, false);
                    cube.transform.localPosition = new Vector3(column - (width - 1) * .5f, level + .5f, 0);
                    cube.GetComponent<Renderer>().sharedMaterial = material;
                }
            var obstacle = wall.AddComponent<RescueWallObstacle>();
            var so = new SerializedObject(obstacle);
            so.FindProperty("_halfExtents").vector2Value = new Vector2(width * .5f, .5f);
            so.FindProperty("_height").floatValue = 2;
            so.ApplyModifiedPropertiesWithoutUndo();
            return obstacle;
        }

        private static Material WallMaterial()
        {
            const string path = Root + "/Materials/Cobblestone.mat";
            var texture = AssetDatabase.LoadAssetAtPath<Texture2D>(Root + "/Textures/Blocks/cobblestone.png");
            if (texture == null) throw new InvalidOperationException("Cobblestone texture is missing.");
            var material = AssetDatabase.LoadAssetAtPath<Material>(path);
            if (material == null) { material = new Material(Shader.Find("Unlit/Texture")); AssetDatabase.CreateAsset(material, path); }
            material.shader = Shader.Find("Unlit/Texture"); material.mainTexture = texture; EditorUtility.SetDirty(material);
            return material;
        }
        private static Material Material(string name)
        {
            var material = AssetDatabase.LoadAssetAtPath<Material>(Root + "/Materials/" + name + ".mat");
            if (material == null) throw new InvalidOperationException("Missing material " + name);
            return material;
        }
        private static AudioClip Clip(string name)
        {
            var clip = AssetDatabase.LoadAssetAtPath<AudioClip>(Root + "/Audio/" + name + ".ogg");
            if (clip == null) throw new InvalidOperationException("Missing sound " + name);
            return clip;
        }
        private static Transform Find(Scene scene, string name)
        {
            foreach (var root in scene.GetRootGameObjects()) if (root.name == name) return root.transform;
            throw new InvalidOperationException("Missing root " + name);
        }
        private static T Component<T>(Scene scene) where T : Component
        {
            foreach (var root in scene.GetRootGameObjects()) { var c = root.GetComponentInChildren<T>(true); if (c != null) return c; }
            throw new InvalidOperationException("Missing " + typeof(T).Name);
        }
        private static Transform FindDeep(Transform parent, string name)
        {
            foreach (var t in parent.GetComponentsInChildren<Transform>(true)) if (t.name == name) return t;
            return null;
        }
        private static T[] ObjectArray<T>(UnityEngine.Object target, string field) where T : UnityEngine.Object
        {
            var p = new SerializedObject(target).FindProperty(field);
            var values = new T[p.arraySize];
            for (int i = 0; i < values.Length; i++) values[i] = (T)p.GetArrayElementAtIndex(i).objectReferenceValue;
            return values;
        }
        private static void Set(UnityEngine.Object target, string name, UnityEngine.Object value)
        { var so = new SerializedObject(target); so.FindProperty(name).objectReferenceValue = value; so.ApplyModifiedPropertiesWithoutUndo(); }
        private static void SetArray(UnityEngine.Object target, string name, UnityEngine.Object[] values)
        { var so = new SerializedObject(target); var p = so.FindProperty(name); p.arraySize = values.Length; for (int i = 0; i < values.Length; i++) p.GetArrayElementAtIndex(i).objectReferenceValue = values[i]; so.ApplyModifiedPropertiesWithoutUndo(); }
    }
}
