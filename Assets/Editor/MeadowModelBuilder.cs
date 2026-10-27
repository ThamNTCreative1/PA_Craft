using UnityEngine;
using UnityEditor;

// Editor-only: two shared quad cards with pixel-art alpha cutout.
public static class MeadowModelBuilder
{
    static Material FlowerVariant(string name, Color color)
    {
        string path="Assets/Gameplay Map/"+name+".mat";
        var material=AssetDatabase.LoadAssetAtPath<Material>(path);
        if(material==null)
        {
            var source=AssetDatabase.LoadAssetAtPath<Material>("Assets/Gameplay Map/MeadowFlowerPixel.mat");
            if(source==null) throw new System.InvalidOperationException("Missing flower material.");
            material=new Material(source);AssetDatabase.CreateAsset(material,path);
        }
        material.SetFloat("_RecolorPetals",1);
        material.SetColor("_PetalColor",color);
        EditorUtility.SetDirty(material);
        return material;
    }

    public static int AddColoredFlowers(GameObject root)
    {
        var group=root.transform.Find("Meadow Decor");
        if(group==null) throw new System.InvalidOperationException("Missing meadow.");
        var pink=FlowerVariant("MeadowFlowerPink",new Color(1f,.32f,.62f));
        var red=FlowerVariant("MeadowFlowerRed",new Color(.95f,.055f,.045f));
        Transform source=null;
        foreach(Transform plant in group)
        {
            if(plant.name=="Pink Flower" || plant.name=="Red Flower") return 0;
            if(plant.name=="Yellow Flower") source=plant;
        }
        if(source==null) throw new System.InvalidOperationException("Missing yellow flower model.");
        int candidates=group.childCount,index=0,added=0;
        for(int i=0;i<candidates && added<48;i++)
        {
            var anchor=group.GetChild(i);
            if(anchor.name!="Grass Tuft" || index++%4!=0) continue;
            var plant=Object.Instantiate(source.gameObject,group);
            bool isPink=added%2==0;
            plant.name=isPink?"Pink Flower":"Red Flower";
            // Stay inside the same ground cell, so flowers remain grounded on stepped hills.
            var pos=anchor.localPosition;
            pos.x=Mathf.Floor(pos.x)+.22f;
            pos.z=Mathf.Floor(pos.z)+.78f;
            plant.transform.localPosition=pos;
            plant.transform.localRotation=Quaternion.Euler(0,(added%4)*90,0);
            foreach(var renderer in plant.GetComponentsInChildren<Renderer>())
            {
                renderer.sharedMaterial=isPink?pink:red;
                renderer.gameObject.layer=0; // Flowers stay excluded from wet-ground reflections.
            }
            added++;
        }
        return added;
    }

    static Material PixelMaterial(string name)
    {
        string texturePath="Assets/Gameplay Map/"+name+".png";
        var importer=AssetImporter.GetAtPath(texturePath) as TextureImporter;
        if(importer==null) throw new System.InvalidOperationException("Missing "+texturePath);
        importer.textureType=TextureImporterType.Default;
        importer.alphaSource=TextureImporterAlphaSource.FromInput;
        importer.alphaIsTransparency=true;
        importer.maxTextureSize=32;
        importer.filterMode=FilterMode.Point;
        importer.mipmapEnabled=false;
        importer.wrapMode=TextureWrapMode.Clamp;
        importer.textureCompression=TextureImporterCompression.Uncompressed;
        importer.SaveAndReimport();
        var shader=Shader.Find("Craft/LeavesCutout");
        if(shader==null) throw new System.InvalidOperationException("Missing foliage cutout shader.");
        string path="Assets/Gameplay Map/"+name+".mat";
        var material=AssetDatabase.LoadAssetAtPath<Material>(path);
        if(material==null){material=new Material(shader);AssetDatabase.CreateAsset(material,path);}
        material.shader=shader;
        material.mainTexture=AssetDatabase.LoadAssetAtPath<Texture2D>(texturePath);
        material.mainTextureScale=Vector2.one;material.mainTextureOffset=Vector2.zero;
        material.color=name=="MeadowGrassPixel" ? new Color(.95f,1.4f,.72f,1) : Color.white;
        material.SetFloat("_Cutoff",.5f);
        material.renderQueue=2450;material.SetOverrideTag("RenderType","TransparentCutout");
        EditorUtility.SetDirty(material);
        return material;
    }
    public static int Rebuild(GameObject root)
    {
        var group=root.transform.Find("Meadow Decor");
        if(group==null) throw new System.InvalidOperationException("Missing meadow decorations.");
        var grass=PixelMaterial("MeadowGrassPixel");
        var flower=PixelMaterial("MeadowFlowerPixel");
        var pink=FlowerVariant("MeadowFlowerPink",new Color(1f,.32f,.62f));
        var red=FlowerVariant("MeadowFlowerRed",new Color(.95f,.055f,.045f));
        const string meshPath="Assets/Gameplay Map/MeadowPixelQuad.asset";
        var mesh=AssetDatabase.LoadAssetAtPath<Mesh>(meshPath);
        if(mesh==null)
        {
            mesh=new Mesh();mesh.name="MeadowPixelQuad";
            mesh.vertices=new[]{new Vector3(-.4f,0,0),new Vector3(.4f,0,0),new Vector3(-.4f,.8f,0),new Vector3(.4f,.8f,0)};
            mesh.uv=new[]{new Vector2(0,0),new Vector2(1,0),new Vector2(0,1),new Vector2(1,1)};
            mesh.triangles=new[]{0,2,1,1,2,3};mesh.RecalculateNormals();mesh.RecalculateBounds();
            AssetDatabase.CreateAsset(mesh,meshPath);
        }
        int index=0;
        foreach(Transform plant in group)
        {
            bool isFlower=plant.name.ToLowerInvariant().Contains("flower");
            var flowerMaterial=plant.name=="Pink Flower"?pink:plant.name=="Red Flower"?red:flower;
            for(int i=plant.childCount-1;i>=0;i--) Object.DestroyImmediate(plant.GetChild(i).gameObject);
            plant.name=isFlower ? (flowerMaterial==pink?"Pink Flower":flowerMaterial==red?"Red Flower":"Yellow Flower") : "Grass Tuft";
            for(int plane=0;plane<2;plane++)
            {
                var card=new GameObject("Cross plane "+(plane+1),typeof(MeshFilter),typeof(MeshRenderer));
                card.transform.SetParent(plant,false);
                card.transform.localRotation=Quaternion.Euler(0,45+plane*90,0);
                card.GetComponent<MeshFilter>().sharedMesh=mesh;
                var r=card.GetComponent<MeshRenderer>();r.sharedMaterial=isFlower?flowerMaterial:grass;
                r.shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;
            }
            float scale=.85f+(index%5)*.075f;plant.localScale=Vector3.one*scale;
            index++;
        }
        return index;
    }
}
