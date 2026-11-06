#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using CEBB.Playable;

// "Living Room Tap": the SampleScene (bedroom) gameplay — fixed furniture spots, aim at a ghost and tap to build,
// same tutorial (tap the first ghost -> drag to look -> joystick move -> explore with hints) — but in the living room
// (walls, glass, outdoor view copied from LivingRoom.unity) with the living-room furniture.
// Menu: Tools/CEBB/Living Room Tap/Build Scene  (needs LivingRoom.unity + Tools/CEBB/Living Room/1 Import Furniture done)
public static class LivingRoomTapSetup
{
    const string ScenePath="Assets/Scenes/LivingRoomTap.unity",Folder="Assets/_Playable/LivingRoomTap",Data=Folder+"/Data/",LR="Assets/_Playable/LivingRoom/";
    // hotbar order (12 slots)
    static readonly string[] Ids={"sofa_double","armchair","coffee_table","tv_cabinet","tv","bookshelf_high","floor_lamp","plant_pot_large","rug_square","painting","wall_clock","pouf"};

    // Fixed placements. Room interior: x -5..5, z -4.5..4.5 (north + east are glass). Item front = local -Z,
    // so yaw 0 faces south, 180 faces north, 90 faces west, -90 faces east.
    // type, position, yaw, scale
    static readonly int[] Types={0, 1,1, 2, 3, 4, 5,5, 6,6, 7,7,7, 8, 9,9, 10, 11,11};
    static readonly Vector3[] Positions={
        new Vector3(2.4f,0,.3f),                                   // Sofa (first tutorial build) facing the TV
        new Vector3(0,0,2.4f),new Vector3(0,0,-1.8f),              // Armchairs either side of the table
        new Vector3(0,.02f,.3f),                                   // Coffee table on the rug
        new Vector3(-4.5f,0,.3f),new Vector3(-4.55f,1f,.3f),       // TV stand + TV on top (west wall)
        new Vector3(-3.3f,0,-4f),new Vector3(3.3f,0,-4f),          // Bookshelves on the south wall
        new Vector3(2.6f,0,2.3f),new Vector3(2.6f,0,-1.7f),        // Lamps beside the sofa
        new Vector3(-4.4f,0,3.9f),new Vector3(4.4f,0,3.9f),new Vector3(4.4f,0,-3.9f), // Plants in the corners
        new Vector3(0,.005f,.3f),                                  // Rug
        new Vector3(-1.4f,1.5f,-4.47f),new Vector3(1.4f,1.5f,-4.47f), // Paintings (south wall)
        new Vector3(-4.93f,2.5f,.3f),                              // Clock above the TV
        new Vector3(-1.5f,0,3.6f),new Vector3(1.5f,0,3.6f)};       // Poufs by the glass
    static readonly float[] Yaws={90, 0,180, 0, -90,-90, 180,180, 0,0, 0,0,0, 0, 180,180, -90, 0,0};
    static Vector3 ScaleOf(int type){return type==8?new Vector3(1.6f,1,1.6f):Vector3.one;}

    [MenuItem("Tools/CEBB/Living Room Tap/Build Scene")]
    public static void Build()
    {
        if(Application.isPlaying)throw new System.InvalidOperationException("Stop Play mode first");
        if(!AssetDatabase.IsValidFolder(Folder))AssetDatabase.CreateFolder("Assets/_Playable","LivingRoomTap");
        if(!AssetDatabase.IsValidFolder(Folder+"/Data"))AssetDatabase.CreateFolder(Folder,"Data");

        // ---- furniture definitions (BedroomPlayable format) from the imported living-room items
        var defs=new FurnitureDefinition[Ids.Length];
        for(int i=0;i<Ids.Length;i++)
        {
            var item=AssetDatabase.LoadAssetAtPath<DecorItem>(LR+"Data/"+Ids[i]+".asset");
            if(item==null)throw new System.InvalidOperationException("Run Tools/CEBB/Living Room/1 Import Furniture first ("+Ids[i]+" missing)");
            string path=Data+Ids[i]+".asset";var d=AssetDatabase.LoadAssetAtPath<FurnitureDefinition>(path);
            if(d==null){d=ScriptableObject.CreateInstance<FurnitureDefinition>();AssetDatabase.CreateAsset(d,path);}
            d.furnitureId=Ids[i];d.displayName=item.displayName;d.prefab=item.prefab;d.icon=item.icon;d.walkableSurface=item.walkableSurface;
            EditorUtility.SetDirty(d);defs[i]=d;
        }
        AssetDatabase.SaveAssets();

        // ---- scene = copy of SampleScene (keeps UI, tutorial, Luna fields, audio)
        if(AssetDatabase.LoadAssetAtPath<SceneAsset>(ScenePath)!=null)AssetDatabase.DeleteAsset(ScenePath);
        AssetDatabase.CopyAsset("Assets/Scenes/SampleScene.unity",ScenePath);
        var scene=EditorSceneManager.OpenScene(ScenePath,OpenSceneMode.Single);
        var m=Object.FindFirstObjectByType<BedroomPlayable>();var player=Object.FindFirstObjectByType<FirstPersonRoom>();
        m.gameObject.name="CEBB Living Room — tap to build";
        var oldRoom=m.transform.Find("Closed home — four walls, ceiling and roof");if(oldRoom!=null)Object.DestroyImmediate(oldRoom.gameObject);
        if(m.editorPreviewRoot!=null)Object.DestroyImmediate(m.editorPreviewRoot);
        var oldAnchors=m.transform.Find("Furniture placements — quantities come from these slots");if(oldAnchors!=null)Object.DestroyImmediate(oldAnchors.gameObject);

        // ---- living room shell + outdoor view, copied from LivingRoom.unity
        var src=EditorSceneManager.OpenScene("Assets/Scenes/LivingRoom.unity",OpenSceneMode.Additive);
        GameObject srcRoot=null;Light srcSun=null;
        foreach(var g in src.GetRootGameObjects()){if(g.GetComponent<LivingRoomPlayable>()!=null)srcRoot=g;if(g.name=="Directional Light")srcSun=g.GetComponent<Light>();}
        if(srcRoot==null)throw new System.InvalidOperationException("LivingRoom.unity not built yet (Tools/CEBB/Living Room/2 Build Scene)");
        foreach(var n in new[]{"Living room — walls, glass, lights","Outdoor — fake environment"})
        {
            var t=srcRoot.transform.Find(n);if(t==null)continue;
            var copy=Object.Instantiate(t.gameObject);copy.name=n;SceneManager.MoveGameObjectToScene(copy,scene);
            copy.transform.SetParent(m.transform,false);copy.transform.localPosition=t.localPosition;copy.transform.localRotation=t.localRotation;copy.transform.localScale=t.localScale;
            foreach(var ps in copy.GetComponentsInChildren<PlacementSurface>(true))Object.DestroyImmediate(ps);
        }
        var sunGo=GameObject.Find("Directional Light");
        if(sunGo!=null&&srcSun!=null){sunGo.transform.rotation=srcSun.transform.rotation;var l=sunGo.GetComponent<Light>();l.intensity=srcSun.intensity;l.color=srcSun.color;}
        EditorSceneManager.CloseScene(src,true);
        RenderSettings.ambientMode=UnityEngine.Rendering.AmbientMode.Flat;RenderSettings.ambientLight=new Color(.6f,.59f,.56f);
        var cam=player.playerCamera;cam.clearFlags=CameraClearFlags.SolidColor;cam.backgroundColor=new Color(.58f,.8f,.96f);cam.farClipPlane=120;

        // ---- fixed furniture spots (one slot = one build)
        var preview=new GameObject("Completed room preview — hidden in Play");preview.transform.SetParent(m.transform,false);m.editorPreviewRoot=preview;
        var anchors=new GameObject("Furniture placements — quantities come from these slots").transform;anchors.SetParent(m.transform,false);
        m.slots=new FurnitureSlot[Types.Length];
        for(int i=0;i<Types.Length;i++)
        {
            var d=defs[Types[i]];var anchor=new GameObject((i+1).ToString("00")+" "+d.displayName).transform;anchor.SetParent(anchors,false);
            anchor.localPosition=Positions[i];anchor.localEulerAngles=new Vector3(0,Yaws[i],0);
            m.slots[i]=new FurnitureSlot{definition=d,anchor=anchor,localPosition=Vector3.zero,localEulerAngles=Vector3.zero,localScale=ScaleOf(Types[i]),buildOrder=i};
            var f=(GameObject)PrefabUtility.InstantiatePrefab(d.prefab);f.name=anchor.name;f.transform.SetParent(preview.transform);f.transform.position=anchor.position;f.transform.rotation=anchor.rotation;f.transform.localScale=ScaleOf(Types[i]);
        }
        m.firstBedSlot=0;m.firstPrompt="TAP THE SOFA GHOST";m.handAfterMove=true;

        // ---- hotbar: same 12 buttons, new items + quantities
        for(int i=0;i<m.inventory.Length&&i<defs.Length;i++)
        {
            var e=m.inventory[i];e.definition=defs[i];e.button.gameObject.name=defs[i].displayName;
            if(e.icon!=null){e.icon.sprite=defs[i].icon;e.icon.preserveAspect=true;}
            var nameT=e.button.transform.Find("Name");if(nameT!=null){var tx=nameT.GetComponent<Text>();if(tx!=null)tx.text=defs[i].displayName.ToUpperInvariant();}
            int count=0;foreach(int t in Types)if(t==i)count++;
            if(e.quantityText!=null)e.quantityText.text="x"+count;if(e.emptyBadge!=null)e.emptyBadge.SetActive(false);
        }

        // ---- player: spawn by the south wall, looking at the sofa ghost
        player.spawnPosition=new Vector3(-.8f,0,-3.4f);player.minRoom=new Vector2(-4.7f,-4.2f);player.maxRoom=new Vector2(4.7f,4.2f);
        player.transform.position=player.spawnPosition;
        Vector3 dir=Positions[0]+Vector3.up*.6f-(player.spawnPosition+Vector3.up*player.eyeHeight);
        player.yaw=Mathf.Atan2(dir.x,dir.z)*Mathf.Rad2Deg;player.pitch=-Mathf.Atan2(dir.y,new Vector2(dir.x,dir.z).magnitude)*Mathf.Rad2Deg;player.ApplyView();
        if(m.promptText!=null)m.promptText.text=m.firstPrompt;if(m.countText!=null)m.countText.text="BUILT 0/"+Types.Length;

        EditorUtility.SetDirty(m);EditorUtility.SetDirty(player);
        EditorSceneManager.MarkSceneDirty(scene);EditorSceneManager.SaveScene(scene);
        Selection.activeGameObject=m.gameObject;
        Debug.Log("[CEBB] Living Room Tap scene built: "+ScenePath+" ("+Types.Length+" placements)");
    }
}
#endif
