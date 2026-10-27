using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement;

public static class MapCollisionSetup
{
    public static string Bake()
    {
        if(EditorApplication.isPlaying)return "Stop Play Mode first";
        var map=GameObject.Find("Gameplay Map");
        if(map==null)return "Map missing";
        if(GameObject.Find("Map Collision")!=null)return BakePlayerCollision();
        var boxes=new List<Bounds>();
        foreach(var f in map.GetComponentsInChildren<MeshFilter>())
            if(f.sharedMesh!=null&&f.sharedMesh.name=="Cube")boxes.Add(f.GetComponent<Renderer>().bounds);
        int original=boxes.Count;
        for(int axis=0;axis<3;axis++)boxes=Merge(boxes,axis);
        var root=new GameObject("Map Collision");
        Undo.RegisterCreatedObjectUndo(root,"Bake map collision");
        foreach(var bounds in boxes)
        {
            var box=root.AddComponent<BoxCollider>();box.center=bounds.center;box.size=bounds.size;
        }
        EditorSceneManager.MarkSceneDirty(root.scene);EditorSceneManager.SaveScene(root.scene);
        return original+" map cubes -> "+boxes.Count+" saved collision boxes; "+BakePlayerCollision();
    }
    public static string BakePlayerCollision()
    {
        if(EditorApplication.isPlaying)return "Stop Play Mode first";
        var root=GameObject.Find("Map Collision");
        if(root==null)return "Map Collision missing";
        var world=root.GetComponent<BuildCollisionWorld>();
        if(world==null)world=root.AddComponent<BuildCollisionWorld>();
        var boxes=root.GetComponentsInChildren<BoxCollider>();
        var so=new SerializedObject(world);
        var data=so.FindProperty("mapBoxData");data.arraySize=boxes.Length*6;
        for(int i=0;i<boxes.Length;i++)
        {
            Bounds b=boxes[i].bounds;
            for(int axis=0;axis<3;axis++)
            {
                data.GetArrayElementAtIndex(i*6+axis).floatValue=b.center[axis];
                data.GetArrayElementAtIndex(i*6+3+axis).floatValue=b.size[axis];
            }
        }
        so.ApplyModifiedPropertiesWithoutUndo();
        var camera=Object.FindFirstObjectByType<BuildCameraController>();
        if(camera!=null)
        {
            var cameraData=new SerializedObject(camera);
            cameraData.FindProperty("collisionWorld").objectReferenceValue=world;
            cameraData.ApplyModifiedPropertiesWithoutUndo();
        }
        EditorSceneManager.MarkSceneDirty(root.scene);EditorSceneManager.SaveScene(root.scene);
        return boxes.Length+" player collision volumes saved";
    }
    private static List<Bounds> Merge(List<Bounds> source,int axis)
    {
        int a=(axis+1)%3,b=(axis+2)%3;
        var groups=new Dictionary<string,List<Bounds>>();
        foreach(var bounds in source)
        {
            string key=Mathf.RoundToInt(bounds.min[a]*1000)+":"+Mathf.RoundToInt(bounds.max[a]*1000)+":"+
                Mathf.RoundToInt(bounds.min[b]*1000)+":"+Mathf.RoundToInt(bounds.max[b]*1000);
            List<Bounds> group;if(!groups.TryGetValue(key,out group)){group=new List<Bounds>();groups.Add(key,group);}
            group.Add(bounds);
        }
        var result=new List<Bounds>();
        foreach(var group in groups.Values)
        {
            group.Sort((x,y)=>x.min[axis].CompareTo(y.min[axis]));
            Bounds current=group[0];
            for(int i=1;i<group.Count;i++)
            {
                if(group[i].min[axis]<=current.max[axis]+.0001f)current.Encapsulate(group[i]);
                else{result.Add(current);current=group[i];}
            }
            result.Add(current);
        }
        return result;
    }
}
