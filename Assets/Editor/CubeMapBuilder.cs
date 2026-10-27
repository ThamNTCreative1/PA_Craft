using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement;

// Editor-only authoring. The saved map contains standard Cube objects, no runtime generator.
public static class CubeMapBuilder
{
    static Material grass, dirt, bark, leaves, grassSide;
    static void Cube(Transform parent, string name, Vector3 position, Vector3 size, Material material)
    {
        var go = GameObject.CreatePrimitive(PrimitiveType.Cube);
        go.name = name;
        go.transform.SetParent(parent, false);
        go.transform.localPosition = position;
        go.transform.localScale = size;
        Object.DestroyImmediate(go.GetComponent<Collider>());
        var renderer = go.GetComponent<MeshRenderer>();
        renderer.sharedMaterial = material;
        renderer.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
    }
    static Material Material(string name, Vector2 tile, Color color)
    {
        string path = "Assets/Gameplay Map/" + name + ".mat";
        var m = AssetDatabase.LoadAssetAtPath<Material>(path);
        if (m == null) { m = new Material(Shader.Find("Universal Render Pipeline/Lit")); AssetDatabase.CreateAsset(m, path); }
        m.mainTexture = AssetDatabase.LoadAssetAtPath<Texture2D>("Assets/Resources/CraftMap/EnvironmentAtlas.png");
        m.mainTextureScale = Vector2.one * (0.5f - 1f / 128f);
        m.mainTextureOffset = tile + Vector2.one * (0.5f / 128f);
        m.color = color;
        m.SetFloat("_Smoothness", name == "CubeGrass" ? .18f : 0f);
        EditorUtility.SetDirty(m);
        return m;
    }
    static void Tree(Transform root, int x, int z, int floor, int height)
    {
        var group = new GameObject("Birch " + x + "," + z).transform;
        group.SetParent(root, false);
        for (int y = 0; y < height; y++)
            Cube(group, "Trunk", new Vector3(x + .5f, floor + y + .5f, z + .5f), Vector3.one, bark);
        for (int y = 0; y < 3; y++)
            for (int dx = -1; dx <= 1; dx++)
                for (int dz = -1; dz <= 1; dz++)
                {
                    if (y == 2 && Mathf.Abs(dx) + Mathf.Abs(dz) > 1) continue;
                    if (y == 0 && dx == 0 && dz == 0) continue;
                    Cube(group, "Leaves", new Vector3(x + dx + .5f, floor + height - .5f + y, z + dz + .5f), Vector3.one, leaves);
                }
    }
    public static string Build()
    {
        if (EditorApplication.isPlaying) return "Stop Play Mode before rebuilding map.";
        grass = Material("CubeGrass", new Vector2(0,.5f), Color.white);
        grass.mainTexture = AssetDatabase.LoadAssetAtPath<Texture2D>("Assets/Gameplay Map/GrassTopSmooth.png");
        grass.mainTextureScale = Vector2.one;
        grass.mainTextureOffset = Vector2.zero;
        EditorUtility.SetDirty(grass);
        dirt = Material("CubeDirt", new Vector2(.5f,.5f), Color.white);
        dirt.mainTexture = AssetDatabase.LoadAssetAtPath<Texture2D>("Assets/Gameplay Map/DirtSmooth.png");
        dirt.mainTextureScale = Vector2.one;
        dirt.mainTextureOffset = Vector2.zero;
        EditorUtility.SetDirty(dirt);
        grassSide = Material("CubeGrassSide", Vector2.zero, Color.white);
        grassSide.shader = Shader.Find("Craft/UprightCubeSoil");
        grassSide.mainTexture = AssetDatabase.LoadAssetAtPath<Texture2D>("Assets/Gameplay Map/GrassDirtSide.png");
        grassSide.mainTextureScale = Vector2.one;
        grassSide.mainTextureOffset = Vector2.zero;
        EditorUtility.SetDirty(grassSide);
        bark = Material("CubeBirch", Vector2.zero, Color.white);
        bark.mainTexture = AssetDatabase.LoadAssetAtPath<Texture2D>("Assets/Gameplay Map/WhiteBarkSimple.png");
        bark.mainTextureScale = Vector2.one;
        bark.mainTextureOffset = Vector2.zero;
        EditorUtility.SetDirty(bark);
        leaves = Material("CubeLeaves", new Vector2(.5f,0), new Color(.85f,1,.85f));
        leaves.shader = Shader.Find("Craft/LeavesCutout");
        leaves.mainTexture = AssetDatabase.LoadAssetAtPath<Texture2D>("Assets/Gameplay Map/LeavesNatural.png");
        leaves.mainTextureScale = Vector2.one;
        leaves.mainTextureOffset = Vector2.zero;
        leaves.color = Color.white;
        leaves.SetFloat("_Cutoff", .5f);
        leaves.renderQueue = 2450;
        leaves.SetOverrideTag("RenderType", "TransparentCutout");
        EditorUtility.SetDirty(leaves);
        var root = new GameObject("Gameplay Map");
        var terrain = new GameObject("Grass and earth blocks").transform;
        terrain.SetParent(root.transform, false);
        for (int x = -12; x < 12; x++)
            for (int z = -10; z < 16; z++)
            {
                bool foundation = x >= -1 && x < 1 && z >= 0 && z < 2;
                if (foundation) { Cube(terrain,"Excavation floor",new Vector3(x+.5f,-1.5f,z+.5f),Vector3.one,dirt); continue; }
                int height = z >= 10 ? 1 + ((z >= 13 && (x < -4 || x > 3)) ? 1 : 0) : 0;
                // A thin grass cube over a dirt cube gives different top/side textures
                // while retaining Unity's untouched built-in cube UVs and mesh.
                for (int y = -1; y < height; y++)
                    Cube(terrain,"Earth",new Vector3(x+.5f,y+(y == height-1 ? .49f : .5f),z+.5f),new Vector3(1,y == height-1 ? .98f : 1,1),y == height-1 ? grassSide : dirt);
                Cube(terrain,"Grass",new Vector3(x+.5f,height-.01f,z+.5f),new Vector3(1,.02f,1),grass);
            }
        Tree(root.transform,-8,11,1,4); Tree(root.transform,-3,12,1,4);
        Tree(root.transform,3,12,1,5); Tree(root.transform,8,13,2,4);
        Tree(root.transform,-10,5,0,4); Tree(root.transform,9,6,0,4);
        Tree(root.transform,-11,-3,0,3); Tree(root.transform,10,-2,0,4);
        AddBrownTrees(root);
        DiversifyCanopies(root);
        ExpandMapAndHill(root);
        AddMeadowDecor(root);
        MeadowModelBuilder.Rebuild(root);
        MeadowModelBuilder.AddColoredFlowers(root);
        // Replace only the old map; building/controller/camera remain untouched.
        foreach (var old in root.scene.GetRootGameObjects())
            if (old != root && old.name == "Gameplay Map") Object.DestroyImmediate(old);
        var prefab = PrefabUtility.SaveAsPrefabAssetAndConnect(root,"Assets/Gameplay Map/GameplayMap.prefab",InteractionMode.AutomatedAction);
        AssetDatabase.SaveAssets();
        EditorSceneManager.SaveScene(root.scene);
        return "Saved cube map: " + root.GetComponentsInChildren<MeshFilter>().Length + " blocks, shared built-in Cube mesh.";
    }

    // Baked in the Editor: 20 additional unit cells on each edge of the original map.
    public static int ExpandMapAndHill(GameObject root)
    {
        const string groupName = "Map Extension 20 blocks";
        if (root.transform.Find(groupName) != null)
            throw new System.InvalidOperationException("Map extension already exists; refusing to duplicate it.");
        var topMaterial = AssetDatabase.LoadAssetAtPath<Material>("Assets/Gameplay Map/CubeGrass.mat");
        var sideMaterial = AssetDatabase.LoadAssetAtPath<Material>("Assets/Gameplay Map/CubeGrassSide.mat");
        var earthMaterial = AssetDatabase.LoadAssetAtPath<Material>("Assets/Gameplay Map/CubeDirt.mat");
        if (topMaterial == null || sideMaterial == null || earthMaterial == null)
            throw new System.InvalidOperationException("Missing terrain materials.");
        var terrain = new GameObject(groupName).transform;
        terrain.SetParent(root.transform, false);
        for (int x = -32; x < 32; x++)
            for (int z = -30; z < 36; z++)
            {
                if (x >= -12 && x < 12 && z >= -10 && z < 16) continue;
                // Preserve the inner boundary; rise into irregular ridges toward all four edges.
                int edgeX = Mathf.Clamp(x, -12, 11);
                int edgeZ = Mathf.Clamp(z, -10, 15);
                int edgeHeight = edgeZ >= 10 ? 1 + ((edgeZ >= 13 && (edgeX < -4 || edgeX > 3)) ? 1 : 0) : 0;
                int distance = Mathf.Max(Mathf.Abs(x - edgeX), Mathf.Abs(z - edgeZ));
                float progress = Mathf.Clamp01((distance - 1f) / 19f);
                float broad = Mathf.PerlinNoise((x + 93f) * .105f, (z + 71f) * .105f);
                float detail = Mathf.PerlinNoise((x + 173f) * .24f, (z + 217f) * .24f);
                float rise = progress * 8f + Mathf.Sin(progress * Mathf.PI * .5f) *
                    ((broad - .5f) * 5f + (detail - .5f) * 1.5f);
                int height = edgeHeight + Mathf.Max(0, Mathf.RoundToInt(rise));
                // Small stepped hill immediately behind the raised northern ground.
                if (z >= 16)
                {
                    float radius = Mathf.Sqrt((x - 4f) * (x - 4f) / 49f + (z - 19f) * (z - 19f) / 36f);
                    int hill = radius < .3f ? 4 : radius < .6f ? 3 : radius < .85f ? 2 : radius < 1.15f ? 1 : 0;
                    height = Mathf.Max(height, hill);
                }
                // Use a scaled built-in cube for buried soil, rather than thousands of hidden cubes.
                // Keep the top unit separate so the grass fringe never stretches down the cliff.
                if (height > 0)
                    Cube(terrain, "Earth column", new Vector3(x+.5f, height*.5f-1f,z+.5f),
                        new Vector3(1,height,1), earthMaterial);
                Cube(terrain, "Earth", new Vector3(x+.5f,height-.51f,z+.5f),
                    new Vector3(1,.98f,1), sideMaterial);
                Cube(terrain, "Grass", new Vector3(x+.5f,height-.01f,z+.5f), new Vector3(1,.02f,1), topMaterial);
            }
        return terrain.childCount;
    }

    static Material MeadowMaterial(string name, Color color)
    {
        string path = "Assets/Gameplay Map/" + name + ".mat";
        var material = AssetDatabase.LoadAssetAtPath<Material>(path);
        if (material != null) return material;
        var shader = Shader.Find("Universal Render Pipeline/Lit");
        if (shader == null) throw new System.InvalidOperationException("Missing URP Lit shader.");
        material = new Material(shader);
        material.color = color;
        material.SetFloat("_Smoothness", 0);
        material.SetFloat("_SpecularHighlights", 0);
        material.EnableKeyword("_SPECULARHIGHLIGHTS_OFF");
        AssetDatabase.CreateAsset(material, path);
        return material;
    }

    public static int AddMeadowDecor(GameObject root)
    {
        if (root.transform.Find("Meadow Decor") != null)
            throw new System.InvalidOperationException("Meadow decorations already exist.");
        var green = MeadowMaterial("MeadowGreen", new Color(.28f,.48f,.10f));
        var lightGreen = MeadowMaterial("MeadowLightGreen", new Color(.43f,.59f,.17f));
        var yellow = MeadowMaterial("MeadowYellow", new Color(1f,.72f,.12f));
        var petals = new[] {
            MeadowMaterial("MeadowWhite", new Color(.98f,.94f,.78f)),
            MeadowMaterial("MeadowRed", new Color(.86f,.18f,.16f)),
            MeadowMaterial("MeadowPurple", new Color(.65f,.35f,.82f)) };
        var group = new GameObject("Meadow Decor").transform;
        group.SetParent(root.transform, false);
        var random = new System.Random(1729);
        var ground = root.GetComponentsInChildren<Transform>();
        int count = 0;
        foreach (var tile in ground)
        {
            if (tile.name != "Grass") continue;
            var p = root.transform.InverseTransformPoint(tile.position);
            // Keep construction and the immediate approach unobstructed.
            if (Mathf.Abs(p.x) < 4.5f && p.z > -5f && p.z < 6f) continue;
            float patch = Mathf.PerlinNoise((p.x+72f)*.16f,(p.z+29f)*.16f);
            if (random.NextDouble() > (patch > .48f ? .13 : .025)) continue;
            bool blocked = false;
            foreach (Transform tree in root.transform)
            {
                if (!tree.name.StartsWith("Birch ") && !tree.name.StartsWith("Brown Tree ")) continue;
                foreach (Transform trunk in tree)
                {
                    if (trunk.name != "Trunk") continue;
                    var tp = root.transform.InverseTransformPoint(trunk.position);
                    if (Mathf.Abs(tp.x-p.x)<.8f && Mathf.Abs(tp.z-p.z)<.8f) blocked=true;
                    break;
                }
            }
            if (blocked) continue;
            p += new Vector3((float)random.NextDouble()*.35f-.175f,.01f,(float)random.NextDouble()*.35f-.175f);
            bool flower = random.NextDouble() < .32;
            var plant = new GameObject(flower ? "Voxel flower" : "Grass tuft").transform;
            plant.SetParent(group,false);
            plant.localPosition = p;
            plant.localRotation = Quaternion.Euler(0,random.Next(4)*90,0);
            float h = .28f+(float)random.NextDouble()*.18f;
            if (flower)
            {
                Cube(plant,"Stem",new Vector3(0,h*.5f,0),new Vector3(.045f,h,.045f),green);
                Cube(plant,"Leaf",new Vector3(.07f,h*.4f,0),new Vector3(.14f,.045f,.08f),lightGreen);
                var petal = petals[random.Next(petals.Length)];
                Cube(plant,"Petals",new Vector3(0,h,0),new Vector3(.25f,.065f,.12f),petal);
                Cube(plant,"Petal front",new Vector3(0,h,.0925f),new Vector3(.12f,.065f,.065f),petal);
                Cube(plant,"Petal back",new Vector3(0,h,-.0925f),new Vector3(.12f,.065f,.065f),petal);
                Cube(plant,"Pollen",new Vector3(0,h+.045f,0),new Vector3(.09f,.025f,.09f),yellow);
            }
            else
            {
                Cube(plant,"Blade",new Vector3(0,h*.5f,0),new Vector3(.07f,h,.07f),green);
                Cube(plant,"Blade",new Vector3(-.13f,h*.32f,.045f),new Vector3(.07f,h*.64f,.07f),lightGreen);
                Cube(plant,"Blade",new Vector3(.12f,h*.4f,-.06f),new Vector3(.07f,h*.8f,.07f),green);
            }
            count++;
        }
        return count;
    }

    public static int DiversifyCanopies(GameObject root)
    {
        var material = AssetDatabase.LoadAssetAtPath<Material>("Assets/Gameplay Map/CubeLeaves.mat");
        int index = 0;
        foreach (Transform tree in root.transform)
        {
            if (!tree.name.StartsWith("Birch ") && !tree.name.StartsWith("Brown Tree ")) continue;
            Transform top = null;
            foreach (Transform child in tree)
                if (child.name == "Trunk" && (top == null || child.localPosition.y > top.localPosition.y)) top = child;
            if (top == null) continue;
            for (int i = tree.childCount - 1; i >= 0; i--)
                if (tree.GetChild(i).name == "Leaves") Object.DestroyImmediate(tree.GetChild(i).gameObject);
            int variant = index % 4;
            int layers = variant == 2 ? 5 : variant == 1 ? 2 : 3;
            for (int y = 0; y < layers; y++)
                for (int x = -2; x <= 2; x++)
                    for (int z = -2; z <= 2; z++)
                    {
                        bool include;
                        if (variant == 0) // Rounded stepped crown.
                            include = x*x + z*z <= (y == 1 ? 5 : 2);
                        else if (variant == 1) // Wide, flattened oval.
                            include = x*x + 2*z*z <= (y == 0 ? 6 : 3);
                        else if (variant == 2) // Tall taper with a narrow tip.
                            include = x*x + z*z <= (y == 0 ? 5 : y < 3 ? 2 : y == 3 ? 1 : 0);
                        else // Off-centre crown with two uneven lobes.
                            include = (x*x + z*z <= (y == 2 ? 1 : 2)) ||
                                (y < 2 && (x-1)*(x-1) + (z-1)*(z-1) <= 2);
                        if (!include || (y == 0 && x == 0 && z == 0)) continue;
                        // Alternate the broad axis without changing the trunk.
                        var offset = index % 2 == 0 ? new Vector3(x,y,z) : new Vector3(z,y,-x);
                        Cube(tree, "Leaves", top.localPosition + offset, Vector3.one, material);
                    }
            index++;
        }
        return index;
    }

    public static void AddBrownTrees(GameObject root)
    {
        var source = root.transform.Find("Birch -10,5");
        var brown = AssetDatabase.LoadAssetAtPath<Material>("Assets/Gameplay Map/CubeBrownBark.mat");
        if (source == null || brown == null) throw new System.InvalidOperationException("Missing tree or brown bark material.");
        var positions = new[] { new Vector3(-7,0,-6), new Vector3(7,0,-6), new Vector3(-6,0,6), new Vector3(0,1,14) };
        for (int i = 0; i < positions.Length; i++)
        {
            string name = "Brown Tree " + (i + 1);
            if (root.transform.Find(name) != null) continue;
            var tree = Object.Instantiate(source.gameObject, root.transform);
            tree.name = name;
            tree.transform.localPosition = positions[i] - new Vector3(-10,0,5);
            foreach (Transform child in tree.transform)
                if (child.name == "Trunk") child.GetComponent<Renderer>().sharedMaterial = brown;
        }
    }
}
