using System.Linq;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement;
using Playable.KeyboardEscape;

public static partial class KeyboardEscapeBuilder
{
    public static string FinishAtStageThree()
    {
        if (EditorApplication.isPlaying) throw new System.InvalidOperationException("Exit Play Mode first");
        var game = UnityEngine.Object.FindFirstObjectByType<EscapeGame>();
        var stage = game.GetComponentsInChildren<Transform>(true).FirstOrDefault(t => t.name == "Stage 4");
        if (stage) Undo.DestroyObjectImmediate(stage.gameObject);
        var batches = game.GetComponentInChildren<EscapeKeyboardBatches>();
        var kept = new List<EscapeKeyChunk>();
        foreach (var chunk in batches.chunks)
        {
            var centers = chunk.keyCenters.Where(p => p.z < 234.2f).ToArray();
            if (centers.Length == 0) { Undo.DestroyObjectImmediate(chunk.root); continue; }
            if (centers.Length != chunk.keyCenters.Length)
            {
                var filter = chunk.root.GetComponent<MeshFilter>();
                var source = filter.sharedMesh;
                var positions = source.vertices; var normals = source.normals; var colors = source.colors32;
                var uv = source.uv; var uv2 = source.uv2; var uv3 = source.uv3;
                var indices = Enumerable.Range(0, positions.Length).Where(i => uv2[i].y < 234.2f).ToArray();
                var remap = Enumerable.Repeat(-1, positions.Length).ToArray();
                for (int i = 0; i < indices.Length; i++) remap[indices[i]] = i;
                var triangles = source.triangles; var keptTriangles = new List<int>();
                for (int i = 0; i < triangles.Length; i += 3)
                    if (remap[triangles[i]] >= 0 && remap[triangles[i+1]] >= 0 && remap[triangles[i+2]] >= 0)
                        for(int j=0;j<3;j++) keptTriangles.Add(remap[triangles[i+j]]);
                var mesh = new Mesh { name = source.name + " Stage 3 End" };
                mesh.vertices = indices.Select(i=>positions[i]).ToArray();
                mesh.normals = indices.Select(i=>normals[i]).ToArray();
                mesh.colors32 = indices.Select(i=>colors[i]).ToArray();
                mesh.uv = indices.Select(i=>uv[i]).ToArray(); mesh.uv2 = indices.Select(i=>uv2[i]).ToArray(); mesh.uv3 = indices.Select(i=>uv3[i]).ToArray();
                mesh.SetTriangles(keptTriangles,0); mesh.RecalculateBounds();
                AssetDatabase.CreateAsset(mesh, AssetDatabase.GenerateUniqueAssetPath(Root + "/BakedKeys/" + mesh.name + ".asset"));
                filter.sharedMesh = mesh; chunk.keyCenters = centers; chunk.bounds = mesh.bounds;
                chunk.boundsCenter = mesh.bounds.center; chunk.boundsExtents = mesh.bounds.extents;
            }
            kept.Add(chunk);
        }
        batches.chunks = kept.ToArray(); EditorUtility.SetDirty(batches);
        var goal = game.cup;
        while(goal.parent != game.transform) goal = goal.parent;
        goal.name = "Stage 3 Goal"; goal.position = new Vector3(4.58f,10.62f,231.3f);
        var fx = game.fireworks.transform; while(fx.parent != game.transform) fx = fx.parent;
        fx.position = game.cup.position;
        var helmet = game.helmets.OrderByDescending(p=>p.transform.position.z).First();
        var key = batches.chunks.SelectMany(c=>c.keyCenters).OrderBy(p=>Mathf.Abs(p.z-190.5f)+Mathf.Abs(p.x-4.58f)).First();
        helmet.transform.position = key + Vector3.up*1.2f;
        var ball = game.GetComponentInChildren<Minigames.KeyboardEscape.Gameplay.KeyboardEscape_BallTrap>();
        ball.mapRoute = ball.mapRoute.Where(p=>p.z <= 231.3f).ToArray(); EditorUtility.SetDirty(ball);
        AssetDatabase.SaveAssets(); EditorSceneManager.MarkSceneDirty(game.gameObject.scene); EditorSceneManager.SaveScene(game.gameObject.scene);
        return "Stage 4 removed; cup="+game.cup.position+" chunks="+kept.Count+" helmet="+helmet.transform.position+" ball start="+ball.mapRoute[0];
    }
}
