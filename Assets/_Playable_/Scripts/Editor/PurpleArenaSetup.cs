using System;
using System.Linq;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.Rendering;
using Object = UnityEngine.Object;

public static class PurpleArenaSetup
{
    const string Output = "Assets/_Playable_/StealHatch/";
    // Remove unreferenced data without changing any rendered triangle or material.
    public static Material[] Compact(Mesh mesh, Material[] materials)
    {
        var sourceVertices = mesh.vertices;
        var sourceNormals = mesh.normals;
        var sourceUv = mesh.uv;
        var remap = new System.Collections.Generic.Dictionary<int, int>();
        var vertices = new System.Collections.Generic.List<Vector3>();
        var normals = new System.Collections.Generic.List<Vector3>();
        var uv = new System.Collections.Generic.List<Vector2>();
        var submeshes = new System.Collections.Generic.List<int[]>();
        var usedMaterials = new System.Collections.Generic.List<Material>();
        for (int s = 0; s < mesh.subMeshCount; s++)
        {
            var indices = mesh.GetTriangles(s);
            if (indices.Length == 0) continue;
            for (int i = 0; i < indices.Length; i++)
            {
                int source = indices[i];
                if (!remap.TryGetValue(source, out int target))
                {
                    target = vertices.Count;
                    remap.Add(source, target);
                    vertices.Add(sourceVertices[source]);
                    normals.Add(sourceNormals[source]);
                    uv.Add(sourceUv[source]);
                }
                indices[i] = target;
            }
            submeshes.Add(indices);
            usedMaterials.Add(materials[s]);
        }
        mesh.Clear();
        mesh.indexFormat = vertices.Count <= 65535 ? IndexFormat.UInt16 : IndexFormat.UInt32;
        mesh.SetVertices(vertices); mesh.SetNormals(normals); mesh.SetUVs(0, uv);
        mesh.subMeshCount = submeshes.Count;
        for (int s = 0; s < submeshes.Count; s++) mesh.SetTriangles(submeshes[s], s);
        mesh.RecalculateBounds();
        EditorUtility.SetDirty(mesh);
        return usedMaterials.ToArray();
    }
    [MenuItem("Tools/Playable/Steal and Hatch/Apply Original Purple Arena")]
    public static void Apply()
    {
        var scene = EditorSceneManager.GetActiveScene();
        if(EditorApplication.isPlaying || scene.path != "Assets/_Playable_/Scenes/Gameplay.unity") throw new Exception("Open Gameplay in Edit mode.");
        var map = GameObject.Find("Steal and Hatch Map").transform;
        var old = map.Find("Guarded Nests - Sakura");
        if(old == null) throw new Exception("Sakura section not found.");
        EditorSceneManager.SaveScene(scene,"Temp/StealHatch/Before-Purple-Arena.unity",true);
        var source = AssetDatabase.LoadAssetAtPath<GameObject>("Assets/_Playable_/3D Model/Animal/Steal an egg/Map_Steal_Eggs.prefab");
        var original = source.GetComponent<MeshFilter>().sharedMesh;
        var vertices = original.vertices;
        // Original purple arena boundaries. Copy complete triangles without stretching or reshaping.
        const float from = 1116.41f, to = 1501.63f;
        float scale = source.transform.localScale.z;
        float start = old.position.z, end = start + (to-from)*scale;
        float previousEnd = map.Find("Sakura End Wall").position.z;
        var mesh = new Mesh { name="Original Purple Arena", indexFormat=IndexFormat.UInt32 };
        mesh.vertices=vertices; mesh.normals=original.normals; mesh.uv=original.uv;
        mesh.subMeshCount=original.subMeshCount;
        for(int s=0;s<original.subMeshCount;s++) {
            var triangles=original.GetTriangles(s); var chosen=new System.Collections.Generic.List<int>();
            for(int i=0;i<triangles.Length;i+=3) {
                var a=vertices[triangles[i]]; var b=vertices[triangles[i+1]]; var c=vertices[triangles[i+2]];
                var center=(a+b+c)/3f;
                if(center.z < from || center.z > to || Mathf.Abs(center.x)>150f) continue;
                chosen.Add(triangles[i]); chosen.Add(triangles[i+1]); chosen.Add(triangles[i+2]);
            }
            mesh.SetTriangles(chosen,s);
        }
        var arenaMaterials = Compact(mesh, source.GetComponent<Renderer>().sharedMaterials);
        string path=Output+"Map/Original Purple Arena.asset";
        var existing=AssetDatabase.LoadAssetAtPath<Mesh>(path);
        if(existing==null) AssetDatabase.CreateAsset(mesh,path); else {EditorUtility.CopySerialized(mesh,existing);Object.DestroyImmediate(mesh);mesh=existing;}
        var arena=new GameObject("Guarded Nests - Original Purple Arena",typeof(MeshFilter),typeof(MeshRenderer));
        arena.transform.SetParent(map,false); arena.transform.localScale=source.transform.localScale;
        arena.transform.position=new Vector3(0,0,start-from*scale);
        arena.GetComponent<MeshFilter>().sharedMesh=mesh;
        arena.GetComponent<MeshRenderer>().sharedMaterials=arenaMaterials;
        // Independent colliders retain the supplied visible mesh and its original dimensions.
        var floor=new GameObject("Purple Arena Ground",typeof(BoxCollider));floor.transform.SetParent(map,false);
        floor.layer=LayerMask.NameToLayer("Ground");floor.transform.position=new Vector3(0,-.25f,(start+end)*.5f);
        floor.GetComponent<BoxCollider>().size=new Vector3(64.3f,.5f,end-start);
        var wall=map.Find("Sakura End Wall");wall.name="Purple Arena End Wall";
        wall.position=new Vector3(0,7.2f,end);
        var mat=new Material(source.GetComponent<Renderer>().sharedMaterials[37]);mat.name="Purple Arena Wall";
        // Use the floor texture and tint with the project's supported unlit shader.
        var tex=mat.mainTexture;var tint=mat.color;mat.shader=Shader.Find("Playable/Egg Unlit");mat.mainTexture=tex;mat.color=tint;
        string mp=Output+"Materials/Purple Arena Wall.mat";
        var saved=AssetDatabase.LoadAssetAtPath<Material>(mp);
        if(saved==null) AssetDatabase.CreateAsset(mat,mp);else {EditorUtility.CopySerialized(mat,saved);Object.DestroyImmediate(mat);mat=saved;}
        mat.mainTextureScale=new Vector2(16,4);wall.GetComponent<Renderer>().sharedMaterial=mat;
        float shift=end-previousEnd;
        foreach(Transform child in map) {
            if(child.name.StartsWith("Guard Nest ") || child.name.Contains("Patrol Center") || child.GetComponent<Playable.Monster>()!=null || child.GetComponent<Playable.Egg>()!=null) {
                child.position+=Vector3.forward*shift;PrefabUtility.RecordPrefabInstancePropertyModifications(child);
            }
        }
        foreach(string name in new[]{"Left continuous boundary","Right continuous boundary"}) {
            var boundary=map.Find(name);var p=boundary.position;p.z=end*.5f;boundary.position=p;
            var box=boundary.GetComponent<BoxCollider>();var size=box.size;size.z=end;box.size=size;
        }
        Object.DestroyImmediate(old.gameObject);
        AssetDatabase.SaveAssets();EditorSceneManager.MarkSceneDirty(scene);EditorSceneManager.SaveScene(scene);
        Debug.Log("Original purple arena applied at prefab scale 0.4, unchanged triangles; floor collider and matching end wall installed.");
    }
}
