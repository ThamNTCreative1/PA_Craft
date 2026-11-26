using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

public static class StealEggThreeMapCut
{
    public const float EndZ=222.85f;
    const string MeshPath="Assets/PlayableGenerated/Map_FirstThree.asset";
    struct Vertex
    {
        public Vector3 p,n;public Vector2 uv,uv2;public Vector4 tangent;public Color color;
        public static Vertex Lerp(Vertex a,Vertex b,float t){return new Vertex{p=Vector3.Lerp(a.p,b.p,t),n=Vector3.Lerp(a.n,b.n,t).normalized,uv=Vector2.Lerp(a.uv,b.uv,t),uv2=Vector2.Lerp(a.uv2,b.uv2,t),tangent=Vector4.Lerp(a.tangent,b.tangent,t),color=Color.Lerp(a.color,b.color,t)};}
    }
    [MenuItem("Steal Egg/Keep first three maps")]
    public static void ApplyToScene()
    {
        if(EditorApplication.isPlaying)throw new Exception("Stop Play mode first.");
        var scene=UnityEngine.SceneManagement.SceneManager.GetActiveScene();
        if(scene.path!=StealEggPlayableBuilder.ScenePath)throw new Exception("Open StealEggPlayable first.");
        Directory.CreateDirectory("Tools/Backups/BeforeThreeMaps");
        string backup="Tools/Backups/BeforeThreeMaps/StealEggPlayable.unity";
        if(!File.Exists(backup))File.Copy(scene.path,backup);
        Apply(UnityEngine.Object.FindFirstObjectByType<StealEggGame>());
        EditorSceneManager.SaveScene(scene);
        File.WriteAllLines("Tools/ThreeMapAssets.txt",AssetDatabase.GetDependencies(scene.path,true).OrderBy(p=>p));
        Debug.Log("THREE MAPS READY: Forest, Lake, Desert and starting houses. 15 nests, 24 egg variants.");
    }
    public static void Apply(StealEggGame game)
    {
        if(!game || game.zones.Length<3)throw new Exception("Expected at least three zones.");
        foreach(var zone in game.zones.Skip(3))if(zone.root)UnityEngine.Object.DestroyImmediate(zone.root.gameObject);
        game.zones=game.zones.Take(3).ToArray();
        Transform container=game.zones[0].root.parent;
        foreach(Transform t in container.Cast<Transform>().ToArray())if(t.name.StartsWith("SAE_Zone") && !game.zones.Any(z=>z.root==t))UnityEngine.Object.DestroyImmediate(t.gameObject);
        GameObject decoration=GameObject.Find("Tung_3D");
        if(decoration)foreach(Transform t in decoration.transform.Cast<Transform>().ToArray())if(t.position.z>EndZ)UnityEngine.Object.DestroyImmediate(t.gameObject);
        GameObject map=GameObject.Find("Map_Steal_Eggs");
        CutMesh(map.GetComponent<MeshFilter>());
        foreach(BoxCollider collider in map.GetComponentsInChildren<BoxCollider>(true))
        {
            if(collider.name=="9"){Vector3 p=collider.transform.position;p.z=EndZ;collider.transform.position=p;continue;}
            if(collider.bounds.max.z<=EndZ)continue;
            Vector3 min=collider.bounds.min,max=collider.bounds.max;max.z=EndZ;
            Vector3 a=collider.transform.InverseTransformPoint(min),b=collider.transform.InverseTransformPoint(max);
            collider.center=(a+b)*.5f;collider.size=new Vector3(Mathf.Abs(b.x-a.x),Mathf.Abs(b.y-a.y),Mathf.Abs(b.z-a.z));
        }
        GameObject fence=GameObject.Find("End of Desert");
        if(!fence)
        {
            fence=GameObject.CreatePrimitive(PrimitiveType.Cube);fence.name="End of Desert";
        }
        fence.GetComponent<Renderer>().sharedMaterial=AssetDatabase.LoadAssetAtPath<Material>("Assets/Lego/Caro Materials/Dirt Surface 6.mat");
        // Set dimensions in world space: the map parent is scaled to 0.4.
        fence.transform.SetParent(null,true);
        fence.transform.SetPositionAndRotation(new Vector3(0,7.59034f,EndZ-1),Quaternion.identity);
        fence.transform.localScale=new Vector3(70,15.58068f,2);
        fence.transform.SetParent(map.transform,true);
        fence.GetComponent<BoxCollider>().enabled=true;
        fence.GetComponent<BoxCollider>().isTrigger=false;
        BakeEndWallUV(fence);
        BakeEndWallRim(fence);
        EditorUtility.SetDirty(game);AssetDatabase.SaveAssets();
    }
    public static void BakeEndWallUV(GameObject fence)
    {
        BakeWallMesh(fence,"Assets/PlayableGenerated/DesertEndWall.asset");
    }
    public static void BakeEndWallRim(GameObject fence)
    {
        Transform rim=fence.transform.Find("Desert top rim");
        if(!rim)
        {
            var cube=GameObject.CreatePrimitive(PrimitiveType.Cube);
            cube.name="Desert top rim";
            UnityEngine.Object.DestroyImmediate(cube.GetComponent<BoxCollider>());
            rim=cube.transform;
            rim.SetParent(fence.transform,false);
        }
        // Match the 0.8 m band on the side walls and let the lip project slightly.
        Vector3 size=fence.transform.lossyScale;
        rim.localPosition=new Vector3(0,.5f-.39f/size.y,0);
        rim.localScale=new Vector3(1+.16f/size.x,.8f/size.y,1+.16f/size.z);
        rim.GetComponent<Renderer>().sharedMaterial=AssetDatabase.LoadAssetAtPath<Material>("Assets/Lego/Caro Materials/Dirt Surface 0.mat");
        BakeWallMesh(rim.gameObject,"Assets/PlayableGenerated/DesertEndWallRim.asset");
    }
    static void BakeWallMesh(GameObject fence,string path)
    {
        // Desert side walls use about 2.941 UV units per world metre before material tiling.
        const float density=1f/.34f;
        MeshFilter filter=fence.GetComponent<MeshFilter>();
        Mesh mesh=UnityEngine.Object.Instantiate(filter.sharedMesh);
        mesh.name=Path.GetFileNameWithoutExtension(path);
        Vector3[] vertices=mesh.vertices,normals=mesh.normals;
        Vector2[] uv=new Vector2[vertices.Length];
        Vector3 size=fence.transform.lossyScale;
        for(int i=0;i<vertices.Length;i++)
        {
            Vector3 p=Vector3.Scale(vertices[i],size),n=normals[i];
            if(Mathf.Abs(n.z)>.5f)uv[i]=new Vector2(p.x,-p.y)*density;
            else if(Mathf.Abs(n.x)>.5f)uv[i]=new Vector2(p.z,-p.y)*density;
            else uv[i]=new Vector2(p.x,p.z)*density;
        }
        mesh.uv=uv;mesh.RecalculateTangents();
        Mesh saved=AssetDatabase.LoadAssetAtPath<Mesh>(path);
        if(saved){EditorUtility.CopySerialized(mesh,saved);UnityEngine.Object.DestroyImmediate(mesh);}
        else{AssetDatabase.CreateAsset(mesh,path);saved=mesh;}
        filter.sharedMesh=saved;
        EditorUtility.SetDirty(filter);EditorUtility.SetDirty(saved);
        AssetDatabase.SaveAssets();
    }
    static void CutMesh(MeshFilter filter)
    {
        if(AssetDatabase.GetAssetPath(filter.sharedMesh)==MeshPath)return;
        Mesh src=filter.sharedMesh;var p=src.vertices;var n=src.normals;var uv=src.uv;var uv2=src.uv2;var tangent=src.tangents;var color=src.colors;
        var verts=new List<Vertex>();var submeshes=new List<int[]>();var materials=new List<Material>();
        Material[] originalMaterials=filter.GetComponent<Renderer>().sharedMaterials;
        for(int s=0;s<src.subMeshCount;s++)
        {
            var indices=new List<int>();int[] triangles=src.GetTriangles(s);
            for(int i=0;i<triangles.Length;i+=3)
            {
                var input=new List<Vertex>();
                for(int j=0;j<3;j++){int k=triangles[i+j];input.Add(new Vertex{p=p[k],n=n.Length>k?n[k]:Vector3.up,uv=uv.Length>k?uv[k]:Vector2.zero,uv2=uv2.Length>k?uv2[k]:Vector2.zero,tangent=tangent.Length>k?tangent[k]:Vector4.zero,color=color.Length>k?color[k]:Color.white});}
                var polygon=new List<Vertex>();
                for(int j=0;j<3;j++)
                {
                    Vertex a=input[j],b=input[(j+1)%3];float az=filter.transform.TransformPoint(a.p).z,bz=filter.transform.TransformPoint(b.p).z;
                    bool insideA=az<=EndZ,insideB=bz<=EndZ;
                    if(insideA)polygon.Add(a);
                    if(insideA!=insideB)polygon.Add(Vertex.Lerp(a,b,(EndZ-az)/(bz-az)));
                }
                if(polygon.Count<3)continue;
                int start=verts.Count;verts.AddRange(polygon);
                for(int j=1;j<polygon.Count-1;j++){indices.Add(start);indices.Add(start+j);indices.Add(start+j+1);}
            }
            if(indices.Count>0){submeshes.Add(indices.ToArray());materials.Add(originalMaterials[s]);}
        }
        var mesh=new Mesh{name="Map_FirstThree",indexFormat=UnityEngine.Rendering.IndexFormat.UInt32};
        mesh.SetVertices(verts.Select(v=>v.p).ToList());mesh.SetNormals(verts.Select(v=>v.n).ToList());mesh.SetUVs(0,verts.Select(v=>v.uv).ToList());mesh.SetUVs(1,verts.Select(v=>v.uv2).ToList());mesh.SetTangents(verts.Select(v=>v.tangent).ToList());mesh.SetColors(verts.Select(v=>v.color).ToList());
        mesh.subMeshCount=submeshes.Count;for(int i=0;i<submeshes.Count;i++)mesh.SetTriangles(submeshes[i],i);mesh.RecalculateBounds();
        Mesh existing=AssetDatabase.LoadAssetAtPath<Mesh>(MeshPath);
        if(existing){EditorUtility.CopySerialized(mesh,existing);UnityEngine.Object.DestroyImmediate(mesh);mesh=existing;}else AssetDatabase.CreateAsset(mesh,MeshPath);
        filter.sharedMesh=mesh;filter.GetComponent<Renderer>().sharedMaterials=materials.ToArray();
        foreach(MeshCollider collider in filter.GetComponents<MeshCollider>())collider.sharedMesh=mesh;
    }
}
