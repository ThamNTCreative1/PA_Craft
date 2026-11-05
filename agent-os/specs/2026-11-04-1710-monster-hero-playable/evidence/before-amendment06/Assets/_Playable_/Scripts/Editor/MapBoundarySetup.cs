using System.IO;
using System.Linq;
using UnityEditor;
using UnityEngine;
[InitializeOnLoad]
public static class MapBoundarySetup
{
    const string Folder="Temp/RiderSetup/";
    static MapBoundarySetup(){EditorApplication.update+=Poll;}
    static void Poll(){
        if(EditorApplication.isCompiling || EditorApplication.isUpdating || !File.Exists(Folder+"boundary-request.txt"))return;
        string cmd=File.ReadAllText(Folder+"boundary-request.txt").Trim();File.Delete(Folder+"boundary-request.txt");
        try{
            if(EditorApplication.isPlaying)throw new System.Exception("Edit mode required");
            var map=GameObject.Find("CityMap_Cropped");
            if(map==null)throw new System.Exception("Map not found");
            var lines=new System.Collections.Generic.List<string>();
            foreach(var r in map.GetComponentsInChildren<Renderer>(true))lines.Add("RENDER "+r.name+" min="+r.bounds.min.ToString("F3")+" max="+r.bounds.max.ToString("F3"));
            foreach(var c in map.GetComponentsInChildren<Collider>(true))lines.Add("COLLIDER "+c.name+" enabled="+c.enabled+" min="+c.bounds.min.ToString("F3")+" max="+c.bounds.max.ToString("F3"));
            File.WriteAllLines(Folder+"boundary-inspect.txt",lines);
        }catch(System.Exception e){File.WriteAllText(Folder+"boundary-result.txt",e.ToString());}
    }
}
