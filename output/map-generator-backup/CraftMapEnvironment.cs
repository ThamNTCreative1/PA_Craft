using System.Collections.Generic;
using UnityEngine;

/// <summary>Deterministic voxel backdrop using one shared 128px environment atlas.</summary>
public sealed class CraftMapEnvironment : MonoBehaviour
{
    private sealed class BoxInstance
    {
        public Mesh mesh;
        public Vector3 position;
        public Vector3 scale;
    }
    readonly List<Mesh> meshes = new List<Mesh>();
    readonly List<Material> materials = new List<Material>();
    public static void Create()
    {
        var root = new GameObject("Craft Map Environment");
        root.AddComponent<CraftMapEnvironment>().Build();
    }
    void Build()
    {
        var colors = new[] { Color.white, Color.white, Color.white, Color.white, Color.white, Color.white, Color.white };
        var groups = new List<BoxInstance>[colors.Length];
        for(int i=0;i<groups.Length;i++) groups[i]=new List<BoxInstance>();
        var temp=GameObject.CreatePrimitive(PrimitiveType.Cube);
        var cube=temp.GetComponent<MeshFilter>().sharedMesh;
        temp.SetActive(false); Destroy(temp);
        var atlasCubes = new Mesh[colors.Length];
        for(int i=0;i<atlasCubes.Length;i++)
        {
            var mapped=Instantiate(cube); meshes.Add(mapped); var uv=mapped.uv; var normals=mapped.normals;
            for(int v=0;v<uv.Length;v++)
            {
                Vector2 tile=i==6?new Vector2(0,0):i>=4?new Vector2(.5f,0):i==3?new Vector2(.5f,.5f):normals[v].y>.5f?new Vector2(0,.5f):new Vector2(.5f,.5f);
                uv[v]=tile+Vector2.one*(.5f/128)+uv[v]*(.5f-1f/128);
            }
            mapped.uv=uv; atlasCubes[i]=mapped;
        }
        System.Action<int,Vector3,Vector3> box=(index,pos,size)=> {
            int nx=Mathf.CeilToInt(size.x), ny=Mathf.CeilToInt(size.y), nz=Mathf.CeilToInt(size.z);
            Vector3 cell=new Vector3(size.x/nx,size.y/ny,size.z/nz);
            for(int x=0;x<nx;x++) for(int y=0;y<ny;y++) for(int z=0;z<nz;z++)
                groups[index].Add(new BoxInstance {
                    mesh=atlasCubes[index], scale=cell,
                    position=new Vector3(pos.x-size.x*.5f+(x+.5f)*cell.x,
                        pos.y-size.y*.5f+(y+.5f)*cell.y,
                        pos.z-size.z*.5f+(z+.5f)*cell.z)
                });
        };
        // Ground stays flush with the finished floor; the 2x2 excavation exposes foundation guides.
        for(int x=-15;x<15;x++) for(int z=-12;z<18;z++)
        {
            if(x>=-1 && x<1 && z>=0 && z<2) continue;
            int shade=0;
            box(shade,new Vector3(x+.5f,-.12f,z+.5f),new Vector3(1,.24f,1));
        }
        box(3,new Vector3(0,-1.06f,1),new Vector3(2,.12f,2));
        // Broad stepped hills and trees remain outside the building/camera interaction area.
        for(int i=0;i<7;i++)
        {
            float x=-12+i*4, z=10+(i%3)*2;
            box(3,new Vector3(x,.25f,z),new Vector3(5,.5f,5));
            box(0,new Vector3(x,.55f,z),new Vector3(5,.1f,5));
            box(0,new Vector3(x,.9f,z+1),new Vector3(3,.6f,3));
            Tree(box,x,z,1.2f,i);
        }
        Tree(box,-9,4,0,1); Tree(box,9,5,0,2); Tree(box,-11,-3,0,3); Tree(box,11,-1,0,4);
        var material=GameplayMaterials.Create(); material.color=Color.white; material.mainTexture=Resources.Load<Texture2D>("CraftMap/EnvironmentAtlas");
        material.SetFloat("_Glossiness",0); materials.Add(material);
        var wetGrass = new Material(material);
        wetGrass.SetFloat("_Glossiness",.35f); materials.Add(wetGrass);
        for(int i=0;i<colors.Length;i++)
        {
            if(groups[i].Count==0) continue;
            var mesh=CombineGeometry(groups[i]); mesh.name="CraftMapBatch_"+i; meshes.Add(mesh);
            var child=new GameObject(mesh.name); child.transform.SetParent(transform,false);
            child.AddComponent<MeshFilter>().sharedMesh=mesh;
            var renderer=child.AddComponent<MeshRenderer>(); renderer.sharedMaterial=i<3?wetGrass:material;
            renderer.shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;
        }
        if(Camera.main!=null) { Camera.main.clearFlags=CameraClearFlags.SolidColor; Camera.main.backgroundColor=new Color(.43f,.65f,.75f); }
    }
    static void Tree(System.Action<int,Vector3,Vector3> box,float x,float z,float ground,int seed)
    {
        box(6,new Vector3(x,ground+1.3f,z),new Vector3(.5f,2.6f,.5f));
        box(4,new Vector3(x,ground+2.5f,z),new Vector3(2.8f,1,2.8f));
        box(5,new Vector3(x,ground+3.3f,z),new Vector3(2.2f,.8f,2.2f));
        box(4,new Vector3(x+.2f*(seed%2),ground+3.9f,z),new Vector3(1.2f,.4f,1.2f));
    }
    static Mesh CombineGeometry(List<BoxInstance> instances)
    {
        var vertices = new List<Vector3>(); var normals = new List<Vector3>();
        var uv = new List<Vector2>(); var triangles = new List<int>();
        foreach (var instance in instances)
        {
            int offset = vertices.Count;
            var source = instance.mesh;
            // Boxes are axis-aligned: explicit scalar math avoids Playworks TRS/stub APIs
            // and mutable JS vector operations changing the original box position.
            Vector3 p=instance.position, s=instance.scale;
            foreach (var vertex in source.vertices)
                vertices.Add(new Vector3(p.x+vertex.x*s.x,p.y+vertex.y*s.y,p.z+vertex.z*s.z));
            foreach (var normal in source.normals)
                normals.Add(new Vector3(normal.x/s.x,normal.y/s.y,normal.z/s.z).normalized);
            uv.AddRange(source.uv);
            foreach (int index in source.triangles) triangles.Add(offset + index);
        }
        var mesh = new Mesh(); mesh.vertices = vertices.ToArray(); mesh.normals = normals.ToArray();
        mesh.uv = uv.ToArray(); mesh.triangles = triangles.ToArray(); mesh.RecalculateBounds();
        return mesh;
    }
    void OnDestroy()
    {
        foreach(var mesh in meshes) if(mesh!=null) Destroy(mesh);
        foreach(var material in materials) if(material!=null) Destroy(material);
    }
}
