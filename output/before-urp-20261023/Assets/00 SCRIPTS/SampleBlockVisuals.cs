using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

/// <summary>Geometry and materials for the ordered sample shelter blueprint.</summary>
public static class SampleBlockVisuals
{
    private static readonly Color Cream = new Color(.94f, .91f, .81f);
    private static readonly Color White = new Color(.94f, .96f, .93f);
    private static readonly Color Cherry = new Color(.91f, .63f, .56f);
    private static readonly Color CherryLight = new Color(.99f, .76f, .68f);
    private static readonly Color Stone = new Color(.46f, .47f, .46f);
    private static readonly Color StoneLight = new Color(.59f, .59f, .57f);
    private static readonly Color Mint = new Color(.45f, 1f, .78f);
    private static readonly Color Pink = new Color(1f, .75f, .81f);
    private static readonly Color Purple = new Color(.48f, .15f, .55f);
    private static readonly Color DarkPurple = new Color(.16f, .09f, .20f);
    private static Texture2D carpetTexture;
    private static Texture2D basinTexture;
    private static Texture2D cherryTexture;

    public static Bounds GetLocalBounds(BuildBlock block)
    {
        if (block.hasCustomBounds) return block.customBounds;
        switch (block.visualStyle)
        {
            case "Glow Base": return new Bounds(new Vector3(0, .005f, 0), new Vector3(1, 1.02f, 1));
            case "Pink Carpet": return new Bounds(new Vector3(0, .54f, 0), new Vector3(1, .08f, 1));
            case "White Roof Slab": return new Bounds(Vector3.zero, new Vector3(1, .5f, 1));
            case "Pink Roof Panel": return new Bounds(new Vector3(0, -.125f, 0), new Vector3(1, .25f, 1));
            case "Fence X": return new Bounds(Vector3.zero, new Vector3(1, .72f, .2f));
            case "Fence Z": return new Bounds(Vector3.zero, new Vector3(.2f, .72f, 1));
            case "Glass X": return new Bounds(Vector3.zero, new Vector3(1, 1, .12f));
            case "Glass Z": return new Bounds(Vector3.zero, new Vector3(.12f, 1, 1));
            case "Lantern": return new Bounds(new Vector3(0, .25f, 0), new Vector3(.65f, 1.5f, .65f));
            case "Sign Base": return new Bounds(new Vector3(0, 0, -.025f), new Vector3(.86f, .86f, .23f));
            case "Bone Diagonal":
            case "Bone Horizontal": return new Bounds(new Vector3(0, 0, -.13f), new Vector3(.68f, .25f, .12f));
            case "Water Fill": return new Bounds(new Vector3(0, .32f, 0), new Vector3(.76f, .06f, .76f));
            case "Water Basin": return new Bounds(new Vector3(0, -.025f, 0), new Vector3(1, 1.05f, 1));
            case "Fire Stage 1":
            case "Fire Stage 2":
            case "Fire Stage 3":
            case "Fire Stage 4": return new Bounds(new Vector3(0, .01f, -.03f), new Vector3(1.02f, 1.04f, 1.06f));
            case "Fire Panel Front": return new Bounds(new Vector3(0, 0, -.53f), new Vector3(1, 1, .12f));
            case "Fire Panel Right": return new Bounds(new Vector3(.53f, 0, 0), new Vector3(.12f, 1, 1));
            case "Fire Panel Back": return new Bounds(new Vector3(0, 0, .53f), new Vector3(1, 1, .12f));
            default: return new Bounds(Vector3.zero, Vector3.one);
        }
    }

    public static GameObject Create(BuildBlock block, bool preview, List<Material> ownedMaterials,
        Func<Color, Texture, Material> solidMaterial, float previewOpacity = .38f)
    {
        GameObject root = new GameObject(block.visualStyle);
        Material Mat(Color c, Texture t = null, bool transparent = false, float alpha = 1,
            bool glow = false)
        {
            if (!preview && !transparent && !glow && solidMaterial != null)
                return solidMaterial(c, t);
            Material m = GameplayMaterials.Create(transparentSurface: preview || transparent);
            m.name = preview ? "Ghost " + block.visualStyle : block.visualStyle;
            m.color = new Color(c.r, c.g, c.b, preview ? previewOpacity : alpha);
            if (t != null) m.mainTexture = t;
            if (preview || transparent)
            {
                m.SetFloat("_Mode", 3);
                m.SetInt("_SrcBlend", (int)BlendMode.SrcAlpha);
                m.SetInt("_DstBlend", (int)BlendMode.OneMinusSrcAlpha);
                m.SetInt("_ZWrite", 0);
                m.DisableKeyword("_ALPHATEST_ON");
                m.DisableKeyword("_ALPHABLEND_ON");
                m.EnableKeyword("_ALPHAPREMULTIPLY_ON");
                m.renderQueue = (int)RenderQueue.Transparent;
            }
            if (glow && !preview)
            {
                m.EnableKeyword("_EMISSION");
                m.SetColor("_EmissionColor", c * 1.4f);
            }
            ownedMaterials.Add(m);
            return m;
        }
        void Cube(string name, Vector3 p, Vector3 s, Material m, Quaternion? rotation = null)
        {
            GameObject item = GameObject.CreatePrimitive(PrimitiveType.Cube);
            item.name = name;
            item.transform.SetParent(root.transform, false);
            item.transform.localPosition = p;
            item.transform.localScale = s;
            if (rotation.HasValue) item.transform.localRotation = rotation.Value;
            item.GetComponent<Collider>().enabled = false;
            item.GetComponent<Renderer>().sharedMaterial = m;
        }
        void Sphere(string name, Vector3 p, Vector3 s, Material m)
        {
            GameObject item = GameObject.CreatePrimitive(PrimitiveType.Sphere);
            item.name = name;
            item.transform.SetParent(root.transform, false);
            item.transform.localPosition = p;
            item.transform.localScale = s;
            item.GetComponent<Collider>().enabled = false;
            item.GetComponent<Renderer>().sharedMaterial = m;
        }
        void Lattice(string label, Vector3 p, bool vertical)
        {
            Material wood = Mat(Color.white, LoadCherry());
            Material pale = Mat(CherryLight);
            if (vertical)
            {
                Cube(label + " frame top", p + new Vector3(0, .4f, 0), new Vector3(1, .16f, .1f), wood);
                Cube(label + " frame bottom", p + new Vector3(0, -.4f, 0), new Vector3(1, .16f, .1f), wood);
                for (int i = -1; i <= 1; i++)
                    Cube(label + " vertical", p + new Vector3(i * .43f, 0, 0),
                        new Vector3(.09f, .86f, .1f), pale);
                Cube(label + " center rail", p, new Vector3(1, .08f, .11f), wood);
            }
            else
            {
                Cube(label + " perimeter X1", p + new Vector3(0, 0, -.44f), new Vector3(1, .25f, .12f), wood);
                Cube(label + " perimeter X2", p + new Vector3(0, 0, .44f), new Vector3(1, .25f, .12f), wood);
                Cube(label + " perimeter Z1", p + new Vector3(-.44f, 0, 0), new Vector3(.12f, .25f, 1), wood);
                Cube(label + " perimeter Z2", p + new Vector3(.44f, 0, 0), new Vector3(.12f, .25f, 1), wood);
                for (int i = -1; i <= 1; i++)
                {
                    Cube(label + " grid X", p + new Vector3(i * .21f, 0, 0),
                        new Vector3(.045f, .08f, .84f), pale);
                    Cube(label + " grid Z", p + new Vector3(0, 0, i * .21f),
                        new Vector3(.84f, .08f, .045f), pale);
                }
                // A thin underside echoes the reference ceiling without closing the holes.
            }
        }

        switch (block.visualStyle)
        {
            case "Glow Base":
                Cube("White illuminated foundation", Vector3.zero, new Vector3(.98f, 1, .98f), Mat(White, null, false, 1, true));
                Cube("Mint top glow", new Vector3(0, .494f, 0),
                    new Vector3(.98f, .012f, .98f), Mat(Mint, null, false, 1, true));
                Cube("Bright white center", new Vector3(0, .503f, 0),
                    new Vector3(.84f, .012f, .84f), Mat(White, null, false, 1, true));
                break;
            case "Pink Carpet":
                Cube("Thin pink carpet, no border", new Vector3(0, .54f, 0),
                    new Vector3(.99f, .08f, .99f), Mat(Color.white, LoadCarpet()));
                break;
            case "Pale Base":
                Cube("Smooth off-white corner pedestal", Vector3.zero, Vector3.one, Mat(Cream));
                break;
            case "Fence X":
            case "Fence Z":
            {
                bool alongX = block.visualStyle == "Fence X";
                Material wood = Mat(Color.white, LoadCherry());
                Material pale = Mat(CherryLight);
                for (int i = -1; i <= 1; i++)
                {
                    float offset = i * .43f;
                    Cube("Fence post", alongX ? new Vector3(offset, 0, 0) : new Vector3(0, 0, offset),
                        alongX ? new Vector3(.09f, .72f, .15f) : new Vector3(.15f, .72f, .09f), pale);
                }
                foreach (float height in new[] { -.26f, .02f, .29f })
                    Cube("Cherry fence rail", new Vector3(0, height, 0),
                        alongX ? new Vector3(1, .1f, .13f) : new Vector3(.13f, .1f, 1), wood);
                break;
            }
            case "Stone Column":
            {
                Material stone = Mat(Stone);
                Material face = Mat(StoneLight);
                Cube("Upper stone column", Vector3.zero, new Vector3(.96f, 1, .96f), stone);
                foreach (float offset in new[] { -.25f, .25f })
                {
                    Cube("Front large stone panel", new Vector3(offset, 0, -.487f),
                        new Vector3(.47f, .94f, .025f), face);
                    Cube("Side large stone panel", new Vector3(-.487f, 0, offset),
                        new Vector3(.025f, .94f, .47f), face);
                    Cube("Back large stone panel", new Vector3(offset, 0, .487f),
                        new Vector3(.47f, .94f, .025f), face);
                    Cube("Right large stone panel", new Vector3(.487f, 0, offset),
                        new Vector3(.025f, .94f, .47f), face);
                }
                break;
            }
            case "Glass X":
            case "Glass Z":
            {
                bool alongX = block.visualStyle == "Glass X";
                Material pane = Mat(new Color(.6f, .91f, .94f), null, true, .14f);
                Material edge = Mat(new Color(.64f, .94f, .94f));
                Material glint = Mat(Color.white);
                Cube("Almost clear glass pane", Vector3.zero,
                    alongX ? new Vector3(.98f, .9f, .025f) : new Vector3(.025f, .9f, .98f), pane);
                Cube("Aqua top connector", new Vector3(0, .47f, 0),
                    alongX ? new Vector3(1, .055f, .09f) : new Vector3(.09f, .055f, 1), edge);
                Cube("Aqua bottom connector", new Vector3(0, -.47f, 0),
                    alongX ? new Vector3(1, .055f, .09f) : new Vector3(.09f, .055f, 1), edge);
                foreach (float offset in new[] { -.49f, .49f })
                    Cube("Glass to column connector", alongX ? new Vector3(offset, 0, 0) : new Vector3(0, 0, offset),
                        alongX ? new Vector3(.045f, 1, .09f) : new Vector3(.09f, 1, .045f), edge);
                Cube("Tiny glass glint", alongX ? new Vector3(-.19f, .18f, -.019f) : new Vector3(-.019f, .18f, -.19f),
                    new Vector3(.025f, .22f, .025f), glint, Quaternion.Euler(0, 0, 35));
                break;
            }
            case "White Roof Slab":
                Cube("Smooth half-height white roof", Vector3.zero, new Vector3(1, .5f, 1), Mat(White));
                break;
            case "Pink Roof Panel":
                Lattice("Pink quarter-height roof panel", new Vector3(0, -.125f, 0), false);
                break;
            case "Lantern":
            {
                Material metal = Mat(new Color(.34f, .35f, .37f));
                Material orange = Mat(new Color(1f, .55f, .14f));
                Material lamp = Mat(new Color(1f, .95f, .66f), null, false, 1, true);
                Cube("Metal hanging hook", new Vector3(0, .93f, 0), new Vector3(.18f, .11f, .18f), metal);
                Cube("Chain", new Vector3(0, .66f, 0), new Vector3(.045f, .5f, .045f), metal);
                Cube("Lantern cap", new Vector3(0, .39f, 0), new Vector3(.52f, .12f, .52f), metal);
                Cube("Orange band", new Vector3(0, .31f, 0), new Vector3(.55f, .065f, .55f), orange);
                Cube("Glowing core", new Vector3(0, -.01f, 0), new Vector3(.48f, .57f, .48f), lamp);
                Cube("Metal base", new Vector3(0, -.34f, 0), new Vector3(.55f, .11f, .55f), metal);
                if (!preview)
                {
#if !UNITY_LUNA
                    Light light = root.AddComponent<Light>();
                    light.type = LightType.Point;
                    light.color = new Color(1, .76f, .38f);
                    light.range = 4;
                    light.intensity = 2;
#endif
                }
                break;
            }
            case "Sign Base":
            {
                Material rim = Mat(new Color(.86f, .75f, .45f));
                Material darkGold = Mat(new Color(.55f, .27f, .10f));
                Material gold = Mat(new Color(.83f, .48f, .18f));
                Material center = Mat(new Color(.95f, .83f, .42f));
                Cube("Raised gold sign border", Vector3.zero, new Vector3(.86f, .86f, .17f), rim);
                Cube("Dark amber inset", new Vector3(0, 0, -.091f), new Vector3(.72f, .72f, .025f), darkGold);
                Cube("Golden center", new Vector3(0, 0, -.108f), new Vector3(.58f, .58f, .02f), gold);
                Cube("Light amber center", new Vector3(0, 0, -.124f), new Vector3(.35f, .35f, .015f), center);
                break;
            }
            case "Bone Diagonal":
            case "Bone Horizontal":
            {
                Material bone = Mat(new Color(1, .98f, .79f), null, false, 1, true);
                bool diagonal = block.visualStyle == "Bone Diagonal";
                Quaternion rotation = Quaternion.Euler(0, 0, diagonal ? 34 : 0);
                Cube("White bone shaft", new Vector3(0, 0, -.15f),
                    new Vector3(.47f, .085f, .07f), bone, rotation);
                Vector3 a = diagonal ? new Vector3(-.19f, -.13f, -.15f) : new Vector3(-.24f, 0, -.15f);
                Vector3 b = diagonal ? new Vector3(.19f, .13f, -.15f) : new Vector3(.24f, 0, -.15f);
                Sphere("Bone left", a, new Vector3(.17f, .17f, .075f), bone);
                Sphere("Bone right", b, new Vector3(.17f, .17f, .075f), bone);
                break;
            }
            case "Water Basin":
            {
                Material stone = Mat(Color.white, LoadBasin());
                Material dark = Mat(new Color(.34f, .32f, .29f));
                Cube("Water basin bottom", new Vector3(0, -.36f, 0), new Vector3(1, .22f, 1), stone);
                foreach (float side in new[] { -.44f, .44f })
                {
                    Cube("Water basin wall X", new Vector3(side, 0, 0), new Vector3(.12f, .85f, 1), stone);
                    Cube("Water basin wall Z", new Vector3(0, 0, side), new Vector3(1, .85f, .12f), stone);
                    Cube("Deep inset rim X", new Vector3(side, .44f, 0), new Vector3(.13f, .1f, 1), dark);
                    Cube("Deep inset rim Z", new Vector3(0, .44f, side), new Vector3(1, .1f, .13f), dark);
                }
                foreach (float x in new[] { -.39f, .39f })
                    foreach (float z in new[] { -.39f, .39f })
                        Cube("Short basin foot", new Vector3(x, -.49f, z),
                            new Vector3(.21f, .12f, .21f), stone);
                break;
            }
            case "Water Fill":
                Cube("Blue water surface", new Vector3(0, .32f, 0),
                    new Vector3(.76f, .06f, .76f), Mat(new Color(.1f, .48f, .86f), null, true, .82f));
                break;
            case "Fire Stage 1":
            case "Fire Stage 2":
            case "Fire Stage 3":
            case "Fire Stage 4":
            {
                int stage = block.visualStyle[block.visualStyle.Length - 1] - '0';
                Material black = Mat(DarkPurple);
                Material shell = Mat(new Color(.4f, .24f, .46f));
                Material rune = Mat(new Color(.75f, .19f, .95f), null, false, 1, stage > 1);
                Cube("Purple basin body", Vector3.zero, Vector3.one, shell);
                Cube("Open black top", new Vector3(0, .505f, 0), new Vector3(.79f, .01f, .79f), black);
                foreach (float side in new[] { -.46f, .46f })
                {
                    Cube("Purple top rim X", new Vector3(side, .48f, 0),
                        new Vector3(.1f, .09f, 1), rune);
                    Cube("Purple top rim Z", new Vector3(0, .48f, side),
                        new Vector3(1, .09f, .1f), rune);
                }
                Cube("Dark front orb recess", new Vector3(0, -.02f, -.512f),
                    new Vector3(.36f, .36f, .028f), black);
                Cube("Lower rune band", new Vector3(0, -.35f, -.518f),
                    new Vector3(.95f, .07f, .02f), rune);
                if (stage >= 2)
                {
                    Cube("Purple energized surface", new Vector3(0, .516f, 0),
                        new Vector3(.77f, .012f, .77f),
                        Mat(new Color(.6f, .17f, 1f), null, false, 1, true));
                    float diameter = stage == 2 ? .17f : stage == 3 ? .26f : .34f;
                    Sphere("Growing bright front orb", new Vector3(0, -.02f, -.533f),
                        new Vector3(diameter, diameter, .05f),
                        Mat(new Color(1f, .98f, .74f), null, false, 1, true));
                    if (!preview)
                    {
#if !UNITY_LUNA
                        Light fire = root.AddComponent<Light>();
                        fire.type = LightType.Point;
                        fire.color = new Color(.71f, .25f, 1f);
                        fire.range = 2;
                        fire.intensity = stage == 4 ? 1.6f : .8f;
#endif
                    }
                }
                break;
            }
            case "Fire Panel Front":
                Lattice("Front fire surround", new Vector3(0, 0, -.53f), true);
                break;
            case "Fire Panel Back":
                Lattice("Back fire surround", new Vector3(0, 0, .53f), true);
                break;
            case "Fire Panel Right":
            {
                GameObject panel = new GameObject("Right fire surround rotation");
                panel.transform.SetParent(root.transform, false);
                // Lattice is authored along X; rotate all generated elements around the basin.
                int before = root.transform.childCount;
                Lattice("Right fire surround", Vector3.zero, true);
                while (root.transform.childCount > before)
                {
                    Transform element = root.transform.GetChild(before);
                    element.SetParent(panel.transform, true);
                }
                panel.transform.localPosition = new Vector3(.53f, 0, 0);
                panel.transform.localRotation = Quaternion.Euler(0, 90, 0);
                break;
            }
            default:
                Cube("Block", Vector3.zero, Vector3.one, Mat(block.color));
                break;
        }
        return root;
    }

    private static Texture2D LoadCarpet()
    {
        if (carpetTexture == null)
            carpetTexture = Resources.Load<Texture2D>("DogShelterTextures/PinkCarpet");
        return carpetTexture;
    }

    private static Texture2D LoadBasin()
    {
        if (basinTexture == null)
            basinTexture = Resources.Load<Texture2D>("DogShelterTextures/WeatheredBasin");
        return basinTexture;
    }

    private static Texture2D LoadCherry()
    {
        if (cherryTexture == null)
            cherryTexture = Resources.Load<Texture2D>("DogShelterTextures/CherryWood");
        return cherryTexture;
    }
}
